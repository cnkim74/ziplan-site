__bsigFill({"changgyeong":function(K){
// 출처: 위키백과 영문 「Changgyeonggung」 — 명정전 1484 창건·1592 소실·1616 재건, 서울 궁궐 정전 중 가장 오래됨(국보) · 홍화문 동향 2층 목조문(1616 재건) · 옥천교 1483, 홍예 2, 길이 9.9 m 폭 6.6 m · 1909 연못(큰 못 6,483 ㎡·작은 못 1,107 ㎡, 섬 366 ㎡)
// 출처: 주간경향 2020-03-27 — 명정전 앞면 5칸·옆면 3칸 단층 / 서울시 미디어허브 1126227·1504265 — 대온실 1909 준공, 일본인 설계·프랑스 회사 시공, 하얀 철골·목조 혼합 구조 유리 외관, 2017-11 재개장, 앞 르네상스풍 분수, 용마루 오얏꽃 문양
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
    const GWA=K.M.giwa.clone(); GWA.side=T.DoubleSide; const RU=K.col(0x5a4a3c,DS()), RED=K.col(0x9a3b2a,{roughness:.8}), GRN=K.col(0x2f6b4f), BLU=K.col(0x2b5a8a), WH=K.col(0xe9e2d2,{roughness:.95}), DK=K.col(0x2e3a30,{roughness:.6}), DR=K.col(0x2b2a28), OC=K.col(0xc9a86a), BR=K.col(0x2f5a4b), ST=K.col(0xd4cfc3,{roughness:.9}), SG=K.col(0xbdb6a8,{roughness:.95}), SG2=K.col(0xa39c8e,{roughness:.95}), WLB=K.col(0x7d7466,{roughness:.95}), DOOR=K.col(0x7a4a2c,{roughness:.8}), EA=flat(K.col(0xd6cfc0,{roughness:1})), GRS=flat(K.M.grass), PV=flat(K.M.pave), PINE=K.M.leaf3, TRK=K.M.trunk;
    const COLS=[]; const col=(x,y,z,r,h)=>COLS.push([x,y,z,0,r,h,r]); // 기둥: 단위 원기둥을 (r,h,r)로 스케일
    const roof=(cx,ye,cz,E,D,H,o)=>{ o=o||{}; const dt=o.dt===undefined?.45:o.dt, so=o.sori===undefined?.6:o.sori, thk=o.thk||.35, sw=!!o.swap, mt=o.mat||GWA, um=o.under||UND; const EE=sw?D:E, DD=sw?E:D; const R=Math.max(0,EE-DD*(1-dt));
      const g=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),1.7); const y0=ye+H*(1-g(dt));
      const yf=(a,b)=>{ const aa=Math.abs(a)/(EE/2), bb=Math.abs(b)/(DD/2); const ta=Math.abs(a)>R/2?(Math.abs(a)-R/2)/(DD/2)+dt:0; return ye+H*(1-g(Math.max(bb,ta)))+so*Math.pow(aa,3)*Math.pow(bb,3); };
      const P=(a,b,y)=>sw?[cx+b,y,cz+a,b/2,a/2]:[cx+a,y,cz+b,a/2,b/2];
      const sheet=(a0,a1,m,dy,n)=>S(m,(u,v)=>{ const a=a0+(a1-a0)*u, b=-DD/2+DD*v; return P(a,b,yf(a,b)+dy); },n,o.nv||8);
      const segs=(dt>0&&dt<1)?[[-EE/2,-R/2,6],[-R/2,R/2,14],[R/2,EE/2,6]]:[[-EE/2,EE/2,o.nu||24]];
      for(const [a0,a1,n] of segs){ sheet(a0,a1,mt,0,n); sheet(a0,a1,um,-thk,n); }
      S(um,(u,v)=>{ const s=u*4, k=Math.floor(s), f=s-k; let a,b; if(k===0){a=-EE/2+EE*f;b=-DD/2;} else if(k===1){a=EE/2;b=-DD/2+DD*f;} else if(k===2){a=EE/2-EE*f;b=DD/2;} else {a=-EE/2;b=DD/2-DD*f;} const y=yf(a,b); return P(a,b,y-thk+thk*v); },48,1);
      if(dt>0){ for(const s of [-1,1]){ const a=s*R/2; S(o.gmat||um,(u,v)=>{ const b=-dt*DD/2+dt*DD*u; const yt=yf(a-s*.02,b), yb=y0-thk; return P(a-s*.05,b,yb+(yt-yb)*v); },8,1); } }
      if(R>.6&&o.ridge!==false){ if(o.noridge){ const gg=new T.CylinderGeometry(.55,.55,R+.3,8); gg.rotateZ(Math.PI/2); if(sw) gg.rotateY(Math.PI/2); gg.translate(cx,ye+H-.05,cz); Q(o.rmat||DR,gg); } else { const rw=o.rw||Math.max(.8,DD*.035), rhh=o.rh||Math.max(.5,H*.13); if(o.rmat) B(cx,ye+H-.15,cz,sw?rw:R+.5,rhh,sw?R+.5:rw,o.rmat); else { B(cx,ye+H-.22,cz,sw?rw:R+.3,rhh,sw?R+.3:rw,YS); B(cx,ye+H-.22+rhh,cz,sw?rw*.7:R+.6,.18,sw?R+.6:rw*.7,DR); if(R>3) for(const e of [-1,1]){ const ex=sw?cx:cx+e*(R/2+.15), ez=sw?cz+e*(R/2+.15):cz; B(ex,ye+H-.3,ez,rw*1.15,rhh+rw*1.2,rw*1.15,DR); } } } }
      if(o.hips!==false){ const hw=Math.max(.16,Math.min(.34,DD*.011)), hh=hw*1.1; const rib=(fa,n)=>S(YS,(u,v)=>{ const q=fa(u); const k=(v-.5)*2; const aa=q[0]+q[2]*k*hw, bb2=q[1]+q[3]*k*hw; return P(aa,bb2,yf(aa,bb2)+(1-Math.abs(k))*hh+.05); },n,2);
        for(const s of [-1,1]) for(const t of [-1,1]){ const a0=s*R/2, b0=t*Math.min(dt,1)*DD/2, a1=s*EE/2, b1=t*DD/2; if(dt<.99){ const L=Math.hypot(a1-a0,b1-b0)||1; rib(u=>[a0+(a1-a0)*u,b0+(b1-b0)*u,-(b1-b0)/L,(a1-a0)/L],10); } if(dt>.01&&R>1) rib(u=>[s*(R/2-.15),t*Math.min(dt,1)*DD/2*u,1,0],5); } } yf.E=EE; yf.D=DD; yf.dt=dt; yf.R=R; yf.sw=sw; yf.cx=cx; yf.cz=cz; return yf; };
    // 잡상: 추녀마루(모서리→용마루 끝) 위에 n개
    const japsang=(yf,n)=>{ const dt=Math.min(1,yf.dt||0); for(const s of [-1,1]) for(const t of [-1,1]){ const a0=s*yf.R/2, b0=t*dt*yf.D/2, a1=s*yf.E/2, b1=t*yf.D/2; for(let k=0;k<n;k++){ const q=.86-.4*k/Math.max(1,n-1); const a=a0+(a1-a0)*q, b=b0+(b1-b0)*q; const y=yf(a,b)+.3; if(yf.sw) B(yf.cx+b,y,yf.cz+a,.3,.48,.3,DR); else B(yf.cx+a,y,yf.cz+b,.3,.48,.3,DR); } const a=a0+(a1-a0)*.985, b=b0+(b1-b0)*.985; if(yf.sw) B(yf.cx+b,yf(a,b),yf.cz+a,.5,.75,.5,DR); else B(yf.cx+a,yf(a,b),yf.cz+b,.5,.75,.5,DR); } };
    const stairs=(x,z,yt,yb,w,n,axis,dir,mat)=>{ const rise=(yt-yb)/n, run=.42; for(let k=0;k<n-1;k++){ const h=yt-yb-(k+1)*rise, off=dir*(k+.5)*run; if(axis==='z') B(x,yb,z+off,w,h,run,mat||ST); else B(x+off,yb,z,run,h,w,mat||ST); } for(const s of [-1,1]){ const L=(n-1)*run; if(axis==='z') B(x+s*(w/2+.22),yb,z+dir*L/2,.44,yt-yb+.3,L+.3,mat||ST); else B(x+dir*L/2,yb,z+s*(w/2+.22),L+.3,yt-yb+.3,.44,mat||ST); } };
    // 전각: 기단 · 기둥 · 몸체(어두운 창호 + 세로 창살) · 머름·창방 · 공포 띠(녹·청 블록) · 지붕. o: base 기단높이, ch 기둥높이, nb 정면칸, nd 측면칸, dt(0 우진각 · .45 팔작 · 1 맞배), ov 처마 내밈, rh 지붕 높이, up:{W,D,ch} 상층, open 하층 개방(누각), y 바닥 레벨, noridge 무량각, mat 지붕 재료
    const hall=(cx,cz,W,D,o)=>{ o=o||{}; const y=o.y||0, b=o.base===undefined?.9:o.base, ch=o.ch||3.6, nb=o.nb||5, nd=o.nd||3, ov=o.ov||2.2, rh=o.rh||(Math.min(W,D)*.22+1.2), pad=o.pad===undefined?1.6:o.pad;
      if(b>0) B(cx,y,cz,W+2*pad,b,D+2*pad,o.bmat||ST); const y1=y+b; const r=o.r||Math.min(.34,.2+ch*.03);
      for(let i=0;i<=nb;i++) for(let j=0;j<=nd;j++){ if(i>0&&i<nb&&j>0&&j<nd) continue; col(cx-W/2+i*W/nb,y1,cz-D/2+j*D/nd,r,ch); }
      if(!o.open){ B(cx,y1,cz,W-.25,ch,D-.25,o.body||DK); B(cx,y1,cz,W-.2,.7,D-.2,o.sill||RED); if(o.lattice!==false){ for(let i=0;i<nb;i++){ const x0=cx-W/2+i*W/nb, x1=x0+W/nb; const n=Math.max(2,Math.round((x1-x0)/.45)); for(let k=1;k<n;k++) for(const s of [-1,1]) LAT.push([x0+(x1-x0)*k/n,y1+.8,cz+s*(D/2-.1),0,1,ch-1.4,1]); } } }
      else { B(cx,y1+ch-.05,cz,W+.3,.25,D+.3,o.floor||OC); if(o.rail) rail(cx,y1+ch+.2,cz,W+.3,D+.3,.9); }
      B(cx,y1+ch,cz,W+1.0,.45,D+1.0,CHB); B(cx,y1+ch-.12,cz,W+.9,.12,D+.9,RED); dapo(cx,y1+ch+.45,cz,W+1.1,D+1.1,o.step||1.5,o.plain); B(cx,y1+ch+1.35,cz,W+1.6,.4,D+1.6,BR);
      if(o.sign!==0&&!o.up&&!o.plain&&!o.swap&&!o.open&&W>=10) SIGN(cx,y1+ch-1.25,cz+D/2+.14,Math.min(3.2,W*.17)); let yr=y1+ch+1.75; const yf=roof(cx,yr,cz,W+2*ov,D+2*ov,o.up?rh*.72:rh,{dt:o.up?0:(o.dt===undefined?.45:o.dt),ridge:!o.up,swap:o.swap,sori:o.sori,thk:o.thk,gmat:OC,rh:o.rhh,noridge:o.noridge,mat:o.mat,nv:o.nv});
      if(o.up){ const u=o.up, W2=u.W, D2=u.D, c2=u.ch||ch*.8, y2=yr+(o.up.lift||2.2); const nb2=u.nb||Math.max(1,nb-2), nd2=u.nd||Math.max(1,nd-1); for(let i=0;i<=nb2;i++) for(let j=0;j<=nd2;j++){ if(i>0&&i<nb2&&j>0&&j<nd2) continue; col(cx-W2/2+i*W2/nb2,y2,cz-D2/2+j*D2/nd2,r*.85,c2); }
        B(cx,y2,cz,W2-.2,c2,D2-.2,o.body||DK); B(cx,y2,cz,W2-.15,.6,D2-.15,RED); for(let i=0;i<nb2;i++){ const x0=cx-W2/2+i*W2/nb2, x1=x0+W2/nb2; const n=Math.max(2,Math.round((x1-x0)/.45)); for(let k=1;k<n;k++) for(const s of [-1,1]) LAT.push([x0+(x1-x0)*k/n,y2+.7,cz+s*(D2/2-.08),0,1,c2-1.1,1]); }
        B(cx,y2+c2,cz,W2+1.0,.45,D2+1.0,CHB); dapo(cx,y2+c2+.45,cz,W2+1.1,D2+1.1,o.step||1.5,o.plain); B(cx,y2+c2+1.35,cz,W2+1.6,.4,D2+1.6,BR);
        if(o.sign!==0&&!o.plain&&!o.swap&&W2>=8) SIGN(cx,y2+c2-1.2,cz+D2/2+.14,Math.min(3.6,W2*.22)); const yr2=y2+c2+1.75; return roof(cx,yr2,cz,W2+2*ov,D2+2*ov,u.rh||rh,{dt:o.dt===undefined?.45:o.dt,swap:o.swap,sori:(o.sori||.6)*1.3,thk:(o.thk||.35)*1.2,gmat:OC,rh:.6,rw:1.0,mat:o.mat}); }
      return yf; };
    const LAT=[]; // 창살(세로 살) 인스턴스
    const dapo=(cx,y,cz,w,d,step,plain)=>{ if(plain){ B(cx,y,cz,w,.9,d,GRN); return; } const ring=[]; for(let x=-w/2+step/2;x<w/2;x+=step) ring.push([cx+x,cz-d/2,0],[cx+x,cz+d/2,0]); for(let z=-d/2+step/2;z<d/2;z+=step) ring.push([cx-w/2,cz+z,1],[cx+w/2,cz+z,1]); B(cx,y,cz,w-.3,.9,d-.3,GRN); ring.forEach((p,i)=>{ const ry=p[2]?Math.PI/2:0; B(p[0],y,p[1],.55,.9,.9,i%2?GRN:BLU,ry); B(p[0],y+.6,p[1],.7,.3,1.4,OC,ry); }); };
    const rail=(cx,y,cz,w,d,h)=>{ for(const [x0,z0,x1,z1] of [[-w/2,-d/2,w/2,-d/2],[w/2,-d/2,w/2,d/2],[w/2,d/2,-w/2,d/2],[-w/2,d/2,-w/2,-d/2]]){ const L=Math.hypot(x1-x0,z1-z0); const ax=Math.abs(x1-x0)>0; B(cx+(x0+x1)/2,y+h-.1,cz+(z0+z1)/2,ax?L+.1:.12,.1,ax?.12:L+.1,RED); const n=Math.max(2,Math.round(L/1.2)); for(let i=0;i<=n;i++){ const t=i/n; B(cx+x0+(x1-x0)*t,y,cz+z0+(z1-z0)*t,.1,h-.1,.1,RED); } } };
    // 담(궁장·사고석 담): 기단 + 회벽 + 기와 지붕 두 장, 축 정렬
    const wall=(x0,z0,x1,z1,h,o)=>{ o=o||{}; const ax=Math.abs(x1-x0)>Math.abs(z1-z0); const L=ax?Math.abs(x1-x0):Math.abs(z1-z0); const cx=(x0+x1)/2, cz=(z0+z1)/2, y=o.y||0, t=o.t||.8; const w=ax?L:t, d=ax?t:L; B(cx,y,cz,w,h*.4,d,o.base||WLB); B(cx,y+h*.4,cz,w,h*.6,d,o.mat||WH); B(cx,y+h,cz,w+(ax?.3:.9),.2,d+(ax?.9:.3),RU); B(cx,y+h+.2,cz,w+(ax?.2:.7),.18,d+(ax?.7:.2),DR); };
    // 행각(회랑): 기단 + 기둥 2열 + 바깥 회벽 + 맞배지붕. axis 'x'|'z', out = 바깥쪽 부호
    const corr=(cx,cz,len,axis,out,o)=>{ o=o||{}; const ax=axis==='x', y=o.y||0, wd=o.w||6.2, ch=o.ch||3.4; B(cx,y,cz,ax?len:wd+1.2,.6,ax?wd+1.2:len,ST); const n=Math.round(len/4.2); for(let i=0;i<=n;i++){ const t=-len/2+i*len/n; for(const r of [-wd/2+.3,wd/2-.3]) col(ax?cx+t:cx+r,y+.6,ax?cz+r:cz+t,.27,ch); }
      if(out){ B(ax?cx:cx+out*(wd/2-.3),y+.6,ax?cz+out*(wd/2-.3):cz,ax?len:.4,ch,ax?.4:len,WH); B(ax?cx:cx+out*(wd/2-.3),y+.6,ax?cz+out*(wd/2-.3):cz,ax?len+.1:.46,.9,ax?.46:len+.1,WLB); }
      B(cx,y+.6+ch,cz,ax?len+.4:wd+.6,.45,ax?wd+.6:len+.4,CHB); B(cx,y+1.05+ch,cz,ax?len+.6:wd+1.0,.5,ax?wd+1.0:len+.6,BR); roof(cx,y+1.55+ch,cz,ax?len+2.4:wd+3.4,ax?wd+3.4:len+2.4,o.rh||2.3,{swap:!ax,dt:1,thk:.3,sori:.3,gmat:OC,nv:6}); };
    const paving=(cx,y,cz,w,d,sx,sz)=>{ for(let x=-w/2+sx*(.6+rnd()*.5);x<w/2-.5;x+=sx*(.75+rnd()*.5)) B(cx+x,y,cz,.09,.025,d,SG2); for(let z=-d/2+sz*(.6+rnd()*.5);z<d/2-.5;z+=sz*(.75+rnd()*.5)) B(cx,y,cz+z,w,.025,.09,SG2); };
    const finishHanok=()=>{ flush(); inst(cylG(1,1,10,.92),RED,COLS); inst((()=>{ const g=new T.BoxGeometry(1,1,1); g.translate(0,.5,0); return g; })(),SG,COLS.map(c=>[c[0],c[1]-.03,c[2],0,c[4]*2.5,.34,c[4]*2.5])); inst((()=>{ const g=new T.BoxGeometry(.07,1,.07); g.translate(0,.5,0); return g; })(),OC,LAT,false); COLS.length=0; LAT.length=0; };
    const PAV=flat(K.col(0xcfc8ba,{roughness:.95})), WAT=K.M.water, HBR=K.col(0xa0522d,{roughness:.9}), SKIN=K.col(0xb9b3a6,{roughness:.95}), ISL=K.col(0xd8cfb4,{roughness:1});
    const YS=K.col(0xcfc9bd,{side:K.T.DoubleSide,roughness:.9}), UND=K.col(0x3a594e,{side:K.T.DoubleSide,roughness:.85}), CHB=K.col(0x3f7564,{roughness:.8}); const SIGN=(x,y,z,w)=>{ const h=w*.48; B(x,y-h,z,w+.3,h+.3,.12,OC); B(x,y-h+.15,z+.04,w,h,.12,K.col(0x22324a,{roughness:.6})); };
    // ---- 공용(v18 B): 재질 질감 · 아치창(반원/첨두) · 장미창 · 박공·맞배 · 첨탑 · 돔 · 도시 배경 ----
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
    // 장미창: 원 유리 + 바깥 고리 + 바퀴살 트레이서리
    const circ=(r,n)=>Array.from({length:n||32},(_,i)=>[Math.cos(i/(n||32)*6.2832)*r,Math.sin(i/(n||32)*6.2832)*r]);
    const rose=(x,y,z,ry,r,o)=>{ o=o||{}; const fr=o.fr||.3, tr=o.trim||K.M.stone; const g=new T.CircleGeometry(r,32); g.translate(0,0,.03); place(g,x,y,z,ry,o.glass||GLS); const s2=shp(circ(r+fr)); s2.holes.push(new T.Path(circ(r).map(([a,b])=>new T.Vector2(a,b)))); place(new T.ExtrudeGeometry(s2,{depth:o.dp||.25,bevelEnabled:false}),x,y,z,ry,tr);
      const n=o.n||12; for(let i=0;i<n;i++){ const b=new T.BoxGeometry(2*r,.07,.07); b.rotateZ(i/n*Math.PI); b.translate(0,0,.08); place(b,x,y,z,ry,tr); } const c=new T.CircleGeometry(r*.22,16); c.translate(0,0,.11); place(c,x,y,z,ry,tr); };
    // 맞배 지붕 매스(용마루 축 alongZ): 처마 상자 x0..x1, z0..z1, 처마 높이 y, 용마루 높이 y+h, 두께 t — 반쪽 프리즘 2개
    const gableRoof=(x0,x1,z0,z1,y,h,mat,alongZ,t)=>{ t=t||.3; if(alongZ){ const xm=(x0+x1)/2, hw=(x1-x0)/2; prism(x0,xm,z0,z1,y-t,(x,z)=>y+h*(x-x0)/hw,mat); prism(xm,x1,z0,z1,y-t,(x,z)=>y+h*(x1-x)/hw,mat); } else { const zm=(z0+z1)/2, hd=(z1-z0)/2; prism(x0,x1,z0,zm,y-t,(x,z)=>y+h*(z-z0)/hd,mat); prism(x0,x1,zm,z1,y-t,(x,z)=>y+h*(z1-z)/hd,mat); } };
    // 박공벽(삼각): 밑변 w, 높이 h, 두께 t, 방향 ry(0이면 z면에 놓임)
    const tri=(x,y,z,w,h,t,mat,ry)=>{ let g=new T.ExtrudeGeometry(shp([[-w/2,0],[w/2,0],[0,h]]),{depth:t,bevelEnabled:false}); g.translate(0,0,-t/2); if(ry) g.rotateY(ry); g.translate(x,y,z); g=mat.map?wuv(g,mat.userData.tm||3):g; Q(mat,g); };
    // 첨탑(n각뿔) · 돔(반구 비례) · 양파형 돔
    const spire=(x,y,z,r,h,mat,n)=>{ const g=new T.CylinderGeometry(.03,r,h,n||8); if((n||8)===4) g.rotateY(Math.PI/4); g.translate(x,y+h/2,z); Q(mat,g); };
    const dome=(x,y,z,r,h,mat,seg)=>{ const g=new T.SphereGeometry(r,seg||20,10,0,Math.PI*2,0,Math.PI/2); g.scale(1,h/r,1); g.translate(x,y,z); Q(mat,g); };
    const onion=(x,y,z,r,h,mat)=>{ const pts=[]; for(let i=0;i<=16;i++){ const t=i/16; const rr=r*(t<.45?(1+.18*Math.sin(t/.45*Math.PI/2)):1.18*Math.cos((t-.45)/.55*Math.PI/2)); pts.push(new T.Vector2(Math.max(.02,rr),t*h)); } const g=new T.LatheGeometry(pts,20); g.translate(x,y,z); Q(mat,g); };
    const cross=(x,y,z,s,mat)=>{ B(x,y,z,.14*s,1.6*s,.14*s,mat); B(x,y+1.0*s,z,.8*s,.14*s,.14*s,mat); };
    // 질감 재질
    const BKR=TMat(brickTex('bkR18',{rows:18,per:6,mor:'#9a8b7c',tones:['#7c3a29','#86412e','#733526','#8d4732','#7a3c2b','#6e3324','#934c36'],speck:5}),1.2,{roughness:.93});
    const BKG=TMat(brickTex('bkG18',{rows:18,per:6,mor:'#8f8a82',tones:['#77746f','#6c6a66','#807d77','#5f5d5a','#86827b','#716e69'],speck:4}),1.2,{roughness:.93});
    const GRA=TMat(panelTex('gra18',{base:'#c9c4b8',tones:['#bcb6aa','#d4cfc4','#b3ad9f','#c1bbaf'],blot:260,bs:10,ba:.25,seam:'#9d978b',cols:4,rows:8,sw:2,noise:6000}),3.2,{roughness:.9});
    const SLT=TMat(panelTex('slt18',{base:'#4b5058',tones:['#3f444b','#565c64','#474c53'],blot:200,bs:8,ba:.3,seam:'#353a40',cols:16,rows:22,sw:1.6}),3.0,{roughness:.6,metalness:.15});
    const ASPH=K.col(0x4a4c50,{roughness:.95}), SIDE=TMat(panelTex('swk18',{base:'#bdb6aa',tones:['#a9a294','#cac3b5'],blot:120,bs:14,seam:'#948d81',cols:8,rows:8,sw:1.5}),2.4,{roughness:.9}), CURB=K.col(0xcac5bb,{roughness:.9}), LINE=K.col(0xeeeeea), YEL=K.col(0xd7c46a);
    // 도로 한 줄(축 정렬): 아스팔트 + 차선
    const road=(x,z,w,d,o)=>{ o=o||{}; B(x,.01,z,w,.04,d,ASPH); const ax=w>d; const L=ax?w:d; if(o.center!==false) B(x,.05,z,ax?L:.18,.01,ax?.18:L,YEL); if(o.lanes) for(const off of o.lanes) for(let t=-L/2;t<L/2;t+=9) B(ax?x+t+1.5:x+off,.05,ax?z+off:z+t+1.5,ax?3:.14,.01,ax?.14:3,LINE); };
    K.life.clear(); own();
    // 좌표: +z 동쪽(홍화문·창경궁로, 정면), +x 북쪽(춘당지·대온실), -z 서쪽(내전·창덕궁 숲)
    const GATE=K.col(0x8a3a28,{roughness:.8}), WHF=K.col(0xf2f0ea,{roughness:.5,metalness:.1}), GLG=K.col(0xd6e8ea,{roughness:.05,metalness:.2,transparent:true,opacity:.32,depthWrite:false,side:T.DoubleSide}), PLT=K.col(0x4f7a42,{roughness:.95}), PLT2=K.col(0x6d9450,{roughness:.95}), TILE=K.col(0xb48a6a,{roughness:.8});
    const XS=-84, XN=222, ZE=166, ZW=-140; // 궁역 축약(남 -112 · 북 272 · 동 166 · 서 -140)
    L(0);
    // ---- 바닥: 궁 안 마사토 · 어도 박석 · 잔디 ----
    E.plane(E.MAS,(XS+XN)/2,.08,(ZE+ZW)/2,XN-XS,ZE-ZW,Q);
    E.plane(E.BAK,0,.1,126,9,46,Q); E.plane(E.BAK,0,.1,155,30,20,Q);
    // 궁장(동쪽 = 홍화문 좌우 · 남쪽) — 기와 얹은 담
    wall(XS,ZE,-9,ZE,4.0); wall(9,ZE,XN,ZE,4.0); wall(XS,ZE,XS,ZW,3.6); wall(XN,ZE,XN,60,3.4);
    // ---- 홍화문: 정면 3칸 · 측면 2칸 2층 우진각(동향) ----
    { const z=ZE; B(0,0,z,17,.9,9.5,ST); stairs(0,z+5.6,.9,0,8,3,'z',1); stairs(0,z-5.6,.9,0,8,3,'z',-1);
      hall(0,z,13.6,6.6,{y:.9,base:0,ch:4.4,nb:3,nd:2,ov:2.5,dt:0,rh:3.6,up:{W:12.8,D:6.0,ch:2.9,nb:3,nd:2,rh:4.1,lift:1.5},step:1.3,lattice:false,body:GATE});
      for(const x of [-4.5,0,4.5]) B(x,.9,z+3.35,3.6,3.7,.1,K.col(0x6e2a1e,{roughness:.75})); } // 판문 3
    // ---- 금천 + 옥천교(1483, 홍예 2 · 9.9 × 6.6 m) ----
    { const z=118, CW=7.5; B((XS+XN)/2-60,-.02,z,XN-XS-120,.06,CW+2,K.col(0x7d8a86)); B((XS+XN)/2-60,.04,z,XN-XS-120,.02,CW,K.M.water); for(const s of [-1,1]) B((XS+XN)/2-60,0,z+s*(CW/2+.5),XN-XS-120,.7,1.0,SG);
      B(0,0,z,6.6,.9,9.9,SG); for(const s of [-1,1]){ const g=archG(1.5,6.7,false); g.translate(s*1.9,-.6,z); Q(K.col(0x3b3a36),g); } // 홍예 2(물 위 어두운 반원)
      B(0,.9,z,6.6,.22,11.2,ST); for(const s of [-1,1]){ for(let i=0;i<=5;i++) B(s*3.05,1.12,z-5.2+i*2.08,.3,.95,.3,SG); B(s*3.05,1.72,z,.22,.18,10.6,SG); B(s*3.05,1.3,z,.12,.1,10.6,SG2); } // 난간(동자주·돌난대)
      for(const [s,t] of [[-1,-1],[1,-1],[-1,1],[1,1]]){ const g=new T.SphereGeometry(.45,8,6); g.scale(1,1.2,1.4); g.translate(s*3.05,2.15,z+t*5.3); Q(SG2,g); } } // 서수(약식)
    // ---- 명정문(3칸 단층 팔작) + 행각 · 명정전 마당(박석·품계석·삼도) ----
    const ZM=88, ZH=42, MX=26, ZB=12; // 명정문 · 명정전 중심 · 마당 반폭 · 뒤 행각
    hall(0,ZM,11.6,6,{base:1.0,ch:3.8,nb:3,nd:2,ov:2.2,rh:3.6,lattice:false,body:GATE,step:1.3}); stairs(0,ZM+4.2,1.0,0,5,3,'z',1); stairs(0,ZM-4.2,1.0,0,5,3,'z',-1);
    corr(-(MX+5.8)/2,ZM,MX-5.8,'x',1); corr((MX+5.8)/2,ZM,MX-5.8,'x',1);
    corr(-MX,(ZM+ZB)/2,ZM-ZB+6,'z',-1); corr(MX,(ZM+ZB)/2,ZM-ZB+6,'z',1); corr(0,ZB,2*MX+6,'x',-1);
    E.plane(E.BAK,0,.12,(ZM+ZB)/2+2,2*MX-6,ZM-ZB-6,Q); B(0,.1,70,2.4,.2,26,ST); for(const s of [-1,1]) B(s*3.0,.1,70,1.8,.12,26,SG); // 삼도
    for(let i=0;i<12;i++){ const x=(i<6?-1:1)*5.0, z=60+(i%6)*3.2; B(x,.06,z,.8,.16,.7,SG2); B(x,.22,z,.3,.9,.26,SG2); } // 품계석(정·종 1~3품 축약)
    // 명정전: 2단 월대 + 정면 5칸 · 측면 3칸 단층 팔작
    B(0,0,ZH,34,.95,24,ST); B(0,.95,ZH,28,.95,18,ST); E.plane(E.BAK,0,.96,ZH,34,24,Q); E.plane(E.BAK,0,1.91,ZH,28,18,Q);
    for(const x of [-4,0,4]) stairs(x,ZH+12,.95,0,3.2,3,'z',1); for(const x of [-4,0,4]) stairs(x,ZH+9,1.9,.95,3.2,3,'z',1);
    for(const s of [-1,1]){ for(let i=0;i<=8;i++) B(s*17,.95,ZH-12+i*3,.3,.8,.3,SG); B(s*17,1.65,ZH,.24,.14,24,SG); }
    const yfM=hall(0,ZH,19.5,10.4,{y:1.9,base:.8,ch:4.6,nb:5,nd:3,ov:3.4,rh:4.6,step:1.45,r:.4}); japsang(yfM,5);
    // 문정전(편전, 남향 3칸) · 숭문당 · 빈양문
    hall(-46,46,10,12,{base:1.0,ch:3.6,nb:3,nd:3,ov:2.2,rh:3.8,swap:1}); wall(-58,30,-58,62,2.6,{t:.45}); wall(-58,62,-34,62,2.6,{t:.45});
    hall(0,-4,15,8,{base:1.1,ch:3.4,nb:4,nd:2,ov:2.0,rh:3.4}); hall(0,ZB,6,5,{base:.7,ch:3.2,nb:1,nd:1,ov:1.6,dt:1,rh:2.6,plain:1});
    // ---- 내전(서쪽, 지형 따라 단 높여 앉힘): 함인정 · 환경전 · 경춘전 · 양화당 · 통명전(용마루 없음 + 연지) ----
    const terr=(x,z,w,d,h)=>{ B(x,0,z,w,h,d,WLB); E.plane(E.MAS,x,h+.01,z,w-.2,d-.2,Q); B(x,h,z,w+.2,.12,d+.2,SG); };
    terr(18,-30,34,30,.9); hall(18,-30,9,9,{y:.9,base:.6,ch:3.4,nb:3,nd:3,ov:2.4,rh:3.8,open:1,rail:0,plain:1}); // 함인정(사방 트인 정자)
    terr(56,-26,40,22,1.4); hall(56,-26,26,10,{y:1.4,base:.9,ch:3.4,nb:9,nd:3,ov:2.4,rh:4.0,swap:0}); // 환경전
    terr(52,-62,22,34,2.0); hall(52,-62,10,24,{y:2.0,base:.9,ch:3.4,nb:3,nd:7,ov:2.4,rh:4.0,swap:1}); // 경춘전(동향)
    terr(96,-40,34,22,2.6); hall(96,-40,21,12,{y:2.6,base:.9,ch:3.4,nb:6,nd:4,ov:2.4,rh:4.2}); // 양화당
    terr(90,-92,48,34,3.2); B(84,3.2,-80,30,.9,10,ST); E.plane(E.BAK,84,4.11,-80,30,10,Q); const yfT=hall(84,-95,26,14,{y:3.2,base:.9,ch:3.8,nb:7,nd:4,ov:2.8,rh:4.6,noridge:1}); stairs(84,-74.2,4.1,3.2,4,3,'z',1); // 통명전 + 월대
    { const px=106, pz=-104; B(px,3.2,pz,8,.5,12,SG); B(px,3.25,pz,6.6,.02,10.6,K.M.water); for(const s of [-1,1]){ for(let i=0;i<=4;i++) B(px+s*4.1,3.7,pz-5.6+i*2.8,.24,.7,.24,SG); B(px+s*4.1,4.3,pz,.18,.12,11.4,SG); } B(px,3.7,pz,2,.25,1.2,SG2); } // 연지(돌 연못 + 난간)
    wall(30,-8,120,-8,2.6,{t:.45}); wall(120,-8,120,-122,2.6,{t:.45}); wall(30,-122,120,-122,2.6,{t:.45});
    // ---- 춘당지(1909): 큰 못(약 100 × 65) + 작은 못 + 섬 · 팔각칠층석탑 ----
    { const pond=(cx,cz,rx,rz,n)=>{ const pts=[]; for(let i=0;i<n;i++){ const a=i/n*Math.PI*2, k=1+.08*Math.sin(a*3)+.05*Math.cos(a*5); pts.push([cx+Math.cos(a)*rx*k,cz+Math.sin(a)*rz*k]); } return pts; };
      const big=pond(118,12,40,27,40), small=pond(62,66,16,10,28); for(const P of [big,small]){ exG(P.map(([x,z])=>[x,z]),-.05,.12,K.col(0x8e9a8a,{roughness:1})); const g=new T.ShapeGeometry(shp(P.map(([x,z])=>[x,-z]))); g.rotateX(-Math.PI/2); g.translate(0,.12,0); Q(K.M.water,g); for(let i=0;i<P.length;i++){ const [x0,z0]=P[i], [x1,z1]=P[(i+1)%P.length]; const L2=Math.hypot(x1-x0,z1-z0); B((x0+x1)/2,0,(z0+z1)/2,L2+.6,.45,1.0,SG2,Math.atan2(-(z1-z0),x1-x0)); } }
      const gi=new T.CylinderGeometry(9,10,.8,18); gi.scale(.8,1,.8); gi.translate(124,.4,8); Q(K.col(0xbfb59b),gi); tree(124,.8,8,8,K.M.leaf3); pine(121,.8,11,6); B(124,.5,-8,2.2,.35,24,K.M.wood); for(const s of [-1,1]) B(124+s*1.0,.85,-8,.08,.7,24,K.M.wood); // 섬 + 나무다리
      const tx=150, tz=62; B(tx,0,tz,4.2,.8,4.2,SG); for(let i=0;i<7;i++){ const r=1.5-i*.12, h=1.1-i*.06, y=.8+i*1.32; const g=new T.CylinderGeometry(r,r,h,8); g.translate(tx,y+h/2,tz); Q(SG,g); const g2=new T.CylinderGeometry(r+.45,r+.6,.22,8); g2.translate(tx,y+h+.11,tz); Q(SG2,g2); } C(tx,.8+7*1.32,tz,.25,1.2,SG2,8,.08); } // 팔각칠층석탑(약식)
    E.plane(GRS,-60,.1,100,40,100,Q); E.plane(GRS,-62,.1,-60,36,120,Q); E.plane(GRS,40,.1,140,60,30,Q);
    E.plane(GRS,118,.1,14,110,84,Q); E.plane(GRS,180,.1,-2,56,80,Q);
    // ---- 대온실(1909): 남향, 길이 42 · 깊이 14 m(추정) — 하얀 목재+철골 뼈대, 유리, 가운데 높은 몸채 + 양 날개 반원통 지붕 ----
    { const ox=184, oz=-4, Dp=14, Lw=42, Hw=4.2, Rw=Dp/2, Hc=6.2, Wc=14;
      B(ox,0,oz,Dp+2,.45,Lw+2,GRA); E.plane(E.BAK,ox-Dp/2-6,.08,oz,12,Lw+4,Q); B(ox,.45,oz,Dp,.04,Lw,TILE);
      const yb=.45; const glassBox=(x0,x1,z0,z1,h)=>{ // 유리 벽 4면 + 기둥 격자
        B((x0+x1)/2,yb,z0,x1-x0,h,.04,GLG); B((x0+x1)/2,yb,z1,x1-x0,h,.04,GLG); B(x0,yb,(z0+z1)/2,.04,h,z1-z0,GLG); B(x1,yb,(z0+z1)/2,.04,h,z1-z0,GLG);
        for(let z=z0;z<=z1+.01;z+=1.2) for(const x of [x0,x1]) B(x,yb,z,.12,h,.12,WHF); for(let x=x0+1.2;x<x1-.1;x+=1.2) for(const z of [z0,z1]) B(x,yb,z,.12,h,.12,WHF);
        for(const y of [.9,h-.08]){ B((x0+x1)/2,yb+y,z0,x1-x0+.1,.14,.16,WHF); B((x0+x1)/2,yb+y,z1,x1-x0+.1,.14,.16,WHF); B(x0,yb+y,(z0+z1)/2,.16,.14,z1-z0,WHF); B(x1,yb+y,(z0+z1)/2,.16,.14,z1-z0,WHF); }
        B((x0+x1)/2,yb,z0,x1-x0,.9,.1,WHF); B((x0+x1)/2,yb,z1,x1-x0,.9,.1,WHF); B(x0,yb,(z0+z1)/2,.1,.9,z1-z0,WHF); B(x1,yb,(z0+z1)/2,.1,.9,z1-z0,WHF); };
      const barrel=(cx,cz,len,r,y,alongZ)=>{ S(GLG,(u,v)=>{ const a=Math.PI*u, l=-len/2+len*v; const px=Math.cos(a)*r, py=Math.sin(a)*r*.75; return alongZ?[cx+px,y+py,cz+l]:[cx+l,y+py,cz+px]; },16,4); for(let l=-len/2;l<=len/2+.01;l+=1.2){ const g=new T.TorusGeometry(r,.07,4,14,Math.PI); g.scale(1,.75,1); if(!alongZ) g.rotateY(Math.PI/2); g.translate(alongZ?cx:cx+l,y,alongZ?cz+l:cz); Q(WHF,g); } const rg=new T.BoxGeometry(alongZ?.22:len,.22,alongZ?len:.22); rg.translate(cx,y+r*.75,cz); Q(WHF,rg); };
      // 양 날개
      for(const s of [-1,1]){ const z0=s<0?oz-Lw/2:oz+Wc/2, z1=s<0?oz-Wc/2:oz+Lw/2; glassBox(ox-Dp/2,ox+Dp/2,z0,z1,Hw); barrel(ox,(z0+z1)/2,z1-z0,Rw,yb+Hw,true); for(const zz of [z0,z1]) if(Math.abs(zz-oz)>Wc/2+.1){ const g=new T.CircleGeometry(Rw,16,0,Math.PI); g.scale(1,.75,1); g.translate(0,0,0); place(g,ox,yb+Hw,zz,0,GLG); } }
      // 가운데 몸채: 더 높은 유리벽 + 남북 방향 반원통 지붕 + 남쪽 박공 현관
      glassBox(ox-Dp/2-1.5,ox+Dp/2,oz-Wc/2,oz+Wc/2,Hc); barrel(ox-.75,oz,Dp+1.5,Wc/2,yb+Hc,false);
      { const g=new T.CircleGeometry(Wc/2,18,0,Math.PI); g.scale(1,.75,1); place(g,ox-Dp/2-1.5,yb+Hc,oz,-Math.PI/2,GLG); const fr=new T.TorusGeometry(Wc/2,.12,4,16,Math.PI); fr.scale(1,.75,1); place(fr,ox-Dp/2-1.55,yb+Hc,oz,-Math.PI/2,WHF); for(let i=-2;i<=2;i++) B(ox-Dp/2-1.55,yb+Hc,oz+i*2.2,.1,Math.sqrt(Math.max(0,1-(i*2.2/(Wc/2))**2))*Wc/2*.75,.1,WHF); }
      // 남쪽 현관(작은 박공) + 문
      B(ox-Dp/2-3.2,yb,oz,3.4,3.6,4.4,GLG); for(const s of [-1,1]) B(ox-Dp/2-4.8,yb,oz+s*2.1,.18,3.6,.18,WHF); B(ox-Dp/2-3.2,yb+3.6,oz,3.6,.2,4.6,WHF); tri(ox-Dp/2-4.9,yb+3.8,oz,4.8,1.6,.2,WHF,Math.PI/2); B(ox-Dp/2-4.95,yb,oz,.06,2.6,1.8,K.col(0x3d4a40,{roughness:.4}));
      // 안: 식물(작은 덩어리)
      for(let i=0;i<26;i++){ const x=ox-Dp/2+1.5+((i*37)%11), z=oz-Lw/2+1.5+((i*53)%39); const g=new T.IcosahedronGeometry(.9+((i*7)%5)*.25,0); g.translate(x,yb+.9+((i*3)%4)*.4,z); Q(i%2?PLT:PLT2,g); } for(let i=0;i<5;i++) C(ox-2+i,yb,oz+((i*5)%7)-3,.15,4+i%3,K.M.trunk,6,.12), (()=>{ const g=new T.SphereGeometry(1.8,8,6); g.translate(ox-2+i,yb+5+i%3,oz+((i*5)%7)-3); Q(PLT,g); })();
      // 앞 분수(르네상스풍) · 기하학 화단
      { const fx=ox-Dp/2-16, fz=oz; C(fx,0,fz,4.2,.55,GRA,24,4.2); { const g=new T.CylinderGeometry(3.8,3.8,.06,24); g.translate(fx,.5,fz); Q(K.M.water,g); } C(fx,.5,fz,.45,1.6,GRA,10,.35); { const g=new T.CylinderGeometry(1.5,.6,.5,16); g.translate(fx,2.3,fz); Q(GRA,g); } C(fx,2.55,fz,.25,1.0,GRA,8,.15); { const g=new T.SphereGeometry(.35,8,6); g.translate(fx,3.6,fz); Q(GRA,g); }
        for(const [dx,dz] of [[-6,-9],[6,-9],[-6,9],[6,9]]){ B(fx+dx,.08,fz+dz,8,.14,10,K.M.grass); B(fx+dx,.22,fz+dz,1.2,.5,8,K.col(0x2f5a2f)); } } }
    // ---- 궁 안 숲(북·서쪽 언덕): 건물·연못·마당은 피함 ----
    { const ex=[[-60,40,-4,166],[-62,-30,24,70],[0,124,-128,2],[-8,8,96,166],[70,170,-24,48],[40,86,52,82],[160,215,-34,26],[140,162,52,74],[-112,222,120,166]];
      const ok=(x,z)=>!ex.some(r=>x>r[0]&&x<r[1]&&z>r[2]&&z<r[3])&&E.fbm(x*.02+3,z*.02)>.47;
      E.forest(E.scatter(XS+6,XN-6,ZW+6,ZE-8,7,()=>.1,ok,(x,z)=>8+E.vn(x*.1,z*.1)*5,(x,z)=>E.vn(x*.05+9,z*.05)<.45?1:0),{cast:true}); }
    finishHanok(); L(0);
    // ---- 배경(K.life): 응봉·북악 자락(북서) · 창덕궁 숲(서) · 창경궁로와 대학로·원남동 시가(동·남) ----
    { const site=[XS-2,XN+2,ZW-2,ZE+2]; const dOut=(x,z)=>Math.hypot(Math.max(XS-x,0,x-XN),Math.max(ZW-z,0,z-ZE));
      const hf=(x,z)=>{ const d=dOut(x,z); if(d<=0) return 0; return Math.max(0,E.peaks(x,z,[[620,-520,520,420,170,1.25],[260,-420,300,260,70,1.3],[-80,-560,360,300,60,1.2],[900,200,320,300,60,1.2]])*(.85+.3*E.ridged(x*.006,z*.006))*E.ss((d-10)/80))+.03; };
      const TR=E.terrain(-1200,1400,-1300,1100,90,90,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.03,z*.03,2); if(h<.8){ if(z<ZW&&x>XS-40&&x<XN+80) return [.36+.04*n,.45+.05*n,.3]; return [.62+.05*n,.6+.05*n,.56+.04*n]; } return E.mcol(x,z,h,ny,{rock:.6,rockH:120,cliff:.5,low:2,lowc:[.45,.52,.36]}); },site);
      E.forest(E.scatter(XS-40,XN+200,-700,ZW-4,12,TR.h,(x,z,h)=>E.r()<.9,(x,z,h)=>10+E.vn(x*.04,z*.04)*6,(x,z,h)=>E.vn(x*.02,z*.02)<.5?1:0),{trunks:false}); // 창덕궁 후원 숲(서)
      E.forest(E.scatter(XN+4,1100,-900,ZE,16,TR.h,(x,z,h)=>(h>3||z<-200)&&E.r()<.85,(x,z,h)=>10+E.vn(x*.04,z*.04)*6,1),{trunks:false});
      road(80,ZE+16,700,22,{lanes:[-5.5,5.5]}); B(80,0,ZE+4,700,.14,3,SIDE); B(80,0,ZE+28.5,700,.14,3,SIDE); road(XS-18,0,24,560,{lanes:[-6,6]});
      for(let i=0;i<16;i++) car(-200+i*28+(i%3)*5,ZE+(i%2?12:20),0,i); for(let i=0;i<8;i++) car(XS-18+(i%2?3:-3),-180+i*44,Math.PI/2,i+3);
      for(let x=-100;x<260;x+=24) tree(x,0,ZE+5,7,K.M.leaf2); for(const x of [-60,20,100,180]) lamp(x,ZE+3.4); for(const [x,z,k] of [[-6,ZE+10,0],[8,ZE+11,2],[30,ZE+4.5,1],[-40,ZE+4,3],[4,150,4],[-3,126,1],[2,60,2],[200,-6,0],[205,8,3]]) person(x,z,0,k);
      for(const [x,z,w,d,h] of [[-330,260,60,40,36],[420,250,50,40,22],[-260,60,60,90,44],[-230,-90,40,50,30]]) B(x,0,z,w,h,d,FAC); // 서울대병원(남동)·원남동·대학로
      cityGrid(-900,1300,-200,1100,34,(x,z)=>!(x>XS-60&&x<XN+40&&z<ZE+60&&z>ZW-80)&&TR.h(x,z)<1&&TR.h(x+14,z+14)<1&&Math.hypot(x-120,z-100)<1050&&!(z<ZW&&x>XS-60),(x,z)=>(z>ZE+40&&z<ZE+520&&Math.abs(x-60)<340)?4+E.r()*5:8+E.r()*E.r()*30);
      flushLife(); }
    lifeLock();

  }});
