__bsigFill({"gilardi":function(K){
// 출처: 대지 10×36 m, 양옆 공유벽 사이 · 길 쪽은 분홍 작은 집 · 복도가 두 동을 이어 자카란다를 둘러싼 파티오를 만듦 — ArchDaily 「Architecture Classics: Gilardi House / Luis Barragán」(2023) · 1976 준공, 바라간 재단 작품 목록
// 추정 치수: 앞 동 10×10 m 3층(10.9 m) · 마당 7.4×14 m · 복도 폭 2.6 m·길이 14 m·높이 3.6 m, 마당 쪽 세로 노란 유리창 8 · 뒤 동 10×12 m 높이 4.4 m(수영장·식당) · 공중에서 보면 복도·뒤 동 지붕을 걷어낸 단면 모형(돌하우스)으로 거리→복도→수영장 순서가 보이게
    const T=K.T; const P=K.col(0xe3478c,{roughness:.9}), P2=K.col(0xd93f82,{roughness:.9}), Y=K.col(0xf2c21c,{roughness:.9}), Y2=K.col(0xe9b418,{roughness:.9}), YF=K.col(0xf1d57a,{roughness:.9}), LI=K.col(0x9b7ccf,{roughness:.9}), WH=K.col(0xf3f0e9,{roughness:.9}), BL=K.col(0x2456c8,{roughness:.85}), RD=K.col(0xd2302a,{roughness:.85}), GY=K.col(0xfff0a0,{emissive:0xffd54a,emissiveIntensity:.55}), GW=K.M.glassW, DK=K.col(0x2b2b2b), NB=K.col(0xd9d2c6,{roughness:1}), NB2=K.col(0xc9c2b6,{roughness:1}), CT=K.col(0xd6c3a2,{roughness:1}), WT=K.M.water, WD=K.col(0x6b4a2e,{roughness:.8}), TR=K.M.trunk, JA=K.col(0x9a7fd0,{roughness:.95}), JA2=K.col(0x8a6fc4,{roughness:.95});
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const W=10; // x -5..5 · z: 앞 동 8..18(거리 +z) · 마당 -6..8 · 뒤 동 -18..-6 · 복도는 동쪽(+x, 공중 시점에서 보이는 쪽)
    K.layer(0);
    K.b(0,-.2,0,W,.2,36,K.M.stone); K.b(0,-.02,0,W+30,.04,52,K.M.pave); K.b(0,0,21.5,42,.12,5,K.col(0xc9c3b8,{roughness:1})); // 바닥 · 보도
    // 이웃: 서쪽 2층 집(공유벽) · 동쪽은 낮은 단층 + 뒷마당(마당·수영장이 가리지 않게)
    K.b(-9.6,0,2,9,6.4,32,NB); K.b(-9.6,6.4,2,9.2,.3,32.2,NB2); for(const z of [12,4,-6]) K.b(-14.12,1.2,z,.1,1.4,1.6,GW,0); K.b(-9.6,4.6,18.02,2.4,1.4,.1,GW);
    K.b(9.8,0,11,9.6,3.4,14,NB2); K.b(9.8,3.4,11,9.8,.25,14.2,NB); K.b(9.8,1.2,18.02,2.6,1.4,.1,GW); K.b(9.8,0,-7,9.6,.05,22,K.M.grass); K.b(5.25,0,-7,.5,2.6,22,NB2); K.tree(11,-10,5);
    // 앞 동 1층(분홍): 현관문 · 차고문 · 거리 쪽 두꺼운 벽
    K.b(0,0,13,W,3.6,10,P); K.b(3.1,0,18.03,1.4,2.7,.08,WD); K.b(-2.0,0,18.03,3.2,2.5,.08,K.col(0xefe8dc,{roughness:.9})); K.b(-2.0,2.5,18.06,3.4,.12,.1,DK);
    // 노란 복도(동쪽, 지붕 없음 = 단면): 노란 벽 · 노란 바닥 · 마당 쪽 벽의 세로 노란 유리창 8
    K.b(4.75,0,1,.5,3.6,14,Y); K.b(2.6,0,1,.4,3.6,14,Y2); K.b(3.7,0,1,1.8,.08,14,YF);
    for(let i=0;i<8;i++) K.b(2.6,.7,-5.2+i*1.75,.44,2.6,.42,GY); // 세로 창(벽을 관통)
    K.b(3.7,3.6,7,2.9,.3,2.2,Y2); K.b(3.7,3.6,-5,2.9,.3,2.2,Y2); // 잘린 지붕 조각(단면 힌트)
    // 안마당: 흙·자갈 바닥, 서쪽 보라 담, 자카란다
    K.b(-1.3,0,1,7.3,.06,14,CT); K.b(-4.85,0,1,.3,7.6,14,LI); K.b(-4.85,7.6,1,.5,.25,14.2,LI);
    K.c(-1.6,0,1.2,.22,4.6,TR,7,{r2:.14}); K.c(-2.1,3.4,1.6,.1,2.6,TR,5,{r2:.06}); K.c(-.9,3.2,.6,.1,2.4,TR,5,{r2:.06});
    { const gs=[]; for(const [x,y,z,r] of [[-1.8,6.6,1.4,2.3],[-.5,6.2,.4,1.8],[-3.2,6.9,2.2,1.8],[-2.1,7.9,.6,1.6],[-.7,7.5,2.4,1.4]]){ const g=new T.SphereGeometry(r,9,7); g.scale(1.25,.7,1.15); g.translate(x,y,z); gs.push(g); }
      let n=0; const G=gs.map(g=>g.toNonIndexed()); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); put(new T.Mesh(g,JA)); } // 자카란다 꽃 덩어리(병합 1메시)
    // 뒤 동(수영장·식당, 높은 1층, 지붕 걷어냄): 흰 벽 · 서쪽 파란 벽 · 물속 빨간 벽 · 물 · 식탁
    K.b(0,0,-17.75,W,4.4,.5,WH); K.b(4.75,0,-12,.5,4.4,12,WH); K.b(-4.75,0,-12,.5,4.4,12,BL); K.b(-2.6,0,-6.25,4.8,4.4,.5,WH); K.b(3.2,3.3,-6.25,3.6,1.1,.5,WH); K.b(3.2,0,-6.22,3.6,3.3,.1,GW);
    K.b(0,0,-12,9,.06,11,K.col(0xe8e2d6,{roughness:.95})); K.b(-1.1,.02,-12.5,7.0,.04,9.6,K.col(0x2d5e8a,{roughness:.6})); K.b(-1.1,.05,-12.5,7.0,.03,9.6,WT); K.b(-1.1,.25,-12.2,.3,4.4,5.4,RD);
    K.b(3.3,.06,-9.5,1.6,.75,2.4,WD); K.b(0,4.4,-16.5,W,.3,3,WH); K.b(0,4.4,-16.5,2.4,.08,2.0,GW); // 뒤쪽 지붕 일부(천창) — 나머지는 걷어냄
    K.layer(1);
    K.b(0,3.6,13,W,3.4,10,P); for(let i=0;i<4;i++) K.b(-3.4+i*2.2,4.3,18.03,.42,2.4,.08,GW); K.b(3.7,4.0,8.02,2.4,2.2,.06,GW); // 2층(침실) 거리 쪽 세로창 4 · 마당 쪽 창
    K.b(3.7,3.6,1,2.9,.2,14,Y2); K.b(4.9,3.8,1,.2,1.0,14,P2); // 복도 위 테라스 난간(얇게)
    K.layer(2);
    K.b(0,7,13,W,3.6,10,P); for(let i=0;i<4;i++) K.b(-3.4+i*2.2,7.7,18.03,.42,2.4,.08,GW); K.b(-2.2,7.4,8.02,2.0,1.8,.06,GW);
    K.b(0,10.6,13,W,.3,10,P2); K.b(0,10.9,17.8,W,.9,.4,P); K.b(0,10.9,8.2,W,.9,.4,P); K.b(-4.8,10.9,13,.4,.9,9.6,P); K.b(4.8,10.9,13,.4,.9,9.6,P); K.b(-2.8,10.9,11,3.2,2.2,3.0,P2); // 옥상 난간 · 계단탑
  }});
