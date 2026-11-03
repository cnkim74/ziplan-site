// dist 확인: 라우트 스윕 + 새 모달 (1440·390)
const { chromium } = require('playwright');
const TLIB = process.env.TLIB || __dirname + '/three.min.js'; // 없으면: npm pack three@0.128.0 → package/build/three.min.js 를 여기로
const port = process.argv[2] || 8862;
const ROUTES = ['home', 'atlas', 'travel', 'dna', 'zipcode', 'room', 'plan3d', 'flow', 'site', 'concept', 'plan', 'model', 'panel', 'cases', 'library', 'portfolio', 'contests', 'plaza', 'studio', 'guide', 'pricing'];
const IDS = (process.argv[3] || 'hwaamsa,nakseonjae,bokmuseum,nabawi,seoulwcs,jongnotower').split(',');
(async () => {
  const br = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  for (const [w, h, mob] of [[1440, 900, false], [390, 844, true]]) {
    const ctx = await br.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob });
    const pg = await ctx.newPage(); const errs = [];
    pg.on('pageerror', e => errs.push(e.message.slice(0, 200)));
    await pg.route('**/*', r => { const u = r.request().url(); if (/three(\.min)?\.js/.test(u)) return r.fulfill({ path: TLIB, contentType: 'text/javascript' }); if (/html2canvas|liquid-glass|nav-glass/.test(u)) return r.abort(); if (u.startsWith('http://localhost')) return r.continue(); return r.abort(); });
    await pg.goto(`http://localhost:${port}/#home`, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await pg.waitForTimeout(3000);
    const rr = [];
    for (const rt of ROUTES) { await pg.evaluate(r => location.hash = r, rt); await pg.waitForTimeout(900); const ov = await pg.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1); rr.push(rt + (ov ? '(넘침)' : '')); }
    const mod = [];
    for (const id of IDS) {
      await pg.evaluate(id => location.hash = 'atlas?b=' + id, id);
      await pg.waitForTimeout(2500);
      await pg.evaluate(() => { const b = document.querySelector('[data-bld3go]'); if (b) b.click(); });
      await pg.waitForTimeout(9000);
      const st = await pg.evaluate(() => { const m = document.querySelector('#dnatM'); const c = m && m.querySelector('#bld3d canvas'); const imgs = [...document.querySelectorAll('#dnatM img')].filter(i => i.complete && i.naturalWidth === 0 && !/wikimedia/.test(i.src)).length; return { open: !!(m && !m.hidden), canvas: !!c, title: document.title.slice(0, 40), broken: imgs, feats: m ? m.querySelectorAll('.bsig li, .bsig-f li').length : 0, sig: !!(m && /실제 치수/.test(m.textContent)) }; });
      try { await pg.screenshot({ path: `/home/claude/work/sw-${w}-${id}.png`, timeout: 60000 }); } catch (e) { st.shot = "timeout"; }
      mod.push(id + ':' + JSON.stringify(st));
      await pg.evaluate(() => window.__atlas && window.__atlas.bldClose()); await pg.waitForTimeout(500);
    }
    // 아틀라스 전시실 타일 수
    await pg.evaluate(() => location.hash = 'atlas'); await pg.waitForTimeout(2500);
    const halls = await pg.evaluate(() => document.querySelector('#view-atlas') ? document.querySelector('#view-atlas').textContent.match(/정교 모형 \d+채/g) : null);
    console.log(w, 'routes', rr.join(' '), '\n', mod.join('\n '), '\n halls', JSON.stringify(halls), '\n errors', JSON.stringify(errs));
    await ctx.close();
  }
  await br.close();
})();
