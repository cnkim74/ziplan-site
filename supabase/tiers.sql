-- ZIPLAN 회원 플랜 · 활동 등급 (관리자 페이지 "등급·요금" 탭)
-- Supabase SQL 편집기에서 한 번 실행하세요. 여러 번 실행해도 안전합니다.
alter table public.profiles add column if not exists plan text not null default 'free'
  check (plan in ('free','stu','studio','pro','school'));
alter table public.profiles add column if not exists plan_until timestamptz;
alter table public.profiles add column if not exists points integer not null default 0;

-- plan · points는 클라이언트가 직접 바꾸지 못하게 (결제 웹훅/관리자만)
revoke update (plan, plan_until, points) on public.profiles from authenticated, anon;

-- 관리자: 플랜별 회원 수
create or replace function public.admin_plan_stats()
returns json language plpgsql security definer set search_path = public as $$
declare r json;
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','super_admin')) then
    raise exception 'not allowed';
  end if;
  select coalesce(json_object_agg(plan, n), '{}'::json) into r
    from (select plan, count(*) n from public.profiles group by plan) t;
  return r;
end $$;
grant execute on function public.admin_plan_stats() to authenticated;

-- 관리자: 회원 플랜 바꾸기 (결제 연동 전 수동 처리용)
create or replace function public.admin_set_plan(target_email text, new_plan text, months int default 1)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','super_admin')) then
    raise exception 'not allowed';
  end if;
  update public.profiles set plan = new_plan,
    plan_until = case when new_plan = 'free' then null else now() + make_interval(months => months) end
  where lower(email) = lower(target_email);
end $$;
grant execute on function public.admin_set_plan(text, text, int) to authenticated;
