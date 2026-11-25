# K7 — 한국 정교 모형 7차 (Q24, 2026-11-26)

기본 규칙은 `tools/sig/k6/BRIEF.md`를 그대로 따른다. 경로만 k6 → k7로 바꿔 읽어라:
- 작업 폴더 `/home/claude/work/k7/<팀>/`, 패치 `/home/claude/work/k7/<팀>.js`, 보고서 `/home/claude/work/k7/<팀>_report.md`
- 렌더: `/home/claude/work/render.sh /home/claude/work/k7/<팀>.js <ids> thumb,eye,aerial,jiteye,jitaerial /home/claude/work/k7/<팀>/out/r1-` (출력 prefix는 반드시 절대 경로)
- 서버 8861(저장소 루트)은 이미 떠 있음. 끄거나 새로 띄우지 말 것. `pkill -f` 금지. 브라우저는 render.sh로만(동시 2개 세마포어).
- 참고할 최신 항목: K6(`geonwonneung`·`munmyo`·`yongjucheonbo`·`seonunsa`·`gunsanbank`·`mokpoconsulate`·`oldsnu`·`chungnamhall`·`someseoul`·`yundongju`) — 보고서 `tools/sig/k6/{A,B,C}_report.md`의 요령을 먼저 읽어라.
- 팀당 4채, 시간 예산 약 2시간. 어설픈 모형은 넣지 말고 완성한 것만 패치에.
- 모든 건물은 BLD에 이미 있다(`grep -n '\["<id>"' crit.html`).
- 렌더러가 SIGB.build 전에 원점에 기본 나무 한 그루를 K.life에 넣는다 — 원점이 마당·건물 안이면 build 첫머리에서 숨길 것(G6b 팀 C 메모).
