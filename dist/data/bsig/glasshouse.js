__bsigFill({"glasshouse":function(K){
// 실측(개략): 17.1×9.75 m, 높이 3.2, 벽돌 기단 .3, 벽돌 원통 지름 3.0(지붕 위 .6 돌출), 검은 H형강 기둥
    const W=17.1,D=9.75,H=3.2,pl=.3; const BK=K.M.skinMat('brickR').clone(); BK.color.setHex(0xb08274).convertSRGBToLinear(); const DK=K.col(0x1f2022,{metalness:.5,roughness:.4}), GL=K.M.glass, WD=K.M.wood;
    K.layer(0);
    K.b(0,0,0,W+.9,pl,D+.9,BK); K.b(0,-.02,0,W+8,.04,D+8,K.M.grass); K.b(0,pl,0,W-.3,.03,D-.3,K.M.skinMat('brickD'));
    K.layer(1);
    K.b(0,pl+.03,0,W-.2,H,D-.2,GL);
    // 기둥(모서리 + 장변 1/3 지점) · 멀리언 · 문틀(각 면 중앙) · 바닥 강철 실
    for(const x of [-W/2+.1,-W/6,W/6,W/2-.1]) for(const z of [-D/2+.1,D/2-.1]) K.b(x,pl,z,.18,H,.18,DK);
    for(const z of [-D/2+.1,D/2-.1]) for(const x of [-W/3,W/3,-.55,.55]) K.b(x,pl,z,.08,H,.14,DK);
    for(const x of [-W/2+.1,W/2-.1]) for(const z of [-.55,.55,-D/2+.1+D/4,D/2-.1-D/4]) K.b(x,pl,z,.14,H,.08,DK);
    for(const yy of [pl,pl+H-.08]){ for(const z of [-D/2+.1,D/2-.1]) K.b(0,yy,z,W-.1,.08,.12,DK); for(const x of [-W/2+.1,W/2-.1]) K.b(x,yy,0,.12,.08,D-.1,DK); }
    // 벽돌 원통(욕실·벽난로) — 지붕 위로 돌출
    K.c(3.6,pl,-.6,1.5,H+.3+.6,BK,28);
    // 가구: 주방 카운터, 식탁, 거실(바르셀로나 체어·러그), 침실 칸막이 장·침대, 이젤
    K.b(-6,pl+.03,-3.5,3.6,.9,.65,WD); K.b(-6,pl+.93,-3.5,3.7,.05,.75,K.col(0xe9e4da)); K.b(-6,pl+.03,2.2,1.8,.74,1.0,WD);
    K.b(-1,pl+.04,.6,4.2,.02,3.2,K.col(0xb8ab93)); K.b(-1.3,pl+.06,1.6,2.0,.42,.9,K.col(0x3a2a22,{roughness:.5})); for(const x of [-2.2,-.4]) K.b(x,pl+.06,-.6,.8,.4,.8,K.col(0x3a2a22,{roughness:.5}));
    K.b(-1.3,pl+.06,.3,1.1,.4,.7,K.col(0x2a2a2a,{metalness:.4,roughness:.3}));
    K.b(6.3,pl+.03,.8,.5,1.8,3.6,WD); K.b(7.3,pl+.03,-2.4,2.0,.48,1.6,K.col(0xeeeae2)); K.b(1.2,pl+.03,-3.2,.08,1.7,1.2,K.col(0x8a6a48));
    K.layer(2);
    K.b(0,pl+H,0,W,.3,D,DK); K.b(0,pl+H+.3,0,W-.4,.03,D-.4,K.M.roofFlat);
  }});
