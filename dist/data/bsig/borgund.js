__bsigFill({"borgund":function(K){
// 출처: 노르웨이 대백과사전 SNL 「Borgund stavkirke」(목재 벌채 1180–1181년 겨울, 1342 첫 기록, 신랑 바닥 '40 ㎡ 남짓', 가운데가 높은 신랑·성단, 지붕 탑 2단 첨탑, 지붕면 모두 일곱 겹, 널판 지붕, 신랑과 지붕 탑 박공의 투각 용마루 빗과 용 머리(1700년대 갱신, 1738 새김), 회랑의 난간과 작은 기둥·둥근 아치, 앱스 둘레만 막힌 회랑, 서·남·북 입구의 박공 현관, 남쪽 바로 옆의 따로 선 스타브 종탑(스타브 9개, 1665 수리)) · 영문 위키백과 「Borgund Stave Church」(1180~1250 건립, 성단·앱스 14세기 추가설, 가운데 기둥 12개, 3입구 · 서쪽 정문, 그리스 십자형 비슷한 평면, 소나무 타르로 검게, 바깥 회랑) · ArchEyes 「Borgund Stave Church」
// 추정: 모든 치수(신랑 바깥 약 6.8 × 8.4 m, 가운데 높은 부분 3.6 × 4.4 m, 벽·처마 높이, 지붕 물매, 성단 4.2 × 3.6 m, 앱스 반지름 1.8 m, 지붕 탑 꼭대기 약 17 m), 용 머리 모양, 종탑 크기(약 4.4 m 사각, 높이 약 9 m)·거리, 담장·묘지·계곡 지형·강
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
    const COL=K.col(0x8a5e45,{roughness:.9}), COL2=K.col(0x7a5440,{roughness:.9}), WH=J.WH, KW=J.KAW, RU=J.RU, RD=J.RD;

    { const LM=[K.M.leaf1,K.M.leaf2,K.M.leaf3,K.M.trunk]; K.life.children.slice().forEach(o=>{ if(o.isMesh&&LM.includes(o.material)) o.visible=false; }); }
    // ---- 재질: 타르 널벽 · 비늘 널판 지붕 · 회랑 난간 ----
    const tm=(key,draw,base,o)=>{ const t=E.tex(key,256,draw); const m=new T.MeshStandardMaterial(Object.assign({map:t,roughness:.75},o||{})); if(!t) m.color.setHex(base); m.color.convertSRGBToLinear(); m.side=T.DoubleSide; return m; };
    const STV=tm('bg_stave',(g,N,rr)=>{ g.fillStyle='#2e211a'; g.fillRect(0,0,N,N); const n=10, w=N/n; for(let i=0;i<n;i++){ const x=i*w; const gr=g.createLinearGradient(x,0,x+w,0); gr.addColorStop(0,'#1d1410'); gr.addColorStop(.5,'#3b2b20'); gr.addColorStop(1,'#22180f'); g.fillStyle=gr; g.fillRect(x,0,w-2,N); } for(let i=0;i<1500;i++){ g.fillStyle=rr()<.5?'rgba(120,90,60,.12)':'rgba(0,0,0,.2)'; g.fillRect(rr()*N,rr()*N,1,4+rr()*12); } },0x2e211a);
    const SHG=tm('bg_shingle',(g,N,rr)=>{ g.fillStyle='#1a120b'; g.fillRect(0,0,N,N); const rw=N/10, cw=N/8; for(let r=0;r<10;r++){ const off=(r%2)*cw/2; for(let c=-1;c<9;c++){ const x=c*cw+off, y=r*rw; const v=26+rr()*24; g.fillStyle=`rgb(${v+18},${v},${v-12})`; g.beginPath(); g.moveTo(x+1,y); g.lineTo(x+cw-1,y); g.lineTo(x+cw-1,y+rw*.7); g.lineTo(x+cw/2,y+rw); g.lineTo(x+1,y+rw*.7); g.closePath(); g.fill(); g.fillStyle='rgba(255,230,200,.10)'; g.fillRect(x+2,y+rw*.55,cw-4,2); } } },0x2a1d14,{roughness:.6});
    const SHP=K.col(0x2a1e15,{roughness:.7}), DKW=K.col(0x261a12,{roughness:.7}), DKW2=K.col(0x3a2a1e,{roughness:.75}), STN=K.col(0x8d8a82,{roughness:1}), GR=K.col(0x5d7440,{roughness:1});
    // ---- 지붕 도구: 박공(용마루 z방향), 둘레 외쪽 지붕(링), 박공 끝 판 ----
    // gab: cx,cz 중심, y 처마, W(x폭, 처마 포함), Lz(길이), H 높이(처마→용마루)
    const gab=(cx,cy,cz,W,Lz,H,mat)=>{ for(const s of [-1,1]) K.surf((u,v)=>{ const x=cx+s*W/2*(1-v), y=cy+H*v, z=cz-Lz/2+Lz*u; return [x,y,z,u*Lz/2.4,v*Math.hypot(W/2,H)/2.4]; },4,4,mat); };
    const gend=(cx,cy,cz,W,H,mat)=>K.surf((u,v)=>{ const x=cx+(u-.5)*W*(1-v), y=cy+H*v; return [x,y,cz,u,v]; },2,2,mat);
    // ring: 바깥 사각(W0×D0, y0)에서 안 사각(W1×D1, y1)까지 네 면 (중심 cx,cz) — 회랑·측랑 외쪽 지붕
    const ring=(cx,cz,W0,D0,y0,W1,D1,y1,mat)=>{ K.surf((u,v)=>{ const s=u*4, k=Math.min(3,Math.floor(s)), f=s-k; const P=(W,D)=>{ let a,b; if(k===0){a=-W/2+W*f;b=D/2;} else if(k===1){a=W/2;b=D/2-D*f;} else if(k===2){a=W/2-W*f;b=-D/2;} else {a=-W/2;b=-D/2+D*f;} return [a,b]; }; const p0=P(W0,D0), p1=P(W1,D1); return [cx+p0[0]+(p1[0]-p0[0])*v,y0+(y1-y0)*v,cz+p0[1]+(p1[1]-p0[1])*v,u*(W0+D0)*2/2.4,v*2]; },8,2,mat); };
    // 용 머리: 박공 꼭대기에서 바깥(dir) 위로 휘어 나가는 목 + 머리 + 벌린 입
    const dragon=(x,y,z,dir,s)=>{ const gs=[]; for(let k=0;k<7;k++){ const t=k/6; const dz=dir*(.25+t*1.25)*s, dy=(.1+Math.sin(t*1.9)*.85)*s; gs.push(bx(x,y+dy,z+dz,.16*s*(1.2-.4*t),.2*s,.36*s)); } gs.push(bx(x,y+.82*s,z+dir*1.62*s,.2*s,.24*s,.5*s)); gs.push(bx(x,y+.62*s,z+dir*1.7*s,.14*s,.08*s,.42*s)); gs.push(bx(x,y+1.0*s,z+dir*1.42*s,.06*s,.32*s,.08*s)); merge(gs,DKW); };
    // 용마루 빗(투각 판 — 톱니로 표현)
    const comb=(x,y,z0,z1,h)=>{ const gs=[bx(x,y,(z0+z1)/2,.1,h*.45,Math.abs(z1-z0))]; const n=Math.round(Math.abs(z1-z0)/.32); for(let i=0;i<n;i++){ const z=Math.min(z0,z1)+(i+.5)*Math.abs(z1-z0)/n; gs.push(bx(x,y+h*.45,z,.1,h*.55,.11)); } merge(gs,DKW); };
    // ---------- 0: 계곡 지형 · 강 · 숲 · 돌담 묘역 ----------
    K.layer(0); E.own(); let TR;
    { const hf=(x,z)=>{ const d=Math.abs(x+40+z*.15); let h=E.ss((d-120)/420)*380+E.ridged(x*.004,z*.004)*90*E.ss((d-160)/300); h+=(E.fbm(x*.03,z*.03,3)-.5)*2.2*E.ss((Math.hypot(x,z)-30)/30);
        if(Math.hypot(x,z*.9)<24) h=Math.min(h,-.04); return h; };
      TR=E.terrain(0,0,0,0,E.axis(1800,150,4.2,0),E.axis(1800,150,4.2,0),hf,(x,z,h,ny)=>{ if(Math.hypot(x,z*.9)<24) return [.38,.47,.25]; if(h<8) return E.vn(x*.02,z*.02)<.5?[.36,.45,.24]:[.42,.5,.28]; return E.mcol(x,z,h,ny,{far:600,farW:900,cliff:.8,haze:[.6,.66,.72]}); });
      // 레르달 강(계곡 바닥, 서쪽)
      { const g=new T.Group(); K.life.add(g); K.cur=g; const m=K.surf((u,v)=>{ const z=-900+1800*u; const xc=-58-z*.12+Math.sin(z*.01)*10; const x=xc+(v-.5)*14; return [x,-.35,z,u*30,v]; },60,1,E.WATER); m.castShadow=false; K.cur=null; }
      // 숲: 자작나무(활엽)·소나무 — 계곡 비탈, 교회 앞(카메라 쪽)은 비움
      E.forest(E.scatter(-900,900,-900,900,9,TR.h,(x,z,h)=>{ if(Math.hypot(x,z)<34) return false; if(!J.clr(x,z,0,0,240)) return false; if(Math.abs(x+58+z*.12)<14) return false; return h<260&&E.r()<(h>15?.8:.3); },(x,z,h)=>8+E.vn(x*.05,z*.05)*6,(x,z,h)=>h>60||E.r()<.45?2:0),{trunks:false,pal:{0:['#6f8c45','#7d9a4f','#5f7c3d','#8aa356'],2:['#2c4630','#34503a','#27402b']}});
      // 묘역 돌담(둥근 사각) + 비석 몇 개
      const sw=[]; for(let i=0;i<120;i++){ const a=i/120*Math.PI*2; const x=Math.cos(a)*22, z=Math.sin(a)*19.5; if(z>17&&Math.abs(x)<2.5) continue; sw.push(bx(x,0,z,1.2,.55+.15*Math.sin(i*2.3),.7,-a)); } merge(sw,STN,false,K.life);
      const gs=[]; for(let i=0;i<14;i++){ const x=-14+E.r()*28, z=-16+E.r()*8; gs.push(bx(x,0,z,.6,.8,.15)); } merge(gs,K.col(0x9a978f),false,K.life);
      E.forest([[-18,0,-6,9,2],[-14,0,-16,10,2],[17,0,-14,9,0],[6,0,-19,8,2]].map(t=>[t[0],-.04,t[2],t[3],t[4],E.r(),1]),{trunks:true,cast:true,pal:{0:['#6f8c45','#7d9a4f'],2:['#2c4630','#34503a']}});
      K.b(0,-.04,13,1.6,.06,10,K.col(0x9b958a)); // 서쪽 정문 앞 길
    }
    // ---------- 1: 돌 기초 · 회랑(스발강) ----------
    // 평면: 신랑 바깥 NW 6.8(x) × NL 8.4(z), 중심 z=0. 성단 CW 4.2 × CL 3.6 (z -4.2 ~ -7.8), 앱스 반지름 1.8 (z=-7.8)
    const NW=6.8, NL=8.4, CW=4.2, CL=3.6, AR=1.8, SG=1.3; const zc=-4.2-CL/2, za=-4.2-CL;
    K.layer(1); K.b(0,-.04,-1.6,NW+2*SG+.6,.45,NL+CL+AR+2*SG+.3,STN);
    // 회랑 바닥 · 난간(아래 판 + 작은 기둥 + 둥근 아치) — 신랑 3면 + 성단 양옆, 앱스 둘레는 막힌 벽
    { const y=.41, H=1.05; const run=[]; const ox=NW/2+SG, oz=NL/2+SG;
      run.push([-ox,oz,ox,oz],[ox,oz,ox,-NL/2],[-ox,-NL/2,-ox,oz],[ox,-NL/2,CW/2+SG,-NL/2],[-ox,-NL/2,-CW/2-SG,-NL/2],[CW/2+SG,-NL/2,CW/2+SG,za],[-CW/2-SG,-NL/2,-CW/2-SG,za]);
      const pan=[], col=[], arch=[]; run.forEach(([x0,z0,x1,z1])=>{ const L=Math.hypot(x1-x0,z1-z0), n=Math.max(2,Math.round(L/.55)), ax=Math.abs(x1-x0)>Math.abs(z1-z0); pan.push(bx((x0+x1)/2,y,(z0+z1)/2,ax?L:.12,.55,ax?.12:L)); for(let i=0;i<=n;i++){ const t=i/n; col.push([x0+(x1-x0)*t,y+.55,z0+(z1-z0)*t]); } arch.push(bx((x0+x1)/2,y+H-.08,(z0+z1)/2,ax?L:.14,.22,ax?.14:L)); });
      merge(pan,STV); inst(cylG(.045,H-.6,6,.045),DKW2,col); merge(arch,DKW2);
      K.b(0,y,0,NW+2*SG,.06,NL+2*SG,DKW2); K.b(0,y,zc,CW+2*SG,.06,CL,DKW2);
      // 앱스 둘레 막힌 회랑 벽
      K.c(0,y,za,AR+SG,1.4,STV,20,{hollow:true});
      // 박공 현관(서·남·북 입구)
      for(const [x,z,ry] of [[0,oz,0],[ox,0,Math.PI/2],[-ox,0,-Math.PI/2]]){ const g=new T.Group(); g.position.set(x,0,z); g.rotation.y=ry; K.layer(1).add(g); K.cur=g; K.b(-.85,y,0,.16,1.9,.16,DKW2); K.b(.85,y,0,.16,1.9,.16,DKW2); gend(0,2.25,.22,2.6,1.6,STV); gab(0,2.25,-.35,2.7,1.3,1.6,SHG); dragon(0,3.8,.25,1,.45); K.cur=null; } }
    // ---------- 2: 벽(타르 널) · 측랑 · 가운데 높은 부분 ----------
    K.layer(2); const yb=.41;
    K.b(0,yb,0,NW,3.3,NL,STV); K.b(0,yb,zc,CW,2.3,CL,STV); K.c(0,yb,za,AR,2.2,STV,18);
    // 서쪽 정문(조각 테 + 어두운 문)
    K.b(0,yb,NL/2+.02,1.7,2.4,.12,DKW2); K.b(0,yb,NL/2+.08,1.0,1.95,.06,K.col(0x120c08,{roughness:1})); K.b(0,yb+2.4,NL/2+.02,2.1,.6,.12,STV);
    // 회랑 지붕(링): 바깥 y 2.0 → 벽 y 3.0
    ring(0,0,NW+2*SG+.5,NL+2*SG+.5,1.85,NW-.1,NL-.1,2.85,SHG); ring(0,zc,CW+2*SG+.5,CL+.5,1.85,CW-.1,CL+.2,2.85,SHG);
    // 측랑 지붕(링): 벽 3.0 → 높은 부분 벽 5.4
    const IW=3.6, IL=4.6;
    K.b(0,3.6,0,NW+.2,.2,NL+.2,DKW2); ring(0,0,NW+1.0,NL+1.0,3.65,IW,IL,5.2,SHG);
    K.b(0,4.8,0,IW,3.0,IL,STV); // 높은 가운데 벽(클리어스토리)
    // ---------- 3: 신랑 박공 지붕(매우 가파름) · 용 머리 · 빗 ----------
    K.layer(3); const yE=7.7, HR=5.0, RW=IW+.8, RL=IL+1.6;
    gend(0,yE,IL/2+.02,IW,HR*IW/RW,STV); gend(0,yE,-IL/2-.02,IW,HR*IW/RW,STV);
    gab(0,yE,0,RW,RL,HR,SHG); comb(0,yE+HR,-RL/2+.3,RL/2-.3,.55);
    for(const s of [-1,1]) dragon(0,yE+HR-.25,s*(RL/2-.15),s,1.55);
    // 성단: 측랑 링 + 박공 지붕(낮게) · 앱스: 원뿔 지붕 + 원통 탑
    K.b(0,2.7,zc,CW-.3,.2,CL,DKW2); ring(0,zc,CW+.3,CL+.2,2.8,CW*.55,CL-.2,4.3,SHG); K.b(0,4.2,zc,CW*.55,1.0,CL-.2,STV);
    gab(0,5.1,zc-.2,CW*.55+.6,CL+1.0,2.6,SHG); gend(0,5.1,zc+CL/2-.05,CW*.55,2.4,STV); comb(0,7.7,zc-CL/2-.1,zc+CL/2-.3,.4);
    K.c(0,2.6,za,AR+.45,1.3,SHP,20,{r2:AR*.55}); K.c(0,3.9,za,.72,1.3,STV,14); K.c(0,5.2,za,.95,1.8,SHP,14,{r2:.05});
    // ---------- 4: 지붕 탑(타크뤼테르) — 용마루 위 사각 몸 · 작은 박공 · 2단 첨탑 ----------
    K.layer(4); { const y=yE+HR-.4; K.b(0,y,0,1.5,1.5,1.5,STV); ring(0,0,2.3,2.3,y+1.2,1.2,1.2,y+1.9,SHG); K.b(0,y+1.85,0,1.1,1.2,1.1,STV);
      // 네 방향 작은 박공(뾰족) + 둥근 구멍 판
      for(const [ry] of [[0],[Math.PI/2],[Math.PI],[-Math.PI/2]]){ const g=new T.Group(); g.position.set(0,0,0); g.rotation.y=ry; K.layer(4).add(g); K.cur=g; gend(0,y+3.0,.58,1.15,1.1,STV); gab(0,y+3.0,.35,1.3,.6,1.1,SHG); K.cur=null; }
      dragon(0,y+3.9,.55,1,.42); dragon(0,y+3.9,-.55,-1,.42);
      // 2단 첨탑
      const cone=(yy,r,h)=>{ const g=new T.ConeGeometry(r,h,4); g.rotateY(Math.PI/4); g.translate(0,yy+h/2,0); return g; };
      merge([cone(y+3.0,.95,2.2)],SHP); K.b(0,y+4.6,0,.5,.6,.5,STV); merge([cone(y+5.1,.55,3.0)],SHP); K.c(0,y+8.0,0,.04,.5,DKW,6); }
    // ---------- 5: 종탑(스퇴풀) — 남쪽 따로, 아래 넓은 널벽 + 위 좁은 종실 + 가파른 지붕 ----------
    K.layer(1); { const bx0=13.5, bz=-2.5; K.b(bx0,-.04,bz,4.6,.35,4.6,STN); K.b(bx0,.3,bz,3.8,2.8,3.8,STV); ring(bx0,bz,4.8,4.8,2.9,2.4,2.4,4.1,SHG); K.b(bx0,4.0,bz,2.4,2.0,2.4,STV); for(const [x,z,ry] of [[0,1.21,0],[1.21,0,Math.PI/2],[0,-1.21,0],[-1.21,0,Math.PI/2]]) K.b(bx0+x,4.7,bz+z,1.0,.8,.06,K.col(0x0e0a07,{roughness:1}),ry);
      const g=new T.ConeGeometry(2.1,3.0,4); g.rotateY(Math.PI/4); g.translate(bx0,6.0+1.5,bz); merge([g],SHP); K.b(bx0,.3,bz+1.92,.9,1.9,.06,DKW2); }
    K.cur=null; tidy(1);
  }});
