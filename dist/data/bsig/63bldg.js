__bsigFill({"63bldg":function(K){
// 출처: 높이 249.6 m(안테나 274 m, 해발 264 m), 지상 60층 지하 3층, 1985년 5월 준공·7월 27일 개장 — 영문 위키백과 「63 Building」 / 이중 반사유리 커튼월(반사율 45 %, 투과율 17~21 %), 철골철근콘크리트(일부 박스 기둥), 직경 4.5 m 피어 243개 지하 45 m — 한국금융신문 2021-12-07 [수요건축회] / "옆이 곡선을 그리며 위로 갈수록 좁아지는 모양", 기도하는 손 모티프, 2011년 유리 교체 뒤 금 미사용, SOM 설계·박춘명 외관·이리형 구조 — 나무위키 「63빌딩」 / 외벽 유리 13,944장 교체(2005) — itwiki 「63빌딩」
// 추정 치수: 타워 1층 78 × 29 m → 60층 50 × 29 m(양 끝 곡선, 지수 2.4), 층고 4.1 m × 60 = 246 m + 옥탑 9 m, 별관 150 × 64 m 높이 14 m(3층), 강변 도로·둔치 공원·호안은 개략. 한강은 건물 뒤(-z)
    const T=K.T; const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    // 큐: 재료별로 상자(숫자 배열)·지오메트리를 모았다가 flush()에서 메시 하나로 병합 — 수백 개 부재가 메시 10여 개로. 상자는 toNonIndexed 없이 36정점을 바로 써서 빠름
    const Qs=new Map(); const bk=mat=>{ let a=Qs.get(mat); if(!a){ a={bx:[],gs:[]}; Qs.set(mat,a); } return a; }; const Q=(mat,g)=>bk(mat).gs.push(g);
    const FN=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
    const boxInto=(P,N,U,o,b)=>{ const [x,y,z,w,h,d,ry,tm]=b; const hw=w/2,hh=h/2,hd=d/2, cy=y+hh; const c=ry?Math.cos(ry):1, s=ry?Math.sin(ry):0; let k=o*3, ku=o*2;
      const put3=(px,py,pz,nx,ny,nz,u,v)=>{ const rx=px*c+pz*s, rz=-px*s+pz*c; P[k]=x+rx; P[k+1]=cy+py; P[k+2]=z+rz; const nX=nx*c+nz*s, nZ=-nx*s+nz*c; N[k]=nX; N[k+1]=ny; N[k+2]=nZ; k+=3; U[ku]=u; U[ku+1]=v; ku+=2; };
      for(let f=0;f<6;f++){ const n=FN[f]; const ax=f>>1; // 면 네 꼭짓점(반시계)
        const ua=ax===0?2:0, va=ax===1?2:1; const sgn=n[ax]; const tw=[w,h,d][ua], th=[w,h,d][va]; const su=tm?tw/tm:1, sv=tm?th/tm:1;
        const corner=(i,j)=>{ const q=[0,0,0]; q[ax]=sgn*[hw,hh,hd][ax]; q[ua]=(i?1:-1)*[hw,hh,hd][ua]; q[va]=(j?1:-1)*[hw,hh,hd][va]; return q; };
        const ccw=(sgn>0)===(ax===2); const quad=ccw?[[0,0],[1,0],[1,1],[0,1]]:[[0,0],[0,1],[1,1],[1,0]];
        for(const t of [[0,1,2],[0,2,3]]) for(const ii of t){ const [i,j]=quad[ii]; const q=corner(i,j); put3(q[0],q[1],q[2],n[0],n[1],n[2],i*su,j*sv); } } };
    const merge=(bucket,mat)=>{ const G=bucket.gs.map(g=>g.index?g.toNonIndexed():g); let n=bucket.bx.length*36; for(const g of G) n+=g.attributes.position.count; if(!n) return null; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const b of bucket.bx){ boxInto(Pa,Na,Ua,o,b); o+=36; } for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); const m=put(new T.Mesh(g,mat),!mat.userData.nocast); m.userData.glass=!!(mat.transparent&&mat.opacity<.6); return m; };
    const flush=()=>{ for(const [mat,b] of Qs) merge(b,mat); Qs.clear(); };
    const B=(x,y,z,w,h,d,mat,ry)=>bk(mat).bx.push([x,y,z,w,h,d,ry||0,mat.map?(mat.userData.tm||3):0]);
    const bx=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const cylG=(r,h,seg,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r*.9:r2,r,h,seg||10); g.translate(0,h/2,0); return g; };
    const C=(x,y,z,r,h,mat,seg,r2)=>{ const g=cylG(r,h,seg,r2); g.translate(x,y,z); Q(mat,g); };
    const surfG=(fn,nu,nv)=>{ const pos=[],uvs=[],idx=[]; for(let j=0;j<=nv;j++) for(let i=0;i<=nu;i++){ const p=fn(i/nu,j/nv); pos.push(p[0],p[1],p[2]); uvs.push(p[3]!==undefined?p[3]:i/nu,p[4]!==undefined?p[4]:j/nv); } for(let j=0;j<nv;j++) for(let i=0;i<nu;i++){ const a=j*(nu+1)+i, b=a+1, c=a+nu+1, d=c+1; idx.push(a,c,b,b,c,d); } const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(pos,3)); g.setAttribute('uv',new T.Float32BufferAttribute(uvs,2)); g.setIndex(idx); g.computeVertexNormals(); return g; };
    const S=(mat,fn,nu,nv)=>Q(mat,surfG(fn,nu,nv));
    const inst=(geo,mat,items,cast)=>{ if(!items.length) return null; const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Qt=new T.Quaternion(),Sc=new T.Vector3(),V=new T.Vector3(),E=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); E.set(0,it[3]||0,0); Qt.setFromEuler(E); Sc.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Qt,Sc); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; return put(m,cast); };
    let seed=7; const rnd=()=>{ seed=(seed*9301+49297)%233280; return seed/233280; };
    const archG=(r,len,axisZ)=>{ const g=new T.CylinderGeometry(r,r,len,14,1,false,0,Math.PI); g.rotateZ(Math.PI/2); if(axisZ) g.rotateY(Math.PI/2); return g; }; // 반원 통(윗반쪽, 축 x 또는 z) — 홍예
    const DS=o=>Object.assign({side:T.DoubleSide},o||{});
    const flat=m=>{ m.userData.nocast=1; return m; }; // 바닥 판처럼 큰 평면은 그림자를 안 던지게(그림자 카메라 클리핑 얼룩 방지)
    const pine=(x,y,z,h)=>{ C(x,y,z,.14+h*.012,h*.55,K.M.trunk,6,.1); for(let k=0;k<3;k++){ const g=new T.ConeGeometry(h*(.3-k*.07),h*.3,7); g.translate(x,y+h*(.33+k*.2)+h*.15,z); Q(K.M.leaf3,g); } };
    const tree=(x,y,z,h,leaf)=>{ C(x,y,z,.16+h*.01,h*.45,K.M.trunk,6,.12); const g=new T.SphereGeometry(h*.4,8,6); g.scale(1,.85,1); g.translate(x,y+h*.72,z); Q(leaf||K.M.leaf2,g); };
    // 큰 모형(300 m↑)용 하늘 돔: 뷰어의 하늘 구(반지름 600)보다 카메라가 멀어지면 모서리가 검게 비므로 life 그룹에 더 큰 돔을 하나 더 둠(같은 그라데이션, 밤이면 안개색으로 판단해 밤 색으로 바꿈). 모형과 함께 버려져 다른 모형엔 영향 없음
    const skyDome=(cx,cy,cz,R)=>{ const g=new T.SphereGeometry(R,32,16); const p=g.attributes.position; const mkCol=night=>{ const col=[]; const top=new T.Color(night?0x0b1226:0x9fc0de).convertSRGBToLinear(), hor=new T.Color(night?0x2a3350:0xeee9df).convertSRGBToLinear(), c=new T.Color(); for(let i=0;i<p.count;i++){ const t=Math.max(0,Math.min(1,p.getY(i)/(R*.63))); c.copy(hor).lerp(top,Math.pow(t,.65)); col.push(c.r,c.g,c.b); } return new T.Float32BufferAttribute(col,3); }; const cD=mkCol(false), cN=mkCol(true); g.setAttribute('color',cD); const m=new T.Mesh(g,new T.MeshBasicMaterial({vertexColors:true,side:T.BackSide,fog:false,depthWrite:false})); m.position.set(cx,cy,cz); m.renderOrder=-1; m.frustumCulled=false; let cur=0; m.onBeforeRender=(r,sc)=>{ const n=sc.fog&&sc.fog.color&&sc.fog.color.r<.3?1:0; if(n!==cur){ cur=n; g.setAttribute('color',n?cN:cD); } }; K.life.add(m); return m; };
    const H=249, FH=4.1, NF=60; const PV=flat(K.M.pave), GR=flat(K.M.grass), SLB=K.col(0xe3dfd6,{roughness:.8}), PDM=K.col(0xc8c2b6,{roughness:.7}), DKG=K.col(0x3b4047,{roughness:.3,metalness:.5}), GLP=K.col(0x7fa6ba,{roughness:.06,metalness:.55,transparent:true,opacity:.42,depthWrite:false});
    // ---- 0: 광장·포디움(3층) · 둔치 공원(뒤, 한강 쪽) ----
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

    // ---- v19 재구성: 금빛 반사유리 타워 — 양 끝이 곡선으로 좁아지는 '기도하는 손' 실루엣(2개 층마다 한 단씩 물러남) ----
    // 금빛 커튼월 텍스처 한 장 = 폭 6 m × 1개 층(4.1 m): 1.5 m 간격 세로 멀리언 · 층마다 스팬드럴 띠(같은 금빛 반사유리, 조금 짙게) · 판유리 위아래 반사 그라데이션
    const gcv=document.createElement('canvas'); gcv.width=256; gcv.height=176; { const g=gcv.getContext('2d'); const gr=g.createLinearGradient(0,0,0,176); gr.addColorStop(0,'#f7e7b0'); gr.addColorStop(.55,'#e9c977'); gr.addColorStop(.78,'#d9b25e'); gr.addColorStop(1,'#c99c48'); g.fillStyle=gr; g.fillRect(0,0,256,176);
      g.fillStyle='#b48a3c'; g.fillRect(0,128,256,48); g.fillStyle='rgba(255,240,200,.35)'; g.fillRect(0,128,256,3); // 스팬드럴(층 바닥 앞)
      g.fillStyle='#7a5a26'; g.fillRect(0,124,256,4); g.fillRect(0,172,256,4); for(let x=0;x<256;x+=64){ g.fillStyle='#6f5122'; g.fillRect(x,0,5,176); g.fillStyle='rgba(255,236,190,.55)'; g.fillRect(x+5,0,1.5,176); } // 멀리언·트랜섬
      for(let x=0;x<256;x+=64){ const gg=g.createLinearGradient(x,0,x+64,90); gg.addColorStop(0,'rgba(255,255,255,0)'); gg.addColorStop(.5,'rgba(255,250,225,.22)'); gg.addColorStop(1,'rgba(255,255,255,0)'); g.fillStyle=gg; g.fillRect(x+6,0,58,124); } }
    const gtx=new T.CanvasTexture(gcv); gtx.encoding=T.sRGBEncoding; gtx.wrapS=gtx.wrapT=T.RepeatWrapping; gtx.anisotropy=8;
    const GOLD=new T.MeshStandardMaterial({color:0xffffff,map:gtx,vertexColors:true,metalness:.35,roughness:.2}); GOLD.userData.glass=1; GOLD.userData.k='gold63v19';
    const LEDGE=flat(K.col(0xc09a52,{roughness:.3,metalness:.35})), BRZ=K.col(0x5b4a33,{roughness:.4,metalness:.5}), STN=K.col(0xd9d2c4,{roughness:.75}), LOB=K.col(0x9db4bf,{roughness:.05,metalness:.4,transparent:true,opacity:.55});
    // 평면(추정): 타워 깊이 29 m 일정, 길이(동서)는 1층 78 m → 60층 50 m(양 끝이 아래로 갈수록 곡선으로 벌어짐). 네 모서리 2.5 m 모따기
    const TH=NF*FH, DD=29, LA=78, LB=50, CF=2.5;
    const LEN=y=>LB+(LA-LB)*Math.pow(1-Math.min(1,Math.max(0,y/TH)),2.4);
    const plan=L=>{ const a=L/2, b=DD/2; return [[-a+CF,-b],[a-CF,-b],[a,-b+CF],[a,b-CF],[a-CF,b],[-a+CF,b],[-a,b-CF],[-a,-b+CF]]; };
    // 유리 띠(수직 프리즘 한 단) — 꼭짓점 색으로 높이·방향별 반사(위는 하늘빛 밝게, 아래는 짙은 금, 해 쪽 면은 더 밝게)
    const shade=(y,nx,nz)=>{ const t=y/TH; const sun=.92+.12*Math.max(0,nx*-.55+nz*.83); const k=(.93+.2*Math.pow(t,.8))*sun; const sky=.12*Math.pow(t,1.4)*(.6+.4*Math.abs(nz)); return [k*1.02*(1-sky*.35),k*.97*(1-sky*.1),k*(.86+sky*1.6)]; };
    const band=(L,y0,h,out)=>{ const p=plan(L), n=p.length; for(let i=0;i<n;i++){ const a=p[i], b=p[(i+1)%n]; const ex=b[0]-a[0], ez=b[1]-a[1], len=Math.hypot(ex,ez); const nx=ez/len, nz=-ex/len; const u0=(a[0]+a[1]*.37)/6, u1=u0+len/6;
        const v=[[a[0],y0,a[1],u0,y0/FH],[b[0],y0,b[1],u1,y0/FH],[b[0],y0+h,b[1],u1,(y0+h)/FH],[a[0],y0+h,a[1],u0,(y0+h)/FH]]; for(const k of [0,1,2,0,2,3]){ const q=v[k]; out.P.push(q[0],q[1],q[2]); out.N.push(nx,0,nz); out.U.push(q[3],q[4]); const c=shade(q[1],nx,nz); out.C.push(c[0],c[1],c[2]); } } };
    const glassMesh=out=>{ const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(out.P,3)); g.setAttribute('normal',new T.Float32BufferAttribute(out.N,3)); g.setAttribute('uv',new T.Float32BufferAttribute(out.U,2)); g.setAttribute('color',new T.Float32BufferAttribute(out.C,3)); const m=new T.Mesh(g,GOLD); m.userData.glass=1; return put(m); };
    const cap=(L,y,mat,inset)=>{ const sh=new T.Shape(); plan(L+(inset||0)*2).forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); const g=new T.ShapeGeometry(sh); g.rotateX(-Math.PI/2); g.translate(0,y,0); Q(mat,g); };
    // ---- 0: 저층 별관·포디움(3층, 추정 150 × 64 m) · 앞 광장 · 뒤 강변 공원 ----
    K.layer(0);
    B(0,-.02,10,210,.05,140,PV); B(0,0,-49,240,.3,22,GR); B(0,-.02,-36,240,.06,9,K.col(0x55585c,{roughness:.9})); for(const x of [-100,-60,-20,20,60,100]) B(x,.05,-36,8,.02,.25,STN); // 강변 도로(추정)
    { const PD=K.col(0xcfc8ba,{roughness:.72}); B(0,0,6,150,1.2,64,STN); B(0,1.2,6,148,12.4,62,PD); for(let k=0;k<3;k++){ B(0,1.6+k*4.1,6,148.6,2.6,62.6,K.col(0x47525a,{roughness:.12,metalness:.45})); } B(0,13.6,6,150.6,.7,64.6,STN); B(0,14.3,6,146,.4,60,K.col(0x8e9a8a,{roughness:.95})); // 띠창 3단 + 처마 + 옥상 녹화
      for(let x=-72;x<=72;x+=6) for(let k=0;k<3;k++) B(x,1.6+k*4.1,37.35,.22,2.6,.2,BRZ); }
    { B(0,1.2,40,46,.5,10,STN); B(0,5.4,42,52,.5,12,K.col(0xeeeae2,{roughness:.6})); for(const x of [-24,-8,8,24]) C(x,1.2,47.4,.35,4.2,K.M.alu,10); B(0,0,38.6,38,5.4,.25,LOB); for(const s of [-1,1]) for(let i=0;i<6;i++) B(s*(30+i*7),0,45,2.8,.9,2.8,K.col(0x9d9688,{roughness:.9})); stairsP(); } // 정문 캐노피·회전문 유리·화분
    function stairsP(){ for(let k=0;k<4;k++) B(0,0,38.4+k*.0+k*.38+.6,48-k*.6,1.2-k*.3,.38,STN); }
    for(const [x,z] of [[-66,64],[-40,70],[40,70],[66,64],[95,40],[-95,40],[95,10],[-95,10]]) tree(x,0,z,8); flush();
    // ---- 1~10: 타워(2개 층 한 단 × 30단, 6개 층마다 한 그룹) — 단마다 0.15 m 금속 띠로 물러남이 읽힘 ----
    for(let gI=0;gI<10;gI++){ K.layer(1+gI); const out={P:[],N:[],U:[],C:[]}; for(let s=0;s<3;s++){ const j=gI*3+s, y0=j*2*FH, y1=y0+2*FH; const L=LEN(y1); band(L,y0,2*FH,out); cap(L,y1,LEDGE,.12); if(j>0) cap(LEN(y0),y0,LEDGE,.12); } glassMesh(out); flush(); }
    // 1층 로비: 금빛 유리 아래 투명 로비 유리 + 기둥(포디움 지붕 위로 타워가 서는 자리도 막음)
    K.layer(1); { const L=LEN(0); B(0,13.6,0,L+.6,1.2,DD+.6,STN); }
    // 11: 60층 전망층 위 옥탑(61~63층 기계실, 금빛 유리, 추정 26 × 18 × 9 m) · 안테나(274 m)
    K.layer(11); { const y=TH; B(0,y,0,LEN(y)-6,.6,DD-3,LEDGE); const o2={P:[],N:[],U:[],C:[]}; const pl=plan; band(26,y+.6,8.4,o2); glassMesh(o2); cap(26,y+9,BRZ); B(0,y+9,0,14,1.2,10,BRZ); C(0,y+10.2,0,.9,6,K.M.alu,10,.7); C(0,y+16.2,0,.5,12,K.M.alu,8,.22); C(0,y+28,0,.25,4,K.col(0xc8402e),6,.1); }
    flush();
    // 강변 공원(K.life): 둔치 산책로 · 나무 줄 · 호안 석축 경사
    { const PATH=K.col(0xcdbf9f,{roughness:.95}), RV=K.col(0x9a948a,{roughness:.95}); const pk=[]; for(let x=-600;x<=600;x+=8) pk.push(x); const L=K.life;
      const add=(x,y,z,w,h,d,m)=>{ const g=new T.BoxGeometry(w,h,d); const me=new T.Mesh(g,m); me.position.set(x,y+h/2,z); me.receiveShadow=true; L.add(me); };
      add(0,-.15,-52,1400,.2,30,K.col(0x8fa673,{roughness:1})); add(0,.06,-56,1400,.04,3.2,PATH); add(0,.06,-47,1400,.04,2.2,K.col(0xb85c45,{roughness:.9})); // 둔치 잔디 · 산책로 · 자전거길
      { const g=new T.PlaneGeometry(1400,9); g.rotateX(-Math.PI/2+.32); const m=new T.Mesh(g,RV); m.position.set(0,-.5,-70.5); L.add(m); } // 호안 석축 경사
      E.forest(pk.filter((x,i)=>i%2===0&&Math.abs(x)>8).map((x,i)=>[x,0,-61+(i%3)*1.5,7+((i*7)%5)*.6,i%4===0?1:0,((i*.37)%1)]),{trunks:true,cast:true}); }
    // 배경(v13, K.life): 뒤(북) 한강을 좌우로 길게 잇고, 강 건너 용산·이촌 도심 블록과 그 뒤 남산(+N서울타워) — 거리·높이 압축(추정)
    { const ZR0=-72, ZR1=-330; const W=K.M.water; { const g=new T.PlaneGeometry(3200,ZR0-ZR1); g.rotateX(-Math.PI/2); const m=new T.Mesh(g,W); m.position.set(0,-.78,(ZR0+ZR1)/2); K.life.add(m); }
      const RG=(x,z)=>{ const ax=(x-150)/620, az=(z+1150)/260; const d=Math.sqrt(ax*ax+az*az)*(1+.25*(E.vn(x*.006,z*.006)-.5)); return d<1?150*Math.pow(1-E.ss(d),1.1):0; };
      const hf=(x,z)=>z>ZR1-6?-3:(RG(x,z)*(.86+.28*E.ridged(x*.006,z*.006))+.05);
      const TR=E.terrain(-1800,1800,-1900,ZR1-4,90,60,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.02,z*.02,2); if(h<1.2) return z>ZR1-60?[.55+.05*n,.6+.05*n,.45]:[.68+.06*n,.67+.06*n,.63+.05*n]; return E.mcol(x,z,h,ny,{rock:.3,rockH:120,cliff:.3,low:2,lowc:[.5,.56,.42]}); });
      { const g=new T.PlaneGeometry(3600,1400); g.rotateX(-Math.PI/2); const c=K.col(0xa9b48f,{roughness:1}); const m=new T.Mesh(g,c); m.position.set(0,-.12,ZR0+700); K.life.add(m); } // 여의도 쪽 땅(뷰어 바닥 밖까지)
      const yT=TR.h(150,-1150); { const Wc=K.col(0xe4e2dc,{roughness:.8}), G2=K.col(0x8db3c8,{roughness:.2}), Rr=K.col(0xc8402e); const c=(y,r,h,m,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r:r2,r,h,16); const me=new T.Mesh(g,m); me.position.set(150,y+h/2,-1150); K.life.add(me); }; c(yT,9,8,Wc); c(yT+8,3.8,95,Wc,2.7); c(yT+100,10,13,G2); c(yT+113,7,3,Wc); c(yT+116,1.6,22,Wc,1); c(yT+138,.8,18,Rr,.3); }
      E.forest(E.scatter(-500,800,-1450,-880,16,TR.h,(x,z,h)=>h>4&&E.r()<.95,(x,z,h)=>12+E.vn(x*.03,z*.03)*7,(x,z,h)=>E.vn(x*.02,z*.02)<.5?1:0),{trunks:false});
      const BL=[]; for(let x=-1700;x<1700;x+=36) for(let z=ZR1-30;z>-1500;z-=36){ const xx=x+(E.r()-.5)*6, zz=z+(E.r()-.5)*6; if(TR.h(xx,zz)>.8||TR.h(xx+15,zz+15)>.8) continue; if(E.r()<.15) continue; const tall=zz>ZR1-160&&E.r()<.35; BL.push([xx,zz,20+E.r()*14,18+E.r()*12,tall?28+E.r()*36:8+E.r()*E.r()*30,E.r()<.35?'#8e9ba5':E.r()<.5?'#aaa69e':'#9c988f']); }
      for(let x=-1700;x<1700;x+=40) for(let z=320;z<1300;z+=40){ if(Math.abs(x)<420&&z<700) continue; if(E.r()<.25) continue; BL.push([x+(E.r()-.5)*8,z+(E.r()-.5)*8,22+E.r()*12,20+E.r()*12,15+E.r()*E.r()*80,E.r()<.4?'#8e9ba5':'#a6a299']); } // 여의도 업무지구(앞·옆)
      E.blocks(BL); }
    skyDome(0,0,0,820);
  }});
