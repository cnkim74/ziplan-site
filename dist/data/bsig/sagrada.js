__bsigFill({"sagrada":function(K){
// 실측(개략): 라틴 십자 90×60 m · 신랑 폭 45 m, 높이 45(중앙)/30(측랑) · 탄생 파사드(+z) 탑 98·107 m ×4 · 수난 파사드(-z) 탑 4 · 예수 탑 172.5 m · 복음사가 탑 135 m ×4 · 성모 탑 138 m(앱스 위) · 영광 파사드(+x, 공사 중) · 모자이크 피니얼
    const ST=K.col(0xcdbb9c,{roughness:.9}), STn=K.col(0xa9957a,{roughness:.95}), STp=K.col(0xdccfb8,{roughness:.9}), STl=K.col(0xd9ccb3,{roughness:.9}), DK=K.col(0x2b2622,{roughness:1}), DB=K.col(0x5e5247,{roughness:1}), GD=K.col(0xd6a63c,{roughness:.35,metalness:.5}), WH=K.col(0xf2f0ea,{roughness:.5}), GN=K.col(0x3f7a44,{roughness:.9}), PV=K.M.pave;
    const FR=[K.col(0xc0392b,{roughness:.6}),K.col(0xe0b030,{roughness:.6}),K.col(0x4a8a4a,{roughness:.6}),K.col(0x7b4a8a,{roughness:.6})];
    const T=K.T, UP=new T.Vector3(0,1,0);
    const sph=(x,y,z,r,mat)=>{ const m=new T.Mesh(new T.SphereGeometry(r,14,10),mat); m.position.set(x,y,z); m.castShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const bar=(a,b,r,mat)=>{ const dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2]; const L=Math.hypot(dx,dy,dz); const m=K.c(0,0,0,r,L,mat,8); m.position.set((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2); m.quaternion.setFromUnitVectors(UP,new T.Vector3(dx/L,dy/L,dz/L)); return m; };
    const archPts=(w,h)=>{ const ys=h-w*.7, P=[[-w/2,0],[-w/2,-ys]]; for(let i=1;i<=7;i++){ const t=i/7; P.push([-w/2*(1-t),-(ys+(h-ys)*Math.pow(t,.6))]); } for(let i=6;i>=1;i--){ const t=i/7; P.push([w/2*(1-t),-(ys+(h-ys)*Math.pow(t,.6))]); } P.push([w/2,-ys],[w/2,0]); return P; };
    const arch=(x,y,z,w,h,d,mat,ry)=>{ const m=K.ex(archPts(w,h),d,mat,[x,y,z]); m.rotation.order='YXZ'; m.rotation.set(Math.PI/2,ry||0,0); return m; };
    const CX=-8; // 교차부 중심 x
    // 종탑: 각진 하부 블록 → 포물선 꼴 원뿔 → 모자이크 피니얼, 창 띠
    const tower=(x,z,Hh,m,base)=>{ const yb=base?40:0; if(base){ K.b(x,0,z,9.5,40,9.5,m); for(let i=0;i<3;i++) for(const q of [0,1,2,3]){ const a=q*Math.PI/2; K.b(x+Math.sin(a)*4.8,8+i*10,z+Math.cos(a)*4.8,1.4,6,.3,DK,a); } } K.c(x,yb,z,4.9,(Hh-14)-yb,m,16,{r2:2.1}); K.c(x,Hh-14,z,2.1,8,m,16,{r2:1.2}); for(let i=0;i<10;i++){ const y=yb+4+i*((Hh-14-yb-8)/9), t=(y-yb)/(Hh-14-yb); K.c(x,y,z,4.9+(2.1-4.9)*t+.12,1.2,DB,16,{r2:4.9+(2.1-4.9)*(t+1.2/(Hh-14-yb))+.12}); } K.c(x,Hh-6,z,1.2,2.5,WH,8,{r2:1.6}); sph(x,Hh-2.2,z,2.2,GD); K.b(x,Hh-.5,z,.5,3,.5,WH); K.b(x,Hh+1,z,2.2,.5,.5,WH); };
    K.layer(0);
    K.b(0,-.05,0,140,.05,120,PV);
    // 몸체: 신랑(x 7→45) · 트랜셉트(z ±30) · 앱스(-x)
    K.b(26,0,0,38,30,45,ST); K.b(26,30,0,38,15,25,ST); K.roofGable(26,45,0,38,25,4,STl,'x');
    K.b(CX,0,0,30,30,60,ST); K.b(CX,30,0,16,15,60,ST); K.roofGable(CX,45,0,16,60,4,STl);
    K.c(-23,0,0,21,36,ST,28); K.c(-23,36,0,19,2,STl,28,{r2:12});
    for(let i=0;i<7;i++){ const a=Math.PI/2+Math.PI*(i+.5)/7, x=-23+Math.cos(a)*21, z=Math.sin(a)*21; arch(x+Math.cos(a)*.15-Math.cos(a)*1.0,8,z+Math.sin(a)*.15-Math.sin(a)*1.0,4.2,18,1.0,DK,Math.atan2(Math.cos(a),Math.sin(a))); K.c(x*.95-23*.05,36,z*.95,1.3,7,ST,8,{r2:.2}); } // 앱스 창·첨탑
    for(const s of [-1,1]){ for(let i=0;i<4;i++){ const x=12+i*9; arch(x,2,s*(22.5-.85),5,17,1.0,DK,s>0?0:Math.PI); arch(x,32,s*(12.5-.85),4,10,1.0,DK,s>0?0:Math.PI); K.pedim(x,19.5,s*22.9,8,5,.8,STl,0); K.b(x,30,s*22.8,7,2.5,.6,STl); }
      for(let i=0;i<5;i++){ const x=7.5+i*9; K.b(x,0,s*22.9,1.6,32,1.4,STl); K.c(x,32,s*22.9,.9,3.5,STl,6,{r2:.2}); } // 측랑·고창
      for(let i=0;i<6;i++){ const x=10+i*6.4; K.c(x,30,s*21.5,1.3,5.5,STl,6,{r2:.35}); sph(x,36,s*21.5,1.0,FR[i%4]); } } // 과일 바구니 첨탑
    for(const s of [-1,1]) for(const z of [-18,-6,6,18]){ arch(s>0?6.15:-22.15,2,z,5,17,1.0,DK,s>0?Math.PI/2:-Math.PI/2); } // 트랜셉트 측면 창
    // 성구실 돔 2 · 영광 파사드(+x, 공사 중)
    for(const s of [-1,1]){ K.c(-36,0,s*31,7,14,ST,12); K.dome(-36,14,s*31,7,18,STl); K.c(-36,32,s*31,.5,4,GD,6,{r2:.1}); }
    K.b(45,0,0,4,40,47,STp); arch(41.15,0,0,7,22,6,DK,Math.PI/2); for(const z of [-13.7,13.7]) arch(42.15,0,z,4.6,12,5,DK,Math.PI/2); for(const z of [-20,-7.5,7.5,20]) K.c(47,0,z,3.6,30,STp,12,{r2:3.3});
    // 탄생 파사드(+z): 탑 4 · 포털 3 · 사이프러스
    K.layer(1);
    for(const [x,h] of [[-21,98],[-12,107],[-4,107],[5,98]]) tower(x,27,h,STn,1);
    K.b(CX,0,31,32,40,3,STn); arch(CX,0,30.65,9,22,2,DK,0); for(const dx of [-10.5,10.5]) arch(CX+dx,0,30.65,6.5,15,2,DK,0);
    K.pedim(CX,22,32.5,13,14,2.4,STn,0); for(const dx of [-10.5,10.5]) K.pedim(CX+dx,15,32.2,8,9,2.0,STn,0);
    K.c(CX,36,31.5,2.8,14,GN,8,{r2:.3}); K.b(CX,50,31.5,.35,2.2,.35,WH); K.b(CX,51.2,31.5,1.4,.35,.35,WH);
    K.b(CX,58,27,10,5,7,STn); // 안쪽 두 탑 사이 다리
    // 수난 파사드(-z): 탑 4 · 기운 뼈 기둥 6 · 포르티코
    K.layer(2);
    for(const [x,h] of [[-21,98],[-12,107],[-4,107],[5,98]]) tower(x,-27,h,STp,1);
    K.b(CX,0,-31,32,40,3,STp); arch(CX,0,-30.65,9,20,2,DK,Math.PI); for(const dx of [-10.5,10.5]) arch(CX+dx,0,-30.65,6,13,2,DK,Math.PI);
    for(let i=0;i<6;i++){ const x=CX-14+i*5.6; bar([x,0,-39.5],[x,15.5,-33.5],.75,STp); } K.b(CX,15.5,-35.5,34,1.6,8,STp);
    K.b(CX,58,-27,10,5,7,STp);
    // 중앙 탑군: 예수 172.5 · 복음사가 135 ×4 · 성모 138
    K.layer(3);
    K.c(CX,45,0,11,15,ST,12); K.c(CX,60,0,10,90,ST,12,{r2:4}); K.c(CX,150,0,4,10,ST,12,{r2:1.6});
    for(let i=0;i<8;i++){ const y=66+i*10.5, t=(y-60)/90; K.c(CX,y,0,10+(4-10)*t+.12,1.8,DB,12,{r2:10+(4-10)*(t+1.8/90)+.12}); }
    K.b(CX,160,0,1.4,12.5,1.4,WH); K.b(CX,166.5,0,8.5,1.3,1.3,WH); K.b(CX,166.5,0,1.3,1.3,8.5,WH); sph(CX,172,0,1.2,GD);
    for(const [dx,dz] of [[-13,-13],[13,-13],[-13,13],[13,13]]){ const x=CX+dx; K.c(x,45,dz,5.6,75,ST,12,{r2:2.5}); K.c(x,120,dz,2.5,8,ST,12,{r2:1.1}); for(let i=0;i<6;i++){ const y=52+i*11.5, t=(y-45)/75; K.c(x,y,dz,5.6+(2.5-5.6)*t+.1,1.5,DB,12,{r2:5.6+(2.5-5.6)*(t+1.5/75)+.1}); } K.c(x,128,dz,1.1,2,WH,8,{r2:1.5}); sph(x,131.5,dz,2.0,GD); K.b(x,133,dz,.5,2.5,.5,WH); }
    K.c(-23,38,0,7,85,ST,12,{r2:3}); K.c(-23,123,0,3,8,ST,12,{r2:1.3}); for(let i=0;i<6;i++){ const y=46+i*13.5, t=(y-38)/85; K.c(-23,y,0,7+(3-7)*t+.1,1.6,DB,12,{r2:7+(3-7)*(t+1.6/85)+.1}); } sph(-23,134,0,3.2,WH); K.b(-23,136,0,.4,3.5,.4,GD);
    // ---- 배경 보강(S5): 실제 대지 맥락 — K.life(bbox 밖) ----
    { const T=K.T;
    // ---- 배경·바닥(v15): 캔버스 질감 · 높이장 지형(K.life — bbox 밖) · 인스턴스 숲 · 뷰어 기본 바닥 숨김 ----
    const E=(()=>{ const TT=T; let sd=131; const r=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
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

    const W=(()=>{ const TT=K.T;
      // 하늘 돔(초고층·넓은 맥락용): 뷰어 하늘 구(600)보다 카메라가 멀어질 때 검게 비는 것을 막음 — 밤이면 밤색
      const sky=(R)=>{ const g=new TT.SphereGeometry(R,32,16); const p=g.attributes.position; const mk=night=>{ const col=[]; const top=new TT.Color(night?0x0b1226:0x9fc0de).convertSRGBToLinear(), hor=new TT.Color(night?0x2a3350:0xeee9df).convertSRGBToLinear(), c=new TT.Color(); for(let i=0;i<p.count;i++){ const t=Math.max(0,Math.min(1,p.getY(i)/(R*.63))); c.copy(hor).lerp(top,Math.pow(t,.65)); col.push(c.r,c.g,c.b); } return new TT.Float32BufferAttribute(col,3); }; const cD=mk(false), cN=mk(true); g.setAttribute('color',cD); const m=new TT.Mesh(g,new TT.MeshBasicMaterial({vertexColors:true,side:TT.BackSide,fog:false,depthWrite:false})); m.renderOrder=-1; m.frustumCulled=false; let cur=0; m.onBeforeRender=(r,sc)=>{ const n=sc.fog&&sc.fog.color&&sc.fog.color.r<.3?1:0; if(n!==cur){ cur=n; g.setAttribute('color',n?cN:cD); } }; K.life.add(m); return m; };
      // life 평면(bbox 밖): 재질 m, 중심 x,z, 크기 w,d, 높이 y, 회전 ry
      const lplane=(m,x,y,z,w,d,ry)=>{ const g=new TT.PlaneGeometry(w,d); g.rotateX(-Math.PI/2); if(ry) g.rotateY(ry); g.translate(x,y,z); if(m.userData&&m.userData.tm){ const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); } const me=new TT.Mesh(g,m); me.receiveShadow=m!==WATER; K.life.add(me); return me; };
      // 다각형 바닥(life): pts [[x,z],…]
      const lpoly=(m,pts,y)=>{ pts=pts.slice(); { let a=0; for(let i=0;i<pts.length;i++){ const p=pts[i], q=pts[(i+1)%pts.length]; a+=p[0]*q[1]-q[0]*p[1]; } if(a>0) pts.reverse(); } const sh=new TT.Shape(); pts.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); const g=new TT.ShapeGeometry(sh); g.rotateX(-Math.PI/2); g.translate(0,y,0); if(m.userData&&m.userData.tm){ const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); } m.side=TT.DoubleSide; const me=new TT.Mesh(g,m); me.receiveShadow=true; K.life.add(me); return me; };
      const solid=(hex,o)=>{ const m=new TT.MeshStandardMaterial(Object.assign({color:hex,roughness:.95},o||{})); m.color.convertSRGBToLinear(); m.userData.nocast=1; return m; };
      const WATER=E.WATER;
      // 창 질감: 'p' 석조 펀치창(3 m × 3.4 m 칸) · 'g' 커튼월 띠(유리 + 멀리언) — 흰 바탕, 꼭짓점 색으로 물들임
      const winTex=(kind)=>E.tex('win'+kind,256,(g,N,rr)=>{ if(kind==='g'){ g.fillStyle='#c9d1d8'; g.fillRect(0,0,N,N); for(let j=0;j<4;j++){ g.fillStyle='#f2f4f5'; g.fillRect(0,j*N/4,N,N/4*.14); for(let i=0;i<8;i++){ const t=.85+rr()*.3; g.fillStyle=`rgb(${Math.round(168*t)},${Math.round(186*t)},${Math.round(200*t)})`; g.fillRect(i*N/8+2,j*N/4+N/4*.16,N/8-4,N/4*.84); } } }
        else { g.fillStyle='#ffffff'; g.fillRect(0,0,N,N); for(let j=0;j<4;j++) for(let i=0;i<4;i++){ const lit=rr(); g.fillStyle=lit<.15?'#7d8590':'#59616b'; g.fillRect(i*N/4+N/4*.28,j*N/4+N/4*.22,N/4*.44,N/4*.56); } } });
      // 블록: [x,z,w,d,h,hex,ry,kind('p'|'g'|'n'),roofHex,roofH,roofInset]
      // 뷰 시선 확보: 뷰어 카메라(눈높이 az≈.75·정면 az=π/2, 거리는 bbox로 정해짐 — r=max(폭,깊이,높이×1.5))와 모형 사이 원뿔 안의 블록은 시선보다 낮게 깎음
      let VB=null; const vcap=(x,z,w,d,h)=>{ if(!VB){ const bb=new TT.Box3().setFromObject(K.bldg), sz=bb.getSize(new TT.Vector3()), c=bb.getCenter(new TT.Vector3()); const r=Math.max(sz.x,sz.z,sz.y*1.5); VB={c,sz,r,cams:[[.75,(r*.95+10),1.7+r*.05,.07],[1.0,(r*.95+10),1.7+r*.05,.07],[Math.PI/2,(r*1.3+12),1.7+r*.05,.18],[Math.PI/2,(r*1.3+12),Math.max(2,sz.y*.42),.18]]}; }
        let lim=h; const R0=Math.max(VB.sz.x,VB.sz.z)/2+10, br=Math.hypot(w,d)/2; for(const [a,D,yt,el] of VB.cams){ const ca=Math.cos(a), sa=Math.sin(a); const dx=x-VB.c.x, dz=z-VB.c.z; const t=(dx*ca+dz*sa)/D; if(t<0||t>1.1) continue; const p=Math.abs(-dx*sa+dz*ca); const hw=R0*(1-t)+6+br; if(p>hw) continue; const yc=yt+D*Math.sin(el); const yb=Math.min(VB.sz.y*.15,30)+4; lim=Math.min(lim,yb*(1-t)+yc*t-4); } return lim; };
      const city=(list)=>{ const by={p:[],g:[],n:[]}; list=list.map(b=>{ if(b[12]) return b; const lim=vcap(b[0],b[1],b[2],b[3],b[4]); if(lim>=b[4]) return b; if(lim<5) return null; const c=b.slice(); c[4]=lim; return c; }).filter(Boolean); list.forEach(b=>(by[b[7]||'p']||by.p).push(b)); const out=[];
        for(const k of ['p','g','n']){ const L=by[k]; if(!L.length) continue; let nv=0; for(const b of L) nv+=(b[8]!==undefined&&b[8]!==null&&b[9])?60:30; const P=new Float32Array(nv*3), N=new Float32Array(nv*3), U=new Float32Array(nv*2), C=new Float32Array(nv*3); let o=0; const c=new TT.Color(), rc=new TT.Color(); const CW=12, CH=k==='g'?15:13.6;
          let cr=0,cg=0,cb=0; const V=(px,py,pz,nx,ny,nz,u,v)=>{ const i3=o*3, i2=o*2; P[i3]=px; P[i3+1]=py; P[i3+2]=pz; N[i3]=nx; N[i3+1]=ny; N[i3+2]=nz; U[i2]=u; U[i2+1]=v; C[i3]=cr; C[i3+1]=cg; C[i3+2]=cb; o++; };
          for(const b of L){ const [x,z,w,d,h,hex,ry,kk,rh,rH,rI,by]=b; const Y0=by||0, yb=by?Y0-6:0; c.set(hex).convertSRGBToLinear(); const cs=Math.cos(ry||0), sn=Math.sin(ry||0); const hw=w/2, hd=d/2;
            const XA=lx=>lx*cs, ZA=lx=>-lx*sn; const px=(lx,lz)=>x+lx*cs+lz*sn, pz=(lx,lz)=>z-lx*sn+lz*cs;
            const SD=[[-hw,hd,hw,hd,0,1,.95],[hw,hd,hw,-hd,1,0,.86],[hw,-hd,-hw,-hd,0,-1,.9],[-hw,-hd,-hw,hd,-1,0,.86]]; const u0=((x*.37+z*.11)%1+1)%1;
            for(const [ax,az,bx,bz,nx0,nz0,sh] of SD){ const L2=Math.hypot(bx-ax,bz-az); cr=c.r*sh; cg=c.g*sh; cb=c.b*sh; const nx=nx0*cs+nz0*sn, nz=-nx0*sn+nz0*cs; const Ax=px(ax,az), Az=pz(ax,az), Bx=px(bx,bz), Bz=pz(bx,bz); const u1=u0+L2/CW, v1=h/CH, yt=h+Y0;
              V(Ax,yb,Az,nx,0,nz,u0,0); V(Bx,yb,Bz,nx,0,nz,u1,0); V(Bx,yt,Bz,nx,0,nz,u1,v1); V(Ax,yb,Az,nx,0,nz,u0,0); V(Bx,yt,Bz,nx,0,nz,u1,v1); V(Ax,yt,Az,nx,0,nz,u0,v1); }
            const yt=h+Y0;
            if(rh!==undefined&&rh!==null&&rH){ rc.set(rh).convertSRGBToLinear(); const ins=Math.max(.2,Math.min(rI||rH,Math.min(hw,hd)-.2)); const q=[[-hw,hd],[hw,hd],[hw,-hd],[-hw,-hd]], qi=[[-hw+ins,hd-ins],[hw-ins,hd-ins],[hw-ins,-hd+ins],[-hw+ins,-hd+ins]]; const sl=Math.hypot(ins,rH);
              for(let i=0;i<4;i++){ const j=(i+1)%4; const nn=SD[i]; const nx=(nn[4]*cs+nn[5]*sn)*rH/sl, nz=(-nn[4]*sn+nn[5]*cs)*rH/sl, ny=ins/sl; const sh=[1,.85,.78,.88][i]; cr=rc.r*sh; cg=rc.g*sh; cb=rc.b*sh;
                const Ax=px(q[i][0],q[i][1]), Az=pz(q[i][0],q[i][1]), Bx=px(q[j][0],q[j][1]), Bz=pz(q[j][0],q[j][1]), Cx=px(qi[j][0],qi[j][1]), Cz=pz(qi[j][0],qi[j][1]), Dx=px(qi[i][0],qi[i][1]), Dz=pz(qi[i][0],qi[i][1]);
                V(Ax,yt,Az,nx,ny,nz,.02,.02); V(Bx,yt,Bz,nx,ny,nz,.02,.02); V(Cx,yt+rH,Cz,nx,ny,nz,.02,.02); V(Ax,yt,Az,nx,ny,nz,.02,.02); V(Cx,yt+rH,Cz,nx,ny,nz,.02,.02); V(Dx,yt+rH,Dz,nx,ny,nz,.02,.02); }
              cr=rc.r; cg=rc.g; cb=rc.b; const p0=[px(qi[0][0],qi[0][1]),pz(qi[0][0],qi[0][1])], p1=[px(qi[1][0],qi[1][1]),pz(qi[1][0],qi[1][1])], p2=[px(qi[2][0],qi[2][1]),pz(qi[2][0],qi[2][1])], p3=[px(qi[3][0],qi[3][1]),pz(qi[3][0],qi[3][1])];
              V(p0[0],yt+rH,p0[1],0,1,0,.02,.02); V(p1[0],yt+rH,p1[1],0,1,0,.02,.02); V(p2[0],yt+rH,p2[1],0,1,0,.02,.02); V(p0[0],yt+rH,p0[1],0,1,0,.02,.02); V(p2[0],yt+rH,p2[1],0,1,0,.02,.02); V(p3[0],yt+rH,p3[1],0,1,0,.02,.02); }
            else { const f=k==='n'?1.02:.8; cr=c.r*f; cg=c.g*f; cb=c.b*f; const p0=[px(-hw,hd),pz(-hw,hd)], p1=[px(hw,hd),pz(hw,hd)], p2=[px(hw,-hd),pz(hw,-hd)], p3=[px(-hw,-hd),pz(-hw,-hd)]; V(p0[0],yt,p0[1],0,1,0,.02,.02); V(p1[0],yt,p1[1],0,1,0,.02,.02); V(p2[0],yt,p2[1],0,1,0,.02,.02); V(p0[0],yt,p0[1],0,1,0,.02,.02); V(p2[0],yt,p2[1],0,1,0,.02,.02); V(p3[0],yt,p3[1],0,1,0,.02,.02); } }
          const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P.subarray(0,o*3),3)); g.setAttribute('normal',new TT.BufferAttribute(N.subarray(0,o*3),3)); g.setAttribute('uv',new TT.BufferAttribute(U.subarray(0,o*2),2)); g.setAttribute('color',new TT.BufferAttribute(C.subarray(0,o*3),3));
          const tx=k==='n'?null:winTex(k); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,map:tx,roughness:k==='g'?.45:.9,metalness:k==='g'?.1:0})); m.receiveShadow=true; m.castShadow=false; K.life.add(m); out.push(m); } return out; };
      // 흩뿌리기 도우미: 사각 격자 블록(가로 간격 sx·sz, 도로 폭 rw) — ok(x,z)가 false면 생략, f(x,z)→[w,d,h,hex,kind,roofHex,roofH,inset] 
      const grid=(x0,x1,z0,z1,sx,sz,rw,ok,f,ry)=>{ const L=[]; const cs=Math.cos(ry||0), sn=Math.sin(ry||0); for(let a=x0;a<x1;a+=sx) for(let b=z0;b<z1;b+=sz){ const x=a*cs+b*sn, z=-a*sn+b*cs; if(ok&&!ok(x,z)) continue; const q=f(x,z,sx-rw,sz-rw); if(!q) continue; L.push([x,z,q[0],q[1],q[2],q[3],ry||0,q[4],q[5],q[6],q[7]]); } return L; };
      // 도시 고리: o={r0,r1,step,keep(x,z)→bool, h(r)→높이, pal:[색…], gp:유리 비율, tall:[확률,최소,폭], ry, roof:[색,높이,들임] or null, fill:비율}
      const ring=(o)=>{ const L=[]; const st=o.step||50, cs=Math.cos(o.ry||0), sn=Math.sin(o.ry||0); for(let a=-o.r1;a<o.r1;a+=st) for(let b=-o.r1;b<o.r1;b+=st){ const x0=a+(E.r()-.5)*st*.25, z0=b+(E.r()-.5)*st*.25; const x=(o.cx||0)+x0*cs+z0*sn, z=(o.cz||0)-x0*sn+z0*cs; const r=Math.hypot(x0,z0); if(r<o.r0||r>o.r1) continue; if(o.keep&&!o.keep(x,z,r)) continue; if(o.clr&&x>-o.clr*.12&&z>-o.clr*.12&&Math.hypot(x,z)<o.clr) continue; if(E.r()>(o.fill||.65)) continue;
          const tall=o.tall&&E.r()<o.tall[0]; const gl=tall||E.r()<(o.gp||0); const w=st*(.45+E.r()*.35), d=st*(.45+E.r()*.35); const h=tall?o.tall[1]+E.r()*o.tall[2]:o.h(r,x,z); const pal=gl?(o.gpal||['#b7c5cf','#a3b4c0','#c3cdd4']):o.pal; const rf=!gl&&o.roof?o.roof:null; L.push([x,z,w,d,h,pal[Math.floor(E.r()*pal.length)],o.ry||0,gl?'g':(o.kind||'p'),rf?rf[0]:null,rf?rf[1]:0,rf?rf[2]:0,o.hy?o.hy(x,z):0]); } return city(L); };
      // 맨해튼 격자: x 방향 블록 길이 bx(애비뉴 간격), z 방향 by(스트리트 간격), 블록마다 남북 두 줄로 필지를 나눔 — o={x0,x1,z0,z1,bx,bz,aw,sw,skip(x,z,w,d)→bool, h(x,z)→높이, pal, gpal, gp}
      const manh=(o)=>{ const L=[]; const bx=o.bx||260, bz=o.bz||80, aw=o.aw||30, sw=o.sw||18; for(let X=o.x0;X<o.x1;X+=bx) for(let Z=o.z0;Z<o.z1;Z+=bz){ const W0=bx-aw, D0=bz-sw; for(const row of [-1,1]){ let x=X-W0/2; while(x<X+W0/2-4){ const w=Math.min(X+W0/2-x,10+E.r()*E.r()*45); const cx=x+w/2, cz=Z+row*D0/4, d=D0/2-(E.r()<.3?E.r()*8:0); x+=w; if(o.skip&&o.skip(cx,cz,w,d)) continue; const h=o.h(cx,cz); if(h<=0) continue; const gl=h>110&&E.r()<(o.gp===undefined?.5:o.gp); const pal=gl?(o.gpal||['#a9b8c3','#9aabb7','#bcc6cc']):(o.pal||['#cbbfa8','#b9a993','#a38f7a','#d8d0c0','#9c8f84','#c4b49c']); L.push([cx,cz+(row>0?-(D0/2-d)/2:(D0/2-d)/2),w-.6,d,h,pal[Math.floor(E.r()*pal.length)],0,gl?'g':'p']); } } } return city(L); };
      // 뷰어의 일반 대지(잔디판·포장판·길·차선)를 이 모형이 떠 있는 동안만 숨김 — site 자식의 visible을 getter로 바꿔(life가 보일 때 false) 첫 프레임·썸네일에서도 적용, 'site' 단계처럼 life가 꺼지면 원래대로 보이고, 다른 모형으로 바뀌면(표식이 life에서 빠지면) 자동으로 원상
      const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
        const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
      return {sky,lplane,lpoly,solid,WATER,city,grid,ring,manh,own}; })();

    // 맥락(위키백과 「Sagrada Família」·「Eixample」): 세르다의 에이샴플레 격자 한 블록(113 m, 길 20 m, 모서리 깎은 팔각 블록·안마당) — 탄생 정면(+z, 북동)은 마리나 길 건너 가우디 광장(연못), 수난 정면(-z)은 사르데냐 길 건너 사그라다 파밀리아 광장, 영광 정면(+x)은 마요르카 길 · 가우디 거리(대각 보행로)가 가우디 광장 모서리에서 산 파우 병원 쪽(북)으로 · 둘레 블록 높이 20~28 m(추정)
    K.layer(0); E.own();
    { const P=133.3, B=113.3, CH=14, DEP=19;
      const ASP=W.solid(0x67686a), SW=W.solid(0xc4bba9), PLZ=W.solid(0xcdbf9f), GRS=W.solid(0x7a8f55);
      W.lplane(ASP,0,-.03,0,4000,4000);
      const oct=(cx,cz,s,c)=>{ const h=s/2; return [[cx-h+c,cz-h],[cx+h-c,cz-h],[cx+h,cz-h+c],[cx+h,cz+h-c],[cx+h-c,cz+h],[cx-h+c,cz+h],[cx-h,cz+h-c],[cx-h,cz-h+c]]; };
      const p0=[-P/2,P/2+B/2], dir=[-Math.SQRT1_2,Math.SQRT1_2]; const avd=(x,z)=>{ const dx=x-p0[0], dz=z-p0[1]; const t=dx*dir[0]+dz*dir[1]; return t<-10?1e9:Math.abs(-dx*dir[1]+dz*dir[0]); }; // 가우디 거리
      const L=[], pal=['#d9cdb4','#cdbd9e','#e0d6c2','#c2b08f','#bfb3a0','#d3c3a5','#b7a68a','#e6dfd0'];
      for(let i=-9;i<=9;i++) for(let j=-9;j<=9;j++){ const cx=i*P, cz=j*P; if(Math.hypot(cx,cz)>1250) continue; if(i===0&&j===0) continue;
        const plaza=i===0&&(j===1||j===-1);
        W.lpoly(plaza?PLZ:SW,oct(cx,cz,B,CH),.1);
        if(plaza) continue;
        // 둘레 동: 네 변(나눠서 높이 변화) + 깎은 모서리 4
        const h0=20+E.r()*8; const seg=(x,z,w,d,ry)=>{ if(avd(x,z)<26) return; const h=h0+(E.r()-.5)*6; L.push([x,z,w,d,h,pal[Math.floor(E.r()*pal.length)],ry||0,'p','#cfc8ba',1.0,1.2]); };
        const s=B/2-DEP/2, run=B-2*CH; for(const [ax,az] of [[1,0],[-1,0],[0,1],[0,-1]]){ const n=4; for(let k=0;k<n;k++){ const t=-run/2+run*(k+.5)/n; if(ax) seg(cx+ax*s,cz+t,DEP,run/n-.4); else seg(cx+t,cz+az*s,run/n-.4,DEP); } }
        for(const [sx,sz] of [[1,1],[1,-1],[-1,1],[-1,-1]]){ const off=B/2-CH/2-DEP*.35; seg(cx+sx*off,cz+sz*off,CH*1.414,DEP,Math.PI/4*(sx*sz>0?1:-1)); } }
      W.city(L);
      // 가우디 거리 보행로(대각) · 가우디 광장 연못 · 두 광장 길
      { const len=1100, g=new T.PlaneGeometry(30,len); g.rotateX(-Math.PI/2); g.rotateY(Math.PI/4); g.translate(p0[0]+dir[0]*len/2,.12,p0[1]+dir[1]*len/2); K.life.add(new T.Mesh(g,PLZ)); }
      { const pts=[]; for(let i=0;i<40;i++){ const a=i/40*Math.PI*2; pts.push([-18+Math.cos(a)*30*(1+.15*Math.sin(2*a)),P-6+Math.sin(a)*20]); } W.lpoly(W.solid(0x8b8173),pts.map(([x,z])=>[-18+(x+18)*1.12,P-6+(z-P+6)*1.15]),.16); W.lpoly(E.WATER,pts,.3); } // 연못(탄생 정면이 비치는 곳)
      W.lplane(GRS,24,.14,P+30,40,30); W.lplane(GRS,-40,.14,-P+20,60,40); W.lplane(GRS,30,.14,-P-25,40,30);
      // 플라타너스 가로수(모든 길 양쪽) · 광장 숲 · 가우디 거리 가로수
      const TL=[]; for(let i=-6;i<=6;i++) for(let j=-6;j<=6;j++){ const cx=i*P, cz=j*P; if(Math.hypot(cx,cz)>820) continue; const h=B/2+2.5;
        for(let t=-B/2+12;t<=B/2-12;t+=8){ for(const [x,z] of [[cx+h,cz+t],[cx-h,cz+t],[cx+t,cz+h],[cx+t,cz-h]]){ if(Math.abs(x)<66&&Math.abs(z)<66) continue; TL.push([x,.1,z,10+E.r()*4,0,E.r(),1.1]); } } }
      for(let t=20;t<1000;t+=8) for(const s of [-9,9]) TL.push([p0[0]+dir[0]*t-dir[1]*s,.12,p0[1]+dir[1]*t+dir[0]*s,10+E.r()*3,0,E.r(),1.1]);
      for(const [cx,cz] of [[0,P],[0,-P]]) for(let k=0;k<55;k++){ const x=cx+(E.r()-.5)*(B-14), z=cz+(E.r()-.5)*(B-14); if(cz>0&&(Math.hypot((x+18)/36,(z-P+6)/25)<1||Math.abs(x+8)<24)) continue; TL.push([x,.1,z,8+E.r()*6,E.r()<.2?2:0,E.r(),1.1]); }
      E.forest(TL,{trunks:true,pal:[['#5d7b3e','#6c8a47','#526f37','#7b9550']]});
      W.sky(3000); }
    tidy(1);

    }
  }});
