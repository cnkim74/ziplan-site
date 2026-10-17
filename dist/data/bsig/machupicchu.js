__bsigFill({"machupicchu":function(K){
// 사실: 15세기 중엽(파차쿠티 시대, 1450년 무렵) 잉카 · 해발 약 2,430 m 능선(마추픽추산·와이나픽추 사이) · 와이나픽추 해발 2,693 m(도시보다 약 260 m 높음) · 우루밤바강이 세 방향을 감싸며 약 450 m 아래 · 농경 구역(남)과 도시 구역(북) · 중앙 광장 · 태양의 신전(토레온)·세 창문의 신전·주 신전·인티와타나 · 화강암 마름돌(회반죽 없음)·박공 끝벽·짚 지붕 · 1983 유네스코 세계유산
// 출처: PeakVisor 'Huayna Picchu'(2,693 m, 약 260 m 위) · UNESCO WHC 274 / Wikipedia 'Machu Picchu'(2,430 m, 1450년 무렵) — 위키 본문은 이번에 직접 열지 못함
// 추정: 모형 범위·구역 배치·광장 크기, 테라스 높이(1.6~2.4 m 단), 집 크기·개수(대표 군집만), 와이나픽추 거리(약 450 m)·모양, 강 위치·주변 산 높이는 개략
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
    const ST=K.col(0xb2ab9e,{roughness:1}), ST2=K.col(0x9b958a,{roughness:1}), STW=K.col(0x8c877d,{roughness:1}), GR=K.col(0x5f863a,{roughness:1}), GR2=K.col(0x75a046,{roughness:1}), STRAW=K.col(0xa88a4f,{roughness:1}), ROCK=K.col(0x8f8a80,{roughness:1}), DRK=K.col(0x2b2925,{roughness:1});
    // ---- 땅 모양 L(x,z): 광장 0 기준 — 서쪽(위)·인티와타나 언덕·동쪽(아래)·남쪽 농경 경사·북쪽 안장 → 능선 밖은 협곡으로 떨어짐 ----
    const HU=[[-10,-470,150,140,265,1.0],[8,-235,55,45,62,1.0]]; // 와이나픽추 · 우추이픽추(작은 봉)
    const MTS=[[-160,1050,650,520,650,1.3],[820,-160,280,300,140,1.1],[-1700,-650,700,600,700,1.3],[-1100,900,600,600,900,1.3],[1500,700,700,600,1000,1.3],[300,-1600,800,500,820,1.3],[-600,-1700,600,500,600,1.3],[1900,-1100,700,700,1200,1.3],[-2300,200,700,900,1100,1.3],[2600,-200,800,800,900,1.4],[-300,2400,900,700,1300,1.4]];
    const RIV=[[-1200,900],[-720,450],[-560,0],[-520,-420],[-300,-780],[120,-860],[520,-620],[640,-200],[600,250],[760,700],[1100,1200]];
    const dSeg=(x,z)=>{ let m=1e9; for(let i=0;i<RIV.length-1;i++){ const [ax,az]=RIV[i], [bx2,bz]=RIV[i+1]; const vx=bx2-ax, vz=bz-az, t=Math.max(0,Math.min(1,((x-ax)*vx+(z-az)*vz)/(vx*vx+vz*vz))); m=Math.min(m,Math.hypot(x-ax-vx*t,z-az-vz*t)); } return m; };
    const Lc=(x,z)=>{ let h=10*E.ss((-x-8)/22)*(z>15?.62:1)*(z<-135?0:1); h+=E.peaks(x,z,[[-38,-88,28,26,15,1.2]]); h-=9*E.ss((x-22)/55); if(z>78) h=Math.max(h,0)+38*E.ss((z-78)/92)*(1-.35*E.ss((x+10)/80))-6*E.ss((z-210)/200); h-=14*E.ss((-z-135)/50); return h; };
    const L=(x,z)=>{ const d=Math.max(Math.abs(x-5),-z-650,z-700); let h=Lc(x,z)-440*Math.pow(E.ss((d-92)/270),.8); const hu=E.peaks(x,z,HU); if(hu>0) h=Math.max(h,hu*(1+.12*(E.fbm(x*.03,z*.03,3)-.5))-440*E.ss((Math.abs(x+5)-150)/200)); const m=E.peaks(x,z,MTS); if(m>0) h=Math.max(h,m-460+40*E.ridged(x*.004,z*.004)); const r=dSeg(x,z); if(r<160) h=Math.min(h,-462+18*E.ss(r/60)+40*E.ss((r-40)/120)); return h; };
    // 구역 판정
    const zone=(x,z)=>{ if(Math.abs(x-8)<15&&z>-95&&z<55) return 'p'; if(z>=78&&z<170&&x>-86&&x<56) return 'a'; if(z>=78&&z<132&&x>=56&&x<86) return 'a'; if(z>-132&&z<78&&x>-78&&x<86){ if(z<-100&&(x<-26||x>46)) return null; return 'u'; } if(z<=-132&&z>-158&&x>-22&&x<34) return 'u'; if(x>=86&&x<104&&z>-80&&z<62) return 'a'; return null; };
    // ================= 배경(K.life): 능선·협곡·와이나픽추·주변 산·우루밤바강·숲·구름 =================
    LIFE(()=>{
      const hl=(x,z)=>zone(x,z)?L(x,z)-1.3:L(x,z);
      const col=(x,z,h,ny)=>{ const n=E.fbm(x*.03,z*.03,2); if(zone(x,z)) return [.42,.5,.3]; if(ny<.42) return [.46+.06*n,.46+.05*n,.4+.04*n]; if(h<-440) return [.36+.04*n,.42+.04*n,.26]; if(z>150&&Math.abs(x)<260&&h>0) return [.42+.05*n,.5+.05*n,.28]; return [.2+.05*n,.33+.06*n,.17+.03*n]; };
      E.terrain(-560,560,-720,520,130,130,hl,col);
      E.terrain(-4500,4500,-4500,4500,120,120,L,(x,z,h,ny)=>{ const n=E.fbm(x*.004,z*.004,2); if(ny<.4) return [.44+.05*n,.44+.05*n,.39]; if(h>900) return [.4+.05*n,.43+.04*n,.34]; return [.19+.05*n,.31+.06*n,.16+.03*n]; },[-560,560,-720,520]);
      { const g=new T.PlaneGeometry(9000,9000); g.rotateX(-Math.PI/2); const m=new T.Mesh(g,WATER); m.position.y=-455; K.life.add(m); }
      // 운무림(가까운 사면) · 먼 산 숲
      E.forest(E.scatter(-560,560,-720,520,12,hl,(x,z,h)=>{ if(zone(x,z)) return false; const dx=(hl(x+3,z)-hl(x-3,z))/6, dz=(hl(x,z+3)-hl(x,z-3))/6; if(z>140&&Math.abs(x)<260&&h>-20) return false; if(Math.hypot(x-5,z)<150) return E.r()<.25; return Math.hypot(dx,dz)<2.2&&h<255&&E.r()<.8; },(x,z,h)=>7+E.r()*5,(x,z,h)=>E.r()<.25?2:0),{trunks:false});
      E.forest(E.scatter(-4400,4400,-4400,4400,55,L,(x,z,h)=>{ if(Math.abs(x)<560&&z>-720&&z<520) return false; return h>-440&&h<600&&E.r()<.55; },(x,z,h)=>24+E.r()*12,(x,z,h)=>E.r()<.3?2:0),{trunks:false});
    });
    // ================= 0: 계단식 테라스(땅 모양을 단 높이로 끊어 쌓음) — 돌 옹벽 + 잔디 윗면 =================
    K.layer(0);
    const tiles=[]; const topAt={};
    { const sides=[], tops=[], ptop=[]; const add=(x0,x1,z0,z1,q,kind)=>{ const cx=(x0+x1)/2, cz=(z0+z1)/2; if(!zone(cx,cz)) return; let h=kind==='p'?0:Math.ceil((L(cx,cz)+.4)/q)*q; if(kind==='p'&&cz<-40) h=-.8; const lo=Math.min(L(x0,z0),L(x1,z0),L(x0,z1),L(x1,z1))-1.6; const w=x1-x0, d=z1-z0; sides.push(bx(cx,lo,cz,w,h-lo-.12,d)); (kind==='p'?ptop:tops).push(bx(cx,h-.12,cz,w+.02,.12,d+.02)); tiles.push([x0,x1,z0,z1,h,kind]); };
      for(let z=-158;z<78;z+=8) for(let x=-78;x<104;x+=8){ const k=zone(x+4,z+4); if(k==='u'||k==='p') add(x,x+8,z,z+8,k==='p'?1:1.6,k); else if(k==='a') add(x,x+8,z,z+8,2.4,k); }
      for(let z=78;z<170;z+=4.5) for(let x=-86;x<86;x+=10){ if(zone(x+5,z+2.25)==='a') add(x,x+10,z,z+4.5,2.4,'a'); }
      merge(sides,STW); merge(tops,GR); merge(ptop,GR2); }
    const hAt=(x,z)=>{ for(const t of tiles) if(x>=t[0]&&x<t[1]&&z>=t[2]&&z<t[3]) return t[4]; return L(x,z); };
    // 마른 해자(도시·농경 경계) — 어두운 홈 + 계단
    K.b(-12,hAt(-12,77)-1.4,77.2,120,1.6,1.4,DRK);
    // ================= 1: 돌집 무리(박공 끝벽) · 짚 지붕 일부 =================
    K.layer(1);
    const walls=[], walls2=[], straw=[];
    const house=(x,z,w,d,ry,thatch,mat)=>{ const y=hAt(x,z), H=3.3, t=.7, g=[]; const cs=Math.cos(ry), sn=Math.sin(ry); const P=(lx,lz)=>[x+lx*cs+lz*sn,z-lx*sn+lz*cs];
      const seg=(lx,lz,sw,sd,h,yy)=>{ const [px,pz]=P(lx,lz); g.push(bx(px,y+(yy||0),pz,sw,h,sd,ry)); };
      seg(-w/4-.6,d/2-t/2,w/2-1.2,t,H); seg(w/4+.6,d/2-t/2,w/2-1.2,t,H); seg(0,d/2-t/2,1.2,t,.9,H-.9); seg(0,-d/2+t/2,w,t,H); // 앞(문 하나)·뒤 긴 벽
      for(const s of [-1,1]){ seg(s*(w/2-t/2),0,t,d,H); const sh=new T.Shape(); sh.moveTo(-d/2,0); sh.lineTo(0,2.4); sh.lineTo(d/2,0); sh.lineTo(-d/2,0); const gg=new T.ExtrudeGeometry(sh,{depth:t,bevelEnabled:false}); gg.translate(0,0,-t/2); gg.rotateY(Math.PI/2); const [px,pz]=P(s*(w/2-t/2),0); gg.rotateY(ry); gg.translate(px,y+H,pz); g.push(gg); }
      (mat||walls).push(...g);
      if(thatch){ const sh=new T.Shape(); sh.moveTo(-d/2-.7,-.35); sh.lineTo(0,2.75); sh.lineTo(d/2+.7,-.35); sh.lineTo(-d/2-.7,-.35); const gg=new T.ExtrudeGeometry(sh,{depth:w+.8,bevelEnabled:false}); gg.translate(0,0,-(w+.8)/2); gg.rotateY(Math.PI/2); gg.rotateY(ry); gg.translate(x,y+H,z); straw.push(gg); } };
    // 동쪽 주거 구역: 칸차(마당을 둔 집 무리) — 타일 위에 2~4채씩
    { let n=0; for(const t of tiles){ if(t[5]!=='u') continue; const cx=(t[0]+t[1])/2, cz=(t[2]+t[3])/2; const east=cx>24, west=cx<-10; const p=east?.62:west?.42:.3; if(E.r()>p) continue; if(cz>66||Math.hypot(cx+38,cz+88)<24) continue; const ry=(E.r()<.5?0:Math.PI/2)+(east?.08:-.05); house(cx+(E.r()-.5)*.8,cz+(E.r()-.5)*.8,6.6,4.4,ry,E.r()<.08,E.r()<.5?walls:walls2); n++; } }
    // 경비소(남쪽 높은 곳, 짚 지붕) · 신성한 바위 옆 와이라나 2채(짚 지붕)
    house(-58,160,7,4.4,0,true); house(-6,-146,7,4.6,0,true,walls2); house(16,-146,7,4.6,0,true,walls2);
    // 농경 구역 아래쪽 창고(콜카) 몇 채
    for(const [x,z] of [[30,96],[38,92],[46,88]]) house(x,z,6,4,0,true,walls2);
    merge(walls,ST); merge(walls2,ST2); merge(straw,STRAW);
    // ================= 2: 신전들 — 태양의 신전(둥근 벽)·세 창문의 신전·주 신전·인티와타나·신성한 바위 =================
    K.layer(2);
    { // 태양의 신전(토레온): 바위 위 반원 둥근 벽 + 붙은 직사각 벽
      const x=-36, z=40, y=hAt(x,z); K.blob(x+2,y-.5,z+2,14,2.4,12,ROCK); const sh=new T.Shape(); sh.absarc(0,0,5.2,-.6,Math.PI+.6,false); sh.absarc(0,0,4.3,Math.PI+.6,-.6,true); const g=new T.ExtrudeGeometry(sh,{depth:5.4,bevelEnabled:false,curveSegments:24}); g.rotateX(-Math.PI/2); const m=new T.Mesh(g,ST); m.position.set(x,y+1.6,z); put(m); K.b(x+6,y,z-3,8,4.2,.8,ST); K.b(x+9.6,y,z+1,.8,4.2,8,ST);
      // 사다리꼴 창 2(어두운 홈)
      for(const a of [1.2,2.2]) K.b(x+Math.cos(a)*5.25,y+3.6,z-Math.sin(a)*5.25,.8,1,.3,DRK,-a+Math.PI/2); }
    { // 신성한 광장: 세 창문의 신전(동쪽 면 큰 벽에 사다리꼴 창 3) · 주 신전(3면 벽)
      const x=-28, z=-44, y=hAt(x,z); const gs=[]; gs.push(bx(x,y,z,.9,4.6,10.5)); for(const s of [-1,1]) gs.push(bx(x-3.5,y,z+s*5,7,4.6,.9)); merge(gs,ST); for(const dz of [-3.2,0,3.2]) K.b(x+.47,y+1.4,z+dz,.06,1.9,1.3,DRK);
      const x2=-36, z2=-34, y2=hAt(x2,z2); const g2=[]; g2.push(bx(x2,y2,z2-4.2,11,5.2,1.1)); for(const s of [-1,1]) g2.push(bx(x2+s*5,y2,z2,1.1,5.2,8.4)); merge(g2,ST); K.b(x2,y2,z2-3.4,6,1,.6,ROCK); }
    { // 인티와타나: 언덕 꼭대기 깎은 돌(기둥 돌 + 받침) — 언덕은 테라스 단으로 쌓임
      const x=-38, z=-88, y=hAt(x,z); K.b(x,y,z,4.2,1,3,ROCK,.3); K.b(x+.4,y+1,z,.7,1.8,.6,ROCK,.3); }
    { // 신성한 바위(북쪽 끝) — 산 모양을 닮은 큰 판석
      const x=5, z=-146, y=hAt(x,z); const sh=new T.Shape(); sh.moveTo(-4.5,0); sh.lineTo(-3.2,2.4); sh.lineTo(-.6,3.2); sh.lineTo(1.8,2.6); sh.lineTo(4.2,.6); sh.lineTo(4.5,0); sh.lineTo(-4.5,0); const g=new T.ExtrudeGeometry(sh,{depth:1.1,bevelEnabled:false}); g.translate(0,0,-.55); const m=new T.Mesh(g,ROCK); m.position.set(x,y,z); put(m); K.b(x,y,z+4,9,.6,4,ST2); }
    // 정리: 뷰어 기본 대지(잔디판·포장판·길)는 이 모형이 떠 있는 동안 숨기고(W.own과 같은 방식), 기본 life에는 사람만 받음 — 이 build의 지형·광장이 바닥
    { const root=K.bldg.parent, site=root&&root.children[0]; if(site&&site!==K.bldg&&site!==K.life&&site.isGroup){ const mk=new T.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible; const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; }
      const la=K.life.add.bind(K.life); K.life.add=(...o)=>{ o.forEach(m=>{ if(m&&m.material===K.M.people) la(m); }); return K.life; }; }
  }});
