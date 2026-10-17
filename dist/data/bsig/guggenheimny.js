__bsigFill({"guggenheimny":function(K){
// 실측(개략): 대로툰다 바닥 지름 ~27 → 상부 ~39 m, 높이 28 m(기단 드럼 + 나선 띠 4단 + 유리 돔) · 띠는 실제처럼 나선(한 바퀴에 한 단 상승) · 띠 사이 좁은 연속 띠창(어둡게) · 띠 밑면은 바깥으로 내민 처마
// 모니터(소로툰다) 지름 ~16 m 3단, 북쪽(-x) · 5번가(+z) 쪽 2층 연결동(수평 띠창) · 뒤(-z) 1992 증축 타워 10층 석회암 격자
    const Wh=K.col(0xece7db,{roughness:.88}), Wd=K.col(0xdad4c7,{roughness:.9}), SL=K.col(0x3b3d40,{roughness:.5,metalness:.2}), GW=K.M.glassW, GL=K.M.glass, LS=K.col(0xd6ccb4,{roughness:.85}), AL=K.M.alu, PV=K.M.pave;
    const RX=9,RZ=0, MX=-15,MZ=5; const NT=4, BH=3.7, SLT=.7, P=BH+SLT, Y0=5.4, R0=13.9, DR=1.15, TP=1.25; // 나선: 바퀴 수·띠 높이·틈·피치·시작 높이·시작 반지름·한 바퀴당 반지름 증가·띠 하나의 바깥 기울기
    K.layer(0);
    K.b(2,0,0,70,.05,40,PV); K.b(2,0,17.6,70,.15,5,K.col(0xc9c4ba)); // 보도
    K.c(RX,0,RZ,13.3,4.6,Wh,72); K.b(RX,0,RZ+12.6,8,3.8,1.0,GW); K.b(RX,3.8,RZ+13.6,9.5,.45,2.6,Wh); // 1층 드럼 + 입구 유리·캐노피
    K.c(RX,4.6,RZ,14.7,.8,Wh,72); // 2층 수평 띠(허리) — 연결동과 이어짐
    K.b(-4,4.6,7,14,3.2,10,Wh); K.b(-4,6.2,12.05,13,.9,.12,GW); K.b(-4,4.4,7,14.4,.25,10.4,Wd); // 연결동(수평 슬릿창)
    for(const x of [-9.5,1.5]) K.c(x,0,11,.3,4.6,Wh,12); K.b(-4,0,8,11,4.6,.3,GW); // 연결동 아래 입구
    // 나선 띠(헬릭스): 바퀴 i, 각 u(0→1), 높이 v
    const pos=(a,r,y)=>[RX+r*Math.sin(a),y,RZ-r*Math.cos(a)];
    for(let i=0;i<NT;i++){ K.layer(1+i); const yb=u=>Y0+(i+u)*P, rb=u=>R0+(i+u)*DR;
      const last=i===NT-1, bh=u=>last?BH+P*(1-u):BH; K.surf((u,v)=>pos(u*Math.PI*2,rb(u)+v*TP,yb(u)+v*bh(u)),96,2,Wh); // 띠 바깥면(위로 벌어짐, 마지막 바퀴는 윗선이 수평)
      if(!last) K.surf((u,v)=>pos(u*Math.PI*2,rb(u)+TP-.95,yb(u)+BH+v*SLT),96,1,SL); // 틈(연속 띠창)
      K.surf((u,v)=>pos(u*Math.PI*2,rb(u)-1.0+v*1.0,yb(u)),96,1,Wd); // 띠 밑면 처마
      if(!last) K.surf((u,v)=>pos(u*Math.PI*2,rb(u)+TP-.95+v*.95,yb(u)+BH),96,1,Wd); // 띠 윗면 턱
    }
    // 나선 시작·끝 막음(뒤쪽) · 꼭대기 링 · 유리 돔 + 방사 리브 12
    K.layer(1); K.b(RX,Y0-1.2,RZ-R0+.3,.4,BH+1.4,2.4,Wh); 
    K.layer(NT+1); const YT=Y0+NT*P+BH, RT=R0+NT*DR+TP; K.c(RX,YT,RZ,RT+.2,1.0,Wh,72); K.c(RX,YT+1,RZ,9.8,.4,AL,48); K.dome(RX,YT+1.3,RZ,9.5,3.6,GL,{cap:1});
    { const r=9.5,h=3.6,RR=(r*r+h*h)/(2*h),th=Math.asin(r/RR); for(let i=0;i<12;i++){ const a=i*Math.PI/6; for(let k=0;k<4;k++){ const t0=th*(1-k/4), t1=th*(1-(k+1)/4), r0=Math.sin(t0)*RR, r1=Math.sin(t1)*RR, y0=YT+1.3+(Math.cos(t0)-Math.cos(th))*RR, y1=YT+1.3+(Math.cos(t1)-Math.cos(th))*RR; const rm=(r0+r1)/2; K.b(RX+Math.cos(a)*rm,(y0+y1)/2-.08,RZ-Math.sin(a)*rm,r0-r1+.1,.18,.18,AL,a); } } K.c(RX,YT+1.3+h-.3,RZ,.7,.5,AL,12); }
    // 모니터(소로툰다) — 위로 벌어지는 3단
    K.layer(0); K.c(MX,0,MZ,7.4,4.6,Wh,56); K.b(MX,0,MZ+7.3,5,3.2,.3,GW);
    K.layer(1); K.c(MX,4.6,MZ,7.9,.5,Wh,56); K.c(MX,5.1,MZ,7.5,3.3,Wh,56,{r2:8.4}); K.c(MX,8.4,MZ,7.6,.5,SL,56);
    K.layer(2); K.c(MX,8.9,MZ,8.2,3.3,Wh,56,{r2:9.2}); K.c(MX,12.2,MZ,8.4,.5,SL,56); K.layer(3); K.c(MX,12.7,MZ,9.0,2.6,Wh,56,{r2:9.6}); K.c(MX,15.3,MZ,9.8,.6,Wh,56); K.c(MX,15.9,MZ,5.5,.8,Wh,48); K.dome(MX,16.7,MZ,5,1.3,GL,{cap:1});
    // 1992 증축 타워(뒤쪽) — 석회암 격자 창
    K.layer(0); K.b(-7,0,-17,34,2.2,15,LS); for(let f=0;f<10;f++){ K.layer(Math.min(7,1+f)); const y=2.2+f*4; K.b(-7,y,-17,34,4,15,LS);
      for(let i=0;i<8;i++) K.b(-7-14.5+i*4.1,y+1.0,-9.45,2.2,2.2,.12,GW); for(let i=0;i<3;i++) K.b(10.05,y+1.0,-21+i*4.5,.12,2.2,2.2,GW); }
    K.layer(7); K.b(-7,42.2,-17,34.6,.6,15.6,Wd); K.b(-14,42.8,-19,8,3,6,LS);
    // 거리 요소: 화단 벽·가로수
    K.layer(0); K.b(11,0,14.6,20,.8,.5,Wh); K.b(-21,0,14.6,8,.8,.5,Wh); for(const x of [-28,-10,28]) K.tree(x,19.5,7);
  }});
