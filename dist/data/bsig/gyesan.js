__bsigFill({"gyesan":function(K){
// 출처: 서울신문 2007-07-25 「[종교건축 이야기] 105년전 세운 '고딕식' 대구 계산성당」 — 1899 첫 성당 준공 40일 만에 소실, 1902 지금 자리에 재건(로베르 신부, 중국인 벽돌공·미장이·목수), 라틴십자형 3랑식, 화강석 기초 위 붉은·회색 벽돌, 1918 증축(익랑·약 100평) 때 종탑 지붕을 약 두 배로 높임, 정면 두 종탑 사이·익랑 양쪽 장미창, 프랑스제 12사도 스테인드글라스
// 출처: 위키백과 영문 「Our Lady of Lourdes Cathedral, Daegu」 — 1902–1903 현재 건물, 1911 주교좌, 1981 사적 지정
// 추정(사진 판독): 신랑 10 m + 측랑 5 m × 2, 길이 46 m, 익랑 폭 26 m, 종탑 5.4 m 정사각 · 몸체 17 m + 첨탑 14 m, 처마 측랑 6.5 m · 신랑 11.5 m
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
    // 좌표: +z 정면(쌍탑·계산오거리 쪽), 원점 = 신랑 중심. 붉은 벽돌 BKR · 회색 벽돌 BKG · 화강석 GRA · 슬레이트 SLT
    const GRY=BKG, DOOR=K.col(0x4a2e22,{roughness:.7}), CAP=K.col(0x8e8a84,{roughness:.9});
    const NW=5, AW=5, ZF=21, ZT=-14, ZC=-22, NH=11.5, AH=6.5, TW=5.4, TWX=7.3, TH=17.5;
    const band=(x,y,z,w,d,h)=>B(x,y,z,w+.12,h||.32,d+.12,GRY);
    L(0);
    // ---- 마당·기단: 화강석 기초(0.9 m) + 앞 계단 ----
    B(0,0,0,34,.06,64,SIDE); B(0,-.02,2,44,.04,80,K.col(0xb8b1a5,{roughness:.95}));
    B(0,0,ZF+1.6,13,.6,3.2,GRA); for(let i=0;i<3;i++) B(0,0,ZF+3.4+i*.4,13-i*.2,.6-(i+1)*.18,.4,GRA);
    // ---- 신랑(벽 11.5) · 측랑(6.5) · 익랑(1918) · 성가대 · 후진 ----
    B(0,0,(ZF+ZC)/2,2*NW,.9,ZF-ZC,GRA); B(0,.9,(ZF+ZC)/2,2*NW,NH-.9,ZF-ZC,BKR);
    for(const s of [-1,1]){ B(s*(NW+AW/2),0,(ZF-8)/2+0,AW,.9,ZF+8,GRA); B(s*(NW+AW/2),.9,(ZF-8)/2,AW,AH-.9,ZF+8,BKR); }
    B(0,0,-9,26,.9,10,GRA); B(0,.9,-9,26,NH-.9,10,BKR);
    { const g=new T.CylinderGeometry(5,5,NH,7,1,false,Math.PI/2,Math.PI); g.translate(0,NH/2,ZC); Q(BKR,wuv(g,1.2)); const g0=new T.CylinderGeometry(5.1,5.1,.9,7,1,false,Math.PI/2,Math.PI); g0.translate(0,.45,ZC); Q(GRA,g0); }
    // 회색 벽돌 띠(기초 위 · 창대 · 처마)
    for(const y of [.9,3.0]){ band(0,y,(ZF+ZC)/2,2*NW+2*AW,ZF-ZC-0,.28); band(0,y,-9,26,10,.28); } band(0,NH-.5,(ZF+ZC)/2,2*NW,ZF-ZC,.5); band(0,NH-.5,-9,26,10,.5); for(const s of [-1,1]) band(s*(NW+AW/2),AH-.45,(ZF-8)/2,AW,ZF+8,.45);
    // 버트레스(측랑 4칸 + 익랑 모서리) + 첨두창(쌍) · 고창
    const BAY=[-5.5,0,5,10,15.2]; for(const s of [-1,1]){ for(const z of BAY.concat([-8+.2])) { const x=s*(NW+AW+.5); B(x,0,z-2.4,1.0,AH-1.2,.9,BKR); B(x,AH-1.2,z-2.4,.8,.5,.9,CAP); }
      for(const z of [-2.7,2.5,7.6,12.6,17.6].slice(0,4)){ for(const dz of [-.75,.75]) opening('p',s*(NW+AW+.02),1.6,z+dz,s*Math.PI/2,1.0,3.3,{wall:BKR,trim:GRY,fr:.18,dp:.18,mv:0,glass:GLS}); opening('a',s*(NW+.02),AH+1.2,z,s*Math.PI/2,1.1,2.4,{wall:BKR,trim:GRY,fr:.16,dp:.16,glass:GLS}); }
      // 익랑 끝: 장미창 + 아래 첨두창 3 + 모서리 버트레스
      rose(s*13.02,7.2,-9,s*Math.PI/2,2.0,{trim:GRY,fr:.35,glass:GLS}); for(const dz of [-2.2,0,2.2]) opening('p',s*13.02,1.4,-9+dz,s*Math.PI/2,1.0,3.4,{wall:BKR,trim:GRY,fr:.16,dp:.16,glass:GLS});
      for(const dz of [-5.4,5.4]){ B(s*13.5,0,-9+dz,1.0,NH-1,1.0,BKR); B(s*13.5,NH-1,-9+dz,.8,.6,.8,CAP); }
      for(const z of [-17,-20.5]) opening('p',s*(NW+.02),2.2,z,s*Math.PI/2,1.1,4.6,{wall:BKR,trim:GRY,fr:.16,dp:.16,glass:GLS}); }
    for(let i=-2;i<=2;i++){ const a=i*Math.PI/7.2; opening('p',Math.sin(a)*4.9,3,ZC-Math.cos(a)*4.9,Math.PI+a*-1,1.0,4.4,{wall:BKR,trim:GRY,fr:.16,dp:.14,glass:GLS}); }
    // ---- 정면: 두 종탑(5.4 m 정사각) + 가운데 박공벽 · 첨두 출입문 · 장미창 ----
    for(const s of [-1,1]){ const x=s*TWX; B(x,0,ZF-1,TW+.3,.9,TW+.3,GRA); B(x,.9,ZF-1,TW,TH-.9,TW,BKR);
      for(const y of [3.0,7.2,12.0]) band(x,y,ZF-1,TW,TW,.32); band(x,TH-.5,ZF-1,TW+.3,TW+.3,.5);
      for(const sx of [-1,1]) for(const sz of [-1,1]) B(x+sx*(TW/2-.25),.9,ZF-1+sz*(TW/2-.25),.56,TH-1.4,.56,GRY); // 모서리 회색 벽돌
      opening('p',x,4.0,ZF-1+TW/2+.01,0,.9,2.6,{wall:BKR,trim:GRY,fr:.16,dp:.16,glass:GLS}); opening('p',x,8.2,ZF-1+TW/2+.01,0,.9,2.8,{wall:BKR,trim:GRY,fr:.16,dp:.16,glass:GLS});
      for(const [ry,dx,dz] of [[0,0,TW/2],[Math.PI/2,TW/2,0],[-Math.PI/2,-TW/2,0],[Math.PI,0,-TW/2]]) opening('p',x+dx*1.003,12.8,ZF-1+dz*1.003,ry,1.5,3.6,{wall:BKR,trim:GRY,fr:.2,dp:.2,glass:K.col(0x2a2622,{roughness:.8}),mh:5,mul:K.col(0x5b4a3c)}); } // 종루(루버)
    B(0,.9,ZF+.05,2*NW-.4,.02,.3,GRY);
    opening('p',0,.9,ZF+.02,0,3.0,5.6,{wall:BKR,trim:GRY,fr:.45,dp:.45,glass:DOOR,sill:false}); B(0,.9,ZF+.05,3.0,3.8,.06,DOOR); // 정문
    for(const dx of [-3.1,3.1]) opening('p',dx,2.2,ZF+.02,0,.8,2.4,{wall:BKR,trim:GRY,fr:.14,dp:.14,glass:GLS});
    rose(0,9.4,ZF+.02,0,2.4,{trim:GRY,fr:.42,dp:.3,n:12,glass:GLS});
    tri(0,NH,ZF-.2,2*NW+.6,5.4,.6,BKR,0); band(0,NH-.5,ZF-.2,2*NW+.6,.8,.5); opening('a',0,NH+1.0,ZF+.12,0,1.0,1.8,{wall:BKR,trim:GRY,fr:.14,dp:.14,glass:GLS});
    L(1);
    // ---- 지붕(슬레이트): 신랑·익랑 맞배 · 측랑 외쪽 · 후진 원뿔 ----
    gableRoof(-NW-.4,NW+.4,ZC,ZF-.3,NH,5.0,SLT,true,.3); gableRoof(-13.6,13.6,-14.4,-3.6,NH,5.0,SLT,false,.3);
    for(const s of [-1,1]){ const x0=s>0?NW:-(NW+AW+.6), x1=s>0?NW+AW+.6:-NW; prism(x0,x1,-3.6,ZF-.2,AH-.3,(x,z)=>AH+2.4-(Math.abs(x)-NW)*.42,SLT); }
    { const g=new T.ConeGeometry(5.5,4.2,7,1,false,Math.PI/2,Math.PI); g.translate(0,NH+2.1,ZC); Q(SLT,g); }
    cross(0,NH+5.0,ZF-.2,1.1,CAP);
    L(2);
    // ---- 종탑 첨탑(1918 높임): 처마 돌림 + 8각 첨탑 + 모서리 작은 첨탑 + 십자가 ----
    for(const s of [-1,1]){ const x=s*TWX; B(x,TH,ZF-1,TW+.5,.35,TW+.5,CAP); spire(x,TH+.35,ZF-1,TW*.62,13.6,SLT,8); for(const sx of [-1,1]) for(const sz of [-1,1]){ B(x+sx*(TW/2-.1),TH+.35,ZF-1+sz*(TW/2-.1),.6,.9,.6,GRY); spire(x+sx*(TW/2-.1),TH+1.25,ZF-1+sz*(TW/2-.1),.42,2.2,SLT,4); }
      for(const [dx,dz,ry] of [[0,1,0],[1,0,Math.PI/2],[-1,0,-Math.PI/2],[0,-1,Math.PI]]){ B(x+dx*TW*.42,TH+.35,ZF-1+dz*TW*.42,dx?.2:1.2,1.8,dz?.2:1.2,SLT); tri(x+dx*TW*.42,TH+2.15,ZF-1+dz*TW*.42,1.2,1.4,.2,SLT,ry); } // 첨탑 밑 작은 박공창(도머)
      cross(x,TH+13.9,ZF-1,1.3,CAP); }
    flush(); L(0);
    // ---- 마당: 성모상 · 나무 · 담 ----
    { C(-11,0,ZF+8,1.0,1.4,GRA,10,.9); C(-11,1.4,ZF+8,.35,1.7,K.col(0xf1efe9),10,.28); const g=new T.SphereGeometry(.22,8,6); g.translate(-11,3.3,ZF+8); Q(K.col(0xf1efe9),g); }
    for(const [x,z,h] of [[-15,30,9],[15,32,8.5],[-17,-2,10],[17,-24,9],[-16,-26,8],[14,10,7]]) tree(x,0,z,h,K.M.leaf2);
    B(0,0,ZF+19,40,1.1,.4,BKR); B(0,1.1,ZF+19,40.2,.14,.55,GRY); for(const s of [-1,1]) B(s*20,0,2,.4,1.1,72,BKR);
    person(-2,ZF+6,0,0); person(1.5,ZF+7,0,2); person(4,ZF+12,0,3);
    // ---- 배경(K.life): 계산오거리 도로 · 청라언덕(동쪽 언덕, 3·1만세운동길) · 대구 도심 ----
    { const site=[-22,22,-38,41];
      const hf=(x,z)=>(x>site[0]-2&&x<site[1]+2&&z>site[2]-2&&z<site[3]+2)?0:Math.max(0,E.peaks(x,z,[[120,-40,70,90,18,1.4],[-900,-600,500,400,260,1.2],[700,-900,500,400,200,1.2]])*(.9+.2*E.ridged(x*.01,z*.01)))+.02;
      const TR=E.terrain(-1100,1100,-1100,900,90,80,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.03,z*.03,2); if(h<.8) return [.62+.05*n,.6+.05*n,.56+.04*n]; if(h<30&&Math.hypot(x-120,z+40)<120) return [.4+.05*n,.5+.05*n,.33]; return E.mcol(x,z,h,ny,{rock:.3,rockH:200,low:1.5,lowc:[.45,.52,.36]}); },site);
      road(0,52,400,20,{lanes:[-5,5]}); road(36,-60,18,300,{lanes:[-4.5,4.5]}); road(-60,-80,16,260); B(0,0,41.5,400,.14,2.4,SIDE); B(0,0,62.5,400,.14,2.4,SIDE);
      for(let i=0;i<12;i++) car(-120+i*21,i%2?48:56,0,i); for(let i=0;i<6;i++) car(36+(i%2?3:-3),-30-i*22,Math.PI/2,i+2);
      for(let x=-60;x<80;x+=14) tree(x,0,43,6.5,K.M.leaf2); lamp(-24,43.5); lamp(26,43.5);
      // 청라언덕: 계단(3·1만세운동길) + 붉은 벽돌 선교사 주택 3채
      { const yb=(x,z)=>TR.h(x,z); for(let i=0;i<30;i++){ const z=-6-i*.9, y=yb(52,z); B(52,0,z,3,Math.max(.1,y),.9,K.col(0xb7b0a4)); } for(const [x,z] of [[110,-60],[130,-20],[100,-10]]){ const y=yb(x,z)-.5; B(x,y,z,12,7,10,BKR); prism(x-6.5,x+6.5,z-5.5,z,y+7,(xx,zz)=>y+7+(zz-(z-5.5))*.7,SLT); prism(x-6.5,x+6.5,z,z+5.5,y+7,(xx,zz)=>y+7+(z+5.5-zz)*.7,SLT); } }
      E.forest(E.scatter(60,190,-140,40,9,TR.h,(x,z,h)=>h>2&&E.r()<.7,(x,z,h)=>8+E.vn(x*.05,z*.05)*5,0),{trunks:true});
      E.forest(E.scatter(-1050,-400,-1000,-250,16,TR.h,(x,z,h)=>h>6&&E.r()<.9,(x,z,h)=>11+E.vn(x*.04,z*.04)*6,1),{trunks:false});
      for(const [x,z,w,d,h] of [[-120,-50,40,50,30],[-30,110,60,40,28],[40,110,40,30,40],[-90,60,30,30,22],[90,90,40,30,60]]) B(x,0,z,w,h,d,FAC);
      cityGrid(-900,900,-800,800,32,(x,z)=>!(x>-80&&x<200&&z>-160&&z<80)&&TR.h(x,z)<1&&TR.h(x+14,z+14)<1&&Math.hypot(x,z)<900,(x,z)=>(z>60&&Math.abs(x)<200)?7+E.r()*14:8+E.r()*E.r()*45);
      flushLife(); }
    lifeLock();

  }});
