__bsigFill({"ise":function(K){
// 출처: 유이쓰 신메이즈쿠리, 겹겹의 미카키(御垣), 고덴치가 다음 천궁의 신어부지가 됨 — Discover Japan 「伊勢神宮」 · 내궁 가쓰오기 10개·치기 우치소기, 식년천궁 20년 주기(제62회 2013), 가야(억새) 지붕, 굴립주·무나모치바시라
// 추정: 정전 10.9 × 5.5 m·용마루 높이 약 10.5 m·마루 높이 약 2.4 m, 울타리 네 겹 크기(30×36·40×48·52×62·64×80 m), 동·서보전 위치, 고덴치 위치(서쪽에 둠 — 20년마다 동서 교대), 숲·돌계단
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

    // ---- 일본 전통 공용(s2): 재질·질감(기와·히와다·고케라·가야·연자창·쇼지·판문) · 기둥 · 두공 · 서까래 · 난간 · 탑 층 · 상륜 · 석등 ----
    const J=(()=>{ const c=K.col; const J={VER:c(0xc4472b,{roughness:.66}), VERD:c(0xa0543a,{roughness:.86}), WH:c(0xf0ebdf,{roughness:.96}), WD:c(0x57432f,{roughness:.86}), WDL:c(0x9a7c5a,{roughness:.86}), WDG:c(0x6f6458,{roughness:.92}), ST:c(0xb3ada1,{roughness:.95}), ST2:c(0x8f897e,{roughness:.95}), DK:c(0x1d1a17,{roughness:.8}), GD:c(0xd8b04a,{metalness:.6,roughness:.35,emissive:0x3a2a08,emissiveIntensity:.3}), BRZ:c(0x56675a,{metalness:.45,roughness:.5}), RU:c(0x3c3027,{roughness:.9}), RD:c(0x34363a,{roughness:.75}), YEL:c(0xd9b84a,{roughness:.6}), WD2:c(0x3a2c22,{roughness:.85})};
      const tm=(key,draw,base,o)=>{ const t=E.tex(key,256,draw); const m=new T.MeshStandardMaterial(Object.assign({map:t,roughness:.88},o||{})); if(!t) m.color.setHex(base); m.color.convertSRGBToLinear(); return m; };
      // 본가와라 기와: 수키와 줄(2 m에 8줄, 경사 방향) + 암키와 단 — 지붕면 uv 기준
      J.KAW=tm('j_kaw',(g,N,rr)=>{ g.fillStyle='#4f5257'; g.fillRect(0,0,N,N); const n=8, w=N/n; for(let i=0;i<n;i++){ const x=i*w; const gr=g.createLinearGradient(x,0,x+w*.46,0); gr.addColorStop(0,'#33363a'); gr.addColorStop(.45,'#8b9097'); gr.addColorStop(1,'#3a3d41'); g.fillStyle=gr; g.fillRect(x,0,w*.46,N); g.fillStyle='rgba(0,0,0,.35)'; g.fillRect(x+w*.46,0,2,N); } for(let y=0;y<N;y+=N/7){ g.fillStyle='rgba(0,0,0,.28)'; g.fillRect(0,y,N,2); g.fillStyle='rgba(255,255,255,.08)'; g.fillRect(0,y+2,N,2); } for(let i=0;i<1500;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.05)':'rgba(0,0,0,.08)'; g.fillRect(rr()*N,rr()*N,2,2); } },0x5a5d62,{roughness:.62,metalness:.05});
      // 히와다부키(노송나무 껍질): 가는 단 줄이 촘촘한 갈색 면
      J.HIW=tm('j_hiw',(g,N,rr)=>{ g.fillStyle='#4e3427'; g.fillRect(0,0,N,N); for(let y=0;y<N;y+=3){ g.fillStyle=rr()<.5?'rgba(40,22,12,.35)':'rgba(120,85,62,.16)'; g.fillRect(0,y,N,1.2); } for(let i=0;i<2500;i++){ g.fillStyle=rr()<.5?'rgba(120,80,55,.25)':'rgba(30,18,10,.2)'; g.fillRect(rr()*N,rr()*N,1+rr()*5,1); } },0x4e3427,{roughness:.95});
      J.HIW.color.setHex(0x9a8a82).convertSRGBToLinear();
      // 고케라부키(얇은 너와): 회갈색, 단 줄이 조금 굵음
      J.KOK=tm('j_kok',(g,N,rr)=>{ g.fillStyle='#6d6052'; g.fillRect(0,0,N,N); for(let y=0;y<N;y+=6){ g.fillStyle='rgba(30,24,18,.4)'; g.fillRect(0,y,N,1.5); let x=rr()*10; while(x<N){ g.fillStyle='rgba(20,16,12,.25)'; g.fillRect(x,y,1,6); x+=6+rr()*10; } } for(let i=0;i<1800;i++){ g.fillStyle=rr()<.5?'rgba(160,150,130,.18)':'rgba(30,25,20,.15)'; g.fillRect(rr()*N,rr()*N,2,1); } },0x6d6052,{roughness:.95});
      // 가야부키(억새 이엉): 경사 방향 짧은 결
      J.KAYA=tm('j_kaya',(g,N,rr)=>{ g.fillStyle='#8a7a5a'; g.fillRect(0,0,N,N); const cs=['#a39370','#77684b','#6a5c42','#b2a27e','#8f7f5f']; for(let i=0;i<4200;i++){ g.strokeStyle=cs[Math.floor(rr()*cs.length)]; g.lineWidth=1+rr(); const x=rr()*N, y=rr()*N; g.beginPath(); g.moveTo(x,y); g.lineTo(x+(rr()-.5)*2,y+6+rr()*10); g.stroke(); } },0x8a7a5a,{roughness:1});
      // 연자창(連子窓): 녹청 살대 · 단(丹) 틀
      J.REN=tm('j_ren',(g,N)=>{ g.fillStyle='#16130f'; g.fillRect(0,0,N,N); g.fillStyle='#4d8a6c'; for(let x=6;x<N;x+=16) g.fillRect(x,0,7,N); g.fillStyle='rgba(255,255,255,.12)'; for(let x=6;x<N;x+=16) g.fillRect(x,0,2,N); },0x2f4a3c);
      // 쇼지(장지): 흰 창호지 + 가는 살
      J.SHO=tm('j_sho',(g,N)=>{ g.fillStyle='#efe9da'; g.fillRect(0,0,N,N); g.fillStyle='#7d664c'; for(let x=0;x<N;x+=32) g.fillRect(x,0,3,N); for(let y=0;y<N;y+=26) g.fillRect(0,y,N,3); g.fillStyle='#5b4632'; for(let x=0;x<N;x+=128) g.fillRect(x,0,8,N); g.fillRect(0,N-20,N,20); },0xe7e0cf);
      // 판문: 세로 널 + 청동 못머리 줄
      J.ITA=tm('j_ita',(g,N,rr)=>{ g.fillStyle='#5a4130'; g.fillRect(0,0,N,N); for(let x=0;x<N;x+=N/8){ g.fillStyle='rgba(0,0,0,.35)'; g.fillRect(x,0,2,N); g.fillStyle='rgba(255,220,180,.06)'; g.fillRect(x+3,0,N/8-6,N); } g.fillStyle='#b99a5a'; for(const y of [N*.12,N*.5,N*.88]) for(let x=N/16;x<N;x+=N/8){ g.beginPath(); g.arc(x,y,3,0,7); g.fill(); } },0x5a4130);
      // 흰 자갈(백석)
      J.GRV=E.tmat(E.tex('j_grv',256,(g,N,rr)=>{ g.fillStyle='#dcd8cf'; g.fillRect(0,0,N,N); const cs=['#f1eee8','#c9c4b9','#e6e2da','#b8b2a6','#fbfaf6']; for(let i=0;i<5200;i++){ g.fillStyle=cs[Math.floor(rr()*cs.length)]; g.beginPath(); g.arc(rr()*N,rr()*N,.8+rr()*1.8,0,7); g.fill(); } }),0xdcd8cf);
      J.COL=(r,h,ent)=>{ if(!ent) return cylG(r,h,10,r*.96); const pts=[]; for(let k=0;k<=10;k++){ const t=k/10; const d=t<.35?1-.06*Math.pow((.35-t)/.35,2):1-.24*Math.pow((t-.35)/.65,2); pts.push(new T.Vector2(r*d,t*h)); } return new T.LatheGeometry(pts,10); };
      // 기둥: XC×ZC 격자 둘레(all이면 전부)
      J.cols=(XC,ZC,y,h,r,mat,all,ent,ox,oz)=>{ const L=[]; XC.forEach((x,i)=>ZC.forEach((z,j)=>{ if(all||i===0||i===XC.length-1||j===0||j===ZC.length-1) L.push([x+(ox||0),y,z+(oz||0)]); })); inst(J.COL(r,h,ent),mat,L); return L; };
      // 두리 도리(테두리 보)
      J.ring=(cx,cz,W,D,y,h,t,mat)=>{ K.b(cx,y,cz+D/2,W+t,h,t,mat); K.b(cx,y,cz-D/2,W+t,h,t,mat); K.b(cx+W/2,y,cz,t,h,D,mat); K.b(cx-W/2,y,cz,t,h,D,mat); };
      // 두공: 둘레 기둥 위 바깥으로 내민 3단 공포(+ 칸 사이 간포)
      J.brk=(XC,ZC,y,s,mat,mid,cx,cz,mat2)=>{ cx=cx||0; cz=cz||0; const X0=XC[0],X1=XC[XC.length-1],Z0=ZC[0],Z1=ZC[ZC.length-1]; const R=[]; XC.forEach(x=>{ R.push([x,Z1,0,0],[x,Z0,Math.PI,0]); }); ZC.slice(1,-1).forEach(z=>{ R.push([X1,z,Math.PI/2,0],[X0,z,-Math.PI/2,0]); });
        if(mid){ for(let i=0;i<XC.length-1;i++){ const x=(XC[i]+XC[i+1])/2; R.push([x,Z1,0,1],[x,Z0,Math.PI,1]); } for(let j=0;j<ZC.length-1;j++){ const z=(ZC[j]+ZC[j+1])/2; R.push([X1,z,Math.PI/2,1],[X0,z,-Math.PI/2,1]); } }
        for(const sx of [-1,1]) for(const sz of [-1,1]) R.push([sx>0?X1:X0,sz>0?Z1:Z0,Math.atan2(sx,sz),2]);
        const a=[],b=[],c2=[],d=[]; R.forEach(([x,z,ry,k])=>{ x+=cx; z+=cz; const nx=Math.sin(ry), nz=Math.cos(ry), e=k===2?1.35:1; a.push([x,y,z,ry,s,s,s]); c2.push([x,y+.26*s,z,ry,s,s,s]); if(k===1) return; b.push([x+nx*.5*s*e,y+.26*s,z+nz*.5*s*e,ry,s,s,s*e]); d.push([x+nx*1.0*s*e,y+.5*s,z+nz*1.0*s*e,ry,s,s,s*e]); });
        inst(boxG(.46,.26,.46),mat,a); inst(boxG(.28,.24,1.1),mat,b); inst(boxG(1.4,.22,.28),mat2||mat,c2); inst(boxG(.3,.26,1.3),mat,d); };
      // 서까래: 사각 처마 둘레(W×D 벽선)에서 처마 끝까지 평행 서까래(인스턴스)
      J.raft=(cx,cz,W,D,yw,ye,ov,sp,mat,sz)=>{ sz=sz||.13; const L=Math.hypot(ov,yw-ye), th=Math.atan2(yw-ye,ov); const g=new T.BoxGeometry(sz,sz,L); g.translate(0,0,L/2); g.rotateX(th); const it=[];
        for(const [len,ry,ox,oz] of [[W,0,0,D/2],[W,Math.PI,0,-D/2],[D,Math.PI/2,W/2,0],[D,-Math.PI/2,-W/2,0]]){ const n=Math.max(2,Math.round((len+ov*1.4)/sp)); for(let i=0;i<=n;i++){ const t=-len/2-ov*.7+(len+ov*1.4)*i/n; const lx=Math.cos(ry)*t, lz=-Math.sin(ry)*t; it.push([cx+ox+lx,yw,cz+oz+lz,ry]); } } inst(g,mat,it); };
      // 난간(고란): 기둥 인스턴스 + 두 줄 가로대
      J.rail=(cx,y,cz,w,d,h,mat,sp)=>{ sp=sp||.9; const P=[]; for(const [x0,z0,x1,z1] of [[-w/2,-d/2,w/2,-d/2],[w/2,-d/2,w/2,d/2],[w/2,d/2,-w/2,d/2],[-w/2,d/2,-w/2,-d/2]]){ const L=Math.hypot(x1-x0,z1-z0), n=Math.max(2,Math.round(L/sp)); for(let i=0;i<n;i++){ const t=i/n; P.push([cx+x0+(x1-x0)*t,y,cz+z0+(z1-z0)*t]); } } inst(boxG(.1,h,.1),mat,P); const gs=[]; for(const yy of [h-.08,h*.45]) gs.push(bx(cx,y+yy,cz+d/2,w+.1,.08,.09),bx(cx,y+yy,cz-d/2,w+.1,.08,.09),bx(cx+w/2,y+yy,cz,.09,.08,d+.1),bx(cx-w/2,y+yy,cz,.09,.08,d+.1)); merge(gs,mat); };
      // 탑 상륜: 노반·복발·앙화·구륜(9)·수연·용차·보주
      J.sorin=(x,y,z,h,mat)=>{ const s=h/9; const gs=[bx(x,y,z,1.5*s,.45*s,1.5*s)]; const hb=new T.SphereGeometry(.62*s,12,6,0,Math.PI*2,0,Math.PI/2); hb.translate(x,y+.45*s,z); gs.push(hb); const uk=cylG(.5*s,.35*s,12,.7*s); uk.translate(x,y+1.0*s,z); gs.push(uk); const sh=cylG(.09*s,h-1.2*s,8,.07*s); sh.translate(x,y+1.2*s,z); gs.push(sh);
        for(let i=0;i<9;i++){ const r=cylG(.42*s*(1-i*.025),.13*s,14,.42*s*(1-i*.025)); r.translate(x,y+1.55*s+i*.48*s,z); gs.push(r); } for(const ry of [0,Math.PI/2]){ const f=new T.BoxGeometry(1.0*s,1.1*s,.05); f.rotateY(ry); f.translate(x,y+6.4*s,z); gs.push(f); } const ry2=new T.SphereGeometry(.2*s,10,8); ry2.translate(x,y+7.7*s,z); gs.push(ry2); const hj=new T.SphereGeometry(.26*s,10,8); hj.translate(x,y+8.4*s,z); gs.push(hj); merge(gs,mat||J.BRZ); };
      // 석등(도로): 받침·간석·화대·화창·갓·보주(한 메시)
      J.toro=(x,y,z,s,mat,oct)=>{ const sg=oct?8:6; const gs=[]; const p=(g,yy)=>{ g.translate(0,yy,0); g.scale(s,s,s); g.translate(x,y,z); gs.push(g); }; p(cylG(.55,.25,sg,.5),0); p(cylG(.16,1.1,sg,.16),.25); p(cylG(.48,.2,sg,.32),1.35); p(cylG(.36,.6,sg,.36),1.55); p(cylG(.75,.3,sg,.12),2.15); p(new T.SphereGeometry(.13,8,6),2.55); merge(gs,mat||J.ST); };
      // 카메라 쐐기(기본·눈높이·정면 시점 방향, 모형 중심에서 R m 안) 비우기 — 앞나무가 건물을 가리지 않게
      J.clr=(x,z,cx,cz,R)=>{ const dx=x-cx, dz=z-cz; if(Math.hypot(dx,dz)>(R||360)) return true; const a=Math.atan2(dz,dx); return !(a>.38&&a<1.85); };
      return J; })();
    const HN=K.col(0xd2b98f,{roughness:.8}), HN2=K.col(0xb99d74,{roughness:.85}), HND=K.col(0x8f7556,{roughness:.88}), KY=J.KAYA, KYB=K.col(0x6f6047,{roughness:1}), GD=K.col(0xd6ad45,{metalness:.65,roughness:.32});
    // 곧은 맞배 이엉지붕: 단면(두께 thk)을 x로 압출 + 윗면 질감 시트
    const thatch=(cx,ye,cz,L,Dd,H,thk)=>{ const s=new T.Shape(); s.moveTo(-Dd/2,0); s.lineTo(0,H); s.lineTo(Dd/2,0); s.lineTo(Dd/2-.15,-thk); s.lineTo(0,H-thk*1.45); s.lineTo(-Dd/2+.15,-thk); s.closePath(); const g=new T.ExtrudeGeometry(s,{depth:L,bevelEnabled:false}); g.rotateY(Math.PI/2); g.translate(cx-L/2,ye,cz); put(new T.Mesh(g,KYB));
      for(const sd of [-1,1]) K.surf((u,v)=>{ const x=cx-L/2-.02+(L+.04)*u, t=v; return [x,ye+H*t+.03,cz+sd*(Dd/2)*(1-t),x/2,t*2]; },6,6,KY); return y=>0; };
    // 신메이즈쿠리 한 채: W×D 몸체, 마루 높이 fh, 벽 높이 wh, 지붕(처마 ov·박공 ovg·오름 H), 가쓰오기 n, 툇마루·난간 여부
    const shinmei=(cx,cz,W,D,fh,wh,ov,ovg,H,nK,o)=>{ o=o||{}; const XC=[], ZC=[-D/2,0,D/2]; for(let i=0;i<=3;i++) XC.push(-W/2+W*i/3);
      J.cols(XC,ZC,0,fh+wh,.26,HN,1,0,cx,cz); // 굴립주
      K.b(cx,fh-.2,cz,W+.3,.2,D+.3,HN2);
      { const bd=[]; for(const [x,z,w,d] of [[0,D/2,W,.12],[0,-D/2,W,.12],[W/2,0,.12,D],[-W/2,0,.12,D]]) bd.push(bx(cx+x,fh,cz+z,w,wh,d)); merge(bd,HN); const ln=[]; for(let k=1;k<6;k++) for(const [x,z,w,d] of [[0,D/2+.07,W,.02],[0,-D/2-.07,W,.02],[W/2+.07,0,.02,D],[-W/2-.07,0,.02,D]]) ln.push(bx(cx+x,fh+k*wh/6,cz+z,w,.03,d)); merge(ln,HND); }
      K.b(cx,fh+.15,cz+D/2+.08,W/3-.7,wh-.5,.08,K.col(0xc4a77c,{roughness:.75})); K.b(cx,fh+.15,cz+D/2+.11,.05,wh-.5,.05,HND); // 정면 가운데 판문
      J.ring(cx,cz,W,D,fh+wh-.1,.3,.24,HN2);
      if(o.veranda){ const vw=1.25; K.b(cx,fh-.25,cz,W+2*vw,.18,D+2*vw,HN2); const posts=[]; for(const [x0,z0,x1,z1] of [[-1,1,1,1],[1,1,1,-1],[1,-1,-1,-1],[-1,-1,-1,1]]){ const L=Math.hypot((x1-x0)*(W/2+vw),(z1-z0)*(D/2+vw)), n=Math.max(2,Math.round(L/1.2)); for(let i=0;i<n;i++){ const t=i/n; const x=cx+(x0+(x1-x0)*t)*(W/2+vw-.1), z=cz+(z0+(z1-z0)*t)*(D/2+vw-.1); if(Math.abs(x-cx)<1.1&&z>cz) continue; posts.push([x,fh-.07,z]); } } inst(boxG(.12,.85,.12),HN,posts);
        const BALL=[0x2f5a9a,0xd8b33a,0xb8382c,0xf2efe6,0x222222]; BALL.forEach((cc,k)=>inst(new T.SphereGeometry(.1,8,6),K.col(cc,{roughness:.5}),posts.filter((p,i)=>i%5===k).map(p=>[p[0],p[1]+.88,p[2]]),false));
        J.rail(cx,fh-.07,cz,W+2*vw-.2,D+2*vw-.2,.82,HN,40);
        // 정면 계단(기자하시) + 계단 난간
        const st=[]; const n=Math.round(fh/.24); for(let k=0;k<n;k++) st.push(bx(cx,0,cz+D/2+vw+.1+(k+.5)*.32,1.9,fh-.25-k*.24+.0001,.34)); merge(st,HN2); for(const s of [-1,1]) K.b(cx+s*1.05,fh-.4,cz+D/2+vw+n*.16+.3,.1,.9,n*.32+.4,HN,0,{slope:-fh/(n*.32+.4)}); }
      // 지붕
      const ye=fh+wh+.15, Dd=D+2*ov, L=W+2*ovg; thatch(cx,ye,cz,L,Dd,H,.85);
      // 박공 판(하후)·치기(우치소기) · 무나모치바시라
      for(const sx of [-1,1]){ const x=cx+sx*(L/2+.06); const ang=Math.atan2(H,Dd/2), len=Math.hypot(H,Dd/2)+2.2; for(const sz of [-1,1]){ const g=new T.BoxGeometry(.16,.5,len); g.translate(0,0,len/2); const m=new T.Mesh(g,HN); m.position.set(x,ye-.1,cz+sz*Dd/2); m.rotation.x=sz>0?Math.PI+ang:-ang; put(m); }
        // 우치소기 끝 금구
        for(const sz of [-1,1]) K.b(x,ye+H+2.0*Math.sin(ang)-.25,cz-sz*2.0*Math.cos(ang),.2,.28,.42,GD);
        K.c(cx+sx*(W/2+.95),0,cz,.3,ye+H-.4,HN,10); }
      // 용마루 덮개(갑옷 판) + 가쓰오기
      K.b(cx,ye+H-.25,cz,L-1.2,.55,1.1,HN2); const kp=[]; for(let i=0;i<nK;i++){ const x=cx-(L-3)/2+(L-3)*i/(nK-1); kp.push([x,ye+H+.32,cz-1.0]); } inst((()=>{ const g=new T.CylinderGeometry(.24,.26,2.0,10); g.rotateX(Math.PI/2); g.translate(0,0,1.0); return g; })(),HN,kp); inst((()=>{ const g=new T.CylinderGeometry(.27,.27,.12,10); g.rotateX(Math.PI/2); return g; })(),GD,kp.flatMap(p=>[[p[0],p[1],p[2]-.02],[p[0],p[1],p[2]+2.02]]));
      return ye+H; };
    // 울타리: 판담(미즈가키·이타가키) / 살담(타마가키) + 남쪽 가운데 문(맞배 이엉 지붕)
    const fence=(x0,x1,z0,z1,h,kind,mat,gw,grp)=>{ const gs=[], cap=[]; const segs=[[x0,z1,-gw/2+(x0+x1)/2,z1],[gw/2+(x0+x1)/2,z1,x1,z1],[x1,z1,x1,z0],[x1,z0,x0,z0],[x0,z0,x0,z1]];
      segs.forEach(([ax,az,bx2,bz])=>{ const L=Math.hypot(bx2-ax,bz-az), alongX=Math.abs(bx2-ax)>Math.abs(bz-az), cx=(ax+bx2)/2, cz=(az+bz)/2;
        if(kind==='board'){ gs.push(bx(cx,0,cz,alongX?L:.14,h,alongX?.14:L)); cap.push(bx(cx,h,cz,alongX?L+.2:.32,.14,alongX?.32:L+.2)); const n=Math.round(L/2.4); for(let i=0;i<=n;i++){ const t=i/n; cap.push(bx(ax+(bx2-ax)*t,0,az+(bz-az)*t,.24,h+.05,.24)); } }
        else { const n=Math.round(L/.42); for(let i=0;i<=n;i++){ const t=i/n; gs.push(bx(ax+(bx2-ax)*t,0,az+(bz-az)*t,.14,h,.14)); } for(const yy of [.35,h*.55,h-.12]) cap.push(bx(cx,yy,cz,alongX?L:.12,.1,alongX?.12:L)); } });
      merge(gs,mat,true,grp); merge(cap,HN2,true,grp);
      // 남문
      const gx=(x0+x1)/2, g0=K.cur; if(grp) K.cur=grp; const ps=[[gx-gw/2,z1],[gx+gw/2,z1],[gx-gw/2,z1-1.4],[gx+gw/2,z1-1.4]]; inst(cylG(.2,h+1.4,10,.2),HN,ps.map(p=>[p[0],0,p[1]]),true,grp); K.b(gx,h+1.3,z1-.7,gw+.6,.3,1.9,HN2); thatch(gx,h+1.6,z1-.7,gw+2.2,3.4,1.5,.4); K.cur=g0; };
    // ---------- 0: 지형 · 삼나무 숲 · 돌계단 · 자갈 ----------
    K.layer(0); E.own(); let TR;
    { const hf=(x,z)=>{ let h=(E.fbm(x*.015,z*.015,3)-.5)*4*E.ss((Math.hypot((x+33)*.6,z*.7)-75)/60);
        h+=Math.max(0,-z-50)*.18*E.ss((-z-50)/60); h+=E.peaks(x,z,[[40,-480,600,300,190,1.25],[-500,-300,500,500,140,1.3],[600,-200,500,500,160,1.3],[-200,700,800,400,90,1.3],[900,600,700,500,110,1.3]]);
        if(x>-102&&x<36&&z>-46&&z<42) h=Math.min(h,-.04); if(Math.abs(x)<5&&z>=42&&z<70) h=Math.min(h,-.04-(z-42)*.12); if(Math.abs(x)<40&&z>=42&&z<120) h=Math.min(h,Math.max(-3.4,-.04-(z-42)*.12));
        return h; };
      TR=E.terrain(0,0,0,0,E.axis(2600,170,4.3,-30),E.axis(2600,170,4.3),hf,(x,z,h,ny)=>{ if(x>-102&&x<36&&z>-46&&z<42) return [.8,.78,.72]; if(Math.abs(x)<5&&z>=42&&z<130) return [.74,.72,.66]; if(Math.abs(x)<40&&z>=42&&z<120) return [.33,.38,.24]; return E.mcol(x,z,h,ny,{far:800,farW:1200,cliff:.25}); });
      // 삼나무 거목(신궁 숲) — 카메라 쐐기는 비움
      E.forest(E.scatter(-1300,1300,-1300,1200,8,TR.h,(x,z,h)=>{ if(x>-106&&x<40&&z>-50&&z<46) return false; if(Math.abs(x)<9&&z>40&&z<200) return false; if(!J.clr(x,z,-10,-2,300)) return false; return E.r()<.9; },(x,z,h)=>Math.hypot(x+33,z)<220?26+E.r()*12:14+E.vn(x*.05,z*.05)*8,(x,z)=>Math.hypot(x+33,z)<260?(E.r()<.8?2:0):(E.vn(x*.02,z*.02)<.5?2:0)),{trunks:true,pal:[null,null,['#2c4630','#243d29','#33503a','#1f3624']]});
      // 돌계단(이타가키 남문 앞) — 지면을 깎은 자리에 단
      { const st=[]; for(let k=0;k<18;k++) st.push(bx(0,-3.4,44+k*1.4,8,3.4-k*.19,1.42)); merge(st,J.ST2,true,K.life); }
      // 바깥 두 겹 울타리(소토타마가키·이타가키) — K.life(썸네일 거리 영향 없음)
      fence(-26,26,-33,29,2.4,'tama',HN,4,K.life); fence(-32,32,-42,38,2.3,'board',HND,4.6,K.life);
      { const g=new T.Group(); K.life.add(g); K.cur=g; K.b(0,.2,29.1,3.6,2.2,.04,K.col(0xf6f4ee,{roughness:.9})); K.cur=null; } // 소토타마가키 남문 흰 휘장(미토바리)
      // 고덴치(옛 터): 흰 돌 깔린 같은 크기의 빈 터 + 심어주 덮개(오이야) + 낮은 이타가키
      { const g=new T.Group(); K.life.add(g); K.cur=g; const cx=-66; K.b(cx,-.05,-2,30,.12,36,J.GRV); K.b(cx,-.05,-2,52,.08,62,K.col(0xcac6bc,{roughness:1})); K.b(cx,.05,0,1.6,1.5,1.6,HN2); thatch(cx,1.55,0,2.2,2.2,.9,.25); K.cur=null; fence(cx-32,cx+32,-42,38,2.3,'board',HND,4.6,K.life); }
    }
    // 정궁 마당: 흰 자갈(玉砂利) — 우치타마가키 안
    K.b(0,-.05,-2,40,.1,48,J.GRV);
    // ---------- 1: 우치타마가키 · 미즈가키 ----------
    K.layer(1); fence(-20,20,-26,22,2.1,'tama',HN,3.6); fence(-15,15,-20,16,3.0,'board',HN,3.2);
    // ---------- 2: 정전 · 동서보전 ----------
    K.layer(2); K.b(0,-.05,0,16.5,.2,11.5,K.col(0xe9e6df,{roughness:1}));
    shinmei(0,0,10.9,5.5,2.4,3.1,1.7,1.3,4.1,10,{veranda:true});
    K.layer(3); shinmei(-8.5,-14,5.4,3.6,1.6,2.2,1.0,.8,2.6,6,{}); shinmei(8.5,-14,5.4,3.6,1.6,2.2,1.0,.8,2.6,6,{});
    tidy(1);
  }});
