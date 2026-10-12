-- ZIPLAN 회원 · 사례 통계 스키마 (Supabase)
-- 새 Supabase 프로젝트의 SQL Editor에서 한 번 실행하고,
-- crit.html 의 window.ZIPLAN_AUTH = { url, key } 에 프로젝트 URL과 publishable(anon) 키를 넣으면 켜집니다.
-- Authentication → Providers 에서 Email(기본) · Google 을 켜고, URL Configuration 의 Site URL 을 사이트 주소로 둡니다.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  school text,
  student_email text,
  student_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles: read own"   on public.profiles for select using (auth.uid() = id);
create policy "profiles: insert own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles: update own" on public.profiles for update using (auth.uid() = id);

-- 가입하면 프로필 한 줄 자동 생성
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name) values (new.id, coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- 저장(북마크) · 좋아요: 본인 것만 쓰고 읽는다
create table if not exists public.case_saves (
  user_id uuid not null references auth.users(id) on delete cascade,
  case_id text not null check (char_length(case_id) <= 80),
  created_at timestamptz not null default now(),
  primary key (user_id, case_id)
);
create table if not exists public.case_likes (
  user_id uuid not null references auth.users(id) on delete cascade,
  case_id text not null check (char_length(case_id) <= 80),
  created_at timestamptz not null default now(),
  primary key (user_id, case_id)
);
alter table public.case_saves enable row level security;
alter table public.case_likes enable row level security;
create policy "saves: own" on public.case_saves for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "likes: own" on public.case_likes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 조회수: 누구나 +1 (함수로만), 숫자는 누구나 읽기
create table if not exists public.case_views (
  case_id text primary key check (char_length(case_id) <= 80),
  views bigint not null default 0
);
alter table public.case_views enable row level security;
create policy "views: read" on public.case_views for select using (true);

create or replace function public.bump_case_view(cid text) returns void
language sql security definer set search_path = public as $$
  insert into public.case_views (case_id, views) values (left(cid, 80), 1)
  on conflict (case_id) do update set views = public.case_views.views + 1;
$$;
grant execute on function public.bump_case_view(text) to anon, authenticated;

-- 모두의 숫자: 조회수 + 좋아요 수 (좋아요 누가 했는지는 드러나지 않음)
create or replace view public.case_stats with (security_invoker = false) as
  select coalesce(v.case_id, l.case_id) as case_id, coalesce(v.views, 0) as views, coalesce(l.likes, 0) as likes
  from public.case_views v
  full join (select case_id, count(*)::bigint as likes from public.case_likes group by case_id) l on l.case_id = v.case_id;
grant select on public.case_stats to anon, authenticated;
