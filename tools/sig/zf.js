// 겹친 수평 판(z-fighting 후보) 검사: node zf.js <id1,id2> [port]
// 위를 보는 수평 삼각형을 월드 좌표로 모아, 서로 다른 메시(또는 재질)끼리 높이 차 ≤ 1.2 cm에서 XZ가 겹치는 면적(㎡)을 셈
const { chromium } = require('playwright'); const fs=require('fs');
const [, , ids0, port0] = process.argv; const ids=ids0.split(','), port=port0||8861;
const TLIB=process.env.TLIB||__dirname+'/three.min.js';
(async()=>{
  const br=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const pg=await br.newPage({viewport:{width:1200,height:800}});
  pg.on('pageerror',e=>console.log('PE',e.message));
  await pg.route('**/*',r=>{const u=r.request().url(); if(/three(\.min)?\.js/.test(u)) return r.fulfill({path:TLIB,contentType:'text/javascript'}); if(u.startsWith('http://localhost')) return r.continue(); return r.abort();});
  await pg.goto(`http://localhost:${port}/crit.html?lite=1#atlas`,{waitUntil:'domcontentloaded',timeout:120000});
  await pg.waitForFunction(()=>window.__atlas&&window.__atlas.BSIG,null,{timeout:120000});
  await pg.evaluate(()=>window.__atlas.t3Load());
  for(const id of ids){
    await pg.evaluate(id=>window.__atlas.bldOpen(id),id); await pg.waitForTimeout(400);
    await pg.evaluate(()=>{const b=document.querySelector('[data-bld3go]'); if(b) b.click();});
    await pg.waitForFunction(()=>{const R=window.__atlas.PGVR.bld; return R&&R.v&&R.v.ready;},null,{timeout:120000});
    await pg.waitForTimeout(1500);
    const res=await pg.evaluate(()=>{
      const {sc}=window.__atlas.PGVR.bld.v.scene(); const T=window.THREE; const tris=[]; let mi=0;
      const A=new T.Vector3(),B=new T.Vector3(),C=new T.Vector3(),M=new T.Matrix4(),IM=new T.Matrix4();
      sc.updateMatrixWorld(true);
      sc.traverse(o=>{ if(!o.isMesh||!o.visible) return; let vis=true; for(let p=o;p;p=p.parent) if(!p.visible) vis=false; if(!vis) return; const g=o.geometry; if(!g||!g.attributes.position) return; const P=g.attributes.position, I=g.index; const n=I?I.count/3:P.count/3; const cnt=o.isInstancedMesh?o.count:1; if(n*cnt>400000) return; const id=++mi; const mat=Array.isArray(o.material)?o.material[0]:o.material; const chain=[]; for(let p=o.parent;p&&chain.length<3;p=p.parent) chain.push(p.name||p.type[0]); const nm=chain.join('<')+'|'+(mat&&mat.color?mat.color.getHexString():'')+(mat&&mat.transparent?'T':'')+(mat&&mat.polygonOffset?'P'+mat.polygonOffsetUnits:'')+(mat&&mat.map?'m':''); const life=(()=>{for(let p=o;p;p=p.parent) if(p.name==='life'||(p.userData&&p.userData.life)) return 1; return 0;})();
        for(let k=0;k<cnt;k++){ M.copy(o.matrixWorld); if(o.isInstancedMesh){ o.getMatrixAt(k,IM); M.multiply(IM); }
          for(let t=0;t<n;t++){ const a=I?I.getX(t*3):t*3,b=I?I.getX(t*3+1):t*3+1,c=I?I.getX(t*3+2):t*3+2; A.fromBufferAttribute(P,a).applyMatrix4(M); B.fromBufferAttribute(P,b).applyMatrix4(M); C.fromBufferAttribute(P,c).applyMatrix4(M);
            const y0=Math.min(A.y,B.y,C.y), y1=Math.max(A.y,B.y,C.y); if(y1-y0>.01) continue; const area=((B.x-A.x)*(C.z-A.z)-(C.x-A.x)*(B.z-A.z))/2; if(Math.abs(area)<.05) continue; const ny=new T.Vector3().subVectors(B,A).cross(new T.Vector3().subVectors(C,A)).y; if(ny<=0) continue;
            tris.push([id,(A.y+B.y+C.y)/3,Math.min(A.x,B.x,C.x),Math.max(A.x,B.x,C.x),Math.min(A.z,B.z,C.z),Math.max(A.z,B.z,C.z),Math.abs(area),nm,A.x,A.z,B.x,B.z,C.x,C.z]); } } });
      tris.sort((p,q)=>p[1]-q[1]);
      const inTri=(px,pz,t)=>{ const [ax,az,bx,bz,cx,cz]=t.slice(8); const d1=(px-bx)*(az-bz)-(ax-bx)*(pz-bz), d2=(px-cx)*(bz-cz)-(bx-cx)*(pz-cz), d3=(px-ax)*(cz-az)-(cx-ax)*(pz-az); const ng=d1<0||d2<0||d3<0, ps=d1>0||d2>0||d3>0; return !(ng&&ps); };
      const out={}; let tot=0; const W=.012;
      for(let i=0;i<tris.length;i++){ const a=tris[i]; for(let j=i+1;j<tris.length&&tris[j][1]-a[1]<=W;j++){ const b=tris[j]; if(b[0]===a[0]) continue; if(b[1]-a[1]<1e-5&&b[7]===a[7]) continue; const ox=Math.min(a[3],b[3])-Math.max(a[2],b[2]), oz=Math.min(a[5],b[5])-Math.max(a[4],b[4]); if(ox<=0||oz<=0) continue;
        // 겹친 사각형 안 표본점 9개로 실제 삼각형 겹침 비율
        let hit=0; for(let u=0;u<3;u++) for(let v=0;v<3;v++){ const px=Math.max(a[2],b[2])+ox*(u+.5)/3, pz=Math.max(a[4],b[4])+oz*(v+.5)/3; if(inTri(px,pz,a)&&inTri(px,pz,b)) hit++; } if(!hit) continue; const ar=ox*oz*hit/9; tot+=ar; const key=a[7]+' / '+b[7]+' @'+a[1].toFixed(2); out[key]=(out[key]||0)+ar; } }
      const top=Object.entries(out).sort((p,q)=>q[1]-p[1]).slice(0,8).map(([k,v])=>k+' : '+v.toFixed(1)); return {tris:tris.length,tot:Math.round(tot),top}; });
    console.log(id,JSON.stringify(res));
    await pg.evaluate(()=>window.__atlas.bldClose()); await pg.waitForTimeout(300);
  }
  await br.close();
})();
