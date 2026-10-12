-- ZIPLAN 방문 통계 (admin.sql 다음에 한 번 실행)
-- 1) page_views: 익명 방문 기록(쿠키 없음 · 브라우저 임의 ID · IP 저장 안 함). 누구나 쓰기만 가능, 읽기는 관리자 함수로만
-- 2) admin_traffic(days): 관리자만 — 일별 방문, 채널, 인기 페이지, 캠페인, 기기, 이벤트

create table if not exists public.page_views (
  id bigserial primary key,
  at timestamptz not null default now(),
  vid text not null,               -- 브라우저 임의 ID (localStorage)
  sid text not null,               -- 방문(세션) 임의 ID
  path text not null,              -- 해시 경로: home, panel, travel …
  ev text not null default 'pv',   -- pv | signup_open | plan_click | chat_open | course_copy …
  ref_host text,
  utm_source text, utm_medium text, utm_campaign text,
  device text,                     -- mobile | tablet | desktop
  user_id uuid default auth.uid()
);
create index if not exists page_views_at on public.page_views (at desc);

alter table public.page_views enable row level security;
revoke all on public.page_views from anon, authenticated;
grant insert (vid, sid, path, ev, ref_host, utm_source, utm_medium, utm_campaign, device) on public.page_views to anon, authenticated;
grant usage on sequence public.page_views_id_seq to anon, authenticated;
drop policy if exists "pv insert" on public.page_views;
create policy "pv insert" on public.page_views for insert to anon, authenticated with check (
  length(vid) between 6 and 40 and length(sid) between 6 and 40 and length(path) <= 40 and length(ev) <= 30
  and coalesce(length(ref_host),0) <= 120 and coalesce(length(utm_source),0) <= 60 and coalesce(length(utm_medium),0) <= 60
  and coalesce(length(utm_campaign),0) <= 80 and coalesce(length(device),0) <= 10
  and (user_id is null or user_id = auth.uid())
);

-- 유입 경로를 채널로 묶기
create or replace function public.pv_channel(src text, med text, host text) returns text
language sql immutable as $$
  select case
    when coalesce(src,'') <> '' then case
      when lower(src) ~ '(insta|ig)' then '인스타그램'
      when lower(src) ~ '(youtube|yt)' then '유튜브'
      when lower(src) ~ '(kakao|katalk)' then '카카오'
      when lower(src) ~ '(naver|blog)' then '네이버·블로그'
      when lower(src) ~ '(everytime|eta|에브리타임)' then '에브리타임'
      when lower(src) ~ '(thread|x\.com|twitter|facebook|fb)' then '기타 SNS'
      when lower(coalesce(med,'')) in ('email','newsletter') then '이메일'
      else '캠페인: ' || src end
    when coalesce(host,'') = '' then '직접 방문'
    when host ~ '(google\.|naver\.|daum\.|bing\.|search\.yahoo|duckduckgo)' then '검색'
    when host ~ '(instagram)' then '인스타그램'
    when host ~ '(youtube|youtu\.be)' then '유튜브'
    when host ~ '(kakao)' then '카카오'
    when host ~ '(blog\.naver|tistory|brunch|velog)' then '네이버·블로그'
    when host ~ '(everytime)' then '에브리타임'
    when host ~ '(facebook|t\.co|x\.com|twitter|threads)' then '기타 SNS'
    when host ~ '(claude\.ai)' then 'claude.ai'
    else '다른 사이트' end
$$;

create or replace function public.admin_traffic(days int default 30) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare r jsonb; tz text := 'Asia/Seoul'; since timestamptz := now() - make_interval(days => greatest(1, least(days, 365)));
begin
  if not public.is_admin() then raise exception 'not authorized' using errcode = '42501'; end if;
  with v as (select *, public.pv_channel(utm_source, utm_medium, ref_host) as ch from public.page_views where at > since),
  pv as (select * from v where ev = 'pv'),
  first_hit as (select distinct on (sid) sid, ch from pv order by sid, at)
  select jsonb_build_object(
    'generated_at', now(),
    'days', days,
    'views', (select count(*) from pv),
    'visitors', (select count(distinct vid) from pv),
    'sessions', (select count(distinct sid) from pv),
    'views_today', (select count(*) from pv where (at at time zone tz)::date = (now() at time zone tz)::date),
    'visitors_today', (select count(distinct vid) from pv where (at at time zone tz)::date = (now() at time zone tz)::date),
    'visitors_7d', (select count(distinct vid) from pv where at > now() - interval '7 days'),
    'member_views', (select count(*) from pv where user_id is not null),
    'daily', coalesce((select jsonb_agg(jsonb_build_object('d', d, 'n', n, 'u', u) order by d) from (
        select g::date as d, (select count(*) from pv where (at at time zone tz)::date = g::date) as n,
               (select count(distinct vid) from pv where (at at time zone tz)::date = g::date) as u
        from generate_series((now() at time zone tz)::date - (least(days,90) - 1), (now() at time zone tz)::date, interval '1 day') g) t), '[]'::jsonb),
    'channels', coalesce((select jsonb_agg(jsonb_build_object('k', ch, 'n', n) order by n desc) from (select ch, count(*) n from first_hit group by ch) t), '[]'::jsonb),
    'pages', coalesce((select jsonb_agg(jsonb_build_object('k', path, 'n', n, 'u', u) order by n desc) from (select path, count(*) n, count(distinct vid) u from pv group by path order by n desc limit 20) t), '[]'::jsonb),
    'campaigns', coalesce((select jsonb_agg(jsonb_build_object('src', s, 'med', m, 'camp', c, 'n', n, 'u', u) order by n desc) from (
        select utm_source s, utm_medium m, utm_campaign c, count(distinct sid) n, count(distinct vid) u from pv where utm_source is not null group by 1,2,3 order by n desc limit 20) t), '[]'::jsonb),
    'referrers', coalesce((select jsonb_agg(jsonb_build_object('k', ref_host, 'n', n) order by n desc) from (select ref_host, count(distinct sid) n from pv where ref_host is not null group by ref_host order by n desc limit 12) t), '[]'::jsonb),
    'devices', coalesce((select jsonb_agg(jsonb_build_object('k', coalesce(device,'?'), 'n', n) order by n desc) from (select device, count(distinct vid) n from pv group by device) t), '[]'::jsonb),
    'events', coalesce((select jsonb_agg(jsonb_build_object('k', ev, 'n', n) order by n desc) from (select ev, count(*) n from v where ev <> 'pv' group by ev order by n desc limit 20) t), '[]'::jsonb),
    'hours', coalesce((select jsonb_agg(jsonb_build_object('h', h, 'n', n) order by h) from (select extract(hour from at at time zone tz)::int h, count(*) n from pv group by 1) t), '[]'::jsonb)
  ) into r;
  return r;
end $$;
revoke execute on function public.admin_traffic(int) from public, anon;
grant execute on function public.admin_traffic(int) to authenticated;
