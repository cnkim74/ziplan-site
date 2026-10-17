__bsigFill({"barcelona":function(K){
// 개략 치수: 기단 54×17 m 높이 1.3 · 큰 수조 18×11(서, 트래버틴 긴 벽이 뒤를 막음) · 주 지붕 30×17 두께 .25, 크롬 십자 기둥 8개 · 동쪽 끝 작은 수조 6.5×6.5(녹색 대리석 ㄷ자 벽 + 콜베 조각) + 사무실 작은 지붕 · 정면 +z 에서 8단 계단으로 진입
    const TR=K.M.stone.clone(); TR.color.setHex(0xe6dcc6).convertSRGBToLinear(); const WH=K.col(0xf6f5f0,{roughness:.6}), GL=K.col(0xbfd3da,{roughness:.05,metalness:.5,transparent:true,opacity:.3,depthWrite:false}), GG=K.col(0x6f8a84,{roughness:.1,metalness:.6,transparent:true,opacity:.55,depthWrite:false}), CH=K.col(0xe9ecef,{metalness:.95,roughness:.1}), ON=K.col(0xc48b3a,{roughness:.3,metalness:.1}), GM=K.col(0x2e5f49,{roughness:.2,metalness:.1}), PB=K.col(0x5e6660), MK=K.col(0xe9eef0,{roughness:.3,transparent:true,opacity:.85}), DK=K.col(0x1d1d1f,{roughness:.5});
    const y=1.3,h=3.1; const wall=(x,z,w,d,m,hh)=>K.b(x,y,z,w,hh||h,d,m);
    K.layer(0);
    K.b(0,0,0,58,.04,22,K.M.pave);
    // 기단(큰 수조·작은 수조 자리를 비움)
    K.b(-18,0,-7.5,18,y,2,TR); K.b(-18,0,6.5,18,y,4,TR); K.b(-27.5,0,0,1,y,17,TR); K.b(6,0,0,30,y,17,TR);
    K.b(24.5,0,-6,6,y,5,TR); K.b(24.5,0,6,6,y,5,TR); K.b(27.4,0,0,.8,y,17,TR);
    K.b(-18,0,-1,16,.9,11,PB); K.water(-18,1.15,-1,16,11); K.b(24.5,0,0,6,.9,7,PB); K.water(24.5,1.15,0,6,7); // 큰 수조·작은 수조
    for(let i=0;i<8;i++) K.b(-4,0,8.65+.32*i,8,y-.1625*(i+1),.32,TR); // 8단 계단(정면)
    K.c(-13,0,9.5,.07,9,CH,8); // 깃대
    K.layer(1);
    // 트래버틴 긴 벽(큰 수조 뒤 → 주 전시실 뒤) + 수조 옆 벤치
    wall(-1,-8.25,52,.5,TR); wall(-26.7,-1,.6,13,TR,2.6); K.b(-18,y,-7.6,10,.45,.8,TR);
    // 크롬 십자 기둥 8개(2열 × 4)
    for(const x of [-2,5,12,19]) for(const z of [-3.5,3.5]){ K.b(x,y,z,.3,h,.08,CH); K.b(x,y,z,.08,h,.3,CH); }
    // 오닉스 벽(중심) · 녹색 티노스 대리석 벽(동쪽, 작은 수조 ㄷ자) · 젖빛 유리 라이트코트 · 유리벽(투명·회색)
    wall(6,-.5,8,.35,ON);
    wall(16,5.9,12,.35,GM); wall(24.5,-3.65,7,.35,GM); wall(27.6,0,.35,7.6,GM); wall(24.5,3.65,7,.35,GM,h);
    wall(9,-6.6,10,.1,MK); wall(9,-5.2,10,.1,MK); wall(4,-5.9,.1,1.5,MK); wall(14,-5.9,.1,1.5,MK);
    wall(-7,-1,.08,14,GL); wall(3,6.0,12,.08,GL); wall(14,-.5,.08,12,GG); wall(20.5,-1.5,.08,4.5,GL); wall(21,-7,.08,2.5,GL);
    for(let z=-7.5;z<=5.5;z+=2.2) K.b(-7,y,z,.1,h,.06,CH); for(let x=-2.5;x<=8.5;x+=2.2) K.b(x,y,6.0,.06,h,.1,CH); for(let z=-6;z<=5;z+=2.2) K.b(14,y,z,.1,h,.06,CH);
    // 콜베 조각 + 바르셀로나 체어·검은 카펫
    K.b(25.5,y-.1,-1.5,.9,.6,.9,TR); K.c(25.5,y+.5,-1.5,.22,1.5,K.col(0xd2d6d3),10); K.c(25.5,y+2.0,-1.5,.16,.3,K.col(0xd2d6d3),10); K.b(25.9,y+1.5,-1.5,.9,.1,.1,K.col(0xd2d6d3));
    K.b(8,y,2.5,4.5,.03,3,DK); for(const x of [7,9.2]){ K.b(x,y+.05,2.3,.8,.4,.8,K.col(0xf4f1ea)); K.b(x,y+.45,2.65,.8,.45,.1,K.col(0xf4f1ea)); }
    K.layer(2);
    K.b(7,y+h,.5,30,.25,17,WH); K.b(25,y+h,-6.3,5.6,.25,4.4,WH); // 주 지붕(얇은 흰 판) · 동쪽 사무실 작은 지붕
  }});
