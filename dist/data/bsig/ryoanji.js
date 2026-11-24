__bsigFill({"ryoanji":function(K){
// 출처: 석정 동서 25 m · 남북 10 m, 돌 15개 5·2·3·2·3 배치, 유채 기름을 섞은 흙담, 경용지는 경내 앞쪽을 차지 — tabi-mag 「龍安寺」 · 약 250 ㎡, 흰 자갈, 다진 흙담, 1499년 전승·에도 초기 지금 모습설 — 나라문화재연구소 일본정원 데이터베이스 「龍安寺方丈庭園」 · 동·남·서를 담이 두른 네모 마당, 5무리 15개 돌, 1499 방장 재건·1797 화재 뒤 1606년 서원원 방장 이축, 1976 수리 — 교토시 「龍安寺」 문화재 자료 · 약 248 ㎡(25 × 10 m), 돌 둘레 이끼 외 식물 없음, 담 지붕 1977년 나무껍질로 복원 — 영문 위키백과 「Ryōan-ji」 · 서쪽 담 남쪽 끝이 낮음 — ROHM 「龍安寺 石庭」
// 추정: 돌 무리별 위치·크기(공개 평면도를 직접 확인 못 해 사진 기억에 따른 배치 — 무리 순서 5·2·3·2·3과 '동쪽 큰 무리'만 출처 기준), 담 높이(1.85 → 서쪽 남단 1.5 m), 방장 평면(약 23 × 15 m)·지붕 높이, 고리 위치·크기, 경용지 위치·모양·높이차, 뒷산 지형
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

    const DW=K.col(0x4a3a2c,{roughness:.86}), DW2=K.col(0x6a5541,{roughness:.86}), DK=K.col(0x221d18,{roughness:.9}), RU=K.col(0x2f2620,{roughness:.9}), RD=K.col(0x2a2622,{roughness:.85}), MOSS=K.col(0x4c6a33,{roughness:1}), MOSS2=K.col(0x5d7a3a,{roughness:1});
    const ROCK=K.col(0x6f6a60,{roughness:.95,flatShading:true}), ROCK2=K.col(0x57534c,{roughness:.95,flatShading:true});
    // 흰 자갈 결: 동서 방향 곧은 결(조금 촘촘하게)
    const SANDT=(()=>{ const t=E.tex('ry_sand',256,(g,N,rr)=>{ g.fillStyle='#cdc8bc'; g.fillRect(0,0,N,N); for(let y=0;y<N;y+=8){ g.fillStyle='rgba(100,92,78,.45)'; g.fillRect(0,y,N,2.6); g.fillStyle='rgba(255,255,255,.45)'; g.fillRect(0,y+3.5,N,1.6); } for(let i=0;i<3200;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.25)':'rgba(90,85,75,.15)'; g.fillRect(rr()*N,rr()*N,1.3,1.3); } }); let t2=t; if(t){ t2=t.clone(); t2.needsUpdate=true; t2.repeat.set(3,3.2); } return E.tmat(t2,0xcdc8bc); })();
    // 돌 무리 둘레 동심원 결(원판 질감)
    const RINGT=E.tmat(E.tex('ry_ring',256,(g,N,rr)=>{ g.fillStyle='#cdc8bc'; g.fillRect(0,0,N,N); const c=N/2; for(let r=N/2-2;r>10;r-=9){ g.strokeStyle='rgba(100,92,78,.45)'; g.lineWidth=2.4; g.beginPath(); g.arc(c,c,r,0,7); g.stroke(); g.strokeStyle='rgba(255,255,255,.38)'; g.lineWidth=1.5; g.beginPath(); g.arc(c,c,r-3.5,0,7); g.stroke(); } for(let i=0;i<2000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.25)':'rgba(90,85,75,.15)'; g.fillRect(rr()*N,rr()*N,1.3,1.3); } }),0xcdc8bc);
    // 유채 기름 흙담: 황토·주황 바탕에 번진 얼룩과 흘러내린 자국
    const WALLT=E.tmat(E.tex('ry_wall',256,(g,N,rr)=>{ g.fillStyle='#b98a5c'; g.fillRect(0,0,N,N); const cs=['rgba(150,96,52,.35)','rgba(205,160,110,.35)','rgba(120,80,48,.30)','rgba(190,120,70,.30)','rgba(90,70,55,.22)']; for(let i=0;i<90;i++){ g.fillStyle=cs[Math.floor(rr()*cs.length)]; g.beginPath(); g.ellipse(rr()*N,rr()*N,8+rr()*40,5+rr()*22,0,0,7); g.fill(); } for(let i=0;i<60;i++){ g.fillStyle='rgba(80,55,38,.16)'; const x=rr()*N; g.fillRect(x,0,1.5+rr()*3,N*(.3+rr()*.6)); } for(let i=0;i<3500;i++){ g.fillStyle=rr()<.5?'rgba(255,235,200,.10)':'rgba(40,25,15,.12)'; g.fillRect(rr()*N,rr()*N,1.5,1.5); } }),0xb98a5c);
    // 담 한 구간: 길이 방향 L, 시작 높이 h0 → 끝 h1 (지붕 갓도 함께 기울임)
    const wallSeg=(x0,z0,x1,z1,h0,h1,t)=>{ const L=Math.hypot(x1-x0,z1-z0), ang=Math.atan2(-(z1-z0),x1-x0);
      const sh=(g,dy)=>{ const p=g.attributes.position; for(let i=0;i<p.count;i++){ const u=(p.getX(i)+L/2)/L; if(p.getY(i)>.001) p.setY(i,p.getY(i)+(h0+(h1-h0)*u)+(dy||0)-(p.getY(i)>.001?0:0)); } g.computeVertexNormals(); };
      const fin=(g,m,cast)=>{ g.rotateY(ang); g.translate((x0+x1)/2,0,(z0+z1)/2); const mm=new T.Mesh(g,m); return put(mm,cast); };
      // 몸체: 아래는 0, 위는 h(u)
      { const g=new T.BoxGeometry(L,1,t); g.translate(0,.5,0); const p=g.attributes.position, uv=g.attributes.uv; for(let i=0;i<p.count;i++){ const u=(p.getX(i)+L/2)/L, top=p.getY(i)>.5; p.setY(i,top?(h0+(h1-h0)*u):-.05); } for(let i=0;i<uv.count;i++) uv.setXY(i,uv.getX(i)*L/2.4,uv.getY(i)*1.0); g.computeVertexNormals(); fin(g,WALLT); }
      // 기단 띠(돌)
      { const g=new T.BoxGeometry(L,.22,t+.08); g.translate(0,.06,0); fin(g,J.ST2,false); }
      // 갓 지붕(나무껍질): 박공 단면 압출
      { const s=new T.Shape(); const hw=t/2+.32; s.moveTo(-hw,0); s.lineTo(0,.34); s.lineTo(hw,0); s.lineTo(hw,-.06); s.lineTo(-hw,-.06); s.closePath(); const g=new T.ExtrudeGeometry(s,{depth:L+.5,bevelEnabled:false}); g.translate(0,0,-(L+.5)/2); g.rotateY(Math.PI/2); const p=g.attributes.position; for(let i=0;i<p.count;i++){ const u=Math.min(1,Math.max(0,(p.getX(i)+L/2)/L)); p.setY(i,p.getY(i)+h0+(h1-h0)*u+.02); } g.computeVertexNormals(); fin(g,J.HIW); }
    };
    // ---------- 지형 · 뒷산 · 경용지 · 숲 ----------
    K.layer(0); E.own(); let TR;
    // 빌드 전에 렌더러가 K.life에 먼저 놓은 일반 나무(대지 가운데)를 숨김
    { const LM=[K.M.leaf1,K.M.leaf2,K.M.leaf3,K.M.trunk]; K.life.children.slice().forEach(o=>{ if(o.isMesh&&LM.includes(o.material)) o.visible=false; }); }
    const inPond=(x,z)=>{ const a=(x-38)/62, b=(z-96)/38; return a*a+b*b; };
    { const hf=(x,z)=>{ let h=(E.fbm(x*.02,z*.02,3)-.5)*1.6*E.ss((Math.hypot(x,z+6)-60)/40);
        h-=E.ss((z-16)/70)*7.5; // 남쪽(경용지 쪽)으로 내려감
        h+=E.peaks(x,z,[[-80,-420,380,260,95,1.3],[260,-620,520,360,150,1.25],[620,-160,320,300,120,1.3],[-520,-260,360,300,80,1.3],[-300,-900,700,300,170,1.2]]);
        const pd=inPond(x,z); if(pd<1.25) h=Math.min(h,-7.5-1.6*E.ss((1.25-pd)/.5));
        if(x>-42&&x<46&&z>-40&&z<20) h=Math.min(h,-.04); return h; };
      TR=E.terrain(0,0,0,0,E.axis(1500,150,4.2,0),E.axis(1500,150,4.2,0),hf,(x,z,h,ny)=>{ if(x>-42&&x<46&&z>-40&&z<20) return [.47,.5,.36]; if(inPond(x,z)<1.1) return [.32,.36,.30]; return E.mcol(x,z,h,ny,{far:700,farW:900,cliff:.3}); });
      { const sh=new T.Shape(); for(let i=0;i<48;i++){ const a=i/48*Math.PI*2; const r=1+.08*Math.sin(a*3)+.05*Math.cos(a*5); sh[i?'lineTo':'moveTo'](38+62*r*Math.cos(a),-(96+38*r*Math.sin(a))); } const g=new T.ShapeGeometry(sh); g.rotateX(-Math.PI/2); const m=new T.Mesh(g,E.WATER); m.position.y=-7.9; m.receiveShadow=true; K.life.add(m); }
      // 연못 섬(벤텐지마 등, 추정) · 숲
      E.forest([[20,0,92,9,1],[48,0,104,8,0],[30,0,86,7,1]].map(t=>[t[0],-7.6,t[2],t[3],t[4],E.r(),1]),{trunks:true});
      E.forest(E.scatter(-900,900,-900,700,9.5,TR.h,(x,z,h)=>{ if(x>-44&&x<48&&z>-42&&z<22) return false; if(inPond(x,z)<1.12) return false; if(Math.hypot(x,z)<150&&!J.clr(x,z,0,4,150)) return false; if(z>-6&&Math.hypot(x,z)<140) return false; return E.r()<.88; },(x,z,h)=>9+E.vn(x*.05,z*.05)*7,(x,z)=>E.vn(x*.02+3,z*.02)<.45?1:(E.r()<.18?3:0)),{trunks:false,pal:[['#4d6e3e','#5a7a45','#3f5d36','#b5552f','#6a8a4a'],null,null,null]});
      // 경내 나무: 담 밖 소나무·단풍·수양벚나무(서남 모퉁이) — 카메라 쐐기 피함
      const tr=[[-21,0,-6,11,1],[-18,0,-24,10,0],[-6,0,-26,11,1],[8,0,-27,10,0],[18,0,-26,9,1],[-26,0,-16,10,1],[42,0,-2,9,0],[40,0,-30,10,1]];
      E.forest(tr.filter(t=>J.clr(t[0],t[2],0,4,60)).map(t=>[t[0],-.04,t[2],t[3],t[4],E.r(),1]),{trunks:true,cast:true,pal:[['#4f7040','#b8452c','#5d7d45','#c26a2e'],null,null,null]});
      // 수양벚나무(담 서남 모퉁이 밖): 늘어진 둥근 수관(봄빛 분홍 약하게)
      { const g=new T.SphereGeometry(1,14,10); g.scale(3.6,2.7,3.6); const m=new T.Mesh(g,K.col(0xb39c94,{roughness:.95,flatShading:true})); m.position.set(-16,4.4,13.5); m.castShadow=true; K.life.add(m); const tk=new T.Mesh(cylG(.22,3.6,7,.16),K.M.trunk); tk.position.set(-16,0,13.5); K.life.add(tk); }
    }
    // ---------- 0: 석정 바닥 · 결 · 돌 무리 ----------
    K.layer(0);
    K.b(0,-.06,5,25,.12,10,SANDT); // 윗면 y .06
    // 돌 무리 [중심x, 중심z, 원판 반지름, 돌들[[dx,dz,가로,높이,세로,회전,색]]] — 동쪽(+x)부터 5·2·3·2·3 (추정 배치)
    const GR=[[7.6,4.6,2.1,[[0,0,1.7,.95,1.1,.3,0],[-1.0,.5,.9,.45,.7,1.1,1],[.9,.6,.8,.38,.6,.6,0],[.5,-.65,.7,.55,.55,2.1,1],[-.7,-.5,.55,.25,.5,.2,0]]],
              [3.2,7.6,1.2,[[0,0,1.0,.62,.75,.8,1],[.75,.35,.55,.3,.45,2.4,0]]],
              [-.6,3.6,1.55,[[0,0,1.3,.78,.85,1.9,0],[-.85,.4,.7,.36,.55,.4,1],[.8,.45,.6,.3,.5,1.2,1]]],
              [-4.6,6.8,1.15,[[0,0,.95,.5,.7,.5,0],[-.65,-.35,.5,.26,.42,1.7,1]]],
              [-9.2,4.8,1.6,[[0,0,1.2,.7,.9,2.6,1],[.9,.5,.75,.4,.6,.9,0],[-.6,-.55,.55,.3,.5,1.5,0]]]];
    { const disc=[], moss=[], r0=[], r1=[];
      GR.forEach(([cx,cz,R,st])=>{ const g=new T.CircleGeometry(R*1.2,40); g.rotateX(-Math.PI/2); g.translate(cx,.075,cz); disc.push(g);
        st.forEach(([dx,dz,w,h,d,ry,c])=>{ const mg=new T.CylinderGeometry(1,1,.06,14); mg.scale(w*.95+.2,1,d*.95+.2); mg.translate(cx+dx*1.15,.095,cz+dz); moss.push(mg); (c?r1:r0).push([cx+dx*1.15,h*.3,cz+dz*1.15,ry,w*.8,h*1.05,d*.8]); }); });
      merge(disc,RINGT,false); merge(moss,MOSS,false);
      const rg=new T.DodecahedronGeometry(1,1); const p=rg.attributes.position; for(let i=0;i<p.count;i++){ const x=p.getX(i),y=p.getY(i),z=p.getZ(i); const n=.82+.36*E.vn(x*2.3+7,z*2.1+y*1.7); p.setXYZ(i,x*n,Math.max(-.55,y*n),z*n); } rg.computeVertexNormals();
      inst(rg,ROCK,r0,true); inst(rg,ROCK2,r1,true); }
    // 마당 가장자리 돌 띠(방장 쪽 낙수 홈), 동쪽 낮은 담
    K.b(0,-.04,-.18,25.4,.12,.36,J.ST2);
    // ---------- 0: 흙담(남·서) · 동쪽 낮은 담 ----------
    wallSeg(-13.1,10.38,13.4,10.38,1.85,1.85,.55); // 남쪽
    wallSeg(-12.82,-.2,-12.82,10.1,1.85,1.48,.55); // 서쪽: 남쪽 끝이 낮음
    { const g=[bx(13.1,0,4.6,.35,1.25,9.4)]; merge(g,J.WH); K.b(13.1,1.25,4.6,.6,.12,9.8,RD); }
    // ---------- 1: 방장(1606 건립, 이축) ----------
    K.layer(1); const F=.78, CZ=-9.95;
    K.b(0,-.04,CZ,24.6,.5,16.4,J.ST2); // 기단
    K.b(0,.46,CZ,23.4,F-.46,15.2,DK); // 마루 밑 어둠
    K.b(0,F-.1,CZ,23,.12,15,DW2); // 바닥
    K.b(0,F-.12,-1.05,23,.12,2.1,DW2); // 툇마루(남쪽, 방장 앞 넓은 마루)
    { const L=[]; for(let i=0;i<=12;i++){ const x=-11.5+i*23/12; L.push([x,0,-.06]); } inst(cylG(.09,F-.06,6,.09),DW,L); }
    const XC=[]; for(let i=0;i<=12;i++) XC.push(-11.5+i*23/12); const ZC=[-17.5,-13.7,-9.9,-6.1,-2.3];
    J.cols(XC,ZC,F,3.1,.13,DW);
    // 남면: 열어 둔 칸(어두운 실내) · 장지 · 위 흰 벽
    { const sho=[], dk=[], wh=[], ita=[]; for(let i=0;i<12;i++){ const c=XC[i]+23/24, w=23/12-.24; if(i===5||i===6||i===3||i===8) dk.push(bx(c,F+.02,-2.42,w,2.4,.05)); else if(i===0||i===11) ita.push(bx(c,F+.02,-2.36,w,2.4,.06)); else sho.push(bx(c,F+.02,-2.36,w,2.4,.06)); wh.push(bx(c,F+2.42,-2.34,w,.66,.08)); }
      for(let j=0;j<4;j++){ const c=ZC[j]+1.9, w=3.6; for(const sx of [-1,1]){ ita.push(bx(sx*11.52,F+.02,c,.06,2.4,w)); wh.push(bx(sx*11.5,F+2.42,c,.08,.66,w)); } }
      merge(sho,J.SHO); merge(dk,K.col(0x1a1612,{roughness:1}),false); merge(wh,J.WH); merge(ita,J.ITA); K.b(0,F,-9.95,22.6,3.0,14.6,K.col(0x2b241d,{roughness:1}),0); }
    J.ring(0,CZ,23,15.2,F+3.0,.26,.2,DW); // 도리
    const ye=3.95; J.raft(0,CZ,23,15.2,ye+.28,ye,2.0,.36,DW2,.1);
    const yf=roofHF(0,ye,CZ-.2,27.8,20.6,5.6,{dt:.5,mat:J.KOK,under:RU,thk:.24,sori:.28,rmat:RD,rw:.55,rh:.5,gmat:J.WD||DW2,nu:30,nv:12});
    for(const sx of [-1,1]) for(const sz of [-1,1]) hipLine(yf,0,CZ-.2,sx*13.9,sz*10.3,sx*(13.9-5.1),sz*5.1,10,RD,.26);
    // ---------- 1: 고리(庫裏) · 복도 — 동북 (추정) ----------
    { const cx=31, cz=-14; K.b(cx,-.04,cz,19,.45,15,J.ST2); K.b(cx,.4,cz,17.6,4.6,13.4,J.WH); { const L=[]; for(let i=0;i<=6;i++) L.push([cx-8.8+i*17.6/6,.4,cz+6.72],[cx-8.8+i*17.6/6,.4,cz-6.72]); inst(boxG(.28,4.6,.28),DW,L); } K.b(cx,.4,cz+6.75,3.2,2.6,.1,J.ITA);
      roofHF(cx,5.2,cz,21,17.4,6.6,{dt:.42,mat:J.KAW,under:RU,thk:.28,sori:.2,rmat:RD,rw:.6,rh:.55,gmat:J.WH,nu:20,nv:10});
      K.b(18.4,.4,-8.5,7.2,.35,2.4,DW2); K.b(18.4,.75,-8.5,7.2,2.4,.12,J.SHO); roofHF(18.4,3.4,-8.5,7.8,3.6,1.0,{dt:1,mat:J.KAW,under:RU,thk:.2,ridge:false,nu:8,nv:6}); }
    K.cur=null; tidy(1);
  }});
