__bsigFill({"giza":function(K){
// 출처: 영문 위키백과 「Great Pyramid of Giza」 — 밑변 230.33 m, 원래 높이 146.6 m(280 큐빗), 현재 138.5 m, 경사 51°50′, 약 210단(현재 203단), 북면 입구 지상 17 m·중심에서 동쪽 약 7 m, 정상 측량 막대(1874) · 위치(위경도)로 계산한 상대 배치: 카프레 중심 서 322 m·남 340 m, 멘카우레 서 563 m·남 741 m, 스핑크스 동 328 m·남 432 m(동향)
// 카프레: 밑변 215.3 m, 지금 136.4 m(원래 143.5 m), 꼭대기에 외장석 남음 · 멘카우레: 102.2 × 104.6 m, 높이 약 61 m(원래 65.5 m), 아래쪽 붉은 화강석 외장 · 스핑크스: 길이 73 m, 높이 20 m, 폭 19 m
// 추정: 단 높이 평균 0.69 m, 정상 평탄면 약 8 m, 왕비 피라미드 3기(밑변 약 46 m, 높이 약 29 m), 장례신전 바닥 52 × 40 m, 지형 높낮이(카프레 쪽 약 8 m 높고 스핑크스·시가지 쪽 약 20 m 낮음), 카이로 시가지 매스
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
    const instC=(geo,mat,items,grp,cast,fit)=>{ if(!items.length) return null; if(fit) geo=geo.clone(); const m=new T.InstancedMesh(geo,mat,items.length); m.frustumCulled=false; const M4=new T.Matrix4(),Q=new T.Quaternion(),Sv=new T.Vector3(),V=new T.Vector3(),Eu=new T.Euler(),c=new T.Color(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); Eu.set(0,it[3]||0,0); Q.setFromEuler(Eu); Sv.set(it[4],it[5],it[6]); M4.compose(V,Q,Sv); m.setMatrixAt(i,M4); c.set(it[7]).convertSRGBToLinear(); m.setColorAt(i,c); }); m.instanceMatrix.needsUpdate=true; m.instanceColor.needsUpdate=true; m.castShadow=cast!==false; m.receiveShadow=true;
      if(fit){ geo.computeBoundingBox(); const gb=geo.boundingBox.clone(), bb=new T.Box3(); for(let i=0;i<items.length;i++){ m.getMatrixAt(i,M4); bb.union(gb.clone().applyMatrix4(M4)); } geo.boundingBox=bb; geo.boundingSphere=bb.getBoundingSphere(new T.Sphere()); } (grp||K.cur||K.layer(0)).add(m); return m; };
    const UB=new T.BoxGeometry(1,1,1);
    // 석회암 블록 줄눈 질감(한 단 높이 = 텍스처 한 줄)
    const BLK=E.tex('gz_blk',256,(g,N,rr)=>{ g.fillStyle='#ffffff'; g.fillRect(0,0,N,N); let x=0; while(x<N){ const w=18+rr()*30; g.fillStyle=`rgba(${120+rr()*40|0},${100+rr()*30|0},${70+rr()*20|0},${.10+rr()*.14})`; g.fillRect(x,0,w,N); g.fillStyle='rgba(60,45,30,.55)'; g.fillRect(x,0,2,N); x+=w; } g.fillStyle='rgba(50,38,25,.6)'; g.fillRect(0,0,N,6); g.fillStyle='rgba(255,250,235,.35)'; g.fillRect(0,7,N,4); for(let i=0;i<3000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.12)':'rgba(70,50,30,.14)'; g.fillRect(rr()*N,rr()*N,2,2); } });
    const mkM=(rep)=>{ const t=BLK.clone(); t.needsUpdate=true; t.repeat.set(rep,1); const m=new T.MeshStandardMaterial({color:0xffffff,map:t,roughness:.95}); return m; };
    const STM=mkM(70), STM2=mkM(60), STM3=mkM(34);
    const CAS=K.col(0xd9ccb0,{roughness:.8}), GRN=K.col(0x8a3f35,{roughness:.85}), BAS=K.col(0x3d3a37,{roughness:.9}), LIM=K.col(0xcdb48a,{roughness:.95}), LIMd=K.col(0xb39770,{roughness:.95}), DK=K.col(0x2a241e,{roughness:1}), MAST=K.col(0x6b6b6b,{roughness:.5,metalness:.6}), SPH=K.col(0xc9a874,{roughness:.95}), SPHd=K.col(0xae8c5d,{roughness:.95});
    const tones=['#cdb38a','#c6aa80','#d3bb93','#bfa37a','#c9ae86','#d8c29c','#b99d74']; const mtones=['#bfae90','#b5a283','#c9b99b','#a99878','#c3b498'];
    // 계단식 피라미드: 단마다 정사각 판(인스턴스), 색 조금씩 다르게. casFrom 위는 매끈한 외장석(카프레)
    const pyramid=(cx,cy,cz,B,Ho,Hn,nC,mat,grpFn,casFrom,o)=>{ o=o||{}; const hc=Hn/nC; const L=[[],[],[]]; for(let i=0;i<nC;i++){ const y=i*hc; const w=B*(1-(y+hc)/Ho)+hc*.55; const k=grpFn?grpFn(i/nC):0; let col=tones[(i*7+(i*i)%5)%tones.length]; if(o.granite&&y<o.granite) col=['#8a4a3c','#7d4236','#94564a'][i%3]; if(casFrom&&y>=casFrom) continue; L[k].push([cx,cy+y+hc/2,cz,0,w,hc,w,col]); }
      return L; };
    const R0=(x,z)=>Math.hypot(x,z);
    const TRK=K.col(0x7a6248,{roughness:.95}), PALM=K.col(0x5b7a3a,{roughness:.9});
    const palms=(list,grp)=>{ const tg=new T.CylinderGeometry(.16,.26,1,6); tg.translate(0,.5,0); const fr=[]; for(let i=0;i<10;i++){ const a=i/10*Math.PI*2; const g=new T.BoxGeometry(.5,.06,3.0); g.translate(0,0,1.5); g.rotateX(.25+(i%2)*.35); g.rotateY(a); fr.push(g); } const fg=E.mergeG(fr); inst(tg,TRK,list.map(p=>[p[0],p[1],p[2],0,1,p[3],1]),true,grp); inst(fg,PALM,list.map(p=>[p[0],p[1]+p[3],p[2],(p[0]*7.3)%6,p[3]/9,p[3]/9,p[3]/9]),true,grp); };
    K.layer(0); E.own();
    // ---- 지형: 고원(쿠푸 0 m) · 남서로 완만히 높아짐 · 동쪽 나일 계곡 쪽으로 낮아짐 · 서·남 사구 ----
    const KH=[-322,340], MN=[-563,741], SX=[328,432];
    const base=(x,z)=>{ let h=-20*E.ss((x-170)/300)*E.ss((x+z*.15-120)/260)+8*E.ss((-x*.6+z*.6-160)/420)+3*(E.fbm(x*.01,z*.01,3)-.5); const d=R0(x,z); h+=30*E.fbm(x*.0035+7,z*.0035,3)*E.ss((d-1300)/700)*E.ss((300-x)/300); return h; };
    const zones=[[0,0,128,0],[KH[0],KH[1],120,base(KH[0],KH[1])],[MN[0],MN[1],62,base(MN[0],MN[1])],[SX[0],SX[1],50,base(SX[0],SX[1])-4]];
    const hf=(x,z)=>{ let h=base(x,z); for(const [zx,zz,r,lv] of zones){ const q=Math.max(Math.abs(x-zx),Math.abs(z-zz)); const w=1-E.ss((q-r)/(r>60?40:14)); h=h*(1-w)+lv*w; } if(Math.abs(x)<126&&Math.abs(z)<126) h=-.05; return h; };
    const TR=E.terrain(0,0,0,0,E.axis(3200,190,4.3,0),E.axis(3200,190,4.3,200),hf,(x,z,h,ny)=>{ const n=E.fbm(x*.03,z*.03,2); let c=[.80+.05*n,.68+.05*n,.50+.04*n]; if(ny<.9) c=[.70+.05*n,.60+.04*n,.46+.04*n]; if(x>520&&z>-1400&&z<1400) c=[.62,.57,.50]; const d=R0(x-300,z); const f=E.ss((d-900)/1600)*.55; return c.map((v,i)=>v+([.86,.80,.72][i]-v)*f); });
    // 쿠푸 둘레 포장 마당(석회암 판, 1층이 묻히지 않게 지면 위 얇은 판)
    K.b(0,-.05,0,252,.1,252,LIM);
    // 동쪽 장례신전 터: 현무암 바닥 · 둑길 시작
    K.b(153,-.02,-40,46,.35,40,BAS); K.b(200,-.02,-40,60,.3,9,LIMd);
    // ---- 1~3: 쿠푸 피라미드(단 200 → 3층으로 나눠 쌓임) ----
    const HO=146.6, HN=138.5, NC=200;
    const Lk=pyramid(0,0,0,230.33,HO,HN,NC,STM,t=>t<.25?0:t<.6?1:2);
    K.layer(1); instC(UB,STM,Lk[0],K.layer(1),true,true); K.layer(2); instC(UB,STM,Lk[1],K.layer(2),true,true); K.layer(3); instC(UB,STM,Lk[2],K.layer(3),true,true);
    // 바닥 몇 단에 남은 외장석(북면 가운데)
    K.layer(1); for(let i=0;i<3;i++) K.b(0,i*.7,-(115.4-i*.55),36,.7,1.2,CAS);
    // 북면 원래 입구(지상 약 17 m, 중심 동쪽 7 m) + V자 박공 돌
    { const y=17, w=230.33*(1-y/HO)/2; K.b(7.2,y-1.2,-w-.2,3.4,4.2,5,DK); for(const s of [-1,1]){ const m=K.b(7.2+s*1.9,y+2.4,-w+.5,5.2,1.4,4.4,LIMd); m.rotation.z=s*-.62; } K.b(7.2,y-1.7,-w-1.4,5.8,.5,3,LIM); }
    // 알마문 도굴 구멍(입구 아래 서쪽)
    { const y=7, w=230.33*(1-y/HO)/2; K.b(-1.5,y-1,-w-.4,3,3,4,DK); }
    // 정상: 평평한 마당 + 원래 높이를 표시한 측량 막대
    K.layer(3); K.c(0,HN,0,.12,HO-HN,MAST,8); K.b(0,HN,0,7.6,.5,7.6,LIMd);
    // ---- 0: 왕비 피라미드 3기(동쪽, 남북 한 줄) · 마스타바 묘역 ----
    K.layer(0);
    { const qs=[[177,-60],[177,0],[177,58]]; const all=[]; qs.forEach(([x,z],k)=>{ const Lq=pyramid(x,0,z,[49,47,46][k],[30,30,29][k],[24,22,20][k],34,STM3); all.push(...Lq[0]); }); instC(UB,STM3,all,K.life,true); }
    { const ms=[]; for(let i=0;i<9;i++) for(let j=0;j<10;j++){ const x=-150-i*24-(j%2)*6, z=-170+j*30; if(E.r()<.2) continue; ms.push([x,base(x,z)-.2,z,0,16+E.r()*6,3.5+E.r()*2,8+E.r()*3,tones[(i+j)%tones.length]]); } for(let i=0;i<5;i++) for(let j=0;j<8;j++){ const x=228+i*22, z=-140+j*26; if(E.r()<.25) continue; ms.push([x,base(x,z)-.2,z,0,15+E.r()*5,3+E.r()*2,8+E.r()*2,tones[(i*3+j)%tones.length]]); } ms.forEach((m,i)=>{ m[1]+=m[5]/2; m[7]=mtones[i%mtones.length]; }); instC(UB,LIM,ms,K.life,true); }
    // ---- 맥락(K.life): 카프레(꼭대기 외장석) · 멘카우레(아래 화강석) · 왕비 피라미드 · 스핑크스 · 계곡 신전 ----
    { const y2=zones[1][3]; const L2=pyramid(KH[0],y2,KH[1],215.3,143.5,136.4,196,STM2,null,108); instC(UB,STM2,L2[0],K.life,true);
      // 외장석 남은 꼭대기(매끈한 사면): 108 m 위
      const hw=y=>215.3/2*(1-y/143.5); const g=new T.CylinderGeometry(hw(136.4)*Math.SQRT2,hw(108)*Math.SQRT2,136.4-108,4,1); g.rotateY(Math.PI/4); g.translate(KH[0],y2+108+(136.4-108)/2,KH[1]); const cm=new T.Mesh(g,CAS); cm.castShadow=true; cm.receiveShadow=true; K.life.add(cm);
      // 카프레 장례신전·둑길·계곡 신전(스핑크스 옆)
      const cw=[]; cw.push(bx(KH[0]+135,y2-.5,KH[1]-2,50,5,42)); { const x0=KH[0]+160, z0=KH[1], x1=SX[0]-28, z1=SX[1]+40, L=Math.hypot(x1-x0,z1-z0), ry=-Math.atan2(z1-z0,x1-x0); const n=10; for(let i=0;i<n;i++){ const t=(i+.5)/n, x=x0+(x1-x0)*t, z=z0+(z1-z0)*t; const y=Math.min(TR.h(x0+(x1-x0)*i/n,z0+(z1-z0)*i/n),TR.h(x0+(x1-x0)*(i+1)/n,z0+(z1-z0)*(i+1)/n)); cw.push(bx(x,y-1.2,z,L/n+.4,3.2,8,ry)); } } merge(cw,LIMd,true,K.life);
      const vt=TR.h(SX[0]+4,SX[1]+48); merge([bx(SX[0]+4,vt-.3,SX[1]+48,45,10,45)],K.col(0x8d7864,{roughness:.9}),true,K.life); }
    { const y3=zones[2][3]; const L3=pyramid(MN[0],y3,MN[1],103.4,65.5,61,90,STM3,null,0,{granite:12}); instC(UB,STM3,L3[0],K.life,true); const qq=[]; for(const dx of [-70,0,70]) qq.push(...pyramid(MN[0]+dx,TR.h(MN[0]+dx,MN[1]+110),MN[1]+110,dx?32:44,dx?22:28,dx?13:21,22,STM3)[0]); instC(UB,STM3,qq,K.life,true); }
    // 스핑크스(동향 +x): 몸통·앞발·엉덩이·머리(네메스 두건)·얼굴 — 판 둘레 홈 안에
    { const y=zones[3][3], cx=SX[0], cz=SX[1]; const sg=[], sd=[];
      sg.push(bx(cx-6,y,cz,52,13,19)); sg.push(bx(cx-30,y,cz,14,10,17)); sd.push(bx(cx-6,y+12.4,cz,48,1.8,15)); // 몸통·엉덩이·등
      for(const s of [-1,1]) sg.push(bx(cx+30,y,cz+s*5.5,24,4.2,5.2)); // 앞발
      sg.push(bx(cx+17,y+6,cz,8,12,10)); // 가슴
      sg.push(bx(cx+17,y+16,cz,6.2,6.4,8)); sd.push(bx(cx+16,y+13.5,cz,7,8.5,11.5)); sd.push(bx(cx+15,y+20.4,cz,6,1.2,7.6)); // 머리·네메스·정수리
      merge(sg,SPH,true,K.life); merge(sd,SPHd,true,K.life);
      const pitw=[]; for(const [x,z,w,d] of [[cx-6,cz-24,90,4],[cx-6,cz+24,90,4],[cx-52,cz,4,52]]) pitw.push(bx(x,y,z,w,4.5,d)); merge(pitw,LIMd,true,K.life); }
    // ---- 카이로·기자 시가지(동쪽 계곡 · 흐린 대기 속) ----
    { const cs=['#b8a58c','#c7b8a1','#a99377','#d6cbb8','#9c8a74','#bfae96','#8f7e6b']; const it=[]; for(let z=-1500;z<1500;z+=22) for(let x=430;x<2600;x+=22){ const xx=x+(E.r()-.5)*10, zz=z+(E.r()-.5)*10; if(xx<520&&Math.abs(zz-SX[1])<140) continue; if(xx<470+80*E.vn(zz*.01,3)) continue; if(E.r()<.12) continue; const far=E.ss((xx-600)/1400); const h=(8+E.r()*22)*(1+far*1.6)*(E.r()<.04?2.4:1); const w=12+E.r()*8; it.push([xx,TR.h(xx,zz)+h/2-.3,zz,(E.r()-.5)*.2,w,h,w*(.7+E.r()*.5),cs[Math.floor(E.r()*cs.length)]]); } instC(UB,K.col(0xffffff,{roughness:.9}),it,K.life,false); }
    // 야자수 몇 그루(시가지 가장자리)
    palms(Array.from({length:60},(_,i)=>{ const z=-300+i*16+E.r()*8, x=455+E.r()*50; return [x,TR.h(x,z)-.3,z,11+E.r()*5]; }),K.life);
    tidy(1);
  }});
