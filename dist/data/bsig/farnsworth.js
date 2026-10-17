__bsigFill({"farnsworth":function(K){
// 실측(개략): 바닥·지붕판 23.5×8.8 m, 바닥 1.6 m 띄움, 기둥 8개(6.7 m 간격) 판 바깥쪽, 유리 구간 16.8 m(동쪽), 포치 6.7 m(서쪽), 테라스 16.8×6.7 m(높이 .75)
    const W=23.5,D=8.8,lift=1.6,ts=.38,H=2.85, Wh=K.M.white, TR=K.M.stone, GL=K.M.glass, WD=K.M.wood;
    const top=lift+ts, ceil=top+H, roofT=ceil+ts;
    K.layer(0);
    // 테라스(낮은 판) + 기둥 + 두 번의 계단
    const tx0=-14.6,tx1=2.2,tz0=4.7,tz1=11.4; K.b((tx0+tx1)/2,.75,(tz0+tz1)/2,tx1-tx0,ts,tz1-tz0,Wh); K.b((tx0+tx1)/2,.75+ts,(tz0+tz1)/2,tx1-tx0-.2,.03,tz1-tz0-.2,TR);
    for(const x of [-10.05,-3.35]) for(const z of [tz0-.1,tz1+.1]) K.b(x,0,z,.2,.75+ts,.14,Wh);
    for(let i=0;i<5;i++){ K.b(-8.4,.19*(i+1)-.08,tz1+.2+(4-i)*.36,3.0,.08,.36,TR); } K.b(-8.4,0,tz1+1.2,.1,.75,.1,Wh); K.b(-8.4,.45,tz1+1.2,.1,.08,1.9,Wh);
    for(let i=0;i<3;i++){ K.b(-8.4,1.13+.22*(i+1)-.08,5.2-i*.36,3.0,.08,.36,TR); }
    // 본채 기둥 8개(판을 바깥에서 집음)
    for(const x of [-10.05,-3.35,3.35,10.05]) for(const z of [-D/2-.1,D/2+.1]) K.b(x,0,z,.2,roofT,.14,Wh);
    K.b(0,lift,0,W,ts,D,Wh); K.b(0,top,0,W-.16,.03,D-.16,TR); // 바닥판(흰 C형강 테두리 + 트래버틴)
    K.layer(1);
    // 유리 상자(동쪽 16.8 m) + 흰 멀리언
    const gx0=-5.05,gx1=W/2; K.b((gx0+gx1)/2,top+.03,0,gx1-gx0,H,D-.2,GL);
    for(let i=0;i<=10;i++){ const x=gx0+i*(gx1-gx0)/10; for(const z of [-D/2+.1,D/2-.1]) K.b(x,top,z,.08,H,.1,Wh); }
    for(let j=1;j<3;j++){ const z=-D/2+.1+j*(D-.2)/3; K.b(gx1-.05,top,z,.1,H,.08,Wh); K.b(gx0,top,z,.1,H,.08,Wh); }
    K.b(gx0,top,0,.1,H,D-.2,GL); K.b(-8.4,top,D/2-.1,1.0,H,.06,GL); // 서쪽 유리벽 + 포치 쪽 출입문 유리
    // 코어(프리마베라 목재) + 벽난로 굴뚝
    K.b(2.5,top+.03,-1.6,7.4,2.3,2.6,WD); K.b(2.5,top+2.33,-1.6,7.2,.12,2.4,K.col(0xf1ede6));
    // 가구: 침대·식탁·소파·주방 카운터
    K.b(9.6,top+.03,-1.2,2.0,.45,1.7,K.col(0xeeeae2)); K.b(9.6,top+.48,-1.2,2.0,.12,1.7,K.col(0xd8cfc2)); K.b(-2.5,top+.03,1.6,1.8,.72,.9,WD); K.b(5,top+.03,2.2,2.2,.4,.9,K.col(0x3b3b3b,{roughness:.5}));
    K.b(3.5,top+.03,-3.9,6,.9,.6,K.col(0x2c2c2c,{roughness:.4})); K.b(3.5,top+.9,-3.9,6.1,.05,.7,K.col(0xe8e4dc));
    K.layer(2);
    K.b(0,ceil,0,W,ts,D,Wh); K.b(0,roofT,0,W-.3,.04,D-.3,K.M.roofFlat); K.b(1.6,roofT,-1.2,.6,.5,.6,K.col(0x3a3a3a));
  }});
