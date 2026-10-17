__bsigFill({"sewoon":function(K){
// 출처: 김수근 설계, 1967 세운상가(아세아상가)·현대상가부터 짓기 시작해 1972년까지 7동 — 서울신문 2020-03-17(종로~퇴계로 철거 부지 길이 893 m · 폭 50 m, 원안은 4블록 8동, 3층 높이 7.5 m 공중 보행 데크, 5층부터 아파트, 현대상가 13층 → 철거 뒤 다시세운광장) · 서울시 미디어허브 2017: 다시세운보행교 총연장 58 m(3층 높이, 세운상가~대림상가, 2005 청계천 복원 때 철거 → 2017 재개통), 세운상가 양옆 3층 높이 보행데크, 8층 옥상 '서울옥상' 전망대 · 서울신문 2017-09-19: 세운초록띠공원이 세운상가 2층으로 이어지는 경사광장으로
// 추정 치수(사진·지도 판독): 세운상가(가동) 길이 약 180 m · 폭 24 m · 지상 8층(약 27 m) — 1~4층 상가 + 5~8층 주거가 가운데 빈 중정(폭 8 m)을 둘러쌈, 4층 위 중정 바닥은 유리 천창 · 3층 데크 폭 4 m · 청계천 폭 약 26 m(양쪽 청계천로 포함 약 56 m) · 청계·대림상가 210 m 9~11층, 삼풍·PJ호텔·인현·진양은 단순 덩어리 · 축: -x 북(종로·종묘) → +x 남(퇴계로·남산)
    const T=K.T, TT=T; let PUTG=null; const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (PUTG||K.cur||K.layer(0)).add(m); return m; };
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
    const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
        const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
      
    const L=i=>{ flush(); K.layer(i); }; const flushLife=()=>{ PUTG=K.life; flush(); PUTG=null; }; // 배경 큐는 건물 큐를 먼저 비운 뒤에만 쌓을 것
    // 공용 재질(v15): 캔버스 질감 — 512 px = tm m(박스 UV가 월드 크기 기준이라 크기와 상관없이 같은 결)
    const TX=(key,draw)=>E.tex('b15_'+key,512,draw);
    const TMat=(t,tm,o)=>{ const m=new T.MeshStandardMaterial(Object.assign({color:0xffffff,map:t||null,roughness:.9,metalness:0},o||{})); m.color.convertSRGBToLinear(); m.userData.tm=tm; return m; };
    const brickTex=(key,o)=>TX(key,(g,N,rr)=>{ g.fillStyle=o.mor; g.fillRect(0,0,N,N); const rh=N/o.rows, bw=N/o.per, j=o.joint||Math.max(1.2,rh*.15); for(let r=0;r<o.rows;r++){ const off=(r%2)*bw/2; for(let i=-1;i<=o.per;i++){ const x=i*bw+off; g.fillStyle=o.tones[Math.floor(rr()*o.tones.length)]; g.fillRect(x+j/2,r*rh+j/2,bw-j,rh-j); for(let k=0;k<(o.speck||0);k++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.08)':'rgba(0,0,0,.14)'; g.fillRect(x+j/2+rr()*(bw-j-4),r*rh+j/2+rr()*(rh-j-2),2+rr()*5,1+rr()*2); } } } for(let i=0;i<3000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.05)':'rgba(0,0,0,.08)'; g.fillRect(rr()*N,rr()*N,1.5,1.5); } });
    const panelTex=(key,o)=>TX(key,(g,N,rr)=>{ g.fillStyle=o.base; g.fillRect(0,0,N,N); for(let i=0;i<(o.blot||0);i++){ g.globalAlpha=o.ba||.22; g.fillStyle=o.tones[Math.floor(rr()*o.tones.length)]; const x=rr()*N,y=rr()*N,w=3+rr()*(o.bs||30); g.beginPath(); g.ellipse(x,y,w,w*(.35+rr()*.8),rr()*3,0,7); g.fill(); } g.globalAlpha=1; for(let i=0;i<(o.noise||4000);i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.05)':'rgba(0,0,0,.07)'; g.fillRect(rr()*N,rr()*N,1.5,1.5); } for(let i=0;i<(o.streak||0);i++){ g.fillStyle='rgba(0,0,0,.05)'; g.fillRect(rr()*N,rr()*N*.3,1+rr()*3,N*(.3+rr()*.7)); }
      if(o.seam){ g.strokeStyle=o.seam; g.lineWidth=o.sw||2; for(let i=0;i<=o.cols;i++){ const x=i*N/o.cols; g.beginPath(); g.moveTo(x,0); g.lineTo(x,N); g.stroke(); } for(let i=0;i<=o.rows;i++){ const y=i*N/o.rows; g.beginPath(); g.moveTo(0,y); g.lineTo(N,y); g.stroke(); } }
      if(o.ties) for(let i=0;i<o.cols;i++) for(let j=0;j<o.rows;j++) for(const [a,b] of [[.25,.3],[.75,.3],[.25,.7],[.75,.7]]){ g.fillStyle='rgba(0,0,0,.32)'; g.beginPath(); g.arc((i+a)*N/o.cols,(j+b)*N/o.rows,2.4,0,7); g.fill(); } });
    // 창(리빌): 벽 바깥면 zf(또는 xf)에 유리를 붙이고 같은 벽 재료로 문설주·인방·창턱을 dp 만큼 내밀어 창이 벽 속으로 들어가 보이게. s=+1 이면 +z(+x)를 향한 면
    const GW=K.col(0x2f3a42,{roughness:.08,metalness:.7}), MUL=K.col(0x24272a,{roughness:.45,metalness:.5});
    const winZ=(x,y,zf,s,w,h,wall,o)=>{ o=o||{}; const dp=o.dp||.22, fr=o.fr===undefined?.14:o.fr; B(x,y,zf+s*.02,w,h,.04,o.glass||GW); if(fr){ B(x-w/2-fr/2,y-fr,zf+s*dp/2,fr,h+2*fr,dp,wall); B(x+w/2+fr/2,y-fr,zf+s*dp/2,fr,h+2*fr,dp,wall); B(x,y+h,zf+s*dp/2,w,fr,dp,wall); B(x,y-fr,zf+s*(dp+.08)/2,w+.06,fr,dp+.08,o.sill||wall); } if(o.mv) for(let i=1;i<o.mv;i++) B(x-w/2+w*i/o.mv,y,zf+s*.05,.05,h,.05,MUL); if(o.mh) for(let i=1;i<o.mh;i++) B(x,y+h*i/o.mh,zf+s*.05,w,.05,.05,MUL); };
    const winX=(xf,y,z,s,w,h,wall,o)=>{ o=o||{}; const dp=o.dp||.22, fr=o.fr===undefined?.14:o.fr; B(xf+s*.02,y,z,.04,h,w,o.glass||GW); if(fr){ B(xf+s*dp/2,y-fr,z-w/2-fr/2,dp,h+2*fr,fr,wall); B(xf+s*dp/2,y-fr,z+w/2+fr/2,dp,h+2*fr,fr,wall); B(xf+s*dp/2,y+h,z,dp,fr,w,wall); B(xf+s*(dp+.08)/2,y-fr,z,dp+.08,fr,w+.06,o.sill||wall); } if(o.mv) for(let i=1;i<o.mv;i++) B(xf+s*.05,y,z-w/2+w*i/o.mv,.05,h,.05,MUL); if(o.mh) for(let i=1;i<o.mh;i++) B(xf+s*.05,y+h*i/o.mh,z,.05,.05,w,MUL); };
    // 사람·가로수·가로등·차(작게, 인스턴스 없이 병합 큐)
    const PPL=[K.col(0x3b4a5c),K.col(0x8a3f35),K.col(0xd8cfc0),K.col(0x2f3338),K.col(0x5f7254)], SKN=K.col(0xd2a987);
    const person=(x,z,y,k)=>{ y=y||0; const m=PPL[(k||0)%PPL.length]; C(x,y,z,.2,1.05,m,7,.16); C(x,y+1.05,z,.17,.42,m,7,.2); const g=new T.SphereGeometry(.12,8,6); g.translate(x,y+1.62,z); Q(SKN,g); };
    const lamp=(x,z,y)=>{ y=y||0; C(x,y,z,.07,5.2,MUL,6,.06); B(x,y+5.1,z,.5,.12,.22,MUL); };
    const car=(x,z,ry,k)=>{ const cs=[0xe8e8e6,0x2b2d30,0x8c9095,0x3a4f6a,0xa33a2c]; const m=K.col(cs[k%cs.length],{roughness:.3,metalness:.5}); B(x,.3,z,4.4,.75,1.8,m,ry); B(x-.3*Math.cos(ry||0),1.05,z+.3*Math.sin(ry||0),2.3,.6,1.6,GW,ry); };
    const FAC=(()=>{ const m=K.M.facade.clone(); m.userData={tm:12.8}; return m; })(); // 이웃 건물 창 무늬
    // 빌드가 끝난 뒤 생성기가 K.life에 덧붙이는 기본 벤치·볼라드·화분은 숨김(이 모형은 거리 가구를 직접 둠)
    const lifeLock=()=>{ const la=K.life.add; K.life.add=function(...a){ a.forEach(o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return false; },set(v){}}); }catch(e){} }); return la.apply(this,a); }; };
    // 월드 좌표 UV(면 방향별 투영) — 기울어진 상자·압출에도 벽돌 결이 같은 크기로
    const wuv=(g,tm)=>{ if(g.index) g=g.toNonIndexed(); g.computeVertexNormals(); const p=g.attributes.position,n=g.attributes.normal; let uv=g.attributes.uv; if(!uv){ uv=new T.BufferAttribute(new Float32Array(p.count*2),2); g.setAttribute('uv',uv); } for(let i=0;i<p.count;i++){ const ax=Math.abs(n.getX(i)), ay=Math.abs(n.getY(i)), az=Math.abs(n.getZ(i)); let u,v; if(ay>=ax&&ay>=az){ u=p.getX(i); v=p.getZ(i); } else if(ax>=az){ u=p.getZ(i); v=p.getY(i); } else { u=p.getX(i); v=p.getY(i); } uv.setXY(i,u/tm,v/tm); } uv.needsUpdate=true; return g; };
    // 윗면이 기울어진 상자: top(x,z) → 윗면 높이(평면이면 정확)
    const prism=(x0,x1,z0,z1,y0,top,mat)=>{ let g=new T.BoxGeometry(x1-x0,1,z1-z0); g.translate((x0+x1)/2,y0+.5,(z0+z1)/2); const p=g.attributes.position; for(let i=0;i<p.count;i++) if(p.getY(i)>y0+.5) p.setY(i,top(p.getX(i),p.getZ(i))); g=mat.map?wuv(g,mat.userData.tm||3):(g.computeVertexNormals(),g); Q(mat,g); return g; };
    // 평면 다각형 압출(바닥 y0, 높이 h) — 월드 UV
    const exG=(pts,y0,h,mat)=>{ const sh=new T.Shape(); pts.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); let g=new T.ExtrudeGeometry(sh,{depth:h,bevelEnabled:false}); g.rotateX(-Math.PI/2); g.translate(0,y0,0); g=wuv(g,(mat.userData&&mat.userData.tm)||3); Q(mat,g); return g; };
    // 멀리 도시 결: 격자 블록(꼭짓점 색 한 메시) — ok(x,z)가 false면 비움, hh(x,z)→높이
    const blocksY=(list)=>{ if(!list.length) return; const n=list.length*30, P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3); let o=0; const c=new T.Color();
      const quad=(a,b,cc,d,nx,ny,nz,k)=>{ for(const q of [a,b,cc,a,cc,d]){ P[o*3]=q[0]; P[o*3+1]=q[1]; P[o*3+2]=q[2]; N[o*3]=nx; N[o*3+1]=ny; N[o*3+2]=nz; Cc[o*3]=c.r*k; Cc[o*3+1]=c.g*k; Cc[o*3+2]=c.b*k; o++; } };
      for(const [x,z,w,d,h,hex,y0] of list){ const b=(y0||0)-2, t=(y0||0)+h; c.set(hex).convertSRGBToLinear(); const X0=x-w/2,X1=x+w/2,Z0=z-d/2,Z1=z+d/2; quad([X0,t,Z1],[X1,t,Z1],[X1,t,Z0],[X0,t,Z0],0,1,0,1.06); quad([X0,b,Z1],[X1,b,Z1],[X1,t,Z1],[X0,t,Z1],0,0,1,.95); quad([X1,b,Z0],[X0,b,Z0],[X0,t,Z0],[X1,t,Z0],0,0,-1,.9); quad([X1,b,Z1],[X1,b,Z0],[X1,t,Z0],[X1,t,Z1],1,0,0,.86); quad([X0,b,Z0],[X0,b,Z1],[X0,t,Z1],[X0,t,Z0],-1,0,0,.86); }
      const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(P,3)); g.setAttribute('normal',new T.BufferAttribute(N,3)); g.setAttribute('color',new T.BufferAttribute(Cc,3)); const m=new T.Mesh(g,new T.MeshStandardMaterial({vertexColors:true,roughness:.9})); m.receiveShadow=true; K.life.add(m); return m; };
    // 멀리 도시 결: 격자 블록(꼭짓점 색 한 메시) — ok(x,z)가 false면 비움, hh(x,z)→높이, gy(x,z)→바닥 높이(경사지)
    const cityGrid=(x0,x1,z0,z1,st,ok,hh,pal,gy)=>{ const Lb=[], PD=[]; pal=pal||['#bdb7ac','#aaa69e','#c4beb2','#9fa4a6','#b4aea4','#cfc8bb']; for(let x=x0;x<x1;x+=st) for(let z=z0;z<z1;z+=st){ const xx=x+(E.r()-.5)*st*.3, zz=z+(E.r()-.5)*st*.3; if(ok&&!ok(xx,zz)) continue; const skip=E.r()<.15; { const hw=st*.41; let y=0; if(gy){ const a=gy(x-hw,z-hw), b=gy(x+hw,z+hw), c=gy(x-hw,z+hw), d=gy(x+hw,z-hw); y=Math.max(a,b,c,d); if(y-Math.min(a,b,c,d)>.8) y=null; } if(y!==null) PD.push([x,z,hw,y,skip&&E.r()<.6]); } if(skip) continue; const w=st*(.5+E.r()*.3), d=st*(.5+E.r()*.3); Lb.push([xx,zz,w,d,hh?hh(xx,zz):6+E.r()*E.r()*24,pal[Math.floor(E.r()*pal.length)],gy?Math.min(gy(xx-w/2,zz-d/2),gy(xx+w/2,zz+d/2),gy(xx,zz)):0]); } blocksY(Lb); if(PD.length){ const TT=K.T; const P=new Float32Array(PD.length*18), C=new Float32Array(PD.length*18), N=new Float32Array(PD.length*18); const c=new TT.Color(); const PV=['#a8a296','#b2ac9f','#a19c92','#b9b3a7','#aba79e'], PK=['#6f8d4d','#7b9858','#66844a']; PD.forEach(([x,z,hw,y,park],i)=>{ c.set(park?PK[i%3]:PV[(i*7)%5]).convertSRGBToLinear(); const Y=y+.09; const q=[[x-hw,Y,z+hw],[x+hw,Y,z+hw],[x+hw,Y,z-hw],[x-hw,Y,z+hw],[x+hw,Y,z-hw],[x-hw,Y,z-hw]]; q.forEach((v,k)=>{ const o=i*18+k*3; P[o]=v[0]; P[o+1]=v[1]; P[o+2]=v[2]; N[o+1]=1; C[o]=c.r; C[o+1]=c.g; C[o+2]=c.b; }); }); const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(C,3)); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:.95})); m.receiveShadow=true; K.life.add(m); } }; // v18i: 블록마다 보도·필지 판(밝은 포장, 빈 칸 일부는 공원) — 사이 지형이 길로 읽히게

    K.life.clear(); own();
    const CNt=panelTex('swcon',{base:'#a9a69f',tones:['#9b978f','#b4b0a8','#8f8b84','#a39f97'],blot:500,bs:22,ba:.2,noise:5000,streak:60,seam:'#85817a',cols:4,rows:3,sw:1.2});
    const CN=TMat(CNt,3.2,{roughness:.9}); if(!CNt) CN.color.setHex(0xa9a69f).convertSRGBToLinear();
    const CNL=K.col(0xc9c5bc,{roughness:.88}), CND=K.col(0x7c7973,{roughness:.9}), STL=K.col(0x3a3d40,{roughness:.45,metalness:.55}), GRN=K.col(0x4f6b5a,{roughness:.6,metalness:.2}), WD=K.M.wood;
    const CLR=K.col(0x93b3c2,{roughness:.04,metalness:.6,transparent:true,opacity:.36,depthWrite:false}), SKY=K.col(0xbcd2dc,{roughness:.08,metalness:.5,transparent:true,opacity:.55,depthWrite:false});
    const SIGNS=[K.col(0xc8402e),K.col(0x2d5f9a),K.col(0xe8c34a),K.col(0x3f8a5a),K.col(0xf2efe6),K.col(0x1f2226)], SHUT=K.col(0x8e9296,{roughness:.6,metalness:.4});
    const GR=TMat(panelTex('swgr',{base:'#a7a39b',tones:['#b2aea5','#9a968d'],blot:150,bs:10,seam:'#827e76',cols:6,rows:6,sw:1.3}),4.8,{roughness:.88}), ASP=K.col(0x3c3e41,{roughness:.85});
    const X0=-90, X1=90, W=24, CW=8, Hc=[0,3.75,7.5,11,14.5,17.5,20.5,23.5,26.5]; // 층 바닥 높이(1~8층) — 3층 바닥 7.5 m = 보행 데크
    // ---- 0층: 바닥(보도·차로) · 청계천(물길 −4 m, 돌 축대) ----
    L(0); B(0,-.06,0,180+16,.06,72,GR);
    { const cx=119, wch=26, L2=72; for(const s of [-1,1]){ B(cx+s*(wch/2+7),-.06,0,14,.06,L2,ASP); for(let z=-34;z<34;z+=8) B(cx+s*(wch/2+7),-.02,z,.14,.02,3,K.col(0xeeeeea)); } // 청계천로(물길 양옆, 남북으로 흐르는 물길과 나란히)
      B(cx,-4,0,wch,.06,L2,K.col(0x6f6c66)); B(cx,-3.7,0,wch-6,.02,L2,K.M.water); for(const s of [-1,1]) B(cx+s*(wch/2+.4),-4,0,.8,4,L2,K.M.stone); for(const s of [-1,1]) B(cx+s*(wch/2-1.6),-4,0,3.2,.35,L2,K.col(0x9a958c)); // 물길(−4 m) · 돌 축대 · 산책로
      for(let i=0;i<7;i++) B(cx-7.2+i*2.4,-4,-12,1.4,.5,1.2,K.M.stone); for(const s of [-1,1]) B(cx,0,s*8.6,wch+.8,1.1,.08,STL); // 징검돌 · 물길 난간(보도 쪽)
      for(const z of [-36,36]) B(cx,-.9,z,wch+2,.9,7,K.col(0xbdb8af)); } // 물길 끝을 덮는 차도 다리(모형 경계)
    // ---- 세운상가(가동): 층마다 몸통(가운데 중정 비움) ----
    for(let f=0;f<8;f++){ L(f); const y=Hc[f], h=Hc[f+1]-Hc[f]; const res=f>=4; // 5층(인덱스 4)부터 주거 — 가운데 중정
      if(!res){ B(0,y,0,X1-X0,h,W,CN); }
      else { const sw=(W-CW)/2; for(const s of [-1,1]) B(0,y,s*(CW/2+sw/2),X1-X0,h,sw,CN); for(const x of [X0+3,X1-3]) B(x,y,0,6,h,CW,CN); for(let k=1;k<6;k++) B(X0+k*30,y,0,2.4,h,CW,CN); } // 중정 가로 다리(복도) 5곳
      B(0,y+h-.32,0,X1-X0+.5,.32,W+.5,res?CNL:CND); // 층 띠(슬래브 끝)
      // 바깥 면 창
      for(const s of [-1,1]){ const zf=s*W/2;
        if(f<2){ for(let x=X0+3;x<X1-2;x+=6){ const k=Math.abs(Math.round(x*7+f*3))%6; B(x,y+.15,zf+s*.03,5.2,h-1.25,.06,(k%3===0)?SHUT:GW); B(x,y+h-1.05,zf+s*.15,5.6,.8,.2,SIGNS[k]); } } // 1·2층 가게 앞 유리·셔터 + 간판 띠
        else if(f<4){ for(let x=X0+2;x<X1-1;x+=4){ B(x,y+.9,zf+s*.03,3.4,h-1.5,.06,GW); for(const m of [-.85,.85]) B(x+m,y+.9,zf+s*.06,.05,h-1.5,.05,MUL); } B(0,y+.85,zf+s*.18,X1-X0,.1,.36,CND); } // 3·4층 사무·상가 연속 창
        else { for(let x=X0+2.2;x<X1-1;x+=3.2) winZ(x,y+.9,zf,s,1.7,1.5,CN,{dp:.3,fr:.18,mv:2}); for(let x=X0+16;x<X1-10;x+=32) B(x,y,zf+s*.7,6,.15,1.4,CND), B(x,y+.15,zf+s*1.35,6,1.0,.06,STL); } } // 5~8층 주거 작은 창 · 발코니 몇 곳
      if(res) for(const s of [-1,1]) for(let x=X0+8;x<X1-6;x+=3.2) B(x,y+.9,s*CW/2-s*.03,1.6,1.4,.06,GW); // 중정 안쪽 창
    }
    // 4층 위 중정 바닥 = 유리 천창(아래 상가 아트리움으로 빛) · 옥상(8층 위) '서울옥상' 데크·파고라·난간
    L(4); for(let x=X0+8;x<X1-6;x+=6) B(x,Hc[4]+.02,0,5.2,.12,CW-.4,SKY); for(let x=X0+5;x<X1-3;x+=6) B(x,Hc[4]+.02,0,.4,.3,CW,STL);
    L(7); { const y=Hc[8]; B(0,y,0,X1-X0+.4,.6,W+.4,CND); for(const s of [-1,1]) B(0,y+.6,s*(W/2-.1),X1-X0,1.1,.12,CLR); B(X0+.1,y+.6,0,.12,1.1,W,CLR);
      B(X0+20,y+.6,0,34,.12,W-2,WD); for(let x=X0+6;x<=X0+34;x+=4) for(const s of [-1,1]) B(x,y+.72,s*8,.14,2.6,.14,STL); for(let x=X0+6;x<=X0+34;x+=1.4) B(x,y+3.3,0,.12,.12,16.4,WD); // 서울옥상(종묘를 향한 북쪽 끝)
      for(const x of [X0+50,X0+80,X0+110,X0+140]) B(x,y+.6,(x%3?-1:1)*6,4,2.4,3,CNL); person(X0+12,0,y+.72,0); person(X0+15,3,y+.72,2); person(X0+10,-4,y+.72,4); }
    // ---- 3층 보행 데크(2017): 양 날개 · 유리 난간 · 계단·엘리베이터 ----
    L(2); for(const s of [-1,1]){ const zc=s*(W/2+2.1); B(0,Hc[2]-.35,zc,X1-X0+6,.35,4.2,K.col(0xd2cdc4,{roughness:.8})); B(0,Hc[2],zc+s*1.98,X1-X0+6,1.1,.08,CLR); B(0,Hc[2]+1.1,zc+s*1.98,X1-X0+6,.08,.14,STL);
      for(let x=X0+4;x<X1;x+=12) B(x,0,zc+s*1.2,.5,Hc[2]-.35,.5,STL); for(let x=X0+4;x<X1;x+=12) B(x,Hc[2]-.6,zc,.4,.3,4.2,STL);
      for(const xs of [X0+30,X1-40]){ for(let k=0;k<14;k++) B(xs+k*.55,k*Hc[2]/14,zc+s*3.4,.56,.18,2,CNL); B(xs+3.6,0,zc+s*4.45,8,Hc[2]+1.1,.1,CLR); } // 땅으로 내려가는 계단
      B(0,0,zc+s*3.6,3,Hc[2]+3,3,CLR); B(0,Hc[2]+3,zc+s*3.6,3.3,.3,3.3,STL); } // 엘리베이터 탑(유리)
    // ---- 다시세운보행교(58 m, 3층 높이): 세운상가 남쪽 끝 → 청계천 건너 → 청계·대림상가 ----
    L(2); { const xa=X1, xb=X1+58, y=Hc[2]; B((xa+xb)/2,y-.9,0,xb-xa,.9,7,K.col(0xe9e6df,{roughness:.6})); for(const s of [-1,1]){ B((xa+xb)/2,y,s*3.45,xb-xa,1.15,.08,CLR); B((xa+xb)/2,y+1.15,s*3.45,xb-xa,.1,.18,STL); }
      for(const x of [xa+14,xa+44]) B(x,-.06,0,1.6,y-.9,4,K.col(0xd6d2ca)); B((xa+xb)/2,y-.05,0,xb-xa,.06,5,WD); person(xa+20,1,y,1); person(xa+24,-1.4,y,3); person(xa+36,1.8,y,0); person(xa+40,-1,y,2); }
    // 거리(세운상가 양옆 도로)·사람·가로등·나무
    L(0); for(const s of [-1,1]){ B(0,.01,s*30,180,.03,10,ASP); for(let x=X0;x<X1;x+=8) B(x,.04,s*30,3,.02,.14,K.col(0xeeeeea)); }
    for(const [x,s,k] of [[-60,-1,0],[-20,1,1],[30,-1,2],[64,1,3],[-80,1,4]]) car(x,s*(30+(k%2?2:-2)),0,k);
    for(let x=X0+6;x<X1;x+=22) for(const s of [-1,1]) tree(x,0,s*(W/2+9.5),6.5,K.M.leaf3); for(let i=0;i<10;i++) person(X0+10+i*17,(i%2?-1:1)*(W/2+6+(i%3)),0,i);
    for(let x=X0;x<X1;x+=30) for(const s of [-1,1]) lamp(x,s*(W/2+8));
    L(0); flush();
    // ---- 배경(K.life): 다시세운광장 · 종로 · 종묘 숲 · 청계·대림 → 삼풍 → PJ호텔 → 인현·진양 → 퇴계로 · 남산 · 을지로 공구 골목 ----
    { const site=[-98,148,-36,36];
      const RG=(x,z)=>E.peaks(x,z,[[1500,-200,700,520,230,1.15],[-900,-150,420,320,60,1.4]]); // 남산(남) · 종묘 뒤 낮은 구릉(추정)
      const inS=(x,z,m)=>x>site[0]-m&&x<site[1]+m&&z>site[2]-m&&z<site[3]+m;
      const hf=(x,z)=>inS(x,z,2)?0:Math.max(0,RG(x,z)*(.85+.3*E.ridged(x*.006,z*.006)))+.02;
      E.terrain(-1700,2400,-1100,1100,140,80,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.03,z*.03,2); if(x>104&&x<134&&Math.abs(z)<700) return [.33,.36,.36]; if(x<-240&&x>-900&&z>-300&&z<300) return [.42+.04*n,.48+.04*n,.34]; if(h<6) return [.40+.03*n,.40+.03*n,.40+.03*n]; return E.mcol(x,z,h,ny,{rock:.2,rockH:200,low:5,lowc:[.5,.56,.42]}); },site);
      // 청계천 물길(모형 밖 구간)
      { const w=new T.Mesh(new T.PlaneGeometry(22,1200),K.M.water); w.rotation.x=-Math.PI/2; w.position.set(119,.06,0); K.life.add(w); for(const s of [-1,1]) B(119+s*13.4,0,0,.8,1.0,1200,K.M.stone); } // 모형 밖 구간은 지면 높이로 단순화
      // 다시세운광장(옛 현대상가 자리): 세운상가 2층으로 오르는 경사 광장 · 종로
      { const xa=-160, xb=X0; for(let k=0;k<10;k++){ const x=xa+(k+.5)*(xb-xa)/10; B(x,0,0,(xb-xa)/10+.02,Hc[1]*(k+1)/10,W+6,K.col(0xc9c4ba,{roughness:.85})); } for(const s of [-1,1]) B((xa+xb)/2,0,s*(W/2+3.2),xb-xa,1.0,.4,CND); for(let i=0;i<6;i++) tree(xa+8+i*10,Hc[1]*(i+1)/7,(i%2?-1:1)*8,5,K.M.leaf2); B(-176,.01,0,30,.03,400,ASP); for(let z=-180;z<180;z+=8) B(-176,.04,z,.14,.02,3,K.col(0xeeeeea)); }
      // 종묘(종로 북쪽): 담장 + 외대문 + 숲(정전 지붕은 숲 속 멀리)
      { const WL=TMat(brickTex('swwall',{rows:4,per:3,mor:'#8a8378',tones:['#a39d91','#b0aa9d','#968f83','#bab3a6'],speck:6}),2.4); B(-196,0,0,1.2,3.6,520,WL); B(-196,3.6,0,2.4,.6,520,K.M.giwa); B(-197,0,0,8,6.5,14,K.col(0x8c3a2e)); { const rg=new T.ConeGeometry(11,4.5,4,1); rg.rotateY(Math.PI/4); rg.scale(.75,1,1.2); rg.translate(-197,6.5+2.25,0); Q(K.M.giwa,rg); }
        E.forest(E.scatter(-900,-205,-400,400,10,(x,z)=>hf(x,z),(x,z)=>!(x>-520&&x<-420&&Math.abs(z)<60)&&E.r()<.85,(x,z)=>9+E.vn(x*.04,z*.04)*7,(x,z)=>E.vn(x*.03,z*.03)<.5?1:0),{trunks:false});
        B(-470,1.2,0,101,5,24,K.col(0x8c3a2e)); { const g=new T.BoxGeometry(108,1,30); g.translate(-470,7,0); const p=g.attributes.position; for(let i=0;i<p.count;i++) if(p.getY(i)>7) p.setY(i,11.5), p.setZ(i,p.getZ(i)*.12); g.computeVertexNormals(); Q(K.M.giwa,g); } B(-470,0,0,109,1.2,70,K.M.stone); } // 종묘 정전(101 m 지붕, 숲 사이로)
      // 남쪽으로 이어지는 상가군(단순 덩어리 + 3층 데크 띠) — 이름·높이 추정
      const seg=(xa,xb,h,col)=>{ B((xa+xb)/2,0,0,xb-xa,h,W,col); B((xa+xb)/2,h,0,xb-xa+.4,.5,W+.4,CND); for(let f=1;f<h/3.2;f++) B((xa+xb)/2,f*3.2,0,xb-xa+.2,.25,W+.2,CND); for(const s of [-1,1]){ B((xa+xb)/2,Hc[2]-.35,s*(W/2+2.1),xb-xa,.35,4.2,CNL); B((xa+xb)/2,Hc[2],s*(W/2+4.1),xb-xa,1.1,.08,CLR); for(let x=xa+3;x<xb;x+=3.2) for(let f=3;f<h/3.2-.5;f++) B(x,f*3.2+.8,s*(W/2+.03),1.8,1.5,.06,GW); } };
      seg(148,250,30,CN); seg(252,358,33,CN); // 청계상가 · 대림상가
      B(390,0,0,6,Hc[2],6,CNL); seg(420,540,32,CN); seg(560,612,40,K.col(0xb7b2a8)); seg(640,760,30,CN); seg(770,880,48,K.col(0xb2ada3)); // 삼풍 · PJ호텔 · 인현 · 진양
      for(const x of [400,550,625]) { B(x,.01,0,28,.03,300,ASP); } B(900,.01,0,40,.03,500,ASP); // 을지로 · 마른내로 · 퇴계로(가로 길)
      { const yT=RG(1500,-200)*.95; const Wt=K.col(0xe4e2dc,{roughness:.8}); C(1500,yT,-200,5,80,Wt,12,3.6); C(1500,yT+80,-200,11,12,K.col(0x8db3c8,{roughness:.2}),14,11); C(1500,yT+92,-200,1.6,34,Wt,8,.8); } // N서울타워(멀리, 단순)
      E.forest(E.scatter(900,2300,-900,700,18,(x,z)=>hf(x,z),(x,z)=>hf(x,z)>12&&E.r()<.9,(x,z)=>12+E.vn(x*.04,z*.04)*6,(x,z)=>E.vn(x*.02,z*.02)<.55?1:0),{trunks:false});
      // 양옆: 을지로·세운 공구·조명 골목(낮고 빽빽) · 몇몇 새 고층(재개발)
      for(const s of [-1,1]) for(let x=-160;x<160;x+=14){ const z=s*(44+E.r()*4), w=10+E.r()*4, d=12+E.r()*6, h=s>0?4+E.r()*4:6+E.r()*9; if(x>96&&x<142) continue; B(x,0,z+s*d/2,w,h,d,FAC); }
      cityGrid(-240,1100,-700,700,22,(x,z)=>Math.abs(z)>66&&!(x>96&&x<142),(x,z)=>(z>0&&z<320&&x>-260&&x<420)?3.5+E.r()*5:(E.r()<.012&&(z<-140||z>420)?36+E.r()*40:5+E.r()*E.r()*14),['#bdb7ac','#aaa69e','#c4beb2','#9fa4a6','#b4aea4','#cfc8bb','#a9b8c3']);
      flushLife(); }
    lifeLock();
  }});
