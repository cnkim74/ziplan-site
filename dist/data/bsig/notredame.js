__bsigFill({"notredame":function(K){
// 출처: 길이 127 m·폭 48 m·탑 69 m·정면 폭 43.5 m·탑 없는 정면 높이 45 m·신랑 볼트 33 m·지붕 아래 43 m·측랑 폭 5.9·트리뷴 볼트 8 m·트랜셉트 48×14 m·장미창 서 9.7 m, 남북 13.1 m — notredamedeparis.fr(치수 페이지) · 첨탑 96 m(2024 복원) — 공개 자료 공통
// 추정: 신랑 외벽 폭 15.5·벽 상단 35·용마루 45(약 55° 납 지붕) · 트리뷴 블록 폭 28·높이 25 · 외측랑+예배당 블록 폭 40·높이 13.5 · 정면 블록 깊이 14 · 탑 13.5 각 · 플라잉 버트레스 신랑 6쌍(13 m 스팬) + 후진 9개(r 7.75→21.5) · 교차부 z=−3.5
    const T=K.T; const ST=K.col(0xd8cfbb,{roughness:.9}), STd=K.col(0xc6bca6,{roughness:.92}), STl=K.col(0xe6dfcc,{roughness:.85}), LD=K.col(0x6f7377,{roughness:.6,metalness:.2}), LDl=K.col(0x858a8f,{roughness:.55,metalness:.25}), DK=K.col(0x2a2622,{roughness:1}), GW=K.M.glassW, PV=K.M.pave, GS=K.M.grass, QY=K.col(0xbdb6a8,{roughness:.95}), WT=K.M.water, LF=K.M.leaf2, TRK=K.M.trunk;
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
      const WATER=solid(0x5b7f8c,{roughness:.32,metalness:.1});
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

    K.life.clear(); // 생성기가 미리 넣은 마당 나무 제거
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const inst=(geo,mat,items,cast)=>{ if(!items.length) return null; const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),E=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); E.set(it[7]||0,it[3]||0,it[8]||0,'YXZ'); Q.setFromEuler(E); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; return put(m,cast); };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    const triG=d=>{ const sh=new T.Shape(); sh.moveTo(-.5,0); sh.lineTo(.5,0); sh.lineTo(0,.75); sh.closePath(); const g=new T.ExtrudeGeometry(sh,{depth:d,bevelEnabled:false}); g.translate(0,0,-d/2); return g; };
    const LB=[],LT=[]; const lancet=(x,y,z,w,h,ry)=>{ LB.push([x,y,z,ry,w,h,1]); LT.push([x,y+h,z,ry,w,w,1]); }; // 첨두창 = 상자 + 뾰족 삼각(인스턴스 2 메시)
    const BR=[]; const but=(x,y,z,w,h,d,ry)=>BR.push([x,y,z,ry||0,w,h,d]); // 버트레스·필라스터(인스턴스)
    const PN=[]; const pinn=(x,y,z,s)=>PN.push([x,y,z,0,s||1,s||1,s||1]); // 소첨탑
    const SP=[]; // 장미창 살(중심 기준 상자, z축 회전)
    // 플라잉 버트레스: 로컬 x 0(신랑 벽 쪽, 높은 끝) → Lf(바깥 피어, 낮은 끝). 윗면 직선·아랫면 1/4 타원 아치
    const flyG=(Lf,drop,th)=>{ const sh=new T.Shape(); sh.moveTo(0,0); sh.lineTo(Lf,-drop); sh.lineTo(Lf,-drop-4.2); for(let i=1;i<=10;i++){ const t=i/10; sh.lineTo(Lf*(1-t),-drop-4.2+(drop+4.2-1.5)*Math.sin(t*Math.PI/2)); } sh.lineTo(0,-1.5); sh.closePath(); const g=new T.ExtrudeGeometry(sh,{depth:th,bevelEnabled:false}); g.translate(0,0,-th/2); return g; };
    const FZ=63.5, ZC=-3.5, ZA=-44, NW=15.5, NH=35, RID=45, TB=25, AH=13.5;
    K.layer(0);
    // 대지: 시테섬 포장·앞 광장(파르비)·강변 둑·동쪽 정원
    K.b(0,-.04,0,120,.04,210,PV); K.b(0,0,86,80,.08,40,STl); K.b(0,0,-78,100,.06,30,GS);
    for(const [x,z] of [[-30,-70],[-14,-80],[12,-82],[30,-72],[-36,-40],[36,-40],[-40,10],[40,10],[-40,40],[40,40]]){ K.c(x,0,z,.3,4.5,TRK,6); const s=new T.Mesh(new T.SphereGeometry(3.4,9,7),LF); s.position.set(x,6.8,z); put(s); }
    // 몸체: 외측랑+예배당(40×13.5) · 트리뷴(28×25) · 신랑(15.5×35) · 트랜셉트(48×14×35) · 후진(반원 3겹)
    K.b(0,0,(FZ-14+ZA)/2,40,AH,FZ-14-ZA,ST); K.b(0,0,(FZ-14+ZA)/2,28,TB,FZ-14-ZA,ST); K.b(0,0,(FZ-14+ZA)/2,NW,NH,FZ-14-ZA,ST);
    K.b(0,0,ZC,48,NH,14,ST);
    K.c(0,0,ZA,20,AH,ST,32); K.c(0,0,ZA,14,TB,ST,28); K.c(0,0,ZA,NW/2,NH,ST,20);
    for(const y of [AH-.6,TB-.6,NH-.6]) K.b(0,y,(FZ-14+ZA)/2,(y<14?40:y<26?28:NW)+.5,.6,FZ-14-ZA+.5,STl); // 코니스
    // 버트레스 피어(측랑 바깥, 예배당 사이) + 플라잉 버트레스 신랑 6쌍 + 피너클
    const FG=flyG(13.25,9,1.0); const FL=[]; const NZ=[8,16,24,32,40,48];
    for(const s of [-1,1]) for(const z of NZ){ but(s*21,0,z,2.4,AH+11,2.6); but(s*14.6,TB,z,1.2,NH-TB-2,2.0); FL.push([s*(NW/2),NH-1.2,z,s>0?0:Math.PI]); pinn(s*21,AH+11,z,1.3); if(z<48) lancet(s*(NW/2+.05),TB+1,z+4,3.2,6.5,Math.PI/2*s); if(z<48) lancet(s*14.05,AH+1,z+4,2.8,7,Math.PI/2*s); if(z<48) lancet(s*20.05,3,z+4,3.4,6.5,Math.PI/2*s); }
    // 후진 플라잉 버트레스 9개(부채): 피어 r 21.5 → 신랑 벽 r 7.75, 성가대 직선부 2쌍
    const FGa=flyG(13.75,10,1.0); for(let i=0;i<=8;i++){ const a=i*Math.PI/8; const dx=Math.cos(a), dz=-Math.sin(a); but(21.5*dx,0,ZA+21.5*dz,2.4,AH+10,2.4,a); pinn(21.5*dx,AH+10,ZA+21.5*dz,1.3); FL.push([NW/2*dx,NH-1.2,ZA+NW/2*dz,a,1,1,1]); if(i<8){ const b=a+Math.PI/16; lancet(14.05*Math.cos(b),AH+1,ZA-14.05*Math.sin(b),2.6,7,Math.PI/2+b); lancet(20.05*Math.cos(b),3,ZA-20.05*Math.sin(b),3.0,6.5,Math.PI/2+b); lancet((NW/2+.05)*Math.cos(b),TB+1,ZA-(NW/2+.05)*Math.sin(b),2.6,6.5,Math.PI/2+b); } }
    for(const s of [-1,1]) for(const z of [-20,-32]){ but(s*21,0,z,2.4,AH+11,2.6); but(s*14.6,TB,z,1.2,NH-TB-2,2.0); FL.push([s*(NW/2),NH-1.2,z,s>0?0:Math.PI]); pinn(s*21,AH+11,z,1.3); lancet(s*(NW/2+.05),TB+1,z+6,3.2,6.5,Math.PI/2*s); lancet(s*14.05,AH+1,z+6,2.8,7,Math.PI/2*s); lancet(s*20.05,3,z+6,3.4,6.5,Math.PI/2*s); }
    inst(FG,STd,FL.filter(f=>f.length===4)); inst(FGa,STd,FL.filter(f=>f.length>4));
    // 트랜셉트 끝(남북): 장미창 13.1 m + 아래 문 + 박공, 모서리 버트레스
    for(const s of [-1,1]){ const x=s*24; const rose=new T.Mesh(new T.CylinderGeometry(6.55,6.55,.4,40),DK); rose.rotation.z=Math.PI/2; rose.position.set(x+s*.1,24,ZC); put(rose,false); const rim=new T.Mesh(new T.CylinderGeometry(7.4,7.4,.3,40),STl); rim.rotation.z=Math.PI/2; rim.position.set(x,24,ZC); put(rim,false); for(let k=0;k<8;k++) SP.push([x+s*.25,24,ZC,Math.PI/2,.3,13.2,.4,0,k*Math.PI/8]); K.b(x+s*.1,0,ZC,.3,10,5,DK); K.pedim(x+s*.2,24+7.6,ZC,.6,3.4,14,ST,0); for(const sz of [-1,1]) but(x,0,ZC+sz*6.2,2.6,NH-1,2.4); }
    // 서쪽 정면 블록(깊이 14): 탑 2(13.5각 69 m)·중앙 45 m·버트레스 4·문 3·왕의 회랑·장미창·열주 회랑·종루 창
    K.b(0,0,FZ-7,43.5,45,14,ST); for(const s of [-1,1]) K.b(s*15,0,FZ-7,13.5,69,14,ST);
    for(const s of [-1,1]) for(const x of [21.2,8.2]){ but(s*x,0,FZ+.3,2.4,45,1.6); but(s*x,45,FZ+.1,1.8,24,1.2); } for(const s of [-1,1]) for(const z of [FZ-13.8,FZ-7]) but(s*22,0,z,1.6,69,2.4);
    { const pt=(x,y,w,h)=>{ K.b(x,y,FZ+.12,w+2.4,h,.5,STd); K.b(x,y,FZ+.3,w+1.2,h-.8,.5,STd); K.b(x,y,FZ+.45,w,h-1.5,.4,DK); K.pedim(x,y+h-1.5,FZ+.45,w,w*.55,.4,DK,0); K.pedim(x,y+h-.8,FZ+.3,w+1.2,(w+1.2)*.55,.5,STd,0); K.pedim(x,y+h,FZ+.12,w+2.4,(w+2.4)*.55,.5,STd,0); }; pt(0,0,7,12); pt(-15,0,5.5,10); pt(15,0,5.5,10); }
    K.b(0,19.5,FZ+.2,43.5,4.2,.6,STd); inst(boxG(.9,3.2,.7),STl,(()=>{ const a=[]; for(let i=0;i<28;i++) a.push([-20.3+i*1.504,20,FZ+.7]); return a; })()); // 왕의 회랑(28상)
    K.b(0,24,FZ+.2,43.5,.6,.8,STl);
    { const rose=K.c(0,25.15,FZ+.3,4.85,.4,DK,40,{axis:'z'}); const rim=K.c(0,24.3,FZ+.1,5.7,.4,STl,40,{axis:'z'}); for(let k=0;k<8;k++) SP.push([0,30,FZ+.55,0,.35,9.8,.3,0,k*Math.PI/8]); } // 서쪽 장미창 9.7 m + 살
    for(const s of [-1,1]){ lancet(s*15,25.5,FZ+.3,4.4,9,0); K.b(s*15,25,FZ+.15,6,.5,.6,STl); }
    K.b(0,38.5,FZ+.2,43.5,.8,1.2,STl); inst(new T.CylinderGeometry(.28,.28,5.2,8).translate(0,2.6,0),STl,(()=>{ const a=[]; for(let i=0;i<=28;i++) a.push([-21+i*1.5,39.3,FZ+.6]); return a; })()); K.b(0,44.5,FZ+.2,43.5,.9,1.4,STl); // 열주 회랑 45 m
    for(const s of [-1,1]) for(let q=0;q<4;q++){ const a=q*Math.PI/2, nx=Math.sin(a), nz=Math.cos(a); for(const sx of [-1,1]){ const lx=sx*3.0; lancet(s*15+nx*7.15+Math.cos(a)*lx,48,FZ-7+nz*7.15-Math.sin(a)*lx,2.6,13,a); } } // 종루 창(4면 2개씩)
    for(const s of [-1,1]){ K.b(s*15,68.5,FZ-7,14.3,.8,14.8,STl); for(const sx of [-1,1]) for(const sz of [-1,1]) K.b(s*15+sx*6.6,69,FZ-7+sz*6.6,1.2,2.4,1.2,STd); }
    inst(boxG(1,1,1),STd,BR); inst(boxG(1,1,.16),GW,LB); inst(triG(.16),GW,LT); inst(new T.ConeGeometry(.8,3.2,4).translate(0,1.6,0),STd,PN); inst(new T.BoxGeometry(1,1,1),STl,SP,false);
    K.layer(1);
    // 지붕(납): 신랑·성가대 박공 + 트랜셉트 박공 + 측랑/트리뷴 경사 + 후진 원뿔 + 예배당 링
    K.roofGable(0,NH,(FZ-14+ZA)/2,NW+1.2,FZ-14-ZA+.4,RID-NH,LD); K.roofGable(0,NH,ZC,48.6,14.6,RID-NH,LD,'x');
    for(const s of [-1,1]){ K.b(s*(NW/2+6.4),TB-.2,(FZ-14+ZA)/2,FZ-14-ZA+.4,.35,12.6,LDl,Math.PI/2,{slope:-.42*s}); K.b(s*(14+3.1),AH-.2,(FZ-14+ZA)/2,FZ-14-ZA+.4,.35,6.2,LDl,Math.PI/2,{slope:-.5*s}); }
    K.c(0,NH,ZA,NW/2+.6,RID-NH,LD,20,{r2:.2}); K.c(0,TB-.2,ZA,14.3,5.5,LDl,28,{r2:NW/2+.3}); K.c(0,AH-.2,ZA,20.3,3.2,LDl,32,{r2:14});
    K.b(0,RID-.3,(FZ-14+ZA)/2,.5,.9,FZ-14-ZA,LDl); // 용마루 장식 띠
    K.layer(2);
    // 첨탑 96 m(2024 복원): 팔각 납 첨탑 + 기단 + 모서리 소첨탑 + 십자가
    K.c(0,RID-1,ZC,5.4,4.5,LDl,8); K.c(0,RID+3.5,ZC,4.6,96-RID-3.5-2,LD,8,{r2:.12}); for(let q=0;q<8;q++){ const a=q*Math.PI/4; K.c(Math.cos(a)*5.2,RID+3,ZC+Math.sin(a)*5.2,.5,3.8,LDl,6,{r2:.05}); } K.b(0,94,ZC,.3,3.2,.3,STl); K.b(0,95.4,ZC,1.5,.3,.3,STl);
  
    // 배경(v13, K.life): 시테섬과 센강 — +z=서(정면 파르비), +x=남(좌안), −x=북(우안), −z=동(섬 끝·생루이섬). 강물은 둑보다 약 6 m 아래, 돌 둑벽·다리 4·강변 플라타너스, 오스만 블록(크림색 석회암 + 회색 아연 망사르드 지붕), 북쪽 오텔디외, 남쪽 강 건너 르네 비비아니 광장 · 배치는 개략(추정)
    W.own();
    { const QW=W.solid(0xc4b9a2,{roughness:.95}), LAND=W.solid(0xcdc5b5), PARV=W.solid(0xd8d0bf), RIV=W.solid(0x56737c,{roughness:.15,metalness:.1}), DKA=W.solid(0x4c4a46), GRASS=W.solid(0x8ea56d);
      const wy=-6; W.lplane(RIV,0,wy,0,6000,6000).receiveShadow=false;
      const wall=(x0,z0,x1,z1)=>{ const L=Math.hypot(x1-x0,z1-z0); const g=new T.BoxGeometry(L,-wy+.3,2); g.rotateY(-Math.atan2(z1-z0,x1-x0)); g.translate((x0+x1)/2,wy+(-wy+.3)/2-.3,(z0+z1)/2); const m=new T.Mesh(g,QW); m.receiveShadow=true; K.life.add(m); };
      const isle=[[62,1200],[62,-120],[40,-190],[0,-225],[-60,-232],[-120,-215],[-160,-170],[-170,-100],[-170,1200]]; W.lpoly(LAND,isle,-.02); for(let i=0;i<isle.length-1;i++) wall(isle[i][0],isle[i][1],isle[i+1][0],isle[i+1][1]); // 시테섬 + 둑
      W.lpoly(PARV,[[60,63],[60,200],[-60,200],[-60,63]],.06); // 파르비(앞 광장)
      W.lplane(LAND,1615,-.02,0,3000,6000); wall(115,-3000,115,3000); W.lplane(LAND,-1775,-.02,0,3000,6000); wall(-275,-3000,-275,3000); // 좌안 · 우안
      const sl=[[40,-280],[40,-1400],[-150,-1400],[-150,-280],[-90,-255],[-20,-255]]; W.lpoly(LAND,sl,-.02); for(let i=0;i<sl.length;i++) wall(sl[i][0],sl[i][1],sl[(i+1)%sl.length][0],sl[(i+1)%sl.length][1]); // 생루이섬
      const bridge=(x0,x1,z,w)=>{ const L=x1-x0; const d=new T.Mesh(new T.BoxGeometry(L,1.4,w),QW); d.position.set((x0+x1)/2,-.7,z); d.castShadow=true; d.receiveShadow=true; K.life.add(d); const u=new T.Mesh(new T.BoxGeometry(L-6,3.2,w-.6),DKA); u.position.set((x0+x1)/2,-3,z); K.life.add(u); for(const t of [.33,.67]){ const p=new T.Mesh(new T.BoxGeometry(5,-wy,w+1),QW); p.position.set(x0+L*t,wy/2,z); K.life.add(p); } for(const s of [-1,1]){ const r=new T.Mesh(new T.BoxGeometry(L,1.1,.5),QW); r.position.set((x0+x1)/2,.55,z+s*(w/2-.25)); K.life.add(r); } };
      bridge(62,115,100,20); bridge(62,115,-80,14); bridge(-275,-170,170,22); bridge(-30,-30+1,-240,1); // 오 두블·아르슈베셰·아르콜
      { const d=new T.Mesh(new T.BoxGeometry(16,1.4,50),QW); d.position.set(-40,-.7,-252); K.life.add(d); } // 생루이 다리
      // 강변 플라타너스 · 동쪽 장 23세 광장 · 좌안 르네 비비아니 광장
      const tr=[]; for(let z=-1400;z<1400;z+=12){ if(Math.abs(z-100)>14) tr.push([122,0,z,11+E.r()*3,0]); tr.push([-282,0,z,11+E.r()*3,0]); } for(let z=-140;z<1100;z+=13) if(z<-70||z>210) tr.push([55,0,z,9+E.r()*3,0]);
      for(const it of E.scatter(-150,40,-200,-75,15,()=>0,(x,z)=>Math.hypot(x+55,z+70)>30,()=>10+E.r()*4,0)) tr.push(it); for(const it of E.scatter(130,235,10,260,13,()=>0,(x,z)=>x>175||z<60,()=>10+E.r()*4,0)) tr.push(it);
      E.forest(tr,{trunks:true}); W.lpoly(GRASS,[[-150,-200],[40,-200],[40,-90],[-150,-90]],.12); W.lpoly(GRASS,[[128,20],[235,20],[235,250],[128,250]],.12);
      // 오스만 블록: 6~7층(약 21 m) + 망사르드 지붕
      const pal=['#e8dfcb','#e2d7c0','#ddd1b8','#efe7d6','#e5dac4']; const RF=['#6f767e',6,3.2];
      W.ring({cx:700,cz:0,r0:0,r1:1500,step:44,fill:.85,keep:(x,z)=>x>135&&!(x<245&&z>0&&z<280),h:()=>19+E.r()*5,pal,roof:RF}); // 좌안(라탱 지구)
      W.ring({cx:-900,cz:0,r0:0,r1:1500,step:44,fill:.85,keep:(x,z)=>x<-295,h:()=>19+E.r()*5,pal,roof:RF}); // 우안
      W.ring({cx:-55,cz:-700,r0:0,r1:700,step:30,fill:.9,keep:(x,z)=>x>-140&&x<30&&z<-290,h:()=>17+E.r()*4,pal,roof:RF}); // 생루이섬
      W.city([[-110,135,100,120,20,'#ddd2bb',0,'p','#6c727a',7,4],[-110,-40,80,90,17,'#e3d9c4',0,'p','#6c727a',5,3],[0,520,150,140,22,'#ddd2bb',0,'p','#6c727a',6,4]]); // 오텔디외·노트르담 북쪽 옛 참사회 거리·경시청(개략)
      W.ring({cx:0,cz:800,r0:0,r1:500,step:40,fill:.85,keep:(x,z)=>z>600&&x>-160&&x<55,h:()=>18+E.r()*4,pal,roof:RF}); } // 섬 서쪽(팔레 드 쥐스티스 쪽)
    W.sky(1800);
  }});
