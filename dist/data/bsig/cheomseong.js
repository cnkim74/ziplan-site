__bsigFill({"cheomseong":function(K){
// 출처: 매일신문 1997-01-15 첨성대 실측 보도 — 몸통 27단, 기단 장대석 20개(두께 0.395 m)·기단 한 변 5.18/5.36 m·남북축 동쪽으로 약 19° 회전, 정자석 상·하 2단(장대석 4개씩 井자), 남측 창구 한 변 0.95 m·13~15단·정남에서 동쪽 약 16° · 높이 9.17 m·밑지름 4.93 m·윗지름 2.85 m는 국가유산청 안내 수치(같은 보도는 높이 9.11 m·밑지름 5.18 m로 적어 측정 기준에 따라 차이)
// 추정: 몸통 곡선(지수 곡선 근사), 단별 돌 수, 판석 위치, 주변 고분·꽃밭·울타리 크기와 위치
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
      if(dt>0&&!o.nog){ for(const s of [-1,1]){ const a=s*R/2; K.surf((u,v)=>{ const b=-dt*DD/2+dt*DD*u; const yt=yf(a-s*.02,b), yb=y0-thk; return P(a-s*.05,b,yb+(yt-yb)*v); },12,1,o.gmat||um); } }
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


    // ===== 경주 첨성대 — 2단 기단 위 27단 원통 석축, 13~15단 남쪽 창구, 꼭대기 2단 정자석 =====
    // +z 남(정면). 기단은 남북축이 약 19° 돌아가 있음, 창구는 정남에서 동쪽으로 약 16°(매일신문 1997 실측 보도)
    const GR=E.tex('cs_grain',256,(g,N,rr)=>{ g.fillStyle='#d6cdbd'; g.fillRect(0,0,N,N); for(let i=0;i<9000;i++){ const v=rr(); g.fillStyle=v<.3?'rgba(60,55,48,.22)':v<.6?'rgba(255,255,255,.25)':v<.8?'rgba(120,108,92,.18)':'rgba(30,30,30,.3)'; g.fillRect(rr()*N,rr()*N,1.4,1.4); } for(let i=0;i<26;i++){ g.fillStyle=rr()<.5?'rgba(150,160,120,.16)':'rgba(70,66,58,.12)'; g.beginPath(); g.arc(rr()*N,rr()*N,6+rr()*22,0,7); g.fill(); } g.fillStyle='rgba(40,36,30,.2)'; g.fillRect(0,N-5,N,5); });
    const SM=new T.MeshStandardMaterial({color:0xffffff,map:GR,roughness:.93}); if(!GR) SM.color.setHex(0xc9bfae).convertSRGBToLinear();
    const STB=K.col(0xb7ad9b,{roughness:.95}), DRK=K.col(0x1f1c19,{roughness:1});
    const BASEW=E.tmat(E.wallTex('cs_base','#5d564b',['#c4baa8','#cbc1af','#b9af9c','#d2c8b6','#bfb5a2'],250,260,520),0xc2b8a6,{tint:0xe0d8c8});
    const RT=19*Math.PI/180, WA=16*Math.PI/180; // 기단 회전 · 창구 방향(남 → 동)
    // ---------- 0: 들판 · 꽃밭 · 대릉원 고분 · 계림 · 월성 · 먼 산 ----------
    K.layer(0); E.own();
    const TUM=[[-250,-260,38,17],[-205,-300,30,13],[-300,-200,26,10],[-180,-215,22,8],[-330,-300,34,14],[-260,-360,40,22],[-230,-395,36,20],[-150,-330,20,7],[-380,-240,24,9],[-120,-250,16,6],[-160,-160,14,5],[-90,-190,12,4.5],[60,-150,15,5],[110,-190,18,6]]; // 대릉원·노동동·인왕동 고분(위치·크기 추정, 황남대총 높이 약 23 m)
    const WOL=(x,z)=>{ const d=Math.hypot((x-180)/320,(z-300)/75); return d<1?9*Math.pow(1-d*d,.6):0; }; // 월성(반월형 토성, 남동쪽 — 추정)
    let TR;
    { const hf=(x,z)=>{ const r=Math.hypot(x,z); let h=(E.fbm(x*.008,z*.008,3)-.5)*1.6*E.ss((r-40)/120)-.05;
        for(const [tx,tz,R,H] of TUM){ const d=Math.hypot(x-tx,z-tz)/R; if(d<1) h=Math.max(h,H*Math.sqrt(1-d*d)); else if(d<1.15) h=Math.max(h,H*.04*(1.15-d)/.15); }
        h=Math.max(h,WOL(x,z));
        h+=E.peaks(x,z,[[0,3600,1600,700,420,1.2],[-2900,600,800,1500,330,1.25],[3400,-300,900,1600,560,1.2],[300,-3600,1800,700,260,1.3],[-1800,-2600,900,800,240,1.3],[2400,2600,900,800,300,1.3]]);
        for(const [zc,amp,sc] of [[-2700,140,.002],[3000,180,.0018]]){ const w=Math.exp(-Math.pow((z-zc)/700,2)); h=Math.max(h,w*amp*(.4+.6*E.ridged(x*sc+5,z*sc))); }
        if(r<9) h=Math.min(h,-.03); return h; };
      TR=E.terrain(0,0,0,0,E.axis(4800,170,4.6),E.axis(4800,170,4.6),hf,(x,z,h,ny)=>{ const r=Math.hypot(x,z);
        if(r<7.6) return [.78,.72,.6]; // 마사토 원형 마당
        if(Math.abs(x+1)<2.2&&z>7&&z<260) return [.76,.7,.58]; // 남쪽 진입 길
        if(Math.abs(z-34)<2&&x>-200&&x<300) return [.74,.69,.57]; // 동서 산책길
        for(const [tx,tz,R,H] of TUM){ const d=Math.hypot(x-tx,z-tz)/R; if(d<1.05){ const q=E.vn(x*.2,z*.2); return [.46+.06*q,.56+.05*q,.3]; } }
        if(r<1100&&h<20){ const q=E.fbm(x*.03,z*.03,2);
          if(x>40&&x<230&&z>-70&&z<20) return [.83+.06*q,.55+.08*q,.68+.05*q]; // 꽃단지(핑크뮬리 등 — 계절에 따라 바뀜)
          if(x>-160&&x<-40&&z>40&&z<120) return [.86,.74+.06*q,.36]; // 유채
          return [.46+.08*q,.57+.06*q,.31+.04*q]; }
        return E.mcol(x,z,h,ny,{far:1400,farW:1800,cliff:.3}); });
      // 계림(남서쪽 숲 — 느티나무·회화나무·왕버들 고목) · 월성 숲 · 고분 둘레 소나무 · 들판 가로수
      E.forest(E.scatter(-260,-120,70,200,7,TR.h,(x,z,h)=>Math.hypot((x+190)/70,(z-135)/65)<1,(x,z,h)=>14+E.r()*7,0),{trunks:true,cast:true});
      E.forest(E.scatter(-140,500,240,360,9,TR.h,(x,z,h)=>WOL(x,z)>1.5&&E.r()<.8,(x,z,h)=>11+E.r()*6,(x,z)=>E.r()<.4?1:0),{trunks:true});
      E.forest(E.scatter(-460,-80,-460,-120,10,TR.h,(x,z,h)=>{ for(const [tx,tz,R] of TUM){ if(Math.hypot(x-tx,z-tz)<R*1.2) return false; } return E.r()<.12; },(x,z,h)=>8+E.r()*4,1),{trunks:true});
      E.forest(E.scatter(-2400,2400,-2400,2400,26,TR.h,(x,z,h)=>h>14&&E.r()<.9,(x,z,h)=>16+E.vn(x*.01,z*.01)*10,(x,z)=>E.vn(x*.004,z*.004)<.5?1:0),{trunks:false});
      // 낮은 울타리(지름 약 15 m, 추정) — 나무 말뚝 + 두 줄 가로대
      { const posts=[]; const n=44, R=7.6; for(let i=0;i<n;i++){ const a=i/n*Math.PI*2; if(Math.abs(Math.atan2(Math.sin(a),Math.cos(a)))<.12) continue; posts.push([Math.sin(a)*R,-.05,Math.cos(a)*R]); } inst(cylG(.06,.75,6,.06),K.col(0x6c5843,{roughness:.9}),posts,true,K.life);
        for(const y of [.35,.68]){ const tg=new T.TorusGeometry(R,.025,4,90,Math.PI*2-.26); tg.rotateX(Math.PI/2); tg.rotateY(Math.PI/2+.13); const m=new T.Mesh(tg,K.col(0x6c5843,{roughness:.9})); m.position.y=y; K.life.add(m); } } }
    // ---------- 0: 기단 2단(장대석, 남북축 약 19° 회전) ----------
    { const g=new T.Group(); g.rotation.y=-RT; K.layer(0).add(g); K.cur=g; tbox(0,0,0,5.36,.395,5.36,BASEW,5.36); tbox(0,.395,0,5.18,.395,5.18,BASEW,5.18);
      const jn=[]; for(const [w,y] of [[5.36,0],[5.18,.395]]) for(let k=1;k<5;k++){ const t=-w/2+w*k/5; for(const s of [-1,1]){ jn.push(bx(t,y+.01,s*(w/2+.003),.025,.38,.01)); jn.push(bx(s*(w/2+.003),y+.01,t,.01,.38,.025)); } } merge(jn,K.col(0x7d756a),false); K.cur=null; }
    // ---------- 1: 몸통 27단 — 아래가 넓고 위로 갈수록 곧게 서는 병 모양(밑지름 4.93 m · 윗지름 2.85 m), 단마다 돌을 엇갈려 쌓음 ----------
    K.layer(1);
    const Y0=.79, HC=.288, NC=27; const rad=k=>1.425+1.04*Math.pow(1-Math.min(1,k/NC),2.5);
    { const it=[], col=[]; const tones=[[.84,.83,.79],[.79,.78,.74],[.88,.86,.81],[.74,.73,.69],[.83,.81,.75],[.7,.7,.67],[.8,.77,.7]]; let sd=5; const rr=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
      for(let k=0;k<NC;k++){ const r0=rad(k), r1=rad(k+1), r=(r0+r1)/2; const n=Math.max(10,Math.round(Math.PI*2*r/.78)); const off=(k%2)*.5; const dth=Math.PI*2/n;
        for(let i=0;i<n;i++){ const a=(i+off)*dth+.07; let dd=Math.atan2(Math.sin(a-WA),Math.cos(a-WA)); if(k>=12&&k<=14&&Math.abs(dd)*r<.475+.12) continue; // 창구(13~15단)
          const w=2*r*Math.sin(dth/2)*.985, h=HC*(.95+rr()*.03), dep=.42; const cx=Math.sin(a)*(r-dep/2), cz=Math.cos(a)*(r-dep/2); const tilt=Math.atan((r0-r1)/HC);
          it.push([cx,Y0+k*HC+.004,cz,a,w,h,dep,-tilt]); col.push(tones[Math.floor(rr()*tones.length)].map(v=>v*(.94+rr()*.1))); } }
      const geo=boxG(1,1,1); const m=new T.InstancedMesh(geo,SM,it.length); const M4=new T.Matrix4(), Q=new T.Quaternion(), V=new T.Vector3(), S3=new T.Vector3(), Eu=new T.Euler(0,0,0,'YXZ'), c=new T.Color();
      it.forEach((p,i)=>{ Eu.set(p[7],p[3],0); Q.setFromEuler(Eu); V.set(p[0],p[1],p[2]); S3.set(p[4],p[5],p[6]); M4.compose(V,Q,S3); m.setMatrixAt(i,M4); c.setRGB(col[i][0],col[i][1],col[i][2]).convertSRGBToLinear(); m.setColorAt(i,c); });
      m.instanceMatrix.needsUpdate=true; m.instanceColor.needsUpdate=true; put(m,true);
      // 속(어두운 속채움) — 돌 틈과 창구 안쪽이 어둡게 보이도록
      const pts=[]; for(let k=0;k<=NC;k++) pts.push(new T.Vector2(rad(k)-.36,Y0+k*HC)); put(new T.Mesh(new T.LatheGeometry(pts,24),DRK),false);
      // 창구: 한 변 약 0.95 m 정사각, 아래 문지방돌
      const wx=Math.sin(WA), wz=Math.cos(WA), rw=rad(13); const sill=new T.Mesh(boxG(1.25,.12,.5),STB); sill.position.set(wx*(rw-.18),Y0+12*HC-.06,wz*(rw-.18)); sill.rotation.y=WA; put(sill);
      const hole=new T.Mesh(boxG(.95,.86,.3),DRK); hole.position.set(wx*(rw-.5),Y0+12*HC,wz*(rw-.5)); hole.rotation.y=WA; put(hole,false); for(const s2 of [-1,1]){ const jm=new T.Mesh(boxG(.32,HC*3,.44),K.col(0xa9a192,{roughness:.93})); jm.position.set(wx*(rw-.2)+Math.cos(WA)*s2*.64,Y0+12*HC,wz*(rw-.2)-Math.sin(WA)*s2*.64); jm.rotation.y=WA; put(jm); }
      // 19·20단, 25·26단 안쪽 정자석 끝이 바깥으로 살짝 나온 자리
      const ends=[]; for(const [k,ax] of [[18,0],[19,1],[24,0],[25,1]]){ const r=rad(k+.5); for(const s of [-1,1]) for(const o of [-.42,.42]){ const a=ax?0:Math.PI/2; const nx=Math.sin(a)*s, nz=Math.cos(a)*s; const tx=Math.cos(a)*o, tz=-Math.sin(a)*o; ends.push([nx*(r+.02)+tx,Y0+k*HC+.01,nz*(r+.02)+tz,a,.3,HC*.94,.22]); } }
      inst(boxG(1,1,1),STB,ends); }
    // ---------- 2: 꼭대기 정자석 2단(井자로 짠 장대석, 바깥 한 변 약 3.06 m) · 동쪽 절반 판석 ----------
    K.layer(2);
    { const yt=Y0+NC*HC, L=3.06, wq=.3, hq=.3; const gs=[]; for(let l=0;l<2;l++){ const y=yt+l*hq, o=L/2-wq/2-.12; if(l===0){ gs.push(bx(0,y,o,L,hq,wq),bx(0,y,-o,L,hq,wq),bx(o,y,0,wq,hq,L-.02),bx(-o,y,0,wq,hq,L-.02)); } else { gs.push(bx(o,y,0,wq,hq,L),bx(-o,y,0,wq,hq,L),bx(0,y,o,L-.02,hq,wq),bx(0,y,-o,L-.02,hq,wq)); } }
      merge(gs,K.col(0xa59d8e,{roughness:.93})); const slab=new T.Mesh(boxG(1.1,.16,2.3),STB); slab.position.set(.62,yt+.3,0); put(slab);
      // 정자석 안 어둠(속이 빈 꼭대기)
      const top=new T.Mesh(new T.CylinderGeometry(rad(NC)-.4,rad(NC)-.4,.05,24),DRK); top.position.y=yt-.4; put(top,false); }
    K.cur=null;
    tidy(0);

  }});
