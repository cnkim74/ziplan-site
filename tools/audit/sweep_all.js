// 전체 점검: node sweep_all.js <port> <outdir> [widths=1440,390,360]
// 라우트마다 pageerror·console error·가로 넘침·깨진 로컬 이미지·작은 터치 영역(폰)·첫 화면 스크린샷
const { chromium } = require('playwright');
const path = require('path');
const port = process.argv[2] || 8871;
const out = process.argv[3] || '.';
const WS = (process.argv[4] || '1440,390,360').split(',').map(Number);
const TLIB = path.join(__dirname, '../sig/three.min.js');
const ROUTES = process.env.ROUTES ? process.env.ROUTES.split(',') : ['home', 'atlas', 'travel', 'dna', 'zipcode', 'room', 'plan3d', 'flow', 'site', 'concept', 'drawing', 'model', 'panel', 'learn', 'library', 'portfolio', 'contests', 'plaza', 'studio', 'guide', 'pricing'];
(async () => {
  const br = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const rep = {};
  for (const w of WS) {
    const mob = w < 800;
    const ctx = await br.newContext({ viewport: { width: w, height: mob ? 800 : 900 }, isMobile: mob, hasTouch: mob });
    const pg = await ctx.newPage();
    let cur = 'boot'; const errs = [];
    pg.on('pageerror', e => errs.push([cur, 'pageerror', e.message.slice(0, 220)]));
    pg.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|net::ERR/.test(m.text())) errs.push([cur, 'console', m.text().slice(0, 220)]); });
    pg.on('requestfailed', r => { const u = r.url(); if (u.startsWith('http://localhost') ) errs.push([cur, 'reqfail', u.slice(0, 160)]); });
    pg.on('response', r => { const u = r.url(); if (u.startsWith('http://localhost') && r.status() >= 400) errs.push([cur, 'http' + r.status(), u.slice(0, 160)]); });
    await pg.route('**/*', r => { const u = r.request().url(); if (/three(\.min)?\.js/.test(u)) return r.fulfill({ path: TLIB, contentType: 'text/javascript' }); if (/html2canvas|liquid-glass|nav-glass/.test(u)) return r.abort(); if (u.startsWith('http://localhost')) return r.continue(); return r.abort(); });
    await pg.goto(`http://localhost:${port}/#home`, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await pg.waitForTimeout(3500);
    rep[w] = {};
    for (const rt of ROUTES) {
      cur = rt;
      await pg.evaluate(r => { location.hash = r; window.scrollTo(0, 0); }, rt);
      await pg.waitForTimeout(1600);
      // 끝까지 한 번 스크롤(지연 그림 채우기)
      await pg.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += innerHeight * 0.9) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
      await pg.waitForTimeout(700);
      const st = await pg.evaluate(mob => {
        const de = document.documentElement;
        const view = document.querySelector('#view-' + location.hash.slice(1).split('?')[0]) || document.body;
        const over = de.scrollWidth > innerWidth + 1;
        // 넘치는 요소 찾기
        const wide = [];
        if (over) for (const el of view.querySelectorAll('*')) { const r = el.getBoundingClientRect(); if (r.right > innerWidth + 2 && r.width > 0 && getComputedStyle(el).position !== 'fixed') { wide.push((el.id ? '#' + el.id : '') + '.' + (el.className && el.className.baseVal === undefined ? String(el.className).split(' ').slice(0, 2).join('.') : '') + '<' + el.tagName + '> ' + Math.round(r.right)); if (wide.length > 6) break; } }
        const broken = [...view.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0 && i.src && i.src.startsWith(location.origin) && i.offsetParent).map(i => i.getAttribute('src').slice(0, 80)).slice(0, 5);
        let small = [];
        if (mob) for (const el of view.querySelectorAll('a[href],button,[role=button],input,select,summary')) { if (!el.offsetParent) continue; const r = el.getBoundingClientRect(); if (r.width === 0) continue; if (r.height < 30 && r.width < 30 || r.height < 24) { const t = (el.textContent || el.getAttribute('aria-label') || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 24); small.push(t + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); } }
        const noalt = [...view.querySelectorAll('img')].filter(i => i.offsetParent && !i.hasAttribute('alt')).length;
        const h1 = view.querySelectorAll('h1').length;
        return { over, wide, broken, small: small.slice(0, 8), nsmall: small.length, noalt, h1, title: document.title, H: de.scrollHeight };
      }, mob);
      rep[w][rt] = st;
      try { await pg.screenshot({ path: `${out}/r-${w}-${rt}.png`, timeout: 30000 }); } catch (e) {}
    }
    rep[w].errors = errs;
    await ctx.close();
  }
  await br.close();
  console.log(JSON.stringify(rep, null, 1));
})();
