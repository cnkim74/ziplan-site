__bsigFill({"parliamentau":function(K){
// 출처: 호주 의회교육처(PEO) 팩트시트 「Parliament House」 — 1988 개관(1980 착공), 미첼/주르골라 & 소프 설계(329개 응모작 중 당선), 곡면 벽 2개 각 460 m, 스테인리스 국기 게양대 81 m, 연면적 250,000 ㎡, 방 4,500·안뜰 17, 굴착 약 100만 ㎥ 흙을 지붕에 되덮어 잔디(사람이 걸어 오를 수 있음), 앞마당 모자이크 「Possum and Wallaby Dreaming」(마이클 넬슨 자가마라, 돌 9만 개 이상), 하원 초록·상원 빨강
// 추정: 건물 전체 약 300 × 432 m, 곡면 벽 반지름 380 m·벽 사이 최소 14 m·벽 높이 가운데 26 m에서 끝으로 낮아짐, 날개 높이 6~24 m, 게양대 네 다리 밑동은 곡면 벽 위 z=±40, 다리 모임점 +60 m, 그레이트 베란다 폭 76 m·높이 15 m, 앞마당 연못·붉은 자갈, 캐피털 서클 반지름 290 m·스테이트 서클 560 m, 옛 국회의사당 북쪽 약 1 km·호수 1.4 km
    const T=K.T; const put=(m,cast,grp)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (grp||K.cur||K.layer(0)).add(m); return m; };
    const inst=(geo,mat,items,cast,grp)=>{ if(!items.length) return null; const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),Eu=new T.Euler(0,0,0,'YXZ'); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); Eu.set(it[7]||0,it[3]||0,it[8]||0); Q.setFromEuler(Eu); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; return put(m,cast,grp); };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    // 월드 크기 UV 상자(질감이 늘어나지 않게): tm m마다 질감 한 장
    const tboxG=(w,h,d,tm)=>{ const g=new T.BoxGeometry(w,h,d); const uv=g.attributes.uv; const S=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]]; for(let f=0;f<6;f++) for(let i=0;i<4;i++){ const k=f*4+i; uv.setXY(k,uv.getX(k)*S[f][0]/tm,uv.getY(k)*S[f][1]/tm); } g.translate(0,h/2,0); return g; };
    const tb=(x,y,z,w,h,d,mat,tm,ry,grp,cast)=>{ const m=new T.Mesh(tboxG(w,h,d,tm||4),mat); m.position.set(x,y,z); if(ry) m.rotation.y=ry; return put(m,cast,grp); };
    // 다각형 프리즘: pts [[x,z]…], 바닥 y0, 윗면 높이 top(x,z)(숫자도 됨) — 옆면 UV는 둘레 길이/높이 기준
    const prism=(pts,y0,top,mat,tm,grp,cast)=>{ tm=tm||4; const tf=typeof top==='function'?top:()=>top; const n=pts.length; const P=[], U=[]; let cx=0,cz=0; pts.forEach(p=>{ cx+=p[0]/n; cz+=p[1]/n; });
      const tri=(a,b,c,ua,ub,uc,want)=>{ const ux=b[0]-a[0],uy=b[1]-a[1],uz=b[2]-a[2], vx=c[0]-a[0],vy=c[1]-a[1],vz=c[2]-a[2]; const nx=uy*vz-uz*vy, ny=uz*vx-ux*vz, nz=ux*vy-uy*vx; if(nx*want[0]+ny*want[1]+nz*want[2]<0){ [b,c]=[c,b]; [ub,uc]=[uc,ub]; } P.push(...a,...b,...c); U.push(...ua,...ub,...uc); };
      const tris=T.ShapeUtils.triangulateShape(pts.map(p=>new T.Vector2(p[0],p[1])),[]);
      tris.forEach(([i,j,k])=>{ const a=pts[i],b=pts[j],c=pts[k]; tri([a[0],tf(a[0],a[1]),a[1]],[b[0],tf(b[0],b[1]),b[1]],[c[0],tf(c[0],c[1]),c[1]],[a[0]/tm,a[1]/tm],[b[0]/tm,b[1]/tm],[c[0]/tm,c[1]/tm],[0,1,0]); tri([a[0],y0,a[1]],[b[0],y0,b[1]],[c[0],y0,c[1]],[0,0],[0,0],[0,0],[0,-1,0]); });
      let L=0; for(let i=0;i<n;i++){ const a=pts[i], b=pts[(i+1)%n]; const l=Math.hypot(b[0]-a[0],b[1]-a[1]); const ha=tf(a[0],a[1]), hb=tf(b[0],b[1]); const mx=(a[0]+b[0])/2-cx, mz=(a[1]+b[1])/2-cz; let ox=b[1]-a[1], oz=-(b[0]-a[0]); if(ox*mx+oz*mz<0){ ox=-ox; oz=-oz; } const w=[ox,0,oz]; const A0=[a[0],y0,a[1]],B0=[b[0],y0,b[1]],A1=[a[0],ha,a[1]],B1=[b[0],hb,b[1]]; const u0=L/tm,u1=(L+l)/tm; tri(A0,B0,B1,[u0,y0/tm],[u1,y0/tm],[u1,hb/tm],w); tri(A0,B1,A1,[u0,y0/tm],[u1,hb/tm],[u0,ha/tm],w); L+=l; }
      const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(P,3)); g.setAttribute('uv',new T.Float32BufferAttribute(U,2)); g.computeVertexNormals(); return put(new T.Mesh(g,mat),cast,grp); };
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
    const R=380, C0=387, TH=.605; // 곡면 벽 원 반지름·중심 거리·반각
    const CRM=K.col(0xd9cfbd,{roughness:.85}), CRM2=K.col(0xcfc4b0,{roughness:.88}), MAR=K.col(0xf1eee8,{roughness:.35}), GRAN=K.col(0xc9c1b4,{roughness:.7}), GLD=K.col(0x3d4c56,{roughness:.08,metalness:.7}), GLL=K.M.glass, SS=K.col(0xdfe4e8,{roughness:.22,metalness:.85}), GR=K.col(0x6f9a4a,{roughness:.95}), GR2=K.col(0x7ea457,{roughness:.95}), RED=K.col(0xa04f34,{roughness:.95}), PVc=K.col(0xd8d0c2,{roughness:.9}), DK=K.col(0x2b3035,{roughness:.6});
    const wallX=(z,s)=>s*(C0-Math.sqrt(R*R-z*z)); // s=-1 서쪽 벽 ')' 의 x(바깥면 기준 중심선), s=+1 동쪽
    const wallH=z=>{ const t=Math.min(1,Math.abs(Math.asin(Math.min(1,Math.abs(z)/R)))/TH); return 2+24*Math.pow(1-t*t,.7); };
    const grassH=(x,z)=>{ const ax=Math.max(0,(Math.abs(x)-8)/145), az=Math.abs(z)/232; return 4.5+19*Math.max(0,1-Math.pow(ax,1.25))*Math.max(0,1-az*az); };
    // ---- 0: 지상 기단(바닥판) — 건물 발자국 전체를 받치는 밝은 포장 ----
    K.layer(0); tb(0,-.05,0,312,.1,450,PVc,6);
    // 날개(동=하원, 서=상원): 1단 열주 테라스 + 2단 매스 + 잔디 지붕
    const wing=s=>{ const arc=[]; for(let i=0;i<=24;i++){ const th=-TH+2*TH*i/24, z=R*Math.sin(th); arc.push([wallX(z,s)+s*1.6,z]); } const pts=(s>0?arc:arc.slice().reverse()).concat([[s*150,s>0?205:-205],[s*150,s>0?-205:205]]);
      // 1단: 바깥 테두리 낮은 층(크림 프리캐스트) — 테두리만 6 m 두께 띠
      prism(pts,0,(x,z)=>grassH(x,z)-.45,CRM,5);
      prism(pts,0,(x,z)=>grassH(x,z),GR,8).castShadow=false; // 위에 얹힌 잔디(두께 .45)
      return pts; };
    const pE=wing(1), pW=wing(-1);
    // 날개 바깥면 창 띠 · 열주(인스턴스) — 동/서 끝면(x=±150)과 남북 끝면
    { const gl=[], col=[], cap=[];
      for(const s of [-1,1]){ for(let z=-200;z<=200;z+=4){ const h=grassH(s*150,z)-.45; gl.push([s*150.15,1.2,z,0,.2,Math.max(.5,h-2.4),3.4]); col.push([s*153.2,0,z+2,0,.9,5,.9]); }
        cap.push([s*153.2,5,0,0,2.2,.7,412]); }
      for(const s of [-1,1]) for(const zs of [-1,1]){ const x0=Math.min(Math.abs(wallX(zs*205,1)),150), x1=150; for(let x=x0+3;x<x1;x+=4){ const h=grassH(x,zs*205)-.45; gl.push([s*x,1.2,zs*(205.2),0,3.4,Math.max(.5,h-2.4),.2]); } }
      inst(boxG(1,1,1),GLD,gl,false); inst(boxG(1,1,1),MAR,col); inst(boxG(1,1,1),CRM2,cap); }
    // 회의장 지붕: 하원(동)·상원(서) — 잔디 위로 솟은 낮은 상자 + 높은 창(클리어스토리)
    for(const s of [-1,1]){ const x=s*78, y=grassH(78,0)-1.2; tb(x,y,0,46,1.6,40,CRM,5); tb(x,y+1.6,0,40,3.2,34,GLD,4); tb(x,y+4.8,0,44,1.1,38,CRM2,5); tb(x,y+5.9,0,30,1.4,24,K.col(0xb8c4c8,{roughness:.2,metalness:.5}),4); }
    // ---- 1: 가운데 척추(멤버스 홀·포이어·행정동) — 두 벽 사이 ----
    K.layer(1);
    { const pts=[]; for(let i=0;i<=20;i++){ const z=-200+400*i/20; pts.push([wallX(z,-1)+1.6,z]); } for(let i=20;i>=0;i--){ const z=-200+400*i/20; pts.push([wallX(z,1)-1.6,z]); }
      prism(pts.filter(p=>p[1]<=150&&p[1]>=-200),0,(x,z)=>z>-150?16:Math.max(5,grassH(x,z)),CRM,5);
      tb(0,16,0,10,1.6,280,GLL,4); for(let z=-138;z<=138;z+=6) tb(0,16,z,10.6,1.8,.35,SS,2); } // 척추 유리 지붕(멤버스 홀) + 리브
    // 그레이트 베란다(정면, +z): 흰 대리석 사각 기둥 2열 + 엔태블러처 + 유리 현관
    { const zf=150, W=Math.abs(wallX(zf,1))*2-4; tb(0,0,zf-6,W,15,6,CRM,5); tb(0,0,zf-2.8,W-6,12.6,.3,GLD,4); // 포이어 유리벽
      const it=[]; const n=15; for(let i=0;i<n;i++){ const x=-W/2+2+i*(W-4)/(n-1); if(Math.abs(x)<5) continue; it.push([x,0,zf+1.2,0,1.6,13,1.6]); it.push([x,0,zf+6.2,0,1.6,13,1.6]); }
      inst(boxG(1,1,1),MAR,it); tb(0,13,zf+3.5,W,2.2,8.6,MAR,4); tb(0,15.2,zf+1,W-6,.6,8,CRM2,4); tb(0,0,zf+3.5,W,.35,9,GRAN,4);
      tb(0,0,zf+5.5,10,12.6,.25,GLL,4); for(let x=-4;x<=4;x+=2) tb(x,0,zf+5.6,.12,12.6,.2,DK,2); }
    // ---- 2: 곡면 벽 두 개(화강석, 인스턴스 조각) ----
    K.layer(2);
    for(const s of [-1,1]){ const seg=[], cp=[]; const N=64; for(let i=0;i<N;i++){ const t0=-TH+2*TH*i/N, t1=t0+2*TH/N, tm=(t0+t1)/2; const z=R*Math.sin(tm), x=wallX(z,s); const L=R*(t1-t0)+.15; const h=wallH(z); const ry=s*tm-Math.PI/2; seg.push([x,0,z,ry,L,h,3]); cp.push([x,h,z,ry,L,.45,3.6]); }
      inst(boxG(1,1,1),GRAN,seg); inst(boxG(1,1,1),CRM2,cp); }
    // 벽 따라 오르는 잔디 경사로 가장자리 난간(가는 띠)
    { const rl=[]; for(const s of [-1,1]) for(let z=-196;z<=196;z+=6){ const x=wallX(z,s)+s*5; rl.push([x,grassH(x,z),z,0,.12,1.05,6.2]); } inst(boxG(1,1,1),SS,rl,false); }
    // ---- 3: 국기 게양대 — 곡면 벽 위 네 다리 → 한 점에서 모여 81 m ----
    K.layer(3);
    { const Y0=wallH(40), TOP=Y0+81, J=Y0+60; const legs=[]; for(const sx of [-1,1]) for(const sz of [-1,1]){ const bx=wallX(sz*40,sx), bz=sz*40; const dx=-bx, dy=J-Y0, dz=-bz; const L=Math.hypot(dx,dy,dz); const g=new T.CylinderGeometry(.55,1.1,L,10); const m=new T.Mesh(g,SS); m.position.set(bx+dx/2,Y0+dy/2,bz+dz/2); m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),new T.Vector3(dx/L,dy/L,dz/L)); put(m); tb(bx,Y0-.2,bz,4,1.2,4,GRAN,3); }
      K.c(0,J-3,0,1.2,4,SS,14); K.c(0,J,0,.55,TOP-J,SS,10,{r2:.35}); K.c(0,TOP,0,.8,.6,SS,10);
      // 국기(약 12.8 × 6.4 m): 청색 바탕 + 유니언 잭 + 별
      const cv=(typeof document!=='undefined')?document.createElement('canvas'):null; let mat=K.col(0x1f3f8f,{roughness:.8});
      if(cv){ cv.width=256; cv.height=128; const g=cv.getContext('2d'); g.fillStyle='#012169'; g.fillRect(0,0,256,128); g.save(); g.beginPath(); g.rect(0,0,128,64); g.clip(); g.strokeStyle='#fff'; g.lineWidth=13; g.beginPath(); g.moveTo(0,0); g.lineTo(128,64); g.moveTo(128,0); g.lineTo(0,64); g.stroke(); g.strokeStyle='#c8102e'; g.lineWidth=5; g.stroke(); g.fillStyle='#fff'; g.fillRect(52,0,24,64); g.fillRect(0,22,128,20); g.fillStyle='#c8102e'; g.fillRect(57,0,14,64); g.fillRect(0,27,128,10); g.restore(); g.fillStyle='#fff'; const star=(x,y,r)=>{ g.beginPath(); for(let i=0;i<14;i++){ const a=i*Math.PI/7-Math.PI/2, rr=i%2?r*.45:r; g.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr); } g.fill(); }; star(64,96,15); star(192,104,8); star(160,62,8); star(192,22,8); star(222,52,8); star(208,74,4);
        const tx=new T.CanvasTexture(cv); tx.encoding=T.sRGBEncoding; mat=new T.MeshStandardMaterial({map:tx,roughness:.8,side:T.DoubleSide}); }
      const fg=new T.PlaneGeometry(12.8,6.4,8,1); const p=fg.attributes.position; for(let i=0;i<p.count;i++){ const x=p.getX(i)+6.4; p.setZ(i,Math.sin(x*.45)*.7*(x/12.8)); } fg.computeVertexNormals(); const fl=new T.Mesh(fg,mat); fl.position.set(6.8,TOP-4.2,0); put(fl,false); }
    // ---- 배경(K.life): 앞마당(연못·모자이크·붉은 자갈), 캐피털 서클·스테이트 서클, 토지 축(페더레이션 몰)과 옛 국회의사당·벌리 그리핀 호수, 캔버라의 나무와 먼 산 — 배치 개략(추정) ----
    { W.lplane(W.solid(0x9fa77d),0,-.03,0,9000,9000); const LG=K.life; const ROAD=W.solid(0x5d5f61,{roughness:.9}), PV2=W.solid(0xd9d2c3), RG=W.solid(0x9a6a52), LAWN=W.solid(0x7f9f55), LAWN2=W.solid(0x8aa862);
      W.lpoly(LAWN,[[-330,-330],[330,-330],[330,330],[-330,330]],.01);
      const ring=(r,w,m,y)=>{ const g=new T.RingGeometry(r-w/2,r+w/2,96,1); g.rotateX(-Math.PI/2); g.translate(0,y,0); const me=new T.Mesh(g,m); me.receiveShadow=true; LG.add(me); };
      ring(290,14,ROAD,.05); ring(560,18,ROAD,.04);
      // 앞마당: 연못 + 가운데 모자이크(점묘 원) + 붉은 자갈 마당 + 축 보도
      W.lpoly(PV2,[[-60,160],[60,160],[70,300],[-70,300]],.06); W.lpoly(RG,[[-52,196],[-24,196],[-24,276],[-54,276]],.08); W.lpoly(RG,[[24,196],[52,196],[54,276],[24,276]],.08);
      W.lplane(W.WATER,0,.12,236,30,92); { const cv=(typeof document!=='undefined')?document.createElement('canvas'):null; let mm=W.solid(0xb07a4c); if(cv){ cv.width=cv.height=256; const g=cv.getContext('2d'); g.fillStyle='#8a5a3a'; g.fillRect(0,0,256,256); let s=7; const r=()=>{ s=(s*16807)%2147483647; return s/2147483647; }; for(const [cx,cy,rr,cl] of [[128,128,40,'#e8d9b8'],[128,128,24,'#3a2a20'],[60,70,22,'#e8d9b8'],[196,70,22,'#e8d9b8'],[60,190,22,'#e8d9b8'],[196,190,22,'#e8d9b8']]) for(let k=rr;k>2;k-=7){ for(let a=0;a<6.28;a+=.12){ g.fillStyle=k%14<7?cl:'#c46a3c'; g.beginPath(); g.arc(cx+Math.cos(a)*k,cy+Math.sin(a)*k,2.4,0,7); g.fill(); } } for(let i=0;i<2500;i++){ g.fillStyle=r()<.5?'#d6a46a':'#5a3a28'; g.fillRect(r()*256,r()*256,2,2); } const t=new T.CanvasTexture(cv); t.encoding=T.sRGBEncoding; mm=new T.MeshStandardMaterial({map:t,roughness:.9}); }
        const g=new T.CircleGeometry(12,40); g.rotateX(-Math.PI/2); const me=new T.Mesh(g,mm); me.position.set(0,.16,236); me.receiveShadow=true; LG.add(me); }
      // 토지 축: 페더레이션 몰(잔디 + 양옆 길) → 옛 국회의사당(흰 건물) → 호수 → 멀리 마운트 에인슬리
      W.lpoly(LAWN2,[[-60,300],[60,300],[70,1300],[-70,1300]],.03); W.lpoly(ROAD,[[-78,300],[-66,300],[-76,1300],[-88,1300]],.04); W.lpoly(ROAD,[[66,300],[78,300],[88,1300],[76,1300]],.04);
      W.city([[0,950,120,60,15,'#f1eee6',0,'n',null,0,0,0,1],[0,950,46,64,19,'#f6f4ee',0,'n',null,0,0,0,1],[-90,1180,60,30,12,'#d9d2c3',0,'p',null,0,0,0,1],[90,1180,60,30,12,'#d9d2c3',0,'p',null,0,0,0,1]]);
      W.lpoly(W.WATER,[[-2600,1420],[2600,1380],[2600,1900],[-2600,1960]],.1);
      E.forest(E.scatter(-1600,1600,-1600,1350,34,()=>0,(x,z)=>{ const r=Math.hypot(x,z); if(r<330) return false; if(Math.abs(x)<110&&z>150) return false; if(Math.abs(r-290)<12||Math.abs(r-560)<14) return false; return E.r()<.55; },()=>10+E.r()*7,0),{trunks:false});
      W.ring({r0:700,r1:1500,step:60,fill:.35,gp:0,keep:(x,z)=>!(Math.abs(x)<200&&z>0)&&!(z>1300),h:()=>6+E.r()*6,pal:['#d8d0c0','#c9a98c','#bfb5a5','#b37a5c'],roof:['#7a6f66',3,3]});
      E.terrain(-7000,7000,-7000,7000,70,70,(x,z)=>{ const r=Math.hypot(x,z); const base=E.ss((r-2200)/2500)*260*(.5+E.fbm(x*.0006,z*.0006,3)); return r<2000?-.5:base+E.peaks(x,z,[[-3300,-600,900,900,330,1.4],[0,4600,1300,900,280,1.4],[3400,-3000,1300,1200,300,1.5]]); },(x,z,h,ny)=>E.mcol(x,z,h,ny,{low:4,lowc:[.62,.64,.48]}),[-2000,2000,-2000,2000]);
      W.city([[-3300,-600,10,10,195,'#d8dde2',0,'n',null,0,0,318,1]]); }
    W.own(); W.sky(4500);
  }});
