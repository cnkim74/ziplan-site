-- ZIPLAN 관리자 권한 + 관리자 지표 (schema.sql 다음에 한 번 실행)
-- 1) profiles 에 role(user/admin/super_admin), email 추가
-- 2) 회원이 자기 role 을 바꾸지 못하게 컬럼 권한 잠금
-- 3) killerzoz0728@gmail.com 을 최고 관리자로 지정
-- 4) 관리자만 부를 수 있는 admin_stats() / admin_set_role()

alter table public.profiles add column if not exists role text not null default 'user';
alter table public.profiles add column if not exists email text;
do $$ begin
  alter table public.profiles add constraint profiles_role_check check (role in ('user','admin','super_admin'));
exception when duplicate_object then null; end $$;

-- 회원은 이름·학교 정보만 쓰고 고칠 수 있다 (role·email 은 서버만)
revoke insert, update on public.profiles from anon, authenticated;
grant insert (id, name, school, student_email, student_at) on public.profiles to authenticated;
grant update (name, school, student_email, student_at) on public.profiles to authenticated;

-- 가입 트리거: 이메일도 함께 저장
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end $$;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- 이미 가입한 사람들의 프로필·이메일 채우기
insert into public.profiles (id, name, email)
select u.id, coalesce(u.raw_user_meta_data->>'name', u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1)), u.email
from auth.users u
on conflict (id) do update set email = excluded.email;

-- 최고 관리자 지정
update public.profiles set role = 'super_admin'
where id in (select id from auth.users where lower(email) = 'killerzoz0728@gmail.com');

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','super_admin'));
$$;
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- 관리자 지표
create or replace function public.admin_stats() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare r jsonb; tz text := 'Asia/Seoul';
begin
  if not public.is_admin() then raise exception 'not authorized' using errcode = '42501'; end if;
  select jsonb_build_object(
    'generated_at', now(),
    'users_total',   (select count(*) from auth.users),
    'users_today',   (select count(*) from auth.users where (created_at at time zone tz)::date = (now() at time zone tz)::date),
    'users_7d',      (select count(*) from auth.users where created_at > now() - interval '7 days'),
    'users_30d',     (select count(*) from auth.users where created_at > now() - interval '30 days'),
    'active_7d',     (select count(*) from auth.users where last_sign_in_at > now() - interval '7 days'),
    'confirmed',     (select count(*) from auth.users where email_confirmed_at is not null),
    'students',      (select count(*) from public.profiles where student_email is not null),
    'admins',        (select count(*) from public.profiles where role in ('admin','super_admin')),
    'saves_total',   (select count(*) from public.case_saves),
    'likes_total',   (select count(*) from public.case_likes),
    'views_total',   (select coalesce(sum(views),0) from public.case_views),
    'savers',        (select count(distinct user_id) from public.case_saves),
    'providers',     (select coalesce(jsonb_object_agg(p, n), '{}'::jsonb) from (
                        select coalesce(raw_app_meta_data->>'provider','email') p, count(*) n from auth.users group by 1) x),
    'schools',       (select coalesce(jsonb_agg(jsonb_build_object('school', s, 'n', n) order by n desc), '[]'::jsonb) from (
                        select coalesce(nullif(school,''),'(학교 미입력)') s, count(*) n from public.profiles where student_email is not null group by 1 order by 2 desc limit 10) x),
    'signups_daily', (select jsonb_agg(jsonb_build_object('d', d, 'n', coalesce(n,0)) order by d) from (
                        select g::date d, (select count(*) from auth.users u where (u.created_at at time zone tz)::date = g::date) n
                        from generate_series((now() at time zone tz)::date - 29, (now() at time zone tz)::date, interval '1 day') g) x),
    'top_viewed',    (select coalesce(jsonb_agg(jsonb_build_object('id', case_id, 'views', views, 'likes', likes)), '[]'::jsonb) from (
                        select * from public.case_stats order by views desc, likes desc limit 10) x),
    'top_liked',     (select coalesce(jsonb_agg(jsonb_build_object('id', case_id, 'views', views, 'likes', likes)), '[]'::jsonb) from (
                        select * from public.case_stats where likes > 0 order by likes desc, views desc limit 10) x),
    'top_saved',     (select coalesce(jsonb_agg(jsonb_build_object('id', case_id, 'n', n)), '[]'::jsonb) from (
                        select case_id, count(*) n from public.case_saves group by 1 order by 2 desc limit 10) x),
    'recent_users',  (select coalesce(jsonb_agg(row_to_json(x)), '[]'::jsonb) from (
                        select u.email, coalesce(p.name, split_part(u.email,'@',1)) as name,
                               coalesce(u.raw_app_meta_data->>'provider','email') as provider,
                               u.created_at, u.last_sign_in_at, coalesce(p.role,'user') as role,
                               (p.student_email is not null) as student, p.school
                        from auth.users u left join public.profiles p on p.id = u.id
                        order by u.created_at desc limit 50) x)
  ) into r;
  return r;
end $$;
revoke execute on function public.admin_stats() from public, anon;
grant execute on function public.admin_stats() to authenticated;

-- 권한 바꾸기 (최고 관리자만, 자기 자신은 못 바꿈)
create or replace function public.admin_set_role(target_email text, new_role text) returns text
language plpgsql security definer set search_path = public as $$
declare tid uuid;
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin') then
    raise exception 'only super_admin' using errcode = '42501'; end if;
  if new_role not in ('user','admin','super_admin') then raise exception 'bad role'; end if;
  select id into tid from auth.users where lower(email) = lower(trim(target_email));
  if tid is null then raise exception '가입한 회원이 아닙니다'; end if;
  if tid = auth.uid() then raise exception '자기 자신의 권한은 바꿀 수 없습니다'; end if;
  update public.profiles set role = new_role where id = tid;
  return new_role;
end $$;
revoke execute on function public.admin_set_role(text, text) from public, anon;
grant execute on function public.admin_set_role(text, text) to authenticated;

-- 확인: 최고 관리자로 지정됐는지
select email, role from public.profiles where role in ('admin','super_admin');
