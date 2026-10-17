__bsigFill({"kanazawa":function(K){
// 사실: SANAA(세지마 가즈요·니시자와 류에) 설계 · 2004-10-09 개관 · 지름 112.5 m 원형, 투명 유리 외벽 · 전시실 높이 4~12 m(일부 유리 천장 자연광) · 유리 중정 4곳 · 여러 방향에서 출입 · 상설작품 「스위밍 풀」(레안드로 에를리치, 2004)·「컬러 액티비티 하우스」(올라퓌르 엘리아손, 2010) · 대지 26,009 ㎡, 면적 17,363 ㎡
// 출처: Wikipedia '21st Century Museum of Contemporary Art, Kanazawa'(112.5 m, 4~12 m, 4 courtyards, 작품) · archiweb.cz(대지 26,009 ㎡, 17,363 ㎡) · DETAIL inspiration(전시실 18~324 ㎡, 유리 아트리움 4)
// 추정: 원형 지붕 높이 4.0 m(복도 층고), 지붕 두께 0.35 m, 유리 멀리언 간격 2.2 m, 전시실 상자 배치·크기는 평면 사진을 보고 단순화, 「스위밍 풀」 9 × 7 m · 수면 아래 방 깊이 2.6 m
    const T=K.T;
    const WHT=K.col(0xf9f9f7,{roughness:.85,emissive:0x3a3a39,emissiveIntensity:.35}), WH2=K.col(0xd6d7d5,{roughness:.9}), FLR=K.col(0xdcdcd8,{roughness:.55,emissive:0x5a5a58,emissiveIntensity:.6}), MUL=K.col(0xe8eaec,{roughness:.35,metalness:.5}), GRY=K.col(0x9a9da1,{roughness:.6}), ASP=K.col(0x4a4c50,{roughness:.95}), PAV=K.col(0xc9c6bf,{roughness:.95}), BLU=K.col(0x6fb6d6,{roughness:.35}), LAD=K.col(0xd0d4d8,{roughness:.3,metalness:.8});
    const ST=PAV, SG2=PAV, JUN=K.col(0x3b5236,{roughness:.95});
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

    const LIFE=f=>{ const pc=K.cur; K.cur=K.life; f(); K.cur=pc; };
    const R0=56.25, HR=4.0;
    // 유리: 맑고 반사 있는 곡면(투명) — 기본 glass보다 조금 밝게
    const GL=K.col(0xb3d2de,{roughness:.04,metalness:.4,transparent:true,opacity:.26,depthWrite:false}); GL.side=T.DoubleSide;
    const SKY=K.col(0xcfe3ec,{roughness:.05,metalness:.4,transparent:true,opacity:.55,depthWrite:false});
    const WAT=K.col(0x63b9d4,{roughness:.03,metalness:.3,transparent:true,opacity:.55,depthWrite:false});
    // 전시실 상자 [x,z,w,d,h,유리천장]
    const BOX=[[-1,-4,18,18,12,1],[18,-14,14,12,8,0],[-22,-16,12,16,6,1],[-20,10,16,12,9.5,0],[16,11,12,14,6.5,1],[0,25,20,10,5,0],[-6,-28,16,10,7,0],[28,4,8,10,10,0],[-34,-2,8,12,5,0],[34,-18,8,10,4.8,0],[-30,24,10,8,5.5,0],[18,32,10,8,4.6,0],[-14,36,10,8,5,0],[10,-36,12,8,6,1],[-32,-30,8,8,4.6,0]];
    const COURT=[[4,11,11,9],[-17,24,6,6],[26,-30,7,7],[-20,-36,6,6]]; // 유리 중정 4 (첫째 = 스위밍 풀)
    const PO=[4,11,9,7];

    // ================= 배경(K.life): 잔디 공원·길·나무·가나자와 시가·겐로쿠엔 숲·먼 산 =================
    LIFE(()=>{
      const MT=[[1700,-400,900,1400,520,1.4],[2400,700,900,900,700,1.5],[-200,-2300,1800,500,300,1.4]];
      const kenr=(x,z)=>9*Math.exp(-Math.pow(Math.hypot((x-330)/170,(z+40)/230),2));
      const hf=(x,z)=>kenr(x,z)+E.peaks(x,z,MT)*E.ss((Math.hypot(x,z)-900)/400);
      const inRoad=(x,z)=>Math.abs(z-95)<9||Math.abs(x+95)<8||Math.abs(x-150)<10||Math.abs(z+105)<8;
      const TR=E.terrain(-260,260,-260,260,130,130,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.06,z*.06,2); const r=Math.hypot(x,z); if(r<R0+.5) return [.86,.86,.84]; if(Math.abs(x)<86&&z>-96&&z<86) return [.42+.05*n,.6+.05*n,.3+.03*n]; if(h>2) return [.3+.04*n,.42+.05*n,.25]; return [.6+.03*n,.6+.03*n,.57]; },[PO[0]-PO[2]/2,PO[0]+PO[2]/2,PO[1]-PO[3]/2,PO[1]+PO[3]/2]);
      E.terrain(-2600,2600,-2600,2600,110,110,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.01,z*.01,2); if(h>40) return [.33+.05*n,.43+.05*n,.3]; if(h>4) return [.31+.04*n,.42+.04*n,.27]; return [.6+.03*n,.6+.03*n,.57]; },[-260,260,-260,260]);
      // 길(아스팔트) + 보도
      for(const [x,z,w,d] of [[0,95,520,14],[-95,0,12,520],[150,0,16,520],[0,-105,520,12]]){ K.b(x,0,z,w,.04,d,ASP); }
      // 공원 산책로(원으로 모이는 길 4) + 건물 둘레 포장 띠
      { const g=[]; for(const a of [0,Math.PI/2,Math.PI,-Math.PI/2,.8,-2.3]){ const L=34; const cx=Math.sin(a)*(R0+L/2), cz=Math.cos(a)*(R0+L/2); g.push(bx(cx,0,cz,3.2,.05,L,a)); } merge(g,PAV,false); }
      { const rg=new T.RingGeometry(R0+.2,R0+3.2,96,1); rg.rotateX(-Math.PI/2); const m=new T.Mesh(rg,PAV); m.position.y=.04; put(m,false); }
      // 「컬러 액티비티 하우스」(엘리아손, 2010): 세 색 유리 곡면 벽(청록·자홍·노랑) — 잔디 위
      { const cols=[0x2ec4d6,0xd23c9a,0xf1d23a]; cols.forEach((c,i)=>{ const m=K.col(c,{roughness:.1,metalness:.2,transparent:true,opacity:.55,depthWrite:false}); const a0=i*2.09; K.surf((u,v)=>{ const a=a0+u*1.9, r=7+i*.0; return [72+Math.cos(a)*r,v*3.6,-58+Math.sin(a)*r]; },20,1,m); }); }
      // 나무: 공원 가장자리 줄나무 + 산책 숲, 겐로쿠엔 쪽 큰 숲
      E.forest(E.scatter(-88,88,-98,88,7,TR.h,(x,z,h)=>{ const r=Math.hypot(x,z); const edge=Math.abs(x)>70||z>70||z<-80; const ang=Math.atan2(z,x); return r>R0+14&&r<98&&!(ang>.3&&ang<1.25)&&(edge||E.r()<.18)&&!inRoad(x,z)&&!(x>55&&x<90&&z>-75&&z<-40); },(x,z,h)=>7+E.r()*5,(x,z,h)=>E.r()<.2?2:0),{trunks:true});
      E.forest(E.scatter(170,520,-320,260,8,TR.h,(x,z,h)=>kenr(x,z)>1.2&&E.r()<.85,(x,z,h)=>10+E.r()*7,(x,z,h)=>E.r()<.45?1:0),{trunks:false});
      E.forest(E.scatter(-2500,2500,-2500,2500,45,TR.h,(x,z,h)=>h>6&&E.r()<.6,(x,z,h)=>14+E.r()*8,(x,z,h)=>E.r()<.5?2:0),{trunks:false});
      // 가나자와 시가(중저층) — 공원 둘레 블록, 멀수록 낮고 성글게
      const BL=[]; for(let x=-1200;x<1200;x+=30) for(let z=-1200;z<1200;z+=30){ const xx=x+(E.r()-.5)*8, zz=z+(E.r()-.5)*8; if(Math.hypot(xx,zz)<178) continue; if(inRoad(xx,zz)||kenr(xx,zz)>1||Math.hypot(xx,zz)>1200||E.r()<.15) continue; const rr=Math.hypot(xx,zz), near=rr<380; BL.push([xx,zz,16+E.r()*12,14+E.r()*12,rr<260?(7+E.r()*9):near?(8+E.r()*28):(6+E.r()*14),E.r()<.35?'#a9adb2':E.r()<.5?'#c4bfb6':'#8f9399']); } E.blocks(BL);
    });

    // ================= 0: 바닥(원형 바닥판) · 스위밍 풀 수조 =================
    K.layer(0);
    { const sh=new T.Shape(); sh.absarc(0,0,R0,0,Math.PI*2,false); const ho=new T.Path(); ho.moveTo(PO[0]-PO[2]/2,-(PO[1]-PO[3]/2)); ho.lineTo(PO[0]+PO[2]/2,-(PO[1]-PO[3]/2)); ho.lineTo(PO[0]+PO[2]/2,-(PO[1]+PO[3]/2)); ho.lineTo(PO[0]-PO[2]/2,-(PO[1]+PO[3]/2)); ho.lineTo(PO[0]-PO[2]/2,-(PO[1]-PO[3]/2)); sh.holes.push(ho);
      const g=new T.ExtrudeGeometry(sh,{depth:.12,bevelEnabled:false,curveSegments:48}); g.rotateX(-Math.PI/2); put(new T.Mesh(g,FLR),false); }
    // 수조: 연한 하늘색 타일 벽·바닥 + 사다리 + 반투명 수면(물 밑 방이 비침)
    { const [px,pz,pw,pd]=PO, dep=2.6; K.b(px,-dep,pz,pw,.1,pd,BLU); for(const s of [-1,1]){ K.b(px+s*(pw/2-.05),-dep,pz,.1,dep,pd,BLU); K.b(px,-dep,pz+s*(pd/2-.05),pw,dep,.1,BLU); }
      K.b(px,-dep+.1,pz,pw-.4,.02,pd-.4,K.col(0x8fd0e6,{roughness:.4})); for(let i=0;i<4;i++) K.b(px-pw/2+1.5+i*2,-dep+.1,pz,.06,.02,pd-.5,K.col(0x4a8fb0)); // 바닥 줄
      K.water(px,-.12,pz,pw-.2,pd-.2).material=WAT; for(const s of [-.4,.4]) K.b(px+pw/2-.3,-1.6,pz+s,.06,2.2,.06,LAD); for(let k=0;k<4;k++) K.b(px+pw/2-.3,-1.2+k*.4,pz,.06,.05,.86,LAD); K.c(px+pw/2-.3,.1,pz-.4,.04,.9,LAD,6); K.c(px+pw/2-.3,.1,pz+.4,.04,.9,LAD,6);
      K.b(px,.12,pz-pd/2-.4,pw+1.6,.06,.8,K.col(0xbfa98a,{roughness:.8})); K.b(px,.12,pz+pd/2+.4,pw+1.6,.06,.8,K.col(0xbfa98a,{roughness:.8})); } // 데크
    // ================= 1: 흰 전시실 상자 · 유리 중정 =================
    K.layer(1);
    { const gs=[], gt=[]; for(const [x,z,w,d,h,sk] of BOX){ gs.push(bx(x,.12,z,w,h-.12,d)); if(sk) gt.push([x,z,w,d,h]); } merge(gs,WHT); for(const [x,z,w,d,h] of gt){ K.b(x,h-.02,z,w-1.2,.08,d-1.2,SKY); } }
    // 유리 중정: 사방 유리벽(가는 프레임) — 지붕 높이까지
    { const fr=[]; for(const [x,z,w,d] of COURT){ for(const [ox,oz,L,ry] of [[0,d/2,w,0],[0,-d/2,w,0],[w/2,0,d,Math.PI/2],[-w/2,0,d,Math.PI/2]]){ const m=K.b(x+ox,.12,z+oz,ry?.04:L,HR-.12,ry?L:.04,GL); const n=Math.max(1,Math.round(L/2.2)); for(let i=0;i<=n;i++){ const u=-L/2+L*i/n; fr.push(bx(x+ox+(ry?0:u),.12,z+oz+(ry?u:0),.06,HR-.12,.06)); } } } merge(fr,MUL); }
    // 복도 안 사람 높이 소품(벤치 몇 개) — 크기감
    inst(boxG(1.8,.45,.5),K.col(0xd8d2c4,{roughness:.8}),[[-40,.12,14],[38,.12,8],[-6,.12,44],[22,.12,-44],[-46,.12,-14]].map(p=>[p[0],p[1],p[2],Math.atan2(p[0],p[2])+Math.PI/2,1,1,1]));
    // ================= 2: 원형 유리 외벽 + 멀리언 + 얇은 평지붕 =================
    K.layer(2);
    K.surf((u,v)=>{ const a=u*Math.PI*2; return [Math.cos(a)*R0,.12+v*(HR-.12),Math.sin(a)*R0]; },160,1,GL);
    { const n=Math.round(2*Math.PI*R0/2.2); inst(boxG(.08,HR-.12,.14),MUL,Array.from({length:n},(_,i)=>{ const a=i/n*Math.PI*2; return [Math.cos(a)*R0,.12,Math.sin(a)*R0,-a,1,1,1]; })); }
    // 지붕: 원판 + 중정·높은 상자 자리 구멍(높은 상자는 지붕 위로 솟음)
    { const sh=new T.Shape(); sh.absarc(0,0,R0+.35,0,Math.PI*2,false); for(const [x,z,w,d] of COURT){ const ho=new T.Path(); ho.moveTo(x-w/2,-(z-d/2)); ho.lineTo(x+w/2,-(z-d/2)); ho.lineTo(x+w/2,-(z+d/2)); ho.lineTo(x-w/2,-(z+d/2)); ho.lineTo(x-w/2,-(z-d/2)); sh.holes.push(ho); }
      const g=new T.ExtrudeGeometry(sh,{depth:.35,bevelEnabled:false,curveSegments:64}); g.rotateX(-Math.PI/2); const m=new T.Mesh(g,WH2); m.position.y=HR; put(m); }
    // 지붕 위: 상자 윗면 갓 + 설비 몇 개(낮게)
    { const g=[]; for(const [x,z,w,d,h] of BOX){ if(h<=HR+.4) continue; g.push(bx(x,h-.02,z,w+.08,.12,d+.08)); } merge(g,WH2); }
    inst(boxG(2.4,.9,1.6),GRY,[[-44,HR+.35,8],[40,HR+.35,22],[-8,HR+.35,-46]]);
    // 정리: 기본 대지(평지 바닥·도로·잔디·가로수)는 빼고 사람만 — 이 build의 지형·공원이 바닥
    { const rt=K.bldg.parent, st=rt&&rt.children[0]; if(st&&st!==K.bldg&&st!==K.life) st.add=()=>st;
      const la=K.life.add.bind(K.life); K.life.add=(...o)=>{ o.forEach(m=>{ if(m&&m.material===K.M.people) la(m); }); return K.life; }; }
  }});
