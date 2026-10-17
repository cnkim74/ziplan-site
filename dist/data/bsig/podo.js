__bsigFill({"podo":function(K){
// 출처: 객실 26실(디럭스 양식 10·한식 10, 로얄 스위트 양식 2·한식 3, 프레지덴셜 1), 양식 객실은 단층, 제주의 오름과 초가집 모티브, 위에서 보면 한 송이 포도 — ktriptips.com/kor/stay/1894943 · 2001 준공, 이타미 준(유동룡)
// 추정 치수: 지붕 20개(객실 26실이 지붕 하나에 1~2실), 객실 지붕 평면 10~12 m·용마루 높이 약 5.3 m·처마 3.0 m, 마당 복도 폭 3.4 m(유리 지붕), 로비·식당동 16 m, 온천동 14 m, 중정 수공간 12×8 m, 전체 길이 약 110 m, 벽은 현무암(검은 돌)과 나무
    const T=K.T; const ST=K.col(0x4a4541,{roughness:1}), ST2=K.col(0x55504c,{roughness:1}), WD=K.col(0x9c7a56,{roughness:.85}), WD2=K.col(0x5a3f2a,{roughness:.85}), GL=K.M.glassW, GLc=K.M.glass, GS=K.M.grass, PV=K.M.gravel, DKz=K.col(0x2e3134,{metalness:.4,roughness:.6}), WT=K.M.water, LF=K.M.leaf3, LF2=K.M.leaf1, TR=K.M.trunk, PD=K.col(0x3e4a44,{roughness:1}), STl=K.col(0x8a857c,{roughness:1});
    // 지붕 텍스처: 밝은 회색 바탕 + 방사형 이음선(폴라 UV라 u 방향 선이 중심에서 퍼짐)
    const cv=document.createElement('canvas'); cv.width=256; cv.height=64; const c2=cv.getContext('2d'); c2.fillStyle='#8c8885'; c2.fillRect(0,0,256,64); for(let k=0;k<8;k++){ c2.fillStyle='rgba(255,255,255,.22)'; c2.fillRect(k*32,0,2,64); c2.fillStyle='rgba(0,0,0,.3)'; c2.fillRect(k*32+2,0,2,64); } const tex=new T.CanvasTexture(cv); tex.encoding=T.sRGBEncoding; tex.wrapS=tex.wrapT=T.RepeatWrapping;
    const ZN=new T.MeshStandardMaterial({color:0xd6d0c9,map:tex,metalness:.35,roughness:.55,side:T.DoubleSide}); ZN.color.convertSRGBToLinear(); const ZN2=new T.MeshStandardMaterial({color:0xc4beb7,map:tex,metalness:.35,roughness:.58,side:T.DoubleSide}); ZN2.color.convertSRGBToLinear(); const ZNu=K.col(0x3a3b3e,{roughness:.8});
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const inst=(geo,mat,items,cast)=>{ if(!items.length) return null; const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),E=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); E.set(0,it[3]||0,0); Q.setFromEuler(E); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; return put(m,cast); };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    const bx=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const merge=(geos,mat,cast)=>{ if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); return put(new T.Mesh(g,mat),cast); };
    let seed=9; const rnd=()=>{ seed=(seed*9301+49297)%233280; return seed/233280; };
    const NS=3.6; const SE=(a,b,th)=>{ const c=Math.cos(th), s=Math.sin(th); return [a*Math.sign(c)*Math.pow(Math.abs(c),2/NS), b*Math.sign(s)*Math.pow(Math.abs(s),2/NS)]; };
    // 오름 지붕: 초타원 평면 × 부드러운 능선(cos 프로파일) — 방사형 이음선 텍스처, 처마 밑면 띠
    const oreum=(cx,cz,w,d,ey,h,mat)=>{ const a=w/2,b=d/2; const yf=t=>ey+h*Math.pow(Math.cos(t*Math.PI/2),.95);
      K.surf((u,v)=>{ const [rx,rz]=SE(a,b,u*Math.PI*2); return [cx+rx*v,yf(v),cz+rz*v,u*5,v*2.4]; },40,11,mat);
      K.surf((u,v)=>{ const [rx,rz]=SE(a,b,u*Math.PI*2); const t=.8+.2*v; return [cx+rx*t,yf(t)-.28,cz+rz*t]; },40,2,ZNu); };
    // 객실 몸체: 현무암 벽(초타원 압출, 지붕보다 1 m 작게) + 바깥쪽 창 띠 + 나무 창틀
    const body=(cx,cz,w,d,out)=>{ const a=w/2-1,b=d/2-1; const pts=[]; for(let i=0;i<28;i++){ const [x,z]=SE(a,b,i/28*Math.PI*2); pts.push([cx+x,cz+z]); } K.ex(pts,1.5,ST,[0,.2,0]); K.ex(pts,1.4,WD,[0,1.7,0]);
      if(out){ const zz=cz+out*(b-.06); K.b(cx,1.0,zz,a*1.1,1.5,.3,GL); K.b(cx,.86,zz,a*1.1+.3,.14,.36,WD2); K.b(cx,2.5,zz,a*1.1+.3,.14,.36,WD2); } };
    K.layer(0);
    K.b(0,-.3,0,150,.33,92,GS); K.b(4,.02,0,112,.06,44,PV); // 잔디 · 자갈 마당
    // 지붕/객실 배치: [x, z, w, d, 창 방향(복도 반대쪽)]
    const S=[[-34,-8.5,11,12,-1],[-23,-8.5,11,12,-1],[-12,-8.5,12,12,-1],[-1,-8.5,11,12,-1],[10,-8.5,12,12,-1],[21,-8.5,11,12,-1],[32,-8.5,11,12,-1]];
    const N1=[[-29,8.5,11,12,1],[-18,8.5,12,12,1],[-7,8.5,11,12,1],[4,8.5,12,12,1],[15,8.5,11,12,1],[26,8.5,12,12,1],[37,8.5,11,12,1]];
    const N2=[[-24,20,12,12,1],[-13,20,11,12,1],[19,20,11,12,1],[30,20,12,12,1]];
    const rooms=S.concat(N1,N2); rooms.forEach((r,i)=>{ r[1]+=((i*7)%5-2)*.5; r[2]+=((i*3)%3-1)*.5; r[3]+=((i*5)%3-1)*.5; }); // 포도알처럼 조금씩 어긋나게
    K.layer(1);
    rooms.forEach(r=>body(r[0],r[1],r[2],r[3],r[4]));
    inst(boxG(2.2,2.8,2.6),ST2,rooms.filter(r=>Math.abs(r[1])<10).map(r=>[r[0],.2,r[1]-r[4]*(r[3]/2+.2)])); // 복도↔객실 목
    inst(boxG(2.2,2.8,2.0),ST2,N2.map(r=>[r[0],.2,14.3]));
    // 마당 복도(긴 돌 벽 + 유리 지붕) · 중정을 감싸는 가지 복도 · 로비동 · 온천동
    K.b(0,.2,0,90,3.0,3.4,ST2); K.b(0,3.0,0,90.6,.2,4.2,DKz); K.b(0,3.2,0,90.4,.3,4.0,GLc);
    for(const [x,z,w,d] of [[-7.5,15,3.0,24],[14.5,15,3.0,24],[3.5,26,25,3.0]]){ K.b(x,.2,z,w,3.0,d,ST2); K.b(x,3.0,z,w+.6,.2,d+.6,DKz); K.b(x,3.2,z,w+.4,.3,d+.4,GLc); }
    { const pts=[]; for(let i=0;i<32;i++){ const [x,z]=SE(7,7,i/32*Math.PI*2); pts.push([49+x,z]); } K.ex(pts,3.6,ST,[0,.2,0]); K.b(49,1.0,6.9,7,2.0,.3,GL); K.b(49,1.0,-6.9,7,2.0,.3,GL); K.b(57,1.0,0,.3,2.0,8,GL); }
    { const pts=[]; for(let i=0;i<32;i++){ const [x,z]=SE(6.3,6.3,i/32*Math.PI*2); pts.push([-48+x,2+z]); } K.ex(pts,3.3,ST,[0,.2,0]); K.b(-54.2,1.0,2,.3,1.8,7,GL); }
    // 현관(포르트코셰르): 긴 수평 캐노피 + 기둥, 자갈 진입로
    K.b(66,0,0,26,.08,12,PV); inst(new T.CylinderGeometry(.12,.12,3.5,8).translate(0,1.75,0),DKz,[[60,0,-3.6],[60,0,3.6],[67.5,0,-3.6],[67.5,0,3.6]]);
    // 중정 수공간(가지 복도와 객실에 둘러싸임)
    K.b(3.5,.1,17,15,.12,11,STl); K.b(3.5,.12,17,13,.08,9,PD); K.water(3.5,.22,17,12.4,8.4); K.c(10.2,.2,13.2,.18,3.6,TR,6); { const s=new T.Mesh(new T.SphereGeometry(2.1,9,7),LF2); s.position.set(10.2,3.9,13.2); put(s); }
    // 지붕(층 2: 펼치면 평면이 드러남)
    K.layer(2);
    rooms.forEach((r,i)=>oreum(r[0],r[1],r[2]+.4,r[3]+.4,3.05,2.2+(i%3)*.15,i%2?ZN:ZN2));
    oreum(49,0,17,17,3.75,2.9,ZN); oreum(-48,2,15,15,3.45,2.6,ZN2); oreum(63.5,0,11,9.5,3.5,1.3,ZN2); // 현관 지붕도 작은 오름
    // 나무·덤불(제주 곰솔·동백)
    for(const [x,z,h] of [[-62,-20,6],[-58,22,5],[62,-18,6],[72,16,5],[-20,-28,5],[28,-30,6],[-44,30,5],[46,34,6],[8,-27,5]]) K.tree(x,z,h);
    { const gs=[]; for(let i=0;i<22;i++){ const px=-52+rnd()*120, pz=(rnd()<.5?-1:1)*(23+rnd()*8); if(Math.abs(px-66)<14&&Math.abs(pz)<9) continue; const rr=.7+rnd()*.7; const g=new T.SphereGeometry(rr,7,5); g.scale(1.3,.8,1.2); g.translate(px,rr*.6,pz); gs.push(g); } merge(gs,LF); }
  }});
