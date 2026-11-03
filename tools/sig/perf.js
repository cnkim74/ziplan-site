// node perf.js <port> — 390·CPU×4 아틀라스 진입·스크롤 롱태스크
const { chromium } = require('playwright');
const port = process.argv[2];
(async () => {
  const br = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const ctx = await br.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  const pg = await ctx.newPage();
  await pg.route('**/*', r => { const u = r.request().url(); if (/html2canvas|liquid-glass|nav-glass/.test(u)) return r.abort(); if (u.startsWith('http://localhost')) return r.continue(); return r.abort(); });
  const cdp = await ctx.newCDPSession(pg); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await pg.addInitScript(() => { window.__lt = []; new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push([e.startTime, e.duration]))).observe({ type: 'longtask', buffered: true }); });
  const t0 = Date.now();
  await pg.goto(`http://localhost:${port}/#atlas`, { waitUntil: 'load', timeout: 180000 });
  const load = Date.now() - t0;
  await pg.waitForTimeout(6000);
  const a = await pg.evaluate(() => { const s = window.__lt.reduce((x, y) => x + y[1], 0); window.__lt = []; return s; });
  const f0 = Date.now(); let frames = 0;
  for (let i = 0; i < 40; i++) { await pg.mouse.wheel(0, 500); await pg.evaluate(() => new Promise(r => requestAnimationFrame(() => r()))); frames++; }
  const dt = (Date.now() - f0) / 1000;
  await pg.waitForTimeout(1500);
  const b = await pg.evaluate(() => window.__lt.reduce((x, y) => x + y[1], 0));
  console.log(JSON.stringify({ port, load, entryLong: Math.round(a), scrollLong: Math.round(b), fps: +(frames / dt).toFixed(1) }));
  await br.close();
})();
