__bsigFill({"jongmyo":function(K){
// 실측(개략): 정전 정면 19칸(칸 5.3 m) 길이 101 m · 측면 3칸 약 12 m, 앞 1칸 툇간 개방(전퇴) · 좌우 협실 각 3칸(낮은 지붕) · 동월랑·서월랑 각 5칸 남향(동=개방, 서=벽)
// 출처: 서울신문 2019-04-16 「종묘 정전을 중심으로」 — 정전 길이 101 m, 하월대 좌우 109 m × 앞뒤 69 m · 한국과학기술정보 논문(JAKO198871663776426) — 1836 증축 후 정전 19간, 동서월랑 각 5간
// 추정 치수: 기둥 높이 4.3 m, 용마루 높이 약 12.5 m, 상월대 높이 1 m(하월대 위), 기단 0.6 m, 신로 폭 1.9 m, 담 높이 2.3 m, 박석 줄눈 간격 2.6~3.2 m
    const T=K.T; const RED=K.col(0x8e3a2a,{roughness:.8}), WH=K.col(0xe6e1d6,{roughness:.95}), GW=K.M.giwa, RU=K.col(0x5a4a3c), DOOR=K.col(0x4a2f22,{roughness:.8}), DOOR2=K.col(0x3a2419,{roughness:.8}), ST=K.M.stone.clone(), BR=K.col(0x6b4b36), WD=K.col(0x8a6a48), SG=K.col(0xb9b3a6,{roughness:.95}), SG2=K.col(0x9e978a,{roughness:.95}), DR=K.col(0x2b2a28), GRN=K.col(0x3d5f4a,{roughness:.8}), JUN=K.col(0x3b5236,{roughness:.95}), EA=K.col(0xd6cfc0,{roughness:1}), WLB=K.col(0x7d7466,{roughness:.95}); ST.color.set(0xcfc9bc); ST.color.convertSRGBToLinear();
    // --- 공용 헬퍼(이 build 안에서만) ---
    const roofHF=(cx,ye,cz,E,D,H,o)=>{ o=o||{}; const dt=o.dt||0, so=o.sori||0, thk=o.thk||.3, sw=!!o.swap, mt=o.mat, um=o.under||mt; const EE=sw?D:E, DD=sw?E:D; const R=Math.max(0,EE-DD*(1-dt));
      const g=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),1.7); const y0=ye+H*(1-g(dt));
      const yf=(a,b)=>{ const aa=Math.abs(a)/(EE/2), bb=Math.abs(b)/(DD/2); const ta=Math.abs(a)>R/2?(Math.abs(a)-R/2)/(DD/2)+dt:0; return ye+H*(1-g(Math.max(bb,ta)))+so*Math.pow(aa,3)*Math.pow(bb,3); };
      const P=(a,b,y)=>sw?[cx+b,y,cz+a,b/2,a/2]:[cx+a,y,cz+b,a/2,b/2];
      const sheet=(a0,a1,m,dy,n)=>K.surf((u,v)=>{ const a=a0+(a1-a0)*u, b=-DD/2+DD*v; return P(a,b,yf(a,b)+dy); },n,o.nv||12,m);
      const segs=(dt>0&&dt<1)?[[-EE/2,-R/2,8],[-R/2,R/2,20],[R/2,EE/2,8]]:[[-EE/2,EE/2,o.nu||32]];
      for(const [a0,a1,n] of segs){ sheet(a0,a1,mt,0,n); sheet(a0,a1,um,-thk,n); }
      K.surf((u,v)=>{ const s=u*4, k=Math.floor(s), f=s-k; let a,b; if(k===0){a=-EE/2+EE*f;b=-DD/2;} else if(k===1){a=EE/2;b=-DD/2+DD*f;} else if(k===2){a=EE/2-EE*f;b=DD/2;} else {a=-EE/2;b=DD/2-DD*f;} const y=yf(a,b); return P(a,b,y-thk+thk*v); },64,1,um);
      if(dt>0){ for(const s of [-1,1]){ const a=s*R/2; K.surf((u,v)=>{ const b=-dt*DD/2+dt*DD*u; const yt=yf(a-s*.02,b), yb=y0-thk; return P(a-s*.05,b,yb+(yt-yb)*v); },12,1,o.gmat||um); } }
      if(R>.6&&o.ridge!==false) K.b(cx,ye+H-.15,cz,sw?(o.rw||.8):R+.5,o.rh||.5,sw?R+.5:(o.rw||.8),o.rmat||K.col(0x2b2a28)); return yf; };
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    // 인스턴스: geo(밑면 y=0 기준) 를 items=[[x,y,z,ry,sx,sy,sz]] 자리에 복제 — 기둥·판문·공포처럼 같은 부재 반복
    const inst=(geo,mat,items,cast)=>{ const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),E=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); E.set(0,it[3]||0,0); Q.setFromEuler(E); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; return put(m,cast); };
    // 병합: 박스 지오메트리 여러 개를 메시 하나로 (박석 줄눈·난간살처럼 작은 조각 수백 개)
    const bx=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const merge=(geos,mat,cast)=>{ if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); return put(new T.Mesh(g,mat),cast); };
    const cylG=(r,h,seg,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r*.9:r2,r,h,seg||10); g.translate(0,h/2,0); return g; };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    const stairs=(x,z,yt,yb,w,n,axis,dir)=>{ const rise=(yt-yb)/n, run=.42; const gs=[]; for(let k=0;k<n-1;k++){ const h=yt-yb-(k+1)*rise, off=dir*(k+.5)*run; if(axis==='z') gs.push(bx(x,yb,z+off,w,h,run)); else gs.push(bx(x+off,yb,z,run,h,w)); } for(const s of [-1,1]){ const L=(n-1)*run; if(axis==='z') gs.push(bx(x+s*(w/2+.2),yb,z+dir*L/2,.4,yt-yb+.25,L+.2)); else gs.push(bx(x+dir*L/2,yb,z+s*(w/2+.2),L+.2,yt-yb+.25,.4)); } return merge(gs,ST); }; // 소맷돌 포함
    // 박석 줄눈: 넓은 돌판 위에 불규칙한 줄눈을 얇은 선으로 새김 (박석 느낌)
    const paving=(cx,y,cz,w,d,sx,sz,seed)=>{ const gs=[]; let r=seed||3; const rnd=()=>{ r=(r*9301+49297)%233280; return r/233280; }; for(let x=-w/2+sx*(.6+rnd()*.5);x<w/2-.5;x+=sx*(.75+rnd()*.5)) gs.push(bx(cx+x,y,cz,.09,.025,d)); for(let z=-d/2+sz*(.6+rnd()*.5);z<d/2-.5;z+=sz*(.75+rnd()*.5)) gs.push(bx(cx,y,cz+z,w,.025,.09)); return merge(gs,SG2,false); };
    const juniper=(x,z,h)=>{ K.c(x,0,z,.22,h*.35,K.M.trunk,6,{r2:.16}); const gs=[]; for(let k=0;k<4;k++){ const yy=h*(.22+k*.19), rr=h*(.26-k*.05); const g=new T.ConeGeometry(rr,h*.3,7); g.translate(x+(k%2?.3:-.3),yy+h*.15,z+(k%3-1)*.25); gs.push(g); } merge(gs,JUN); };
    const W=101, BAY=W/19, NB=19, F=2.6;
    // ---- 0: 바닥·월대·기단·신로·담장·문 ----
    // ---- 배경·바닥 공용(v13): 캔버스 질감(박석·마사토) · 높이장 지형(K.life — bbox 밖이라 썸네일 거리에 영향 없음) · 인스턴스 숲 ----
    const E=(()=>{ const TT=K.T; let sd=97; const r=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
      const C=(typeof window!=='undefined')?(window.__kTex13||(window.__kTex13={})):{};
      const tex=(key,px,draw)=>{ if(C[key]) return C[key]; if(typeof document==='undefined') return null; const cv=document.createElement('canvas'); cv.width=cv.height=px; const g=cv.getContext('2d'); let s=31; const rr=()=>{ s=(s*16807)%2147483647; return s/2147483647; }; draw(g,px,rr); const t=new TT.CanvasTexture(cv); t.wrapS=t.wrapT=TT.RepeatWrapping; t.encoding=TT.sRGBEncoding; t.anisotropy=8; return C[key]=t; };
      // 박석: 회색 화강석을 가로줄로 불규칙하게(줄 높이·돌 너비가 제각각), 줄눈은 어둡게 — 512 px = 9 m
      const bakTex=()=>tex('bak',512,(g,N,rr)=>{ g.fillStyle='#6f6a61'; g.fillRect(0,0,N,N); const tones=['#a8a296','#b3ad9f','#9a9488','#a39d90','#aea89a','#958f83','#b8b2a4']; let y=0; while(y<N){ let h=Math.round(26+rr()*26); if(N-y<40) h=N-y; let x=-rr()*60; while(x<N){ const w=38+rr()*70; const j=()=>(rr()-.5)*5; g.fillStyle=tones[Math.floor(rr()*tones.length)]; for(const ox of [0,-N]){ g.beginPath(); g.moveTo(ox+x+2+j(),y+2+j()); g.lineTo(ox+x+w-2+j(),y+2+j()); g.lineTo(ox+x+w-2+j(),y+h-2+j()); g.lineTo(ox+x+2+j(),y+h-2+j()); g.closePath(); g.fill(); } x+=w; } y+=h; }
        for(let i=0;i<4000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.10)':'rgba(40,36,30,.10)'; g.fillRect(rr()*N,rr()*N,1.5,1.5); } });
      // 마사토: 옅은 황토 바탕(#d9cdb0) + 모래 알갱이 점 — 512 px = 7 m
      const masTex=()=>tex('mas',512,(g,N,rr)=>{ g.fillStyle='#cfc1a0'; g.fillRect(0,0,N,N); for(let i=0;i<0;i++){ g.fillStyle=`rgba(${rr()<.5?'190,172,135':'232,224,204'},.07)`; const x=rr()*N,y=rr()*N,w=30+rr()*90; g.beginPath(); g.ellipse(x,y,w,w*.6,rr()*3,0,7); g.fill(); } const cs=['#bfae88','#dacfb4','#ae9d77','#9c8d6f','#c8b997']; for(let i=0;i<7000;i++){ g.fillStyle=cs[Math.floor(rr()*cs.length)]; const z=rr()<.85?1.2:2.4; g.fillRect(rr()*N,rr()*N,z,z); } });
      const lin=(h)=>new TT.Color(h).convertSRGBToLinear();
      const mat=(t,hex,tm,o)=>{ const m=new TT.MeshStandardMaterial(Object.assign({color:t?0xffffff:hex,map:t||null,roughness:.96},o||{})); if(!t) m.color.convertSRGBToLinear(); m.userData.tm=tm; m.userData.nocast=1; return m; };
      const BAK=mat(bakTex(),0xb9b3a6,9), MAS=mat(masTex(),0xd9cdb0,7); if(BAK.map) BAK.color.setHex(0xd2cec6).convertSRGBToLinear(); if(MAS.map) MAS.color.setHex(0xd8d0c0).convertSRGBToLinear();
      // 평면 바닥 한 장(월드 좌표 UV) → 병합 큐 Q가 있으면 그쪽으로
      const plane=(m,x,y,z,w,d,q)=>{ const g=new TT.PlaneGeometry(w,d,1,1); g.rotateX(-Math.PI/2); g.translate(x,y,z); const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm||5; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); if(q){ q(m,g); return null; } const me=new TT.Mesh(g,m); me.receiveShadow=true; (K.cur||K.layer(0)).add(me); return me; };
      // 지형: hf(x,z) 높이, cf(x,z,h,ny) → [r,g,b](sRGB 0~1). life 그룹(그림자 안 던짐)
      const terrain=(x0,x1,z0,z1,nx,nz,hf,cf,hole)=>{ // hole [hx0,hx1,hz0,hz1]: 그 사각형만 비움(격자선을 구멍 모서리에 맞춤) — 모형 바닥을 그대로 보이게
        const ax=(a0,a1,n,e)=>{ const L=[]; for(let i=0;i<=n;i++) L.push(a0+(a1-a0)*i/n); if(e) e.forEach(v=>{ if(v>a0&&v<a1) L.push(v); }); L.sort((a,b)=>a-b); return L.filter((v,i)=>i===0||v-L[i-1]>.01); };
        const XS=ax(x0,x1,nx,hole&&[hole[0],hole[1]]), ZS=ax(z0,z1,nz,hole&&[hole[2],hole[3]]); const W=XS.length, H=ZS.length, n=W*H; const Y=new Float32Array(n), P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3);
        for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, x=XS[i], z=ZS[j]; Y[k]=hf(x,z); P[k*3]=x; P[k*3+1]=Y[k]; P[k*3+2]=z; }
        const lc=v=>v<.04045?v*.0773993808:Math.pow(v*.9478672986+.0521327014,2.4);
        for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, i0=Math.max(0,i-1), i1=Math.min(W-1,i+1), j0=Math.max(0,j-1), j1=Math.min(H-1,j+1); const hx=(Y[j*W+i1]-Y[j*W+i0])/(XS[i1]-XS[i0]), hz=(Y[j1*W+i]-Y[j0*W+i])/(ZS[j1]-ZS[j0]); const L=Math.sqrt(hx*hx+1+hz*hz); N[k*3]=-hx/L; N[k*3+1]=1/L; N[k*3+2]=-hz/L; const v=cf(P[k*3],P[k*3+2],Y[k],1/L); Cc[k*3]=lc(v[0]); Cc[k*3+1]=lc(v[1]); Cc[k*3+2]=lc(v[2]); }
        const I=[]; for(let j=0;j<H-1;j++) for(let i=0;i<W-1;i++){ if(hole){ const cx=(XS[i]+XS[i+1])/2, cz=(ZS[j]+ZS[j+1])/2; if(cx>hole[0]&&cx<hole[1]&&cz>hole[2]&&cz<hole[3]) continue; } const a=j*W+i, b=a+1, c=a+W, d=c+1; I.push(a,c,b,b,c,d); }
        const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(Cc,3)); g.setIndex(new TT.BufferAttribute(new Uint32Array(I),1)); g.computeBoundingSphere();
        const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:1})); m.receiveShadow=true; m.castShadow=false; K.life.add(m);
        const bs=(A,v)=>{ let lo=0, hi=A.length-2; if(v<=A[0]) return 0; if(v>=A[hi+1]) return hi; while(lo<hi){ const md=(lo+hi+1)>>1; if(A[md]<=v) lo=md; else hi=md-1; } return lo; };
        m.h=(x,z)=>{ const i=bs(XS,x), j=bs(ZS,z); const u=Math.min(1,Math.max(0,(x-XS[i])/(XS[i+1]-XS[i]))), v=Math.min(1,Math.max(0,(z-ZS[j])/(ZS[j+1]-ZS[j]))); const a=Y[j*W+i], b=Y[j*W+i+1], c=Y[(j+1)*W+i], d=Y[(j+1)*W+i+1]; return (a*(1-u)+b*u)*(1-v)+(c*(1-u)+d*u)*v; }; return m; };
      // 숲: 나무 무리 — items [x,y,z,h,kind(0 활엽 둥근 수관,1 소나무 납작 수관,2 침엽 원뿔), tone 0~1]. 수관 + 줄기 InstancedMesh, 색은 인스턴스마다 다르게
      const mergeG=gs=>{ const G=gs.map(g=>g.index?g.toNonIndexed():g); let n=0; for(const g of G) n+=g.attributes.position.count; const P=new Float32Array(n*3), N=new Float32Array(n*3); let o=0; for(const g of G){ P.set(g.attributes.position.array,o*3); N.set(g.attributes.normal.array,o*3); o+=g.attributes.position.count; } const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); return g; };
      const crownG=[ (()=>{ const a=new TT.IcosahedronGeometry(.5,1); a.scale(1,.78,1); a.translate(0,.62,0); const b=new TT.IcosahedronGeometry(.3,0); b.translate(.22,.78,.1); return mergeG([a,b]); })(),
        (()=>{ const a=new TT.IcosahedronGeometry(.5,0); a.scale(1.15,.42,1.0); a.translate(0,.82,0); const b=new TT.IcosahedronGeometry(.32,0); b.scale(1.1,.45,1); b.translate(-.25,.66,.12); return mergeG([a,b]); })(),
        (()=>{ const a=new TT.ConeGeometry(.36,.62,7); a.translate(0,.55,0); const b=new TT.ConeGeometry(.26,.45,7); b.translate(0,.85,0); return mergeG([a,b]); })() ];
      const trunkG=(()=>{ const g=new TT.CylinderGeometry(.03,.05,.6,5); g.translate(0,.3,0); return g; })();
      const LEAF=[['#46663a','#567a43','#3a5833','#62824a','#4d6e3e'],['#34502f','#3f5d36','#2e482b','#4a6739'],['#2a432b','#344f33','#243a25']];
      const forest=(items,o)=>{ o=o||{}; const byK=[[],[],[]]; items.forEach(it=>byK[it[4]||0].push(it)); const M4=new TT.Matrix4(), Qt=new TT.Quaternion(), V=new TT.Vector3(), Sc=new TT.Vector3(), Eu=new TT.Euler(), c=new TT.Color(); const out=[];
        byK.forEach((L,k)=>{ if(!L.length) return; const cm=new TT.MeshStandardMaterial({color:0xffffff,roughness:.92,flatShading:true}); const im=new TT.InstancedMesh(crownG[k],cm,L.length); const tm=o.trunks!==false?new TT.InstancedMesh(trunkG,K.M.trunk,L.length):null;
          L.forEach((it,i)=>{ const h=it[3], w=h*(it[6]||1); Eu.set(0,(it[0]*13.1+it[2]*7.7)%6.28,0); Qt.setFromEuler(Eu); V.set(it[0],it[1],it[2]); Sc.set(w,h,w); M4.compose(V,Qt,Sc); im.setMatrixAt(i,M4); if(tm) tm.setMatrixAt(i,M4); const P=LEAF[k]; const t=it[5]===undefined?((it[0]*.37+it[2]*.61)%1+1)%1:it[5]; c.set(P[Math.floor(t*P.length)%P.length]).convertSRGBToLinear(); im.setColorAt(i,c); });
          im.instanceMatrix.needsUpdate=true; if(im.instanceColor) im.instanceColor.needsUpdate=true; im.castShadow=!!o.cast; im.receiveShadow=true; (o.grp||K.life).add(im); out.push(im); if(tm){ tm.instanceMatrix.needsUpdate=true; tm.castShadow=!!o.cast; (o.grp||K.life).add(tm); } }); return out; };
      // 숲 흩뿌리기: 영역 [x0,x1,z0,z1], 간격 sp, 높이 함수 hf, 조건 ok(x,z,h)→false면 생략, 나무 크기 hs(x,z,h)
      const scatter=(x0,x1,z0,z1,sp,hf,ok,hs,kind)=>{ const L=[]; for(let z=z0;z<z1;z+=sp) for(let x=x0;x<x1;x+=sp){ const xx=x+(r()-.5)*sp*.9, zz=z+(r()-.5)*sp*.9; const h=hf(xx,zz); if(ok&&!ok(xx,zz,h)) continue; const s=hs?hs(xx,zz,h):sp*1.2; const kd=typeof kind==='function'?kind(xx,zz,h):(kind===undefined?(r()<.45?1:0):kind); L.push([xx,h-s*.08,zz,s*(.8+r()*.45),kd,r(),.85+r()*.4]); } return L; };
      // 도시 블록(멀리, 낮게): 한 메시 · 꼭짓점 색
      const blocks=(list)=>{ if(!list.length) return; const n=list.length*30, P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3); let o=0; const c=new TT.Color();
        const quad=(a,b,cc,d,nx,ny,nz,k)=>{ for(const q of [a,b,cc,a,cc,d]){ P[o*3]=q[0]; P[o*3+1]=q[1]; P[o*3+2]=q[2]; N[o*3]=nx; N[o*3+1]=ny; N[o*3+2]=nz; Cc[o*3]=c.r*k; Cc[o*3+1]=c.g*k; Cc[o*3+2]=c.b*k; o++; } };
        for(const [x,z,w,d,h,hex] of list){ c.set(hex).convertSRGBToLinear(); const X0=x-w/2,X1=x+w/2,Z0=z-d/2,Z1=z+d/2; quad([X0,h,Z1],[X1,h,Z1],[X1,h,Z0],[X0,h,Z0],0,1,0,1.06); quad([X0,0,Z1],[X1,0,Z1],[X1,h,Z1],[X0,h,Z1],0,0,1,.95); quad([X1,0,Z0],[X0,0,Z0],[X0,h,Z0],[X1,h,Z0],0,0,-1,.9); quad([X1,0,Z1],[X1,0,Z0],[X1,h,Z0],[X1,h,Z1],1,0,0,.86); quad([X0,0,Z0],[X0,0,Z1],[X0,h,Z1],[X0,h,Z0],-1,0,0,.86); }
        const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(Cc,3)); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:.9})); m.receiveShadow=true; K.life.add(m); return m; };
      // 값 잡음(능선 질감)
      const hsh=(x,z)=>{ let n=Math.imul(x|0,374761393)+Math.imul(z|0,668265263)|0; n=Math.imul(n^(n>>>13),1274126177); return ((n^(n>>>16))>>>0)/4294967296; };
      const vn=(x,z)=>{ const xi=Math.floor(x), zi=Math.floor(z), xf=x-xi, zf=z-zi; const u=xf*xf*(3-2*xf), v=zf*zf*(3-2*zf); const a=hsh(xi,zi), b=hsh(xi+1,zi), c=hsh(xi,zi+1), d=hsh(xi+1,zi+1); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; };
      const fbm=(x,z,o)=>{ let s=0, a=.5, f=1; for(let i=0;i<(o||4);i++){ s+=a*vn(x*f,z*f); a*=.5; f*=2.03; } return s; };
      const ridged=(x,z)=>{ let s=0,a=.5,f=1; for(let i=0;i<3;i++){ s+=a*(1-Math.abs(vn(x*f,z*f)*2-1)); a*=.5; f*=2.1; } return s; };
      const ss=t=>{ t=Math.min(1,Math.max(0,t)); return t*t*(3-2*t); };
      // 산 봉우리 합: pk [x,z,rx,rz,h,pow]
      const peaks=(x,z,pk)=>{ let h=0; for(let i=0;i<pk.length;i++){ const q=pk[i]; const ax=(x-q[0])/q[2], az=(z-q[1])/q[3]; const d2=ax*ax+az*az; if(d2<1){ const d=Math.sqrt(d2); const e=1-ss(d); h=Math.max(h,q[4]*Math.pow(e,q[5]||1.3))+q[4]*.04*(1-d)*(1-d); } } return h; };
      // 기본 산색: 숲(짙은 녹색 변주) · 바위(높은 곳·급경사) · 아래 풀
      const mcol=(x,z,h,ny,o)=>{ o=o||{}; const n=fbm(x*.02,z*.02,2), m=vn(x*.006+5,z*.006); let c=[.2+.07*n,.29+.08*n,.16+.05*n]; if(m>.6) c=[c[0]*.85+.05,c[1]*.9+.04,c[2]*.85]; const rock=Math.min(1,(h>(o.rockH||150)-50?(o.rock||0)*ss((h-(o.rockH||150))/50)*ss((.9-ny)/.12)*ss((vn(x*.012,z*.012)-.35)/.2):0)+(o.cliff||0)*ss((.62-ny)/.12)); if(rock>0){ const rc=[.58+.08*n,.56+.07*n,.52+.06*n]; c=c.map((v,i)=>v+(rc[i]-v)*Math.min(1,rock)); } const low=ss((o.low||6)-h); if(low>0){ const gc=o.lowc||[.62,.66,.5]; c=c.map((v,i)=>v+(gc[i]-v)*low); } return c; };
      return {BAK,MAS,mat,plane,terrain,forest,scatter,blocks,fbm,ridged,vn,ss,peaks,mcol,r,lin,tex}; })();

    K.layer(0);
    // 배경(v13, K.life): 종묘 숲 — 담장 밖을 빽빽한 활엽수·소나무 숲이 감싸고(정전 앞 신로 방향만 트임), 뒤로 응봉에서 내려온 낮은 언덕. 높이 추정
    { const H0=[-78,78,-30,96]; const dOut=(x,z)=>Math.hypot(Math.max(H0[0]-x,0,x-H0[1]),Math.max(H0[2]-z,0,z-H0[3]));
      const MT=[[-40,-260,320,170,26,1.3],[-300,-120,200,200,18,1.3],[260,-180,220,180,20,1.3],[0,-430,420,200,48,1.4]];
      const hf=(x,z)=>{ const h=E.peaks(x,z,MT); return .09+(h<.2?0:h*(.85+.3*E.ridged(x*.01,z*.01))*E.ss((dOut(x,z)-25)/80)); };
      const TR=E.terrain(-900,900,-900,900,80,80,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.03,z*.03,2); const d=dOut(x,z); if(d<14) return [.7+.04*n,.66+.04*n,.55]; if(Math.hypot(x,z-33)<235&&z>-12) return [.5+.05*n,.58+.05*n,.4]; if(d>420) return [.66+.05*n,.65+.05*n,.61]; return [.36+.05*n,.44+.05*n,.3]; },H0);
      const fr=(x,z)=>Math.hypot(x,z-33)<235&&z>-12;
      E.forest(E.scatter(-430,430,-460,460,7.5,TR.h,(x,z,h)=>{ const d=dOut(x,z); return d>12&&d<420&&!fr(x,z)&&E.r()<.92; },(x,z,h)=>9+E.vn(x*.05,z*.05)*7,(x,z,h)=>E.vn(x*.03+3,z*.03)<.4?1:0),{trunks:false,cast:false});
      const BL=[]; for(let x=-900;x<900;x+=34) for(let z=-800;z<900;z+=34){ const xx=x+(E.r()-.5)*6, zz=z+(E.r()-.5)*6; if(dOut(xx,zz)<440||Math.hypot(xx,zz)>900||E.r()<.15) continue; BL.push([xx,zz,18+E.r()*12,16+E.r()*12,8+E.r()*E.r()*30,E.r()<.3?'#8e9ba5':E.r()<.5?'#aaa69e':'#9c988f']); } E.blocks(BL); }
    K.b(0,-.02,33,154,.14,124,EA); // 담 안 마당(마사토)
    K.b(0,0,42.5,109,1.0,69,ST); K.b(0,0,4,128,2.0,24,ST); K.b(0,2.0,0,126,.6,16.6,ST); // 하월대(z 8~77) · 상월대(z -8~16, 1 m 더 높음) · 기단
    paving(0,1.0,42.5,109,69,3.0,2.6,11); paving(0,2.0,4,128,24,3.2,2.4,7); // 박석 줄눈
    K.b(0,2.0,16,128,.08,.5,SG2); K.b(0,1.0,77,109,.08,.5,SG2); for(const s of [-1,1]){ K.b(s*54.5,1.0,42.5,.5,.08,69,SG2); K.b(s*64,2.0,4,.5,.08,24,SG2); } // 월대 가장자리 장대석 띠
    // 신로(神路): 남신문 → 하월대 → 상월대 계단 — 한 단 높은 돌길 + 양옆 선
    K.b(0,.12,86,1.9,.16,18,SG); K.b(0,1.0,46.5,1.9,.16,61,SG); K.b(0,2.0,12,1.9,.12,8,SG); for(const s of [-1,1]){ K.b(s*.95,1.0,46.5,.08,.19,61,SG2); K.b(s*.95,.12,86,.08,.19,18,SG2); }
    for(const x of [-4.2,0,4.2]) stairs(x,16,2.0,1.0,3.4,4,'z',1); for(const x of [-4.2,0,4.2]) stairs(x,77,1.0,.12,3.4,4,'z',1); for(const s of [-1,1]){ stairs(s*54.5,42,1.0,.12,3.4,4,'x',s); stairs(s*64,4,2.0,.12,4,7,'x',s); }
    for(let i=0;i<5;i++) stairs(-20+i*10,8.3,2.6,2.0,3.2,2,'z',1);
    // 담: 사고석 기단 + 회벽 + 기와 지붕(얇은 두 장) · 남신문·동문·서문 자리는 비움
    const wall=(px,pz,w,d)=>{ K.b(px,.12,pz,w,.7,d,WLB); K.b(px,.82,pz,w,1.5,d,WH); K.b(px,2.32,pz,w+.5,.14,d+.5,DR); K.b(px,2.46,pz,w+.3,.12,d+.3,RU); };
    wall(0,-27,152,.6); wall(-41,93,70,.6); wall(41,93,70,.6); wall(-76,4.75,.6,63.5); wall(76,4.75,.6,63.5); wall(-76,68.5,.6,49); wall(76,68.5,.6,49);
    // 남신문(3칸 맞배) · 동문·서문(1칸)
    K.b(0,.1,93,12,.5,6.5,ST); inst(cylG(.26,3.4,10),RED,[0,1,2,3].flatMap(i=>[[-4.5+i*3,.6,91],[-4.5+i*3,.6,95]])); for(let i=0;i<3;i++) K.b(-3+i*3,.6,93,2.6,3.0,.2,DOOR); K.b(0,4.0,93,10.4,.4,4.8,RED); K.b(0,4.4,93,10.8,.45,5.2,BR);
    roofHF(0,4.85,93,14,8.6,2.3,{dt:1,mat:GW,under:RU,thk:.3,sori:.2,gmat:WD});
    for(const s of [-1,1]){ K.b(s*76,.1,40,5,.5,7.5,ST); inst(cylG(.22,3.0,8),RED,[[s*76-1.6,.6,37.8],[s*76+1.6,.6,37.8],[s*76-1.6,.6,42.2],[s*76+1.6,.6,42.2]]); K.b(s*76,.6,40,.2,2.7,4,DOOR); K.b(s*76,3.6,40,4.2,.4,5.2,BR); roofHF(s*76,4.0,40,5.6,9,1.9,{swap:true,dt:1,mat:GW,under:RU,thk:.25,gmat:WD}); }
    // 향나무(정전 서쪽) · 담 밖 몇 그루
    juniper(-70,-14,9); juniper(-66,-21,7); juniper(84,-14,8); juniper(-84,30,8); juniper(84,62,7); juniper(-20,-33,8); juniper(30,-34,7);
    // ---- 1: 정전 19칸 · 협실 · 월랑 (기둥 열·판문·익공·회벽) ----
    K.layer(1);
    const CH=4.3; const colG=cylG(.33,CH,12,.29), colS=cylG(.29,3.6,10,.26), colW=cylG(.27,3.3,10,.24);
    const cols=[]; for(let i=0;i<=NB;i++){ const x=-W/2+i*BAY; cols.push([x,F,6],[x,F,1.5]); } inst(colG,RED,cols); // 전퇴 열주 20 + 판문 열 20
    inst(cylG(.42,.14,10,.4),SG2,cols.map(c=>[c[0],F,c[2]])); // 주초
    // 판문 19 — 두 짝(가운데 문설주 선) + 문 위 흰 회벽, 문 아래 머름
    inst(boxG(BAY-.78,3.3,.26),DOOR,Array.from({length:NB},(_,i)=>[-W/2+(i+.5)*BAY,F+.3,1.5])); inst(boxG(.08,3.3,.3),DOOR2,Array.from({length:NB},(_,i)=>[-W/2+(i+.5)*BAY,F+.3,1.5]));
    inst(boxG(BAY-.7,.3,.3),BR,Array.from({length:NB},(_,i)=>[-W/2+(i+.5)*BAY,F,1.5])); inst(boxG(BAY-.7,.7,.3),WH,Array.from({length:NB},(_,i)=>[-W/2+(i+.5)*BAY,F+3.6,1.5]));
    K.b(0,F,-6,W+.6,CH,.5,WH); for(const s of [-1,1]) K.b(s*W/2,F,-2.25,.5,CH,7.5,WH); K.b(0,F,-2.3,W,.5,7.2,K.col(0x6e6a63)); // 뒷벽·옆벽·내부 바닥
    // 창방(기둥머리 잇는 보) · 익공 공포(기둥마다 앞으로 내민 작은 살미 2단) · 도리·처마도리
    K.b(0,F+CH,1.5,W+1.2,.5,.6,RED); K.b(0,F+CH,6,W+1.2,.5,.6,RED); K.b(0,F+CH,-6,W+1.2,.5,.5,RED);
    const ik=[]; for(let i=0;i<=NB;i++){ const x=-W/2+i*BAY; ik.push([x,F+CH+.5,6.45]); } inst(boxG(.5,.45,1.1),GRN,ik); inst(boxG(.34,.3,.7),DR,ik.map(p=>[p[0],p[1]+.45,p[2]+.3])); // 익공(초익공·이익공 약식)
    inst(boxG(.5,.45,1.1),GRN,ik.map(p=>[p[0],p[1],-6.45])); // 뒷면 익공
    K.b(0,F+CH+.5,0,W+1.4,.45,13.4,BR); K.b(0,F+CH+.95,0,W+2.2,.5,14.6,RU); // 장여·도리 띠
    // 협실(각 3칸, 낮게) — 기둥·판문·회벽
    for(const s of [-1,1]){ const xc=s*(W/2+5.6); const cs=[]; for(let i=0;i<=3;i++){ const x=xc-s*5.25+s*i*3.5; cs.push([x,F,6],[x,F,1.5]); } inst(colS,RED,cs); for(let i=0;i<3;i++){ K.b(xc-s*3.5+s*i*3.5,F+.3,1.5,2.8,2.8,.26,DOOR); K.b(xc-s*3.5+s*i*3.5,F+3.1,1.5,2.8,.5,.26,WH); } K.b(xc,F,-6,11,3.6,.5,WH); K.b(xc+s*5.3,F,-2.25,.5,3.6,7.5,WH); K.b(xc,F+3.6,1.5,11.4,.4,.5,RED); K.b(xc,F+3.6,6,11.4,.4,.5,RED); K.b(xc,F+4.0,0,11.6,.45,13,BR); inst(boxG(.4,.4,.9),GRN,cs.filter(c=>c[2]===6).map(c=>[c[0],F+3.6,6.4]));
      // 동월랑(개방)·서월랑(벽) 5칸 남향 — 월대 양옆에 붙은 긴 행각
      const xw=s*58.3; K.b(xw,0,17.5,6.6,2.0,20.5,ST); const wc=[]; for(let j=0;j<=5;j++) for(const px of [-1.8,1.8]) wc.push([xw+px,2.0,8.5+j*3.6]); inst(colW,RED,wc); if(s<0){ K.b(xw-1.85,2.0,17.5,.3,3.3,18.4,WH); K.b(xw,2.0,26.6,3.8,3.3,.3,WH); for(let j=0;j<5;j++) K.b(xw+1.8,2.0,10.3+j*3.6,.2,3.3,3.2,WH); } K.b(xw,5.3,17.5,4.2,.4,18.8,RED); K.b(xw,5.7,17.5,5.0,.4,19.6,BR); }
    // ---- 2: 맞배지붕(풍판)·협실 지붕·월랑 지붕 ----
    K.layer(2);
    const RY=F+CH+1.45; roofHF(0,RY,0,W+6,20,4.6,{dt:1,mat:GW,under:RU,thk:.45,sori:.45,gmat:WD,nu:48,rh:.6});
    for(const s of [-1,1]){ K.b(s*(W/2+3.3),RY+4.2,0,.7,1.1,1.0,DR); const gs=[]; for(let k=0;k<9;k++){ const h=4.3-Math.abs(k-4)*.9; gs.push(bx(s*(W/2+3.05),RY,-8+k*2,.14,h,.5)); } merge(gs,DR); } // 취두·풍판 널판 선
    for(const s of [-1,1]){ roofHF(s*(W/2+5.6),F+4.45,0,12.6,18.4,3.4,{dt:1,mat:GW,under:RU,thk:.4,sori:.3,gmat:WD}); roofHF(s*58.3,6.1,17.5,7.4,22.8,2.6,{swap:true,dt:1,mat:GW,under:RU,thk:.3,sori:.2,gmat:WD}); }
  }});
