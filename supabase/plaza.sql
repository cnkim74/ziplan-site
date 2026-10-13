-- 광장(피드형 커뮤니티): 게시물 · 좋아요 · 저장 · 댓글 · 팔로우 · 신고 + 이미지 버킷
-- Supabase SQL Editor에서 한 번 실행하세요. 여러 번 실행해도 안전합니다.

create table if not exists public.plaza_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  author_name text check (length(author_name) <= 40),
  kind text not null default '작품' check (length(kind) <= 12),
  title text check (length(title) <= 80),
  caption text check (length(caption) <= 2000),
  tags text[] not null default '{}',
  images text[] not null default '{}',
  school text check (length(school) <= 30),
  year text check (length(year) <= 12),
  anon boolean not null default false,
  crit boolean not null default false,
  use_as_case boolean not null default true,
  created_at timestamptz not null default now(),
  check (coalesce(array_length(images, 1), 0) <= 4),
  check (coalesce(array_length(tags, 1), 0) <= 12)
);
create index if not exists plaza_posts_created on public.plaza_posts (created_at desc);
alter table public.plaza_posts enable row level security;

create or replace function public.plaza_is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','super_admin'));
$$;

drop policy if exists "pp read" on public.plaza_posts;
drop policy if exists "pp insert own" on public.plaza_posts;
drop policy if exists "pp update own" on public.plaza_posts;
drop policy if exists "pp delete own or admin" on public.plaza_posts;
create policy "pp read" on public.plaza_posts for select to anon, authenticated using (true);
create policy "pp insert own" on public.plaza_posts for insert to authenticated with check (user_id = auth.uid());
create policy "pp update own" on public.plaza_posts for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "pp delete own or admin" on public.plaza_posts for delete to authenticated using (user_id = auth.uid() or public.plaza_is_admin());
grant select on public.plaza_posts to anon;
grant select, insert, update, delete on public.plaza_posts to authenticated;

-- 좋아요: post_id는 text — 회원 게시물(uuid)과 도감 게시물('bld:<id>') 둘 다
create table if not exists public.plaza_likes (
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  post_id text not null check (length(post_id) between 1 and 64),
  at timestamptz not null default now(),
  primary key (user_id, post_id)
);
alter table public.plaza_likes enable row level security;
drop policy if exists "pl own read" on public.plaza_likes;
drop policy if exists "pl own insert" on public.plaza_likes;
drop policy if exists "pl own delete" on public.plaza_likes;
create policy "pl own read" on public.plaza_likes for select to authenticated using (user_id = auth.uid());
create policy "pl own insert" on public.plaza_likes for insert to authenticated with check (user_id = auth.uid());
create policy "pl own delete" on public.plaza_likes for delete to authenticated using (user_id = auth.uid());
grant select, insert, delete on public.plaza_likes to authenticated;
create or replace view public.plaza_like_counts as select post_id, count(*)::int as n from public.plaza_likes group by post_id;
grant select on public.plaza_like_counts to anon, authenticated;

-- 저장(북마크): 나만 봄
create table if not exists public.plaza_saves (
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  post_id text not null check (length(post_id) between 1 and 64),
  at timestamptz not null default now(),
  primary key (user_id, post_id)
);
alter table public.plaza_saves enable row level security;
drop policy if exists "ps own" on public.plaza_saves;
create policy "ps own" on public.plaza_saves for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert, delete on public.plaza_saves to authenticated;

-- 댓글
create table if not exists public.plaza_comments (
  id uuid primary key default gen_random_uuid(),
  post_id text not null check (length(post_id) between 1 and 64),
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  author_name text check (length(author_name) <= 40),
  text text not null check (length(text) between 1 and 500),
  created_at timestamptz not null default now()
);
create index if not exists plaza_comments_post on public.plaza_comments (post_id, created_at);
alter table public.plaza_comments enable row level security;
drop policy if exists "pc read" on public.plaza_comments;
drop policy if exists "pc insert own" on public.plaza_comments;
drop policy if exists "pc delete own or admin" on public.plaza_comments;
create policy "pc read" on public.plaza_comments for select to anon, authenticated using (true);
create policy "pc insert own" on public.plaza_comments for insert to authenticated with check (user_id = auth.uid());
create policy "pc delete own or admin" on public.plaza_comments for delete to authenticated using (user_id = auth.uid() or public.plaza_is_admin());
grant select on public.plaza_comments to anon;
grant select, insert, delete on public.plaza_comments to authenticated;

-- 팔로우
create table if not exists public.plaza_follows (
  follower uuid not null references auth.users on delete cascade default auth.uid(),
  followee uuid not null references auth.users on delete cascade,
  at timestamptz not null default now(),
  primary key (follower, followee),
  check (follower <> followee)
);
alter table public.plaza_follows enable row level security;
drop policy if exists "pf read" on public.plaza_follows;
drop policy if exists "pf own" on public.plaza_follows;
drop policy if exists "pf own delete" on public.plaza_follows;
create policy "pf read" on public.plaza_follows for select to anon, authenticated using (true);
create policy "pf own" on public.plaza_follows for insert to authenticated with check (follower = auth.uid());
create policy "pf own delete" on public.plaza_follows for delete to authenticated using (follower = auth.uid());
grant select on public.plaza_follows to anon;
grant select, insert, delete on public.plaza_follows to authenticated;

-- 신고 (관리자만 읽음)
create table if not exists public.plaza_reports (
  id uuid primary key default gen_random_uuid(),
  post_id text not null check (length(post_id) between 1 and 64),
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  reason text check (length(reason) <= 200),
  created_at timestamptz not null default now()
);
alter table public.plaza_reports enable row level security;
drop policy if exists "pr insert" on public.plaza_reports;
drop policy if exists "pr admin read" on public.plaza_reports;
create policy "pr insert" on public.plaza_reports for insert to authenticated with check (user_id = auth.uid());
create policy "pr admin read" on public.plaza_reports for select to authenticated using (public.plaza_is_admin());
grant insert, select on public.plaza_reports to authenticated;

-- 이미지 버킷: 누구나 보기, 회원은 자기 폴더(<user id>/...)에만 올리기·지우기
insert into storage.buckets (id, name, public) values ('plaza', 'plaza', true) on conflict (id) do nothing;
drop policy if exists "plaza img read" on storage.objects;
drop policy if exists "plaza img upload own" on storage.objects;
drop policy if exists "plaza img delete own" on storage.objects;
create policy "plaza img read" on storage.objects for select to anon, authenticated using (bucket_id = 'plaza');
create policy "plaza img upload own" on storage.objects for insert to authenticated with check (bucket_id = 'plaza' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "plaza img delete own" on storage.objects for delete to authenticated using (bucket_id = 'plaza' and (storage.foldername(name))[1] = auth.uid()::text);
