__bsigFill({"tajmahal":function(K){
// 실측(개략): 흰 대리석 기단 95×95 m 높이 ~7 m(아래 낮은 사암 테라스) · 본당 57 m 모서리 깎인 정사각(벽 ~25 m) · 중앙 피슈타크(이완 아치 틀) ~33 m, 좌우 2단 아치 니치 · 양파 돔 지름 ~20 m 정상 ~73 m · 차트리 4(옥상 모서리) · 미나렛 4(기단 모서리) ~41 m 발코니 3 · 서 모스크·동 자와브(붉은 사암+흰 돔 3) · 앞(+z) 차르바그 정원: 수로·중앙 연못·사이프러스 · 뒤(-z) 야무나 강
    const MB=K.col(0xf5f1e9,{roughness:.55}), MBd=K.col(0xe8e2d6,{roughness:.6}), MBs=K.col(0xd8d1c3,{roughness:.7}), RS=K.col(0x9e5a45,{roughness:.9}), RSl=K.col(0xbd8a70,{roughness:.9}), SAND=K.col(0xc9ad95,{roughness:.95}), DK=K.col(0x2e2a26,{roughness:1}), DK2=K.col(0x4a423a,{roughness:1}), GD=K.col(0xd9b04a,{roughness:.35,metalness:.6}), CY=K.col(0x2f5a36,{roughness:.9}), GRN=K.M.grass, WT=K.M.water;
    const Y0=7.6, F=28.45, C=12, F2=(F-C/2)*Math.SQRT2, H=25.5;
    const W=(lx,lz,ry)=>[lx*Math.cos(ry)+lz*Math.sin(ry),-lx*Math.sin(ry)+lz*Math.cos(ry)];
    const bx=(lx,y,lz,w,h,d,mat,ry)=>{ const [x,z]=W(lx,lz,ry); return K.b(x,y,z,w,h,d,mat,ry); };
    const cc=(lx,y,lz,r,h,mat,seg,o)=>{ const [x,z]=W(lx,lz,ry0); return K.c(x,y,z,r,h,mat,seg,o); }; let ry0=0;
    const archPts=(w,h)=>{ const ys=h-w*.62, P=[[-w/2,0],[-w/2,-ys]]; for(let i=1;i<=8;i++){ const t=i/8; P.push([-w/2*(1-t),-(ys+(h-ys)*Math.pow(t,.55))]); } for(let i=7;i>=1;i--){ const t=i/8; P.push([w/2*(1-t),-(ys+(h-ys)*Math.pow(t,.55))]); } P.push([w/2,-ys],[w/2,0]); return P; };
    const arch=(lx,y,lz,w,h,d,mat,ry)=>{ const [x,z]=W(lx,lz,ry); const m=K.ex(archPts(w,h),d,mat,[x,y,z]); m.rotation.order='YXZ'; m.rotation.set(Math.PI/2,ry,0); return m; };
    const onion=(x,y,z,R,Hh,mat,bul)=>K.surf((u,v)=>{ const a=u*Math.PI*2, t=v; const f=(1+(bul||.2)*Math.sin(Math.PI*Math.pow(t,.8)))*Math.pow(1-Math.pow(t,2.4),.6); const r=Math.max(.03,R*f); return [x+r*Math.cos(a),y+Hh*t,z+r*Math.sin(a)]; },40,22,mat);
    const chhatri=(x,y,z,R,ch,mat)=>{ K.c(x,y,z,R*1.25,.5,mat,8); for(let i=0;i<8;i++){ const a=i*Math.PI/4+Math.PI/8; K.c(x+R*.95*Math.cos(a),y+.5,z+R*.95*Math.sin(a),R*.09,ch,mat,8); } K.c(x,y+.5+ch,z,R*1.2,R*.22,mat,8); K.c(x,y+.5+ch+R*.22,z,R*.85,R*.25,mat,16); onion(x,y+.5+ch+R*.47,z,R*.9,R*1.45,mat,.25); K.c(x,y+.5+ch+R*.47+R*1.4,z,R*.07,R*.55,GD,8,{r2:.02}); };
    const niche=(lx,y,lz,w,h,ry,mat2)=>{ bx(lx,y,lz,w+1.6,h+1.2,.3,mat2||MBs,ry); arch(lx,y+.5,lz-.6,w,h,1.0,DK,ry); };
    // ---- 0: 테라스·기단·정원 ----
    K.layer(0);
    K.b(0,0,-6,190,1.0,112,SAND); // 낮은 사암 테라스(강변)
    K.b(0,1.0,0,95.5,Y0-1.0,95.5,MB); K.b(0,Y0,0,95.9,.4,95.9,MBd); // 흰 대리석 기단
    for(let i=0;i<9;i++) K.b(0,1.0+i*.72,48.0+(9-i)*.55,16,.72,(9-i)*1.1+.1,MB); // 정면 계단
    for(let i=0;i<3;i++) K.b(0,i*.33,57+(3-i)*.6,22,.33,(3-i)*1.2,SAND);
    K.b(0,0,105,170,.25,100,GRN); K.b(0,.25,105,10.5,.5,100,SAND); K.b(0,.75,105,7.6,.3,100,MB); K.water(0,1.07,105,6.2,99); // 정원·수로
    K.b(0,.25,105,27,1.0,27,MB); K.water(0,1.27,105,24,24); for(let i=0;i<5;i++) K.c(0,1.27,88+i*8.5,.25,.9,MB,6); // 중앙 연못·분수
    K.b(0,.25,105,170,.2,5,SAND); for(const s of [-1,1]) K.b(s*45,.25,105,4,.2,100,SAND); K.b(0,.25,156,170,.2,4,SAND);
    for(let i=0;i<11;i++){ const z=60+i*9; if(Math.abs(z-105)<16) continue; for(const s of [-1,1]) K.c(s*11.5,.5,z,1.3,9,CY,7,{r2:.1}); } // 사이프러스
    for(let i=0;i<4;i++) for(const s of [-1,1]){ K.tree(s*32,66+i*24,6); K.tree(s*66,78+i*22,6.5); K.tree(s*50,60+i*30,5); }
    // ---- 1: 본당 몸체(모깎기 팔각) · 피슈타크 · 니치 ----
    K.layer(1);
    const OCT=[[-F,-(F-C)],[-(F-C),-F],[F-C,-F],[F,-(F-C)],[F,F-C],[F-C,F],[-(F-C),F],[-F,F-C]];
    K.ex(OCT,H,MB,[0,Y0,0]); K.ex(OCT.map(p=>[p[0]*1.012,p[1]*1.012]),1.0,MBd,[0,Y0+H,0],{shell:.7}); K.ex(OCT.map(p=>[p[0]*.985,p[1]*.985]),.5,MBd,[0,Y0+H,0]); // 벽 · 난간 · 옥상판
    for(let f=0;f<4;f++){ const ry=f*Math.PI/2; ry0=ry;
      bx(0,Y0,F+.3,21,33,1.6,MB,ry); bx(0,Y0+32.6,F+.3,21.6,.8,2.2,MBd,ry); // 피슈타크 틀(난간 위로 솟음)
      bx(0,Y0+.6,F+1.12,17.6,30,.1,MBd,ry); bx(0,Y0+1.1,F+1.18,15.8,29.0,.06,MBs,ry); // 캘리그래피 띠(이중 테두리)
      arch(0,Y0+1.0,F-.9,14.2,26.5,2.25,DK,ry); // 이완 아치(깊은 그늘)
      arch(0,Y0+1.0,F-.95,8.6,13.5,2.35,DK2,ry); bx(0,Y0+1.0,F+1.42,5.0,8.5,.14,DK,ry); // 안쪽 작은 입구 아치
      for(const s of [-1,1]){ const lx=s*13.4; niche(lx,Y0+1.2,F+.02,4.6,9.6,ry); niche(lx,Y0+13.2,F+.02,4.6,9.6,ry); // 2단 니치
        for(const [qx,qz,yy] of [[s*9.9,F+.3,Y0+33.4],[s*(F-C-.3),F-.5,Y0+H+1.0]]){ cc(qx,yy,qz,.5,4.8,MB,8,{r2:.36}); cc(qx,yy+4.8,qz,.6,.5,MB,8,{half:1}); } } // 굴다스타(소첨탑)
      const ry2=ry+Math.PI/4; niche(0,Y0+1.2,F2+.02,7.0,9.6,ry2); niche(0,Y0+13.2,F2+.02,7.0,9.6,ry2); } // 모깎기 면 2단 니치
    // ---- 2: 드럼·양파 돔·차트리 ----
    K.layer(2);
    K.c(0,Y0+H,0,9.8,7.2,MB,48); K.c(0,Y0+H+6.6,0,10.4,.6,MBd,48); // 드럼
    onion(0,Y0+H+7.2,0,9.9,25.5,MB,.2);
    K.c(0,Y0+H+7.2+25.0,0,.9,1.2,GD,10,{r2:.5}); K.c(0,Y0+H+7.2+26.2,0,.45,6.8,GD,10,{r2:.12}); K.c(0,Y0+H+7.2+33.0,0,.7,.7,GD,10,{half:1}); K.b(0,Y0+H+7.2+33.4,0,1.6,.2,.2,GD); // 금동 첨탑·초승달
    for(const [x,z] of [[-17.4,-17.4],[17.4,-17.4],[-17.4,17.4],[17.4,17.4]]) chhatri(x,Y0+H+1.0,z,3.9,4.2,MB);
    // ---- 3: 미나렛 4(기단 모서리) ----
    K.layer(3);
    for(const [x,z] of [[-43.6,-43.6],[43.6,-43.6],[-43.6,43.6],[43.6,43.6]]){ K.c(x,Y0,z,4.4,2.2,MB,8); K.c(x,Y0+2.2,z,2.7,34.8,MB,24,{r2:1.95});
      for(const [y,r] of [[Y0+13.5,3.6],[Y0+25,3.3],[Y0+37,3.0]]){ K.c(x,y-1.0,z,r-1.0,1.0,MBd,16,{r2:r}); K.c(x,y,z,r,.55,MB,16); K.c(x,y+.55,z,r-.15,.9,MBs,16,{hollow:1}); }
      chhatri(x,Y0+37.6,z,2.1,3.2,MB); }
    // ---- 0: 서 모스크 · 동 자와브(붉은 사암 + 흰 돔 3 + 차트리 4) — 중앙(본당)을 향함 ----
    K.layer(0);
    for(const sx of [-1,1]){ const ry=sx>0?-Math.PI/2:Math.PI/2, cx=sx*84, cz=-6;
      K.b(cx,1.0,cz,24,16,56,RS); K.b(cx,17,cz,25,1.2,57,RSl);
      K.b(sx*72.3,1.0,cz,1.6,23,16,RS); K.b(sx*72.3,24,cz,2.2,.8,16.6,RSl); { const m=K.ex(archPts(9.5,17),1.4,DK,[sx*72.9,2.0,cz]); m.rotation.order='YXZ'; m.rotation.set(Math.PI/2,ry,0); }
      K.b(sx*73.3,1.6,cz,.12,21.5,13.2,MBd); K.b(sx*73.4,2.0,cz,.1,20.5,11.6,RS);
      for(const dz of [-19,19]) for(const y of [2.0,10]){ const m2=K.ex(archPts(4.6,6.8),1.0,DK,[sx*72.0+(sx>0?.9:-.9),y,cz+dz]); m2.rotation.order='YXZ'; m2.rotation.set(Math.PI/2,ry,0); K.b(sx*72.1,y-.3,cz+dz,.1,7.6,6.0,RSl); }
      for(const [dz,r] of [[-19,4.8],[0,6.4],[19,4.8]]){ K.c(cx,17,cz+dz,r,2.6,MB,32); onion(cx,19.6,cz+dz,r,r*2.3,MB,.22); K.c(cx,19.6+r*2.25,cz+dz,.35,3,GD,8,{r2:.08}); }
      for(const [dx,dz] of [[-10,-26],[10,-26],[-10,26],[10,26]]) chhatri(cx+dx,18.2,cz+dz,1.7,2.3,RSl); }
  }});
