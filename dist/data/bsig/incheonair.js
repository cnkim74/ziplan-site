__bsigFill({"incheonair":function(K){
// 출처: 서울신문 1996-05-24(여객터미널 길이 1,059 m·너비 149 m·높이 33 m, 지하 1층·지상 4층, 곡선 지붕은 인천 해안의 물결을 형상화, 탑승구 44개) · airport-technology.com(길이 1,060 m, 폭 149 m, 높이 33 m, 496,000 ㎡) · BD+C(펜트레스 브래드번 설계, 1992 공모, KACI 실시설계, 활 모양, 사찰 지붕 곡선, 스테인리스 지붕, 마스트·현수 지지, 양 끝 유리 커튼월, 2001 개항)
// 추정: 날개의 곡률과 폭, 본관 길이, 지붕 단면 곡선, 탑승교 개수·위치, 활주로까지 거리
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
    // ===== 인천국제공항 제1여객터미널: 길이 약 1,060 m 활 모양 · 곡면 지붕 · 유리 커튼월 · 탑승 날개 · 활주로 =====
    // 축: x = 터미널 길이(±530 m), +z = 육지 쪽(출발 고가도로·교통센터), −z = 계류장·활주로. 곡률·폭·지붕 단면은 사진 판독 추정.
    const XL=530, XM=200; // 끝, 본관 반 길이(추정)
    const ss=t=>{ t=Math.min(1,Math.max(0,t)); return t*t*(3-2*t); };
    const zc=x=>-62*Math.pow(Math.abs(x)/XL,2.2); // 활 모양 중심선(양 끝이 계류장 쪽으로 휨)
    const wd=x=>{ const t=ss((Math.abs(x)-XM+20)/70); return 149*(1-t)+44*t; }; // 폭: 본관 149 m → 날개 44 m
    const zL=x=>zc(x)+74.5; // 육지 쪽 면
    const zA=x=>zc(x)+74.5-wd(x); // 계류장 쪽 면(육지 면은 본관·날개 모두 같은 선을 따름)
    const hR=x=>{ const t=ss((Math.abs(x)-XM+20)/70); return 33*(1-t)+21*t-1.5*Math.pow(Math.abs(x)/XL,2); }; // 지붕 꼭대기 높이(본관 33 m)
    const RFt=panelTex('icRf',{base:'#cfd3d6',tones:['#d7dbdd','#c4c8cb','#dde0e2'],blot:40,bs:20,seam:'#a1a6aa',cols:2,rows:10,sw:2});
    const RF=TMat(RFt,10,{roughness:.32,metalness:.55}); RF.side=T.DoubleSide; // 스테인리스 지붕판
    const RU=K.col(0xe6e4de,{roughness:.6}).clone(); RU.side=T.DoubleSide; // 지붕 아래 천장(밝은 루버)
    const GLa=K.col(0x7f97a6,{roughness:.05,metalness:.6}), GLd=K.col(0x3f515d,{roughness:.06,metalness:.65}), MULa=K.col(0x9aa0a5,{roughness:.35,metalness:.7}), STL=K.col(0xc9ccce,{roughness:.35,metalness:.6});
    const CON=K.col(0xc4c0b8,{roughness:.85}), APR=TMat(panelTex('icAp',{base:'#b8b6b0',tones:['#c0beb8','#aeaca6'],blot:60,bs:30,seam:'#9a9893',cols:4,rows:4,sw:1.5}),12,{roughness:.9});
    // ---- 0층: 바닥(계류장 포장·도로 쪽 포장) ----
    L(0); B(0,-.06,-5,1110,.06,300,APR);
    // ---- 1~4층 덩어리(유리 + 층 띠) · 본관/날개 ----
    const segs=[]; for(let x=-XL;x<XL-.01;x+=10) segs.push(x);
    for(const x of segs){ const xm=x+5, z1=zL(xm), z0=zA(xm), d=z1-z0, cz=(z0+z1)/2, top=hR(xm)-6; const ang=-Math.atan(( zc(x+10)-zc(x))/10);
      L(0); B(xm,0,cz,10.05,top,d-2,CON,ang); // 속 덩어리
      for(const [zf,s] of [[z1,1],[z0,-1]]){ B(xm,.2,zf-s*1.2,10.05,top-.2,.1,(Math.floor(x/30)%2?GLa:GLd),ang); for(let y=5;y<top;y+=5) B(xm,y,zf-s*1.0,10.05,.4,.5,STL,ang); } }
    // 멀리언(세로, 인스턴스)
    { const it=[]; for(let x=-XL+2.5;x<XL;x+=5){ const top=hR(x)-6; const ang=-Math.atan((zc(x+1)-zc(x-1))/2); it.push([x,top/2,zL(x)-1.05,ang,.18,top,.35]); it.push([x,top/2,zA(x)+1.05,ang,.18,top,.35]); } L(0); inst(new T.BoxGeometry(1,1,1),MULa,it,true); }
    // ---- 곡면 지붕: 단면은 육지 쪽 처마(낮게, 깊이 내밀어 출발 차로를 덮음) → 꼭대기 → 계류장 쪽 처마 ----
    L(1); { const ext=14; // 육지 쪽 처마 내밂(추정)
      const rp=(u,v,under)=>{ const x=-XL-6+(2*XL+12)*u; const z1=zL(x)+ext, z0=zA(x)-5; const z=z0+(z1-z0)*v; const top=hR(x); const pk=.62; const y=top - (top*.36)*Math.pow(Math.abs(v-pk)/(v<pk?pk:1-pk),1.8) - (under?1.6+1.0*Math.sin(Math.PI*v):0); return [x,y,z,x/10,z/10]; };
      S(RF,(u,v)=>rp(u,v,false),120,16); S(RU,(u,v)=>rp(u,v,true),120,16);
      for(const v of [0,1]) S(STL,(u,t)=>{ const a=rp(u,v,false), b=rp(u,v,true); return [a[0],b[1]+(a[1]-b[1])*t,a[2]]; },120,1);
      for(const u of [0,1]) S(STL,(v,t)=>{ const a=rp(u,v,false), b=rp(u,v,true); return [a[0],b[1]+(a[1]-b[1])*t,a[2]]; },16,1);
      // 지붕 위 천창 띠(본관, 길이 방향) · 이음 리브
      for(let x=-XM;x<=XM;x+=40){ const u=(x+XL+6)/(2*XL+12); const a=rp(u,.62,false); B(x,a[1]-.2,a[2],16,.7,10,K.col(0x9fb6c2,{roughness:.05,metalness:.5})); }
      for(let k=0;k<=40;k++){ const u=k/40; const g=new T.BufferGeometry(); const vv=[]; for(let j=0;j<16;j++){ const a=rp(u,j/16,false), b=rp(u,(j+1)/16,false); vv.push(a[0]-.3,a[1]+.05,a[2], b[0]-.3,b[1]+.05,b[2], b[0]+.3,b[1]+.05,b[2], a[0]-.3,a[1]+.05,a[2], b[0]+.3,b[1]+.05,b[2], a[0]+.3,a[1]+.05,a[2]); } g.setAttribute('position',new T.Float32BufferAttribute(vv,3)); g.computeVertexNormals(); Q(K.col(0xa7acb0,{roughness:.4,metalness:.6}),g); }
      // 육지 쪽 처마를 받치는 기둥(마스트) 열
      for(let x=-XL+15;x<XL;x+=30){ const u=(x+XL+6)/(2*XL+12); const a=rp(u,.97,true); C(x,0,zL(x)+ext-2,.6,a[1],STL,10,.9); } }
    // ---- 출발 고가도로(3층 높이, 육지 쪽) · 도착 차로(지상) ----
    L(0); { const yD=9.5; for(let x=-XL+5;x<XL;x+=10){ const z=zL(x)+16; const ang=-Math.atan((zc(x+5)-zc(x-5))/10); B(x,yD,z,10.05,1.2,16,K.col(0x8c8a86),ang); B(x,yD+1.2,z,10.05,.02,15,K.col(0x3d3f42),ang); B(x,yD+1.2,z+8,10.05,1,.3,CON,ang); } for(let x=-XL+20;x<XL;x+=40) C(x,0,zL(x)+16,1.1,yD,CON,10,1.1);
      for(let x=-XL+5;x<XL;x+=10){ const z=zL(x)+30; B(x,0,z,10.05,.02,18,K.col(0x3d3f42),-Math.atan((zc(x+5)-zc(x-5))/10)); }
      for(let i=0;i<24;i++){ const x=-460+i*40; car(x,zL(x)+(i%2?13:19),0,i); } for(let i=0;i<30;i++){ const x=-300+i*20; person(x,zL(x)+5,yD+1.2,i); } }
    // ---- 탑승교 + 비행기(계류장 쪽) ----
    { const plane=(x,z,ry,sc,liv)=>{ const c=Math.cos(ry), s=Math.sin(ry); const at=(dx,dz)=>[x+dx*c+dz*s,z-dx*s+dz*c]; const body=K.col(0xf2f2f0,{roughness:.35,metalness:.2}), tail=K.col(liv,{roughness:.4,metalness:.2});
        { const g=new T.CylinderGeometry(2.9*sc,2.9*sc,60*sc,14); g.rotateX(Math.PI/2); g.rotateY(ry); const [px,pz]=at(0,0); g.translate(px,4.6*sc,pz); Q(body,g); }
        { const g=new T.ConeGeometry(2.9*sc,7*sc,14); g.rotateX(Math.PI/2); g.rotateY(ry); const [px,pz]=at(0,33.5*sc); g.translate(px,4.6*sc,pz); Q(body,g); }
        { const g=new T.ConeGeometry(2.9*sc,10*sc,14); g.rotateX(-Math.PI/2); g.rotateY(ry); const [px,pz]=at(0,-35*sc); g.translate(px,5.2*sc,pz); Q(body,g); }
        { const sh=new T.Shape(); sh.moveTo(0,8); sh.lineTo(30,-6); sh.lineTo(30,-10); sh.lineTo(0,-2); sh.lineTo(-30,-10); sh.lineTo(-30,-6); sh.lineTo(0,8); const g=new T.ExtrudeGeometry(sh,{depth:.6,bevelEnabled:false}); g.rotateX(-Math.PI/2); g.scale(sc,1,sc); g.rotateY(ry); const [px,pz]=at(0,0); g.translate(px,3.4*sc,pz); Q(body,g); }
        { const sh=new T.Shape(); sh.moveTo(0,0); sh.lineTo(9,0); sh.lineTo(12,10); sh.lineTo(7,10); sh.lineTo(0,0); const g=new T.ExtrudeGeometry(sh,{depth:.5,bevelEnabled:false}); g.scale(sc,sc,1); g.rotateY(Math.PI/2+ry); const [px,pz]=at(0,-28*sc); g.translate(px,7*sc,pz); Q(tail,g); }
        for(const sd of [-1,1]){ const g=new T.CylinderGeometry(1.4*sc,1.4*sc,5*sc,10); g.rotateX(Math.PI/2); g.rotateY(ry); const [px,pz]=at(sd*10*sc,4*sc); g.translate(px,2.6*sc,pz); Q(K.col(0xb8bcc0,{metalness:.5,roughness:.3}),g); } };
      const livs=[0x2a6ec2,0xc8a24a,0xd23c3c,0x2a6ec2,0x1d3f7a,0x2a6ec2];
      let k=0; for(let x=-XL+25;x<XL-10;x+=48){ if(Math.abs(x)<XM-10) continue; const za=zA(x); const ang=-Math.atan((zc(x+2)-zc(x-2))/4); L(0); B(x,4,za-11,3,3,22,K.col(0xd0d2d2,{roughness:.4,metalness:.3}),ang); C(x,0,za-20,.5,4,STL,8,.5); plane(x+Math.sin(ang)*0,za-52,0+ang,1,livs[k%livs.length]); k++; }
      for(let x=-XM+30;x<XM;x+=70){ const za=zA(x); L(0); B(x,4,za-11,3,3,22,K.col(0xd0d2d2,{roughness:.4,metalness:.3})); C(x,0,za-20,.5,4,STL,8,.5); plane(x,za-52,0,1,livs[(k++)%livs.length]); } }
    L(0); flush();
    // ---- 배경: 계류장·유도로·평행 활주로(3,750 m) · 교통센터 · 영종도 바다 ----
    { const site=[-XL-20,XL+20,-150,140]; const inS=(x,z,m)=>x>site[0]-m&&x<site[1]+m&&z>site[2]-m&&z<site[3]+m;
      const RG=(x,z)=>E.peaks(x,z,[[-2600,2600,900,700,250,1.3],[3200,3000,800,700,180,1.3]]);
      const hf=(x,z)=>{ if(inS(x,z,0)) return 0; const e=Math.max(Math.abs(x)-(XL+20),z-140,-150-z); return (Math.hypot(x/1.3,z)>4200?-2:Math.max(0,RG(x,z)))-.45*E.ss(e/25); }; // v19: 활주로·계류장 판과 지형이 2 cm 차이로 깜빡이던 것 — 지형을 대지 밖에서 45 cm 낮춤
      const TR=E.terrain(-6000,6000,-6000,6000,120,120,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.02,z*.02,2); if(h<-1) return [.3,.42,.5]; if(z<-150&&z>-1300) return [.56+.03*n,.6+.04*n,.45+.03*n]; if(h<2) return [.55+.04*n,.56+.04*n,.5+.03*n]; return E.mcol(x,z,h,ny,{rock:.2,rockH:220,low:5,lowc:[.45,.5,.38]}); },site);
      B(0,-1.2,0,14000,.02,14000,K.M.water); // 바다(섬 바깥)
      // 계류장(포장) · 유도로 · 활주로 두 줄
      B(0,-.5,-280,2400,.6,260,APR); for(const z of [-460,-620]) B(0,-.5,z,4200,.75,24,K.col(0x55575a)); for(const z of [-760,-1180]){ B(0,-.5,z,3750,.8,60,K.col(0x47494c)); for(let x=-1800;x<=1800;x+=60) B(x,.3,z,30,.06,.9,K.col(0xf2f2ee)); for(const e of [-28,28]) B(0,.3,z+e,3750,.06,.6,K.col(0xf2f2ee)); } // v19: 계류장 .10 · 유도로 .25 · 활주로 .30 · 표시선 .36 — 층마다 5 cm 이상 띄움
      for(let x=-1400;x<=1400;x+=280) B(x,-.5,-540,24,.7,160,K.col(0x55575a));
      // 교통센터(앞쪽, 긴 유리 지붕 — 추정) · 주차장
      { const z=260; B(0,0,z,300,14,90,K.col(0xb9bec2,{roughness:.4,metalness:.3})); const g=new T.CylinderGeometry(60,60,300,32,1,false,-Math.PI/2.6,Math.PI/1.3); g.rotateZ(Math.PI/2); g.scale(1,.35,.75); g.translate(0,14,z); Q(K.col(0x9fb6c2,{roughness:.05,metalness:.5,transparent:true,opacity:.75}),g); for(const s of [-1,1]) B(s*330,0,z,240,16,110,K.col(0xb2aea6,{roughness:.9})); }
      B(0,-.5,180,2400,.58,30,K.col(0x3a3c3f)); for(let i=0;i<20;i++) car(-900+i*95,i%2?172:188,i%2?Math.PI:0,i);
      E.forest(E.scatter(-3000,3000,360,3000,30,TR.h,(x,z,h)=>h>-0.5&&E.r()<.35,(x,z,h)=>10+E.vn(x*.02,z*.02)*6,0),{trunks:false});
      flushLife(); }
    skyDome(0,0,0,5200);
    lifeLock();

  }});
