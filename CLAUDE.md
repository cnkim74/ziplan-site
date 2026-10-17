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
