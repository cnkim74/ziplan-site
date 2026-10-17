__bsigFill({"djenne":function(K){
// 출처: designingbuildings.co.uk 「Great Mosque of Djenné」(위키백과 기반) — 기단 75 × 75 m·높이 3 m(바니강 범람 대비), 기도실 26 × 50 m·내벽 9열 아치 사이 기둥 90개, 가운데 미나렛 약 16 m, 토론 약 60 cm 돌출, 지붕 환기구, 1906~1909 완공(1907 재건), 2009 탑 윗부분 붕괴 뒤 복구 · 동쪽 정면이 장터 광장을 향함
// 추정: 기도실·안마당 배치(동쪽 벽 z=30), 양옆 탑 약 14.5 m·벽 높이 약 10 m, 기둥형 버트레스 간격 약 2.6 m, 토론 간격, 북쪽 출입 탑, 주변 2층 흙집 매스와 장터 천막, 범람원 물길 위치
    const T=K.T; const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const inst=(geo,mat,items,cast,grp,fit)=>{ if(!items.length) return null; if(fit) geo=geo.clone(); const m=new T.InstancedMesh(geo,mat,items.length); m.frustumCulled=false; const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),Eu=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); Eu.set(it[7]||0,it[3]||0,it[8]||0); Q.setFromEuler(Eu); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; if(fit){ if(!geo.boundingBox) geo.computeBoundingBox(); const gb=geo.boundingBox.clone(), bb=new T.Box3(); for(let i=0;i<items.length;i++){ m.getMatrixAt(i,M4); bb.union(gb.clone().applyMatrix4(M4)); } geo.boundingBox=bb; geo.boundingSphere=bb.getBoundingSphere(new T.Sphere()); } if(grp){ m.castShadow=!!cast; m.receiveShadow=true; grp.add(m); return m; } return put(m,cast); };
    const bx=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const merge=(geos,mat,cast,grp)=>{ if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); const m=new T.Mesh(g,mat); if(grp){ m.castShadow=!!cast; m.receiveShadow=true; grp.add(m); return m; } return put(m,cast); };
    const cylG=(r,h,seg,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r*.9:r2,r,h,seg||10); g.translate(0,h/2,0); return g; };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
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
    // ---- (공용 헬퍼 끝) ----
    const instC=(geo,mat,items,grp,cast)=>{ if(!items.length) return null; const m=new T.InstancedMesh(geo,mat,items.length); m.frustumCulled=false; const M4=new T.Matrix4(),Q=new T.Quaternion(),Sv=new T.Vector3(),V=new T.Vector3(),Eu=new T.Euler(),c=new T.Color(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); Eu.set(0,it[3]||0,0); Q.setFromEuler(Eu); Sv.set(it[4],it[5],it[6]); M4.compose(V,Q,Sv); m.setMatrixAt(i,M4); c.set(it[7]).convertSRGBToLinear(); m.setColorAt(i,c); }); m.instanceMatrix.needsUpdate=true; m.instanceColor.needsUpdate=true; m.castShadow=cast!==false; m.receiveShadow=true; (grp||K.cur||K.layer(0)).add(m); return m; };
    // 흙 미장 질감: 손으로 문지른 결 · 얼룩 · 빗물 자국
    const MT=E.tex('dj_mud',512,(g,N,rr)=>{ g.fillStyle='#ad8457'; g.fillRect(0,0,N,N); for(let i=0;i<900;i++){ g.fillStyle=`rgba(${150+rr()*50|0},${105+rr()*40|0},${65+rr()*30|0},${.10+rr()*.18})`; g.beginPath(); g.ellipse(rr()*N,rr()*N,6+rr()*26,4+rr()*14,rr()*3,0,7); g.fill(); } for(let i=0;i<120;i++){ const x=rr()*N; g.fillStyle='rgba(90,62,38,.16)'; g.fillRect(x,rr()*N*.4,2+rr()*3,N*.3+rr()*N*.5); } for(let i=0;i<7000;i++){ g.fillStyle=rr()<.5?'rgba(255,230,190,.10)':'rgba(70,45,25,.12)'; g.fillRect(rr()*N,rr()*N,2,2); } });
    const MUD=E.tmat(MT,0xad8457,{roughness:.97}), MUDl=K.col(0xb88f60,{roughness:.97}), MUDd=K.col(0x97724a,{roughness:.97}), TOR=K.col(0x6e5a44,{roughness:1}), DK=K.col(0x2e2219,{roughness:1}), EGG=K.col(0xf1ead8,{roughness:.6}), POT=K.col(0x8f5a3c,{roughness:.9});
    const tbG=(x,y,z,w0,w1,h,d0,d1)=>{ const g=new T.BoxGeometry(1,h,1); const p=g.attributes.position; for(let i=0;i<p.count;i++){ const top=p.getY(i)>0; p.setX(i,p.getX(i)*(top?w1:w0)); p.setZ(i,p.getZ(i)*(top?(d1||d0):d0)); } g.computeVertexNormals(); g.translate(x,y+h/2,z); return g; };
    const coneG=(x,y,z,r,h,seg)=>{ const g=new T.ConeGeometry(r,h,seg||8); g.translate(x,y+h/2,z); return g; };
    const ROT=[]; // 토론 막대 [x,y,z,ry]
    const torRow=(x0,x1,z,y0,y1,dy,dx,ry)=>{ for(let y=y0;y<=y1;y+=dy) for(let x=x0;x<=x1+1e-6;x+=dx){ ROT.push(ry?[z,y,x,ry]:[x,y,z,0]); } };
    const Y0=3; // 기단 윗면
    K.layer(0); E.own();
    // ---- 지형(K.life): 섬 위 마을(0 m) · 둘레 범람원(-1.6 m)과 물길 · 먼 지평선 ----
    const isl=(x,z)=>{ const a=Math.atan2(z,x); return 430+90*Math.sin(a*3+1)+60*Math.cos(a*5); };
    const hf=(x,z)=>{ const d=Math.hypot(x,z)-isl(x,z); let h=-1.8*E.ss(d/40)+.6*(E.fbm(x*.02,z*.02,2)-.5)*E.ss(d/30); if(Math.abs(x)<40&&Math.abs(z)<40) h=-.05; return h; };
    const TR=E.terrain(0,0,0,0,E.axis(3000,150,4.2,0),E.axis(3000,150,4.2,0),hf,(x,z,h,ny)=>{ const n=E.fbm(x*.05,z*.05,2); if(h>-.6){ let c=[.74+.05*n,.60+.05*n,.44+.04*n]; return c; } const g=E.vn(x*.01,z*.01); let c=[.50+.08*g,.56+.06*g,.34]; const d=Math.hypot(x,z); const f=E.ss((d-800)/1400)*.55; return c.map((v,i)=>v+([.80,.80,.76][i]-v)*f); });
    { const wm=new T.Mesh(new T.PlaneGeometry(6000,6000),E.WATER); wm.rotation.x=-Math.PI/2; wm.position.set(0,-1.3,0); K.life.add(wm); }
    // ---- 0: 기단(경사진 흙 옆면 · 계단) ----
    { const g=tbG(0,0,0,77,75,Y0,77,75); const m=new T.Mesh(g,MUD); m.castShadow=true; m.receiveShadow=true; K.cur.add(m); }
    K.b(0,Y0-.05,0,74.6,.1,74.6,MUDl);
    for(const s of [-1,1]){ for(let i=0;i<6;i++) K.b(s*24,i*.5,37.5+(6-i)*.45,6,.5,(6-i)*.9+.2,MUDl); for(let i=0;i<6;i++) K.b(37.5+(6-i)*.45,i*.5,s*14,(6-i)*.9+.2,.5,6,MUDl); }
    // 기단 위 무덤(동쪽 테라스 남쪽 — 추정) · 담장 낮은 벽
    K.b(-30,Y0,33,5,1.2,3,MUDl);
    // ---- 1: 기도실 벽 · 안마당 벽 ----
    K.layer(1);
    const HW=10, HC=7; // 벽 높이(기단 위)
    { const W=[]; W.push(tbG(0,Y0,29,51.4,50.6,HW,2.4,1.6)); for(const q of [-1,1]){ W.push(tbG(q*25,Y0,17,1.8,1.2,HW,26.4,26.4)); W.push(tbG(q*25,Y0,-12.6,1.8,1.2,HC,33.2,33.2)); } // 동 벽 · 남북 벽(기도실 + 안마당 쪽은 아래 HC로 덮음)
      W.push(tbG(0,Y0,-29,51.4,50.6,HC,1.8,1.2)); merge(W,MUD,true);
      merge([bx(0,Y0,17,49,HW-.4,23.8)],MUDd,false); // 기도실 지붕판 아래 몸체(안쪽)
      K.b(0,Y0+HW-.4,17,49.6,.5,24.6,MUDl); // 지붕
      // 안마당 쪽: 기도실 서쪽 벽(아치 회랑 입구) + 마당 바닥
      merge([bx(0,Y0,4.6,49,HW-.6,1.2)],MUD,true); { const a=[]; for(let i=0;i<14;i++){ const x=-22+i*44/13; a.push([x,Y0,3.95,0,1.6,4.2,.3]); } inst(boxG(1,1,1),DK,a,false); }
      K.b(0,Y0-.04,-12,48,.08,32,K.col(0xc9a77a,{roughness:1})); }
    // 지붕 환기구(뚜껑 토기) · 빗물 홈통
    { const it=[]; for(let i=0;i<9;i++) for(let j=0;j<5;j++) it.push([-20+i*5,Y0+HW+.1,8+j*4.6,0,1,1,1]); inst((()=>{ const g=new T.CylinderGeometry(.35,.45,.5,8); g.translate(0,.25,0); const h=new T.CylinderGeometry(.55,.55,.12,8); h.translate(0,.56,0); return E.mergeG([g,h]); })(),POT,it,true);
      const sp=[]; for(let i=0;i<12;i++){ sp.push([25.9,Y0+HW-1.6,-20+i*4.2,Math.PI/2,.24,.24,1.6]); sp.push([-25.9,Y0+HW-1.6,-20+i*4.2,Math.PI/2,.24,.24,1.6]); } inst(new T.CylinderGeometry(.5,.5,1,6).rotateX(Math.PI/2),POT,sp.map(p=>[p[0],p[1],p[2],p[3],p[4],p[5],p[6]]),true); }
    // ---- 2: 동쪽 정면 — 탑 3 · 기둥형 버트레스 + 원뿔 첨탑 · 토론 ----
    K.layer(2);
    { const T1=[], T2=[], EG=[];
      const tower=(x,w,h,d)=>{ T1.push(tbG(x,Y0,30.6,w,w*.82,h,d,d*.8)); // 몸통(위로 좁아짐)
        for(const k of [-1,-.33,.33,1]){ const px=x+k*(w*.41-.4); T2.push(tbG(px,Y0,30.6+d*.42,1.0,.8,h+.2,1.2,.9)); } // 세로 줄기(리브)
        const top=Y0+h; T1.push(tbG(x,top,30.6,w*.82,w*.7,1.2,d*.8,d*.7));
        for(const k of [-1,1]) for(const q of [-1,1]){ T2.push(coneG(x+k*w*.3,top+1.2,30.6+q*d*.26,.62,2.4,8)); EG.push([x+k*w*.3,top+3.6,30.6+q*d*.26]); }
        T2.push(coneG(x,top+1.2,30.6,1.1,3.6,10)); EG.push([x,top+4.8,30.6]);
        torRow(x-w*.4+.3,x+w*.4-.3,30.6+d/2+.2,Y0+1.6,top-.4,1.55,.95); };
      tower(0,7.4,13,5.4); tower(-13.6,6.4,11.4,4.8); tower(13.6,6.4,11.4,4.8);
      // 탑 사이·양 끝: 기둥형 버트레스(벽 위로 솟는 원뿔)
      const xs=[]; for(let x=-24.4;x<=24.4;x+=2.55){ if(Math.abs(x)<4.2||Math.abs(Math.abs(x)-13.6)<3.6) continue; xs.push(x); }
      xs.forEach(x=>{ T2.push(tbG(x,Y0,30.4,1.25,1.0,HW+1.2,1.6,1.2)); T2.push(coneG(x,Y0+HW+1.2,30.4,.55,2.2,8)); EG.push([x,Y0+HW+3.4,30.4]); });
      torRow(-24,-17.4,30.3,Y0+1.5,Y0+HW-.6,1.55,.95); torRow(-9.6,-4.6,30.3,Y0+1.5,Y0+HW-.6,1.55,.95); torRow(4.6,9.6,30.3,Y0+1.5,Y0+HW-.6,1.55,.95); torRow(17.4,24,30.3,Y0+1.5,Y0+HW-.6,1.55,.95);
      // 벽 위 난간(낮은 흉벽) + 작은 삼각 톱니
      T1.push(bx(0,Y0+HW,29.4,50,1.1,.9));
      merge(T1,MUD,true); merge(T2,MUDl,true); inst(new T.SphereGeometry(.22,8,6),EGG,EG.map(p=>[p[0],p[1],p[2],0,1,1.25,1]),false);
      // 탑 아래 작은 문·창 그늘
      for(const x of [-13.6,13.6]) K.b(x,Y0+2,33.0,1.0,1.6,.2,DK); }
    // ---- 3: 북·남 정면(출입 탑) · 안마당 벽 기둥 · 둘레 토론 ----
    K.layer(3);
    { const G1=[], G2=[], EG=[];
      for(const s of [-1,1]){ const xw=s*25.4; // 북(+x)·남(-x)
        for(let z=-27;z<=29;z+=2.8){ const h=(z>4?HW:HC)+1.0; G2.push(tbG(xw+s*.4,Y0,z,1.2,1.0,h,1.2,1.0)); G2.push(coneG(xw+s*.4,Y0+h,z,.45,1.7,8)); }
        // 출입 탑 2(기도실 쪽 · 안마당 쪽)
        for(const z of [16,-14]){ G1.push(tbG(xw+s*.8,Y0,z,3.2,2.6,HW+3.4,6.2,5.2)); G2.push(coneG(xw+s*.8,Y0+HW+3.4,z,1.0,2.8,8)); EG.push([xw+s*.8,Y0+HW+6.3,z]); for(const q of [-1,1]){ G2.push(coneG(xw+s*.8,Y0+HW+3.4,z+q*2.0,.5,1.8,8)); } K.b(xw+s*2.45,Y0,z,.2,3.2,1.8,DK); }
        torRow(-27,28,xw+s*1.1,Y0+1.6,Y0+HC-.6,1.6,1.05,Math.PI/2); }
      // 서쪽 안마당 벽 기둥
      for(let x=-24;x<=24;x+=3){ G2.push(tbG(x,Y0,-29.6,1.1,.9,HC+1,1.2,1.0)); G2.push(coneG(x,Y0+HC+1,-29.6,.42,1.6,8)); }
      torRow(-24,24,-30.2,Y0+1.6,Y0+HC-.6,1.6,1.05);
      merge(G1,MUD,true); merge(G2,MUDl,true); inst(new T.SphereGeometry(.22,8,6),EGG,EG.map(p=>[p[0],p[1],p[2],0,1,1.25,1]),false); }
    // 토론 막대(모든 벽, 한 덩어리 인스턴스) — 벽 면에서 약 60 cm
    K.layer(2); { const g=new T.CylinderGeometry(.07,.08,1.2,5); g.rotateX(Math.PI/2); inst(g,TOR,ROT.map(p=>[p[0],p[1],p[2],p[3]||0,1,1,1]),true); }
    // ---- 맥락(K.life): 장터 광장 천막 · 흙집 마을 · 나무 ----
    { const L=K.life; const cs=['#b9553e','#4f6f93','#c7a456','#5b7f5f','#d8d0bd','#8a5a6e','#c47a45','#e6e0d0','#e6e0d0'];
      const st=[], pl=[]; for(let i=0;i<9;i++) for(let j=0;j<6;j++){ if(E.r()<.25) continue; const x=-46+i*11+E.r()*3, z=52+j*9+E.r()*3; st.push([x,2.3,z,(E.r()-.5)*.3,3.4+E.r()*1.4,.1,3+E.r(),cs[Math.floor(E.r()*cs.length)]]); for(const a of [-1,1]) for(const b of [-1,1]) pl.push([x+a*1.8,0,z+b*1.5,0,.08,2.3,.08,'#4a3b2c']); } instC(new T.BoxGeometry(1,1,1),K.col(0xffffff,{roughness:.8}),st,L,true); instC(new T.BoxGeometry(1,1,1).translate(0,.5,0),K.col(0xffffff),pl,L,false);
      // 흙집: 2층 매스 + 정면 기둥 장식(토쿨뢰르 양식) — 광장·모스크 둘레는 비움
      const hs=['#b48a5c','#bf9868','#a98054','#c4a073','#b08556','#a07a50']; const H=[], P=[]; const Q=[];
      for(let z=-330;z<330;z+=12) for(let x=-330;x<330;x+=12){ const xx=x+(E.r()-.5)*3, zz=z+(E.r()-.5)*3; if(Math.hypot(xx,zz)>isl(xx,zz)-25) continue; if(Math.abs(xx)<50&&zz>-48&&zz<48) continue; if(Math.abs(xx)<58&&zz>=44&&zz<112) continue; if(E.r()<.12) continue; const h=(E.r()<.55?6.0:3.6)+E.r()*1.0, w=7+E.r()*2.5, d=7+E.r()*2.5; const c=hs[Math.floor(E.r()*hs.length)]; H.push([xx,h/2-.2,zz,0,w,h,d,c]); P.push([xx,h+.25,zz,0,w-.2,.5,d-.2,c]); if(E.r()<.5){ for(let k=0;k<3;k++) Q.push([xx-w/2+1+k*(w-2)/2,h+.6,zz+d/2,0,.5,1.1,.5,c]); } }
      instC(new T.BoxGeometry(1,1,1),K.col(0xffffff,{roughness:.97}),H,L,true); instC(new T.BoxGeometry(1,1,1),K.col(0xffffff,{roughness:.97}),P,L,true); instC(new T.ConeGeometry(.6,1,6).translate(0,.5,0),K.col(0xffffff,{roughness:.97}),Q,L,true);
      // 나무(님·아카시아) · 범람원 들판의 나무 몇 그루
      const tr=[]; for(let i=0;i<40;i++){ const a=E.r()*6.28, r=200+E.r()*240; const x=Math.cos(a)*r, z=Math.sin(a)*r; if(Math.hypot(x,z)>isl(x,z)-20) continue; tr.push([x,0,z,7+E.r()*4,0,E.r(),1.3]); } for(let i=0;i<70;i++){ const a=E.r()*6.28, r=520+E.r()*900; const x=Math.cos(a)*r, z=Math.sin(a)*r; tr.push([x,TR.h(x,z),z,8+E.r()*5,0,E.r(),1.5]); } for(const [x,z] of [[-48,60],[48,70],[-44,100],[50,104]]) tr.push([x,0,z,9,0,.3,1.4]); E.forest(tr,{trunks:true,cast:true}); }
    tidy(1);
  }});
