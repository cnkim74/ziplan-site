__bsigFill({"hiroshima":function(K){
// 실측(개략): 본관 97×14 m — 2열 필로티(16×2, 간격 6.2, 높이 6 m, 위로 벌어짐) 위 전시층(6.9~13.5 m) · 양 장변 수직 콘크리트 루버 핀 1 m 간격 · 양 끝 콘크리트 벽 · 옥상 두꺼운 슬래브
// 동관(+x, 1994 증축 3층)·서관(-x 국제회의장)과 2층 유리 다리 · 북쪽(+z) 축: 위령비(새들형 콘크리트 아치) → 평화의 불 → 평화의 연못 → (압축 거리) 원폭 돔 방향
    const C=K.M.conc, C2=K.col(0xd4d0c8,{roughness:.9}), FIN=K.col(0xe3e0d8,{roughness:.85}), GW=K.M.glassW, GL=K.M.glass, PV=K.M.pave, GS=K.M.grass, ST=K.M.stone, BR=K.M.skinMat('brickOld');
    const L=97, D=14, PH=6, SH=.9, FH=6.6, Y1=PH+SH, YR=Y1+FH, HL=L/2;
    K.layer(0);
    K.b(0,0,64,150,.05,110,K.col(0x9db26b,{roughness:1})); K.b(0,.05,54,10,.06,108,C2); K.b(0,0,-6,L+16,.1,36,PV); // 잔디 · 축 보행로 · 본관 아래 광장
    for(let i=0;i<16;i++) for(const z of [-4.2,4.2]) K.c(-46.5+i*6.2,0,z,.58,PH,C,14,{r2:.82}); // 필로티 2열
    K.b(0,PH,0,L,SH,D+.8,C); K.b(-20,PH,0,3.2,.08,D-2,C2);
    K.layer(1);
    K.b(0,Y1,0,L-1.2,FH,D-1.4,GW); for(const s of [-1,1]) K.b(s*(HL-.5),Y1,0,1.0,FH,D,C); // 전시층 유리 + 양 끝 벽
    for(let i=0;i<=96;i++) for(const s of [-1,1]) K.b(-48+i*1.0,Y1,s*(D/2+.1),.16,FH,.9,FIN); // 루버 핀(깊은 수직 핀)
    K.layer(2); K.b(0,YR,0,L,.7,D,C); K.b(-12,YR+.7,2,7,1.6,4,C2); // 옥상 슬래브·설비
    // 연결 다리(2층) + 동관·서관
    K.layer(1); for(const s of [-1,1]){ const x0=s*(HL+.5), x1=s>0?58:-56; const xc=(x0+x1)/2, len=Math.abs(x1-x0); K.b(xc,PH+.6,0,len,.35,3.6,C); K.b(xc,PH+.95,0,len-.4,3.0,3.3,GL); K.b(xc,PH+3.95,0,len,.3,3.8,C); K.c(xc,0,-1.2,.4,PH+.6,C,10); }
    for(let f=0;f<3;f++){ K.layer(Math.min(2,f)); K.b(76,f*3.9,0,36,3.9,24,C2); K.b(76,f*3.9+.7,12.06,32,2.4,.12,GW); for(let i=0;i<22;i++) K.b(60+i*1.5,f*3.9,12.2,.14,3.9,.5,FIN); }
    for(let f=0;f<2;f++){ K.layer(Math.min(2,f)); K.b(-72,f*3.9,0,32,3.9,22,C2); K.b(-72,f*3.9+.7,11.06,28,2.4,.12,GW); } K.layer(2); K.b(-72,7.8,0,32.4,.6,22.4,C); K.b(76,11.7,0,36.4,.6,24.4,C); K.b(76,12.3,-4,16,.5,10,C2);
    // 축 위 위령비(새들 아치) · 평화의 불 · 연못 · (압축) 원폭 돔
    K.layer(0);
    const ZM=44; K.b(0,0,ZM,9,.35,13,ST); K.b(0,.35,ZM,1.3,1.0,2.6,ST);
    K.surf((u,v)=>{ const x=(2*u-1)*2.4, z=(2*v-1)*4.4, Hv=3.1+1.0*Math.pow(2*v-1,2); return [x,.35+Hv*(1-Math.pow(2*u-1,2)),ZM+z]; },16,10,C2,{thick:.3});
    K.c(0,0,58,1.6,1.3,C2,16,{r2:2.4}); K.c(0,1.3,58,.45,.7,K.col(0xf2a93b,{emissive:0xff8a00,emissiveIntensity:.9}),8);
    K.b(0,0,82,12,.3,36,C2); K.water(0,.32,82,11,35);
    for(let i=0;i<6;i++) for(const s of [-1,1]) K.tree(s*15,24+i*14,7);
    const ZD=110; K.c(0,0,ZD,5.5,11,BR,16,{hollow:1}); K.c(0,11,ZD,5.6,.6,BR,16); K.dome(0,11.6,ZD,5.0,4.8,K.col(0x6a6e72,{roughness:.5,metalness:.4}),{wire:1}); K.b(0,0,ZD-5.5,8,4,1.0,BR); K.b(-9,0,ZD,8,6,.9,BR);
  }});
