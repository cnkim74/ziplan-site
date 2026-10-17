__bsigFill({"byodoin":function(K){
// 실측(개략): 중당 몸체 3칸×2칸 약 10.5×8.3 m + 사방 모코시(裳階) → 약 15.5×13.3 m · 용마루 약 13.5 m, 양끝 금동 봉황 · 익랑(좌우) 2층 누랑 약 13 m + 모서리 누각(隅楼) → 앞으로 꺾임 3칸 · 미랑(뒤) 7칸 약 17 m 1층 · 전체 폭 약 47 m
// 주홍 기둥·흰 회벽·회색 본가와라 기와 · 앞(+z=동) 아지이케(阿字池) 연못, 섬 위에 서서 정면이 물에 비침 · 중당 정면 상부 원창(圓窓)
    const RED=K.col(0xb5452c,{roughness:.7}), WH=K.col(0xefeae0,{roughness:.95}), GW=K.M.giwa, RU=K.col(0x5a4a3c), DK=K.M.glassW, GD=K.col(0xd9b24a,{metalness:.7,roughness:.35}), ST=K.M.stone, SO=K.col(0x4b5a50), WD=K.col(0x8a6a48), LF=K.M.leaf3, BR=K.col(0x7a5236);
    const roofHF=(cx,ye,cz,E,D,H,o)=>{ o=o||{}; const dt=o.dt||0, so=o.sori||0, thk=o.thk||.3, sw=!!o.swap, mt=o.mat, um=o.under||mt; const EE=sw?D:E, DD=sw?E:D; const R=Math.max(0,EE-DD*(1-dt));
      const g=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),1.7); const y0=ye+H*(1-g(dt));
      const yf=(a,b)=>{ const aa=Math.abs(a)/(EE/2), bb=Math.abs(b)/(DD/2); const ta=Math.abs(a)>R/2?(Math.abs(a)-R/2)/(DD/2)+dt:0; return ye+H*(1-g(Math.max(bb,ta)))+so*Math.pow(aa,3)*Math.pow(bb,3); };
      const P=(a,b,y)=>sw?[cx+b,y,cz+a,b/2,a/2]:[cx+a,y,cz+b,a/2,b/2];
      const sheet=(a0,a1,m,dy,n)=>K.surf((u,v)=>{ const a=a0+(a1-a0)*u, b=-DD/2+DD*v; return P(a,b,yf(a,b)+dy); },n,o.nv||12,m);
      const segs=(dt>0&&dt<1)?[[-EE/2,-R/2,8],[-R/2,R/2,20],[R/2,EE/2,8]]:[[-EE/2,EE/2,o.nu||32]];
      for(const [a0,a1,n] of segs){ sheet(a0,a1,mt,0,n); sheet(a0,a1,um,-thk,n); }
      K.surf((u,v)=>{ const s=u*4, k=Math.floor(s), f=s-k; let a,b; if(k===0){a=-EE/2+EE*f;b=-DD/2;} else if(k===1){a=EE/2;b=-DD/2+DD*f;} else if(k===2){a=EE/2-EE*f;b=DD/2;} else {a=-EE/2;b=DD/2-DD*f;} const y=yf(a,b); return P(a,b,y-thk+thk*v); },64,1,um);
      if(dt>0){ for(const s of [-1,1]){ const a=s*R/2; K.surf((u,v)=>{ const b=-dt*DD/2+dt*DD*u; const yt=yf(a-s*.02,b), yb=y0-thk; return P(a-s*.05,b,yb+(yt-yb)*v); },12,1,o.gmat||um); } }
      if(R>.6&&o.ridge!==false) K.b(cx,ye+H-.15,cz,sw?(o.rw||.8):R+.5,o.rh||.5,sw?R+.5:(o.rw||.8),o.rmat||K.col(0x2b2a28)); return yf; };
    const rail=(cx,y,cz,w,d,h,mat,sp)=>{ for(const [x0,z0,x1,z1] of [[-w/2,-d/2,w/2,-d/2],[w/2,-d/2,w/2,d/2],[w/2,d/2,-w/2,d/2],[-w/2,d/2,-w/2,-d/2]]){ const L=Math.hypot(x1-x0,z1-z0), n=Math.max(2,Math.round(L/sp)); const ax=Math.abs(x1-x0)>0; K.b(cx+(x0+x1)/2,y+h-.08,cz+(z0+z1)/2,ax?L+.12:.12,.09,ax?.12:L+.12,mat); for(let i=0;i<n;i++){ const t=i/n; K.b(cx+x0+(x1-x0)*t,y,cz+z0+(z1-z0)*t,.09,h-.08,.09,mat); } } };
    const ring=(cx,y,cz,w,d,nx,nz,r,h,mat)=>{ for(let i=0;i<=nx;i++) for(let j=0;j<=nz;j++){ if(i>0&&i<nx&&j>0&&j<nz) continue; K.c(cx-w/2+i*w/nx,y,cz-d/2+j*d/nz,r,h,mat,10); } };
    const pine=(x,y,z,h)=>{ K.c(x,y,z,.12,h*.55,K.M.trunk,6); for(let k=0;k<3;k++) K.c(x,y+h*(.33+k*.2),z,h*(.3-k*.07),h*.3,LF,8,{r2:.05}); };
    const disk=(x,y,z,r,a,mat)=>K.surf((u,v)=>{ const t=u*Math.PI*2, rr=v*r; return [x+Math.cos(t)*rr*Math.cos(a),y+Math.sin(t)*rr,z-Math.cos(t)*rr*Math.sin(a)]; },20,1,mat);
    const phoenix=(x,y,z)=>{ K.c(x,y,z,.12,.5,GD,8); K.c(x,y+.5,z,.22,.4,GD,8,{r2:.1}); K.b(x,y+.7,z,.28,.3,.9,GD); K.b(x,y+.95,z+.4,.14,.3,.3,GD); K.b(x,y+.85,z,1.7,.05,.5,GD); K.b(x,y+.75,z-.65,.12,.08,.8,GD); };
    // ---- 0: 섬·연못·지상층 ----
    K.layer(0);
    const GV=K.M.gravel; const ISL=[[-29,-21],[-20,-23],[0,-24],[20,-23],[29,-20],[31,-6],[29,6],[27.5,12],[21,13.5],[12,10.5],[0,9.5],[-12,10.5],[-21,13.5],[-27.5,12],[-30,5],[-31,-6]];
    K.ex(ISL,.5,GV,[0,0,0]); // 섬(자갈)
    const POND=[[-31,-4],[-30,8],[-27,16],[-22,27],[-14,37],[-4,43],[8,45],[20,42],[30,35],[36,25],[38,14],[40,2],[39,-12],[34,-22],[26,-26],[16,-24],[4,-26],[-8,-25],[-18,-27],[-28,-24],[-35,-18],[-40,-8],[-40,2],[-37,10]];
    K.ex(POND,.06,SO,[0,-.02,0]); K.ex(POND,.04,K.M.water,[0,.05,0]);
    for(let i=0;i<POND.length;i++){ const [ax,az]=POND[i],[bx,bz]=POND[(i+1)%POND.length]; const t=.3+.3*(i%2); K.c(ax+(bx-ax)*t,-.05,az+(bz-az)*t,.5+.3*(i%3),.4+.2*(i%2),K.col(0x7d7a72,{roughness:.95}),5,{r2:.3}); }
    K.b(33.5,.4,-3,2.2,.3,13,ST); for(let i=0;i<4;i++) K.c(32.4+((i%2)*2.2),0,-8+i*3.4,.16,.8,WD,6); // 동쪽 돌다리
    // 중당 모코시(하층)
    K.b(0,.5,0,16.5,.6,14.3,ST); const M1=1.1; ring(0,M1,0,15.5,13.3,5,4,.2,3.1,RED); K.b(0,M1,0,15.2,3.1,13.0,WH);
    for(let i=0;i<5;i++) K.b(-6.2+i*3.1,M1+.2,6.56,2.5,2.7,.12,DK); for(const s of [-1,1]) for(let j=0;j<4;j++) K.b(s*7.66,M1+.3,-5+j*3.33,.12,2.4,2.5,DK); for(let i=0;i<5;i++) K.b(-6.2+i*3.1,M1+.4,-6.56,2.3,2.0,.12,DK);
    K.b(0,M1+3.1,0,15.9,.3,13.7,RED);
    // 익랑 지상(필로티 주홍 기둥) + 모서리 누각 기둥 + 꺾임부
    for(const s of [-1,1]){ const xc=s*14.6; K.b(xc,.5,0,13.6,.3,4.8,ST); for(let i=0;i<=6;i++) for(const z of [-1.7,1.7]) K.c(xc-6.6+i*2.2,.8,z,.19,3.3,RED,10);
      K.b(s*23,.5,0,5.6,.3,5.6,ST); for(const px of [-2.3,2.3]) for(const pz of [-2.3,2.3]) K.c(s*23+px,.8,pz,.22,3.3,RED,10);
      K.b(s*23,.5,6.3,4.8,.3,7.2,ST); for(let j=0;j<=3;j++) for(const px of [-1.7,1.7]) K.c(s*23+px,.8,3.2+j*2.2,.19,3.3,RED,10); }
    // 미랑(뒤 1층 회랑)
    K.b(0,.5,-15,5.2,.3,17,ST); for(let j=0;j<=7;j++) for(const px of [-1.7,1.7]) K.c(px,.8,-7.6-j*2.2,.18,3.0,RED,10); K.b(0,3.8,-15,4.2,.3,17,RED);
    for(const [px,pz,h] of [[-30,-16,7],[31,-15,6.5],[-34,20,6],[36,24,5.5],[-12,-24,7],[14,-24,6.5],[-46,-6,6.5],[48,2,6]]) pine(px,0,pz,h);
    // ---- 1: 상층(중당 몸체·익랑 2층·누각) ----
    K.layer(1);
    roofHF(0,4.2,0,20.5,18.3,2.6,{mat:GW,under:RU,thk:.3,sori:.3,ridge:false}); // 모코시 지붕
    const U1=4.9; K.b(0,U1,0,10.5,2.8,8.3,WH); ring(0,U1,0,10.5,8.3,3,2,.2,2.8,RED); K.b(0,U1,0,10.9,.3,8.7,RED); K.b(0,U1+2.5,0,10.9,.3,8.7,RED);
    disk(0,6.45,4.22,.85,0,DK); K.b(0,U1+2.8,0,11.7,.9,9.5,BR); for(let i=0;i<3;i++) for(const s of [-1,1]) K.b(-3.5+i*3.5,U1+2.8,s*4.9,1.0,.9,.5,WH); for(const s of [-1,1]) K.b(s*5.9,U1+2.8,0,.5,.9,1.0,WH);
    for(const s of [-1,1]){ const xc=s*14.6;
      K.b(xc,3.95,0,14,.35,5.2,WD); K.b(xc,4.3,0,13.6,2.4,3.6,WH); for(let i=0;i<=6;i++) for(const z of [-1.8,1.8]) K.c(xc-6.6+i*2.2,4.3,z,.14,2.4,RED,8); for(let i=0;i<6;i++) K.b(xc-5.5+i*2.2,4.5,1.78,1.5,1.6,.1,DK);
      rail(xc,4.3,0,14.6,5.4,.8,RED,1.6); K.b(xc,6.7,0,14,.25,4.0,RED);
      roofHF(xc,6.95,0,16.8,7.6,1.9,{mat:GW,under:RU,thk:.28,sori:.3});
      // 모서리 누각(隅楼): 2층 몸체 + 3층 작은 몸체 + 사모지붕
      K.b(s*23,3.95,0,6.0,.35,6.0,WD); K.b(s*23,4.3,0,5.0,2.4,5.0,WH); for(const px of [-2.5,2.5]) for(const pz of [-2.5,2.5]) K.c(s*23+px,4.3,pz,.15,2.4,RED,8); rail(s*23,4.3,0,6.2,6.2,.8,RED,1.5);
      roofHF(s*23,6.95,0,8.2,8.2,1.5,{mat:GW,under:RU,thk:.28,sori:.3,ridge:false});
      K.b(s*23,7.3,0,4.8,.3,4.8,WD); K.b(s*23,7.6,0,3.6,2.2,3.6,WH); for(const px of [-1.8,1.8]) for(const pz of [-1.8,1.8]) K.c(s*23+px,7.6,pz,.13,2.2,RED,8); rail(s*23,7.6,0,5.0,5.0,.7,RED,1.25); K.b(s*23,9.6,0,4.0,.25,4.0,RED);
      roofHF(s*23,9.9,0,6.8,6.8,1.9,{mat:GW,under:RU,thk:.26,sori:.3,ridge:false}); K.c(s*23,11.7,0,.3,.5,RU,8,{r2:.1}); K.c(s*23,12.2,0,.14,.9,GD,6);
      // 꺾임부(앞으로 3칸)
      K.b(s*23,3.95,6.3,5.2,.35,7.2,WD); K.b(s*23,4.3,6.3,3.6,2.4,6.8,WH); for(let j=0;j<=3;j++) for(const px of [-1.8,1.8]) K.c(s*23+px,4.3,3.2+j*2.2,.14,2.4,RED,8); for(let j=0;j<3;j++) K.b(s*23-s*1.78,4.5,4.3+j*2.2,.1,1.6,1.5,DK);
      rail(s*23,4.3,6.3,5.4,7.4,.8,RED,1.6); K.b(s*23,6.7,6.3,4.0,.25,7.0,RED);
      roofHF(s*23,6.95,6.6,7.6,9.0,1.9,{swap:true,mat:GW,under:RU,thk:.28,sori:.3}); }
    // ---- 2: 중당 큰 지붕(팔작) + 봉황, 미랑 지붕 ----
    K.layer(2);
    roofHF(0,8.2,0,21,17,5.2,{dt:.4,mat:GW,under:RU,thk:.36,sori:.35,gmat:WH,rh:.6}); for(const s of [-1,1]) phoenix(s*5.5,13.25,0);
    roofHF(0,3.95,-15,5.8,19,1.7,{swap:true,mat:GW,under:RU,thk:.25,sori:.2});
  
    // ---- 주변 환경(v19 보강): 실제 맥락 지형·이웃·식생·물(K.life — bbox 밖) ----
    { const T=K.T; const L0=K.cur;
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
      const pads=(PD,ry)=>{ if(!PD.length) return; const P=new Float32Array(PD.length*18), C=new Float32Array(PD.length*18), N=new Float32Array(PD.length*18); const c=new TT.Color(); const cs=Math.cos(ry), sn=Math.sin(ry); const PV=['#aaa498','#b4aea2','#a39e94','#bbb5a9','#aea99f'], PK=['#6f8d4d','#7b9858','#66844a']; PD.forEach(([x,z,hw,y,park],i)=>{ c.set(park?PK[i%3]:PV[(i*7)%5]).convertSRGBToLinear(); const Y=y+.09; const q=[[-hw,hw],[hw,hw],[hw,-hw],[-hw,hw],[hw,-hw],[-hw,-hw]]; q.forEach((v,k)=>{ const o=i*18+k*3; P[o]=x+v[0]*cs+v[1]*sn; P[o+1]=Y; P[o+2]=z-v[0]*sn+v[1]*cs; N[o+1]=1; C[o]=c.r; C[o+1]=c.g; C[o+2]=c.b; }); }); const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(C,3)); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:.95})); m.receiveShadow=true; K.life.add(m); }; // v18i: 블록 보도·필지 판 — 사이 바닥이 길로 읽히게
      const ring=(o)=>{ const L=[], PDs=[]; const st=o.step||50, cs=Math.cos(o.ry||0), sn=Math.sin(o.ry||0); for(let a=-o.r1;a<o.r1;a+=st) for(let b=-o.r1;b<o.r1;b+=st){ const x0=a+(E.r()-.5)*st*.25, z0=b+(E.r()-.5)*st*.25; const x=(o.cx||0)+x0*cs+z0*sn, z=(o.cz||0)-x0*sn+z0*cs; const r=Math.hypot(x0,z0); if(r<o.r0||r>o.r1) continue; if(o.keep&&!o.keep(x,z,r)) continue; if(o.clr&&x>-o.clr*.12&&z>-o.clr*.12&&Math.hypot(x,z)<o.clr) continue; if(o.pads!==false){ const px=(o.cx||0)+a*cs+b*sn, pz=(o.cz||0)-a*sn+b*cs; PDs.push([px,pz,st*.41,o.hy?o.hy(px,pz):0,E.r()<.12]); } if(E.r()>(o.fill||.65)) continue;
          const tall=o.tall&&E.r()<o.tall[0]; const gl=tall||E.r()<(o.gp||0); const w=st*(.45+E.r()*.35), d=st*(.45+E.r()*.35); const h=tall?o.tall[1]+E.r()*o.tall[2]:o.h(r,x,z); const pal=gl?(o.gpal||['#b7c5cf','#a3b4c0','#c3cdd4']):o.pal; const rf=!gl&&o.roof?o.roof:null; L.push([x,z,w,d,h,pal[Math.floor(E.r()*pal.length)],o.ry||0,gl?'g':(o.kind||'p'),rf?rf[0]:null,rf?rf[1]:0,rf?rf[2]:0,o.hy?o.hy(x,z):0]); } const out=city(L); pads(PDs,o.ry||0); return out; };
      // 맨해튼 격자: x 방향 블록 길이 bx(애비뉴 간격), z 방향 by(스트리트 간격), 블록마다 남북 두 줄로 필지를 나눔 — o={x0,x1,z0,z1,bx,bz,aw,sw,skip(x,z,w,d)→bool, h(x,z)→높이, pal, gpal, gp}
      const manh=(o)=>{ const L=[]; const bx=o.bx||260, bz=o.bz||80, aw=o.aw||30, sw=o.sw||18; for(let X=o.x0;X<o.x1;X+=bx) for(let Z=o.z0;Z<o.z1;Z+=bz){ const W0=bx-aw, D0=bz-sw; for(const row of [-1,1]){ let x=X-W0/2; while(x<X+W0/2-4){ const w=Math.min(X+W0/2-x,10+E.r()*E.r()*45); const cx=x+w/2, cz=Z+row*D0/4, d=D0/2-(E.r()<.3?E.r()*8:0); x+=w; if(o.skip&&o.skip(cx,cz,w,d)) continue; const h=o.h(cx,cz); if(h<=0) continue; const gl=h>110&&E.r()<(o.gp===undefined?.5:o.gp); const pal=gl?(o.gpal||['#a9b8c3','#9aabb7','#bcc6cc']):(o.pal||['#cbbfa8','#b9a993','#a38f7a','#d8d0c0','#9c8f84','#c4b49c']); L.push([cx,cz+(row>0?-(D0/2-d)/2:(D0/2-d)/2),w-.6,d,h,pal[Math.floor(E.r()*pal.length)],0,gl?'g':'p']); } } } return city(L); };
      // 뷰어의 일반 대지(잔디판·포장판·길·차선)를 이 모형이 떠 있는 동안만 숨김 — site 자식의 visible을 getter로 바꿔(life가 보일 때 false) 첫 프레임·썸네일에서도 적용, 'site' 단계처럼 life가 꺼지면 원래대로 보이고, 다른 모형으로 바뀌면(표식이 life에서 빠지면) 자동으로 원상
      const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
        const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
      return {sky,lplane,lpoly,solid,WATER,city,grid,ring,manh,own}; })();

    // 배경 도우미: rib 길(폴리라인 → 띠, 높이 y 또는 y(x,z)) · LB life 상자(그림자 없음) · LC life 원기둥 · GRV/ASP/LAWN 바닥 재질
    const rib=(m,pts,w,y)=>{ const P=[],U=[],I=[], tm=(m.userData&&m.userData.tm)||6; for(let i=0;i<pts.length;i++){ const a=pts[Math.max(0,i-1)], b=pts[Math.min(pts.length-1,i+1)]; const dx=b[0]-a[0], dz=b[1]-a[1], l=Math.hypot(dx,dz)||1; const nx=-dz/l*w/2, nz=dx/l*w/2, x=pts[i][0], z=pts[i][1]; for(const s of [1,-1]){ const px=x+s*nx, pz=z+s*nz; P.push(px,typeof y==='function'?y(px,pz):y,pz); U.push(px/tm,-pz/tm); } if(i) I.push(2*i-2,2*i,2*i-1, 2*i-1,2*i,2*i+1); }
      const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(P,3)); g.setAttribute('uv',new T.Float32BufferAttribute(U,2)); g.setIndex(I); g.computeVertexNormals(); if(g.attributes.normal.getY(0)<0){ const J=[]; for(let k=0;k<I.length;k+=3) J.push(I[k],I[k+2],I[k+1]); g.setIndex(J); g.computeVertexNormals(); } const me=new T.Mesh(g,m); me.receiveShadow=true; me.castShadow=false; K.life.add(me); return me; };
    const LB=(x,y,z,w,h,d,mat,ry)=>{ K.cur=K.life; const m=K.b(x,y,z,w,h,d,mat,ry); m.castShadow=false; return m; };
    const LC=(x,y,z,r,h,mat,seg,o)=>{ K.cur=K.life; const m=K.c(x,y,z,r,h,mat,seg,o); m.castShadow=false; return m; };
    const GRV=E.tmat(E.masTex(),0xcdbf9e,{tint:0xe2dccd,roughness:.97}); GRV.userData.tm=6;
    const ASP=W.solid(0x55585b,{roughness:.93}), LINE=W.solid(0xe9e7df), CURB=W.solid(0xb9b5ac);
    const AX=(R,n,k,e)=>{ const A=E.axis(R,n,k).concat(e||[]); A.sort((a,b)=>a-b); return A.filter((v,i)=>i===0||v-A[i-1]>.05); }; // 지형 축(가운데 촘촘) + 구멍 모서리 선
    const VIEW=(x,z,r0)=>{ const a=Math.atan2(z,x); return Math.abs(a-.87)<.6&&Math.hypot(x,z)<r0; }; // 눈높이·정면 카메라 쪽 부채꼴(가리지 않게 비움)

    // 교토부 우지(축: +z=동, +x=북): 봉황당은 동쪽 아지이케 연못을 향함 · 경내 동쪽 약 120 m 아래로 우지강(북쪽으로 흐름, 폭 약 100 m, 가운데 다치바나 섬) · 강 건너 아사히야마·우지가미 신사 쪽 숲 언덕 · 북쪽 관음당·우지 다리 · 뒤(서) 박물관 호쇼칸(2001, 땅에 묻힌 낮은 건물) · 남·서 우지 시가지(기와 2층 집, 차 가게) · 배치·높이 개략(추정)
    K.layer(0); E.own();
    const RZ0=118, RZ1=212;
    const hf=(x,z)=>{ if(x>-42&&x<42&&z>-29&&z<47) return -.08; let h=(E.fbm(x*.01,z*.01,2)-.5)*1.5*E.ss((Math.hypot(x,z)-80)/80);
        if(z>RZ0-8&&z<RZ1+8){ const e=Math.min(z-(RZ0-8),(RZ1+8)-z); h=e<8?-3.5*E.ss(e/5):-3.5; }
        h+=(.75+.5*E.ridged(x*.004+1,z*.004))*E.peaks(x,z,[[-200,700,700,420,150,1.3],[500,800,500,400,110,1.3],[-700,560,500,300,95,1.3],[1100,640,600,350,120,1.3],[200,1200,900,500,210,1.2],[-900,1600,900,800,380,1.2],[900,-1500,1200,600,260,1.25],[-1600,-900,800,700,300,1.25]])*(z>RZ1+10?E.ss((z-RZ1-10)/40):E.ss((Math.hypot(x,z)-700)/300));
        return h; };
    const TR=E.terrain(0,0,0,0,AX(3000,180,4.5,[-42,42]),AX(3000,180,4.5,[-29,47,RZ0-8,RZ0,RZ1,RZ1+8]),hf,(x,z,h,ny)=>{ const n=E.fbm(x*.06,z*.06,2);
        if(z>RZ0-8&&z<RZ1+8&&h<-.5) return h<-3?[.6,.58,.52]:[.62+.04*n,.6+.04*n,.52]; // 강둑 돌
        if(h>8) return E.mcol(x,z,h,ny,{far:1200,farW:1600,cliff:.4});
        if(Math.hypot(x-5,z)<110&&!(x>-42&&x<42&&z>-29&&z<47)){ const path=Math.abs(z-60)<3||Math.abs(x+50)<2.5||Math.abs(z+40)<2.5; return path?[.82,.78,.68]:(E.vn(x*.1,z*.1)>.5?[.36+.04*n,.46+.04*n,.27]:[.30+.04*n,.40+.04*n,.24]); } // 경내: 이끼·잔디 + 자갈길
        if(x>-42&&x<42&&z>-29&&z<47) return [.48,.5,.44];
        return [.58+.04*n,.56+.04*n,.5+.03*n]; });
    { const P=[]; for(let x=-3000;x<=3000;x+=50) P.push([x,(RZ0+RZ1)/2]); rib(E.WATER,P,RZ1-RZ0+2,-2.9); }
    // 다치바나 섬(강 가운데 섬) · 우지 다리(북)
    W.lpoly(W.solid(0x6f8456),[[60,150],[260,152],[420,160],[260,174],[60,172]],-1.6); LB(380,-1.2,165,14,2,120,K.col(0x9a8d78,{roughness:.9}));
    // 관음당(북, 가마쿠라) · 종루(남동) · 호쇼칸 박물관(서, 낮게 묻힌 매스 + 잔디 지붕) · 남문·담
    const BLt=[[64,8,14,19,5.2,'#e9e1d2',0,'n','#4a4c4f',4.2,6,TR.h(64,8)],[-58,40,6,6,4.6,'#a8452c',0,'n','#4a4c4f',2.4,3,TR.h(-58,40)],[-52,-58,26,46,3.2,'#cfc8bb',0,'n',null,0,0,TR.h(-52,-58)-.6]];
    W.city(BLt); W.lpoly(W.solid(0x5f7f48),[[-66,-82],[-38,-82],[-38,-34],[-66,-34]],TR.h(-52,-58)+2.65);
    for(const [x0,z0,x1,z1] of [[-110,-95,-110,95],[-110,95,105,95],[-110,-95,105,-95]]) { const L=Math.hypot(x1-x0,z1-z0); LB((x0+x1)/2,TR.h((x0+x1)/2,(z0+z1)/2)-.3,(z0+z1)/2,x0===x1?.6:L,2.1,x0===x1?L:.6,K.col(0xd8cbb0,{roughness:.95})); }
    // 우지 시가지: 회반죽·나무 2층 집 + 짙은 기와 모임·박공 지붕(경내 밖 남·서·북, 강 건너 동쪽 기슭)
    const BL=[]; for(let gx=-1600;gx<1600;gx+=17) for(let gz=-1600;gz<1600;gz+=17){ const x=gx+(E.r()-.5)*4, z=gz+(E.r()-.5)*4; if(Math.abs(x)<120&&z>-110&&z<RZ0) continue; if(z>RZ0-12&&z<RZ1+12) continue; const h0=TR.h(x,z); if(h0>14||Math.hypot(x,z)>1500||E.r()<.33) continue; if(z>RZ1&&E.r()<.5) continue;
      BL.push([x,z,8+E.r()*4,8+E.r()*4,4.5+E.r()*2.5,E.r()<.5?'#e6dfd2':'#b49b80',E.r()*.2,'n',E.r()<.7?'#3f4246':'#56504a',2.2,2.2,h0]); }
    W.city(BL);
    // 숲: 경내 소나무·단풍·벚나무 · 강가 버드나무 · 언덕 삼나무·편백·활엽 혼효림
    E.forest(E.scatter(-110,110,-95,95,7,TR.h,(x,z)=>!VIEW(x,z,140)&&!(x>-44&&x<44&&z>-31&&z<49)&&!(Math.abs(z-60)<5)&&Math.hypot(x-64,z-8)>14&&E.r()<.5,(x,z)=>7+E.r()*5,(x,z)=>E.r()<.55?1:0),{trunks:true,cast:true});
    E.forest(E.scatter(-3000,3000,-3000,3000,16,TR.h,(x,z,h)=>h>6&&E.r()<.92,(x,z,h)=>14+E.r()*8,(x,z)=>E.vn(x*.01,z*.01)<.5?2:0),{trunks:false});
    E.forest(E.scatter(-1600,1600,RZ0-14,RZ1+14,12,TR.h,(x,z,h)=>(z<RZ0-6||z>RZ1+6)&&E.r()<.6,(x,z)=>9+E.r()*3,0),{trunks:false,pal:[null,null,null,null].map(()=>['#7f9c55','#6f8f4a','#8aa860'])});
    W.sky(3400);
    tidy(1);

    K.cur=L0; }
  }});
