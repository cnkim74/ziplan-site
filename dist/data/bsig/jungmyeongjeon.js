__bsigFill({"jungmyeongjeon":function(K){
// 출처: 한국학중앙연구원 디지털인문학 위키 「중명전」(1897 황실도서관 건립·1901 창건, 원래 수옥헌, 사바틴 설계설, 지하 1층·지상 2층 벽돌, 1층 아치형 창·2층 서쪽 베란다, 사모지붕 앞·뒷면 가운데 지붕창, 1925 화재로 외벽만 남은 것을 복구, 1963 사적, 세종대로 99) · 서울시 미디어허브 「이토록 아름다운 건물이 치욕의 장소라니…」(사바찐 설계로 소개, 2007년부터 약 2년 원형 복원 — 아치형 벽돌 구조·실내 벽난로·앞마당 우물, 1층 4실·2층 1실 전시, 궁궐 안 최초 근대 건축, 2007.2 덕수궁에 포함)
// 추정: 평면 약 26 × 18 m, 층고·지붕 높이, 아치 수(정면 1층 7·2층 7, 옆 5), 베란다를 정면·옆까지 두른 정도(자료는 2층 서쪽 베란다 — 모형은 정면·서쪽에 둠), 지붕 재료 색, 우물 위치, 주변 나무·건물
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
    const C7={WD:K.col(0x7a5f47,{roughness:.88}),WDL:K.col(0x9c7d5c,{roughness:.88}),WDD:K.col(0x55432f,{roughness:.9}),WH:K.col(0xece5d4,{roughness:.97}),PAPER:K.col(0xf1ead8,{roughness:.95}),RED:K.col(0x8a3a2a,{roughness:.82}),GRN:K.col(0x2e6a5c,{roughness:.8}),BLU:K.col(0x2d5470,{roughness:.8}),YEL:K.col(0xc9a24a,{roughness:.8}),GW:K.M.giwa,RU:K.col(0x5c4b3c),RUD:K.col(0x356a60,{roughness:.85}),DR:K.col(0x2d2b28),ST:K.col(0xaaa395,{roughness:.95}),ST2:K.col(0x8c8679,{roughness:.95}),GRAN:K.col(0xc7c2b6,{roughness:.9}),MUD:K.col(0xb99f7a,{roughness:1}),TH:K.col(0xbfa36c,{roughness:1}),BRK:K.col(0x8e4a35,{roughness:.9}),CONC:K.col(0xb9b5ad,{roughness:.9}),BAS:K.col(0x4a4642,{roughness:.95}),ASP:K.col(0x55575a,{roughness:.95}),GRS:K.col(0x6f8a4e,{roughness:1})};
    const STW=E.tmat(E.wallTex('k7_wall','#6a5d4c',['#9b8f7c','#a99c86','#8b7f6c','#b3a58e','#7f7563','#c0b39a'],56,46,110),0xa59a86,{tint:0xdcd2c0});
    const ASH=E.tmat(E.wallTex('k7_ash','#8e8a82',['#c9c4b8','#bdb8ac','#d3cec2','#b4afa3'],120,160,260),0xc7c2b6,{tint:0xe6e1d6}); // 다듬은 화강석(장대석)
    const BASW=E.tmat(E.wallTex('k7_bas','#2c2a28',['#4a4642','#555049','#3f3b37','#5d5851'],50,40,90),0x4a4642,{tint:0xbdb7ad}); // 제주 현무암 돌담
    const MAS=E.tmat(E.masTex(),0xd2c6a6,{tint:0xd9cdb2});
    const tm7=(key,draw,base)=>{ const t=E.tex(key,256,draw); const m=new T.MeshStandardMaterial({map:t,roughness:.9}); if(!t) m.color.setHex(base).convertSRGBToLinear(); return m; };
    // 렌더러가 build 뒤에 K.life에 더하는 기본 소품(벤치·볼라드·일반 나무, keep=0이면 사람까지) 숨김 — build 맨 끝에서 부를 것
    const tidy7=keep=>{ const L=K.life, add0=L.add; L.add=function(...a){ a.forEach(o=>{ if(keep&&o.isMesh&&!o.isInstancedMesh&&o.material===K.M.people) return; o.visible=false; }); return add0.apply(this,a); }; };
    const lay7=i=>{ K.layer(i); };
    // 질감 바닥판(UV를 크기에 맞춤) — y는 윗면
    const flat7=(x,z,w,d,y,mat,tm,ry)=>{ const g=new T.PlaneGeometry(w,d); g.rotateX(-Math.PI/2); const uv=g.attributes.uv; for(let i=0;i<uv.count;i++) uv.setXY(i,uv.getX(i)*w/(tm||4),uv.getY(i)*d/(tm||4)); const m=new T.Mesh(g,mat); m.position.set(x,y,z); if(ry) m.rotation.y=ry; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
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
    // 도시 건물(창 무늬 질감) — K.life에 놓음: [x,z,w,d,h,hex,ry]
    const WINT=E.tex('k7_win',512,(g,N,rr)=>{ g.fillStyle='#e9e6df'; g.fillRect(0,0,N,N); for(let r=0;r<4;r++){ g.fillStyle='rgba(0,0,0,.05)'; g.fillRect(0,r*N/4+N/4-10,N,10); for(let c=0;c<6;c++){ const x=c*N/6+10, y=r*N/4+18; g.fillStyle=rr()<.2?'#a9b6bd':'#56626a'; g.fillRect(x,y,N/6-20,N/4-44); g.fillStyle='rgba(255,255,255,.18)'; g.fillRect(x,y,N/6-20,5); } } });
    const WM7={}; const winMat=hex=>WM7[hex]||(WM7[hex]=E.tmat(WINT,hex,{tint:hex,roughness:.85}));
    const bldg7=(list)=>{ const prev=K.cur; K.cur=K.life; for(const [x,z,w,d,h,hex,ry] of list){ tbox(x,0,z,w,h,d,winMat(hex),12,ry); K.b(x,h,z,w+.2,.5,d+.2,K.col(0x8a8780,{roughness:.9}),ry); } K.cur=prev; };
    // 도시 격자 블록 생성: 영역 밖 링(r0~r1)에 블록 — 높이 함수 hfn(x,z)
    const city7=(r0,r1,cell,hfn,ok,pal)=>{ const L=[]; let sd=19; const rr=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; }; pal=pal||[0xb8b2a6,0xa9a49b,0xc9c2b4,0x9a958d,0xd6cfc2,0x8f9aa3,0xbfb6a4];
      for(let x=-r1;x<=r1;x+=cell) for(let z=-r1;z<=r1;z+=cell){ const d=Math.max(Math.abs(x),Math.abs(z)); if(d<r0) continue; if(ok&&!ok(x,z)) continue; const nb=1+Math.floor(rr()*3); for(let k=0;k<nb;k++){ const w=cell*(.3+rr()*.35), dd=cell*(.3+rr()*.35); const bx0=x+(rr()-.5)*(cell-w)*.8, bz0=z+(rr()-.5)*(cell-dd)*.8; L.push([bx0,bz0,w,dd,Math.max(3,hfn(bx0,bz0)*(.55+rr()*.9)),pal[Math.floor(rr()*pal.length)]]); } }
      return blocks7(L); };
    // ===== B 근대 키트(이 build 안에서만): 벽돌·화강석 질감 · 서양식 모임지붕(hipG) · 아치 벽(archWall) · 창 줄(winsB) =====
    const BRKT=E.tex('kB_brick',512,(g,N,rr)=>{ g.fillStyle='#d9d2c4'; g.fillRect(0,0,N,N); const rh=N/16, bw=N/8; for(let r=0;r<16;r++){ const off=(r%2)*bw/2; for(let c=-1;c<9;c++){ const x=c*bw+off; const t=rr(); g.fillStyle=t<.3?'#9a4632':t<.6?'#a9533b':t<.85?'#8d3f2d':'#b5634a'; g.fillRect(x+2,r*rh+2,bw-4,rh-4); g.fillStyle='rgba(0,0,0,.08)'; g.fillRect(x+2,r*rh+rh-5,bw-4,3); } } for(let i=0;i<3000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.06)':'rgba(0,0,0,.08)'; g.fillRect(rr()*N,rr()*N,1.5,1.5); } });
    const ASHT=E.tex('kB_ashlar',512,(g,N,rr)=>{ g.fillStyle='#d4cfc4'; g.fillRect(0,0,N,N); const rh=N/6; for(let r=0;r<6;r++){ let x=-rr()*N/3; while(x<N){ const w=N/5+rr()*N/5; const t=rr(); g.fillStyle=t<.3?'#dcd7cc':t<.6?'#cfc9bd':t<.85?'#d6d1c6':'#c7c1b4'; for(const ox of [0,N]) g.fillRect(ox+x+2,r*rh+2,w-3,rh-3); x+=w; } g.fillStyle='rgba(60,55,48,.35)'; g.fillRect(0,r*rh,N,2); } for(let i=0;i<6000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.08)':'rgba(40,36,30,.08)'; g.fillRect(rr()*N,rr()*N,1.3,1.3); } });
    const RUST=E.tex('kB_rust',512,(g,N,rr)=>{ g.fillStyle='#cdc7ba'; g.fillRect(0,0,N,N); const rh=N/4; for(let r=0;r<4;r++){ g.fillStyle=r%2?'#d3cdc1':'#c9c3b6'; g.fillRect(0,r*rh+6,N,rh-12); g.fillStyle='rgba(50,45,38,.55)'; g.fillRect(0,r*rh,N,5); g.fillStyle='rgba(255,255,255,.25)'; g.fillRect(0,r*rh+6,N,3); } for(let i=0;i<6000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.08)':'rgba(40,36,30,.08)'; g.fillRect(rr()*N,rr()*N,1.3,1.3); } });
    const SLT=E.tex('kB_slate',256,(g,N,rr)=>{ g.fillStyle='#3d4247'; g.fillRect(0,0,N,N); const rh=N/10; for(let r=0;r<10;r++){ const off=(r%2)*N/16; for(let c=-1;c<9;c++){ g.fillStyle=rr()<.5?'#474d53':'#41464c'; g.fillRect(c*N/8+off+1,r*rh+1,N/8-2,rh-2); } g.fillStyle='rgba(0,0,0,.35)'; g.fillRect(0,r*rh+rh-2,N,2); } });
    const MB={BRK:E.tmat(BRKT,0x9a4a36,{tint:0xffffff}),ASH:E.tmat(ASHT,0xd2ccc0,{tint:0xffffff,roughness:.9}),RUS:E.tmat(RUST,0xcbc5b8,{tint:0xffffff,roughness:.92}),SL:E.tmat(SLT,0x41464c,{tint:0xffffff,roughness:.75}),
      STN:K.col(0xd8d2c5,{roughness:.88}),STD:K.col(0xb9b2a4,{roughness:.9}),WHT:K.col(0xefebe2,{roughness:.9}),GL:K.col(0x2c3640,{roughness:.25,metalness:.2}),GLF:K.col(0x55636c,{roughness:.3,metalness:.15}),FR:K.col(0xe9e4d8,{roughness:.8}),FRD:K.col(0x4a3d33,{roughness:.8}),CU:K.col(0x4d6a62,{roughness:.6,metalness:.25}),CUD:K.col(0x3a4440,{roughness:.6,metalness:.2}),IRON:K.col(0x2a2c2e,{roughness:.6,metalness:.3}),ASP:K.col(0x5b5d5f,{roughness:.95}),PAV:K.col(0xa9a397,{roughness:.95}),GRS:K.col(0x6e8a4c,{roughness:1}),CLK:K.col(0xf4f1e8,{roughness:.6}),GOLD:K.col(0xc9a24a,{roughness:.45,metalness:.5})};
    // 서양식 모임지붕(직선 평면) — 바닥 중심 x,z, 처마 높이 y, 폭 w(x)·깊이 d(z)·높이 h; w=d면 사모
    const hipG=(w,d,h)=>{ const sw=d>w; const L=sw?d:w, S=sw?w:d, R=Math.max(0,L-S); const a=L/2, b=S/2, r=R/2; const P=sw?(x,y,z)=>[z,y,x]:(x,y,z)=>[x,y,z]; const v=[]; const tri=(p,q,s)=>v.push(...P(...p),...P(...q),...P(...s));
      const A=[-a,0,b],B=[a,0,b],Cq=[a,0,-b],D=[-a,0,-b],R1=[-r,h,0],R2=[r,h,0];
      tri(A,B,R2); tri(A,R2,R1); tri(Cq,D,R1); tri(Cq,R1,R2); tri(B,Cq,R2); tri(D,A,R1);
      const g=new T.BufferGeometry(); const arr=new Float32Array(v); if(sw){ for(let i=0;i<arr.length;i+=9){ const t=[arr[i+3],arr[i+4],arr[i+5]]; arr[i+3]=arr[i+6]; arr[i+4]=arr[i+7]; arr[i+5]=arr[i+8]; arr[i+6]=t[0]; arr[i+7]=t[1]; arr[i+8]=t[2]; } } g.setAttribute('position',new T.BufferAttribute(arr,3)); const uv=new Float32Array(arr.length/3*2); for(let i=0;i<arr.length/3;i++){ uv[i*2]=(arr[i*3]+arr[i*3+2]*.7)/3; uv[i*2+1]=(arr[i*3+1]*1.4+Math.abs(arr[i*3+2])*.3)/3; } g.setAttribute('uv',new T.BufferAttribute(uv,2)); g.computeVertexNormals(); return g; };
    const hip=(x,y,z,w,d,h,mat,ry)=>{ const m=new T.Mesh(hipG(w,d,h),mat||MB.SL); m.position.set(x,y,z); if(ry) m.rotation.y=ry; return put(m); };
    // 아치 구멍 벽(압출) — 중심 x,z, 바닥 y, 폭 W·높이 H·두께 D, arches [[cx, 폭, 꼭대기 높이, 바닥 높이, pointed]] — 정면 +z(ry로 회전)
    const archWall=(x,y,z,W,H,D,arches,mat,ry,tm)=>{ const sh=new T.Shape(); sh.moveTo(-W/2,0); sh.lineTo(W/2,0); sh.lineTo(W/2,H); sh.lineTo(-W/2,H); sh.lineTo(-W/2,0);
      for(const [ax,aw,ah,ab,pt] of (arches||[])){ const r=aw/2, b=ab||0; const hp=new T.Path(); if(pt){ const sp=ah-aw*.75; hp.moveTo(ax-r,b); hp.lineTo(ax-r,sp); hp.quadraticCurveTo(ax-r,sp+aw*.5,ax,ah); hp.quadraticCurveTo(ax+r,sp+aw*.5,ax+r,sp); hp.lineTo(ax+r,b); hp.lineTo(ax-r,b); } else { const sp=ah-r; hp.moveTo(ax-r,b); hp.lineTo(ax-r,sp); hp.absarc(ax,sp,r,Math.PI,0,true); hp.lineTo(ax+r,b); hp.lineTo(ax-r,b); } sh.holes.push(hp); }
      const g=new T.ExtrudeGeometry(sh,{depth:D,bevelEnabled:false,curveSegments:10}); g.translate(0,0,-D/2); const uv=g.attributes.uv, pos=g.attributes.position, nrm=g.attributes.normal; tm=tm||2.4;
      for(let i=0;i<uv.count;i++){ const nx=Math.abs(nrm.getX(i)), nz=Math.abs(nrm.getZ(i)); const px=pos.getX(i), py=pos.getY(i), pz=pos.getZ(i); if(nz>.5) uv.setXY(i,px/tm,py/tm); else if(nx>.5) uv.setXY(i,pz/tm,py/tm); else uv.setXY(i,px/tm,pz/tm); }
      const m=new T.Mesh(g,mat); m.position.set(x,y,z); if(ry) m.rotation.y=ry; return put(m); };
    // 창 줄(인스턴스) — 면 위 창: list [x,y,z,ry,w,h] → 어두운 유리(살짝 들어감) + 밝은 창틀 + 창턱
    const winsB=(list,o)=>{ o=o||{}; const gl=[],fr=[],sl=[],ln=[]; const dp=o.dp||.12; list.forEach(([x,y,z,ry,w,h])=>{ const s=Math.sin(ry||0), c=Math.cos(ry||0); const off=(k)=>[x+s*k,z+c*k];
        const [gx,gz]=off(.02); gl.push([gx,y,gz,ry||0,w,h,.06]); const [fx,fz]=off(dp*.5); if(o.transom!==false) fr.push([fx,y+h*.62,fz,ry||0,w,.08,.06]); if(w>1.0) fr.push([fx,y,fz,ry||0,.07,h,.06]);
        if(o.sill!==false){ const [sx,sz]=off(dp+.06); sl.push([sx,y-.14,sz,ry||0,w+.3,.14,.22]); }
        if(o.lintel){ const [lx,lz]=off(dp+.04); ln.push([lx,y+h,lz,ry||0,w+.5,o.lintel,.16]); } });
      const b1=boxG(1,1,1); inst(b1,o.glass||MB.GL,gl,false,o.grp); inst(b1,o.frame||MB.FR,fr,false,o.grp); if(sl.length) inst(b1,o.sillMat||MB.STN,sl,false,o.grp); if(ln.length) inst(b1,o.lintelMat||MB.STN,ln,false,o.grp); };
    // 사람(작게) — 배경 생동감: [x,z,ry]
    const peopleB=(list,y)=>{ const it=list.map(([x,z,ry],i)=>[x,y||0,z,ry||0,.5,1.7,.35]); inst(boxG(1,1,1),K.M.people||K.col(0x6b6e74),it,true,K.life); };
    K.layer(0);
    site7({flat:[-200,200,-200,200],R:2200,ramp:60,forest:false,hills:[[-400,-900,500,400,200,1.3],[600,-700,500,400,120,1.3]],groundC:(x,z,n)=>[.47+.03*n,.46+.03*n,.43],near:220,rough:0});
    { const pv=K.cur; K.cur=K.life; flat7(0,16,46,16,.03,K.col(0xc4b28e,{roughness:1}),3); flat7(-22,0,12,30,.05,MB.GRS,4); flat7(22,0,12,30,.05,MB.GRS,4); K.cur=pv; }
    K.cur=K.layer(1);
    const W=26, D=18, PB=1.2, F1=4.4, F2=4.2, HC=PB+F1+F2;
    // 안쪽 몸체(벽돌) — 베란다만큼 들여서
    const Wi=W-2.8, Di=D-2.8, zc=-1.4, xc=1.4;
    tbox(0,0,0,W+.5,PB,D+.5,MB.ASH,3); tbox(xc,PB,zc,Wi,HC-PB,Di,MB.BRK,3); K.b(-W/2+1.4,PB+F1-.12,0,2.8,.24,D-.6,MB.STN);
    // 정면 베란다 겹(아치 1층·2층) — 벽돌 아치 벽
    const nA=7, aw=2.6, sp=W/nA; const AR=[]; for(let i=0;i<nA;i++) AR.push([-W/2+sp*(i+.5),aw,0,0]);
    archWall(0,PB,D/2-.3,W,F1,.6,AR.map(a=>[a[0],aw,F1-.7,0]),MB.BRK,0,3);
    archWall(0,PB+F1,D/2-.3,W,F2,.6,AR.map(a=>[a[0],aw,F2-.7,.95]),MB.BRK,0,3);
    K.b(0,PB+F1-.12,D/2-1.3,W,.24,2.4,MB.STN); K.b(0,PB+F1+.0,D/2-.3,W+.1,.2,.7,MB.STN);
    // 2층 난간(아치 아래)
    { const bal=[]; for(let i=0;i<nA;i++){ const x=-W/2+sp*(i+.5); for(let k=-4;k<=4;k++) bal.push([x+k*.24,PB+F1+.2,D/2-.3,0,.09,.75,.09]); bal.push([x,PB+F1+.95,D/2-.3,0,aw,.08,.18]); } inst(boxG(1,1,1),MB.WHT,bal); }
    // 베란다 안쪽 벽 창·문
    { const L=[]; for(let i=0;i<nA;i++){ const x=-W/2+sp*(i+.5); if(x<xc-Wi/2+.8) continue; L.push([x,PB+.3,zc+Di/2+.01,0,1.4,3.0]); L.push([x,PB+F1+.3,zc+Di/2+.01,0,1.4,2.9]); } for(const z of [-6,-2,2]) for(const y of [PB+.3,PB+F1+.3]) L.push([xc-Wi/2-.01,y,z,-Math.PI/2,1.4,2.9]); winsB(L,{lintel:0,glass:MB.GLF}); }
    // 서쪽(왼쪽) 면도 아치 베란다, 동쪽·뒷면은 아치 창
    archWall(-W/2+.3,PB,0,D,F1,.6,[[-5.6,aw,F1-.7,0],[-1.9,aw,F1-.7,0],[1.9,aw,F1-.7,0],[5.6,aw,F1-.7,0]],MB.BRK,Math.PI/2,3);
    archWall(-W/2+.3,PB+F1,0,D,F2,.6,[[-5.6,aw,F2-.7,.95],[-1.9,aw,F2-.7,.95],[1.9,aw,F2-.7,.95],[5.6,aw,F2-.7,.95]],MB.BRK,Math.PI/2,3);
    { const L=[], A=[]; for(const z of [-6,-2,2,6]) for(const [y,h] of [[PB+.6,2.8],[PB+F1+.5,2.7]]) L.push([W/2+.01,y,z+zc*.0,Math.PI/2,1.2,h]); for(let i=0;i<nA;i++){ const x=-W/2+sp*(i+.5); if(x<xc-Wi/2+.8) continue; for(const [y,h] of [[PB+.6,2.8],[PB+F1+.5,2.7]]) L.push([x,y,zc-Di/2-.01,Math.PI,1.2,h]); }
      winsB(L,{transom:false}); L.forEach(([x,y,z,ry,w,h])=>{ const s=Math.sin(ry), c=Math.cos(ry); archWall(x+s*.07,y+h-.6,z+c*.07,w+.5,.9,.14,[[0,w,.6,-.01]],MB.STN,ry,1); }); }
    // 반지하 창
    { const L=[]; for(let i=1;i<nA;i++) L.push([-W/2+sp*(i+.5),.25,-D/2-.26,Math.PI,1.0,.6]); winsB(L,{transom:false,sill:false}); }
    K.b(0,HC-.3,0,W+.9,.45,D+.9,MB.STN);
    // 모임지붕 + 앞뒤 가운데 지붕창
    hip(0,HC+.15,0,W+1.4,D+1.4,5.0,MB.SL);
    { const sl=5.0/((D+1.4)/2); for(const sz of [1,-1]){ const z=sz*((D+1.4)/2-2.4), y=HC+.15+2.4*sl-.3; const g=new T.Group(); const b1=new T.Mesh(boxG(2.0,1.6,2.6),MB.WHT); b1.position.set(0,0,-1.3); const gl=new T.Mesh(boxG(1.2,1.0,.06),MB.GL); gl.position.set(0,.25,.02); const rf=new T.Mesh(hipG(2.5,3.0,1.0),MB.SL); rf.position.set(0,1.6,-1.3); g.add(b1,gl,rf); g.position.set(0,y,z); g.rotation.y=sz>0?0:Math.PI; g.children.forEach(m=>{ m.castShadow=true; }); K.cur.add(g); } }
    for(const x of [-7,7]) tbox(x,HC+2,0,.9,3.6,.9,MB.BRK,2);
    stairs7(0,D/2+.1,4,PB,4,0,MB.ASH);
    // ---- 배경: 정동(나무·건물)·우물 ----
    { const prev=K.cur; K.cur=K.life;
      K.c(8,0,20,.9,.8,MB.STD,16); K.c(8,.8,20,.7,.04,MB.GL,16);
      bldg7([[-40,-30,30,20,16,0xcfcac0,0],[44,-26,28,22,22,0xbab3a6,0],[0,-60,50,20,30,0xc9c4ba,0]]);
      const bl=[]; let s=71; const rr=()=>{ s=(s*16807)%2147483647; return s/2147483647; }; for(let i=0;i<150;i++){ const x=(rr()-.5)*900, z=(rr()-.5)*900; if(Math.abs(x)<80&&Math.abs(z)<80) continue; bl.push([x,z,10+rr()*20,10+rr()*20,6+rr()*30,[0xd8d2c6,0xb9b3a8,0x9aa3a9,0xc8b49a,0xa8a296][Math.floor(rr()*5)]]); } blocks7(bl);
      const tr=[]; for(let i=0;i<20;i++){ const a=i/20*6.28; const x=Math.cos(a)*(26+rr()*10), z=Math.sin(a)*(22+rr()*8); if(z>14&&Math.abs(x)<20) continue; tr.push([x,0,z,9+rr()*5,0,rr(),1]); } E.forest(tr,{trunks:true,cast:true,grp:K.life});
      peopleB([[-4,16],[3,19],[11,14]]); K.cur=prev; }
    tidy7(1); K.cur=null; }});
