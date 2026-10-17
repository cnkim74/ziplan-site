__bsigFill({"lalibela":function(K){
// 출처: 영문 위키백과 「Church of Saint George, Lalibela」 — 12세기 말~13세기 초, 십자형, 화산 응회암 단일 암반, 좁은 참호가 굴로 이어지는 진입 · hiddenarchitecture.net — 십자 평면 약 12 m, 구덩이(마름모꼴) 약 20 m·깊이 약 12 m
// 추정: 팔 폭 4.4 m, 3단 기단 높이 약 1.5 m, 창 크기·배치(아래 장방형 막힌 창, 위 오지 창), 지붕 3겹 십자 부조, 구덩이 약 22 × 22 m 둥근 모서리, 서쪽 참호, 주변 둥근 2층 돌집·초가 원뿔 지붕, 유칼립투스, 먼 산
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
    const RT=E.tex('ll_tuff',512,(g,N,rr)=>{ g.fillStyle='#9a5f45'; g.fillRect(0,0,N,N); for(let i=0;i<700;i++){ g.fillStyle=`rgba(${120+rr()*60|0},${70+rr()*30|0},${50+rr()*25|0},${.12+rr()*.2})`; g.beginPath(); g.ellipse(rr()*N,rr()*N,4+rr()*24,3+rr()*12,rr()*3,0,7); g.fill(); } for(let i=0;i<110;i++){ g.fillStyle=`rgba(${190+rr()*40|0},${170+rr()*40|0},${60+rr()*40|0},${.25+rr()*.3})`; g.beginPath(); g.arc(rr()*N,rr()*N,2+rr()*10,0,7); g.fill(); } for(let i=0;i<6000;i++){ g.fillStyle=rr()<.5?'rgba(255,220,190,.10)':'rgba(50,25,15,.14)'; g.fillRect(rr()*N,rr()*N,2,2); } });
    const TUF=E.tmat(RT,0x9a5f45,{roughness:.96}); RT.repeat.set(1,1);
    const TUFl=K.col(0xae7458,{roughness:.95}), TUFd=K.col(0x6e4232,{roughness:.98}), DK=K.col(0x24160f,{roughness:1}), WD=K.col(0x4a3324,{roughness:.9});
    const AW=4.4, HA=6, H=12, PL=1.5; // 팔 폭·반길이·높이·기단
    const crossPts=(a,w)=>[[-a,-w/2],[-w/2,-w/2],[-w/2,-a],[w/2,-a],[w/2,-w/2],[a,-w/2],[a,w/2],[w/2,w/2],[w/2,a],[-w/2,a],[-w/2,w/2],[-a,w/2]];
    // ogee(꽃잎 끝) 창 윤곽 — 세운 면에 붙임
    const ogee=(w,h)=>{ const P=[[-w/2,0],[w/2,0],[w/2,h*.55]]; for(let i=1;i<=6;i++){ const t=i/6; P.push([w/2*(1-t),h*.55+h*.45*Math.sin(t*Math.PI/2)+(t>.7?(t-.7)*h*.3:0)]); } for(let i=5;i>=1;i--){ const t=i/6; P.push([-w/2*(1-t),h*.55+h*.45*Math.sin(t*Math.PI/2)+(t>.7?(t-.7)*h*.3:0)]); } P.push([-w/2,h*.55]); return P; };
    const winOn=(cx,y,cz,ry,kind)=>{ if(kind===0){ // 아래: 장방형 막힌 창 + 악숨식 원숭이 머리 틀
        K.b(cx,y,cz,1.5,1.9,.18,TUFl,ry); K.b(cx,y+.2,cz,1.0,1.5,.3,DK,ry); for(const yy of [y-.05,y+1.95]) K.b(cx,yy,cz,1.9,.18,.32,TUFl,ry); }
      else { const sh=new T.Shape(); ogee(1.0,2.2).forEach(([x,yy],i)=>i?sh.lineTo(x,yy):sh.moveTo(x,yy)); const g=new T.ExtrudeGeometry(sh,{depth:.32,bevelEnabled:false}); g.translate(0,0,-.16); const m=new T.Mesh(g,DK); m.position.set(cx,y,cz); m.rotation.y=ry; (K.cur||K.layer(0)).add(m); K.b(cx,y-.15,cz,1.5,.18,.3,TUFl,ry); } };
    K.layer(0); E.own();
    // ---- 지형(K.life): 고원면(y=12) · 십자 교회를 둘러 판 구덩이(바닥 0) · 서쪽 참호 · 둘레 언덕과 먼 산 ----
    const pitR=(x,z)=>{ const a=Math.atan2(z,x); return 10.6+.7*Math.sin(a*3+.6)+.4*Math.cos(a*7); };
    const inPit=(x,z)=>{ const q=Math.pow(Math.pow(Math.abs(x),5)+Math.pow(Math.abs(z),5),1/5); return q-pitR(x,z); };
    const hf=(x,z)=>{ const d=Math.hypot(x,z); let top=H+.3+.4*(E.fbm(x*.08,z*.08,2)-.5)*E.ss((d-14)/8)+28*E.peaks(x,z,[[220,-180,260,200,1,1.2],[-260,-60,200,240,.6,1.2],[60,320,300,180,.7,1.2]])+E.peaks(x,z,[[400,-1400,1400,400,320,1.1],[-1600,-600,900,900,260,1.2],[1500,700,900,800,220,1.2]]);
      const e=inPit(x,z); let h=e<0?0:Math.min(top,(e/1.0)*H*1.0); if(e>=0&&e<1.0) h=H*e/1.0; if(e>=1.0) h=top;
      if(x<-9&&x>-46&&Math.abs(z)<1.3){ const t=E.ss((-x-9)/37); h=Math.min(h,H*t); } return h; };
    const axD=(R,n,k,a,b,st)=>{ const L=E.axis(R,n,k,(a+b)/2).filter(v=>v<a||v>b); for(let v=a;v<=b;v+=st) L.push(v); return L.sort((p,q)=>p-q); };
    const TR=E.terrain(0,0,0,0,axD(3200,170,4.8,-48,16,.35),axD(3200,170,4.8,-16,16,.35),hf,(x,z,h,ny)=>{ const n=E.fbm(x*.06,z*.06,2); if(ny<.8||h<H-.2) return [.56+.06*n,.35+.04*n,.26+.03*n]; const d=Math.hypot(x,z); if(d<18) return [.58+.05*n,.42+.04*n,.30+.03*n]; const g=E.vn(x*.02,z*.02); let c=g>.5?[.58+.05*n,.50+.04*n,.33+.03*n]:[.45+.05*n,.46+.04*n,.29+.03*n]; if(ny<.85) c=[.50,.38,.30]; const f=E.ss((d-500)/1400)*.6; return c.map((v,i)=>v+([.66,.70,.76][i]-v)*f); });
    // 구덩이 바닥(바위판) · 세례 물웅덩이
    K.b(0,-.05,0,21,.1,21,TUFd); K.water(7.2,.08,-7.4,2.2,1.6);
    // ---- 0: 3단 기단 ----
    for(let i=0;i<3;i++){ const a=HA+1.5-i*.5, w=AW+3-i*1.0; K.ex(crossPts(a,w),PL/3,TUFl,[0,i*PL/3,0]); }
    // ---- 1: 몸체 아래층(벽 · 막힌 창 · 서쪽 문) ----
    K.layer(1);
    const L1=(H-PL)*.48;
    K.ex(crossPts(HA,AW),L1,TUF,[0,PL,0]);
    K.ex(crossPts(HA+.12,AW+.24),.35,TUFl,[0,PL+L1-.1,0]); // 층 띠
    // 창·문: 팔 끝면(4) + 안쪽 꺾인 면(8)
    const faces=[]; for(let k=0;k<4;k++){ const ry=k*Math.PI/2; const c=Math.cos(ry), s=Math.sin(ry); faces.push([s*(HA+.05),c*(HA+.05),ry,0]); for(const q of [-1,1]){ const lx=q*(AW/2+(HA-AW/2)/2), lz=AW/2+.05; faces.push([lz*s+lx*c, lz*c-lx*s, ry, 1]); } }
    faces.forEach(([x,z,ry,k],i)=>{ if(k===0&&i===12-3*1){ } if(k===0&&Math.abs(ry-Math.PI*1.5)<.1){ K.b(x,PL,z,1.6,2.9,.3,DK,ry); K.b(x,PL+2.9,z,2.1,.3,.4,TUFl,ry); } else winOn(x,PL+1.0,z,ry,0); });
    // ---- 2: 위층(오지 창) · 처마 띠 · 지붕 십자 부조 ----
    K.layer(2);
    const L2=H-PL-L1;
    K.ex(crossPts(HA,AW),L2,TUF,[0,PL+L1,0]);
    faces.forEach(([x,z,ry])=>winOn(x,PL+L1+1.0,z,ry,1));
    K.ex(crossPts(HA+.1,AW+.2),.3,TUFl,[0,H-.3,0]);
    // 지붕: 세 겹 십자(바깥 띠 → 안쪽 튀어나온 십자 2단)
    K.ex(crossPts(HA-.5,AW-1.0),.18,TUFl,[0,H,0]); K.ex(crossPts(HA-1.0,AW-2.0),.18,TUF,[0,H+.18,0]); K.ex(crossPts(HA-1.5,AW-3.0),.18,TUFl,[0,H+.36,0]);
    // 구덩이 벽의 굴(은수자 방·무덤) — 어두운 입
    { const it=[]; for(let i=0;i<14;i++){ const a=i/14*Math.PI*2+.2; if(Math.abs(Math.atan2(Math.sin(a),Math.cos(a))-Math.PI)<.3) continue; let r=9; while(inPit(Math.cos(a)*r,Math.sin(a)*r)<0) r+=.1; const x=Math.cos(a)*(r-.05), z=Math.sin(a)*(r-.05); const y=(i%3===0)?6:.0; it.push([x,y,z,Math.atan2(x,z),1.1,1.7,.3]); } inst(boxG(1,1,1),DK,it,false,K.life); }
    // 참호 끝의 굴 입구 · 나무 문
    K.b(-9.6,0,0,1.0,2.6,2.0,DK);
    // ---- 맥락(K.life): 가장자리 낮은 담 · 둥근 돌집(초가 원뿔) · 유칼립투스 ----
    { const st=[], rf=[]; for(let i=0;i<70;i++){ const a=E.r()*6.28, r=60+E.r()*260; const x=Math.cos(a)*r, z=Math.sin(a)*r; if(x<-30&&Math.abs(z)<12) continue; const y=TR.h(x,z); const R=2.4+E.r()*1.6, h=E.r()<.4?5.5:3.0; st.push([x,y-.3,z,0,R,h,R]); rf.push([x,y-.3+h,z,0,R*1.25,R*1.1,R*1.25]); }
      inst((()=>{ const g=new T.CylinderGeometry(1,1,1,12); g.translate(0,.5,0); return g; })(),K.col(0x8a6a55,{roughness:.95}),st,true,K.life); inst((()=>{ const g=new T.ConeGeometry(1,1,12); g.translate(0,.5,0); return g; })(),K.col(0x9c8a5a,{roughness:1}),rf,true,K.life);
      const wl=[]; for(let i=0;i<44;i++){ const a=i/44*Math.PI*2; const r=15.5; const x=Math.cos(a)*r, z=Math.sin(a)*r; if(x<-12&&Math.abs(z)<4) continue; wl.push(bx(x,TR.h(x,z)-.2,z,2.4,.9,.5,-a+Math.PI/2)); } merge(wl,K.col(0x7d5a46,{roughness:.95}),true,K.life);
      const tr=E.scatter(-700,700,-700,700,13,TR.h,(x,z,h)=>Math.hypot(x,z)>45&&!(x<-20&&Math.abs(z)<6)&&E.r()<.35,(x,z)=>12+E.vn(x*.05,z*.05)*12,(x,z)=>E.r()<.7?2:0); E.forest(tr.map(t=>{ t[6]=(t[4]===2?.55:1); return t; }),{trunks:true,pal:[null,null,['#5d7448','#6d8152','#536a42','#788c5c']]}); }
    tidy(1);
  }});
