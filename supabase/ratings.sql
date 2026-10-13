-- 건축 여행 방문자 별점 (회원만, 장소당 1개, 수정 가능) + 공개 합계 뷰
create table if not exists public.place_ratings (
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  place text not null check (length(place) between 1 and 40),
  stars int not null check (stars between 1 and 5),
  at timestamptz not null default now(),
  primary key (user_id, place)
);
alter table public.place_ratings enable row level security;
drop policy if exists "pr own read" on public.place_ratings;
drop policy if exists "pr own insert" on public.place_ratings;
drop policy if exists "pr own update" on public.place_ratings;
create policy "pr own read" on public.place_ratings for select to authenticated using (user_id = auth.uid());
create policy "pr own insert" on public.place_ratings for insert to authenticated with check (user_id = auth.uid());
create policy "pr own update" on public.place_ratings for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
revoke all on public.place_ratings from anon;
grant select, insert, update on public.place_ratings to authenticated;
create or replace view public.place_rating_stats as
  select place, count(*)::int as n, round(avg(stars)::numeric, 2) as avg from public.place_ratings group by place;
grant select on public.place_rating_stats to anon, authenticated;
