__bsigFill({"niteroi":function(K){
// 사실: 오스카 니마이어 설계(구조 브루누 콘타리니) · 1996 개관 · 높이 16 m · 원반 지름 50 m · 3개 층 · 붉은 카펫 경사로 98 m · 연못 817 ㎡·깊이 60 cm · 띠창 40° 기울기 · 가운데 육각형 전시실 400 ㎡ · 과나바라만 바위 절벽 위
// 출처: ArchDaily 'AD Classics: Niterói Contemporary Art Museum'(16 m, 50 m, 98 m ramp, 817 ㎡ × 60 cm pool, 40° windows)
// 추정: 원통 기둥 지름 9 m(자료마다 다름), 원반 곡면 단면(아래 곡면·띠창·위 테두리 높이), 경사로 폭 3.2 m·평면 곡선·입구 높이 9.5 m, 절벽 높이 약 18 m, 원경(리우 시가·팡지아수카르)은 시야 안에 넣으려고 거리를 줄인 개략
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
    const WHT=K.col(0xf6f5f1,{roughness:.55,emissive:0x2c2c2a,emissiveIntensity:.3}), WH2=K.col(0xe3e1db,{roughness:.7}), PAV=K.col(0xd2cdc3,{roughness:.95}), JNT=K.col(0xa29b8f,{roughness:.95}), RED=K.col(0xc4262e,{roughness:.6}), RED2=K.col(0x9e1d24,{roughness:.75}), DRK=K.col(0x1a1d20,{roughness:.9}), MUL=K.col(0x2a2e33,{roughness:.4,metalness:.6}), POOLB=K.col(0x274a55,{roughness:.8}), RAIL=K.col(0x9aa0a6,{roughness:.4,metalness:.6});
    const GLB=K.col(0x23323d,{roughness:.05,metalness:.75,transparent:true,opacity:.86}); GLB.side=T.DoubleSide;
    const RS=4.5, RP=17, R=25;
    // 원반 단면: 줄기(0~4) → 나팔처럼 벌어지는 아래 곡면(4~10.4) → 바깥으로 기운 띠창(10.4~12.6) → 흰 테두리(12.6~14.2) → 낮은 지붕(~16)
    const bowl=[]; for(let i=0;i<=24;i++){ const t=i/24; bowl.push(new T.Vector2(RS+19*Math.pow(t,1.8),4+6.4*(1-Math.pow(1-t,2)))); }

    // ================= 배경(K.life): 바위 곶·절벽·바다(과나바라만)·보아비아젱 섬·니테로이 언덕 시가·리우 원경 =================
    LIFE(()=>{
      const plat=(x,z)=>{ const r=Math.hypot(x,z); const a=r-44, b=Math.max(Math.abs(x)-80,-z-6,z-240); return Math.min(a,b); }; // <0 이면 광장 고원
      const HILL=[[320,620,380,300,120,1.4],[-420,820,420,320,160,1.4],[60,1200,700,380,210,1.5],[900,300,300,420,90,1.4],[260,-150,60,50,38,.8]];
      const RIO=[[-900,-2900,230,190,396,.35],[-560,-2830,200,170,220,.9],[-2400,-3600,600,420,700,1.1],[-1500,-4000,900,420,520,1.3],[-3600,-3500,700,700,900,1.2],[600,-3800,700,400,300,1.3]];
      const hf=(x,z)=>{ const r=Math.hypot(x,z); if(r<35.5||(x>-35.5&&x<49.5&&z>28&&z<77.5)) return -1.2; const p=plat(x,z); let h; if(p<0) h=-.05; else { h=-22*E.ss(p/16)-8*E.ss((p-40)/80)+3*E.fbm(x*.05,z*.05,3)*E.ss(p/6)*(1-E.ss((p-30)/20)); } if(z>40) h=Math.max(h,E.peaks(x,z,HILL.slice(0,4))); const pi=E.peaks(x,z,HILL.slice(4)); if(pi>0) h=Math.max(h,pi-20); return Math.max(h,E.peaks(x,z,RIO)-32); };
      const col=(x,z,h,ny)=>{ const n=E.fbm(x*.04,z*.04,2); if(ny<.75&&h<10) return [.46+.06*n,.42+.05*n,.38+.04*n]; if(h<-19) return [.5,.47,.4]; return [.3+.05*n,.42+.05*n,.24+.03*n]; };
      E.terrain(-260,260,-200,320,130,130,hf,col);
      E.terrain(-4600,4600,-4600,4600,110,110,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.006,z*.006,2); if(ny<.7) return [.42+.05*n,.4+.04*n,.36]; if(h<-19) return [.5,.47,.4]; return [.26+.05*n,.38+.05*n,.22+.03*n]; },[-260,260,-200,320]);
      // 바다(만)
      { const g=new T.PlaneGeometry(9200,9200); g.rotateX(-Math.PI/2); const m=new T.Mesh(g,WATER); m.position.y=-18; K.life.add(m); }
      // 니테로이 시가(뒤 언덕 아래) · 리우 해안 시가(원경, 흰 고층)
      const BL=[]; for(let x=-900;x<900;x+=26) for(let z=120;z<1100;z+=26){ const xx=x+(E.r()-.5)*10, zz=z+(E.r()-.5)*10; const h0=hf(xx,zz); if(h0<-1||h0>60||E.r()<.35||(Math.abs(xx)<90&&zz<260)) continue; BL.push([xx,zz,12+E.r()*10,12+E.r()*10,h0+6+E.r()*(E.r()<.2?40:14),E.r()<.5?'#e4ded2':'#c9c3b8']); }
      for(let x=-3800;x<1200;x+=60) for(let z=-3450;z>-3700;z-=55){ if(E.r()<.25) continue; const xx=x+(E.r()-.5)*20; if(Math.abs(xx+900)<320||Math.abs(xx+560)<180) continue; BL.push([xx,z,30+E.r()*20,30+E.r()*20,20+E.r()*45,E.r()<.6?'#ece9e2':'#cfd2d4']); }
      E.blocks(BL);
      // 광장 가장자리 난간(절벽 쪽)
      { const gs=[]; for(let i=0;i<=60;i++){ const a=Math.PI*1.04+i/60*Math.PI*.92; gs.push(bx(Math.cos(a)*44.5,0,Math.sin(a)*44.5,.06,1.05,.06)); } merge(gs,RAIL,false); const tg=new T.TorusGeometry(44.5,.05,4,80,Math.PI*.92); tg.rotateX(Math.PI/2); const m=new T.Mesh(tg,RAIL); m.rotation.y=-Math.PI*1.04; m.position.y=1.05; K.life.add(m); }
      // 풀·관목, 언덕 숲
      E.forest(E.scatter(-260,260,-200,320,9,hf,(x,z,h)=>h>2&&E.r()<.7,(x,z,h)=>5+E.r()*4,(x,z,h)=>0),{trunks:false});
      E.forest(E.scatter(-1200,1200,200,1500,24,hf,(x,z,h)=>h>40&&E.r()<.7,(x,z,h)=>10+E.r()*6,(x,z,h)=>0),{trunks:false});
    });

    // ================= 0: 광장(연못 자리 뚫림) · 반사 연못 =================
    K.layer(0);
    { const sh=new T.Shape(); const P=[]; for(let i=0;i<=80;i++){ const a=Math.PI/2+.62+(Math.PI*2-1.24)*i/80; P.push([Math.cos(a)*36,Math.sin(a)*36]); } P.push([48,30],[48,76],[-34,76]); P.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); const ho=new T.Path(); ho.absarc(0,0,RP,0,Math.PI*2,true); sh.holes.push(ho);
      const g=new T.ExtrudeGeometry(sh,{depth:1.5,bevelEnabled:false,curveSegments:64}); g.rotateX(-Math.PI/2); const m=new T.Mesh(g,PAV); m.position.y=-1.5; put(m,false); }
    { const gs=[]; for(let x=-32;x<=46;x+=4) gs.push(bx(x,0,55,.07,.012,40)); for(let z=36;z<=74;z+=4) gs.push(bx(7,0,z,80,.012,.07)); for(const r of [21,26,31]){ const rg=new T.RingGeometry(r-.04,r+.04,96,1); rg.rotateX(-Math.PI/2); rg.translate(0,.012,0); gs.push(rg); } merge(gs,JNT,false); }
    { const rb=new T.CircleGeometry(RP,64); rb.rotateX(-Math.PI/2); const mb=new T.Mesh(rb,POOLB); mb.position.y=-.62; put(mb,false); const rw=new T.CircleGeometry(RP,64); rw.rotateX(-Math.PI/2); const mw=new T.Mesh(rw,WATER); mw.position.y=-.16; put(mw,false); const o=new T.CylinderGeometry(RP,RP,.62,64,1,true); const mo=new T.Mesh(o,WH2.clone()); mo.material.side=T.DoubleSide; mo.position.y=-.31; put(mo,false); }
    // ================= 1: 원통 기둥 + 아래 곡면(꽃받침) =================
    K.layer(1);
    K.c(0,-.62,0,RS,4.7,WHT,48);
    { const g=new T.LatheGeometry(bowl,96); const m=new T.Mesh(g,WHT.clone()); m.material.side=T.DoubleSide; put(m); }
    // 경사로 입구(아래 곡면에 뚫린 어두운 문)
    // ================= 2: 기운 띠창 + 멀리언 · 흰 테두리 · 지붕 =================
    K.layer(2);
    { const g=new T.LatheGeometry([new T.Vector2(23.5,10.4),new T.Vector2(25,12.6)],96); put(new T.Mesh(g,GLB),false);
      const gs=[]; const th=Math.atan2(1.5,2.2), L=Math.hypot(1.5,2.2); const n=72; for(let i=0;i<n;i++){ const a=i/n*Math.PI*2; const g2=new T.BoxGeometry(.16,L,.22); g2.rotateZ(-th); g2.translate(24.27,11.5,0); g2.rotateY(-a); gs.push(g2); } merge(gs,MUL,false);
      const g3=new T.LatheGeometry([new T.Vector2(23.2,10.36),new T.Vector2(23.62,10.36),new T.Vector2(23.62,10.5)],96); put(new T.Mesh(g3,WH2)); }
    { const pr=[new T.Vector2(24.9,12.55),new T.Vector2(25.15,12.6),new T.Vector2(25.15,14.2),new T.Vector2(24.7,14.35)]; for(let i=1;i<=10;i++){ const t=i/10; pr.push(new T.Vector2(24.7*(1-t),14.35+1.65*Math.sin(t*Math.PI/2))); } const g=new T.LatheGeometry(pr,96); const m=new T.Mesh(g,WHT.clone()); m.material.side=T.DoubleSide; put(m); }
    // 원반 안 바닥(띠창 너머 보이는 회랑 바닥·전시실 벽)
    K.c(0,10.3,0,23.3,.12,WH2,64); K.c(0,10.42,0,9.5,3.6,WH2,6);
    // ================= 3: 붉은 경사로(98 m, S자로 감아 오름) =================
    K.layer(3);
    { const pts=[[34,44],[30,56],[18,62],[2,60],[-12,53],[-22,42],[-25,31],[-22,21],[-18.5,15.5]].map(([x,z])=>new T.Vector3(x,0,z)); const cv=new T.CatmullRomCurve3(pts,false,'centripetal'); const Lc=cv.getLength(); const H0=.0, H1=9.4, W2=1.6, N=80;
      const Y=u=>H0+(H1-H0)*E.ss(Math.min(1,u*1.04)), at=(u,s,dy)=>{ const p=cv.getPointAt(u), t=cv.getTangentAt(u); const nx=-t.z, nz=t.x, L=Math.hypot(nx,nz)||1; return [p.x+nx/L*s,Y(u)+dy,p.z+nz/L*s]; };
      K.surf((u,v)=>at(u,-W2+2*W2*v,0),N,1,RED2);
      K.surf((u,v)=>at(u,-W2-.22+(2*W2+.44)*v,-.7),N,1,RED);
      for(const s of [-1,1]){ const e=s*(W2+.22), i=s*W2; K.surf((u,v)=>at(u,e,-.7+1.8*v),N,1,RED); K.surf((u,v)=>at(u,i,1.1*v),N,1,RED); K.surf((u,v)=>at(u,i+(e-i)*v,1.1),N,1,RED); }
      // 받침 기둥(가늘게)
      for(let k=1;k<9;k++){ const u=k/9; const p=at(u,0,0); if(p[1]<1.2) continue; K.c(p[0],0,p[2],.35,p[1]-.7,WHT,10); }
      // 입구: 아래 곡면에 붙은 어두운 문틀
      { const p=at(1,0,0); K.b(p[0]+.4,p[1],p[2]+.3,3.6,2.6,1.2,DRK,Math.atan2(-15.5,18.5)+Math.PI/2); } }
    // 정리: 뷰어 기본 대지(잔디판·포장판·길)는 이 모형이 떠 있는 동안 숨기고(W.own과 같은 방식), 기본 life에는 사람만 받음 — 이 build의 지형·광장이 바닥
    { const root=K.bldg.parent, site=root&&root.children[0]; if(site&&site!==K.bldg&&site!==K.life&&site.isGroup){ const mk=new T.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible; const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; }
      const la=K.life.add.bind(K.life); K.life.add=(...o)=>{ o.forEach(m=>{ if(m&&m.material===K.M.people) la(m); }); return K.life; }; }
  }});
