__bsigFill({"barragan":function(K){
// 사실: 루이스 바라간 자택·작업실 · 1947 착공, 1948 완공 · 멕시코시티 타쿠바야, 헤네랄 프란시스코 라미레스 거리 12·14번지(필지 2개) · 남동향 거리 입면은 거리 선 위 거친 회반죽 콘크리트 · 입면에서 유일하게 튀어나온 것은 서재의 반투명 격자창 · 입면 왼쪽 위에 노랑·주황 면이 모서리를 이루고 흰 물탱크 탑이 실루엣 위로 솟음 · 북쪽 12번지 문은 작업실(낮은 볼륨), 14번지는 집 입구 · 옥상 색 담 테라스 · 뒤 정원 · 2004 유네스코 세계유산
// 출처: Casa Luis Barragán 공식 사이트 'La Casa'(주소·필지 2개·입면·서재 창·노랑/주황 면·흰 물탱크·12/14번지) · UNESCO WHC 1136
// 추정: 거리 입면 길이 28 m·높이 8.6 m(집)·5.6 m(작업실), 옥상 담 높이 3 m, 색(분홍·주황·노랑·흰)의 배치, 거실 십자 창 6 × 4.6 m, 정원 깊이 28 m, 이웃 집·거리 폭은 개략
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
    const PL=K.col(0xa59c8f,{roughness:1}), PL2=K.col(0xbdb4a6,{roughness:1}), WHT=K.col(0xefebe3,{roughness:.95}), PINK=K.col(0xd4588c,{roughness:.95}), ORG=K.col(0xe0782f,{roughness:.95}), YEL=K.col(0xe8bb3a,{roughness:.95}), TER=K.col(0xa8452f,{roughness:.95}), WOOD=K.col(0x5a3b22,{roughness:.8}), IRON=K.col(0x2a2a2a,{roughness:.6,metalness:.4}), DRK=K.col(0x22201e,{roughness:.9}), TEZ=K.col(0x7d4a3c,{roughness:1}), ASP=K.col(0x47494c,{roughness:.95}), SW=K.col(0xb5aea2,{roughness:.95}), LAWN=K.col(0x4f7034,{roughness:1}), STONE=K.col(0x5d5a55,{roughness:1});
    const GLT=K.col(0xe6e6dc,{roughness:.3,metalness:.1,transparent:true,opacity:.82,emissive:0x3a3a34,emissiveIntensity:.25}), GL=K.col(0x2f3a3e,{roughness:.04,metalness:.7,transparent:true,opacity:.7,depthWrite:false}); GL.side=T.DoubleSide;
    const ZF=9, H1=8.6, HS=5.6;
    // 거리 입면 구멍 뚫은 벽(평면 판에 사각 구멍) — x0..x1, 높이 0..h, 두께 t, holes [[x0,x1,y0,y1]]
    const wall=(x0,x1,h,z,t,mat,holes)=>{ const sh=new T.Shape(); sh.moveTo(x0,0); sh.lineTo(x1,0); sh.lineTo(x1,h); sh.lineTo(x0,h); sh.lineTo(x0,0); (holes||[]).forEach(([a,b,c,d])=>{ const p=new T.Path(); p.moveTo(a,c); p.lineTo(a,d); p.lineTo(b,d); p.lineTo(b,c); p.lineTo(a,c); sh.holes.push(p); }); const g=new T.ExtrudeGeometry(sh,{depth:t,bevelEnabled:false}); g.translate(0,0,z-t); return put(new T.Mesh(g,mat)); };
    // ================= 배경(K.life): 타쿠바야 거리·이웃 집·멕시코시티 시가·먼 산 =================
    LIFE(()=>{
      const MT=[[-1500,-3400,1600,700,700,1.4],[1900,-2600,900,800,500,1.4],[-3200,1200,700,900,400,1.4]];
      const hf=(x,z)=>-.02+E.peaks(x,z,MT)*E.ss((Math.hypot(x,z)-1500)/600);
      E.terrain(-3800,3800,-3800,3800,100,100,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.01,z*.01,2); if(h>60) return [.36+.05*n,.42+.05*n,.3]; return [.6+.04*n,.57+.04*n,.52]; });
      K.b(0,0,15,400,.03,8,ASP); K.b(0,0,10,400,.14,2,SW); K.b(0,0,20,400,.14,2,SW); // 길 · 양쪽 보도
      // 이웃 집(2~3층 회반죽, 색 제각각) — 이 집 양옆과 맞은편
      const pal=['#d8c7a4','#c9a98a','#d9b9b0','#bfb8aa','#e2d6bf','#b9a78f','#cdb7c4'];
      const nb=[]; for(let x=-200;x<200;x+=0){ const w=7+E.r()*8; const cx=x+w/2; x+=w; if(Math.abs(cx)<14+w/2) { if(cx<0) x=Math.max(x,-14); continue; } nb.push([cx,-6,w-.2,30,5+E.r()*5,pal[Math.floor(E.r()*pal.length)]]); }
      for(let x=-200;x<200;x+=0){ const w=7+E.r()*8; nb.push([x+w/2,30,w-.2,18,Math.abs(x)<60?3.2+E.r()*1:4.5+E.r()*6,pal[Math.floor(E.r()*pal.length)]]); x+=w; }
      for(let x=-1400;x<1400;x+=26) for(let z=-1400;z<1400;z+=26){ const xx=x+(E.r()-.5)*8, zz=z+(E.r()-.5)*8; if(Math.abs(zz-15)<40&&Math.abs(xx)<220) continue; if(zz<-38&&zz>-80&&Math.abs(xx)<60) continue; if(E.r()<.25) continue; nb.push([xx,zz,14+E.r()*8,14+E.r()*8,4+E.r()*(E.r()<.1?24:7),pal[Math.floor(E.r()*pal.length)]]); }
      E.blocks(nb);
      E.forest(E.scatter(-1400,1400,-1400,1400,30,hf,(x,z,h)=>E.r()<.25&&!(Math.abs(z-15)<20&&Math.abs(x)<220),(x,z,h)=>6+E.r()*5,(x,z,h)=>0),{trunks:false});
    });
    // ================= 0: 바닥판 · 정원(잔디·나무·화산석 길) · 정원 담 =================
    K.layer(0);
    K.b(0,-.2,-14.5,28,.2,47,K.col(0x8a8378,{roughness:1}));
    K.b(0,0,-24,27,.04,27,LAWN);
    { const gs=[]; for(let k=0;k<14;k++) gs.push(bx(-6+k*.9,.04,-11-k*1.6,.8,.04,.7)); merge(gs,STONE,false); }
    for(const [x,z] of [[-14,-24],[14,-24]]) K.b(x,0,z,.4,6,28,PL2); K.b(0,0,-38,28.4,6,.4,PL2);
    // 정원 나무(자카란다·활엽수, 무성하게) — 이 build 안 숲
    E.forest([[-9,0,-30,9,0,.3],[-3,0,-34,11,0,.6],[6,0,-31,10,0,.1],[10,0,-22,8,0,.8],[-10,0,-19,7,0,.5],[2,0,-24,6,0,.9],[-6,0,-26,5,1,.4],[8,0,-35,7,0,.2]].map(t=>[t[0],0,t[2],t[3],t[4],t[5],1.05]),{grp:K.cur,trunks:true,cast:true});
    // ================= 1: 거리 입면(회반죽) — 집(14번지)·작업실(12번지) =================
    K.layer(1);
    // 집 볼륨: 거리벽(서재 창·현관·차고문·작은 창) + 뒤·옆벽 + 지붕판
    wall(-6,14,H1,ZF,.45,PL,[[4.4,11.6,4.6,7.6],[1.2,2.6,0,2.6],[7.8,11.6,0,3.0],[-3.6,-2.6,5.4,6.6],[-1.4,-.4,5.4,6.6]]);
    K.b(4,0,-.5,20,H1,.4,PL); // 내부 칸 벽(층 구분 깊이감)
    K.b(14-.2,0,-.5,.4,H1,19,PL); K.b(-6+.2,0,-.5,.4,H1,19,PL);
    K.b(4,H1-.3,-.5,20,.3,19,PL2);
    // 정원 쪽 뒷면: 거실 십자 창(6 × 4.6 m) + 위층 창
    wall(-6,14,H1,-10+.45,.45,WHT,[[0,6,.4,5],[8,10,5.6,7.4]]);
    K.b(3,.4,-9.9,6,4.6,.05,GL); K.b(3,.4,-9.8,.22,4.6,.22,IRON); K.b(3,2.6,-9.8,6,.22,.22,IRON); K.b(9,5.6,-9.9,2,1.8,.05,GL);
    // 서재 반투명 격자창 — 입면에서 유일하게 튀어나옴
    { const x0=4.4, x1=11.6, y0=4.6, y1=7.6; K.b((x0+x1)/2,y0,ZF+.12,x1-x0,y1-y0,.08,GLT); const gs=[]; for(let i=0;i<=8;i++) gs.push(bx(x0+(x1-x0)*i/8,y0,ZF+.2,.09,y1-y0,.12)); for(let j=0;j<=4;j++) gs.push(bx((x0+x1)/2,y0+(y1-y0)*j/4,ZF+.2,x1-x0,.09,.12)); merge(gs,IRON,false); K.b((x0+x1)/2,y0-.18,ZF+.15,x1-x0+.4,.18,.4,PL2); }
    // 현관(나무 문) · 차고 문 · 작은 창 쇠창살
    K.b(1.9,0,ZF-.25,1.4,2.6,.1,WOOD); K.b(9.7,0,ZF-.25,3.8,3,.1,K.col(0x6b5b48,{roughness:.8}));
    { const gs=[]; for(const [a,b] of [[-3.6,-2.6],[-1.4,-.4]]){ for(let k=0;k<5;k++) gs.push(bx(a+(b-a)*k/4,5.4,ZF-.2,.04,1.2,.04)); K.b((a+b)/2,5.4,ZF-.3,b-a,1.2,.05,GL); } merge(gs,IRON,false); }
    // 작업실(12번지) — 낮은 볼륨 · 문 · 높은 창
    wall(-14,-6,HS,ZF,.45,PL,[[-12,-10.6,0,2.5],[-9,-7.2,3.6,4.8]]); K.b(-11.3,0,ZF-.25,1.4,2.5,.1,WOOD); K.b(-8.1,3.6,ZF-.3,1.8,1.2,.05,GL);
    K.b(-14+.2,0,-.5,.4,HS,19,PL); K.b(-10,HS-.3,-.5,8,.3,19,PL2); wall(-14,-6,HS,-10+.45,.45,WHT,[[-12,-8,.4,3.4]]); K.b(-10,.4,-9.9,4,3,.05,GL);
    // 작업실 지붕 위: 2층 뒤로 물러난 방(집 쪽에 붙음)
    K.b(-10,HS,-4,8,2.8,11,PL);
    // ================= 2: 옥상 테라스 색 담 · 흰 물탱크 탑 =================
    K.layer(2);
    K.b(0,H1,-3,10,.06,12,TEZ); // 테라스 바닥(붉은 화산석 타일)
    K.b(-5,H1,-3,.35,3.2,12,YEL); K.b(-2.5,H1,3,5,3.2,.35,ORG); // 왼쪽 위 노랑·주황 모서리(거리에서 보임)
    K.b(2.5,H1,3,5,3.2,.35,WHT); K.b(5,H1,-3,.35,3.2,12,PINK); K.b(0,H1,-9,10,3.2,.35,TER); K.b(1.2,H1,-5.4,.35,3.2,4.6,PINK);
    K.b(9,H1,-1,2.6,4.4,2.6,WHT); K.b(9,H1+4.4,-1,2.9,.18,2.9,WHT); // 흰 물탱크 탑
    K.b(11.5,H1,-6,3.6,2.4,4,PL); // 옥상 계단실
    { const gs=[]; for(const [x,z,w,d] of [[-5,-3,.35,12],[-2.5,3,5,.35],[2.5,3,5,.35],[5,-3,.35,12],[0,-9,10,.35]]) gs.push(bx(x,H1+3.2,z,w+.06,.08,d+.06)); merge(gs,PL2); }
    // 정리: 뷰어 기본 대지(잔디판·포장판·길)는 이 모형이 떠 있는 동안 숨기고(W.own과 같은 방식), 기본 life에는 사람만 받음 — 이 build의 지형·광장이 바닥
    { const root=K.bldg.parent, site=root&&root.children[0]; if(site&&site!==K.bldg&&site!==K.life&&site.isGroup){ const mk=new T.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible; const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; }
      const la=K.life.add.bind(K.life); K.life.add=(...o)=>{ o.forEach(m=>{ if(m&&m.material===K.M.people) la(m); }); return K.life; }; }
  }});
