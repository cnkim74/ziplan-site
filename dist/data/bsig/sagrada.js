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
  }});
