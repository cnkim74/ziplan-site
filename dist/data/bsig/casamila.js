__bsigFill({"casamila":function(K){
// 실측(개략): 모서리 대지 — 그라시아 거리(+z) 28 m + 모따기 20 m + 프로벤사 거리(+x) 28 m = 파사드 ~76 m · 깊이 ~42 m
// 층: 지상 5 + 중2층 3.2 + 주층 4 + 4개층 3.6 + 다락 3 = 29.6 m · 크림색 석회암이 수평(진폭 ~1 m)·수직(층선이 오르내림)으로 물결침 · 창은 둥근 모서리의 깊은 개구부(1.2 m) · 연철 발코니(검은 해초 모양)
// 다락은 작은 아치창 줄 · 중정 2(타원·원) · 옥상: 계단탑 6(십자가 1) · 투구 굴뚝 떼(비틀린 몸통) · 환기탑 · 뒤 두 면은 이웃과 맞댄 공유벽
    const T=K.T, ST=K.col(0xd8cbb0,{roughness:.92}), ST2=K.col(0xe3d8c0,{roughness:.9}), ST3=K.col(0xcbbda1,{roughness:.95}), IR=K.col(0x26231f,{roughness:.55,metalness:.4,transparent:true,opacity:.85}), GW=K.col(0x6f7a83,{roughness:.2,metalness:.5}), PW=K.col(0xd6d0c4,{roughness:.95}), PV=K.M.pave, DK=K.col(0x2a2622,{roughness:1});
    const P=[[-22,20],[6,20],[20,6],[20,-22]], SL=[28,19.8,28], TL=75.8, A=1.0, LAM=9.5, REC=1.25, NU=240, TOP=29.6;
    const cl=v=>Math.max(0,Math.min(1,v));
    const pt=s=>{ s=Math.max(0,Math.min(TL,s)); let i=0; while(i<2&&s>SL[i]){ s-=SL[i]; i++; } const a=P[i],b=P[i+1],t=s/SL[i]; return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]; };
    const fr=s=>{ const p=pt(s),q=pt(s+1.3),r=pt(s-1.3); let tx=q[0]-r[0],tz=q[1]-r[1]; const l=Math.hypot(tx,tz)||1; tx/=l; tz/=l; return {x:p[0],z:p[1],nx:-tz,nz:tx}; };
    const wave=(s,y)=>A*Math.sin(2*Math.PI*s/LAM+y*.22)+.25*Math.sin(2*Math.PI*s/3.7+1.1+y*.5);
    const dy=(s,y)=>.38*Math.sin(2*Math.PI*s/12.5+.7+y*.28)*cl(y/6); // 층선의 상하 물결(지상층은 수평)
    // 창 베이 중심: 그라시아 8 · 모따기 5 · 프로벤사 8
    const BAYS=[]; for(let i=0;i<8;i++) BAYS.push(1.75+i*3.5); for(let i=0;i<5;i++) BAYS.push(28+1.98+i*3.96); for(let i=0;i<8;i++) BAYS.push(47.8+1.75+i*3.5);
    const near=s=>{ let b=BAYS[0],d=1e9,k=0; BAYS.forEach((c,i)=>{ const q=Math.abs(s-c); if(q<d){ d=q; b=c; k=i; } }); return {s:b,d,k}; };
    const FLS=[{y:0,h:5,sill:0,wh:4.0,ww:2.3,rd:1.2},{y:5,h:3.2,sill:.6,wh:1.7,ww:1.9,rd:.5},{y:8.2,h:4,sill:.1,wh:2.8,ww:2.0,bal:1,rd:.6},{y:12.2,h:3.6,sill:.1,wh:2.4,ww:1.9,bal:1,rd:.55},{y:15.8,h:3.6,sill:.1,wh:2.4,ww:1.9,bal:1,rd:.55},{y:19.4,h:3.6,sill:.1,wh:2.4,ww:1.9,bal:1,rd:.55},{y:23,h:3.6,sill:.1,wh:2.3,ww:1.9,bal:1,rd:.55},{y:26.6,h:3,sill:.8,wh:1.3,ww:1.0,attic:1,rd:.5},{y:29.6,h:1.0}];
    const GATES=[4,17];
    const winAt=(F,s)=>{ if(F.attic){ const sp=1.78, k=Math.round((s-.9)/sp), c=.9+k*sp; return {s:c,d:Math.abs(s-c),k,ww:1.0,wh:1.3,rd:.5}; } const b=near(s); const gate=F.y===0&&GATES.includes(b.k); return {s:b.s,d:b.d,k:b.k,ww:gate?3.8:F.ww,wh:gate?4.6:F.wh,rd:gate?1.6:F.rd}; };
    const band=F=>K.surf((u,v)=>{ const s=u*TL, y=F.y+v*F.h, o=fr(s); let rec=0; if(F.ww){ const w=winAt(F,s); const whd=w.wh-w.rd*Math.pow(w.d/(w.ww/2),2); const hx=cl((w.ww/2+.1-w.d)/.36); const vy=cl((y-(F.y+F.sill)+.08)/.25)*cl((F.y+F.sill+whd-y+.08)/.3); rec=REC*hx*vy; } const off=wave(s,y)-rec; return [o.x+o.nx*off,y+dy(s,y),o.z+o.nz*off]; },NU,Math.max(4,Math.round(F.h/.22)),ST);
    const lip=(y,out,th)=>K.surf((u,v)=>{ const s=u*TL,o=fr(s); const w=wave(s,y); const k=v<.45?Math.sin(v/.45*Math.PI/2):1, dyv=v<.45?.12*(v/.45):.12-(v-.45)/.55*th; const off=w+k*out; return [o.x+o.nx*off,y+dy(s,y)+dyv,o.z+o.nz*off]; },NU,6,ST2);
    const shapeH=(outer,holes,h,mat,y)=>{ const sh=new T.Shape(); outer.forEach(([px,pz],i)=>i?sh.lineTo(px,-pz):sh.moveTo(px,-pz)); holes.forEach(hp=>{ const p=new T.Path(); hp.forEach(([px,pz],i)=>i?p.lineTo(px,-pz):p.moveTo(px,-pz)); sh.holes.push(p); }); const g=new T.ExtrudeGeometry(sh,{depth:h,bevelEnabled:false}); g.rotateX(-Math.PI/2); const m=new T.Mesh(g,mat); m.position.set(0,y,0); m.castShadow=true; m.receiveShadow=true; K.cur.add(m); return m; };
    const CA={x:-7,z:4,rx:7.5,rz:5.5}, CB={x:9,z:-7,r:4.5};
    const ell=n=>Array.from({length:n},(_,i)=>{ const a=i/n*Math.PI*2; return [CA.x+CA.rx*Math.cos(a),CA.z+CA.rz*Math.sin(a)]; });
    const cir=n=>Array.from({length:n},(_,i)=>{ const a=i/n*Math.PI*2; return [CB.x+CB.r*Math.cos(a),CB.z+CB.r*Math.sin(a)]; });
    const outline=(y,inset)=>{ const o=[]; for(let s=0;s<=TL;s+=.5){ const f=fr(s), w=wave(s,y)-inset; o.push([f.x+f.nx*w,f.z+f.nz*w]); } o.push([20-inset,-22.3],[-22.3,-22.3],[-22.3,20-inset]); return o; };
    K.layer(0);
    K.b(-1,-.12,0,56,.12,56,PV); K.b(-1,0,24.6,56,.14,7,K.col(0xcac4b8)); K.b(24.6,0,-1,7,.14,56,K.col(0xcac4b8)); // 보도
    for(const x of [-16,-4,8]) K.tree(x,26.8,8); for(const z of [-14,-2]) K.tree(26.8,z,8);
    K.b(-22.3,0,-1.2,.6,TOP+1.0,42.2,PW); K.b(-1.2,0,-22.3,42.2,TOP+1.0,.6,PW); // 공유벽
    K.surf((u,v)=>{ const a=u*Math.PI*2; return [CA.x+CA.rx*Math.cos(a),v*TOP,CA.z+CA.rz*Math.sin(a)]; },40,1,ST3);
    K.surf((u,v)=>{ const a=u*Math.PI*2; return [CA.x+v*(CA.rx-.1)*Math.cos(a),.05,CA.z+v*(CA.rz-.1)*Math.sin(a)]; },40,1,PV);
    K.surf((u,v)=>{ const a=u*Math.PI*2; return [CB.x+CB.r*Math.cos(a),v*TOP,CB.z+CB.r*Math.sin(a)]; },36,1,ST3); K.c(CB.x,0,CB.z,CB.r-.1,.05,PV,36);
    FLS.forEach((F,fi)=>{ K.layer(Math.min(fi,7)); band(F);
      if(fi>0&&fi<8) shapeH(outline(F.y,2.2),[ell(32),cir(24)],.3,ST3,F.y-.3);
      if(fi>0) lip(F.y,fi===8?.55:.5,.42);
      if(!F.ww) return;
      if(F.attic){ for(let s=.9;s<TL-.5;s+=1.78){ const o=fr(s), ry=Math.atan2(o.nx,o.nz); const off=wave(s,F.y+1.4)-REC+.3; K.b(o.x+o.nx*off,F.y+F.sill+dy(s,F.y+F.sill),o.z+o.nz*off,.85,1.3,.3,GW,ry); } return; }
      BAYS.forEach((sb,k)=>{ const w=winAt(F,sb); const ym=F.y+F.sill+w.wh/2, o=fr(sb), ry=Math.atan2(o.nx,o.nz), yb=F.y+dy(sb,F.y);
        const off=wave(sb,ym)-REC+.35; K.b(o.x+o.nx*off,F.y+F.sill+dy(sb,ym),o.z+o.nz*off,w.ww-.1,w.wh-.1,.4,(F.y===0&&GATES.includes(k))?IR:GW,ry);
        if(F.bal){ const bw=w.ww+1.0+(k%3)*.35, o1=wave(sb,F.y)+.5, o2=wave(sb,F.y)+.92; K.b(o.x+o.nx*o1,yb-.22,o.z+o.nz*o1,bw,.24,1.0,ST2,ry); K.b(o.x+o.nx*o2,yb,o.z+o.nz*o2,bw,.8,.12,IR,ry); }
 });
    });
    // 옥상: 슬래브(중정 구멍) · 난간 띠 · 계단탑 6(십자가) · 투구 굴뚝 떼(비틀린 몸통) · 환기탑
    K.layer(7); shapeH(outline(TOP,.2),[ell(32),cir(24)],.4,ST3,TOP-.35);
    K.surf((u,v)=>{ const s=u*TL,o=fr(s); const off=wave(s,TOP+.6)+.1*Math.sin(s*2.2); return [o.x+o.nx*off,TOP+.6+v*(.9+.35*Math.sin(s*1.3)),o.z+o.nz*off]; },NU,2,ST2); // 물결 난간
    const RY=TOP+.05;
    const stair=(x,z,h,r,cross)=>{ for(let k=0;k<3;k++){ const m=K.c(x,RY+k*h*.2,z,r*(1-.08*k),h*.2,ST2,7); m.rotation.y=k*.4; } K.c(x,RY+h*.6,z,r*.78,h*.25,ST2,9,{r2:r*1.0}); K.c(x,RY+h*.85,z,r*.9,0,ST2,12,{half:1}); if(cross){ K.b(x,RY+h*.85+r*.8,z,.16,1.6,.16,ST2); K.b(x,RY+h*.85+r*.8+1.0,z,.9,.16,.16,ST2); K.b(x,RY+h*.85+r*.8+1.0,z,.16,.16,.9,ST2); } else K.b(x,RY+h*.85+r*.8,z,.2,.5,.2,ST3); };
    [[-17,14,6.5,2.1,1],[-1,13.5,7,2.3,0],[15.5,1.5,6,2.0,1],[-16,-13,6.5,2.1,0],[0,-16,6,2.0,0],[14,-16.5,5.5,1.8,0]].forEach(([x,z,h,r,c])=>stair(x,z,h,r,c));
    const chim=(x,z,h)=>{ for(let k=0;k<3;k++){ const m=K.c(x,RY+k*h*.22,z,.5,h*.22,ST2,6); m.rotation.y=k*.35; } K.c(x,RY+h*.66,z,.62,h*.22,ST2,6,{r2:.42}); K.c(x,RY+h*.88,z,.48,0,ST2,10,{half:1}); K.b(x,RY+h*.88+.1,z,.6,.3,.08,DK); };
    [[-10,16],[-8.4,17.3],[-9.5,14.5],[6,16.5],[7.6,15.1],[5.1,14.8],[18,-7],[17.1,-9],[18.8,-5],[-19.5,-2],[-18.2,-4],[-8,-18.5],[-6.4,-17],[-19.5,-19.5],[7,-19],[14,8.5]].forEach(([x,z],i)=>chim(x,z,3.0+(i%3)*.4));
    const vent=(x,z,h)=>{ for(let k=0;k<3;k++){ const m=K.c(x,RY+k*h*.25,z,.85*(1-.1*k),h*.25,ST2,7); m.rotation.y=k*.5; } K.c(x,RY+h*.75,z,.65,h*.25,ST2,7,{r2:.2}); };
    vent(-20,8,4.8); vent(10,-18,4.4);
  }});
