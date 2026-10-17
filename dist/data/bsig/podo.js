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
    K.b(4,.02,0,112,.06,44,PV); // 잔디 · 자갈 마당
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
    K.b(0,.2,0,90,2.78,3.4,ST2); K.b(0,3.0,0,90.6,.2,4.2,DKz); K.b(0,3.2,0,90.4,.3,4.0,GLc);
    for(const [x,z,w,d] of [[-7.5,15,3.0,24],[14.5,15,3.0,24],[3.5,26,25,3.0]]){ K.b(x,.2,z,w,2.78,d,ST2); K.b(x,3.0,z,w+.6,.2,d+.6,DKz); K.b(x,3.2,z,w+.4,.3,d+.4,GLc); }
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
    
    { const gs=[]; for(let i=0;i<22;i++){ const px=-52+rnd()*120, pz=(rnd()<.5?-1:1)*(23+rnd()*8); if(Math.abs(px-66)<14&&Math.abs(pz)<9) continue; const rr=.7+rnd()*.7; const g=new T.SphereGeometry(rr,7,5); g.scale(1.3,.8,1.2); g.translate(px,rr*.6,pz); gs.push(g); } merge(gs,LF); }
    // ---- s5 주변 환경(v15 E): 지형·숲·물·이웃 — 뷰어 기본 대지·소품 숨김 ----
    {
    // ---- 배경·바닥(v15): 캔버스 질감 · 높이장 지형(K.life — bbox 밖) · 인스턴스 숲 · 뷰어 기본 바닥 숨김 ----
        const E=(()=>{ const TT=K.T; let sd=131; const r=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
        const C=(typeof window!=='undefined')?(window.__kTex15||(window.__kTex15={})):{};
        const tex=(key,px,draw)=>{ if(C[key]) return C[key]; if(typeof document==='undefined') return null; const cv=document.createElement('canvas'); cv.width=cv.height=px; const g=cv.getContext('2d'); let s=31; const rr=()=>{ s=(s*16807)%2147483647; return s/2147483647; }; draw(g,px,rr); const t=new TT.CanvasTexture(cv); t.wrapS=t.wrapT=TT.RepeatWrapping; t.encoding=TT.sRGBEncoding; t.anisotropy=8; return C[key]=t; };
        // 막돌·다듬돌 석축(2 m 한 장) — 돌 크기·색이 제각각, 줄눈 어둡게
        const wallTex=(key,base,tones,rowH,wMin,wMax)=>tex(key,512,(g,N,rr)=>{ g.fillStyle=base; g.fillRect(0,0,N,N); let y=0; while(y<N){ let h=Math.round(rowH*(.7+rr()*.6)); if(N-y<rowH*.6) h=N-y; let x=-rr()*wMax; while(x<N){ const w=wMin+rr()*(wMax-wMin); const j=()=>(rr()-.5)*12; g.fillStyle=tones[Math.floor(rr()*tones.length)]; for(const ox of [0,-N,N]){ g.beginPath(); g.moveTo(ox+x+4+j(),y+3+j()); g.lineTo(ox+x+w*.5+j(),y+2+j()); g.lineTo(ox+x+w-4+j(),y+4+j()); g.lineTo(ox+x+w-3+j(),y+h*.5+j()); g.lineTo(ox+x+w-4+j(),y+h-3+j()); g.lineTo(ox+x+w*.45+j(),y+h-2+j()); g.lineTo(ox+x+3+j(),y+h-4+j()); g.lineTo(ox+x+2+j(),y+h*.5+j()); g.closePath(); g.fill(); g.fillStyle='rgba(255,255,255,.07)'; g.fillRect(ox+x+6,y+5,w-14,3); } x+=w; } y+=h; } for(let i=0;i<5000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.09)':'rgba(30,28,24,.12)'; g.fillRect(rr()*N,rr()*N,1.6,1.6); } for(let i=0;i<40;i++){ g.fillStyle='rgba(70,90,50,.10)'; g.beginPath(); g.arc(rr()*N,rr()*N,6+rr()*18,0,7); g.fill(); } });
        const masTex=()=>tex('mas15',512,(g,N,rr)=>{ g.fillStyle='#cdbf9e'; g.fillRect(0,0,N,N); const cs=['#bfae88','#dacfb4','#ae9d77','#9c8d6f','#c8b997']; for(let i=0;i<7000;i++){ g.fillStyle=cs[Math.floor(rr()*cs.length)]; const z=rr()<.85?1.2:2.4; g.fillRect(rr()*N,rr()*N,z,z); } });
        const tmat=(t,hex,o)=>{ const oo=Object.assign({},o||{}); delete oo.tint; const m=new TT.MeshStandardMaterial(Object.assign({color:t?0xffffff:hex,map:t||null,roughness:.95},oo)); m.color.convertSRGBToLinear(); if(t&&o&&o.tint) m.color.setHex(o.tint).convertSRGBToLinear(); return m; };
        const axis=(R,n,k,c)=>{ const L=[]; for(let i=0;i<=n;i++){ const t=-1+2*i/n; L.push((c||0)+R*Math.sinh(k*t)/Math.sinh(k)); } return L; };
        const terrain=(x0,x1,z0,z1,nx,nz,hf,cf,hole)=>{
          const ax=(a0,a1,n,e)=>{ const L=[]; for(let i=0;i<=n;i++) L.push(a0+(a1-a0)*i/n); if(e) e.forEach(v=>{ if(v>a0&&v<a1) L.push(v); }); L.sort((a,b)=>a-b); return L.filter((v,i)=>i===0||v-L[i-1]>.01); };
          const XS=Array.isArray(nx)?nx:ax(x0,x1,nx,hole&&[hole[0],hole[1]]), ZS=Array.isArray(nz)?nz:ax(z0,z1,nz,hole&&[hole[2],hole[3]]); const W=XS.length, H=ZS.length, n=W*H; const Y=new Float32Array(n), P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3);
          for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, x=XS[i], z=ZS[j]; Y[k]=hf(x,z); P[k*3]=x; P[k*3+1]=Y[k]; P[k*3+2]=z; }
          const lc=v=>v<.04045?v*.0773993808:Math.pow(v*.9478672986+.0521327014,2.4);
          for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, i0=Math.max(0,i-1), i1=Math.min(W-1,i+1), j0=Math.max(0,j-1), j1=Math.min(H-1,j+1); const hx=(Y[j*W+i1]-Y[j*W+i0])/(XS[i1]-XS[i0]), hz=(Y[j1*W+i]-Y[j0*W+i])/(ZS[j1]-ZS[j0]); const L=Math.sqrt(hx*hx+1+hz*hz); N[k*3]=-hx/L; N[k*3+1]=1/L; N[k*3+2]=-hz/L; const v=cf(P[k*3],P[k*3+2],Y[k],1/L); Cc[k*3]=lc(v[0]); Cc[k*3+1]=lc(v[1]); Cc[k*3+2]=lc(v[2]); }
          const I=[]; for(let j=0;j<H-1;j++) for(let i=0;i<W-1;i++){ if(hole){ const cx=(XS[i]+XS[i+1])/2, cz=(ZS[j]+ZS[j+1])/2; if(cx>hole[0]&&cx<hole[1]&&cz>hole[2]&&cz<hole[3]) continue; } const a=j*W+i, b=a+1, c=a+W, d=c+1; I.push(a,c,b,b,c,d); }
          const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(Cc,3)); g.setIndex(new TT.BufferAttribute(new Uint32Array(I),1)); g.computeBoundingSphere();
          const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:1})); m.receiveShadow=true; m.castShadow=false; K.life.add(m);
          const bs=(A,v)=>{ let lo=0, hi=A.length-2; if(v<=A[0]) return 0; if(v>=A[hi+1]) return hi; while(lo<hi){ const md=(lo+hi+1)>>1; if(A[md]<=v) lo=md; else hi=md-1; } return lo; };
          m.h=(x,z)=>{ const i=bs(XS,x), j=bs(ZS,z); const u=Math.min(1,Math.max(0,(x-XS[i])/(XS[i+1]-XS[i]))), v=Math.min(1,Math.max(0,(z-ZS[j])/(ZS[j+1]-ZS[j]))); const a=Y[j*W+i], b=Y[j*W+i+1], c=Y[(j+1)*W+i], d=Y[(j+1)*W+i+1]; return (a*(1-u)+b*u)*(1-v)+(c*(1-u)+d*u)*v; }; return m; };
        const mergeG=gs=>{ const G=gs.map(g=>g.index?g.toNonIndexed():g); let n=0; for(const g of G) n+=g.attributes.position.count; const P=new Float32Array(n*3), N=new Float32Array(n*3); let o=0; for(const g of G){ P.set(g.attributes.position.array,o*3); N.set(g.attributes.normal.array,o*3); o+=g.attributes.position.count; } const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); return g; };
        const crownG=[ (()=>{ const a=new TT.IcosahedronGeometry(.5,1); a.scale(1,.78,1); a.translate(0,.62,0); const b=new TT.IcosahedronGeometry(.3,0); b.translate(.22,.78,.1); return mergeG([a,b]); })(),
          (()=>{ const a=new TT.IcosahedronGeometry(.5,0); a.scale(1.15,.42,1.0); a.translate(0,.82,0); const b=new TT.IcosahedronGeometry(.32,0); b.scale(1.1,.45,1); b.translate(-.25,.66,.12); return mergeG([a,b]); })(),
          (()=>{ const a=new TT.ConeGeometry(.36,.62,7); a.translate(0,.55,0); const b=new TT.ConeGeometry(.26,.45,7); b.translate(0,.85,0); return mergeG([a,b]); })(),
          (()=>{ const a=new TT.CylinderGeometry(.05,.05,1,5); a.translate(0,.5,0); const b=new TT.ConeGeometry(.16,.5,5); b.translate(0,.95,0); return mergeG([a,b]); })() ];
        const trunkG=(()=>{ const g=new TT.CylinderGeometry(.03,.05,.6,5); g.translate(0,.3,0); return g; })();
        const LEAF=[['#46663a','#567a43','#3a5833','#62824a','#4d6e3e'],['#34502f','#3f5d36','#2e482b','#4a6739'],['#2a432b','#344f33','#243a25'],['#6f8f45','#7c9a4c','#5f8040','#86a356']];
        // items [x,y,z,h,kind(0 활엽·1 소나무·2 침엽·3 대나무), tone, 폭배율]
        const forest=(items,o)=>{ o=o||{}; const byK=[[],[],[],[]]; items.forEach(it=>byK[it[4]||0].push(it)); const M4=new TT.Matrix4(), Qt=new TT.Quaternion(), V=new TT.Vector3(), Sc=new TT.Vector3(), Eu=new TT.Euler(), c=new TT.Color(); const out=[];
          byK.forEach((L,k)=>{ if(!L.length) return; const cm=new TT.MeshStandardMaterial({color:0xffffff,roughness:.92,flatShading:true}); const im=new TT.InstancedMesh(crownG[k],cm,L.length); const tm=(o.trunks!==false&&k!==3)?new TT.InstancedMesh(trunkG,K.M.trunk,L.length):null;
            L.forEach((it,i)=>{ const h=it[3], w=h*(it[6]||1)*(k===3?.35:1); Eu.set(k===3?(((it[0]*3.1)%1)-.5)*.12:0,(it[0]*13.1+it[2]*7.7)%6.28,0); Qt.setFromEuler(Eu); V.set(it[0],it[1],it[2]); Sc.set(w,h,w); M4.compose(V,Qt,Sc); im.setMatrixAt(i,M4); if(tm) tm.setMatrixAt(i,M4); const P=(o.pal&&o.pal[k])||LEAF[k]; const t=it[5]===undefined?((it[0]*.37+it[2]*.61)%1+1)%1:it[5]; c.set(P[Math.floor(t*P.length)%P.length]).convertSRGBToLinear(); im.setColorAt(i,c); });
            im.instanceMatrix.needsUpdate=true; if(im.instanceColor) im.instanceColor.needsUpdate=true; im.castShadow=!!o.cast; im.receiveShadow=true; (o.grp||K.life).add(im); out.push(im); if(tm){ tm.instanceMatrix.needsUpdate=true; tm.castShadow=!!o.cast; (o.grp||K.life).add(tm); } }); return out; };
        const scatter=(x0,x1,z0,z1,sp,hf,ok,hs,kind)=>{ const L=[]; for(let z=z0;z<z1;z+=sp) for(let x=x0;x<x1;x+=sp){ const xx=x+(r()-.5)*sp*.9, zz=z+(r()-.5)*sp*.9; const h=hf(xx,zz); if(ok&&!ok(xx,zz,h)) continue; const s=hs?hs(xx,zz,h):sp*1.2; const kd=typeof kind==='function'?kind(xx,zz,h):(kind===undefined?(r()<.45?1:0):kind); L.push([xx,h-s*.08,zz,s*(.8+r()*.45),kd,r(),.85+r()*.4]); } return L; };
        const hsh=(x,z)=>{ let n=Math.imul(x|0,374761393)+Math.imul(z|0,668265263)|0; n=Math.imul(n^(n>>>13),1274126177); return ((n^(n>>>16))>>>0)/4294967296; };
        const vn=(x,z)=>{ const xi=Math.floor(x), zi=Math.floor(z), xf=x-xi, zf=z-zi; const u=xf*xf*(3-2*xf), v=zf*zf*(3-2*zf); const a=hsh(xi,zi), b=hsh(xi+1,zi), c=hsh(xi,zi+1), d=hsh(xi+1,zi+1); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; };
        const fbm=(x,z,o)=>{ let s=0, a=.5, f=1; for(let i=0;i<(o||4);i++){ s+=a*vn(x*f,z*f); a*=.5; f*=2.03; } return s; };
        const ridged=(x,z)=>{ let s=0,a=.5,f=1; for(let i=0;i<3;i++){ s+=a*(1-Math.abs(vn(x*f,z*f)*2-1)); a*=.5; f*=2.1; } return s; };
        const ss=t=>{ t=Math.min(1,Math.max(0,t)); return t*t*(3-2*t); };
        const peaks=(x,z,pk)=>{ let h=0; for(let i=0;i<pk.length;i++){ const q=pk[i]; const ax=(x-q[0])/q[2], az=(z-q[1])/q[3]; const d2=ax*ax+az*az; if(d2<1){ const d=Math.sqrt(d2); const e=1-ss(d); h=Math.max(h,q[4]*Math.pow(e,q[5]||1.3))+q[4]*.04*(1-d)*(1-d); } } return h; };
        // 산색: 숲 녹색 변주 + 급경사 바위 + 거리에 따라 푸른 대기색(겹겹 능선)
        const mcol=(x,z,h,ny,o)=>{ o=o||{}; const n=fbm(x*.02,z*.02,2), m=vn(x*.006+5,z*.006); let c=[.2+.07*n,.29+.08*n,.16+.05*n]; if(m>.6) c=[c[0]*.85+.05,c[1]*.9+.04,c[2]*.85]; const rock=(o.cliff||0)*ss((.62-ny)/.14); if(rock>0){ const rc=[.55+.08*n,.53+.07*n,.49+.06*n]; c=c.map((v,i)=>v+(rc[i]-v)*Math.min(1,rock)); } if(o.far){ const d=Math.hypot(x-(o.cx||0),z-(o.cz||0)); const f=ss((d-o.far)/(o.farW||700))*.62; const bc=o.haze||[.62,.69,.76]; c=c.map((v,i)=>v+(bc[i]-v)*f); } return c; };
        // 뷰어 기본 대지(잔디판·길)를 이 모형이 떠 있는 동안만 숨김(다른 모형으로 바뀌면 원상)
        const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
          const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
        // 물(계곡·강): 반사·투명 — 지형 위 평면 또는 폴리곤
        const WATER=new TT.MeshStandardMaterial({color:0x4f7d8c,roughness:.05,metalness:.02,transparent:true,opacity:.86}); WATER.color.convertSRGBToLinear();
        return {axis,r,tex,wallTex,masTex,tmat,terrain,forest,scatter,fbm,ridged,vn,ss,peaks,mcol,own,WATER,mergeG}; })();
      // 렌더러가 build 뒤에 K.life에 더하는 기본 소품(벤치·화분·볼라드·일반 나무, keep=0이면 사람까지)을 숨김 — 이 모형의 맥락은 직접 지음
      const tidy=keep=>{ const L=K.life, add0=L.add; L.add=function(...a){ a.forEach(o=>{ if(keep&&o.isMesh&&!o.isInstancedMesh&&o.material===K.M.people) return; o.visible=false; }); return add0.apply(this,a); }; };

// SITE=town
      // 맥락: 제주 서귀포 안덕 중산간(핀크스 골프장 안) — 골프 코스 잔디·벙커, 현무암 밭담·돌담, 곰솔·삼나무 방풍림, 억새 들, 둘레의 오름들, 북동쪽 멀리 한라산(해발 1,947 m — 거리를 줄여 실루엣만). 배치·거리 추정
      E.own(); const T3=K.T;
      const OR=[[-620,-520,170,30,70],[760,-380,210,40,85],[-980,420,240,45,95],[300,-1100,190,35,75],[1300,700,260,50,110],[-300,1250,200,35,60]]; // 오름: x,z,반지름,분화구 반지름,높이
      const hf=(x,z)=>{ let h=(E.fbm(x*.004,z*.004,3)-.5)*14+(-x*.012+z*.016)*-.6; // 한라산 쪽(북동, +x −z)으로 완만히 오름
        for(const [ox,oz,R,cr,H] of OR){ const d=Math.hypot(x-ox,z-oz); if(d<R){ let t=Math.pow(Math.cos(d/R*Math.PI/2),1.3)*H; if(d<cr) t-=(1-d/cr)*H*.3; h+=t; } }
        h+=E.peaks(x,z,[[2400,-2700,1600,1400,520,1.5]]); const r=Math.hypot(x*.7,z); h*=E.ss((r-70)/160); return h-.06; };
      const fair=(x,z)=>{ const a=Math.sin(x*.006+z*.002)*80; return Math.abs(z-a+120)<38||Math.abs(x-a*.5-220)<34||Math.abs(z+a*.4-260)<36; };
      const TR=E.terrain(0,0,0,0,E.axis(3200,170,4.2,0),E.axis(3200,170,4.2,0),hf,(x,z,h,ny)=>{ const n=E.fbm(x*.05,z*.05,2)*.05; const r=Math.hypot(x*.7,z);
        if(r<64) return [.42+n,.55+n,.30+n]; // 호텔 둘레 잔디
        if(fair(x,z)&&r<900){ if(E.vn(x*.05,z*.05)>.82) return [.86,.80,.62]; return [.44+n,.62+n,.31+n]; } // 페어웨이·벙커
        if(h>380) return E.mcol(x,z,h,ny,{far:2000,farW:1600,cliff:.3}); // 한라산 사면
        if(E.vn(x*.012+9,z*.012)>.62) return [.66+n,.6+n,.42+n]; // 억새 들
        return [.34+n,.45+n,.26+n].map((v,i)=>v+(E.vn(x*.02,z*.02)-.5)*.06); });
      // 현무암 돌담(밭담): 낮고 검은 막돌 담 줄
      { const BS=E.tmat(E.wallTex('podo_bas','#2e2c2b',['#3b3836','#454240','#2a2827','#4f4b47'],46,36,70),0x494543); const gs=[]; const wall=(x0,z0,x1,z1)=>{ const L=Math.hypot(x1-x0,z1-z0), n=Math.ceil(L/12); for(let i=0;i<n;i++){ const a=i/n, b=(i+1)/n; const xa=x0+(x1-x0)*a, za=z0+(z1-z0)*a, xb=x0+(x1-x0)*b, zb=z0+(z1-z0)*b; const l=Math.hypot(xb-xa,zb-za); const g=new T3.BoxGeometry(l,1.1,.7); const uv=g.attributes.uv; for(let k=0;k<uv.count;k++) uv.setXY(k,uv.getX(k)*l/2,uv.getY(k)*.55); g.rotateY(-Math.atan2(zb-za,xb-xa)); g.translate((xa+xb)/2,TR.h((xa+xb)/2,(za+zb)/2)+.45,(za+zb)/2); gs.push(g); } };
        wall(-82,-40,82,-40); wall(82,-40,96,30); wall(-82,-40,-96,34); wall(-96,34,-60,52);
        for(let k=0;k<9;k++){ const z0=-200-k*90; wall(-700+k*30,z0,-180,z0+30); } for(let k=0;k<7;k++){ const x0=420+k*80; wall(x0,-120,x0+40,320); }
        const m=new T3.Mesh(E.mergeG(gs),BS); m.castShadow=true; m.receiveShadow=true; K.life.add(m); }
      // 숲: 곰솔(납작 수관) + 삼나무 방풍림(원뿔) — 호텔 마당과 카메라 쪽은 비움
      const clr=(x,z,R)=>{ if(Math.hypot(x,z)>R) return true; const a=Math.atan2(z,x); return !(a>.3&&a<1.95); };
      E.forest(E.scatter(-2200,2200,-2200,2200,13,TR.h,(x,z,h)=>{ const r=Math.hypot(x*.7,z); if(r<72) return false; if(fair(x,z)&&r<900) return false; if(!clr(x,z,260)) return E.r()<.06; if(h>380) return E.r()<.7; if(E.vn(x*.012+9,z*.012)>.62) return E.r()<.08; return E.r()<.62; },(x,z,h)=>10+E.vn(x*.04,z*.04)*7,(x,z)=>E.vn(x*.03,z*.03)<.45?2:1),{trunks:true,pal:[null,['#2f4a2c','#3a5735','#2a4127','#44603b'],['#26402b','#2f4c33','#223a26']]});
      { const L=[]; for(let x=-140;x<160;x+=6) for(const z of [-56,-62]) L.push([x,TR.h(x,z),z,12+E.r()*3,2,E.r(),.7]); for(const [x,z,h] of [[-62,-20,8],[-58,26,7],[66,-24,8],[74,22,7],[-28,-34,7],[30,-34,8],[-44,32,7]]) L.push([x,TR.h(x,z),z,h,1,E.r(),1.1]); E.forest(L,{trunks:true,cast:true}); }
      tidy(1);

    }
  }});
