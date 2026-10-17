__bsigFill({"domerock":function(K){
// 출처: 영문 위키백과 「Dome of the Rock」 — 압드 알말리크, 헌정 명문 AH 72(691~692), 팔각 평면, 돔 지름 약 20 m, 드럼 16지지(기둥 4·원주 12), 바깥 팔각 회랑 24, 바깥벽 창 36 · 네 방위 문, 16세기 쉴레이만 타일 → 1960~62 이탈리아 복제 타일, 1959~62 금박 알루미늄 청동 돔 · Madain Project 「Dome of the Rock」 — 바깥벽 높이 약 11 m(36 ft), 단 높이 약 4 m, 계단 위 아치 문(카나티르)
// 추정: 한 변 20.6 m(아포템 약 24.9 m), 드럼 높이·창 위치, 돔 높이 약 10.5 m · 전체 약 35 m, 현관 크기, 사슬의 돔 위치(동쪽 약 38 m) · 크기, 단·에스플러네이드·알아크사·구시가 배치(축약), 올리브산 높이
    // ---- 공용(병합 큐 · v15 배경 E · 도시 블록) — 기존 BSIG 헬퍼 그대로 ----
// 추정·축약: 명정전 19.5 × 10.4 m, 홍화문 13.6 × 6.6 m, 명정전 마당 52 × 50 m, 내전 배치와 춘당지·대온실 거리는 약 0.7배로 줄임, 대온실 42 × 14 m · 가운데 높이 약 11 m(사진 판독)
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
    // 멀리 도시 결: 격자 블록(꼭짓점 색 한 메시) — ok(x,z)가 false면 비움, hh(x,z)→높이
    const blocksY=(list)=>{ if(!list.length) return; const n=list.length*30, P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3); let o=0; const c=new T.Color();
      const quad=(a,b,cc,d,nx,ny,nz,k)=>{ for(const q of [a,b,cc,a,cc,d]){ P[o*3]=q[0]; P[o*3+1]=q[1]; P[o*3+2]=q[2]; N[o*3]=nx; N[o*3+1]=ny; N[o*3+2]=nz; Cc[o*3]=c.r*k; Cc[o*3+1]=c.g*k; Cc[o*3+2]=c.b*k; o++; } };
      for(const [x,z,w,d,h,hex,y0] of list){ const b=(y0||0)-2, t=(y0||0)+h; c.set(hex).convertSRGBToLinear(); const X0=x-w/2,X1=x+w/2,Z0=z-d/2,Z1=z+d/2; quad([X0,t,Z1],[X1,t,Z1],[X1,t,Z0],[X0,t,Z0],0,1,0,1.06); quad([X0,b,Z1],[X1,b,Z1],[X1,t,Z1],[X0,t,Z1],0,0,1,.95); quad([X1,b,Z0],[X0,b,Z0],[X0,t,Z0],[X1,t,Z0],0,0,-1,.9); quad([X1,b,Z1],[X1,b,Z0],[X1,t,Z0],[X1,t,Z1],1,0,0,.86); quad([X0,b,Z0],[X0,b,Z1],[X0,t,Z1],[X0,t,Z0],-1,0,0,.86); }
      const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(P,3)); g.setAttribute('normal',new T.BufferAttribute(N,3)); g.setAttribute('color',new T.BufferAttribute(Cc,3)); const m=new T.Mesh(g,new T.MeshStandardMaterial({vertexColors:true,roughness:.9})); m.receiveShadow=true; K.life.add(m); return m; };
    // 멀리 도시 결: 격자 블록(꼭짓점 색 한 메시) — ok(x,z)가 false면 비움, hh(x,z)→높이, gy(x,z)→바닥 높이(경사지)
    const cityGrid=(x0,x1,z0,z1,st,ok,hh,pal,gy)=>{ const Lb=[]; pal=pal||['#bdb7ac','#aaa69e','#c4beb2','#9fa4a6','#b4aea4','#cfc8bb']; for(let x=x0;x<x1;x+=st) for(let z=z0;z<z1;z+=st){ const xx=x+(E.r()-.5)*st*.3, zz=z+(E.r()-.5)*st*.3; if(ok&&!ok(xx,zz)) continue; if(E.r()<.15) continue; const w=st*(.5+E.r()*.3), d=st*(.5+E.r()*.3); Lb.push([xx,zz,w,d,hh?hh(xx,zz):6+E.r()*E.r()*24,pal[Math.floor(E.r()*pal.length)],gy?Math.min(gy(xx-w/2,zz-d/2),gy(xx+w/2,zz+d/2),gy(xx,zz)):0]); } blocksY(Lb); };
    // ---- 배경·바닥(v15): 캔버스 질감 · 높이장 지형(K.life — bbox 밖) · 인스턴스 숲 · 뷰어 기본 바닥 숨김 ----
    const E=(()=>{ const TT=T; let sd=131; const r=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
      const C=(typeof window!=='undefined')?(window.__kTex15||(window.__kTex15={})):{};
      const tex=(key,px,draw)=>{ if(C[key]) return C[key]; if(typeof document==='undefined') return null; const cv=document.createElement('canvas'); cv.width=cv.height=px; const g=cv.getContext('2d'); let s=31; const rr=()=>{ s=(s*16807)%2147483647; return s/2147483647; }; draw(g,px,rr); const t=new TT.CanvasTexture(cv); t.wrapS=t.wrapT=TT.RepeatWrapping; t.encoding=TT.sRGBEncoding; t.anisotropy=8; return C[key]=t; };
      // 막돌·다듬돌 석축(2 m 한 장) — 돌 크기·색이 제각각, 줄눈 어둡게
      const wallTex=(key,base,tones,rowH,wMin,wMax)=>tex(key,512,(g,N,rr)=>{ g.fillStyle=base; g.fillRect(0,0,N,N); let y=0; while(y<N){ let h=Math.round(rowH*(.7+rr()*.6)); if(N-y<rowH*.6) h=N-y; let x=-rr()*wMax; while(x<N){ const w=wMin+rr()*(wMax-wMin); const j=()=>(rr()-.5)*12; g.fillStyle=tones[Math.floor(rr()*tones.length)]; for(const ox of [0,-N,N]){ g.beginPath(); g.moveTo(ox+x+4+j(),y+3+j()); g.lineTo(ox+x+w*.5+j(),y+2+j()); g.lineTo(ox+x+w-4+j(),y+4+j()); g.lineTo(ox+x+w-3+j(),y+h*.5+j()); g.lineTo(ox+x+w-4+j(),y+h-3+j()); g.lineTo(ox+x+w*.45+j(),y+h-2+j()); g.lineTo(ox+x+3+j(),y+h-4+j()); g.lineTo(ox+x+2+j(),y+h*.5+j()); g.closePath(); g.fill(); g.fillStyle='rgba(255,255,255,.07)'; g.fillRect(ox+x+6,y+5,w-14,3); } x+=w; } y+=h; } for(let i=0;i<5000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.09)':'rgba(30,28,24,.12)'; g.fillRect(rr()*N,rr()*N,1.6,1.6); } for(let i=0;i<40;i++){ g.fillStyle='rgba(70,90,50,.10)'; g.beginPath(); g.arc(rr()*N,rr()*N,6+rr()*18,0,7); g.fill(); } });
      const masTex=()=>tex('mas15',512,(g,N,rr)=>{ g.fillStyle='#cdbf9e'; g.fillRect(0,0,N,N); const cs=['#bfae88','#dacfb4','#ae9d77','#9c8d6f','#c8b997']; for(let i=0;i<7000;i++){ g.fillStyle=cs[Math.floor(rr()*cs.length)]; const z=rr()<.85?1.2:2.4; g.fillRect(rr()*N,rr()*N,z,z); } });
      const tmat=(t,hex,o)=>{ const oo=Object.assign({},o||{}); delete oo.tint; const m=new TT.MeshStandardMaterial(Object.assign({color:t?0xffffff:hex,map:t||null,roughness:.95},oo)); m.color.convertSRGBToLinear(); if(t&&o&&o.tint) m.color.setHex(o.tint).convertSRGBToLinear(); return m; };
      const axis=(R,n,k,c)=>{ const L=[]; for(let i=0;i<=n;i++){ const t=-1+2*i/n; L.push((c||0)+R*Math.sinh(k*t)/Math.sinh(k)); } return L; };
      const terrain=(x0,x1,z0,z1,nx,nz,hf,cf,hole)=>{
        const ax=(a0,a1,n,e)=>{ const L=[]; for(let i=0;i<=n;i++) L.push(a0+(a1-a0)*i/n); if(e) e.forEach(v=>{ if(v>a0&&v<a1) L.push(v); }); L.sort((a,b)=>a-b); return L.filter((v,i)=>i===0||v-L[i-1]>.01); };
        const XS=Array.isArray(nx)?nx:ax(x0,x1,nx,hole&&[hole[0],hole[1]]), ZS=Array.isArray(nz)?nz:ax(z0,z1,nz,hole&&[hole[2],hole[3]]); const W=XS.length, H=ZS.length, n=W*H; const Y=new Float32Array(n), P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3);
        for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, x=XS[i], z=ZS[j]; Y[k]=hf(x,z); P[k*3]=x; P[k*3+1]=Y[k]; P[k*3+2]=z; }
        const lc=v=>v<.04045?v*.0773993808:Math.pow(v*.9478672986+.0521327014,2.4);
        for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, i0=Math.max(0,i-1), i1=Math.min(W-1,i+1), j0=Math.max(0,j-1), j1=Math.min(H-1,j+1); const hx=(Y[j*W+i1]-Y[j*W+i0])/(XS[i1]-XS[i0]), hz=(Y[j1*W+i]-Y[j0*W+i])/(ZS[j1]-ZS[j0]); const L=Math.sqrt(hx*hx+1+hz*hz); N[k*3]=-hx/L; N[k*3+1]=1/L; N[k*3+2]=-hz/L; const v=cf(P[k*3],P[k*3+2],Y[k],1/L); Cc[k*3]=lc(v[0]); Cc[k*3+1]=lc(v[1]); Cc[k*3+2]=lc(v[2]); }
        const I=[]; for(let j=0;j<H-1;j++) for(let i=0;i<W-1;i++){ if(hole){ const cx=(XS[i]+XS[i+1])/2, cz=(ZS[j]+ZS[j+1])/2; if(cx>hole[0]&&cx<hole[1]&&cz>hole[2]&&cz<hole[3]) continue; } const a=j*W+i, b=a+1, c=a+W, d=c+1; I.push(a,c,b,b,c,d); }
        const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(Cc,3)); g.setIndex(new TT.BufferAttribute(new Uint32Array(I),1)); g.computeBoundingSphere();
        const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:1})); m.receiveShadow=true; m.castShadow=false; K.life.add(m);
        const bs=(A,v)=>{ let lo=0, hi=A.length-2; if(v<=A[0]) return 0; if(v>=A[hi+1]) return hi; while(lo<hi){ const md=(lo+hi+1)>>1; if(A[md]<=v) lo=md; else hi=md-1; } return lo; };
        m.h=(x,z)=>{ const i=bs(XS,x), j=bs(ZS,z); const u=Math.min(1,Math.max(0,(x-XS[i])/(XS[i+1]-XS[i]))), v=Math.min(1,Math.max(0,(z-ZS[j])/(ZS[j+1]-ZS[j]))); const a=Y[j*W+i], b=Y[j*W+i+1], c=Y[(j+1)*W+i], d=Y[(j+1)*W+i+1]; return (a*(1-u)+b*u)*(1-v)+(c*(1-u)+d*u)*v; }; return m; };
      const mergeG=gs=>{ const G=gs.map(g=>g.index?g.toNonIndexed():g); let n=0; for(const g of G) n+=g.attributes.position.count; const P=new Float32Array(n*3), N=new Float32Array(n*3); let o=0; for(const g of G){ P.set(g.attributes.position.array,o*3); N.set(g.attributes.normal.array,o*3); o+=g.attributes.position.count; } const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); return g; };
      const crownG=[ (()=>{ const a=new TT.IcosahedronGeometry(.5,1); a.scale(1,.78,1); a.translate(0,.62,0); const b=new TT.IcosahedronGeometry(.3,0); b.translate(.22,.78,.1); return mergeG([a,b]); })(),
        (()=>{ const a=new TT.IcosahedronGeometry(.5,0); a.scale(1.15,.42,1.0); a.translate(0,.82,0); const b=new TT.IcosahedronGeometry(.32,0); b.scale(1.1,.45,1); b.translate(-.25,.66,.12); return mergeG([a,b]); })(),
        (()=>{ const a=new TT.ConeGeometry(.36,.62,7); a.translate(0,.55,0); const b=new TT.ConeGeometry(.26,.45,7); b.translate(0,.85,0); return mergeG([a,b]); })(),
        (()=>{ const a=new TT.CylinderGeometry(.05,.05,1,5); a.translate(0,.5,0); const b=new TT.ConeGeometry(.16,.5,5); b.translate(0,.95,0); return mergeG([a,b]); })() ];
      const trunkG=(()=>{ const g=new TT.CylinderGeometry(.03,.05,.6,5); g.translate(0,.3,0); return g; })();
      const LEAF=[['#46663a','#567a43','#3a5833','#62824a','#4d6e3e'],['#34502f','#3f5d36','#2e482b','#4a6739'],['#2a432b','#344f33','#243a25'],['#6f8f45','#7c9a4c','#5f8040','#86a356']];
      // items [x,y,z,h,kind(0 활엽·1 소나무·2 침엽·3 대나무), tone, 폭배율]
      const forest=(items,o)=>{ o=o||{}; const byK=[[],[],[],[]]; items.forEach(it=>byK[it[4]||0].push(it)); const M4=new TT.Matrix4(), Qt=new TT.Quaternion(), V=new TT.Vector3(), Sc=new TT.Vector3(), Eu=new TT.Euler(), c=new TT.Color(); const out=[];
        byK.forEach((L,k)=>{ if(!L.length) return; const cm=new TT.MeshStandardMaterial({color:0xffffff,roughness:.92,flatShading:true}); const im=new TT.InstancedMesh(crownG[k],cm,L.length); const tm=(o.trunks!==false&&k!==3)?new TT.InstancedMesh(trunkG,K.M.trunk,L.length):null;
          L.forEach((it,i)=>{ const h=it[3], w=h*(it[6]||1)*(k===3?.35:1); Eu.set(k===3?(((it[0]*3.1)%1)-.5)*.12:0,(it[0]*13.1+it[2]*7.7)%6.28,0); Qt.setFromEuler(Eu); V.set(it[0],it[1],it[2]); Sc.set(w,h,w); M4.compose(V,Qt,Sc); im.setMatrixAt(i,M4); if(tm) tm.setMatrixAt(i,M4); const P=(o.pal&&o.pal[k])||LEAF[k]; const t=it[5]===undefined?((it[0]*.37+it[2]*.61)%1+1)%1:it[5]; c.set(P[Math.floor(t*P.length)%P.length]).convertSRGBToLinear(); im.setColorAt(i,c); });
          im.instanceMatrix.needsUpdate=true; if(im.instanceColor) im.instanceColor.needsUpdate=true; im.castShadow=!!o.cast; im.receiveShadow=true; (o.grp||K.life).add(im); out.push(im); if(tm){ tm.instanceMatrix.needsUpdate=true; tm.castShadow=!!o.cast; (o.grp||K.life).add(tm); } }); return out; };
      const scatter=(x0,x1,z0,z1,sp,hf,ok,hs,kind)=>{ const L=[]; for(let z=z0;z<z1;z+=sp) for(let x=x0;x<x1;x+=sp){ const xx=x+(r()-.5)*sp*.9, zz=z+(r()-.5)*sp*.9; const h=hf(xx,zz); if(ok&&!ok(xx,zz,h)) continue; const s=hs?hs(xx,zz,h):sp*1.2; const kd=typeof kind==='function'?kind(xx,zz,h):(kind===undefined?(r()<.45?1:0):kind); L.push([xx,h-s*.08,zz,s*(.8+r()*.45),kd,r(),.85+r()*.4]); } return L; };
      const hsh=(x,z)=>{ let n=Math.imul(x|0,374761393)+Math.imul(z|0,668265263)|0; n=Math.imul(n^(n>>>13),1274126177); return ((n^(n>>>16))>>>0)/4294967296; };
      const vn=(x,z)=>{ const xi=Math.floor(x), zi=Math.floor(z), xf=x-xi, zf=z-zi; const u=xf*xf*(3-2*xf), v=zf*zf*(3-2*zf); const a=hsh(xi,zi), b=hsh(xi+1,zi), c=hsh(xi,zi+1), d=hsh(xi+1,zi+1); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; };
      const fbm=(x,z,o)=>{ let s=0, a=.5, f=1; for(let i=0;i<(o||4);i++){ s+=a*vn(x*f,z*f); a*=.5; f*=2.03; } return s; };
      const ridged=(x,z)=>{ let s=0,a=.5,f=1; for(let i=0;i<3;i++){ s+=a*(1-Math.abs(vn(x*f,z*f)*2-1)); a*=.5; f*=2.1; } return s; };
      const ss=t=>{ t=Math.min(1,Math.max(0,t)); return t*t*(3-2*t); };
      const peaks=(x,z,pk)=>{ let h=0; for(let i=0;i<pk.length;i++){ const q=pk[i]; const ax=(x-q[0])/q[2], az=(z-q[1])/q[3]; const d2=ax*ax+az*az; if(d2<1){ const d=Math.sqrt(d2); const e=1-ss(d); h=Math.max(h,q[4]*Math.pow(e,q[5]||1.3))+q[4]*.04*(1-d)*(1-d); } } return h; };
      // 산색: 숲 녹색 변주 + 급경사 바위 + 거리에 따라 푸른 대기색(겹겹 능선)
      const mcol=(x,z,h,ny,o)=>{ o=o||{}; const n=fbm(x*.02,z*.02,2), m=vn(x*.006+5,z*.006); let c=[.2+.07*n,.29+.08*n,.16+.05*n]; if(m>.6) c=[c[0]*.85+.05,c[1]*.9+.04,c[2]*.85]; const rock=(o.cliff||0)*ss((.62-ny)/.14); if(rock>0){ const rc=[.55+.08*n,.53+.07*n,.49+.06*n]; c=c.map((v,i)=>v+(rc[i]-v)*Math.min(1,rock)); } if(o.far){ const d=Math.hypot(x-(o.cx||0),z-(o.cz||0)); const f=ss((d-o.far)/(o.farW||700))*.62; const bc=o.haze||[.62,.69,.76]; c=c.map((v,i)=>v+(bc[i]-v)*f); } return c; };
      // 뷰어 기본 대지(잔디판·길)를 이 모형이 떠 있는 동안만 숨김(다른 모형으로 바뀌면 원상)
      const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
        const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
      // 물(계곡·강): 반사·투명 — 지형 위 평면 또는 폴리곤
      const WATER=new TT.MeshStandardMaterial({color:0x4f7d8c,roughness:.05,metalness:.02,transparent:true,opacity:.86}); WATER.color.convertSRGBToLinear();
      return {axis,r,tex,wallTex,masTex,tmat,terrain,forest,scatter,fbm,ridged,vn,ss,peaks,mcol,own,WATER,mergeG}; })();
    // 렌더러가 build 뒤에 K.life에 더하는 기본 소품(벤치·화분·볼라드·일반 나무, keep=0이면 사람까지)을 숨김 — 이 모형의 맥락은 직접 지음
    const tidy=keep=>{ const L=K.life, add0=L.add; L.add=function(...a){ a.forEach(o=>{ if(keep&&o.isMesh&&!o.isInstancedMesh&&o.material===K.M.people) return; o.visible=false; }); return add0.apply(this,a); }; };

    const TX=(key,draw)=>E.tex('b15_'+key,512,draw);
    const TMat=(t,tm,o)=>{ const m=new T.MeshStandardMaterial(Object.assign({color:0xffffff,map:t||null,roughness:.9,metalness:0},o||{})); m.color.convertSRGBToLinear(); m.userData.tm=tm; return m; };
    const brickTex=(key,o)=>TX(key,(g,N,rr)=>{ g.fillStyle=o.mor; g.fillRect(0,0,N,N); const rh=N/o.rows, bw=N/o.per, j=o.joint||Math.max(1.2,rh*.15); for(let r=0;r<o.rows;r++){ const off=(r%2)*bw/2; for(let i=-1;i<=o.per;i++){ const x=i*bw+off; g.fillStyle=o.tones[Math.floor(rr()*o.tones.length)]; g.fillRect(x+j/2,r*rh+j/2,bw-j,rh-j); for(let k=0;k<(o.speck||0);k++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.08)':'rgba(0,0,0,.14)'; g.fillRect(x+j/2+rr()*(bw-j-4),r*rh+j/2+rr()*(rh-j-2),2+rr()*5,1+rr()*2); } } } for(let i=0;i<3000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.05)':'rgba(0,0,0,.08)'; g.fillRect(rr()*N,rr()*N,1.5,1.5); } });
    const panelTex=(key,o)=>TX(key,(g,N,rr)=>{ g.fillStyle=o.base; g.fillRect(0,0,N,N); for(let i=0;i<(o.blot||0);i++){ g.globalAlpha=o.ba||.22; g.fillStyle=o.tones[Math.floor(rr()*o.tones.length)]; const x=rr()*N,y=rr()*N,w=3+rr()*(o.bs||30); g.beginPath(); g.ellipse(x,y,w,w*(.35+rr()*.8),rr()*3,0,7); g.fill(); } g.globalAlpha=1; for(let i=0;i<(o.noise||4000);i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.05)':'rgba(0,0,0,.07)'; g.fillRect(rr()*N,rr()*N,1.5,1.5); } for(let i=0;i<(o.streak||0);i++){ g.fillStyle='rgba(0,0,0,.05)'; g.fillRect(rr()*N,rr()*N*.3,1+rr()*3,N*(.3+rr()*.7)); }
      if(o.seam){ g.strokeStyle=o.seam; g.lineWidth=o.sw||2; for(let i=0;i<=o.cols;i++){ const x=i*N/o.cols; g.beginPath(); g.moveTo(x,0); g.lineTo(x,N); g.stroke(); } for(let i=0;i<=o.rows;i++){ const y=i*N/o.rows; g.beginPath(); g.moveTo(0,y); g.lineTo(N,y); g.stroke(); } }
      if(o.ties) for(let i=0;i<o.cols;i++) for(let j=0;j<o.rows;j++) for(const [a,b] of [[.25,.3],[.75,.3],[.25,.7],[.75,.7]]){ g.fillStyle='rgba(0,0,0,.32)'; g.beginPath(); g.arc((i+a)*N/o.cols,(j+b)*N/o.rows,2.4,0,7); g.fill(); } });
    const GW=K.col(0x2f3a42,{roughness:.08,metalness:.7}), MUL=K.col(0x24272a,{roughness:.45,metalness:.5});
    // 월드 좌표 UV(면 방향별 투영) — 기울어진 상자·압출에도 벽돌 결이 같은 크기로
    const wuv=(g,tm)=>{ if(g.index) g=g.toNonIndexed(); g.computeVertexNormals(); const p=g.attributes.position,n=g.attributes.normal; let uv=g.attributes.uv; if(!uv){ uv=new T.BufferAttribute(new Float32Array(p.count*2),2); g.setAttribute('uv',uv); } for(let i=0;i<p.count;i++){ const ax=Math.abs(n.getX(i)), ay=Math.abs(n.getY(i)), az=Math.abs(n.getZ(i)); let u,v; if(ay>=ax&&ay>=az){ u=p.getX(i); v=p.getZ(i); } else if(ax>=az){ u=p.getZ(i); v=p.getY(i); } else { u=p.getX(i); v=p.getY(i); } uv.setXY(i,u/tm,v/tm); } uv.needsUpdate=true; return g; };
    // 윗면이 기울어진 상자: top(x,z) → 윗면 높이(평면이면 정확)
    const prism=(x0,x1,z0,z1,y0,top,mat)=>{ let g=new T.BoxGeometry(x1-x0,1,z1-z0); g.translate((x0+x1)/2,y0+.5,(z0+z1)/2); const p=g.attributes.position; for(let i=0;i<p.count;i++) if(p.getY(i)>y0+.5) p.setY(i,top(p.getX(i),p.getZ(i))); g=mat.map?wuv(g,mat.userData.tm||3):(g.computeVertexNormals(),g); Q(mat,g); return g; };
    // 평면 다각형 압출(바닥 y0, 높이 h) — 월드 UV
    const exG=(pts,y0,h,mat)=>{ const sh=new T.Shape(); pts.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); let g=new T.ExtrudeGeometry(sh,{depth:h,bevelEnabled:false}); g.rotateX(-Math.PI/2); g.translate(0,y0,0); g=wuv(g,(mat.userData&&mat.userData.tm)||3); Q(mat,g); return g; };
    const place=(g,x,y,z,ry,mat)=>{ if(ry) g.rotateY(ry); g.translate(x,y,z); Q(mat,g); return g; };
    // 개구부 윤곽(로컬 XY, 바닥 중심 0,0): kind 'r' 사각 · 'a' 반원 아치 · 'p' 첨두 아치 · 'c' 원 — 높이 h는 아치 꼭대기까지
    const opPts=(kind,w,h)=>{ const P=[]; const hw=w/2; if(kind==='c'){ for(let i=0;i<=32;i++){ const a=i/32*Math.PI*2; P.push([Math.cos(a)*hw,hw+Math.sin(a)*hw]); } return P; }
      if(kind==='r'){ return [[-hw,0],[hw,0],[hw,h],[-hw,h]]; }
      if(kind==='a'){ const ys=h-hw; P.push([-hw,0],[hw,0]); for(let i=0;i<=16;i++){ const a=i/16*Math.PI; P.push([Math.cos(a)*hw,ys+Math.sin(a)*hw]); } return P; }
      const ap=.866*w, ys=Math.max(0,h-ap); P.push([-hw,0],[hw,0]); for(let i=0;i<=10;i++){ const t=i/10*Math.PI/3; P.push([-hw+w*Math.cos(t),ys+w*Math.sin(t)]); } for(let i=1;i<=10;i++){ const t=Math.PI/3+i/10*Math.PI/3; P.push([hw+w*Math.cos(t),ys+w*Math.sin(t)]); } return P; };
    const shp=pts=>{ const s=new T.Shape(); pts.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y)); return s; };
    // 창: 벽면(바깥면 위치 x,z, 방향 ry: 0=+z, PI=-z, PI/2=+x, -PI/2=-x)에 유리(어둡게 반사) + 테두리(fr 폭, dp 깊이) + 문설주 mv + 창턱
    const GLW=K.col(0x2a3540,{roughness:.07,metalness:.75}), GLS=K.col(0x3c5f78,{roughness:.1,metalness:.55,emissive:0x0b1a26});
    const opening=(kind,x,y,z,ry,w,h,o)=>{ o=o||{}; const fr=o.fr===undefined?.16:o.fr, dp=o.dp===undefined?.22:o.dp, wall=o.wall||K.M.stone, gl=o.glass||GLW;
      const g=new T.ShapeGeometry(shp(opPts(kind,w,h)),12); g.translate(0,0,.03); place(g,x,y,z,ry,gl);
      if(fr>0){ const out=shp(kind==='c'?opPts('c',w+2*fr,0).map(([a,b])=>[a,b-fr]):opPts(kind,w+2*fr,h+2*fr).map(([a,b])=>[a,b-fr])); out.holes.push(new T.Path(opPts(kind,w,h).map(([a,b])=>new T.Vector2(a,b)))); place(new T.ExtrudeGeometry(out,{depth:dp,bevelEnabled:false,curveSegments:8}),x,y,z,ry,o.trim||wall); }
      if(o.sill!==false&&kind!=='c') place(new T.BoxGeometry(w+2*fr+.12,.12,dp+.1).translate(0,-.06,(dp+.1)/2),x,y,z,ry,o.trim||wall);
      if(o.mv){ for(let i=1;i<o.mv;i++){ const g2=new T.BoxGeometry(.07,h-(kind==='r'?0:w*.2),.06); g2.translate(-w/2+w*i/o.mv,(h-(kind==='r'?0:w*.2))/2,.06); place(g2,x,y,z,ry,o.mul||MUL); } }
      if(o.mh){ for(let i=1;i<=o.mh;i++){ const yy=(kind==='r'?h:h-w/2)*i/(o.mh+(kind==='r'?1:0)); const g2=new T.BoxGeometry(w,.06,.06); g2.translate(0,yy,.06); place(g2,x,y,z,ry,o.mul||MUL); } } };
    const L=i=>{ flush(); K.layer(i); }; const LIFE=f=>{ flush(); PUTG=K.life; f(); flush(); PUTG=null; };
    E.own();
    const tileTex=(key,base,c1,c2,c3)=>E.tex(key,512,(g,N,rr)=>{ g.fillStyle=base; g.fillRect(0,0,N,N); const n=4, s=N/n; for(let i=0;i<n;i++) for(let j=0;j<n;j++){ const cx=(i+.5)*s, cy=(j+.5)*s; g.strokeStyle=c1; g.lineWidth=4; g.beginPath(); for(let k=0;k<12;k++){ const a=k/12*Math.PI*2; const r=k%2?s*.24:s*.44; g[k?'lineTo':'moveTo'](cx+Math.cos(a)*r,cy+Math.sin(a)*r); } g.closePath(); g.stroke(); g.fillStyle=c2; g.beginPath(); g.arc(cx,cy,s*.1,0,7); g.fill(); g.strokeStyle=c3; g.lineWidth=2; g.strokeRect(i*s+3,j*s+3,s-6,s-6); } for(let i=0;i<2500;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.05)':'rgba(0,0,0,.06)'; g.fillRect(rr()*N,rr()*N,2,2); } });
    const TBL=TMat(tileTex('dor_t','#25579a','#9fd0e6','#f0e3b0','#163f78'),2.4,{roughness:.35});
    const TBN=TMat(tileTex('dor_t2','#1b3f78','#e9eef2','#e9eef2','#e9eef2'),1.4,{roughness:.35}); // 글씨 띠
    const MRB=TMat(panelTex('dor_m',{base:'#e4e0d6',tones:['#d9d4c8','#ece9e1','#cfc9bb','#e0d8c6'],blot:240,bs:18,ba:.22,seam:'#bdb7aa',cols:4,rows:3,sw:1.6}),3.4,{roughness:.5});
    const GOLD=K.col(0xe9bf4c,{roughness:.28,metalness:.7,emissive:0x2a1c04}), LEAD=K.col(0x8b9096,{roughness:.55,metalness:.4}), GLD8=K.col(0x2b3d52,{roughness:.1,metalness:.5,emissive:0x0a1420}), DOOR=K.col(0x6b4a2a,{roughness:.6,metalness:.2}), ST=K.col(0xd8cdb6,{roughness:.9}), ST2=K.col(0xc9bc9f,{roughness:.92}), COL=K.col(0xd9d2c4,{roughness:.5}), GRN=K.col(0x5d7d4a,{roughness:.8});
    const PAV=flat(TMat(panelTex('dor_pv',{base:'#d9cfb8',tones:['#d0c5ac','#e2d9c5','#c7bb9f'],blot:160,bs:10,seam:'#b7aa8d',cols:6,rows:6,sw:1.5}),5,{roughness:.92}));
    const S8=20.6, AP=S8/(2*Math.tan(Math.PI/8)), RC=S8/(2*Math.sin(Math.PI/8)); // 변 · 아포템 · 외접 반지름
    const octPts=(r)=>Array.from({length:8},(_,i)=>{ const a=Math.PI/8+i*Math.PI/4; return [Math.cos(a)*r,Math.sin(a)*r]; });
    const octPrism=(r,y0,h,mat)=>exG(octPts(r),y0,h,mat);

    // ---------- 0: 단 위 대리석 기단 ----------
    L(0);
    octPrism(RC+1.6,0,.35,MRB); octPrism(RC+.6,.35,.35,MRB);
    // ---------- 1: 팔각 바깥벽(아래 대리석 · 위 타일 · 창 5 × 8면 − 문 자리) + 네 방위 현관 ----------
    L(1);
    octPrism(RC,.7,5.3,MRB); octPrism(RC+.05,6.0,5.2,TBL); octPrism(RC+.12,11.2,1.9,TBN); octPrism(RC+.2,13.1,.3,K.col(0x163f78,{roughness:.4}));
    for(let f=0;f<8;f++){ const a=f*Math.PI/4; const nx=Math.cos(a), nz=Math.sin(a); const ry=Math.PI/2-a; const door=f%2===0; // 면 방향: 0 동 · 2 남(+z) · 4 서 · 6 북
      for(let k=-2;k<=2;k++){ const t=k*3.6; const x=nx*(AP+.06)-nz*t, z=nz*(AP+.06)+nx*t; if(door&&k===0) continue; opening('a',x,6.6,z,ry,1.9,3.9,{wall:TBL,trim:K.col(0xe8e2d2,{roughness:.5}),glass:GLD8,fr:.28,dp:.3}); if(!door||k!==0) opening('a',x,1.6,z,ry,2.2,3.6,{wall:MRB,glass:K.col(0xcfc8b8,{roughness:.6}),fr:.18,dp:.12,sill:false}); }
      if(door){ const px=nx*(AP+2.2), pz=nz*(AP+2.2); B(px,.7,pz,11,8.8,4.4,MRB,ry); B(px,9.5,pz,11.6,.6,5,K.col(0x163f78,{roughness:.4}),ry); B(nx*(AP+4.5),.7,nz*(AP+4.5),11.4,.25,.6,MRB,ry);
        for(const t of [-4.2,-1.6,1.6,4.2]) C(nx*(AP+4.6)-nz*t,.7,nz*(AP+4.6)+nx*t,.32,7.2,COL,10,.3);
        opening('a',nx*(AP+4.42),.7,nz*(AP+4.42),ry,4,7.2,{wall:MRB,glass:K.col(0x2a2622,{roughness:.8}),fr:.3,dp:.3,sill:false}); opening('r',nx*(AP+.1),.7,nz*(AP+.1),ry,2.6,4.8,{wall:MRB,glass:DOOR,fr:.3,dp:.3,sill:false}); } }
    // 바깥 지붕(납판, 팔각 → 드럼 쪽으로 낮게 오름)
    { const g=new T.CylinderGeometry(12.2,RC-1.0,2.4,8,1); g.rotateY(Math.PI/8); g.translate(0,12.6+1.2,0); Q(LEAD,g); }
    // ---------- 2: 드럼(타일 · 창 16) + 금빛 돔 + 첨탑(초승달) ----------
    L(2);
    C(0,14.5,0,11.6,10,TBL,40,11.6); C(0,24.5,0,11.9,1.1,TBN,40,11.9); C(0,25.6,0,11.7,.3,K.col(0x163f78),40,11.7);
    for(let i=0;i<16;i++){ const a=(i+.5)/16*Math.PI*2; opening('a',Math.cos(a)*11.62,17.4,Math.sin(a)*11.62,Math.PI/2-a,1.7,4.4,{wall:TBL,trim:K.col(0xe8e2d2),glass:GLD8,fr:.22,dp:.25}); }
    { const pts=[]; const r=10.4, h=10.6; for(let i=0;i<=24;i++){ const t=i/24; const rr=r*Math.pow(Math.cos(t*Math.PI/2),.78)*(1+.04*Math.sin(t*Math.PI)); pts.push(new T.Vector2(Math.max(.05,rr),t*h)); } const g=new T.LatheGeometry(pts,48); g.translate(0,25.9,0); Q(GOLD,g);
      C(0,36.3,0,.25,1.1,GOLD,8,.18); const s=new T.SphereGeometry(.45,10,8); s.translate(0,37.6,0); Q(GOLD,s); C(0,37.9,0,.08,1.2,GOLD,6,.06); const cr=new T.TorusGeometry(.6,.1,6,14,Math.PI*1.35); cr.rotateZ(-Math.PI*.18); cr.translate(0,39.6,0); Q(GOLD,cr); }
    // ---------- 3: 사슬의 돔(동쪽 작은 열린 정자: 바깥 11기둥 · 안쪽 6기둥 · 육각 드럼 · 작은 돔) ----------
    L(3);
    { const cx=38, cz=0; exG(octPts(7.2).map(([x,z])=>[x+cx,z+cz]),0,.45,MRB); for(let i=0;i<11;i++){ const a=i/11*Math.PI*2; C(cx+Math.cos(a)*6.4,.45,cz+Math.sin(a)*6.4,.22,3.6,COL,8,.2); } for(let i=0;i<6;i++){ const a=i/6*Math.PI*2; C(cx+Math.cos(a)*3,.45,cz+Math.sin(a)*3,.22,3.6,COL,8,.2); }
      { const g=new T.CylinderGeometry(6.9,7.1,.7,11); g.translate(cx,4.4,cz); Q(MRB,g); const g2=new T.CylinderGeometry(4.5,7.0,1,11); g2.translate(cx,5.25,cz); Q(LEAD,g2); const g3=new T.CylinderGeometry(3.4,3.4,2.2,6); g3.translate(cx,6.8,cz); Q(TBL,g3); const d=new T.SphereGeometry(3.3,20,10,0,Math.PI*2,0,Math.PI/2); d.scale(1,1.05,1); d.translate(cx,7.9,cz); Q(LEAD,d); C(cx,11.3,cz,.08,1,GOLD,6,.06); } }
    flush();

    // ---------- 배경(K.life): 위 단(+0) · 아래 에스플러네이드(−4 m) · 계단과 카나티르 · 알아크사 · 구시가 · 동쪽 성벽 · 올리브산 ----------
    LIFE(()=>{
      B(0,-4.4,40,320,.4,500,flat(K.col(0xcfc3a8,{roughness:.95}))); // 하람 에스플러네이드(아래 단)
      B(0,-4,0,150,4,130,ST2); B(0,-.05,0,150,.05,130,PAV); // 위 단(높이 약 4 m)
      // 계단 + 카나티르(아치 문): 북 · 남 · 서
      const qan=(x,z,ry,n)=>{ const c=Math.cos(ry), s=Math.sin(ry); const P=(lx,lz)=>[x+lx*c+lz*s,z-lx*s+lz*c]; const W=n*4.2; for(let k=0;k<10;k++){ const p=P(0,1+k*.6); B(p[0],-4,p[1],W,4-(k+1)*.4,.6,ST,ry); } for(let i=0;i<=n;i++){ const p=P(-W/2+i*W/n,0); C(p[0],0,p[1],.3,4.4,COL,10,.28); } const sh=new T.Shape(); sh.moveTo(-W/2-.4,0); sh.lineTo(W/2+.4,0); sh.lineTo(W/2+.4,2.4); sh.lineTo(-W/2-.4,2.4); sh.lineTo(-W/2-.4,0); for(let i=0;i<n;i++){ const cxx=-W/2+(i+.5)*W/n; sh.holes.push(new T.Path(opPts('a',W/n-.7,2.0).map(([a,b])=>new T.Vector2(cxx+a,b-.0)))); } const g=new T.ExtrudeGeometry(sh,{depth:.8,bevelEnabled:false,curveSegments:8}); g.translate(0,3.0,-.4); g.rotateY(ry); g.translate(x,0,z); Q(ST,g); const p=P(0,0); B(p[0],5.4,p[1],W+1,.5,1.2,ST,ry); };
      qan(0,-65,Math.PI,4); qan(-30,-65,Math.PI,3); qan(0,65,0,4); qan(-30,65,0,3); qan(-75,0,-Math.PI/2,4); qan(-75,30,-Math.PI/2,3);
      // 알아크사 모스크(남쪽, 회색 납 돔 · 긴 기도실)
      B(-20,-4,235,56,10,80,ST); B(-20,6,235,57,.6,81,LEAD); C(-20,6.6,214,6.5,3,ST,20,6.5); { const d=new T.SphereGeometry(6.6,20,10,0,Math.PI*2,0,Math.PI/2); d.scale(1,1.15,1); d.translate(-20,9.6,214); Q(LEAD,d); } for(let i=0;i<7;i++) opening('a',-41+i*7,-4,194.9,Math.PI,4.4,6.8,{wall:ST,glass:K.col(0x3a332a),fr:.4,dp:.4});
      // 동쪽 성벽(키드론 골짜기 쪽) · 황금문
      B(165,-12,40,6,22,520,ST2); B(165,10,40,6.6,1.2,520.6,ST); B(165,-12,60,14,26,24,ST2); for(const dz of [-6,6]){ const d=new T.SphereGeometry(4.5,14,8,0,Math.PI*2,0,Math.PI/2); d.translate(165,14,60+dz); Q(LEAD,d); }
    });
    // 나무: 에스플러네이드 사이프러스 · 올리브
    { const Tr=[]; for(let k=0;k<90;k++){ const x=-150+E.r()*300, z=-200+E.r()*420; if(Math.abs(x)<85&&Math.abs(z)<75) continue; if(Math.abs(x+20)<40&&z>185&&z<285) continue; Tr.push([x,-4,z,E.r()<.4?11:6,E.r()<.4?2:0]); } E.forest(Tr); }
    // 구시가(서·북, 석회암 블록 + 작은 돔) · 올리브산(동쪽 언덕)
    { const Lb=[]; const pal=['#d9cdb2','#cfc1a2','#e2d7bf','#c6b796','#d4c6a8']; for(let x=-560;x<=520;x+=22) for(let z=-520;z<=560;z+=22){ if(x>-170&&x<180&&z>-230&&z<300) continue; if(x>190) continue; if(E.r()<.12) continue; Lb.push([x+(E.r()-.5)*6,z+(E.r()-.5)*6,14+E.r()*8,14+E.r()*8,6+E.r()*12,pal[Math.floor(E.r()*5)],-6]); } blocksY(Lb); }
    { const hf=(x,z)=>{ const d=x-230; return d>0?E.ss(d/380)*(90+30*E.fbm(z*.004,2,3)):-14*E.ss((x-170)/40)*E.ss((260-x)/40); }; const tr=E.terrain(170,2200,-2000,2000,60,50,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.01,z*.01,2); return [.66+.07*n,.6+.06*n,.48+.05*n]; }); E.forest(E.scatter(260,900,-700,700,30,tr.h,(x,z,h)=>E.r()<.35,()=>6+E.r()*3,0)); }
    skyDome(0,0,0,2200); tidy(0);
  }});
