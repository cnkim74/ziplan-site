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
  }});
