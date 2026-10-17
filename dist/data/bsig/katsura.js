__bsigFill({"katsura":function(K){
// 사실: 고서원(1615~20년경 창건), 중서원(1641~51년경), 신어전(1663, 고미즈노오 상황 행차) · 고서원→중서원→악기의 방→신어전이 북동에서 남서로 안행 배치 · 모두 이리모야(팔작)·고케라부키(杮葺) 지붕 · 가쓰라강 수해 대비 높은 마루(중서원·신어전 마루 밑 개방, 고서원은 흰 벽) · 고서원 동면(연못 쪽) 이리모야 박공에 게교(懸魚) · 달맞이대 = 연못을 향한 6조 크기 대나무 발 깔개 · 쇼킨테이 = 초가 시골집풍 다실(뒤쪽 다실은 杮葺)
// 출처: weblio/コトバンク 「桂離宮」(雁行形, 入母屋造·柿葺, 高床, 月見台 6畳大 竹簀子, 松琴亭 茅葺, 中書院 1641~51, 新御殿 1663, 庭園 약 7만 ㎡)
// 추정 치수: 서원 평면(고서원 14×11, 중서원 12×11, 악기의 방 6×7, 신어전 14×13 m), 마루 높이 1.3/1.7/1.8/1.9 m, 처마 높이 마루+3.2 m, 칸 1.97 m(교마), 연못·섬·쇼킨테이 위치는 배치도를 단순화 · 좌표: +z = 연못(동쪽), +x = 북쪽
    const T=K.T;
    const WD=K.col(0x6e5c48,{roughness:.85}), WDD=K.col(0x3e3328,{roughness:.85}), WDL=K.col(0x9a8466,{roughness:.8}), PL=K.col(0xf1eee6,{roughness:.95}), PL2=K.col(0xd9d4c8,{roughness:.95}), RFU=K.col(0x5a4c3e,{roughness:.9}), STN=K.col(0x8d877c,{roughness:.95}), STN2=K.col(0xa59f93,{roughness:.95}), BAM=K.col(0xa9a27a,{roughness:.8}), THA=K.col(0x7d6a50,{roughness:1}), MOSS=K.col(0x4f6b38,{roughness:1}), SHR=K.col(0x3f5e33,{roughness:.95});
    const ST=STN, SG2=STN2, JUN=SHR;
    // --- 공용 헬퍼(이 build 안에서만) ---
    const roofHF=(cx,ye,cz,E,D,H,o)=>{ o=o||{}; const dt=o.dt||0, so=o.sori||0, thk=o.thk||.3, sw=!!o.swap, mt=o.mat, um=o.under||mt; const EE=sw?D:E, DD=sw?E:D; const R=Math.max(0,EE-DD*(1-dt));
      const g=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),1.7); const y0=ye+H*(1-g(dt));
      const yf=(a,b)=>{ const aa=Math.abs(a)/(EE/2), bb=Math.abs(b)/(DD/2); const ta=Math.abs(a)>R/2?(Math.abs(a)-R/2)/(DD/2)+dt:0; return ye+H*(1-g(Math.max(bb,ta)))+so*Math.pow(aa,3)*Math.pow(bb,3); };
      const P=(a,b,y)=>sw?[cx+b,y,cz+a,b/2,a/2]:[cx+a,y,cz+b,a/2,b/2];
      const sheet=(a0,a1,m,dy,n)=>K.surf((u,v)=>{ const a=a0+(a1-a0)*u, b=-DD/2+DD*v; return P(a,b,yf(a,b)+dy); },n,o.nv||12,m);
      const segs=(dt>0&&dt<1)?[[-EE/2,-R/2,8],[-R/2,R/2,20],[R/2,EE/2,8]]:[[-EE/2,EE/2,o.nu||32]];
      for(const [a0,a1,n] of segs){ sheet(a0,a1,mt,0,n); sheet(a0,a1,um,-thk,n); }
      K.surf((u,v)=>{ const s=u*4, k=Math.floor(s), f=s-k; let a,b; if(k===0){a=-EE/2+EE*f;b=-DD/2;} else if(k===1){a=EE/2;b=-DD/2+DD*f;} else if(k===2){a=EE/2-EE*f;b=DD/2;} else {a=-EE/2;b=DD/2-DD*f;} const y=yf(a,b); return P(a,b,y-thk+thk*v); },64,1,um);
      if(dt>0){ for(const s of [-1,1]){ const a=s*R/2; K.surf((u,v)=>{ const b=-dt*DD/2+dt*DD*u; const yt=yf(a-s*.02,b), yb=y0-thk; return P(a-s*.05,b,yb+(yt-yb)*v); },12,1,o.gmat||um); } }
      if(R>.6&&o.ridge!==false) K.b(cx,ye+H-.15,cz,sw?(o.rw||.8):R+.5,o.rh||.5,sw?R+.5:(o.rw||.8),o.rmat||K.col(0x2b2a28)); return yf; };
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    // 인스턴스: geo(밑면 y=0 기준) 를 items=[[x,y,z,ry,sx,sy,sz]] 자리에 복제 — 기둥·판문·공포처럼 같은 부재 반복
    const inst=(geo,mat,items,cast)=>{ const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),E=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); E.set(0,it[3]||0,0); Q.setFromEuler(E); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; return put(m,cast); };
    // 병합: 박스 지오메트리 여러 개를 메시 하나로 (박석 줄눈·난간살처럼 작은 조각 수백 개)
    const bx=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const merge=(geos,mat,cast)=>{ if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); return put(new T.Mesh(g,mat),cast); };
    const cylG=(r,h,seg,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r*.9:r2,r,h,seg||10); g.translate(0,h/2,0); return g; };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    const stairs=(x,z,yt,yb,w,n,axis,dir)=>{ const rise=(yt-yb)/n, run=.42; const gs=[]; for(let k=0;k<n-1;k++){ const h=yt-yb-(k+1)*rise, off=dir*(k+.5)*run; if(axis==='z') gs.push(bx(x,yb,z+off,w,h,run)); else gs.push(bx(x+off,yb,z,run,h,w)); } for(const s of [-1,1]){ const L=(n-1)*run; if(axis==='z') gs.push(bx(x+s*(w/2+.2),yb,z+dir*L/2,.4,yt-yb+.25,L+.2)); else gs.push(bx(x+dir*L/2,yb,z+s*(w/2+.2),L+.2,yt-yb+.25,.4)); } return merge(gs,ST); }; // 소맷돌 포함
    // 박석 줄눈: 넓은 돌판 위에 불규칙한 줄눈을 얇은 선으로 새김 (박석 느낌)
    const paving=(cx,y,cz,w,d,sx,sz,seed)=>{ const gs=[]; let r=seed||3; const rnd=()=>{ r=(r*9301+49297)%233280; return r/233280; }; for(let x=-w/2+sx*(.6+rnd()*.5);x<w/2-.5;x+=sx*(.75+rnd()*.5)) gs.push(bx(cx+x,y,cz,.09,.025,d)); for(let z=-d/2+sz*(.6+rnd()*.5);z<d/2-.5;z+=sz*(.75+rnd()*.5)) gs.push(bx(cx,y,cz+z,w,.025,.09)); return merge(gs,SG2,false); };
    const juniper=(x,z,h)=>{ K.c(x,0,z,.22,h*.35,K.M.trunk,6,{r2:.16}); const gs=[]; for(let k=0;k<4;k++){ const yy=h*(.22+k*.19), rr=h*(.26-k*.05); const g=new T.ConeGeometry(rr,h*.3,7); g.translate(x+(k%2?.3:-.3),yy+h*.15,z+(k%3-1)*.25); gs.push(g); } merge(gs,JUN); };

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
    const tmat=(key,px,draw,fb,o)=>{ const t=E.tex(key,px,draw); const m=new T.MeshStandardMaterial(Object.assign({color:0xffffff,map:t||null,roughness:.6},o||{})); if(!t){ m.color.set(fb); m.color.convertSRGBToLinear(); } return m; };
    // 우진각/차양 높이장 지붕(히메지·자금성과 같은 함수)
    const hip=(cx,ye,cz,E,D,H,o)=>{ o=o||{}; const R=o.R!==undefined?o.R:Math.max(0,E-D), p=o.p||1.5, lift=o.lift||0, thk=o.thk||.45, us=o.us||.5, mt=o.mat, um=o.under||mt;
      const tt=(a,b)=>{ const bb=Math.abs(b)/(D/2), ta=E>R?Math.max(0,(Math.abs(a)-R/2)/((E-R)/2)):0; return [Math.min(1,Math.max(ta,bb)),bb>=ta]; };
      const yf=(a,b)=>{ const aa=Math.abs(a)/(E/2), bb=Math.abs(b)/(D/2); return ye+H*Math.pow(1-tt(a,b)[0],p)+lift*Math.pow(aa,3)*Math.pow(bb,3); };
      const sheet=(m,dy,uv)=>K.surf((u,v)=>{ const a=-E/2+E*u, b=-D/2+D*v; const f=tt(a,b)[1]; return [cx+a,yf(a,b)+dy,cz+b,uv?(f?a*us:b*us):a/2,uv?(f?b*us:a*us):b/2]; },o.nu||40,o.nv||24,m);
      sheet(mt,0,true); sheet(um,-thk,false);
      K.surf((u,v)=>{ const s=u*4, k=Math.floor(Math.min(3.999,s)), f=s-k; let a,b; if(k===0){a=-E/2+E*f;b=-D/2;} else if(k===1){a=E/2;b=-D/2+D*f;} else if(k===2){a=E/2-E*f;b=D/2;} else {a=-E/2;b=D/2-D*f;} const y=yf(a,b); return [cx+a,y-thk-(o.fas||.2)+(thk+(o.fas||.2))*v,cz+b]; },96,1,o.rim||um);
      const rw=o.rw||.55, rh=o.rh||.45;
      for(const sx of [-1,1]) for(const sz of [-1,1]){ const a0=sx*R/2, a1=sx*E/2, b1=sz*D/2; const L=Math.hypot(a1-a0,b1), nx=-b1/L, nz=(a1-a0)/L; const t0=o.hip0||0;
        K.surf((u,v)=>{ const uu=t0+(1-t0)*u, a=a0+(a1-a0)*uu, b=b1*uu, th=Math.PI*v; const ox=Math.cos(th)*rw/2; return [cx+a+nx*ox,yf(a,b)+Math.sin(th)*rh,cz+b+nz*ox]; },16,5,o.rmat||mt); }
      return yf; };
    // 고케라부키(얇은 나무판 겹쳐 잇기): 회갈색 + 처마와 나란한 판 줄(UV v 방향) — 256px = 2 m
    const KOK=tmat('d_kokera',256,(g,N,rr)=>{ g.fillStyle='#665e54'; g.fillRect(0,0,N,N); for(let j=0;j<16;j++){ const y=j*N/16; g.fillStyle=j%2?'#6b6359':'#625a50'; g.fillRect(0,y,N,N/16); g.fillStyle='rgba(40,34,28,.22)'; g.fillRect(0,y,N,1.2); let x=rr()*20; while(x<N){ g.fillStyle='rgba(30,25,20,.14)'; g.fillRect(x,y,1,N/16); x+=10+rr()*24; } } for(let i=0;i<1500;i++){ g.fillStyle=rr()<.5?'rgba(200,200,195,.10)':'rgba(30,30,30,.08)'; g.fillRect(rr()*N,rr()*N,2,1); } },0x7a7064,{roughness:.95});
    // 장지(明障子): 흰 종이 + 가는 살(가로 6·세로 2) + 아래 허리판
    const SHJ=tmat('d_shoji',128,(g,N)=>{ g.fillStyle='#f4f1e8'; g.fillRect(0,0,N,N); g.fillStyle='#8a7a62'; g.fillRect(0,0,N,5); g.fillRect(0,N-5,N,5); g.fillRect(0,0,5,N); g.fillRect(N-5,0,5,N); g.fillRect(N/2-2,0,4,N); g.fillStyle='#b8ab94'; for(let j=1;j<8;j++) g.fillRect(0,j*N*.84/8,N,1.6); for(const x of [N/4,3*N/4]) g.fillRect(x-.8,0,1.6,N*.84); g.fillStyle='#7d6a52'; g.fillRect(0,N*.84,N,N*.16); },0xf1eee6,{roughness:.9,emissive:0x2a2620,emissiveIntensity:.15});
    // 대나무 발 깔개(竹簀子) — 달맞이대
    const SUN=tmat('d_sunoko',128,(g,N)=>{ g.fillStyle='#5d5640'; g.fillRect(0,0,N,N); for(let i=0;i<16;i++){ const gr=g.createLinearGradient(0,i*N/16,0,(i+1)*N/16); gr.addColorStop(0,'#8f8762'); gr.addColorStop(.5,'#c4bb8e'); gr.addColorStop(1,'#7f7856'); g.fillStyle=gr; g.fillRect(0,i*N/16+1,N,N/16-2); } },0xa9a27a,{roughness:.7});
    // 시이마쓰(市松) 청·백 바둑판 — 쇼킨테이 안쪽 장지
    const ICH=tmat('d_ichi',64,(g,N)=>{ for(let i=0;i<4;i++) for(let j=0;j<4;j++){ g.fillStyle=(i+j)%2?'#f2efe6':'#3f6fa8'; g.fillRect(i*N/4,j*N/4,N/4,N/4); } },0x8aa0c0,{roughness:.9});
    // 쇼인 한 동: 높은 마루 + 툇마루 + 장지 벽 + 흰 회벽 띠 + 이리모야 고케라부키
    const SHP=[]; const POSTU=[], POSTW=[];
    const shoin=(cx,cz,w,d,fl,o)=>{ o=o||{}; const ins=.95, wi=w-2*ins, di=d-ins-.6, czb=cz-(ins-.6)/2, wh=2.95, ken=1.97;
      // 마루 밑: 고서원은 흰 회벽으로 막고, 나머지는 트인 마루 밑 + 동바리 기둥
      if(o.skirt){ K.b(cx,0,cz,w-.3,fl-.2,d-.3,PL); K.b(cx,0,cz,w-.1,.35,d-.1,STN); }
      else { K.b(cx,0,cz,w-1.6,fl-.2,d-1.6,K.col(0x2c2722,{roughness:1})); for(let x=-w/2+.4;x<=w/2-.39;x+=ken*.999) for(let z=-d/2+.4;z<=d/2-.39;z+=ken*.999){ if(Math.abs(x)<w/2-.6&&Math.abs(z)<d/2-.6&&((Math.round(x/ken)+Math.round(z/ken))%2)) continue; POSTU.push([cx+x,0,cz+z,(fl-.22)/1.9]); } K.b(cx,0,cz,w+.6,.12,d+.6,STN2); }
      K.b(cx,fl-.22,cz,w,.22,d,WDL); K.b(cx,fl-.26,cz,w+.04,.06,d+.04,WDD); // 툇마루 판 + 마구리
      // 몸통 + 장지 + 기둥 + 나게시(長押) + 회벽 띠
      K.b(cx,fl,czb,wi,wh+.6,di,PL2);
      const faces=[[0,di/2,wi,0],[wi/2,0,di,Math.PI/2],[-wi/2,0,di,-Math.PI/2]]; if(o.back) faces.push([0,-di/2,wi,Math.PI]);
      for(const [ox,oz,L,ry] of faces){ const n=Math.max(1,Math.round(L/ken)), bw=L/n; for(let i=0;i<n;i++){ const u=-L/2+bw*(i+.5); const sx=Math.cos(ry), sz=-Math.sin(ry), nx=Math.sin(ry), nz=Math.cos(ry); for(const h of [-.25,.25]) SHP.push([cx+ox+sx*(u+h*bw)+nx*.03,fl,czb+oz+sz*(u+h*bw)+nz*.03,ry,bw/2-.04]); }
        for(let i=0;i<=n;i++){ const u=-L/2+bw*i; POSTW.push([cx+ox+Math.cos(ry)*u+Math.sin(ry)*.06,fl,czb+oz-Math.sin(ry)*u+Math.cos(ry)*.06]); } }
      K.b(cx,fl+2.05,czb,wi+.16,.16,di+.16,WDD); K.b(cx,fl+2.21,czb,wi+.04,.62,di+.04,PL); K.b(cx,fl+2.83,czb,wi+.2,.14,di+.2,WD);
      // 디딤돌(沓脱石)
      K.b(cx+(o.stepX||0),0,cz+d/2+.55,1.6,Math.min(fl-.3,.55),.9,STN2);
      // 지붕: 이리모야, 고케라부키 — 처마 깊게(약 1.6 m), 얇은 끝
      const E=w+3.2, D=d+3.2, ye=fl+wh+.35, H=(o.swap?E:D)/2*.52; roofHF(cx,ye,czb,E,D,H,{dt:.48,swap:!!o.swap,mat:KOK,under:RFU,gmat:WD,thk:.2,sori:.12,rmat:K.col(0x5d5852,{roughness:.8}),rw:.45,rh:.35,nu:40});
      // 박공 게교(懸魚): 박공 꼭대기 아래 매단 장식판
      const R=(o.swap?D:E)-(o.swap?E:D)*(1-.48); if(o.swap){ K.b(cx,ye+H*.6,czb+R/2+.1,.55,H*.3,.1,WDD); K.b(cx,ye+H*.6,czb-R/2-.1,.55,H*.3,.1,WDD); } else for(const s of [-1,1]) K.b(cx+s*(R/2+.1),ye+H*.6,czb,.1,H*.3,.55,WDD);
      return {ye,H}; };
    const flushShoji=()=>{ if(SHP.length){ const g=new T.PlaneGeometry(1,2.0); g.translate(0,1.0,0); const m=new T.InstancedMesh(g,SHJ,SHP.length); const M4=new T.Matrix4(), Q=new T.Quaternion(), E3=new T.Euler(); SHP.forEach((p,i)=>{ E3.set(0,p[3],0); Q.setFromEuler(E3); M4.compose(new T.Vector3(p[0],p[1],p[2]),Q,new T.Vector3(p[4],1,1)); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; put(m,false); }
      if(POSTW.length) inst(boxG(.13,2.95,.13),WD,POSTW); if(POSTU.length) inst(cylG(.09,1.9,6,.08),WD,POSTU.map(p=>[p[0],p[1],p[2],0,1,p[3],1])); SHP.length=0; POSTW.length=0; POSTU.length=0; };
    // 석등(石燈籠)
    const LANT=[]; const lantern=(x,y,z,s)=>LANT.push([x,y,z,s||1]);
    const flushLant=()=>{ if(!LANT.length) return; inst(cylG(.18,.9,8,.14),STN,LANT.map(p=>[p[0],p[1],p[2],0,p[3],p[3],p[3]])); inst(boxG(.5,.38,.5),STN2,LANT.map(p=>[p[0],p[1]+.9*p[3],p[2],0,p[3],p[3],p[3]])); { const g=new T.ConeGeometry(.55,.35,6); g.translate(0,.17,0); inst(g,STN,LANT.map(p=>[p[0],p[1]+1.28*p[3],p[2],0,p[3],p[3],p[3]])); } LANT.length=0; };
    // 다듬은 관목(오카리코미) — 납작한 둥근 덩어리 인스턴스
    const SHRB=[]; const flushShrub=()=>{ if(!SHRB.length) return; const g=new T.SphereGeometry(1,10,6); g.scale(1,.55,1); inst(g,SHR,SHRB.map(p=>[p[0],p[1],p[2],0,p[3],p[3],p[3]])); SHRB.length=0; };

    // ================= 배경(K.life): 연못·섬·다리·쇼킨테이·이끼·숲·대나무 울타리·가쓰라강·니시야마 =================
    const H0=[-26,23,-28,12];
    const pondD=(x,z)=>{ const e=(cx,cz,rx,rz)=>Math.hypot((x-cx)/rx,(z-cz)/rz); return Math.min(e(8,36,44,21),e(-38,72,32,24),e(32,74,24,18),e(-70,40,20,14)); };
    const isl=(x,z)=>Math.min(Math.hypot(x+10,z-55)/7,Math.hypot(x-22,z-66)/5.5,Math.hypot(x+40,z-74)/6.5);
    LIFE(()=>{
      const MT=[[-300,-1700,1300,420,330,1.4],[900,-900,900,700,260,1.4],[1500,600,500,900,300,1.5],[-1400,-300,500,700,220,1.4]];
      const hf=(x,z)=>{ const pd=pondD(x,z), il=isl(x,z); let h=0; if(pd<1) h=-1.4*E.ss((1-pd)/.12); if(il<1) h=Math.max(h,.9*E.ss((1-il)/.4)); h+=1.8*Math.exp(-Math.pow(Math.hypot(x+85,z+30)/22,2))+1.2*Math.exp(-Math.pow(Math.hypot(x-60,z-20)/18,2)); const riv=(z>205&&z<290)?-2.5*E.ss(Math.min(z-205,290-z)/12):0; return h+riv+E.peaks(x,z,MT)*E.ss((Math.hypot(x,z)-500)/300); };
      const cfn=(x,z,h,ny)=>{ const n=E.fbm(x*.05,z*.05,2); const r=Math.hypot(x,z); if(h<-.5) return [.32,.36,.3]; if(r>420) return h>8?[.3+.04*n,.39+.04*n,.27]:[.55+.04*n,.56+.04*n,.5]; if(z>205&&z<290) return [.62,.6,.54]; if(pondD(x,z)<1.04&&pondD(x,z)>.96) return [.5+.04*n,.49+.04*n,.44]; return [.29+.06*n,.4+.06*n,.21+.03*n]; };
      const TR=E.terrain(-200,200,-200,200,200,200,hf,cfn,H0); E.terrain(-1600,1600,-1600,1600,128,128,hf,cfn,[-200,200,-200,200]);
      K.water(-10,-.55,52,200,110); K.water(0,-1.5,247,3200,70);
      // 연못 가 돌(호안석) — 인스턴스
      { const RK=[]; for(let a=0;a<360;a+=1.2){ const t=a*Math.PI/180; for(const [cx,cz,rx,rz] of [[8,36,44,21],[-38,72,32,24],[32,74,24,18]]){ const x=cx+Math.cos(t)*rx, z=cz+Math.sin(t)*rz; if(pondD(x,z)<.985) continue; if(E.r()<.5) continue; const s=.4+E.r()*.7; RK.push([x,-.35,z,E.r()*6,s*1.4,s,s]); } } const g=new T.DodecahedronGeometry(1,0); g.scale(1,.6,1); inst(g,STN,RK); }
      // 섬 다리: 흙다리(土橋, 둥근 등) 1 · 돌판 다리 2
      K.surf((u,v)=>{ const z=15+u*34; const y=.1+.75*Math.sin(Math.PI*u); return [-12+(v-.5)*2.2,y,z]; },16,2,K.col(0x6e7a4e,{roughness:1}));
      K.b(-31,.05,72,7,.35,1.4,STN2); K.b(15,.05,66,6.4,.3,1.3,STN2); K.b(-62,.05,60,1.3,.32,6.5,STN2);
      // 쇼킨테이(松琴亭): 초가 이리모야 몸채 + 고케라부키 차양(土庇) + 흰 벽·장지 + 안쪽 청백 바둑판 장지
      { const sx=-48, sz=102, ry=2.46; const c=Math.cos(ry), s=Math.sin(ry); const L=(lx,lz)=>[sx+c*lx+s*lz, sz-s*lx+c*lz];
        const g0=new T.Group(); g0.position.set(sx,0,sz); g0.rotation.y=ry; K.life.add(g0); const pc=K.cur; K.cur=g0;
        K.b(0,0,0,11,.5,8,STN); K.b(0,.5,-.5,9.6,2.7,6.2,PL); for(let i=0;i<4;i++) K.b(-3.6+i*2.4,.5,2.62,2.2,2.2,.08,SHJ); K.b(0,.5,2.6,9.8,.12,.4,WD);
        K.b(-1.2,.6,-3.2,3.6,1.8,.06,ICH); K.b(0,3.2,-.5,10,.18,6.6,WDD);
        roofHF(0,3.3,-.5,12.4,9,4.6,{dt:.4,mat:THA,under:RFU,gmat:WD,thk:.55,sori:0,ridge:true,rmat:K.col(0x4a4038),rw:.9,rh:.6,nu:28});
        hip(0,2.55,2.4,12.2,4.2,.55,{R:12.2,p:1,mat:KOK,under:RFU,thk:.15,nu:10,nv:4}); for(let i=0;i<5;i++) K.c(-5+i*2.5,.5,4.2,.09,2.0,WD,6);
        K.cur=pc; }
      // 쇼킨테이 앞 석등·디딤돌 · 연못가 석등들 · 정원 관목
      for(const [x,z,s] of [[-40,88,1.1],[-20,30,1],[24,30,.9],[-58,52,1],[40,60,.9],[-8,22,.8]]) lantern(x,TR.h(x,z),z,s); flushLant();
      for(let i=0;i<70;i++){ const a=E.r()*6.28, r=24+E.r()*60; const x=Math.cos(a)*r*1.2-5, z=Math.sin(a)*r+20; if(pondD(x,z)<1.15||(x>-30&&x<26&&z>-32&&z<16)) continue; const sc=.7+E.r()*1.3; SHRB.push([x,TR.h(x,z)+sc*.15,z,sc]); } flushShrub();
      // 숲: 정원 둘레(소나무·단풍·활엽) + 섬 소나무 + 바깥 대나무 울타리(가쓰라가키) 선
      E.forest(E.scatter(-150,130,-130,170,6.5,TR.h,(x,z,h)=>{ const inG=pondD(x,z)>1.08&&!(x>-34&&x<30&&z>-36&&z<26); const nearView=(x>-10&&z>-30&&z<120&&x<60&&Math.hypot(x-20,z-20)<45); return inG&&!nearView&&isl(x,z)>1.1&&E.r()<.55; },(x,z,h)=>6+E.vn(x*.08,z*.08)*7,(x,z,h)=>E.r()<.45?1:E.r()<.6?0:2),{trunks:true});
      E.forest([[-10,TR.h(-10,55),55,6,1,.3],[-12,TR.h(-12,53),53,4.5,1,.6],[22,TR.h(22,66),66,5,1,.5],[-40,TR.h(-40,74),74,5.5,1,.2],[-37,TR.h(-37,72),72,4,0,.7]],{trunks:true});
      E.forest(E.scatter(-1500,1500,-1500,1500,26,TR.h,(x,z,h)=>{ const r=Math.hypot(x,z); return (r>420&&h>6)||(r>180&&r<420&&!(z>205&&z<290)&&E.r()<.4); },(x,z,h)=>9+E.r()*7,(x,z,h)=>h>6?(E.r()<.5?1:2):0),{trunks:false});
      { const g=[]; for(let x=-155;x<=135;x+=1.6) g.push(bx(x,0,175,1.6,3.2,1.1)); for(let z=-135;z<=175;z+=1.6){ g.push(bx(-155,0,z,1.1,3.2,1.6)); g.push(bx(135,0,z,1.1,3.2,1.6)); } merge(g,K.col(0x56703f,{roughness:.95}),false); }
      // 별궁 밖 주택가(낮은 회색 지붕)
      const BL=[]; for(let x=-1500;x<1500;x+=24) for(let z=-1500;z<1500;z+=24){ const xx=x+(E.r()-.5)*6, zz=z+(E.r()-.5)*6; const r=Math.hypot(xx,zz); if(r<200||r>900||(zz>195&&zz<300)||TR.h(xx,zz)>4||E.r()<.3) continue; BL.push([xx,zz,10+E.r()*7,9+E.r()*6,4+E.r()*4,E.r()<.5?'#77736d':'#8b877f']); } E.blocks(BL);
    });

    // ================= 0: 서원군 앞 이끼 마당·자갈 낙수받이·디딤돌 길 =================
    K.layer(0);
    K.b(-1,-.05,-7,52,.05,42,MOSS);
    { const g=[]; for(const [x0,x1,z] of [[5.4,22.6,9.2],[-6.2,7.8,1.2],[-12.5,-4.5,-6.6],[-25.7,-10.3,-9.4]]) g.push(bx((x0+x1)/2,0,z,x1-x0,.06,1.2)); merge(g,K.col(0xb7b1a4,{roughness:1}),false); }
    { const S=[]; for(let i=0;i<14;i++){ const t=i/13; S.push([8-t*4,0,10.8+t*7+Math.sin(i)*.4,i*.7,1,1,1]); } for(let i=0;i<10;i++) S.push([-1+i*1.3,0,4+Math.sin(i*1.7)*.5,i,1,1,1]); const g=new T.CylinderGeometry(.42,.48,.12,9); g.translate(0,.06,0); inst(g,STN2,S); }
    // ================= 1: 고서원(+달맞이대) =================
    K.layer(1);
    shoin(14,2,14,11,1.3,{skirt:true,swap:true,back:true});
    // 달맞이대(月見台): 고서원 연못 쪽 앞, 대나무 발 깔개 + 기둥 4
    K.b(10,1.0,9.6,3.7,.12,3.0,SUN); K.b(10,.9,9.6,3.8,.1,3.1,WD); for(const [x,z] of [[8.3,8.3],[11.7,8.3],[8.3,10.9],[11.7,10.9]]) K.c(x,0,z,.08,.95,WD,6);
    flushShoji();
    // ================= 2: 중서원 =================
    K.layer(2); shoin(1.5,-6,12,11,1.7,{swap:true,stepX:-2}); flushShoji();
    // ================= 3: 악기의 방 · 신어전 =================
    K.layer(3); shoin(-7.5,-12,6,7,1.8,{swap:true}); shoin(-17,-18,14,13,1.9,{back:true,stepX:2}); flushShoji();
    // 정리: 기본 대지의 도로·잔디·가로수는 빼고 사람만(정원 지형이 바닥)
    { const rt=K.bldg.parent, st=rt&&rt.children[0]; if(st&&st!==K.bldg&&st!==K.life) st.add=()=>st;
      const la=K.life.add.bind(K.life); K.life.add=(...o)=>{ o.forEach(m=>{ if(m&&m.material===K.M.people) la(m); }); return K.life; }; }
  }});
