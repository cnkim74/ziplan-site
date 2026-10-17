__bsigFill({"louvrepyramid":function(K){
// 실측(개략): 투명 유리 + 알루미늄 마름모 격자 · 대피라미드 밑변 35.4 m 높이 21.6 m(경사 50.7°) · 마름모 유리 격자(모서리와 평행한 사선 2족 + 수평 케이블) · 소피라미드 3(높이 5 m, 북·남·동) · 삼각 수반 7 · 쉴리관 서측 파사드(-z)·리슐리외관(-x) 일부 3층 + 망사르 지붕 · 입구 +z(서)
    const G=K.col(0x9ec2d6,{roughness:.05,metalness:.35,transparent:true,opacity:.42,depthWrite:false}), AL=K.col(0xd4d9de,{roughness:.35,metalness:.6}), LS=K.col(0xdacdb3,{roughness:.85}), LSd=K.col(0xc9bb9f,{roughness:.9}), SL=K.col(0x474c55,{roughness:.6}), GW=K.M.glassW, DK=K.col(0x2a2826,{roughness:.9}), GRN=K.col(0x2b2b2b,{roughness:.4}), PV=K.col(0xbdb8ad,{roughness:.95});
    const T=K.T, UP=new T.Vector3(0,1,0);
    const bar=(a,b,t,mat)=>{ const dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2]; const L=Math.hypot(dx,dy,dz); const m=K.b(0,0,0,t,L,t,mat); m.position.set((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2); m.quaternion.setFromUnitVectors(UP,new T.Vector3(dx/L,dy/L,dz/L)); return m; };
    const archPts=(w,h)=>{ const ys=h-w/2, P=[[-w/2,0],[-w/2,-ys]]; for(let i=1;i<8;i++){ const a=Math.PI*i/8; P.push([-w/2*Math.cos(a),-(ys+w/2*Math.sin(a))]); } P.push([w/2,-ys],[w/2,0]); return P; };
    const arch=(x,y,z,w,h,d,mat,ry)=>{ const m=K.ex(archPts(w,h),d,mat,[x,y,z]); m.rotation.order='YXZ'; m.rotation.set(Math.PI/2,ry||0,0); return m; };
    const B=17.7, PH=21.6, SLn=Math.hypot(B,PH), sa=PH/SLn, ca=B/SLn, kk=SLn/B;
    const pyr=(cx,cz,b,h,edge,lattice)=>{ const sl=Math.hypot(b,h), s_=h/sl, c_=b/sl; const k=sl/b;
      { const m=K.pyr(cx,0,cz,2*b,h,G); m.userData.glass=true; m.castShadow=false; }
      for(let f=0;f<4;f++){ const ry=f*Math.PI/2, cs=Math.cos(ry), sn=Math.sin(ry); const pt=(s,t)=>{ const lx=s, ly=t*s_+.1*c_, lz=b-t*c_+.1*s_; return [cx+lx*cs+lz*sn, ly, cz-lx*sn+lz*cs]; };
        bar(pt(b,0),pt(0,sl),edge,AL); bar(pt(-b,.02),pt(b,.02),edge*.9,AL);
        if(!lattice) continue; const n=b>10?13:4, p=2*b/n;
        for(let i=1;i<n;i++){ const s0=-b+i*p; const u=(b+s0)/2, v=(b-s0)/2; bar(pt(s0,0),pt(s0-u,k*u),.17,AL); bar(pt(s0,0),pt(s0+v,k*v),.17,AL); }
        for(let j=1;j<=(b>10?6:2);j++){ const t=j*k*p, hw=b-t/k; if(hw<.6) continue; bar(pt(-hw,t),pt(hw,t),.14,AL); } } };
    K.layer(0);
    K.b(0,-.08,-8,170,.08,130,PV); // 나폴레옹 마당
    K.b(0,.0,0,31,.08,31,K.col(0x8e9094,{roughness:.9})); K.c(0,.08,0,5.6,.12,K.col(0x6a6c70,{roughness:.9}),32); K.c(0,.2,0,1.0,9,K.col(0xb9bec4,{roughness:.4,metalness:.5}),16); K.surf((u,v)=>{ const a=u*Math.PI*3.2, r=1.6+v*2.6; return [Math.cos(a)*r,.3+u*7.2,Math.sin(a)*r]; },40,2,K.col(0xcfd3d6,{roughness:.6})); // 지하 로비 바닥(회색)·나선 계단·원통 엘리베이터
    pyr(0,0,B,PH,.26,true); K.b(0,0,17.9,3.8,2.9,1.2,DK); K.b(0,2.9,17.9,4.6,.25,2.6,AL); // 대피라미드 + 입구
    for(const [x,z] of [[0,-36],[-36,0],[36,0]]) pyr(x,z,4.1,5,.12,true);
    // 삼각 수반 7(검은 화강암 테두리 + 물)
    const basin=(pts)=>{ const cx=pts.reduce((a,p)=>a+p[0],0)/3, cz=pts.reduce((a,p)=>a+p[1],0)/3; K.ex(pts,.3,GRN,[0,0,0]); const inn=pts.map(([x,z])=>{ const dx=x-cx,dz=z-cz,L=Math.hypot(dx,dz); return [cx+dx*(L-1.2)/L,cz+dz*(L-1.2)/L]; }); K.ex(inn,.06,K.M.water,[0,.26,0]); };
    const R2=(p,ry)=>p.map(([x,z])=>[x*Math.cos(ry)+z*Math.sin(ry),-x*Math.sin(ry)+z*Math.cos(ry)]);
    for(const ry of [Math.PI/2,-Math.PI/2,0]){ basin(R2([[-7,24],[-27,24],[-7,44]],ry)); basin(R2([[7,24],[27,24],[7,44]],ry)); }
    basin([[-11,-24],[-31,-24],[-11,-44]]);
    // 루브르 궁: 쉴리관 서측 파사드(-z) 156 m + 파비용 3 · 리슐리외관(-x) 100 m · 드농관 짧은 토막(+x)
    K.layer(1);
    const mansard=(x,y,z,w,d,ry)=>{ K.b(x,y,z,w,3.6,d-1.2,SL,ry); K.b(x,y+3.6,z,w,1.3,d-3.6,SL,ry); };
    K.b(0,0,-71,132,20,18,LS); mansard(0,20,-71,132,18); K.b(0,19.5,-71,132.6,.6,18.6,LSd);
    for(let i=0;i<11;i++){ const x=-60+i*12; if(Math.abs(x)<17||Math.abs(x)>54) continue; K.b(x,20.4,-62.5,1.6,2.2,1.0,LSd); } // 지붕창
    for(const [x,w,h,rh] of [[0,32,28,12],[-66,22,26,9],[66,22,26,9]]){ K.b(x,0,-71,w,h,22,LS); K.b(x,h-.5,-71,w+.8,.6,22.8,LSd); K.roofPyr(x,h,-71,w*.94,20.7,rh,SL); K.c(x,h+rh-.5,-71,1.6,4,SL,8,{r2:1.0}); }
    arch(0,0,-60.85,8.5,11.5,1.0,DK,0); for(const dx of [-10,10]) arch(dx,0,-60.85,4,7,1.0,DK,0); for(const dx of [-10,0,10]) K.b(dx,15,-59.85,3.2,5,.25,GW); // 파비용 쉴리 통로 아치·창
    for(let i=0;i<7;i++) for(const s of [-1,1]){ const x=s*(20+i*5.5); if(Math.abs(x)>54) continue; arch(x,0,-62+.15-1,3.3,5.6,1.0,DK,0); K.b(x,7.8,-61.85,2.3,4.0,.25,GW); K.b(x,14.2,-61.85,2.1,2.8,.25,GW); K.b(x+2.75*s,7,-61.75,1.1,12.5,.4,LSd); }
    K.b(0,6.6,-61.8,132,.5,.5,LSd); K.b(0,12.9,-61.8,132,.4,.4,LSd);
    K.b(-66,0,-16,18,20,88,LS); mansard(-66,20,-16,18,88,0); K.b(-66,19.5,-16,18.6,.6,88.6,LSd);
    K.b(-66,0,28,22,26,22,LS); K.b(-66,25.5,28,22.8,.6,22.8,LSd); K.roofPyr(-66,26,28,20.7,20.7,9,SL); K.c(-66,34.5,28,1.6,4,SL,8,{r2:1.0});
    K.b(-66,0,-18,22,26,22,LS); K.b(-66,25.5,-18,22.8,.6,22.8,LSd); K.roofPyr(-66,26,-18,20.7,20.7,9,SL); K.c(-66,34.5,-18,1.6,4,SL,8,{r2:1.0}); arch(-55.85,0,-18,8,11,1.0,DK,Math.PI/2); // 파비용 리슐리외 통로
    for(let i=0;i<14;i++){ const z=-54+i*5.6; if(Math.abs(z+18)<12||z>16) continue; arch(-57.0+.15-1,0,z,3.3,5.6,1.0,DK,Math.PI/2); K.b(-56.85,7.8,z,2.3,4.0,.25,GW,Math.PI/2); K.b(-56.85,14.2,z,2.1,2.8,.25,GW,Math.PI/2); K.b(-56.75,7,z+2.8,1.1,12.5,.4,LSd,Math.PI/2); }
    K.b(-56.8,6.6,-16,.5,.5,88,LSd); K.b(-56.8,12.9,-16,.4,.4,88,LSd);
    K.b(66,0,-44,18,20,36,LS); mansard(66,20,-44,18,36,0); K.b(66,19.5,-44,18.6,.6,36.6,LSd);
    for(let i=0;i<5;i++){ const z=-54+i*5.6; arch(57.85,0,z,3.3,5.6,1.0,DK,-Math.PI/2); K.b(56.85,7.8,z,2.3,4.0,.25,GW,Math.PI/2); K.b(56.85,14.2,z,2.1,2.8,.25,GW,Math.PI/2); }
  }});
