// 정교 모형 렌더 하네스 (K5)
// node t.js <patch.js|none> <id1,id2> <views: thumb,eye,front,aerial,def> <outprefix> [port]
// 패치 파일: `const BSIG_PATCH={ id:{dims,desc,feats,see,plan,sec,build(K){...},eye?,thumb?}, ... };`
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [, , patch, ids0, views0, prefix0, port0] = process.argv;
const ids = ids0.split(','), views = (views0 || 'thumb,eye,aerial').split(','), prefix = prefix0 || 'out/', port = port0 || 8861;
const TLIB = process.env.TLIB || __dirname + '/three.min.js'; // 없으면: npm pack three@0.128.0 → package/build/three.min.js 를 여기로
(async () => {
  fs.mkdirSync(path.dirname(prefix + 'x'), { recursive: true });
  const br = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const pg = await br.newPage({ viewport: { width: 1200, height: 800 } });
  const errs = [];
  pg.on('pageerror', e => errs.push('PE ' + e.message));
  pg.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|net::/.test(m.text())) errs.push('CE ' + m.text().slice(0, 300)); });
  await pg.route('**/*', r => {
    const u = r.request().url();
    if (/three(\.min)?\.js/.test(u)) return r.fulfill({ path: TLIB, contentType: 'text/javascript' });
    if (u.startsWith('http://localhost')) return r.continue();
    return r.abort();
  });
  await pg.goto(`http://localhost:${port}/crit.html?lite=1#atlas`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await pg.waitForFunction(() => window.__atlas && window.__atlas.BSIG, null, { timeout: 120000 });
  if (patch && patch !== 'none') {
    const src = fs.readFileSync(patch, 'utf8');
    await pg.evaluate(s => { const f = new Function(s + '\n;return BSIG_PATCH;'); const P = f(); Object.assign(window.__atlas.BSIG, P); for (const k in P) window.__atlas.BSIG_SITE[k] = window.__atlas.BSIG_SITE[k] || 'town'; window.__patchIds = Object.keys(P); }, src);
  }
  await pg.evaluate(() => window.__atlas.t3Load());
  const res = {};
  for (const id of ids) {
    const r = res[id] = { err: [] };
    try {
      if (views.includes('thumb')) {
        const url = await pg.evaluate(async id => { const A = window.__atlas; const b = A.BLD_BY[id]; const P = A.bldSpec(b); P.tag = P.tag + ':' + Date.now(); const t0 = performance.now(); const u = await A.pgThumb(P, 1440, 960); return [u, performance.now() - t0]; }, id);
        fs.writeFileSync(prefix + id + '-thumb.' + (url[0].startsWith('data:image/webp') ? 'webp' : (url[0].startsWith('data:image/png') ? 'png' : 'jpg')), Buffer.from(url[0].split(',')[1], 'base64'));
        r.thumbMs = Math.round(url[1]);
      }
      const vv = views.filter(v => v !== 'thumb');
      if (vv.length) {
        await pg.evaluate(id => window.__atlas.bldOpen(id), id);
        await pg.waitForTimeout(400);
        await pg.evaluate(() => { const b = document.querySelector('[data-bld3go]'); if (b) b.click(); const f = document.querySelector('[data-bld3full]'); if (f) f.click(); });
        await pg.waitForFunction(() => { const R = window.__atlas.PGVR.bld; return R && R.v && R.v.ready; }, null, { timeout: 90000 }).catch(() => r.err.push('viewer not ready'));
        await pg.waitForTimeout(2500);
        r.info = await pg.evaluate(() => { const R = window.__atlas.PGVR.bld; let tris = 0, meshes = 0; try { const sc = R.v.scene || null; } catch (e) { } return { ok: !!R }; });
        for (const v of vv.filter(v => v.startsWith('jit'))) {
          const base = v.slice(3) || 'eye';
          await pg.evaluate(v => window.__atlas.PGVR.bld.v.view(v), base); await pg.waitForTimeout(2600);
          const pair = await pg.evaluate(() => { const V = window.__atlas.PGVR.bld.v; const a = V.png(); V.nudge(0.00005); const b = V.png(); return [a, b]; });
          const fa = prefix + id + '-' + v + '-a.png', fb = prefix + id + '-' + v + '-b.png';
          fs.writeFileSync(fa, Buffer.from(pair[0].split(',')[1], 'base64')); fs.writeFileSync(fb, Buffer.from(pair[1].split(',')[1], 'base64'));
          const out = require('child_process').spawnSync('python3', [__dirname + '/jit.py', fa, fb, prefix + id + '-' + v + '-diff.png']).stdout.toString().trim();
          r[v] = out;
        }
        for (const v of vv.filter(v => !v.startsWith('jit'))) {
          await pg.evaluate(v => { const R = window.__atlas.PGVR.bld; R.v.view(v === 'def' ? 'default' : v); }, v);
          await pg.waitForTimeout(2600);
          const el = await pg.$('#bld3d');
          await (el || pg).screenshot({ path: prefix + id + '-' + v + '.png' });
        }
        await pg.evaluate(() => window.__atlas.bldClose());
        await pg.waitForTimeout(300);
      }
    } catch (e) { r.err.push(String(e.message || e).slice(0, 300)); }
    r.err.push(...errs.splice(0));
    console.log(id, JSON.stringify(r));
  }
  await br.close();
})();
