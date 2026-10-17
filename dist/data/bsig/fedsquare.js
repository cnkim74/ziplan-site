__bsigFill({"fedsquare":function(K){
// 출처: 영문 위키백과 「Federation Square」 — 2002.10.26 개장, 3.2 ha, LAB 아키텍처 스튜디오 + 베이츠 스마트, 조경 Karres en Brands, 외피 재료 6종(아연·타공 아연·유리·불투명 유리·사암·무피복)을 핀휠 타일링 위장 무늬로, 아트리움 구조·유리도 핀휠, 광장 황토색 사암 블록 47만 개(서호주), 플린더스·스완스턴 모퉁이 철로 위, 맞은편 플린더스 스트리트역·세인트폴 대성당, 세 샤드(동·남 금속 슬롯, 서 유리 — 2000년 워커 보고서로 8 m 이하 권고), ACMI는 플린더스 거리 쪽 앨프리드 디킨 동, NGV 이언 포터 센터는 동쪽
// 추정: 좌표 x 동·z 남(+z 야라강), 각 동 높이 14~24 m, 샤드 높이(동 34·남 28·서 9 m), 아트리움 폭 18 m·높이 18 m, 광장 경사 3.5 m, 역·성당·다리 위치와 크기, 강 폭
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
      const pads=(PD,ry)=>{ if(!PD.length) return; const P=new Float32Array(PD.length*18), C=new Float32Array(PD.length*18), N=new Float32Array(PD.length*18); const c=new TT.Color(); const cs=Math.cos(ry), sn=Math.sin(ry); const PV=['#aaa498','#b4aea2','#a39e94','#bbb5a9','#aea99f'], PK=['#6f8d4d','#7b9858','#66844a']; PD.forEach(([x,z,hw,y,park],i)=>{ c.set(park?PK[i%3]:PV[(i*7)%5]).convertSRGBToLinear(); const Y=y+.09; const q=[[-hw,hw],[hw,hw],[hw,-hw],[-hw,hw],[hw,-hw],[-hw,-hw]]; q.forEach((v,k)=>{ const o=i*18+k*3; P[o]=x+v[0]*cs+v[1]*sn; P[o+1]=Y; P[o+2]=z-v[0]*sn+v[1]*cs; N[o+1]=1; C[o]=c.r; C[o+1]=c.g; C[o+2]=c.b; }); }); const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(C,3)); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:.95})); m.receiveShadow=true; K.life.add(m); }; // v18i: 블록 보도·필지 판 — 사이 바닥이 길로 읽히게
      const ring=(o)=>{ const L=[], PDs=[]; const st=o.step||50, cs=Math.cos(o.ry||0), sn=Math.sin(o.ry||0); for(let a=-o.r1;a<o.r1;a+=st) for(let b=-o.r1;b<o.r1;b+=st){ const x0=a+(E.r()-.5)*st*.25, z0=b+(E.r()-.5)*st*.25; const x=(o.cx||0)+x0*cs+z0*sn, z=(o.cz||0)-x0*sn+z0*cs; const r=Math.hypot(x0,z0); if(r<o.r0||r>o.r1) continue; if(o.keep&&!o.keep(x,z,r)) continue; if(o.clr&&x>-o.clr*.12&&z>-o.clr*.12&&Math.hypot(x,z)<o.clr) continue; if(o.pads!==false){ const px=(o.cx||0)+a*cs+b*sn, pz=(o.cz||0)-a*sn+b*cs; PDs.push([px,pz,st*.41,o.hy?o.hy(px,pz):0,E.r()<.12]); } if(E.r()>(o.fill||.65)) continue;
          const tall=o.tall&&E.r()<o.tall[0]; const gl=tall||E.r()<(o.gp||0); const w=st*(.45+E.r()*.35), d=st*(.45+E.r()*.35); const h=tall?o.tall[1]+E.r()*o.tall[2]:o.h(r,x,z); const pal=gl?(o.gpal||['#b7c5cf','#a3b4c0','#c3cdd4']):o.pal; const rf=!gl&&o.roof?o.roof:null; L.push([x,z,w,d,h,pal[Math.floor(E.r()*pal.length)],o.ry||0,gl?'g':(o.kind||'p'),rf?rf[0]:null,rf?rf[1]:0,rf?rf[2]:0,o.hy?o.hy(x,z):0]); } const out=city(L); pads(PDs,o.ry||0); return out; };
      // 맨해튼 격자: x 방향 블록 길이 bx(애비뉴 간격), z 방향 by(스트리트 간격), 블록마다 남북 두 줄로 필지를 나눔 — o={x0,x1,z0,z1,bx,bz,aw,sw,skip(x,z,w,d)→bool, h(x,z)→높이, pal, gpal, gp}
      const manh=(o)=>{ const L=[]; const bx=o.bx||260, bz=o.bz||80, aw=o.aw||30, sw=o.sw||18; for(let X=o.x0;X<o.x1;X+=bx) for(let Z=o.z0;Z<o.z1;Z+=bz){ const W0=bx-aw, D0=bz-sw; for(const row of [-1,1]){ let x=X-W0/2; while(x<X+W0/2-4){ const w=Math.min(X+W0/2-x,10+E.r()*E.r()*45); const cx=x+w/2, cz=Z+row*D0/4, d=D0/2-(E.r()<.3?E.r()*8:0); x+=w; if(o.skip&&o.skip(cx,cz,w,d)) continue; const h=o.h(cx,cz); if(h<=0) continue; const gl=h>110&&E.r()<(o.gp===undefined?.5:o.gp); const pal=gl?(o.gpal||['#a9b8c3','#9aabb7','#bcc6cc']):(o.pal||['#cbbfa8','#b9a993','#a38f7a','#d8d0c0','#9c8f84','#c4b49c']); L.push([cx,cz+(row>0?-(D0/2-d)/2:(D0/2-d)/2),w-.6,d,h,pal[Math.floor(E.r()*pal.length)],0,gl?'g':'p']); } } } return city(L); };
      // 뷰어의 일반 대지(잔디판·포장판·길·차선)를 이 모형이 떠 있는 동안만 숨김 — site 자식의 visible을 getter로 바꿔(life가 보일 때 false) 첫 프레임·썸네일에서도 적용, 'site' 단계처럼 life가 꺼지면 원래대로 보이고, 다른 모형으로 바뀌면(표식이 life에서 빠지면) 자동으로 원상
      const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
        const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
      return {sky,lplane,lpoly,solid,WATER,city,grid,ring,manh,own}; })();
    const R=(()=>{ let s=1234; return ()=>{ s=(s*16807)%2147483647; return s/2147483647; }; })();
    // 핀휠 외피 질감: 1:2 직각삼각형을 꼭짓점 수선으로 계속 쪼갬(자기 닮음) — 재료 5종 색 + 어두운 줄눈. 512 px = 12 m
    const pin=(key,wt)=>E.tex(key,512,(g,N,rr)=>{ const PAL=[['#c7a273',wt[0]],['#7c8389',wt[1]],['#a6abaf',wt[2]],['#3f5561',wt[3]],['#c7d0d3',wt[4]]]; const tot=PAL.reduce((a,p)=>a+p[1],0); const pick=()=>{ let t=rr()*tot; for(const p of PAL){ t-=p[1]; if(t<=0) return p[0]; } return PAL[0][0]; };
      g.fillStyle='#3a3c3e'; g.fillRect(0,0,N,N);
      const draw=(A,B,C,d)=>{ // A 직각 꼭짓점, BC 빗변
        if(d<=0||(d<2&&rr()<.35)){ g.fillStyle=pick(); g.beginPath(); g.moveTo(A[0],A[1]); g.lineTo(B[0],B[1]); g.lineTo(C[0],C[1]); g.closePath(); g.fill(); g.strokeStyle='rgba(30,32,34,.85)'; g.lineWidth=1.6; g.stroke(); return; }
        const bx=C[0]-B[0], by=C[1]-B[1]; const t=((A[0]-B[0])*bx+(A[1]-B[1])*by)/(bx*bx+by*by); const H=[B[0]+bx*t,B[1]+by*t]; draw(H,A,B,d-1); draw(H,C,A,d-1); };
      const S=N/4; for(let j=0;j<4;j++) for(let i=0;i<2;i++){ const x=i*2*S, y=j*S; const o=(i+j)%2; const p=[[x,y],[x+2*S,y],[x+2*S,y+S],[x,y+S]]; if(o){ draw(p[1],p[0],p[2],4); draw(p[3],p[2],p[0],4); } else { draw(p[0],p[3],p[1],4); draw(p[2],p[1],p[3],4); } } });
    const pmat=(key,wt)=>{ const t=pin(key,wt); const m=new T.MeshStandardMaterial({map:t,roughness:.68,metalness:.12}); return m; };
    const SKIN=pmat('fedPinA',[4,3,2,2,1]), SKIN2=pmat('fedPinB',[6,2,1,1,1]), SKIN3=pmat('fedPinC',[1,4,3,1,1]), SKING=pmat('fedPinG',[0,1,0,6,3]), ROOFP=pmat('fedPinR',[0,5,3,1,0]);
    const ROOF=K.col(0x7d8186,{roughness:.6,metalness:.4}), GL=K.M.glass, GW=K.col(0x50626c,{roughness:.08,metalness:.65}), STL=K.col(0x8b9095,{roughness:.4,metalness:.7}), DK=K.col(0x2d3135,{roughness:.6}), SCR=K.col(0x1a2733,{roughness:.3,emissive:0x203a55});
    const PAVE=(()=>{ const t=E.tex('fedPave',512,(g,N,rr)=>{ g.fillStyle='#8f6a45'; g.fillRect(0,0,N,N); const s=16; for(let y=0;y<N;y+=s) for(let x=-(y/s%2)*s/2;x<N;x+=s*1.5){ const k=rr(); g.fillStyle=k<.3?'#c99a63':k<.6?'#b88751':k<.85?'#d4a873':'#a8794a'; g.fillRect(x+1,y+1,s*1.5-2,s-2); } }); const m=new T.MeshStandardMaterial({map:t,roughness:.9}); return m; })();
    // 패널 들임(질감 반복) — 프리즘 + 안으로 살짝 들인 지붕판
    const inset=(pts,d)=>{ const n=pts.length; let cx=0,cz=0; pts.forEach(p=>{ cx+=p[0]/n; cz+=p[1]/n; }); return pts.map(p=>{ const dx=p[0]-cx, dz=p[1]-cz, L=Math.hypot(dx,dz)||1; return [p[0]-dx/L*d,p[1]-dz/L*d]; }); };
    const vol=(pts,top,mat)=>{ prism(pts,0,top,mat,6); const tf=typeof top==='function'?top:()=>top; const mn=Math.min(...pts.map(p=>tf(p[0],p[1]))); prism(inset(pts,.5),mn-1.2,(x,z)=>tf(x,z)+.12,ROOFP,8); };
    // ---- 0: 데크·광장(기울어진 사암 광장, 스완스턴 모퉁이 0 → 남동 +3.5 m) ----
    K.layer(0);
    const plazaH=(x,z)=>Math.max(0,Math.min(3.5,((x+110)*.018+(z+40)*.02)));
    tb(-20,-.4,0,250,.4,170,K.col(0x8a8580,{roughness:.9}),6);
    prism([[-112,-44],[22,-44],[22,56],[-62,56],[-112,6]],-.2,(x,z)=>plazaH(x,z)+.05,PAVE,14);
    for(let i=0;i<5;i++) tb(-70+i*7,plazaH(-70+i*7,40),48,6,.5,6,K.col(0xb48a5a,{roughness:.9}),4); // 광장 남쪽 낮은 단(앉음턱)
    // ---- 1: ACMI·SBS(앨프리드 디킨 동, 플린더스 거리 쪽) + 동쪽 금속 샤드 ----
    K.layer(1);
    vol([[-82,-80],[-24,-80],[-24,-47],[-60,-44],[-82,-50]],(x,z)=>15+(x+82)*.06+(z+80)*.05,SKIN);
    vol([[-24,-80],[20,-80],[20,-46],[-24,-47]],(x,z)=>19-(x+24)*.05+(z+80)*.08,SKIN3);
    { const sh=[[2,-82],[18,-82],[20,-62],[8,-58]]; prism(sh,0,(x,z)=>22+(20-x)*.7+(z+82)*.25,SKIN3,6); const sl=[]; for(let k=0;k<7;k++) sl.push([3+k*2.1,16+k*1.8,-82.1,0,.7,6,.3]); inst(boxG(1,1,1),DK,sl,false); }
    tb(-8,7,-46.6,16,8,.6,SCR,4); tb(-8,6.5,-46.2,17,.5,1.2,STL,2); // 광장을 향한 대형 스크린
    // ---- 2: 아트리움(유리·철골 실내 거리) ----
    K.layer(2);
    { const x0=22,x1=40,z0=-80,z1=50,H=18; tb((x0+x1)/2,0,(z0+z1)/2,x1-x0,H,z1-z0,GL,8,0,null,false); tb((x0+x1)/2,0,(z0+z1)/2,x1-x0-4,.3,z1-z0-4,K.col(0xb48a5a,{roughness:.9}),4);
      const mem=[]; const step=6.5; for(let z=z0;z<=z1;z+=step) for(const x of [x0,x1]){ mem.push([x,0,z,0,.35,H,.35]); const L=Math.hypot(step,H/2), a=Math.atan2(H/2,step); mem.push([x,H/4,z+step/2,0,.25,.25,L,a,0]); mem.push([x,3*H/4,z+step/2,0,.25,.25,L,-a,0]); }
      for(let z=z0;z<=z1;z+=step) mem.push([(x0+x1)/2,H,z,0,x1-x0,.4,.4]); for(let k=0;k<=3;k++) mem.push([x0+k*(x1-x0)/3,H,(z0+z1)/2,0,.35,.4,z1-z0]);
      for(let z=z0;z<z1;z+=step) mem.push([(x0+x1)/2,H,z+step/2,Math.atan2(step,x1-x0),.25,.3,Math.hypot(step,x1-x0)]);
      inst(new T.BoxGeometry(1,1,1).translate(0,.5,0),STL,mem,false); }
    // ---- 3: NGV 이언 포터 센터(동쪽) ----
    K.layer(3);
    vol([[40,-80],[108,-80],[112,-30],[104,38],[40,40]],(x,z)=>21+(x-40)*.03-(z+80)*.02,SKIN2);
    vol([[40,40],[100,40],[96,50],[40,52]],10,SKIN);
    // ---- 4: 남쪽 야라 동·남쪽 샤드 · 서쪽 유리 샤드 ----
    K.layer(4);
    vol([[-62,56],[22,56],[22,74],[-58,72]],(x,z)=>10+(x+62)*.03,SKIN3); tb(-20,3.5,74.3,70,6,.4,GW,6);
    prism([[-36,52],[-24,52],[-22,60],[-34,63]],0,(x,z)=>28-(x+36)*.9,SKIN,6); { const sl=[]; for(let k=0;k<5;k++) sl.push([-34+k*2.4,9+k*2.4,63.2,0,.7,5,.4]); inst(boxG(1,1,1),DK,sl,false); }
    { const pts=[[-112,-70],[-96,-74],[-92,-58],[-108,-54]]; prism(pts,0,(x,z)=>3+Math.max(0,(z+74))*.55+Math.max(0,-(x+96))*.0,SKING,5); const mu=[]; for(let i=0;i<6;i++) mu.push([-112+i*3.2,0,-70.5-i*.8,-.25,.12,3+i*.4,.12]); inst(boxG(1,1,1),STL,mu,false); }
    // ---- 배경(K.life): 플린더스 거리·스완스턴 거리, 플린더스 스트리트역(돔·시계탑), 세인트폴 대성당(첨탑 3), 프린시스 다리·야라강, 철도 야드, CBD 고층, 강 건너 아츠 센터 첨탑 · 배치 개략(추정) ----
    { const LG=K.life; const ROAD=W.solid(0x56595c,{roughness:.9}), SW=W.solid(0xb9b2a6), OCH=K.col(0xd49a55,{roughness:.85}), CRM=K.col(0xeee3cc,{roughness:.85}), CU=K.col(0x6f9b86,{roughness:.6,metalness:.2}), BLU=K.col(0x5c5d60,{roughness:.9}), SAND=K.col(0xbfa27a,{roughness:.9}), RAIL=K.col(0x6e6155,{roughness:.9});
      W.lplane(W.solid(0xa8a39a),0,-.03,0,8000,8000);
      W.lpoly(ROAD,[[-2000,-96],[2000,-96],[2000,-82],[-2000,-82]],.02); W.lpoly(ROAD,[[-132,-2000],[-116,-2000],[-116,90],[-132,90]],.025); W.lpoly(SW,[[-2000,-100],[2000,-100],[2000,-96],[-2000,-96]],.03);
      // 철도 야드(남동) + 강변 산책로 + 야라강 + 다리
      W.lpoly(W.solid(0x8a8077),[[-480,-20],[-130,-20],[-130,80],[400,80],[600,90],[600,130],[-480,130]],.02); { const rl=[]; for(let k=0;k<14;k++) rl.push([150,.04,84+k*3.2,0,600,.15,.25]); for(let k=0;k<10;k++) rl.push([-300,.04,-10+k*12,0,340,.15,.25]); inst(boxG(1,1,1),RAIL,rl,false,LG); }
      W.lpoly(W.solid(0x9a958c),[[-2000,130],[2000,130],[2000,150],[-2000,150]],.03); W.lplane(W.WATER,0,.05,215,4000,130); W.lpoly(W.solid(0x7c9a5a),[[-2000,280],[2000,280],[2000,600],[-2000,600]],.03);
      tb(-124,0,215,22,2.2,140,K.col(0xb8b0a2,{roughness:.85}),4,0,LG,false); for(const z of [170,215,260]) tb(-124,-2,z,22,2.5,4,K.col(0x9b9387,{roughness:.9}),4,0,LG,false); // 프린시스 다리(교각 3)
      // 플린더스 스트리트역: 황토빛 몸체 + 흰 띠 + 구리 돔 + 시계 아치 입구 + 서쪽 시계탑
      tb(-300,0,-55,340,16,46,OCH,6,0,LG,false); for(const y of [5,11]) tb(-300,y,-55,341,.8,46.6,CRM,4,0,LG,false); { const ar=[]; for(let x=-460;x<=-150;x+=7) ar.push([x,2,-31.6,0,3,8,.3]); inst(boxG(1,1,1),K.col(0x3d3a36,{roughness:.6}),ar,false,LG); }
      tb(-152,0,-62,28,22,30,OCH,6,0,LG,false); { const g=new T.CylinderGeometry(11,11,6,24); const m=new T.Mesh(g,CRM); m.position.set(-152,25,-62); LG.add(m); const d=new T.Mesh(new T.SphereGeometry(11,24,12,0,Math.PI*2,0,Math.PI/2),CU); d.scale.set(1,1.15,1); d.position.set(-152,28,-62); LG.add(d); const c=new T.Mesh(new T.CylinderGeometry(1.5,2.2,6,10),CU); c.position.set(-152,43,-62); LG.add(c); }
      { const cl=[]; for(let i=0;i<7;i++) cl.push([-162+i*3.3,14.5,-46.6,0,2.2,2.2,.3]); inst(new T.CylinderGeometry(.5,.5,1,12).rotateX(Math.PI/2),K.col(0xf2efe6,{roughness:.5}),cl,false,LG); }
      tb(-330,0,-62,12,48,12,OCH,6,0,LG,false); tb(-330,48,-62,9,8,9,CRM,4,0,LG,false); { const p=new T.Mesh(new T.ConeGeometry(6.5,8,4),CU); p.rotation.y=Math.PI/4; p.position.set(-330,60,-62); LG.add(p); }
      // 세인트폴 대성당(푸른 현무암 바탕 + 사암, 고딕 첨탑 3)
      tb(-80,0,-140,90,20,34,SAND,6,0,LG,false); tb(-80,0,-140,92,4,36,BLU,4,0,LG,false); { const r=new T.Mesh(new T.CylinderGeometry(0,1,1,4),K.col(0x5f6a72,{roughness:.6})); r.scale.set(46,12,18); r.rotation.y=Math.PI/4; r.position.set(-80,26,-140); LG.add(r); }
      for(const [x,z,h,s] of [[-118,-122,46,9],[-118,-158,46,9],[-62,-140,58,11]]){ tb(x,0,z,s,h,s,SAND,6,0,LG,false); const sp=new T.Mesh(new T.ConeGeometry(s*.62,h*.75,8),K.col(0x6b6f72,{roughness:.6})); sp.position.set(x,h+h*.375,z); LG.add(sp); }
      // CBD(북쪽)·사우스뱅크(강 건너) 고층 + 아츠 센터 첨탑(격자 원뿔)
      W.ring({cx:0,cz:-700,r0:0,r1:640,step:46,fill:.75,gp:.45,clr:0,keep:(x,z)=>z<-170&&!(x>-140&&x<-20&&z>-180),h:r=>30+E.r()*E.r()*150,pal:['#cbbfa8','#b9a993','#d8d0c0','#9c8f84'],gpal:['#a9b8c3','#9aabb7','#bcc6cc']});
      W.ring({cx:-300,cz:900,r0:0,r1:500,step:50,fill:.6,gp:.5,keep:(x,z)=>z>620,h:r=>25+E.r()*E.r()*140,pal:['#cbbfa8','#d8d0c0'],gpal:['#a9b8c3','#9aabb7']});
      W.city([[-150,-300,40,40,120,'#d8d4cc',0,'g'],[-600,520,44,36,297,'#3d5f86',0,'g',null,0,0,0,1],[-600,520,30,24,30,'#c9a24a',0,'n',null,0,0,267,1]]);
      { const sp=new T.Mesh(new T.ConeGeometry(13,115,10,1,true),new T.MeshStandardMaterial({color:0xf2f2f2,wireframe:true})); sp.position.set(-150,72,520); LG.add(sp); tb(-150,0,520,36,14,36,CRM,6,0,LG,false); }
      E.forest(E.scatter(-1200,1200,290,600,30,()=>0,()=>E.r()<.5,()=>11+E.r()*5,0),{trunks:false});
    }
    W.own(); W.sky(3000);
  }});
