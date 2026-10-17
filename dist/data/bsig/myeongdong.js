__bsigFill({"myeongdong":function(K){
// 출처: 종탑 높이 45 m, 성당은 진입로보다 13 m 높은 언덕 위, 1898 프와넬 신부 설계·우리나라 최초의 대규모 고딕 성당, 붉은 벽돌과 먹빛 벽돌의 대조 — 서울시 미디어허브 「명동성당, 알고 보면 더 새롭다」(archives/2000733)
// 추정 치수: 라틴 십자 길이 69 m · 트랜셉트 폭 29 m · 삼랑식(신랑 11 + 측랑 6×2) · 측랑 처마 8 · 신랑 벽 15.5 · 용마루 23 · 종탑 8×8 벽돌 25 + 8각 첨탑 20 = 45 m · 언덕은 6 m 단(13 m를 압축)으로, 앞쪽 넓은 계단과 비탈길
    const T=K.T; const BK=K.M.skinMat('brickR'), GB=K.col(0x8d8b86,{roughness:.9}), SL=K.col(0x454a53,{roughness:.6}), GW=K.M.glassW, DK=K.col(0x2a2420,{roughness:.8}), PV=K.M.pave, ST=K.M.stone, GS=K.M.grass;
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const inst=(geo,mat,items,cast)=>{ if(!items.length) return null; const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),E=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); E.set(0,it[3]||0,0); Q.setFromEuler(E); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; return put(m,cast); };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    const triG=(d)=>{ const sh=new T.Shape(); sh.moveTo(-.5,0); sh.lineTo(.5,0); sh.lineTo(0,.75); sh.closePath(); const g=new T.ExtrudeGeometry(sh,{depth:d,bevelEnabled:false}); g.translate(0,0,-d/2); return g; };
    const HL=6; // 언덕 단 높이
    const NW=11, AW=6, AH=8, NH=15.5, RID=23, TW=8, TH=25, SP=20, ZT=30.5, ZN=11.75, LN=40.5, ZX=-14, ZC=-24.25, ZA=-29;
    const LB=[], LT=[]; const lancet=(x,y,z,w,h,ry)=>{ LB.push([x,y,z,ry,w,h,1]); LT.push([x,y+h,z,ry,w,w,1]); }; // 첨두 창 = 상자 + 뾰족 삼각(인스턴스 2개 메시)
    const BR=[]; // 버트레스·필라스터(인스턴스)
    K.layer(0);
    // 언덕 단(6 m): 윗면 광장 + 앞쪽 넓은 계단 + 양옆 비탈길 · 단 옆면은 돌 옹벽
    K.b(0,0,-2,56,HL,84,ST); K.b(0,HL-.02,-2,54,.1,82,PV); K.b(0,-.02,2,60,.04,96,PV);
    { const n=14; for(let i=0;i<n;i++) K.b(0,0,40+(n-i)*.9+.45,18,HL*(i+1)/n,.9,GB); } // 정면 큰 계단(14단)
    for(const s of [-1,1]) K.b(s*23,-3,55,8,6,30,ST,0,{slope:-.2}); // 양옆 비탈길(경사 블록, 6 m를 30 m에)
    for(const [x,z] of [[-20,22],[20,22],[-22,-8],[22,-8],[-16,-34],[16,-34],[-24,8],[24,8]]){ K.c(x,HL,z,.2,3.6,K.M.trunk,6); const sp=new T.Mesh(new T.SphereGeometry(3.2,10,8),K.M.leaf2); sp.position.set(x,HL+5.8,z); put(sp); } // 언덕 위 나무(줄기가 단 위에서 시작)
    // 몸체: 측랑·신랑·트랜셉트·성가대·후진 (y=HL 위)
    const Y0=HL;
    K.b(0,Y0,ZN,NW,NH,LN,BK); for(const s of [-1,1]) K.b(s*(NW/2+AW/2),Y0,ZN,AW,AH,LN,BK);
    K.b(0,Y0,ZX,29,NH,11,BK); K.b(0,Y0,ZC,NW,NH,9.5,BK); K.b(0,Y0,ZC,NW+2*AW,AH,9.5,BK); K.c(0,Y0,ZA,NW/2+AW,AH,BK,28); K.c(0,Y0,ZA,5.5,NH,BK,20);
    for(const y of [2.2,7.5]) K.b(0,Y0+y,ZN,NW+2*AW+.16,.3,LN+.16,GB); for(const y of [11.2,14.9]) K.b(0,Y0+y,ZN,NW+.16,.3,LN+.16,GB); for(const y of [2.2,7.5,14.9]) K.b(0,Y0+y,ZX,29.16,.3,11.16,GB);
    // 버트레스(측랑 9칸) + 신랑 벽 필라스터 + 측랑 창·고창
    for(const s of [-1,1]) for(let k=0;k<9;k++){ const z=-8.3+k*5, xo=s*(NW/2+AW); BR.push([xo+s*.6,Y0,z,0,1.2,5.2,1.1],[xo+s*.4,Y0+5.2,z,0,.8,2.6,1.0],[s*(NW/2+.25),Y0+AH+1.5,z,0,.5,NH-AH-1.5,.8]); K.b(xo+s*.45,Y0+7.8,z,.9,.6,1.2,GB);
      if(k<8){ const zc=z+2.5; lancet(xo+s*.08,Y0+2.6,zc,1.5,3.4,Math.PI/2*s); lancet(s*(NW/2+.08),Y0+11.6,zc,1.2,2.6,Math.PI/2*s); } }
    // 트랜셉트 끝: 큰 첨두창 + 모서리 버트레스
    for(const s of [-1,1]){ lancet(s*14.58,Y0+5,ZX,3.6,7,Math.PI/2*s); for(const sz of [-1,1]) BR.push([s*14.8,Y0,ZX+sz*4.8,0,1.2,9,1.2],[s*14.2,Y0,ZX+sz*5.9,0,1.2,9,1.2]); lancet(s*14.58,Y0+12.5,ZX,1.2,2.4,Math.PI/2*s); }
    // 후진·회랑 창
    for(let i=-2;i<=2;i++){ const a=i*Math.PI/5.2, nx=Math.sin(a), nz=-Math.cos(a), ry=Math.PI-a; lancet(nx*5.62,Y0+10,ZA+nz*5.62,1.1,3.0,ry); lancet(nx*11.62,Y0+3,ZA+nz*11.62,1.4,3.0,ry); BR.push([nx*11.9,Y0,ZA+nz*11.9,ry,1.0,7.6,1.1]); }
    // 정면 측랑 끝 박공·창, 종탑 몸체·모서리 버트레스·띠
    for(const s of [-1,1]){ K.pedim(s*(NW/2+AW/2),Y0+AH,ZN+LN/2,AW,2.2,.4,BK,0); lancet(s*(NW/2+AW/2),Y0+2.6,ZN+LN/2+.1,1.6,3.6,0); }
    K.b(0,Y0,ZT,TW,TH,TW,BK);
    for(const sx of [-1,1]) for(const sz of [-1,1]) BR.push([sx*(TW/2+.5),Y0,ZT+sz*(TW/2-.6),0,1.0,13,1.2],[sx*(TW/2-.6),Y0,ZT+sz*(TW/2+.5),0,1.2,13,1.0],[sx*(TW/2+.3),Y0+13,ZT+sz*(TW/2-.6),0,.6,9,1.2],[sx*(TW/2-.6),Y0+13,ZT+sz*(TW/2+.3),0,1.2,9,.6]);
    for(const y of [7.3,17.2,24.3]) K.b(0,Y0+y,ZT,TW+.5,.35,TW+.5,GB);
    K.b(0,Y0,ZT+TW/2+.08,4.4,5.2,.24,GB); K.pedim(0,Y0+5.2,ZT+TW/2+.08,4.4,2.6,.24,GB,0); K.b(0,Y0,ZT+TW/2+.16,3.0,4.4,.2,DK); K.pedim(0,Y0+4.4,ZT+TW/2+.16,3.0,1.8,.2,DK,0); // 정문
    lancet(0,Y0+8.6,ZT+TW/2+.1,2.6,6.0,0); lancet(0,Y0+8.6,ZT-TW/2-.1,1.6,4.0,Math.PI);
    for(let q=0;q<4;q++){ const a=q*Math.PI/2, nx=Math.sin(a), nz=Math.cos(a); for(const sx of [-1,1]){ const lx=sx*1.5; lancet(nx*(TW/2+.1)+Math.cos(a)*lx,Y0+18.2,ZT+nz*(TW/2+.1)-Math.sin(a)*lx,1.1,3.6,a); } } // 종루 소리창(루버)
    inst(boxG(1,1,1),BK,BR); inst(boxG(1,1,.16),GW,LB); inst(triG(.16),GW,LT);
    K.layer(1);
    // 지붕: 신랑·성가대 박공, 측랑 경사, 트랜셉트 박공, 회랑 원뿔띠, 후진 원뿔
    K.roofGable(0,Y0+NH,ZN,NW+1.0,LN+.6,RID-NH,SL); K.roofGable(0,Y0+NH,ZC,NW+1.0,10.5,RID-NH,SL); K.roofGable(0,Y0+NH,ZX,29.8,11.8,RID-NH,SL,'x');
    for(const s of [-1,1]) K.b(s*(NW/2+AW/2+.25),Y0+AH+1.45,ZN,LN+.8,.3,AW+.9,SL,Math.PI/2,{slope:-.5*s});
    for(const s of [-1,1]) K.b(s*(NW/2+AW/2+.25),Y0+AH+1.45,ZC,9.6,.3,AW+.9,SL,Math.PI/2,{slope:-.5*s});
    K.c(0,Y0+AH,ZA,12,1.9,SL,28,{r2:9}); K.c(0,Y0+AH+1.9,ZA,9,.2,SL,28); K.c(0,Y0+NH,ZA,6.1,RID-NH,SL,20,{r2:.15});
    K.layer(2);
    K.b(0,Y0+TH-.4,ZT,TW+1.0,.5,TW+1.0,GB); K.c(0,Y0+TH+.1,ZT,4.5,SP-.6,SL,8,{r2:.06}); K.b(0,Y0+TH+SP-.5,ZT,.16,2.2,.16,GB); K.b(0,Y0+TH+SP+.9,ZT,1.1,.16,.16,GB);
    for(const sx of [-1,1]) for(const sz of [-1,1]){ K.b(sx*3.7,Y0+TH,ZT+sz*3.7,1.0,1.0,1.0,BK); K.c(sx*3.7,Y0+TH+1,ZT+sz*3.7,.6,3.4,SL,8,{r2:.03}); }
  }});
