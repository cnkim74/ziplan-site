-- ZIPLAN 프로젝트 저장 (계정에 여러 개) + 관리자 지표에 프로젝트 수 추가
create table if not exists public.projects (
  id text primary key check (char_length(id) <= 40),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists projects_user_idx on public.projects(user_id, updated_at desc);
alter table public.projects enable row level security;
drop policy if exists "projects: own" on public.projects;
create policy "projects: own" on public.projects for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.admin_project_stats() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'not authorized' using errcode = '42501'; end if;
  return jsonb_build_object(
    'projects_total', (select count(*) from public.projects),
    'project_users',  (select count(distinct user_id) from public.projects),
    'projects_7d',    (select count(*) from public.projects where updated_at > now() - interval '7 days'),
    'dna_users',      (select count(*) from public.projects where jsonb_array_length(coalesce(data->'dna','[]'::jsonb)) >= 5),
    'top_dna',        (select coalesce(jsonb_agg(jsonb_build_object('k', k, 'n', n) order by n desc), '[]'::jsonb) from (
                         select k, count(*) n from public.projects, jsonb_array_elements_text(coalesce(data->'dna','[]'::jsonb)) k group by k order by 2 desc limit 12) x)
  );
end $$;
revoke execute on function public.admin_project_stats() from public, anon;
grant execute on function public.admin_project_stats() to authenticated;

select 'ok' as projects_ready, (select count(*) from public.projects) as projects;
