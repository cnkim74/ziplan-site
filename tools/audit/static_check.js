// 정적 페이지 점검: node static_check.js <port> — 360·1440 가로 넘침·오류·h1·JSON-LD
const { chromium } = require('playwright');
const port = process.argv[2] || 8871;
const P = ['/atlas/', '/atlas/jongmyo/', '/atlas/savoye/', '/ask/', '/ask/건폐율/', '/dict/', '/contests/', '/travel/', '/travel/tokyo/', '/plan3d/', '/taste/', '/room/', '/404.html', '/privacy.html', '/terms.html', '/licenses.html'];
(async () => {
  const br = await chromium.launch();
  for (const w of [360, 1440]) {
    const ctx = await br.newContext({ viewport: { width: w, height: 800 }, isMobile: w < 800, hasTouch: w < 800 });
    const pg = await ctx.newPage(); const errs = [];
    pg.on('pageerror', e => errs.push(e.message.slice(0, 160)));
    await pg.route('**/*', r => r.request().url().startsWith('http://localhost') ? r.continue() : r.abort());
    for (const u of P) {
      const res = await pg.goto(`http://localhost:${port}${encodeURI(u)}`, { waitUntil: 'domcontentloaded' });
      const st = await pg.evaluate(() => ({ over: document.documentElement.scrollWidth > innerWidth + 1, h1: document.querySelectorAll('h1').length, ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { JSON.parse(s.textContent); return 'ok'; } catch (e) { return 'BAD'; } }).join(','), title: document.title.slice(0, 40) }));
      console.log(w, res.status(), u, JSON.stringify(st));
    }
    console.log(w, 'errors', JSON.stringify(errs));
    await ctx.close();
  }
  await br.close();
})();
