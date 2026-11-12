// og/atlas.jpg 다시 찍기 — 1200×630. 숫자는 crit.html에서 읽음(정교 모형 N채 · 세계 M채).
// 사용: node tools/og/atlas_og.js  (저장소 루트에서, playwright 필요)
// 그림: img/sig/<id>.webp (우리 모형 렌더만), 워드마크: brand/ziplan-wordmark.svg
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.resolve(__dirname, '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'crit.html'), 'utf8');
const nSig = (src.match(/정교 모형 (\d+)채/) || [])[1];
const nAll = (src.match(/세계 (\d+)채/) || [])[1];
if (!nSig || !nAll) throw new Error('숫자를 crit.html에서 못 찾음');
const IDS = ['jongmyo', 'sydney', 'savoye', 'gyeongbok', 'burj', 'fallingwater'];
const img = id => 'data:image/webp;base64,' + fs.readFileSync(path.join(ROOT, 'img/sig', id + '.webp')).toString('base64');
const wm = fs.readFileSync(path.join(ROOT, 'brand/ziplan-wordmark.svg'), 'utf8').replace(/#111111/g, '#ffffff');
const html = `<!doctype html><meta charset=utf-8><style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#111;font-family:'Noto Sans CJK KR','Noto Sans KR',sans-serif;overflow:hidden;position:relative}
.g{position:absolute;inset:6px;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:6px}
.g div{background-size:cover;background-position:center;border-radius:6px}
.sh{position:absolute;inset:0;background:linear-gradient(90deg,rgba(17,18,22,.93) 0%,rgba(17,18,22,.86) 30%,rgba(17,18,22,.45) 52%,rgba(17,18,22,0) 66%)}
.t{position:absolute;left:66px;top:186px;color:#fff}
.k{color:#5ea0ff;font-size:21px;font-weight:700;margin-bottom:18px}
h1{font-size:50px;line-height:1.22;font-weight:900;letter-spacing:-.5px}
p{margin-top:24px;font-size:22px;line-height:1.6;color:#e9e9ee;font-weight:500}
.b{position:absolute;left:66px;bottom:44px;display:flex;align-items:center;gap:18px;color:#d8d8de;font-size:17px;font-weight:500}
.b svg{height:26px;width:auto}
</style><div class=g>${IDS.map(id => `<div style="background-image:url(${img(id)})"></div>`).join('')}</div><div class=sh></div>
<div class=t><div class=k>건축 아틀라스</div><h1>정교 모형 ${nSig}채,<br>세계 건축 ${nAll}채</h1><p>실제 치수와 특징으로 다시 지은<br>명작을 3D로 돌려 보세요.</p></div>
<div class=b>${wm}<span>집플랜 — 모두의 건축</span></div>`;
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await pg.setContent(html, { waitUntil: 'load' });
  await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(ROOT, 'img/og/atlas.jpg'), type: 'jpeg', quality: 86 });
  await b.close();
  console.log('img/og/atlas.jpg', nSig, nAll);
})();
