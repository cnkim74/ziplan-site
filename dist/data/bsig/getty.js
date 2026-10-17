__bsigFill({"getty":function(K){
// 출처: Getty 공식 「Architecture」 안내(getty.edu/visit/center/architecture) — 트래버틴 약 16,000 t(로마 동쪽 약 15 mi 바니 디 티볼리), 120만 sq ft, 트래버틴 정사각 격자, 연구소는 중앙 정원 서쪽 원형 건물, 그림 전시실은 북·남·동·서 전시동 위층, 주차장에서 언덕 위로 트램 · 영문 위키백과 「Getty Center」(1997-12 개관, 리처드 마이어, 중앙 정원 로버트 어윈)
// 추정: 건물 배치·크기(항공사진 기억을 바탕으로 단순화), 해발 약 270 m(900 ft), 전시동 높이 14~18 m, 입구 홀 지름 26 m, 연구소 지름 72 m, 정원 연못 지름 36 m, 지형(골짜기·405번 고속도로 위치·LA 분지·바다 방향)
    const T=K.T;
    // ---- 공용 조립 도구(이 build 안에서만) ----
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const inst=(geo,mat,items,cast)=>{ if(!items.length) return null; const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),Eu=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); Eu.set(it[7]||0,it[3]||0,it[8]||0); Q.setFromEuler(Eu); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; return put(m,cast); };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    // 박스 조각(밑면 y) — tm을 주면 UV를 m 단위/tm로(질감 반복)
    const bx=(x,y,z,w,h,d,ry,tm)=>{ const g=new T.BoxGeometry(w,h,d); if(tm){ const uv=g.attributes.uv; const dims=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]]; for(let f=0;f<6;f++) for(let i=0;i<4;i++){ const k=f*4+i; uv.setXY(k,uv.getX(k)*dims[f][0]/tm,uv.getY(k)*dims[f][1]/tm); } } if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const merge=(geos,mat,cast)=>{ geos=geos.filter(Boolean); if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ if(!g.attributes.normal) g.computeVertexNormals(); Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); return put(new T.Mesh(g,mat),cast); };
    // 평면 다각형 조각(볼록, 점 3개 이상, 같은 평면) — UV는 첫 변 방향 u·평면 안 수직 v (m/tm)
    const facetG=(pts,tm,u0,v0)=>{ tm=tm||1; const A=new T.Vector3(...pts[0]), B=new T.Vector3(...pts[1]); const eu=B.clone().sub(A).normalize(); let nn=new T.Vector3(); for(let i=2;i<pts.length&&nn.lengthSq()<1e-8;i++) nn=B.clone().sub(A).cross(new T.Vector3(...pts[i]).sub(A)); nn.normalize(); const ev=nn.clone().cross(eu); if(Math.abs(eu.y)<.5&&ev.y<0) ev.negate(); const P=[],U=[]; for(let i=1;i<pts.length-1;i++) for(const q of [pts[0],pts[i],pts[i+1]]){ P.push(q[0],q[1],q[2]); const d=new T.Vector3(...q).sub(A); U.push((u0||0)+d.dot(eu)/tm,(v0||0)+d.dot(ev)/tm); } const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(P,3)); g.setAttribute('uv',new T.Float32BufferAttribute(U,2)); g.computeVertexNormals(); return g; };
    const LIFE=f=>{ const pc=K.cur; K.cur=K.life; f(); K.cur=pc; };
    const mtex=(map,rx,ry)=>{ if(!map) return null; const t=map.clone(); t.needsUpdate=true; t.wrapS=t.wrapT=T.RepeatWrapping; t.repeat.set(rx||1,ry||1); return t; };
    const tmat=(t,hex,o)=>{ o=Object.assign({},o||{}); const tint=o.tint; delete o.tint; const m=new T.MeshStandardMaterial(Object.assign({color:t?(tint||0xffffff):hex,map:t||null,roughness:.85},o)); m.color.convertSRGBToLinear(); return m; };
    // 뷰어가 뒤에 덧붙이는 앞마당 소품(벤치·화분·큰 나무)은 빼고 사람만 남김 — build 맨 끝에서 호출
    const KEEP_PEOPLE=()=>{ const la=K.life.add.bind(K.life); K.life.add=(...o)=>{ o.forEach(m=>{ if(m&&m.material===K.M.people) la(m); }); return K.life; }; };

    // ---- 배경·바닥 공용(v13): 캔버스 질감(박석·마사토) · 높이장 지형(K.life — bbox 밖이라 썸네일 거리에 영향 없음) · 인스턴스 숲 ----
    const E=(()=>{ const TT=K.T; let sd=97; const r=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
      const C=(typeof window!=='undefined')?(window.__kTex13||(window.__kTex13={})):{};
      const tex=(key,px,draw)=>{ if(C[key]) return C[key]; if(typeof document==='undefined') return null; const cv=document.createElement('canvas'); cv.width=cv.height=px; const g=cv.getContext('2d'); let s=31; const rr=()=>{ s=(s*16807)%2147483647; return s/2147483647; }; draw(g,px,rr); const t=new TT.CanvasTexture(cv); t.wrapS=t.wrapT=TT.RepeatWrapping; t.encoding=TT.sRGBEncoding; t.anisotropy=8; return C[key]=t; };
      // 박석: 회색 화강석을 가로줄로 불규칙하게(줄 높이·돌 너비가 제각각), 줄눈은 어둡게 — 512 px = 9 m
      const bakTex=()=>tex('bak',512,(g,N,rr)=>{ g.fillStyle='#6f6a61'; g.fillRect(0,0,N,N); const tones=['#a8a296','#b3ad9f','#9a9488','#a39d90','#aea89a','#958f83','#b8b2a4']; let y=0; while(y<N){ let h=Math.round(26+rr()*26); if(N-y<40) h=N-y; let x=-rr()*60; while(x<N){ const w=38+rr()*70; const j=()=>(rr()-.5)*5; g.fillStyle=tones[Math.floor(rr()*tones.length)]; for(const ox of [0,-N]){ g.beginPath(); g.moveTo(ox+x+2+j(),y+2+j()); g.lineTo(ox+x+w-2+j(),y+2+j()); g.lineTo(ox+x+w-2+j(),y+h-2+j()); g.lineTo(ox+x+2+j(),y+h-2+j()); g.closePath(); g.fill(); } x+=w; } y+=h; }
        for(let i=0;i<4000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.10)':'rgba(40,36,30,.10)'; g.fillRect(rr()*N,rr()*N,1.5,1.5); } });
      // 마사토: 옅은 황토 바탕(#d9cdb0) + 모래 알갱이 점 — 512 px = 7 m
      const masTex=()=>tex('mas',512,(g,N,rr)=>{ g.fillStyle='#cfc1a0'; g.fillRect(0,0,N,N); for(let i=0;i<0;i++){ g.fillStyle=`rgba(${rr()<.5?'190,172,135':'232,224,204'},.07)`; const x=rr()*N,y=rr()*N,w=30+rr()*90; g.beginPath(); g.ellipse(x,y,w,w*.6,rr()*3,0,7); g.fill(); } const cs=['#bfae88','#dacfb4','#ae9d77','#9c8d6f','#c8b997']; for(let i=0;i<7000;i++){ g.fillStyle=cs[Math.floor(rr()*cs.length)]; const z=rr()<.85?1.2:2.4; g.fillRect(rr()*N,rr()*N,z,z); } });
      const lin=(h)=>new TT.Color(h).convertSRGBToLinear();
      const mat=(t,hex,tm,o)=>{ const m=new TT.MeshStandardMaterial(Object.assign({color:t?0xffffff:hex,map:t||null,roughness:.96},o||{})); if(!t) m.color.convertSRGBToLinear(); m.userData.tm=tm; m.userData.nocast=1; return m; };
      const BAK=mat(bakTex(),0xb9b3a6,9), MAS=mat(masTex(),0xd9cdb0,7); if(BAK.map) BAK.color.setHex(0xd2cec6).convertSRGBToLinear(); if(MAS.map) MAS.color.setHex(0xd8d0c0).convertSRGBToLinear();
      // 평면 바닥 한 장(월드 좌표 UV) → 병합 큐 Q가 있으면 그쪽으로
      const plane=(m,x,y,z,w,d,q)=>{ const g=new TT.PlaneGeometry(w,d,1,1); g.rotateX(-Math.PI/2); g.translate(x,y,z); const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm||5; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); if(q){ q(m,g); return null; } const me=new TT.Mesh(g,m); me.receiveShadow=true; (K.cur||K.layer(0)).add(me); return me; };
      // 지형: hf(x,z) 높이, cf(x,z,h,ny) → [r,g,b](sRGB 0~1). life 그룹(그림자 안 던짐)
      const terrain=(x0,x1,z0,z1,nx,nz,hf,cf,hole)=>{ // hole [hx0,hx1,hz0,hz1]: 그 사각형만 비움(격자선을 구멍 모서리에 맞춤) — 모형 바닥을 그대로 보이게
        const ax=(a0,a1,n,e)=>{ const L=[]; for(let i=0;i<=n;i++) L.push(a0+(a1-a0)*i/n); if(e) e.forEach(v=>{ if(v>a0&&v<a1) L.push(v); }); L.sort((a,b)=>a-b); return L.filter((v,i)=>i===0||v-L[i-1]>.01); };
        const XS=ax(x0,x1,nx,hole&&[hole[0],hole[1]]), ZS=ax(z0,z1,nz,hole&&[hole[2],hole[3]]); const W=XS.length, H=ZS.length, n=W*H; const Y=new Float32Array(n), P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3);
        for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, x=XS[i], z=ZS[j]; Y[k]=hf(x,z); P[k*3]=x; P[k*3+1]=Y[k]; P[k*3+2]=z; }
        const lc=v=>v<.04045?v*.0773993808:Math.pow(v*.9478672986+.0521327014,2.4);
        for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, i0=Math.max(0,i-1), i1=Math.min(W-1,i+1), j0=Math.max(0,j-1), j1=Math.min(H-1,j+1); const hx=(Y[j*W+i1]-Y[j*W+i0])/(XS[i1]-XS[i0]), hz=(Y[j1*W+i]-Y[j0*W+i])/(ZS[j1]-ZS[j0]); const L=Math.sqrt(hx*hx+1+hz*hz); N[k*3]=-hx/L; N[k*3+1]=1/L; N[k*3+2]=-hz/L; const v=cf(P[k*3],P[k*3+2],Y[k],1/L); Cc[k*3]=lc(v[0]); Cc[k*3+1]=lc(v[1]); Cc[k*3+2]=lc(v[2]); }
        const I=[]; for(let j=0;j<H-1;j++) for(let i=0;i<W-1;i++){ if(hole){ const cx=(XS[i]+XS[i+1])/2, cz=(ZS[j]+ZS[j+1])/2; if(cx>hole[0]&&cx<hole[1]&&cz>hole[2]&&cz<hole[3]) continue; } const a=j*W+i, b=a+1, c=a+W, d=c+1; I.push(a,c,b,b,c,d); }
        const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(Cc,3)); g.setIndex(new TT.BufferAttribute(new Uint32Array(I),1)); g.computeBoundingSphere();
        const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:1})); m.receiveShadow=true; m.castShadow=false; K.life.add(m);
        const bs=(A,v)=>{ let lo=0, hi=A.length-2; if(v<=A[0]) return 0; if(v>=A[hi+1]) return hi; while(lo<hi){ const md=(lo+hi+1)>>1; if(A[md]<=v) lo=md; else hi=md-1; } return lo; };
        m.h=(x,z)=>{ const i=bs(XS,x), j=bs(ZS,z); const u=Math.min(1,Math.max(0,(x-XS[i])/(XS[i+1]-XS[i]))), v=Math.min(1,Math.max(0,(z-ZS[j])/(ZS[j+1]-ZS[j]))); const a=Y[j*W+i], b=Y[j*W+i+1], c=Y[(j+1)*W+i], d=Y[(j+1)*W+i+1]; return (a*(1-u)+b*u)*(1-v)+(c*(1-u)+d*u)*v; }; return m; };
      // 숲: 나무 무리 — items [x,y,z,h,kind(0 활엽 둥근 수관,1 소나무 납작 수관,2 침엽 원뿔), tone 0~1]. 수관 + 줄기 InstancedMesh, 색은 인스턴스마다 다르게
      const mergeG=gs=>{ const G=gs.map(g=>g.index?g.toNonIndexed():g); let n=0; for(const g of G) n+=g.attributes.position.count; const P=new Float32Array(n*3), N=new Float32Array(n*3); let o=0; for(const g of G){ P.set(g.attributes.position.array,o*3); N.set(g.attributes.normal.array,o*3); o+=g.attributes.position.count; } const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); return g; };
      const crownG=[ (()=>{ const a=new TT.IcosahedronGeometry(.5,1); a.scale(1,.78,1); a.translate(0,.62,0); const b=new TT.IcosahedronGeometry(.3,0); b.translate(.22,.78,.1); return mergeG([a,b]); })(),
        (()=>{ const a=new TT.IcosahedronGeometry(.5,0); a.scale(1.15,.42,1.0); a.translate(0,.82,0); const b=new TT.IcosahedronGeometry(.32,0); b.scale(1.1,.45,1); b.translate(-.25,.66,.12); return mergeG([a,b]); })(),
        (()=>{ const a=new TT.ConeGeometry(.36,.62,7); a.translate(0,.55,0); const b=new TT.ConeGeometry(.26,.45,7); b.translate(0,.85,0); return mergeG([a,b]); })() ];
      const trunkG=(()=>{ const g=new TT.CylinderGeometry(.03,.05,.6,5); g.translate(0,.3,0); return g; })();
      const LEAF=[['#46663a','#567a43','#3a5833','#62824a','#4d6e3e'],['#34502f','#3f5d36','#2e482b','#4a6739'],['#2a432b','#344f33','#243a25']];
      const forest=(items,o)=>{ o=o||{}; const byK=[[],[],[]]; items.forEach(it=>byK[it[4]||0].push(it)); const M4=new TT.Matrix4(), Qt=new TT.Quaternion(), V=new TT.Vector3(), Sc=new TT.Vector3(), Eu=new TT.Euler(), c=new TT.Color(); const out=[];
        byK.forEach((L,k)=>{ if(!L.length) return; const cm=new TT.MeshStandardMaterial({color:0xffffff,roughness:.92,flatShading:true}); const im=new TT.InstancedMesh(crownG[k],cm,L.length); const tm=o.trunks!==false?new TT.InstancedMesh(trunkG,K.M.trunk,L.length):null;
          L.forEach((it,i)=>{ const h=it[3], w=h*(it[6]||1); Eu.set(0,(it[0]*13.1+it[2]*7.7)%6.28,0); Qt.setFromEuler(Eu); V.set(it[0],it[1],it[2]); Sc.set(w,h,w); M4.compose(V,Qt,Sc); im.setMatrixAt(i,M4); if(tm) tm.setMatrixAt(i,M4); const P=LEAF[k]; const t=it[5]===undefined?((it[0]*.37+it[2]*.61)%1+1)%1:it[5]; c.set(P[Math.floor(t*P.length)%P.length]).convertSRGBToLinear(); im.setColorAt(i,c); });
          im.instanceMatrix.needsUpdate=true; if(im.instanceColor) im.instanceColor.needsUpdate=true; im.castShadow=!!o.cast; im.receiveShadow=true; (o.grp||K.life).add(im); out.push(im); if(tm){ tm.instanceMatrix.needsUpdate=true; tm.castShadow=!!o.cast; (o.grp||K.life).add(tm); } }); return out; };
      // 숲 흩뿌리기: 영역 [x0,x1,z0,z1], 간격 sp, 높이 함수 hf, 조건 ok(x,z,h)→false면 생략, 나무 크기 hs(x,z,h)
      const scatter=(x0,x1,z0,z1,sp,hf,ok,hs,kind)=>{ const L=[]; for(let z=z0;z<z1;z+=sp) for(let x=x0;x<x1;x+=sp){ const xx=x+(r()-.5)*sp*.9, zz=z+(r()-.5)*sp*.9; const h=hf(xx,zz); if(ok&&!ok(xx,zz,h)) continue; const s=hs?hs(xx,zz,h):sp*1.2; const kd=typeof kind==='function'?kind(xx,zz,h):(kind===undefined?(r()<.45?1:0):kind); L.push([xx,h-s*.08,zz,s*(.8+r()*.45),kd,r(),.85+r()*.4]); } return L; };
      // 도시 블록(멀리, 낮게): 한 메시 · 꼭짓점 색
      const blocks=(list)=>{ if(!list.length) return; const n=list.length*30, P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3); let o=0; const c=new TT.Color();
        const quad=(a,b,cc,d,nx,ny,nz,k)=>{ for(const q of [a,b,cc,a,cc,d]){ P[o*3]=q[0]; P[o*3+1]=q[1]; P[o*3+2]=q[2]; N[o*3]=nx; N[o*3+1]=ny; N[o*3+2]=nz; Cc[o*3]=c.r*k; Cc[o*3+1]=c.g*k; Cc[o*3+2]=c.b*k; o++; } };
        for(const [x,z,w,d,h,hex] of list){ c.set(hex).convertSRGBToLinear(); const X0=x-w/2,X1=x+w/2,Z0=z-d/2,Z1=z+d/2; quad([X0,h,Z1],[X1,h,Z1],[X1,h,Z0],[X0,h,Z0],0,1,0,1.06); quad([X0,0,Z1],[X1,0,Z1],[X1,h,Z1],[X0,h,Z1],0,0,1,.95); quad([X1,0,Z0],[X0,0,Z0],[X0,h,Z0],[X1,h,Z0],0,0,-1,.9); quad([X1,0,Z1],[X1,0,Z0],[X1,h,Z0],[X1,h,Z1],1,0,0,.86); quad([X0,0,Z0],[X0,0,Z1],[X0,h,Z1],[X0,h,Z0],-1,0,0,.86); }
        const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(Cc,3)); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:.9})); m.receiveShadow=true; K.life.add(m); return m; };
      // 값 잡음(능선 질감)
      const hsh=(x,z)=>{ let n=Math.imul(x|0,374761393)+Math.imul(z|0,668265263)|0; n=Math.imul(n^(n>>>13),1274126177); return ((n^(n>>>16))>>>0)/4294967296; };
      const vn=(x,z)=>{ const xi=Math.floor(x), zi=Math.floor(z), xf=x-xi, zf=z-zi; const u=xf*xf*(3-2*xf), v=zf*zf*(3-2*zf); const a=hsh(xi,zi), b=hsh(xi+1,zi), c=hsh(xi,zi+1), d=hsh(xi+1,zi+1); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; };
      const fbm=(x,z,o)=>{ let s=0, a=.5, f=1; for(let i=0;i<(o||4);i++){ s+=a*vn(x*f,z*f); a*=.5; f*=2.03; } return s; };
      const ridged=(x,z)=>{ let s=0,a=.5,f=1; for(let i=0;i<3;i++){ s+=a*(1-Math.abs(vn(x*f,z*f)*2-1)); a*=.5; f*=2.1; } return s; };
      const ss=t=>{ t=Math.min(1,Math.max(0,t)); return t*t*(3-2*t); };
      // 산 봉우리 합: pk [x,z,rx,rz,h,pow]
      const peaks=(x,z,pk)=>{ let h=0; for(let i=0;i<pk.length;i++){ const q=pk[i]; const ax=(x-q[0])/q[2], az=(z-q[1])/q[3]; const d2=ax*ax+az*az; if(d2<1){ const d=Math.sqrt(d2); const e=1-ss(d); h=Math.max(h,q[4]*Math.pow(e,q[5]||1.3))+q[4]*.04*(1-d)*(1-d); } } return h; };
      // 기본 산색: 숲(짙은 녹색 변주) · 바위(높은 곳·급경사) · 아래 풀
      const mcol=(x,z,h,ny,o)=>{ o=o||{}; const n=fbm(x*.02,z*.02,2), m=vn(x*.006+5,z*.006); let c=[.2+.07*n,.29+.08*n,.16+.05*n]; if(m>.6) c=[c[0]*.85+.05,c[1]*.9+.04,c[2]*.85]; const rock=Math.min(1,(h>(o.rockH||150)-50?(o.rock||0)*ss((h-(o.rockH||150))/50)*ss((.9-ny)/.12)*ss((vn(x*.012,z*.012)-.35)/.2):0)+(o.cliff||0)*ss((.62-ny)/.12)); if(rock>0){ const rc=[.58+.08*n,.56+.07*n,.52+.06*n]; c=c.map((v,i)=>v+(rc[i]-v)*Math.min(1,rock)); } const low=ss((o.low||6)-h); if(low>0){ const gc=o.lowc||[.62,.66,.5]; c=c.map((v,i)=>v+(gc[i]-v)*low); } return c; };
      return {BAK,MAS,mat,plane,terrain,forest,scatter,blocks,fbm,ridged,vn,ss,peaks,mcol,r,lin,tex}; })();
    // ---- 세계 랜드마크 공용(v13 W): 하늘 돔 · life 바닥판 · 창 질감 도시 블록(지붕 포함) · 물 ----
    const W=(()=>{ const TT=K.T;
      // 하늘 돔(초고층·넓은 맥락용): 뷰어 하늘 구(600)보다 카메라가 멀어질 때 검게 비는 것을 막음 — 밤이면 밤색
      const sky=(R)=>{ const g=new TT.SphereGeometry(R,32,16); const p=g.attributes.position; const mk=night=>{ const col=[]; const top=new TT.Color(night?0x0b1226:0x9fc0de).convertSRGBToLinear(), hor=new TT.Color(night?0x2a3350:0xeee9df).convertSRGBToLinear(), c=new TT.Color(); for(let i=0;i<p.count;i++){ const t=Math.max(0,Math.min(1,p.getY(i)/(R*.63))); c.copy(hor).lerp(top,Math.pow(t,.65)); col.push(c.r,c.g,c.b); } return new TT.Float32BufferAttribute(col,3); }; const cD=mk(false), cN=mk(true); g.setAttribute('color',cD); const m=new TT.Mesh(g,new TT.MeshBasicMaterial({vertexColors:true,side:TT.BackSide,fog:false,depthWrite:false})); m.renderOrder=-1; m.frustumCulled=false; let cur=0; m.onBeforeRender=(r,sc)=>{ const n=sc.fog&&sc.fog.color&&sc.fog.color.r<.3?1:0; if(n!==cur){ cur=n; g.setAttribute('color',n?cN:cD); } }; K.life.add(m); return m; };
      // life 평면(bbox 밖): 재질 m, 중심 x,z, 크기 w,d, 높이 y, 회전 ry
      const lplane=(m,x,y,z,w,d,ry)=>{ const g=new TT.PlaneGeometry(w,d); g.rotateX(-Math.PI/2); if(ry) g.rotateY(ry); g.translate(x,y,z); if(m.userData&&m.userData.tm){ const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); } const me=new TT.Mesh(g,m); me.receiveShadow=m!==WATER; K.life.add(me); return me; };
      // 다각형 바닥(life): pts [[x,z],…]
      const lpoly=(m,pts,y)=>{ pts=pts.slice(); { let a=0; for(let i=0;i<pts.length;i++){ const p=pts[i], q=pts[(i+1)%pts.length]; a+=p[0]*q[1]-q[0]*p[1]; } if(a>0) pts.reverse(); } const sh=new TT.Shape(); pts.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); const g=new TT.ShapeGeometry(sh); g.rotateX(-Math.PI/2); g.translate(0,y,0); if(m.userData&&m.userData.tm){ const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); } m.side=TT.DoubleSide; const me=new TT.Mesh(g,m); me.receiveShadow=true; K.life.add(me); return me; };
      const solid=(hex,o)=>{ const m=new TT.MeshStandardMaterial(Object.assign({color:hex,roughness:.95},o||{})); m.color.convertSRGBToLinear(); m.userData.nocast=1; return m; };
      const WATER=new TT.MeshStandardMaterial({color:0x4f7d8c,roughness:.05,metalness:.02,transparent:true,opacity:.86}); WATER.color.convertSRGBToLinear(); WATER.userData.nocast=1;
      // 창 질감: 'p' 석조 펀치창(3 m × 3.4 m 칸) · 'g' 커튼월 띠(유리 + 멀리언) — 흰 바탕, 꼭짓점 색으로 물들임
      const winTex=(kind)=>E.tex('win'+kind,256,(g,N,rr)=>{ if(kind==='g'){ g.fillStyle='#c9d1d8'; g.fillRect(0,0,N,N); for(let j=0;j<4;j++){ g.fillStyle='#f2f4f5'; g.fillRect(0,j*N/4,N,N/4*.14); for(let i=0;i<8;i++){ const t=.85+rr()*.3; g.fillStyle=`rgb(${Math.round(168*t)},${Math.round(186*t)},${Math.round(200*t)})`; g.fillRect(i*N/8+2,j*N/4+N/4*.16,N/8-4,N/4*.84); } } }
        else { g.fillStyle='#ffffff'; g.fillRect(0,0,N,N); for(let j=0;j<4;j++) for(let i=0;i<4;i++){ const lit=rr(); g.fillStyle=lit<.15?'#7d8590':'#59616b'; g.fillRect(i*N/4+N/4*.28,j*N/4+N/4*.22,N/4*.44,N/4*.56); } } });
      // 블록: [x,z,w,d,h,hex,ry,kind('p'|'g'|'n'),roofHex,roofH,roofInset]
      // 뷰 시선 확보: 뷰어 카메라(눈높이 az≈.75·정면 az=π/2, 거리는 bbox로 정해짐 — r=max(폭,깊이,높이×1.5))와 모형 사이 원뿔 안의 블록은 시선보다 낮게 깎음
      let VB=null; const vcap=(x,z,w,d,h)=>{ if(!VB){ const bb=new TT.Box3().setFromObject(K.bldg), sz=bb.getSize(new TT.Vector3()), c=bb.getCenter(new TT.Vector3()); const r=Math.max(sz.x,sz.z,sz.y*1.5); VB={c,sz,r,cams:[[.75,(r*.95+10),1.7+r*.05,.07],[1.0,(r*.95+10),1.7+r*.05,.07],[Math.PI/2,(r*1.3+12),1.7+r*.05,.18],[Math.PI/2,(r*1.3+12),Math.max(2,sz.y*.42),.18]]}; }
        let lim=h; const R0=Math.max(VB.sz.x,VB.sz.z)/2+10, br=Math.hypot(w,d)/2; for(const [a,D,yt,el] of VB.cams){ const ca=Math.cos(a), sa=Math.sin(a); const dx=x-VB.c.x, dz=z-VB.c.z; const t=(dx*ca+dz*sa)/D; if(t<0||t>1.1) continue; const p=Math.abs(-dx*sa+dz*ca); const hw=R0*(1-t)+6+br; if(p>hw) continue; const yc=yt+D*Math.sin(el); const yb=Math.min(VB.sz.y*.15,30)+4; lim=Math.min(lim,yb*(1-t)+yc*t-4); } return lim; };
      const city=(list)=>{ const by={p:[],g:[],n:[]}; list=list.map(b=>{ if(b[12]) return b; const lim=vcap(b[0],b[1],b[2],b[3],b[4]); if(lim>=b[4]) return b; if(lim<5) return null; const c=b.slice(); c[4]=lim; return c; }).filter(Boolean); list.forEach(b=>(by[b[7]||'p']||by.p).push(b)); const out=[];
        for(const k of ['p','g','n']){ const L=by[k]; if(!L.length) continue; let nv=0; for(const b of L) nv+=(b[8]!==undefined&&b[8]!==null&&b[9])?60:30; const P=new Float32Array(nv*3), N=new Float32Array(nv*3), U=new Float32Array(nv*2), C=new Float32Array(nv*3); let o=0; const c=new TT.Color(), rc=new TT.Color(); const CW=12, CH=k==='g'?15:13.6;
          let cr=0,cg=0,cb=0; const V=(px,py,pz,nx,ny,nz,u,v)=>{ const i3=o*3, i2=o*2; P[i3]=px; P[i3+1]=py; P[i3+2]=pz; N[i3]=nx; N[i3+1]=ny; N[i3+2]=nz; U[i2]=u; U[i2+1]=v; C[i3]=cr; C[i3+1]=cg; C[i3+2]=cb; o++; };
          for(const b of L){ const [x,z,w,d,h,hex,ry,kk,rh,rH,rI,by]=b; const Y0=by||0, yb=by?Y0-6:0; c.set(hex).convertSRGBToLinear(); const cs=Math.cos(ry||0), sn=Math.sin(ry||0); const hw=w/2, hd=d/2;
            const XA=lx=>lx*cs, ZA=lx=>-lx*sn; const px=(lx,lz)=>x+lx*cs+lz*sn, pz=(lx,lz)=>z-lx*sn+lz*cs;
            const SD=[[-hw,hd,hw,hd,0,1,.95],[hw,hd,hw,-hd,1,0,.86],[hw,-hd,-hw,-hd,0,-1,.9],[-hw,-hd,-hw,hd,-1,0,.86]]; const u0=((x*.37+z*.11)%1+1)%1;
            for(const [ax,az,bx,bz,nx0,nz0,sh] of SD){ const L2=Math.hypot(bx-ax,bz-az); cr=c.r*sh; cg=c.g*sh; cb=c.b*sh; const nx=nx0*cs+nz0*sn, nz=-nx0*sn+nz0*cs; const Ax=px(ax,az), Az=pz(ax,az), Bx=px(bx,bz), Bz=pz(bx,bz); const u1=u0+L2/CW, v1=h/CH, yt=h+Y0;
              V(Ax,yb,Az,nx,0,nz,u0,0); V(Bx,yb,Bz,nx,0,nz,u1,0); V(Bx,yt,Bz,nx,0,nz,u1,v1); V(Ax,yb,Az,nx,0,nz,u0,0); V(Bx,yt,Bz,nx,0,nz,u1,v1); V(Ax,yt,Az,nx,0,nz,u0,v1); }
            const yt=h+Y0;
            if(rh!==undefined&&rh!==null&&rH){ rc.set(rh).convertSRGBToLinear(); const ins=Math.max(.2,Math.min(rI||rH,Math.min(hw,hd)-.2)); const q=[[-hw,hd],[hw,hd],[hw,-hd],[-hw,-hd]], qi=[[-hw+ins,hd-ins],[hw-ins,hd-ins],[hw-ins,-hd+ins],[-hw+ins,-hd+ins]]; const sl=Math.hypot(ins,rH);
              for(let i=0;i<4;i++){ const j=(i+1)%4; const nn=SD[i]; const nx=(nn[4]*cs+nn[5]*sn)*rH/sl, nz=(-nn[4]*sn+nn[5]*cs)*rH/sl, ny=ins/sl; const sh=[1,.85,.78,.88][i]; cr=rc.r*sh; cg=rc.g*sh; cb=rc.b*sh;
                const Ax=px(q[i][0],q[i][1]), Az=pz(q[i][0],q[i][1]), Bx=px(q[j][0],q[j][1]), Bz=pz(q[j][0],q[j][1]), Cx=px(qi[j][0],qi[j][1]), Cz=pz(qi[j][0],qi[j][1]), Dx=px(qi[i][0],qi[i][1]), Dz=pz(qi[i][0],qi[i][1]);
                V(Ax,yt,Az,nx,ny,nz,.02,.02); V(Bx,yt,Bz,nx,ny,nz,.02,.02); V(Cx,yt+rH,Cz,nx,ny,nz,.02,.02); V(Ax,yt,Az,nx,ny,nz,.02,.02); V(Cx,yt+rH,Cz,nx,ny,nz,.02,.02); V(Dx,yt+rH,Dz,nx,ny,nz,.02,.02); }
              cr=rc.r; cg=rc.g; cb=rc.b; const p0=[px(qi[0][0],qi[0][1]),pz(qi[0][0],qi[0][1])], p1=[px(qi[1][0],qi[1][1]),pz(qi[1][0],qi[1][1])], p2=[px(qi[2][0],qi[2][1]),pz(qi[2][0],qi[2][1])], p3=[px(qi[3][0],qi[3][1]),pz(qi[3][0],qi[3][1])];
              V(p0[0],yt+rH,p0[1],0,1,0,.02,.02); V(p1[0],yt+rH,p1[1],0,1,0,.02,.02); V(p2[0],yt+rH,p2[1],0,1,0,.02,.02); V(p0[0],yt+rH,p0[1],0,1,0,.02,.02); V(p2[0],yt+rH,p2[1],0,1,0,.02,.02); V(p3[0],yt+rH,p3[1],0,1,0,.02,.02); }
            else { const f=k==='n'?1.02:.8; cr=c.r*f; cg=c.g*f; cb=c.b*f; const p0=[px(-hw,hd),pz(-hw,hd)], p1=[px(hw,hd),pz(hw,hd)], p2=[px(hw,-hd),pz(hw,-hd)], p3=[px(-hw,-hd),pz(-hw,-hd)]; V(p0[0],yt,p0[1],0,1,0,.02,.02); V(p1[0],yt,p1[1],0,1,0,.02,.02); V(p2[0],yt,p2[1],0,1,0,.02,.02); V(p0[0],yt,p0[1],0,1,0,.02,.02); V(p2[0],yt,p2[1],0,1,0,.02,.02); V(p3[0],yt,p3[1],0,1,0,.02,.02); } }
          const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P.subarray(0,o*3),3)); g.setAttribute('normal',new TT.BufferAttribute(N.subarray(0,o*3),3)); g.setAttribute('uv',new TT.BufferAttribute(U.subarray(0,o*2),2)); g.setAttribute('color',new TT.BufferAttribute(C.subarray(0,o*3),3));
          const tx=k==='n'?null:winTex(k); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,map:tx,roughness:k==='g'?.45:.9,metalness:k==='g'?.1:0})); m.receiveShadow=true; m.castShadow=false; K.life.add(m); out.push(m); } return out; };
      // 흩뿌리기 도우미: 사각 격자 블록(가로 간격 sx·sz, 도로 폭 rw) — ok(x,z)가 false면 생략, f(x,z)→[w,d,h,hex,kind,roofHex,roofH,inset] 
      const grid=(x0,x1,z0,z1,sx,sz,rw,ok,f,ry)=>{ const L=[]; const cs=Math.cos(ry||0), sn=Math.sin(ry||0); for(let a=x0;a<x1;a+=sx) for(let b=z0;b<z1;b+=sz){ const x=a*cs+b*sn, z=-a*sn+b*cs; if(ok&&!ok(x,z)) continue; const q=f(x,z,sx-rw,sz-rw); if(!q) continue; L.push([x,z,q[0],q[1],q[2],q[3],ry||0,q[4],q[5],q[6],q[7]]); } return L; };
      // 도시 고리: o={r0,r1,step,keep(x,z)→bool, h(r)→높이, pal:[색…], gp:유리 비율, tall:[확률,최소,폭], ry, roof:[색,높이,들임] or null, fill:비율}
      const ring=(o)=>{ const L=[]; const st=o.step||50, cs=Math.cos(o.ry||0), sn=Math.sin(o.ry||0); for(let a=-o.r1;a<o.r1;a+=st) for(let b=-o.r1;b<o.r1;b+=st){ const x0=a+(E.r()-.5)*st*.25, z0=b+(E.r()-.5)*st*.25; const x=(o.cx||0)+x0*cs+z0*sn, z=(o.cz||0)-x0*sn+z0*cs; const r=Math.hypot(x0,z0); if(r<o.r0||r>o.r1) continue; if(o.keep&&!o.keep(x,z,r)) continue; if(o.clr&&x>-o.clr*.12&&z>-o.clr*.12&&Math.hypot(x,z)<o.clr) continue; if(E.r()>(o.fill||.65)) continue;
          const tall=o.tall&&E.r()<o.tall[0]; const gl=tall||E.r()<(o.gp||0); const w=st*(.45+E.r()*.35), d=st*(.45+E.r()*.35); const h=tall?o.tall[1]+E.r()*o.tall[2]:o.h(r,x,z); const pal=gl?(o.gpal||['#b7c5cf','#a3b4c0','#c3cdd4']):o.pal; const rf=!gl&&o.roof?o.roof:null; L.push([x,z,w,d,h,pal[Math.floor(E.r()*pal.length)],o.ry||0,gl?'g':(o.kind||'p'),rf?rf[0]:null,rf?rf[1]:0,rf?rf[2]:0,o.hy?o.hy(x,z):0]); } return city(L); };
      // 맨해튼 격자: x 방향 블록 길이 bx(애비뉴 간격), z 방향 by(스트리트 간격), 블록마다 남북 두 줄로 필지를 나눔 — o={x0,x1,z0,z1,bx,bz,aw,sw,skip(x,z,w,d)→bool, h(x,z)→높이, pal, gpal, gp}
      const manh=(o)=>{ const L=[]; const bx=o.bx||260, bz=o.bz||80, aw=o.aw||30, sw=o.sw||18; for(let X=o.x0;X<o.x1;X+=bx) for(let Z=o.z0;Z<o.z1;Z+=bz){ const W0=bx-aw, D0=bz-sw; for(const row of [-1,1]){ let x=X-W0/2; while(x<X+W0/2-4){ const w=Math.min(X+W0/2-x,10+E.r()*E.r()*45); const cx=x+w/2, cz=Z+row*D0/4, d=D0/2-(E.r()<.3?E.r()*8:0); x+=w; if(o.skip&&o.skip(cx,cz,w,d)) continue; const h=o.h(cx,cz); if(h<=0) continue; const gl=h>110&&E.r()<(o.gp===undefined?.5:o.gp); const pal=gl?(o.gpal||['#a9b8c3','#9aabb7','#bcc6cc']):(o.pal||['#cbbfa8','#b9a993','#a38f7a','#d8d0c0','#9c8f84','#c4b49c']); L.push([cx,cz+(row>0?-(D0/2-d)/2:(D0/2-d)/2),w-.6,d,h,pal[Math.floor(E.r()*pal.length)],0,gl?'g':'p']); } } } return city(L); };
      // 뷰어의 일반 대지(잔디판·포장판·길·차선)를 이 모형이 떠 있는 동안만 숨김 — site 자식의 visible을 getter로 바꿔(life가 보일 때 false) 첫 프레임·썸네일에서도 적용, 'site' 단계처럼 life가 꺼지면 원래대로 보이고, 다른 모형으로 바뀌면(표식이 life에서 빠지면) 자동으로 원상
      const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
        const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
      return {sky,lplane,lpoly,solid,WATER,city,grid,ring,manh,own}; })();

    // 질감: 트래버틴(거친 베이지 정사각 판 76 cm, 가로 결) · 흰 에나멜 판(76 cm 격자) — 512 px = 3.05 m
    const trT=E.tex('usGettyTrav',512,(g,N,rr)=>{ const n=4, c=N/n; for(let j=0;j<n;j++) for(let i=0;i<n;i++){ const t=.92+rr()*.12; g.fillStyle=`rgb(${Math.round(214*t)},${Math.round(200*t)},${Math.round(170*t)})`; g.fillRect(i*c,j*c,c,c); for(let k=0;k<26;k++){ const y=j*c+rr()*c; g.fillStyle=rr()<.6?'rgba(120,100,70,.28)':'rgba(255,248,230,.25)'; g.fillRect(i*c+rr()*c*.3,y,c*(.3+rr()*.7),1+rr()*2.5); } for(let k=0;k<40;k++){ g.fillStyle='rgba(90,72,50,.35)'; g.fillRect(i*c+rr()*c,j*c+rr()*c,2+rr()*3,1.5); } }
      g.strokeStyle='rgba(110,95,72,.55)'; g.lineWidth=2; for(let k=0;k<=n;k++){ g.beginPath(); g.moveTo(k*c,0); g.lineTo(k*c,N); g.stroke(); g.beginPath(); g.moveTo(0,k*c); g.lineTo(N,k*c); g.stroke(); } });
    const mtT=E.tex('usGettyMetal',512,(g,N,rr)=>{ g.fillStyle='#eeece6'; g.fillRect(0,0,N,N); const n=4, c=N/n; for(let j=0;j<n;j++) for(let i=0;i<n;i++){ const t=.97+rr()*.04; g.fillStyle=`rgb(${Math.round(238*t)},${Math.round(236*t)},${Math.round(230*t)})`; g.fillRect(i*c+2,j*c+2,c-4,c-4); } g.strokeStyle='rgba(120,120,115,.6)'; g.lineWidth=2.2; for(let k=0;k<=n;k++){ g.beginPath(); g.moveTo(k*c,0); g.lineTo(k*c,N); g.stroke(); g.beginPath(); g.moveTo(0,k*c); g.lineTo(N,k*c); g.stroke(); } });
    const TRV=tmat(trT,0xd6c8aa,{roughness:.95}), MTL=tmat(mtT,0xeeece6,{roughness:.45,metalness:.12}), GLS=K.col(0x6f8995,{roughness:.08,metalness:.5}), MUL=K.col(0xd9d9d4,{roughness:.4,metalness:.4}),
      PAV=tmat(trT,0xd8ccb2,{roughness:.95,tint:0xece4d2}), GRN=K.col(0x6e8b4a,{roughness:.95}), CAC=K.col(0x5f7d4a,{roughness:.8}), AZA=K.col(0xd2557a,{roughness:.8}), DK=K.col(0x50545a,{roughness:.6});
    const TL=[], ML=[], GL=[], MU=[]; const TM=3.05;
    // 전시동: 아래 트래버틴(높이 hb) + 위 흰 금속(높이 ht) + 천창 랜턴 + 유리 띠 — ry 회전(두 격자 축)
    const pav=(x,z,w,d,hb,ht,ry,lan)=>{ TL.push(bx(x,0,z,w,hb,d,ry,TM)); { const c=Math.cos(ry||0), s=Math.sin(ry||0), n=Math.max(2,Math.round(w/3.05)); for(let i=0;i<=n;i++){ const ox=-w/2+.6+i*(w-1.2)/n; MU.push(bx(x+ox*c+(d/2-.55)*s,hb,z-ox*s+(d/2-.55)*c,.12,ht,.12,ry)); } GL.push(bx(x+(d/2-.62)*s,hb+ht*.35,z+(d/2-.62)*c,w-1.4,ht*.4,.08,ry)); } ML.push(bx(x,hb,z,w-1.2,ht,d-1.2,ry,TM)); GL.push(bx(x,hb-.1,z,w-.6,1.2,d-.6,ry)); ML.push(bx(x,hb+ht,z,w+.6,.5,d+.6,ry,TM));
      if(lan){ const c=Math.cos(ry||0), s=Math.sin(ry||0); for(let k=-1;k<=1;k++){ const ox=k*w*.28; GL.push(bx(x+ox*c,hb+ht+.5,z-ox*s,w*.18,1.6,d*.6,ry)); ML.push(bx(x+ox*c,hb+ht+2.1,z-ox*s,w*.2,.3,d*.62,ry)); } } };
    // 원통(입구 홀): 금속 + 유리 띠 + 지붕
    const drum=(x,z,r,h)=>{ const n=Math.round(2*Math.PI*r/2.4); for(let i=0;i<n;i++){ const a=i/n*Math.PI*2, a2=(i+.5)/n*Math.PI*2; const px=x+Math.cos(a2)*r, pz=z+Math.sin(a2)*r; if(i%5===0||(i%5===1)) GL.push(bx(px,4,pz,.08,h-6,2*Math.PI*r/n,-a2)); else ML.push(bx(px,0,pz,.3,h,2*Math.PI*r/n+.05,-a2,TM)); MU.push(bx(x+Math.cos(a)*r,0,z+Math.sin(a)*r,.2,h,.2)); } TL.push(bx(x,0,z,r*2*.72,4,r*2*.72,Math.PI/4,TM)); const c=new T.CylinderGeometry(r+.8,r+.8,.6,48); c.translate(x,h+.3,z); ML.push(c); };
    // 언덕 지형: 캠퍼스 평지(0) + 중앙 정원 골짜기 + 바깥 급경사 계곡 + 먼 LA 분지·바다
    const camp=(x,z)=>{ const dx=(x+50)/185, dz=(z+5)/140; return Math.hypot(dx,dz); };
    const hf=(x,z)=>{ const c=camp(x,z); let h=-E.ss((c-.95)/.9)*90-E.ss((c-2)/3)*170; h+= (E.fbm(x*.012,z*.012,3)-.5)*30*E.ss((c-1.1)/.6); const gd=Math.exp(-Math.pow((x+112)/22,2)-Math.pow((z-55)/62,2)); h-=gd*14; if(z>140&&x<-120) h-=E.ss((z-140)/100)*10; return h; };
    // ================= 배경(K.life): 산타모니카 산자락 · 405번 고속도로 · LA 분지 · 태평양 =================
    W.own(); W.sky(3000);
    LIFE(()=>{ const TR=E.terrain(-3000,3000,-3000,3000,140,140,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.03,z*.03,2); if(h<-230) return [.66+.05*n,.64+.05*n,.58]; if(h>-1&&camp(x,z)<1.05) return [.86,.82,.72]; if(ny<.8) return [.58+.06*n,.52+.05*n,.4]; return [.42+.07*n,.46+.06*n,.3+.04*n]; },[-240,150,-170,130]);
      E.terrain(-240,150,-170,130,78,60,(x,z)=>Math.min(0,hf(x,z)),(x,z,h,ny)=>{ const n=E.fbm(x*.05,z*.05,2); if(h>-.4) return [.8,.76,.66]; return [.44+.06*n,.56+.05*n,.32]; },[-80,60,-110,50]);
      W.lplane(W.WATER,-3600,-262,1200,3000,6000); // 태평양(남서, 멀리 아래)
      // LA 분지 도시(남쪽 아래, 낮은 블록) · 405번 고속도로(동쪽 골짜기)
      W.city(W.grid(-2400,2400,900,2600,90,90,24,(x,z)=>E.r()<.7,(x,z,w,d)=>[w*.8,d*.8,6+E.r()*E.r()*30,['#cbbfa8','#b9b1a2','#d6cfc2','#a59d90'][Math.floor(E.r()*4)],E.r()<.2?'g':'p']).map(b=>{ b[11]=TR.h(b[0],b[1]); return b; }));
      { const pts=[]; for(let z=-3000;z<=3000;z+=50) pts.push([380+Math.sin(z*.0012)*90,z]); const L=[]; for(let i=0;i<pts.length-1;i++){ const [x0,z0]=pts[i],[x1,z1]=pts[i+1]; const y=Math.min(TR.h(x0,z0),TR.h(x1,z1))+.6; L.push(bx((x0+x1)/2,y-.6,(z0+z1)/2,22,.6,Math.hypot(x1-x0,z1-z0)+1,Math.atan2(x1-x0,z1-z0))); } merge(L,K.col(0x5a5b5d,{roughness:.9}),false); }
      // 산 덤불(차파랄)·소나무·플라타너스 — 캠퍼스 둘레
      E.forest(E.scatter(-900,900,-900,900,16,TR.h,(x,z,h)=>camp(x,z)>1.15&&h>-200&&E.r()<.55,(x,z,h)=>4+E.r()*4,(x,z,h)=>E.r()<.3?1:0),{trunks:false});
      E.forest(E.scatter(-240,150,-170,130,9,(x,z)=>Math.min(0,hf(x,z)),(x,z,h)=>camp(x,z)>.98&&camp(x,z)<1.15&&E.r()<.6,(x,z,h)=>8+E.r()*5,(x,z,h)=>E.r()<.5?1:0),{trunks:true});
      // 트램 궤도(북쪽 아래 주차장에서 도착 광장까지, 고가)
      { const L=[]; for(let i=1;i<40;i++){ const t=i/40, x=-60-t*40, z=-150-t*700; const y=TR.h(x,z); L.push(bx(x,y+3,z,3,.6,18.2,Math.atan2(-40,-700))); L.push(bx(x,y,z,.8,3,.8)); } merge(L,K.col(0xdedcd6,{roughness:.7}),false); }
    });
    // ================= 0: 광장 포장 · 분수 마당 · 계단 =================
    K.layer(0);
    merge([bx(-10,-.1,-30,150,.1,170,0,TM),bx(-140,-.1,-120,120,.1,60,0,TM),bx(-200,-.1,40,96,.1,96,0,TM),bx(40,-.1,90,70,.1,50,0,TM)],PAV,false);
    // 분수 마당: 긴 연못 + 트래버틴 테두리
    merge([bx(0,0,0,48,.5,10,0,TM)],TRV); K.water(0,.42,0,46.6,8.6).material=W.WATER;
    { const st=[]; for(let i=0;i<10;i++) st.push(bx(-10,0,-86+i*.45,22,(10-i)*.18,.45)); merge(st,PAV); } // 입구 홀 앞 큰 계단(낮게)
    // ================= 1: 전시동(트래버틴 + 흰 금속) · 입구 홀 · 북쪽 건물 =================
    K.layer(1);
    pav(-25,-30,30,20,9,7,0,1);          // 북 전시동
    pav(41,-10,26,30,9,7,0,1);           // 동 전시동
    pav(35,35,30,24,9,7,0,1);            // 남 전시동
    pav(-30,30,26,26,9,7,0,1);           // 서 전시동
    pav(-50,-5,22,30,8,7,0,0);           // 기획 전시동
    pav(12,-36,14,14,6,5,0,0); pav(62,20,14,22,6,4,0,0); pav(4,46,16,12,5,5,0,0); // 잇는 낮은 동(추정)
    pav(-78,-62,34,18,5,6,.39,0); pav(-128,-40,26,30,5,7,.39,0); // 레스토랑·카페 동, 보존연구소 동(축 22.5°)
    drum(-10,-60,13,20);                 // 원통 입구 홀
    // 북쪽(도착 광장 옆) 사무동·강당 — 다른 격자 축(22.5°)
    pav(-110,-120,70,26,6,8,.39,0); pav(-160,-90,40,24,5,7,.39,0);
    // 원형 연구소(바깥 링 건물 + 안쪽 둥근 마당)
    { const sh=new T.Shape(); sh.absarc(0,0,36,0,Math.PI*2,false); const ho=new T.Path(); ho.absarc(0,0,17,0,Math.PI*2,true); sh.holes.push(ho); const gB=new T.ExtrudeGeometry(sh,{depth:6,bevelEnabled:false,curveSegments:48}); gB.rotateX(-Math.PI/2); gB.translate(-200,0,40); TL.push(gB);
      const sh2=new T.Shape(); sh2.absarc(0,0,35,0,Math.PI*2,false); const ho2=new T.Path(); ho2.absarc(0,0,18,0,Math.PI*2,true); sh2.holes.push(ho2); const gM=new T.ExtrudeGeometry(sh2,{depth:8,bevelEnabled:false,curveSegments:48}); gM.rotateX(-Math.PI/2); gM.translate(-200,6,40); ML.push(gM);
      for(let i=0;i<24;i++){ const a=i/24*Math.PI*2; GL.push(bx(-200+Math.cos(a)*35.1,8,40+Math.sin(a)*35.1,.1,3,8.5,-a)); } }
    // 곡면 금속 벽(서·남 전시동 모서리, 연구소 쪽) — 마이어의 원과 직선 대비
    { const c1=new T.CylinderGeometry(9,9,15,24,1,true,Math.PI*.5,Math.PI); c1.translate(-43,0+7.5,30); ML.push(c1); const c2=new T.CylinderGeometry(7,7,12,24,1,true,-Math.PI*.2,Math.PI*.9); c2.translate(50,6,35); ML.push(c2); }
    // 홀로 선 트래버틴 벽(도착 광장·입구 길·전망 테라스 — 거친 판)
    for(const [x,z,w,h,ry] of [[-60,-95,60,4.5,0],[-30,-100,1.4,4,0],[-95,-60,1.4,5,0],[20,60,44,3.5,0],[64,70,1.4,3.5,0],[-150,-60,1.4,6,.39],[-115,-20,1.4,4,0]]) TL.push(bx(x,0,z,w,h,w>2?1.4:40,ry,TM));
    // 유리 다리(입구 홀 → 북 전시동 → 동 전시동)
    GL.push(bx(-17,7,-45,4,3.5,12)); GL.push(bx(14,7,-24,14,3.5,4)); GL.push(bx(40,7,13,4,3.5,10));
    merge(TL,TRV); merge(ML,MTL); merge(GL,GLS,false); merge(MU,MUL,false);
    // ================= 2: 중앙 정원(골짜기 · 지그재그 길 · 진달래 미로 연못) · 선인장 정원 =================
    K.layer(2);
    { const pz=[]; let x=-92, z=-6; for(let k=0;k<7;k++){ const nx=k%2?-90:-128, nz=z+11; const y0=hf(x,z), y1=hf(nx,nz); const g=facetG([[x-1.2,y0+.15,z],[x+1.2,y0+.15,z],[nx+1.2,y1+.15,nz],[nx-1.2,y1+.15,nz]],2); pz.push(g); x=nx; z=nz; } merge(pz,PAV,false); }
    { const yb=hf(-118,86); K.c(-118,yb-.3,86,18,.6,TRV,48); K.water(-118,yb+.32,86,33,33).material=W.WATER; const az=[]; for(let i=0;i<3;i++){ const r=5+i*3.6; for(let k=0;k<4;k++){ const a=k*Math.PI/2; az.push(bx(-118+Math.cos(a)*r,yb+.2,86+Math.sin(a)*r,k%2?1.4:r*1.6,.9,k%2?r*1.6:1.4)); } } merge(az,AZA); }
    { const cc=[]; for(let i=0;i<40;i++){ const a=i*2.4, r=3+(i*1.7)%11; const g=new T.CylinderGeometry(.35,.45,1.2+(i%4)*.6,6); g.translate(62+Math.cos(a)*r,.6,96+Math.sin(a)*r); cc.push(g); } merge(cc,CAC); merge([bx(62,0,96,30,.6,30,.4,TM)],TRV); }
    // 잔디(입구 아래 비탈 잔디·연구소 앞·남쪽 테라스)
    merge([bx(10,.02,-110,50,.06,30),bx(-150,.02,0,30,.06,40),bx(0,.02,72,40,.06,16)],GRN,false);
    // 플라타너스 줄(분수 마당 둘레·입구 길)
    { const L=[]; for(let i=0;i<8;i++) L.push([-50+i*14,0,-80,9,0]); for(let i=0;i<5;i++) L.push([66,0,-30+i*12,9,0]); for(let i=0;i<6;i++) L.push([-150+i*10,0,-15,8,0]); for(let i=0;i<5;i++) L.push([-130+i*12,0,-150,8,0]); for(let i=0;i<4;i++) L.push([5+i*10,0,62,7,0]); E.forest(L.map(t=>[t[0],0,t[2],t[3],0,E.r(),.75]),{trunks:true,grp:K.cur}); }
    KEEP_PEOPLE();
  }});
