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
- 컨셉 방 v2(2026-10-14): 마법사 결과·매스 조작 도감 모두 취향 랩 생성기(PG) 사용 — 예전 `m3Mount`(three r128 블록)·`CTHUMB` 장면은 더 안 씀
  - 공용: `PGVR[id]`(뷰어 등록) + `pgvMount(id,el,make,onBuilt)`, 도구 막대 `pgToolsHTML(id)`(흰 모형·밤·층 펼치기·시점·주변 환경·해·PNG, `data-pgt`), 땅 바꿔 보기 `pgSiteStripHTML/Fill`(10곳 썸네일), 도면 칸 `pgDrawPanelHTML/pgDrawPanel`(`PDW`), `archKeys(id)`(갈래별 대표 단어). `pgThumb` 캐시 키에 `P.tag`·폭 포함
  - 매스 조작 도감 `drawConceptLab`: 12갈래 탭(생성기 썸네일), 큰 3D(`#clV3`, sticky) + 네 장면 버튼(대지/덩어리/조작/완성 = PGV stage site/mass/clay/full, 자동 순환 `clAuto`), 직접 만지기 `CLC.o`(층수·폭·깊이·층고·외피·지붕·창·조작 31종 `CL_OPS`, 무작위·초기화·취향 랩으로), 아래 `#clExt`(땅 바꿔 보기·도면·사양·닮은 실제 건물)
  - 마법사: 고른 것 → 단어 `cwKeys()`(`CW_KW`), `cwMount(i)` — 3D·도구·수치 줄, 결과 아래 `cwExtHTML(i)`(땅·도면·사양·닮은 건물·취향 랩에서 이어 짓기)
  - `bldBuild`는 #dna가 아니면 먼저 이동
- 2026-10-14 새벽 v5:
  - 컨셉 레시피 `CREC_RAW` 44개(세계 거장 12 · 시대 양식 10 · 한국 건축 9 · 요즘 흐름 13) — [id,이름,감정(새롭다/트렌디하다/한국스럽다/시적이다/대담하다/고요하다/따뜻하다/유쾌하다),출처,출처 이름,한 줄,이야기,왜 새로운가,설계 수 3,도감 id,단어,생성기 덮어쓰기 o{add,skin,roof,win,F,W,D,fh,site,accent},색 3]. 엔진 `crecScore/crecPick`(겹치는 단어·갈래·6축 벡터·대지, 감정마다 하나), `crecSpec`(사용자 용도·대지 단어 유지 + 레시피 단어 + 덮어쓰기), UI `crecHTML(id)/crecRender(id,keys,site)/crecOpen` — 카드 6장(생성기 썸네일) + 상세(3D·도구·이야기·참고 건물·도면) + 레시피 도감 전체. 컨셉 방 `crecConcept()`(마법사 아래, 마법사 결과·취향 단어 반영), 취향 랩 결과 `crec_dn`. 단어 검증 스크립트: 스크래치 chk.js
  - 포트폴리오 방 `renderPfPlus()`: 표지(사진 기둥) · 진로 지도 13갈래 `PF_PATHS`(비전공 OK 표시) · 연봉 범위 막대 `PF_PAY`(한국고용정보원 직업정보 2023 조사, 어디가에서 열람한 하위25/중위/상위25·만족도) · 비교 카드(희림·삼우 평균 연봉 캐치 2026, 10대 건설사 2025 평균 아주경제, 2026 공무원 봉급표, BLS·Dezeen Pay 100·AIA) · 예시 경로 6(가상, 실존 인물 아님) · 12쪽 포트폴리오 해부 `PF_ANAT` · 비전공자의 길 `PF_ALL`. 숫자는 해마다 갱신 필요
  - 관리자 운영실: 머리 그라데이션 + 상태 칩(`admHeadPaint`), 탭 추가 — 등급·요금 `admPlanRender`(플랜 6 `ZTIER`, 활동 등급 5 `ZGRADE`, 점수 규칙 `ZPTS`, 전환 깔때기, 페이월 원칙, `admin_plan_stats`), 수익화 전략 `admGrowthRender`(북극성·수익원 8 `ADM_REV`·단위 경제 계산기·학사 일정 캘린더·12개월 로드맵·위험), 운영 가이드북 `admGuideRender`(10장 체크리스트, localStorage `zip_guide_chk`, 매일/매주는 기간 바뀌면 초기화). 로컬 미리보기: `localhost/dist/index.html?admdemo=1#admin`(예시 데이터, localhost에서만)
  - 회원 등급: 활동 점수 `zPoints()`(방문일 `zip_days`·프로젝트·기록·저장) → `zGrade` — 사용자 팝오버 `zGradeHTML()`, 요금 아래 `#zGradeBox`. 계정 저장은 `supabase/tiers.sql`(plan·plan_until·points, `admin_plan_stats`, `admin_set_plan`) — 아직 미적용, 사용자가 Supabase에서 실행해야 함
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

## v6 — 도감 398채 + 카테고리/테마 (2026-10-14, 99d611c)
- BLD 143→398채(57개 나라), 사진 364장(위키미디어 공용 자유 라이선스만, 프랑스·한국 등 파노라마 자유 없는 현대 건물은 로컬 non-free라 제외 → 모형 표시).
- 데이터 파이프라인(scratch): bld.py(B) + bld2.py(B2, 184) + bld3.py(B3, 71) → mkbld2.py(사진을 id 키로 병합: bldphotos.txt는 B 인덱스, bldphotos2.txt는 id) → bld.js를 `const BLD=[`…`];`에 교체.
- BLD_REG에 af(아프리카) 추가. 나라 = city 콤마 뒤, 콤마 없으면 reg kr→한국, 아니면 city 자체(싱가포르·홍콩·바티칸·예루살렘).
- 모듈(atlas3, `/* 도감 */ const ATL` 바로 앞): bldCountry/bldYearN/bldArchs/bldEraB/bldUses, BLD_CON(20 컨셉=키워드 묶음), BLD_USE(9 용도=이름 정규식+키워드), AT_PAT(SVG 타일 ~38종), AT_TH(나라·지역 r_·컨셉 c_·시대 e_·용도 u_ 테마: [제목,영문,한줄,[bg1,bg2,포인트,잉크],패턴,효과,효과색,(패턴색)]), 건축가는 주 활동국 팔레트+모노그램(AT_ARCH 한 줄 소개).
- UI: 탭(나라/지역/건축가/컨셉/시대/용도) + 칩 → #dnatTheme 배너(패턴 원형 와이프, 글자 스태거, 사진 4장 딜, 통계) + atFx 캔버스 파티클(petal/snow/dust/spark/confetti/rain/bokeh/windows/shapes/bubble/leaf/rays/ripple/lines/gold/plexus/aurora/streak; 보일 때만 rAF, reduced-motion 정지). 모달의 나라·시대·건축가는 data-atgo로 해당 카테고리 이동.
- 테스트: p29/tatlas3.js (구 tatlas.js는 data-atreg 제거로 마지막 단계 타임아웃 — 정상).

## v7 — 도감 809채 · 내집코드 v2 · 대지 답사 키트 · 광장 v2 (2026-10-14 오전)
- 도감: bld4a.py(B4A 178, 아시아·중동·아프리카·한국) + bld4b.py(B4B 233, 유럽·아메리카·오세아니아) 추가 → 809채·85개 나라, 사진 752장. 사진 목록 bldphotos4.txt(id 키), 빌드는 mkbld3.py. 파일명은 사용자 Chrome에서 pageimages→commons imageinfo, 해시 대조로 검증. 새 나라 테마 12개(벨기에·베트남·네팔·우즈베키스탄 등), 나머지는 지역 테마로.
- 내집코드 v2(`zc2`): ZONES 21개 [id,이름,법정 건폐율,법정 용적률,코드,무리,색,서울 조례 예 건폐율,용적률,설명] — 기존 id(r1,r2,r3,semi,central,general,nbhd,semiind,plan,farm) 유지. ZUSE 8용도, ZC_OK 용도지역×용도 개략표, ZC_EX 예시 땅 6. `zcModel(z)`: 건축선 후퇴(도로<4m), 정북 일조(주거지역 10m 이하 1.5m·초과 h/2)로 층 깊이 줄이기, 다가구 3·다세대 4층(+필로티), 주차(용도별 법정 기준 개략), 세대·공사비(개략). 화면: 코드 카드, 사실 8칸, 생성기 3D 세 대안(`zcSpec`, pgvMount 'zc'), 단면 SVG(사선)·층별 막대, 걸리는 것 체크, AI 묻기(`zcAsk`: claude.ai면 sample, 아니면 `zcLocal` 규칙 답), 아래 배우기(`zcLearn`: 21지역 표·용도 규칙·규칙 12장 그림·체크리스트·로드맵·공식 사이트·도감 주택·FAQ). 홈 타일용 `zcMassSVG` 유지. readZc에 use/roadW/roadDir/pil/base 추가.
- 대지 답사 키트(`svRender`, #svKit — 대지 방 아래): 탭 대지 답사/건물(사례) 답사/현장 도구/답사 노트. 준비물 8·체크 33(분류별 메모)·촬영 리스트 14(SVG 구도)·사례 답사 10, 도구: 나침반(DeviceOrientation, iOS 권한), 해 위치(NOAA 간이식 `svSunPos`), 소음(마이크 상대 dB), 걸음 재기, 위치(카카오맵·로드뷰 링크), 빠른 노트+사진. 저장 localStorage `zip_sv`. AI 정리(sample 또는 `svLocalRead`), 메모의 방향 단어로 대지 조건 반영, 인쇄용 체크리스트.
- 광장 v2(`pz*`): 인스타형 — 스토리(회원 최근 + 도감), 작성 창(사진 4장·종류·크릿 요청·익명), 피드 카드(캐러셀·더블탭 좋아요·저장·공유 링크 ?pz=id·AI 크릿/해설·댓글), 탐색 그리드, 주간 챌린지 `PZ_CH`(주차로 순환), 저장함, 내 게시물·등급. 공식 게시물: 'ZIPLAN 도감'(도감 사진, 출처 표기)·'ZIPLAN 에디터' 팁(SVG 카드). 저장소: claude.ai db / Supabase(`supabase/plaza.sql` — **아직 미적용, 사용자가 SQL Editor에서 실행해야 함**: plaza_posts·likes·saves·comments·follows·reports + plaza 이미지 버킷) / 실패 시 이 기기(localStorage zip_pz_*). 루트 클래스는 `.plz`(기존 `.pz` CSS와 충돌), 메뉴는 `nav` 태그 쓰지 말 것(전역 nav 스타일이 pointer-events:none).
- 테스트: p29/tzc.js, tzc3.js, tsv.js, tpz.js.

## v8 — 정교 모형 · 물어보기 v2 · 건축 여행 v3 · 이력서/증명사진 · 홈 스크롤 (2026-10-15 새벽, d601d50)
- **정교 모형 `BSIG`**(`function pgBuild` 바로 앞): 유명 건물 41채를 실제 치수·특징으로 직접 짓는 서명 빌더 — `BSIG[id]={dims,desc,feats,see,plan,sec,build(K)}`, 키트 `bsigKit(T,M,R,bldg,life,floors)`(K.b 박스·K.c 원기둥·K.ex 압출·K.surf·K.dome·K.roof·K.pyr·K.pedim·K.water·K.tree…). pgBuild 안 훅: `P.sig`가 있으면 일반 생성기 결과를 비우고 `SIGB.build(kit)`로 교체(흰 모형 mass도 복제). `bldSpec(b,site)`가 BSIG 있으면 `P.sig/P.site/P.tag` 설정. 도감 모달 `bldOpen`은 사진 옆 3D 뷰어 `#bld3d`(pgvMount 'bld') + `bsigHTML`(치수·특징·평면/단면 SVG `bsigPlanSVG/bsigSecSVG`). 카드에 `정교 모형` 배지. ids: churchlight sumiyoshi savoye farnsworth fallingwater barcelona ronchamp kimbell guggenheimny salk glasshouse gilardi louvrepyramid sendai waterchurch jongmyo geunjeongjeon byeongsan space seagram rotonda pantheon parthenon habitat nakagin sydney unite tajmahal teshima chichu myeongdong kinkakuji ddp louvreabu bangju podo hiroshima byodoin sagrada casamila eiffel. 소스는 스크래치 bsig.js. PGV `frame()`이 카메라 거리에 따라 안개 near/far 조정(큰 모형 흐려짐 방지). 남은 손질: 루브르 피라미드 유리 가시성, 금각사 연못, 카사 밀라.
  - 테스트 p29/tsig.js `node tsig.js id1,id2` → sig-<id>.png. 디버그 `window.__atlas={BLDX,bldOpen,bldClose,dna,PGVR}`.
- **물어보기 v2**(`/* ===== 물어보기 v2 */`): `KB2` 409개 `[정규식, 답HTML, 이동 해시, 라벨, 분류]`(용어77 법규48 구조24 재료20 환경19 역사24 거장38 한옥18 도면22 학업16 진로11 공모전8 여행14 사이트21 일상28 놀이21, 스크래치 kb2.js). 흐름 `zcAsk`: 맥락(이 건축가 다른 건물/비슷한 건물/이 갈래/퀴즈 하나 더) → 도구 `zcTool`(평↔㎡, 대지+건폐율/용적률 계산, 용도지역 상한 표 `ZONES`, 층고×층수, 자/칸, 퀴즈 `zcQuiz`(도감 사진 4지선다: 건축가/이름/나라), 오늘의 건물(날짜 고정)/랜덤, 나랑 닮은 건축가(state.dna), 여행 추천(TREG 지역·TV_ABROAD 해외 → 카드), 건물·건축가 찾기 `zcFindBld`(이름·건축가·나라·단어 점수 → 카드 `data-zcard="bld:id"` → bldOpen)) → 사전 `encFind` → KB2 정규식(+옛 KB/사례) → claude.ai면 `sample`(KB 답을 참고 자료로 같이 줌). 메시지 형식 `{r,h,go,cards,quiz,more,enc}`; 카드 `.zc-cards`, 퀴즈 `.zc-quiz`(data-zqo 선택, 정답 색), 후속 칩 `.zc-chips.in`. 카테고리 탭 `#zcCat`(놀이터/용어/계산/건물·거장/여행/학업·진로/사이트) → 칩 세트 `ZC_CATS`, 대화 지우기 `#zcReset`. 내집코드 쪽 AI 묻기는 `zcLandAsk/#zcLandQ/#zcLandF/#zcLandAi`로 이름 바꿈(충돌 해결). 테스트 p29/tchat.js [m].
- **건축 여행 v3**(`TV_ABROAD/TV_SRC/TV_COLL/TV_PLAN` + `/* ===== 건축 여행 v3 */`, `function tDetail` 앞): 컬렉션 14개 `#tvCollSec`(`tCollRender`, 사진 카드 `.tv-coll` → `TV.coll` 필터, 지도/목록 `tVis()` 공용, 상세 `#tvCollX` 레일 + "이 테마로 코스 짜기"(TV.force)). 해외 8도시 `#tvAbroad`(`tAbRender`: 탭 → 모자이크(도감 사진 `bldImg`)·항공/일수/비자/시기/교통/물가·답사 코스 64곳(`data-bld` → bldOpen, 시간·근처)·하루 코스·팁, 지도에서 보기 → MapLibre flyTo + ✈ 핀 `tAbPins`, 일정 복사). 여행 키트 `#tvKit`(`tKitRender`: 체크리스트 12(localStorage zip_tvchk)·예산(domestic/japan/taiwan/china/hk/sg, `TV.kbud` — `TV.bud`는 반나절/하루 시간 예산이라 충돌)·짐·시기·앱·매너·출처 18). `tDetail`에 주변 인프라 칩(네이버 지도 `map.naver.com/p/search/<키워드>?c=lon,lat,16,…`). 데이터 주의: 항공권은 LCC 특가 기준 대략값, 일부 운영시간은 '공식 사이트 확인' 표기, 빛의 교회 일반 견학 중단 메모. 테스트 p29/ttv4.js [m].
- **포트폴리오 이력서/증명사진**(`/* ===== 포트폴리오 — 이력서 */`, `renderPfPlus` 앞; 섹션 `#pfCv`·`#pfPhoto`, 네비에 추가): 폼 ↔ A4 미리보기 `cvA4()` 실시간, 서식 3(clean/accent/mono), localStorage `zip_cv`(+사진 `zip_cv_photo`), AI 제안(`cvSuggest` 템플릿: 한 줄 소개·활동 설명 다듬기), AI 점검 `cvCheck`(규칙 `cvCheckLocal` 20여 개 + claude.ai면 sample 의견), PDF 인쇄 `cvPrint`(새 창에 .cv-doc CSS만 복사). 꿀팁 `CV_TIPS` 12. 증명사진 `PHS`: 캔버스 413×531(3.5×4.5cm@300dpi), 끌어서 위치·휠/슬라이더 크기, 밝기·대비·따뜻함·피부 결(블러 블렌드)·선명(언샤프), 배경 바꾸기(모서리 flood-fill, 단색 배경 전용, 민감도), 이력서에 넣기/PNG 받기. 얼굴 인식 없음(임시 수준). 테스트 p29/tcv.js.
- **홈 스크롤**: `.build` 950→860vh(모바일 700vh), 패널 구동부 `P0` 0.3→0.22, 한눈에→줌 ease 0.08~0.22, 보드 구간 ease 0.06~0.94 — 집 완성 뒤 멈춰 보이던 구간 제거. 테스트 p29/thome2.js [m](40단계 스크롤, 패널 구간 연속 변화 확인).
- 가독성/터치: 모바일 버튼 min-height 38~42px, 입력 16px(iOS 줌 방지), `.lab-h p` 폭 720px.
- 사용자가 할 일: `supabase/plaza.sql`, `supabase/tiers.sql` 아직 미적용(SQL Editor에서 실행).

## v9 — 정교 모형 2차 · 리퀴드 글래스 · 여행 효과 · 건축사 로드맵 (2026-10-15 오후, 2338fd2)
- **정교 모형 2차(BSIG 41채 재작성)**: 서브에이전트 3조(A 현대 주택·파빌리온 / B 고전·전통·석조 / C 현대 아이콘)가 패치 파일(`scratch/sig2/A.js·B.js·C.js`, `const BSIG_PATCH={…}`)로 짓고 `p29/tsig2.js <patch|none> <ids> <views> <prefix>`(페이지 안에서 `Object.assign(__atlas.BSIG,BSIG_PATCH)`)로 eye/front/aerial 렌더 확인 → 병합 스크립트(노드: 기존 BSIG 평가 + 패치 병합 + `build.toString()` 직렬화)로 crit.html `const BSIG={…}` 블록 교체, `BSIG_SITE`에 byeongsan:forest. 스크래치 bsig.js도 갱신. 자평: 롱샹·낙수장·사보아·시드니·구겐하임·판테온·파르테논·타지마할·루브르 피라미드·센다이·소크 등 "상/중상", ddp·chichu·podo·gilardi·space "중". 추정 치수는 코드 주석에 표기. 남은 한계: 시드니 셸은 구 근사(타일 셰브런 없음), 루브르 아부다비 돔은 삼각 격자 근사, 치추·테시마·포도 치수 다수 추정.
  - pgBuild 도심 사이트: `P.sig`면 이웃 건물 높이를 건물 높이×1.15로 제한하고 길 건너 줄은 생략(정면 뷰 가림 방지).
  - `window.__atlas`에 `BSIG,BSIG_SITE` 노출(패치 테스트용).
- **리퀴드 글래스 공용 스타일**(`/* ===== 리퀴드 글래스 (v9) */`): `.lg` + `.tv-bar,.pf-nav,.tv-mtools .modes/.btn,.pgt,.zc-panel,.tv-kittabs,.tv-abtabs button,.dnat-m .x,.tv-drx,.zs-box,.tv-dock`에 그라데이션 유리(blur 22·saturate 1.9·흰 테두리·inset 하이라이트), 다크 변형. `.lg-sheen`(conic 광택 hover). 상단 네비는 기존 WebGL liquid-glass-js 유지.
- **여행 v4**(`/* ===== 건축 여행 v4 */`, tv3ui 뒤): `TV_COLLX` 컬렉션 14개 이야기(story·points 3·when·course·tip) → `tCollXHTML(c)`가 `#tvCollX` 헤더 아래 삽입. 표지 셰이더 `sgCover(el,[c1,c2,c3,c4])`(ShaderGradient.mount, 스크롤 따라 lerp; 로드 전이면 load 뒤 재시도) — 여행·도감(`dnCoverPar`에서 지연 마운트)·포트폴리오 표지 공용, `.tv-cols`는 radial mask로 가장자리에 셰이더 비침. 섹션 독 `#tvDock`(`tDockInit`, div — nav 태그 금지) 컬렉션/가까운 곳/지도(`#tvMapSec` id 추가)/코스/해외/키트, IO로 현재 표시, 표지 지나면 등장. 스크롤 줌·시차는 CSS `animation-timeline: view()`(@supports 안, reduced-motion 제외): `.lab-h/.pf-h` zmIn, 컬렉션 사진 parY, 해외 모자이크 kb, 지도/키트/컬렉션 상세 zmIn2, 카드 사진 parY2, 표지 글 covOut·사진 covZoom.
- **포트폴리오 v9**: `#pfLic` 건축사 로드맵 4단계 + 주의 3 + 출처 — 2026.7 국토교통부 개편(2027~ 연 1회 3월, 예비시험 특별전형 폐지, 2028 신규 신고자부터 420일·3개월 신고·8과목 20항목, 2032~ 필기2+실기1·과목합격 3년 3회) 반영. 예시 경로 A의 "건축사 예비시험" → "실무수련 3년 신고·완료 / 자격시험". 연봉 큰 숫자 카운트업(`data-cn`), 12쪽 해부 카드 pgIn(회전 등장), 카드류 zmIn. 숫자 재검증: 2026 봉급표 9급 2,133,000·7급 2,317,100(인사혁신처, 6.6% 인상) ✓, BLS 5월 2025 건축가 중위 $99,280 ✓.
- 사진 없는 여행지 4곳(송은·미메시스·사유원·유민미술관)은 여전히 상업 이용 가능한 자유 라이선스 사진이 없음(2026-10 재확인) → 모형 썸네일 유지. 해외 코스 64곳은 모두 도감 사진 있음.
- 테스트: p29/ttv5.js [m] [hash](표지 셰이더·독·스크롤 프레임), tpf2.js, tsig2.js.

## v10 — 도면 내보내기(DXF·세트) · 옛스러움/규모 모형 · 물어보기 +140 · 관리자 운영 현황 · 정돈 (2026-10-15 밤, 브랜치 v10 → 패치)
- 작업 방식: `origin/main`에서 브랜치 `v10` → `git format-patch origin/main` 패치 파일로 전달(이번 세션은 GitHub push 권한 없음). dist/는 커밋하지 않음(받는 쪽에서 `python3 build_public.py`).
- **도면 내보내기 — DXF(AutoCAD)** (`/* ===== 도면 내보내기 v10 */`, `dwFromDna` 뒤): `pgPlanGeom(D,lv)`가 pgPlanSVG와 같은 규칙(pgRoomsFor·pgSplit·pgWin·pgDoorCut)으로 방·벽·창·문·코어·중정 기하를 m 단위로 만들고, `dxfPlanSheet/dxfSiteSheet/dxfSectionSheet/dxfElevSheet`가 시트별 엔티티(LINE·POLYLINE·CIRCLE·ARC·TEXT)를 쌓은 뒤 `dxfWrite`가 **R12(AC1009) ASCII, 단위 mm**로 쓴다. 시트는 가로로 나란히(배치 A-01 · 평면 A-11~ · 단면 A-21 · 정면 A-31) + 테두리·제목·표제란. 레이어 22개(WALL 7·WINDOW 5·DOOR 30·ROOM 8·ROOM-TEXT 2·FURN 9·CORE 6·COURT 3·HIDDEN(DASHED)·GRID(CENTER)·DIM 1·TEXT·SITE·SITE-LINE·ROOF 4·SLAB·GROUND·LEVEL·ELEV·ELEV-LINE·SYMBOL·SHEET), LTYPE CONTINUOUS/DASHED/CENTER. 한글은 `\U+XXXX`(dxfText)로 써서 ASCII만 — AutoCAD·ZWCAD·ezdxf는 풀어서 보여주고, LibreCAD/FreeCAD는 코드 그대로 보일 수 있음. `pgDxf(P,B,name)`→문자열, `pgDxfDownload`. 버튼: 취향 랩 결과 도면 칸 `data-dw="dxf"`, 컨셉 방/매스 도감 `data-pgdwx="dxf"`, 도면 방 FROM 취향 랩 `data-dwfddxf`(zip_dna_draw에 keys/base/mode/site0 저장 → pgSpec 재생성). 디버그 `window.__dxf={pgDxf,pgPlanGeom,pgSchedule,dwSetOpen,dxfWrite,spec,data}`.
  - **DWF는 못 만든다**(바이너리·Autodesk 전용) — AutoCAD에서 DXF를 열어 "다른 이름으로 저장/플롯"으로 DWF. 물어보기 KB2에 안내 항목 있음.
- **도면 세트 보기·인쇄** `dwSetOpen(P,B,name)`/`dwSetHTML`: 전체 화면 오버레이 `#dwSetModal`(.dws, lg 바) — 표지 A-00(이름·단어 칩·사양표·도면 목록·범례·주의) → 모든 시트 SVG(기존 pgDrawSet) → 실 면적표 A-41(`pgSchedule(D)`: 층·실명·분류·크기·면적·비율 + 분류별 합계 막대). 상단 독으로 시트 이동, `인쇄·PDF`=window.print()(@media print: A3 가로, 시트마다 페이지 나눔), ESC/배경 클릭 닫기. 버튼 `data-dw="set"`, `data-pgdwx="set"`, `data-dwfdset`.
  - 3D(three.js) 로드가 실패해도 도면은 그려지도록 `PGV` opt.onFail → `dnDrawRender(DV.cur,null)`; `[data-dw]` 핸들러는 DW.set 없으면 먼저 렌더.
  - 평면 시트 수 상한 6→8층(`Math.min(D.maxLv,8)` 4곳).
- **취향 랩 모형 — 옛스러움·규모** (pgSpec·pgBuild·pgElevSVG·DXF 정면):
  - 새 단어(DNA_CATS mood): 옛스러운·고전적인·아치·돌로 쌓은·성당처럼·궁궐처럼·웅장한·거대한·랜드마크·아담한(303개). PGK: `era:'old'`, `arch:1`, `scale:0.75~1.8`.
  - `pgSpec`: `P.scale`(여러 개면 큰 쪽 우선, W·D 곱, ≥1.4면 +1층, ≥1.7면 +2층, <1이면 ≤2층) · `P.era='old'`(plinth 추가, 외피 기본 stone/brickR, 창 기본 deep(통창·띠창이면 deep으로), 지붕 기본 gable(한국 단어 있으면 hanok), 주택류 층고 ≥3.4) · `P.arch`(아치 단어 또는 old+개방축 낮음).
  - `pgBuild` 옛 건물 디테일(`OLD`): 필라스터(`pgPilasters(rs,L)` — 양 끝 + 창 사이, 3D·SVG 입면·DXF 공용) + 주두, 최상층 2단 코니스, 1층 러스티케이션 띠(M.trim + 줄눈), 창 위 반원 아치 링(RingGeometry) + 키스톤(deep/punch/lattice만), 문 아치. 규모 ≥1.4(`GR`): 문 폭 4.4·높이 3.6, 포르티코(기둥 4 + 엔타블러처, old면 페디먼트) — 기본 캐노피는 생략. `M.trim`=석재(외피가 석재/회벽이면 흰색). `pgDoorCut(rs,L,isG,ewo)` 넷째 인자로 넓은 문 폭.
  - 입면(SVG·DXF): 아치 창·필라스터·기단 띠·코니스 반영. 평면은 변화 없음(벽 두께 동일).
- **물어보기 KB2 +140 → 549** (스크래치 `scratch/v10/kb2_v10.js`, KB2 끝 `/* v10 추가 140 */`): 새 분류 `시공·비용`(15) `인테리어`(10) `도시`(8) + 용어·법규·구조·재료·환경·역사·거장·한옥·학업·진로·일상·놀이·사이트(DXF/세트/옛 건물/규모/⌘K 안내). 점수는 매칭 길이라 순서 무관. `ZC_CATS`에 `build`(시공·비용)·`city`(도시) 탭 추가, 사이트 탭 칩 갱신. 디버그 `window.__zcKB2(q)`.
- **관리자 운영 현황 탭** `ATAB` `['ops','운영 현황']`(개요 다음), `admOpsRender(el,d,t)`(`/* ===== 관리자: 운영 현황 (v10) */`, CSS는 `#admopsCss`로 자체 주입): 시스템 상태(접속 모드·Supabase·계정·SQL 체크리스트 — plaza/tiers "확인" 버튼이 실제 조회) · 콘텐츠 현황(도감/여행지/물어보기/사전/레시피/정교 모형/단어 수 + 품질 힌트 + 분류별 막대) · 알림·이슈(규칙) · CSV 내보내기(`admCsv`: 회원·일별 방문·가입·물어보기·도감) · 운영 메모(localStorage `zip_admnotes`). `admUpgrade`에서 동기 1회(`t=null`) + 방문 통계 뒤 재렌더.
- **정돈(접기)**: `.zfold[data-zfold=N]` + `.zfold-btn[data-zfoldbtn]`(N번째 이후 숨김, CSS nth-child), 건축 여행 지역 챕터 `.tv-ch.tv-fold`(5곳 이후 숨김, `[data-tvmore]` "N곳 더 보기") · 해외 답사 코스 8곳 이후 접기. 핸들러는 DXF 모듈 위 `/* ===== 정돈 */`.
- **홈 스크롤**: 빌드 장면 관성 — 목표와 멀수록 k 0.16→0.22/0.30으로 빨리 따라붙고, 0.5 넘을 때만 점프(이전 0.2). `.build+.mod::before` 150px 그라데이션으로 어두운 장면→밝은 섹션 이음.
- 남은 한계: DXF는 R12라 해치·치수 객체(DIMENSION)·블록 없음(치수는 선+글자), 가구는 단순 사각; 곡면(curve/round)·비틀림(twist)·마을(village)은 평면 사각 근사; 문은 1층 정면만; 단면은 가운데 볼륨 기준. 옛 건물 디테일은 solid 외피·직각 매스에만(curve/round·커튼월 제외). DWF 미지원. ezdxf·AutoCAD로 열어 본 검증은 못 했고(컨테이너 pip 불가) 자체 파서(`scratch/v10/dxfview.py`)로 구조·엔티티 렌더만 확인.
- 테스트(스크래치 `scratch/v10/`): `t_dxf.js`(spec→DXF 6종 + 세트 화면 1440/390) · `dxfview.py out.dxf`(구조 검증 + PNG) · `t_sig.js '[["이름",["단어"...],"eye"]]'`(three.min.js를 /home/claude/tlib에서 라우팅, 옛/규모 모형 렌더) · `t_flow.js`(취향 랩 단어 선택→짓기→도면 탭·DXF 다운로드·세트·도면 방 전송·여행 접기, 1440/390) · `t_chat.js`(KB2 매칭) · `t_admin.js`(`?admdemo=1#admin` 운영 현황) · `t_sweep.js`(16개 라우트 pageerror 0) · `t_home.js 1440 16 '#travel'`(스크롤 컨택트시트). 로컬 서버 `python3 -m http.server 8787` + `dist/`.
  - (이 세션에서 합침 2026-10-15 밤) 패치 `0001-v10-DXF-140.patch`를 `git am --3way`로 v9 위에 적용(충돌 없음) → 구문 검사·빌드·회귀 테스트(tchat·thome2·ttv5·tdna) 통과, DXF/도면 세트 스모크 테스트 `p29/tdxf.js`(`__dxf.spec/.data/.pgDxf/.dwSetOpen`) 통과. 퀴즈 보기 제외어에 문명·문화·왕국·외$·공방·국가·도시·종단·사회 추가. 다른 세션에서 받은 패치는 이 흐름(패치 첨부 → git am → 테스트 → 배포)으로 합친다.

## v11 — 설계 흐름 스튜디오 · 도면 치수/표제란/A-레이어 · 단어 532 · 정교 모형 10채 · 배경 테마 · 여행 컬렉션 (2026-10-16, 브랜치 v11 → 패치 0001-v11.patch)
- 작업 방식: `origin/main`(7df82c0)에서 브랜치 `v11` → 커밋 1개로 squash → `git format-patch origin/main --stdout > 0001-v11.patch`. dist/는 커밋하지 않음.
- **설계 흐름 스튜디오 `#flow`**(`/* ===== 설계 흐름 스튜디오 (v11) */`, 정돈 핸들러 바로 위; HTML `#view-flow`는 `#view-dna` 앞; VIEWS·PATHN·NAVG(설계하기 첫 항목)·NICO.flow·RHERO.flow 추가; 라우트 `if(h==='flow') setTimeout(fwRender)`): 상태 `FW`(localStorage `zip_flow`: keys·lot·prog·fb·rooms·stage·cat), 단계 `FW_STAGES` 6개 — ① 컨셉 `fwConceptHTML`(13분류 탭·검색·칩 532·경우의 수 `fwComb` BigInt·🎲 무작위·대지 가로/세로/면적/도로 방향/도로 폭 `FW.lot`·용도 `FW.prog`→`fwProgWord`) ② 대안 `fwMakeAlts`(A 정석·B 혼합·C 실험 + D/E/F 변주 `fwVary`: 지붕·창 / 외피 2중·조작 / 실험 조작·층고, pgHash로 결정적) + 썸네일 `pgThumb` + 피드백 `fwFeedbackApply`(규칙표 `FW_FB` 40여 개: 더 낮게/높게/크게/작게/길게, 마당, 창 크게/작게/띠창, 외피 7종, 지붕 4종, 필로티·테라스·캔틸레버·옥상 정원·처마·천창·보이드·두 동·담·물·경사로·곡선·비틀기, 층고, 옛/현대 — 먼저 맞은 규칙이 문장을 소비해 "창을 더 크게"가 "더 크게"로 안 샘; 단어 사전 단어도 문장에서 찾아 keys에 추가해 재사양) ③ 매스 `pgvMount('fw')` + 도구 + 결정 로그 ④ 원라인 `pgOneLineSVG(D,lv)`(벽 중심선·창 파란선·문 호·방 채색·동선 `pgCircPath`: 입구→공용(가까운 순)→코어→개인, 파란 점선 화살표) ⑤ 실·동선 `fwRoomsHTML`(실 표 편집 → `P.rooms` → `pgRoomsFor`가 우선 사용, 비율 자동 정규화, 인접 버블 `fwBubbleSVG`) ⑥ 평면도 `pgDrawPanel('fw')` + 표제란 `TBI`(localStorage `zip_title`: school·course·name·sid·site·proj·scale·date, `tbiSave`가 DW/PDW 캐시 비움). 전체 화면 `[data-fwx=full]`(`.fw.full` fixed + Fullscreen API, ESC). 디버그 `window.__fw`.
  - 대지: `fwApplyLot`이 P.W/P.D를 대지 안으로 줄이고 `P.lot` 저장 → `pgLot(D,…)`(pgSiteSVG 앞)이 배치도·DXF 대지 경계·도로 폭·방위 회전(`PG_ROADT`, S 0°/N 180°/E 90°/W −90°)을 결정, 3D(`pgBuild` lawn 뒤)에는 빨간 경계선+말뚝.
- **도면 v11**: `svgWrap`에 표제란 열(TBI에 학교·과목·성명·학번·대지·프로젝트 중 하나라도 있으면 viewBox 폭 +176) · 치수 체인 `svgDimChain`/`pgDimPts`(방 경계에서 x·z 분할점, mm 정수, 빨강 #c03, 1단 구간 + 2단 전체; 평면 pad 86, 기준선 버블 왼쪽으로) · 중정 링에 방이 모자라면 `회랑`(g core)으로 채움(pgPlanSVG·pgPlanGeom 공통).
  - DXF: 레이어를 A-* 규약으로 (`DXF_LMAP`: A-WALL·A-POCHE(SOLID 채움)·A-GLASS·A-DOOR·A-ROOM·A-EQPM·A-CORE·A-TERR·A-HIDDEN·A-GRID/A-GRIDTXT·A-DIM·A-ANNO·A-SITE·A-LEGAL·A-ROOF·A-FLOW·A-TITLE·A-TB-LINE/TEXT/HEAD·A-FRAME·A-SHEET), `S.solid`, `dxfDimChain`, 시트를 4장씩 격자로, 시트마다 테두리 2중 + 오른쪽 표제란 띠 22m(학교 헤더·과목·프로젝트·대지·도면명·축척·성명·학번·날짜), 1층 동선 폴리라인(A-FLOW), 방위 회전 `dxfNorth(S,x,y,rot)`. 참고 기준: 사용자가 준 `59d6c947-22111939_HOUSEPARK_ALL.dxf`(R12, A-* 레이어, 치수 2단 체인, 표제란 띠) — 스크래치 `scratch/v11/ref/`.
- **단어 532**(DNA_CATS 각 분류 끝 `/* v11 */` 229개 + PGK 끝 `/* v11 */`): 내관(중2층·메자닌·회랑형 복도·코어 노출…), 외관 기법, 시대·양식(로마네스크~해체주의·사합원·일본 민가 → era/arch/skin/roof 조합), 용도 24(호텔·병원·시장·공항 터미널·등대…→ 기존 prog+scale), 대지·기후, 감각·시간, 건축가 22 `…처럼`. 검증 `scratch/v11/validate.js`(중복 0, 값 유효, 동일 PGK 그룹 0). 주의: 옛 단어 일부가 DNA_ARCH에 없는 `pavilion`을 참조(파서가 무시) — 그대로 둠.
- **정교 모형 10채 교체**(BSIG; 서브에이전트 패치 `scratch/v11/sig/B.js`·`C.js`, 하네스 `t.js`): 종묘 정전(전퇴 열주·판문 19·익공·풍판·협실·동서월랑·2단 월대 109×69·박석·신로·담·남신문), 근정전(척수 주칸·2단 월대 난간·법수·서수·답도·중층 팔작·다포 띠·잡상 7·품계석 24·삼도·행각·근정문 중층 우진각·융문루/융무루), 병산서원(만대루 7×2칸·3단 지형·입교당·동재서재·존덕사·광영지·배롱나무·낙동강·병산 절벽 5.5m로 낮춤), 공간 사옥(담쟁이·스킵플로어 바닥판·유리동), DDP(연속 높이장 껍질·패널 줄눈), 지중미술관(삼각/사각 마당 구멍·슬릿·모네실 천창·진입 순서), 포도호텔(오름 지붕 20·현무암 띠·중정 수공간; BSIG_SITE field→flat), 카사 힐라르디(돌하우스 단면: 노란 복도·보라 담·자카란다·파란 수영장 방), 방주교회(삼각 금속판 비늘 InstancedMesh ~1,300·수반·데크; BSIG_SITE field→forest), 명동성당(메시 1/5·13m 언덕 단). 출처는 코드 `// 출처:` 주석. 자평 종묘·근정전·포도 상, 나머지 중상.
- **배경 테마**(`/* ===== 배경 테마 고르기 (v11) */`, CSS `:root[data-bg=…]`): 네비 반달 버튼 `#navTheme` → `#bgPick`(기본·밝게·어둡게·종이 paper·안개 mist·밤하늘 navy·숲 forest), `bgApply(k)`가 data-theme(light/dark)+data-bg 설정, localStorage `zip_bg`. 기존 다크 규칙(`:root:not([data-theme=light])`)과 충돌 없도록 밝은 변형은 data-theme=light를 같이 건다.
- **표지 통일**: RHERO에 flow/plaza/portfolio/guide 추가, `rhWord(w,c)`로 취향 랩(TASTE)·작업실(STUDIO)에도 조립 글자 삽입, `asmAll()`이 뷰 안 모든 `.asm` 조립. `.asm.rh-mini`.
- **여행 컬렉션** `tCollRender`: 6열 모자이크(`big` 2×2 / `wide` 2×1, i%7 규칙), 텍스트 스택 `.tx`(겹침 해소), big 카드에 `TV_COLLX` 이야기 3줄, 사진 없으면 테마색 그라데이션.
- 기타: 홈 설계하기 타일 첫 칸 `#tileFlow`, 히어로 "시작하기"→#flow, 사용법 맨 위 "가장 빠른 길", 자료실 `.openhub` 뒤 `.lbconv`(도면 규약: 레이어·치수·표제란), KB2 v11 7항목(설계 흐름·표제란·크리틱 반영·대지 치수·배경 테마·경우의 수·레이어), ZC_CATS 사이트 칩 갱신, 설계 흐름 모바일 툴바(단계 줄 + 버튼 줄).
- 남은 한계: 원라인·동선은 1층 기준 규칙(가까운 공용→코어→개인)이라 실제 동선 계획은 사용자가 수정해야 함; 실 표 편집은 이름·비율·분류만(위치 지정 없음); 피드백 규칙은 사전식(모르는 표현은 "규칙을 못 찾음"); 대지는 직사각형만(사다리꼴·꺾인 대지 미지원), 배치도 업로드(이미지/DXF 언더레이) 미지원; 표제란 글꼴은 DXF에서 txt 스타일(한글 \U+ 코드); 여행지 4곳 자유 사진 여전히 없음; ezdxf/AutoCAD 실검증 못 함(자체 파서로 구조만).
- 테스트(`scratch/v11/`): `t_flow.js`(단어 선택→대지 24×18 E→대안 6→피드백→매스→원라인→실 추가·적용→표제란 저장→DXF 다운로드, 1440/390, pageerror 0) · `t_kw.js`(532 칩·조합 사양) · `t_sweep.js`(라우트 pageerror 0) · `t_theme.js`(테마 전환) · `t_shot.js '#hash' '#sel' out.png 1440`(단일 스크린샷) · `sig/t.js none jongmyo,podo eye int-`(통합 BSIG 렌더) · DXF 뷰어 `scratch/v10/dxfview.py`(SOLID 미지원, 구조 검증용).

## v12 — 설계 흐름 최적화·연계 · 정교 모형 +22(62채) · 공모전 흐름 대안 · 계절별 스팟·사진 대체 · 컬렉션 표지 덱 · 3D 전체 화면 (2026-10-16, 브랜치 v12 → 패치 0001-v12.patch)
- 작업 방식: `origin/main`(7ebe724)에서 브랜치 `v12` → 커밋 1개로 squash → `git format-patch origin/main --stdout > 0001-v12.patch`. dist/는 커밋하지 않음.
- **설계 흐름 렉·오류 손질**: ① 썸네일 대기열 `PGTQ`/`pgThumbNext`(`pgThumb` 바로 위) — 모형을 한 번에 하나씩, 스크롤 중엔 미루고 60ms 간격 → 대안 9장을 동시에 짓느라 프레임이 500ms 넘게 멈추던 것 해소; 같은 키 요청은 진행 중 Promise 재사용(`PGTC['#p'+key]`), 실패 시 reject·정리. ② 단어 칩은 `fwPickUpdate()`로 부분 갱신(전에는 칩 하나 누를 때마다 단계 전체 재렌더). ③ 썸네일 392×280으로. 측정 `scratch/v12/t_prof.js`.
- **연계**(`/* ===== 연계 (v12) */`, 사진 대체 모듈 앞): `fwFromRoom(room)` — 방의 상태를 흐름으로: state.keys·concept·notes·title에서 사전 단어 추출(≤8), zc.w/d/area→FW.lot, use→FW.prog(`FW_USEMAP`), 도면 방이면 zRooms→FW.rooms; 'dna'는 state.dna, 'bld:<id>'는 도감 단어. `fwToRoom(room)` — 고른 안을 프로젝트에(제목·단어·용도·규모·대지·컨셉·메모, `touch('flow')`), 도면 작업대(`dnDrawSend`)·모형 방(secHeights)·패널·작업실로. 대지·컨셉·도면·모형 방 표지 아래 `.fwlink` 띠("설계 흐름으로 가져가기"), 흐름 ⑥평면도·③매스에 "다음으로 보내기" 버튼(`data-fwto`), 취향 랩 도면 칸·도감 모달에 `data-fwfrom`. 메가 메뉴 재편: 시작하기(설계 흐름·취향 랩·내집코드·사용법) / 방마다 깊게(대지·컨셉·도면·모형) / 보여주기 / 둘러보기(여행·사례·자료실) / 함께하기.
- **대안 — 요즘 공모전 흐름**: `CREC_RAW` 끝 `/* v12 요즘 공모전 흐름 14 */`(t_brownfield·t_timelayer·t_hanokpublic·t_vacant·t_youthvalley·t_watercity·t_carehome·t_vertfarm·t_underpass·t_memorial·t_kinder·t_funpavilion·t_datacenter·t_everyday), `CREC_SRC.comp`, 출처 `CREC_TREND_SRC`(23건: 2024~2026 한국건축문화대상 학생부·공간국제학생건축상·LH 청년주택·서울시 FUN CITY·빈집 공모·경북 건축문화상·실내건축대전·대한건축학회·삼육대 졸업전·철도 유휴부지·Buildner·eVolo·RIBA 데이터센터). `fwMakeAlts`가 `crecPick({src:'comp'},3)`로 G·H·I 안 추가 — 사용자 단어를 뒤에 두어 용도는 사용자 것이 이김(prog 있으면 o.W/D 무시). 카드엔 레시피 한 줄+출처. 수상자 개인 이름 없음.
- **정교 모형 +22 → 62채**(BSIG; 패치 `scratch/v12/sig/A.js·B.js·C.js`, 병합 `scratch/v12/merge_sig.py` — 새 id는 BSIG 끝에 추가, `BSIG_SITE` 병합): 한국 — lotte(555m 테이퍼드 콘·랜턴·몰·석촌호수), gyeongbok(광화문→흥례문→금천→근정문→근정전→사정전→강녕전·교태전→경회루 48기둥→향원정, 궁장 ×0.75), changdeok(돈화문→금천교→진선문→인정전→선정전 청기와→희정당·대조전→후원 부용지·부용정·주합루, 비정형 축·지형 +8m), bulguksa(대석단·청운교백운교 33단·다보탑 10.29·석가탑 10.75·범영루·극락전·토함산), hwaseong(장안문 옹성·화서문·서북공심돈·화홍문 7홍예·방화수류정, 280m 구간), nmk(404m 두 날개·열린 마당·거울못·청자정), cityhall(구청사+파도 유리 신청사·수직정원), 63bldg(금빛 유리 프리즘 249m), nseoultower(남산·전망대 원반·236.7m). 세계 — burj(Y자 27단 셋백·828m·분수), taipei101(8단 마디·508m), empirestate(7단 셋백·443m), petronas(8각 별·스카이브리지), bilbao(티타늄 돛 surf), chrysler(왕관 7단·삼각 창), onecentralpark(수직 정원·캔틸레버 거울). 고전 — colosseum(깨진 고리·아치 3단 인스턴스·하이포게움), notredame(쌍탑 69·첨탑 96·버트레스·장미창), stpeters(돔 136.6·베르니니 광장 콜로네이드·오벨리스크), hagiasophia(돔 폭포·미나렛 4), angkor(3단 테라스·5탑·참배로·해자), chartres(비대칭 쌍탑 103/112·2단 버트레스). 출처는 각 build `// 출처:`, 추정은 `// 추정`. 메시 <450·build <150ms. 자평: 상(경복궁·창덕궁·시청·부르즈·타이베이·엠파이어·페트로나스·크라이슬러·콜로세움·노트르담·성베드로·앙코르·샤르트르) / 중상(나머지).
  - 뷰어: `PGV.frame()`에서 하늘 돔 `sky/skyN.scale=(dist*1.25+높이)/560`·중심 이동(300m 넘는 탑도 돔 밖으로 안 나감), 그림자 카메라 far=r*3+120(큰 모형 바닥 얼룩). `BSIG_SITE` 'mountain'은 폭 120m 넘는 모형과 충돌(지형 융기) → bulguksa·nseoultower는 'forest'로 두고 산을 모형 안에 지음.
  - **3D 전체 화면**: 도감 모달 `.dnat-3d`에 `[data-bld3full]` 버튼 → `.dnat-m.full3d`(뷰어가 뷰포트 전체, 사진·설명 숨김, ResizeObserver로 자동 리사이즈). 버튼은 `#bld3d` 밖에 둬야 함(PGV가 el.innerHTML을 비움).
- **건축 여행**: ① 사진 대체 체인(`/* ===== 사진 대체 (v12) */`): `<img>` error 캡처 리스너 — 위키미디어 썸네일 실패 → 원본 파일 URL → 그래도 실패면 가까운 `[data-bld]`의 단어 모형 썸네일(`bldModelInto`, pgThumb) / 없으면 `.img-x` 회색; 해외 코스 스톱의 `.ph` 자리도 `tvFillModelThumbs`로 모형 채움. ② 계절별 스팟 `#tvSeason`(`TV_SEASON` 4계절 31곳, 독에 '계절' 추가, 현재 달에 맞는 탭 기본): 봄 7·여름 8·가을 8·겨울 8, 재사용 20 + 신규 11(`TPL` 끝 `/* v12 계절별 스팟 신규 11 */`: cheomseongdae·myeongokheon·spacewalk·baegyangsa·gwanghallu·jeonjuhyanggyo·myeongnyun·changgyeong·hyundaiseoul·seoulbotanic·woljeongsa → TPL 72곳), 사진 10장 `PH`에 추가(CC BY/BY-SA/KOGL, 명옥헌은 자유 사진 없음→모형), 출처 `TV_SEASON_SRC` 24건(2025-01~2026-06 기사·관광공사·서울시) 카드 아래 표기. ③ 컬렉션 표지 덱 `#tvDeck`(`tCollDeck/tDeckGo/tDeckAuto`): 넘기며 보는 표지 — 켄번스 사진·테마색 그라데이션·이야기 3줄·"이 테마 보기/코스 짜기", 화살표·점·스와이프·←→키, 6초 자동(화면 밖·탭 숨김·hover 땐 정지, reduced-motion 정지); 모자이크 14장은 `.zfold` 6장 + 펼치기.
  - 메모: 위키미디어 공용 API는 컨테이너·WebFetch에서 막히지만, 사용자 PC의 Claude 데스크톱 내장 브라우저(remote-devices Claude_Browser)의 javascript_tool `fetch(api.php)`로 조회 가능했음(사진 10장 그렇게 검증).
- 기타: KB2 v12 3항목(계절 스팟·공모전 흐름·3D 전체 화면), 여행 72곳 문구, 사용법·홈 문구.
- 남은 한계: 도감 809채 중 정교 모형은 62채(나머지는 단어 생성기 — 규모·층수 데이터 없음); 피드백·단어 추출은 사전식(2글자 단어가 긴 낱말 안에서 잡힐 수 있음); 계절 스팟 위경도는 근사(±0.005); 명옥헌·송은·미메시스·사유원·유민미술관은 자유 사진 없음; 덱은 사진 없으면 그라데이션; 뷰어 eye 뷰는 500m 넘는 탑 상부가 화면 밖(aerial·기본 뷰로); DXF·AutoCAD 실검증은 여전히 못 함.
- 테스트(`scratch/v12/`): `t_prof.js`(흐름 성능), `t_flow.js`(흐름 전 단계 1440/390), `t_alts9.js`·`t_altg.js`(9안·공모전 안 도면/DXF), `t_link.js`(방→흐름→도면 작업대, 사진 대체, 전체 화면), `t_season.js`(계절 섹션), `t_sweep.js`(라우트 pageerror 0), `t_shot.js`; 정교 모형 렌더 `scratch/v11/sig/t.js none <ids> <views> v12-`(three.min.js는 /home/claude/tlib 라우팅).

## v13 — 건축 아틀라스 · 표지 통일 · 메뉴 정리 · 정교 모형 24채 지형·디테일 (2026-10-16 밤, 이 세션)
- **건축 아틀라스 `#atlas`**(`/* ===== 건축 아틀라스 (v13) */`, `function bldOpen` 바로 위; HTML `#view-atlas`는 `#view-dna` 앞, 내용은 `#atxHost`에 `atPageInit()`이 그림): 취향 랩 안에 있던 도감을 독립 페이지로. 3막 구성 — ① 오늘의 명작 `#atSpot`(정교 모형 63채를 한 채씩: 큰 3D `pgvMount('atsp')` + 설명·치수·특징 + ‹ › ·←→ 키 + 필름 스트립 `#atFilm`, 날짜로 첫 건물 고정) ② 전시실 `#atHalls`(`AT_HALLS` 6방: 궁궐과 서원·서울의 현대·신전과 대성당·근대의 거장들·빛·물·땅·하늘로 → 누르면 `#atRoom` 모자이크, 카드 hover 시 사진→모형) ③ 전체 809채 `#atAll`(기존 `#dnAtlas`를 여기로 옮김, ①기준→②항목→③건물). 썸네일은 `atThumbs`(IO + bldModel 대기열). 라우트 밖으로 나가면 `pgvDispose('atsp')`. 취향 랩엔 `.dnat-go` 링크 카드만 남김, `#dnAtlas`는 hidden으로 시작해 atPageInit이 옮기고 dnAtlasInit이 보이게 함(`dnCoverHTML` 사진 표지는 더 안 씀). 모달의 `data-atgo`는 아틀라스가 아니면 먼저 `#atlas`로 이동.
- **표지 통일**: 모든 방이 RHERO(가운데 글자에서 양옆으로 조립 + 그라데이션 + 단어 리본)로 시작. `RHERO`에 atlas(ATLAS)·dna(TASTE)·studio(STUDIO) 추가, 해당 뷰에 `.hero` 마크업 추가. 기존 `.dnhero`는 통계·버튼 띠로 축소, `.sthero`는 프로젝트 띠로 축소, 포트폴리오 `#pfCover`는 rhero·리본 뒤로 이동, 여행·포트폴리오 사진 표지는 높이 62vh로 줄여 두 번째 장면으로.
- **메뉴(NAVG) 정리**: 시작하기(설계 흐름·취향 랩·내집코드) / 방마다 깊게(대지·컨셉·도면·모형) / 보여주기(패널·포트폴리오·진로) / 둘러보기(건축 아틀라스·건축 여행·사례·자료실) / 함께하기(광장·작업실·사용법·문의). NICO.atlas 지구 아이콘, PATHN.atlas.
- **썸네일(`pgThumb`) 안개·하늘**: 큰 모형(궁궐 300m+, 초고층)이 안개 200–600m에 묻혀 빈 미리보기가 되던 문제 — 거리에 비례한 fog near/far, `cam.far` + `updateProjectionMatrix()`, 하늘 돔 스케일·중심 이동, 해·그림자 범위 확대. 일반 생성기 배경 산은 원뿔 → 반타원 언덕(뒤로 bbox 기준 배치), **정교 모형(P.sig)에는 일반 배경 산을 깔지 않음**(빌드가 실제 지형을 직접 지음).
- **정교 모형 24채 v13**(서브에이전트 두 조, 패치 `scratch/v13/sig/K.js`·`W.js`, 병합 `scratch/v13/merge.js` — 숫자로 시작하는 id는 따옴표): 한국 11(경복궁·창덕궁·불국사·화성·종묘·근정전·병산서원·국립중앙박물관·롯데타워·N서울타워·63빌딩) — 북악산·인왕산·응봉·토함산·팔달산 능선 숲(높이장+정점색+인스턴스 숲), 박석/마사토 캔버스 질감, 한옥 공용(양성 용마루·취두·잡상 위치·단청 띠·주춧돌·현판), 서촌·북촌·잠실·여의도 도시 맥락. 세계 13(콜로세움·노트르담·성베드로·하기아 소피아·앙코르·샤르트르·부르즈·타이베이101·엠파이어·페트로나스·크라이슬러·빌바오·원 센트럴 파크) — 포로 로마노·시테섬/센강·바티칸·술탄아흐메트·해자·맨해튼 격자·KLCC 등 맥락, 금속 유리 밝게, 빌바오 강 쪽을 정면으로. 배경은 모두 `K.life`(bbox 밖)라 썸네일 거리는 건물로만 정해짐. 이 24채는 `BSIG_SITE='town'`.
  - 세계 그룹의 `W.own()`은 모형이 떠 있는 동안 렌더러 기본 바닥(잔디·포장·길)의 visible을 getter로 숨김 — 다른 건물로 바꾸면 복구됨(검증: colosseum→savoye→burj→fallingwater). 공용 env 코드가 건물마다 복제돼 crit.html이 3.45MB(gzip 1.15MB)로 커짐 — 나중에 `BSIG_ENV` 공용 함수로 빼면 줄일 수 있음.
  - 남은 한계: 63빌딩 사다리꼴 실루엣은 기억 기반 추정(원본 직육면체는 `scratch/v13/sig/K_work/src/63bldg.orig.js`), 하기아 소피아의 블루 모스크는 기본 뷰 밖, 빌바오 곡면은 덩어리감, 도시 블록은 단순 상자, 렌더러 가로등·벤치가 town 사이트 모형 앞에 보임.
- 테스트(`scratch/v13/`): `tatl.js [m]`(아틀라스 3막·전시실·모달·표지 4곳), `tthumb.js ids`(배포 빌드 썸네일), `tswap.js`(바닥 복구), `tops.js`(모든 방 표지 스크린샷), `tdbg.js`(모바일 뷰어 크기).

## v14 — 도감 사진 전수 검증 · 패널 사례 해부 · 레이아웃 13 (2026-10-16 밤)
- **도감 사진 검증**: 752장 전부 썸네일을 눈으로 확인(서브에이전트, 사용자 PC 브라우저로 Commons API·카테고리 조회). 결과 `scratch/v14/photo_fix.json`. 다른 것을 찍은 사진 11장 교체(lloyds 자동차, staatsgaleriestg 구관, kait 교문, acropolis 반대 방향, seonyudo 간판, philharmonieparis 실내 파티, confluenceslyon 트램, ptpavilion 다른 탑, zonnestraal 나무만, serralves 실내 아이, maritimedk 조형물) + 같은 건물이지만 약한 사진 18장 교체(hwaseong·soswaewon·heydar·brion·burj·incheonair·miho·louisiana·hassan2·gyeonghuigung·seoulwall·flametowers·monahobart·aarhuscityhall·ermtartu·vuoksenniska·otaniemichapel·nmaust). 모두 CC BY/BY-SA/CC0/PD. nseoultower 대체 후보는 라이선스 "Attribution"·작가 미상이라 적용 안 함. 유지(대안 없음) 13건: museumsan(.tif) 등.
- **패널**: `LAYOUTS`에 사례 기반 4종 추가 → 13종 — mood(분위기 히어로: 풀블리드 투시도+분석 줄+분해 액소+입면 띠), index(픽토그램 색인: 왼쪽 아이콘 기둥 6+큰 투시도), illust(일러스트 서사: 큰 조감+번호 6칸), systems(시스템 다이어그램: 환경 장치 연속 3+평면 기둥+단면 띠). `PLESSON` 10→15(계절·날씨 분위기, 강조색 하나, 사람의 하루, 번호 순서, 시스템 연속 다이어그램 + 아이콘). 새 섹션 `#pArch` 「패널 사례 해부」(`PARCH` 5 뼈대: 위 4 + 가로 세 띠형 → band) — 사용자가 준 네이버 패널 5장을 구조만 읽어 정리(원본 이미지 미사용), 카드 버튼 `data-parch`로 작업대 레이아웃 즉시 변경. `.zrv` 카드는 삽입 뒤 `dnaReveal()` 필요.
- 테스트: `scratch/v14/tpanel.js`, `tpn3.js`(#sheet 슬롯 위치 확인).

## v15 (2026-10-17) — 도면→분해 액소 · 정교 모형 19채
- **도면 → 분해 액소** (패널 페이지, `#pArch` 뒤 `section#exAx`, 코드 `/* ===== 도면 → 분해 액소메트릭 (v15)` 블록, CSS `.exax-*`)
  - DXF(ASCII) 층별 업로드 → `exParseDXF`(LINE/LWPOLYLINE/POLYLINE/ARC/SOLID/TEXT/MTEXT, $INSUNITS) → `exAnalyze`(0.12m 격자에 벽·유리·문호·테라스선 래스터 → 바깥 채우기 → 연결성분=실, TEXT로 실 이름·용도 `exCat`/`exKind`) → `exFurnish`(용도별 가구·사람·나무 격자 배치) → `exSteps`(계단 디딤판 선 → 단) → `exBuild`(three.js 직교 카메라, 슬래브 상판 캔버스 텍스처 색칠) + `exSVG`(층 라벨·실 번호 태그·범례).
  - 레이어 인식은 이름 정규식(EXL): WALL/POCHE/CORE/벽, GLASS/WIN/창, DOOR, STAIR, TERR, VOID, ROOM/TEXT. DIM/GRID/TB/SITE/CTX/PARK/HIDDEN은 무시. 건물 벽 폴리곤과 이어지지 않은 벽 선(대지 담장)은 제거.
  - 층 순서: 파일 이름의 1F/02F/B1/층. 옵션: 색(동선 강조/프로그램), 방향 4, 층 간격, 벽 높이(기본 1.2m), 가구 토글, 제목. PNG 2배 저장(canvas + SVG 합성). 예시 도면(가상 3층) 버튼.
  - 스크래치 원본: `S/ax/exax.js` → `python3 S/ax/inject.py`로 crit.html 블록 교체. 테스트 `S/ax/tex.js`(예시 + HOUSE PARK 8층 DXF).
- **아틀라스 정교 모형 19채**(BSIG 79채): 신규 buseoksa, seokguram, soswaewon, haein, hahoe, kyungdong, leeum, mmca, sewoon, bonte, seoullo, museumsan, forbidden, himeji, katsura, kanazawa / 개선 space, lotte, churchlight. 패치 `S/sig15/{A,B,C,D}.js`, 브리프 `S/sig15/BRIEF.md`. AT_HALLS에 배치(전통 12·서울 현대 16·신전 15·빛물땅 13·하늘 6). 63bldg는 서울의 현대 방에.
- 다음 버전 시작 기준: v15 커밋 이후 origin/main.

## v16 (2026-10-17 새벽) — 아이패드 가벼운 모드 · 정교 모형 지연 로드 · 분해 액소 예시 · 취향 랩 AI 맞춤 조합
- **가벼운 모드 `html.lite` / `window.ZLITE`**(head 첫 스크립트): 터치 기기(pointer:coarse, iPadOS 데스크톱 UA+터치)·코어 4 이하·메모리 4GB 이하에서 켜짐, `?lite=0/1`로 강제. 켜지면 ① liquid-glass 네비(html2canvas 전체 화면 캡처 — 화면 바뀔 때마다 수 초 멈춤의 주범)를 아예 불러오지 않음(데스크톱도 이제 load 뒤 지연 로드 `vendor/html2canvas → container → button → nav-glass`) ② 셰이더 배경 30fps·폭 720px 상한(`effects/shader-gradient.js`) ③ 상단 바 말고 모든 backdrop-filter 끔(+유리 바들은 거의 불투명 배경).
- **정교 모형 build 분리**: `build_public.py`가 node로 `const BSIG={…}`에서 build 함수만 떼어 `dist/data/bsig.js`(`__bsigFill({...})`, ~1.5MB)로, 페이지엔 메타만 → dist/index.html 4.1MB→2.6MB. 소스 crit.html은 그대로 한 파일(편집·merge.js 흐름 변화 없음). 런타임 `bsigLoad()`/`bsigNeed(id)`(BSIG_V 캐시 키) — `bldModel`·`bldModelInto`·아틀라스 오늘의 명작·도감 모달이 필요할 때 불러옴. `pgBuild`는 build가 없으면 일반 생성기.
- **분해 액소 예시 갤러리**(`#exAx` 위 `.exax-ex`): `EXSAMPLES` 3종(3층 근생=동선 강조 / 계단식 테라스 오피스 5층=프로그램 / 중정 주택 2층=남동) — 가상 DXF 생성기 `exSampleDXF`·`exSampleTerrace`·`exSampleCourt`(`exDXFKit`), 미리 그린 그림 `img/exax-{retail,terrace,court}.webp`(스크래치 `ax/tex_ex.js`로 렌더), 누르면 `exLoadSample(k)`로 작업대에 열림. 테라스(TERR) 폴리곤도 격자 범위에 포함.
- **취향 랩 AI 맞춤 조합** `#dnAi`(`#dnPick` 바로 위, `/* ===== 취향 랩 — AI 맞춤 조합 (v16) */`): 문장 → `dnaiSeeds`(단어 직접 일치 12점·건축가 이름 11점·개념 사전 `DNAI_LEX` 90여 개 8점~) → `dnaiCombos`: 슬롯(용도1·대지1·공간2·덩어리1·재료1·빛1·분위기1·동선1)을 씨앗으로 채우고 빈 칸은 씨앗 6축 벡터 코사인 + 갈래 가중으로 — A 컨셉 그대로 / B 한 걸음 옆(직접 언급 아닌 칸은 2순위) / C 의외의 한 수(덩어리·재료·빛을 약한 축 뒤집어 고르고 닮은 건축가 추가). 카드: 생성기 썸네일·페르소나·갈래 %·단어별 이유, "이 조합으로 짓기"(state.dna 교체 → 결과 열기) / "지금 고른 것에 더하기". 예시 문장 6개. 규칙 기반(ZIPLAN 엔진) — 외부 AI 호출 없음.
- 테스트: `scratch/perf15/prof.js`(iPad 에뮬·CPU 4배 느리게, 긴 작업 합), `cpu.js`(CPU 프로필), `tai.js`(AI 조합·예시 갤러리).

## v17 (2026-10-17) — 문 세 개 + 광장: 메뉴 4문 · 홈 재구성 · 모바일 탭 바 · 표지 소속 표시 · 쉬운 말 띠
- 방향: 리뉴얼 설계서(프로젝트 문서 `claude/ZIPLAN_리뉴얼_설계서.md`) 3장. 사이트를 **집 구경(look) · 내 집 짓기(build) · 건축 공부(studio) · 광장(together)** 네 문으로 정리. 일반인 입구 = 취향 랩, 학생 입구 = 설계 흐름. 기존 기능은 지우지 않고 자리만 옮김. '고를수록 [단어] 당신을 닮는다' 장면 유지.
- **메뉴 `NAVG`** 4그룹으로 교체(`const NAVG=[`). 항목 5번째 값이 `'soon'`이면 링크 대신 "곧" 배지(`.mg-a.soon`, `#navMenu .soon`, `.ts-a.soon`) — 건축 극장(cinema)·집 블록(game)·집 이야기(story)·건축주 가이드(buildguide)는 자리만. `NICO`에 film·blocks·steps 아이콘 추가. 컨셉 마법사·매스 도감·레시피는 메뉴에서 빠지고 '건축 공부 > 컨셉' 안에서만.
- **모바일 하단 탭 바** `#tabBar`(div, nav 태그 아님) + 시트 `#tabSheet`: `buildTabBar()`/`tabCurrent()`(`/* ===== 모바일 하단 탭 바 (v17) */`, buildNav() 바로 뒤, setTimeout+try). 홈·구경·짓기·공부·광장 — 문을 누르면 그 묶음의 방이 아래 시트로, 현재 문 강조, `route()`에서 `tabCurrent()` 호출. ≤820px에서만 표시(`html.hasTab body{padding-bottom}`), visualViewport 높이가 150px 넘게 줄면(키보드) `.kb`로 숨김, 시트 열리면 `html.tabsheet-open`으로 채팅 FAB 숨김. lite 모드에선 backdrop-filter 없음.
- **홈 순서**(`#view-home` 위→아래): `#photo`(표지 사진 장면 — 문구만 "집을 좋아하는 모든 사람의 공간"·문 세 개 링크) → `#homeDoors`(문 세 개 카드 + 광장) → `#homeToday`(01 오늘의 집 = 아틀라스 오늘의 명작 사진 / 02 이번 계절 가 볼 곳 = `TV_SEASON` 현재 계절 스팟, 날짜로 순환) → `#likeWrap`(닮는다 장면, "30초 취향 집 짓기" 링크 추가) → `#homeNow`(03 건축 극장 자리 — 마키 띠 + 명작 3채 예고편) → 리본 → `#homeTrips` → `#homeMeet`(04 광장 오늘 = `pzCh()` 주간 챌린지 / 05 집 블록 자리) → `#introHero`(06 내 집 짓기 띠 — 주소 폼·회전 단어·셰이더 유지, 키워드 칩 대신 "땅이 있어요/아직 없어요" `.hb-two`, 건축주 가이드 "곧") → `#homeStudio`(07 건축 공부 머리) → `#build` 스크롤 장면 → `.intro` → `#film` → 세 개의 집 story → `#alts` → `#pstrip` → 리본 → `#map`(한눈에 — 타일을 네 문으로 다시 묶음, 새 타일 `#tileAtlas`·`#tileTravel`·`#tileDna` 인라인 SVG) → `#pricing` → `#faq`. 채우기는 `homeV17Init()`(Boot 끝, `/* ===== 홈 v17 */`): 사진 썸네일(`bldImg`·`phImg`)만 쓰고 **3D·pgThumb는 만들지 않음**. `[data-atgo-b]` → #atlas 이동 후 `bldOpen`, `[data-tgo]` → #travel 이동 후 `tDetail`.
- **표지 소속 문**: RHERO 렌더의 `.rh-k` 앞에 `.rh-door`(NAVG에서 그 방이 속한 그룹 이름·색). 방이 어느 그룹에도 없으면(home·admin) 표시 없음.
- **쉬운 말 띠** `.ezwords`: `homeV17Init`이 `#view-zipcode`·`#view-dna` 표지 리본 아래에 삽입(건폐율·용적률·용도지역·일조 사선·연면적 / 대지·매스·외피·중정·필로티 한 줄 풀이). 건축 공부 쪽 용어는 그대로.
- CSS는 `/* ===== v17 — 문 세 개 + 광장 */` 블록(`@media print{#zchat{display:none}}` 바로 앞).
- `build_public.py` 공개용 배너 문구 수정: 로그인·저장은 이미 되므로 "AI 이미지 크릿과 광장은 정식 오픈 때"로.
- **공개 빌드에서 막힌 기능 조사(2026-10-17)**:

| 기능 | 막힌 이유 | 열려면 |
|---|---|---|
| 광장 올리기·댓글·좋아요 | `supabase/plaza.sql` 미적용(테이블 없음) | 사용자가 Supabase SQL Editor에서 plaza.sql 실행 → v21(P5)에서 공개 빌드 분기 열기 |
| 회원 등급·플랜 저장 | `supabase/tiers.sql` 미적용 | tiers.sql 실행 |
| AI 이미지 크릿(패널·사진 보내기) | claude.ai 아티팩트 전용 `sample` 이미지 API. 공개 사이트엔 AI 호출 경로 없음(규칙 기반 `LOCAL_AI`만) | 서버 함수(Vercel) + API 키 — 설계서 v22 이후 검토 |
| 파일 저장 `downloads.save` | claude.ai 아티팩트 API | 공개 사이트는 PNG·SVG·DXF 직접 다운로드로 이미 대체됨(안내 문구만 남음) |
| 학생증 인증 | 미구현(학교 메일만) | 결제(P6)와 함께 |
| claude.ai 계정 자동 로그인 안내 문구 | 공개 사이트는 Supabase 이메일·Google 로그인이 이미 됨 | 문구 정리됨(build_public.py) |

- 테스트(`/home/claude/_s/v17/`, 저장소 밖 스크래치): `t_home.js 1440|390` — 홈 섹션 순서·채움(오늘의 집/계절/극장 레일/챌린지)·메가 메뉴 4그룹·탭 바/시트·18개 라우트 `.rh-door`/현재 탭·pageerror 0·홈에서 three.js 요청 0 확인, 스크린샷 `shots/`. 헤드리스: html2canvas·liquid-glass·nav-glass 차단, cdnjs·jsdelivr·wikimedia 차단(이 세션은 네트워크가 막혀 three.min.js 로컬 라우팅을 못 했음 — 3D 화면은 onFail 경로로만 확인), `--use-gl=swiftshader`.
- 남은 한계: 극장·집 블록·집 이야기·건축주 가이드는 자리만(메뉴 "곧", 홈 섹션 자리). 오늘의 집·극장 레일은 위키미디어 사진이라 오프라인·차단 환경에선 빈 카드(`.noimg` 그라데이션). 홈 상단 `#photo`는 여전히 사진 4장(각 ~1672px webp) 선로드 — 다음에 모바일용 960px만 먼저 받도록 손질 가능. 쉬운 말 띠는 다섯 단어씩만. 탭 바는 Supabase 관리자 화면에서도 보임(admin은 '홈' 강조).

## v18a (2026-10-17 새벽, 이 세션) — 매스 진화 다이어그램 · 홈 카드 생성 사진
- **매스 진화 다이어그램** `#mevo`(패널 페이지, `#exAx` 바로 위, `/* ===== 매스 진화 다이어그램 (v18) */`, CSS `.mevo-*`): 6단계 아이소 선도 SVG — 흐름 6종 `MEVO_P`(pass 관통길·중정 / terrace 계단식 테라스 / lift 들어 올리기 / split 두 동+브리지 / stack 엇갈려 쌓기 / court 중정 링). `mevoSteps(k,W,D,F)`가 단계별 상자(b: m 매스·g 녹지·c 주변·k 코어·b 브리지)·지운 덩어리 점선(gh)·도로(rd)·화살표(ar)·라벨(tx)을 만들고 `mevoSVG(S,opt)`가 화가 알고리즘(정렬 키 x+y+z*2.5)으로 그림. 옵션: 대지 가로·세로·층수, 화살표 색, 글(영문+한글/영문/한글), 배치(2×3/3×2/한 줄). SVG·PNG(2배) 받기, "설계 흐름의 대지 가져오기"(FW.lot.w/d). 스크래치 원본 `ax/mevo.js`, 렌더 확인 `ax/tmv.js`(`www/mv.html?k=`).
- **홈 카드 사진**(`/* ===== 홈 표지 사진 (v18…) */`): 힉스필드 z_image로 생성한 6장(`HFC` look·build·studio·plaza·game·cinema, 2048×1536) — 문 카드 3장 배경(`.hd.hasph` + 아래 그라데이션), 광장/집 블록 카드 상단(`.hmph`), 극장 띠 배경(`.hnph`, 38%). 정식 사이트는 `/_vercel/image?url=…&w=640|960` (vercel.json remotePatterns에 cloudfront 있음), 그 외엔 `_min.webp`. 실패하면 이미지 제거(기존 그라데이션). 힉스필드 무료 요금제는 gpt_image·soul 모델이 막혀 있고 z_image만 됨(0.25크레딧 미만/장).

## v18b (2026-10-17) — 검색 노출용 정적 페이지 · 앱 딥링크 · sitemap/robots/404
- **무엇을**: `build_public.py`가 앱 빌드 뒤 node로 crit.html 데이터를 꺼내(BLD→BLDX, BSIG 메타 dims/desc/feats/see, TPL·PH·TFEAT·TV_SEASON·TV_ABROAD, KB2, ENC — 줄 범위로 const 블록을 잘라 `new Function`으로 평가, 스크립트는 `_EXTRACT`) 정적 HTML을 만든다. 맨 위 `SITE_URL`(지금 https://ziplan-site-dist.vercel.app) 하나만 바꾸면 canonical·OG·sitemap이 따라감.
  - `/atlas/<id>/` 809 (LandmarksOrHistoricalBuildings) — 이름·건축가·연도·도시·한 줄·단어, 정교 모형 79채는 설명·치수·특징·볼 곳, 가 보기(같은 id의 국내 여행지·해외 코스 + 근처 4), 같은 건축가·같은 나라
  - `/travel/<id>/` 144 = 국내 72 (TouristAttraction, geo, TFEAT·계절 추천·근처 6·같은 지역, 카카오맵 링크) + 해외 도시 코스 8 `/travel/tokyo/` 등 (TouristTrip) + 해외 스톱 64 `/travel/<bld id>/`
  - `/ask/<slug>/` 550 (FAQPage) — KB2 559개 중 인사·잡담 9개 제외. 법규·도시(+법 언급한 시공·일상·진로·학업) 답에는 "개략·관할 관청 확인" 상자
  - `/dict/<id>/` 47 (DefinedTerm) — ENC 도해 SVG 인라인, 실제 건물·같이 볼 말
  - 목록 `/atlas/` `/travel/` `/ask/` `/dict/`, `404.html`(noindex), `sitemap.xml`(1555 URL = 홈 `/` + 정적 전부, lastmod=빌드 날짜, 앱 해시는 넣지 않음), `robots.txt`(Sitemap 줄), `static.css`(공용 ~7KB, 다크 모드·390 대응). 앱 JS 없음.
  - 사진: 위키미디어 썸네일 직접 링크(bldImg 규칙: 500/1280, tif는 lossy-page1; PH는 같은 규칙으로 1920→1280/500 썸네일 계산). Vercel 이미지 최적화(/_vercel/image)는 일부러 안 씀 — 크롤러가 1,500쪽을 돌면 변환 한도를 먹기 때문. 사진 아래 작가·라이선스·파일 페이지 링크. 사진 없는 곳은 "자유 라이선스 사진 없음" 문구.
  - 홈 index.html: `<title>` 보강, canonical·og:url·og:image 절대 주소·og:site_name·twitter:card 추가. vercel.json: cleanUrls·images·기존 headers 유지 + static.css 캐시·sitemap Content-Type.
- **slug 규칙**(앱과 공유): crit.html `kbTopic(k)`(답이 `<b>용어</b>`로 시작하면 그 용어, 아니면 정규식의 평문 대안 3개, 없으면 정규식 정리; "~고르"→"~고르는 법" 등) + `kbSlugs(K)`(소문자·한글/영숫자·하이픈, 중복은 -2). build가 이 두 줄을 그대로 꺼내 쓰므로 **KB2 순서·정규식을 바꾸면 주소가 바뀔 수 있음**(바꾸면 옛 주소는 404 → 필요하면 vercel.json redirects).
- **앱 딥링크**(crit.html, `/* ===== v18b 딥링크 */` — data-atgo-b 핸들러 바로 뒤 `zDeep()`; `route()` 첫 줄에서 호출, 해시는 `split('?')[0]`로 비교): `#atlas?b=<id>` → bldOpen, `#atlas?b=<id>&build=1` → bldBuild(취향 랩), `#travel?p=<id>` → tDetail, `#ask?q=<slug>` → 채팅 열고 그 KB2 답을 바로 넣음(slug 없으면 `zcAsk(slug의 - → 공백)`, q 비면 채팅만 열기). 처리 후 `history.replaceState`로 해시를 `#atlas`/`#travel`/`#home`으로 정리 → 기존 `location.hash==='#atlas'` 비교들 그대로 동작. 새 CSS 없음.
- **테스트**(스크래치 `v18b/`): `t_static.js [static|dl] [m]` — 정적 6종 1440/390/390다크 스크린샷(`shots/`, 위키미디어는 자리표시 이미지로 대체), 가로 스크롤 0, JSON-LD 파싱, 딥링크 5종(데스크톱·모바일 모두 통과: 종묘 모달·창덕궁 후원 서랍·건폐율 답·없는 slug 폴백·savoye→#dna), 데스크톱 라우트 17 pageerror 0, `#atlas?x=1`→아틀라스. `t_sweep.js m` — 모바일 라우트 17 pageerror 0. `t_titles.py` — html 1558개 title 중복 0·canonical 중복 0·description 중복 0·h1·JSON-LD·이메일 없음. 로컬 서버는 `cd dist && python3 -m http.server 8790`(정적 페이지가 /static.css 절대 경로라 dist를 루트로).
- **크기·시간**: 정적 페이지 1554쪽, 평균 6.6KB(gzip ~3.5KB), 합계 ~10MB; 목록 /atlas/ 91KB·/ask/ 54KB. 빌드 전체 ~2–5초. dist 총 ~17.6MB(1626 파일).
- **남은 한계**: /ask/ 주소는 한글 slug(percent-encoding) — 배포 후 몇 개 열어 404 없는지 확인 필요. 정규식에서 뽑은 질문 제목 일부는 어색함(예: "축척 고르 도면", "코스 짜 건축", "좁은 넓어"). 해외 스톱은 위경도가 없어 geo 없음. 계절 추천 문구는 출처(TV_SEASON_SRC) 링크를 싣지 않음. 정적 페이지 사진은 헤드리스에서 실물 확인 못 함(자리표시). OG 이미지가 위키미디어 외부 URL이라 일부 SNS 미리보기에서 늦거나 안 보일 수 있음.
- **사용자 할 일**:
  1. 배포 후 `https://ziplan-site-dist.vercel.app/sitemap.xml`, `/robots.txt`, `/atlas/jongmyo/`, `/ask/건폐율/` 열어 확인.
  2. Google Search Console → 속성 추가(URL 접두어 `https://ziplan-site-dist.vercel.app/`) → 소유 확인(HTML 태그 방식이면 메타 태그를 알려 주면 build_public.py head에 넣음) → Sitemaps에 `sitemap.xml` 제출 → URL 검사로 `/atlas/jongmyo/` 색인 요청.
  3. 네이버 서치어드바이저 → 사이트 등록 → 소유 확인(HTML 태그/파일) → 요청 > 사이트맵 제출(`https://ziplan-site-dist.vercel.app/sitemap.xml`) → RSS는 선택, 웹 페이지 수집 요청으로 대표 페이지 몇 개.
  4. (선택) Bing Webmaster Tools에서 Search Console 가져오기. 도메인을 바꾸면 `SITE_URL`만 고치고 다시 빌드·제출.

## S1 (2026-10-17, 이 세션) — 정교 모형 +21 → 100채 · 전시실 8방
- 서브에이전트 3조 패치 `scratch/sig18/{A,B,C}.js`(소스·조립 `A_src/`·`B_src/`·`C_work/`, `node gen.js`), 브리프는 `scratch/sig15/BRIEF.md` 재사용, 병합 `scratch/v13/merge.js`.
  - A 전통: wolji 동궁과 월지 · cheomseong 첨성대 · tongdosa 통도사 · sudeoksa 수덕사 대웅전 · bongjeong 봉정사 · dosan 도산서원 · yangdong 양동마을
  - B 궁·성곽·근대: changgyeong 창경궁 · namhan 남한산성 · sungnyemun 숭례문 · seokjojeon 덕수궁 석조전 · jeondong 전동성당 · gyesan 계산성당 · yakhyeon 약현성당
  - C 현대: amore 아모레퍼시픽 · acc 국립아시아문화전당 · seoulstation 문화역서울284 · busancinema 영화의전당 · incheonair 인천공항 T1 · ewha 이화여대 ECC(도감엔 'ecc'와 'ewha' 두 항목이 겹쳐 있음 — 모형은 ewha에) · sejong 세종문화회관
  - 모두 BSIG_SITE 'town', 출처·추정은 각 build 주석. 사실 메모: 계산성당 설계자는 자료마다 달라 이름 생략, 숭례문 복원 성곽 동 53m·서 16m, 첨성대 9.17m(1997 실측 9.11m 병기), 봉정사 1363 중수.
- AT_HALLS 재편 8방: 궁궐과 성곽(kold 10) · 산사와 서원(ktemple 12, 새) · 한국의 근대(kmod 8, 새 — myeongdong·cityhall 옮김) · 서울의 현대(19) · 신전과 대성당 · 근대의 거장들 · 빛·물·땅 · 하늘로. 전시실 문구는 `AT_HALLS.length`로.
- dist/data/bsig.js 2.4MB(지연 로드), dist/index.html 2.66MB. 남은 한계: 공용 env 코드가 build마다 복제됨(BSIG_ENV 공용화 여지), 월지·통도사·양동 먼 산이 안개로 희게, 남한산성 eye 뷰는 숲이 성벽 일부를 가림.

## v18c (2026-10-17)
- 물어보기 제목: `const KB_TITLE={첫 정규식 대안: 자연스러운 제목}` (crit.html kbTopic 바로 위). kbTopic이 가장 먼저 참조 → 정적 /ask/ 페이지 제목·슬러그도 바뀜. 207개(정규식 추출 203 + 중복 4) 수동 제목. 새 KB2 항목 추가 시 제목이 어색하면 여기에 추가. build_public.py `_EXTRACT`도 KB_TITLE 줄을 함께 읽음.
- kbSlugs가 자모(ㄱ-ㅎ) 허용 (예: 한옥-배치-ㄱ자-ㄷ자-ㅁ자).
- 안개: `pgFogLife(T,sc,B,c)` — 정교 모형(P.sig)은 K.life 바운딩 반경까지 fog.far 확장(최대 4200), near=far*.28. 월지·통도사 배경 산이 하얗게 날아가던 문제 해결. PGV fit + 썸네일 두 곳에서 호출.
- v15 공용 배경 헬퍼의 WATER(12개 모형): roughness .05, metalness .02, color 0x4f7d8c → 큰 하얀 태양 반사 얼룩 대신 작은 반사점.

## S2 · v18d (2026-10-17 오후)
- **정교 모형 +12 → 112채**(서브에이전트 2조, 패치 `scratch/s2/JA.js`·`JB.js`, 원본 `s2/ja/`·`s2/jb/`, 브리프 `s2/BRIEF.md`): 일본 전통 horyuji·todaiji·ise·kiyomizu·itsukushima·ginkakuji / 일본 현대 yoyogi·nmwa·tokyoforum·kagawa·yokohama·moriyama. 모두 BSIG_SITE 'town', 추정 치수는 build 주석 "// 추정:". itsukushima는 eye 뷰가 바다 쪽 오토리이 너머로 보이도록 배치 전체를 약 40° 돌려 둠(front 뷰 비스듬).
- 전시실 9방: 새 `japan` '일본의 나무와 콘크리트'(16채 — byodoin·kinkakuji·himeji·katsura를 신전과 대성당에서 옮김).
- **개선 3채**(`s2/FIX.js`): 63bldg 재작성(기도하는 손 곡선 테이퍼 78→50m, 2층마다 단, 금빛 커튼월 텍스처, 옥탑·안테나, 둔치), namhan 성벽 앞 숲 비움, bongjeong 시점 힌트.
- **eye 시점 힌트**: BSIG 항목에 선택 `eye:{az,el,dist,cy}`(az π/2=정면 +z, dist는 기본식 b*0.95 대신 배율) → PGV `api.view('eye')`가 읽음(가까운 방향으로 회전). 지금 63bldg·namhan·bongjeong. `scratch/v13/merge.js`가 eye 키를 직렬화하도록 고침.
- **정교 모형 파일을 건물마다**: build_public.py가 `dist/data/bsig/<id>.js` 112개(평균 25KB, 최대 58KB)로 쪼갬 — 한 건물 열 때 2.8MB 대신 그 건물 파일만. 런타임 `bsigLoad(id)`(id 없으면 전부). `data/bsig.js`는 더 안 만듦. (BSIG_ENV 공용화로 소스 자체를 줄이는 건 여전히 남은 일 — 이제 급하지 않음)
- **홈 표지 사진**: 불 켜진 레이어 `.pimg.on` 3장은 data-src로 두고 첫 스크롤·터치 또는 load+1.2초 뒤에 불러옴(reduced-motion이면 즉시) → 첫 화면 다운로드 약 650KB(데스크톱)/250KB(모바일 960) 감소.

## v18e (2026-10-17 저녁) — 표지 '안으로' 장면
- 같은 사진을 2.8배까지 확대하던 끝부분을 걸어 들어가는 연출로 바꿈: 정면이 현관 쪽으로 다가감(0.60–0.80, 확대 폭 줄임) → 현관 앞 사진 `.pe1`(0.64–0.715 크로스페이드, 블러가 풀리며 한 걸음 더) → 따뜻한 빛 `.pglow`(0.78–0.94) → 문 안 2층 높이 홀 사진 `.pe2`(0.80–0.90) → 어둡게(0.93–).
- 사진 2장은 힉스필드: 현관 = nano_banana_2_1에 기존 표지(l-bg-on.webp)를 참조로 넣어 같은 집 유지(1.5크레딧), 홀 = z_image(0.15). id는 crit.html `PE` 배열. 컨테이너에서 cloudfront를 못 받아 로컬 파일 없음 — 정식 사이트는 `/_vercel/image`(640/1080/1920), 그 외엔 cloudfront 원본. p>0.3이 되면 불러옴(`peLoad`). 실패하면 img 제거(예전처럼 정면만).
- (같은 날 저녁 추가) 사진 2장 더(z_image): 거실(벽난로·숲 유리벽) `.pe3`, 아침(안개 낀 숲·데크) `.pe4` → 흐름: 현관(0.585–0.65) → 홀(0.70–0.76) → 거실(0.80–0.86) → 아침(0.885–0.94), 따뜻한 빛 두 번, 마지막 캡션 `HOME 아침, 집`(data-i=4), 어둡게는 0.975–1.0만(아침이 다음 밝은 섹션으로 이어짐). `.photo` 높이 460→540vh(모바일 360→430vh).
- 남은 힉스필드 크레딧 0.05 — 더 못 만듦. 영상(이미지→영상)은 5크레딧부터.
- 고층 모형 aerial: 건물 높이가 폭의 0.9배 넘으면 cy=높이×0.46, el .46, 거리 ×1.1(63빌딩·롯데 꼭대기 잘림 해결).

## S3 · v18f (2026-10-17 밤)
- **정교 모형 +18 → 130채**(서브에이전트 3조, 패치 `scratch/s3/{CN,US,EU}.js`, 원본 `s3/cn|us|eu/`, 브리프 `s3/BRIEF.md`): 중국 templeheaven·potala·suzhoumuseum·birdsnest·cctv·shanghaitower / 미국 robie·eames·disneyhall·seattle·getty·onewtc / 유럽 bauhaus·pompidou·tatemodern·elbphil·therme·oslo. 모두 'town', eye 힌트 있음, 추정은 build 주석.
- 전시실 11방: 새 `china` '중국의 축과 그물'(forbidden 옮김 + 6), `icons` '도시의 현대 아이콘'(pompidou·tatemodern·elbphil·disneyhall·seattle·getty). master에 robie·bauhaus·eames, poetic에 therme·oslo, sky에 onewtc.
- 고친 모형(`s3/FIX.js`): hahoe 산을 둥근 숲 능선으로(절벽은 부용대 하나), itsukushima 40° 회전 제거 + eye 힌트.
- **물어보기 +100 → 659**(`scratch/kb3/KB3.js`, KB2 끝 `/* v18f 추가 100 */`, 출처 표 `kb3/report.md`): 용어20·법규15(조문·개략 문구)·구조재료환경15·역사거장15·한옥8·시공인테리어12·학업진로10·도시5. 정적 /ask/ 650쪽, 전체 1,658쪽.

## S4 · v18g (2026-10-17 밤)
- **정교 모형 +36 → 166채**(서브에이전트 6조, 패치 `scratch/s4/{LA,ME,AF,SA,OC,KR}.js`, 원본 `s4/<그룹 소문자>/`, 브리프 `s4/BRIEF.md`): 중남미 brasilia·niteroi·masp·barragan·machupicchu·elcastillo / 중동 mia·heydar·zayed·shahmosque·domerock·petra / 아프리카 giza·abusimbel·djenne·lalibela·alexandrina·hassan2 / 남·동남아 marinabay·borobudur·watarun·dhaka·chandigarh·lotustemple / 오세아니아 parliamentau·fedsquare·tepapa·roseseidler·cardboard·eurekatower / 한국 현대 frembassy·seoularts·kyobo·peacegate·olympicstadium·sayuwon. 모두 'town' + eye 힌트, 추정은 build 주석.
- 전시실 16방: 새 latam·mideast·africa·southasia·oceania, 한국 현대 6채는 '서울의 현대'(knew)에.
- 사유원 명정 안벽은 자료의 "붉은 벽"에 맞춰 붉은 톤(0x9b4a36, 색조 추정). 올림픽주경기장은 1984 원래 모습 기준(2023~26 리모델링 중).
- 자평 약한 것: tepapa(중하, 형태 대부분 추정), dhaka·fedsquare·mia·sayuwon·seoularts·kyobo·peacegate(중).

## S5 · v18h (2026-10-18 새벽) — 주변 환경 보강 53채 · 바닥 깜빡임
- **뷰어 일반 보정**(`pgDeflicker`, pgBuild의 SIGB.build 직후): 얇은 판(≤0.35 m, ≥4 ㎡)이 같은 높이에서 다른 재료와 겹치면 나중 것을 1.2 cm씩 올림, 땅 높이 판은 bldg +1.5 cm·life +0.6 cm, 이 빌드에서 만든 재료는 첫 사용 순서대로 polygonOffsetUnits(−0.5×순번, 최대 60). 카메라 near = 거리×0.008(0.5~6). 로그 깊이 버퍼는 polygonOffset을 무력화해서 안 씀. 검사 스크립트 `scratch/p29/zf.js` → `scratch/zf/report.json`(겹침 면적 약 80% 감소).
- **환경 보강 53채**(5조 패치 `scratch/s5/G0~G4.js`, 브리프 `s5/ENV.md`): glasshouse·barcelona·rotonda·sydney·eiffel·myeongdong·podo·cityhall·watarun·lalibela·pompidou·birdsnest·domerock·yokohama / sumiyoshi·gilardi·pantheon·unite·ronchamp·kinkakuji·hiroshima·geunjeongjeon·burj·cctv / savoye·kimbell·louvrepyramid·parthenon·tajmahal·ddp·byodoin·nseoultower·incheonair·shanghaitower·heydar·roseseidler / farnsworth·guggenheimny·sendai·habitat·teshima·louvreabu·sagrada / fallingwater·salk·waterchurch·seagram·nakagin·chichu·bangju·casamila·lotte·kagawa. 방식: 건물 본체 그대로, build 끝에 v15 E + v13 W 헬퍼 복사본 블록으로 지형·숲·물·이웃을 K.life에, `E.own()`(뷰어 기본 바닥 숨김) + `tidy(1)`. 가가와 방위 오류(북쪽이 바다) 수정, 판테온 드럼 3 cm 내림, 인천공항 활주로 층 분리. 새 eye 힌트: pantheon·nseoultower·sagrada.
- 주의(다음 작업자): 엔트리가 tidySite()/tidy()를 먼저 부르면 그 뒤에 life에 더한 것은 숨겨짐 → 환경 블록 뒤로 옮길 것. 렌더 서버 메모리 ~7 GB라 동시 브라우저 많으면 OOM — 한 번에 몇 개씩. pkill -f로 자기 셸까지 죽이지 말 것.
- 남은 약한 환경: busancinema·sewoon(흰 상자), sejong·acc·leeum, taipei101·angkor 바닥, cityhall 광장 흰 바닥. dist/data/bsig 6.0MB(건물당 평균 36KB).

## S6 · v18i (2026-10-18 아침) — 남은 깜빡임 일괄 정리 · 도시 바닥 길 읽히게
- **뷰어 2차 보정 `pgDeflicker2`**(pgBuild 끝, SIGB일 때 최대 3회 반복): 병합 메시·지형·질감 바닥처럼 판째 들 수 없는 경우, 위를 보는 수평 삼각형을 (메시, 높이 1 mm) 조각으로 묶어 1.2 cm 안에서 다른 재료와 겹치는 조각만 꼭짓점을 옮김 — 모형 쪽(site·bldg)은 높은 쪽을 1.2 cm씩 위로, 배경(life)은 아래로(메시 크기×0.0002, 0.03~0.2 m; life 메시는 한 번만). 큰 조각은 상자 겹침, 작은 조각끼리는 삼각형 겹침으로 판단. 공유 지오메트리는 복제 후 수정. 비용: 무거운 모형도 1회 100 ms 안(상하이타워 84 ms).
- **검사 스크립트 `scratch/s6/zf6.js [ids] [patch|none] [out]`**: 예전 zf.js와 같되 위를 보는 면만·1.05 cm 창(밑면 겹침은 안 보이므로 제외). 대상 14채 모두 0(프랑스대사관 길 일부만 남음). 전체 결과 `scratch/s6/zfAll.json`.
- **도시 블록 바닥판**: `cityGrid`(25채 공용 헬퍼)와 W `ring`(30채)이 블록마다 보도·필지 판(밝은 포장, 빈 칸 일부 공원 녹색)을 깔아 사이가 길로 읽힘. ring은 `pads:false`로 끌 수 있음.
- **환경 개별**: acc·busancinema·sejong·leeum·sewoon 평지 지형색을 아스팔트 톤(0.40)으로, taipei101 바닥판 0x8f8e8a, busancinema 센텀 가로수 줄(추정), cityhall 서울광장 잔디·포장 색 짙게, angkor 들판 0x6c8048, 63bldg 뷰어 기본 바닥 숨김(둔치·여의도 판과 겹침), frembassy 도로 아래 지형 평탄화.
- `__atlas`에 `pgDeflicker2` 노출(디버그용). 렌더 확인: 대상 8채 전/후 + cityGrid·ring 사용 47채 aerial — 깨짐 없음, ERR [].
## U1 · v19 (2026-10-18 아침) — 홈 다이어트 + 시각 언어 통일
지인 피드백("단조롭고 어지럽다")에 따른 덜어내기. 기능·데이터는 지우지 않고 옮기거나 숨김.
- **표지 필름은 (a) 압축**을 골랐음(사용자 결정): `.photo` 540vh→210vh(폰 430→190vh). 만든 사진 4장(현관·홀·거실·아침)을 살리면서 홈 길이 목표를 맞추려고. paint 앞에 `remap`(0–.2→0–.3, .2–.38→.3–.56, .38–1→.56–1)으로 불 켜짐·선 그리기를 짧게, 현관→홀→아침은 빠르게. 첫 화면에 문 세 개 + 주 버튼 `.pcta` "30초 취향 집 짓기".
- **유지(사용자 요청)**: 표지 바로 아래 '고를수록 [단어] 당신을 닮는다' 가운데 단어만 바뀌는 장면(#likeWrap) — 280vh→150vh(폰 140vh), 단어는 집·빛·재료·창·마당·지붕, 링크 2개.
- **#build 하나를 두 방이 나눠 씀**: `placeBuild(h)`(route 안)가 `#build`를 패널 방 `#pnSlot`(data-mode=panel: PANEL 여섯 장만, 430vh/폰 370vh)이나 건축 공부 `#lineSlot`(data-mode=line: LINE→PLAN→RISE→LIGHT→HOUSE만, 400vh/폰 330vh)으로 옮김. paint가 mode로 구간을 나눔(line: P×0.5 — 사진이 보드로 줄어들기 전까지, panel: 0.5+0.5P, 그림 숨김).
- 숨김 판정: 장면들이 `$('#view-home').hidden` 대신 `vOff(el)`(자기 .view가 숨었는지)로 멈춤.
- 높이(scrollHeight): 홈 데스크톱 35,370→7,495px, 폰 34,138→7,131px. 섹션 21→9(표지·문·오늘·닮는다·여행·광장/극장·내 집 짓기·건축 공부·FAQ). 홈의 스크롤 필름 3→1, 흐르는 글자 띠 3→0(가로 리본 2개·극장 마퀴 제거). reduced-motion이면 전부 정지(폰 5,453px).

| 무엇 | 어디서 | 어디로 |
|---|---|---|
| PANEL 여섯 장 (#build 패널 부분) | 홈 | 패널 방 `#view-panel` `#pnSlot`(분석 랩들 뒤, 레이아웃 7 앞) + 히어로 링크 "여섯 장 한 세트 보기 ↓" |
| LINE→HOUSE 필름 (#build 앞부분) | 홈 | 건축 공부 `#view-flow` → `#studyTour` 맨 앞 `#lineSlot` (히어로 링크 "선이 집이 되는 과정 먼저 보기 ↓", `data-jump`) |
| 매니페스토 `.intro` · PROCESS 7 `#film` · 4단계 `#homeStory` · 세 개의 답 `#alts` · 손에서 벽까지 `#pstrip` · 한눈에 15개 방 `#map` | 홈 | `#view-flow` 작업대 아래 `#studyTour`("건축 공부 둘러보기") |
| 요금표 `#pricing` | 홈 | 새 라우트 `#pricing`(`#view-pricing`). "금액은 가정입니다" → "정식 금액은 오픈 때 안내". 학교 플랜(곧 열립니다) 카드 hidden. 홈엔 건축 공부 띠의 "요금 · 얼리버드 사전 신청 ›" 한 줄 |
| 건축 극장 섹션 `#homeNow`(네온 마퀴) | 홈 | 광장 옆 카드 `.hm-cine` 하나("곧 개봉" — 홈의 유일한 '곧') |
| 집 블록 '곧' 카드 | 홈 | 숨김(메뉴 NAVG에서도 game·buildguide 숨김, 라우트·코드 유지) |
| 내 집 짓기 히어로 `#introHero`(ZIPLAN 조립 애니·셰이더·건축주 가이드 '곧') | 홈 | 짧은 띠 `#homeBuild`(2단: 땅이 있어요/아직 없어요 + 주소창 | 예시 사진). '모두의 [단어]'는 집·마당·지붕·창·방·건축 |
| 건축 공부 띠 | 홈 | `#homeStudio`(큰 사진 + 한 줄 + "작업대 열기") |
| FAQ 재학생 할인 문항 | 홈 FAQ | 삭제(5개 남김, 학생가는 #pricing) |
| 로그인 창 "재학생 월 3,900원"·재학생 체크·재학생 인증 탭 | 로그인 첫 화면 | 숨김. 인증 탭은 로그인한 뒤에만(setAuthTab), #pricing의 재학생 인증 버튼은 그대로 |
- 시각: 문 세 개 카드 주황·파랑·초록 그라데이션 → 실사진 + 같은 어두운 오버레이(#1d1d1f), 홈 배지 한 색, 강조 #2997ff. 폰에선 문·오늘의 집·광장/극장이 옆으로 넘기는 레일.
- 광장 서버 테이블(plaza_posts)이 없으면 '광장 오늘' 카드 숨김(극장 카드만 남고 `.solo`).
- 남은 것: FAQ는 글만 있는 섹션(예외로 둠). '닮는다' 띠의 파란 셰이더는 사용자가 유지 요청한 장면이라 남김. 다음은 U2(취향 랩 3단계).
## U2 · v19b (2026-10-18 아침) — 취향 랩 3단계 + 결과 공유 카드
일반인이 1분 안에 끝내도록 #dna 기본 화면을 사진 카드 3단계로 바꿈. 532단어 화면은 지우지 않고 '고급'으로.
- **구조**: `#view-dna` 맨 앞 `#dnQuick`(3단계·결과), 바로 뒤 `.dnadv-bar`(고급 상단 띠 "← 3단계 결과로"). 기본(quick)일 땐 `#view-dna:not(.dn-adv)>:not(#dnQuick)` 전부 숨김, `dnMode('adv')`면 기존 화면(히어로·단어·결과·도감)만. `.dnmarq`(흐르는 단어 띠)는 항상 숨김.
- **진입**: route `h==='dna'` → `dnqEnter()`(quick, 1단계부터. 세 단계 다 고른 기록이 있으면 "지난 결과 보기"). `renderDnaResult()`·`bldBuild()`는 시작할 때 `dnMode('adv')` — 아틀라스 "이 건물처럼 짓기", 크릿·감정별 대안 등 기존 흐름은 그대로 고급 화면으로 감.
- **흐름**: 단계당 8~9장, 최대 3장(넘치면 가장 먼저 고른 것이 빠짐), 진행 표시 1/3·2/3·3/3, 이전·건너뛰기, 하단 고정 바(폰은 탭바 위, 단계 화면에선 물어보기 버튼 숨김). 카드 그림 = `pgThumb(pgSpec(카드 단어,{site}))` 우리 모형 렌더(외부 사진 없음), WebGL 실패 시 단어 아이콘+색 카드.
- **클릭 수**(테스트): 홈 "30초 취향 집 짓기" 1 + 단계마다 2장+다음 = **10회**로 결과(1440·390 동일). '둘 중 하나 8판' 모드는 이번엔 안 만듦.
- **결과**: 3D(`PGV`, reduced-motion이면 자동 회전 끔, 실패 시 고른 카드 그림+안내) + 유형 이름 `DNA_MOOD + 방향 이름`(예: "자연을 닮은 하나의 큰 지붕 아래") + `dnaLine` 한 줄 + 페르소나 + 고른 카드 칩 + **실제 건물 3채**(`bldSimilar` 중 정교 모형 166채 우선, `bldCard`→`bldOpen`) + 버튼: 이미지 저장 · 링크 복사 · **내 땅에 지어 보기(#zipcode)** · **더 세밀하게 고르기(고급)**.
- **공유 PNG** `dnqPNG()`: 1080×1350 캔버스(밝은 베이지 바탕, ZIPLAN 워드마크, 3D 화면 캡처, 유형 이름·한 줄, 고른 카드 3장, "나도 1분 만에 해 보기 → 호스트"). 링크 복사는 텍스트+`/#dna` (고른 값이 담긴 딥링크는 아직 없음).
- **기록**: 결과 때 `state.dna`=카드 단어 합집합, `DV.site`=2단계 첫 장소, `state.dnq={p:[[],[],[]],t}`, `touch('dna')`+`saveSoon()`(스타일 프로필에 그대로 쌓임), `dnaLibSet`에 alt '3단계' 기록 1건.
- **고급(532단어)**: 들어가면 3단계 단어가 이미 골라진 상태. 카테고리는 접힘(고른 단어가 있는 카테고리·검색 중·탭 선택 시 펼침, 머리 눌러 펼치기), 카테고리당 12개 + 고른 단어만 보이고 "N개 더 보기". 전문어(`DN_JARGON` ∩ 사전에 항목 있는 것)에 '건축 용어' 꼬리표 → 누르면 `dnEncOpen()` 모달에 ENC 카드(단어는 안 골라짐). 레이더·이름·세 갈래는 3개 이상부터(그 전엔 "N개 더 고르면…").
- 디버그: `window.__dnq`(state·DNQ·기록). 테스트 스크립트는 저장소 밖(/home/claude/u2/t.js·fb.js).

**카드 → 단어 매핑 (`DNQ_STEPS`)**

| 단계 | 카드 | 단어 (site) |
|---|---|---|
| ① 분위기 | 따뜻한 나무 집 | 목재 · 따뜻한 · 노출 목구조 · 박공지붕 |
| | 차분한 콘크리트 | 노출 콘크리트 · 고요한 · 단순한 박스 · 미니멀 |
| | 밝은 흰 집 | 흰 회벽 · 깨끗한 · 하얀 집 · 평지붕 |
| | 한옥 | 한옥 · 기와 · 처마 · 마당 |
| | 자연 속 오두막 | 오두막 같은 · 자연스러운 · 적삼목 · 깊은 처마 지붕 |
| | 도시적인 집 | 도시적 · 금속 패널 · 유리 · 적층 |
| | 붉은 벽돌집 | 붉은 벽돌 · 소박한 · 벽돌 |
| | 가볍고 투명한 집 | 투명한 · 유리 · 들어 올리기 · 가벼운 |
| ② 사는 곳 | 도심 | 도심 협소지 · 소음 막기 (city) |
| | 좁은 골목 | 골목 · 담장 (alley) |
| | 주택가 | 신도시 필지 · 남향 (suburb) |
| | 오래된 마을 | 오래된 마을 · 골목 마을 (village) |
| | 숲 속 | 숲 · 나무 그늘 · 큰 나무 지키기 (forest) |
| | 산자락 | 산자락 · 산 조망 · 지형 순응 (mountain) |
| | 바닷가 | 바다 조망 · 바람길 · 물가 (sea) |
| | 호숫가 | 호숫가 · 물에 비친 빛 (water) |
| | 들판 | 들판 · 멀리 보이는 수평선 (field) |
| ③ 중요한 것 | 빛 | 남쪽 큰 창 · 천창 · 햇볕 드는 창가 |
| | 마당 | 안마당 · 중정형 · 나무 그늘 |
| | 넓은 거실 | 오픈 플랜 · 복층 거실 · 큰 방 하나 |
| | 수납 | 벽 속 수납 · 다락 · 서가 벽 |
| | 조용함 | 사생활 지키기 · 고요한 소리 · 안쪽 깊은 집 |
| | 높은 천장 | 높은 천장 · 보이드 · 노출 천장 |
| | 작업실 | 작업실 겸 집 · 반지하 작업실 |
| | 아이 키우기 | 아이 키우는 집 · 숨바꼭질 · 문턱 없는 집 |
| | 반려동물 | 반려동물과 사는 집 · 앞마당 · 맨발로 걷는 바닥 |

- 남은 것: 둘 중 하나 8판 모드, 고른 값이 담긴 공유 딥링크, 폰 고급 화면에서 위에 붙는 '지금 짓는 집' 패널이 단어를 일부 가리는 기존 배치(U3에서 볼 것), WebGL 실패 시 결과 큰 그림이 비어 보일 수 있음(카드 그림도 못 만들 때).
## U3 · v19c (2026-10-18 오후) — 정리 마무리: '곧' 문구 · 쉬운 말 · 물어보기 버튼 · 푸터
- **'곧/준비 중/정식 오픈' 문구**(공개 화면 기준, 극장 예고만 남김). 공개 빌드에 '정식 오픈'이 남으면 build_public.py가 assert로 멈춤.

| 위치 | 전 | 처리 |
|---|---|---|
| #pricing 머리 `.tag` | 정식 금액은 오픈 때 안내… | "지금 가입하면 얼리버드 혜택과 정식 금액을 가장 먼저 알려 드려요." |
| #pricing 학교 카드(hidden) | 곧 열립니다 | "학교 단위 문의" 버튼(data-ask), 카드는 계속 숨김 |
| AI 배너 + 이미지 크릿 버튼(#critBtn·#pfCrit) | 이미지 크릿만 준비 중 / 버튼 비활성 | 문구 삭제, 버튼 숨김(hidden) |
| 재학생 메일 오류 문구 | 학생증 인증은 정식 오픈 때 | 삭제 |
| KB2 요금·학생 할인 답 | 학교 플랜은 준비 중 / 곧 열릴 예정 | "학교·학과 단위 이용은 문의하기로" |
| 메뉴(NAVG) '집 이야기' | 곧 배지 | 숨김(game·buildguide·story) — 메뉴의 '곧'은 건축 극장 하나 |
| 광장 상태 문구 | 서버 테이블이 아직 준비되지 않았어요(관리자: plaza.sql) / 정식 광장이 열리면 옮겨 드려요 | "지금은 이 기기에 저장돼요."(관리자 안내는 console.info) |
| 공모전 달력 머리 | 곧 열리는 공모전 | 다가오는 공모전 |
| privacy.html · terms.html 7. 문의 | 문의 주소는 정식 오픈 시 | '물어보기' → '문의하기'로 |
| build_public.py 공개용 치환 6개 | …정식 오픈 때 열립니다 | 지금 되는 것만(“로그인하면 계정에 저장돼요”, “PNG·SVG·DXF로 내려받아 주세요” 등). 원문이 없어진 치환 5개 삭제 |
| 푸터 | (프로토타입) · ShaderGradient 크레딧 | 새 푸터, 크레딧은 licenses.html로 |
| 유지 | 홈 '건축 극장 · 예고 — 곧 개봉', 메뉴 건축 극장 '곧' | 사용자 결정(극장 예고 1개) |
| 유지(공개 아님) | 관리자 상태 칩 '· 준비 중' | 관리자만 봄 |
- '곧'이 "즉"의 뜻인 문장(…이 곧 벽이 된다 등 40여 곳)은 그대로.
- **쉬운 말**(일반인 화면만, 건축 공부·패널·사전은 그대로): 내집코드 — 대지 치수→땅 치수, 필로티→1층 주차(필로티), 컨셉 잡기로→설계 아이디어 잡기로, 대지 답사로→땅 답사 키트로, 단면 — 법이 허락하는 그릇→잘라 본 모습 — …, "단면에서 확인"→"아래 잘라 본 그림에서 확인", 예시 대지→예시 땅, 평평한 대지→평평한 땅(4곳 공용). 요금 — 크릿/크리틱→작업 피드백, 매스 3D→3D 덩어리 모형. 아틀라스 — 탭 '컨셉'→'테마'(문구 3곳), 파사드→정면, 필로티·캔틸레버 전시실 소개 풀어 씀. 법규 용어(대지면적·건폐율·용적률·조문)는 그대로.
- **물어보기 버튼**: 폰(≤820) 44px 원형(글자 없음), 스크롤 중 `html.zscroll`이면 0.8배·옅게, 탭 바 위 76px 유지. 키보드(`html.kbopen`, visualViewport), 열린 모달(`[aria-modal=true]:not([hidden])`)·검색(#zs)·여행 서랍(.tv-dr.on)·로그인 창이면 숨김. CSS는 `/* v19c: 물어보기 버튼` (top-level — @media 안에 넣지 말 것).
- **푸터** `footer.zft`: 브랜드 / 둘러보기(집 구경·내 집 짓기·건축 공부·광장·요금) / 안내(이용약관·개인정보처리방침(굵게)·출처·라이선스·문의하기[data-ask]) / 사업자 정보 자리("정식 서비스 시작 때 표기" — 실제 번호·개인 메일 없음) + 참고용 안내. 폰은 2열. 새 정적 페이지 `licenses.html`(사진·지도·정교 모형·공개 SW·글꼴 출처), build 복사 목록에 추가.
- **U2 남은 것 해결**: 폰(≤900) 고급 화면 '지금 짓는 집'이 260px 스티키 → 72px 한 줄 띠(작은 3D·코드·개수·결과 버튼). 띠를 누르면 `.big`으로 원래 크기. PGV는 ResizeObserver로 따라감.
- 테스트(저장소 밖 `/home/claude/u3/`): `txt.js 1440|390`(공개 라우트 용어 스캔), `t.js`(홈·푸터·요금·내집코드·아틀라스 모달·취향 3단계→결과→고급, 1440/390, FAB 위치·숨김, pageerror 0).
## N1 · v19d (2026-10-21) — 공모·행사 캘린더
- **데이터**: `data/contests.js` 하나가 원본(앱은 `<script src="data/contests.js">`로 `window.ZCONTESTS`, build_public.py는 마지막 `window.ZCONTESTS` 뒤 `{…}`를 JSON으로 읽음 → **파일 본문은 반드시 엄격한 JSON**: 큰따옴표, 끝 쉼표 없음). 맨 위 `checked`(마지막 확인일)와 `items[]`.
- **항목 필드**: `id`(영문 slug, ics UID) · `title` · `org` · `type`(설계공모|학생공모전|아이디어공모|전시·행사|세미나) · `audience`[학생|실무|일반] · `deadline`(YYYY-MM-DD, 정렬·D-day 기준: 공모=접수/제출 마감, 행사=마지막 날) · `start`/`end`(행사, 선택) · `ongoing`(끝날짜 미정 전시면 true — 마감 지나도 '진행 중') · `region` · `benefit`(짧게) · `summary`(2~3문장, 우리 말로 — 원문 복제 금지) · `url`(원문) · `source`(날짜를 확인한 페이지) · `checked`.
- **규칙**: 직접 연 페이지에서 날짜를 확인한 것만 넣는다(추측·기억 금지). 포스터·이미지 쓰지 않음. 참가등록이 이미 끝나 새로 낼 수 없는 공모는 뺌(예: 등록 마감 후 제출만 남은 LOWCA·KIRA 모듈러). 공공 설계공모는 참가등록 마감을 deadline으로 쓰고 summary에 "참가등록 마감 기준" 명시. 날짜가 서로 다른 출처는 원문 쪽을 따르고, 모호하면 넣지 않음.
- **주간 갱신 절차**(예약 작업·블로그 '공모 소식' 연재와 공용): ① 마감 지난 항목 삭제(ongoing 제외) ② 출처 순회 — 주택폴리오 공공 설계공모 DB(jootek.com/folio/contests, 참가등록중), 씽굿·위비티·링커리어 건축 분류, 서울도시건축전시관·각 시도 건축문화제 기사, competitions.archi open 목록, 대한건축사협회 설계공모 게시판(kira.or.kr — 이번엔 접속 승인 실패로 못 봄) ③ 새 항목 추가, `checked`를 그날로 ④ 새 항목은 N1b의 field·who·team·level·req·prize·online·vis를 반드시 채움 ⑤ `python3 build_public.py` → 커밋·배포. 목표 12~25건. (예약 작업이 3일마다 실행)
- **앱**: 라우트 `#contests`(`#view-contests`, VIEWS·NAVG 건축 공부 메뉴 '공모·행사'), `ctRender()`(route에서 호출) — 대상·종류 필터(aria-pressed 칩), '마감 지난 것 숨김'(기본 켬, 오늘 날짜로 클라이언트 계산), 카드 = 날짜 블록(월·일·요일·D-day 배지: 3일 이내 빨강, 10일 이내 파랑) + 종류 아이콘 + 3줄 요약 + "원문 보기 ↗"(새 탭, noopener). 행사는 시작 전엔 시작일 기준 D-day, 기간 중엔 '진행 중'. 빈 결과 안내, 하단 면책·문의하기. CSS `/* N1 v19d */`.
- **링크**: 홈 건축 공부 띠 `#homeStudio`("다가오는 공모·행사 일정 ›"), 건축 공부 `#view-flow` 둘러보기 위 `.fwlink` 카드, 푸터 둘러보기, 패널 방 공모전 달력 안내문, 정적 페이지 공용 푸터.
- **정적·캘린더**: `dist/contests/index.html`(제목 "건축 공모전·행사 일정 — ZIPLAN", CollectionPage + 행사 항목 Event JSON-LD, sitemap 포함, 빌드 시점 기준 마감 지난 것 제외) · `dist/contests.ics`(종일 일정, 공모는 "[마감]" 접두, vercel.json Content-Type text/calendar). 앱의 ".ics 받기"는 `contests.ics`.
- 첫 데이터(2026-10-21 확인) 24건: 공공 설계공모 9(주택폴리오 집계) · 서울도시건축전시관 행사 7(헤럴드경제 2026.10.3 기사) · 학생/일반 공모·전시 4(경기건축대전·실내건축대전·제주 건축사진 전시) · 해외 5(competitions.archi). 공공 공모 발주기관은 목록에 없어 "원문 확인"으로 둠.
- 테스트(저장소 밖 `/home/claude/n1/t.js`): 1440/390 필터·D-day·링크 속성·홈/건축 공부 링크·정적 페이지 JSON-LD·가로 스크롤, pageerror 0.
## R1 · v20 (2026-10-21) — 내 방 고치기 최소판 (#room)
지인 피드백 R1. 새 문 없이 '내 집 짓기' 안에. 차별점 = 치수 엔진 + 조명·전기 계획 + 시공 상담 연결(사진 인식 AI는 안 만듦).
- **진입**: 라우트 `#room`(`#view-room` > `#rmApp`, VIEWS·route `rmEnter()`), 메뉴 NAVG 내 집 짓기 '내 방 고치기'(아이콘 plan), 홈 `#homeBuild` 주소창 아래 한 줄 링크 `.hb-room`(섹션 추가 없음), 내집코드 히어로 아래 `.fwlink` 카드.
- **입력**: 예시 방 `RM_TPL` 5(원룸 330×550 · 작은방 300×300 · 안방 360×400 · 아이방 280×320 · 서재 270×300, 천장 230) 또는 가로·세로·천장(cm) + 문·창 목록(벽 0위 1오른쪽 2아래 3왼쪽, 위·아래 벽은 왼쪽 끝부터·좌우 벽은 위 끝부터 cm, 폭). 사진은 선택: `createImageBitmap`→캔버스 다시 그리기→JPEG(EXIF·GPS 제거, 테스트로 확인) → 메모리 objectURL만, 저장 안 함(`RM_PH`).
- **가구** `RM_FURN` 12종(일반 규격: 싱글 100×200 · 슈퍼싱글 110×200 · 퀸 150×200 · 책상 120×60/140×70 · 옷장 120×60/160×60(h200) · 책장 80×30(h180) · 서랍장 80×45 · 2인 소파 160×85 · 2인 식탁 80×75 · TV장 150×40). 앞 여유 권장 `RM_NEED`(침대 옆 60 · 책상·옷장·식탁 75 · 서랍장 70 · 책장·소파 60) — 참고 기준.
- **배치 엔진**(cm, 시드 고정 난수): 가구는 벽에 등을 붙임(침대는 머리 붙임 head / 옆 붙임 side). 후보 = 벽 4 × 10cm 간격. 금지: 겹침, 문 열림 사각형(문 폭×문 폭 +5cm), 키 120cm 넘는 가구의 창 앞. 탐욕 배치를 전략마다 80~100번 돌려 `rmEval` 점수 최고안: A 넓게 쓰기(구석 가산·걸을 바닥 가중), B 아늑한 침대(머리 붙임·문 반대 벽·양옆 여유), C 창가 책상(창 구간과 겹치면 가산). 세 안은 서명(`rmSig`)이 겹치면 다음 순위로.
  - 평가: 앞·옆 여유(`rmClear` — 같은 폭 띠 안의 가장 가까운 가구·벽), 60 미만 빨강·권장 미만 주황, 사람 지름 50cm 격자 플러드(`rmReach`, 10cm 칸, 문 앞에서 출발)로 '가구 앞까지 걸어갈 길' 확인, 걸어 다닐 바닥 ㎡(선택안만 정밀 계산), 침대 머리 창 아래 주의.
  - 원룸 기준 계산 0.6~0.7초(헤드리스).
- **평면 SVG** `rmSVG(L,{mini,elec,dims})`: 벽 포셰, 문(힌지=시작점, 안쪽 90° 호), 창(파란 선), 가구(침대 베개·의자 원·옷장 X·소파 등받이), 통로 폭 배지(중복 제거), 방 치수, 조명(천장등 ⊗·스탠드 점·간접등 점선)·콘센트(벽 위 번호)·스위치(검은 네모). 흰 종이 고정색이라 다크 모드에서도 그대로.
- **들어가나?** `rmFitCheck`: 방문 통과(문틀 안쪽 ≈ 문 폭−8cm, 높이 200cm 가정, 가장 짧은 두 변), 세우기(√(높이²+깊이²) vs 천장), 지금 배치에서 놓을 벽·앞 여유, 없으면 가장 긴 빈 벽.
- **조명·콘센트** `rmElec(L)`: 천장등(16㎡ 넘으면 보조등), 침대 머리 간접등·머리맡 콘센트 2, 책상 위 높이 콘센트+스탠드, TV장 뒤, 소파 옆, 서랍장 옆, 식탁 옆, 문 옆, 스위치(문 옆 약 1.2m). 콘센트는 문 구간만 피함(창 아래 가능). '지금 콘센트 N구'(기본 2)보다 추천이 많거나 에어컨·히터·의류관리기/건조기 체크 → "전기 공사가 필요할 수 있어요 — 등록된 전기공사업체" + 전기 상담 버튼.
- **팔레트** `RM_PAL` 5(따뜻한 나무·밝은 흰 방·차분한 회색·한지와 나무·벽돌과 빈티지), `state.dna` 단어와 겹치는 순으로(없으면 취향 랩 링크).
- **치수 조건** `rmShop`: 지금 자리에서 벽 따라 늘릴 수 있는 최대 길이(가구·문 열림·창(키 큰 가구) 만날 때까지), 깊이 ≤(앞 여유−권장), 키 큰 가구 높이 ≤ 천장−5, 방문 통과 조건. 제휴 링크 자리 `RM_SHOP={}` — 비면 '쿠팡에서 찾기'와 고지 문구 숨김, 넣으면 고지 문구가 목록 위에 뜨고 링크는 `rel="sponsored nofollow noopener"`. 떠 있는 광고 없음.
- **공사 체크리스트** `RM_CHK` 8 → '견적 상담 받기' `rmAsk()`: 문의하기 창을 열고 종류 '공사 · 견적 상담'(새 옵션) + 방 치수·원하는 공사·가구·배치안을 채움, "주소는 적지 않아도 돼요". 중개자·제3자 제공 동의 안내 문구. (P3 상담 폼이 생기면 여기만 바꾸면 됨.)
- **저장·공유**: `zip_room` localStorage(치수·문·창·가구·선택안·체크만, 사진·주소 없음) + 저장 버튼은 `state.room`+`touch('room')`(로그인 시 계정). 평면 PNG 1080×1350(`rmPNG`, 베이지 바탕·워드마크·안 이름·걸을 바닥·평면·"내 방도 그려 보기 → 호스트/#room"), SVG 받기.
- AI 생성 이미지는 쓰지 않음(그래서 AI 예시 표시도 없음). 3D 보기는 이번엔 안 만듦.
- 테스트(저장소 밖 `/home/claude/r1/t/`): `t.js` 1440/390 홈 링크 → 원룸 → B안 → 들어가나(200×90×85) → PNG 저장 = **5클릭**, 에어컨 체크→전기 경고, 견적 상담 프리필, GPS EXIF 사진 → 결과 Blob에 Exif/GPS 없음, 저장 데이터에 사진·주소 없음, 가로 스크롤 없음, pageerror 0. `t2.js` 다크 모드·템플릿 5·작은 방 경고·메뉴/내집코드 링크.
- 남은 것: 3D 보기, 사진으로 방 치수 읽기(만들지 않기로), 가구 직접 끌어 옮기기, 문 열림 방향 바꾸기(지금은 힌지=시작점 고정), 가구 회전·자유 배치(지금은 벽 붙이기만), 로그인 계정 불러오기는 state.room이 있을 때만.
## R1b · v20b (2026-10-21) — 내 방 고치기: 다른 방과 같은 디자인 · 3단계 · 끌어 옮기기 · 문 방향 · 3D
사용자 피드백 "다른 페이지처럼, 처음 온 사람은 어떻게 쓰는지 모르겠다, 너무 많다".
- **표지**: `#view-room` 안 `.hero`(h1·tag·sub) → `RHERO.room`(ROOM, c:1, 색 #c2703f·#f2bd55·#3f7bff, 띠 단어 8)로 다른 방(내집코드·아틀라스·취향 랩)과 같은 `.rhero` 표지 + 스크롤 띠. 본문은 `.zc2 rm-wrap`(#rmApp) — 내집코드의 `.zc2-steps`·`.zc2-card`·`.zc2-h` 틀을 그대로 씀. 예전 `.rm-hd/.rm-card/.rm-grid/.rm-tools` 마크업은 없어짐(CSS 일부는 남아 있어도 무해).
- **3단계**(`RM.step`, 저장됨, 다시 오면 그 단계로): 스텝 타일 `#rmSteps`(누르면 이동) + 단계별 `.rm-pane[data-pane]`만 보임. 데스크톱은 카드 아래 `.rm-nav` 이전/다음, 폰(≤820)은 `.rm-mbar` 고정 바(탭 바 위, 물어보기 버튼은 140px 위로).
  - ① 방 정하기: 예시 방 5 + '직접 입력'(tpl='custom', 가로 칸 포커스) 카드, 가로·세로·천장. 가구(`#rmMoreF`)·문창(`#rmMoreO`)은 `<details>`로 접고 요약(가구 이름 나열 / 문 n · 창 n)만 보임.
  - ② 배치 고르기: 데스크톱 2열(`.rm-g2` = 왼쪽 안 3개·도구·범례·문제 목록 / 오른쪽 평면 sticky), 1000px 이하 한 열(안 3개 → 평면 → 도구 → 범례 → 문제). 문제 목록은 3개까지, '나머지 n개 더 보기'.
  - ③ 확인·저장: 왼쪽 평면 + 저장하기·이미지로 저장·3D·SVG, 오른쪽 아코디언 5(들어가나? 기본 펼침 / 조명·콘센트(펼치면 평면에 조명·콘센트 번호, 접으면 통로 표시) / 색·재료(팔레트 고르기 `RM.pal` + 분위기 사진) / 살 때 치수 조건 / 공사·견적 상담).
  - 첫 방문 안내 `#rmHint` 3줄(‘알겠어요’ → `zip_room_hint`=1, try/catch). 참고용 문구는 스텝 아래 한 줄 `.rm-note`.
- **통로 표시**: 화면에선 숫자 대신 `좁음`(<60·빨강) / `빠듯`(<권장·주황) / `여유`(초록) 배지(`.rm-cl`, `<title>`·누르면 2.6초 cm). 이미지·SVG 내보내기는 `cm:true`로 숫자.
- **끌어 옮기기**: `rmDragInit(#rmPlan)` — 가구 `<g class="rm-f" data-i>`를 pointer로 끌기(10cm 격자, 벽 15cm 안이면 붙임, 방 밖 못 나감), 가구에서 시작한 터치는 touchstart preventDefault로 스크롤 대신 끌기(pointerdown에서 바로 다시 그리면 터치 대상이 사라져 막기가 안 되므로 rAF로 미룸). 끄는 동안 rAF마다 `rmPlace(…,live)` → `rmEval` 재계산(통로·겹침·문 자리·창 가림), 놓으면 `rmCommit()`.
  - `rmItem(key,rect)`: 가장 가까운 벽을 등 벽으로(w·dir·s·L·P·gap), 침대는 벽 따라 긴 쪽이면 side, 짧은 쪽이면 head.
  - `rmEval` 추가 검사: 가구 겹침(bad), 문 열림 자리 침범(bad), 키 큰 가구가 창 가림(warn, gap<5). 겹친 가구는 분홍 채움·빨간 테두리.
  - 고른 가구: 점선 테두리, `↻ (가구) 돌리기`(중심 기준 90°), 키보드 — 평면 포커스 후 Enter/Space 다음 가구, 화살표 10cm, R 돌리기. '배치 처음대로'(`RM.edits[pick]` 삭제).
  - 저장: `RM.edits[pick]={sig:'WxD|가구정렬', items:[{key,x,y,w,h}]}` — 방 크기·가구 목록이 바뀌면(sig 불일치) 무시, 방/가구/문창을 바꾸면 비움. `rmCompute` 끝에서 `rmApplyEdits()`.
- **문 여는 방향**: 문마다 `hinge`('s' 시작점/'e' 끝점)·`swing`('in'/'out'), ② 도구의 '문 · 안으로 · 경첩 왼쪽' 버튼을 누를 때마다 4가지 순환. 밖으로 열면 방 안 문 자리(`rmDoorZones`)에서 빠짐, 평면 여백을 문 폭만큼 넓혀 바깥 호를 그림.
- **3D 보기** `rm3DOpen()`: 버튼을 눌렀을 때만 `t3Load()`(three r128, cdnjs) — 모달 `#rm3dm`(aria-modal → 물어보기 버튼 자동 숨김, Esc·× 닫기, 닫으면 dispose). 바닥·벽(문 2.1m 위 인방, 창 0.9~2.1m 유리), 열린 문짝, 가구 상자(높이 = 일반 규격, 색 = 고른 팔레트), 침대 베개. 끌어서 회전·휠 줌, 카메라 쪽 벽은 22% 높이(인형집). 세로 화면이면 카메라를 뒤로. WebGL 없으면 "평면으로 확인" 안내.
- 클래스 주의: 3D 모달 안은 `rm3-*`(홈의 `.hd` 카드 스타일과 충돌해서 바꿈).
- 테스트(저장소 밖 `/home/claude/r1b/`): `t.js` 1440/390 — 첫 방문 안내, 원룸 → 다음 → B안 → 가구 끌기(edited, 문제 목록 갱신) → 돌리기 → 문 방향 3번 → 배지 탭 cm → 3D 열기/닫기(캔버스 생성·해제) → 확인·저장 → 들어가나 → 조명 펼침(평면 원 10개) → 이미지 저장 = **5클릭**(예시 방·다음·안 고르기·다음·이미지 저장), 저장 데이터에 edits·step만(사진·주소 없음), 새로고침 후 단계·옮긴 배치·안내 닫힘 유지, 가로 스크롤 0, pageerror 0. `t2.js` 다크·폰 3D·CDP 터치 끌기(스크롤 안 됨, edited).
- 남은 것: 가구 크기 직접 바꾸기(지금은 일반 규격 고정), 대각선 회전, 3D에서 가구 끌기, 문 폭 밖 '밖으로 열림' 복도 쪽 간섭은 안 봄.

## A1 · v20c (2026-10-21) — 아틀라스 렉 줄이기 · 정교 모형 손질
- **측정 방법**(스크래치 `atlas/t/perf.js <port> m|d <label>`): playwright + SwiftShader(소프트웨어 GL), CDP CPU 4배 감속, 모바일 390×844·DPR 3. 롱태스크(PerformanceObserver)·스크롤 60단계 FPS·모달 4개 열고 닫기·GC 후 힙. 원인 찾기는 `prof.js`(CPU 프로필)·`trace.js`(메인 스레드 이벤트)·`jobs.js`(썸네일 작업 시간)·`tris.js`(모형 삼각형).
- **원인**: ① 전시실·필름 스트립·카드의 '모형 썸네일'을 스크롤할 때마다 화면 밖 WebGL로 정교 모형을 통째로 지어(숲 포함 삼각형 0.8~1.9 M, pgBuild 0.2~0.6 s/데스크톱) 찍고 toDataURL — 스크롤 중 프로필의 대부분. ② 들어오자마자 '오늘의 명작' 3D를 바로 짓고 자동 회전(셰이더 컴파일 + 큰 장면). ③ 모달을 열 때마다 정교 모형을 새로 지음. ④ 터치 기기에서 pointerover가 '단어로 지은 모형'을 만들게 함.
- **고친 것**
  - **미리 렌더 썸네일** `img/sig/<id>.webp`(166장, 720×480, 합계 6.1 MB, 장당 ~37 KB): `SIG_TH`(id 목록)·`SIG_TH_V`(캐시 버전)·`sigTh(id)`. `bldModel`/`bldModelInto`가 정교 모형이면 WebGL 없이 이 그림을 바로 씀(데이터 파일 bsig도 안 받음). build_public.py가 `img/sig/*.webp`를 dist로 복사, 사진 없는 정교 모형의 정적 /atlas/ 페이지 그림·og:image로도 씀(12쪽). **모형을 고치면 다시 찍기**: 스크래치 `atlas/t/prerender.js <shard> <n> [ids]`(앱의 pgThumb 1440×960 → `convert -resize 720x480 -quality 72` webp) 후 `SIG_TH_V` 올리기.
  - **오늘의 명작**: 포스터(`#atSpotPo`)를 먼저 보여 주고, 데스크톱은 0.9 s 뒤 idle에서 3D 마운트(마운트되면 포스터 페이드), 저사양·터치(`PG_LOW`: pointer:coarse·폭<760·deviceMemory≤4)는 가운데 '⟳ 3D로 돌려 보기'(`[data-atsp3d]`)를 눌러야 3D.
  - **건물 모달**: `PG_LOW`이고 정교 모형이면 3D 칸에 포스터 + '3D로 돌려 보기'(`[data-bld3go]`, 크게 보기 ⛶를 눌러도 마운트).
  - **뷰어**: `pgLOD(B)` — PG_LOW면 그림자 안 지는 큰 인스턴스(숲·나무 >600개)를 45 %로(최소 300). 자동 회전은 스크롤 중(350 ms) 렌더를 건너뜀. hover 모형은 마우스일 때만. `.atx-3dgo`·`.atx-po`·`.dnat-po` CSS 추가.
  - `__atlas`에 `bldModel,t3Load,BLD_BY,PGTC,PGTQ,BLDTH` 노출(측정용).
- **숫자**(모바일 390·DPR3·CPU 4배 감속·소프트웨어 GL — 실제 폰보다 훨씬 느린 조건, 전·후 비교용)

  | 항목 | 전 | 후 |
  |---|---|---|
  | 로드 완료 | 42.0 s | 4.1 s |
  | 들어온 직후 롱태스크 합/최대 | 66.3 s / 36.3 s | 3.2 s / 1.5 s |
  | 조용해질 때까지(TTI 근사) | 67.8 s | 4.1 s |
  | 스크롤 FPS · 최악 프레임 | 1.5 · 16.0 s | 44.7 · 0.10 s |
  | 스크롤 중 롱태스크 합 | 121.8 s | 0.19 s |
  | 모달 4개 열기 롱태스크 합 | 56.6 s | 2.4 s(3D는 눌러야) |
  | 모달 뒤 힙(GC 후) | 135 MB | 8 MB |
  - 데스크톱(1440, 같은 조건)은 3D를 자동으로 띄우므로 소프트웨어 GL에선 여전히 무거움(진입 롱태스크 56→42 s, 스크롤 1.1→3.6 fps). 실제 GPU에선 한 번 짓는 0.2~0.6 s 정도.
- **깜빡임(정교 모형)**: `pgDeflicker2` — ① 회전된 메시(물·바닥 PlaneGeometry를 메시로 눕힌 경우)도 대상: 월드 위쪽을 메시 로컬 방향(`U`)으로 바꿔 꼭짓점을 옮김(예전엔 축 정렬 메시만). ② 배경끼리(life–life) 반투명(물)과 불투명이 겹치면 불투명(물 밑 바닥)을 내림. ③ 배경끼리 겹친 쌍은 작은 쪽 재료를 복제해 polygonOffset(factor −1.5, units −8)으로 앞으로 — 이미 한 번 옮긴 메시라도 효과. 검사기를 '삼각형 세 꼭짓점 높이 차 ≤1 cm'로 엄격히 바꾸면(스크래치 `atlas/t/zf2.js`) 남은 겹침은 cctv(공원판–대지, polygonOffset으로 처리)·leeum(강물–대지)·changgyeong 200 ㎡·kanazawa 20 ㎡ 정도. 예전 리포트의 burj·louvreabu·rotonda 등은 큰 경사 삼각형의 평균 높이가 겹쳐 보인 것(실제 면 겹침 아님).
- **환경**: 세종문화회관 앞 광화문광장(2022 재구조화 쪽) 포장 결 띠·물길·숲 군락(위치·크기 추정) · 영화의전당 광장 줄눈 띠·밝은 띠·화단 나무 8곳(추정) · 63빌딩 남쪽 63로·가로수와 여의도 블록을 타워 가까이까지(눈높이 시야 통로 |x|<330, z<760은 비움, 추정).
- **안 한 것**: BSIG 공용 헬퍼 중복 제거 — 6 MB 중 3.9 MB가 반복 줄이지만 파일은 모형을 열 때 하나씩(gzip 10~23 KB)만 받으므로 속도 이득이 없고, 공용 사전을 쓰면 첫 모형 때 오히려 더 받음. 저장소 크기 문제일 뿐이라 보류. 약한 모형(tepapa·potala·getty·therme)의 형태 손질은 출처 재조사가 필요해 이번엔 못 함.

## M1 · v20d 모바일 전체 정리 (2026-10-21)
점검: 20개 앱 화면 × 360·390·430·가로 844×390·태블릿 768 (playwright isMobile/hasTouch) + 정적 페이지 11종(/atlas/ /ask/ /dict/ /contests/ /travel/ 약관·개인정보·라이선스·404). 스크립트: scratchpad/m1/audit.js·inter.js·st.js·tapchk.js.
요약(80개 화면×폭 조합): 입력칸 16px 미만 298→0, 작은 터치 영역(32px 미만) 63→0(체크박스 1개는 44px 라벨 안), 고정 요소 겹침 58→2(광장 sticky·공모 가로 sticky와 물어보기 버튼, 화면 구석이라 유지), 가로 넘침 0→0, 페이지 오류 0.

| 화면 | 문제 | 수정 |
|---|---|---|
| 전체(폰) | 물어보기 버튼 상자(#zchat)는 bottom:16에 있고 버튼만 relative로 위로 밀려, 빈 상자가 아래 탭(특히 '공부')을 가려 탭이 안 눌림 | 위치를 #zchat 상자로 옮김(bottom 76px+safe-area), #zchat pointer-events:none·자식 auto. 열린 패널은 탭 바 위(130px)로 |
| 머리 줄 | 햄버거가 오른쪽 테두리에 붙고 선 1.6px로 흐림, 아이콘 36px | 테마·검색·메뉴 42×42 통일, 선 2px·폭 20px 가운데 정렬, X 변환 7px, 오른쪽 여백 |
| 메뉴(햄버거) | 반투명 바탕(lite 모드에선 블러 없음)이라 뒤 글자가 비침, 탭 바 뒤로 끝이 숨음, 뒤 화면 스크롤됨, '곧' 항목 4개 노출 | 불투명 바탕, max-height=100dvh−머리−탭 바, overscroll contain, html.menu-open 스크롤 잠금, 바깥 탭 닫기, 항목 48px. NAVG '곧' 필터를 buildNav 전에 실행(건축 극장만 남김 — 기존 v19 필터는 buildNav 뒤라 메뉴에 안 먹었음) |
| 아래 탭 | 짓기=DNA, 공부=꺾쇠 아이콘이 의미 불명 | 새 아이콘 tbuild(집+연필)·tstudy(펼친 책), 글자 11px, 높이 50px |
| 여행 | 아래 도크(컬렉션·계절…)가 탭 바와 같은 자리에 겹침 | 탭 바 있을 때 도크 bottom 76px+safe |
| 내 방 고치기 | '이렇게 쓰세요' 카드가 폰에서 3열로 찌그러짐 | 폰에서 세로로 쌓기, 버튼 오른쪽 |
| 로그인·건물 창 | 아래 탭이 창 위에 겹쳐 아래 버튼 가림, 로그인 카드 아래 잘림 | aria-modal 창 열리면 탭 바·물어보기 숨김, 로그인 카드 max-height 100dvh−24·내부 스크롤 |
| 표지 바로가기(홈·방 표지들) | '집 구경 ›' 등 링크 높이 24px | 터치 기기에서 44px |
| 공모·행사 | 체크박스 13px·캘린더 링크 19px | 라벨·링크 44px, 체크박스 20px |
| 설계 흐름 | 위에 붙는 단계 바가 반투명이라 뒤 글자 비침 | 폰에서 96% 불투명 |
| 입력칸 전부 | 12.5~15px(아이폰 포커스 확대) | (pointer:coarse)에서 16px !important |
| 요금 | '재학생 인증 시 ·' 끝에 점만 남음 | 점을 '적용됨' 표시 안으로 |
| 정적 페이지 | 머리 링크·푸터 링크 터치 영역 작음 | static.css (pointer:coarse) 40/36px |
| 전체 | 한글 단어 중간 줄바꿈 | body word-break:keep-all, overflow-wrap:break-word |
남은 것: 광장 sticky 바·공모 가로 모드 sticky 바와 물어보기 버튼이 오른쪽 아래에서 살짝 겹침(가리는 내용 없음). 건축 극장 예고는 메뉴에서 흐리게(곧) 남김(결정 사항). 실기기(iOS Safari 노치·키보드) 확인은 못 함.

## R1c · v21 (2026-10-21) — 내 방 고치기: 사실적인 3D · 평면도 올리기 · 가구·가전 카탈로그 163종
사용자 요청 "3D를 더 현실적으로, 자기 방·평면도를 올리면 바로 배치, 가구·전자기기 많이". R1b의 3단계 흐름은 그대로, 새 기능은 ① 위 '시작 방법 3가지'와 카탈로그 서랍 뒤에 둠.
- **시작 방법**(① 위 `.rm-modes`, `RM.mode` 저장): 예시 방 고르기(템플릿 5) / 평면도 올리기 / 치수 직접 넣기. 예전 '직접 입력' 카드는 '치수 직접 넣기'로 대체. 치수 칸 옆에 **모양: 네모 | ㄱ자**(`RM.notch={c:0 왼쪽 위|1 오른쪽 위|2 오른쪽 아래|3 왼쪽 아래, w, d}`, 빠진 모서리·가로·세로).
- **ㄱ자 방 엔진**: 바운딩 W×D에서 모서리 칸을 장애물로(`rmObs()`): 후보 검사(`rmValid`)·통로 계산(`rmRects` → `rmReach`·`rmClear`)·들어가나·치수 조건에 포함, 겹치면 "방 밖(벽 안쪽)에 걸쳐 있어요". 평면 SVG는 빈칸을 종이색으로 덮고 안쪽 두 벽을 그림. 3D는 바닥·천장을 다각형으로, 바깥 벽은 잘린 구간 빼고 + 안쪽 두 벽. 한계: 안쪽 두 벽에는 문·창을 못 놓음, 가구 후보는 바깥 네 벽 기준.
- **평면도 올리기**(`rmPlanFile`·`rmPlanDetect`·`rmPlanOps`·`rmPlanDraw`·`rmPlanApply`, 상태 `RMP`): 이미지 → `createImageBitmap` 다시 그리기(EXIF 지움, 최대 720px) → 회색조 → 오츠 문턱값 → 어두운 선을 조금씩 키우며(크기의 0.6~7%) 바깥에서 채우기 → **바깥과 이어지지 않은 가장 큰 칸 = 방**(전체의 5%·변 18% 이상). 경계 = 그 칸의 바운딩(+키운 만큼). 채움 비율 < 0.9면 네 모서리에서 빈 직사각형을 찾아 ㄱ자. 문·창: 경계 바깥 벽 띠(두께 = 중앙값)의 어두운 비율 — 0.14 미만 구간 = 문(벽 길이 6~55%), 0.14~0.5 = 창(얇은 겹선, 8~85%), 모서리에 붙은 구간·ㄱ자 빈칸 구간은 버림.
  - 사용자가 한 번만 **길이 맞추기**: 파란 굵은 선(방 전체 가로, ㄱ자 빈칸이 위면 아래 변에 그림)의 실제 cm, 또는 '두 점 찍어 재기'. 동그라미 4개(변)·네모 1개(ㄱ자 안쪽 모서리)를 끌어 고침. '이대로 배치하기' → W·D·notch·문창을 5cm 단위로 넣고 ② 배치로. 문이 하나도 없으면 아래 벽 기본 문.
  - **자동이 아닌 것(정직하게)**: 글자(치수 숫자) 읽기(OCR) 없음 — 길이는 사람이 넣음. 여러 방 도면은 가장 큰 방만. 곡선·사선 벽·ㄷ자 이상은 바운딩 사각형으로 근사. 문 여는 방향·문/창 정확한 폭은 짐작이라 '문 · 창'에서 고쳐야 함. 합성 도면(ㄱ자·문 1·창 1, 네모·문 1·창 1) 테스트에서 경계·ㄱ자·문·창 모두 찾음.
- **방 사진**(치수 직접 넣기 안, `rmRoomPhoto`): 사진으로 크기를 재지 않음(화면에 명시). 위 10~45%(벽)·아래 72~96%(바닥) 최빈 색 → `RM_PAL` 중 가장 가까운 팔레트를 골라 줌. 메모리 objectURL만, 저장 안 함. **걸음 수 도우미**: 가로·세로 걸음 × 70cm(추정 표기).
- **카탈로그** `data/furniture.js` → `window.ZFURN={v,cats,items}` (index.html에서 contests.js 다음에 로드, build 복사 목록에 추가). 163종: 침실 25 · 거실 27 · 주방·식탁 25 · 서재·작업 20 · 아이방 11 · 가전 27 · 수납·현관 10 · 조명·소품·반려 18. 예전 12종 키(bed_s·bed_ss·bed_q·desk120·desk140·ward120·ward160·shelf80·dresser·sofa2·dining2·tv)는 같은 id로 유지(저장 호환), 앱은 `RM_FURN0`(예전 12)과 합쳐 `RM_FURN`을 만듦.
  - 필드: `id n c m k w d h` + 선택 `sz`[[이름,w,d,h]…](크기 고르기) · `need`(앞 여유 cm, 없으면 성격 k 기본값 `RM_NEED`) · `pw`(1 콘센트, 2 전용 회로 권장) · `fl:false`(바닥 안 차지 — 벽걸이·천장·러그·책상 위) · `at`(wall|win|center) · `z`(벽걸이 높이) · `note`. `k`는 배치 성격(bed|desk|ward|shelf|dresser|sofa|dining|tv|misc), `m`은 3D 모양(약 85가지).
  - **크기는 모두 '일반 규격 기준'**(cm) — 특정 제품 치수가 아님. 근거 메모: 매트리스 국내 통용 싱글 100·슈퍼싱글 110·더블 140·퀸 150·킹 160·슈퍼킹 180 × 200(jab-guyver.co.kr 침대 사이즈표 — 브랜드마다 킹 165~170·롱 210~220 있음, 프레임은 +5~15); 식탁 6인 160~180, 의자 뒤 70cm 이상(한샘 6인용 식탁 안내); TV 65"≈144×81 · 75"≈166×93 · 85"≈188×106(화면 기준, brunch 크기 비교 글) — 43~55"는 같은 16:9 비율로 계산한 근사; 워시타워 예 700×830×1890mm·문 열면 깊이 1410(LG W20WHN 제품 페이지, 단종), 스탠드 김치냉장고 예 835×838×1860(LG Z492GBC17ES, 단종), 스탠드 에어컨 예 390×332×1870 · 벽걸이 774×190×348, 정격 2,200W(LG FQ18SBDWAN 세트). 그 밖(소파·옷장·책장·가전 대부분)은 흔한 시판 범위의 대표값 — 출처 없이 정확한 값이라고 쓰지 않음, 화면에도 "일반 규격 기준 · 제품마다 다름".
  - **서랍 UI** `#rmCat`(aria-modal, 폰은 아래에서 올라오는 시트): 찾기(동의어 몇 개: 티비→tv, 장롱→옷장 …) · 분류 탭(담은 개수 배지) · 카드(아이콘 `rmIcon(m)` 22종, 크기, 꼬리표 전기/전용 회로/벽에 걸기/창에/천장에/바닥 깔기/올려 두기) · 누를 때마다 하나 더함. 여는 곳: ① '가구' 접힌 칸의 `＋ 가구·가전 고르기 163종`, ② 도구 줄 `＋ 가구·가전`.
  - **목록**(①): 아이콘 · 이름 · 크기 · [크기] [복제] [×]. [크기] → 프리셋(`sz` 또는 작게 85%/기본/크게 115%) + 가로·깊이·높이 직접. 바꾼 크기는 키 `id@WxDxH`(`rmEnsure`가 즉석 등록, 저장 호환).
  - 가구를 더하거나 빼도 **옮겨 둔 자리 유지**: `RM.edits[pick].sig`는 이제 방 크기·ㄱ자만, `rmApplyEdits`가 같은 가구끼리 짝지어 옮긴 자리를 쓰고 새 가구는 자동 자리.
- **배치 엔진 추가**: `fl:false` 가구는 바닥 계산(겹침·통로·문 자리)에서 빠지고 `rmPlaceNF`가 자리를 줌 — 창(커튼·블라인드·창문형 에어컨) · 벽(벽걸이 에어컨은 창 있는 벽 끝, 벽걸이 TV는 소파 맞은편, 그 밖은 문·창 적은 긴 벽 가운데) · 가운데(펜던트는 식탁 위, 러그는 소파·침대 앞에 긴 변 나란히) · 책상·TV장 위(모니터·테이블 조명·게임기). `at:'center'` 바닥 가구(소파 테이블)는 방 안쪽 격자 후보(소파 앞 가산, 다른 가구와 45cm 띄움). TV는 소파 맞은편 벽 +45, 소파는 TV 맞은편 +35. `misc` 성격·여유 0인 것(화분·의자 등)은 '걸어갈 길' 검사 안 함. 경고 문구는 모양별(`rmUseTxt`: 냉장고 "문을 활짝 열고 꺼내려면", 세탁기 "빨래를 꺼내려면", 거울 "전신이 보이려면", 러닝머신 "안전하게 쓰려면").
- **조명·콘센트**: `pw` 가구마다 콘센트 자리, `pw:2`는 "— 전용 회로 권장" + 경고 칸에 목록 → 전기 상담 버튼. 펜던트·스탠드는 조명 목록에.
- **3D**(`rm3DBuild`, three r128 지연 로드 그대로): MeshStandard + 캔버스 재질(마루 판 `rm3Tex('wood')`, 벽 페인트 잡음, 패브릭 결) · 걸레받이 · 창틀(가운데 문살)·유리·창턱 · 문틀과 패널 문짝(손잡이, 80% 열림) · ㄱ자 다각형 바닥/천장 · ACES 톤매핑 · sRGB · PCFSoft 그림자(해: 첫 창 쪽에서 들어오게, 데스크톱 2048/폰 1024) · 반구광. 가구 `rm3Mesh(T,f,w,d,h,M)` — 둥근 상자(`rm3RBox`, Extrude 베벨) 쿠션·매트리스, 다리·문짝·손잡이·책·옷걸이 옷 등 모양별 절차 생성(삼각형 수천 단위). 팔레트 5색이 벽·바닥·패브릭·포인트·금속에 들어감.
  - 보기 `RM3.view`: **인형집**(끌어 돌리기, 카메라 쪽 벽 22% + 그 벽에 붙은 문·커튼·벽걸이 숨김) · **위에서**(방이 화면에 맞게, 평면과 같은 방향, 끌면 회전) · **눈높이**(1.6m, 문 안쪽 60cm에서 방을 보고 시작, 끌어 둘러보기, 바닥을 누르면 그쪽으로 걸어감 — 벽 25cm·바닥 가구 20cm 안으로는 안 들어감, 휠=시야각). **낮/저녁**(`RM3.tod`): 저녁은 해 끔, 천장 스포트(그림자)·스탠드/펜던트 점광(최대 3)·전구 발광, 바깥 어둡게.
  - 성능: 렌더는 조작할 때만(rAF 상시 루프 없음), 폰 pixelRatio ≤ 1.5·그림자 작게, 닫으면 지오메트리·재질·텍스처·렌더러 dispose + 컨텍스트 해제, 탭 숨김 해제 시 다시 그림. 헤드리스(SwiftShader) 기준 3D 열기 데스크톱 ~0.35s, 폰(CPU 4배 감속) ~0.8s.
- 테스트(저장소 밖 `/home/claude/r1c/t/`): `t.js d|m` — 평면도(ㄱ자 합성) 올리기 → 자동 찾기 → 600cm → 배치 → 카탈로그 찾기·분류·8종 담기 → 크기 바꾸기·복제 → 3D 인형집/위에서/눈높이/걷기/저녁 → 닫기(해제) → 걸음 치수 → 방 사진 팔레트 → 저장 키(사진·주소 없음), pageerror 0, 가로 넘침 없음. `t3.js` — 예시 방 회귀(5클릭 → PNG), 전용 회로 안내·치수 조건. `gal.js 0..4` — 163종 3D 모양 갤러리.
- 남은 것: 평면도 글자(치수) 자동 읽기, ㄷ자·사선 벽, 안쪽 벽에 문·창, 3D 안에서 가구 끌기, 사진 속 가구 인식(안 만들기로).
## N1b · v21a (2026-10-21) — 공모·행사: 방 표지 통일 · 종목 그림 · 종목별 보기 · 나에게 맞는 공모전
사용자: "공모 행사 페이지 표지를 다른 페이지처럼" + "관련 그림·종목·관련도를 카테고리별로, 나에게 맞는 공모전인지 찾아보게".
- **표지**: `#view-contests`에 `.hero`(h1 공모·행사 · tag · sub) → `RHERO.contests`(CONTEST, c:3, 색 #ff9f0a·#3f7bff·#ff5e9c, 띠 8단어)로 내집코드·아틀라스·취향 랩·내 방 고치기와 같은 `.rhero` + 리본. 본문은 `.zc2 ct-wrap`, 섹션 머리는 `.zc2-h`(①나에게 맞는 공모전 찾기 `.zc2-card#ctMatch` / ②일정 둘러보기). 예전 `.ct-hd` 머리·sticky 필터 바는 없앰(필터 바는 일반 카드).
- **정적 `/contests/`**: 다른 정적 목록(/atlas/·/dict/·/travel/)과 같은 kick·h1("— N건")·lead·cta·`section.grp` 틀. 종목별 `section.grp#f-i`(그림 32px + 이름 + 개수), 위에 종목 바로가기 칩 `.ctjump`, 항목마다 종목·온라인·참가 형태 태그 `.tags`와 '참가:' 줄. CTA "나에게 맞는 공모전 찾기"(/#contests). 그림 정의는 crit.html `CT_FIELDS`를 정규식으로 읽어 같은 걸 씀(static.css `.ctart`).
- **종목 그림** `CT_FIELDS`(10개, 순서 = 종목별 보기 순서): 건축설계 · 공공건축 · 주거 · 인테리어·실내 · 조경·도시 · 리모델링·재생 · 아이디어·개념 · 사진·영상 · 전시·강연·투어 · 해외 — 각 [이름,[색1,색2],SVG 선 그림(64×64)]. **ZIPLAN이 그린 그림이며 공모 포스터·사진은 절대 쓰지 않음**(og:image 핫링크도 금지). 카드 오른쪽 112px 타일(폰은 오른쪽 위 44px).
- **비슷한 건물**(선택 `ref:{id,name}`): 같은 쓰임의 정교 모형이 있으면 '비슷한 건물 3D: 이름 ›' → `bldOpen(id)`. 지금 2건(연구동→소크 연구소, 체육관→요요기 국립경기장). 이미지가 아니라 링크.
- **데이터 새 필드**(data/contests.js, 24건 모두 채움 — **예약 작업이 새 항목을 넣을 때 반드시 채울 것**):
  - `field`: 위 10개 중 1~3개, 첫 번째가 대표(종목별 보기·그림). 공공 설계공모 → ['공공건축','건축설계'(+'리모델링·재생'/'조경·도시')], 학생 건축대전 → ['건축설계',…], 국제 아이디어 → ['아이디어·개념',…,'해외'], 전시·강연·투어 → ['전시·강연·투어', 주제 종목], 해외 공모는 '해외'를 꼭 포함.
  - `who`: 낼 수 있는 사람 — '누구나'(행사·관람·공개 모집) | '학생' | '실무' | '건축사'(건축사사무소 개설자 대상 — 국내 공공 설계공모 기본값) | '일반'. 원문에 적힌 자격대로, 모르면 가장 좁게 + req에 '자격은 원문 확인'.
  - `team`: '개인' | '팀' | '개인·팀' | ''(원문에 없으면 빈 값 — 지어내지 않기).
  - `level`(준비 부담): '가볍게'(관람·강연·드로잉 한 장) | '보통'(온라인 아이디어 공모·짧은 제출물) | '본격'(설계공모·패널+모형·실물 설치).
  - `req`: 참가 조건 한 줄(자격·부문·제출 형식). 공공 설계공모 기본 문구: "공공 설계공모는 대개 건축사사무소 개설자만 참가 — 자격은 원문 공고 확인".
  - `prize`(상금·설계비·제작 지원 있음) · `online`(온라인 제출/참가 가능) — true/false.
  - `vis`: 그림 키 = field[0].
- **나에게 맞는 공모전** `ctFit(x,t)` + `#ctMatch`(4문항: 나는 학생/실무자·건축사/실무자·자격 없음/일반 · 관심 종목 여러 개 · 혼자/팀/상관없음 · 1주/한 달/여유) — localStorage `zip_ct_match`(try/catch). 자격(who) 안 맞으면 '자격 안 맞음'(기본 '낼 수 있는 것만' 켜짐 → 숨김, 숨긴 개수 표시). 점수: 관심 종목 겹침 +3(2개 이상 +4)/없으면 −1, 대상 일치 +2, 팀 가능 +1/팀만인데 혼자 −2, 준비 부담 ≤ 준비 시간 +1 / 넘으면 −2, '본격'인데 마감 7일 안 −1 → 5↑ 잘 맞음 · 2↑ 맞음 · 그 외 참고. 이유 한 줄(참고면 아쉬운 점 먼저). 보기 방식 `#ctView`: 마감순 / 종목별(그룹 머리 `.ct-grp`) / 나에게 맞는 순(답하면 나타남).
- 버그 수정: `$$`는 두 번째 인자(root)를 무시함 → 필터 버튼 aria-pressed가 페이지 전체 버튼에 걸리던 것을 `g.querySelectorAll`로 고침(앞으로도 `$$(sel,root)` 쓰지 말 것).
- 테스트(저장소 밖 scratch `cc/t/t.js`): 1440·390·360 — 표지, 매처 4문항 → 결과 줄·배지, 맞는 순·종목별·낼 수 있는 것만 끄기, 새로고침 후 답 유지, 정적 페이지, 가로 넘침 0, pageerror 0.

## SEO · v22 (2026-10-22) — 화면별 제목·설명 · 탐색경로 · 링크 점검 · 공유 이미지 · 문의 완료 · GA4 틀 · 개인정보처리방침
지시서(기능 개선·SEO, 2026-10-21) S1~S13 + S14~S16 틀. 코드는 crit.html `/* ===== SEO·v22 */`(route 아래, `function go` 바로 뒤) + CSS `/* ===== SEO·v22: 탐색경로 … */`(첫 `</style>` 앞).
- **화면별 제목·설명(S1·S2)**: `ZMETA[h]=[title,description]`(21개 라우트, 제목 중복 0), `zRouteMeta(h)`를 route()에서 호출 → document.title·meta description·og:title·og:description 갱신. 깊은 화면은 `zDeepMeta(label)` — 아틀라스 건물 모달(bldOpen/bldClose, 아틀라스에서 열었을 때만), 여행 상세 서랍(tDetail/tDetailClose), 취향 랩 결과(dnqResult). 제목 형식 "이름 — 방 | ZIPLAN". 해시 화면은 검색엔진이 따로 색인하지 않음 → 검색 노출은 정적 페이지가 담당(이 값은 탭 제목·북마크·공유 문구용).
- **탐색경로(S3)**: 각 `.view` 첫 자식 `.zbc`(role=navigation, ol) "홈 › 문 이름(글자만 — 문은 따로 페이지가 아님) › 방 [› 깊은 화면]", 방 이름과 문 이름이 같으면(광장) 문 생략. 표지 위 14px에 절대 배치(높이 0, 레이아웃 안 밀림), 폰은 한 줄·문 이름 숨김. 깊은 화면에선 방 이름이 링크(`data-zbcroot` → 모달·서랍 닫기). 취향 랩 quick 모드 숨김 규칙에 `:not(.zbc)` 추가. 정적 페이지는 기존 `.crumb` + BreadcrumbList가 같은 경로라 그대로.
- **링크(S4)**: 정적 크롤 `/home/claude/seo/t/crawl.py`(dist 전체 html 54,095개 링크, 해시는 VIEWS·id·ask 딥링크로 판정) → 깨진 링크 0. 런타임 `rl.js`(20개 화면 DOM의 a[href] 6,391개) → 0. 공개 빌드에서 `privacy.html/terms.html/licenses.html` 링크를 `/privacy` 등으로 바꿈(cleanUrls 308 리다이렉트 제거, crit.html 원본은 상대 경로 유지). '다음에 볼 것' `ZNEXT`(room·dna·zipcode·contests·atlas·travel 끝에 2~3개, `zNextInit`).
- **대체 텍스트(S5)**: 20개 화면 표시 이미지 중 alt 없는 것 0, 이름 없는 버튼·링크 0, 정적 985장 alt 누락 0(phImg는 alt 있음 — 정규식 오탐). 고친 것 없음.
- **404(S6)**: 정적 `404.html`(noindex, 공통 머리·푸터) 링크 보강(공모·행사·취향 랩·내 방 고치기·내집코드). Vercel은 없는 경로에 루트 404.html을 404 상태로 돌려줌(리다이렉트 없음) — 배포 뒤 `/no-such-page-xyz-123` 실제 응답 404 확인(2026-10-22).
- **robots(S7)**: `Disallow: /*?admdemo=`(관리자 예시 데이터 쿼리)만 추가, 나머지 전부 허용 + Sitemap. 해시 라우트(#admin)는 경로가 아니라 robots 대상 아님. data/·vendor/는 렌더링에 필요해 막지 않음.
- **구조화 데이터(S8)**: 홈 index.html head에 `@graph` = WebSite(@id /#website, SearchAction 없음 — 검색 URL이 없음) · Organization(이름·url·로고만, 주소·전화 없음) · FAQPage(홈 #faq의 details 5개를 빌드 때 그대로 추출 — 화면과 일치). 정적 1,658쪽 JSON-LD 파싱 오류 0. 새 정적 페이지는 WebPage + isPartOf.
- **공유 이미지(S9)**: `img/og/{home,atlas,travel,taste,room,contests}.jpg` 1200×630(우리 자산만: house-dusk.jpg, img/sig 모형 렌더, 내 방 고치기 3D 캡처; 원본 `/home/claude/seo/og.html`+`og.js`). 홈 og:image·twitter:* 교체, `_page`가 twitter:title/description/image + (og 이미지면) width/height 추가. /atlas/·/travel/·/contests/ 목록 og 이미지 교체. **새 정적 공유 페이지 `/taste/`·`/room/`**(카카오톡 등은 #해시를 못 읽어서 — 실제 내용 있는 소개 페이지 + 앱으로 가는 버튼, sitemap 포함). 취향 랩 '링크 복사'는 정식 사이트에서 `/taste/`. 로컬 og:image 누락 0.
- **문의 완료(S10)**: 문의 insert가 성공(에러 없음)했을 때만 `zThanks(rec)` 오버레이(role=dialog aria-modal, 홈으로·닫기, Esc) + `zga('inquiry_submit_success')` 한 번. 해시를 바꾸지 않으므로 새로고침·직접 접속으로는 안 뜸. 실패·서버 없음이면 기존 문구만. 테스트: Supabase POST 500 → 안 뜸, 201 → 뜸, 새로고침 → 안 뜸.
- **이렇게 써요(S11)**: `ZHOWTO` 4장(땅 보러 가기 전/가구 들어갈까/취향 말로 못 할 때/공모전·과제) — 상황·이렇게·얻는 것 + 바로가기. 사용법(#guide) 맨 위, 홈 FAQ 아래 "상황별 사용법 보기 ›" 링크(홈 섹션 수는 그대로 9). '예시 상황이며 고객 사례·수치 아님' 명시. (`ZUSE`는 내집코드 용도 목록이 이미 쓰는 이름 — 겹쳐서 스크립트 전체가 멈췄던 적 있음, 새 전역 이름은 grep 먼저)
- **FAQ(S12)**: 홈 5개, `<details><summary>`(키보드 Enter/Space·스크린리더 펼침 상태 기본 지원) + summary focus-visible 테두리. FAQPage는 위.
- **첫 화면·고정 CTA(S13)**: 390·1440 모두 첫 화면에 '30초 취향 집 짓기' 버튼 보임(확인). 고정 바 추가 없이 아래 탭 '짓기'를 파란 아이콘·글자로 강조.
- **GA4 틀(S14, ID 대기)**: `window.ZIPLAN_CFG={ga4Id:'',reply:{…}}`. 빌드 때 환경변수 `ZIPLAN_GA4_ID=G-XXXX python3 build_public.py`로 넣음(형식 검사, 코드에 하드코딩 안 함 — 다만 공개 HTML에 ID는 보임, 원래 공개값). ID 없으면 배너·스크립트·요청 모두 없음(테스트 확인). ID 있으면 http(s)에서 동의 배너 `#zConsent`(동의/거부, localStorage `zip_consent`), 동의 뒤에만 gtag 로드(`send_page_view:false`) → 라우트·깊은 화면마다 page_view 1회(같은 화면 반복 없음), 이벤트 cta_click(`[data-cta]`·홈 주요 버튼)·contest_outbound·share·inquiry_submit_success. 푸터 '통계 동의 설정'(ID 있을 때만 보임)으로 다시 고름. 테스트(가짜 ID): 동의 전 요청 0, 동의 뒤 page_view /, /#atlas, /#contests, /#room, / .
- **답변 시간(S15)**: `ZIPLAN_CFG.reply={text,hours,offdays}` — 모두 비어 있으면 문의 창·완료 화면 어디에도 안 보임. 정책 정해지면 crit.html 기본값만 채우면 됨.
- **개인정보처리방침(S16)**: privacy.html 다시 씀(시행일 2026-10-22) — 실제 처리와 맞춤: 회원(이메일·이름·Google), 저장 작업, 문의(이름·이메일 선택, 종류·내용·보낸 화면, 회원 번호), 자체 통계(쿠키·IP 없음), GA(동의 시만), 이 기기에만 남는 것(내 방 사진·평면도 미저장·EXIF 제거, 증명사진은 브라우저 저장), 위탁(Supabase·Vercel·Google), 제3자 제공(견적 상담 업체 연결 시 별도 동의). 미확정은 【 】 자리: 문의 보관 기간, GA 보존 기간, 업체 리전·국외 이전 방법, 개인정보 보호책임자. **법률 검토 전 초안** — 공개 문서엔 적지 않음, 실제 오픈 전 검토 필요. 약관·라이선스·개인정보 페이지에 meta description 추가.
- 사용자 입력 필요: GA4 측정 ID, 답변 시간 정책, 운영 주체·보호책임자·보관 기간, (도메인 바뀌면 SITE_URL).
- 테스트(저장소 밖 `/home/claude/seo/t/`): `t.js 1440|390 routes|inq|ga|noga`(제목 20개 고유·탐색경로·alt·FAQ 키보드·이렇게 써요·문의 성공/실패·동의 흐름, pageerror 0), `crawl.py`, `rl.js`.

## S7 · v22a (2026-10-22) — 정교 모형 +61 → 227채 · 약한 모형 4채 재작업
- 세 조 패치(스크래치 `s7/K.js`·`A.js`·`W.js`, 원본 `s7/src/`·`s7/parts/`·`s7/w/`, 생성기 `gen7.js`·`genA.js`·`gen.js`, 보고서 `s7/{K,A,W}_report.md`)를 `scratch/v13/merge.js`로 병합(eye 유지). 공용 헬퍼는 건물마다 복사본 그대로(건물 파일 30~45KB, 열 때 하나씩만 받으므로 보류).
- **한국 20**(K): gyeonghoeru 경회루·hyangwonjeong 향원정·gwanghwamun 광화문·heunginjimun 흥인지문·bosingak 보신각·deoksu 덕수궁·unhyeongung 운현궁 → 궁궐과 성곽(kold) / sosu 소수서원·oksan 옥산서원·ojukheon 오죽헌·bukchon 북촌·jeonjuhanok 전주 한옥마을·seongeup 성읍민속마을·beopjusa 법주사·hwaeomsa 화엄사·mireuksa 미륵사지 → 산사와 서원(ktemple) / anglican 서울 성공회 성당 → 한국의 근대(kmod) / songeun 송은·arko 아르코미술관·mimesis 미메시스 → 서울의 현대(knew). 자평 상: 경회루·광화문, 중: 운현궁·북촌·미륵사지·성공회·아르코·미메시스, 나머지 중상.
- **아시아·기타 21 + 재작업 2**(A): matsumoto·shirakawago·stmarytokyo·tmg·skytree·naHouse → japan / tulou·bankofchina·hsbc·ncpa → china / humayun·hawamahal·shwedagon·gardensbay·interlace → southasia / bluemosque·burjalarab → mideast / harbourbridge → oceania / congressbr·casacurutchet·quintamonroy → latam. 재작업: tepapa(처음부터 다시 — 회색·노란 돌 덩어리·유리 로비·계단 잔디·항구, 박물관 공식 엔지니어링 자료 / 중상), potala(남쪽 비탈 흰 부벽 17 — 위치 추정, eye 가깝게 / 중상). 자평 상: bankofchina·harbourbridge·congressbr·ncpa·interlace·matsumoto·humayun·bluemosque, 중: stmarytokyo(곡면 각짐)·shirakawago(초가 단순)·casacurutchet.
- **유럽·북미 20 + 재작업 2**(W): schroder·tugendhat·villamuller·stahl·kaufmanndesert·melnikovhouse·vannaventuri·douglashouse·mairea·tourette·casabatllo → 근대의 거장들(master) / florence·pisa(3.97°)·stbasil·monticello → 신전과 대성당(temple) / flatiron·cntower → 하늘로(sky) / gherkin·twa·gatewayarch(NPS 가중 현수선) → 도시의 현대 아이콘(icons). 재작업: getty(트래버틴·흰 금속 판 구분, 곡면 벽 5·캐노피 / 중상), therme(규암 판 질감, 잔디 지붕 틈 유리 줄, 호텔 발코니 띠 / 중상). 자평 중: douglashouse(사무동처럼 보임).
- 출처는 각 build `// 출처:`, 확인 못 한 치수·배치는 `// 추정`. **확인 필요**: 덕수궁 대한문 — 출처는 2칸, 사진 근거로 3칸으로 지음. 북촌 골목은 실제 지도가 아닌 분위기 재현 배치. 성공회 성당 치수·재료 색 추정. 인터레이스 블록별 층 배치 추정. 멜니코프 하우스는 위키백과 접근 실패로 ArchEyes 기준.
- 아틀라스: AT_HALLS 16방 합계 227(전시실 수 그대로), '정교 모형 N채' 문구 166→227(crit.html·build_public.py·licenses.html·og 이미지 `img/og/atlas.jpg` 다시 찍음 — 원본 `/home/claude/seo/og.html`).
- 썸네일: 65장(새 61 + 재작업 4) `img/sig/<id>.webp` 다시 찍음(`atlas/t/prerender.js` 사본 `s7/th/prerender.js`, 포트 8793 → 720×480 q72), `SIG_TH`에 61 추가, `SIG_TH_V='20261022'`. img/sig 227장 8.1MB.
- 확인: 모바일 390·CPU 4배·SwiftShader 아틀라스(단독 실행) 로드 3.6 s · 진입 롱태스크 합 2.7 s · 스크롤 42.7 fps(최악 83 ms) — A1(4.1 s·3.2 s·44.7 fps) 대비 회귀 없음. 새 모형 10채 모달 열기(1440 5·390 5, 3D 캔버스 생성, 제목 갱신) pageerror 0. 깜빡임 검사(`s6/zf6.js`, 새 65채): 0이 아닌 것 bluemosque·harbourbridge·tepapa·potala(지면 아래·물 밑 판), vannaventuri 151㎡, pisa(층 고리 안쪽 15~60㎡), cntower(지면 −1.2 m 판·기단 안쪽) — aerial/eye 렌더에서 보이는 줄무늬 없음, 그대로 둠.

## F · v22b (2026-10-23) — 남은 손질: 물어보기 버튼 비키기 · 정적 쉬운 말 · 취향 랩 공유 딥링크 · 내 방 고치기(3D 끌기·ㄷ자·안쪽 벽 문창·문 검사·눈높이)
- **F6 물어보기 버튼**: 스크롤·리사이즈·라우트 때 rAF로 `#zcFab`이 `.pz-nav,.ct-bar,.rm-mbar,.zc2-steps,.tv-dock`와 겹치는지 보고, 겹치면 `html.zfab-dodge`(버튼 투명·터치 통과, 0.18s). 360 광장 첫 화면 겹침 해결, 공모 거르기 띠 위를 지날 때도 비킴. (`/* F6 v22b */`, zscroll 리스너 바로 뒤)
- **F7 정적 /atlas/·/ask/ 쉬운 말**: build_public.py `_plainify(html, atlas)` — `<main>` 본문 텍스트에서 용어마다 **처음 한 번만** "쉬운 말(용어)"(예: 기둥만 세워 비운 1층(필로티), 다니는 길(동선), 땅(대지)). 제목(h1~h4)·링크·버튼·summary·figcaption·code 안은 건드리지 않음, 앞 글자가 한글이면(합성어) 건너뜀, 뒤가 조사 아닌 한글이면 건너뜀(대지면적·매스감 등). 목록 `_PLAIN`(21개) + 아틀라스만 '공포'(처마를 받치는 나무 짜임). 사전 /dict/는 그대로.
- **F3 취향 랩 공유 딥링크**: `#dna?r=<1단계 카드>.<2단계>.<3단계>`(카드 id를 '-'로, 예 `wood-hanok.forest.light-yard`). `zDeep`이 dna도 처리 → `dnqShared(P)`: 받은 사람의 기록은 백업(`DNQ.bak`)하고 결과만 보여 줌(머리 "공유받은 취향 집" + "나도 해 보기"), 다른 화면으로 가거나 '나도 해 보기'를 누르면 원래 기록 복원(`dnqUnshare`). '링크 복사'는 정식 사이트면 `/taste/?r=…`(카카오톡 미리보기용 정적 페이지 → 작은 인라인 스크립트가 `/#dna?r=…`로 바로 넘김), 로컬이면 `#dna?r=…`. '둘 중 하나 8판'은 이번에도 안 만듦.
- **F2 내 방 고치기 — 모양**: `RM.notch.c` 4~7 = **ㄷ자**(4 위·5 오른쪽·6 아래·7 왼쪽 벽 가운데가 들어감, w=벽 따라 폭 ≤ 벽−120, d=깊이 ≤ 반대 방향−60). 모양 선택 네모|ㄱ자|ㄷ자, 라벨이 '들어간 벽/폭/깊이'로 바뀜. 공용 헬퍼: `rmInner()`(장애물 사각형의 경계에 안 닿는 변 = 안쪽 벽, 위→오른쪽→아래→왼쪽 순, a→b·안쪽 법선 n·t·len), `rmWallGeo(w)`(0~3 바깥, 4~ 안쪽), `rmN(w)`·`rmHz(w)`·`rmWallPt(w,s)`·`rmWallNames()`, `rmPoly()`(바닥·천장 다각형 8가지). `rmOnWall`·`rmWallLen`·조명/콘센트 `wallPt`가 안쪽 벽도 계산.
  - **안쪽 벽에 문·창**: 문·창 목록의 '벽' 고르기에 '안쪽 가로벽/세로벽'(벽 번호 4~). 평면 SVG는 안쪽 벽을 구멍·창 기호·문 호까지 그림(바깥 벽 코드는 그대로), 3D는 안쪽 벽도 `addWall`에 구멍을 넣고 문짝(경첩·여는 쪽)도 붙임. 바깥 벽은 ㄷ자면 가운데가 잘려 두 조각. 모양이 바뀌어 없어진 안쪽 벽의 문·창은 아래 벽으로(`rmUpdate`). 한계: 가구 자동 배치 후보는 여전히 바깥 네 벽 기준(안쪽 벽에 등 붙이는 자동 배치 없음 — 끌어서는 가능).
  - **문 검사**(`rmEval`): 안쪽으로 여는 문 둘의 열림 자리가 겹치면 bad, 문짝이 꺾인 벽(ㄱ·ㄷ 장애물)에 걸리면 bad, 밖으로 여는 문은 warn "문 밖에 문 폭만큼 빈 자리 — 복도·현관 확인"(바깥은 모르므로 검사가 아니라 안내).
- **F1 3D에서 가구 끌기**: 인형집·위에서 보기에서 가구(바닥 차지하는 것, `fgs` — 그룹 `userData.fi`=L.items 인덱스)를 누르면 바닥 평면 레이로 끌기 → rAF마다 `rmPlace(…,live)`(평면 끌기와 같은 10cm 격자·벽 자석·겹침·문 자리·통로 재계산) + 바닥 표시판(초록/빨강). 놓으면 `rmPlace`→`rmCommit`→`rmShow` 후 카메라를 유지한 채(`RM3.keep`) 3D 다시 짓기. 누르기만 하면 고름 → 머리에 '↻ 돌리기'(`#rm3Rot` → `RM3.rotSel` = rmRotate + 다시 짓기). 빈 곳 끌기는 예전처럼 카메라 회전.
  - **눈높이 시작·걷기 방향** `rmFace(x,y,d)`: 시작(문 안쪽 60cm)과 바닥 눌러 걸어간 뒤, 앞이 방 짧은 변의 55%보다 가까이 막혀 있으면 15° 간격으로 가장 트인 쪽으로 돌고(장애물·ㄱ/ㄷ 빈칸 포함), 그래도 80cm 미만이면 방 다각형 가운데를 봄. 걷는 동안 같이 부드럽게 돈다.
- `__room`에 rmInner·rmObs·rmPoly·rmUpdate·rmFill·rmShow 추가(테스트용).
- 테스트(저장소 밖 `/home/claude/f22/`, 서버 `python3 -m http.server 8814` in crit): `ov.js`(FAB 겹침 360·390·가로), `troom.js d|m`(ㄷ자·안쪽 벽 창·밖여닫이 안내·3D 열기·3D 가구 끌기 → edits 저장·다시 짓기·눈높이 걷기·ㄱ자 안쪽 벽 문 평면/3D), `t3.js`(예시 방 5클릭 회귀), `tdna.js`(공유 링크 → 공유받은 결과 → 홈 가면 기록 복원), `sweep.js`(20개 라우트 1440/390 pageerror 0·가로 넘침 0).

## S8 · v22c (2026-10-23) — 아틀라스 +119채(928) · 정교 모형 +60(287) · 전시실 19방
- **아틀라스 BLD +119**(한국 72·세계 47; 조사 /tmp/claude-0/-home-claude/ad5cd39c-5a61-5615-996a-b77e24e93ec8/scratchpad/s8/atlas_add.js·출처 대조 atlas_add_report.md — 107건 대조: 확인 73·정정 33·제외 1(웰콤시티)). 사진은 전부 빈칸(위키미디어 접근 불가) → 카드는 기존 사진 없는 항목 경로, 정적 /atlas/<id>/는 `.nophoto` 문구 + og:image house-dusk. **사진 채우기는 사용자 Chrome으로 커먼즈 라이선스 확인 필요.** '809채'→'928채'(crit.html·build_public.py·og 이미지).
- **정교 모형 +60 → 287**(병합 /tmp/claude-0/-home-claude/ad5cd39c-5a61-5615-996a-b77e24e93ec8/scratchpad/v13/merge.js): K2(한국 20 + deoksu 3칸 확인·mireuksa eye 이동), A2(20 + stmarytokyo 쿤스 곡면·shirakawago 박공·interlace 출처 보강), W2(20 + douglashouse 재작성). id 목록 /tmp/claude-0/-home-claude/ad5cd39c-5a61-5615-996a-b77e24e93ec8/scratchpad/s8/{K2,A2,W2}_ids.txt, 출처·자평 *_report.md.
- **전시실 16→19방**: 신설 `khouse` 고택과 정원(하회·양동·오죽헌·운현궁·북촌·전주·성읍·소쇄원 — ktemple/kold에서 이동), `houses` 명작 주택(master에서 주택 15채 이동 + 홀리호크·쉰들러·러벨·게리 자택·힐 하우스·스토클레·유리의 집·빌라 바르바로), `ancient` 유적과 성(스톤헨지·퐁 뒤 가르·메종 카레·노이슈반슈타인·만리장성·시기리야). '궁전과 광장'은 정교 모형 궁전이 아직 없어 만들지 않음. 나머지 새 모형은 기존 방에 추가(합계 287, 중복 0).
- 썸네일 66장(새 60 + 재작업 6) `img/sig` 다시 찍음(prerender 사본 /tmp/claude-0/-home-claude/ad5cd39c-5a61-5615-996a-b77e24e93ec8/scratchpad/s8/th, 포트 8793), `SIG_TH` 287, `SIG_TH_V='20261023'`; img/sig 287장 9.9MB. og/atlas.jpg 287/928로 다시 찍음(/home/claude/seo/og.html).
- 확인: 아틀라스 390 CPU×4 로드 3.55초·진입 멈춤 합 2.7초·스크롤 52fps(S7 3.6초·42.7fps), 새 모달 10개(1440·390) 오류 0·깨진 이미지 0, 라우트 스윕 오류 0, 새 정적 119쪽 링크 3,838개 깨짐 0(/privacy·/terms는 cleanUrls), sitemap 1,777.
- 남은 한계: 독립기념관 겨레의 집 지붕(맞배, 확인 필요) · 정림사지 탑 높이 추정 · 경주박물관·전쟁기념관 치수 추정 · djinguereber 대부분 추정 · 선암사 바닥 0.03m 겹침 1곳(화면 미확인) · 썸네일에서 대릉원·정림사지·만리장성은 멀리서 작게 보임 · 새 119채 사진 없음. 다음 차례: 안동 고택(임청각·선교장·독락당 등, 이제 BLD에 있음) 정교 모형.

## S9 · v22d (2026-10-26) — 정교 모형 +45(332) · 안동 고택 · 사진 105채 · 전시실 20방 · 썸네일 시점 힌트
- **정교 모형 +45 → 332**(병합 scratch v13/merge.js — 이제 `thumb` 키도 직렬화): K3 한국 20(임청각·선교장·독락당·서석지·운조루·명재고택·세연정·김명관 고택·도동·남계·필암·돈암·무성서원·영남루·광한루·낙안읍성·강화성당·풍수원성당·딜쿠샤·경교장) + G3 세계 25(개선문·사크레쾨르·앵발리드·가르니에·팡테옹·타워 브리지·웨스트민스터 궁/사원·앨버트 홀·런던 아이·금문교·브루클린 브리지·애플 파크·백악관·국회의사당·링컨 기념관·유엔 본부·도쿄 타워·오사카성·천안문·그랜드 링·브란덴부르크 문·몽생미셸·미요 고가교·베를린 필하모니). 출처·자평: scratch s9/{K3,G3}_report.md. 패치 s9/{K3,G3}.js.
- **썸네일 시점 힌트 `BSIG[id].thumb={c:[x,z],y,r,az?,el?}`**: `pgThumb`이 있으면 중심·반경·높이·각도를 그 값으로(넓게 퍼진 모형이 작게 나오던 문제). 적용: daereungwon·jeongnimsa·mireuksa·greatwall·gyeonggyojang(병원 동에 가려 빈 화면 → 위에서 내려다보기). 빌드 분리 시 메타 JSON에 그대로 남음. 주의: pgThumb은 P.tag로 캐시 — 시점 시험할 땐 tag를 바꿀 것.
- **전시실 19→20방**: 신설 `palace` 궁전과 광장(개선문·브란덴부르크·앵발리드·가르니에·앨버트 홀·웨스트민스터 궁·백악관·국회의사당·링컨·천안문·오사카성). 고택과 정원 +8(16), 산사와 서원 +5, 궁궐과 성곽 +3, 한국의 근대 +4, 신전과 대성당 +4, 도시의 현대 아이콘 +9(애플 파크·그랜드 링·유엔·런던 아이·베를린 필·다리 4), 하늘로 +1. 합계 332, 중복 0.
- **사진 105채**(S8 새 119채 중; scratch s9/photos_add.js·photos_report.md, Commons API로 라이선스 확인): CC BY-SA·CC BY·PD·KOGL 1·CC0만. 내부·부분 사진은 작가 칸 뒤에 표기(그랜드 센트럴·빈하이 '내부 사진', 운주사 '석조불감 부분', 낙선재 '마당 부분', 국립한글박물관 '건물 일부', 제국호텔 '현관 홀(메이지무라 이축)'). 운조루는 대문채 사진이라 넣지 않고 정교 모형 그림을 씀. 빈칸 14: 녹우당·왕곡마을·공주 중동성당·불광동성당·아르코예술극장·국립극장·샹산 캠퍼스·아라냐·서울시립 사진미술관·현대 모터스튜디오·식영정·서강대 본관·혜화동성당·운조루(의도). 마산 양덕성당은 항목 내용 정상(조사 중 검색 혼선만).
- 썸네일 49장(새 45 + 힌트 4) + 경교장 재촬영, `SIG_TH` 332, `SIG_TH_V='20261026'`. og/atlas.jpg 332/928로 다시 찍음. '287채'→'332채'(crit.html·build_public.py·licenses.html).
- 확인(로컬 8793): 아틀라스 390 CPU×4 로드 3.8~4.0초·진입 멈춤 합 2.9~3.1초·스크롤 40~47fps(S8 3.55초·52fps, 같은 조건 두 번 측정 — 편차 범위로 판단, 큰 회귀 없음), 새 모달 12개 1440·390 오류 0·사진·출처 표시·깨진 이미지 0, 라우트 9개 오류 0, 바뀐 정적 49쪽 링크 1,222개 깨짐 0. 깜빡임은 팀 검사 결과 사용(독락당 담 지붕 ~10㎡ 잔여).
- 남은 한계: 그랜드 링 eye 띠처럼 보임 · 오사카성 해자 약함 · 몽생미셸 바위 근사 · 베를린 필 치수 전부 추정 · 미요 썸네일 작음 · 풍수원성당 연도 이설 병기. 다음 K4: 김수근·김중업 작품, 식영정, 녹우당, 외암마을.

## S10 · v22e (2026-10-27) — 정교 모형 +43(375) · 뷰어 깜빡임 근본 수정 · 사진 2채 · 아틀라스 성능 손질
- **깜빡임 원인과 수정(뷰어, 모형 데이터 아님)**: 남은 깜빡임은 같은 메시/같은 색 재질끼리라 기존 스캔(`zf.js`)이 못 잡던 도시 배경 판·길 — 2~4 cm 떨어진 판이 멀리(0.4~1.3 km)서 깊이 정밀도 부족으로 뒤집힘. ① `placeCam()`에서 `cam.near=clamp(dist×0.02, 0.4, 30)`을 매 프레임 맞춤(기존 frame()의 0.8%·최대 6 m 고정 대신; PGV 최소 거리 14라 근접 잘림 없음, 내 방 고치기 3D는 별도 렌더러라 영향 없음) ② `pgGroundDrop(T,life)` — SIGB 빌드 뒤 1회, life 그룹의 정점색·인덱스·높이차 ≤2 cm·한 변 ≥1.5 km 평지 지형만 12 cm 내림. 흔들기 비교(카메라 0.00005 rad 회전 두 장의 12% fuzz 변화 화소, scratch s10/m4/zfjit.js) 전→후: cctv A 3489→1554 / F 3092→294, lotte 840→371 / 370→183, empirestate 637→335, changgyeong 391→241 / 212→146, gyeongbok 1484→1399(경회루 연못·물길이 회색으로 묻히던 것도 보이게 됨). 남은 것: cctv 큰길 중앙선 일부, nmk 물가, acc 가장자리(작음).
- **정교 모형 +43 → 375**(병합 scratch v13/merge.js, eye·thumb 유지): G4 세계 25(versailles alhambra stmarks milanduomo dogespalace rialto hungparliament schonbrunn stephansdom jewish harpa jinmao selimiye konark persepolis kumamoto ckscmh bayon grandcentral marinacity oculus vessel exeter sultanhassan royalexhibition) + K4 한국 18(sigyeongjeong myeonangjeong nogudang oeam wanggok jeonjuhyanggyo chokseongnu gochangeup hwanggungu naesosa muwisa seokbinggo gameunsa arkotheater yangdeok kjumuseum jeoldusan hyehwachurch). 보고서 scratch s10/{G4,K4}_report.md(출처·추정). 못 넣은 한국 후보(형태 자료 부족): 불광동성당·서강대 본관·국립극장·화암사.
- **전시실 20방 375채(중복 0)**: 고택과 정원 +5(정자·마을), 산사와 서원 +4(전주향교·내소사·무위사·감은사지), 궁궐과 성곽 +4(촉석루·고창읍성·황궁우·석빙고), 한국의 근대 +3(혜화동·절두산·양덕), 서울의 현대 +2(아르코·김중업박물관), 궁전과 광장 +4(베르사유·쇤브룬·두칼레·헝가리 국회), 신전과 대성당 +3, 유적과 성 +1(페르세폴리스), 사막의 돔과 빛 +3(알람브라·셀리미예·술탄 하산), 남·동남아 +2(코나르크·바욘), 일본 +1(구마모토), 중국 +2(진마오·중정기념당), 근대의 거장들 +2(엑서터·마리나 시티), 빛·물·땅 +2(유대인 박물관·하르파), 도시의 현대 아이콘 +4(리알토·오큘러스·베슬·그랜드 센트럴), 오세아니아 +1(로열 전시관). '332채'→'375채'(crit.html·build_public.py·licenses.html·og/atlas.jpg 다시 찍음).
- **데이터 정정**: 무위사 극락보전 연도 `1430` → `1430년경(1476 이전)`(한국민족문화대백과 연기문 "1476 이전"), 촉석루 `1241` → `1241(1365설도 있음)`. 슈테판 대성당 폭 이견은 모형 dims 주석에만(BLD엔 폭 없음).
- **사진 +2(107/119)**: natheater 국립극장(Korea.net/KOCIS, CC BY-SA 2.0), unjoru 운조루 전경(문화재청, 공공누리 1유형 — 대문채 대신 전경). 남은 사진 없음 12채(scratch s10/photos14_report.md).
- **썸네일** 43장 `img/sig`(prerender 사본 scratch s10/th4, 포트 8793), `SIG_TH` 375, `SIG_TH_V='20261027'`; 시트 scratch s10/all_new4_sheet_1.png.
- **성능 손질(휴대폰)**: ① `pgThumbNext` 스크롤 멈춤 대기 240 ms → PG_LOW 800 ms·데스크톱 300 ms ② `bldPump`·`atThumbs`: PG_LOW에서 사진도 정교 모형 그림도 없는 카드는 WebGL 대신 `bldIll(b)` SVG(시대 t/m/c별 색·실루엣, `.ph.ill`) — 데스크톱은 그대로 3D ③ `.atx-rc` content-visibility:auto ④ F6 물어보기 비키기 `zfDodge`가 스크롤마다 전체 `querySelectorAll`하던 것 → 2초 캐시(hashchange 때 초기화). 측정(390 CPU×4 SwiftShader, 같은 날 나란히): HEAD 667b8b2 스크롤 17.2~21.3 fps·로드 6.0~6.7 s, 이번 빌드 18.3~24.3 fps·로드 5.9~6.4 s — 편차 안에서 소폭 개선, a79ec10 수준(28.6~29.1 fps)까지는 못 감. 이분 측정: a79ec10 29 → 91535f9(S7 +61·전시실) 24 → 64bd1cc 24 → 8180b3b(S8 +119·전시실 3) 20 → 콘텐츠(전시실 타일·카드) 증가가 원인으로 보임. 전시실 타일 스크롤 애니메이션 끄기·미리보기 그림자 줄이기는 효과 없어 되돌림. 다음 후보: 전시실 타일 미리보기 이미지 크기 축소(360×240 썸네일 별도), 휴대폰 전시실 접기.
- 확인(로컬 8793): 새 모달 12개(무작위 10 + 국립극장·운조루) 1440·390 오류 0·깨진 이미지 0, 정적 /atlas/ 47쪽+licenses 링크 2,457개 깨짐 0(정적 국립극장 출처 표시 확인), 라우트 12개 스윕 오류 0, 휴대폰·PC 전체 목록 썸네일 정상.
