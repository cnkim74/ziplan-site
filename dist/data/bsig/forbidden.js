__bsigFill({"forbidden":function(K){
// 실측: 태화전 면활 11칸 약 64 m · 진심 5칸 약 37.2 m · 전각 높이 26.92 m, 기단 포함 통고 35.05 m(→ 3단 기단 8.13 m) · 중첨무전 · 1420 창건, 현존은 1697(강희 36년) 재건 · 잡상 10
// 출처: 光明网 2021-08-07(太和殿 面阔11间 64 m, 进深5间 37.2 m, 殿高26.92 m, 连同台基通高35.05 m, 重檐庑殿, 脊兽10) · Wikipedia 'Hall of Supreme Harmony'(1697 재건, 3단 대리석 기단)
// 추정 치수(사진 비례): 기둥 지름 1.06 m·높이 7.6 m, 아래처마 17.5 m, 위처마 22.6 m, 용마루 31.9 m, 치미 3 m · 삼대 남쪽 단 폭 130 m, 단마다 7 m 물림 · 광장 동서 200 m × 남북 약 140 m · 태화문 50 × 22 m
    const T=K.T;
    const RED=K.col(0x9b2a1f,{roughness:.75}), RED2=K.col(0x7f2218,{roughness:.8}), MAR=K.col(0xebe7dc,{roughness:.55}), MAR2=K.col(0xd9d4c6,{roughness:.6}), GB=K.col(0x2f6662,{roughness:.6}), BL=K.col(0x2c4f7a,{roughness:.6}), GOLD=K.col(0xd2a640,{roughness:.35,metalness:.6}), BRZ=K.col(0x4a4031,{roughness:.45,metalness:.7}), YL=K.col(0xd9a23a,{roughness:.35,metalness:.1}), YLD=K.col(0xb07b22,{roughness:.4}), DK=K.col(0x2a2622,{roughness:.8}), GRY=K.col(0x8f8b84,{roughness:.9});
    const ST=MAR, SG2=MAR2, JUN=K.col(0x3b5236,{roughness:.95});
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
    // 캔버스 재질(없으면 단색)
    const tmat=(key,px,draw,fb,o)=>{ const t=E.tex(key,px,draw); const m=new T.MeshStandardMaterial(Object.assign({color:0xffffff,map:t||null,roughness:.6},o||{})); if(!t){ m.color.set(fb); m.color.convertSRGBToLinear(); } return m; };
    // 황색 유리기와: 256px = 2 m, 기왓골 4줄(0.5 m 간격) — 수키와 볼록 하이라이트 + 암키와 골 그늘 + 기와 이음 가로선
    const TILE=tmat('d_tileY',256,(g,N)=>{ g.fillStyle='#6e4410'; g.fillRect(0,0,N,N); for(let i=0;i<4;i++){ const x=i*N/4; const gr=g.createLinearGradient(x,0,x+N/4,0); gr.addColorStop(0,'#6a420f'); gr.addColorStop(.2,'#a8721c'); gr.addColorStop(.48,'#e0aa3c'); gr.addColorStop(.6,'#f3cd6a'); gr.addColorStop(.78,'#b07a20'); gr.addColorStop(1,'#5e3a0c'); g.fillStyle=gr; g.fillRect(x+N/4*.18,0,N/4*.64,N); } g.fillStyle='rgba(90,55,10,.35)'; for(let j=0;j<6;j++) g.fillRect(0,j*N/6,N,2); },0xd9a23a,{roughness:.55,metalness:.05});
    // 단청 띠(和璽彩畫 약식): 청·녹 칸 + 금선
    const CAI=tmat('d_cai',256,(g,N)=>{ g.fillStyle='#2c5f78'; g.fillRect(0,0,N,N); for(let i=0;i<4;i++){ g.fillStyle=i%2?'#2f6b5c':'#264f86'; g.fillRect(i*N/4,0,N/4,N); g.strokeStyle='#e0b850'; g.lineWidth=5; g.beginPath(); g.moveTo(i*N/4+8,8); g.lineTo(i*N/4+N/8,N/2); g.lineTo(i*N/4+8,N-8); g.stroke(); g.beginPath(); g.moveTo(i*N/4+N/4-8,8); g.lineTo(i*N/4+N/8,N/2); g.lineTo(i*N/4+N/4-8,N-8); g.stroke(); g.fillStyle='#e8c35a'; g.beginPath(); g.arc(i*N/4+N/8,N/2,9,0,7); g.fill(); } g.fillStyle='#e0b850'; g.fillRect(0,0,N,6); g.fillRect(0,N-6,N,6); },0x2c5f78,{roughness:.6});
    // 격선문(隔扇門): 한 칸 = 네 짝, 위 2/3 마름모 살(菱花) + 아래 궁판 · 금 장식
    const DOOR=tmat('d_door',256,(g,N)=>{ g.fillStyle='#8e2419'; g.fillRect(0,0,N,N); const lw=N/4; for(let i=0;i<4;i++){ const x=i*lw; g.fillStyle='#a32c1f'; g.fillRect(x+5,6,lw-10,N-12); g.fillStyle='#5b1a12'; g.fillRect(x+12,14,lw-24,N*.6); g.strokeStyle='#c98e3a'; g.lineWidth=1.6; for(let k=-8;k<16;k++){ g.beginPath(); g.moveTo(x+12+k*7,14); g.lineTo(x+12+k*7+N*.6,14+N*.6); g.stroke(); g.beginPath(); g.moveTo(x+12+k*7,14+N*.6); g.lineTo(x+12+k*7+N*.6,14); g.stroke(); } g.fillStyle='#8e2419'; g.fillRect(x,0,12,N); g.fillRect(x+lw-12,0,12,N); g.fillStyle='#a32c1f'; g.fillRect(x+12,N*.68,lw-24,N*.24); g.strokeStyle='#d6a648'; g.lineWidth=3; g.strokeRect(x+18,N*.71,lw-36,N*.18); } },0x8e2419,{roughness:.7});
    // 광장 전돌(澄漿磚 회색, 엇갈려 깔기) 512px = 8 m
    const BRK=tmat('d_fzb',512,(g,N,rr)=>{ g.fillStyle='#5f5c57'; g.fillRect(0,0,N,N); const bh=N/16; for(let j=0;j<16;j++){ const off=(j%2)*N/16; for(let i=-1;i<9;i++){ const x=off+i*N/8; const t=122+Math.floor(rr()*24); g.fillStyle=`rgb(${t},${t-2},${t-7})`; g.fillRect(x+1.5,j*bh+1.5,N/8-3,bh-3); } } for(let i=0;i<2500;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.08)':'rgba(30,30,30,.08)'; g.fillRect(rr()*N,rr()*N,2,2); } },0x9a968e,{roughness:.95});
    BRK.userData.tm=8;
    // 겹처마 우진각 지붕(높이장): E×D 처마 외곽, ye 처마 높이, H 처마→용마루 표면, R 용마루 길이(추산 推山), p 오목함, lift 귀솟음
    const hip=(cx,ye,cz,E,D,H,o)=>{ o=o||{}; const R=o.R!==undefined?o.R:Math.max(0,E-D), p=o.p||1.5, lift=o.lift||0, thk=o.thk||.45, us=o.us||.5, mt=o.mat, um=o.under||mt;
      const tt=(a,b)=>{ const bb=Math.abs(b)/(D/2), ta=E>R?Math.max(0,(Math.abs(a)-R/2)/((E-R)/2)):0; return [Math.min(1,Math.max(ta,bb)),bb>=ta]; };
      const yf=(a,b)=>{ const aa=Math.abs(a)/(E/2), bb=Math.abs(b)/(D/2); return ye+H*Math.pow(1-tt(a,b)[0],p)+lift*Math.pow(aa,3)*Math.pow(bb,3); };
      const sheet=(m,dy,uv)=>K.surf((u,v)=>{ const a=-E/2+E*u, b=-D/2+D*v; const f=tt(a,b)[1]; return [cx+a,yf(a,b)+dy,cz+b,uv?(f?a*us:b*us):a/2,uv?(f?b*us:a*us):b/2]; },o.nu||64,o.nv||32,m);
      sheet(mt,0,true); sheet(um,-thk,false);
      K.surf((u,v)=>{ const s=u*4, k=Math.floor(Math.min(3.999,s)), f=s-k; let a,b; if(k===0){a=-E/2+E*f;b=-D/2;} else if(k===1){a=E/2;b=-D/2+D*f;} else if(k===2){a=E/2-E*f;b=D/2;} else {a=-E/2;b=D/2-D*f;} const y=yf(a,b); return [cx+a,y-thk-(o.fas||.25)+(thk+(o.fas||.25))*v,cz+b]; },128,1,o.rim||um);
      // 추녀마루 4 (둥근 단면 리본) + 잡상
      const rw=o.rw||.9, rh=o.rh||.7; const beasts=[];
      for(const sx of [-1,1]) for(const sz of [-1,1]){ const a0=sx*R/2, b0=0, a1=sx*E/2, b1=sz*D/2; const L=Math.hypot(a1-a0,b1-b0), nx=-(b1-b0)/L, nz=(a1-a0)/L;
        K.surf((u,v)=>{ const a=a0+(a1-a0)*u, b=b0+(b1-b0)*u, th=Math.PI*v; const ox=Math.cos(th)*rw/2; return [cx+a+nx*ox,yf(a,b)+Math.sin(th)*rh,cz+b+nz*ox]; },24,6,o.rmat||mt);
        if(o.beasts){ for(let i=0;i<=o.beasts;i++){ const u=.97-i*.032*(E/62); const a=a0+(a1-a0)*u, b=b0+(b1-b0)*u; beasts.push([cx+a,yf(a,b)+rh*.8,cz+b,Math.atan2(a1-a0,b1-b0),1,i===0?1.25:1,1]); } } }
      if(R>.5&&o.ridge!==false){ K.b(cx,ye+H-.3,cz,R+rw,o.rdh||1.5,rw*1.3,o.rmat||mt); K.b(cx,ye+H+(o.rdh||1.5)-.35,cz,R+rw+.2,.18,rw*1.45,o.rmat||mt); }
      return {yf,beasts}; };
    // 기단 한 단(須彌座 약식): 아래 굽 + 들어간 허리 + 위 갓돌(밖으로 내민)
    const tier=(x0,x1,z0,z1,y,h,grp)=>{ const w=x1-x0, d=z1-z0, cx=(x0+x1)/2, cz=(z0+z1)/2; grp.push(bx(cx,y,cz,w,h*.28,d), bx(cx,y+h*.28,cz,w-.5,h*.44,d-.5), bx(cx,y+h*.72,cz,w-.15,h*.12,d-.15), bx(cx,y+h*.84,cz,w+.25,h*.16,d+.25)); };
    // 난간(望柱 기둥 + 欄板 판 + 螭首 물받이): 사각 가장자리, gaps=[[축,위치,폭]]
    const POSTS=[], CAPS=[], SPOUT=[], PANEL=[];
    const balus=(x0,x1,z0,z1,y,gaps,spout,skipN)=>{ const sp=1.6; const edges=[['s',x0,z1,x1,z1],['e',x1,z1,x1,z0],['n',x1,z0,x0,z0],['w',x0,z0,x0,z1]];
      for(const [nm,ax,az,bx_,bz] of edges){ if(skipN&&nm==='n') continue; const L=Math.hypot(bx_-ax,bz-az), n=Math.round(L/sp); const isX=Math.abs(bx_-ax)>0; let run=null;
        const flush=(i0,i1)=>{ if(i1<=i0) return; const t0=i0/n, t1=i1/n; const px=ax+(bx_-ax)*(t0+t1)/2, pz=az+(bz-az)*(t0+t1)/2, LL=L*(t1-t0); PANEL.push(bx(px,y+.12,pz,isX?LL:.16,.86,isX?.16:LL)); PANEL.push(bx(px,y+.98,pz,isX?LL:.22,.12,isX?.22:LL)); };
        for(let i=0;i<=n;i++){ const t=i/n, px=ax+(bx_-ax)*t, pz=az+(bz-az)*t; const inGap=(gaps||[]).some(([e,c,gw])=>e===nm&&Math.abs((isX?px:pz)-c)<gw/2); if(inGap){ if(run!==null){ flush(run,i-1); run=null; } continue; } if(run===null) run=i; else if(i===n) flush(run,i);
          POSTS.push([px,y,pz,0,1,1,1]); CAPS.push([px,y+1.3,pz,0,1,1,1]); if(spout) SPOUT.push([px+(nm==='e'?1:nm==='w'?-1:0)*.35,y-.42,pz+(nm==='s'?1:nm==='n'?-1:0)*.35,nm==='e'||nm==='w'?Math.PI/2:0,1,1,1]); }
        if(run!==null) flush(run,n); } };
    const flushBal=()=>{ if(POSTS.length){ inst(boxG(.32,1.3,.32),MAR,POSTS); inst(cylG(.2,.35,8,.12),MAR,CAPS); } if(SPOUT.length) inst(boxG(.3,.3,1.0),MAR,SPOUT); merge(PANEL,MAR); POSTS.length=0; CAPS.length=0; SPOUT.length=0; PANEL.length=0; };
    // 계단 한 벌(남향, +z로 내려감): x 중심, z 윗단 끝, 높이 yt→yb, 폭 w
    const STEPG=[]; const flight=(x,z,yt,yb,w)=>{ const n=Math.max(2,Math.round((yt-yb)/.16)), rise=(yt-yb)/n, run=.33; for(let k=0;k<n;k++) STEPG.push(bx(x,yb,z+(k+.5)*run,w,yt-yb-k*rise,run)); return n*run; };
    // 어로(御路) 조각 경사돌: 계단 사이 비스듬한 판(구름·용 부조 약식 = 줄무늬)
    const ramp=(x,z,yt,yb,w,L)=>{ K.surf((u,v)=>{ const zz=z+L*u, yy=yt-(yt-yb)*u+.05; return [x-w/2+w*v,yy,zz]; },2,2,MAR2); const gs=[]; for(let k=1;k<6;k++){ const u=k/6; gs.push(bx(x,yt-(yt-yb)*u-.12,z+L*u,w*.8,.2,.25)); } merge(gs,MAR); };
    // 두공(斗栱) 한 벌: 밖으로 세 단 내민 받침 (+z 방향 기준) — 인스턴스용 지오메트리
    const dgG=(()=>{ const gs=[bx(0,0,0,.55,.35,.55),bx(0,.35,.25,.45,.3,1.0),bx(0,.65,.5,.45,.3,1.5),bx(0,.95,.75,.5,.3,1.9),bx(0,.35,0,1.5,.22,.32),bx(0,.7,.25,1.9,.22,.32)]; const G=gs.map(g=>g.toNonIndexed()); let n=0; for(const g of G) n+=g.attributes.position.count; const P=new Float32Array(n*3), N=new Float32Array(n*3); let o=0; for(const g of G){ P.set(g.attributes.position.array,o*3); N.set(g.attributes.normal.array,o*3); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(P,3)); g.setAttribute('normal',new T.BufferAttribute(N,3)); return g; })();
    const dgRing=(hw,hd,y,sp,list)=>{ for(const [s,ry] of [['s',0],['n',Math.PI],['e',Math.PI/2],['w',-Math.PI/2]]){ const L=(s==='s'||s==='n')?hw*2:hd*2, n=Math.round(L/sp); for(let i=0;i<=n;i++){ const u=-L/2+L*i/n; let x,z; if(s==='s'){x=u;z=hd;} else if(s==='n'){x=-u;z=-hd;} else if(s==='e'){x=hw;z=-u;} else {x=-hw;z=u;} list.push([x,y,z,ry,1,1,1]); } } };
    // 치미(正吻): 몸통 + 말린 꼬리 + 등지느러미 칼
    const chiwen=(x,y,z,s)=>{ K.b(x,y,z,1.0,1.8,.7,YL); K.b(x-s*.35,y+1.6,z,.8,.7,.62,YL); K.b(x-s*.75,y+2.1,z,.5,.35,.56,YL); K.b(x+s*.45,y+.2,z,.4,1.3,.6,YLD); K.b(x-s*.1,y+2.2,z,.18,.4,.18,GOLD); };

    // ================= 배경(K.life): 광장·회랑·태화문·삼대 북쪽(중화전·보화전)·궁궐 지붕 바다·해자·경산 =================
    const H0=[-66,66,-40,68];
    LIFE(()=>{
      const hf=(x,z)=>{ const jx=(x-0)/260, jz=(z+930)/120; const jing=45*Math.pow(Math.max(0,1-jx*jx-jz*jz),.9); const inMoat=(Math.abs(x)>376&&Math.abs(x)<428&&z>-660&&z<352)||(z<-630&&z>-682&&Math.abs(x)<428)||(z>330&&z<382&&Math.abs(x)<428); return (inMoat?-2.6:.04)+jing+(jing>1?E.fbm(x*.03,z*.03,2)*3:0); };
      const TR=E.terrain(-1400,1400,-1500,1300,120,120,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.02,z*.02,2); if(h<-1) return [.38,.42,.38]; if(h>2) return [.3+.05*n,.4+.05*n,.26]; if(Math.abs(x)<376&&z>-630&&z<352) return [.62+.03*n,.6+.03*n,.56]; return [.55+.04*n,.56+.04*n,.5]; },H0);
      // 광장 바닥(전돌) + 어도(御道, 화강석 한 줄) — 삼대 밑둥까지
      E.plane(BRK,0,.09,131,222,138); E.plane(BRK,-88.5,.09,-60,45,208); E.plane(BRK,88.5,.09,-60,45,208); E.plane(BRK,0,.09,-190,222,40);
      K.b(0,0,131,6,.16,138,MAR2); for(const s of [-1,1]) K.b(s*3.1,0,131,.25,.2,138,MAR);
      // 해자(통자하) 수면 · 궁성 담(붉은 벽 + 노란 지붕 띠) · 각루 4
      for(const [x,z,w,d] of [[-402,-154,52,1030],[402,-154,52,1030],[0,-656,856,52],[0,356,856,52]]) K.water(x,-1.2,z,w,d);
      const WG=[], WR=[]; for(const [x,z,w,d] of [[-370,-139,9,980],[370,-139,9,980],[0,-627,749,9],[0,348,330,9],[-260,348,230,9],[260,348,230,9]]){ WG.push(bx(x,0,z,w,9.5,d)); WR.push(bx(x,9.5,z,w+1.6,.9,d+1.6)); } merge(WG,RED2,false); merge(WR,YL,false);
      for(const [x,z] of [[-370,-627],[370,-627],[-370,348],[370,348]]){ K.b(x,9.5,z,14,6,14,RED); hip(x,15.5,z,20,20,5,{R:0,mat:TILE,under:GB,thk:.3,p:1.3,lift:.6,ridge:false,nu:16,nv:16}); K.b(x,19.2,z,1.2,2.2,1.2,GOLD); }
      // 오문(午門) 성루 — 남쪽 담 가운데(멀리)
      K.b(0,0,330,128,12.5,36,RED2); K.b(0,12.5,330,62,9,24,RED); hip(0,21.5,330,72,32,9,{R:40,mat:TILE,under:GB,thk:.4,p:1.4,lift:.6,nu:24,nv:12});
      // 동·서 회랑(廡房): 붉은 벽 + 노란 기와 맞배, 단마다 이어짐 — 체인각(동)·홍의각(서) 2층 누각
      const CW=[], CR=[];
      for(const s of [-1,1]){ for(const [z0,z1] of [[-182,70],[112,198]]){ const L=z1-z0; CW.push(bx(s*116,0,(z0+z1)/2,10,.6,L)); CW.push(bx(s*116,.6,(z0+z1)/2,8,5.2,L)); }
        K.b(s*121,0,91,26,2.2,42,MAR); K.b(s*121,2.2,91,20,13,34,RED); for(let i=0;i<9;i++) K.b(s*(121-10.1),2.2,91-15.5+i*3.9,.2,9,2.6,DOOR); K.b(s*121,10,91,22,.8,36,CAI); hip(s*121,15.2,91,32,40,8,{R:10,mat:TILE,under:GB,thk:.35,p:1.4,lift:.5,nu:24,nv:16}); }
      merge(CW,RED2); for(const s of [-1,1]) for(const [z0,z1] of [[-182,70],[112,198]]) roofHF(s*116,5.8,(z0+z1)/2,12,z1-z0+1,3.2,{swap:true,dt:1,mat:TILE,under:GB,thk:.25,ridge:true,rmat:YL});
      // 태화문(太和門): 9칸 · 대리석 기단 · 헐산(歇山) 지붕(약식) · 청동 사자 한 쌍 — 광장 남쪽
      K.b(0,0,205,62,1.6,30,MAR); for(const s of [-1,1]) K.b(s*20,1.6,214,1.5,1.6,2.4,BRZ); for(const s of [-1,1]) K.b(s*20,3.2,214,1.2,1.9,1.9,BRZ);
      const tc=[]; for(let i=0;i<=9;i++) for(const z of [196.5,213.5]) tc.push([-25+i*50/9,1.6,z]); inst(cylG(.45,9.5,12,.42),RED,tc); K.b(0,1.6,205,46,9.5,12,RED2); for(let i=0;i<3;i++) K.b(-5.6+i*5.6,1.6,198.9,3.8,6.8,.3,DOOR);
      K.b(0,10.6,205,51,1.0,18.5,CAI); roofHF(0,12.6,205,62,28,4.8,{dt:.45,mat:TILE,under:GB,thk:.4,sori:.6,rmat:YL,nu:40});
      // 삼대 북쪽(土자형): 중화전(정방 攢尖) · 보화전(겹처마 헐산) — 남쪽 단에서 이어짐
      const TG=[]; const tiersN=[[-50,50,-170,-40],[-58,58,-150,-100]]; for(const [x0,x1,z0,z1] of tiersN) for(let k=0;k<3;k++){ const i=k*3.5; tier(x0+i,x1-i,z0+i,z1-(z1===-40?0:i),k*2.71,2.71,TG); } merge(TG,MAR);
      for(let k=0;k<3;k++){ const i=k*3.5; balus(-50+i,50-i,-170+i,-40,(k+1)*2.71,[],true,false); } flushBal();
      K.b(0,8.13,-75,26,1.1,26,MAR); const zc=[]; for(let i=0;i<=5;i++) for(let j=0;j<=5;j++) if(i===0||i===5||j===0||j===5) zc.push([-10+i*4,9.23,-85+j*4]); inst(cylG(.4,6.2,10,.38),RED,zc); K.b(0,9.23,-75,18,6.2,18,RED2); K.b(0,15.0,-75,22,.9,22,CAI);
      hip(0,16.0,-75,27,27,8.6,{R:0,mat:TILE,under:GB,thk:.35,p:1.25,lift:.5,ridge:false,nu:24,nv:24}); K.c(0,24.4,-75,.9,1.6,GOLD,12,{r2:.4}); K.c(0,25.8,-75,.6,.6,GOLD,12,{half:1});
      K.b(0,8.13,-125,56,1.2,30,MAR); const bc=[]; for(let i=0;i<=9;i++) for(const z of [-137,-113]) bc.push([-24+i*48/9,9.33,z]); inst(cylG(.5,8,12,.46),RED,bc); K.b(0,9.33,-125,46,8,22,RED2); for(let i=0;i<7;i++) K.b(-16+i*5.33,9.33,-113.6,4.4,6.4,.3,DOOR);
      K.b(0,16.6,-125,52,1,26,CAI); hip(0,17.4,-125,62,34,3.2,{R:44,mat:TILE,under:GB,thk:.4,p:1.2,lift:.5,ridge:false,nu:32,nv:16}); K.b(0,19.2,-125,40,4,16,RED); roofHF(0,22.6,-125,52,24,6.4,{dt:.42,mat:TILE,under:GB,thk:.45,sori:.6,rmat:YL,nu:40});
      // 궁궐 지붕 바다(멀리): 노란 지붕 전각·붉은 벽 — 한 메시씩(꼭짓점 그대로)
      const RB=[], RT=[]; let sd=7; const rn=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
      const hipG=(x,y,z,w,d,h)=>{ const g=new T.BufferGeometry(); const r=Math.max(0,w-d)/2; const p=[[x-w/2,y,z-d/2],[x+w/2,y,z-d/2],[x+w/2,y,z+d/2],[x-w/2,y,z+d/2],[x-r,y+h,z],[x+r,y+h,z]]; const tri=[[0,4,1],[1,4,5],[3,2,5],[3,5,4],[0,3,4],[1,5,2]]; const P=[]; tri.forEach(t=>t.forEach(i=>P.push(...p[i]))); g.setAttribute('position',new T.Float32BufferAttribute(P,3)); g.computeVertexNormals(); return g; };
      for(let x=-350;x<=350;x+=34) for(let z=-610;z<=320;z+=30){ if(Math.abs(x)<120&&z>-260&&z<230) continue; if(Math.abs(x)<40&&z>-610) continue; if(rn()<.22) continue; const w=18+rn()*16, d=10+rn()*7, h=4+rn()*4, xx=x+(rn()-.5)*8, zz=z+(rn()-.5)*6; RB.push(bx(xx,0,zz,w-3,h,d-3)); RT.push(hipG(xx,h,zz,w+1.5,d+2,d*.42)); }
      for(const z of [-300,-360,-420,-480,-540]){ const w=z===-300?48:36; RB.push(bx(0,0,z,w,z===-300?9:7,20)); RT.push(hipG(0,z===-300?9:7,z,w+5,24,8)); }
      merge(RB,RED2,false); merge(RT,YL,false);
      // 궁 밖 베이징 후퉁(회색 낮은 지붕) · 경산 숲과 만춘정
      const BL=[]; for(let x=-1350;x<1350;x+=26) for(let z=-1450;z<1250;z+=26){ const xx=x+(E.r()-.5)*6, zz=z+(E.r()-.5)*6; if(Math.abs(xx)<445&&zz>-700&&zz<400) continue; if(Math.hypot((xx)/280,(zz+930)/140)<1) continue; if(Math.hypot(xx,zz)>1350||E.r()<.12) continue; const tall=Math.hypot(xx,zz)>950&&E.r()<.3; BL.push([xx,zz,14+E.r()*10,14+E.r()*10,tall?14+E.r()*30:3.5+E.r()*3,tall?'#9aa1a8':E.r()<.5?'#7d7c79':'#8c8984']); } E.blocks(BL);
      E.forest(E.scatter(-270,270,-1060,-800,9,TR.h,(x,z,h)=>h>1.5,(x,z,h)=>9+E.vn(x*.05,z*.05)*5,(x,z,h)=>E.r()<.5?1:0),{trunks:false});
      E.forest(E.scatter(-1300,1300,-1400,1200,40,TR.h,(x,z,h)=>!(Math.abs(x)<445&&z>-700&&z<400)&&E.r()<.35,(x,z,h)=>8+E.r()*5,0),{trunks:false});
      K.b(0,TR.h(0,-930),-930,10,6,10,RED); hip(0,TR.h(0,-930)+6,-930,13,13,5,{R:0,mat:TILE,under:GB,thk:.3,p:1.3,ridge:false,nu:12,nv:12});
    });

    // ================= 0: 삼대(남쪽 단) · 난간 · 계단 · 단지(丹墀) 청동기 =================
    K.layer(0);
    const TG0=[]; const TH=2.71; const RIM=[];
    for(let k=0;k<3;k++){ const i=k*3.5, s=k*7; tier(-65+i,65-i,-40,62-s,k*TH,TH,TG0); RIM.push([-65+i,65-i,-40,62-s]); }
    merge(TG0,MAR); for(let k=0;k<3;k++){ const [x0,x1,z0,z1]=RIM[k]; const y=(k+1)*TH; E.plane(BRK,(x0+x1)/2,y+.015,(z0+z1)/2,x1-x0-.4,z1-z0-.4); }
    for(let k=0;k<3;k++){ const [x0,x1,z0,z1]=RIM[k]; balus(x0+.3,x1-.3,z0,z1-.3,(k+1)*TH,[['s',0,15.5],['s',-38,5.2],['s',38,5.2]],true,true); } flushBal();
    // 남쪽 계단: 단마다 가운데 어로(御路) + 좌우 계단 두 벌 · 동·서 끝에 한 벌씩
    // 3단: 윗단 끝 z=48→, 2단: 55→, 1단: 62→(광장 쪽으로 내밂)
    for(const [zt,yt,yb] of [[48,3*TH,2*TH],[55,2*TH,TH],[62,TH,0]]){ for(const x of [-5.4,5.4]) flight(x,zt,yt,yb,4.6); ramp(0,zt,yt,yb,5.4,Math.round((yt-yb)/.16)*.33); for(const x of [-38,38]) flight(x,zt,yt,yb,4.2); }
    merge(STEPG,MAR);
    // 단지(丹墀, 전돌 바닥) 청동 정(鼎) 18 · 거북·학 · 해시계(日晷)·가량(嘉量)
    const yT=3*TH, DING=[]; for(let i=0;i<9;i++) for(const s of [-1,1]) DING.push([s*(42-i*1.6),yT,-14+i*6.4]);
    inst(cylG(.7,1.2,10,.85),BRZ,DING); inst(cylG(.5,.9,8,.25),BRZ,DING.map(p=>[p[0],p[1]+1.2,p[2]])); inst(boxG(.12,.7,.12),BRZ,DING.flatMap(p=>[[p[0]-.6,p[1]+1.8,p[2]],[p[0]+.6,p[1]+1.8,p[2]]]));
    for(const s of [-1,1]){ K.b(s*14,yT,30,1.8,1.0,1.8,MAR); K.b(s*14,yT+1,30,1.2,.9,1.6,BRZ); K.b(s*14,yT+1.9,30.6,.5,.5,.6,BRZ); K.b(s*20,yT,30,1.4,1.0,1.4,MAR); K.c(s*20,yT+1,30,.18,2.0,BRZ,8); K.b(s*20,yT+2.8,30.3,.5,.4,.9,BRZ); }
    K.b(28,yT,26,2.4,1.4,2.4,MAR); { const sd=K.c(28,yT+1.4,26,1.1,.18,MAR,24); sd.rotation.x=-.9; sd.position.y=yT+2.4; } K.b(-28,yT,26,2.4,1.4,2.4,MAR); K.b(-28,yT+1.4,26,1.6,1.4,1.6,MAR); K.b(-28,yT+2.8,26,1.2,1.2,1.2,BRZ);
    // 전각 대(臺明) + 앞 계단
    const yP=yT+1.27; K.b(0,yT,0,68,1.27,41,MAR); K.b(0,yT+1.15,0,68.4,.14,41.4,MAR2); STEPG.length=0; for(const x of [-6,0,6]) flight(x,20.5,yP,yT,4.4); merge(STEPG,MAR);
    // 청동 물항아리(門海) 몇 개
    inst(cylG(1.1,1.5,14,1.25),BRZ,[[-30,yT,22],[30,yT,22],[-33,yT,-20],[33,yT,-20]]);

    // ================= 1: 기둥·격선문·벽·아래 단청·두공 =================
    K.layer(1);
    const BX=62/11, BZ=34.5/5, X0=-31, Z0=-17.25, CH=7.2, yC=yP+CH;
    const cols=[]; for(let i=0;i<=11;i++) for(let j=0;j<=5;j++) if(i===0||i===11||j===0||j===5) cols.push([X0+i*BX,yP,Z0+j*BZ]); inst(cylG(.53,CH,14,.5),RED,cols);
    inst(cylG(.78,.25,14,.72),MAR2,cols.map(c=>[c[0],yP,c[2]])); // 주초
    const inner=[]; for(let i=1;i<=10;i++) for(const z of [Z0+BZ,Z0+4*BZ]) inner.push([X0+i*BX,yP,z]); inst(cylG(.6,CH+5,14,.56),RED,inner); // 내진 기둥(금주)
    // 정면 9칸 격선문(양 끝 칸은 붉은 벽) · 뒤 가운데 3칸 문 · 옆은 두꺼운 붉은 벽
    const dp=new T.PlaneGeometry(BX-1.1,CH-1.5); dp.translate(0,(CH-1.5)/2,0); { const m=new T.InstancedMesh(dp,DOOR,9+3); const M4=new T.Matrix4(); for(let i=0;i<9;i++){ M4.makeTranslation(X0+(i+1.5)*BX,yP,Z0+34.5-1.2); m.setMatrixAt(i,M4); } for(let i=0;i<3;i++){ M4.makeRotationY(Math.PI); M4.setPosition(X0+(i+4.5)*BX,yP,Z0+.36); m.setMatrixAt(9+i,M4); } m.instanceMatrix.needsUpdate=true; put(m,false); }
    K.b(0,yP,Z0+34.5-1.35,62,CH,.2,RED2); // 문 뒤 어둠(안쪽) — 문 판 바로 뒤
    K.b(0,yP+CH-1.5,Z0+34.5-1.15,62-.4,1.5,.3,RED); // 문 위 횡판
    for(const s of [-1,1]){ K.b(s*(31-BX/2),yP,Z0+34.5-1.0,BX-.6,CH,1.0,RED); K.b(s*31,yP,0,1.4,CH,34.5,RED); K.b(s*31,yP,0,1.8,1.1,35,K.col(0x8a7a6a,{roughness:.9})); }
    K.b(0,yP,Z0+.9,62,CH,1.2,RED); K.b(0,yP,Z0+1.0,62.4,1.1,1.6,K.col(0x8a7a6a,{roughness:.9}));
    K.b(0,yP,0,60,.12,32,K.col(0x3a3330)); // 실내 바닥(금전)
    // 아래 단청 띠(額枋)·평판방 + 아래 두공
    K.b(0,yC-1.0,0,62.8,1.0,35.3,CAI); K.b(0,yC,0,63.4,.3,35.9,GB);
    const DG1=[]; dgRing(31.2,17.5,yC+.3,1.15,DG1); inst(dgG,GB,DG1);
    K.b(0,yC+.3,0,62,1.3,34.4,BL); // 두공 뒤 판(안쪽 막음)

    // ================= 2: 아래 처마(腰檐) · 위층 벽 · 위 단청·두공 · 편액 =================
    K.layer(2);
    const yL=yC+1.0; const lo=hip(0,yL,0,71,44.5,5.2,{R:42,mat:TILE,under:GB,rim:YLD,thk:.45,p:1.3,lift:.7,us:.5,beasts:6,rmat:YL});
    const yU0=yL+1.6; K.b(0,yU0,0,50.8,6.6,20.8,RED); // 위층 몸통(지붕 안까지 올려 막음)
    K.b(0,yU0+2.6,0,51.6,.9,21.6,CAI); K.b(0,yU0+3.5,0,52.2,.25,22.2,GB);
    const DG2=[]; dgRing(25.6,10.9,yU0+3.75,1.1,DG2); inst(dgG,GB,DG2);
    { const yy=yU0+1.25; for(let i=0;i<9;i++){ K.b(-22.6+i*5.65,yy,10.42,4.2,1.25,.1,DOOR); } }
    // 편액 「太和殿」(파란 바탕 금테) — 위처마 아래 가운데
    K.b(0,yU0+.5,10.6,4.2,2.6,.3,GOLD); K.b(0,yU0+.75,10.72,3.5,2.1,.12,BL);
    inst(boxG(.3,.4,.3),YL,lo.beasts.map(b=>[b[0],b[1],b[2],b[3],1,b[5],1]));
    // ================= 3: 위 처마(上檐) 우진각 · 용마루 · 치미 · 잡상 =================
    K.layer(3);
    const yU=yU0+5.0; const up=hip(0,yU,0,63,33,7.8,{R:36,mat:TILE,under:GB,rim:YLD,thk:.5,p:1.5,lift:.8,us:.5,beasts:10,rmat:YL,rdh:1.55});
    const yR=yU+7.8-.3+1.55; for(const s of [-1,1]) chiwen(s*18.2,yR-.6,0,s);
    inst(boxG(.32,.45,.32),YL,up.beasts.map(b=>[b[0],b[1],b[2],b[3],1,b[5],1]));
    // 기본 대지 장식 정리: 이 build가 광장·지형을 직접 그리므로 기본 생성기의 도로·잔디·가로수·벤치는 빼고 지면과 사람만 남김
    { const rt=K.bldg.parent, st=rt&&rt.children[0]; if(st&&st!==K.bldg&&st!==K.life){ const sa=st.add.bind(st); st.add=(...o)=>{ o.forEach(m=>{ if(m&&m.material&&m.material.vertexColors) sa(m); }); return st; }; }
      const la=K.life.add.bind(K.life); K.life.add=(...o)=>{ o.forEach(m=>{ if(m&&m.material===K.M.people) la(m); }); return K.life; }; }
  }});
