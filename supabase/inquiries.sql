-- ZIPLAN 문의함: 누구나 보내고, 관리자만 읽고 처리
create table if not exists public.inquiries (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id uuid references auth.users(id) on delete set null,
  name text check (char_length(name) <= 60),
  email text check (char_length(email) <= 120),
  kind text check (char_length(kind) <= 30),
  message text not null check (char_length(message) between 2 and 3000),
  page text check (char_length(page) <= 60),
  status text not null default 'new' check (status in ('new','done'))
);
alter table public.inquiries enable row level security;
drop policy if exists "inq: anyone sends" on public.inquiries;
create policy "inq: anyone sends" on public.inquiries for insert to anon, authenticated with check ((user_id is null or user_id = auth.uid()) and status = 'new');
drop policy if exists "inq: admins read" on public.inquiries;
create policy "inq: admins read" on public.inquiries for select to authenticated using (public.is_admin());
drop policy if exists "inq: admins update" on public.inquiries;
create policy "inq: admins update" on public.inquiries for update to authenticated using (public.is_admin()) with check (public.is_admin());
revoke all on public.inquiries from anon, authenticated;
grant insert (user_id, name, email, kind, message, page) on public.inquiries to anon, authenticated;
grant select, update (status) on public.inquiries to authenticated;
select 'ok' as inquiries_ready;
