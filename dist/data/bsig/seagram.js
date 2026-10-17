__bsigFill({"seagram":function(K){
// 실측(개략): 타워 5×3 베이(8.46 m) = 42.3×25.4 m · 필로티·로비 7.3 m + 사무 34층×3.9 + 상부 설비 4층(청동 루버 띠) = 157 m · 파크 애비뉴(+z)에서 30 m 후퇴한 분홍 화강암 광장(보도보다 3단 위) + 반사 수조 2(대리석 턱)
// 청동 I형 멀리언 1.4 m 간격 + 청동 스팬드럴 + 황갈색(토파즈) 유리 · 1층은 필로티 뒤로 물러선 유리 로비 · 트래버틴 코어 · 뒤(-z) 10층 부속동(버슬) + 4층 날개
    const BZ=K.col(0xb8946a,{metalness:.7,roughness:.3}), BZD=K.col(0x66503a,{metalness:.55,roughness:.45}), GL=K.col(0x9c8468,{metalness:.5,roughness:.15}), TR=K.col(0xe8dfc9,{roughness:.8}), GR=K.col(0xcbb0a7,{roughness:.65}), GR2=K.col(0xb99c92,{roughness:.7}), MB=K.col(0xece7dc,{roughness:.45}), GLS=K.M.glass, PV=K.M.pave, LV=K.col(0x7d6749,{metalness:.6,roughness:.5});
    const BAY=8.46, W=5*BAY, D=3*BAY, LH=7.3, FH=3.9, NF=34, NM=4, HW=W/2, HD=D/2, PL=.6, Y1=LH, YT=Y1+NF*FH, YM=YT+NM*FH, MH=YT-Y1, SET=30.5;
    K.layer(0);
    // 광장(분홍 화강암, 3단) · 보도 · 수조 2 · 화단
    K.b(0,-.03,0,80,.03,100,PV); K.b(0,0,HD+SET+6,80,.1,10,K.M.pave); K.b(0,-.05,HD+SET+16,80,.05,10,K.col(0x55575a));
    K.b(0,0,3.3,61,PL,80,GR); for(let i=0;i<3;i++) K.b(0,i*.2,HD+SET+.2+(2-i)*.45,61,.2,.45,GR2);
    for(const s of [-1,1]){ K.b(s*18,PL,HD+15.5,15,.5,8,MB); K.water(s*18,PL+.52,HD+15.5,13.8,6.8); K.b(s*29,PL,HD+8,2.4,.5,30,MB); for(const z of [HD+4,HD+13,HD+22]) K.tree(s*27.5,z,7); }
    for(const s of [-1,1]) K.c(s*22,PL,HD+SET-1.5,.16,8,K.M.alu,8); // 깃대
    // 로비: 필로티 기둥(베이선, 청동 피복) · 후퇴 유리 로비(3×1 베이 안쪽) · 트래버틴 코어 · 캐노피
    for(const x of [-BAY*2,-BAY,0,BAY,BAY*2]) for(const z of [HD-.6,-HD+.6]) K.b(x,PL,z,1.2,LH-PL,1.2,BZD);
    for(const z of [-BAY*.5,BAY*.5]) for(const x of [HW-.6,-HW+.6]) K.b(x,PL,z,1.2,LH-PL,1.2,BZD);
    K.b(0,PL,-1,W-2*BAY+1,LH-PL-.6,D-6,GLS); K.b(0,PL,-1,W-2*BAY+1.2,.08,D-5.8,TR); K.b(0,PL,-3.5,2*BAY+1,LH-PL-.6,BAY*.9,TR); // 로비 유리 · 트래버틴 바닥·코어
    for(const x of [-3.4,0,3.4]) K.b(x,PL,HD-3.05,2.3,3.0,.25,BZD); K.b(0,4.6,HD+1.2,12,.4,7,BZD); for(const x of [-5,5]) K.c(x,PL,HD+4.2,.12,4.1,BZD,8); // 회전문 3 · 입구 캐노피
    K.b(0,LH-.8,0,W+.1,.8,D+.1,BZD); // 2층 바닥 슬래브 가장자리
    // 타워 층: 황갈색 유리(연속) + 청동 스팬드럴 띠
    K.b(0,Y1,0,W,MH,D,GL);
    for(let f=0;f<NF;f++){ K.layer(Math.min(6,1+Math.floor(f/6))); const y=Y1+f*FH; K.b(0,y+FH-1.0,0,W+.08,1.0,D+.08,BZD); }
    // 상부 설비 4층: 청동 루버 띠(수평)
    K.layer(7); K.b(0,YT,0,W-.1,NM*FH,D-.1,BZD); for(let i=0;i<9;i++) K.b(0,YT+.8+i*1.65,0,W+.24,.22,D+.24,BZ); K.b(0,YM,0,W+.3,1.4,D+.3,BZD); K.b(0,YM+1.4,0,W-4,.6,D-4,LV);
    // 청동 I형 멀리언(앞·뒤 6/베이 = 31, 옆 19) — 베이선은 굵게, 모서리 기둥 피복
    K.layer(1); for(let i=0;i<=30;i++){ const x=-HW+i*BAY/6, w=i%6===0?.55:.24; for(const s of [-1,1]) K.b(x,Y1,s*(HD+.2),w,MH,.38,BZ); }
    for(let j=1;j<18;j++){ const z=-HD+j*BAY/6, w=j%6===0?.55:.24; for(const s of [-1,1]) K.b(s*(HW+.2),Y1,z,.38,MH,w,BZ); }
    for(const sx of [-1,1]) for(const sz of [-1,1]) K.b(sx*(HW+.2),LH-.8,sz*(HD+.2),1.0,MH+.8,1.0,BZD);
    // 뒤쪽 부속동(버슬): 10층(타워 폭) + 4층 날개(대지 폭)
    const RD=10, RZ=-HD-RD/2, NR=10, YR=LH+NR*FH;
    K.layer(0); K.b(0,PL,RZ,W,YR-PL,RD,GL); for(let f=0;f<NR;f++){ K.layer(Math.min(6,1+Math.floor(f/2))); const y=Y1+f*FH; K.b(0,y+FH-1.0,RZ,W+.06,1.0,RD+.06,BZD); }
    K.layer(6); K.b(0,YR,RZ,W+.1,1.2,RD+.1,BZD); for(let i=0;i<=30;i+=2) K.b(-HW+i*BAY/6,PL,-HD-RD-.16,.28,YR-PL,.34,BZ);
    const LD=14, LZ=-HD-RD-LD/2, YL=PL+4*FH;
    K.layer(0); K.b(0,PL,LZ,61,YL-PL,LD,GL); for(let f=0;f<4;f++){ K.layer(Math.min(3,1+f)); K.b(0,PL+f*FH+FH-1.0,LZ,61.06,1.0,LD+.06,BZD); }
    K.layer(3); K.b(0,YL,LZ,61.2,1.0,LD+.2,BZD); for(let i=0;i<=20;i++){ const x=-30+i*3; K.b(x,PL,LZ-LD/2-.16,.26,YL-PL,.34,BZ); if(Math.abs(x)>HW+.3) K.b(x,PL,LZ+LD/2+.16,.26,YL-PL,.34,BZ); }
    for(const s of [-1,1]) for(let j=0;j<=4;j++) K.b(s*30.64,PL,LZ-LD/2+j*LD/4,.34,YL-PL,.26,BZ);
    K.layer(1); for(const s of [-1,1]) for(let j=0;j<=6;j++) K.b(s*(HW+.16),PL,-HD-RD+j*RD/6,.34,YR-PL,.26,BZ);
  }});
