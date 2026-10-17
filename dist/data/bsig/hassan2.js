__bsigFill({"hassan2":function(K){
// 출처: 영문 위키백과 「Hassan II Mosque」 — 미나렛 210 m, 기도실 200 × 100 m(문헌마다 차이), 3,400 ㎡ 개폐 지붕(1,100 t, 약 5분), 1986.7.12 착공 ~ 1993.8.30 완공, 미셸 펭소 설계·부이그 시공, 아틀라스 삼나무·아가디르 대리석·타프라우트 화강석, 티타늄·청동 마감, 젤리주, 일부가 대서양 위 매립 기단 · mosqpedia — 지붕 높이 60 m, 광장 8만 명
// 추정: 미나렛 밑변 25 m·랜턴 탑 폭 9 m·몸통 높이 176 m, 미나렛 위치(광장 쪽 서남 모서리), 기도실 벽 높이 26 m·지붕 단 구성, 기단 높이 약 2 m, 광장·부속 건물(마드라사·박물관) 배치, 해안선, 시가지 매스
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
    // 말발굽 아치 경로(캔버스용)
    const horse=(g,cx,yb,w,h)=>{ const r=w/2; g.beginPath(); g.moveTo(cx-r*.82,yb); g.lineTo(cx-r*.82,yb-h+r*1.15); g.arc(cx,yb-h+r,r,Math.PI*.82,Math.PI*2.18,false); g.lineTo(cx+r*.82,yb); g.closePath(); };
    // 기도실 벽(512 px = 26 m): 크림 석재 · 아래 큰 말발굽 아치(청동 문) · 위 작은 아치 창 · 초록 띠
    const WT=E.tex('h2_wall',512,(g,N,rr)=>{ g.fillStyle='#e9e0cc'; g.fillRect(0,0,N,N); for(let i=0;i<5000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.12)':'rgba(150,130,100,.10)'; g.fillRect(rr()*N,rr()*N,2,2); } for(let k=0;k<3;k++){ const cx=N*(k+.5)/3; g.fillStyle='#d8ccb3'; horse(g,cx,N,128,330); g.fill(); g.fillStyle='#8a6a3c'; horse(g,cx,N,96,280); g.fill(); g.strokeStyle='rgba(60,45,25,.5)'; g.lineWidth=2; for(let y=N-260;y<N;y+=22){ g.beginPath(); g.moveTo(cx-40,y); g.lineTo(cx+40,y); g.stroke(); } g.fillStyle='#d8ccb3'; horse(g,cx,150,60,96); g.fill(); g.fillStyle='#4a5b5a'; horse(g,cx,146,40,80); g.fill(); } g.fillStyle='#2f7a5c'; g.fillRect(0,22,N,22); g.fillStyle='#e9e0cc'; for(let x=0;x<N;x+=16) g.fillRect(x+4,27,8,12); g.fillStyle='rgba(120,100,70,.35)'; g.fillRect(0,170,N,4); });
    const WALL=E.tmat(WT,0xe9e0cc,{roughness:.7});
    // 미나렛 아래(돌 블라인드 아케이드) · 위(초록 젤리주 판) — 512 px = 25 m
    const MA=E.tex('h2_minA',512,(g,N,rr)=>{ g.fillStyle='#e6dcc6'; g.fillRect(0,0,N,N); for(let i=0;i<4000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.12)':'rgba(150,130,100,.10)'; g.fillRect(rr()*N,rr()*N,2,2); } g.fillStyle='#d5c7aa'; g.fillRect(70,40,N-140,N-80); for(let k=0;k<4;k++){ const cx=110+k*97; g.fillStyle='#c4b38f'; horse(g,cx,N-60,70,300); g.fill(); g.fillStyle='rgba(90,80,60,.55)'; horse(g,cx,N-70,40,250); g.fill(); } g.strokeStyle='#b9a782'; g.lineWidth=6; g.strokeRect(70,40,N-140,N-80); });
    const MB=E.tex('h2_minB',512,(g,N,rr)=>{ g.fillStyle='#e6dcc6'; g.fillRect(0,0,N,N); g.fillStyle='#2c7457'; g.fillRect(60,30,N-120,N-60); g.strokeStyle='rgba(230,240,225,.75)'; g.lineWidth=3; const s=28; for(let x=60;x<N-60;x+=s) for(let y=30;y<N-30;y+=s){ g.beginPath(); g.moveTo(x+s/2,y); g.lineTo(x+s,y+s/2); g.lineTo(x+s/2,y+s); g.lineTo(x,y+s/2); g.closePath(); g.stroke(); } g.fillStyle='#e6dcc6'; horse(g,N/2,N-30,170,330); g.fill(); g.fillStyle='#3b4b4d'; horse(g,N/2,N-40,110,270); g.fill(); g.fillStyle='#c9a54a'; g.fillRect(60,24,N-120,8); g.fillRect(60,N-32,N-120,8); });
    const MINA=E.tmat(MA,0xe6dcc6,{roughness:.65}), MINB=E.tmat(MB,0xe6dcc6,{roughness:.45});
    // 초록 유약 기와(512 px = 6 m): 줄 · 반사
    const TT=E.tex('h2_tile',256,(g,N,rr)=>{ g.fillStyle='#2e7b5a'; g.fillRect(0,0,N,N); for(let x=0;x<N;x+=16){ g.fillStyle='rgba(20,60,40,.45)'; g.fillRect(x,0,3,N); g.fillStyle='rgba(160,220,190,.25)'; g.fillRect(x+6,0,3,N); } for(let y=0;y<N;y+=20){ g.fillStyle='rgba(15,50,35,.4)'; g.fillRect(0,y,N,3); } });
    const TILE=new T.MeshStandardMaterial({color:0xffffff,map:TT,roughness:.3,metalness:.1,side:T.DoubleSide});
    const ST=K.col(0xe9e0cc,{roughness:.7}), STd=K.col(0xcfc2a5,{roughness:.75}), GRN=K.col(0x2e7b5a,{roughness:.3,metalness:.1}), GOLD=K.col(0xd4a640,{roughness:.3,metalness:.8}), BRZ=K.col(0x6e5532,{roughness:.4,metalness:.6}), DK=K.col(0x34403f,{roughness:.6}), MAR=K.col(0xf0ece4,{roughness:.35});
    // 우진각 지붕(가운데 용마루 + 네 면) — 기와 UV
    const hipG=(cx,y0,cz,w,d,h,ov)=>{ ov=ov||0; const W=w/2+ov, D=d/2+ov, rl=Math.max(0,(w-d)/2); const A=[-W,y0,-D], B=[W,y0,-D], C=[W,y0,D], Dd=[-W,y0,D], R1=[-rl,y0+h,0], R2=[rl,y0+h,0]; const P=[], U=[]; const tri=(a,b,c,ua,ub,uc)=>{ P.push(...a,...b,...c); U.push(...ua,...ub,...uc); }; const sl=Math.hypot(h,D)/6;
      tri(Dd,C,R2,[-W/6,0],[W/6,0],[rl/6,sl]); tri(Dd,R2,R1,[-W/6,0],[rl/6,sl],[-rl/6,sl]); tri(B,A,R1,[W/6,0],[-W/6,0],[-rl/6,sl]); tri(B,R1,R2,[W/6,0],[-rl/6,sl],[rl/6,sl]); tri(C,B,R2,[D/6,0],[-D/6,0],[0,sl]); tri(A,Dd,R1,[-D/6,0],[D/6,0],[0,sl]);
      const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(P,3)); g.setAttribute('uv',new T.Float32BufferAttribute(U,2)); g.computeVertexNormals(); g.translate(cx,0,cz); return g; };
    const roofM=(gs)=>{ const m=merge(gs,TILE,true); return m; };
    const PH=2.0; // 기단 높이
    K.layer(0); E.own();
    // ---- 지형(K.life): 남쪽 땅(0 m) · 북쪽 대서양(-3 m) · 해안선 ----
    const coast=x=>-30+18*Math.sin(x*.006)+10*E.vn(x*.02,4);
    const hf=(x,z)=>{ const c=coast(x); if(z>c) return -.05; return -3.2-6*E.ss((c-z)/60); };
    const TR=E.terrain(0,0,0,0,E.axis(3200,160,4.3,0),E.axis(3200,160,4.3,-20),hf,(x,z,h)=>{ if(h<-1) return [.55,.53,.48]; const n=E.fbm(x*.03,z*.03,2); return [.72+.04*n,.70+.04*n,.64+.03*n]; });
    { const wm=new T.Mesh(new T.PlaneGeometry(6400,3200),E.WATER); wm.rotation.x=-Math.PI/2; wm.position.set(0,-1.2,-1640); K.life.add(wm); }
    // ---- 0: 바다 위로 나온 기단(방파 벽 · 산책 테라스 · 난간) ----
    { const pg=[]; pg.push(bx(0,-3.4,-55,128,PH+3.4,228)); merge(pg,STd,true); K.b(0,PH-.05,-55,127.6,.1,227.6,MAR); const rl=[]; for(const [x,z,w,d] of [[0,-168.6,128,.5],[-63.8,-55,.5,228],[63.8,-55,.5,228]]) rl.push(bx(x,PH,z,w,1.1,d)); merge(rl,ST,false); }
    // 방파 바위(테트라포드처럼 흩어진 돌)
    { const rk=[]; for(let i=0;i<220;i++){ const t=E.r(); let x,z; if(i<120){ x=-70+t*140; z=-172-E.r()*6; } else { const s=i%2?1:-1; x=s*(67+E.r()*6); z=-165+t*130; } rk.push([x,-2.2,z,E.r()*3,3+E.r()*2.5,2.4+E.r()*1.6,3+E.r()*2.5]); } inst(new T.DodecahedronGeometry(.6,0),K.col(0x8f8a80,{roughness:1}),rk,true,K.life); }
    // ---- 1: 기도실 벽(말발굽 아치 · 청동 문) ----
    K.layer(1);
    const X0=50, Z0=-150, Z1=50, HW=26;
    tbox(0,PH,(Z0+Z1)/2,100,HW,200,WALL,26);
    // 문 앞 청동 문짝(살짝 튀어나옴) · 벽 위 초록 기와 처마
    { const it=[]; for(let i=0;i<7;i++){ const x=-39+i*13; it.push([x,PH,Z1+.15,0,3.6,10.4,.2]); } for(let i=0;i<14;i++){ const z=Z0+7+i*13.8; it.push([X0+.15,PH,z,Math.PI/2,3.6,10.4,.2]); it.push([-X0-.15,PH,z,Math.PI/2,3.6,10.4,.2]); } inst(boxG(1,1,1),BRZ,it,false); }
    roofM([hipG(0,PH+HW,(Z0+Z1)/2,103,203,2.2,0)]); K.b(0,PH+HW,(Z0+Z1)/2,100.4,.6,200.4,ST);
    // ---- 2: 지붕 — 옆 회랑 낮은 우진각 · 가운데 높은 고창 몸체 + 큰 우진각(개폐 지붕) · 북쪽 끝 돔 ----
    K.layer(2);
    { const R=[]; R.push(hipG(-36,PH+HW+.6,-50,30,196,8,1)); R.push(hipG(36,PH+HW+.6,-50,30,196,8,1));
      tbox(0,PH+HW+.6,-50,40,14,184,WALL,26); K.b(0,PH+HW+14.6,-50,41,.8,185,ST);
      R.push(hipG(0,PH+HW+15.4,-50,44,188,16.4,1.5)); // 꼭대기 약 60 m
      R.push(hipG(0,PH+HW+.6,38,30,22,10,1)); R.push(hipG(0,PH+HW+.6,-138,30,22,10,1));
      roofM(R); K.c(0,PH+HW+31.6,-50,.5,2.5,GOLD,10); K.c(0,PH+HW+34.1,-50,.6,.6,GOLD,10,{half:1});
      for(let i=0;i<9;i++) for(const s of [-1,1]) K.b(s*20.2,PH+HW+4,-130+i*20.6,.3,6,7,DK); // 고창
      K.dome(0,PH+HW+.6,-150,9,8,GRN); K.c(0,PH+HW+8.4,-150,.4,2.4,GOLD,8); }
    // ---- 3: 미나렛(광장 쪽 서남 모서리) ----
    K.layer(3);
    { const mx=-62, mz=52, Wm=25, HS=176;
      tbox(mx,PH,mz,Wm,58,Wm,MINA,25); tbox(mx,PH+58,mz,Wm,HS-58-PH,Wm,MINB,25);
      for(const y of [PH+58,PH+HS-PH-1.4]) K.b(mx,y-.6,mz,Wm+.8,1.2,Wm+.8,STd);
      { const it=[]; for(let k=0;k<4;k++){ const ry=k*Math.PI/2; for(let i=0;i<7;i++){ const u=-Wm/2+1.8+i*(Wm-3.6)/6; const x=mx+Math.cos(ry)*u+Math.sin(ry)*(Wm/2+.2), z=mz-Math.sin(ry)*u+Math.cos(ry)*(Wm/2+.2); it.push([x,HS,z,ry,1.8,3.2,1.0]); } } inst(boxG(1,1,1),GRN,it,true); } // 톱니 흉벽
      tbox(mx,HS,mz,10,22,10,MINB,9); K.b(mx,HS+22,mz,11.2,1,11.2,STd); roofM([hipG(mx,HS+23,mz,11.2,11.2,4.5,.4)]); K.dome(mx,HS+27.2,mz,2.4,2.6,GRN);
      for(let i=0;i<3;i++){ const r=.95-i*.15; const s=new T.Mesh(new T.SphereGeometry(r,14,10),GOLD); s.position.set(mx,HS+30.6+i*1.75,mz); s.castShadow=true; K.cur.add(s); } K.c(mx,HS+29.6,mz,.16,4.4,GOLD,8);
      // 기도실과 잇는 낮은 연결 회랑
      tbox(-56,PH,40,12,14,24,WALL,26); }
    // ---- 0: 광장(대리석 무늬 · 분수 · 가로등) · 부속 건물(마드라사·박물관, 초록 지붕 아케이드) ----
    K.layer(0);
    const PZ=E.tex('h2_plaza',512,(g,N,rr)=>{ g.fillStyle='#e8e1d3'; g.fillRect(0,0,N,N); const s=64; for(let i=0;i<N/s;i++) for(let j=0;j<N/s;j++){ g.fillStyle=(i+j)%2?'#d9cfbd':'#ede7dc'; g.fillRect(i*s,j*s,s,s); g.fillStyle='#b9a98d'; g.beginPath(); g.moveTo(i*s+s/2,j*s+8); g.lineTo(i*s+s-8,j*s+s/2); g.lineTo(i*s+s/2,j*s+s-8); g.lineTo(i*s+8,j*s+s/2); g.closePath(); g.fill(); } g.strokeStyle='rgba(90,80,60,.4)'; g.lineWidth=2; for(let x=0;x<=N;x+=s){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,N); g.stroke(); g.beginPath(); g.moveTo(0,x); g.lineTo(N,x); g.stroke(); } });
    tbox(0,-.05,150,300,.1,190,E.tmat(PZ,0xe8e1d3,{roughness:.5}),16);
    { const lp=[]; for(let i=0;i<8;i++) for(const s of [-1,1]) lp.push([s*28,0,70+i*20,0,.5,9,.5]); inst(boxG(1,1,1),BRZ,lp,true); const lt=lp.map(p=>[p[0],9,p[2],0,1.4,1.6,1.4]); inst(boxG(1,1,1),K.col(0xf3e7c4,{roughness:.4,emissive:0x221a08}),lt,false);
      for(const z of [100,170]){ K.c(0,0,z,9,.8,MAR,32); K.water(0,.82,z,12,12); K.c(0,.8,z,1.2,1.8,ST,16); } }
    { const L=K.life; const wb=[], rf=[]; for(const s of [-1,1]){ wb.push(bx(s*150,0,150,22,9,160)); rf.push(hipG(s*150,9,150,23,161,3.2,.8)); } merge(wb,WALL,true,L); merge(rf,TILE,true,L); }
    // ---- 맥락(K.life): 카사블랑카 시가지(흰 매스) · 해안 도로 · 야자 ----
    { const L=K.life; const cs=['#f2efe8','#e6e1d6','#dcd6c8','#f6f4ef','#d1c9b8','#ece8df']; const it=[]; for(let z=-80;z<1600;z+=24) for(let x=-1700;x<1700;x+=24){ const xx=x+(E.r()-.5)*6, zz=z+(E.r()-.5)*6; if(zz<coast(xx)+30) continue; if(Math.abs(xx)<195&&zz<270) continue; if(E.r()<.12) continue; const h=12+E.r()*20*(1+E.ss((Math.hypot(xx,zz)-500)/900)); const w=15+E.r()*6; it.push([xx,h/2-.1,zz,0,w,h,w*(.8+E.r()*.3),cs[Math.floor(E.r()*cs.length)]]); }
      const WT2=E.tex('h2_apt',128,(g,N,rr)=>{ g.fillStyle='#ffffff'; g.fillRect(0,0,N,N); for(let y=8;y<N;y+=16) for(let x=6;x<N;x+=16){ g.fillStyle=rr()<.3?'rgba(60,70,80,.5)':'rgba(70,80,90,.3)'; g.fillRect(x,y,8,7); } }); instC(new T.BoxGeometry(1,1,1),new T.MeshStandardMaterial({color:0xffffff,map:WT2,roughness:.85}),it,L,false);
      merge([bx(0,-.03,262,3000,.06,20)],K.col(0x4a4a4c,{roughness:.9}),false,L);
      const TRK=K.col(0x7a6248,{roughness:.95}), PALM=K.col(0x5b7a3a,{roughness:.9}); const tg=new T.CylinderGeometry(.16,.26,1,6); tg.translate(0,.5,0); const fr=[]; for(let i=0;i<10;i++){ const a=i/10*Math.PI*2; const g=new T.BoxGeometry(.5,.06,3.0); g.translate(0,0,1.5); g.rotateX(.25+(i%2)*.35); g.rotateY(a); fr.push(g); } const fg=E.mergeG(fr);
      const pl=[]; for(let z=70;z<=240;z+=14) for(const s of [-1,1]) pl.push([s*(98+E.r()*2),0,z,11+E.r()*3]); for(let x=-500;x<=500;x+=16) pl.push([x,0,250,11+E.r()*3]); inst(tg,TRK,pl.map(p=>[p[0],p[1],p[2],0,1,p[3],1]),true,L); inst(fg,PALM,pl.map(p=>[p[0],p[1]+p[3],p[2],(p[0]*7.3)%6,p[3]/9,p[3]/9,p[3]/9]),true,L); }
    tidy(1);
  }});
