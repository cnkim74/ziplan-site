__bsigFill({"pantheon":function(K){
// 실측(개략): 로툰다 내경 43.3 m, 벽 ~6 m → 외경 r 27.7 · 드럼(벽돌) 높이 30.3 m, 코니스 3단 · 돔 밑 계단식 링 7단 → 납 덮은 완만한 돔, 정점 ~44 m · 오쿨러스 지름 8.9 m
// 포르티코 33.1×15.5 m · 코린트 기둥 16주(전면 8 + 후열 4×2) 높이 14.2 m(화강암 주신 11.9, 지름 1.5) · 엔타블러처 2.8 + 페디먼트 ~7 m · 중간 블록 뒤 두 번째 페디먼트 · 청동문 7.2×4.5 · 앞 로톤다 광장·분수·오벨리스크 · +z=정면(북)
    const BR=K.col(0x8f7460,{roughness:.95}), BR2=K.col(0x846a57,{roughness:.95}), MB=K.col(0xece5d6,{roughness:.65}), TR=K.col(0xd5cab5,{roughness:.85}), RG=K.col(0xb0a594,{roughness:.9}), GR=K.col(0x74716c,{roughness:.45}), GRp=K.col(0x967a72,{roughness:.45}), LD=K.col(0x8e9190,{roughness:.5,metalness:.25}), BZ=K.col(0x4d4027,{roughness:.45,metalness:.55}), DK=K.col(0x2a2521,{roughness:1}), PV=K.col(0xbdb5a8,{roughness:.95}), WT=K.M.water;
    const DC=-11, RO=27.7, DH=30.3, PW=33.1, PD=15.5, ZB=17, ZF=ZB+PD-1.3, FL=.9;
    const capital=(x,y,z,r)=>{ K.c(x,y,z,r*.95,.5,MB,20,{r2:r*1.05}); K.c(x,y+.5,z,r*1.05,.75,MB,20,{r2:r*1.45}); K.b(x,y+1.25,z,r*3.0,.3,r*3.0,MB); for(let q=0;q<4;q++){ const a=q*Math.PI/2; K.b(x+Math.cos(a)*r*1.3,y+.4,z+Math.sin(a)*r*1.3,r*.5,.7,r*.5,MB,a); } };
    const column=(x,z,mat)=>{ K.b(x,FL,z,2.2,.3,2.2,MB); K.c(x,FL+.3,z,.95,.6,MB,20,{r2:.8}); K.c(x,FL+.9,z,.76,11.6,mat,28,{r2:.68}); capital(x,FL+12.5,z,.7); };
    // ---- 0: 광장 · 계단 · 드럼 · 기둥 ----
    K.layer(0);
    K.b(0,-.05,10,96,.05,118,PV);
    for(let i=0;i<3;i++) K.b(0,i*.3,ZB+PD/2+(2-i)*.5,PW+(2-i)*1.4,.3,PD+(2-i)*1.0,TR); // 계단 3단 → 포르티코 바닥 y=.9
    K.c(0,0,DC,RO,DH,BR,96); K.c(0,0,DC,RO+.25,1.2,BR2,96); // 드럼 + 바닥 띠
    for(const [y,h] of [[10.0,.7],[20.2,.7],[DH-.9,.9]]) K.c(0,y,DC,RO+.55,h,TR,96); // 코니스 3단
    for(let i=0;i<10;i++){ const a=Math.PI*.55+i*Math.PI*.1; K.b(DC*0+Math.cos(a)*(RO+.1),5,DC+Math.sin(a)*(RO+.1),2.4,3.6,.5,BR2,-a+Math.PI/2); } // 뒤쪽 벽감(약식)
    K.b(0,0,12.5,PW+1.0,DH,9,BR); K.b(0,DH-.9,12.5,PW+1.6,.9,9.6,TR); // 중간 블록
    K.b(0,FL,ZB+.1,4.6,7.2,.3,BZ); K.b(0,FL+7.2,ZB+.1,6.0,.6,.5,MB); for(const x of [-9.4,9.4]){ K.b(x,FL,ZB+.1,3.6,7.2,.2,DK); K.c(x,FL+7.2-1.8,ZB+.1,1.8,.2,DK,16,{axis:'z'}); } // 청동문·좌우 반원 니치
    for(const x of [-15.9,-11.5,-7.2,7.2,11.5,15.9]) K.b(x,FL,ZB+.2,1.5,12.5,.4,MB); // 뒷벽 필라스터
    const XS=[-15.6,-11.14,-6.68,-2.23,2.23,6.68,11.14,15.6], ZR=[ZF,ZF-5.0,ZF-10.0];
    for(let r=0;r<3;r++) for(let i=0;i<8;i++){ if(r>0&&!(i===0||i===2||i===5||i===7)) continue; column(XS[i],ZR[r],r?GRp:GR); }
    // ---- 1: 엔타블러처·페디먼트·포르티코 지붕 ----
    K.layer(1);
    const EY=FL+12.5+1.55;
    K.b(0,EY,ZF,PW+1.8,2.8,2.2,MB); for(const s of [-1,1]) K.b(s*15.6,EY,(ZF+ZB)/2,2.2,2.8,ZF-ZB,MB); // 아키트레이브·프리즈
    K.b(0,EY+2.8,ZF,PW+2.8,.7,3.0,MB); for(const s of [-1,1]) K.b(s*15.9,EY+2.8,(ZF+ZB)/2,2.8,.7,ZF-ZB,MB); // 코니스
    K.pedim(0,EY+3.5,ZF,PW+2.8,7.0,2.8,MB,0); K.b(0,EY+3.5,ZF-.2,PW-1.0,.5,2.0,DK); // 페디먼트 + 팀파눔 그늘선
    K.roofGable(0,EY+3.5,(ZF+ZB)/2,PW+2.8,ZF-ZB,7.0,LD); // 납 지붕
    K.pedim(0,EY+5.2,ZB+.4,PW+1.0,7.2,.8,TR,0); // 중간 블록의 두 번째 페디먼트
    // ---- 2: 계단식 링 7단 + 완만한 납 돔 + 오쿨러스 ----
    K.layer(2);
    for(let i=0;i<7;i++) K.c(0,DH+i*1.05,DC,26.6-i*1.35,1.05,RG,96);
    K.dome(0,DH+7.3,DC,18.5,6.8,LD,{oculus:4.45});
    K.c(0,DH+7.3+6.8-.4,DC,4.9,.8,BZ,40,{hollow:1}); K.c(0,DH+7.3+6.4,DC,4.45,.05,DK,32); // 오쿨러스 청동 테 + 안쪽 어둠
    // ---- 0: 광장 분수(델라 포르타) + 오벨리스크 ----
    K.layer(0); K.c(0,0,46,6.4,.9,TR,28); K.c(0,.9,46,5.6,.08,WT,28); K.b(0,0,46,3.6,2.6,3.6,TR); K.c(0,2.6,46,.8,8.5,K.col(0xb3a088),4,{r2:.5}); K.c(0,11.1,46,.5,1.0,K.col(0xb3a088),4,{r2:0}); K.c(0,12.1,46,.45,.2,BZ,8,{half:1});
  }});
