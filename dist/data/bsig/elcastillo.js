__bsigFill({"elcastillo":function(K){
// 사실: 치첸이트사 엘 카스티요(쿠쿨칸 신전) · 바닥 55.3 m 정사각 · 꼭대기 단까지 24 m + 신전 6 m = 30 m · 9단 테라스 · 네 면 계단 각 약 91단(꼭대기 단 포함 365) · 북쪽 난간 뱀 조각, 춘분·추분 오후 북서 난간의 삼각형 그림자 · 8~12세기(마지막 단계 10~11세기 무렵) · 2006년 무렵부터 오르기 금지
// 출처: Wikipedia 'El Castillo, Chichen Itza'(55.3 m, 24 m + 6 m, 91 steps, 365, serpent shadow, dates)
// 추정: 꼭대기 단 19.5 m, 신전 13 × 13 m, 계단 폭 8.8 m·난간 폭 1.3 m, 단마다 판 장식 크기, 큰 광장·전사의 신전·구기장·금성 기단·성스러운 세노테의 거리와 크기는 개략(축 정렬, 실제는 정북에서 조금 돌아 있음)
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
    // 석회암 질감: 밝은 회색 돌 + 검은 이끼 얼룩
    const ltex=E.tex('castLime',256,(g,N,rr)=>{ g.fillStyle='#b9b2a2'; g.fillRect(0,0,N,N); for(let y=0;y<N;y+=16){ let x=-rr()*30; while(x<N){ const w=18+rr()*26; const t=.86+rr()*.24; g.fillStyle=`rgb(${Math.round(185*t)},${Math.round(178*t)},${Math.round(162*t)})`; g.fillRect(x+1,y+1,w-2,14); x+=w; } } for(let i=0;i<60;i++){ g.fillStyle='rgba(60,62,55,.10)'; const x=rr()*N, y=rr()*N; g.beginPath(); g.ellipse(x,y,6+rr()*26,4+rr()*16,0,0,7); g.fill(); } });
    const LIM=new T.MeshStandardMaterial({color:0xd6cfbf,map:ltex,roughness:.95}); LIM.color.convertSRGBToLinear(); ltex&&(ltex.repeat&&ltex.repeat.set(1,1));
    const LIM2=K.col(0xa59e8e,{roughness:1}), DRK=K.col(0x2c2a26,{roughness:1}), SHD=K.col(0x6a645a,{roughness:1}), GRASS=K.col(0x6f8f3e,{roughness:1}), PATH=K.col(0xc9b892,{roughness:1}), STN=K.col(0xb0a998,{roughness:1});
    const HB=27.65, HT=9.75, NT=9, Y1=24, SW=8.8, BW=1.3;
    // 빗면 상자: 아래 반폭 a, 위 반폭 b, 높이 h (UV는 상자 그대로)
    const frus=(a,b,y0,h)=>{ const g=new T.BoxGeometry(2*a,h,2*a,1,1,1); const p=g.attributes.position; for(let i=0;i<p.count;i++){ if(p.getY(i)>0){ p.setX(i,p.getX(i)*b/a); p.setZ(i,p.getZ(i)*b/a); } } g.computeVertexNormals(); const uv=g.attributes.uv; for(let i=0;i<uv.count;i++) uv.setXY(i,uv.getX(i)*a/4,uv.getY(i)*h/4); g.translate(0,y0+h/2,0); return g; };
    // ================= 배경(K.life): 큰 광장(잔디)·길·전사의 신전·천 개의 기둥·구기장·금성 기단·성스러운 세노테·밀림 =================
    LIFE(()=>{
      const CEN=[0,390]; const hf=(x,z)=>{ const r=Math.hypot(x-CEN[0],z-CEN[1]); if(r<34) return -22+8*E.ss(r/34); return -.02+.6*(E.fbm(x*.01,z*.01,2)-.5)*E.ss((Math.max(Math.abs(x),Math.abs(z))-260)/60); };
      const inPlaza=(x,z)=>x>-230&&x<230&&z>-170&&z<220;
      E.terrain(-700,700,-700,700,130,130,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.05,z*.05,2); if(h<-3) return [.55,.5,.42]; if(Math.abs(x)<5&&z>40&&z<360) return [.78,.72,.58]; if(inPlaza(x,z)) return [.4+.05*n,.53+.05*n,.24+.03*n]; return [.28+.04*n,.38+.05*n,.2]; });
      E.terrain(-4000,4000,-4000,4000,90,90,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.006,z*.006,2); return [.24+.04*n,.34+.05*n,.18]; },[-700,700,-700,700]);
      { const g=new T.CircleGeometry(30,40); g.rotateX(-Math.PI/2); const m=new T.Mesh(g,WATER); m.position.set(CEN[0],-14,CEN[1]); K.life.add(m); }
      // 전사의 신전(동쪽, -x): 4단 기단 + 위 신전 + 앞 기둥 숲
      { const x0=-150, z0=10; for(let i=0;i<4;i++){ const w=40-i*4.6; K.b(x0,i*3,z0,w,3,w,i%2?LIM2:STN); } K.b(x0,12,z0,16,4.6,12,LIM2); K.b(x0+20.5,0,z0,8,12,8,STN); const g=boxG(1,1,1); const cols=[]; for(let i=0;i<5;i++) for(let j=0;j<12;j++) cols.push([x0+26+i*3.2,0,z0-18+j*3.2,0,.9,3.2,.9]); for(let i=0;i<4;i++) for(let j=0;j<16;j++) cols.push([x0-10+i*3.4,0,z0-42-j*3.2,0,.9,3,.9]); inst(g,STN,cols); }
      // 구기장(북서, +x): 긴 벽 두 줄 + 양 끝 신전
      { const x0=170, z0=120; for(const s of [-1,1]){ K.b(x0+s*21,0,z0,10,8.5,96,STN); K.b(x0+s*16.5,0,z0,1.2,1.6,96,LIM2); } K.b(x0,0,z0+62,24,6,10,LIM2); K.b(x0,0,z0-62,24,6,10,LIM2); K.b(x0-21,8.5,z0-30,8,5,10,LIM2); }
      // 금성 기단(북쪽) · 독수리·재규어 기단
      K.b(0,0,92,25,4,25,STN); for(const [dx,dz] of [[0,13],[0,-13],[13,0],[-13,0]]) K.b(dx,0,92+dz,6,3,3,LIM2,dx?Math.PI/2:0); K.b(70,0,70,16,3.2,16,STN);
      // 사크베(세노테로 가는 흰 길) 가장자리 낮은 돌
      K.b(0,0,210,10,.15,320,PATH);
      // 밀림: 광장 밖 빽빽한 낮은 숲(10~15 m) + 광장 안 드문 나무
      E.forest(E.scatter(-700,700,-700,700,8,hf,(x,z,h)=>!inPlaza(x,z)&&!(Math.abs(x)<9&&z>40&&z<360)&&Math.hypot(x-CEN[0],z-CEN[1])>36&&E.r()<.85,(x,z,h)=>9+E.r()*6,(x,z,h)=>0),{trunks:false});
      E.forest(E.scatter(-230,230,-170,220,30,hf,(x,z,h)=>Math.hypot(x,z)>90&&E.r()<.18&&Math.abs(x+150)>40&&Math.abs(x-170)>30,(x,z,h)=>8+E.r()*5,(x,z,h)=>0),{trunks:true});
      E.forest(E.scatter(-4000,4000,-4000,4000,50,hf,(x,z,h)=>Math.max(Math.abs(x),Math.abs(z))>700&&E.r()<.7,(x,z,h)=>14+E.r()*6,(x,z,h)=>0),{trunks:false});
    });
    // ================= 0: 바닥 잔디 받침 · 1~9: 9단 몸체(판 장식) =================
    K.layer(0);
    K.b(0,-.1,0,76,.12,76,GRASS);
    const step=(HB-HT)/NT, th=Y1/NT;
    for(let i=0;i<NT;i++){ K.layer(1+Math.floor(i/3)); const a=HB-i*step, b=a-.55, y0=i*th; put(new T.Mesh(frus(a,b,y0,th),LIM));
      // 판 장식: 단마다 오목한 판(어두운 그림자 면) — 계단 자리 비움
      const gs=[]; const L=2*b-1.2, n=Math.max(2,Math.floor(L/3.1)); for(const [nx,nz] of [[0,1],[0,-1],[1,0],[-1,0]]) for(let k=0;k<n;k++){ const u=-L/2+L*(k+.5)/n; if(Math.abs(u)<SW/2+BW+.6) continue; const off=b-.02; const x=nz?u:nx*off, z=nz?nz*off:u; gs.push(bx(x,y0+th*.36,z,nz?2.1:.12,th*.42,nz?.12:2.1)); }
      merge(gs,SHD,false);
      const gb=[]; for(const [nx,nz] of [[0,1],[0,-1],[1,0],[-1,0]]){ const off=b+.06; gb.push(bx(nz?0:nx*off,y0+th-.32,nz?nz*off:0,nz?2*b+.3:.22,.22,nz?.22:2*b+.3)); } merge(gb,LIM2); }
    // 꼭대기 단 바닥판
    K.layer(3); K.b(0,Y1-.05,0,2*HT,.3,2*HT,LIM2);
    // ================= 4: 네 면 계단(91단) + 난간 · 북쪽 뱀 머리 =================
    K.layer(4);
    { const N=91, R0=HT, R1=HT+Y1*1.0, rise=Y1/N, run=(R1-R0)/N; const st=[], bal=[];
      for(const [nx,nz] of [[0,1],[0,-1],[1,0],[-1,0]]){ const ry=nz?0:Math.PI/2;
        for(let k=0;k<N;k++){ const r=R1-(k+.5)*run, y=k*rise; st.push(bx(nx*r,0,nz*r,nz?SW:run+.02,y+rise,nz?run+.02:SW)); }
        for(const s of [-1,1]){ // 난간: 바깥 끝 빗면 + 계단보다 조금 높은 띠
          const sh=new T.Shape(); sh.moveTo(R1+.6,0); sh.lineTo(R1+.6,1.1); sh.lineTo(R0,Y1+.9); sh.lineTo(R0-1.2,Y1+.9); sh.lineTo(R0-1.2,0); sh.lineTo(R1+.6,0); const g=new T.ExtrudeGeometry(sh,{depth:BW,bevelEnabled:false}); g.translate(0,0,-BW/2+s*(SW/2+BW/2));
          if(nz){ g.rotateY(nz>0?-Math.PI/2:Math.PI/2); } else if(nx<0) g.rotateY(Math.PI); bal.push(g); } }
      merge(st,STN); merge(bal,LIM); }
    // 북쪽 계단 난간 아래 뱀 머리(입 벌린 머리 + 혀) — 정면(+z)
    { const z=HT+Y1+1.4; for(const s of [-1,1]){ const x=s*(SW/2+BW/2); K.b(x,0,z,BW+.6,1.6,2.6,LIM2); K.b(x,1.6,z-.4,BW+.4,.6,1.8,STN); K.b(x,.25,z+1.25,BW+.2,.5,.3,DRK); K.b(x,0,z+1.6,.5,.12,1.2,K.col(0x8d4a3a,{roughness:1})); for(const e of [-1,1]) K.b(x+e*.55,1.25,z+.7,.3,.3,.3,DRK); } }
    // ================= 5: 꼭대기 신전 — 북쪽 세 칸 입구(뱀 기둥 둘)·지붕 띠·톱니 장식 =================
    K.layer(5);
    { const W=13, D=13, H=4.6, y=Y1+.25, t=1.2; const g=[];
      // 북쪽 벽: 입구 3 (폭 2.6) 사이 뱀 기둥 2
      const segN=[[-W/2,-4.6],[-1.9,-1.3],[1.3,1.9],[4.6,W/2]]; for(const [a,b] of segN) g.push(bx((a+b)/2,y,D/2-t/2,b-a,H,t));
      for(const [nx,nz] of [[0,-1],[1,0],[-1,0]]){ if(nz){ for(const [a,b] of [[-W/2,-1.3],[1.3,W/2]]) g.push(bx((a+b)/2,y,nz*(D/2-t/2),b-a,H,t)); } else for(const [a,b] of [[-D/2,-1.3],[1.3,D/2]]) g.push(bx(nx*(W/2-t/2),y,(a+b)/2,t,H,b-a)); }
      g.push(bx(0,y+2.6,0,W,.01,D)); g.push(bx(0,y+H-.02,D/2-t/2,2.6*3,.0,.1));
      merge(g,LIM);
      for(const xx of [-3.25,3.25]) K.c(xx,y,D/2-.6,.55,H,LIM2,10); // 뱀 기둥
      for(const xx of [-3.25,3.25]) K.b(xx,y,D/2+.2,1.2,.7,1.4,LIM2); // 기둥 밑 뱀 머리
      K.b(0,y,0,W-2*t,H-.2,D-2*t,DRK); // 안쪽 어둠
      K.b(0,y+H,0,W+.6,1.1,D+.6,LIM2); K.b(0,y+H+1.1,0,W+.2,.35,D+.2,LIM);
      { const m=[]; for(const [nx,nz] of [[0,1],[0,-1],[1,0],[-1,0]]) for(let k=0;k<9;k++){ const u=-W/2+.7+k*(W-1.4)/8; m.push(bx(nz?u:nx*(W/2),y+H+1.45,nz?nz*(D/2):u,.6,.5,.6)); } merge(m,LIM2); } }
    // 정리: 뷰어 기본 대지(잔디판·포장판·길)는 이 모형이 떠 있는 동안 숨기고(W.own과 같은 방식), 기본 life에는 사람만 받음 — 이 build의 지형·광장이 바닥
    { const root=K.bldg.parent, site=root&&root.children[0]; if(site&&site!==K.bldg&&site!==K.life&&site.isGroup){ const mk=new T.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible; const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; }
      const la=K.life.add.bind(K.life); K.life.add=(...o)=>{ o.forEach(m=>{ if(m&&m.material===K.M.people) la(m); }); return K.life; }; }
  }});
