__bsigFill({"umayyad":function(K){
// 출처: islamic-architecture.info 「Umayyad Mosque, Damascus」(바깥 담 100 × 157.5 m 또는 97 × 156 m, 기도당은 남쪽 3랑, 가운데 팔각 '독수리(나스르) 돔' 높이 36 m, 예수 미나렛 동쪽·서쪽 미나렛은 옛 방어탑 기초 위, 신부 미나렛은 북문 곁 사각, 마당 서쪽 카즈네(보물) 돔·동쪽 자인 알아비딘 돔 — 기둥 여덟, 북·동·서 문과 남쪽 문)
// 출처: 프랑스 문화부 「La mosquée des Omeyyades — buildings, forms and functions」(archeologie.culture.gouv.fr — 직사각 평면, 키블라와 나란한 3랑 + 가운데 넓은 날개, 마당 3 정자(가운데 세정 분수·보물·시계), 미나렛 3: 기도당 양 모서리 둘 + 북벽 가운데 하나), 브리태니커 「Great Mosque of Damascus」(705~715 알왈리드 1세, 로마 신역·성당 자리)
// 메모: 보물 정자 위치 — islamic-architecture.info는 서쪽, 프랑스 문화부 페이지는 '동쪽 정자에 보물'로 적어 갈림. 널리 알려진 서쪽(카즈네 돔)을 따름
// 모형 좌표: +z = 북(마당 쪽), 기도당은 −z(남, 메카 방향)
// 추정: 기도당 깊이 37 m·벽 높이 16 m·세 박공 지붕, 가운데 날개 폭 16 m·용마루 26 m·정면 박공, 돔 지름 16 m(팔각 북), 회랑 깊이 9 m·2층 아치 높이(아래 7.5 m·위 4 m), 미나렛 높이(예수 약 77 m — 흔히 쓰는 값, 카이트바이 약 60 m, 신부 약 35 m)와 단 구성, 정자 크기, 바깥 담 높이, 하미디야 시장 지붕·성채·카시운 산 위치(개략)
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
      const pads=(PD,ry)=>{ if(!PD.length) return; const P=new Float32Array(PD.length*18), C=new Float32Array(PD.length*18), N=new Float32Array(PD.length*18); const c=new TT.Color(); const cs=Math.cos(ry), sn=Math.sin(ry); const PV=['#aaa498','#b4aea2','#a39e94','#bbb5a9','#aea99f'], PK=['#6f8d4d','#7b9858','#66844a']; PD.forEach(([x,z,hw,y,park],i)=>{ c.set(park?PK[i%3]:PV[(i*7)%5]).convertSRGBToLinear(); const Y=y+.09; const q=[[-hw,hw],[hw,hw],[hw,-hw],[-hw,hw],[hw,-hw],[-hw,-hw]]; q.forEach((v,k)=>{ const o=i*18+k*3; P[o]=x+v[0]*cs+v[1]*sn; P[o+1]=Y; P[o+2]=z-v[0]*sn+v[1]*cs; N[o+1]=1; C[o]=c.r; C[o+1]=c.g; C[o+2]=c.b; }); }); const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(C,3)); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:.95})); m.receiveShadow=true; K.life.add(m); }; // v18i: 블록 보도·필지 판 — 사이 바닥이 길로 읽히게
      const ring=(o)=>{ const L=[], PDs=[]; const st=o.step||50, cs=Math.cos(o.ry||0), sn=Math.sin(o.ry||0); for(let a=-o.r1;a<o.r1;a+=st) for(let b=-o.r1;b<o.r1;b+=st){ const x0=a+(E.r()-.5)*st*.25, z0=b+(E.r()-.5)*st*.25; const x=(o.cx||0)+x0*cs+z0*sn, z=(o.cz||0)-x0*sn+z0*cs; const r=Math.hypot(x0,z0); if(r<o.r0||r>o.r1) continue; if(o.keep&&!o.keep(x,z,r)) continue; if(o.clr&&x>-o.clr*.12&&z>-o.clr*.12&&Math.hypot(x,z)<o.clr) continue; if(o.pads!==false){ const px=(o.cx||0)+a*cs+b*sn, pz=(o.cz||0)-a*sn+b*cs; PDs.push([px,pz,st*.41,o.hy?o.hy(px,pz):0,E.r()<.12]); } if(E.r()>(o.fill||.65)) continue;
          const tall=o.tall&&E.r()<o.tall[0]; const gl=tall||E.r()<(o.gp||0); const w=st*(.45+E.r()*.35), d=st*(.45+E.r()*.35); const h=tall?o.tall[1]+E.r()*o.tall[2]:o.h(r,x,z); const pal=gl?(o.gpal||['#b7c5cf','#a3b4c0','#c3cdd4']):o.pal; const rf=!gl&&o.roof?o.roof:null; L.push([x,z,w,d,h,pal[Math.floor(E.r()*pal.length)],o.ry||0,gl?'g':(o.kind||'p'),rf?rf[0]:null,rf?rf[1]:0,rf?rf[2]:0,o.hy?o.hy(x,z):0]); } const out=city(L); pads(PDs,o.ry||0); return out; };
      // 맨해튼 격자: x 방향 블록 길이 bx(애비뉴 간격), z 방향 by(스트리트 간격), 블록마다 남북 두 줄로 필지를 나눔 — o={x0,x1,z0,z1,bx,bz,aw,sw,skip(x,z,w,d)→bool, h(x,z)→높이, pal, gpal, gp}
      const manh=(o)=>{ const L=[]; const bx=o.bx||260, bz=o.bz||80, aw=o.aw||30, sw=o.sw||18; for(let X=o.x0;X<o.x1;X+=bx) for(let Z=o.z0;Z<o.z1;Z+=bz){ const W0=bx-aw, D0=bz-sw; for(const row of [-1,1]){ let x=X-W0/2; while(x<X+W0/2-4){ const w=Math.min(X+W0/2-x,10+E.r()*E.r()*45); const cx=x+w/2, cz=Z+row*D0/4, d=D0/2-(E.r()<.3?E.r()*8:0); x+=w; if(o.skip&&o.skip(cx,cz,w,d)) continue; const h=o.h(cx,cz); if(h<=0) continue; const gl=h>110&&E.r()<(o.gp===undefined?.5:o.gp); const pal=gl?(o.gpal||['#a9b8c3','#9aabb7','#bcc6cc']):(o.pal||['#cbbfa8','#b9a993','#a38f7a','#d8d0c0','#9c8f84','#c4b49c']); L.push([cx,cz+(row>0?-(D0/2-d)/2:(D0/2-d)/2),w-.6,d,h,pal[Math.floor(E.r()*pal.length)],0,gl?'g':'p']); } } } return city(L); };
      // 뷰어의 일반 대지(잔디판·포장판·길·차선)를 이 모형이 떠 있는 동안만 숨김 — site 자식의 visible을 getter로 바꿔(life가 보일 때 false) 첫 프레임·썸네일에서도 적용, 'site' 단계처럼 life가 꺼지면 원래대로 보이고, 다른 모형으로 바뀌면(표식이 life에서 빠지면) 자동으로 원상
      const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
        const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
      return {sky,lplane,lpoly,solid,WATER,city,grid,ring,manh,own}; })();
    // 지형(격자 좌표 직접 지정): XS·ZS 정렬된 좌표 배열, hf(x,z) 높이, cf(x,z,h,ny)→[r,g,b] sRGB, skip(x,z)→true면 그 칸 비움 — K.life(그림자 안 던짐)
    const TERR=(XS,ZS,hf,cf,skip)=>{ const TT=K.T; XS=[...new Set(XS.map(v=>+v.toFixed(3)))].sort((a,b)=>a-b); ZS=[...new Set(ZS.map(v=>+v.toFixed(3)))].sort((a,b)=>a-b); const W=XS.length, H=ZS.length, n=W*H; const Y=new Float32Array(n), P=new Float32Array(n*3), N=new Float32Array(n*3), C=new Float32Array(n*3); const lc=v=>v<.04045?v*.0773993808:Math.pow(v*.9478672986+.0521327014,2.4);
      for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i; Y[k]=hf(XS[i],ZS[j]); P[k*3]=XS[i]; P[k*3+1]=Y[k]; P[k*3+2]=ZS[j]; }
      for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, i0=Math.max(0,i-1), i1=Math.min(W-1,i+1), j0=Math.max(0,j-1), j1=Math.min(H-1,j+1); const hx=(Y[j*W+i1]-Y[j*W+i0])/(XS[i1]-XS[i0]), hz=(Y[j1*W+i]-Y[j0*W+i])/(ZS[j1]-ZS[j0]); const L=Math.sqrt(hx*hx+1+hz*hz); N[k*3]=-hx/L; N[k*3+1]=1/L; N[k*3+2]=-hz/L; const c=cf(XS[i],ZS[j],Y[k],1/L); C[k*3]=lc(c[0]); C[k*3+1]=lc(c[1]); C[k*3+2]=lc(c[2]); }
      const I=[]; for(let j=0;j<H-1;j++) for(let i=0;i<W-1;i++){ if(skip&&skip((XS[i]+XS[i+1])/2,(ZS[j]+ZS[j+1])/2)) continue; const a=j*W+i, b=a+1, c=a+W, d=c+1; I.push(a,c,b,b,c,d); }
      const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(C,3)); g.setIndex(I); g.computeBoundingSphere(); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:1})); m.receiveShadow=true; m.castShadow=false; K.life.add(m); return m; };
    const RNG=(a,b,st,ex)=>{ const L=[]; for(let v=a;v<=b+1e-6;v+=st) L.push(v); return L.concat(ex||[]); };
    // 눈높이 시선 확보: 카메라 방위 az 쪽 쐐기(건물 반폭 wb + 거리×.5) 안의 나무·소품을 빼는 판정 — true면 둬도 됨
    const VIEWCLEAR=(az,wb,az2,tmax)=>(x,z)=>{ tmax=tmax||Math.max(90,wb*7); for(const a of [az].concat(az2===undefined||az2===null?[]:[az2])){ const c=Math.cos(a), s=Math.sin(a); const t=x*c+z*s, l=Math.abs(-x*s+z*c); if(t>0&&t<tmax&&l<wb+t*.5) return false; } return true; };
    // ---- G3 공용: 아치 벽 · 가로수 줄 · 원형 배치 ----
    const archG=(w,h,t,ow,oh,pointed)=>{ const sh=new T.Shape(); sh.moveTo(-w/2,0); sh.lineTo(w/2,0); sh.lineTo(w/2,h); sh.lineTo(-w/2,h); sh.lineTo(-w/2,0); if(ow>0&&oh>0){ const hp=new T.Path(), r=ow/2, sp=Math.max(.01,oh-(pointed?ow*.87:r)); hp.moveTo(-r,0); hp.lineTo(-r,sp); if(pointed){ hp.quadraticCurveTo(-r,sp+ow*.6,0,oh); hp.quadraticCurveTo(r,sp+ow*.6,r,sp); } else hp.absarc(0,sp,r,Math.PI,0,true); hp.lineTo(r,0); hp.lineTo(-r,0); sh.holes.push(hp); } const g=new T.ExtrudeGeometry(sh,{depth:t,bevelEnabled:false,curveSegments:14}); g.translate(0,0,-t/2); return g; };
    const archWall=(x,y,z,w,h,t,ow,oh,mat,ry,pointed)=>{ const g=archG(w,h,t,ow,oh,pointed); if(ry) g.rotateY(ry); g.translate(x,y,z); return merge([g],mat); };
    const TREES=[]; const treeLine=(x0,z0,x1,z1,step,s,kd)=>{ const L=Math.hypot(x1-x0,z1-z0), n=Math.max(1,Math.floor(L/step)); for(let i=0;i<=n;i++){ const t=i/n; TREES.push([x0+(x1-x0)*t,0,z0+(z1-z0)*t,s||7,kd===undefined?1:kd,E.r(),.9+E.r()*.25]); } };
    const flushTrees=(o)=>{ if(TREES.length) E.forest(TREES.splice(0),o||{cast:true}); };
    // 상자 묶음(같은 재질 병합) — list: [x,y,z,w,h,d,ry]
    const boxes=(list,mat,cast)=>merge(list.map(b=>bx(b[0],b[1],b[2],b[3],b[4],b[5],b[6]||0)),mat,cast);
    // 두 점을 잇는 막대 조각(케이블·가새) — 정사각 단면 r×r
    const segG=(a,b,r)=>{ const dx=b[0]-a[0], dy=b[1]-a[1], dz=b[2]-a[2], L=Math.hypot(dx,dy,dz)||1e-3; const g=new T.BoxGeometry(r,L,r); g.translate(0,L/2,0); const q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),new T.Vector3(dx/L,dy/L,dz/L)); const m4=new T.Matrix4().makeRotationFromQuaternion(q); (g.applyMatrix4||g.applyMatrix).call(g,m4); g.translate(a[0],a[1],a[2]); return g; };
    const polyG=(pts,r)=>{ const gs=[]; for(let i=0;i<pts.length-1;i++) gs.push(segG(pts[i],pts[i+1],r)); return gs; };
    // 회전체 돔(오지브·달걀형) — prof: [[r,y],...] 아래→위
    const latheM=(x,y,z,prof,mat,seg)=>{ const g=new T.LatheGeometry(prof.map(p=>new T.Vector2(Math.max(.01,p[0]),p[1])),seg||32); g.translate(x,y,z); return merge([g],mat); };
    const ovoid=(r,h,n)=>{ const P=[]; n=n||14; for(let i=0;i<=n;i++){ const t=i/n; P.push([r*Math.sin(Math.acos(t))*(1-.12*t*t),h*t]); } return P; };

    // ---- G6b 공용: 재질별 묶음 병합(BAG) · 기하 조각 ----
    const BAG=new Map(); const ab=(mat,...gs)=>{ let L=BAG.get(mat); if(!L) BAG.set(mat,L=[]); gs.flat().forEach(g=>g&&L.push(g)); };
    const flush=()=>{ BAG.forEach((gs,m)=>merge(gs,m)); BAG.clear(); };
    const cyG=(x,y,z,r,h,seg,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r:r2,r,h,seg||16); g.translate(x,y+h/2,z); return g; };
    const coneG=(x,y,z,r,h,seg)=>{ const g=new T.ConeGeometry(r,h,seg||12); g.translate(x,y+h/2,z); return g; };
    const domeG=(x,y,z,r,h,seg)=>{ const g=new T.SphereGeometry(r,seg||20,8,0,Math.PI*2,0,Math.PI/2); g.scale(1,(h||r)/r,1); g.translate(x,y,z); return g; };
    const gableG=(x,y,z,w,d,h,axis)=>{ const span=axis==='x'?d:w, len=axis==='x'?w:d; const sh=new T.Shape(); sh.moveTo(-span/2,0); sh.lineTo(0,h); sh.lineTo(span/2,0); sh.lineTo(-span/2,0); const g=new T.ExtrudeGeometry(sh,{depth:len,bevelEnabled:false}); g.translate(0,0,-len/2); if(axis==='x') g.rotateY(Math.PI/2); g.translate(x,y,z); return g; };
    const hipG=(x,y,z,w,d,h)=>{ let g=new T.ConeGeometry(Math.SQRT1_2,1,4,1); g.rotateY(Math.PI/4); g=g.toNonIndexed(); g.scale(w,h,d); g.translate(x,y+h/2,z); g.computeVertexNormals(); return g; };
    const latheG=(x,y,z,prof,seg)=>{ const g=new T.LatheGeometry(prof.map(p=>new T.Vector2(Math.max(.01,p[0]),p[1])),seg||24); g.translate(x,y,z); return g; };
    const archWG=(x,y,z,w,h,t,ow,oh,ry,pointed)=>{ const g=archG(w,h,t,ow,oh,pointed); if(ry) g.rotateY(ry); g.translate(x,y,z); return g; };
    // 둥근 머리(또는 뾰족) 창 1 × 1 (+z를 봄, 두께 .12) — 인스턴스로 크기 조절
    const winGeo0=(pt)=>{ const sh=new T.Shape(), r=.5, sp=1-(pt?.85:r); sh.moveTo(-r,0); sh.lineTo(r,0); sh.lineTo(r,sp); if(pt){ sh.quadraticCurveTo(r,sp+.55,0,1); sh.quadraticCurveTo(-r,sp+.55,-r,sp); } else sh.absarc(0,sp,r,0,Math.PI,false); sh.lineTo(-r,0); return new T.ExtrudeGeometry(sh,{depth:.12,bevelEnabled:false,curveSegments:8}); };

    const LS=K.col(0xcdbd9f,{roughness:.88}), LS2=K.col(0xb9a988,{roughness:.9}), LS3=K.col(0xe1d6bf,{roughness:.85}), MR=K.col(0xe9e5dc,{roughness:.6}), RFm=K.col(0x8b8a82,{roughness:.7,metalness:.2}), DMm=K.col(0x80878a,{roughness:.55,metalness:.35}), DKm=K.col(0x3b3630,{roughness:.8}), GD=K.col(0xc9a44a,{roughness:.35,metalness:.7}), CLm=K.col(0xd8d2c6,{roughness:.6});
    // 금빛 바탕 모자이크(나무·집) 캔버스 질감
    const mosT=E.tex('umyMos',256,(g,N,rr)=>{ g.fillStyle='#b8933c'; g.fillRect(0,0,N,N); for(let i=0;i<2500;i++){ g.fillStyle=rr()<.5?'rgba(255,230,150,.25)':'rgba(120,90,30,.2)'; g.fillRect(rr()*N,rr()*N,2,2); } for(let i=0;i<7;i++){ const x=(i+.5)*N/7+(rr()-.5)*10; g.fillStyle='#5a4a2a'; g.fillRect(x-2,N*.45,4,N*.45); g.fillStyle=['#3f6b45','#4f7d4c','#2f5a46'][i%3]; g.beginPath(); g.ellipse(x,N*.38,14+rr()*8,26+rr()*10,0,0,7); g.fill(); } g.fillStyle='#d9cfb8'; for(let i=0;i<3;i++){ const x=20+i*80+rr()*20; g.fillRect(x,N*.66,26,22); g.fillStyle='#8a5a3a'; g.fillRect(x+4,N*.62,18,6); g.fillStyle='#d9cfb8'; } g.fillStyle='#5f8fa0'; g.fillRect(0,N*.9,N,N*.1); });
    const MOS=tmat(mtex(mosT,.09,.09),0xb8933c,{roughness:.45,metalness:.35});
    const loc=(g,cx,cz,ry)=>{ if(ry) g.rotateY(ry); g.translate(cx,0,cz); return g; };
    // 회랑 한 줄: 길이 L, 앞(마당 쪽)이 지역 +z, 깊이 D — 아래 큰 아치 + 위 작은 아치 2배 + 박공 지붕
    const riwaq=(cx,cz,ry,L,D,mos)=>{ const nb=Math.round(L/5.3), b=L/nb, out=[];
      for(let i=0;i<nb;i++){ const x=-L/2+(i+.5)*b; ab(LS,loc(archWG(x,0,0,b+.02,7.6,1.4,b-1.3,6.6,0,false),cx,cz,ry)); for(const k of [-1,1]) ab(mos?MOS:LS3,loc(archWG(x+k*b/4,7.6,0,b/2+.01,4.2,1.0,b/2-.8,3.2,0,false),cx,cz,ry)); }
      ab(LS2,loc(bx(0,7.5,0,L,.35,1.6),cx,cz,ry)); ab(LS2,loc(bx(0,11.8,0,L,.5,1.6),cx,cz,ry));
      ab(LS,loc(bx(0,0,-D,L,13,1.2),cx,cz,ry)); ab(RFm,loc(gableG(0,12.3,-D/2,L+.4,D+2.2,2.8,'x'),cx,cz,ry));
      const C=[]; for(let i=0;i<=nb;i++){ const x=-L/2+i*b; C.push([x,0,0]); } return C; };
    K.layer(0);
    const EW=157.5, ED=100, X0=-EW/2, Z0=-ED/2, PZ=-13, RD=9;
    // 마당 바닥(흰 대리석)
    ab(MR,bx(0,0,(PZ+ED/2-RD)/2,EW-2*RD-1,.12,ED/2-RD-PZ));
    // 회랑: 북 · 동 · 서 (마당을 봄)
    riwaq(0,ED/2-RD,Math.PI,EW-2*RD,RD,false);
    riwaq(EW/2-RD,(PZ+ED/2-RD)/2,-Math.PI/2,ED/2-RD-PZ,RD,false);
    riwaq(-EW/2+RD,(PZ+ED/2-RD)/2,Math.PI/2,ED/2-RD-PZ,RD,true);
    // 바깥 담(회랑 뒤 · 모서리)
    for(const [x,z,w,d] of [[0,ED/2-.6,EW,1.2],[X0+.6,0,1.2,ED],[-X0-.6,0,1.2,ED],[0,Z0+.6,EW,1.2]]) ab(LS2,bx(x,0,z,w,14,d));
    { const P=[]; for(let x=X0+6;x<-X0-3;x+=7.9){ P.push([x,0,ED/2+.25,0,1.6,14.6,.5],[x,0,Z0-.25,0,1.6,14.6,.5]); } for(let z=Z0+6;z<ED/2-3;z+=7.9){ P.push([X0-.25,0,z,0,.5,14.6,1.6],[-X0+.25,0,z,0,.5,14.6,1.6]); } inst(boxG(1,1,1),LS2,P,false); }
    // 기도당: 3랑(용마루 동서) + 앞 아케이드
    { const z0=Z0, z1=PZ, Dp=z1-z0, HW=16; ab(LS,bx(0,0,(z0+z1)/2,EW-2.4,HW,Dp)); for(let k=0;k<3;k++){ const zc=z0+Dp*(k+.5)/3; ab(RFm,gableG(-42,HW,zc,EW/2-12,Dp/3+.3,3.6,'x')); ab(RFm,gableG(42,HW,zc,EW/2-12,Dp/3+.3,3.6,'x')); }
      // 마당 쪽 정면: 2층 아치(위는 모자이크)
      const nb=26, b=(EW-2.4-18)/nb; for(let i=0;i<nb;i++){ const side=i<nb/2?-1:1, j=i<nb/2?i:i-nb/2; const x=side*(9+(j+.5)*b); ab(LS3,archWG(x,0,z1+.75,b+.02,8.4,1.5,b-1.3,7.2,0,false)); for(const k of [-1,1]) ab(MOS,archWG(x+k*b/4,8.4,z1+.55,b/2+.01,4.6,1.1,b/2-.8,3.4,0,false)); }
      ab(LS2,bx(0,8.3,z1+.75,EW-2.4,.35,1.7)); ab(LS2,bx(0,13,z1+.6,EW-2.4,.6,1.6));
      // 가운데 날개(남북 박공) + 정면 박공(모자이크) + 큰 아치
      const TW=18; ab(LS,bx(0,0,(z0+z1)/2,TW,22,Dp)); ab(RFm,gableG(0,22,(z0+z1)/2-1,TW+.6,Dp-2,5.2,'z'));
      ab(MOS,archWG(0,0,z1+1.2,TW,22,1.4,9,16,0,false)); { const sh=new T.Shape(); sh.moveTo(-TW/2-.3,0); sh.lineTo(0,5.6); sh.lineTo(TW/2+.3,0); sh.lineTo(-TW/2-.3,0); const g=new T.ExtrudeGeometry(sh,{depth:1.4,bevelEnabled:false}); g.translate(0,22,z1+.5); ab(MOS,g); }
      for(const s of [-1,1]) ab(LS3,bx(s*(TW/2+.4),0,z1+1.2,1.4,22.6,2)); ab(LS3,bx(0,0,z1+.5,7,13,.4)); for(const k of [-1,0,1]) ab(DKm,archWG(k*2.2,0,z1+.72,1.9,11,.1,1.4,9,0,false));
      ab(DKm,bx(0,12.5,z1+.9,8.6,2.2,.1)); for(const k of [-2,-1,0,1,2]) ab(LS3,cyG(k*1.9,13.4,z1+1.0,.12,1.6,8));
      // 독수리 돔: 팔각 북 + 창 + 돔(36 m)
      const DZ=-31, DR=8.5; ab(LS,cyG(0,22,DZ,DR+.6,6.5,8)); ab(LS2,cyG(0,28.5,DZ,DR+1,.6,8)); { const Wd=[]; for(let i=0;i<8;i++){ const a=i*Math.PI/4+Math.PI/8; Wd.push([Math.sin(a)*(DR+.55),23.6,DZ+Math.cos(a)*(DR+.55),a,1.5,3.6,1]); } inst(winGeo0(),DKm,Wd,false); }
      ab(DMm,latheG(0,29.1,DZ,[[DR,0],[DR-.4,2.2],[DR-1.6,4.4],[DR-3.4,5.9],[DR-5.6,6.7],[1.2,7],[.4,7.05]],28)); ab(GD,cyG(0,36,DZ,.15,1.8,6)); ab(GD,(()=>{ const g=new T.SphereGeometry(.35,8,6); g.translate(0,37.2,DZ); return g; })());
    }
    // 마당 정자: 보물(서) · 세정 분수(가운데) · 시계(동)
    const kiosk=(x,z,r,h0,mos)=>{ const C=[]; for(let i=0;i<8;i++){ const a=i*Math.PI/4; C.push([x+Math.cos(a)*r,0,z+Math.sin(a)*r,0,1,1,1]); } inst(new T.CylinderGeometry(.32,.38,h0,10).translate(0,h0/2,0),CLm,C); ab(mos?MOS:LS3,cyG(x,h0,z,r+.6,mos?4.2:1.4,8)); ab(LS2,cyG(x,h0+(mos?4.2:1.4),z,r+.9,.35,8)); ab(DMm,domeG(x,h0+(mos?4.55:1.75),z,r*.85,r*.75,16)); };
    kiosk(-48,16,2.8,5.2,true); kiosk(48,16,2.2,4.4,false); kiosk(0,10,2.4,2.6,false); ab(MR,cyG(0,0,10,3.4,.6,8));
    flush();
    K.layer(1);
    // 미나렛 셋
    // 신부(북벽 가운데): 사각 몸 + 발코니 + 위 작은 정자
    { const x=0, z=ED/2-2.5; ab(LS,bx(x,0,z,6,28,6)); ab(LS2,bx(x,28,z,7.6,.7,7.6)); ab(LS3,bx(x,28.7,z,4.4,5.2,4.4)); ab(LS2,bx(x,33.9,z,5.4,.5,5.4)); ab(RFm,coneG(x,34.4,z,2.4,3.6,8)); ab(GD,cyG(x,38,z,.1,1.4,6)); for(const s of [-1,1]){ ab(DKm,archWG(x,17,z+s*3.05,1.4,4,.1,1.0,3.4,0,false)); } }
    // 예수(남동): 사각 아래 + 팔각 몸 + 발코니 둘 + 연필 첨탑
    { const x=EW/2-4.5, z=Z0+4.5; ab(LS2,bx(x,0,z,8,38,8)); ab(LS,bx(x,38,z,9,.8,9)); ab(LS3,cyG(x,38.8,z,2.9,18,8)); ab(LS2,cyG(x,56.8,z,4,.7,8)); ab(LS3,cyG(x,57.5,z,2.4,6,8)); ab(LS2,cyG(x,63.5,z,3.2,.5,8)); ab(RFm,coneG(x,64,z,2.1,11.5,8)); ab(GD,cyG(x,75.5,z,.12,1.6,6)); }
    // 카이트바이(남서): 팔각 맘루크 3단
    { const x=-EW/2+4.5, z=Z0+4.5; ab(LS2,bx(x,0,z,7.6,16,7.6)); ab(LS,cyG(x,16,z,3.6,18,8)); ab(LS2,cyG(x,34,z,4.6,.8,8)); ab(LS3,cyG(x,34.8,z,2.9,11,8)); ab(LS2,cyG(x,45.8,z,3.9,.7,8)); ab(LS3,cyG(x,46.5,z,2.0,6,8)); ab(DMm,latheG(x,52.5,z,[[2.2,0],[2.3,1.2],[1.6,2.6],[.5,3.6],[.1,4]],12)); ab(GD,cyG(x,56.4,z,.1,1.5,6)); { const g=new T.CylinderGeometry(3.64,3.64,.18,8,1,true); g.translate(x,24,z); ab(GD,g); } }
    flush();
    // ===== 배경(K.life): 다마스쿠스 옛 도시(평지붕 마당집) · 하미디야 시장 지붕 · 유피테르 신전 문 기둥 · 성채 · 카시운 산 (개략·추정) =====
    W.own();
    LIFE(()=>{
      const hf=(x,z)=>{ const q=E.peaks(x,z,[[-900,2300,2600,700,520,1.4],[600,2500,1800,600,380,1.5]]); return q+(Math.hypot(x,z)>140?(E.fbm(x*.004,z*.004,2)-.5)*3:0)-.06; };
      const cf=(x,z,h,ny)=>{ const n=E.fbm(x*.02,z*.02,2); if(h>40) return [.62+.06*n,.56+.05*n,.46+.05*n]; return [.72+.05*n,.66+.05*n,.55+.04*n]; };
      E.terrain(-2600,2600,-1800,3200,120,120,hf,cf,[-84,84,-56,56]);
      W.lplane(W.solid(0xcfc4ae),0,-.03,0,168,112);
      // 담 밖 둘레 길(포장)
      // 하미디야 시장: 서문(바브 알바리드)에서 서쪽으로 뻗은 아치 철판 지붕 + 끝의 로마 신전 문 기둥
      { const z=2, x0=-86, x1=-560; const m=new T.Mesh((()=>{ const gg=new T.CylinderGeometry(7,7,x0-x1,16,1,true,0,Math.PI); gg.rotateZ(Math.PI/2); gg.translate((x0+x1)/2,10,z); return gg; })(),K.col(0x6f7478,{roughness:.6,metalness:.4,side:T.DoubleSide})); K.life.add(m); K.b((x0+x1)/2,0,z-8,x0-x1,10,2,LS3); K.b((x0+x1)/2,0,z+8,x0-x1,10,2,LS3);
        const RC=[]; for(const k of [-4.5,-1.5,1.5,4.5]) RC.push([-98,0,z+k,0,1,1,1]); inst(new T.CylinderGeometry(.6,.7,15,12).translate(0,7.5,0),LS3,RC,false); K.b(-98,15,z,1.6,1.6,11,LS2); }
      // 성채(북서)
      { const cx=-520, cz=300; K.b(cx,0,cz,180,16,14,LS2); K.b(cx,0,cz+110,180,16,14,LS2); K.b(cx-90,0,cz+55,14,16,110,LS2); K.b(cx+90,0,cz+55,14,16,110,LS2); for(const [x,z] of [[-90,0],[90,0],[-90,110],[90,110],[0,0],[0,110]]) K.b(cx+x,0,cz+z,16,22,16,LS2); }
      // 옛 도시: 평지붕 마당집(2~3층, 흰·베이지) — 모스크 둘레는 비움, 정면 시선은 기도당 안쪽이라 영향 없음
      const keep=(x,z)=>{ if(Math.abs(x)<100&&Math.abs(z)<72) return false; if(Math.abs(z-2)<14&&x<-80&&x>-570) return false; if(x<-410&&x>-630&&z>270&&z<440) return false; return true; };
      W.ring({r0:90,r1:1500,step:18,fill:.9,keep,h:(r)=>7+E.r()*5+(r>700?E.r()*10:0),pal:['#e6dcc8','#d9ccb2','#efe8da','#cdbd9f','#e0d3ba'],kind:'n',pads:false});
      { const L=[]; for(let i=0;i<40;i++){ const a=E.r()*6.28, r=110+E.r()*400; const x=Math.cos(a)*r, z=Math.sin(a)*r; if(!keep(x,z)) continue; L.push([x,11,z,6+E.r()*3,E.r()<.3?2:0,E.r(),1]); } E.forest(L); }
      W.sky(5200);
    });
    KEEP_PEOPLE();
  }});
