# ZIPLAN 집플랜 — 모두의 건축 (작업 인수인계)

건축학과 학생·실무자용 AI 작업대 + 일반인 입구 사이트. 단일 파일 `crit.html`(해시 라우팅, 의존성 거의 없음).

## 배포 경로
- 소스: 이 저장소 `cnkim74/ziplan-site` — 로컬 브랜치 `master`, 원격 `main`
- 공개 빌드: `python3 build_public.py` → `dist/` (index.html + 필요한 img/effects/vendor만 복사, 없는 파일은 경고 후 건너뜀)
- 배포: `git push origin master:main` → Vercel 프로젝트 `ziplan-site-dist` (https://ziplan-site-dist.vercel.app)
  - 2026-10-12 기준 GitHub 웹훅이 자동 배포를 안 띄운 적이 있음. 안 뜨면 Vercel 대시보드에서 Redeploy, 또는 Vercel MCP `create_deployment`(gitSource github / cnkim74 / ziplan-site / main / sha)로 수동 배포
- claude.ai 아티팩트 판: https://claude.ai/artifact/5akMjPgFWTXZzZtt2UVcE1 (v30). 아티팩트 안에서는 claude.ai 계정 로그인 모드로 동작

## 페이지 구성 (crit.html 위→아래)
- 히어로: ShaderGradient 바닐라 포팅(`effects/shader-gradient.js`, `SG.mount(el,opts)`, `SG.lerp`) — canvas.sgbg z-index -1이라 부모에 stacking context 필요
- `.intro` 다음 `#film`: 스크롤하면 가로로 넘어가는 설계 과정 필름 7컷 (img/f-site, f-sketch, f-plan, f-mass, f-model, f-build, f-home .avif — 힉스필드 생성)
- 빌드 → 패널 전환 장면: 관성 스무딩 `cur += (target-cur)*(1-(1-0.16)^(dt/16.7))`. `PANELS`는 IIFE보다 뒤에 선언되므로 IIFE 안에서 참조 금지(TDZ)
- PANELS 보드: `photo()` 헬퍼, 보드6 메인 사진은 house-dusk.jpg(빌드 장면 사진과 일치해야 함), 컷 = pn-persp / f-home / pn-aerial
- 사례(learn): `CTHUMB` SVG 아이소 썸네일, 조회·좋아요·저장, 정렬(관련도 rel / views / likes / base), 관련도 = 내 컨셉 토큰과 태그 겹침(+동의어 `SYN`), `#caseM` 상세 모달
- "고를수록 [단어] 당신을 닮는다" 장면 — 사용자가 매우 좋아함. 유지
- 요금 `#pricing`: 재학생 띠 `#stuBand`(−60%), 스튜디오 9,900→3,900, 프로 29,000→14,500, 학교 "곧 열립니다"
- 마지막 `<script>`: 필름 드라이버, 학생 띠 셰이더, 가로 리본(.ribbonx)

## 회원 (Supabase)
- 프로젝트: ref `zxxcpbzlwxfqgzqcealg` (사용자 본인 Supabase 계정, Claude의 Supabase 커넥터 계정과 다름 → MCP로 접근 불가, 대시보드 작업은 사용자가 직접)
- (예전에 만든 `ycvikhmfcxgggutdvued`는 cnkim74@me.com 조직 소속, 사용 안 함)
- crit.html의 `window.ZIPLAN_AUTH={url,key}`에 URL과 publishable 키가 들어가 있음(공개용 키)
- `authMode()`: 'claude'(claude.ai 안) / 'server'(Supabase, supabase-js@2.45.4 UMD를 jsdelivr에서 지연 로드) / 'local'(체험, localStorage)
- 스키마: `supabase/schema.sql` — profiles(+가입 트리거), case_saves, case_likes(본인만), case_views + `bump_case_view` RPC, `case_stats` 뷰
- 관리자: `supabase/admin.sql` — profiles.role(user/admin/super_admin)+email, role 컬럼은 클라이언트가 못 씀(컬럼 grant), `admin_stats()`·`admin_set_role()` RPC는 관리자만. 최고 관리자 = killerzoz0728@gmail.com. 화면은 `#admin`(사용자 팝오버의 "관리자 페이지"), `renderAdmin()`
- 취향 랩 `#dna`: `DNA_CATS`(9분류 ~220단어, "이름|축|갈래 가중|색") → `dnaAnalyze()` 6축(o v l n f x) + 12 갈래(`DNA_ARCH`) 점수 → 페르소나·코드(IVMN 등)·팔레트·추천 사례. `dnaConcepts()`가 컨셉 3안 생성. 썸네일은 `CTHUMB.kind(shape)`
- ZIPLAN 엔진 `LOCAL_AI`: claude.ai sample이 없으면 같은 프롬프트를 첫 문장으로 판별해 규칙 기반 답(컨셉·조닝·패널 문장·면적 검토·내집코드 설명/브리프·텍스트 도구). 이미지 크릿만 비활성
- 작업실 `#studio`: 프로젝트 여정 7단계(`ROOMS`, `roomDone`), 여러 프로젝트(`PROJ`, localStorage `zip_projects`/`zip_p_<id>` 자동 저장 + 회원이면 Supabase `projects` 테이블), 히어로 셰이더 색은 DNA 1순위 갈래 팔레트
- `supabase/projects.sql` 적용됨(2026-10-13): projects 테이블 + `admin_project_stats()`
- 홈 필름 `#film`: 책장 넘기기(카드가 rotateY로 왼쪽 축에서 넘어감). 이미지는 Vercel 이미지 최적화 `/_vercel/image?url=<히그스필드 원본 PNG>&w=…` (dist/vercel.json `images.remotePatterns`에 cloudfront), 실패하면 `data-fb` 로컬 AVIF로
- 방 표지 `RHERO`: 영어 단어가 가운데 글자(.c)에서 양옆으로 조립(`rhAssemble`) + 방별 색 리본(`.ribbonx.rroom`). 기존 `.hero`를 JS가 교체
- 실험실(로그인 불필요): 대지 `drawSunLab`(위도 36.5° 일조·그림자·남쪽 이웃 그늘·바람), 컨셉 `drawConceptLab`(12갈래 4장면), 도면 `bubbleInit`(관계 다이어그램 힘 배치), 모형 `drawModelLab`(층 펼치기·재료·용적률 링). 라우트에서 `roomLabs(h)`
- 자료실 맨 위 `.openhub`: 가입 없이 쓰는 것 모음
- 채팅 `#zchat`(리퀴드 글래스): AI 길잡이(`KB`+사례+갈래 검색, claude.ai면 sample) + 문의하기 → Supabase `inquiries`(supabase/inquiries.sql 적용됨) → 관리자 페이지 문의함
- 흰색 블록 모형 `wmRender`(임의 각도 회전 등각, 끌어서 회전, `CTHUMB.boxes(kind)`) — 취향 랩 결과 `#dnWm`
- 법규 볼륨 `drawLawLab`/`lawCheck`(모형 페이지): 건폐율·용적률·정북 일조 사선(주거지역: 10m 이하 1.5m, 초과 높이/2)·높이 — 개략
- 콘타 `drawContour`/`ctExport`(대지 페이지): 합성 지형(경사·언덕·구릉·골짜기) → marching squares 등고선 → 적층 등각 + 레이저 커팅 레이어 SVG(mm, 빨강 자르기·파랑 새기기)·등고선 평면 SVG
- 학생 판별: `SCHOOL_RE` = ac.kr / edu / edu.xx / ac.xx 메일

### 남은 할 일 (2026-10-12 기준)
- ✅ 2026-10-13: schema.sql + admin.sql 적용, Google 로그인 작동, killerzoz0728@gmail.com = super_admin, 관리자 페이지 확인됨
- 주의: GitHub 웹훅 자동 배포가 늦게/옛 커밋으로 덮어쓰는 일이 있었음 → 배포 후 `list_deployments`로 최신 sha가 production인지 확인
4. 기본 메일은 시간당 발송 제한 — 가입자 늘면 커스텀 SMTP

## 작업 습관
- 수정 후: `python3 build_public.py` → 커밋 → `git push origin master:main` → (필요시) 아티팩트 재게시
- 새 이미지를 추가하면 `build_public.py`의 복사 목록에도 넣을 것
- 이미지는 AVIF(q25–45)가 WebP보다 훨씬 작음
- 확인은 Playwright로 데스크톱(1440) + 모바일(390) 스크린샷
