-- ZIPLAN 도면 → 3D(SketchUp) 무료 체험 횟수 (X · v23)
-- Supabase SQL 편집기에서 tiers.sql 다음에 한 번 실행하세요. 여러 번 실행해도 안전합니다.
-- 멤버십(profiles.plan in stu·studio·pro·school, plan_until 안 지남)과 관리자는 무제한,
-- 그 밖의 로그인 회원은 무료 체험 3회(아래 free_n). 횟수는 서버 함수로만 바뀝니다(클라이언트가 직접 못 고침).

create table if not exists public.plan3d_usage (
  user_id uuid primary key references auth.users(id) on delete cascade,
  used integer not null default 0 check (used >= 0),
  updated_at timestamptz not null default now()
);
alter table public.plan3d_usage enable row level security;
drop policy if exists "plan3d_usage own read" on public.plan3d_usage;
create policy "plan3d_usage own read" on public.plan3d_usage for select using (auth.uid() = user_id);
revoke insert, update, delete on public.plan3d_usage from authenticated, anon;

-- 멤버십 여부(plan 열이 없으면 = tiers.sql 미적용 → 멤버 아님)
create or replace function public.plan3d_is_member(uid uuid)
returns boolean language plpgsql stable security definer set search_path = public as $$
declare ok boolean := false;
begin
  begin
    execute 'select exists(select 1 from public.profiles where id = $1 and (role in (''admin'',''super_admin'') or (plan in (''stu'',''studio'',''pro'',''school'') and (plan_until is null or plan_until > now()))))'
      into ok using uid;
  exception when undefined_column then
    select exists(select 1 from public.profiles where id = uid and role in ('admin','super_admin')) into ok;
  end;
  return coalesce(ok, false);
end $$;

-- 지금 상태: {member, used, free}
create or replace function public.plan3d_status()
returns json language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); u integer := 0; free_n constant integer := 3;
begin
  if uid is null then raise exception 'login required'; end if;
  select used into u from public.plan3d_usage where user_id = uid;
  return json_build_object('member', public.plan3d_is_member(uid), 'used', coalesce(u, 0), 'free', free_n);
end $$;

-- 내려받기 1회 쓰기: 멤버는 세지 않고 ok, 아니면 남았을 때만 +1
create or replace function public.plan3d_consume()
returns json language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); u integer; free_n constant integer := 3;
begin
  if uid is null then raise exception 'login required'; end if;
  if public.plan3d_is_member(uid) then
    return json_build_object('ok', true, 'member', true);
  end if;
  insert into public.plan3d_usage(user_id, used) values (uid, 0) on conflict (user_id) do nothing;
  select used into u from public.plan3d_usage where user_id = uid for update;
  if u >= free_n then
    return json_build_object('ok', false, 'member', false, 'used', u, 'free', free_n);
  end if;
  update public.plan3d_usage set used = u + 1, updated_at = now() where user_id = uid;
  return json_build_object('ok', true, 'member', false, 'used', u + 1, 'free', free_n);
end $$;

revoke all on function public.plan3d_is_member(uuid) from public, anon, authenticated;
grant execute on function public.plan3d_status() to authenticated;
grant execute on function public.plan3d_consume() to authenticated;
