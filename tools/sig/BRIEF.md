# K5 — 한국 정교 모형 5차 브리프 (ZIPLAN 아틀라스)

너는 ZIPLAN(건축 학습 사이트)의 '정교 모형'(BSIG) 몇 채를 새로 짓는 담당이다. 결과물은 **패치 파일 하나**와 **보고서 하나**. crit.html은 절대 직접 고치지 말 것(병합은 내가 한다). git 커밋·푸시도 하지 말 것.

## 1. 무엇을 만드나
저장소: `/home/claude/ziplan-site/crit.html` (18MB 한 파일 — grep·sed -n으로 필요한 부분만 읽어라. 통째로 Read 금지)
- `const BSIG={` (10337행 근처) 안의 항목 하나 = 건물 하나: `id:{dims:"…",desc:"…",feats:[…],see:[…],plan:{…},sec:{…},eye:{az,el,dist,cy},thumb?:{c:[x,z],y,r,az?,el?},build(K){ … }},`
- **참고할 기존 항목**(형식·헬퍼·품질 기준 — 반드시 하나 이상 통째로 읽고 시작): 한옥/전통 → `nogudang:`·`naesosa:`·`chokseongnu:`(K7 한옥 키트 `hall7`, 담 `wall7`, 지형 `E.terrain`, 숲 `E.forest`, `E.own()`, `tidy7`) / 근대·현대 → `yangdeok:`·`arkotheater:`·`hyehwachurch:`·`kjumuseum:`. `grep -n "^ yangdeok:{" crit.html` 식으로 시작 줄을 찾고 다음 항목 시작 줄 전까지 읽어라.
- 헬퍼 블록(E·C7·hall7·roofHF·inst·merge·tbox 등)은 **각 build 안에 복사본으로** 넣는 것이 기존 관례(건물 파일이 따로 지연 로드되므로). 필요 없는 부분은 빼도 된다.
- K 키트(`function bsigKit`, 81999행): K.T(three r128), K.M(공용 재질: glass, water, trunk, leaf2, giwa, people …), K.col(hex,opts) 재질, K.layer(i) 층 그룹, K.b 상자(x,y,z,w,h,d,mat,ry) — y는 바닥, K.c 원기둥, K.ex 압출(평면 점 [x,z] 목록), K.surf(fn(u,v)→[x,y,z,u,v]), K.roof/roofGable/roofPyr/pyr/pedim/dome/shell/blob, K.water, K.tree, K.bldg(건물 그룹), K.life(배경 그룹 — 주변 지형·숲·도시는 여기에), K.cur.
- 좌표: m 단위, +y 위, **정면(주 입구)이 +z 쪽**(eye 기본 시점이 +z에서 봄). 지면 y=0. 건물 본체는 K.layer(0..n), 주변 맥락은 K.life.
- 마지막에 기존 관례대로 `E.own()`(뷰어 기본 바닥 숨김)과 `tidy7(1)`(또는 기존 항목의 tidy)을 **환경 블록 뒤에** 부른다(tidy 뒤에 life에 더한 것은 숨겨짐).
- 성능: 메시 450개 미만, build 150ms 안쪽(소프트웨어 GL에서 썸네일 5~8초는 정상), 숲·창 등 반복은 InstancedMesh/병합.
- 텍스트(dims·desc·feats·see)는 **쉬운 한국어 존댓말**(기존 항목 말투), desc 4~6문장, feats 5개, see 3개. 실제 사실만. 확인 못 한 치수는 dims에 쓰지 말고 build 주석 `// 추정:`에. 출처는 build 첫 줄들 `// 출처: …`(문서명·기관). 학생 작품·영화 스틸·개인 이메일 금지.
- plan: `{w,d,walls:[[x,z,w,d]…],notes:[[x,z,"글"]…]}`(필요하면 free/circles/lines), sec: `{h,d, hanok:1 | steps:n | lift:n | pilotis:n | dome:1 | court:1}` — 기존 항목처럼 개략.
- eye 힌트로 정면에서 사람 눈높이 쪽이 잘 보이게. 넓게 퍼진 모형은 thumb 힌트(`thumb:{c:[x,z],y,r}`)로 썸네일이 건물에 맞게.

## 2. 사실 조사
WebSearch/WebFetch로 실제 자료를 찾아 치수·칸수·층수·재료·배치·주변을 확인(국가유산청 국가유산포털, 한국민족문화대백과, 위키백과, 건축가·기관 공식 자료, 신문 기사 등). 위키미디어가 막히면 다른 출처로. 자료가 엇갈리면 둘 다 주석에 적고 보수적으로. 연도·설계자 같은 사실은 crit.html의 `const BLD=[` 항목(이미 있는 건물 정보)과 비교해 다르면 보고서에 적어라(BLD는 내가 고친다).

## 3. 파일
- 작업 폴더: `/home/claude/work/k5/<팀>/` — 건물마다 `src/<id>.js`(내용은 `id:{…},` 한 항목 텍스트), 그리고 합친 패치 `/home/claude/work/k5/<팀>.js` = 
  ```
  const BSIG_PATCH={
  <src들을 이어 붙인 것>
  };
  ```
  (작은 node 스크립트로 이어 붙여라. `node -e "new Function(require('fs').readFileSync('<팀>.js','utf8')+';return BSIG_PATCH')()"`로 문법 확인.)
- 보고서 `/home/claude/work/k5/<팀>_report.md`: 건물별 — 출처 목록, 추정한 것, 자평(상/중상/중/중하), BLD 정보와 다른 점, 남은 한계.

## 4. 렌더로 직접 확인 (필수)
서버는 이미 떠 있다(포트 8861, 저장소 루트). 렌더는 반드시 래퍼로(브라우저 동시 2개 제한 — 기다릴 수 있음):
```
/home/claude/work/render.sh /home/claude/work/k5/<팀>.js <id1,id2> thumb,eye,aerial,jiteye,jitaerial /home/claude/work/k5/<팀>/out/r1-
```
- 출력: `<prefix><id>-thumb.jpg`(아틀라스 썸네일과 같은 렌더), `-eye.png`, `-aerial.png`(뷰어 화면), `jit*` = 깜빡임 검사(카메라를 아주 조금 돌렸을 때 바뀐 화소 수; 기존 좋은 모형은 수십~수백. 수천이면 겹친 면(같은 높이 판 두 장 등)이 있으니 1~2 cm 띄우거나 지워라), 콘솔에 err 목록(페이지 오류가 있으면 고쳐야 함).
- 결과 PNG를 Read로 **직접 보고** 형태·비율·색·정면 방향·썸네일 구도를 고쳐라. 최소 2회 반복. 한 번에 2~4채씩 렌더(한 채 약 20~40초).
- 절대 `pkill -f` 쓰지 말 것. 서버를 끄거나 새로 띄우지 말 것.

## 5. 품질 기준
- 그 건물임을 알아볼 수 있는 특징(실루엣·칸 수·지붕 형식·재료 색·창 리듬·대표 요소)을 정확히. 주변(산·물·도시 블록·마당·담)은 기존 항목 수준으로 간단히, 건물보다 튀지 않게.
- 끝나면 보고서와 패치 경로를 한 문단으로 알려 줘라(최종 메시지). 자평이 '중' 이하인 것은 이유를 적어라.
