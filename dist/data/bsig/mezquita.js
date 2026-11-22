__bsigFill({"mezquita":function(K){
// 사실: 785 무렵 아브드 알라흐만 1세가 착공, 9~10세기 확장으로 크기가 두 배 넘게, 1236 성당으로, 16세기 신랑 삽입, 평면 약 180 × 130 m, 2단 아치(아래 말굽·위 반원), 붉은 벽돌·흰 돌 아치 돌 / 종탑 54 m(도시에서 가장 높은 건물), 옛 미나렛을 1589 지진 뒤 감싸 다시 지음(에르난 루이스 3세 설계 종루, 시계층 후안 세케로 데 마티야, 꼭대기 산 라파엘 상)
// 출처: 브리태니커 「Mosque-Cathedral of Córdoba」 · 메스키타-대성당 공식 누리집 「Torre campanario(Bell Tower)」 · 브리프(오렌지 정원 북쪽, 과달키비르강)
// 추정: 기도실 깊이 126 m·정원 깊이 54 m(합 180), 통로 19개 폭 6.74 m, 기둥 간격 3 m(그래서 기둥 약 750개 — 실제 850여 개), 아치 높이(기둥 2.9 m, 말굽 아치 꼭대기 약 5.7 m, 위 아치 꼭대기 약 8.5 m), 지붕 처마 9.6 m·용마루 11.6 m, 바깥벽 높이 11 m·부벽 간격, 대성당 크기(신랑 60 × 16 m, 높이 26 m·용마루 33 m, 교차부 등탑 44 m)와 위치, 미흐라브 작은 돔 위치, 종탑 단별 크기, 정원 회랑, 오렌지 나무 줄, 강·로마 다리 거리
// 모형 방식: 서북쪽 통로 6줄의 앞쪽 45 m는 지붕을 벗겨 안의 아치 숲이 보이게 함(단면 모형처럼 — 실제 건물은 지붕이 덮여 있음)
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

    const STN=K.col(0xc9a066,{roughness:.9}), STN2=K.col(0xb58d58,{roughness:.92}), CRM=K.col(0xe3d5b4,{roughness:.85}), TILE=K.col(0xae6a48,{roughness:.85}), TILE2=K.col(0x9b5d40,{roughness:.88});
    const CAT=K.col(0xdccaa2,{roughness:.85}), CATR=K.col(0x8c8a86,{roughness:.6,metalness:.2}), DK=K.col(0x3a3631,{roughness:.8}), PAVE=K.col(0xc7b48f,{roughness:.95});
    const X0=-64, X1=64, ZS=-126, ZN=0, ZP=54; const NA=19, AW=(X1-X0)/NA, BAY=3.0;
    const AL=[]; for(let i=1;i<NA;i++) AL.push(X0+i*AW);
    // 대성당 자리(기둥·지붕 없음)
    const CN=[-22,38,-70,-54], CT=[5,19,-82,-42];
    const inCat=(x,z,m)=>{ m=m||0; return (x>CN[0]-m&&x<CN[1]+m&&z>CN[2]-m&&z<CN[3]+m)||(x>CT[0]-m&&x<CT[1]+m&&z>CT[2]-m&&z<CT[3]+m); };
    const CUT=[X0,X0+6*AW,-45,0]; // 지붕 벗긴 곳
    const inCut=(x,z)=>x>CUT[0]&&x<CUT[1]&&z>CUT[2]&&z<CUT[3];
    K.layer(0);
    // ---- 바닥 ----
    put(new T.Mesh((()=>{ const g=new T.PlaneGeometry(X1-X0,ZN-ZS); g.rotateX(-Math.PI/2); g.translate(0,.02,(ZS+ZN)/2); return g; })(),K.col(0xb9a98b,{roughness:.95})),false);
    // ---- 기둥 숲: 기둥·주두·임포스트·위 기둥(피어) ----
    const COLS=[]; for(const x of AL) for(let z=ZS+BAY;z<ZN-.1;z+=BAY){ if(inCat(x,z,1)) continue; COLS.push([x,z]); }
    { const sh=new T.CylinderGeometry(.2,.23,2.9,8); sh.translate(0,1.45,0); const ms=new T.MeshStandardMaterial({color:0xffffff,roughness:.35,metalness:.05}); const m=new T.InstancedMesh(sh,ms,COLS.length); const M4=new T.Matrix4(), c=new T.Color(); const PAL=['#5e5a57','#6b4f48','#8a7f73','#4f5356','#7a6a5c','#9a8c7a','#58463f'];
      COLS.forEach((p,i)=>{ M4.makeTranslation(p[0],0,p[1]); m.setMatrixAt(i,M4); c.set(PAL[Math.floor(E.r()*PAL.length)]).convertSRGBToLinear(); m.setColorAt(i,c); }); m.instanceMatrix.needsUpdate=true; m.instanceColor.needsUpdate=true; put(m);
      const mk=(geo,mat)=>{ const im=new T.InstancedMesh(geo,mat,COLS.length); COLS.forEach((p,i)=>{ M4.makeTranslation(p[0],0,p[1]); im.setMatrixAt(i,M4); }); im.instanceMatrix.needsUpdate=true; put(im); };
      mk(bx(0,2.9,0,.5,.45,.5),K.col(0xcbb48a,{roughness:.6})); mk(bx(0,3.35,0,.58,.45,.62),CRM); mk(bx(0,3.8,0,.52,3.0,.72),CRM); }
    // ---- 2단 아치 돌(붉은 벽돌 / 흰 돌 번갈아) — 인스턴스 하나 ----
    { const ITEMS=[]; const arch=(x,zc,yc,r,a0,a1,n)=>{ const da=(a1-a0)/n; const ch=2*r*Math.sin(da/2)*.94; for(let k=0;k<n;k++){ const a=a0+da*(k+.5); ITEMS.push([x,yc+Math.sin(a)*r,zc+Math.cos(a)*r,a,ch,k%2]); } };
      for(const x of AL) for(let z=ZS;z<ZN-.1;z+=BAY){ const za=z, zb=z+BAY, zc=(za+zb)/2; if(inCat(x,zc,1.6)) continue; if(za<=ZS+.01) continue; // 남쪽 벽에 붙은 칸 생략
        arch(x,zc,4.25,1.22,-.42,Math.PI+.42,13); arch(x,zc,6.85,1.4,0,Math.PI,9); }
      const g=new T.BoxGeometry(.6,.6,1); const m=new T.InstancedMesh(g,new T.MeshStandardMaterial({color:0xffffff,roughness:.85}),ITEMS.length); const M4=new T.Matrix4(), Q=new T.Quaternion(), Eu=new T.Euler(), S=new T.Vector3(), V=new T.Vector3(), c=new T.Color(); const CR=new T.Color(0xa9452f).convertSRGBToLinear(), CW=new T.Color(0xeadcbc).convertSRGBToLinear();
      ITEMS.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); Eu.set(-(it[3]-Math.PI/2)+Math.PI/2,0,0); Q.setFromEuler(Eu); S.set(1,1,it[4]); M4.compose(V,Q,S); m.setMatrixAt(i,M4); m.setColorAt(i,it[5]?CR:CW); });
      m.instanceMatrix.needsUpdate=true; m.instanceColor.needsUpdate=true; put(m); }
    // 아케이드 위 벽(지붕을 받치는 띠) + 정원 쪽 끝 보
    { const B=[]; for(const x of AL){ let z0=ZS; for(let z=ZS;z<=ZN;z+=BAY){ const blk=inCat(x,z+BAY/2,1.6)||z>=ZN-.01; if(blk){ if(z>z0) B.push(bx(x,8.3,(z0+z)/2,.6,1.3,z-z0)); z0=z+BAY; } } }
      B.push(bx(0,8.3,ZN-.3,X1-X0,1.3,.6)); merge(B,CRM); }
    // ---- 나란한 박공지붕 19줄(남북) ----
    { const RG=[], RG2=[]; for(let i=0;i<NA;i++){ const xc=X0+(i+.5)*AW; const segs=[]; let z0=ZS; const step=1.5; for(let z=ZS;z<=ZN+.01;z+=step){ const zz=Math.min(z,ZN); const bad=zz<ZN&&(inCat(xc,zz+step/2,0)||inCut(xc,zz+step/2)); if(bad||zz>=ZN){ if(zz>z0+.1) segs.push([z0,zz]); z0=zz+step; } }
        for(const [a,b] of segs){ const sh=new T.Shape(); sh.moveTo(-AW/2-.05,0); sh.lineTo(0,2.0); sh.lineTo(AW/2+.05,0); const g=new T.ExtrudeGeometry(sh,{depth:b-a,bevelEnabled:false}); g.translate(xc,9.6,a); (i%2?RG2:RG).push(g); } }
      merge(RG,TILE); merge(RG2,TILE2); }
    // 지붕 벗긴 곳의 낮은 덮개선(보 위 판 끝) — 단면처럼
    { const B=[]; B.push(bx((CUT[0]+CUT[1])/2,9.35,CUT[2]-.35,CUT[1]-CUT[0],.25,.3)); merge(B,DK); }
    // 미흐라브 위 작은 돔(알 하캄 2세 마크수라)
    { const mx=X0+5.5*AW; for(const dx of [-AW,0,AW]){ K.b(mx+dx,9.6,-121,5.2,2.2,5.2,STN); K.dome(mx+dx,11.8,-121,2.4,2.6,STN2); } }
    // ---- 바깥벽 + 부벽 + 톱니 성가퀴 ----
    K.layer(1);
    { const B=[], BT=[], MR=[]; const H=11, t=1.4;
      const wall=(x0,z0,x1,z1,h)=>{ const L=Math.hypot(x1-x0,z1-z0), cx=(x0+x1)/2, cz=(z0+z1)/2, ax=Math.abs(x1-x0)>Math.abs(z1-z0); B.push(bx(cx,0,cz,ax?L+t:t,h,ax?t:L+t)); const n=Math.floor(L/1.6); for(let i=0;i<n;i++){ const s=-L/2+(i+.5)*L/n; MR.push(ax?[cx+s,h,cz]:[cx,h,cz+s]); } };
      wall(X0,ZS,X1,ZS,H); wall(X0,ZS,X0,ZP,H); wall(X1,ZS,X1,ZP,H); wall(X0,ZP,X1,ZP,H);
      for(let z=ZS+4;z<ZP-2;z+=8.4){ for(const s of [-1,1]) BT.push(bx(s*(X1+1.1),0,z,2,H+.9,2.4)); }
      for(let x=X0+4;x<X1-2;x+=8.5){ BT.push(bx(x,0,ZS-1.1,2.4,H+.9,2)); BT.push(bx(x,0,ZP+1.1,2.4,H+.9,2)); }
      merge(B,STN); merge(BT,STN2);
      const mg=(()=>{ const a=bx(0,0,0,.9,.55,.6), b=bx(0,.55,0,.6,.35,.6), c=bx(0,.9,0,.3,.3,.6); return merge([a,b,c].map(g=>g),null,false); })(); if(mg){ mg.parent&&mg.parent.remove(mg); const geo=mg.geometry; const m=new T.InstancedMesh(geo,STN,MR.length); const M4=new T.Matrix4(); MR.forEach((p,i)=>{ M4.makeTranslation(p[0],p[1],p[2]); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; put(m); }
      // 문(바깥벽의 장식 문틀 — 어두운 홈 + 흰 아치 띠)
      const D=[], DW=[]; for(let z=-110;z<-10;z+=24) for(const s of [-1,1]){ D.push(bx(s*(X1+.72),0,z,.1,5.2,3)); DW.push(bx(s*(X1+.74),5.2,z,.1,1.4,4.2)); } merge(D,DK); merge(DW,CRM); }
    // ---- 오렌지 정원 회랑(동·서·북) ----
    { const G=[]; const aw=4.6, ah=7, ow=3.2, oh=5.2;
      const row=(x0,z0,x1,z1,ry)=>{ const L=Math.hypot(x1-x0,z1-z0), n=Math.round(L/aw); for(let i=0;i<n;i++){ const t=(i+.5)/n; const g=archG(L/n,ah,.7,ow,oh,false); g.rotateY(ry); g.translate(x0+(x1-x0)*t,0,z0+(z1-z0)*t); G.push(g); } };
      row(X0+7,4,X0+7,ZP-7,Math.PI/2); row(X1-7,4,X1-7,ZP-7,Math.PI/2); row(X0+7,ZP-7,X1-7,ZP-7,0);
      merge(G,CRM); const R=[]; R.push(bx(X0+3.5,ah,ZP/2+.5,7.2,.5,ZP-5), bx(X1-3.5,ah,ZP/2+.5,7.2,.5,ZP-5), bx(0,ah,ZP-3.5,X1-X0,.5,7.2)); merge(R,TILE2); }
    // 정원 바닥(자갈·돌 줄) + 물길
    { const p=new T.PlaneGeometry(X1-X0-14,ZP-8); p.rotateX(-Math.PI/2); p.translate(0,.03,(ZP-8)/2+.5); put(new T.Mesh(p,PAVE),false);
      const C=[]; for(const x of AL) C.push(bx(x,.03,ZP/2-3,.35,.04,ZP-12)); merge(C,K.col(0x8f7a5c,{roughness:.95}),false);
      for(const [x,z] of [[-30,30],[ -2,20],[26,32]]){ K.c(x,0,z,1.8,.6,STN,16); } }
    // ---- 종탑(옛 미나렛, 54 m) ----
    K.layer(2);
    { const tx=-10, tz=ZP; K.b(tx,0,tz,8.6,21,8.6,STN); K.b(tx,21,tz,9.2,.8,9.2,CRM);
      K.b(tx,21.8,tz,7.6,10.2,7.6,STN2); K.b(tx,32,tz,8.2,.7,8.2,CRM); K.b(tx,32.7,tz,6.6,10.3,6.6,STN); K.b(tx,43,tz,7.2,.6,7.2,CRM);
      K.b(tx,43.6,tz,5.4,4.8,5.4,STN2); K.dome(tx,48.4,tz,2.8,3.6,STN2); K.c(tx,52,tz,.25,2,K.col(0xc9a84a,{metalness:.6,roughness:.4}),8);
      const O=[]; for(const [y,h,w,n] of [[24.5,5.5,1.4,2],[35,6,1.6,2],[45,2.8,1.1,1],[8,3,1,1],[14,3,1,1]]) for(let f=0;f<4;f++){ const ry=f*Math.PI/2; const half=y>30?(y>40?2.75:3.35):(y>20?3.85:4.35); for(let k=0;k<n;k++){ const off=n>1?(k-.5)*2.4:0; const g=bx(off,y,half,w,h,.1); g.rotateY(ry); g.translate(tx,0,tz); O.push(g); } } merge(O,DK);
      // 시계
      K.c(tx,46,tz+2.75,1.1,.12,K.col(0xf2efe6),20,{axis:'z'}); }
    // ---- 대성당(16세기~) ----
    K.layer(3);
    { const cx=(CN[0]+CN[1])/2, cz=(CN[2]+CN[3])/2, tx=(CT[0]+CT[1])/2; const NH=26;
      K.b(cx,0,cz,CN[1]-CN[0],NH,CN[3]-CN[2],CAT); K.roofGable(cx,NH,cz,CN[1]-CN[0],CN[3]-CN[2],7,CATR,'x');
      K.b(tx,0,(CT[2]+CT[3])/2,CT[1]-CT[0],NH,CT[3]-CT[2],CAT); K.roofGable(tx,NH,(CT[2]+CT[3])/2,CT[1]-CT[0],CT[3]-CT[2],7,CATR,'z');
      // 교차부 등탑(타원 돔 근사)
      K.c(tx,NH,cz,7.6,6,CAT,24); K.dome(tx,NH+6,cz,7.6,7,CATR); K.c(tx,NH+12.6,cz,1.4,3.2,CAT,12); K.dome(tx,NH+15.8,cz,1.5,1.6,CATR);
      // 동쪽 끝 주제단부(약간 높은 덩어리) · 부벽 · 고딕 창
      K.b(CN[1]+3,0,cz,6,NH-2,13,CAT);
      const BT=[], W=[]; for(let x=CN[0]+5;x<CN[1];x+=9){ if(x>CT[0]-2&&x<CT[1]+2) continue; for(const s of [-1,1]){ BT.push(bx(x,0,cz+s*(8+1),1.6,NH+1.5,2)); W.push(bx(x+4.5,12,cz+s*8.05,2.2,10,.1)); } }
      for(let z=CT[2]+5;z<CT[3];z+=8){ if(z>CN[2]-2&&z<CN[3]+2) continue; for(const s of [-1,1]){ W.push(bx(tx+s*7.05,12,z,.1,10,2.2)); } }
      for(const s of [-1,1]) W.push(bx(tx,14,cz+s*20.05,6,9,.1));
      merge(BT,K.col(0xcfbc94,{roughness:.88})); merge(W,DK);
      const PN=[]; for(const [x,z] of [[CN[0],CN[2]],[CN[0],CN[3]],[CT[0],CT[2]],[CT[1],CT[2]],[CT[0],CT[3]],[CT[1],CT[3]]]){ const g=new T.ConeGeometry(.7,3.4,4); g.translate(x,NH+1.7,z); PN.push(g); } merge(PN,CAT); }
    // ===== 코르도바 옛 시가 · 과달키비르강 · 로마 다리 =====
    LIFE(()=>{
      E.terrain(-1600,1600,-1600,1600,40,40,(x,z)=>z<-205?-4:0,(x,z,h)=>h<-1?[.5,.48,.4]:[.66,.6,.5]);
      W.lplane(W.solid(0xbfb39b),0,.03,-36,X1-X0+30,ZP-ZS+30);
      { const m=new T.Mesh(new T.PlaneGeometry(4000,1400),W.WATER); m.rotation.x=-Math.PI/2; m.position.set(0,-2.2,-205-700); K.life.add(m); }
      // 강변 둑길 + 강가 갈대 숲
      W.lplane(W.solid(0xa99d86),0,.05,-185,2400,26);
      { const TR=E.scatter(-1200,1200,-300,-215,9,()=>-2.1,(x,z)=>E.r()<.5&&!(Math.abs(x+70)<12),()=>5+E.r()*4,0); E.forest(TR,{cast:false}); }
      // 로마 다리(남서쪽, 16칸 아치) + 칼라오라 탑
      { const G=[]; const bx0=-70; for(let i=0;i<16;i++){ const z=-200-i*15.5; const g=archG(15.5,9,9,9.5,7,false); g.rotateY(Math.PI/2); g.translate(bx0,-4,z-7.75); G.push(g); } merge(G,STN2); K.b(bx0,5,-200-124,9,.6,248,K.col(0xb7a988)); K.b(bx0,0,-460,14,16,14,STN); }
      // 흰 벽·기와 지붕 집들(메스키타 둘레 좁은 골목)
      const L=[]; const cols=['#f1eee6','#ece7dc','#f4f1ea','#e9dfcd','#f0e6c8'], rf=['#b46a48','#a55f40','#c07956'];
      for(let x=-640;x<=640;x+=17) for(let z=-170;z<=640;z+=17){ if(x>X0-22&&x<X1+22&&z>ZS-20&&z<ZP+22) continue; if(Math.abs(x+70)<14&&z<-150) continue; if(E.r()<.12) continue; L.push([x+(E.r()-.5)*3,z+(E.r()-.5)*3,12+E.r()*4,12+E.r()*4,6+E.r()*4,cols[Math.floor(E.r()*5)],0,'p',rf[Math.floor(E.r()*3)],2.2,1.1,0]); }
      W.city(L);
      { const TR=[]; for(let i=0;i<120;i++){ const x=-900+E.r()*1800, z=-160+E.r()*900; if(x>X0-24&&x<X1+24&&z>ZS-24&&z<ZP+24) continue; TR.push([x,0,z,6+E.r()*4,E.r()<.3?2:0,E.r(),E.r()<.3?.4:1]); } E.forest(TR,{cast:false}); }
      W.sky(3400);
    });
    // 오렌지 정원 나무(정원 안 — 건물 층)
    { const TR=[]; for(let i=0;i<NA;i++){ const x=X0+(i+.5)*AW; if(x<X0+8||x>X1-8) continue; for(let z=6;z<ZP-9;z+=5.2){ if(E.r()<.12) continue; TR.push([x,0,z,4.2+E.r()*.8,0,.05+E.r()*.2,1.1]); } }
      for(const [x,z] of [[-50,12],[48,14],[-20,40],[30,42],[0,8]]) TR.push([x,0,z,13,2,.6,.32]);
      E.forest(TR,{cast:true,grp:K.layer(4)});
      const OR=[]; for(const t of TR){ if(t[4]!==0) continue; for(let k=0;k<5;k++){ const a=E.r()*6.28; OR.push([t[0]+Math.cos(a)*1.5,2.6+E.r()*1.6,t[2]+Math.sin(a)*1.5]); } }
      const g=new T.IcosahedronGeometry(.18,0); const m=new T.InstancedMesh(g,K.col(0xe8891c,{roughness:.6}),OR.length); const M4=new T.Matrix4(); OR.forEach((p,i)=>{ M4.makeTranslation(p[0],p[1],p[2]); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; put(m,false); }
    W.own(); KEEP_PEOPLE();
  }});
