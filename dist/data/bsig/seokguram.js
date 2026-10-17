__bsigFill({"seokguram":function(K){
// 출처: 문화체육관광부 「석굴암」 — 751 경덕왕 때 김대성 시작, 774 혜공왕 때 완공, 방형 전실·통로(사천왕)·원형 주실, 천장 판석 360여 개, 본존불 높이 350 cm · Wikipedia 「Seokguram」 — 주실 지름 6.58~6.8 m, 본존불 3.5 m·연화대좌 1.34 m, 일제 보수 1913~15, 1960년대 복원 때 목조 전실 건물·온습도 설비, 유리벽 너머 관람
// 추정: 벽 높이 3.3 m·돔 높이 4.6 m(바닥~덮개돌 약 7.9 m), 비도 길이 3 m·폭 3 m, 전실 6.6 × 4.6 m, 콘크리트 층 두께·공기층, 봉분 크기(지름 21 m·높이 11.5 m), 목조 전각 3칸·팔작 치수, 앞마당 석축
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

    // ===== 석굴암 — 토함산 중턱, 흙 봉분 속 화강암 돔(주실) + 비도 + 전실, 앞에 1960년대 목조 전각 =====
    // 모형은 동쪽(+x) 절반을 잘라 속(주실 돔·본존불·두 겹 콘크리트 돔)을 보여 주는 절개 모형
    const GR=K.col(0xd9d3c6,{roughness:.9}), GR2=K.col(0xc4bdb0,{roughness:.92}), GR3=K.col(0xa8a194,{roughness:.95}), CON=K.col(0x9c9a95,{roughness:.9}), CON2=K.col(0xb7b4ad,{roughness:.9}), EAR=K.col(0x7a6448,{roughness:1}), SOD=K.col(0x6f8a4a,{roughness:1}), RED=K.col(0x8e3a2a,{roughness:.8}), WD=K.col(0x6b4b36,{roughness:.85}), WH=K.col(0xe6e0d2,{roughness:.95}), RU=K.col(0x5a4a3c), GW=K.M.giwa, GRN=K.col(0x3d6b5a,{roughness:.85}), BLU=K.col(0x3f6b86,{roughness:.85}), OC=K.col(0xc8875a,{roughness:.85}), DR=K.col(0x2b2a28), ST=K.col(0xb8b1a3,{roughness:.95});
    const GLS=new T.MeshStandardMaterial({color:0xcfe0e6,roughness:.04,metalness:.55,transparent:true,opacity:.28,side:T.DoubleSide}); GLS.color.convertSRGBToLinear();
    const MUL=K.col(0x3a3d40,{roughness:.4,metalness:.7});
    const STW=E.tmat(E.wallTex('sgr_wall','#4f4a42',['#a8a294','#b6b0a1','#989284','#c1baa9','#8d887b'],70,60,150),0xb1aa9d,{tint:0xd6d0c4});
    const STONE=E.tmat(E.wallTex('sgr_dome','#7d776c',['#d6d0c3','#cdc6b8','#e0dacd','#c4bdaf'],110,150,260),0xd9d3c6,{tint:0xf0ebe0,side:T.DoubleSide});
    const MAS=E.tmat(E.masTex(),0xd2c6a6,{tint:0xe2d9c4});
    const RC=3.4, CZ=-6.2, WALLH=3.3, DOMEH=4.6; // 주실 반지름(지름 6.8 m) · 벽 높이·돔 높이(추정) · 주실 중심 z
    // ---------- 0: 지형(토함산 사면) · 앞마당 석축 · 계단 ----------
    K.layer(0); E.own();
    { const pads=[[-15,15,-19,15.5,0],[-6,6,15.5,40,-6]];
      const base=(x,z)=>{ let h; if(z<-19) h=(-19-z)*.55; else if(z<16) h=0; else h=-(z-16)*.36; h-=Math.max(0,Math.abs(x)-24)*(z>-19?.18:0); h+=E.peaks(x,z,[[-40,-360,420,260,230,1.2],[-420,-120,260,300,170,1.3],[380,-200,240,260,150,1.3]])*E.ss((Math.hypot(x,z+6)-40)/80); h+=(E.fbm(x*.03,z*.03,3)-.5)*5*E.ss((Math.hypot(x,z)-34)/50);
        if(z>16) h=Math.max(h-Math.max(0,z-200)*.25,-330); return h; };
      const hf=(x,z)=>{ let h=base(x,z); for(const [a0,a1,b0,b1,top] of pads){ if(x>a0-.5&&x<a1+.5&&z>b0-.5&&z<b1+.5) h=Math.min(h,top-.3); } return h; };
      const TR=E.terrain(0,0,0,0,E.axis(2600,150,4.4),E.axis(2600,150,4.4,300),hf,(x,z,h,ny)=>E.mcol(x,z,h,ny,{far:420,farW:900,cliff:.5}));
      // 동해(멀리 앞쪽) — 산 아래 바다
      const sg=new T.PlaneGeometry(9000,5000); sg.rotateX(-Math.PI/2); sg.translate(0,-300,4200); const sm=new T.Mesh(sg,E.WATER); K.life.add(sm);
      E.forest(E.scatter(-760,760,-760,700,8,TR.h,(x,z,h)=>{ if(x>-24&&x<24&&z>-34&&z<44) return false; if(Math.abs(x)<5&&z>30&&z<120) return false; if(z>10&&Math.hypot(x,z+6)<110&&x>-10) return false; return Math.hypot(x,z)<800&&E.r()<.9; },(x,z,h)=>8+E.vn(x*.05,z*.05)*7,(x,z,h)=>E.vn(x*.03+3,z*.03)<.5?1:0),{trunks:false});
      E.forest([[-20,TR.h(-20,-2),-2,10,1,.3,1],[-19,TR.h(-19,10),10,9,0,.6,1],[19,TR.h(19,-20),-20,11,1,.5,1],[-17,TR.h(-17,-22),-22,12,1,.8,1],[-21,TR.h(-21,24),24,9,0,.2,1]],{cast:true});
      const pg=new T.PlaneGeometry(4,90); pg.rotateX(-Math.PI/2); for(let i=0;i<pg.attributes.position.count;i++){ const z=pg.attributes.position.getZ(i)+62; pg.attributes.position.setY(i,TR.h(0,z)+.06); } pg.translate(0,0,62); const pm=new T.Mesh(pg,MAS); pm.receiveShadow=true; K.life.add(pm); }
    tbox(0,-7,-1.75,30,7,34.5,STW,4.5); K.b(0,-.02,-1.75,30.4,.24,34.9,ST); K.b(0,.2,-1.75,29.6,.04,34.1,MAS); // 앞마당 석축(추정) · 마사토
    { const gs=[]; const n=16, rise=6/n, run=.42; for(let k=0;k<n;k++) gs.push(bx(0,-6.4,15.5+(k+.5)*run,3.2,6.4+.2-(k+1)*rise+.2,run)); for(const s of [-1,1]) gs.push(bx(s*1.85,-6.4,15.5+n*run/2,.5,6.8,n*run)); merge(gs,ST); }
    // ---------- 1: 주실(원형 돔)·비도·전실 — 화강암 ----------
    K.layer(1);
    const Y0=.24; K.b(0,Y0-.05,CZ,7.4,.12,7.4,GR3); // 주실 바닥(추정)
    // 절개 창: 동남동쪽(φ1~φ2, +z에서 +x 쪽으로 잰 각) 부채꼴을 잘라 속을 보임 — 앞쪽 비도 입구(반각 OPEN)는 원래 열림
    const OPEN=.47, F1=.62, F2=1.78; const segs=[[OPEN,F1],[F2,2*Math.PI-OPEN]];
    const arc=(r0,r1,h,y,p0,p1,mat)=>{ const sh=new T.Shape(); const n=Math.max(4,Math.round((p1-p0)*8)); for(let i=0;i<=n;i++){ const a=p0+(p1-p0)*i/n; const p=[Math.sin(a)*r1,Math.cos(a)*r1]; i?sh.lineTo(p[0],p[1]):sh.moveTo(p[0],p[1]); } for(let i=n;i>=0;i--){ const a=p0+(p1-p0)*i/n; sh.lineTo(Math.sin(a)*r0,Math.cos(a)*r0); } const g=new T.ExtrudeGeometry(sh,{depth:h,bevelEnabled:false,curveSegments:4}); g.rotateX(Math.PI/2); g.translate(0,y+h,CZ); const m=new T.Mesh(g,mat); m.material=mat; return put(m); };
    for(const [p0,p1] of segs) arc(RC,RC+.55,WALLH,Y0,p0,p1,STONE); arc(RC,RC+.55,.6,Y0,F1,F2,STONE); // 원형 벽(절개 창 쪽은 밑단만)
    const inWin=a=>{ a=((a%(2*Math.PI))+2*Math.PI)%(2*Math.PI); return (a>F1-.05&&a<F2+.05)||a<OPEN+.05||a>2*Math.PI-OPEN-.05; };
    // 벽 아래 판석 부조(보살·나한 등 15) · 위 감실(10)
    { const pn=[],fg=[],nc=[]; for(let i=0;i<15;i++){ const a=OPEN+.18+(2*Math.PI-2*OPEN-.36)*i/14; if(inWin(a)) continue; const x=Math.sin(a)*(RC-.04), z=CZ+Math.cos(a)*(RC-.04); pn.push([x,Y0+.25,z,a+Math.PI,1,1,1]); fg.push([x-Math.sin(a)*.06,Y0+.45,z-Math.cos(a)*.06,a+Math.PI,1,1,1]); }
      for(let i=0;i<10;i++){ const a=OPEN+.3+(2*Math.PI-2*OPEN-.6)*i/9; if(inWin(a)) continue; const x=Math.sin(a)*(RC-.02), z=CZ+Math.cos(a)*(RC-.02); nc.push([x,Y0+2.4,z,a+Math.PI]); }
      inst(boxG(1.05,2.0,.12),GR2,pn); inst(boxG(.42,1.65,.1),K.col(0xe6e1d6,{roughness:.85}),fg); inst(boxG(.62,.8,.16),K.col(0x6e695f),nc); }
    // 돔 단면 윤곽: a(0~1)를 따라 [r,y] — 돌 돔 안쪽·바깥, 일제 콘크리트, 1960년대 바깥 콘크리트 돔(사이 공기층), 봉분
    const domeIn=t=>{ const a=t*Math.PI/2*.94; return [Math.max(.9,Math.cos(a)*RC),Y0+WALLH+Math.sin(a)*DOMEH]; };
    const domeOut=t=>{ const p=domeIn(t); return [p[0]+.5,p[1]+.25]; };
    const shellP=(off,dy)=>t=>{ const a=t*Math.PI/2; return [Math.max(.05,Math.cos(a)*(RC+off)),Y0+WALLH*.2+Math.sin(a)*(DOMEH+WALLH*.8+off*.9+dy)]; };
    const S1=shellP(1.0,.2), S1o=shellP(1.35,.2), S2=shellP(2.2,.5), S2o=shellP(2.6,.5);
    const RM=10.5, HM=11.5; const my=r=>{ const q=1-(r/RM)*(r/RM); return q>0?HM*Math.pow(q,.62):0; };
    const lathe=(f,mat,p0,p1,n)=>{ const pts=[]; for(let i=0;i<=(n||14);i++){ const p=f(i/(n||14)); pts.push(new T.Vector2(p[0],p[1])); } const g=new T.LatheGeometry(pts,Math.max(4,Math.round((p1-p0)*7)),p0,p1-p0); g.translate(0,0,CZ); const m=new T.Mesh(g,mat); return put(m); };
    const DS=m=>{ const c=m.clone(); c.side=T.DoubleSide; return c; }; const CONd=DS(CON), CON2d=DS(CON2), GR3d=DS(GR3);
    for(const [p0,p1] of segs){ lathe(domeIn,STONE,p0,p1); lathe(domeOut,GR3d,p0,p1); }
    for(const [p0,p1] of [[.4,F1],[F2,2*Math.PI-.4]]){ lathe(S1,CONd,p0,p1); lathe(S1o,CONd,p0,p1); lathe(S2,CON2d,p0,p1); lathe(S2o,CON2d,p0,p1); }
    // 쐐기돌(주먹돌) 세 줄 · 연꽃 덮개돌
    { const pegs=[]; [[.28,10],[.52,10],[.74,10]].forEach(([t,n])=>{ const p=domeIn(t); for(let i=0;i<n;i++){ const a=(i+.5)*2*Math.PI/n; if(inWin(a)) continue; pegs.push([Math.sin(a)*(p[0]-.18),p[1]-.15,CZ+Math.cos(a)*(p[0]-.18),a,1,1,1]); } }); inst(boxG(.36,.3,.5),GR2,pegs);
      const lot=new T.CylinderGeometry(1.05,1.05,.32,24); lot.translate(0,Y0+WALLH+DOMEH-.3,CZ); put(new T.Mesh(lot,GR2)); }
    // 봉분(흙·잔디) — 극좌표 격자. 절개 창 부채꼴과 목조 전각 자리(|x|<4.7, z>-2.2)는 비움
    { const NR=18, NA=72; const P=new Float32Array((NR+1)*(NA+1)*3); for(let j=0;j<=NA;j++) for(let i=0;i<=NR;i++){ const r=RM*i/NR, a=j/NA*2*Math.PI, k=(j*(NR+1)+i)*3; P[k]=Math.sin(a)*r; P[k+1]=my(r)-.05; P[k+2]=CZ+Math.cos(a)*r; } const I=[]; for(let j=0;j<NA;j++) for(let i=0;i<NR;i++){ const r=RM*(i+.5)/NR, a=(j+.5)/NA*2*Math.PI; const x=Math.sin(a)*r, z=CZ+Math.cos(a)*r; if(a>F1&&a<F2) continue; if(Math.abs(x)<4.7&&z>-2.2) continue; const q=j*(NR+1)+i; I.push(q,q+1,q+NR+1,q+1,q+NR+2,q+NR+1); } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(P,3)); g.setIndex(I); g.computeVertexNormals(); put(new T.Mesh(g,DS(SOD))); }
    // 절개면(φ1·φ2): 층마다 띠 — 흙 / 바깥 콘크리트 / 공기층 / 안 콘크리트 / 돌 돔
    { const band=(fo,fi,mat,ph,n)=>{ const sh=new T.Shape(); n=n||14; for(let i=0;i<=n;i++){ const p=fo(i/n); i?sh.lineTo(p[0],p[1]):sh.moveTo(p[0],p[1]); } for(let i=n;i>=0;i--){ const p=fi(i/n); sh.lineTo(p[0],p[1]); } const g=new T.ShapeGeometry(sh); g.rotateY(ph-Math.PI/2); g.translate(0,0,CZ); return put(new T.Mesh(g,DS(mat))); };
      const mound=t=>{ const r=RM*(1-t); return [Math.max(.05,r),my(r)]; }; const s2b=t=>{ const p=S2o(1-t); return p; };
      for(const ph of [F1,F2]){ band(t=>{ const r=RM*(1-t)*(1-.0)+(RC+2.6)*0; return [Math.max(.05,RM*(1-t)),my(RM*(1-t))]; },t=>{ const p=S2o(1-t); return [p[0],p[1]]; },EAR,ph,20); band(S2o,S2,CON2,ph); band(S1o,S1,CON,ph); band(domeOut,domeIn,GR3,ph); }
      // 바닥 흙(봉분 밑) 띠: 지면~바깥 돔 밑
      // 앞쪽(전각 뒤) 흙벽: z=-2.2, |x|<4.7, 비도 천장 위
      const fw=new T.Shape(); const fp=[[-4.7,my(Math.hypot(4.7,-2.2-CZ))]]; for(let k=0;k<=16;k++){ const x=-4.7+9.4*k/16; fp.push([x,Math.max(5.3,my(Math.hypot(x,-2.2-CZ)))]); } fp.push([4.7,5.3]); fp.push([-4.7,5.3]); fp.forEach(([x,y],i)=>i?fw.lineTo(x,y):fw.moveTo(x,y)); const fg=new T.ShapeGeometry(fw); fg.translate(0,0,-2.2); put(new T.Mesh(fg,DS(SOD)));
      for(const s of [-1,1]){ const sw=new T.Shape(); const zz=[]; for(let k=0;k<=10;k++){ const z=-2.2+(CZ+Math.sqrt(RM*RM-4.7*4.7)+2.2)*k/10; zz.push([z,my(Math.hypot(4.7,z-CZ))]); } sw.moveTo(-2.2,0); zz.forEach(([z,y])=>sw.lineTo(z,y)); sw.lineTo(zz[zz.length-1][0],0); const sg=new T.ShapeGeometry(sw); sg.rotateY(-Math.PI/2); sg.translate(s*4.7,0,0); put(new T.Mesh(sg,DS(EAR))); } }
    // 본존불(높이 약 3.5 m, 연화대좌 1.34 m) — 중심보다 약간 뒤, 앞(+z)을 봄
    { const bz=CZ-.55, y=Y0; const gs=[]; const oct=(r,h,r2,yy)=>{ const g=new T.CylinderGeometry(r2===undefined?r:r2,r,h,16); g.translate(0,yy+h/2,bz); return g; };
      gs.push(oct(1.25,.3,1.1,y),oct(.95,.35,.7,y+.3),oct(.55,.25,.55,y+.65),oct(.75,.24,1.05,y+.9),oct(1.1,.2,1.1,y+1.14)); merge(gs,GR2);
      const by=y+1.34; const body=[]; const ell=(rx,ry,rz,x,yy,z)=>{ const g=new T.SphereGeometry(1,20,14); g.scale(rx,ry,rz); g.translate(x,yy,z); return g; };
      body.push(ell(1.3,.42,.85,0,by+.38,bz+.1)); // 결가부좌 다리
      body.push(ell(.78,1.05,.55,0,by+1.25,bz-.05)); // 몸통
      body.push(ell(.95,.38,.55,0,by+1.92,bz-.08)); // 어깨
      body.push(ell(.24,.62,.24,-.82,by+1.3,bz+.05),ell(.24,.62,.24,.82,by+1.3,bz+.05)); // 팔
      body.push(ell(.2,.15,.3,.35,by+.72,bz+.62),ell(.22,.14,.3,-.25,by+.72,bz+.62)); // 손(항마촉지인 약식)
      body.push(ell(.17,.2,.17,0,by+2.18,bz-.05)); // 목(삼도)
      body.push(ell(.4,.5,.42,0,by+2.65,bz-.03)); body.push(ell(.3,.22,.3,0,by+3.12,bz-.06)); // 머리 · 육계
      body.push(ell(.08,.2,.07,-.42,by+2.5,bz),ell(.08,.2,.07,.42,by+2.5,bz)); // 귀
      merge(body,K.col(0xe9e4d8,{roughness:.75}));
      const halo=new T.Mesh(new T.CircleGeometry(.95,32),K.col(0xd2ccbf,{roughness:.85})); halo.position.set(0,Y0+WALLH+.7,CZ-RC+.08); put(halo,false); } // 뒷벽 연꽃 광배(돌)
    // 비도(통로, 사천왕 부조) — 길이 약 3 m(추정), 반원 천장 · 입구 팔각기둥 2
    { const z0=CZ+RC-.1, z1=z0+3.0, zm=(z0+z1)/2; for(const s of [-1,1]){ K.b(s*1.75,Y0,zm,.5,3.0,3.0,STONE); inst(boxG(.9,2.3,.1),GR2,[[s*1.48,Y0+.3,zm-.7,s*Math.PI/2],[s*1.48,Y0+.3,zm+.7,s*Math.PI/2]]); }
      const vg=new T.CylinderGeometry(2.0,2.0,3.0,18,1,true,-Math.PI/2,Math.PI); vg.rotateX(Math.PI/2); vg.translate(0,Y0+3.0,zm); const vm=put(new T.Mesh(vg,STONE));
      for(const s of [-1,1]) K.c(s*1.45,Y0,z0+.1,.2,3.4,GR,8);
      K.b(0,Y0-.05,zm,3.0,.12,3.0,GR3); }
    // 전실(방형, 팔부중·금강역사 부조) — 폭 약 6.6 m · 깊이 4.6 m(추정)
    { const z0=CZ+RC+2.9, z1=z0+4.6, zm=(z0+z1)/2; for(const s of [-1,1]){ K.b(s*3.3,Y0,zm,.5,3.2,4.6,GR); inst(boxG(1.0,2.1,.1),GR2,[[s*3.02,Y0+.4,zm-1.15,s*Math.PI/2],[s*3.02,Y0+.4,zm+1.15,s*Math.PI/2]]); K.b(s*2.35,Y0,z0+.25,1.6,3.2,.5,GR); inst(boxG(.9,2.3,.1),GR2,[[s*2.35,Y0+.35,z0+.52]]); }
      K.b(0,Y0-.05,zm,6.6,.12,4.6,GR3); }
    // 유리 보호벽(비도 앞): 바닥~천장 강화유리 + 금속 멀리언
    { const zg=CZ+RC+2.75; const gl=new T.Mesh(new T.BoxGeometry(3.0,3.6,.04),GLS); gl.position.set(0,Y0+1.8,zg); gl.userData.glass=true; put(gl,false); const mu=[]; for(const x of [-1.5,-.5,.5,1.5]) mu.push([x,Y0,zg,0,1,1,1]); inst(boxG(.07,3.6,.1),MUL,mu); K.b(0,Y0+3.55,zg,3.1,.1,.12,MUL); K.b(0,Y0,zg,3.1,.08,.14,MUL); }
    // ---------- 2: 목조 전각(1960년대 복원 때 전실 위에 세움) — 정면 3칸, 팔작(치수 추정) ----------
    K.layer(2);
    { const z0=CZ+RC+2.75, zf=z0+5.4, zm=(z0+zf)/2, XS=[-4.4,-1.6,1.6,4.4]; K.b(0,-.02,zm+.4,10.6,.3,7.4,ST); // 기단
      const cs=[]; XS.forEach(x=>{ cs.push([x,Y0,zf],[x,Y0,z0]); }); inst(cylG(.24,3.8,12,.22),RED,cs); inst(cylG(.36,.16,8,.34),ST,cs.map(c=>[c[0],Y0,c[2]]));
      for(const s of [-1,1]) K.b(s*4.4,Y0,zm,.22,3.8,5.2,WH);
      // 정면: 양 협칸 띠살 창호 · 가운데 칸 열림(유리 너머 본존불이 보이는 축)
      const lat=E.tex('sgr_door',128,(g,N)=>{ g.fillStyle='#efe8d6'; g.fillRect(0,0,N,N); g.fillStyle='#6b4b36'; for(let x=4;x<N;x+=8) g.fillRect(x,0,2,N); for(const y of [8,60,112]) for(let k=0;k<3;k++) g.fillRect(0,y+k*5,N,2); g.fillRect(0,0,4,N); g.fillRect(N-4,0,4,N); g.fillRect(N/2-2,0,4,N); });
      const LM=new T.MeshStandardMaterial({map:lat,roughness:.9}); for(const s of [-1,1]){ const d=new T.Mesh(boxG(2.4,3.0,.1),[WD,WD,WD,WD,LM,WD]); d.position.set(s*3.0,Y0+.3,zf); put(d); K.b(s*3.0,Y0,zf,2.6,.3,.16,WD); K.b(s*3.0,Y0+3.3,zf,2.6,.5,.16,WH); }
      K.b(0,Y0+3.5,zf,3.0,.3,.16,WD);
      K.b(0,Y0+3.8,zf,9.4,.42,.32,GRN); K.b(0,Y0+3.8,z0,9.4,.42,.32,GRN); for(const s of [-1,1]) K.b(s*4.4,Y0+3.8,zm,.32,.42,5.6,GRN); // 창방(단청)
      { const a=[],b=[]; for(let x=-4.4;x<=4.41;x+=.7){ (Math.round(x/.7)%2?a:b).push([x,Y0+4.22,zf+.15]); } inst(boxG(.36,.5,.6),BLU,a); inst(boxG(.36,.5,.6),OC,b); } // 공포 띠
      K.b(0,Y0+4.7,zm,10.2,.35,6.4,RU);
      const yf=roofHF(0,Y0+4.75,zm+.3,13.4,9.0,3.4,{dt:.42,mat:GW,under:RU,thk:.34,sori:.7,gmat:WD,rh:.5}); const R=13.4-9*.58; for(const s of [-1,1]) for(const t of [-1,1]) hipLine(yf,0,zm+.3,s*6.3,t*4.1,s*R/2,t*.42*4.5,10,DR,.34);
      K.b(0,Y0+3.95,zf+.5,1.6,.55,.08,K.col(0x2e2a24)); // 현판(石窟庵)
    }
    // 앞마당 소품: 돌 난간 대신 낮은 목책·안내판(추정) 생략 — 비워 두어 진입 축을 살림

  }});
