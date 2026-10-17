__bsigFill({"brasilia":function(K){
// 사실: 오스카 니마이어 설계 · 1958-09 착공 · 1960 골조 완성 · 1970-05-31 봉헌 · 콘크리트 기둥 16개(각 90 t) 쌍곡면 · 유리 약 2,000 ㎡(마리안 페레티 스테인드글라스, 1990) · 반사 연못 폭 12 m·깊이 40 cm · 종탑 20 m·종 4개 · 세 천사상(체스키아티, 1970) · 4복음사가 청동상 2.5 m(1968) · 지하 통로로 입장 · 최대 4,000명
// 출처: Wikipedia 'Cathedral of Brasília'(16 columns 90 t, 70 m, pool 12 m × 40 cm, bell tower 20 m, angels, evangelists)
// 추정: 기둥 바닥 원 지름 60 m(지붕 지름 70 m 자료와 차이 — 기둥 끝 벌어짐 포함 여부), 높이 40 m, 허리 높이 29 m·반지름 5.6 m, 기둥 두께 1.2 m·폭 0.9~3 m, 통로 경사·길이, 세례당 크기, 주변 건물(국립박물관·청사·의사당) 위치는 개략
    const T=K.T;
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    // 인스턴스: geo(밑면 y=0 기준) 를 items=[[x,y,z,ry,sx,sy,sz]] 자리에 복제 — 기둥·판문·공포처럼 같은 부재 반복
    const inst=(geo,mat,items,cast)=>{ const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),E=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); E.set(0,it[3]||0,0); Q.setFromEuler(E); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; return put(m,cast); };
    const bx=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const merge=(geos,mat,cast)=>{ if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); return put(new T.Mesh(g,mat),cast); };
    const cylG=(r,h,seg,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r*.9:r2,r,h,seg||10); g.translate(0,h/2,0); return g; };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };

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
    const LIFE=f=>{ const pc=K.cur; K.cur=K.life; f(); K.cur=pc; };
    const WATER=new T.MeshStandardMaterial({color:0x4f7d8c,roughness:.05,metalness:.02,transparent:true,opacity:.86}); WATER.color.convertSRGBToLinear();
    const WHT=K.col(0xf4f3ef,{roughness:.6,emissive:0x2a2a28,emissiveIntensity:.25}), CON=K.col(0xd9d6cf,{roughness:.9}), PAV=K.col(0xcfcbc2,{roughness:.95}), JNT=K.col(0x9d988e,{roughness:.95}), DRK=K.col(0x16181a,{roughness:1}), BRZ=K.col(0x4b3a2a,{roughness:.45,metalness:.6}), POOLB=K.col(0x1f3c45,{roughness:.8}), MAR=K.col(0xe8e4dc,{roughness:.35});
    // 스테인드글라스(페레티): 파랑·하늘·흰·초록 물결 — 바깥에선 짙은 청록 반사
    const vtex=E.tex('brasVit',256,(g,N,rr)=>{ g.fillStyle='#3a6d98'; g.fillRect(0,0,N,N); const cs=['#4c86b8','#a9c9e0','#dfe9ee','#5f9a86','#2f5f8c','#86b6d6']; g.globalAlpha=.55; for(let i=0;i<34;i++){ g.fillStyle=cs[Math.floor(rr()*cs.length)]; g.beginPath(); const x=rr()*N, y=rr()*N, w=20+rr()*70; g.ellipse(x,y,w,w*(.18+rr()*.3),rr()*3.14,0,7); g.fill(); } g.globalAlpha=1; g.strokeStyle='rgba(20,30,40,.55)'; g.lineWidth=2; for(let i=0;i<=8;i++){ g.beginPath(); g.moveTo(0,i*N/8); g.lineTo(N,i*N/8); g.stroke(); } });
    const GL=new T.MeshStandardMaterial({color:0xffffff,map:vtex,roughness:.12,metalness:.35,transparent:true,opacity:.5,depthWrite:false,side:T.DoubleSide});
    const GLo=K.col(0x7e9cab,{roughness:.04,metalness:.6,transparent:true,opacity:.36,depthWrite:false});
    // 쌍곡선: 기둥 중심선 반지름 rc(y) — 바닥 r=30, 허리 y=29에서 r=5.6, 끝 y=40에서 r≈12.5
    const YW=29, A=5.6, C=5.51, HT=40, RB=30;
    const rc=y=>A*Math.sqrt(1+Math.pow((y-YW)/C,2));
    const wdt=y=>{ let w=.9+3.0*Math.pow(Math.sin(Math.PI*Math.min(y,YW+2)/(2*(YW+2))),1.1); if(y>YW) w*=Math.max(.12,1-(y-YW)/(HT-YW)*.88); return w; };

    // ================= 배경(K.life): 광장 둘레 땅 · 에스플라나다 잔디 축 · 청사 줄 · 국립박물관 · 의사당 · 세하두 지평 =================
    LIFE(()=>{
      const hf=(x,z)=>{ const r=Math.hypot(x,z); if(r<62) return -4; if(r<64) return -4+4*(r-62)/2-.02; return -.02+E.peaks(x,z,[[-2600,-1800,1400,900,60,1.6],[2600,1900,1600,1000,45,1.6]]); };
      const inAx=(x,z)=>z<-96&&z>-260&&x>-140; // 에스플라나다 잔디 축(개략)
      E.terrain(-420,420,-420,420,120,120,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.05,z*.05,2); if(Math.abs(z+90)<9||Math.abs(z+266)<9) return [.32,.32,.33]; if(inAx(x,z)) return [.5+.05*n,.58+.05*n,.3+.03*n]; if(Math.hypot(x,z)<120) return [.78+.02*n,.77+.02*n,.73]; return [.62+.06*n,.58+.05*n,.38+.04*n]; });
      E.terrain(-3200,3200,-3200,3200,90,90,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.008,z*.008,2); if(Math.abs(z+90)<12||Math.abs(z+266)<12) return [.34,.34,.35]; if(z<-96&&z>-260&&x>-140&&x<1500) return [.5+.05*n,.58+.05*n,.3]; return [.56+.08*n,.53+.06*n,.36+.04*n]; },[-420,420,-420,420]);
      // 대로(에익수 모누멘탈) 차선 띠
      for(const z of [-90,-266]) K.b(700,.01,z,2400,.03,16,K.col(0x55585c,{roughness:.95}));
      // 청사 블록(유리 슬래브가 축 양쪽으로 줄지어 섬) — 남쪽 줄·북쪽 줄
      const BL=[]; for(let i=0;i<9;i++){ const x=330+i*95; BL.push([x,-40,17,100,40,'#7f9b93']); BL.push([x,-318,17,100,40,'#7f9b93']); BL.push([x+30,-40,10,60,8,'#c9c5bb']); }
      // 의사당(먼 끝): 쌍둥이 탑 + 낮은 기단
      BL.push([1640,-178,180,90,10,'#e7e4dc'],[1700,-186,12,28,100,'#cfd2cf'],[1700,-166,12,28,100,'#cfd2cf']);
      // 도시 외곽(낮고 성글게)
      for(let x=-2600;x<2600;x+=70) for(let z=-2600;z<2600;z+=70){ const xx=x+(E.r()-.5)*30, zz=z+(E.r()-.5)*30; const r=Math.hypot(xx,zz); if(r<900||E.r()<.72) continue; if(zz<-60&&zz>-340&&xx>-300) continue; BL.push([xx,zz,20+E.r()*30,20+E.r()*30,5+E.r()*(r<1500?18:10),E.r()<.5?'#c8c2b6':'#a9aaa8']); }
      E.blocks(BL);
      { // 의사당 두 그릇(위로·아래로)
        const wm=K.col(0xeeece6,{roughness:.6}); const up=new T.SphereGeometry(18,24,10,0,Math.PI*2,Math.PI/2,Math.PI/2); up.scale(1.4,.55,1.4); const m1=new T.Mesh(up,wm); m1.position.set(1590,26,-178); K.life.add(m1); const dn=new T.SphereGeometry(12,24,10,0,Math.PI*2,0,Math.PI/2); dn.scale(1.3,.7,1.3); const m2=new T.Mesh(dn,wm); m2.position.set(1690,10,-178); K.life.add(m2); }
      { // 국립박물관(흰 반구, 2006) — 성당 서쪽
        const g=new T.SphereGeometry(40,40,14,0,Math.PI*2,0,Math.PI/2); g.scale(1,.62,1); const m=new T.Mesh(g,K.col(0xf2f1ec,{roughness:.55})); m.position.set(-230,0,-20); K.life.add(m); K.b(-230,0,-80,70,1.2,40,PAV); }
      // 광장 가장자리 야자·잔디 나무(세하두 관목) — 드문드문
      E.forest(E.scatter(-400,400,-400,400,16,(x,z)=>hf(x,z),(x,z,h)=>{ const r=Math.hypot(x,z); return r>115&&!(z<-60&&z>-300&&x>-150)&&Math.abs(z+90)>14&&E.r()<.35; },(x,z,h)=>6+E.r()*5,(x,z,h)=>0),{trunks:true});
      E.forest(E.scatter(-3000,3000,-3000,3000,60,(x,z)=>hf(x,z),(x,z,h)=>Math.hypot(x,z)>700&&E.r()<.5,(x,z,h)=>8+E.r()*6,(x,z,h)=>E.r()<.3?1:0),{trunks:false});
    });

    // ================= 0: 광장 바닥(연못·통로 자리 뚫림) · 반사 연못 · 지하 통로 =================
    K.layer(0);
    { const sh=new T.Shape(); sh.absarc(0,0,64,0,Math.PI*2,false); const ho=new T.Path(); const hw=3.2, R=43, a0=Math.asin(hw/R); const pts=[]; for(let i=0;i<=72;i++){ const a=Math.PI/2+a0+(Math.PI*2-2*a0)*i/72; pts.push([Math.cos(a)*R,Math.sin(a)*R]); } pts.push([-hw,58],[hw,58]); pts.forEach(([x,z],i)=>i?ho.lineTo(x,-z):ho.moveTo(x,-z)); sh.holes.push(ho);
      const g=new T.ExtrudeGeometry(sh,{depth:.3,bevelEnabled:false,curveSegments:64}); g.rotateX(-Math.PI/2); const m=new T.Mesh(g,PAV); m.position.y=-.3; put(m,false); }
    // 포장 줄눈(방사·동심) — 얇은 띠 병합
    { const gs=[]; for(let i=0;i<48;i++){ const a=i/48*Math.PI*2; if(Math.abs(Math.cos(a))<.09&&Math.sin(a)>0) continue; const L=20, rm=53.5; gs.push(bx(Math.cos(a)*rm,0,Math.sin(a)*rm,.08,.012,L,Math.PI/2-a)); } for(const r of [48,54,60]){ const rg=new T.RingGeometry(r-.05,r+.05,96,1); rg.rotateX(-Math.PI/2); rg.translate(0,.012,0); gs.push(rg); } merge(gs,JNT,false); }
    // 연못: 바닥·안팎 테·수면
    { const rb=new T.RingGeometry(30.4,43,96,1); rb.rotateX(-Math.PI/2); const mb=new T.Mesh(rb,POOLB); mb.position.y=-.62; put(mb,false); const rw=new T.RingGeometry(30.4,43,96,1); rw.rotateX(-Math.PI/2); const mw=new T.Mesh(rw,WATER); mw.position.y=-.2; put(mw,false);
      const o=new T.CylinderGeometry(43,43,.66,96,1,true); const mo=new T.Mesh(o,CON); mo.material=CON.clone(); mo.material.side=T.DoubleSide; mo.position.y=-.32; put(mo,false); }
    // 신랑 바닥(대리석) — 기둥 발이 서는 링 기단까지 한 덩어리
    K.c(0,-4,0,30.6,4.06,MAR,96); K.c(0,-.1,0,31.2,.22,CON,96,{r2:30.9});
    // 지하 통로: 내려가는 경사로 + 양옆 옹벽·난간 + 연못 아래 어두운 입구
    { K.surf((u,v)=>{ const x=-3.2+6.4*u, z=58-15*v; return [x,-3.3*v+.0,z]; },1,8,CON); for(const s of [-1,1]){ K.b(s*3.3,-3.5,50.5,.2,3.8,15,CON); K.b(s*3.3,.25,50.5,.24,.9,15,K.col(0xb8b4ab,{roughness:.6})); }
      K.b(0,-3.4,37,6.4,2.9,12,DRK); K.b(0,-.6,43.3,7,.5,1,CON); }
    // 입구 앞 4복음사가 청동상(2.5 m) — 통로 양옆 받침 위
    { const fig=[]; for(const [x,z] of [[-5.4,60],[-5.4,64.5],[5.4,60],[5.4,64.5]]){ K.b(x,0,z,1.4,.5,1.4,CON); K.c(x,.5,z,.42,1.7,BRZ,10,{r2:.3}); K.c(x,2.2,z,.26,.4,BRZ,8,{half:1}); } }

    // ================= 1: 흰 기둥 16개(쌍곡면 왕관) =================
    K.layer(1);
    { const sh=new T.Shape(); const N=40; const P=[]; for(let i=0;i<=N;i++){ const y=HT*i/N; P.push([rc(y)+wdt(y)/2,y]); } for(let i=N;i>=0;i--){ const y=HT*i/N; P.push([rc(y)-wdt(y)/2,y]); } P.forEach(([x,y],i)=>i?sh.lineTo(x,y):sh.moveTo(x,y));
      const g=new T.ExtrudeGeometry(sh,{depth:1.4,bevelEnabled:false,curveSegments:4}); g.translate(0,0,-.7); g.computeVertexNormals();
      inst(g,WHT,Array.from({length:16},(_,i)=>{ const a=i/16*Math.PI*2+Math.PI/16; return [0,0,0,-a,1,1,1]; })); }
    // 허리 압축 링 + 유리 천창 원판
    { const tg=new T.TorusGeometry(A+.2,.45,8,48); tg.rotateX(Math.PI/2); const m=new T.Mesh(tg,WHT); m.position.y=YW; put(m); K.c(0,YW-.1,0,A-.1,.12,GLo,32); }

    // ================= 2: 스테인드글라스 쌍곡면 · 매달린 세 천사 =================
    K.layer(2);
    K.surf((u,v)=>{ const a=u*Math.PI*2, y=.05+v*(YW-.05), r=rc(y)-.05; return [Math.cos(a)*r,y,Math.sin(a)*r,u*16,v*4]; },96,18,GL);
    K.surf((u,v)=>{ const a=u*Math.PI*2, y=.05+v*(YW-.05), r=rc(y)+.08; return [Math.cos(a)*r,y,Math.sin(a)*r]; },96,18,GLo);
    { for(const [x,y,z,s] of [[-3,15,2,2.2],[2.5,19,-1.5,3.4],[0,23.5,2.5,4.25]]){ K.c(x,y+s,z,.02,30-y-s,K.col(0x777777),3); const b=new T.SphereGeometry(1,10,8); b.scale(.35*s/2,s/2,.18*s/2); const m=new T.Mesh(b,K.col(0xece9e2,{roughness:.6})); m.position.set(x,y+s/2,z); m.rotation.z=.5; put(m); const wg=new T.SphereGeometry(1,8,6); wg.scale(s*.45,s*.08,s*.2); const w=new T.Mesh(wg,K.col(0xece9e2,{roughness:.6})); w.position.set(x,y+s*.7,z); put(w); } }
    // 성당 안 제단·의자 줄(유리 너머 크기감)
    { const gs=[]; for(let r=8;r<24;r+=1.6) for(let k=-4;k<=4;k++){ const a=Math.PI/2+k*.12; gs.push(bx(Math.cos(a)*r,0,Math.sin(a)*r,2.6,.5,.4,-a+Math.PI/2)); } merge(gs,K.col(0x6b4a2e,{roughness:.7})); K.b(0,0,-12,6,1.1,3,MAR); }

    // ================= 3: 종탑(20 m, 종 4개) · 타원 세례당 =================
    K.layer(3);
    { const x=46, z=27; K.b(x,0,z,1.3,20.4,1.3,WHT); K.b(x,19.2,z,8,.8,1.1,WHT); for(const dx of [-3.2,-1.1,1.1,3.2]){ K.c(x+dx,18.4,z,.02,.8,DRK,3); K.c(x+dx,16.9,z,.62,1.5,BRZ,14,{r2:.22}); } K.b(x,0,z,3,.3,3,CON); }
    { K.blob(-43,0,6,22,5.5,12,WHT); K.b(-43,0,13.5,3,2.4,1.6,CON); }
    // 정리: 뷰어 기본 대지(잔디판·포장판·길)는 이 모형이 떠 있는 동안 숨기고(W.own과 같은 방식), 기본 life에는 사람만 받음 — 이 build의 지형·광장이 바닥
    { const root=K.bldg.parent, site=root&&root.children[0]; if(site&&site!==K.bldg&&site!==K.life&&site.isGroup){ const mk=new T.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible; const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; }
      const la=K.life.add.bind(K.life); K.life.add=(...o)=>{ o.forEach(m=>{ if(m&&m.material===K.M.people) la(m); }); return K.life; }; }
  }});
