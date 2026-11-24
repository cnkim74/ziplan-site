__bsigFill({"topkapi":function(K){
// 출처: Madain Project 「Architecture of Topkapı Palace」「Second Courtyard of Topkapı Palace」(마당 넷과 문 셋 — 황제의 문 Bâb-ı Hümâyûn·인사의 문 Bâb-üs Selâm(팔각 쌍탑)·행복의 문 Bâb-üs Saâde, 첫째 마당의 아야 이리니(병기고), 둘째 마당 주방(돔·굴뚝 여럿)·어전회의실·정의의 탑(메흐메드 2세 무렵 → 1527~1529 술레이만 증축 → 1825 마흐무트 2세 꼭대기 재건), 하렘 400여 방, 넷째 마당 바그다드·레반 정자(무라드 4세, 17세기)·이프타르 정자, 타일 정자 1473), 브리태니커 「Topkapı Palace Museum」(1459~1465 무렵 착공·1478 무렵, 1924 박물관)
// 메모: Madain Project 둘째 마당 페이지는 '주방 왼쪽 · 회의실 오른쪽'으로 적었지만, 궁전 배치도들은 들어가면서 오른쪽(남동, 마르마라 쪽)에 주방, 왼쪽(북서) 모서리에 어전회의실·정의의 탑·하렘을 둔다 — 배치도 쪽을 따름(확인 필요)
// 모형 좌표: +x = 안쪽으로 들어가는 방향(북동, 곶 끝), +z = 남동(마르마라해), −z = 북서(금각만)
// 추정: 모든 치수와 위치 — 둘째 마당 약 130 × 115 m, 쌍탑 높이(지붕 끝 약 26 m), 정의의 탑 약 41 m(사각 몸 + 팔각 전망층 + 원뿔 납 지붕), 주방 10칸 · 돔 10 · 굴뚝 20(흔히 쓰는 수, 이번 출처에서 확인 못 함), 하렘 덩어리, 각 정자 크기, 언덕 높이(바다에서 약 40 m), 해안선, 아야 이리니·아야 소피아 위치(개략)
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

    const WH=K.col(0xefe9dc,{roughness:.85}), WH2=K.col(0xe2dac9,{roughness:.88}), STn=K.col(0xd2c7b2,{roughness:.88}), LDm=K.col(0x8e9497,{roughness:.55,metalness:.35}), EV=K.col(0x6e553f,{roughness:.8}), GD=K.col(0xc9a24a,{roughness:.35,metalness:.75}), DKm=K.col(0x3a3631,{roughness:.8}), CLm=K.col(0xd9d3c6,{roughness:.7}), BR=K.col(0xa86b4d,{roughness:.9}), GR=K.col(0x7d9a55,{roughness:1}), PV=K.col(0xcfc6b3,{roughness:.95});
    // 넓은 처마 정자: 몸(w×d×h) + 처마판 + 낮은 모임지붕(납) + 둘레 기둥
    const pav=(x,z,w,d,h,eo,rh,cols,body)=>{ ab(body||WH,bx(x,0,z,w,h,d)); ab(EV,bx(x,h,z,w+eo*2,.45,d+eo*2)); ab(LDm,hipG(x,h+.45,z,w+eo*2-.4,d+eo*2-.4,rh)); if(cols){ const C=[]; const n=Math.max(2,Math.round((w+eo*1.4)/3.2)), m=Math.max(2,Math.round((d+eo*1.4)/3.2)); for(let i=0;i<=n;i++) for(let j=0;j<=m;j++){ if(i>0&&i<n&&j>0&&j<m) continue; C.push([x-(w/2+eo*.8)+i*(w+eo*1.6)/n,0,z-(d/2+eo*.8)+j*(d+eo*1.6)/m,0,1,h/4,1]); } inst(new T.CylinderGeometry(.22,.26,4,8).translate(0,2,0),CLm,C,false); } };
    const lDome=(x,y,z,r,drum)=>{ if(drum) ab(WH2,cyG(x,y,z,r+.3,drum,8)); ab(LDm,domeG(x,y+(drum||0),z,r,r*.8,14)); ab(GD,cyG(x,y+(drum||0)+r*.8,z,.07,1,5)); };
    // 팔각 탑 + 원뿔 지붕
    const otower=(x,z,r,h,sh)=>{ ab(STn,cyG(x,0,z,r,h,8)); ab(STn,cyG(x,h,z,r+.5,.6,8)); ab(LDm,coneG(x,h+.6,z,r+.4,sh,8)); ab(GD,cyG(x,h+.6+sh,z,.08,1.6,5)); };
    K.layer(0);
    // 둘째 마당(디반 메이다느): 잔디·길·사이프러스는 배경에서, 여기는 둘레 담과 회랑
    const C2=[-80,50,-60,55];
    ab(PV,bx((C2[0]+C2[1])/2,0,(C2[2]+C2[3])/2,C2[1]-C2[0],.1,C2[3]-C2[2]));
    for(const [x,z,w,d] of [[-15,-61,130,1.4],[-15,56,130,1.4]]) ab(WH2,bx(x,0,z,w,7,d));
    // 둘레 회랑(얇은 기둥 + 처마) — 북서·남동쪽
    { const C=[]; for(let x=-74;x<=44;x+=4){ C.push([x,0,-56,0,1,1,1]); C.push([x,0,51,0,1,1,1]); } inst(new T.CylinderGeometry(.22,.26,4.6,8).translate(0,2.3,0),CLm,C,false); ab(EV,bx(-15,4.6,-58,122,.35,6.4)); ab(EV,bx(-15,4.6,53,122,.35,6.4)); ab(LDm,(()=>{ const g=new T.BoxGeometry(122,.25,6.6); g.rotateX(.18); g.translate(-15,5.4,-58.3); return g; })()); ab(LDm,(()=>{ const g=new T.BoxGeometry(122,.25,6.6); g.rotateX(-.18); g.translate(-15,5.4,53.3); return g; })()); }
    // 인사의 문(Bâb-üs Selâm): 가운데 문채 + 팔각 쌍탑 + 담
    { const X=-80; ab(STn,bx(X,0,0,10,12,12)); ab(EV,bx(X+5.5,8.5,0,3,.35,14)); ab(LDm,hipG(X,12,0,11,13,2)); ab(DKm,bx(X-5.06,0,0,.1,6,4)); for(const s of [-1,1]) otower(X,s*9.5,4,16,10); for(const s of [-1,1]) ab(WH2,bx(X,0,s*35,2,9,46)); }
    // 어전회의실(디반) + 정의의 탑(북서 모서리)
    { const X=-58, Z=-70; pav(X,Z,26,16,7,3,2.2,true); for(const k of [-1,0,1]) lDome(X+k*8,9.4,Z,3.2,1.4);
      const TX=-56, TZ=-86; ab(WH2,bx(TX,0,TZ,9,24,9)); ab(STn,bx(TX,24,TZ,10,.6,10)); ab(WH,bx(TX,24.6,TZ,7.4,6,7.4)); ab(STn,bx(TX,30.6,TZ,8.4,.5,8.4)); ab(WH,cyG(TX,31.1,TZ,3.4,4.2,8)); ab(STn,cyG(TX,35.3,TZ,4.0,.4,8)); ab(LDm,coneG(TX,35.7,TZ,3.9,4.6,8)); ab(GD,cyG(TX,40.3,TZ,.1,1.6,5));
      const Wn=[]; for(let i=0;i<4;i++){ const a=i*Math.PI/2; for(const k of [-1,1]){ Wn.push([TX+Math.sin(a)*3.75+Math.cos(a)*k*1.6,25.6,TZ+Math.cos(a)*3.75-Math.sin(a)*k*1.6,a,1.1,3.4,1]); Wn.push([TX+Math.sin(a)*4.56+Math.cos(a)*k*2.2,15,TZ+Math.cos(a)*4.56-Math.sin(a)*k*2.2,a,1.0,2.6,1]); } } for(let i=0;i<8;i++){ const a=i*Math.PI/4+Math.PI/8; Wn.push([TX+Math.sin(a)*3.3,32,TZ+Math.cos(a)*3.3,a,1.0,2.4,1]); } inst(winGeo0(),DKm,Wn,false); }
    // 주방(남동쪽 긴 줄): 10칸 · 돔 10 · 굴뚝 20
    { const z=65, x0=-72, n=10, uw=11.4; ab(WH2,bx(x0+n*uw/2,0,z,n*uw,8,18)); for(let i=0;i<n;i++){ const x=x0+(i+.5)*uw; lDome(x,8,z+1.5,4.2,1.2); } const CH=[], CC=[]; for(let i=0;i<n;i++){ const x=x0+(i+.5)*uw; for(const k of [-1,1]){ CH.push([x+k*3.6,8,z-6.2,0,1,1,1]); CC.push([x+k*3.6,19,z-6.2,0,1,1,1]); } } inst(new T.CylinderGeometry(1.0,1.7,7,8).translate(0,3.5,0),WH,CH,false); inst(new T.ConeGeometry(1.25,1.4,8).translate(0,.7,0),LDm,CC.map(c=>[c[0],15,c[2],0,1,1,1]),false); }
    // 하렘(북서 비탈): 작은 덩어리 여럿 + 돔 + 모임지붕
    { let sd=11; const rr=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; }; for(let i=0;i<34;i++){ const x=-74+rr()*112, z=-96-rr()*58, w=8+rr()*12, d=7+rr()*10, h=8+rr()*7; if(x<-48&&z>-100) continue; ab(i%3?WH:WH2,bx(x,0,z,w,h,d)); if(rr()<.55) ab(LDm,hipG(x,h,z,w+.8,d+.8,1.6+rr())); else { ab(LDm,bx(x,h,z,w+.4,.3,d+.4)); lDome(x,h+.3,z,Math.min(w,d)*.3,0); } if(rr()<.4){ const g=new T.CylinderGeometry(.5,.6,4,6); g.translate(x+w*.3,h+2,z-d*.3); ab(WH,g); } } }
    // 행복의 문(Bâb-üs Saâde): 넓은 처마 + 금빛 끝 + 기둥
    { const X=50; ab(WH,bx(X,0,0,6,8,22)); for(const s of [-1,1]) ab(WH2,bx(X,0,s*34,2,8,46)); ab(EV,bx(X-1,8,0,14,.5,28)); ab(GD,bx(X-8,7.6,0,.25,.5,28)); ab(LDm,hipG(X-1,8.5,0,13,26,2.4)); lDome(X,10.9,0,2.2,0); const C=[]; for(let k=-3;k<=3;k++) C.push([X-6.5,0,k*3.6,0,1,1,1]); inst(new T.CylinderGeometry(.3,.34,8,10).translate(0,4,0),CLm,C,false); }
    flush();
    K.layer(1);
    // 셋째 마당: 알현실(아르즈 오다스) · 아흐메드 3세 도서관 · 둘레 방들 · 정복자 정자(보물관)
    ab(GR,bx(110,0,0,118,.1,114));
    pav(72,0,16,14,6,3,2.4,true);
    { ab(WH,bx(112,0,0,14,8,8)); ab(WH,bx(112,0,0,8,8,14)); for(const [dx,dz] of [[0,0]]) lDome(112+dx,8,dz,4,1); for(const [dx,dz] of [[5,0],[-5,0],[0,5],[0,-5]]) ab(LDm,domeG(112+dx,8,dz,2.2,1.6,10)); ab(STn,bx(112,0,0,16,1.2,16)); }
    for(const [x,z,w,d,h] of [[110,-58,120,10,9],[110,58,120,12,10],[168,0,10,104,10]]){ ab(WH2,bx(x,0,z,w,h,d)); ab(LDm,hipG(x,h,z,w+1.2,d+1.2,2.2)); }
    for(let i=0;i<4;i++) lDome(120+i*12,10,58,4,0);
    // 셋째 마당 둘레 회랑 기둥(앞) + 넷째 마당 쪽 할례실·소파 모스크
    { const C=[]; for(let x=60;x<=162;x+=4.2){ C.push([x,0,-51.5,0,1,1,1]); C.push([x,0,50.5,0,1,1,1]); } inst(new T.CylinderGeometry(.22,.26,4.4,8).translate(0,2.2,0),CLm,C,false); ab(EV,bx(111,4.4,-52.5,106,.3,4)); ab(EV,bx(111,4.4,51.5,106,.3,4)); }
    pav(190,-62,18,9,6,1.6,1.6,false); { ab(WH,bx(200,0,20,12,7,10)); ab(LDm,hipG(200,7,20,13,11,1.6)); ab(WH,cyG(205.5,0,24.5,1.2,16,8)); ab(LDm,coneG(205.5,16,24.5,1.3,4,8)); }
    // 넷째 마당: 테라스 + 바그다드 정자 · 레반 정자 · 이프타르 차양 · 메지디예 정자
    ab(STn,bx(215,-3,-10,96,3,120)); ab(GR,bx(215,0,-10,92,.08,116));
    { const X=238, Z=-48; ab(WH,bx(X,0,Z,15,7,8)); ab(WH,bx(X,0,Z,8,7,15)); ab(EV,bx(X,7,Z,22,.4,22)); ab(LDm,hipG(X,7.4,Z,21,21,1.6)); lDome(X,9,Z,4.4,1.4); for(const [dx,dz] of [[5.5,0],[-5.5,0],[0,5.5],[0,-5.5]]) ab(LDm,domeG(X+dx,9,Z+dz,2.0,1.4,10)); const C=[]; for(let i=0;i<=6;i++) for(let j=0;j<=6;j++){ if(i>0&&i<6&&j>0&&j<6) continue; C.push([X-10+i*20/6,0,Z-10+j*20/6,0,1,1,1]); } inst(new T.CylinderGeometry(.22,.26,7,8).translate(0,3.5,0),CLm,C,false); }
    pav(205,-52,10,10,6,2.5,1.6,true); lDome(205,8.1,-52,3,1);
    { const X=222, Z=-30; const C=[[X-2,0,Z-2,0,1,1,1],[X+2,0,Z-2,0,1,1,1],[X-2,0,Z+2,0,1,1,1],[X+2,0,Z+2,0,1,1,1]]; inst(new T.CylinderGeometry(.12,.14,3.4,6).translate(0,1.7,0),GD,C,false); ab(GD,domeG(X,3.4,Z,3.2,1.2,14)); }
    { const X=245, Z=30; ab(WH,bx(X,0,Z,26,11,13)); ab(LDm,hipG(X,11,Z,27,14,2.4)); const Wn=[]; for(let f=0;f<2;f++) for(let i=0;i<8;i++){ Wn.push([X-11.4+i*3.25,1.6+f*5,Z+6.56,0,1.3,3,1]); Wn.push([X+13.06,1.6+f*5,Z-4.2+(i%4)*2.8,Math.PI/2,1.3,3,1]); } inst(winGeo0(),DKm,Wn,false); }
    flush();
    // ===== 배경(K.life): 곶 언덕과 세 바다 · 첫째 마당 · 아야 이리니 · 아야 소피아 · 귈하네 숲 · 바다 성벽 · 옛 도시 (개략·추정) =====
    W.own();
    LIFE(()=>{
      const land=(x,z)=>{ const xx=Math.max(x,-260); return Math.hypot((xx-40)/1.35,z*1.05); };
      const hf=(x,z)=>{ const r=land(x,z); const h=-40+40*(1-E.ss((r-235)/150)); return h+(r>240?(E.fbm(x*.02,z*.02,2)-.5)*2:0)-.06; };
      const cf=(x,z,h,ny)=>{ const n=E.fbm(x*.03,z*.03,2); if(h<-38.5) return [.72,.68,.58]; if(ny<.9) return [.34+.05*n,.44+.06*n,.26]; return [.47+.06*n,.58+.06*n,.33+.04*n]; };
      E.terrain(-1400,1500,-1300,1300,120,120,hf,cf,[-86,264,-160,80]);
      W.lplane(W.WATER,0,-39.4,0,6000,6000);
      W.lplane(W.solid(0x8ea165),90,-.04,-40,350,240);
      // 둘째 마당 잔디 + 사이프러스 길
      W.lplane(E.mat(null,0x7f9a55,6),-15,.13,0,118,100); W.lplane(W.solid(0xd6ccb7),-15,.17,0,120,5); W.lplane(W.solid(0xd6ccb7),-15,.17,-30,5,60);
      // 첫째 마당(넓은 숲 마당) + 황제의 문 + 아야 이리니
      W.lplane(E.mat(null,0x86a05c,6),-210,.02,0,250,200); W.lplane(W.solid(0xcfc6b3),-210,.06,0,250,10);
      { const X=-335; K.b(X,0,0,16,20,22,STn); K.b(X-8.1,0,0,.2,11,7,DKm); K.b(X,20,0,17,.8,23,STn); for(const s of [-1,1]) K.b(X,0,s*60,3,10,98,WH2); }
      { const X=-250, Z=55; K.b(X,0,Z,54,15,30,BR); K.roofGable(X,15,Z,54,30.4,4,LDm,'x'); K.c(X+8,15,Z,7,4,BR,16); K.dome(X+8,19,Z,7,4.5,LDm,{}); }
      // 아야 소피아(황제의 문 남서 밖)
      { const X=-470, Z=150; K.b(X,0,Z,75,25,70,K.col(0xc98d6b,{roughness:.9})); K.c(X,25,Z,17,8,K.col(0xc98d6b,{roughness:.9}),24); K.dome(X,33,Z,16.5,14,LDm,{}); for(const [dx,dz] of [[-38,-36],[38,-36],[-38,36],[38,36]]){ K.c(X+dx,0,Z+dz,2.2,52,WH,12); K.c(X+dx,52,Z+dz,2.3,9,LDm,12,{r2:.1}); } }
      // 숲(귈하네·바깥 정원 비탈) · 사이프러스
      const ok=VIEWCLEAR(.99,40,1.05,500);
      const inPal=(x,z)=>x>-90&&x<268&&z>-165&&z<85;
      const L=E.scatter(-340,520,-460,420,11,hf,(x,z,h)=>h>-37&&!inPal(x,z)&&!(x<-80&&x>-340&&Math.abs(z)<8)&&!(Math.hypot(x+250,z-55)<36)&&land(x,z)<380&&ok(x,z),(x,z,h)=>h>-6?9+E.r()*5:11+E.r()*6,(x,z,h)=>E.r()<.3?2:0); E.forest(L);
      for(let x=-70;x<=40;x+=9) for(const z of [-22,22]) TREES.push([x,.1,z,11,2,.4,.38]); flushTrees();
      // 바다 성벽(해안선 둘레, 낮게)
      { const C=[]; for(let a=-2.6;a<=2.6;a+=.035){ const r=330; const x=40+Math.cos(a)*r*1.35/1.02, z=Math.sin(a)*r/1.05; if(x<-250) continue; C.push([x,-39.5,z,-a,1,1,1]); } inst(boxG(14,9,3),WH2,C,false); }
      // 옛 도시(서쪽) · 건너편(갈라타·위스퀴다르) 언덕 도시
      const keep=(x,z)=>{ if(x>-380) return false; if(Math.hypot(x+470,z-150)<70) return false; return true; };
      W.ring({r0:300,r1:1300,step:22,fill:.8,keep,h:()=>9+E.r()*8,pal:['#e8dcc6','#d9c7aa','#efe6d6','#cbb89a','#e2d2b9'],roof:['#a35d43',2.4,2.4],hy:(x,z)=>hf(x,z),pads:false});
      W.sky(5200);
    });
    KEEP_PEOPLE();
  }});
