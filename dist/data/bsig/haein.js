__bsigFill({"haein":function(K){
// 출처: 매일신문 1999-01-26 — 수다라장·법보전 정면 15간(199.87척)·측면 2간(28.6척), 앞면 아래창 살 22·위창 12(위창이 아래창의 약 1/3, 상소하대), 뒷면 위창 21·아래창 11(상대하소), 1488(성종 19) 30간 개축, 1622·1624 중수, 1995 세계유산 · 한경 머니 2021 — 정면 15칸 측면 2칸 우진각지붕 홑처마, 4동이 긴 네모꼴 배치, 바닥 석회·숯·소금 위 황토 · 한국학중앙연구원 문화유산 위키 — 1488 중수 기록, 4동 ㅁ자
// 추정: 단 높이 6 m·계단, 기둥 높이 3.4 m, 기단 0.6 m, 창 크기(살 수 비례로), 사간판전 크기·맞배 지붕, 담 위치, 아래 단 크기
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

    // ===== 해인사 장경판전 — 가야산 기슭 가장 높은 단, 수다라장(남)·법보전(북) 두 긴 건물 + 동·서 사간판전이 ㅁ자로 =====
    // 수다라장·법보전: 정면 15칸·측면 2칸 우진각 홑처마(각 199.87척 × 28.6척 ≈ 60.6 × 8.7 m, 매일신문 1999)
    const WD=K.col(0x6e5a46,{roughness:.9}), WDD=K.col(0x4f3f31,{roughness:.9}), WH=K.col(0xe9e3d4,{roughness:.97}), RU=K.col(0x5a4a3c), GW=K.M.giwa, DR=K.col(0x2d2b28), ST=K.col(0xb3ac9f,{roughness:.95}), ST2=K.col(0x928c80,{roughness:.95}), DARK=K.col(0x1f1b17,{roughness:1}), SHELF=K.col(0x5b4532,{roughness:.9}), RED=K.col(0x8e3a2a,{roughness:.8}), GRN=K.col(0x3d6b5a,{roughness:.85});
    const STW=E.tmat(E.wallTex('hae_wall','#4f4a42',['#a8a294','#b6b0a1','#989284','#c1baa9','#8d887b'],70,60,150),0xb1aa9d,{tint:0xd6d0c4});
    const MAS=E.tmat(E.masTex(),0xd2c6a6,{tint:0xe0d6bf});
    const PY=6.0, LBAY=60.6/15, DEP=8.7; // 판전 단 높이(대적광전 마당 위, 추정) · 칸 너비 약 4.04 m
    // ---------- 0: 지형(가야산 사면) · 단 · 석축 · 계단 ----------
    K.layer(0); E.own();
    { const pads=[[-38,38,-30,15,PY],[-30,30,15,33,0]];
      const base=(x,z)=>{ let h; if(z<-30) h=PY+(-30-z)*.45; else if(z<15) h=PY; else h=PY-(z-15)*(PY/16); if(z>31) h=-(z-31)*.15; h-=Math.max(0,Math.abs(x)-40)*.06*(z>-30?1:0);
        h+=E.peaks(x,z,[[-60,-420,420,280,360,1.2],[-420,-260,260,260,220,1.3],[400,-260,280,260,240,1.3],[-380,300,260,300,120,1.3],[400,300,260,280,140,1.3]])*E.ss((Math.hypot(x,(z+5)*.8)-60)/90); h+=(E.fbm(x*.03,z*.03,3)-.5)*4*E.ss((Math.hypot(x,z)-55)/60); return h; };
      const hf=(x,z)=>{ let h=base(x,z); for(const [a0,a1,b0,b1,top] of pads){ if(x>a0-.5&&x<a1+.5&&z>b0-.5&&z<b1+.5) h=Math.min(h,top-.35); } return h; };
      const TR=E.terrain(0,0,0,0,E.axis(2600,150,4.4),E.axis(2600,150,4.4,100),hf,(x,z,h,ny)=>{ if(Math.abs(x)<44&&z>-36&&z<56) return [.5+.04*E.fbm(x*.1,z*.1,2),.55,.38]; return E.mcol(x,z,h,ny,{far:450,farW:900,cliff:.45}); });
      E.forest(E.scatter(-760,760,-760,700,8,TR.h,(x,z,h)=>{ if(x>-46&&x<46&&z>-40&&z<60) return false; if(z>10&&Math.hypot(x,z)<135) return false; if(x>0&&z>-20&&Math.hypot(x,z)<120) return false; return Math.hypot(x,z)<800&&E.r()<.9; },(x,z,h)=>8+E.vn(x*.05,z*.05)*7,(x,z,h)=>E.vn(x*.03+3,z*.03)<.6?1:2),{trunks:false});
      E.forest([[-42,TR.h(-42,-12),-12,13,1,.3,1],[-44,TR.h(-44,8),8,12,2,.6,1],[42,TR.h(42,-26),-26,12,1,.5,1],[-30,TR.h(-30,-38),-38,14,2,.2,1],[24,TR.h(24,-40),-40,13,1,.8,1]],{cast:true});
      // 아래쪽 해인사 경내 지붕들(멀리, 개략) — 블록 대신 낮은 숲 틈의 마당
    }
    // 판전 단(석축) · 대적광전 앞마당(아래 단)
    tbox(0,-3,-7.5,76,PY+3,45,STW,4.5); K.b(0,PY,-7.5,76.4,.2,45.4,ST2); K.b(0,PY+.2,-7.5,75.6,.03,44.6,MAS);
    tbox(0,-3,24,60,3,18,STW,4.5); K.b(0,0,24,60.4,.2,18.4,ST2); K.b(0,.2,24,59.6,.03,17.6,MAS); // 아래 단(대적광전 뒤뜰, 개략)
    { const gs=[]; const n=16, run=.45, rise=(PY)/n; for(let k=0;k<n;k++) gs.push(bx(0,.2,15+(k+.5)*run,4,PY-(k+1)*rise+.0,run)); for(const s of [-1,1]) gs.push(bx(s*2.25,.2,15+n*run/2,.5,PY+.25,n*run)); merge(gs,ST); } // 판전으로 오르는 돌계단(추정)
    // 담(판전 영역 둘레) — 흙돌담 + 기와
    const wall=(x0,z0,x1,z1,h)=>{ const L=Math.hypot(x1-x0,z1-z0), a=Math.atan2(x1-x0,z1-z0), xm=(x0+x1)/2, zm=(z0+z1)/2; tbox(xm,PY+.2,zm,.6,h,L,STW,2.2,a); K.b(xm,PY+.2+h,zm,.95,.14,L+.3,RU,a); const r=new T.Mesh(boxG(.5,.2,L+.2),GW); r.position.set(xm,PY+.34+h,zm); r.rotation.y=a; put(r); };
    wall(-37,-29.5,37,-29.5,2.0); wall(-37,-29.5,-37,14.5,2.0); wall(37,-29.5,37,14.5,2.0); wall(-37,14.5,-3,14.5,2.0); wall(3,14.5,37,14.5,2.0);
    // ---------- 1: 판전 몸체 — 기단·기둥·회벽·살창(앞뒤 위아래 크기를 달리함) ----------
    K.layer(1);
    const bars=[], wins=[], cols=[], beams=[];
    const hall=(cz,front,doorBay)=>{ const y=PY+.2+.6, CH=3.4; K.b(0,PY+.2,cz,60.6+2.2,.6,DEP+2.2,ST); // 기단(추정 0.6 m)
      for(let i=0;i<=15;i++){ const x=-30.3+i*LBAY; for(const z of [-DEP/2,0,DEP/2]) cols.push([x,y,cz+z]); }
      K.b(0,y,cz,60.4,.04,DEP-.2,K.col(0x8d7b62,{roughness:1})); // 흙바닥(숯·횟가루·소금·모래를 다진 위)
      // 벽(앞·뒤·옆) + 인방
      for(const s of [-1,1]){ const zf=cz+s*DEP/2; for(let i=0;i<15;i++){ if(i===doorBay&&s===front) continue; const x=-30.3+(i+.5)*LBAY; K.b(x,y,zf,LBAY-.3,CH,.2,WH); } K.b(0,y+CH-.05,zf,61,.32,.3,WDD); K.b(0,y,zf,61,.25,.3,WDD); K.b(0,y+1.55,zf,61,.16,.26,WDD); }
      for(const s of [-1,1]){ K.b(s*30.3,y,cz,.2,CH,DEP-.2,WH); K.b(s*30.3,y+CH-.05,cz,.3,.32,DEP+.2,WDD); }
      // 살창: 앞면(남) — 위 작고 아래 큼 · 뒷면(북) — 위 크고 아래 작음 (매일신문 1999: 앞 아래 살 22·위 12, 뒤 위 21·아래 11)
      for(const s of [-1,1]){ const zf=cz+s*DEP/2+s*.12, isFront=(s===front); for(let i=0;i<15;i++){ if(i===doorBay&&isFront) continue; const x=-30.3+(i+.5)*LBAY;
        const lo=isFront?[2.6,1.05,.35,22]:[1.3,.55,.6,11], up=isFront?[1.4,.55,2.35,12]:[2.6,1.05,2.0,21]; // [폭, 높이, 밑 높이, 살 수]
        for(const [w,h,y0,n] of [lo,up]){ wins.push([x,y+y0,zf,0,w,h,1]); for(let k=0;k<n;k++) bars.push([x-w/2+(k+.5)*w/n,y+y0,zf+s*.06,0,1,h,1]); beams.push([x,y+y0+h,zf+s*.04,0,w+.2,1,1],[x,y+y0-.08,zf+s*.04,0,w+.2,1,1]); } } }
      // 안쪽 판가(경판 선반) — 살창 너머 어둡게 보이는 선반 줄
      for(const z of [-2.2,2.2]) for(let k=0;k<5;k++) K.b(0,y+.3+k*.62,cz+z,59.6,.06,1.6,SHELF);
      for(let i=0;i<15;i++){ const x=-30.3+(i+.5)*LBAY; for(const z of [-2.2,2.2]) K.b(x-LBAY/2+.2,y,cz+z,.12,3.1,1.6,SHELF); }
      if(doorBay>=0){ const x=-30.3+(doorBay+.5)*LBAY, zf=cz+front*DEP/2; K.b(x,y+2.6,zf,LBAY-.3,.8,.2,WH); for(const sx of [-1,1]) K.b(x+sx*(LBAY/2-.25),y,zf,.22,2.6,.24,WDD); const ar=new T.Mesh(new T.TorusGeometry(1.75,.1,6,16,Math.PI),WDD); ar.position.set(x,y+1.9,zf+front*.13); put(ar,false); }
      // 우진각 지붕(홑처마)
      K.layer(2); const yf=roofHF(0,y+CH+.35,cz,64.2,12.4,4.2,{dt:0,mat:GW,under:RU,thk:.36,sori:.45,nu:56,rh:.55}); const R=64.2-12.4; for(const sx of [-1,1]) for(const t of [-1,1]) hipLine(yf,0,cz,sx*(32.1-.3),t*(6.2-.3),sx*R/2,0,14,DR,.38);
      K.b(0,y+CH+.25,cz,61.4,.3,DEP+.6,RU); { const raf=[]; for(let x=-31.4;x<=31.4;x+=.55) for(const s of [-1,1]) raf.push([x,y+CH+.1,cz+s*(DEP/2+.9),0,1,1,1]); inst(boxG(.16,.16,1.4),RU,raf); }
      K.layer(1); };
    hall(4,1,7);    // 수다라장(남, 앞) — 가운데 칸 출입문
    hall(-18,-1,7); // 법보전(북)
    inst(cylG(.24,3.4,10,.22),WD,cols); inst(cylG(.4,.14,8,.38),ST,cols.map(c=>[c[0],c[1]-.02,c[2]]));
    inst(boxG(1,1,.08),DARK,wins); inst(boxG(.07,1,.09),WD,bars); inst(boxG(1,.1,.12),WDD,beams);
    // 동·서 사간판전(작은 판전, 정면 2칸 추정) — 두 긴 건물 사이 마당 양끝
    for(const s of [-1,1]){ const cx=s*25, cz=-7, y=PY+.8; K.b(cx,PY+.2,cz,9.2,.6,5.4,ST); const cs=[]; for(const x of [-3.9,0,3.9]) for(const z of [-2,2]) cs.push([cx+x,y,cz+z]); inst(cylG(.2,2.9,10,.18),WD,cs); K.b(cx,y,cz,7.6,2.9,3.8,WH); const ws=[],bs=[]; for(const x of [-1.95,1.95]) for(const z of [-1.95,1.95]){ ws.push([cx+x,y+1.0,cz+z,0,2.4,.8,1]); for(let k=0;k<10;k++) bs.push([cx+x-1.2+(k+.5)*.24,y+1.0,cz+z+Math.sign(z)*.06,0,1,.8,1]); } inst(boxG(1,1,.08),DARK,ws); inst(boxG(.06,1,.08),WD,bs); K.b(cx,y+2.85,cz,8.0,.3,4.2,WDD);
      K.layer(2); roofHF(cx,y+3.05,cz,11.4,7.6,2.6,{dt:1,mat:GW,under:RU,thk:.3,sori:.3,gmat:WD,rh:.42}); K.layer(1); }
    // 마당 가운데 박석 길(수다라장 출입문 → 법보전) · 배수 도랑(돌)
    K.b(-30.3+7.5*LBAY,PY+.2,-7,2.2,.06,13,ST); for(const z of [-1.5,15.5]) K.b(0,PY+.18,z-7+(z>0?-4.5:0)*0,70,.08,.5,ST2);

  }});
