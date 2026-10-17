__bsigFill({"louvreabu":function(K){
// 실측(개략): 돔 지름 180 m, 가장자리 높이 약 10 m · 정점 약 38 m(추정) · 두께 약 7 m 격자(바깥 스테인리스 4겹 + 안 알루미늄 4겹 별 무늬) · 기둥 4개(110 m 간격, 건물 안에 숨김)
// 아래: 흰 전시 상자 55개(높이 6~14 m, 추정)가 골목·수로를 사이에 두고 기단 위에 — 바다가 돔 아래까지 들어옴 · 남쪽(+z) 진입 광장
    const WH=K.col(0xf3f1ec,{roughness:.85}), WH2=K.col(0xe9e6df,{roughness:.9}), PV=K.col(0xd9d4ca,{roughness:.9}), ST=K.col(0xaeb3b8,{metalness:.75,roughness:.35}), ST2=K.col(0xc4c9ce,{metalness:.7,roughness:.3}), SHD=K.col(0x7d838a,{metalness:.65,roughness:.35,transparent:true,opacity:.55}), GW=K.M.glassW;
    const RD=90, Y0=10, H=28, RS=(RD*RD+H*H)/(2*H), YC=Y0+H-RS; // 돔: 구 반지름 RS, 중심 높이 YC
    const yd=r=>YC+Math.sqrt(Math.max(0,RS*RS-r*r));
    const hash=(a,b)=>{ let h=(a*73856093)^(b*19349663); h=Math.imul(h^(h>>>13),1274126177); return ((h^(h>>>16))>>>0)/4294967296; };
    K.layer(0);
    // 바다 · 기단(섬) · 수로
    K.water(0,.12,-20,330,300);
    K.b(0,0,-6,176,1.4,176,PV); K.b(0,0,100,120,1.4,40,PV); K.b(0,1.4,112,70,.2,30,K.col(0xcfc8bb,{roughness:.9})); K.b(-110,0,-30,46,1.4,110,PV); // 기단(바다 위 섬) + 남쪽 진입 광장 + 서쪽 갤러리 기단
    K.water(0,1.42,-6,8,176); K.water(0,1.42,-30,176,7); K.water(-60,1.42,30,40,7); K.water(55,1.42,40,50,7); // 안으로 들어온 바닷물(수로)
    // 전시 상자 "메디나": 격자 + 흔들림, 높이는 돔 아래 들어가도록
    for(let i=0;i<10;i++) for(let j=0;j<9;j++){ const r1=hash(i,j), r2=hash(j+9,i+3), r3=hash(i*3+1,j*5+2); if(r3<.1) continue; const gx=-104+i*19+9.5, gz=-86+j*19+9.5; const w=8+r1*10, d=8+r2*10, x=gx+(r3-.5)*3, z=gz+(r1-.5)*3; const rr=Math.hypot(x,z); if(rr>96&&x>-70) continue; const hmax=rr<RD?yd(rr)-2.2:8.5; const h=Math.min(hmax,5+r2*9+(rr<45?3:0)); if(Math.abs(x)<5.5&&z<82) continue; if(Math.abs(z+30)<5.5) continue; K.b(x,1.4,z,w,h,d,(i+j)%3?WH:WH2); if(r1>.5) K.b(x+w*.28,1.4+h,z-d*.2,w*.4,2.0,d*.45,WH2); if(h>7&&r2<.5) K.b(x,2.2,z+d/2+.05,w*.5,2.6,.1,GW); }
    K.b(-30,1.4,-62,30,12,22,WH); K.b(28,1.4,10,26,13,20,WH2); K.b(-46,1.4,20,22,11,26,WH); // 큰 전시 상자 3
    // 돔: 반투명 캡 + 가장자리 링 + 별 무늬 격자(3방향 × 2겹, 겹이 30° 어긋남)
    K.layer(1);
    for(const [x,z] of [[-55,-55],[55,-55],[-55,45],[55,45]]) K.b(x,.6,z,4,Y0-.6,4,ST); // 기둥 4(실제론 건물 속에 숨음)
    K.dome(0,Y0,0,RD,H,SHD,{cap:1}); // 반투명 그늘 캡
    const strip=(ang,off,dr,mat,hgt)=>{ const nx=Math.cos(ang), nz=Math.sin(ang), tx=-nz, tz=nx; const half=Math.sqrt(Math.max(0,RD*RD-off*off)); if(half<4) return; K.surf((u,v)=>{ const t=(u*2-1)*half; const x=nx*off+tx*t, z=nz*off+tz*t; const r=Math.hypot(x,z); const y=YC+Math.sqrt(Math.max(0,(RS+dr)*(RS+dr)-r*r))+(v-.5)*hgt; return [x,y,z]; },Math.max(6,Math.round(half/4)),1,mat); };
    for(let L=0;L<2;L++){ const dr=L?2.4:-1.2, sp=L?6.5:5.5, base=L?Math.PI/6:0; for(let k=0;k<3;k++){ const ang=base+k*Math.PI/3; for(let off=-RD+sp/2;off<RD;off+=sp) strip(ang,off,dr,L?ST2:ST,L?.45:.55); } }
    K.c(0,Y0-1.3,0,RD+.5,2.6,ST,96,{hollow:1}); // 가장자리 두꺼운 테
  }});
