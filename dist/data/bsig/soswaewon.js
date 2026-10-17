__bsigFill({"soswaewon":function(K){
// 출처: 브런치 「마음을 씻는 뜰 — 담양 소쇄원」 — 면적 약 4,060 ㎡, 1520년대부터 3대에 걸쳐 조성, 양산보(조광조 문인, 기묘사화 뒤 낙향), 명승 제40호(2008), 1755년 목판본 「소쇄원도」, 계류 중심 사다리꼴 배치(애양단·오곡문·제월당·광풍각 구역), 오곡문 옆 담 아래 구멍으로 계류 유입, 광풍각·제월당은 담으로 나뉨
// 추정: 광풍각 3×3칸(가운데 방)·제월당 3×1칸(방 1·대청 2) 칸수는 일반 해설 기준, 모든 건물·담·연못·외나무다리의 위치와 치수, 단 높이(광풍각 0.9 m·제월당 3.6 m), 폭포 위치
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

    // ===== 담양 소쇄원 — 계류(골짜기 물길)를 가운데 두고 광풍각·제월당·대봉대·애양단 담·오곡문이 앉은 원림 =====
    // 배치는 1755년 목판 「소쇄원도」와 현재 모습을 바탕으로 한 개략(위치·치수 추정). +z 남(입구), +x 동(오곡문·물이 들어옴)
    const WD=K.col(0x8a6e52,{roughness:.88}), WDD=K.col(0x6a5440,{roughness:.9}), WH=K.col(0xe8e1cf,{roughness:.97}), RU=K.col(0x5c4b3c), GW=K.M.giwa, DR=K.col(0x2d2b28), ST=K.col(0xa9a294,{roughness:.95}), ST2=K.col(0x8b8578,{roughness:.95}), MUD=K.col(0xb59a74,{roughness:1}), TH=K.col(0xb69d6a,{roughness:1}), PAPER=K.col(0xefe8d6,{roughness:.95}), ROCK=K.col(0x8f8a80,{roughness:.9});
    const STW=E.tmat(E.wallTex('ssw_wall','#5a5145',['#9b8f7c','#a99c86','#8b7f6c','#b3a58e','#7f7563'],60,50,120),0xa59a86,{tint:0xd8d0c0});
    const MUDW=E.tmat(E.wallTex('ssw_mud','#b49a72',['#8c8170','#9a8f7d','#7f7566','#a39784'],46,40,90),0xb59a74,{tint:0xe4d8c2});
    const MAS=E.tmat(E.masTex(),0xd2c6a6,{tint:0xd9cdb2});
    // 물길: 동(x=30)에서 서(x=-34)로 — 중심선 z, 바닥 높이
    const sz=x=>-2+1.6*Math.sin(x/9)+(x<-10?(x+10)*.12:0), sy=x=>-1.6+x*.032-(x<-6?.9:0)-(x<-20?.6:0); // 물 높이(서쪽으로 낮아짐, x=-6·-20에 작은 폭포)
    const JW=4.5, JY=3.6, GY=.9; // 제월당 단·광풍각 단 높이(추정)
    // ---------- 0: 지형·물길·암반·석축 ----------
    K.layer(0); E.own();
    let TR;
    { const pads=[[-11,13,-31,-17,JY],[-17,-3,-13,-5.5,GY]];
      const base=(x,z)=>{ const zc=sz(x), d=z-zc; let h=z<zc?Math.min(JY+1.2,(-d-2)*.34+.2):Math.min(.6,(d-2)*.12); if(z<-31) h=JY+(-31-z)*.28; h+=Math.max(0,Math.abs(x)-40)*.1;
        const ch=Math.exp(-Math.pow(d/2.6,2)); h=h*(1-ch)+(sy(x)-.5)*ch; // 골짜기
        h+=E.peaks(x,z,[[-160,-260,260,200,150,1.3],[220,-200,240,220,120,1.3],[-260,140,220,240,90,1.3],[260,220,260,240,70,1.3],[0,-520,420,220,260,1.25]])*E.ss((Math.hypot(x,z)-60)/90); h+=(E.fbm(x*.04,z*.04,3)-.5)*3*E.ss((Math.hypot(x,z)-45)/50); return h; };
      const hf=(x,z)=>{ let h=base(x,z); for(const [a0,a1,b0,b1,top] of pads){ if(x>a0-.4&&x<a1+.4&&z>b0-.4&&z<b1+.4) h=Math.min(h,top-.3); } return h; };
      TR=E.terrain(0,0,0,0,E.axis(2200,140,4.6),E.axis(2200,140,4.6),hf,(x,z,h,ny)=>{ const d=Math.abs(z-sz(x)); if(Math.hypot(x,z)<46){ if(d<3.2) return [.52,.5,.45]; return [.5+.04*E.fbm(x*.1,z*.1,2),.55,.37]; } return E.mcol(x,z,h,ny,{far:450,farW:800,cliff:.3}); });
      // 대숲(입구 쪽 남·서) · 활엽수·소나무(뒤 언덕)
      E.forest(E.scatter(-150,-12,18,150,1.7,TR.h,(x,z,h)=>{ if(x>-24&&z<30) return false; if(x>-30&&z>30&&Math.abs(x+3)<14) return false; if(x>-16) return false; return Math.hypot(x,z)<150&&E.r()<.85; },(x,z,h)=>9+E.r()*5,3),{trunks:false});
      E.forest(E.scatter(-12,10,20,50,1.6,TR.h,(x,z,h)=>Math.abs(x+3)>2&&E.r()<.7,(x,z,h)=>3.5+E.r()*2,3),{trunks:false}); // 입구 대숲 길 양옆(모형 앞은 낮게)
      E.forest(E.scatter(-60,-24,-40,30,1.7,TR.h,(x,z,h)=>E.r()<.8,(x,z,h)=>8+E.r()*5,3),{trunks:false});
      E.forest(E.scatter(-700,700,-700,700,9,TR.h,(x,z,h)=>{ if(Math.hypot(x,z)<70) return false; if(z>0&&Math.hypot(x,z)<150) return false; if(x>0&&z>-10&&Math.hypot(x,z)<190) return false; return Math.hypot(x,z)<760&&E.r()<.9; },(x,z,h)=>8+E.vn(x*.05,z*.05)*7,(x,z,h)=>E.vn(x*.03+3,z*.03)<.45?1:0),{trunks:false});
      E.forest([[-14,TR.h(-14,-16),-16,9,0,.2,1.2],[13,TR.h(13,-34),-34,11,0,.5,1.1],[-24,TR.h(-24,-8),-8,10,0,.7,1],[20,TR.h(20,-14),-14,9,1,.4,1],[-20,TR.h(-20,-26),-26,11,1,.6,1]],{cast:true});
      // 배롱나무(분홍) 두 그루 — 광풍각 앞
      E.forest([[-14,TR.h(-14,-2),-2,4.5,0,.2,1.3],[-6,TR.h(-6,-14),-14,4,0,.6,1.3]],{pal:[['#c9668e','#d77a9e','#bf5a82']],cast:true});
      // 입구 대숲 길(마사토)
      const pg=new T.PlaneGeometry(3,60,1,30); pg.rotateX(-Math.PI/2); for(let i=0;i<pg.attributes.position.count;i++){ const z=pg.attributes.position.getZ(i)+44, x=pg.attributes.position.getX(i)-3; pg.attributes.position.setX(i,x); pg.attributes.position.setY(i,TR.h(x,z)+.05); pg.attributes.position.setZ(i,z); } const pm=new T.Mesh(pg,MAS); pm.receiveShadow=true; K.life.add(pm); }
    // 물: 계단식 물 표면(폭포 두 곳) — 투명·반사
    { for(const [x0,x1] of [[-34,-20],[-20,-6],[-6,30]]){ const n=Math.round((x1-x0)/1.5); const gs=[]; for(let i=0;i<n;i++){ const xa=x0+(x1-x0)*i/n, xb=x0+(x1-x0)*(i+1)/n, xm=(xa+xb)/2; const g=new T.PlaneGeometry(xb-xa+.05,2.6); g.rotateX(-Math.PI/2); g.translate(xm,sy(xm)+(x1<=-20?.9+.6:x1<=-6?.9:0)*0-.0,sz(xm)); gs.push(g); } const m=merge(gs,E.WATER,false); m.renderOrder=2; }
      // 폭포 물줄기(흰 거품 판)
      for(const x of [-6,-20]){ const y0=sy(x+.1), y1=sy(x-.1); const f=new T.Mesh(new T.PlaneGeometry(1.6,y0-y1+.1),K.col(0xe8f0f2,{roughness:.3,transparent:true,opacity:.75})); f.position.set(x,(y0+y1)/2,sz(x)); f.rotation.y=Math.PI/2; put(f,false); } }
    // 계류 암반·바위(인스턴스) — 물가 너럭바위와 둥근 돌
    { const rk=[]; for(let x=-32;x<29;x+=1.3){ for(const s of [-1,1]){ if(E.r()<.35) continue; const z=sz(x)+s*(1.3+E.r()*1.4); const sc=.5+E.r()*1.1; rk.push([x+(E.r()-.5),sy(x)-.25,z,E.r()*6,sc*1.4,sc*.7,sc]); } } for(const [x,z,s] of [[-6.4,-1.8,2.4],[-20.5,-.2,2],[8,-1.2,2.6],[-12,-.6,1.8],[16,-1,2.2]]) rk.push([x,sy(x)-.5,z,E.r()*3,s*1.6,s*.45,s]);
      const g=new T.DodecahedronGeometry(.6,0); inst(g,ROCK,rk); }
    // 제월당 단(석축) · 광풍각 단(석축)
    tbox(1,-1,-24,24,JY+1,14,STW,3); K.b(1,JY,-24,24.2,.12,14.2,ST2); K.b(1,JY+.12,-24,23.6,.03,13.6,MAS);
    tbox(-10,-1.5,-9.25,14,GY+1.5,7.5,STW,3); K.b(-10,GY,-9.25,14.2,.1,7.7,ST2);
    // 제월당 단으로 오르는 돌계단(광풍각 뒤, 추정)
    { const gs=[]; const n=7, rise=(JY-GY)/n; for(let k=0;k<n;k++) gs.push(bx(-6,GY,-13.2-(k+.5)*.5,1.6,(k+1)*rise,.5)); merge(gs,ST); }
    // 외나무다리(입구 쪽 → 광풍각 쪽, 통나무 하나)
    { const x=-3.2, z0=sz(-3.2)+3.2, z1=sz(-3.2)-3.4; const g=new T.CylinderGeometry(.2,.2,z0-z1,10); g.rotateX(Math.PI/2); g.translate(x,.25,(z0+z1)/2); put(new T.Mesh(g,K.col(0x7a6248,{roughness:.9}))); for(const z of [z0,z1]) K.b(x,-.6,z,.9,.8,.9,ST); }
    // 네모 연못 두 개(상지·하지) + 나무 홈대(물을 끌어옴) — 대봉대 아래(추정)
    { for(const [x,z,w,d] of [[4,8.5,4.2,3.2],[-1,10.5,3.4,2.6]]){ tbox(x,-.9,z,w+.8,1.05,d+.8,STW,2.5); K.b(x,-.6,z,w,.15,d,K.col(0x4d6b6f)); const wt=new T.Mesh(new T.PlaneGeometry(w,d),E.WATER); wt.rotation.x=-Math.PI/2; wt.position.set(x,-.05,z); put(wt,false); }
      const hd=new T.Mesh(boxG(.32,.18,7.5),WDD); hd.position.set(6.5,.35,4.3); hd.rotation.y=.25; put(hd); }
    // ---------- 1: 담 — 애양단(볕 드는 담) · 오곡문(물 위로 담이 지나감) · 제월당 쪽 담 ----------
    K.layer(1);
    const wall=(x0,z0,x1,z1,h,y0)=>{ const L=Math.hypot(x1-x0,z1-z0), a=Math.atan2(x1-x0,z1-z0), xm=(x0+x1)/2, zm=(z0+z1)/2; y0=y0===undefined?-.2:y0; tbox(xm,y0,zm,.6,h,L,MUDW,2.2,a); K.b(xm,y0+h,zm,.95,.16,L+.3,RU,a); const r=new T.Mesh(boxG(.5,.22,L+.2),GW); r.position.set(xm,y0+h+.16,zm); r.rotation.y=a; put(r); K.b(xm,y0+h+.38,zm,.26,.12,L+.2,DR,a); };
    wall(6,15.5,22,15.5,2.3); wall(22,15.5,26,3.2,2.3); // 애양단 담(남향, 추정 위치)
    // 오곡문: 물길 위 — 돌을 쌓은 기둥 사이로 물이 흐르고 그 위로 담이 지나감
    { const zc=sz(26.5); for(const dz of [-2.4,-.8,.8,2.4]) tbox(26.5,sy(26.5)-.6,zc+dz,.8,1.6-sy(26.5)*0+.0+(.4-sy(26.5)),.7,STW,1.6); tbox(26.5,.9,zc,.8,.9,6.2,STW,1.6); wall(26.5,zc-3.2,26.5,zc+3.2,1.5,1.8); }
    wall(26.5,sz(26.5)-3.2,26.5,-31,2.3,-.2); wall(26.5,-31,-12,-31,2.3,JY-.2); wall(26,3.2,26.5,sz(26.5)+3.2,2.3);
    // 담에 새긴 글씨 자리(소쇄처사양공지려 — 제월당 쪽 담, 추정 위치)
    K.b(26.15,1.2,-20,.05,.5,2.6,K.col(0x3a332b));
    // ---------- 1·2: 광풍각(정면 3칸·측면 3칸, 가운데 방, 사방 마루 — 추정 치수) ----------
    { const cx=-10, cz=-9.25, y=GY+.1, XS=[-3.3,-1.2,1.2,3.3], ZS=[-3.0,-1.1,1.1,3.0]; const cs=[]; XS.forEach(x=>ZS.forEach(z=>cs.push([cx+x,y,cz+z]))); inst(cylG(.4,.3,8,.34),ST,cs); inst(cylG(.13,3.0,10,.12),WD,cs.map(c=>[c[0],y+.3,c[2]]));
      K.b(cx,y+.55,cz,6.9,.2,6.3,WDD); // 마루
      K.b(cx,y+.75,cz,2.3,2.3,2.1,PAPER); for(const s of [-1,1]){ K.b(cx+s*1.2,y+.75,cz,.12,2.3,2.2,WDD); K.b(cx,y+.75,cz+s*1.1,2.4,2.3,.1,WDD); } K.b(cx,y+1.9,cz,2.42,.1,2.2,WDD); // 가운데 방(창호지 문)
      const rl=[]; for(let x=-3.2;x<=3.2;x+=.4) for(const s of [-1,1]) rl.push([cx+x,y+.75,cz+s*3.1]); for(let z=-2.9;z<=2.9;z+=.4) for(const s of [-1,1]) rl.push([cx+s*3.4,y+.75,cz+z]); inst(boxG(.04,.55,.04),WDD,rl); for(const s of [-1,1]){ K.b(cx,y+1.3,cz+s*3.1,6.8,.07,.07,WDD); K.b(cx+s*3.4,y+1.3,cz,.07,.07,6.2,WDD); } // 계자난간
      K.b(cx,y+3.3,cz,7.0,.32,6.4,WDD); K.layer(2); const yf=roofHF(cx,y+3.35,cz,10.6,10.0,3.1,{dt:.42,mat:GW,under:RU,thk:.3,sori:.55,gmat:WD,rh:.42}); const R=10.6-10*.58; for(const s of [-1,1]) for(const t of [-1,1]) hipLine(yf,cx,cz,s*5.0,t*4.7,s*R/2,t*.42*5,8,DR,.3);
      K.layer(1); }
    // 제월당(정면 3칸·측면 1칸 — 방 1칸·대청 2칸, 추정 치수)
    { const cx=2, cz=-25.5, y=JY+.15, XS=[-4.2,-1.4,1.4,4.2], ZS=[-1.7,1.7]; K.b(cx,JY+.12,cz,9.6,.5,4.6,ST); const cs=[]; XS.forEach(x=>ZS.forEach(z=>cs.push([cx+x,y+.45,cz+z]))); inst(cylG(.15,2.9,10,.14),WD,cs);
      K.b(cx,y+.9,cz,8.5,.16,3.5,WDD); // 대청 마루(높임)
      K.b(cx+2.8,y+1.05,cz,2.7,2.2,3.3,WH); { const d=new T.Mesh(boxG(2.6,1.9,.1),PAPER); d.position.set(cx+2.8,y+1.1,cz+1.68); put(d); } K.b(cx+2.8,y+1.05,cz+1.7,2.7,.12,.12,WDD); K.b(cx+2.8,y+2.95,cz+1.7,2.7,.12,.12,WDD); // 방(동쪽 칸)
      K.b(cx-1.4,y+1.05,cz-1.7,5.6,2.2,.14,WH); for(const s of [-1,1]) K.b(cx-1.4+s*1.4,y+1.05,cz-1.7,.12,2.2,.18,WDD);
      K.b(cx,y+3.35,cz,8.7,.3,3.7,WDD); K.layer(2); const yf=roofHF(cx,y+3.4,cz,12.0,7.6,2.9,{dt:.42,mat:GW,under:RU,thk:.3,sori:.55,gmat:WD,rh:.42}); const R=12-7.6*.58; for(const s of [-1,1]) for(const t of [-1,1]) hipLine(yf,cx,cz,s*5.7,t*3.5,s*R/2,t*.42*3.8,8,DR,.3);
      K.b(cx,y+3.1,cz+1.95,1.3,.45,.06,K.col(0x3a2a1d)); K.layer(1); }
    // 대봉대(작은 초정 — 봉황을 기다리는 대, 흙돌 축대 위 1칸 정자·초가)
    { const cx=8, cz=10.5; tbox(cx,-.2,cz,4.6,1.3,4.6,STW,2.2); K.b(cx,1.1,cz,4.7,.1,4.7,ST2); const cs=[[-1.2,-1.2],[1.2,-1.2],[-1.2,1.2],[1.2,1.2]].map(([x,z])=>[cx+x,1.2,cz+z]); inst(cylG(.11,2.3,8,.1),WD,cs); K.b(cx,1.55,cz,2.6,.12,2.6,WDD);
      K.layer(2); const g=new T.ConeGeometry(2.6,1.9,4,1); g.rotateY(Math.PI/4); g.translate(cx,3.5+.95,cz); const m=put(new T.Mesh(g,TH)); const g2=new T.ConeGeometry(2.75,.35,4,1,true); g2.rotateY(Math.PI/4); g2.translate(cx,3.62,cz); put(new T.Mesh(g2,K.col(0x9c8458,{roughness:1}))); K.layer(1); }

  }});
