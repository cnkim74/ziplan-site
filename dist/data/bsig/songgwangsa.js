__bsigFill({"songgwangsa":function(K){
// 출처: 한국민족문화대백과사전 「송광사 삼청교 및 우화각」(19개 4각 장대석으로 홍예, 1700~1711 무렵 조영, 1774 중수), 한국교육신문 2026.07(송광사 사찰 입구·계곡)
// 추정: 모든 건물 칸수·치수(대웅보전 7칸×5칸으로 근사, 우화각 4칸×1칸), 계곡 폭·깊이, 마당 크기, 담·전각 배치, 지형 높이
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
    // ===== K7 한옥·도시 키트(이 build 안에서만): 재료 · 전각(hall7) · 담(wall7) · 지형(site7) · 도시 블록(blocks7) · 마을 인스턴스(village7) =====
    const C7={WD:K.col(0x7a5f47,{roughness:.88}),WDL:K.col(0x9c7d5c,{roughness:.88}),WDD:K.col(0x55432f,{roughness:.9}),WH:K.col(0xece5d4,{roughness:.97}),PAPER:K.col(0xf1ead8,{roughness:.95}),RED:K.col(0x8a3a2a,{roughness:.82}),GRN:K.col(0x2e6a5c,{roughness:.8}),BLU:K.col(0x2d5470,{roughness:.8}),YEL:K.col(0xc9a24a,{roughness:.8}),GW:K.M.giwa,RU:K.col(0x5c4b3c),RUD:K.col(0x356a60,{roughness:.85}),DR:K.col(0x2d2b28),ST:K.col(0xaaa395,{roughness:.95}),ST2:K.col(0x8c8679,{roughness:.95}),GRAN:K.col(0xc7c2b6,{roughness:.9}),MUD:K.col(0xb99f7a,{roughness:1}),TH:K.col(0xbfa36c,{roughness:1}),BRK:K.col(0x8e4a35,{roughness:.9}),CONC:K.col(0xb9b5ad,{roughness:.9}),BAS:K.col(0x4a4642,{roughness:.95}),ASP:K.col(0x55575a,{roughness:.95}),GRS:K.col(0x6f8a4e,{roughness:1})};
    const STW=E.tmat(E.wallTex('k7_wall','#6a5d4c',['#9b8f7c','#a99c86','#8b7f6c','#b3a58e','#7f7563','#c0b39a'],56,46,110),0xa59a86,{tint:0xdcd2c0});
    const ASH=E.tmat(E.wallTex('k7_ash','#8e8a82',['#c9c4b8','#bdb8ac','#d3cec2','#b4afa3'],120,160,260),0xc7c2b6,{tint:0xe6e1d6}); // 다듬은 화강석(장대석)
    const BASW=E.tmat(E.wallTex('k7_bas','#2c2a28',['#4a4642','#555049','#3f3b37','#5d5851'],50,40,90),0x4a4642,{tint:0xbdb7ad}); // 제주 현무암 돌담
    const MAS=E.tmat(E.masTex(),0xd2c6a6,{tint:0xd9cdb2});
    const tm7=(key,draw,base)=>{ const t=E.tex(key,256,draw); const m=new T.MeshStandardMaterial({map:t,roughness:.9}); if(!t) m.color.setHex(base).convertSRGBToLinear(); return m; };
    C7.DOOR=tm7('h18_door',(g,N)=>{ g.fillStyle='#e9e1cc'; g.fillRect(0,0,N,N); g.fillStyle='#5f4b37'; const lw=N/4; for(let l=0;l<4;l++){ const x0=l*lw; g.fillRect(x0,0,7,N); g.fillRect(x0+lw-7,0,7,N); for(let x=x0+14;x<x0+lw-10;x+=9) g.fillRect(x,0,2.6,N); for(const y0 of [10,N*.47,N-34]) for(let k=0;k<3;k++) g.fillRect(x0,y0+k*8,lw,2.6); g.fillRect(x0,0,lw,7); g.fillRect(x0,N-7,lw,7); } },0xcbbfa4);
    C7.PAN=tm7('h18_pan',(g,N)=>{ g.fillStyle='#6d5640'; g.fillRect(0,0,N,N); for(let x=0;x<N;x+=N/7){ g.fillStyle='rgba(0,0,0,.25)'; g.fillRect(x,0,2,N); } g.fillStyle='#3e3126'; g.fillRect(N/2-2,0,4,N); for(const y of [N*.18,N*.8]) g.fillRect(0,y,N,9); g.fillStyle='#b8a27a'; g.beginPath(); g.arc(N/2-14,N/2,5,0,7); g.arc(N/2+14,N/2,5,0,7); g.fill(); },0x6d5640);
    C7.DANT=tm7('h18_dan',(g,N)=>{ g.fillStyle='#4f8a74'; g.fillRect(0,0,N,N); g.fillStyle='#2f5f86'; g.fillRect(0,0,N,N*.16); g.fillRect(0,N*.84,N,N*.16); for(const x0 of [0,N*.62]){ const cs=['#b8432e','#f1ead7','#2f5f86','#f1ead7','#b8432e','#e0b54c']; cs.forEach((c,i)=>{ g.fillStyle=c; g.fillRect(x0+i*N*.05,N*.16,N*.035,N*.68); }); g.fillStyle='#e9c25a'; g.beginPath(); g.arc(x0+N*.33,N/2,N*.13,0,7); g.fill(); g.fillStyle='#b8432e'; g.beginPath(); g.arc(x0+N*.33,N/2,N*.06,0,7); g.fill(); } },0x4f8a74);
    // 렌더러가 build 뒤에 K.life에 더하는 기본 소품(벤치·볼라드·일반 나무, keep=0이면 사람까지) 숨김 — build 맨 끝에서 부를 것
    const tidy7=keep=>{ const L=K.life, add0=L.add; L.add=function(...a){ a.forEach(o=>{ if(keep&&o.isMesh&&!o.isInstancedMesh&&o.material===K.M.people) return; o.visible=false; }); return add0.apply(this,a); }; };
    const lay7=i=>{ K.layer(i); };
    // 질감 바닥판(UV를 크기에 맞춤) — y는 윗면
    const flat7=(x,z,w,d,y,mat,tm,ry)=>{ const g=new T.PlaneGeometry(w,d); g.rotateX(-Math.PI/2); const uv=g.attributes.uv; for(let i=0;i<uv.count;i++) uv.setXY(i,uv.getX(i)*w/(tm||4),uv.getY(i)*d/(tm||4)); const m=new T.Mesh(g,mat); m.position.set(x,y,z); if(ry) m.rotation.y=ry; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    // 전각 한 채 — o: x,z,ry,layer,bays[],dbays[],y0(기단 높이),bm(기단 여유),H(기둥),roof('p' 팔작·'m' 맞배·'u' 우진각),rh,ov(처마),dan(단청),dapo,fill(side,i)→'door'|'win'|'wall'|'open'|'board',lift(누마루 높이),sqLow(아래 돌기둥),inner,up{…윗층},parent,yb
    const hall7=(o)=>{ const g=new T.Group(); g.position.set(o.x||0,0,o.z||0); g.rotation.y=o.ry||0; (o.parent||K.layer(o.layer===undefined?1:o.layer)).add(g); const prev=K.cur; K.cur=g;
      const bays=o.bays||[3,3,3], db=o.dbays||[2.4,2.4]; const L=bays.reduce((a,b)=>a+b,0), D=db.reduce((a,b)=>a+b,0);
      const xs=[-L/2]; bays.forEach(b=>xs.push(xs[xs.length-1]+b)); const zs=[-D/2]; db.forEach(b=>zs.push(zs[zs.length-1]+b));
      const y0=o.y0===undefined?.6:o.y0, H=o.H||3, bm=o.bm===undefined?1.1:o.bm, dan=!!o.dan, r=o.cr||.17;
      const COL=o.colMat||(dan?C7.RED:C7.WD), BEAM=o.beamMat||(dan?C7.GRN:C7.WDD);
      let yb=o.yb!==undefined?o.yb:y0;
      if(o.yb===undefined&&!o.noBase&&y0>0){ tbox(0,-.5,0,L+2*bm,y0+.5-.08,D+2*bm,o.baseMat||STW,2.4); K.b(0,y0-.08,0,L+2*bm+.06,.08,D+2*bm+.06,o.capMat||C7.ST2); }
      const cols=[]; for(let i=0;i<xs.length;i++) for(let j=0;j<zs.length;j++){ const edge=i===0||j===0||i===xs.length-1||j===zs.length-1; if(edge||o.inner) cols.push([xs[i],zs[j],edge]); }
      if(o.yb===undefined&&o.chos!==false) inst(cylG(r*1.65,.22,8,r*1.45),C7.ST,cols.map(c=>[c[0],yb,c[1]]));
      const c0=o.yb===undefined?.22:0;
      if(o.lift){ const lc=cols.map(c=>[c[0],yb+c0,c[1]]); if(o.sqLowEdge){ const ed=[],inn=[]; cols.forEach((c,i)=>(c[2]?ed:inn).push(lc[i])); inst(boxG(r*2.8,o.lift-c0,r*2.8),o.lowMat||C7.GRAN,ed); inst(cylG(r*1.45,o.lift-c0,14,r*1.45),o.lowMat||C7.GRAN,inn); } else if(o.sqLow) inst(boxG(r*2.8,o.lift-c0,r*2.8),o.lowMat||C7.GRAN,lc); else inst(cylG(r*1.05,o.lift-c0,10,r),COL,lc);
        K.b(0,yb+o.lift,0,L+.5,.28,D+.5,C7.WDD);
        if(o.rail!==false){ const rl=[], rp=[]; const ry0=yb+o.lift+.28; for(const [sd,arr,cst,rot] of [['f',xs,D/2+.22,0],['b',xs,-D/2-.22,0],['l',zs,-L/2-.22,1],['r',zs,L/2+.22,1]]){ const len=(rot?D:L)+.44; rl.push(rot?[cst,ry0+.62,0,0,.1,.08,len]:[0,ry0+.62,cst,0,len,.08,.1]); rl.push(rot?[cst,ry0+.08,0,0,.08,.06,len]:[0,ry0+.08,cst,0,len,.06,.08]); const n=Math.round(len/.55); for(let k=0;k<=n;k++){ const t=-len/2+len*k/n; rp.push(rot?[cst,ry0,t,0,.06,.62,.06]:[t,ry0,cst,0,.06,.62,.06]); } } inst(boxG(1,1,1),o.railMat||(dan?C7.RED:C7.WDD),rl); inst(boxG(1,1,1),o.railMat||(dan?C7.RED:C7.WDD),rp); }
        yb=yb+o.lift+.28; }
      const cu=cols.filter(c=>!o.lift||c[2]||o.innerUp).map(c=>[c[0],yb+(o.lift?0:c0),c[1]]); const Hc=H-(o.lift?0:c0);
      if(o.sqUp) inst(boxG(r*2.2,Hc,r*2.2),COL,cu); else inst(cylG(r,Hc,10,r*.9),COL,cu);
      // 벽·창호(인스턴스 상자: [x,y,z,ry,sx,sy,sz])
      const fill=o.fill||((sd)=>(sd==='f'||sd==='b')?'door':'wall'); const pP=[],pF=[],pW=[],pB=[],pM=[],pD=[],pPn=[]; const yw=yb+(o.lift?0:c0), hw=Hc-.36;
      for(const [sd,arr,cst,rot] of [['f',xs,zs[zs.length-1],0],['b',xs,zs[0],0],['l',zs,xs[0],1],['r',zs,xs[xs.length-1],1]]){ for(let i=0;i<arr.length-1;i++){ const a0=arr[i]+r*.8, a1=arr[i+1]-r*.8, w=a1-a0, am=(a0+a1)/2; const t=fill(sd,i,arr.length-1); if(t==='open'||w<=.1) continue;
          const B=(a,y,ww,h,th)=>rot?[cst,y,a,0,th,h,ww]:[a,y,cst,0,ww,h,th];
          if(t==='door'){ pM.push(B(am,yw,w,.42,.16)); pD.push(B(am,yw+.42,w,hw-.42,.09)); }
          else if(t==='win'){ pW.push(B(am,yw,w,1.0,.16)); pP.push(B(am,yw+1.0,w,Math.max(.3,hw-1.5),.09)); pW.push(B(am,yw+1.0+Math.max(.3,hw-1.5),w,Math.max(.05,hw-1.0-Math.max(.3,hw-1.5)),.16)); pF.push(B(am,yw+1.0,.07,Math.max(.3,hw-1.5),.14)); }
          else if(t==='board'){ pB.push(B(am,yw,w,hw,.12)); } else if(t==='pan'){ pPn.push(B(am,yw,w,hw,.12)); }
          else { pW.push(B(am,yw,w,hw,.16)); pF.push(B(am,yw+hw*.48,w,.12,.18)); } } }
      const bx1=boxG(1,1,1); inst(bx1,C7.PAPER,pP); inst(bx1,C7.WD,pF); inst(bx1,o.wallMat||C7.WH,pW); inst(bx1,C7.WDD,pB); inst(bx1,C7.WDD,pM); inst(bx1,C7.DOOR,pD); inst(bx1,C7.PAN,pPn);
      // 창방·평방·공포
      const yt=yb+H; const bm2=[]; for(const [len,cst,rot] of [[L+.3,D/2,0],[L+.3,-D/2,0],[D+.3,-L/2,1],[D+.3,L/2,1]]) bm2.push(rot?[cst,yt-.34,0,0,.26,.34,len]:[0,yt-.34,cst,0,len,.34,.26]); inst(bx1,dan&&!o.beamMat?C7.DANT:BEAM,bm2);
      let ytop=yt; if(o.dapo||o.ik){ const bh=o.dapo?.62:.32; const pb=[]; for(const [len,cst,rot] of [[L+.5,D/2,0],[L+.5,-D/2,0],[D+.5,-L/2,1],[D+.5,L/2,1]]) pb.push(rot?[cst,yt,0,0,.36,.16,len]:[0,yt,cst,0,len,.16,.36]); inst(bx1,dan?C7.GRN:C7.WD,pb);
        const br=[]; const step=o.dapo?1.0:0; const pts=[]; if(o.dapo){ for(const [arr,cst,rot] of [[xs,D/2,0],[xs,-D/2,0],[zs,-L/2,1],[zs,L/2,1]]){ const a0=arr[0], a1=arr[arr.length-1]; const n=Math.round((a1-a0)/step); for(let k=0;k<=n;k++){ const a=a0+(a1-a0)*k/n; pts.push(rot?[cst,a,1]:[a,cst,0]); } } } else cols.filter(c=>c[2]).forEach(c=>pts.push([c[0],c[1],0]));
        pts.forEach(p=>{ br.push([p[0],yt+.16,p[1],p[2]?Math.PI/2:0,.34,bh-.16,.7]); }); inst(bx1,dan?C7.YEL:C7.WDL,br); ytop=yt+bh; }
      // 지붕
      const ov=o.ov||1.7, dt=o.dt!==undefined?o.dt:({p:.42,m:1,u:0})[o.roof||'p']; const RE=L+2*ov, RD=D+2*ov; const rh=o.rh||Math.min(RE,RD)*.36;
      let yf=null; if(o.roof!=='none') yf=roofHF(0,ytop-.25,0,RE,RD,rh,{dt,sori:o.sori===undefined?.5:o.sori,mat:o.roofMat||C7.GW,under:o.under||(dan?C7.RUD:C7.RU),thk:.32,gmat:dan?C7.GRN:C7.WD,swap:RD>RE,rmat:C7.DR,rh:.42,rw:.7,ridge:o.up?false:o.ridge});
      if(o.roof!=='none'&&dt<.99&&o.hips!==false&&!o.up&&yf){ const EE=RD>RE?RD:RE, DD=RD>RE?RE:RD, R=Math.max(0,EE-DD*(1-dt)); for(const s1 of [-1,1]) for(const s2 of [-1,1]){ const a0=s1*R/2, b0=dt>0?s2*dt*DD/2:0, a1=s1*EE/2, b1=s2*DD/2; if(RD>RE) hipLine((p,q)=>yf(q,p),0,0,b0,a0,b1,a1,12,C7.DR,.3); else hipLine(yf,0,0,a0,b0,a1,b1,12,C7.DR,.3); } }
      const out={g,ytop,yt,L,D,xs,zs,yb,rh,ye:ytop-.25};
      if(o.up){ const ub=o.up.yb!==undefined?o.up.yb:(ytop-.25+rh+.12); const u=Object.assign({},o.up,{x:0,z:0,ry:0,parent:g,yb:ub,dan:o.up.dan===undefined?dan:o.up.dan}); out.upper=hall7(u);
        // 중층: 아래 지붕과 위층 바닥 사이 판벽(치마) + 바닥판
        K.cur=g; const UL=u.bays.reduce((a,b)=>a+b,0), UD=u.dbays.reduce((a,b)=>a+b,0), y0s=ytop-.6, hs=ub-y0s; const sk=[]; for(const [len,cst,rot] of [[UL+.3,UD/2,0],[UL+.3,-UD/2,0],[UD+.3,-UL/2,1],[UD+.3,UL/2,1]]) sk.push(rot?[cst,y0s,0,0,.24,hs,len]:[0,y0s,cst,0,len,hs,.24]); inst(boxG(1,1,1),dan?C7.RED:C7.WDD,sk); K.b(0,ub-.14,0,UL+.2,.14,UD+.2,C7.WDD); K.cur=prev; }
      K.cur=prev; return out; };
    // 담: 흙/돌 담 + 기와 지붕 — x0,z0 → x1,z1, 높이 h, 재료 mat
    const wall7=(x0,z0,x1,z1,h,o)=>{ o=o||{}; const L=Math.hypot(x1-x0,z1-z0), a=Math.atan2(x1-x0,z1-z0), xm=(x0+x1)/2, zm=(z0+z1)/2, y0=o.y===undefined?-.2:o.y, th=o.th||.6; tbox(xm,y0,zm,th,h,L,o.mat||STW,2.2,a); if(o.cap!==false){ K.b(xm,y0+h,zm,th+.35,.14,L+.3,C7.RU,a); const r=new T.Mesh(boxG(th-.1,.22,L+.2),C7.GW); r.position.set(xm,y0+h+.14,zm); r.rotation.y=a; put(r); K.b(xm,y0+h+.36,zm,.24,.1,L+.2,C7.DR,a); } };
    // 담 둘레(사각) — 앞쪽 가운데 문 폭 gw 비움
    const court7=(cx,cz,w,d,h,gw,o)=>{ o=o||{}; const x0=cx-w/2,x1=cx+w/2,z0=cz-d/2,z1=cz+d/2; wall7(x0,z0,x1,z0,h,o); wall7(x0,z0,x0,z1,h,o); wall7(x1,z0,x1,z1,h,o); if(gw){ wall7(x0,z1,cx-gw/2,z1,h,o); wall7(cx+gw/2,z1,x1,z1,h,o); } else wall7(x0,z1,x1,z1,h,o); };
    // 계단(병합) — 중심 x,z, 폭 w, 앞으로 내려감(+z), 높이 hgt, 단 n, ry
    const stairs7=(x,z,w,hgt,n,ry,mat)=>{ const gs=[]; const rise=hgt/n, run=.32; for(let k=0;k<n;k++) gs.push(bx(0,0,(k+.5)*run,w,hgt-k*rise,run)); const m=merge(gs,mat||C7.ST); m.position.set(x,0,z); if(ry) m.rotation.y=ry; return m; };
    // 지형: flat=[x0,x1,z0,z1] 평탄(대지), hills=E.peaks 목록, water(x,z)→true면 물(높이 waterY), cf 색 함수(선택)
    const site7=(o)=>{ E.own(); const fl=o.flat||[-60,60,-60,60], ramp=o.ramp||90, Rr=o.R||2600;
      const dO=(x,z)=>{ const dx=Math.max(fl[0]-x,0,x-fl[1]), dz=Math.max(fl[2]-z,0,z-fl[3]); return Math.hypot(dx,dz); };
      const hf=(x,z)=>{ if(o.water&&o.water(x,z)) return (o.waterY||-.6)-1.4; const d=dO(x,z); const b=o.base?o.base(x,z):0; if(d<=0) return b-.06; let h=b+E.peaks(x,z,o.hills||[])*E.ss((d-(o.hold||10))/ramp)+(E.fbm(x*.03,z*.03,3)-.5)*(o.rough===undefined?2.2:o.rough)*E.ss(d/40); if(o.water&&o.water(x,z)) h=Math.min(h,(o.waterY||-.6)-1.4); else if(o.water) h=Math.max(h,b-.06); return h; };
      const cf=o.cf||((x,z,h,ny)=>{ const d=dO(x,z); if(d<o.near||(d<12&&!o.near)){ const n=E.fbm(x*.1,z*.1,2); return o.groundC?o.groundC(x,z,n):[.55+.05*n,.52+.04*n,.42]; } if(o.water&&o.water(x,z)) return [.46,.47,.42]; return E.mcol(x,z,h,ny,{far:o.far||600,farW:o.farW||1100,cliff:o.cliff||0}); });
      const axx=(A,ex)=>{ if(!ex) return A; const L=A.concat(ex).sort((a,b)=>a-b); return L.filter((v,i)=>i===0||v-L[i-1]>.05); }; const TR=E.terrain(0,0,0,0,axx(E.axis(Rr,o.n||150,4.2),o.xs),axx(E.axis(Rr,o.n||150,4.2),o.zs),hf,cf);
      if(o.waterY!==undefined){ const wm=new T.Mesh(new T.PlaneGeometry(Rr*2.2,Rr*2.2),E.WATER); wm.rotation.x=-Math.PI/2; wm.position.y=o.waterY; wm.receiveShadow=true; K.life.add(wm); }
      if(o.forest!==false){ const fo=o.forest||{}; E.forest(E.scatter(-(fo.R||1300),fo.R||1300,-(fo.R||1300),fo.R||1300,fo.sp||10,TR.h,(x,z,h)=>{ if(dO(x,z)<(fo.clear||30)) return false; if(o.water&&o.water(x,z)) return false; if(fo.ok&&!fo.ok(x,z,h)) return false; return h>(fo.minH===undefined?1.5:fo.minH)&&E.r()<(fo.dens||.85); },(x,z,h)=>(fo.h||9)+E.vn(x*.05,z*.05)*(fo.hv||7),(x,z,h)=>fo.kind!==undefined?fo.kind:(E.vn(x*.03+3,z*.03)<.5?1:0)),{trunks:false}); }
      return TR; };
    // 도시 블록(멀리·낮게): [x,z,w,d,h,hex] — 꼭짓점 색 한 메시
    const blocks7=(list,y0)=>{ if(!list.length) return; y0=y0||0; const n=list.length*30, P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3); let o=0; const c=new T.Color();
      const quad=(a,b,cc,d,nx,ny,nz,k)=>{ for(const q of [a,b,cc,a,cc,d]){ P[o*3]=q[0]; P[o*3+1]=q[1]+y0; P[o*3+2]=q[2]; N[o*3]=nx; N[o*3+1]=ny; N[o*3+2]=nz; Cc[o*3]=c.r*k; Cc[o*3+1]=c.g*k; Cc[o*3+2]=c.b*k; o++; } };
      for(const [x,z,w,d,h,hex] of list){ c.set(hex).convertSRGBToLinear(); const X0=x-w/2,X1=x+w/2,Z0=z-d/2,Z1=z+d/2; quad([X0,h,Z1],[X1,h,Z1],[X1,h,Z0],[X0,h,Z0],0,1,0,1.06); quad([X0,0,Z1],[X1,0,Z1],[X1,h,Z1],[X0,h,Z1],0,0,1,.95); quad([X1,0,Z0],[X0,0,Z0],[X0,h,Z0],[X1,h,Z0],0,0,-1,.9); quad([X1,0,Z1],[X1,0,Z0],[X1,h,Z0],[X1,h,Z1],1,0,0,.86); quad([X0,0,Z0],[X0,0,Z1],[X0,h,Z1],[X0,h,Z0],-1,0,0,.86); }
      const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(P,3)); g.setAttribute('normal',new T.BufferAttribute(N,3)); g.setAttribute('color',new T.BufferAttribute(Cc,3)); const m=new T.Mesh(g,new T.MeshStandardMaterial({vertexColors:true,roughness:.9})); m.receiveShadow=true; m.castShadow=false; K.life.add(m); return m; };
    // 육축(돌 기단 문) — 폭 W·깊이 D·높이 H, 홍예 목록 [[x중심, 폭, 높이(꼭대기)]] — 정면 +z, 질감 UV를 tm m 단위로
    const yukchuk7=(x0,z0,W,D,H,arches,o)=>{ o=o||{}; const sh=new T.Shape(); sh.moveTo(-W/2,0); sh.lineTo(W/2,0); sh.lineTo(W/2,H); sh.lineTo(-W/2,H); sh.lineTo(-W/2,0);
      for(const [ax,aw,ah] of arches){ const r=aw/2, sp=ah-r; const hp=new T.Path(); hp.moveTo(ax-r,0); hp.lineTo(ax-r,sp); hp.absarc(ax,sp,r,Math.PI,0,true); hp.lineTo(ax+r,0); hp.lineTo(ax-r,0); sh.holes.push(hp); }
      const g=new T.ExtrudeGeometry(sh,{depth:D,bevelEnabled:false,curveSegments:16}); g.translate(0,0,-D/2); const uv=g.attributes.uv, pos=g.attributes.position, nrm=g.attributes.normal; const tm=o.tm||2.4;
      for(let i=0;i<uv.count;i++){ const nx=Math.abs(nrm.getX(i)), nz=Math.abs(nrm.getZ(i)); const px=pos.getX(i), py=pos.getY(i), pz=pos.getZ(i); if(nz>.5) uv.setXY(i,px/tm,py/tm); else if(nx>.5) uv.setXY(i,pz/tm,py/tm); else uv.setXY(i,px/tm,pz/tm); }
      const m=new T.Mesh(g,o.mat||ASH); m.position.set(x0,o.y||0,z0); if(o.ry) m.rotation.y=o.ry; put(m);
      // 여장(위 가장자리 낮은 담)
      if(o.parapet!==false){ const it=[]; const yy=(o.y||0)+H; for(const [cx,cz,w,d] of [[0,D/2-.3,W,.6],[0,-D/2+.3,W,.6],[W/2-.3,0,.6,D],[-W/2+.3,0,.6,D]]) it.push([x0+cx,yy,z0+cz,0,w,.9,d]); inst(boxG(1,1,1),C7.ST2,it); }
      return m; };
    // 도시 건물(창 무늬 질감) — K.life에 놓음: [x,z,w,d,h,hex,ry]
    const WINT=E.tex('k7_win',512,(g,N,rr)=>{ g.fillStyle='#e9e6df'; g.fillRect(0,0,N,N); for(let r=0;r<4;r++){ g.fillStyle='rgba(0,0,0,.05)'; g.fillRect(0,r*N/4+N/4-10,N,10); for(let c=0;c<6;c++){ const x=c*N/6+10, y=r*N/4+18; g.fillStyle=rr()<.2?'#a9b6bd':'#56626a'; g.fillRect(x,y,N/6-20,N/4-44); g.fillStyle='rgba(255,255,255,.18)'; g.fillRect(x,y,N/6-20,5); } } });
    const WM7={}; const winMat=hex=>WM7[hex]||(WM7[hex]=E.tmat(WINT,hex,{tint:hex,roughness:.85}));
    const bldg7=(list)=>{ const prev=K.cur; K.cur=K.life; for(const [x,z,w,d,h,hex,ry] of list){ tbox(x,0,z,w,h,d,winMat(hex),12,ry); K.b(x,h,z,w+.2,.5,d+.2,K.col(0x8a8780,{roughness:.9}),ry); } K.cur=prev; };
    // 도시 격자 블록 생성: 영역 밖 링(r0~r1)에 블록 — 높이 함수 hfn(x,z)
    const city7=(r0,r1,cell,hfn,ok,pal)=>{ const L=[]; let sd=19; const rr=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; }; pal=pal||[0xb8b2a6,0xa9a49b,0xc9c2b4,0x9a958d,0xd6cfc2,0x8f9aa3,0xbfb6a4];
      for(let x=-r1;x<=r1;x+=cell) for(let z=-r1;z<=r1;z+=cell){ const d=Math.max(Math.abs(x),Math.abs(z)); if(d<r0) continue; if(ok&&!ok(x,z)) continue; const nb=1+Math.floor(rr()*3); for(let k=0;k<nb;k++){ const w=cell*(.3+rr()*.35), dd=cell*(.3+rr()*.35); const bx0=x+(rr()-.5)*(cell-w)*.8, bz0=z+(rr()-.5)*(cell-dd)*.8; L.push([bx0,bz0,w,dd,Math.max(3,hfn(bx0,bz0)*(.55+rr()*.9)),pal[Math.floor(rr()*pal.length)]]); } }
      return blocks7(L); };
    // 마을 인스턴스: 기와집·초가 단위 지붕 형상(hahoe 방식) — list [{x,z,a,w,d,k:'tile'|'th'|'thj',y,wh,rh,wall}]
    const surfG7=(fn,nu,nv)=>{ const pos=[],idx=[]; for(let j=0;j<=nv;j++) for(let i=0;i<=nu;i++){ const p=fn(i/nu,j/nv); pos.push(p[0],p[1],p[2]); } for(let j=0;j<nv;j++) for(let i=0;i<nu;i++){ const a=j*(nu+1)+i, b=a+1, c=a+nu+1, d=c+1; idx.push(a,c,b,b,c,d); } const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(pos,3)); g.setIndex(idx); g.computeVertexNormals(); return g; };
    const tileG7=(()=>{ const EE=1.8, DD=1, dt=.42, R=EE-DD*(1-dt); const g=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),1.7); const yf=(a,b)=>{ const bb=Math.abs(b)/(DD/2); const ta=Math.abs(a)>R/2?(Math.abs(a)-R/2)/(DD/2)+dt:0; return (1-g(Math.max(bb,ta)))+.12*Math.pow(Math.abs(a)/(EE/2),3)*Math.pow(bb,3); };
      const top=surfG7((u,v)=>{ const a=-EE/2+EE*u, b=-DD/2+DD*v; return [a,yf(a,b),b]; },24,10); const gs=[top]; for(const s of [-1,1]){ const sh=new T.Shape(); sh.moveTo(-dt*DD/2,1-g(dt)); sh.lineTo(0,1); sh.lineTo(dt*DD/2,1-g(dt)); const gg=new T.ShapeGeometry(sh); gg.rotateY(Math.PI/2); gg.translate(s*R/2,0,0); gs.push(gg); } const rg=new T.BoxGeometry(R+.06,.07,.05); rg.translate(0,1.0,0); gs.push(rg); return E.mergeG(gs); })();
    const thG7=(()=>{ const g=surfG7((u,v)=>{ const a=-.9+1.8*u, b=-.5+v; const q=Math.pow(Math.pow(Math.abs(a/.9),4)+Math.pow(Math.abs(b/.5),4),.25); return [a,Math.max(0,Math.pow(Math.max(0,1-q),.45))-.04,b]; },26,14); g.computeVertexNormals(); return g; })();
    const village7=(list,o)=>{ o=o||{}; const wT=[],wM=[],rT=[],rH=[],sT=[],dm=[],pp=[]; list.forEach(h=>{ const y=h.y||0; const ww=Math.max(1,h.w-1.0), dd=Math.max(1,h.d-1.2); const wh=h.wh||(h.k==='tile'?2.6:2.1), rh=h.rh||(h.k==='tile'?2.5:1.7);
        (h.k==='tile'?wT:wM).push([h.x,y+.45,h.z,h.a,ww,wh,dd]); sT.push([h.x,y,h.z,h.a,h.w-.4,.45,h.d-.6]);
        if(h.k==='tile') rT.push([h.x,y+.45+wh-.15,h.z,h.a,(h.w+1.6)/1.8,rh,h.d+1.8]); else rH.push([h.x,y+.45+wh-.2,h.z,h.a,(h.w+1.0)/1.8,rh,h.d+1.0]);
        const nx=Math.sin(h.a), nz=Math.cos(h.a); for(const u of [-.25,.15]){ const ux=Math.cos(h.a)*u*ww, uz=-Math.sin(h.a)*u*ww; (h.k==='tile'?pp:dm).push([h.x+ux+nx*(dd/2+.03),y+.6,h.z+uz+nz*(dd/2+.03),h.a,1.2,1.8,.05]); } });
      const G=o.grp||null; const mk=(geo,mat,items,cast)=>inst(geo,mat,items,cast,G,true);
      mk(boxG(1,1,1),o.wallT||C7.WH,wT,true); mk(boxG(1,1,1),o.wallM||C7.MUD,wM,true); mk(boxG(1,1,1),o.base||C7.ST,sT,true); mk(tileG7,C7.GW,rT,true); mk(thG7,o.thMat||C7.TH,rH,true); mk(boxG(1,1,1),C7.WDD,dm,false); mk(boxG(1,1,1),C7.PAPER,pp,false); };
    // 담장 인스턴스: 집 둘레 돌담 — list of [x,z,a,w,d], 앞 가운데 비움
    const yardWalls7=(list,h,mat,capMat)=>{ const wl=[],cap=[]; list.forEach(([x,z,a,W,D,y])=>{ const cs=Math.cos(a), sn=Math.sin(a); const P=(lx,lz)=>[x+lx*cs+lz*sn,z-lx*sn+lz*cs]; for(const [lx,lz,w,d] of [[0,-D/2,W,.45],[-W/2,0,.45,D],[W/2,0,.45,D],[-W*.3,D/2,W*.4,.45],[W*.3,D/2,W*.4,.45]]){ const [px,pz]=P(lx,lz); wl.push([px,(y||0)-.2,pz,a,w,h+.2,d]); if(capMat) cap.push([px,(y||0)+h,pz,a,w+.2,.2,d+.3]); } }); inst(boxG(1,1,1),mat||C7.ST,wl); if(capMat) inst(boxG(1,1,1),capMat,cap); };
    // +z 남서쪽(계곡·진입), -z 안쪽(대웅보전)
    K.layer(0);
    const cz=(x)=>40+3*Math.sin(x/22);
    const TR=site7({flat:[-46,46,-52,33],water:(x,z)=>Math.abs(z-cz(x))<6.5&&Math.abs(x)<900,waterY:-2.4,R:2600,ramp:90,
      base:(x,z)=>z>46?-.6:(z<-12?1.4:0),zs:[-12],hills:[[0,-520,520,380,320,1.3],[-520,-220,420,420,260,1.3],[520,-160,420,420,240,1.3],[0,520,600,360,180,1.3]],
      groundC:(x,z,n)=>[.58+.04*n,.55+.04*n,.45+.03*n],near:6,forest:{R:1600,sp:8,clear:70,minH:2,dens:.95,h:13,hv:6,ok:(x,z)=>!(Math.abs(z-cz(x))<12)}});
    { K.cur=K.life; // 계곡 바위
      const rk=[]; for(let x=-140;x<140;x+=1.8){ for(const s of [-1,1]){ if(E.r()<.45) continue; const sc=.7+E.r()*1.4; rk.push([x,-2.7,cz(x)+s*(5.6+E.r()*1.8),E.r()*6,sc*1.7,sc*.8,sc*1.2]); } } inst(new T.DodecahedronGeometry(.6,0),K.col(0xa29c90,{roughness:.9}),rk);
      E.forest([[-40,0,52,14,0,.3,1.2],[44,0,56,16,0,.6,1.2],[-46,0,-20,12,1,.4,1],[48,0,-30,14,1,.7,1.1]],{trunks:true,cast:true}); lay7(0); }
    // ---------- 1: 삼청교(홍예) + 우화각 ----------
    lay7(1);
    { K.cur=K.layer(1); const z0=cz(0); const L=15, Wb=4.6; // 다리는 계곡을 가로질러 z 방향
      tbox(0,-2.8,z0-L/2-2.6,Wb,3.6,5.2,ASH,2.0); tbox(0,-2.8,z0+L/2+2.6,Wb,3.6,5.2,ASH,2.0);
      const sh=new T.Shape(); sh.moveTo(-L/2,-3.2); sh.lineTo(-3.4,-3.2); sh.absarc(0,-3.2,3.4,Math.PI,0,true); sh.lineTo(L/2,-3.2); sh.lineTo(L/2,.8); sh.lineTo(-L/2,.8); sh.lineTo(-L/2,-3.2);
      const g=new T.ExtrudeGeometry(sh,{depth:Wb,bevelEnabled:false}); g.translate(0,0,-Wb/2); g.rotateY(Math.PI/2); const m=new T.Mesh(g,ASH); m.position.set(0,0,z0); put(m);
      K.b(0,.8,z0,Wb+.2,.16,L+10,C7.ST2); lay7(1); }
    hall7({x:0,z:cz(0),layer:1,bays:[3.4],dbays:[3.0,3.0,3.0,3.0],yb:.96,H:2.6,roof:'p',rh:2.0,ov:1.0,ik:true,fill:()=> 'open'}); // 우화각(다리 위, 축은 계곡을 건너는 방향)
    // ---------- 2: 침계루·임경당(물가) ----------
    lay7(2);
    hall7({x:-26,z:31,layer:2,bays:[2.6,2.6,2.6,2.6,2.6],dbays:[2.4,2.4],y0:.6,bm:.4,H:2.4,lift:2.0,roof:'p',rh:2.6,ov:1.3,fill:(sd)=>sd==='f'?'open':'board'});
    hall7({x:26,z:30,layer:2,bays:[2.6,2.6,2.6,2.6],dbays:[2.4,2.4],y0:.6,H:2.6,roof:'p',rh:2.4,ov:1.2,fill:(sd)=>sd==='f'?'door':'wall'});
    // ---------- 3: 천왕문·종고루 ----------
    lay7(3);
    hall7({x:0,z:22,layer:3,bays:[2.8,3.0,2.8],dbays:[2.6,2.6],y0:.5,H:3.0,roof:'m',rh:2.4,ov:1.1,ik:true,fill:(sd,i)=>(sd==='f'||sd==='b')&&i===1?'open':'wall'});
    hall7({x:0,z:10,layer:3,bays:[2.6,2.8,2.6],dbays:[2.6,2.6],y0:.5,H:2.4,lift:2.6,roof:'p',rh:2.6,ov:1.4,ik:true,fill:(sd,i)=>sd==='f'||sd==='b'?(i===1?'open':'board'):'board'});
    // ---------- 4: 마당 · 대웅보전 ----------
    lay7(4);
    { K.cur=K.layer(4); flat7(0,-4,40,26,.04,MAS,5); tbox(0,-.2,-24,40,1.7,20,STW,2.4); stairs7(0,-14,6,1.5,5,0,C7.GRAN); lay7(4); }
    hall7({x:0,z:-24,layer:4,bays:[3.0,3.2,3.4,4.0,3.4,3.2,3.0],dbays:[3.0,3.2,3.2,3.2,3.0],y0:1.5+.8,bm:1.0,H:4.4,dapo:true,dan:true,roof:'p',rh:5.2,ov:2.4,fill:(sd,i)=>sd==='f'?(i>=1&&i<=5?'door':'wall'):'wall'});
    hall7({x:-24,z:-8,ry:Math.PI/2,layer:4,bays:[2.6,2.8,2.6],dbays:[2.4,2.4],y0:.6,H:2.8,roof:'p',rh:2.4,ov:1.2,ik:true,fill:(sd)=>sd==='f'?'door':'wall'});
    hall7({x:24,z:-8,ry:-Math.PI/2,layer:4,bays:[2.6,2.8,2.6],dbays:[2.4,2.4],y0:.6,H:2.8,roof:'p',rh:2.4,ov:1.2,ik:true,fill:(sd)=>sd==='f'?'door':'wall'});
    hall7({x:-22,z:-38,layer:4,bays:[2.6,2.6,2.6],dbays:[2.4,2.4],y0:1.6+.5,H:2.6,roof:'m',rh:2.0,ov:1.0,fill:(sd)=>sd==='f'?'door':'wall'});
    hall7({x:22,z:-38,layer:4,bays:[2.6,2.6,2.6],dbays:[2.4,2.4],y0:1.6+.5,H:2.6,roof:'m',rh:2.0,ov:1.0,fill:(sd)=>sd==='f'?'door':'wall'});
    tidy7(1); K.cur=null; }});
