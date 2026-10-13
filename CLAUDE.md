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
- 로고(2026-10-13 최종): 처음 마크(Z + ㅣ + 파란 P = "ZIP"이자 "집") 기반, Z만 두께 맞춘 단단한 Z로 재설계(`M4 6H56V16L23 38H56V48H4V38L37 16H4Z`), 파란 P는 원래 그대로. 워드마크는 이전안 그대로 Archivo Black 글꼴 "ZI**P**LAN"(P 파랑) — 사이트는 웹폰트 텍스트, 로고 파일은 같은 글꼴을 아웃라인으로(`brand/archivo_ziplan.json`, @fontsource/archivo-black에서 추출). 기하 글자 시안(`wordSVG`)은 사용자가 거절. 원본 파일은 `brand/`(`build_logo.py`로 SVG 생성, `png.js`로 PNG) — favicon·apple-touch-icon도 여기서. 사용자는 P 단독·지붕 ㅈ 시안보다 이 방향을 선택
- 상단 메가 메뉴: `NAVG`(시작하기·설계하기·보여주기·둘러보기·함께하기) → `buildNav()`가 `.ngb` 버튼과 `#mega` 패널(아이콘·설명·오른쪽 특집 카드) 생성, 모바일 `#navMenu`도 같은 데이터. 현재 방 표시는 `navCurrent(h)`
- 컨셉 마법사 `#cwWrap`(컨셉 방 맨 위): 4단계 — 용도 `CWP`(아이콘) → 대지 성격 `CWS`(사진) → 느낌 최대 3개 `CWF`(사진, 갈래 가중·우리말·한자·영어) → 하루 `CWD` → `cwScore`로 DNA_ARCH 12갈래 중 3안. 결과: 무드보드(PH 사진), 대지→볼륨→조작→결과 다이어그램, 이름 후보 6개 `cwNames`(한 단어·문장형·짝 이름·한옥 당호형 明階堂·영문·제목형, ↻로 바꾸기), 흰 모형 `wmMount`, '이 컨셉으로 시작' `cwApply`(state.title/concept/keys/use/conceptPick 채움), 보드 복사
- 패널 랩: 레이아웃 9종(hero·band·process·grid·poster·split·axo·story·minimal), 무대 샘플 이미지 `PSAMPLE`, 수상작 공통점 `PLESSON` 10개, `panelDiag()` 3초 진단, 공모전 달력 `COMPS`(국내 4·해외 7, 일정은 해마다 바뀜 — 매년 갱신 필요). reveal IO는 threshold 0으로(키 큰 요소가 안 나타나던 버그 수정)
- 건축 여행 `#travel`(2026-10-13 개편): `TPL` 32곳, 사진 `PH`(Wikimedia Commons 자유 라이선스 37장 — [썸네일 URL, 파일 페이지, 작가, 라이선스], `phImg/phSrc/phCredit`, 정식 사이트에선 `/_vercel/image`로 최적화, 실패 시 원본). Commons는 컨테이너/WebFetch에서 막혀 있어 사용자 Chrome에서 `commons.wikimedia.org/w/api.php?...&origin=*`로 찾았음. 썸네일 폭은 표준값(330·1280·1920 등)만 됨. PH[4]=원본 폭, 원본이 1920 넘으면 1920px 썸네일을, 아니면 원본을 소스로 — `phSet` srcset 384~1920(q80)
  - 표지 `#tvCover` 사진 기둥 시차, 숫자 세기, 챕터(지역별) 헤더 + 첫 카드 가로형(feat), 사진 clip-path 등장, 별·막대 채우기(`tObserve`)
  - 지도: Leaflet 1.9.4(cdnjs, 지연 로드) + OSM 타일(CSS 필터로 흑백/다크). CARTO는 API 키 필요해서 안 됨. 사진 원형 마커, 팝업 카드, 경로 점선. `TV.focus` reg/route
  - 별점: 에디터 주관 평가 `TSC`[공간,빛,재료,찾아가기] → `tScore`; 방문자 별점 `place_ratings`(회원만 upsert) + 공개 뷰 `place_rating_stats` — `supabase/ratings.sql` 적용됨(2026-10-13)
  - AI 근처 코스 `tNear`(위치 or 출발역 `TORIG`, 반나절/하루/1박2일, 거리-평점 탐욕) + 소개 글 `tAiText`(claude.ai면 sample, 아니면 `tAiLocal` 템플릿)
  - 코스 짜기 `tPlan`/`TCOURSE` 유지(사진 버튼·사진 타임라인)
- 컨셉 3D 매스(2026-10-13): 결과 카드 `.cw-viz`에 three.js r128(cdnjs, `t3Load` 지연) — `m3Build(THREE,id,prog)`가 DNA_ARCH 12갈래별 건물 생성기(중정·계단 테라스·필로티·마을·평지붕 판·벽돌·처마 등), `m3Mount`: 그림자·ACES·sRGB→linear 색, 드래그 회전·휠 줌·자동 회전, 버튼 회전/위/눈높이·낮밤·해 각도 슬라이더·PNG 저장. 디버그 `window.__m3`. 헤드리스 테스트는 three.min.js를 로컬로 라우팅 + `--use-gl=swiftshader`
- 건축 사전 `ENC`(47개, 공간/구조/환경/법규/한옥/도면/재료) + SVG 도해(`ES/EG/ENCD`), `encFind(q)`·`encCard`. 챗봇 `zcAsk`가 먼저 사전 검색 → `{r:'b',enc:id}` 카드(도해+쉬운 설명+더 알아보기). 라이브러리 `#encLib`(검색·분류·모달)
- 여행 상세(tv3): 카드·팝업 "자세히" / 카드 제목 → `tDetail(id)` 오른쪽 서랍(모바일은 아래 시트) — 사진, 평점, `TFEAT` 건축 포인트 3개, 매스 도식, 근처 맛집 `EAT`/`TEATP`(카카오맵 장소 ID는 PlayMCP 카카오맵 검색으로 확인한 것만 `KM(id)`, 나머지는 `KS(검색어)`), 카카오 길찾기 `map.kakao.com/link/to/이름,lat,lon`. 코스 점심 줄에 직전 장소 맛집. 지도 도구 `tMapTools`: 차분한/기본/위성(Esri World_Imagery) `tStyle`, ▶ 지도 투어 `tTour`, 전체 화면 `.tv-mapbox.full`. 헤드리스 테스트는 leaflet을 로컬 npm 패키지로 라우팅(cdnjs 막힘)
- 여행 확장(2026-10-13 오후): `TPL` 61곳 — 지역 8개(`TREG`에 chungcheong 충청·대전, jeolla 전라·광주 추가). 새 29곳(국립중앙박물관·시청·경회루·석조전·명동성당·세운상가·북촌·남한산성 행궁·선교장·오죽헌·이응노미술관·돈암서원·외암마을·개심사·소쇄원·전동성당·전주한옥마을·선암사·화엄사 각황전·계산성당·동궁과 월지·석굴암·임청각·감천마을·통도사·촉석루·해동용궁사·클레이아크·성읍마을) 모두 Commons 사진 있음. 뮤지엄 산 사진 추가(Museum SAN.tif → lossy-page1-1920px 썸네일). 송은·미메시스·사유원·유민미술관은 상업 이용 가능한 자유 라이선스 사진이 없음(Openverse엔 NC/ND만) → 그림 썸네일 유지. 원본 데이터 스크립트는 세션 스크래치(newplaces.py)
  - TPL 끝은 `].map(a=>({id:a[0],...}))` — `\n];`가 아님(TCOURSE와 헷갈리지 말 것)
- 지도 v2: MapLibre GL 4.7.1(jsdelivr) + OpenFreeMap 벡터 스타일(키 없음; calm=positron/다크면 dark, color=liberty, sat=Esri 래스터). `tStyleJSON`이 스타일 JSON을 받아 text-field를 `name:ko→name:nonlatin→name`으로, 3D 건물 `b3d` fill-extrusion(z14+) 추가. `tMapGL`: 사진 마커(`.tvm.gl`, 줌 따라 z-lo/z-hi로 크기·이름표), MapLibre 팝업 `tPopHTML`, 경로 GeoJSON `tvr`(점선 흐름 애니메이션 `TDASH`), 3D 버튼(`#tv3d`, 피치 60), 투어는 피치·회전 비행. `tFly(p,z)`/`tResize()`가 GL/Leaflet 공용. WebGL 없거나 스타일 실패 → `tMapLeaflet`(기존) 자동 대체
  - 백그라운드 탭에선 rAF가 멈춰 지도 캔버스가 비어 보임(스크린샷 찍을 때만 그려짐) — 정상
- 취향 랩 v2(2026-10-13 밤): 단어 274개(감각·동선·색·건축가처럼 4분류 추가). 생성기 PG: `pgSpec(keys,{base,mode})` → 프로그램(`PG_PROG`)·외피(`PG_SKIN` 24종, 캔버스 텍스처 `pgTex`)·창(`winRects` 9종)·지붕(평/풀/박공/가파른/외쪽/톱날/볼트/기와 곡선 `pgSurf`/큰 지붕/슬래브)·조작(`PG_OPT` 40여 개)·대지(평지/경사/물가/바다/숲/산/도심/골목/들판/마을)와 결정 로그 `P.log`. 단어→결정 표 `PGK`(같은 항목이면 재료·빛 분류가 건축가·감각 분류보다 우선). `pgBuild`가 층별 그룹(올라오는 애니메이션·층 펼치기)·인스턴스 창/핀·사람/나무까지 짓고, `PGV(el,opt)` 뷰어(흰 모형·밤·해·시점·PNG·dispose), `pgThumb` 화면 밖 썸네일
  - 화면: 고르는 동안 오른쪽 라이브 모형(`dnaLive3D`, 모바일은 위에 붙음), 결과는 A 정석·B 혼합(둘째 방향 조작 추가)·C 실험(외피 반전·지붕·캔틸레버) + 스크롤 다섯 장면(대지→흰 덩어리→흰 모형→재료→사람, `DN_STAGE`), 개략 사양 표, 아홉 갈래 썸네일(`dnVarThumbs`), 내 기록(`zip_dna_lib` + 썸네일 `zip_dna_th_<id>`, state.dnaLib로 계정 동기화)
  - 디버그: `window.__pgTest(keys,base,mode)` 전체 화면 모형
- 취향 랩 v3(2026-10-14): 단어 293개(건축가 16명 + 박물관·고층 타워·공연장). 대지 지형 `Hf(x,z)` 높이장 + 평탄 패드, 주변 환경 선택 `[data-dnsite]`(평지·도심·골목·신도시·마을·숲·경사지·산자락·호숫가·바닷가·들판; `DV.site`) — 결과 무대 바와 라이브 패널 둘 다. 정렬 다듬기(층 어긋남은 x ±W*.14만, 캔틸레버는 윗판 확장, 슬릿창 층마다 일정, 도심 이웃은 카메라 쪽 비움, 물은 건물 뒤)
- 건축 도감 `#dnAtlas`: `BLD` 143채 [id,이름,건축가,연도,도시,지역 kr/asia/me/eu/am/oc,시대 t/m/c,단어[],한 줄,커먼즈 경로 a/ab/파일,원본 폭,라이선스,작가] → `BLDX`. 사진 123장(위키백과 대표 이미지 → 커먼즈 자유 라이선스만, NC/ND 제외), 없으면 `pgThumb` 모형. `bldImg(b,w)`(500/1280 썸네일, tif는 lossy-page1), 카드 hover 시 단어로 지은 모형으로 전환, 모달 `bldOpen`(사진 크레딧·같은 단어 모형·같은 건축가·닮은 건물), "이 건물처럼 지어 보기" `bldBuild(id)` / 더하기. 결과 안 "닮은 실제 건물" `bldTwinHTML()`(겹치는 단어×3 + 같은 갈래 가산). 데이터 원본: 스크래치 `bld.py`·`bldphotos.txt`·`mkbld.py`. 테스트 훅 `window.__atlas`
- 취향 랩 v4(2026-10-14 새벽):
  - 흐르는 단어 띠 `#dnMarqBox`(`MQ`, `dnMarqInit/Tick/Sync`): 두 줄이 계속 흐르고 스크롤 속도만큼 빨라지며 기움(skewX), 마우스 올리면 느려짐, 단어 누르면 `dnaToggle`로 바로 고름. 화면 밖·다른 탭이면 rAF 멈춤
  - 도감 표지 `#dnatCover`(`dnCoverHTML`, `dnCoverPar`): 건축여행 `.tv-cover` 클래스 재사용 — 기운 사진 기둥 시차 + 숫자 세기. 도감 본문은 `.dnat-in`
  - 성능: `PGV`는 필요할 때만 그림(`poke(n)`, 자라는 중·회전·트윈·드래그일 때만 rAF), 그림자 `shadowMap.autoUpdate=false`(바뀔 때만 needsUpdate), 자동 회전만이면 30fps, 픽셀비 최대 1.5, preserveDrawingBuffer 끔(png()는 렌더 직후 toDataURL). 칩의 상시 backdrop-filter·`.dncat::before` 애니메이션 제거, `content-visibility:auto`, `pgThumb`은 스크롤 중 미룸(`window.__zScrollT`), 셰이더 segments 96
  - 모형 디테일: 단단한 벽 창은 어두운 유리 `M.glassW`(인스턴스 `userData.m0`로 밤/낮 복귀), 창턱, 층 띠, 기단, 홈통, 문틀·계단·벽등, 다세대·공유·기숙사·스테이는 발코니(`BALC`), 파라펫 두겁, 옥상 환기구·천창·옥상정원 난간, 앞마당 벤치·화분·볼라드 조명. 입구 앞 큰 창은 지우지 않고 문 양옆으로 자름(`pgDoorCut`, 3D·평면·입면 공통)
  - 도면 `#dnDrawSec`: `pgDrawSet(P,B)` → 배치도 `pgSiteSVG` / 층별 평면 `pgPlanSVG`(벽 포셰·창·문 호·코어 계단+WC·방 나누기 `pgSplit` + 용도별 실 `PG_ROOMS`·가구 `pgFurn`·그리드·치수·방위) / 단면 `pgSectionSVG`(박공은 용마루에 직각으로 자름, 레벨·사람·나무) / 정면도 `pgElevSVG`(재료 무늬 패턴, 지붕, 창). 창 규칙 `pgWin`은 3D `winRects`와 같은 규칙. SVG·PNG 받기, "도면 작업대로 보내기" `dnDrawSend` → zRooms·zFloor·secHeights 채우고 localStorage `zip_dna_draw` → 도면 방 `#dwFromDna`(`dwFromDna()`)
  - 도감 사진 128장(로이드·MAXXI·아크로폴리스·하르파·ACC 추가, 커먼즈 카테고리 검색). 남은 15채는 자유 사진 없음(프랑스·이탈리아 현대 건축은 파노라마 자유 없음)
- 힉스필드 크레딧: 무료 요금제 잔여 3.4 — 업스케일(2크레딧/장)으로 로컬 이미지(alt-*, p-*, pn-*) 개선은 보류
- 로컬 저화질 AVIF(img/f-*) → 정식 사이트에선 `HF` 맵으로 힉스필드 원본 PNG를 /_vercel/image로(`hfUp` MutationObserver, 패널 시트는 `hqs`)
- 사례 카드·모달: `casePh(c)`로 사진 + 아이소 썸네일 배지
- 홈: `#homeTrips` 사진 레일(무한 흐름), `#faq`(details), 전체 검색 `zsOpen`(⌘K / Ctrl+K / '/', 페이지·여행지·사례·공모전·용어)
- 방문 통계: `supabase/analytics.sql` 적용됨(2026-10-13) — `page_views`(익명 vid/sid, 쿠키·IP 없음, DNT 존중, insert만) + `pv_channel()` + `admin_traffic(days)`. 클라이언트 `ZT`(정식 https 사이트에서만, claude/localhost 제외). 이벤트: signup_open, plan_click, chat_open, course_copy, course_preset
- 관리자 탭: 개요(목표 링·깔때기·할 일) / 유입·채널(일별·채널 도넛·방·리퍼러·기기·캠페인·시간대·행동) / 수익(결제 연동 전 시뮬레이터, localStorage `zip_rev`) / 채널 관리(UTM 생성·저장 `zip_utm`, 채널 보드) / 회원·콘텐츠 / 문의함
- 주의(2026-10-14): 메인 스크립트는 큰 IIFE 하나 — 실행 중에 동기로 부르는 초기화(예: 채팅 `zcRender`)가 뒤에 선언된 const(ENC, DN_CATC 등)를 읽으면 TDZ 오류로 스크립트 전체가 멈춤. localStorage 상태(예: zip_chat에 사전 카드)에 따라서만 터지므로 초기화 호출은 setTimeout+try로
- 테스트 주의: nav-glass(html2canvas)가 헤드리스에서 큰 페이지 캡처 중 멈춤 → Playwright에선 /html2canvas/ 라우트 차단
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
