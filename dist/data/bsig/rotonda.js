__bsigFill({"rotonda":function(K){
// 실측(개략): 본체 정사각 22 m · 지하층(기단) 3.6 m · 4면 동일 이오니아 6주 포르티코(폭 12.4 · 깊이 5.2 · 기둥 7 m) + 페디먼트(조각 3) + 계단(폭 9 · 16단) 양옆 경사벽과 조각
// 코니스 12.2 m · 사방 경사 기와지붕 → 드럼 → 낮은 돔 + 랜턴 ≈ 21.5 m · 크림색 회벽 · 기단 돌 · 지붕 적갈색
    const WH=K.col(0xece3cf,{roughness:.9}), WH2=K.col(0xe1d7bf,{roughness:.9}), ST=K.M.stone, RF=K.col(0x9b5a3d,{roughness:.85}), GW=K.M.glassW, DK=K.col(0x3a3128,{roughness:.7}), SC=K.col(0xd8d2c4,{roughness:.8}), GV=K.M.gravel;
    const B=22, PB=3.6, PH=7.0, EN=1.6, CZ=PB+PH+EN, PD=5.2, PWd=12.4;
    K.layer(0);
    K.b(0,-.1,0,70,.1,70,K.M.grass); for(const [x,z] of [[34,-9],[-34,9],[9,-34],[-9,34]]) K.tree(x,z,7);
    K.b(0,0,0,B+1.2,PB,B+1.2,ST); K.b(0,PB,0,B,PH+EN-.9,B,WH); K.b(0,CZ-.9,0,B+.5,.9,B+.5,WH2); // 기단 · 본체 · 코니스
    for(let q=0;q<4;q++){ const a=q*Math.PI/2, c=Math.cos(a), s=Math.sin(a); const Wd=(lx,lz)=>[lx*c+lz*s,-lx*s+lz*c];
      const bb=(lx,y,lz,w,h,d,m,o)=>{ const [x,z]=Wd(lx,lz); return K.b(x,y,z,w,h,d,m,a,o); }, cc=(lx,y,lz,r,h,m,seg,o)=>{ const [x,z]=Wd(lx,lz); return K.c(x,y,z,r,h,m,seg,o); };
      K.layer(0);
      bb(0,0,B/2+PD/2,PWd+.4,PB,PD,ST); // 포르티코 아래 기단 팔
      for(const lx of [-3.6,0,3.6]){ bb(lx,.7,B/2+PD+.03,1.7,1.5,.14,DK); cc(lx,2.2-.85,B/2+PD+.03,.85,.14,DK,16,{axis:'z',rot:a}); } // 기단 아치 개구 3
      for(let k=0;k<16;k++) bb(0,0,B/2+PD+(16-k-.5)*.4,9,(k+1)*.225,.4,ST); // 계단 16단
      for(const sx of [-1,1]){ bb(sx*4.85,0,B/2+PD+3.2,.7,1.6,6.4,WH); bb(sx*4.85,0,B/2+PD+3.2,.7,3.0,6.4,WH,{slope:-.47}); bb(sx*4.85,1.4,B/2+PD+6.9,1.0,.9,1.0,ST); cc(sx*4.85,2.3,B/2+PD+6.9,.32,1.7,SC,10,{r2:.22}); } // 경사벽 · 받침과 조각
      K.layer(1);
      for(let i=0;i<6;i++){ const lx=(i-2.5)*2.25, lz=B/2+PD-.85; bb(lx,PB,lz,.95,.45,.95,WH2); cc(lx,PB+.45,lz,.42,PH-1.0,WH,18,{r2:.35}); bb(lx,PB+PH-.55,lz,1.0,.55,1.0,WH2); }
      for(const sx of [-1,1]){ const lx=sx*5.62, lz=B/2+2.0; bb(lx,PB,lz,.95,.45,.95,WH2); cc(lx,PB+.45,lz,.42,PH-1.0,WH,18,{r2:.35}); bb(lx,PB+PH-.55,lz,1.0,.55,1.0,WH2); }
      bb(0,PB+PH,B/2+PD-.85,PWd+.6,EN,1.3,WH); for(const sx of [-1,1]) bb(sx*5.62,PB+PH,B/2+2.2,1.1,EN,4.8,WH); // 엔타블러처
      bb(0,PB+.02,B/2+PD/2,PWd-.6,.1,PD-.2,ST); // 포르티코 바닥
      { const [x,z]=Wd(0,B/2+PD-.85); K.pedim(x,CZ,z,PWd+.6,2.6,1.3,WH,a); }
      { const [x,z]=Wd(0,B/2+2.3); K.roofGable(x,CZ,z,PWd+.2,PD-.6,2.4,RF,q%2?'x':undefined); }
      for(const [lx,yy] of [[0,CZ+2.6],[-6.2,CZ],[6.2,CZ]]){ cc(lx,yy,B/2+PD-.85,.26,1.6,SC,10,{r2:.18}); cc(lx,yy+1.6,B/2+PD-.85,.26,0,SC,8,{half:1}); } // 페디먼트 위 조각 3
      // 벽 창: 주층(페디먼트 창) · 다락 · 지하 — 포르티코 양옆
      for(const sx of [-1,1]){ const lx=sx*8.2, lz=B/2+.06; bb(lx,PB+1.4,lz,1.5,2.7,.14,GW); bb(lx,PB+1.25,lz,2.1,.18,.3,WH2); { const [x,z]=Wd(lx,lz+.05); K.pedim(x,PB+4.15,z,2.1,.55,.3,WH2,a); } bb(lx,PB+5.9,lz,1.1,1.1,.14,GW); bb(lx,1.3,lz+.6,1.3,1.0,.14,GW); }
      bb(0,PB+.1,B/2+.07,2.2,4.1,.14,DK); for(const sx of [-1,1]) bb(sx*3.4,PB+1.4,B/2+.07,1.5,2.7,.14,GW); for(const lx of [-3.4,0,3.4]) bb(lx,PB+5.9,B/2+.07,1.1,1.1,.14,GW); // 포르티코 안쪽 벽: 문·창
    }
    K.layer(2);
    { const PW2=(B+1.8)*Math.SQRT2/1.05; K.roofPyr(0,CZ,0,PW2,PW2,4.4,RF); } /* roofPyr 는 4각 원뿔이라 변 길이가 w·1.05/√2 → 보정 */ K.c(0,CZ+1.0,0,6.2,3.4,WH,36); K.c(0,CZ+4.4,0,6.6,.5,WH2,36); K.dome(0,CZ+4.9,0,6.3,2.7,RF,{cap:1});
    K.c(0,CZ+7.5,0,1.05,1.7,WH,12); K.c(0,CZ+9.2,0,1.15,0,RF,12,{half:1}); K.b(0,CZ+10.3,0,.1,.9,.1,DK);
    for(const sx of [-1,1]) for(const sz of [-1,1]) K.b(sx*8.3,CZ+.6,sz*8.3,1.2,3.2,1.2,WH2); // 굴뚝 4
  }});
