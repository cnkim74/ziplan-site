__bsigFill({"abusimbel":function(K){
// 출처: 영문 위키백과 「Abu Simbel」·famous-historic-buildings.org.uk — 대신전 정면 폭 35 m·높이 약 30 m, 좌상 4체 약 20 m, 소신전 입상(각 약 10 m) 람세스 4·네페르타리 2, 1964~1968 유네스코 이전(원래 자리보다 약 65 m 높이·물에서 약 200 m), 동향(호수 쪽) · 왼쪽 둘째 좌상 윗몸 붕괴(고대 지진)
// 추정: 좌상 세부 비례(앉은 높이·두건·왕관), 입구 폭 약 4 m·높이 약 8 m, 개코원숭이 22체 높이 약 2.4 m, 소신전 정면 약 28 × 12 m와 두 신전 사이 약 100 m, 절벽·언덕 높이(인공 돔 위 덮은 바위), 앞마당 높이와 호수 수위(-9 m)
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
    const SS=K.col(0xd4a677,{roughness:.95}), SSl=K.col(0xe2bb8c,{roughness:.92}), SSd=K.col(0xb88a5e,{roughness:.95}), DK=K.col(0x2b2119,{roughness:1}), PV=K.col(0xcaa47a,{roughness:1});
    // 사암 절벽 질감(가로 지층 + 균열)
    const RT=E.tex('as_rock',512,(g,N,rr)=>{ g.fillStyle='#d2a676'; g.fillRect(0,0,N,N); for(let y=0;y<N;y+=6+rr()*14){ g.fillStyle=`rgba(${150+rr()*60|0},${100+rr()*40|0},${60+rr()*30|0},${.12+rr()*.15})`; g.fillRect(0,y,N,3+rr()*6); } for(let i=0;i<60;i++){ g.strokeStyle='rgba(90,60,35,.35)'; g.lineWidth=1+rr(); g.beginPath(); let x=rr()*N, y=rr()*N; g.moveTo(x,y); for(let k=0;k<5;k++){ x+=(rr()-.5)*30; y+=rr()*25; g.lineTo(x,y); } g.stroke(); } for(let i=0;i<6000;i++){ g.fillStyle=rr()<.5?'rgba(255,240,220,.10)':'rgba(80,50,30,.12)'; g.fillRect(rr()*N,rr()*N,2,2); } });
    const ROCK=E.tmat(RT,0xd2a676,{roughness:.95}); RT.repeat.set(1,1);
    const tbG=(x,y,z,w0,w1,h,d0,d1)=>{ const g=new T.BoxGeometry(1,h,1); const p=g.attributes.position; for(let i=0;i<p.count;i++){ const top=p.getY(i)>0; p.setX(i,p.getX(i)*(top?w1:w0)); p.setZ(i,p.getZ(i)*(top?(d1||d0):d0)); } g.computeVertexNormals(); g.translate(x,y+h/2,z); return g; };
    // 좌상(앉은 왕) — 등은 정면 벽(z=0)에 붙고 +z로 무릎·발이 나옴. dmg=1이면 윗몸이 무너진 상태
    const seated=(cx,dmg)=>{ const A=[],B=[],C=[];
      A.push(bx(cx,0,4.6,7.6,1.3,9.4)); // 대좌
      A.push(bx(cx,1.3,2.2,7.2,6.8,4.4)); // 왕좌(옆면 상형문자 판)
      for(const s of [-1,1]){ A.push(bx(cx+s*1.2,1.3,7.4,2.0,6.9,2.2)); A.push(bx(cx+s*1.2,1.3,8.6,2.0,1.0,2.8)); A.push(bx(cx+s*1.2,8.0,5.0,2.2,1.7,6.6)); } // 정강이·발·허벅지
      B.push(bx(cx+3.62,1.6,2.2,.1,5.6,3.6)); B.push(bx(cx-3.62,1.6,2.2,.1,5.6,3.6));
      for(const s of [-1,1]) C.push(bx(cx+s*3.2,0,8.6,1.1,3.6,1.1),bx(cx+s*3.2,3.6,8.6,.8,.8,.8)); C.push(bx(cx,1.3,8.9,1.1,3.3,1.0),bx(cx,4.6,8.9,.8,.8,.8)); // 발치의 작은 가족상
      if(!dmg){ A.push(tbG(cx,9.6,2.4,3.6,6.4,5.8,2.8,2.4)); // 몸통(허리→어깨)
        for(const s of [-1,1]){ A.push(bx(cx+s*2.85,10.0,2.6,1.3,5.0,1.7)); A.push(bx(cx+s*1.5,9.7,5.6,1.3,1.1,4.6)); A.push(bx(cx+s*1.5,9.7,7.9,1.4,1.2,.9)); } // 팔·무릎 위 손
        A.push(tbG(cx,14.6,2.3,6.0,4.6,3.6,3.2,3.0)); // 네메스 두건
        for(const s of [-1,1]) B.push(bx(cx+s*2.0,12.4,3.9,1.2,3.2,.5)); // 두건 늘어뜨린 자락
        { const f=new T.SphereGeometry(1,12,10); f.scale(1.35,1.6,.9); f.translate(cx,16.3,3.9); A.push(f); } B.push(bx(cx,13.6,4.1,.8,1.6,.7)); // 얼굴·턱수염
        B.push(bx(cx,15.6,4.35,2.2,.25,.1)); B.push(bx(cx,16.5,4.35,.5,.6,.25)); // 눈썹 그늘·코
        C.push(tbG(cx,18.1,2.4,3.2,2.6,1.4,3.0,2.6)); const cr=new T.CylinderGeometry(.42,1.0,2.4,12); cr.translate(cx,18.2+1.2+1.2,2.6); A.push(cr); const kb=new T.SphereGeometry(.5,10,8); kb.translate(cx,21.0,2.6); A.push(kb); // 이중 왕관(붉은 관 + 흰 관)
      } else { A.push(tbG(cx,9.6,2.4,3.6,4.4,1.6,2.8,2.7)); // 남은 허리
        const hd=tbG(0,0,0,6.0,4.6,3.6,3.2,3.0); hd.rotateZ(1.25); hd.rotateY(.5); hd.translate(cx-1.5,1.6,15); A.push(hd); const fc=new T.BoxGeometry(2.6,2.8,1.4); fc.rotateZ(1.25); fc.rotateY(.5); fc.translate(cx-.9,2.4,16.4); A.push(fc); const ts=tbG(0,0,0,3.6,6.4,5.8,2.8,2.4); ts.rotateX(-1.4); ts.rotateY(-.35); ts.translate(cx+2.6,1.5,13.4); A.push(ts); }
      for(const L of [A,B,C]) L.forEach(g=>{ g.translate(-cx,0,0); g.scale(1.02,1.15,1.1); g.translate(cx,0,0); }); merge(A,SSl,true); merge(B,SSd,true); merge(C,SS,true); };
    // 선 상(소신전) — kind 0 람세스(이중 왕관) · 1 네페르타리(원반·깃털 관)
    const standing=(cx,cz,H,kind,ry,grp)=>{ const A=[]; const s=H/10; const P=(g)=>{ g.translate(0,0,0); g.rotateY(ry||0); g.translate(cx,0,cz); return g; };
      for(const k of [-1,1]) A.push(P(bx(k*.55*s,0,(k>0?.6:0)*s,.9*s,4.6*s,1.1*s))); A.push(P(tbG(0,4.4*s,0,1.9*s,2.2*s,1.6*s,1.4*s))); A.push(P(tbG(0,6.0*s,0,2.0*s,2.6*s,2.0*s,1.3*s,1.2*s)));
      A.push(P(bx(0,8.0*s,0,1.5*s,1.4*s,1.4*s))); if(kind===0){ A.push(P(tbG(0,9.2*s,0,1.3*s,.6*s,1.4*s,1.1*s))); } else { A.push(P(bx(0,9.3*s,0,1.6*s,.3*s,1.3*s))); const d=new T.CylinderGeometry(.55*s,.55*s,.25*s,14); d.rotateX(Math.PI/2); d.translate(0,10*s,0); A.push(P(d)); for(const k of [-1,1]) A.push(P(bx(k*.22*s,10.4*s,0,.3*s,1.0*s,.15*s))); }
      merge(A,SSl,true,grp); };
    const TRK=K.col(0x7a6248,{roughness:.95}), PALM=K.col(0x5b7a3a,{roughness:.9});
    const palms=(list,grp)=>{ const tg=new T.CylinderGeometry(.16,.26,1,6); tg.translate(0,.5,0); const fr=[]; for(let i=0;i<10;i++){ const a=i/10*Math.PI*2; const g=new T.BoxGeometry(.5,.06,3.0); g.translate(0,0,1.5); g.rotateX(.25+(i%2)*.35); g.rotateY(a); fr.push(g); } const fg=E.mergeG(fr); inst(tg,TRK,list.map(p=>[p[0],p[1],p[2],0,1,p[3],1]),true,grp); inst(fg,PALM,list.map(p=>[p[0],p[1]+p[3],p[2],(p[0]*7.3)%6,p[3]/9,p[3]/9,p[3]/9]),true,grp); };
    K.layer(0); E.own();
    // ---- 지형(K.life): 대신전 뒤 바위 언덕(약 36 m) · 소신전 언덕 · 앞마당 → 호수(약 -9 m) · 사막 고원 ----
    const SX0=101, SZ0=0;
    const zf=x=>{ const a=Math.abs(x); if(a<18.2) return -3.2; if(a<26) return -3.2+(a-18.2)*1.2; if(x>88&&x<115) return SZ0-2.6; if(x>80&&x<88) return 6-(x-80)*1.1; if(x>115&&x<122) return SZ0-2.6+(x-115)*1.2; return 6+3*E.vn(x*.05,1); };
    const wcl=x=>{ const a=Math.abs(x); if(a<26||(x>80&&x<122)) return 1.4; return 10; };
    const hill=(x,z)=>{ const r1=Math.hypot(x,(z+40)*1.1), r2=Math.hypot(x-SX0,(z+18)*1.2); let h=Math.max(36*(1-E.ss((r1-48)/70)), 16*(1-E.ss((r2-18)/40))); h+=4*(E.fbm(x*.03,z*.03,3)-.5); return h; };
    const front=(x,z)=>{ let h=-11*E.ss((z-44)/60)-1.2*E.ss((Math.abs(x-50)-120)/80)*E.ss((z-30)/40); return h; };
    const hf=(x,z)=>{ const f=front(x,z); const d=zf(x)-z; if(d<=0) return f; const t=E.ss(d/wcl(x)); const hh=hill(x,z)+18*E.ss((Math.hypot(x-50,z+60)-260)/400)+10*(E.fbm(x*.004,z*.004,3)-.4)*E.ss((Math.hypot(x,z)-300)/300); return Math.max(f,f+(hh-f)*t); };
    const axD=(R,n,k,a,b,st)=>{ const L=E.axis(R,n,k,(a+b)/2).filter(v=>v<a||v>b); for(let v=a;v<=b;v+=st) L.push(v); return L.sort((p,q)=>p-q); };
    const TR=E.terrain(0,0,0,0,axD(3000,150,4.6,-50,150,.8),axD(3000,150,4.6,-26,40,.7),hf,(x,z,h,ny)=>{ const n=E.fbm(x*.04,z*.04,2); let c=[.86+.04*n,.70+.04*n,.50+.04*n]; if(ny<.75) c=[.80+.05*n,.58+.05*n,.40+.04*n]; if(h<-8.6) c=[.70,.62,.50]; const d=Math.hypot(x-40,z); const f=E.ss((d-700)/1500)*.5; return c.map((v,i)=>v+([.88,.82,.74][i]-v)*f); });
    // 호수(나세르) · 건너편 낮은 사막 기슭
    { const wm=new T.Mesh(new T.PlaneGeometry(6000,3000),E.WATER); wm.rotation.x=-Math.PI/2; wm.position.set(0,-9,1580); wm.receiveShadow=true; K.life.add(wm); }
    // 앞마당 포장(사암 판) · 앞 난간 · 계단
    K.b(0,-.05,9,60,.1,26,PV); K.b(SX0-50,-.05,10,70,.08,14,PV);
    // ---- 1: 대신전 정면 판(절벽을 파낸 사다리꼴 면) ----
    K.layer(1);
    { const g=tbG(0,0,-1.9,35.8,34.2,30.6,3.8); const m=new T.Mesh(g,ROCK); m.castShadow=true; m.receiveShadow=true; K.cur.add(m); }
    K.b(0,26.0,-.05,35.4,.6,.4,SS); K.b(0,26.6,.05,35,1.4,.5,SSd); // 둥근 테·코니스
    { const it=[]; for(let i=0;i<22;i++){ const x=-16+i*32/21; it.push([x,28.0,.25,0,1.0,1.9,1.1]); it.push([x,29.9,.4,0,.7,.6,.7]); } inst(new T.BoxGeometry(1,1,1).translate(0,.5,0),SSl,it,true); } // 개코원숭이 프리즈
    { const it=[]; for(let i=0;i<36;i++) it.push([-17+i*34/35,26.8,.42,0,.5,1.1,.2]); inst(boxG(1,1,1),SSd,it,false); } // 우라에우스(코브라) 띠
    K.b(0,0,.02,5.2,9.4,.3,SSd); K.b(0,0,.12,4.0,8.2,.3,DK); K.b(0,8.2,.2,4.6,.9,.4,SSl); // 입구 + 문틀
    K.b(0,10.9,-.1,5.0,9.4,.4,SSd); K.b(0,10.6,.15,5.6,.5,1.0,SSl); merge([bx(0,11.2,.3,2.2,6.2,1.2),bx(0,17.4,.4,1.5,1.6,1.2),bx(0,19.0,.45,1.8,1.8,.3)],SSl,true); // 벽감의 라-호라크티(매 머리 + 태양 원반)
    for(const s of [-1,1]) K.b(s*2.6,10.8,.2,1.0,7.8,.6,SSd);
    { const it=[]; for(let i=0;i<9;i++) for(const s of [-1,1]) it.push([s*(3.2+i*.2),19.5+i*.0,-.0,0,.3,4.5,.12]); } // (자리: 부조 줄)
    { const it=[]; for(let r=0;r<7;r++) for(let i=0;i<28;i++){ const x=-16.4+i*1.2; if(Math.abs(x)<3.4&&r<5) continue; it.push([x,20+r*.8,.03,0,.9,.12,.05]); } inst(boxG(1,1,1),SSd,it,false); } // 상형문자 띠 그늘
    // ---- 2: 좌상 4체(왼쪽 둘째 무너짐) ----
    K.layer(2); seated(-13.6,0); seated(-6.1,1); seated(6.1,0); seated(13.6,0);
    // ---- 0: 앞 난간·매 상·가장자리 · 계단 ----
    K.layer(0);
    { const pg=[]; for(const s of [-1,1]) pg.push(bx(s*15.5,0,14.5,20,1.1,1.2)); pg.push(bx(0,-.6,17.5,9,.6,5)); merge(pg,SS,true); const it=[]; for(let i=0;i<8;i++) for(const s of [-1,1]) it.push([s*(7+i*2.4),1.1,14.5,0,.9,1.8,1.2]); inst(boxG(1,1,1),SSl,it,true); }
    // ---- 맥락(K.life): 소신전(입상 6 + 버트레스 7) ----
    { const G=K.life, ry=-.12; const cx=SX0, cz=SZ0; const P=(x,z)=>[cx+x*Math.cos(ry)+z*Math.sin(ry),cz-x*Math.sin(ry)+z*Math.cos(ry)];
      const fg=[]; { const g=tbG(0,0,-1.6,29,27,12.8,3.2); g.rotateY(ry); g.translate(cx,0,cz); fg.push(g); } merge(fg,ROCK,true,G);
      const bt=[]; const xs=[-13.6,-9.6,-5.6,-2.2,2.2,5.6,9.6,13.6]; xs.forEach(x=>{ const [px,pz]=P(x,1.0); const g=tbG(0,0,0,1.5,1.2,12.4,2.4,1.0); g.rotateY(ry); g.translate(px,0,pz); bt.push(g); }); merge(bt,SSl,true,G);
      const [dx,dz]=P(0,.05); merge([(()=>{ const g=new T.BoxGeometry(2.8,6,.3); g.rotateY(ry); g.translate(dx,3,dz); return g; })()],DK,false,G);
      [[-11.6,0],[-7.6,1],[-3.9,0],[3.9,0],[7.6,1],[11.6,0]].forEach(([x,k])=>{ const [px,pz]=P(x,.9); standing(px,pz,10,k,ry,G); });
      const cn=[]; { const g=new T.BoxGeometry(28.6,.8,1.0); g.rotateY(ry); const [qx,qz]=P(0,.2); g.translate(qx,12.6,qz); cn.push(g); } merge(cn,SSd,true,G); }
    // 앞마당 야자·관목 조금 · 호숫가 길
    palms(Array.from({length:22},(_,i)=>{ const x=-80+i*9+E.r()*4, z=38+E.r()*12; return [x,TR.h(x,z)-.2,z,7+E.r()*4]; }),K.life);
    tidy(1);
  }});
