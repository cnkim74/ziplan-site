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
      // ---- 주변 환경(S5): 높이장 지형·숲·물·이웃 매스(K.life — bbox 밖) · 뷰어 기본 바닥/소품 숨김 ----
    {
    const T=K.T; const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const inst=(geo,mat,items,cast,grp,fit)=>{ if(!items.length) return null; if(fit) geo=geo.clone(); const m=new T.InstancedMesh(geo,mat,items.length); m.frustumCulled=false; const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),Eu=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); Eu.set(it[7]||0,it[3]||0,it[8]||0); Q.setFromEuler(Eu); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; if(fit){ if(!geo.boundingBox) geo.computeBoundingBox(); const gb=geo.boundingBox.clone(), bb=new T.Box3(); for(let i=0;i<items.length;i++){ m.getMatrixAt(i,M4); bb.union(gb.clone().applyMatrix4(M4)); } geo.boundingBox=bb; geo.boundingSphere=bb.getBoundingSphere(new T.Sphere()); } if(grp){ m.castShadow=!!cast; m.receiveShadow=true; grp.add(m); return m; } return put(m,cast); };
    const bx=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const merge=(geos,mat,cast,grp)=>{ if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); const m=new T.Mesh(g,mat); if(grp){ m.castShadow=!!cast; m.receiveShadow=true; grp.add(m); return m; } return put(m,cast); };
    const cylG=(r,h,seg,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r*.9:r2,r,h,seg||10); g.translate(0,h/2,0); return g; };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    // ---- 배경·바닥(v15): 캔버스 질감 · 높이장 지형(K.life — bbox 밖) · 인스턴스 숲 · 뷰어 기본 바닥 숨김 ----
    const E=(()=>{ const TT=T; let sd=131; const r=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
      const C=(typeof window!=='undefined')?(window.__kTex15||(window.__kTex15={})):{};
      const tex=(key,px,draw)=>{ if(C[key]) return C[key]; if(typeof document==='undefined') return null; const cv=document.createElement('canvas'); cv.width=cv.height=px; const g=cv.getContext('2d'); let s=31; const rr=()=>{ s=(s*16807)%2147483647; return s/2147483647; }; draw(g,px,rr); const t=new TT.CanvasTexture(cv); t.wrapS=t.wrapT=TT.RepeatWrapping; t.encoding=TT.sRGBEncoding; t.anisotropy=8; return C[key]=t; };
      // 막돌·다듬돌 석축(2 m 한 장) — 돌 크기·색이 제각각, 줄눈 어둡게
      const wallTex=(key,base,tones,rowH,wMin,wMax)=>tex(key,512,(g,N,rr)=>{ g.fillStyle=base; g.fillRect(0,0,N,N); let y=0; while(y<N){ let h=Math.round(rowH*(.7+rr()*.6)); if(N-y<rowH*.6) h=N-y; let x=-rr()*wMax; while(x<N){ const w=wMin+rr()*(wMax-wMin); const j=()=>(rr()-.5)*12; g.fillStyle=tones[Math.floor(rr()*tones.length)]; for(const ox of [0,-N,N]){ g.beginPath(); g.moveTo(ox+x+4+j(),y+3+j()); g.lineTo(ox+x+w*.5+j(),y+2+j()); g.lineTo(ox+x+w-4+j(),y+4+j()); g.lineTo(ox+x+w-3+j(),y+h*.5+j()); g.lineTo(ox+x+w-4+j(),y+h-3+j()); g.lineTo(ox+x+w*.45+j(),y+h-2+j()); g.lineTo(ox+x+3+j(),y+h-4+j()); g.lineTo(ox+x+2+j(),y+h*.5+j()); g.closePath(); g.fill(); g.fillStyle='rgba(255,255,255,.07)'; g.fillRect(ox+x+6,y+5,w-14,3); } x+=w; } y+=h; } for(let i=0;i<5000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.09)':'rgba(30,28,24,.12)'; g.fillRect(rr()*N,rr()*N,1.6,1.6); } for(let i=0;i<40;i++){ g.fillStyle='rgba(70,90,50,.10)'; g.beginPath(); g.arc(rr()*N,rr()*N,6+rr()*18,0,7); g.fill(); } });
      const masTex=()=>tex('mas15',512,(g,N,rr)=>{ g.fillStyle='#cdbf9e'; g.fillRect(0,0,N,N); const cs=['#bfae88','#dacfb4','#ae9d77','#9c8d6f','#c8b997']; for(let i=0;i<7000;i++){ g.fillStyle=cs[Math.floor(rr()*cs.length)]; const z=rr()<.85?1.2:2.4; g.fillRect(rr()*N,rr()*N,z,z); } });
      const tmat=(t,hex,o)=>{ const oo=Object.assign({},o||{}); delete oo.tint; const m=new TT.MeshStandardMaterial(Object.assign({color:t?0xffffff:hex,map:t||null,roughness:.95},oo)); m.color.convertSRGBToLinear(); if(t&&o&&o.tint) m.color.setHex(o.tint).convertSRGBToLinear(); return m; };
      const axis=(R,n,k,c)=>{ const L=[]; for(let i=0;i<=n;i++){ const t=-1+2*i/n; L.push((c||0)+R*Math.sinh(k*t)/Math.sinh(k)); } return L; };
      const terrain=(x0,x1,z0,z1,nx,nz,hf,cf,hole)=>{
        const ax=(a0,a1,n,e)=>{ const L=[]; for(let i=0;i<=n;i++) L.push(a0+(a1-a0)*i/n); if(e) e.forEach(v=>{ if(v>a0&&v<a1) L.push(v); }); L.sort((a,b)=>a-b); return L.filter((v,i)=>i===0||v-L[i-1]>.01); };
        const XS=Array.isArray(nx)?nx:ax(x0,x1,nx,hole&&[hole[0],hole[1]]), ZS=Array.isArray(nz)?nz:ax(z0,z1,nz,hole&&[hole[2],hole[3]]); const W=XS.length, H=ZS.length, n=W*H; const Y=new Float32Array(n), P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3);
        for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, x=XS[i], z=ZS[j]; Y[k]=hf(x,z); P[k*3]=x; P[k*3+1]=Y[k]; P[k*3+2]=z; }
        const lc=v=>v<.04045?v*.0773993808:Math.pow(v*.9478672986+.0521327014,2.4);
        for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, i0=Math.max(0,i-1), i1=Math.min(W-1,i+1), j0=Math.max(0,j-1), j1=Math.min(H-1,j+1); const hx=(Y[j*W+i1]-Y[j*W+i0])/(XS[i1]-XS[i0]), hz=(Y[j1*W+i]-Y[j0*W+i])/(ZS[j1]-ZS[j0]); const L=Math.sqrt(hx*hx+1+hz*hz); N[k*3]=-hx/L; N[k*3+1]=1/L; N[k*3+2]=-hz/L; const v=cf(P[k*3],P[k*3+2],Y[k],1/L); Cc[k*3]=lc(v[0]); Cc[k*3+1]=lc(v[1]); Cc[k*3+2]=lc(v[2]); }
        const I=[]; for(let j=0;j<H-1;j++) for(let i=0;i<W-1;i++){ if(hole){ const cx=(XS[i]+XS[i+1])/2, cz=(ZS[j]+ZS[j+1])/2; if(cx>hole[0]&&cx<hole[1]&&cz>hole[2]&&cz<hole[3]) continue; } const a=j*W+i, b=a+1, c=a+W, d=c+1; I.push(a,c,b,b,c,d); }
        const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(Cc,3)); g.setIndex(new TT.BufferAttribute(new Uint32Array(I),1)); g.computeBoundingSphere();
        const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:1})); m.receiveShadow=true; m.castShadow=false; K.life.add(m);
        const bs=(A,v)=>{ let lo=0, hi=A.length-2; if(v<=A[0]) return 0; if(v>=A[hi+1]) return hi; while(lo<hi){ const md=(lo+hi+1)>>1; if(A[md]<=v) lo=md; else hi=md-1; } return lo; };
        m.h=(x,z)=>{ const i=bs(XS,x), j=bs(ZS,z); const u=Math.min(1,Math.max(0,(x-XS[i])/(XS[i+1]-XS[i]))), v=Math.min(1,Math.max(0,(z-ZS[j])/(ZS[j+1]-ZS[j]))); const a=Y[j*W+i], b=Y[j*W+i+1], c=Y[(j+1)*W+i], d=Y[(j+1)*W+i+1]; return (a*(1-u)+b*u)*(1-v)+(c*(1-u)+d*u)*v; }; return m; };
      const mergeG=gs=>{ const G=gs.map(g=>g.index?g.toNonIndexed():g); let n=0; for(const g of G) n+=g.attributes.position.count; const P=new Float32Array(n*3), N=new Float32Array(n*3); let o=0; for(const g of G){ P.set(g.attributes.position.array,o*3); N.set(g.attributes.normal.array,o*3); o+=g.attributes.position.count; } const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); return g; };
      const crownG=[ (()=>{ const a=new TT.IcosahedronGeometry(.5,1); a.scale(1,.78,1); a.translate(0,.62,0); const b=new TT.IcosahedronGeometry(.3,0); b.translate(.22,.78,.1); return mergeG([a,b]); })(),
        (()=>{ const a=new TT.IcosahedronGeometry(.5,0); a.scale(1.15,.42,1.0); a.translate(0,.82,0); const b=new TT.IcosahedronGeometry(.32,0); b.scale(1.1,.45,1); b.translate(-.25,.66,.12); return mergeG([a,b]); })(),
        (()=>{ const a=new TT.ConeGeometry(.36,.62,7); a.translate(0,.55,0); const b=new TT.ConeGeometry(.26,.45,7); b.translate(0,.85,0); return mergeG([a,b]); })(),
        (()=>{ const a=new TT.CylinderGeometry(.05,.05,1,5); a.translate(0,.5,0); const b=new TT.ConeGeometry(.16,.5,5); b.translate(0,.95,0); return mergeG([a,b]); })() ];
      const trunkG=(()=>{ const g=new TT.CylinderGeometry(.03,.05,.6,5); g.translate(0,.3,0); return g; })();
      const LEAF=[['#46663a','#567a43','#3a5833','#62824a','#4d6e3e'],['#34502f','#3f5d36','#2e482b','#4a6739'],['#2a432b','#344f33','#243a25'],['#6f8f45','#7c9a4c','#5f8040','#86a356']];
      // items [x,y,z,h,kind(0 활엽·1 소나무·2 침엽·3 대나무), tone, 폭배율]
      const forest=(items,o)=>{ o=o||{}; const byK=[[],[],[],[]]; items.forEach(it=>byK[it[4]||0].push(it)); const M4=new TT.Matrix4(), Qt=new TT.Quaternion(), V=new TT.Vector3(), Sc=new TT.Vector3(), Eu=new TT.Euler(), c=new TT.Color(); const out=[];
        byK.forEach((L,k)=>{ if(!L.length) return; const cm=new TT.MeshStandardMaterial({color:0xffffff,roughness:.92,flatShading:true}); const im=new TT.InstancedMesh(crownG[k],cm,L.length); const tm=(o.trunks!==false&&k!==3)?new TT.InstancedMesh(trunkG,K.M.trunk,L.length):null;
          L.forEach((it,i)=>{ const h=it[3], w=h*(it[6]||1)*(k===3?.35:1); Eu.set(k===3?(((it[0]*3.1)%1)-.5)*.12:0,(it[0]*13.1+it[2]*7.7)%6.28,0); Qt.setFromEuler(Eu); V.set(it[0],it[1],it[2]); Sc.set(w,h,w); M4.compose(V,Qt,Sc); im.setMatrixAt(i,M4); if(tm) tm.setMatrixAt(i,M4); const P=(o.pal&&o.pal[k])||LEAF[k]; const t=it[5]===undefined?((it[0]*.37+it[2]*.61)%1+1)%1:it[5]; c.set(P[Math.floor(t*P.length)%P.length]).convertSRGBToLinear(); im.setColorAt(i,c); });
          im.instanceMatrix.needsUpdate=true; if(im.instanceColor) im.instanceColor.needsUpdate=true; im.castShadow=!!o.cast; im.receiveShadow=true; (o.grp||K.life).add(im); out.push(im); if(tm){ tm.instanceMatrix.needsUpdate=true; tm.castShadow=!!o.cast; (o.grp||K.life).add(tm); } }); return out; };
      const scatter=(x0,x1,z0,z1,sp,hf,ok,hs,kind)=>{ const L=[]; for(let z=z0;z<z1;z+=sp) for(let x=x0;x<x1;x+=sp){ const xx=x+(r()-.5)*sp*.9, zz=z+(r()-.5)*sp*.9; const h=hf(xx,zz); if(ok&&!ok(xx,zz,h)) continue; const s=hs?hs(xx,zz,h):sp*1.2; const kd=typeof kind==='function'?kind(xx,zz,h):(kind===undefined?(r()<.45?1:0):kind); L.push([xx,h-s*.08,zz,s*(.8+r()*.45),kd,r(),.85+r()*.4]); } return L; };
      const hsh=(x,z)=>{ let n=Math.imul(x|0,374761393)+Math.imul(z|0,668265263)|0; n=Math.imul(n^(n>>>13),1274126177); return ((n^(n>>>16))>>>0)/4294967296; };
      const vn=(x,z)=>{ const xi=Math.floor(x), zi=Math.floor(z), xf=x-xi, zf=z-zi; const u=xf*xf*(3-2*xf), v=zf*zf*(3-2*zf); const a=hsh(xi,zi), b=hsh(xi+1,zi), c=hsh(xi,zi+1), d=hsh(xi+1,zi+1); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; };
      const fbm=(x,z,o)=>{ let s=0, a=.5, f=1; for(let i=0;i<(o||4);i++){ s+=a*vn(x*f,z*f); a*=.5; f*=2.03; } return s; };
      const ridged=(x,z)=>{ let s=0,a=.5,f=1; for(let i=0;i<3;i++){ s+=a*(1-Math.abs(vn(x*f,z*f)*2-1)); a*=.5; f*=2.1; } return s; };
      const ss=t=>{ t=Math.min(1,Math.max(0,t)); return t*t*(3-2*t); };
      const peaks=(x,z,pk)=>{ let h=0; for(let i=0;i<pk.length;i++){ const q=pk[i]; const ax=(x-q[0])/q[2], az=(z-q[1])/q[3]; const d2=ax*ax+az*az; if(d2<1){ const d=Math.sqrt(d2); const e=1-ss(d); h=Math.max(h,q[4]*Math.pow(e,q[5]||1.3))+q[4]*.04*(1-d)*(1-d); } } return h; };
      // 산색: 숲 녹색 변주 + 급경사 바위 + 거리에 따라 푸른 대기색(겹겹 능선)
      const mcol=(x,z,h,ny,o)=>{ o=o||{}; const n=fbm(x*.02,z*.02,2), m=vn(x*.006+5,z*.006); let c=[.2+.07*n,.29+.08*n,.16+.05*n]; if(m>.6) c=[c[0]*.85+.05,c[1]*.9+.04,c[2]*.85]; const rock=(o.cliff||0)*ss((.62-ny)/.14); if(rock>0){ const rc=[.55+.08*n,.53+.07*n,.49+.06*n]; c=c.map((v,i)=>v+(rc[i]-v)*Math.min(1,rock)); } if(o.far){ const d=Math.hypot(x-(o.cx||0),z-(o.cz||0)); const f=ss((d-o.far)/(o.farW||700))*.62; const bc=o.haze||[.62,.69,.76]; c=c.map((v,i)=>v+(bc[i]-v)*f); } return c; };
      // 뷰어 기본 대지(잔디판·길)를 이 모형이 떠 있는 동안만 숨김(다른 모형으로 바뀌면 원상)
      const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
        const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
      // 물(계곡·강): 반사·투명 — 지형 위 평면 또는 폴리곤
      const WATER=new TT.MeshStandardMaterial({color:0x4f7d8c,roughness:.05,metalness:.02,transparent:true,opacity:.86}); WATER.color.convertSRGBToLinear();
      return {axis,r,tex,wallTex,masTex,tmat,terrain,forest,scatter,fbm,ridged,vn,ss,peaks,mcol,own,WATER,mergeG}; })();
    // 렌더러가 build 뒤에 K.life에 더하는 기본 소품(벤치·화분·볼라드·일반 나무, keep=0이면 사람까지)을 숨김 — 이 모형의 맥락은 직접 지음
    const tidy=keep=>{ const L=K.life, add0=L.add; L.add=function(...a){ a.forEach(o=>{ if(keep&&o.isMesh&&!o.isInstancedMesh&&o.material===K.M.people) return; o.visible=false; }); return add0.apply(this,a); }; };
    // ---- 세계 랜드마크 공용(v13 W): 하늘 돔 · life 바닥판 · 창 질감 도시 블록(지붕 포함) · 물 ----
    const W=(()=>{ const TT=K.T;
      // 하늘 돔(초고층·넓은 맥락용): 뷰어 하늘 구(600)보다 카메라가 멀어질 때 검게 비는 것을 막음 — 밤이면 밤색
      const sky=(R)=>{ const g=new TT.SphereGeometry(R,32,16); const p=g.attributes.position; const mk=night=>{ const col=[]; const top=new TT.Color(night?0x0b1226:0x9fc0de).convertSRGBToLinear(), hor=new TT.Color(night?0x2a3350:0xeee9df).convertSRGBToLinear(), c=new TT.Color(); for(let i=0;i<p.count;i++){ const t=Math.max(0,Math.min(1,p.getY(i)/(R*.63))); c.copy(hor).lerp(top,Math.pow(t,.65)); col.push(c.r,c.g,c.b); } return new TT.Float32BufferAttribute(col,3); }; const cD=mk(false), cN=mk(true); g.setAttribute('color',cD); const m=new TT.Mesh(g,new TT.MeshBasicMaterial({vertexColors:true,side:TT.BackSide,fog:false,depthWrite:false})); m.renderOrder=-1; m.frustumCulled=false; let cur=0; m.onBeforeRender=(r,sc)=>{ const n=sc.fog&&sc.fog.color&&sc.fog.color.r<.3?1:0; if(n!==cur){ cur=n; g.setAttribute('color',n?cN:cD); } }; K.life.add(m); return m; };
      // life 평면(bbox 밖): 재질 m, 중심 x,z, 크기 w,d, 높이 y, 회전 ry
      const lplane=(m,x,y,z,w,d,ry)=>{ const g=new TT.PlaneGeometry(w,d); g.rotateX(-Math.PI/2); if(ry) g.rotateY(ry); g.translate(x,y,z); if(m.userData&&m.userData.tm){ const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); } const me=new TT.Mesh(g,m); me.receiveShadow=m!==WATER; K.life.add(me); return me; };
      // 다각형 바닥(life): pts [[x,z],…]
      const lpoly=(m,pts,y)=>{ pts=pts.slice(); { let a=0; for(let i=0;i<pts.length;i++){ const p=pts[i], q=pts[(i+1)%pts.length]; a+=p[0]*q[1]-q[0]*p[1]; } if(a>0) pts.reverse(); } const sh=new TT.Shape(); pts.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); const g=new TT.ShapeGeometry(sh); g.rotateX(-Math.PI/2); g.translate(0,y,0); if(m.userData&&m.userData.tm){ const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); } m.side=TT.DoubleSide; const me=new TT.Mesh(g,m); me.receiveShadow=true; K.life.add(me); return me; };
      const solid=(hex,o)=>{ const m=new TT.MeshStandardMaterial(Object.assign({color:hex,roughness:.95},o||{})); m.color.convertSRGBToLinear(); m.userData.nocast=1; return m; };
      const WATER=solid(0x4f7d8c,{roughness:.05,metalness:.02,transparent:true,opacity:.86});
      // 창 질감: 'p' 석조 펀치창(3 m × 3.4 m 칸) · 'g' 커튼월 띠(유리 + 멀리언) — 흰 바탕, 꼭짓점 색으로 물들임
      const winTex=(kind)=>E.tex('win'+kind,256,(g,N,rr)=>{ if(kind==='g'){ g.fillStyle='#c9d1d8'; g.fillRect(0,0,N,N); for(let j=0;j<4;j++){ g.fillStyle='#f2f4f5'; g.fillRect(0,j*N/4,N,N/4*.14); for(let i=0;i<8;i++){ const t=.85+rr()*.3; g.fillStyle=`rgb(${Math.round(168*t)},${Math.round(186*t)},${Math.round(200*t)})`; g.fillRect(i*N/8+2,j*N/4+N/4*.16,N/8-4,N/4*.84); } } }
        else { g.fillStyle='#ffffff'; g.fillRect(0,0,N,N); for(let j=0;j<4;j++) for(let i=0;i<4;i++){ const lit=rr(); g.fillStyle=lit<.15?'#7d8590':'#59616b'; g.fillRect(i*N/4+N/4*.28,j*N/4+N/4*.22,N/4*.44,N/4*.56); } } });
      // 블록: [x,z,w,d,h,hex,ry,kind('p'|'g'|'n'),roofHex,roofH,roofInset]
      // 뷰 시선 확보: 뷰어 카메라(눈높이 az≈.75·정면 az=π/2, 거리는 bbox로 정해짐 — r=max(폭,깊이,높이×1.5))와 모형 사이 원뿔 안의 블록은 시선보다 낮게 깎음
      let VB=null; const vcap=(x,z,w,d,h)=>{ if(!VB){ const bb=new TT.Box3().setFromObject(K.bldg), sz=bb.getSize(new TT.Vector3()), c=bb.getCenter(new TT.Vector3()); const r=Math.max(sz.x,sz.z,sz.y*1.5); VB={c,sz,r,cams:[[.75,(r*.95+10),1.7+r*.05,.07],[1.0,(r*.95+10),1.7+r*.05,.07],[Math.PI/2,(r*1.3+12),1.7+r*.05,.18],[Math.PI/2,(r*1.3+12),Math.max(2,sz.y*.42),.18]]}; }
        let lim=h; const R0=Math.max(VB.sz.x,VB.sz.z)/2+10, br=Math.hypot(w,d)/2; for(const [a,D,yt,el] of VB.cams){ const ca=Math.cos(a), sa=Math.sin(a); const dx=x-VB.c.x, dz=z-VB.c.z; const t=(dx*ca+dz*sa)/D; if(t<0||t>1.1) continue; const p=Math.abs(-dx*sa+dz*ca); const hw=R0*(1-t)+6+br; if(p>hw) continue; const yc=yt+D*Math.sin(el); const yb=Math.min(VB.sz.y*.15,30)+4; lim=Math.min(lim,yb*(1-t)+yc*t-4); } return lim; };
      const city=(list)=>{ const by={p:[],g:[],n:[]}; list=list.map(b=>{ if(b[12]) return b; const lim=vcap(b[0],b[1],b[2],b[3],b[4]); if(lim>=b[4]) return b; if(lim<5) return null; const c=b.slice(); c[4]=lim; return c; }).filter(Boolean); list.forEach(b=>(by[b[7]||'p']||by.p).push(b)); const out=[];
        for(const k of ['p','g','n']){ const L=by[k]; if(!L.length) continue; let nv=0; for(const b of L) nv+=(b[8]!==undefined&&b[8]!==null&&b[9])?60:30; const P=new Float32Array(nv*3), N=new Float32Array(nv*3), U=new Float32Array(nv*2), C=new Float32Array(nv*3); let o=0; const c=new TT.Color(), rc=new TT.Color(); const CW=12, CH=k==='g'?15:13.6;
          let cr=0,cg=0,cb=0; const V=(px,py,pz,nx,ny,nz,u,v)=>{ const i3=o*3, i2=o*2; P[i3]=px; P[i3+1]=py; P[i3+2]=pz; N[i3]=nx; N[i3+1]=ny; N[i3+2]=nz; U[i2]=u; U[i2+1]=v; C[i3]=cr; C[i3+1]=cg; C[i3+2]=cb; o++; };
          for(const b of L){ const [x,z,w,d,h,hex,ry,kk,rh,rH,rI,by]=b; const Y0=by||0, yb=by?Y0-6:0; c.set(hex).convertSRGBToLinear(); const cs=Math.cos(ry||0), sn=Math.sin(ry||0); const hw=w/2, hd=d/2;
            const XA=lx=>lx*cs, ZA=lx=>-lx*sn; const px=(lx,lz)=>x+lx*cs+lz*sn, pz=(lx,lz)=>z-lx*sn+lz*cs;
            const SD=[[-hw,hd,hw,hd,0,1,.95],[hw,hd,hw,-hd,1,0,.86],[hw,-hd,-hw,-hd,0,-1,.9],[-hw,-hd,-hw,hd,-1,0,.86]]; const u0=((x*.37+z*.11)%1+1)%1;
            for(const [ax,az,bx,bz,nx0,nz0,sh] of SD){ const L2=Math.hypot(bx-ax,bz-az); cr=c.r*sh; cg=c.g*sh; cb=c.b*sh; const nx=nx0*cs+nz0*sn, nz=-nx0*sn+nz0*cs; const Ax=px(ax,az), Az=pz(ax,az), Bx=px(bx,bz), Bz=pz(bx,bz); const u1=u0+L2/CW, v1=h/CH, yt=h+Y0;
              V(Ax,yb,Az,nx,0,nz,u0,0); V(Bx,yb,Bz,nx,0,nz,u1,0); V(Bx,yt,Bz,nx,0,nz,u1,v1); V(Ax,yb,Az,nx,0,nz,u0,0); V(Bx,yt,Bz,nx,0,nz,u1,v1); V(Ax,yt,Az,nx,0,nz,u0,v1); }
            const yt=h+Y0;
            if(rh!==undefined&&rh!==null&&rH){ rc.set(rh).convertSRGBToLinear(); const ins=Math.max(.2,Math.min(rI||rH,Math.min(hw,hd)-.2)); const q=[[-hw,hd],[hw,hd],[hw,-hd],[-hw,-hd]], qi=[[-hw+ins,hd-ins],[hw-ins,hd-ins],[hw-ins,-hd+ins],[-hw+ins,-hd+ins]]; const sl=Math.hypot(ins,rH);
              for(let i=0;i<4;i++){ const j=(i+1)%4; const nn=SD[i]; const nx=(nn[4]*cs+nn[5]*sn)*rH/sl, nz=(-nn[4]*sn+nn[5]*cs)*rH/sl, ny=ins/sl; const sh=[1,.85,.78,.88][i]; cr=rc.r*sh; cg=rc.g*sh; cb=rc.b*sh;
                const Ax=px(q[i][0],q[i][1]), Az=pz(q[i][0],q[i][1]), Bx=px(q[j][0],q[j][1]), Bz=pz(q[j][0],q[j][1]), Cx=px(qi[j][0],qi[j][1]), Cz=pz(qi[j][0],qi[j][1]), Dx=px(qi[i][0],qi[i][1]), Dz=pz(qi[i][0],qi[i][1]);
                V(Ax,yt,Az,nx,ny,nz,.02,.02); V(Bx,yt,Bz,nx,ny,nz,.02,.02); V(Cx,yt+rH,Cz,nx,ny,nz,.02,.02); V(Ax,yt,Az,nx,ny,nz,.02,.02); V(Cx,yt+rH,Cz,nx,ny,nz,.02,.02); V(Dx,yt+rH,Dz,nx,ny,nz,.02,.02); }
              cr=rc.r; cg=rc.g; cb=rc.b; const p0=[px(qi[0][0],qi[0][1]),pz(qi[0][0],qi[0][1])], p1=[px(qi[1][0],qi[1][1]),pz(qi[1][0],qi[1][1])], p2=[px(qi[2][0],qi[2][1]),pz(qi[2][0],qi[2][1])], p3=[px(qi[3][0],qi[3][1]),pz(qi[3][0],qi[3][1])];
              V(p0[0],yt+rH,p0[1],0,1,0,.02,.02); V(p1[0],yt+rH,p1[1],0,1,0,.02,.02); V(p2[0],yt+rH,p2[1],0,1,0,.02,.02); V(p0[0],yt+rH,p0[1],0,1,0,.02,.02); V(p2[0],yt+rH,p2[1],0,1,0,.02,.02); V(p3[0],yt+rH,p3[1],0,1,0,.02,.02); }
            else { const f=k==='n'?1.02:.8; cr=c.r*f; cg=c.g*f; cb=c.b*f; const p0=[px(-hw,hd),pz(-hw,hd)], p1=[px(hw,hd),pz(hw,hd)], p2=[px(hw,-hd),pz(hw,-hd)], p3=[px(-hw,-hd),pz(-hw,-hd)]; V(p0[0],yt,p0[1],0,1,0,.02,.02); V(p1[0],yt,p1[1],0,1,0,.02,.02); V(p2[0],yt,p2[1],0,1,0,.02,.02); V(p0[0],yt,p0[1],0,1,0,.02,.02); V(p2[0],yt,p2[1],0,1,0,.02,.02); V(p3[0],yt,p3[1],0,1,0,.02,.02); } }
          const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P.subarray(0,o*3),3)); g.setAttribute('normal',new TT.BufferAttribute(N.subarray(0,o*3),3)); g.setAttribute('uv',new TT.BufferAttribute(U.subarray(0,o*2),2)); g.setAttribute('color',new TT.BufferAttribute(C.subarray(0,o*3),3));
          const tx=k==='n'?null:winTex(k); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,map:tx,roughness:k==='g'?.45:.9,metalness:k==='g'?.1:0})); m.receiveShadow=true; m.castShadow=false; K.life.add(m); out.push(m); } return out; };
      // 흩뿌리기 도우미: 사각 격자 블록(가로 간격 sx·sz, 도로 폭 rw) — ok(x,z)가 false면 생략, f(x,z)→[w,d,h,hex,kind,roofHex,roofH,inset] 
      const grid=(x0,x1,z0,z1,sx,sz,rw,ok,f,ry)=>{ const L=[]; const cs=Math.cos(ry||0), sn=Math.sin(ry||0); for(let a=x0;a<x1;a+=sx) for(let b=z0;b<z1;b+=sz){ const x=a*cs+b*sn, z=-a*sn+b*cs; if(ok&&!ok(x,z)) continue; const q=f(x,z,sx-rw,sz-rw); if(!q) continue; L.push([x,z,q[0],q[1],q[2],q[3],ry||0,q[4],q[5],q[6],q[7]]); } return L; };
      // 도시 고리: o={r0,r1,step,keep(x,z)→bool, h(r)→높이, pal:[색…], gp:유리 비율, tall:[확률,최소,폭], ry, roof:[색,높이,들임] or null, fill:비율}
      const pads=(PD,ry)=>{ if(!PD.length) return; const P=new Float32Array(PD.length*18), C=new Float32Array(PD.length*18), N=new Float32Array(PD.length*18); const c=new TT.Color(); const cs=Math.cos(ry), sn=Math.sin(ry); const PV=['#aaa498','#b4aea2','#a39e94','#bbb5a9','#aea99f'], PK=['#6f8d4d','#7b9858','#66844a']; PD.forEach(([x,z,hw,y,park],i)=>{ c.set(park?PK[i%3]:PV[(i*7)%5]).convertSRGBToLinear(); const Y=y+.09; const q=[[-hw,hw],[hw,hw],[hw,-hw],[-hw,hw],[hw,-hw],[-hw,-hw]]; q.forEach((v,k)=>{ const o=i*18+k*3; P[o]=x+v[0]*cs+v[1]*sn; P[o+1]=Y; P[o+2]=z-v[0]*sn+v[1]*cs; N[o+1]=1; C[o]=c.r; C[o+1]=c.g; C[o+2]=c.b; }); }); const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(C,3)); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:.95})); m.receiveShadow=true; K.life.add(m); }; // v18i: 블록 보도·필지 판 — 사이 바닥이 길로 읽히게
      const ring=(o)=>{ const L=[], PDs=[]; const st=o.step||50, cs=Math.cos(o.ry||0), sn=Math.sin(o.ry||0); for(let a=-o.r1;a<o.r1;a+=st) for(let b=-o.r1;b<o.r1;b+=st){ const x0=a+(E.r()-.5)*st*.25, z0=b+(E.r()-.5)*st*.25; const x=(o.cx||0)+x0*cs+z0*sn, z=(o.cz||0)-x0*sn+z0*cs; const r=Math.hypot(x0,z0); if(r<o.r0||r>o.r1) continue; if(o.keep&&!o.keep(x,z,r)) continue; if(o.clr&&x>-o.clr*.12&&z>-o.clr*.12&&Math.hypot(x,z)<o.clr) continue; if(o.pads!==false){ const px=(o.cx||0)+a*cs+b*sn, pz=(o.cz||0)-a*sn+b*cs; PDs.push([px,pz,st*.41,o.hy?o.hy(px,pz):0,E.r()<.12]); } if(E.r()>(o.fill||.65)) continue;
          const tall=o.tall&&E.r()<o.tall[0]; const gl=tall||E.r()<(o.gp||0); const w=st*(.45+E.r()*.35), d=st*(.45+E.r()*.35); const h=tall?o.tall[1]+E.r()*o.tall[2]:o.h(r,x,z); const pal=gl?(o.gpal||['#b7c5cf','#a3b4c0','#c3cdd4']):o.pal; const rf=!gl&&o.roof?o.roof:null; L.push([x,z,w,d,h,pal[Math.floor(E.r()*pal.length)],o.ry||0,gl?'g':(o.kind||'p'),rf?rf[0]:null,rf?rf[1]:0,rf?rf[2]:0,o.hy?o.hy(x,z):0]); } const out=city(L); pads(PDs,o.ry||0); return out; };
      // 맨해튼 격자: x 방향 블록 길이 bx(애비뉴 간격), z 방향 by(스트리트 간격), 블록마다 남북 두 줄로 필지를 나눔 — o={x0,x1,z0,z1,bx,bz,aw,sw,skip(x,z,w,d)→bool, h(x,z)→높이, pal, gpal, gp}
      const manh=(o)=>{ const L=[]; const bx=o.bx||260, bz=o.bz||80, aw=o.aw||30, sw=o.sw||18; for(let X=o.x0;X<o.x1;X+=bx) for(let Z=o.z0;Z<o.z1;Z+=bz){ const W0=bx-aw, D0=bz-sw; for(const row of [-1,1]){ let x=X-W0/2; while(x<X+W0/2-4){ const w=Math.min(X+W0/2-x,10+E.r()*E.r()*45); const cx=x+w/2, cz=Z+row*D0/4, d=D0/2-(E.r()<.3?E.r()*8:0); x+=w; if(o.skip&&o.skip(cx,cz,w,d)) continue; const h=o.h(cx,cz); if(h<=0) continue; const gl=h>110&&E.r()<(o.gp===undefined?.5:o.gp); const pal=gl?(o.gpal||['#a9b8c3','#9aabb7','#bcc6cc']):(o.pal||['#cbbfa8','#b9a993','#a38f7a','#d8d0c0','#9c8f84','#c4b49c']); L.push([cx,cz+(row>0?-(D0/2-d)/2:(D0/2-d)/2),w-.6,d,h,pal[Math.floor(E.r()*pal.length)],0,gl?'g':'p']); } } } return city(L); };
      // 뷰어의 일반 대지(잔디판·포장판·길·차선)를 이 모형이 떠 있는 동안만 숨김 — site 자식의 visible을 getter로 바꿔(life가 보일 때 false) 첫 프레임·썸네일에서도 적용, 'site' 단계처럼 life가 꺼지면 원래대로 보이고, 다른 모형으로 바뀌면(표식이 life에서 빠지면) 자동으로 원상
      const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
        const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
      return {sky,lplane,lpoly,solid,WATER,city,grid,ring,manh,own}; })();


    // 바르셀로나 에이샴플레: 세르다 격자(블록 간격 113.3 m, 길 폭 20 m, 모서리 모따기 약 20 m) · 모형 +z = 그라시아 거리(폭 약 61 m, 양쪽 보도 플라타너스 가로수), +x = 프로벤사 거리 · 블록 둘레를 6~8층(20~28 m) 석조·회반죽 아파트가 감싸고 가운데는 중정 · 높이·색은 개략(추정)
    E.own();
    W.lplane(W.solid(0x5d5f62),0,-.13,0,6000,6000); // 아스팔트
    const SWm=W.solid(0xc4beb2); // 보도(보도 블록색)
    const P=113.3, ST=20, GR=61.5, CH=14.1, DEP=24;
    // x 방향 블록 경계: 카사 밀라 블록 = x -73.3..20 / z 방향: z -73.3..20, 그라시아 건너는 z 81.5부터
    const xs=[]; for(let i=-8;i<=8;i++) xs.push(20-93.3+i*P); // 블록 x 시작
    const zs=[]; for(let j=-8;j<=0;j++) zs.push(20-93.3+j*P); for(let j=0;j<7;j++) zs.push(20+GR+j*P);
    const oct=(x0,z0,x1,z1,c)=>[[x0+c,z0],[x1-c,z0],[x1,z0+c],[x1,z1-c],[x1-c,z1],[x0+c,z1],[x0,z1-c],[x0,z0+c]];
    const mk=pts=>{ const sh=new T.Shape(); pts.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); sh.closePath(); return sh; };
    const pal=['#d8c9ac','#cdb998','#e1d5bd','#c2ab88','#d6c3a1','#b9a688','#e5dccb','#c9b08e','#d1bfa8'];
    const Pw=[],Cw=[],Uw=[],Pr=[],Cr=[]; const col=new T.Color();
    const addBlock=(x0,z0,x1,z1,h,hex)=>{ const sh=mk(oct(x0,z0,x1,z1,CH)); const hole=new T.Path(); const ip=oct(x0+DEP,z0+DEP,x1-DEP,z1-DEP,CH*.4); ip.forEach(([x,z],i)=>i?hole.lineTo(x,-z):hole.moveTo(x,-z)); sh.holes.push(hole);
      const g=new T.ExtrudeGeometry(sh,{depth:h,bevelEnabled:false}); g.rotateX(-Math.PI/2); col.set(hex).convertSRGBToLinear(); const p=g.attributes.position, uv=g.attributes.uv, n=g.attributes.normal;
      for(const gr of g.groups){ for(let i=gr.start;i<gr.start+gr.count;i++){ const x=p.getX(i), y=p.getY(i), z=p.getZ(i); if(gr.materialIndex===0){ Pr.push(x,y,z); Cr.push(col.r*.8,col.g*.78,col.b*.75); } else { Pw.push(x,y,z); const sh2=.84+.16*Math.abs(n.getX(i)); Cw.push(col.r*sh2,col.g*sh2,col.b*sh2); Uw.push((Math.abs(n.getX(i))>.5?z:x)/3.8,y/3.3); } } } };
    for(const x0 of xs) for(const z0 of zs){ const x1=x0+P-ST, z1=z0+(P-ST); const cx=(x0+x1)/2, cz=(z0+z1)/2; if(Math.hypot(cx,cz)>900) continue; if(x0>-80&&x0<-60&&z0>-80&&z0<-60) continue; // 카사 밀라 블록은 따로
      const a=Math.atan2(cz,cx), R=Math.hypot(cx,cz); let h=19+E.r()*9; if(a>-.1&&a<1.7&&R<170) h=Math.min(h,17); addBlock(x0,z0,x1,z1,h,pal[Math.floor(E.r()*pal.length)]); }
    // 카사 밀라 블록의 나머지(공유벽 옆 이웃 건물 · 블록 뒤쪽 두 변)
    { const x0=-73.3, z0=-73.3; const segs=[[x0,-4,-22.3,20,24,'#d9c7a6'],[-4,z0,20,-22.3,23,'#cfbd9c'],[x0,z0,x0+DEP,-4,22,'#d6c6a9'],[x0,z0,-4,z0+DEP,21,'#c8b698']];
      for(const [a,b,c,d,h,hex] of segs){ const sh=[[a,b],[c,b],[c,d],[a,d]]; const g=new T.ExtrudeGeometry(mk(sh),{depth:h,bevelEnabled:false}); g.rotateX(-Math.PI/2); col.set(hex).convertSRGBToLinear(); const p=g.attributes.position, n=g.attributes.normal; for(const gr of g.groups) for(let i=gr.start;i<gr.start+gr.count;i++){ const x=p.getX(i),y=p.getY(i),z=p.getZ(i); if(gr.materialIndex===0){ Pr.push(x,y,z); Cr.push(col.r*.8,col.g*.78,col.b*.75); } else { Pw.push(x,y,z); Cw.push(col.r,col.g,col.b); Uw.push((Math.abs(n.getX(i))>.5?z:x)/3.8,y/3.3); } } } }
    const WT=E.tex('eix_win',256,(g,N,rr)=>{ g.fillStyle='#ffffff'; g.fillRect(0,0,N,N); g.fillStyle='#3d3a36'; g.fillRect(N*.32,N*.2,N*.36,N*.62); g.fillStyle='#2a2724'; g.fillRect(N*.26,N*.78,N*.48,N*.05); g.fillStyle='rgba(0,0,0,.08)'; g.fillRect(0,N*.92,N,N*.08); });
    { const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(Pw,3)); g.setAttribute('color',new T.Float32BufferAttribute(Cw,3)); g.setAttribute('uv',new T.Float32BufferAttribute(Uw,2)); g.computeVertexNormals(); const m=new T.Mesh(g,new T.MeshStandardMaterial({vertexColors:true,map:WT,roughness:.9})); m.receiveShadow=true; K.life.add(m);
      const g2=new T.BufferGeometry(); g2.setAttribute('position',new T.Float32BufferAttribute(Pr,3)); g2.setAttribute('color',new T.Float32BufferAttribute(Cr,3)); g2.computeVertexNormals(); const m2=new T.Mesh(g2,new T.MeshStandardMaterial({vertexColors:true,roughness:.95})); m2.receiveShadow=true; K.life.add(m2); }
    // 보도: 블록마다 둘레 5 m(그라시아 쪽은 넓게) — 블록 외곽 + 보도 폭으로 평면 깔기
    { const gs=[]; for(const x0 of xs) for(const z0 of zs){ const x1=x0+P-ST, z1=z0+(P-ST); if(Math.hypot((x0+x1)/2,(z0+z1)/2)>900) continue; const s=new T.ShapeGeometry(mk(oct(x0-5,z0-5,x1+5,z1+5,CH+2))); s.rotateX(-Math.PI/2); s.translate(0,-.02,0); gs.push(s); }
      const m=new T.Mesh(E.mergeG(gs),SWm); m.receiveShadow=true; K.life.add(m);
      W.lplane(SWm,0,-.015,20+GR/2,6000,14); W.lplane(W.solid(0x8d9a6e),0,-.01,20+GR/2,6000,3); } // 그라시아 가운데 보행로 + 화단 줄
    // 플라타너스 가로수: 그라시아 양쪽 보도·가운데 줄, 프로벤사·다른 길 양쪽(간격 8~10 m)
    { const t=[]; const cam=(x,z)=>{ const a=Math.atan2(z,x), R=Math.hypot(x,z); return a>-.1&&a<1.7&&R<70; };
      for(let x=-800;x<800;x+=9){ for(const z of [29,20+GR/2-4.5,20+GR/2+4.5,20+GR-9]) if(!(Math.abs(x)<26&&z<32)&&!cam(x,z)) t.push([x,0,z,11+E.r()*3,0,E.r(),.95]); }
      for(const x0 of xs) for(let z=-800;z<800;z+=10){ const xa=x0-4, xb=x0-ST+4; for(const x of [xa,xb]){ if(Math.abs(z-(20+GR/2))<GR/2+4) continue; if(cam(x,z)||(Math.abs(x)<26&&Math.abs(z)<26)) continue; if(Math.hypot(x,z)<850) t.push([x,0,z,9+E.r()*3,0,E.r(),.9]); } }
      E.forest(t,{trunks:true,cast:false,pal:[['#6d8a45','#7a9650','#62803f','#86a058']]}); }
    W.sky(2800); tidy(1);
    }
  }});
