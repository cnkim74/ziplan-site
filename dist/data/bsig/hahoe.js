__bsigFill({"hahoe":function(K){
// 출처: 서울신문 2010-08-01 「세계유산 하회마을과 양동마을」 — 연화부수형, 양진당(풍산유씨 종가)·충효당(서애 유성룡 생가), 중요민속자료 122호, 2010-07-31 세계유산 등재 · 한국관광공사 여행 코스 — 부용대 높이 64 m 절벽, 만송정 숲
// 배치: 화산 = 마을 동쪽(주산, 마을이 화산 자락에 기댐) · 남산 = 남쪽 · 원지산 = 서쪽 · 부용대 = 강 건너 북쪽 절벽(매일신문 2007-04-17 하회마을 기사, 한국관광공사)
// 추정: 강 중심선·폭(약 120 m)·백사장, 마을 크기, 가옥 수·위치·향(지도 감각으로 배치), 양진당·충효당 위치와 칸 구성(개략), 삼신당 위치, 부용대 폭·모양, 산 높이(화산은 마을보다 약 200 m 높은 둥근 능선으로, 나머지는 낮게 — 추정)
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

    // ===== 안동 하회마을 — 낙동강이 S자로 감아 도는 땅 안의 기와집·초가 마을, 강 건너 부용대 =====
    // 모형 틀(bbox)은 강 안쪽 마을 전체(가옥 인스턴스), 강·백사장·만송정·부용대·산은 배경(K.life)
    // +z 남. 강 중심선·마을 크기·가옥 배치는 지도·사진을 보고 잡은 개략(추정)
    const WD=K.col(0x7d6650,{roughness:.88}), WDD=K.col(0x5a4838,{roughness:.9}), WH=K.col(0xece5d4,{roughness:.97}), MUD=K.col(0xb99f7a,{roughness:1}), RU=K.col(0x5a4a3c), GW=K.M.giwa, DR=K.col(0x2d2b28), ST=K.col(0xa9a294,{roughness:.95}), TH=K.col(0xbfa36c,{roughness:1}), PAPER=K.col(0xefe8d6,{roughness:.95});
    const STW=E.tmat(E.wallTex('hah_wall','#6a5d4c',['#9b8f7c','#a99c86','#8b7f6c','#b3a58e','#7f7563','#c0b39a'],56,46,110),0xa59a86,{tint:0xdcd2c0});
    // 강 중심선(남동에서 들어와 남·서·북으로 마을을 감고 북동으로 빠짐)
    const RV=[[700,520],[430,300],[160,420],[-170,400],[-390,180],[-430,-110],[-270,-360],[30,-430],[300,-340],[520,-430],[820,-330]];
    const rdist=(x,z)=>{ let m=1e9; for(let i=0;i<RV.length-1;i++){ const [ax,az]=RV[i], [bx2,bz2]=RV[i+1]; const dx=bx2-ax, dz=bz2-az; const t=Math.max(0,Math.min(1,((x-ax)*dx+(z-az)*dz)/(dx*dx+dz*dz))); const d=Math.hypot(x-ax-t*dx,z-az-t*dz); if(d<m) m=d; } return m; };
    const inLoop=(x,z)=>Math.hypot(x*.95,z)<330&&x<380; // 마을 쪽(강 안쪽)
    const BUY=[-60,-505]; // 부용대(강 건너 북쪽 절벽, 높이 약 64 m)
    // ---------- 0: 지형·강·백사장·만송정·부용대·논밭 ----------
    K.layer(0); E.own();
    let TR;
    { // 산: 둥근 숲 능선(뾰족 봉우리·맨 바위 없음). 화산(花山) = 마을 동쪽 목에 길게 누운 주산, 원지산(서)·남산(남)은 낮고 부드럽게, 부용대만 강 건너 북쪽에서 곧게 선 약 64 m 절벽
      const mound=(x,z,M)=>{ let h=0; for(const q of M){ let ax,az; if(q.length>6){ // 능선(선분 q[0..3], 반폭 q[4], 높이 q[5])
            const dx=q[2]-q[0], dz=q[3]-q[1]; const t=Math.max(0,Math.min(1,((x-q[0])*dx+(z-q[1])*dz)/(dx*dx+dz*dz))); const d=Math.hypot(x-q[0]-t*dx,z-q[1]-t*dz)/q[4]; if(d<1){ const e=Math.pow(1-d*d,1.6)*(1-.18*Math.pow(Math.abs(t-.5)*2,2)); h=Math.max(h,q[5]*e); } continue; }
          ax=(x-q[0])/q[2]; az=(z-q[1])/q[3]; const d2=ax*ax+az*az; if(d2<1) h=Math.max(h,q[4]*Math.pow(1-d2,q[5]||1.6)); } return h; };
      const HILL=[[640,-140,760,400,280,205,'화산'],[760,120,320,300,215,1.7],[-600,-60,260,330,80,1.8],[-760,-400,320,300,80,1.7],[-260,600,360,220,72,1.8],[160,640,300,200,60,1.8],[-60,-610,270,150,66,1.8],[320,-920,440,260,90,1.7],
        [-1500,-900,600,420,150,1.6],[-700,-1500,520,360,125,1.6],[100,-1750,560,380,140,1.6],[800,-1500,520,420,160,1.6],[1600,-500,520,600,175,1.6],[1400,900,600,420,150,1.6],[300,1700,700,400,130,1.6],[-800,1500,600,420,135,1.6],[-1750,400,450,620,145,1.6]];
      const hf=(x,z)=>{ const d=rdist(x,z), inside=inLoop(x,z); const rr0=Math.hypot(x,z); let h=inside?((E.fbm(x*.01,z*.01,2)-.5)*1.6+Math.max(0,x-120)*.01+.6)*E.ss((rr0-100)/70)-.04:2;
        if(!inside){ // 강 바깥: 둥근 숲 언덕 + 약한 기복
          const neck=x>=380?1-(1-E.ss((x-380)/240))*(1-E.ss((Math.hypot(x*.95,z)-450)/160)):1; // 동쪽 목: 마을 땅에서 화산 자락으로 천천히 오름
          h+=mound(x,z,HILL)*(.88+.24*E.fbm(x*.004+2,z*.004,3))*E.ss((d-70)/220)*neck;
          // 부용대: 강가에서 곧바로 서는 남향 절벽 하나(가운데가 가장 높고 양옆으로 낮아짐), 위는 솔숲 덮인 평탄면 → 뒤 능선으로 이어짐
          const bx0=x-BUY[0]; if(Math.abs(bx0)<190&&z<BUY[1]+40&&z>BUY[1]-260){ const zz=z+(E.fbm(x*.035,3.3,2)-.5)*16; const ed=Math.pow(E.ss((190-Math.abs(bx0))/160),.8); const top=58+8*E.fbm(x*.02,7.1,2); const cl=E.ss((BUY[1]+36-zz)/5); h=Math.max(h,top*ed*cl+(BUY[1]-z)*.04*cl*ed); } }
        if(d<62) h=Math.min(h,-6+d*.03); else if(d<100&&inside) h=Math.min(h,-3.2+(d-62)*.11); else if(d<110&&!inside) h=Math.min(h,-3.4+Math.pow((d-62)/48,1.5)*14);
        return h; };
      const isCliff=(x,z,ny)=>Math.abs(x-BUY[0])<175&&z<BUY[1]+44&&z>BUY[1]-12&&ny<.62;
      TR=E.terrain(0,0,0,0,E.axis(3200,230,3.1,0),E.axis(3200,230,3.1,0),hf,(x,z,h,ny)=>{ const d=rdist(x,z), inside=inLoop(x,z); if(h<-2.4&&d<105&&inside) return [.86,.82,.7]; if(d<90&&!inside&&!isCliff(x,z,ny)) return [.42,.47,.33]; if(inside){ const f=x>130||Math.hypot(x,z)>240?1:0; if(f){ const q=E.vn(x*.03,z*.03); return [.5+.12*q,.58+.06*q,.3+.04*q]; } const n=E.fbm(x*.05,z*.05,2); return [.5+.06*n,.54+.04*n,.38]; } if(isCliff(x,z,ny)){ const q=E.vn(x*.22,h*.09)*.55+E.vn(x*.7,h*.35)*.45, s=.5+.5*Math.sin(h*.55+E.vn(x*.05,1)*3); return [.47+.09*q+.03*s,.42+.07*q+.025*s,.35+.05*q]; } return E.mcol(x,z,h,ny,{far:650,farW:1100,cliff:0}); });
      const wm=new T.Mesh(new T.PlaneGeometry(5000,5000),E.WATER); wm.rotation.x=-Math.PI/2; wm.position.y=-3.6; wm.receiveShadow=true; K.life.add(wm);
      // 만송정 솔숲(마을 북서쪽 강가) · 산 숲
      E.forest(E.scatter(-360,40,-370,-150,6,TR.h,(x,z,h)=>{ const d=rdist(x,z); return inLoop(x,z)&&d>100&&d<150&&h>-1; },(x,z,h)=>13+E.r()*5,1),{trunks:true});
      E.forest(E.scatter(-1100,1100,-1100,1100,11,TR.h,(x,z,h)=>!inLoop(x,z)&&rdist(x,z)>85&&h>3&&Math.hypot(x,z)<1250&&E.r()<.93&&!(Math.abs(x-BUY[0])<185&&z>BUY[1]-14),(x,z,h)=>9+E.vn(x*.05,z*.05)*7,(x,z,h)=>E.vn(x*.03+3,z*.03)<.55?1:0),{trunks:false});
      E.forest(E.scatter(-300,200,-280,280,14,TR.h,(x,z,h)=>inLoop(x,z)&&rdist(x,z)>125&&Math.hypot(x,z)<240&&E.r()<.12,(x,z,h)=>7+E.r()*4,0),{trunks:true,cast:true}); // 마을 안 나무
      E.forest(E.scatter(-250,130,BUY[1]-240,BUY[1]-16,8,TR.h,(x,z,h)=>Math.abs(x-BUY[0])<185&&h>8&&E.r()<.9,(x,z,h)=>9+E.r()*5,1),{trunks:false});
      // 절벽 턱에 붙은 소나무 몇 그루(바위 면이 한 장 벽처럼 보이지 않게)
      { const L=[]; for(let i=0;i<46;i++){ const x=BUY[0]-150+E.r()*300, z=BUY[1]+8+E.r()*28; const h0=TR.h(x,z); if(h0<10||h0>60) continue; L.push([x,h0-.6,z,5+E.r()*4,1,E.r(),.9]); } E.forest(L,{trunks:true}); }
      // 먼 산 숲(겹 능선 — 대기색으로 옅어짐)
      E.forest(E.scatter(-2000,2000,-2000,2000,26,TR.h,(x,z,h)=>Math.hypot(x,z)>1250&&Math.hypot(x,z)<2100&&h>25&&E.r()<.8,(x,z,h)=>22+E.r()*10,(x,z)=>E.vn(x*.01,z*.01)<.5?1:0),{trunks:false}); }
    // ---------- 마을: 가옥 인스턴스(기와집·초가) — 한가운데는 bldg(K.layer 1·2), 바깥은 life ----------
    // 기와 지붕 단위 형상(팔작, 평면 1.8×1 · 높이 1) · 초가 단위 형상(둥근 우진각)
    const surfG=(fn,nu,nv)=>{ const pos=[],idx=[]; for(let j=0;j<=nv;j++) for(let i=0;i<=nu;i++){ const p=fn(i/nu,j/nv); pos.push(p[0],p[1],p[2]); } for(let j=0;j<nv;j++) for(let i=0;i<nu;i++){ const a=j*(nu+1)+i, b=a+1, c=a+nu+1, d=c+1; idx.push(a,c,b,b,c,d); } const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(pos,3)); g.setIndex(idx); g.computeVertexNormals(); return g; };
    const tileG=(()=>{ const EE=1.8, DD=1, dt=.42, R=EE-DD*(1-dt); const g=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),1.7); const yf=(a,b)=>{ const bb=Math.abs(b)/(DD/2); const ta=Math.abs(a)>R/2?(Math.abs(a)-R/2)/(DD/2)+dt:0; return (1-g(Math.max(bb,ta)))+.12*Math.pow(Math.abs(a)/(EE/2),3)*Math.pow(bb,3); };
      const top=surfG((u,v)=>{ const a=-EE/2+EE*u, b=-DD/2+DD*v; return [a,yf(a,b),b]; },24,10); const gs=[top]; for(const s of [-1,1]){ const sh=new T.Shape(); sh.moveTo(-dt*DD/2,1-g(dt)); sh.lineTo(0,1); sh.lineTo(dt*DD/2,1-g(dt)); const gg=new T.ShapeGeometry(sh); gg.rotateY(Math.PI/2); gg.translate(s*R/2,0,0); gs.push(gg); } const rg=new T.BoxGeometry(R+.06,.06,.05); rg.translate(0,1.0,0); gs.push(rg); return E.mergeG(gs); })();
    const thG=(()=>{ return surfG((u,v)=>{ const a=-.9+1.8*u, b=-.5+v; const q=Math.pow(Math.pow(Math.abs(a/.9),4)+Math.pow(Math.abs(b/.5),4),.25); return [a,Math.max(0,Math.pow(Math.max(0,1-q),.45))-.04,b]; },26,14); })(); thG.computeVertexNormals();
    const TM={tile:{c:[],r:[],w:[]},th:{c:[],r:[],w:[]}}, CORE=[], OUT=[];
    // 집 한 채: x,z 중심, ry(앞이 바라보는 방향), 종류, 길이 L·깊이 Dp, ㄱ자 여부
    const house=(x,z,ry,kind,L,Dp,wing,core)=>{ const B=core?CORE:OUT; const cs=Math.cos(ry), sn=Math.sin(ry); const P=(lx,lz)=>[x+lx*cs+lz*sn,z-lx*sn+lz*cs]; const wh=kind==='tile'?2.6:2.2, rh=kind==='tile'?2.6:2.1;
      const parts=[[0,0,L,Dp,0]]; if(wing) parts.push([L/2-Dp/2,Dp/2+wing/2,Dp,wing,1]);
      for(const [lx,lz,w,d,rot] of parts){ const [px,pz]=P(lx,lz); const a=ry+(rot?Math.PI/2:0); const ww=rot?d:w, dd=rot?w:d; B.push({k:kind,x:px,z:pz,a,w:ww,d:dd,wh,rh,main:!rot}); } };
    // 집 배치: 마을 안을 성긴 격자로 — 큰 집 두 채·삼신당 자리는 비움. 집 앞은 마을 바깥(강) 쪽을 봄
    { let sd=7; const rr=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
      const busy=[[30,-34,34],[-52,18,30],[0,-70,16]];
      for(let gz=-300;gz<=300;gz+=23) for(let gx=-330;gx<=200;gx+=23){ const x=gx+(rr()-.5)*9, z=gz+(rr()-.5)*9; if(!inLoop(x,z)||rdist(x,z)<120) continue; const r=Math.hypot(x,z); if(r>250) continue; if(x>110&&r>150) continue; if(busy.some(([bx0,bz0,br])=>Math.hypot(x-bx0,z-bz0)<br)) continue; if(rr()<.22) continue; if(Math.abs(z-60+x*.15)<4||Math.abs(x+10-z*.1)<4) continue; // 마을 길
        const tile=r<120?rr()<.55:rr()<.3; const ry=Math.atan2(x,z)+(rr()-.5)*.7; const L=tile?11+rr()*5:8+rr()*3, Dp=tile?5.4:4.6; house(x,z,ry,tile?'tile':'th',L,Dp,rr()<(tile?.6:.35)?(tile?7:5):0,true); } }
    // 인스턴스로 만들기: 벽(상자) · 지붕(단위 형상) · 담(돌담)
    const build=(list,grp)=>{ const wT=[],wM=[],rT=[],rH=[],sT=[],dm=[],ds=[]; list.forEach(h=>{ const y=Math.max(0,TR.h(h.x,h.z)); const ww=Math.max(1,h.w-1.0), dd=Math.max(1,h.d-1.2);
        (h.k==='tile'?wT:wM).push([h.x,y+.45,h.z,h.a,ww,h.wh,dd]); sT.push([h.x,y,h.z,h.a,h.w-.4,.5,h.d-.6]);
        if(h.k==='tile') rT.push([h.x,y+.45+h.wh-.15,h.z,h.a,(h.w+1.6)/1.8,h.rh,h.d+1.8]); else rH.push([h.x,y+.45+h.wh-.25,h.z,h.a,(h.w+1.4)/1.8,h.rh,h.d+1.4]);
        // 문·창(어두운 판) 앞면 2개
        const nx=Math.sin(h.a), nz=Math.cos(h.a); for(const u of [-.22,.18]){ const ux=Math.cos(h.a)*u*ww, uz=-Math.sin(h.a)*u*ww; dm.push([h.x+ux+nx*(dd/2+.03),y+.6,h.z+uz+nz*(dd/2+.03),h.a,1.1,1.7,.05]); } });
      const G=grp||null; const mk=(geo,mat,items,cast)=>inst(geo,mat,items,cast,G,true);
      mk(boxG(1,1,1),WH,wT,true); mk(boxG(1,1,1),MUD,wM,true); mk(boxG(1,1,1),ST,sT,true); mk(tileG,GW,rT,true); mk(thG,TH,rH,true); mk(boxG(1,1,1),K.col(0x5a4636,{roughness:.9}),dm,false); };
    K.layer(0);
    // 돌담 골목(한가운데) — 집마다 담을 두르고 앞쪽은 비움
    { const wl=[], cap=[]; CORE.filter(h=>h.main).forEach(h=>{ const W=h.w+5, D=h.d+7, cs=Math.cos(h.a), sn=Math.sin(h.a); const P=(lx,lz)=>[h.x+lx*cs+lz*sn,h.z-lx*sn+lz*cs]; for(const [lx,lz,w,d] of [[0,-D/2,W,.5],[-W/2,0,.5,D],[W/2,0,.5,D],[-W*.3,D/2,W*.4,.5],[W*.3,D/2,W*.4,.5]]){ const [px,pz]=P(lx,lz); const yy=Math.max(0,TR.h(px,pz)); wl.push([px,yy-.3,pz,h.a,w,1.8,d]); cap.push([px,yy+1.5,pz,h.a,w+.2,.22,d+.3]); } }); K.layer(1); inst(boxG(1,1,1),K.col(0x9d9384,{roughness:.95}),wl); inst(boxG(1,1,1),RU,cap); }
    K.layer(1); { const ring=CORE; const g=new T.Group(); build(ring,null); }
    // ---------- 1·2: 양진당(풍산 류씨 대종가)·충효당(서애 류성룡 종택) — ㅁ자 안채 + 사랑채 + 솟을대문(개략) ----------
    const manor=(cx,cz,ry,o)=>{ const mk=i=>{ const g=new T.Group(); g.position.set(cx,0,cz); g.rotation.y=ry; K.layer(i).add(g); return g; }; const G1=mk(1), G2=mk(2); const L1=()=>{ K.cur=G1; }, L2=()=>{ K.cur=G2; };
      // 날개 한 동: 지역 좌표(lx,lz), 길이 L(지역 x)·깊이 D, rot이면 길이를 z로
      const wing=(lx,lz,L,D,rot,H,o2)=>{ o2=o2||{}; L1(); const y0=o2.y||.6; const W=rot?D:L, Dd=rot?L:D; K.b(lx,0,lz,W+1,y0,Dd+1,ST); K.b(lx,y0,lz,W-1,H,Dd-1,WH);
        const n=Math.round(L/2.6); const cl=[]; for(let i=0;i<=n;i++){ const t=-L/2+.4+(L-.8)*i/n; for(const s of [-1,1]) cl.push(rot?[lx+s*(D/2-.3),y0,lz+t]:[lx+t,y0,lz+s*(D/2-.3)]); } inst(cylG(.15,H+.1,8,.14),WD,cl);
        const dm=[]; for(let i=0;i<n;i++){ const t=-L/2+.4+(L-.8)*(i+.5)/n; if(rot) dm.push([lx+D/2-.48,y0+.35,lz+t,Math.PI/2,1.6,H-.9,.06]); else dm.push([lx+t,y0+.35,lz+D/2-.48,0,1.6,H-.9,.06]); } inst(boxG(1,1,1),PAPER,dm);
        K.b(lx,y0+H,lz,W+.2,.3,Dd+.2,WDD); L2(); const Lr=L+2.2, Dr=D+2.2; roofHF(lx,y0+H+.3,lz,Lr,Dr,o2.rh||2.6,{dt:o2.gable?1:.42,mat:GW,under:RU,thk:.3,sori:.45,gmat:WD,rh:.4,swap:!!rot}); L1(); };
      // 안채 ㅁ자(뒤) — 네 동이 마당을 둘러쌈
      wing(0,-9,o.L,5,0,2.7,{rh:2.7}); wing(-o.L/2+2.5,-3.5,8,5,1,2.5,{rh:2.4}); wing(o.L/2-2.5,-3.5,8,5,1,2.5,{rh:2.4}); wing(-2,2,o.L-9,4.6,0,2.4,{rh:2.3,gable:true});
      // 사랑채(앞, 기단 높게) · 행랑채 · 솟을대문
      wing(o.sx,8.5,o.sL,5.4,0,2.9,{y:1.3,rh:2.9}); wing(-o.L/4-2,17,o.L/2-2,4,0,2.3,{rh:2.1,gable:true}); wing(o.L/4+2,17,o.L/2-2,4,0,2.3,{rh:2.1,gable:true});
      L1(); K.b(o.gate,0,17,3.6,.4,4.6,ST); K.b(o.gate,.4,19.1,2.6,3.0,.2,K.col(0x4a3a2c,{roughness:.85})); for(const s of [-1,1]) for(const t of [-1,1]) K.c(o.gate+s*1.4,.4,17+t*1.9,.16,3.6,WD,8); K.b(o.gate,3.9,17,3.4,.3,4.4,WDD); L2(); roofHF(o.gate,4.2,17,4.6,6.0,1.8,{dt:1,mat:GW,under:RU,thk:.25,sori:.3,gmat:WD,rh:.36,swap:true}); L1();
      // 담(대문 자리 비움)
      const W2=o.L+12; for(const [lx,lz,w,d] of [[0,-13.5,W2,.6],[-W2/2,3,.6,33],[W2/2,3,.6,33],[(-W2/2+o.gate-2)/2,19.5,o.gate-2+W2/2,.6],[(W2/2+o.gate+2)/2,19.5,W2/2-o.gate-2,.6]]){ tbox(lx,0,lz,w,1.7,d,STW,2.2); K.b(lx,1.7,lz,w+.3,.2,d+.3,RU); }
      K.cur=null; };
    K.layer(1);
    manor(30,-34,0.25,{L:17,sx:-3,sL:12,gate:4}); // 양진당(마을 북쪽 한가운데, 추정 위치·향)
    manor(-52,18,-0.35,{L:16,sx:3,sL:11,gate:-3}); // 충효당(서남쪽, 추정)
    // 삼신당 느티나무(마을 한가운데, 수령 약 600년으로 전함) — 둘레 돌담·금줄
    { const x=0, z=-70; tbox(x,0,z,9,.9,9,STW,2.2); K.c(x,.9,z,.9,6.5,K.M.trunk,10,{r2:.7}); E.forest([[x,0,z,22,0,.4,1.25]],{grp:K.cur,cast:true,trunks:false}); }

  }});
