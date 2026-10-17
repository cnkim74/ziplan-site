__bsigFill({"unite":function(K){
// 실측(개략): 137 × 24 m · 높이 56 m · 필로티 7 m 위 두꺼운 "인공 지반" 슬래브 · 주거 17층(층고 2.26 m 모뒬로르) · 발코니 격자 33칸(4.15 m) · 7~8층 상점가 띠(가는 수직 핀)
// 로지아 옆벽 원색 패널 · 옥상: 환기탑·엘리베이터 탑·체육관 볼트·유치원·무대 벽·인공 산 · +z 가 정면(긴 입면)
    const C=K.M.conc, C2=K.col(0xc3bdb3,{roughness:.95}), GW=K.M.glassW, PV=K.M.gravel; const W=137,D=24,PH=7,BS=1.6,FH=2.26,NF=17,NB=33,BAY=W/NB,Y0=PH+BS,YT=Y0+NF*FH;
    const COL=[0xc8372d,0x2a5fa8,0xe2b53a,0x3f8f4c,0xf1ede4].map(h=>K.col(h,{roughness:.8}));
    K.layer(0);
    K.b(0,0,0,W+6,.04,D+8,PV);
    for(let i=0;i<17;i++) for(const z of [-5.5,5.5]) K.b(-66.4+i*8.3,0,z,1.3,PH,4.2,C,0,{taper:1}); // 거대 필로티(위로 벌어짐)
    K.b(0,PH,0,W,BS,D,C); K.b(0,PH-.5,0,W-4,.5,D-6,C); // 인공 지반 슬래브
    K.b(60,0,0,3,PH,3,C); K.b(-60,0,-8,6,PH,4,C); // 코어·입구 홀
    for(const s of [-1,1]){ const zf=s*D/2;
      K.layer(1); K.b(0,Y0,s*(D/2-1.55),W,NF*FH,.1,GW); // 로지아 안쪽 유리
      for(let i=0;i<=NB;i++) K.b(-W/2+i*BAY,Y0,s*(D/2-.8),.32,NF*FH,1.6,C); // 세로 칸막이
      for(let f=0;f<NF;f++){ K.layer(1+Math.min(6,Math.floor(f/3))); const y=Y0+f*FH, shop=f===7||f===8;
        K.b(0,y-.12,s*(D/2-.8),W,.14,1.6,C); // 로지아 바닥
        if(!shop) K.b(0,y,s*(D/2-.15),W,.95,.3,C2); // 난간
        else if(f===7) for(let i=0;i<=W/2;i++) K.b(-W/2+i*2,y,s*(D/2-.45),.16,FH*2,.9,C); // 상점가 핀(2개 층)
        if(!shop) for(let i=0;i<NB;i++){ const k=(f*7+i*3)%9; if(k!==0&&k!==5) continue; const h=k===0&&f<NF-1&&f!==6?FH*2:FH; K.b(-W/2+i*BAY+.22,y,s*(D/2-.85),.1,h,1.5,COL[(f+i)%5]); } }
    }
    K.layer(1); K.b(W/2+.3,Y0,0,.7,NF*FH,D,C); K.b(-W/2-.3,Y0,0,.7,NF*FH,D,C); K.b(-W/2-.6,Y0,-5,.2,NF*FH,1.2,GW); // 양끝 벽
    for(let f=0;f<NF;f++){ K.layer(1+Math.min(6,Math.floor(f/3))); K.b(W/2+1.1,Y0+f*FH,2,1.1,.9,3.6,C); K.b(W/2+.7,Y0+f*FH+.9,2,.1,1.2,3.4,GW); } // 남쪽 끝 작은 발코니 줄
    K.layer(7); K.b(0,YT,0,W,1.0,D,C); for(const s of [-1,1]) K.b(0,YT+1,s*(D/2-.2),W,1.2,.4,C); for(const s of [-1,1]) K.b(s*(W/2-.2),YT+1,0,.4,1.2,D,C);
    K.c(-18,YT+1,-3,1.3,9.5,C,28,{r2:2.3}); K.b(-18,YT+10.5,-3,5,.6,.6,C); // 환기탑(위로 벌어지는 깔때기)
    K.b(8,YT+1,2,9,8,6,C); K.b(14,YT+1,-6,5,6,5,C); // 엘리베이터·계단 탑
    K.b(36,YT+1,-2,26,3.2,9.5,C); K.surf((u,v)=>[23+v*26,YT+4.2+4.4*Math.sin(u*Math.PI),-2-4.75*Math.cos(u*Math.PI)],20,1,C); // 체육관 볼트
    K.b(-52,YT+1,3,20,5.5,10,C); K.b(-52,YT+6.5,3,20,.3,10,C2); K.b(-38,YT+1,-5,14,.6,2.2,C); K.b(-45,YT+1,-9,6,1.2,.3,C); // 유치원·놀이 테라스
    K.b(46,YT+1,8,8,6,.6,C); K.c(52,YT+1,-5,3.2,2.4,C,10,{r2:.2}); K.c(58,YT+1,2,2.4,1.8,C,10,{r2:.2}); K.water(30,YT+1.02,8,10,3); // 무대 벽·인공 산·물놀이장
  }});
