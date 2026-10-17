__bsigFill({"yangdong":function(K){
// 출처: 텔트립 「경주 양동마을」 — 설창산 자락, 문장봉 능선이 네 갈래로 갈라진 물(勿)자 지형, 높은 곳 양반가·낮은 곳 평민가, 여강 이씨·월성 손씨, 기와집 약 50채·초가 약 110채, 국가민속문화유산 제189호(969,119 ㎡), 무첨당(보물 제411호)·향단(보물 제412호, 이언적이 경상감사 때 지음)·관가정(보물 제442호, 손중돈 옛집)·서백당(중요민속자료 제23호), 2010-07-31 세계유산 등재
// 추정: 능선 방향·높이, 가옥 수·위치·향(지도 감각), 큰 집 네 채의 위치와 칸 구성(개략), 들판·하천 위치
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

    // ---- 한옥 공용(v18): 재질·질감 · 돌계단 · 전각 HALL(로컬: 정면 +z, 기단 바닥 y=0) · 배경 전각(인스턴스, K.life) ----
    const HM=(()=>{ const c=K.col; const H={ST:c(0xb8b1a3,{roughness:.95}), ST2:c(0x9d968a,{roughness:.95}), WD:c(0x8b7559,{roughness:.88}), WDD:c(0x5e4a38,{roughness:.9}), WH:c(0xe8e1d1,{roughness:.97}), WHY:c(0xe2d2a6,{roughness:.97}), RU:c(0x54463a,{roughness:.9}), GW:K.M.giwa, GRN:c(0x5f8a76,{roughness:.85}), RED:c(0x8e4532,{roughness:.85}), OC:c(0xb58f6e,{roughness:.9}), DR:c(0x2d2b28,{roughness:.8}), PAPER:c(0xece5d3,{roughness:.95}), BLU:c(0x3d6c84,{roughness:.85}), GLS:K.col(0x9fb4bd,{roughness:.08,metalness:.55,transparent:true,opacity:.5})};
      const tm=(key,draw,base)=>{ const t=E.tex(key,256,draw); const m=new T.MeshStandardMaterial({map:t,roughness:.9}); if(!t) m.color.setHex(base).convertSRGBToLinear(); return m; };
      // 띠살 분합문(4짝) · 꽃살문 · 살창 · 판문 · 단청 창방 띠
      H.DOOR=tm('h18_door',(g,N)=>{ g.fillStyle='#e9e1cc'; g.fillRect(0,0,N,N); g.fillStyle='#5f4b37'; const lw=N/4; for(let l=0;l<4;l++){ const x0=l*lw; g.fillRect(x0,0,7,N); g.fillRect(x0+lw-7,0,7,N); for(let x=x0+14;x<x0+lw-10;x+=9) g.fillRect(x,0,2.6,N); for(const y0 of [10,N*.47,N-34]) for(let k=0;k<3;k++) g.fillRect(x0,y0+k*8,lw,2.6); g.fillRect(x0,0,lw,7); g.fillRect(x0,N-7,lw,7); } },0xcbbfa4);
      H.KKOT=tm('h18_kkot',(g,N)=>{ g.fillStyle='#6b5039'; g.fillRect(0,0,N,N); const lw=N/4; for(let l=0;l<4;l++){ const x0=l*lw; g.save(); g.beginPath(); g.rect(x0+7,8,lw-14,N-16); g.clip(); g.strokeStyle='#d9c9a6'; g.lineWidth=3; for(let k=-N;k<N*2;k+=11){ g.beginPath(); g.moveTo(x0+k,0); g.lineTo(x0+k+N,N); g.stroke(); g.beginPath(); g.moveTo(x0+k,N); g.lineTo(x0+k+N,0); g.stroke(); } g.fillStyle='#b4553f'; for(let y=14;y<N;y+=11) for(let x=x0+12;x<x0+lw-6;x+=11){ g.beginPath(); g.arc(x,y,2.2,0,7); g.fill(); } g.restore(); } },0x8a6a4c);
      H.SAL=tm('h18_sal',(g,N)=>{ g.fillStyle='#211c17'; g.fillRect(0,0,N,N); g.fillStyle='#8b7559'; g.fillRect(0,0,N,10); g.fillRect(0,N-10,N,10); g.fillRect(0,0,10,N); g.fillRect(N-10,0,10,N); for(let x=10;x<N-8;x+=17) g.fillRect(x,0,8,N); },0x3a3029);
      H.PAN=tm('h18_pan',(g,N)=>{ g.fillStyle='#6d5640'; g.fillRect(0,0,N,N); for(let x=0;x<N;x+=N/7){ g.fillStyle='rgba(0,0,0,.25)'; g.fillRect(x,0,2,N); } g.fillStyle='#3e3126'; g.fillRect(N/2-2,0,4,N); for(const y of [N*.18,N*.8]) g.fillRect(0,y,N,9); g.fillStyle='#b8a27a'; g.beginPath(); g.arc(N/2-14,N/2,5,0,7); g.arc(N/2+14,N/2,5,0,7); g.fill(); },0x6d5640);
      H.DAN=tm('h18_dan',(g,N)=>{ g.fillStyle='#4f8a74'; g.fillRect(0,0,N,N); g.fillStyle='#2f5f86'; g.fillRect(0,0,N,N*.16); g.fillRect(0,N*.84,N,N*.16); for(const x0 of [0,N*.62]){ const cs=['#b8432e','#f1ead7','#2f5f86','#f1ead7','#b8432e','#e0b54c']; cs.forEach((c,i)=>{ g.fillStyle=c; g.fillRect(x0+i*N*.05,N*.16,N*.035,N*.68); }); g.fillStyle='#e9c25a'; g.beginPath(); g.arc(x0+N*.33,N/2,N*.13,0,7); g.fill(); g.fillStyle='#b8432e'; g.beginPath(); g.arc(x0+N*.33,N/2,N*.06,0,7); g.fill(); } },0x4f8a74);
      H.STW=E.tmat(E.wallTex('h18_stw','#4d483f',['#a59f92','#b4ad9f','#958f83','#aaa497','#bdb6a7','#8e897e','#9f998b','#c2bba9'],62,70,170),0xb1aa9d,{tint:0xdad4c8});
      return H; })();
    const stairs=(x,z,yt,yb,w,n,dir,run,mat)=>{ run=run||.36; const rise=(yt-yb)/n; const gs=[]; for(let k=0;k<n;k++){ const h=yt-yb-k*rise, off=dir*(k+.5)*run; gs.push(bx(x,yb-.4,z+off,w,h+.4,run)); } for(const s of [-1,1]){ const Lr=n*run; gs.push(bx(x+s*(w/2+.22),yb-.4,z+dir*Lr/2,.44,yt-yb+.5,Lr)); } return merge(gs,mat||HM.ST); };
    // 전각: XC/ZC 기둥 열, bh 기단, CH 기둥, bae 배흘림, dapo(0 주심포·n 칸마다 공간포 수), roof {dt,H,ox,oz,sori,thk}, front/back/side 칸 유형(door·kkot·sal·pan·wall·open·glass·salw)
    const HALL=o=>{ const g1=new T.Group(), g2=new T.Group(); [[g1,o.l1===undefined?1:o.l1],[g2,o.l2===undefined?2:o.l2]].forEach(([g,l])=>{ g.position.set(o.x||0,o.y||0,o.z||0); g.rotation.y=o.ry||0; K.layer(l).add(g); });
      const XC=o.XC, ZC=o.ZC, nX=XC.length-1, nZ=ZC.length-1, W=XC[nX]-XC[0], D=ZC[nZ]-ZC[0], bh=o.bh===undefined?.8:o.bh, CH=o.CH||3.6, cr=o.cr||.22, bm=o.bm===undefined?1.4:o.bm, Y=bh;
      const zf=ZC[nZ], zb=ZC[0], xl=XC[0], xr=XC[nX]; const CM=o.colMat||HM.WD, BM=o.beamMat||HM.WDD;
      K.cur=g1;
      if(bh>0){ tbox(0,-.3,0,W+bm*2,bh+.3,D+bm*2,HM.STW,2.2); K.b(0,bh-.08,0,W+bm*2+.1,.1,D+bm*2+.1,HM.ST2); if(o.steps!==false){ const mi=Math.floor(nX/2); const sw=Math.min(4,XC[mi+1]-XC[mi]-.2); if(nX%2) stairs((XC[mi]+XC[mi+1])/2,zf+bm,bh,0,sw,Math.max(2,Math.round(bh/.19)),1,.32); else stairs(0,zf+bm,bh,0,2.4,Math.max(2,Math.round(bh/.19)),1,.32); } }
      const colG=o.bae?(()=>{ const pts=[]; for(let i=0;i<=10;i++){ const t=i/10; const r=cr*(t<1/3?1-.1*Math.pow((1/3-t)*3,2):1-.26*Math.pow((t-1/3)*1.5,2)); pts.push(new T.Vector2(r,t*CH)); } return new T.LatheGeometry(pts,12); })():cylG(cr,CH,12,cr*.92);
      const cols=[]; XC.forEach((x,i)=>ZC.forEach((z,j)=>{ if(i===0||i===nX||j===0||j===nZ) cols.push([x,Y,z]); })); inst(colG,CM,cols); inst(cylG(cr*1.7,.16,10,cr*1.5),HM.ST,cols.map(c=>[c[0],Y-.04,c[2]]));
      K.b(0,Y,0,W+.1,.1,D+.1,HM.WDD);
      if(o.toet){ // 앞 툇마루 + 난간
        K.b(0,Y-.05,zf+o.toet/2,W+.2,.16,o.toet,HM.WD); const rl=[]; for(let x=-W/2;x<=W/2;x+=.3) rl.push([x,Y+.1,zf+o.toet-.08]); inst(boxG(.05,.62,.05),HM.WDD,rl); K.b(0,Y+.7,zf+o.toet-.08,W+.2,.08,.1,HM.WDD); }
      // 벽·창호: 칸 패널(바깥 = +z 쪽이 되도록 회전) — 재질별로 병합
      const G={}; const P=(mat,g)=>{ (G[mat.uuid]=G[mat.uuid]||{mat,gs:[]}).gs.push(g); };
      const types=(t,n)=>Array.isArray(t)?t:Array(n).fill(t||'wall');
      const sides=[[types(o.front,nX),XC,zf,0],[types(o.back,nX),XC,zb,Math.PI],[types(o.right||o.side,nZ),ZC,xr,Math.PI/2],[types(o.left||o.side,nZ),ZC,xl,-Math.PI/2]];
      sides.forEach(([tt,AX,pos,ry],si)=>{ for(let i=0;i<AX.length-1;i++){ const t=tt[i]; if(t==='open') continue; const c=(AX[i]+AX[i+1])/2, w=AX[i+1]-AX[i]-cr*1.6; const at=(lx,ly,lz,ww,hh,dd)=>{ // lx: 면 따라, lz: 바깥(+)
            const cs=Math.cos(ry), sn=Math.sin(ry); const X=si<2?c*(si===0?1:1):pos, Z=si<2?pos:c; return bx(X+lz*sn,ly,Z+lz*cs,ww,hh,dd,ry); };
          const lo=t==='sal'||t==='salw'?.95:.32, hi=CH-.62;
          P(BM,at(0,Y,0,w+.06,lo-.0,.24)); P(BM,at(0,Y+hi,0,w+.06,.2,.22)); P(HM.WH,at(0,Y+hi+.2,0,w,CH-hi-.2,.14));
          if(t==='wall'||t==='salw'){ if(t==='wall'){ P(HM.WH,at(0,Y+lo,0,w,hi-lo,.14)); P(BM,at(0,Y+lo+(hi-lo)*.42,0,w+.04,.2,.2)); } else { P(HM.WH,at(0,Y+lo,0,w,hi-lo,.14)); P(HM.SAL,at(0,Y+lo+(hi-lo)*.35,.02,Math.min(w*.4,1.2),(hi-lo)*.4,.14)); } continue; }
          if(t==='sal'){ P(HM.WH,at(0,Y+.32,0,w,lo-.32,.14)); P(HM.SAL,at(0,Y+lo,0,w,hi-lo,.12)); continue; }
          const m=t==='door'?HM.DOOR:t==='kkot'?HM.KKOT:t==='pan'?HM.PAN:t==='glass'?HM.GLS:HM.DOOR; P(m,at(0,Y+lo,0,w,hi-lo,.1)); } });
      Object.values(G).forEach(({mat,gs})=>merge(gs,mat,mat!==HM.GLS));
      // 창방(단청 띠) · 평방
      const yb2=Y+CH-.06; const band=o.dan?HM.DAN:HM.GRN; const bm2=o.plain?HM.WDD:band;
      tbox(0,yb2,zf,W+.5,.46,.34,bm2,3); tbox(0,yb2,zb,W+.5,.46,.34,bm2,3); tbox(xl,yb2,0,.34,.46,D+.5,bm2,3); tbox(xr,yb2,0,.34,.46,D+.5,bm2,3);
      if(o.dapo){ K.b(0,yb2+.46,zf,W+.7,.18,.42,HM.OC); K.b(0,yb2+.46,zb,W+.7,.18,.42,HM.OC); K.b(xl,yb2+.46,0,.42,.18,D+.7,HM.OC); K.b(xr,yb2+.46,0,.42,.18,D+.7,HM.OC); }
      // 공포: 주심포(기둥 위) + 다포(칸마다 공간포)
      K.cur=g2; { const ring=[]; XC.forEach(x=>{ ring.push([x,zf,0],[x,zb,Math.PI]); }); ZC.slice(1,nZ).forEach(z=>{ ring.push([xr,z,Math.PI/2],[xl,z,-Math.PI/2]); });
        if(o.dapo){ const add=(AX,fix,isX)=>{ for(let i=0;i<AX.length-1;i++){ const n=o.dapo; for(let k=1;k<=n;k++){ const t=AX[i]+(AX[i+1]-AX[i])*k/(n+1); if(isX){ ring.push([t,zf,0],[t,zb,Math.PI]); } else { ring.push([xr,t,Math.PI/2],[xl,t,-Math.PI/2]); } } } }; add(XC,0,true); add(ZC,0,false); }
        const y0=yb2+.46+(o.dapo?.18:0); const ju=[],c1=[],c2=[],sal=[],sal2=[],so=[]; const s=o.bsz||1;
        ring.forEach(([x,z,ry])=>{ const nx=Math.sin(ry), nz=Math.cos(ry); ju.push([x,y0,z,ry,s,s,s]); c1.push([x,y0+.3*s,z,ry,s,s,s]); c2.push([x,y0+.6*s,z,ry,s,s,s]); sal.push([x+nx*.5*s,y0+.28*s,z+nz*.5*s,ry,s,s,s]); sal2.push([x+nx*.9*s,y0+.58*s,z+nz*.9*s,ry,s,s,s]); so.push([x+nx*1.15*s,y0+.9*s,z+nz*1.15*s,ry,s,s,s]); });
        for(const sx of [-1,1]) for(const sz of [-1,1]){ const a=Math.atan2(sx,sz); const x=sx>0?xr:xl, z=sz>0?zf:zb; sal.push([x+Math.sin(a)*.65*s,y0+.28*s,z+Math.cos(a)*.65*s,a,s,s,1.3*s]); sal2.push([x+Math.sin(a)*1.1*s,y0+.58*s,z+Math.cos(a)*1.1*s,a,s,s,1.4*s]); }
        const pc=o.dan?HM.GRN:HM.OC, pc2=o.dan?HM.BLU:HM.GRN; inst(boxG(.56,.3,.56),HM.OC,ju); inst(boxG(1.6,.28,.32),pc,c1); inst(boxG(2.3,.28,.32),pc2,c2); inst(boxG(.3,.28,1.2),HM.OC,sal); inst(boxG(.28,.28,1.2),pc,sal2); inst(boxG(.34,.2,.46),HM.OC,so); }
      const ye=yb2+.46+(o.dapo?.18:0)+1.0*(o.bsz||1); const R0=o.roof||{}; const ox=R0.ox||2.6, oz=R0.oz||2.6, E0=W+ox*2, D0=D+oz*2, RH=R0.H||Math.min(E0,D0)*.36, dt=R0.dt===undefined?.42:R0.dt;
      K.b(0,ye-.25,0,W+.6,.4,D+.6,HM.RU); // 주심도리·장여
      { const raf=[]; if(dt<1) for(let x=-E0/2+1.2;x<=E0/2-1.2;x+=.6) for(const s2 of [-1,1]) raf.push([x,ye-.3,s2*(D/2+oz*.55),0,1,1,1]); else for(let x=-W/2-ox*.7;x<=W/2+ox*.7;x+=.6) for(const s2 of [-1,1]) raf.push([x,ye-.3,s2*(D/2+oz*.55),0,1,1,1]); if(dt<1) for(let z=-D0/2+1.2;z<=D0/2-1.2;z+=.6) for(const s2 of [-1,1]) raf.push([s2*(W/2+ox*.55),ye-.3,z,Math.PI/2,1,1,1]); inst(boxG(.18,.18,oz*1.05),HM.RU,raf); }
      const sw=!!R0.swap, A=sw?D0:E0, B=sw?E0:D0;
      const yf=roofHF(0,ye,0,E0,D0,RH,{dt,mat:HM.GW,under:HM.RU,thk:R0.thk||.4,sori:R0.sori===undefined?.8:R0.sori,gmat:HM.WD,nu:R0.nu||36,rh:R0.rh||.55,rw:.8,nog:dt>=1,ridge:R0.ridge,swap:sw});
      const HL=(a0,b0,a1,b1,n,mat,w)=>{ const gs=[]; n=Math.max(n,Math.ceil(Math.hypot(a1-a0,b1-b0)/.2)); for(let k=0;k<=n;k++){ const t=k/n, a=a0+(a1-a0)*t, b=b0+(b1-b0)*t; gs.push(bx(sw?b:a,yf(a,b)-.12,sw?a:b,w,.34,w)); } return merge(gs,mat); };
      const RE=(a,y)=>K.b(sw?0:a,y,sw?a:0,sw?.9:.7,1.1,sw?.7:.9,HM.DR);
      if(dt>0&&dt<1){ const R=A-B*(1-dt); for(const s2 of [-1,1]){ for(const t of [-1,1]){ HL(s2*(A/2-.35),t*(B/2-.35),s2*R/2,t*dt*B/2,12,HM.DR,.44); HL(s2*R/2,0,s2*R/2,t*dt*B/2,6,HM.DR,.38); } RE(s2*(R/2+.15),ye+RH-.22); } }
      else if(dt===0){ const R=A-B; for(const s2 of [-1,1]) for(const t of [-1,1]) HL(s2*(A/2-.35),t*(B/2-.35),s2*R/2,0,14,HM.DR,.44); for(const s2 of [-1,1]) RE(s2*(R/2+.1),ye+RH-.22); }
      else { // 맞배: 박공판 · 박공 아래 벽(회벽) · 용마루 끝 취두
        for(const s2 of [-1,1]){ for(const t of [-1,1]) hipLine(yf,0,0,s2*(E0/2-.05),t*(D0/2-.05),s2*(E0/2-.05),0,14,o.bargeMat||HM.WDD,.16); K.b(s2*(E0/2-.5),ye+RH-.22,0,.8,1.0,.7,HM.DR);
          if(o.gableWall!==false) K.surf((u,v)=>{ const b=zb-.1+(D+.2)*u; const yt=yf(s2*W/2,b)-(R0.thk||.4); const y1=Y+CH+.4; return [s2*(W/2-.05),y1+(Math.max(y1,yt)-y1)*v,b,b/2,v]; },16,1,o.gableMat||HM.WH); } }
      // 현판
      if(o.plaque){ const hp=E.tex('h18_hp_'+o.plaque,128,(g,N)=>{ g.fillStyle='#2f2219'; g.fillRect(0,0,N,N); g.strokeStyle='#c9a24f'; g.lineWidth=7; g.strokeRect(5,5,N-10,N-10); g.fillStyle='#e7cf8a'; for(let k=0;k<3;k++) g.fillRect(18+k*32,N*.3,22,N*.4); }); const hm=new T.MeshStandardMaterial({map:hp,roughness:.7}); if(!hp) hm.color.setHex(0x2f2219).convertSRGBToLinear(); K.cur=g1; const w=o.plaqueW||2.2; const pm=new T.Mesh(boxG(w,.7,.1),[HM.WDD,HM.WDD,HM.WDD,HM.WDD,hm,HM.WDD]); pm.position.set(0,yb2-.05,zf+.35); pm.rotation.x=-.1; put(pm,false); }
      K.cur=null; return {yf,ye,RH,E0,D0,W,D,Y,CH,g1,g2,HL}; };
    // 배경 전각(K.life 인스턴스) — [x,y,z,w,d,벽높이,ry,kind('p' 팔작·'g' 맞배·'h' 우진각),지붕높이]
    const palG=(()=>{ const sg=(fn,nu,nv)=>{ const pos=[],idx=[]; for(let j=0;j<=nv;j++) for(let i=0;i<=nu;i++){ const p=fn(i/nu,j/nv); pos.push(p[0],p[1],p[2]); } for(let j=0;j<nv;j++) for(let i=0;i<nu;i++){ const a=j*(nu+1)+i, b=a+1, c=a+nu+1, d=c+1; idx.push(a,c,b,b,c,d); } const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(pos,3)); g.setIndex(idx); g.computeVertexNormals(); return g; };
      const mk=dt=>{ const EE=1.8, DD=1, R=EE-DD*(1-dt); const g=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),1.7); const yf=(a,b)=>{ const bb=Math.abs(b)/(DD/2); const ta=Math.abs(a)>R/2?(Math.abs(a)-R/2)/(DD/2)+dt:0; return (1-g(Math.max(bb,dt>=1?bb:ta)))+.12*Math.pow(Math.abs(a)/(EE/2),3)*Math.pow(bb,3); };
        const top=sg((u,v)=>{ const a=-EE/2+EE*u, b=-DD/2+DD*v; return [a,yf(a,b),b]; },24,10); const gs=[top]; if(dt>0){ for(const s of [-1,1]){ const sh=new T.Shape(); sh.moveTo(-dt*DD/2,1-g(dt)); sh.lineTo(0,1); sh.lineTo(dt*DD/2,1-g(dt)); const gg=new T.ShapeGeometry(sh); gg.rotateY(Math.PI/2); gg.translate(s*(dt>=1?EE/2-.1:R/2),0,0); gs.push(gg); } } const rg=new T.BoxGeometry(Math.max(.1,R)+.06,.07,.06); rg.translate(0,1.0,0); gs.push(rg); return E.mergeG(gs); };
      return {p:mk(.42),g:mk(1),h:mk(0)}; })();
    const LIFEH=(list,grp)=>{ grp=grp||K.life; const wl=[],bs=[],bnd=[],R={p:[],g:[],h:[]}; list.forEach(([x,y,z,w,d,h,ry,k,rh])=>{ bs.push([x,y-.6,z,ry||0,w+1.6,1.2,d+1.6]); wl.push([x,y+.6,z,ry||0,w,h,d]); bnd.push([x,y+.6+h-.4,z,ry||0,w+.15,.42,d+.15]); R[k||'p'].push([x,y+.6+h,z,ry||0,(w+2.6)/1.8,rh||Math.min(w,d)*.42+1.2,d+2.6]); });
      const fit=true; inst(boxG(1,1,1),HM.ST,bs,true,grp,fit); inst(boxG(1,1,1),HM.WH,wl,true,grp,fit); inst(boxG(1,1,1),HM.GRN,bnd,false,grp,fit); for(const k of ['p','g','h']) inst(palG[k],HM.GW,R[k],true,grp,fit); };
    // 지붕만(인스턴스) — [x,y(처마),z,w,d,ry,kind,지붕높이]
    const ROOFI=(items,grp)=>{ const R={p:[],g:[],h:[]}; items.forEach(([x,y,z,w,d,ry,k,rh])=>R[k||'g'].push([x,y,z,ry||0,(w+1.2)/1.8,rh,d+1.2])); for(const k of ['p','g','h']) inst(palG[k],HM.GW,R[k],true,grp||null,true); };

    // ===== 경주 양동마을 — 설창산에서 뻗은 네 줄기 능선(勿자) 위 기와집, 골짜기 초가, 앞은 안강 들판 =====
    // +z 남(마을 들머리·들판 쪽, 정면), +x 동. 능선 방향·높이, 가옥 위치·수, 큰 집 네 채의 위치·칸 구성은 지도·사진 감각의 개략(추정)
    const WD=K.col(0x7d6650,{roughness:.88}), WDD=K.col(0x5a4838,{roughness:.9}), WH=K.col(0xece5d4,{roughness:.97}), MUD=K.col(0xb99f7a,{roughness:1}), RU=K.col(0x5a4a3c), GW=K.M.giwa, ST=K.col(0xa9a294,{roughness:.95}), TH=K.col(0xbfa36c,{roughness:1}), PAPER=K.col(0xefe8d6,{roughness:.95});
    const STW=E.tmat(E.wallTex('yd_wall','#6a5d4c',['#9b8f7c','#a99c86','#8b7f6c','#b3a58e','#7f7563','#c0b39a'],56,46,110),0xa59a86,{tint:0xdcd2c0});
    // 능선 4줄(勿): 북(설창산)에서 남(들판)으로 — [x(남끝), x기울기, 폭]
    const RID=[[-150,.18,25],[-58,.1,28],[38,-.06,27],[128,-.16,25]];
    const base=z=>z>95?0:Math.min(40,(95-z)*.045+Math.pow(Math.max(0,-z-120)/90,1.6)*26);
    const ridgeH=z=>z>105?0:Math.min(70,(105-z)*.2);
    const rel=(x,z)=>{ let m=0; for(const [x0,k,w] of RID){ const xc=x0+k*(80-z); const t=(x-xc)/w; m=Math.max(m,ridgeH(z)*Math.exp(-t*t)); } return m; };
    // ---------- 0: 지형(능선·골짜기·들판·설창산) · 논 · 개울 · 숲 ----------
    K.layer(0); E.own();
    let TR;
    const MAN=[[-146,52,.15,26,24],[-50,34,.05,34,24],[44,-34,-.1,26,24],[124,-66,-.2,26,24]]; // 큰 집 터(축대 마당)
    const raw=(x,z)=>{ let h=base(z)+rel(x,z)+(E.fbm(x*.02,z*.02,3)-.5)*2.4*E.ss((95-z)/40);
        h+=E.peaks(x,z,[[-40,-640,720,380,110,1.1],[-420,-380,300,280,110,1.3],[380,-420,320,280,120,1.3],[-700,200,300,500,90,1.3],[760,160,320,520,100,1.3],[0,1500,1600,400,220,1.3]]);
        if(Math.abs(z-170)<9) h=Math.min(h,-2.2+Math.abs(z-170)*.05); return h; };
    const PADL=MAN.map(([x,z])=>raw(x,z));
    { const hf=(x,z)=>{ let h=raw(x,z); MAN.forEach(([cx,cz,ry,W,D],i)=>{ const c=Math.cos(ry), s=Math.sin(ry); const dx=x-cx, dz=z-cz; const u=Math.abs(dx*c-dz*s)-W/2, v=Math.abs(dx*s+dz*c)-D/2; const d=Math.max(u,v); if(d<10){ const t=E.ss(d/10); h=PADL[i]-.05+(h-PADL[i]+.05)*t; } }); return h; };
      TR=E.terrain(0,0,0,0,E.axis(3000,210,4.2),E.axis(3000,210,4.2,-40),hf,(x,z,h,ny)=>{ if(Math.abs(z-170)<8&&h<-1) return [.5,.48,.4];
          if(z>100&&z<900&&Math.abs(x)<1200&&h<4){ const q=E.vn(Math.floor(x/26)*7.1,Math.floor(z/18)*3.3); const edge=(((x%26)+26)%26<.8)||(((z%18)+18)%18<.8); if(edge) return [.42,.47,.3]; return [.56+.14*q,.62+.08*q,.3+.04*q]; } // 안강 들판 논(가을 들녘 빛)
          if(Math.abs(x+8-(z<95?(95-z)*.02:0))<2.2&&z>-140&&z<300) return [.74,.69,.57]; // 마을 길
          if(z>-170&&z<100&&Math.abs(x)<230){ const q=E.fbm(x*.05,z*.05,2); return [.47+.06*q,.55+.05*q,.33+.03*q]; } return E.mcol(x,z,h,ny,{far:900,farW:1400,cliff:.4}); });
      const wm=new T.Mesh(new T.PlaneGeometry(3000,14),E.WATER); wm.rotation.x=-Math.PI/2; wm.position.set(0,-1.7,170); K.life.add(wm);
      // 숲: 설창산·능선 뒤 소나무, 마을 안 큰 나무(느티·향나무), 능선 위 솔숲
      E.forest(E.scatter(-1400,1400,-1400,100,9,TR.h,(x,z,h)=>{ if(z>-150&&Math.abs(x)<230) return false; return E.r()<.88; },(x,z,h)=>9+E.vn(x*.05,z*.05)*7,(x,z)=>E.vn(x*.02+3,z*.02)<.65?1:0),{trunks:false});
      E.forest(E.scatter(-230,230,-170,95,9,TR.h,(x,z,h)=>rel(x,z)>10&&E.r()<.32,(x,z,h)=>9+E.r()*5,1),{trunks:true,cast:true});
      E.forest(E.scatter(-230,230,-150,100,16,TR.h,(x,z,h)=>E.r()<.07,(x,z,h)=>10+E.r()*6,0),{trunks:true,cast:true}); }
    // ---------- 가옥 인스턴스: 기와집(능선 높은 곳) · 초가(골짜기 낮은 곳) ----------
    const surfG=(fn,nu,nv)=>{ const pos=[],idx=[]; for(let j=0;j<=nv;j++) for(let i=0;i<=nu;i++){ const p=fn(i/nu,j/nv); pos.push(p[0],p[1],p[2]); } for(let j=0;j<nv;j++) for(let i=0;i<nu;i++){ const a=j*(nu+1)+i, b=a+1, c=a+nu+1, d=c+1; idx.push(a,c,b,b,c,d); } const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(pos,3)); g.setIndex(idx); g.computeVertexNormals(); return g; };
    const tileG=(()=>{ const EE=1.8, DD=1, dt=.42, R=EE-DD*(1-dt); const g=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),1.7); const yf=(a,b)=>{ const bb=Math.abs(b)/(DD/2); const ta=Math.abs(a)>R/2?(Math.abs(a)-R/2)/(DD/2)+dt:0; return (1-g(Math.max(bb,ta)))+.12*Math.pow(Math.abs(a)/(EE/2),3)*Math.pow(bb,3); };
      const top=surfG((u,v)=>{ const a=-EE/2+EE*u, b=-DD/2+DD*v; return [a,yf(a,b),b]; },24,10); const gs=[top]; for(const s of [-1,1]){ const sh=new T.Shape(); sh.moveTo(-dt*DD/2,1-g(dt)); sh.lineTo(0,1); sh.lineTo(dt*DD/2,1-g(dt)); const gg=new T.ShapeGeometry(sh); gg.rotateY(Math.PI/2); gg.translate(s*R/2,0,0); gs.push(gg); } const rg=new T.BoxGeometry(R+.06,.06,.05); rg.translate(0,1.0,0); gs.push(rg); return E.mergeG(gs); })();
    const thG=(()=>{ return surfG((u,v)=>{ const a=-.9+1.8*u, b=-.5+v; const q=Math.pow(Math.pow(Math.abs(a/.9),4)+Math.pow(Math.abs(b/.5),4),.25); return [a,Math.max(0,Math.pow(Math.max(0,1-q),.45))-.04,b]; },26,14); })(); thG.computeVertexNormals();
    const HS=[];
    const house=(x,z,ry,kind,L,Dp,wing)=>{ const cs=Math.cos(ry), sn=Math.sin(ry); const P=(lx,lz)=>[x+lx*cs+lz*sn,z-lx*sn+lz*cs]; const wh=kind==='tile'?2.6:2.2, rh=kind==='tile'?2.6:2.1;
      const parts=[[0,0,L,Dp,0]]; if(wing) parts.push([L/2-Dp/2,Dp/2+wing/2,Dp,wing,1]);
      for(const [lx,lz,w,d,rot] of parts){ const [px,pz]=P(lx,lz); const a=ry+(rot?Math.PI/2:0); HS.push({k:kind,x:px,z:pz,a,w:rot?d:w,d:rot?w:d,wh,rh}); } };
    const busy=[[-146,52,26],[-50,34,30],[44,-34,26],[124,-66,26]]; // 큰 집 자리(관가정·향단·무첨당·서백당)
    { let sd=11; const rr=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
      for(let gz=-150;gz<=92;gz+=17) for(let gx=-215;gx<=215;gx+=17){ const x=gx+(rr()-.5)*8, z=gz+(rr()-.5)*8; if(busy.some(([bx0,bz0,br])=>Math.hypot(x-bx0,z-bz0)<br)) continue; if(Math.abs(x+8-(95-z)*.02)<6) continue; const r=rel(x,z); const slope=Math.abs(TR.h(x+3,z)-TR.h(x-3,z))/6+Math.abs(TR.h(x,z+3)-TR.h(x,z-3))/6; if(slope>.55) continue;
        const pTile=r>9?.62:r>4?.3:.06; const pAny=r>14?.45:.6; if(rr()>pAny) continue; const tile=rr()<pTile; const ry=(rr()-.5)*.6+(x>0?-.12:.12); const L=tile?11+rr()*5:8+rr()*3, Dp=tile?5.4:4.6; house(x,z,ry,tile?'tile':'th',L,Dp,rr()<(tile?.6:.3)?(tile?7:5):0); } }
    // 집마다 땅 높이에 맞춘 축대(돌 기단) — 경사 아래쪽이 비지 않게 지면 아래까지 내림
    { const wT=[],wM=[],rT=[],rH=[],sT=[],dm=[],wl=[],cap=[]; HS.forEach(h=>{ const c=Math.cos(h.a), s=Math.sin(h.a); let hi=-1e9, lo=1e9; for(const [u,v] of [[0,0],[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]]){ const px=h.x+(u*h.w)*c+(v*h.d)*s, pz=h.z-(u*h.w)*s+(v*h.d)*c; const y=TR.h(px,pz); hi=Math.max(hi,y); lo=Math.min(lo,y); } const y=hi+.05; h.y=y; const ww=Math.max(1,h.w-1.0), dd=Math.max(1,h.d-1.2);
        sT.push([h.x,lo-.6,h.z,h.a,h.w+.2,y-lo+.6+.45,h.d+.4]); (h.k==='tile'?wT:wM).push([h.x,y+.45,h.z,h.a,ww,h.wh,dd]);
        if(h.k==='tile') rT.push([h.x,y+.45+h.wh-.15,h.z,h.a,(h.w+1.6)/1.8,h.rh,h.d+1.8]); else rH.push([h.x,y+.45+h.wh-.25,h.z,h.a,(h.w+1.4)/1.8,h.rh,h.d+1.4]);
        const nx=Math.sin(h.a), nz=Math.cos(h.a); for(const u of [-.22,.18]){ const ux=Math.cos(h.a)*u*ww, uz=-Math.sin(h.a)*u*ww; dm.push([h.x+ux+nx*(dd/2+.03),y+.6,h.z+uz+nz*(dd/2+.03),h.a,1.1,1.7,.05]); }
        if(h.k==='tile'&&h.w>9){ const W=h.w+5, D=h.d+7; const P=(lx,lz)=>[h.x+lx*c+lz*s,h.z-lx*s+lz*c]; for(const [lx,lz,w,d] of [[0,-D/2,W,.5],[-W/2,0,.5,D],[W/2,0,.5,D]]){ const [px,pz]=P(lx,lz); const yy=TR.h(px,pz); wl.push([px,yy-.4,pz,h.a,w,1.9,d]); cap.push([px,yy+1.5,pz,h.a,w+.2,.22,d+.3]); } } });
      K.layer(1); const mk=(geo,mat,items,cast)=>inst(geo,mat,items,cast,null,true);
      mk(boxG(1,1,1),ST,sT,true); mk(boxG(1,1,1),WH,wT,true); mk(boxG(1,1,1),MUD,wM,true); mk(boxG(1,1,1),K.col(0x5a4636,{roughness:.9}),dm,false); mk(boxG(1,1,1),K.col(0x9d9384,{roughness:.95}),wl,true); mk(boxG(1,1,1),RU,cap,false);
      K.layer(2); mk(tileG,GW,rT,true); mk(thG,TH,rH,true); }
    // ---------- 1·2: 큰 집 — 축대 위 ㅁ자 안채 + 사랑채 + 대문(칸 구성 개략) ----------
    const manor=(cx,cz,ry,o)=>{ // 발자국 높이를 재서 축대를 쌓고 그 위에 지음
      const W2=o.W||(o.L+12), D2=o.D||32; let hi=-1e9, lo=1e9; const c=Math.cos(ry), s=Math.sin(ry); for(let u=-.5;u<=.5;u+=.25) for(let v=-.5;v<=.5;v+=.25){ const px=cx+u*W2*c+v*D2*s, pz=cz-u*W2*s+v*D2*c; const y=TR.h(px,pz); hi=Math.max(hi,y); lo=Math.min(lo,y); }
      const Y0=o.y+.35; K.layer(0); tbox(cx,o.y-1.2,cz,W2+1,1.55,D2+1,STW,2.2,ry);
      const mk=i=>{ const g=new T.Group(); g.position.set(cx,Y0,cz); g.rotation.y=ry; K.layer(i).add(g); return g; }; const G1=mk(1), G2=mk(2); const L1=()=>{ K.cur=G1; }, L2=()=>{ K.cur=G2; };
      const wing=(lx,lz,L,D,rot,H,o2)=>{ o2=o2||{}; L1(); const y0=o2.y||.6; const W=rot?D:L, Dd=rot?L:D; K.b(lx,0,lz,W+1,y0,Dd+1,ST); K.b(lx,y0,lz,W-1,H,Dd-1,WH);
        const n=Math.max(2,Math.round(L/2.6)); const cl=[]; for(let i=0;i<=n;i++){ const t=-L/2+.4+(L-.8)*i/n; for(const s2 of [-1,1]) cl.push(rot?[lx+s2*(D/2-.3),y0,lz+t]:[lx+t,y0,lz+s2*(D/2-.3)]); } inst(cylG(.15,H+.1,8,.14),WD,cl);
        const dm=[]; for(let i=0;i<n;i++){ const t=-L/2+.4+(L-.8)*(i+.5)/n; if(rot) dm.push([lx+D/2-.48,y0+.35,lz+t,Math.PI/2,1.6,H-.9,.06]); else dm.push([lx+t,y0+.35,lz+D/2-.48,0,1.6,H-.9,.06]); } inst(boxG(1,1,1),PAPER,dm);
        K.b(lx,y0+H,lz,W+.2,.3,Dd+.2,WDD); L2(); roofHF(lx,y0+H+.3,lz,L+2.2,D+2.2,o2.rh||2.6,{dt:o2.gable?1:.42,mat:GW,under:RU,thk:.3,sori:.45,gmat:WD,rh:.4,swap:!!rot}); L1(); };
      o.wings.forEach(w=>wing(...w));
      // 솟을대문 · 담
      L1(); const gx=o.gate[0], gz=o.gate[1]; K.b(gx,0,gz,3.6,.4,4.6,ST); K.b(gx,.4,gz+2.1,2.6,3.0,.2,K.col(0x4a3a2c,{roughness:.85})); for(const s2 of [-1,1]) for(const t of [-1,1]) K.c(gx+s2*1.4,.4,gz+t*1.9,.16,3.6,WD,8); K.b(gx,3.9,gz,3.4,.3,4.4,WDD); L2(); roofHF(gx,4.2,gz,4.6,6.0,1.8,{dt:1,mat:GW,under:RU,thk:.25,sori:.3,gmat:WD,rh:.36,swap:true}); L1();
      for(const [lx,lz,w,d] of [[0,-D2/2,W2,.6],[-W2/2,0,.6,D2],[W2/2,0,.6,D2],[(-W2/2+gx-2)/2,D2/2,gx-2+W2/2,.6],[(W2/2+gx+2)/2,D2/2,W2/2-gx-2,.6]]){ tbox(lx,0,lz,w,1.7,d,STW,2.2); K.b(lx,1.7,lz,w+.3,.2,d+.3,RU); }
      K.cur=null; };
    // 관가정(손중돈 옛집) — 남쪽 능선 끝, 들판을 내려다봄: ㅁ자 + 오른쪽 앞 사랑 대청
    manor(-146,52,.15,{y:PADL[0],W:26,D:24,wings:[[0,-7,16,5,0,2.7,{rh:2.7}],[-6,-1,7,5,1,2.5],[6,-1,7,5,1,2.5],[-2,5,11,4.6,0,2.4,{gable:true}],[8,5,8,5.2,0,2.8,{y:1.1,rh:2.8}]],gate:[-6,10]});
    // 향단(이언적이 경상감사 때 지음) — 들머리에서 보이는 경사지, 두 마당을 품은 겹 ㅁ자(用자) 구성
    manor(-50,34,.05,{y:PADL[1],W:34,D:24,wings:[[0,-7.5,26,5,0,2.7,{rh:2.8}],[-11,-1.5,8,5,1,2.5],[0,-1.5,8,4.6,1,2.5],[11,-1.5,8,5,1,2.5],[-6,4.5,13,4.6,0,2.5,{gable:true}],[7,4.5,11,5.2,0,2.9,{y:1.2,rh:2.9}]],gate:[-11,10]});
    // 무첨당(여강 이씨 종가 별당) — ㄱ자 별당 + 안채
    manor(44,-34,-.1,{y:PADL[2],W:26,D:24,wings:[[0,-7,15,5,0,2.6,{rh:2.6}],[-5.5,-1,7,5,1,2.4],[5.5,-1,7,5,1,2.4],[-1,5,9,4.6,0,2.4,{gable:true}],[8,4.5,9,5.4,0,2.9,{y:1.2,rh:3.0}],[11,-1,6,5,1,2.9,{y:1.2,rh:3.0}]],gate:[-6,10]});
    // 서백당(월성 손씨 종가) — 마을 안쪽 능선, ㅁ자 안채 + 사랑채
    manor(124,-66,-.2,{y:PADL[3],W:26,D:24,wings:[[0,-7,16,5,0,2.7,{rh:2.7}],[-6,-1,7,5,1,2.5],[6,-1,7,5,1,2.5],[-2,5,11,4.6,0,2.4,{gable:true}],[7,5,9,5.2,0,2.8,{y:1.1,rh:2.8}]],gate:[-7,10]});
    tidy(0);

  }});
