__bsigFill({"kinkakuji":function(K){
// 실측(개략): 금각 높이 12.5 m(봉황 포함) · 1층 법수원(신덴풍: 흰 회벽+나무 기둥, 몸체 약 10×8 m + 툇마루) · 2층 조온도(부케풍, 금박) · 3층 구쿄초(선종 불당풍, 금박, 약 5.5 m 각, 화두창)
// 보형(사모) 히노키 판잣지붕·금동 봉황 · 서쪽에 연못으로 내민 낚시정자 소세이(漱清) · 정면(+z=남)이 교코치(鏡湖池)에 바로 닿음 · 연못 섬(아시하라섬·학섬·거북섬)+소나무
    const WD=K.col(0x6b4a2e,{roughness:.85}), WH=K.col(0xf1ede2,{roughness:.95}), GD=K.col(0xe9c552,{metalness:.3,roughness:.42,emissive:0x7a5a12,emissiveIntensity:.5}), RF=K.col(0x4a3d31,{roughness:.9}), RU=K.col(0x3b3028), ST=K.M.stone, DK=K.M.glassW, SO=K.col(0x4f5a4a), RK=K.col(0x7d7a72,{roughness:.95}), GR=K.M.grass, LF=K.M.leaf3;
    // 지붕 높이장(heightfield): 용마루 축=x, E×D 처마 외곽, ye 처마 높이, H 처마→용마루, dt=0 우진각/사모, 0<dt<1 팔작, 1 맞배
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
    const rail=(cx,y,cz,w,d,h,mat,sp)=>{ for(const [x0,z0,x1,z1] of [[-w/2,-d/2,w/2,-d/2],[w/2,-d/2,w/2,d/2],[w/2,d/2,-w/2,d/2],[-w/2,d/2,-w/2,-d/2]]){ const L=Math.hypot(x1-x0,z1-z0), n=Math.max(2,Math.round(L/sp)); const ax=Math.abs(x1-x0)>0; K.b(cx+(x0+x1)/2,y+h-.08,cz+(z0+z1)/2,ax?L+.12:.12,.09,ax?.12:L+.12,mat); K.b(cx+(x0+x1)/2,y+h*.45,cz+(z0+z1)/2,ax?L:.08,.06,ax?.08:L,mat); for(let i=0;i<n;i++){ const t=i/n; K.b(cx+x0+(x1-x0)*t,y,cz+z0+(z1-z0)*t,.09,h-.08,.09,mat); } } };
    const ring=(cx,y,cz,w,d,nx,nz,r,h,mat)=>{ for(let i=0;i<=nx;i++) for(let j=0;j<=nz;j++){ if(i>0&&i<nx&&j>0&&j<nz) continue; K.c(cx-w/2+i*w/nx,y,cz-d/2+j*d/nz,r,h,mat,10); } };
    const pine=(x,y,z,h)=>{ K.c(x,y,z,.12,h*.55,K.M.trunk,6); for(let k=0;k<3;k++) K.c(x,y+h*(.33+k*.2),z,h*(.3-k*.07),h*.3,LF,8,{r2:.05}); };
    const phoenix=(x,y,z)=>{ K.c(x,y,z,.12,.5,GD,8); K.c(x,y+.5,z,.22,.4,GD,8,{r2:.1}); K.b(x,y+.7,z,.28,.3,.9,GD); K.b(x,y+.95,z+.4,.14,.3,.3,GD); K.b(x,y+.85,z,1.7,.05,.5,GD); K.b(x,y+.75,z-.65,.12,.08,.8,GD); };
    // ---- 0: 기단·연못·1층(법수원) ----
    K.layer(0);
    K.b(0,0,-.2,14,.6,11.6,ST); K.b(0,.6,-.2,12.8,.25,10.8,WD); // 석단 + 툇마루 바닥(연못 쪽 z=5.2까지)
    const F1=.85; ring(0,F1,0,10,8,5,4,.14,2.95,WD);
    K.b(0,F1,0,10,2.95,8,WH); K.b(0,F1,4.03,5.9,2.95,.14,DK); for(const s of [-1,1]) K.b(s*4,F1+.9,4.03,1.6,1.5,.12,DK); K.b(0,F1+2.55,0,10.3,.22,8.3,WD); // 흰 회벽 몸체 + 남면 열린 칸(어둡게)
    for(let i=0;i<3;i++) K.b(-2+i*2,F1+2.95,4.6,1.75,.07,1.1,WD); // 들어올린 시토미도(격자 덧문)
    for(const s of [-1,1]) for(let j=0;j<2;j++) K.b(s*5.03,F1+.5,-2.5+j*2.4,.1,1.6,1.5,DK);
    K.b(0,F1,-4.03,8,1.6,.1,DK);
    rail(0,F1,-.2,12.6,10.6,.6,WD,1.3);
    // 소세이(漱清): 서쪽으로 연못에 내민 낚시정자
    K.b(-8.4,.6,2.2,3.6,.25,3.2,WD); for(const [px,pz] of [[-9.9,.9],[-9.9,3.5],[-7.2,.9],[-7.2,3.5]]){ K.c(px,0,pz,.1,.6,WD,6); K.c(px,F1,pz,.1,2.2,WD,8); }
    rail(-8.4,F1,2.2,3.5,3.1,.55,WD,1.1); roofHF(-8.4,3.05,2.2,5.2,4.8,.9,{mat:RF,under:RU,thk:.18,sori:.1,ridge:false});
    // 교코치(거울 연못) — 남쪽 전면, 섬과 바위, 소나무
    const POND=[[7.2,5.3],[13,6.5],[20,10.5],[24,18],[22,27],[14,33],[2,36],[-10,35],[-20,31],[-27,24],[-27,14],[-22,7],[-15,2.5],[-11,-.6],[-6.4,-.6],[-6.4,5.3]];
    K.ex(POND,.06,SO,[0,-.02,0]); K.ex(POND,.04,K.M.water,[0,.05,0]);
    for(let i=0;i<POND.length;i++){ const [ax,az]=POND[i], [bx,bz]=POND[(i+1)%POND.length]; if(ax>-7&&ax<8&&az<6&&bz<6) continue; for(const t of [.2,.65]){ const px=ax+(bx-ax)*t, pz=az+(bz-az)*t; K.c(px,-.05,pz,.55+.3*((i*7+Math.round(t*10))%3),.45+.2*((i*3)%2),RK,5,{r2:.35}); } }
    K.ex([[-19,17],[-13,15.5],[-7,17],[-5.5,20.5],[-8,24],[-14,25],[-19.5,22]],.5,GR,[0,.0,0]); // 아시하라섬
    for(const [px,pz,h] of [[-15.5,19,5.5],[-9.5,18.5,4.6],[-12,22.5,3.6]]) pine(px,.5,pz,h);
    for(const [px,pz,r,h] of [[-19.5,18,1.0,.9],[-6,19.5,.9,.8],[-10,25,.8,.7],[7,18,1.3,.6],[8.5,19,.7,1.0],[14,27,1.3,.6],[15,28.5,.8,1.1],[-2,31,1.1,.5],[19,13,.9,.9]]) K.c(px,-.1,pz,r,h,RK,5,{r2:r*.6});
    pine(7.5,.5,18.2,3.2); pine(14.2,.4,27.6,3.6);
    for(const [px,pz,h] of [[13,1,6],[19,5,5],[-15,-3,6.5],[-25,9,5],[27,12,5.5],[-24,34,6],[22,36,5],[5,38.5,5.5]]) pine(px,0,pz,h);
    // ---- 1: 1층 지붕 + 2층(조온도, 금박) ----
    K.layer(1); roofHF(0,3.85,0,16,14,2.4,{mat:RF,under:RU,thk:.3,sori:.25,ridge:false});
    const F2=4.35; K.b(0,F2-.1,0,11,.35,9,WD); K.b(0,F2,0,9,2.75,7,GD); ring(0,F2,0,9,7,5,4,.11,2.75,GD);
    for(let i=0;i<5;i++) K.b(-3.6+i*1.8,F2+.55,3.52,1.4,1.5,.1,DK); for(const s of [-1,1]) for(let j=0;j<2;j++) K.b(s*4.52,F2+.6,-1.8+j*2.2,.1,1.4,1.3,DK); for(let i=0;i<4;i++) K.b(-2.7+i*1.8,F2+.6,-3.52,1.3,1.4,.1,DK); K.b(0,F2+.1,3.52,1.1,2.2,.12,K.col(0x2a1e14));
    K.b(0,F2+2.55,0,9.3,.2,7.3,GD); rail(0,F2,0,11.2,9.2,.75,GD,1.15);
    // ---- 2: 2층 지붕 + 3층(구쿄초, 금박·화두창) ----
    K.layer(2); roofHF(0,7.1,0,14,12,2.2,{mat:RF,under:RU,thk:.28,sori:.25,ridge:false});
    const F3=7.6; K.b(0,F3-.1,0,7.4,.3,7.4,WD); K.b(0,F3,0,5.5,2.6,5.5,GD); ring(0,F3,0,5.5,5.5,3,3,.1,2.6,GD);
    for(const [px,pz,w,d] of [[0,2.78,.9,.1],[0,-2.78,.9,.1],[2.78,0,.1,.9],[-2.78,0,.1,.9]]){ K.b(px,F3+.6,pz,w,1.0,d,DK); K.b(px,F3+1.6,pz,w>d?.55:.1,.35,w>d?.1:.55,DK); }
    for(const s of [-1,1]){ K.b(s*1.7,F3+.3,2.78,.9,1.9,.1,DK); K.b(2.78,F3+.3,s*1.7,.1,1.9,.9,DK); }
    K.b(0,F3+2.4,0,5.9,.2,5.9,GD); rail(0,F3,0,7.5,7.5,.7,GD,1.05);
    // ---- 3: 사모지붕(보형) + 봉황 ----
    K.layer(3); roofHF(0,10.2,0,10.6,10.6,2.8,{mat:RF,under:RU,thk:.3,sori:.3,ridge:false}); K.c(0,12.8,0,.35,.45,RF,8,{r2:.2}); phoenix(0,13.2,0);
  }});
