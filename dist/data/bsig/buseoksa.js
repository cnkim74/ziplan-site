__bsigFill({"buseoksa":function(K){
// 출처: 여행을 말하다(telltrip) 2026-06 「영주 부석사」 — 1916 해체보수 묵서명으로 1376(우왕 2) 재건 확인, 정면 5칸·측면 3칸 팔작·주심포 · 서울신문 2002-08-22 — 기둥 지름 34·49·44 cm, 안양루 편액 두 개(안양루·안양문)
// Korean Temple Guide — 아미타불 서쪽에 앉아 동향, 석등은 축에서 서쪽으로 약 50 cm
// 추정: 칸 너비(3.4·3.7·4.3·3.7·3.4 / 3.7×3), 기둥 높이 4.1 m, 기단 1.0 m, 처마 내밈 약 3.5 m, 용마루 높이(마당 위 약 12 m), 석축 높이(4.5 m·4.5 m), 안양루·범종루 칸 치수, 삼층석탑 위치·높이
    const T=K.T; const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    // --- 공용 헬퍼(이 build 안에서만): 인스턴스·병합·한옥 지붕면(roofHF: dt 0 우진각 · 0<dt<1 팔작 · 1 맞배) ---
    const inst=(geo,mat,items,cast,grp,fit)=>{ if(!items.length) return null; if(fit) geo=geo.clone(); const m=new T.InstancedMesh(geo,mat,items.length); m.frustumCulled=false; const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),Eu=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); Eu.set(it[7]||0,it[3]||0,it[8]||0); Q.setFromEuler(Eu); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; if(fit){ if(!geo.boundingBox) geo.computeBoundingBox(); const gb=geo.boundingBox.clone(), bb=new T.Box3(); for(let i=0;i<items.length;i++){ m.getMatrixAt(i,M4); bb.union(gb.clone().applyMatrix4(M4)); } geo.boundingBox=bb; geo.boundingSphere=bb.getBoundingSphere(new T.Sphere()); } if(grp){ m.castShadow=!!cast; m.receiveShadow=true; grp.add(m); return m; } return put(m,cast); };
    const bx=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const merge=(geos,mat,cast,grp)=>{ if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); const m=new T.Mesh(g,mat); if(grp){ m.castShadow=!!cast; m.receiveShadow=true; grp.add(m); return m; } return put(m,cast); };
    const cylG=(r,h,seg,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r*.9:r2,r,h,seg||10); g.translate(0,h/2,0); return g; };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    const roofHF=(cx,ye,cz,E0,D,H,o)=>{ o=o||{}; const dt=o.dt||0, so=o.sori||0, thk=o.thk||.3, sw=!!o.swap, mt=o.mat, um=o.under||mt; const EE=sw?D:E0, DD=sw?E0:D; const R=Math.max(0,EE-DD*(1-dt));
      const g=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),1.7); const y0=ye+H*(1-g(dt));
      const yf=(a,b)=>{ const aa=Math.abs(a)/(EE/2), bb=Math.abs(b)/(DD/2); const ta=Math.abs(a)>R/2?(Math.abs(a)-R/2)/(DD/2)+dt:0; return ye+H*(1-g(Math.max(bb,ta)))+so*Math.pow(aa,3)*Math.pow(bb,3); };
      const P=(a,b,y)=>sw?[cx+b,y,cz+a,b/2,a/2]:[cx+a,y,cz+b,a/2,b/2];
      const sheet=(a0,a1,m,dy,n)=>K.surf((u,v)=>{ const a=a0+(a1-a0)*u, b=-DD/2+DD*v; return P(a,b,yf(a,b)+dy); },n,o.nv||12,m);
      const segs=(dt>0&&dt<1)?[[-EE/2,-R/2,8],[-R/2,R/2,20],[R/2,EE/2,8]]:[[-EE/2,EE/2,o.nu||32]];
      for(const [a0,a1,n] of segs){ sheet(a0,a1,mt,0,n); sheet(a0,a1,um,-thk,n); }
      K.surf((u,v)=>{ const s=u*4, k=Math.floor(s), f=s-k; let a,b; if(k===0){a=-EE/2+EE*f;b=-DD/2;} else if(k===1){a=EE/2;b=-DD/2+DD*f;} else if(k===2){a=EE/2-EE*f;b=DD/2;} else {a=-EE/2;b=DD/2-DD*f;} const y=yf(a,b); return P(a,b,y-thk+thk*v); },64,1,um);
      if(dt>0){ for(const s of [-1,1]){ const a=s*R/2; K.surf((u,v)=>{ const b=-dt*DD/2+dt*DD*u; const yt=yf(a-s*.02,b), yb=y0-thk; return P(a-s*.05,b,yb+(yt-yb)*v); },12,1,o.gmat||um); } }
      if(R>.6&&o.ridge!==false) K.b(cx,ye+H-.15,cz,sw?(o.rw||.8):R+.5,o.rh||.5,sw?R+.5:(o.rw||.8),o.rmat||K.col(0x2b2a28)); return yf; };
    // 내림·추녀마루: roofHF가 돌려준 yf로 마루 선을 따라 작은 상자를 병합
    const hipLine=(yf,cx,cz,a0,b0,a1,b1,n,mat,w)=>{ const gs=[]; n=Math.max(n,Math.ceil(Math.hypot(a1-a0,b1-b0)/.2)); for(let k=0;k<=n;k++){ const t=k/n, a=a0+(a1-a0)*t, b=b0+(b1-b0)*t; gs.push(bx(cx+a,yf(a,b)-.12,cz+b,w||.42,.34,w||.42)); } return merge(gs,mat); };
    // 질감 상자: 텍스처 한 장이 tm m를 덮도록 UV를 면 크기에 맞춤(석축·담)
    const tbox=(x,y,z,w,h,d,mat,tm,ry)=>{ const g=new T.BoxGeometry(w,h,d); const uv=g.attributes.uv; const dims=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]]; for(let f=0;f<6;f++) for(let i=0;i<4;i++){ const k=f*4+i; uv.setXY(k,uv.getX(k)*dims[f][0]/tm+(x*.13%1),uv.getY(k)*dims[f][1]/tm); } const m=new T.Mesh(g,mat); m.position.set(x,y+h/2,z); if(ry) m.rotation.y=ry; return put(m); };
    // ---- 배경·바닥(v15): 캔버스 질감 · 높이장 지형(K.life — bbox 밖) · 인스턴스 숲 · 뷰어 기본 바닥 숨김 ----
    const E=(()=>{ const TT=T; let sd=131; const r=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
      const C=(typeof window!=='undefined')?(window.__kTex15||(window.__kTex15={})):{};
      const tex=(key,px,draw)=>{ if(C[key]) return C[key]; if(typeof document==='undefined') return null; const cv=document.createElement('canvas'); cv.width=cv.height=px; const g=cv.getContext('2d'); let s=31; const rr=()=>{ s=(s*16807)%2147483647; return s/2147483647; }; draw(g,px,rr); const t=new TT.CanvasTexture(cv); t.wrapS=t.wrapT=TT.RepeatWrapping; t.encoding=TT.sRGBEncoding; t.anisotropy=8; return C[key]=t; };
      // 막돌·다듬돌 석축(2 m 한 장) — 돌 크기·색이 제각각, 줄눈 어둡게
      const wallTex=(key,base,tones,rowH,wMin,wMax)=>tex(key,512,(g,N,rr)=>{ g.fillStyle=base; g.fillRect(0,0,N,N); let y=0; while(y<N){ let h=Math.round(rowH*(.7+rr()*.6)); if(N-y<rowH*.6) h=N-y; let x=-rr()*wMax; while(x<N){ const w=wMin+rr()*(wMax-wMin); const j=()=>(rr()-.5)*12; g.fillStyle=tones[Math.floor(rr()*tones.length)]; for(const ox of [0,-N,N]){ g.beginPath(); g.moveTo(ox+x+4+j(),y+3+j()); g.lineTo(ox+x+w*.5+j(),y+2+j()); g.lineTo(ox+x+w-4+j(),y+4+j()); g.lineTo(ox+x+w-3+j(),y+h*.5+j()); g.lineTo(ox+x+w-4+j(),y+h-3+j()); g.lineTo(ox+x+w*.45+j(),y+h-2+j()); g.lineTo(ox+x+3+j(),y+h-4+j()); g.lineTo(ox+x+2+j(),y+h*.5+j()); g.closePath(); g.fill(); g.fillStyle='rgba(255,255,255,.07)'; g.fillRect(ox+x+6,y+5,w-14,3); } x+=w; } y+=h; } for(let i=0;i<5000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.09)':'rgba(30,28,24,.12)'; g.fillRect(rr()*N,rr()*N,1.6,1.6); } for(let i=0;i<40;i++){ g.fillStyle='rgba(70,90,50,.10)'; g.beginPath(); g.arc(rr()*N,rr()*N,6+rr()*18,0,7); g.fill(); } });
      const masTex=()=>tex('mas15',512,(g,N,rr)=>{ g.fillStyle='#cdbf9e'; g.fillRect(0,0,N,N); const cs=['#bfae88','#dacfb4','#ae9d77','#9c8d6f','#c8b997']; for(let i=0;i<7000;i++){ g.fillStyle=cs[Math.floor(rr()*cs.length)]; const z=rr()<.85?1.2:2.4; g.fillRect(rr()*N,rr()*N,z,z); } });
      const tmat=(t,hex,o)=>{ const m=new TT.MeshStandardMaterial(Object.assign({color:t?0xffffff:hex,map:t||null,roughness:.95},o||{})); m.color.convertSRGBToLinear(); if(t&&o&&o.tint) m.color.setHex(o.tint).convertSRGBToLinear(); return m; };
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

    // ===== 부석사 무량수전 — 석축 3단(범종루 앞 → 안양루 앞 → 무량수전 마당) 위의 고려 팔작집 =====
    const ST=K.col(0xb8b1a3,{roughness:.95}), ST2=K.col(0x9d968a,{roughness:.95}), WD=K.col(0x8b7559,{roughness:.88}), WDD=K.col(0x6a5641,{roughness:.9}), WH=K.col(0xe4dccb,{roughness:.97}), RU=K.col(0x5a4a3b,{roughness:.9}), GW=K.M.giwa, GRN=K.col(0x7e9283,{roughness:.9}), OC=K.col(0xb58f6e,{roughness:.9}), DR=K.col(0x2d2b28,{roughness:.8}), PAPER=K.col(0xece5d3,{roughness:.95});
    const STW=E.tmat(E.wallTex('bsk_wall2','#4f4a42',['#a59f92','#b4ad9f','#958f83','#aaa497','#bdb6a7','#8e897e','#9f998b','#c2bba9','#857f72'],70,60,150),0xb1aa9d,{tint:0xd8d2c6});
    const MAS=E.tmat(E.masTex(),0xd2c6a6,{tint:0xe2d9c4}); if(MAS.map){ MAS.map=MAS.map.clone(); MAS.map.needsUpdate=true; MAS.map.repeat.set(1,1); }
    const doorTex=E.tex('bsk_door',256,(g,N)=>{ g.fillStyle='#e9e1cc'; g.fillRect(0,0,N,N); g.fillStyle='#5f4b37'; const lw=N/4; for(let l=0;l<4;l++){ const x0=l*lw; g.fillRect(x0,0,7,N); g.fillRect(x0+lw-7,0,7,N); for(let x=x0+14;x<x0+lw-10;x+=9) g.fillRect(x,0,2.6,N); for(const y0 of [10,N*.47,N-34]) for(let k=0;k<3;k++) g.fillRect(x0,y0+k*8,lw,2.6); g.fillRect(x0,0,lw,7); g.fillRect(x0,N-7,lw,7); } });
    const DOOR=new T.MeshStandardMaterial({map:doorTex,roughness:.9}); if(!doorTex){ DOOR.color.setHex(0xcbbfa4).convertSRGBToLinear(); }
    const U=9.0, L=4.5, HZ=-2; // 상단 마당(무량수전) · 중단 마당(안양루 앞) 높이 — 추정
    const stairs=(x,z,yt,yb,w,n,dir,run)=>{ run=run||.42; const rise=(yt-yb)/n; const gs=[]; for(let k=0;k<n;k++){ const h=yt-yb-k*rise, off=dir*(k+.5)*run; gs.push(bx(x,yb-.4,z+off,w,h+.4-(k?0:0),run)); } for(const s of [-1,1]){ const Lr=n*run; gs.push(bx(x+s*(w/2+.25),yb-.4,z+dir*Lr/2,.5,yt-yb+.6,Lr)); } return merge(gs,ST); };
    // ---------- 0: 지형·석축·마당·계단·석등·석탑 ----------
    K.layer(0); E.own();
    { const pads=[[-23,23,-17,12.2,U],[-21,21,12.2,38.2,L],[-60,60,38.2,95,0]]; // [x0,x1,z0,z1,top] — 이 안은 지형을 마당 높이 아래로 깎음
      const base=(x,z)=>{ let h; if(z<-17) h=U+(-17-z)*.42; else if(z<38) h=U-(z+17)*(U/55); else h=-.05-Math.max(0,z-95)*.05; h+=E.peaks(x,z,[[0,-300,330,240,190,1.25],[-330,-190,260,220,120,1.3],[320,-150,240,200,130,1.3],[-420,160,260,300,70,1.3],[420,200,260,280,80,1.3]])*E.ss((Math.hypot(x,(z-10)*.8)-55)/90); h+=(E.fbm(x*.03,z*.03,3)-.5)*4*E.ss((Math.hypot(x,z)-50)/60);
        // 남쪽 멀리 소백산 연봉 — 겹겹 능선(멀수록 푸르게)
        for(const [zc,amp,sc] of [[900,260,.0021],[1300,420,.0016],[1750,560,.0012]]){ const w=Math.exp(-Math.pow((z-zc)/(zc*.22),2)); h=Math.max(h,w*amp*(.45+.55*E.ridged(x*sc+zc,z*sc))); }
        return h; };
      const hf=(x,z)=>{ let h=base(x,z); for(const [a0,a1,b0,b1,top] of pads){ if(x>a0-.5&&x<a1+.5&&z>b0-.5&&z<b1+.5) h=Math.min(h,top-.35); } return h; };
      const TR=E.terrain(0,0,0,0,E.axis(2600,150,4.2),E.axis(2600,150,4.2,200),hf,(x,z,h,ny)=>{ const d=Math.hypot(x,(z-10)); if(z>38&&Math.abs(x)<7.5) return [.76,.7,.57]; if(z>38&&z<95&&Math.abs(x)<60) return [.5+.04*E.fbm(x*.08,z*.08,2),.56,.38]; if(d<70&&h<U+4) return [.48+.03*E.fbm(x*.1,z*.1,2),.5,.36]; return E.mcol(x,z,h,ny,{far:500,farW:900,cx:0,cz:0,cliff:.4}); });
      // 숲: 봉황산 소나무·참나무 — 마당·참배길은 비움
      E.forest(E.scatter(-700,700,-760,620,8.5,TR.h,(x,z,h)=>{ if(x>-34&&x<34&&z>-24&&z<50) return false; if(Math.abs(x)<16&&z>40&&z<200) return false; if(z>14&&Math.hypot(x,z-17)<120) return false; if(z>-30&&Math.hypot(x,z-17)<62) return false; return Math.hypot(x,z)<780&&E.r()<.9; },(x,z,h)=>8+E.vn(x*.05,z*.05)*7,(x,z,h)=>E.vn(x*.03+3,z*.03)<.55?1:0),{trunks:false});
      // 참배길 은행나무(가을 노랑) 두 줄
      const gk=[]; for(let z=62;z<190;z+=9) for(const s of [-1,1]) gk.push([s*(14+E.r()*1.5),TR.h(s*14,z)-.3,z,(z<120?7:11)+E.r()*2,0,E.r(),.7]); E.forest(gk,{pal:[['#d9b23a','#e2c04a','#cfa22e','#e8cb5c']],cast:true});
      // 마당 둘레 큰 나무 몇 그루(느티나무·소나무)
      E.forest([[-31,TR.h(-31,-8),-8,13,0,.3,1.1],[30,TR.h(30,-4),-4,11,0,.6,1],[-26,TR.h(-26,-22),-22,14,1,.2,1],[24,TR.h(24,-24),-24,13,1,.8,1]],{cast:true});
      // 참배길 마사토 바닥(앞)
      const pg=new T.PlaneGeometry(14,140); pg.rotateX(-Math.PI/2); pg.translate(0,.02,125); const pm=new T.Mesh(pg,MAS); pm.receiveShadow=true; K.life.add(pm); }
    // 석축: 상단(무량수전 마당) · 중단(안양루 앞 마당) — 큰 막돌을 쌓은 대석단, 맨 위 장대석 갓돌
    tbox(0,-4,-2.4,46,U+4,29.2,STW,4.5); tbox(0,-4,25.2,42,L+4,26,STW,4.5);
    K.b(0,U,-2.4,46.4,.22,29.6,ST2); K.b(0,L,25.2,42.4,.22,26.4,ST2); // 갓돌 띠
    K.b(0,U+.2,-2.4,45.6,.04,28.8,MAS); K.b(0,L+.2,25.2,41.6,.04,25.6,MAS); // 마사토 마당
    stairs(1.2,12.2,U+.2,L+.2,3.1,11,1,.5); // 안양루 밑 돌계단(누하 진입 — 고개 숙여 오름)
    stairs(-1,38.2,L+.2,0,3.4,11,1,.48);    // 범종루 밑 돌계단
    // 석등(국보, 통일신라) — 팔각: 하대석(복련) · 간주석 · 상대석(앙련) · 화사석(창 4) · 옥개석 · 보주. 축에서 서쪽으로 약 0.5 m 비켜 섬
    { const x=-.5+.2, z=8.6, y=U+.2; const oct=(r,h,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r:r2,r,h,8); g.rotateY(Math.PI/8); g.translate(0,h/2,0); return g; };
      const P=[[oct(.95,.25),0],[oct(.8,.22,.7),.25],[oct(.55,.2,.62),.47],[oct(.17,.85),.67],[oct(.5,.18,.6),1.52],[oct(.6,.12),1.7],[oct(.4,.62),1.82],[oct(.85,.16,.62),2.44],[oct(.12,.26,.85),2.6],[oct(.14,.14),2.86]];
      merge(P.map(([g,yy])=>{ g.translate(x,y+yy,z); return g; }),ST); const win=[]; for(let k=0;k<4;k++){ const a=k*Math.PI/2; win.push(bx(x+Math.sin(a)*.36,y+1.92,z+Math.cos(a)*.36,.26,.38,.1,a)); } merge(win,DR,false); }
    // 삼층석탑(무량수전 동쪽 언덕, 추정 위치) — 2단 기단 + 3층 탑신 · 옥개석
    { const x=17.5, z=-11, y=U+.2; const gs=[bx(x,y,z,3.0,.5,3.0),bx(x,y+.5,z,2.5,.7,2.5),bx(x,y+1.2,z,2.2,.15,2.2)]; let yy=y+1.35; [[1.15,.95,2.3],[.9,.55,2.0],[.8,.5,1.75]].forEach(([w,h,rw])=>{ gs.push(bx(x,yy,z,w,h,w)); yy+=h; gs.push(bx(x,yy,z,rw*.75,.12,rw*.75)); gs.push(bx(x,yy+.12,z,rw,.16,rw)); gs.push(bx(x,yy+.28,z,rw*.55,.12,rw*.55)); yy+=.4; }); gs.push(bx(x,yy,z,.22,1.0,.22)); merge(gs,K.col(0xa8a194,{roughness:.95})); }
    // ---------- 1: 무량수전 몸체 ----------
    K.layer(1);
    const XC=[-9.25,-5.85,-2.15,2.15,5.85,9.25], ZC=[-5.55,-1.85,1.85,5.55].map(z=>z+HZ); // 정면 5칸 · 측면 3칸 기둥 열(칸 너비 추정)
    const GB=U+.2+1.0, CH=4.1; // 기단 위 · 기둥 높이(추정)
    K.b(0,U+.2,HZ,18.5+4.2,1.0,11.1+4.2,ST); { const gs=[]; for(const yy of [.33,.66]) gs.push(bx(0,U+.2+yy,HZ+7.56,22.72,.03,.02)); for(let x=-11;x<11;x+=1.6+((x*7)%3)*.25) gs.push(bx(x,U+.2,HZ+7.56,.03,1.0,.02)); merge(gs,ST2,false); } // 장대석 기단 줄눈
    stairs(0,HZ+7.6+1.2*0,GB,U+.2,4.2,3,1,.4); stairs(-6,HZ+7.6,GB,U+.2,2.2,3,1,.4); stairs(6,HZ+7.6,GB,U+.2,2.2,3,1,.4);
    // 배흘림기둥: 밑에서 1/3 지점이 가장 굵음(지름 약 34·49·44 cm — 서울신문 2002)
    const colG=(()=>{ const pts=[]; for(let i=0;i<=12;i++){ const t=i/12; const r=.245*(t<1/3?1-.12*Math.pow((1/3-t)*3,2):1-.30*Math.pow((t-1/3)*1.5,2)); pts.push(new T.Vector2(r,t*CH)); } return new T.LatheGeometry(pts,14); })();
    const cols=[]; XC.forEach((x,i)=>ZC.forEach((z,j)=>{ if(i>0&&i<5&&j>0&&j<3) return; cols.push([x,GB,z]); })); inst(colG,WD,cols); inst(cylG(.42,.18,10,.38),ST,cols.map(c=>[c[0],GB-.02,c[2]]));
    // 앞면 5칸 띠살 분합문(창호지) · 문 위 회벽 · 하인방
    const zf=ZC[3];
    for(let i=0;i<5;i++){ const x=(XC[i]+XC[i+1])/2, w=XC[i+1]-XC[i]-.42; const d=new T.Mesh(boxG(w,3.0,.14),[WDD,WDD,WDD,WDD,DOOR,WDD]); d.position.set(x,GB+.32,zf); put(d); K.b(x,GB,zf,w,.32,.24,WDD); K.b(x,GB+3.32,zf,w,.18,.22,WDD); K.b(x,GB+3.5,zf,w,.6,.16,WH); }
    // 옆·뒤 벽: 회벽 + 중방·인방(나무 띠)
    const WLs=[]; for(const s of [-1,1]){ for(let j=0;j<3;j++){ const z=(ZC[j]+ZC[j+1])/2, d=ZC[j+1]-ZC[j]-.42; WLs.push([s*9.25,z,.2,d]); } } for(let i=0;i<5;i++){ const x=(XC[i]+XC[i+1])/2, w=XC[i+1]-XC[i]-.42; WLs.push([x,ZC[0],w,.2]); }
    for(const [x,z,w,d] of WLs){ K.b(x,GB,z,w,CH-.05,d,WH); for(const yy of [0,1.25,CH-.55]) K.b(x,GB+yy,z,w+(w>.3?.02:.06),.22,d+(d>.3?.02:.06),WDD); }
    // 옆면 가운데 칸 출입문(띠살 두 짝)
    for(const s of [-1,1]){ const d=new T.Mesh(boxG(.14,2.6,2.6),[DOOR,DOOR,WDD,WDD,WDD,WDD]); d.position.set(s*9.27,GB+.3,(ZC[1]+ZC[2])/2); put(d); }
    // 창방(기둥머리를 잇는 보) — 퇴색 단청(녹색 바탕)
    K.b(0,GB+CH-.05,zf,18.9,.48,.36,GRN); K.b(0,GB+CH-.05,ZC[0],18.9,.48,.36,GRN); for(const s of [-1,1]) K.b(s*9.25,GB+CH-.05,HZ,.36,.48,11.5,GRN);
    K.b(0,GB+.02,HZ,18.3,.05,10.9,K.col(0x7a705f)); // 마루
    // ---------- 2: 주심포 공포(기둥 위에만) · 도리 · 팔작지붕 ----------
    K.layer(2);
    { const ring=[]; XC.forEach(x=>{ ring.push([x,ZC[3],0],[x,ZC[0],Math.PI]); }); ZC.slice(1,3).forEach(z=>{ ring.push([9.25,z,Math.PI/2],[-9.25,z,-Math.PI/2]); });
      const y0=GB+CH+.43; const ju=[],c1=[],c2=[],sal=[],sal2=[],so=[];
      ring.forEach(([x,z,ry])=>{ const nx=Math.sin(ry), nz=Math.cos(ry); ju.push([x,y0,z,ry]); c1.push([x,y0+.32,z,ry]); c2.push([x,y0+.66,z,ry]); sal.push([x+nx*.55,y0+.3,z+nz*.55,ry]); sal2.push([x+nx*.95,y0+.62,z+nz*.95,ry]); so.push([x+nx*1.25,y0+.98,z+nz*1.25,ry]); });
      // 귀기둥: 대각선 살미
      for(const sx of [-1,1]) for(const sz of [-1,1]){ const a=Math.atan2(sx,sz); const x=sx*9.25, z=sz>0?ZC[3]:ZC[0]; sal.push([x+Math.sin(a)*.7,y0+.3,z+Math.cos(a)*.7,a,1,1,1.3]); sal2.push([x+Math.sin(a)*1.2,y0+.62,z+Math.cos(a)*1.2,a,1,1,1.4]); }
      inst(boxG(.62,.32,.62),OC,ju); inst(boxG(1.7,.3,.34),GRN,c1); inst(boxG(2.5,.3,.34),GRN,c2); inst(boxG(.32,.3,1.3),OC,sal); inst(boxG(.3,.3,1.3),GRN,sal2); inst(boxG(.36,.22,.5),OC,so); }
    const DY=GB+CH+1.4; K.b(0,DY,zf+1.25,21.5,.38,.38,RU); K.b(0,DY,ZC[0]-1.25,21.5,.38,.38,RU); for(const s of [-1,1]) K.b(s*(9.25+1.25),DY,HZ,.38,.38,14.1,RU); // 출목도리
    K.b(0,GB+CH+.95,HZ,19.2,.45,11.9,RU); // 주심도리·장여 띠
    { const raf=[]; for(let x=-12.4;x<=12.4;x+=.62) for(const s of [-1,1]) raf.push([x,DY-.32,HZ+s*8.15,0,1,1,1]); for(let z=-7.6;z<=7.6;z+=.62) for(const s of [-1,1]) raf.push([s*11.8,DY-.32,HZ+z,Math.PI/2,1,1,1]); inst(boxG(.2,.2,1.6),RU,raf); } // 서까래 끝
    const RY=GB+CH+.62; const E0=25.6, D0=18.4; const yf=roofHF(0,RY,HZ,E0,D0,6.2,{dt:.42,mat:GW,under:RU,thk:.45,sori:1.0,gmat:WD,nu:40,rh:.62,rw:.9});
    { const R=E0-D0*(1-.42); for(const s of [-1,1]){ for(const t of [-1,1]){ hipLine(yf,0,HZ,s*(E0/2-.4),t*(D0/2-.4),s*R/2,t*.42*D0/2,12,DR,.48); hipLine(yf,0,HZ,s*R/2,0,s*R/2,t*.42*D0/2,6,DR,.42); } K.b(s*(R/2+.15),RY+6.2-.2,HZ,.8,1.25,1.0,DR); } }
    // 현판(無量壽殿, 공민왕 글씨 전함) — 세로 현판
    { const hp=E.tex('bsk_hp',128,(g,N)=>{ g.fillStyle='#3b2a1d'; g.fillRect(0,0,N,N); g.strokeStyle='#c9a24f'; g.lineWidth=8; g.strokeRect(6,6,N-12,N-12); g.fillStyle='#d7b462'; for(let c=0;c<2;c++) for(let k=0;k<2;k++) g.fillRect(28+c*40,24+k*42,30,30); }); const hm=new T.MeshStandardMaterial({map:hp,roughness:.7}); if(!hp) hm.color.setHex(0x3b2a1d).convertSRGBToLinear(); const h=new T.Mesh(boxG(1.15,1.5,.1),[WDD,WDD,WDD,WDD,hm,WDD]); h.position.set(0,GB+CH+.1,zf+.62); h.rotation.x=-.12; put(h,false); }
    // ---------- 1·2: 안양루(누각, 정면 3칸·측면 2칸 추정) — 아래는 문, 위는 누 ----------
    K.layer(1);
    { const cx=1.2, cz=15.2, XS=[-4.8,-1.6,1.6,4.8], ZS=[-2.7,0,2.7]; const lo=[],up=[]; XS.forEach(x=>ZS.forEach(z=>{ lo.push([cx+x,L+.2,cz+z]); up.push([cx+x,U+.5,cz+z]); }));
      inst(cylG(.26,U+.3-L-.2,10,.24),WD,lo); inst(cylG(.4,.25,8,.36),ST,lo.map(p=>[p[0],L+.2,p[2]])); K.b(cx,U+.2,cz,10.2,.3,6.0,WDD); // 누하주 · 마루
      inst(cylG(.24,3.0,10,.22),WD,up); // 누상주
      const rl=[]; for(const s of [-1,1]){ for(let x=-4.7;x<=4.7;x+=.36) rl.push([cx+x,U+.5,cz+s*2.95,0,1,1,1]); for(let z=-2.6;z<=2.6;z+=.36) rl.push([cx+s*5.05,U+.5,cz+z,0,1,1,1]); } inst(boxG(.05,.7,.05),WDD,rl); for(const s of [-1,1]){ K.b(cx,U+1.2,cz+s*2.95,10.1,.08,.1,WDD); K.b(cx+s*5.05,U+1.2,cz,.1,.08,5.9,WDD); } // 계자난간
      K.b(cx,U+3.4,cz+2.7,10.1,.38,.3,GRN); K.b(cx,U+3.4,cz-2.7,10.1,.38,.3,GRN); for(const s of [-1,1]) K.b(cx+s*4.8,U+3.4,cz,.3,.38,5.7,GRN);
      inst(boxG(.5,.4,.9),OC,XS.map(x=>[cx+x,U+3.78,cz+3.0])); inst(boxG(.5,.4,.9),OC,XS.map(x=>[cx+x,U+3.78,cz-3.0,Math.PI]));
      K.layer(2); const yfa=roofHF(cx,U+3.75,cz,15.2,10.6,3.7,{dt:.42,mat:GW,under:RU,thk:.36,sori:.7,gmat:WD,rh:.5});
      const R=15.2-10.6*.58; for(const s of [-1,1]) for(const t of [-1,1]) hipLine(yfa,cx,cz,s*7.2,t*4.9,s*R/2,t*.42*5.3,8,DR,.36);
      // 현판 두 개(위 안양루 · 아래 안양문) 자리
      K.b(cx,U+3.0,cz+3.05,1.8,.55,.08,K.col(0x3b2a1d)); K.b(cx,U-.6,cz+2.85,1.6,.5,.08,K.col(0x3b2a1d)); }
    // ---------- 1·2: 범종루(2층 누각 — 실제는 앞 팔작·뒤 맞배, 모형은 팔작으로 단순화, 치수 추정) ----------
    K.layer(1);
    { const cx=-1, cz=43.2, XS=[-4.2,-1.4,1.4,4.2], ZS=[-4.6,-1.55,1.55,4.6]; const lo=[],up=[]; XS.forEach(x=>ZS.forEach(z=>{ lo.push([cx+x,0,cz+z]); if(Math.abs(x)>2||Math.abs(z)>2) up.push([cx+x,L+.55,cz+z]); }));
      inst(cylG(.28,L+.55,10,.26),WD,lo); inst(cylG(.42,.25,8,.38),ST,lo.map(p=>[p[0],0,p[2]])); K.b(cx,L+.25,cz,9.0,.3,9.8,WDD); inst(cylG(.25,3.0,10,.23),WD,up);
      const rl=[]; for(const s of [-1,1]){ for(let x=-4.1;x<=4.1;x+=.4) rl.push([cx+x,L+.55,cz+s*4.85]); for(let z=-4.5;z<=4.5;z+=.4) rl.push([cx+s*4.45,L+.55,cz+z]); } inst(boxG(.05,.7,.05),WDD,rl);
      K.c(cx,L+1.1,cz-1.0,.75,1.3,K.col(0x7a3b2a),18,{axis:'z'}); // 법고(추정)
      for(const s of [-1,1]){ K.b(cx,L+3.5,cz+s*4.6,8.7,.36,.3,GRN); K.b(cx+s*4.2,L+3.5,cz,.3,.36,9.5,GRN); }
      K.layer(2); roofHF(cx,L+3.85,cz,14.0,15.2,4.0,{swap:true,dt:.42,mat:GW,under:RU,thk:.36,sori:.6,gmat:WD,rh:.5}); }

  }});
