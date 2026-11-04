// 디버그: 모형을 열고 큰 메시(폭 ≥ minW m) 목록 — node dbg.js <id> [minW]
const { chromium } = require('playwright');
const [, , id, mw0] = process.argv; const mw=+(mw0||150);
(async()=>{ const br=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']}); const pg=await br.newPage({viewport:{width:1200,height:800}});
  pg.on('pageerror',e=>console.log('PE',e.message)); pg.on('console',m=>{ if(m.type()==='error') console.log('CE',m.text().slice(0,200)); });
  await pg.route('**/*',r=>{const u=r.request().url(); if(/three(\.min)?\.js/.test(u)) return r.fulfill({path:__dirname+'/three.min.js',contentType:'text/javascript'}); if(u.startsWith('http://localhost')) return r.continue(); return r.abort();});
  await pg.goto('http://localhost:8861/crit.html?lite=1#atlas',{waitUntil:'domcontentloaded',timeout:120000}); await pg.waitForFunction(()=>window.__atlas&&window.__atlas.BSIG,null,{timeout:120000}); await pg.evaluate(()=>window.__atlas.t3Load());
  await pg.evaluate(id=>window.__atlas.bldOpen(id),id); await pg.waitForTimeout(400); await pg.evaluate(()=>{const b=document.querySelector('[data-bld3go]'); if(b) b.click();});
  await pg.waitForFunction(()=>{const R=window.__atlas.PGVR.bld; return R&&R.v&&R.v.ready;},null,{timeout:120000}); await pg.waitForTimeout(1500);
  const out=await pg.evaluate(mw=>{ const {sc}=window.__atlas.PGVR.bld.v.scene(); const T=window.THREE; const L=[]; sc.updateMatrixWorld(true); sc.traverse(o=>{ if(!o.isMesh) return; const bb=new T.Box3().setFromObject(o); const w=bb.max.x-bb.min.x, d=bb.max.z-bb.min.z; if(Math.max(w,d)<mw) return; let vis=true; for(let p=o;p;p=p.parent) if(!p.visible) vis=false; const m=Array.isArray(o.material)?o.material[0]:o.material; const ch=[]; for(let p=o.parent;p&&ch.length<4;p=p.parent) ch.push(p.name||p.type); L.push([vis?'V':'h',ch.join('<'),m.color?m.color.getHexString():'',m.vertexColors?'vc':'',m.transparent?'T':'',bb.min.x.toFixed(0),bb.max.x.toFixed(0),bb.min.y.toFixed(2),bb.max.y.toFixed(2),bb.min.z.toFixed(0),bb.max.z.toFixed(0)].join(' ')); }); return L; },mw);
  console.log(out.join('\n')); await br.close(); })();
