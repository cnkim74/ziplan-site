__bsigFill({"byeongsan":function(K){
// 실측(개략): 만대루 정면 7칸 × 측면 2칸 팔작 2층 누각 · 입교당 정면 5칸 × 측면 2칸 팔작(가운데 3칸 대청, 양끝 1칸 온돌) — 출처: 매일신문 2018-06-10 「병산서원」 기사, 텔트립 안동 병산서원 안내(복례문·광영지·만대루·입교당·동서재·존덕사 순 배치)
// 추정 치수: 만대루 21×6.4 m(칸 3 m), 누하주 2.5 m, 입교당 14.4×7.4 m 기단 1.1 m, 동재·서재 4칸 약 10×4.2 m, 존덕사 3칸 7.6×4.2 m, 세 단 높이 0 / +1.0 / +2.4 m, 강 폭 20 m, 병산 절벽은 높이 9 m로 축소
    const T=K.T; const WD=K.col(0x7a5a3b,{roughness:.9}), WDl=K.col(0x9a7b57,{roughness:.9}), WH=K.col(0xe8e2d4,{roughness:.95}), GW=K.M.giwa, RU=K.col(0x5a4a3c), ST=K.col(0xb9b2a4,{roughness:.95}), ST2=K.col(0xa39c8e,{roughness:.95}), EA=K.col(0xcdbfa4,{roughness:1}), SAND=K.col(0xd9cdb3,{roughness:1}), SO=K.col(0x4f5a50), DOOR=K.col(0x5c3f2a,{roughness:.85}), DK=K.col(0x2b2520,{roughness:1}), WL=K.col(0xc9b89a,{roughness:1}), RK=K.col(0x8a8580,{roughness:1}), RK2=K.col(0x6f6a62,{roughness:1}), LF=K.M.leaf3, BL=K.col(0xd4607f,{roughness:.9}), BLt=K.col(0x8a6a52,{roughness:.9});
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
    const inst=(geo,mat,items,cast)=>{ if(!items.length) return null; const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),E=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); E.set(0,it[3]||0,0); Q.setFromEuler(E); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; return put(m,cast); };
    const bx=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const merge=(geos,mat,cast)=>{ if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); return put(new T.Mesh(g,mat),cast); };
    const cylG=(r,h,seg,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r*.9:r2,r,h,seg||10); g.translate(0,h/2,0); return g; };
    let seed=7; const rnd=()=>{ seed=(seed*9301+49297)%233280; return seed/233280; };
    // 기둥 열: 자연석 주초(인스턴스) + 나무 기둥(인스턴스, 굵기 조금씩 다르게 → 휜 나무 느낌)
    const pillars=(items,h,r,wobble)=>{ inst(cylG(r*1.7,.32,6,r*1.4),ST2,items.map(p=>[p[0],p[1],p[2],rnd()*3,1,1,1])); inst(cylG(r,h-.32,8,r*.9),WD,items.map(p=>{ const k=wobble?.85+rnd()*.4:1; return [p[0],p[1]+.32,p[2],0,k,1,wobble?.85+rnd()*.4:1]; })); };
    const rail=(cx,y,cz,w,d,h)=>{ const gs=[]; for(const [x0,z0,x1,z1] of [[-w/2,-d/2,w/2,-d/2],[w/2,-d/2,w/2,d/2],[w/2,d/2,-w/2,d/2],[-w/2,d/2,-w/2,-d/2]]){ const L=Math.hypot(x1-x0,z1-z0); const ax=Math.abs(x1-x0)>0; gs.push(bx(cx+(x0+x1)/2,y+h-.08,cz+(z0+z1)/2,ax?L+.1:.1,.09,ax?.1:L+.1)); gs.push(bx(cx+(x0+x1)/2,y+h*.4,cz+(z0+z1)/2,ax?L:.07,.05,ax?.07:L)); const n=Math.max(2,Math.round(L/1.5)); for(let i=0;i<=n;i++){ const t=i/n; gs.push(bx(cx+x0+(x1-x0)*t,y,cz+z0+(z1-z0)*t,.08,h-.08,.08)); } } merge(gs,WD); };
    const pine=(x,y,z,h)=>{ K.c(x,y,z,.14,h*.55,K.M.trunk,6); const gs=[]; for(let k=0;k<3;k++){ const g=new T.ConeGeometry(h*(.3-k*.07),h*.3,8); g.translate(x,y+h*(.33+k*.2)+h*.15,z); gs.push(g); } merge(gs,LF); };
    // 배롱나무: 구불한 줄기(짧은 원기둥 2개 기울임 대신 어긋나게) + 분홍 꽃 덩어리 3~4개
    const crape=(x,y,z,h)=>{ K.c(x,y,z,.11,h*.45,BLt,6,{r2:.07}); K.c(x+.25,y+h*.3,z+.15,.07,h*.3,BLt,5,{r2:.04}); const gs=[]; for(let k=0;k<4;k++){ const g=new T.SphereGeometry(h*.22,7,5); g.scale(1.3,.8,1.1); g.translate(x+(k%2?.6:-.5)*(k<2?1:.6),y+h*(.55+k*.1),z+(k<2?-.3:.4)); gs.push(g); } merge(gs,BL); };
    const wall=(x,z,w,d,h)=>{ K.b(x,0,z,w,h*.45,d,ST2); K.b(x,h*.45,z,w,h*.55,d,WL); K.b(x,h,z,w+.4,.22,d+.4,RU); K.b(x,h+.22,z,w+.3,.1,d+.3,DK); };
    const wallAt=(x,y,z,w,d,h)=>{ K.b(x,y,z,w,h*.45,d,ST2); K.b(x,y+h*.45,z,w,h*.55,d,WL); K.b(x,y+h,z,w+.4,.22,d+.4,RU); K.b(x,y+h+.22,z,w+.3,.1,d+.3,DK); };
    // ---- 0: 세 단의 땅·강·절벽·담·복례문·광영지·만대루 하부 ----
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

    K.layer(0);
    // 배경(v13, K.life): 뒤(북) 화산 숲 비탈 · 앞 낙동강이 좌우로 이어지고 강 건너 병산(절벽 위 대지 5.5 m가 이어지다 멀리서 높아짐) · 높이·거리 압축(추정)
    // 출처: 병산서원은 화산(花山) 남쪽 기슭, 낙동강 건너 병산 절벽을 마주함 — 국가유산청 「안동 병산서원」
    { const H0=[-32,32,-40,67]; const dOut=(x,z)=>Math.hypot(Math.max(H0[0]-x,0,x-H0[1]),Math.max(H0[2]-z,0,z-H0[3]));
      const MT=[[0,-230,300,170,62,1.3],[-260,-140,200,170,45,1.3],[250,-160,200,170,48,1.3],[60,520,520,280,70,1.4]];
      const river=(z)=>z>24&&z<55; const bank=(x,z)=>z>=55;
      const hf=(x,z)=>{ let h=E.peaks(x,z,MT); h=h<.2?0:h*(.84+.3*E.ridged(x*.01,z*.01))*E.ss((-z-38)/70); if(river(z)) return -.6; if(z>=55) return .09+5.6*E.ss((z-(Math.abs(x)<34?62:52))/5)+Math.max(0,E.peaks(x,z,MT)-5.6)*E.ss((z-180)/80)*(.85+.3*E.ridged(x*.01,z*.01)); return .09+h+Math.max(0,1.2-Math.abs(z-26))*0; };
      const TR=E.terrain(-700,700,-700,700,90,90,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.03,z*.03,2); if(river(z)) return [.55,.6,.56]; if(z>48&&z<60&&ny<.75) return [.55+.06*n,.52+.05*n,.47]; if(h<1&&z>18&&z<58) return [.83,.78,.66]; if(z>=58&&h<9) return [.55+.05*n,.6+.05*n,.43]; return E.mcol(x,z,h,ny,{rock:0,cliff:.6,low:1,lowc:[.56,.62,.46]}); },H0);
      { const g=new T.PlaneGeometry(1400,30); g.rotateX(-Math.PI/2); const me=new T.Mesh(g,K.M.water); me.position.set(0,.03,40); K.life.add(me); } // 낙동강 물줄기(모형 밖까지)
      E.forest(E.scatter(-600,600,-600,600,8,TR.h,(x,z,h)=>!river(z)&&z>-200||true?(!river(z)&&dOut(x,z)>8&&!(z>18&&z<58)&&(z<-40||z>58||Math.abs(x)>40)&&!(Math.hypot(x,z-14)<190&&z>-45)&&E.r()<(z>58?.75:.85)):false,(x,z,h)=>7+E.vn(x*.05,z*.05)*5,(x,z,h)=>E.vn(x*.03,z*.03)<.6?1:0),{trunks:false}); }
    K.b(0,-.02,-2,44,.1,50,EA); // 흙 마당(1단, y 0)
    K.b(0,0,-13.5,40,1.0,13,ST2); K.b(0,0,-28.5,40,2.4,17,ST2); // 2단(입교당, +1.0) · 3단(존덕사, +2.4) 축대
    { const gs=[]; for(let i=0;i<4;i++) gs.push(bx(0,i*.25,-7+(3-i)*.36,3.4,.25,.36)); for(let i=0;i<5;i++) gs.push(bx(0,1.0+i*.28,-20+(4-i)*.36,3.0,.28,.36)); merge(gs,ST); } // 단 오르는 계단
    // 낙동강(폭 20 m) · 모래톱 · 강 건너 병산 절벽(약식) + 절벽 위 소나무
    K.b(0,0,27.5,64,.3,5,SAND); K.ex([[-32,30],[32,30],[32,50],[-32,50]],.05,SO,[0,-.02,0]); K.water(0,.06,40,64,20);
    for(const [px,pz,r] of [[-12,29.5,.9],[8,30,.7],[20,29.2,1.1],[-21,30,.8]]) K.c(px,0,pz,r,.5,RK,6,{r2:r*.5});
    K.b(0,0,52.5,64,.6,5,SAND);
    // 병산 절벽(약식): 강 건너 층층이 쌓인 바위 띠(높이 5.5 m로 낮춤 — 정면 시점을 가리지 않도록) + 절벽 위 소나무
    { const gs=[]; for(let L=0;L<5;L++){ const y=L*1.1; for(let x=-31;x<31;x+=2.6+rnd()*1.4){ const w=2.4+rnd()*2.2, d=2.6+rnd()*1.6; gs.push(bx(x+w/2,y,56.8+L*.55+rnd()*.5,w,1.15+rnd()*.3,d,(rnd()-.5)*.25)); } } merge(gs,RK2); K.b(0,5.3,62.5,64,.4,9,K.col(0x7d8466,{roughness:1})); for(let i=0;i<8;i++) pine(-28+i*8+(i%2)*2,5.8,60+(i%3)*2,3.6+(i%2)*1.2); }
    // 담장(낮은 돌담+기와) · 복례문(3칸 솟을대문 아닌 평대문) · 광영지(네모 연못 + 둥근 섬)
    wall(-19.2,-7,.5,56,1.6); wall(19.2,-7,.5,56,1.6); wall(0,-35,38.9,.5,1.6); for(const s of [-1,1]) wall(s*11.3,21,15.3,.5,1.6);
    K.b(0,0,21,8,.4,4.2,ST); pillars([0,1,2,3].flatMap(i=>[[-3.6+i*2.4,.4,19.6],[-3.6+i*2.4,.4,22.4]]),2.9,.17); for(const x of [-2.4,0,2.4]) K.b(x,.4,21,2.2,2.6,.14,DOOR); K.b(0,3.3,21,8,.3,3.4,WD); roofHF(0,3.6,21,9.6,5.6,1.7,{dt:1,mat:GW,under:RU,thk:.22,sori:.15,gmat:WDl});
    K.b(8.5,0,17,4.6,.35,4.6,ST2); K.b(8.5,.05,17,4.0,.32,4.0,K.col(0x55707a,{roughness:.2,metalness:.4})); K.c(8.5,.2,17,.75,.35,EA,10,{r2:.6}); K.c(8.5,.5,17,.1,1.2,BLt,5); { const g=new T.SphereGeometry(.7,7,5); g.scale(1.2,.7,1.2); g.translate(8.5,1.9,17); merge([g],BL); } // 광영지
    // 만대루 하층: 자연석 주초 위 휜 누하주 열(8×3), 서쪽 끝 통나무 계단
    const MZ=12, MW=21, MD=6.4, F1=2.5;
    pillars([0,1,2,3,4,5,6,7].flatMap(i=>[MZ-MD/2,MZ,MZ+MD/2].map(z=>[-MW/2+i*3,0,z])),F1,.21,true);
    K.b(0,F1,MZ,MW+.5,.3,MD+.5,WDl); { const gs=[]; for(let k=0;k<6;k++) gs.push(bx(-MW/2-1.0-k*.45,0,MZ,.5,F1-.4*k,1.4)); merge(gs,WD); } // 마루 바닥 · 통나무 계단(서쪽)
    for(const s of [-1,1]) K.b(s*8.5,0,4.3,1.2,.6,1.2,ST); // 정료대(돌 등대) 자리
    // ---- 1: 만대루 상층(열린 누마루)·동재·서재·입교당·장판각·전사청·존덕사 ----
    K.layer(1);
    inst(cylG(.18,2.7,8,.16),WD,[0,1,2,3,4,5,6,7].flatMap(i=>[MZ-MD/2,MZ+MD/2].map(z=>[-MW/2+i*3,F1+.3,z]))); rail(0,F1+.3,MZ,MW+.3,MD+.3,.5); K.b(0,F1+3.0,MZ,MW+.6,.35,MD+.6,WD); K.b(0,F1+3.35,MZ,MW+1.2,.3,MD+1.2,WDl);
    // 동재·서재(각 4칸 맞배, 툇마루 안마당 쪽)
    for(const s of [-1,1]){ const xc=s*11.6, zc=3; K.b(xc,0,zc,6.2,.8,11.6,ST); pillars([0,1,2,3,4].flatMap(j=>[-2.2,2.2].map(px=>[xc+px,.8,zc-5+j*2.5])),2.7,.17);
      K.b(xc,.8,zc,4.2,2.7,9.8,WH); K.b(xc-s*1.6,.8,zc,1.2,.2,10.2,WDl); for(let j=0;j<4;j++) K.b(xc-s*2.15,1.0,zc-3.75+j*2.5,.12,1.9,1.7,j<1?DK:DOOR); K.b(xc,3.5,zc,4.8,.35,10.4,WD); }
    // 입교당: 5칸×2칸, 높은 기단, 가운데 3칸 대청(열림) + 양끝 온돌방(회벽·문) — 2단 위(y 1.0)
    const IZ=-13, IW=14.4, ID=7.4, L2=1.0, B1=L2+1.1;
    K.b(0,L2,IZ,IW+3,1.1,ID+3,ST); { const gs=[]; for(let i=0;i<4;i++) gs.push(bx(0,L2+i*.28,IZ+ID/2+1.5+(3-i)*.35,3.2,.28,.35)); merge(gs,ST2); }
    pillars([0,1,2,3,4,5].flatMap(i=>[IZ-ID/2,IZ,IZ+ID/2].map(z=>[-IW/2+i*IW/5,B1,z])),3.1,.2);
    K.b(0,B1,IZ,IW,.25,ID,WDl); K.b(0,B1+.25,IZ-ID/2+.15,8.6,2.85,.25,WH); for(const s of [-1,1]){ K.b(s*(IW/2-1.45),B1,IZ,2.9,3.1,ID,WH); K.b(s*(IW/2-1.45),B1+.3,IZ+ID/2+.03,2.3,2.2,.1,DOOR); K.b(s*(IW/2-1.45),B1+1.1,IZ-ID/2-.03,1.4,1.2,.1,DOOR); } K.b(0,B1+.4,IZ-ID/2+.3,8.2,2.6,.1,DK);
    K.b(0,B1+3.1,IZ,IW+.6,.4,ID+.6,WD); K.b(0,B1+3.5,IZ,IW+1.2,.3,ID+1.2,WDl);
    // 2단 양옆: 장판각(서, 3칸)·전사청(동, 2칸)
    for(const [x,z,w,d] of [[-13,-16,7,4.2],[13,-16.5,6,4.6]]){ K.b(x,L2,z,w+1,.5,d+1,ST); pillars([0,1,2].flatMap(i=>[-d/2,d/2].map(zz=>[x-w/2+i*w/2,L2+.5,z+zz])),2.4,.15); K.b(x,L2+.5,z,w-.3,2.4,d-.3,WH); K.b(x,L2+2.9,z,w+.4,.3,d+.4,WD); }
    // 3단: 사당 담 + 내삼문 + 존덕사(3칸 맞배) — y 2.4
    const L3=2.4; wallAt(-7.8,L3,-28.5,.5,12,1.7); wallAt(7.8,L3,-28.5,.5,12,1.7); for(const s of [-1,1]) wallAt(s*5.1,L3,-22.6,5.4,.5,1.7); wallAt(0,L3,-34.4,16.1,.5,1.7);
    K.b(0,L3,-22.6,4.6,.3,2.6,ST); pillars([-1.6,1.6].flatMap(px=>[-.9,.9].map(pz=>[px,L3+.3,-22.6+pz])),2.4,.14); K.b(0,L3+.3,-22.6,3.2,2.2,.12,DOOR); K.b(0,L3+2.7,-22.6,4.6,.3,2.6,WD);
    K.b(0,L3,-30.5,10,.9,6.5,ST); pillars([0,1,2,3].flatMap(i=>[-2.2,2.2].map(zz=>[-4+i*2.67,L3+.9,-30.5+zz])),2.7,.16); K.b(0,L3+.9,-30.5,7.6,2.7,4.2,WH); for(let i=0;i<3;i++) K.b(-2.67+i*2.67,L3+1.1,-28.3,2.1,2.2,.12,DOOR); K.b(0,L3+3.6,-30.5,8.4,.3,4.8,WD);
    // 주소(고직사, 관리인 집) — 동쪽 담 밖 ㅁ자 집(약식)
    { const xc=25.5, zc=-6; K.b(xc,0,zc,12,.4,11,ST2); for(const [x,z,w,d] of [[xc,zc-4,12,3],[xc,zc+4,12,3],[xc-4.5,zc,3,5],[xc+4.5,zc,3,5]]){ K.b(x,.4,z,w,2.4,d,WH); roofHF(x,2.8,z,w+1.6,d+1.4,1.3,{swap:d>w,dt:1,mat:GW,under:RU,thk:.2,sori:.1,gmat:WDl}); } }
    // 나무: 마당 배롱나무 4 · 존덕사 옆 배롱나무 · 뒤 소나무
    for(const [px,pz,h] of [[-15.5,9,4.5],[15.5,9,4.2],[-6,19,3.6],[-15,-4,4]]) crape(px,0,pz,h); crape(10.5,L3,-26,4.2); crape(-10.5,L3,-27,3.8);
    for(const [px,pz,h] of [[-16.5,-32,7],[16.5,-32.5,6.5],[-24,0,6],[-25,-20,6.5],[-26,14,5.5],[33,10,6],[31,-16,6.5],[-30,-30,7]]) pine(px,0,pz,h);
    // ---- 2: 지붕 ----
    K.layer(2);
    roofHF(0,F1+3.65,MZ,MW+3.6,MD+3.4,2.9,{dt:.45,mat:GW,under:RU,thk:.32,sori:.5,gmat:WDl,rh:.5}); // 만대루 팔작
    for(const s of [-1,1]) roofHF(s*11.6,3.85,3,7.4,13.0,2.1,{swap:true,dt:1,mat:GW,under:RU,thk:.25,sori:.25,gmat:WDl}); // 동재·서재 맞배
    roofHF(0,B1+3.8,IZ,IW+3.8,ID+3.2,3.1,{dt:.45,mat:GW,under:RU,thk:.32,sori:.55,gmat:WDl,rh:.5}); // 입교당 팔작
    for(const [x,z,w,d] of [[-13,-16,7,4.2],[13,-16.5,6,4.6]]) roofHF(x,L2+3.2,z,w+2.2,d+2.0,1.4,{dt:1,mat:GW,under:RU,thk:.2,sori:.15,gmat:WDl});
    roofHF(0,L3+3.0,-22.6,6.2,3.8,1.3,{dt:1,mat:GW,under:RU,thk:.2,sori:.1,gmat:WDl}); roofHF(0,L3+3.9,-30.5,10.4,6.6,2.2,{dt:1,mat:GW,under:RU,thk:.25,sori:.25,gmat:WDl});
  }});
