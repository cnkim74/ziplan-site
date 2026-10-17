__bsigFill({"himeji":function(K){
// 실측: 대천수 건물 31.5 m · 석축 14.85 m · 외관 5층(5重), 내부 지하 1층·지상 6층 · 3층 소천수 3기(동·서·이누이) · 2층 와타리야구라 · 1609(게이초 14) 완성 · 벽 흰 회반죽 총도장
// 출처: tabi-mag.jp 「姫路城」(大天守 31.5 m, 石垣 14.85 m, 外観5層·地下1階地上6階, 3重の小天守3基, 2重の渡櫓, 千鳥破風·大千鳥破風·唐破風, 1609) · nippon.com 'Himeji Castle'(벽·기와 이음매 시로시쿠이, 총높이 46.3 m)
// 추정 치수: 대천수 1층 24 × 20 m → 5층 12.5 × 9.5 m, 층 높이 4~5 m, 처마 내밀기 2.4 m · 소천수 각 12 × 10 m · 와타리야구라 폭 7 m · 천수 마당 석축 67 × 60 m · 히메산 정상(석축 밑) 표고 약 45 m, 시가지는 약 33 m 아래 · 박공 배치는 사진을 보고 단순화
    const T=K.T;
    const WH=K.col(0xf3f2ee,{roughness:.92}), WH2=K.col(0xe2e1dc,{roughness:.95}), GR=K.col(0x5d6166,{roughness:.6}), GRD=K.col(0x3d4045,{roughness:.7}), DKW=K.col(0x2b2a29,{roughness:.8}), PIN=K.col(0x2f4a2c,{roughness:.95}), MOAT=K.M.water;
    const ST=WH2, SG2=WH2, JUN=PIN;
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
    // 혼가와라(本瓦) 회색 기와 + 흰 회반죽 이음매: 256px = 2 m, 기왓골 7줄
    const HT=tmat('d_htile',256,(g,N)=>{ g.fillStyle='#585c61'; g.fillRect(0,0,N,N); const n=7, cw=N/n; for(let i=0;i<n;i++){ const x=i*cw; const gr=g.createLinearGradient(x,0,x+cw,0); gr.addColorStop(0,'#4a4e53'); gr.addColorStop(.25,'#6c7076'); gr.addColorStop(.5,'#8b8f95'); gr.addColorStop(.72,'#666a70'); gr.addColorStop(1,'#46494e'); g.fillStyle=gr; g.fillRect(x+cw*.22,0,cw*.56,N); g.fillStyle='#ecebe6'; g.fillRect(x+cw*.16,0,cw*.07,N); g.fillRect(x+cw*.77,0,cw*.07,N); } g.fillStyle='rgba(30,30,30,.25)'; for(let j=0;j<8;j++) g.fillRect(0,j*N/8,N,2); },0x7a7e83,{roughness:.55,metalness:.05});
    // 석축(石垣): 다듬은 화강암 쌓기(打込接) — 512px = 8 m
    const STN=tmat('d_ishi',512,(g,N,rr)=>{ g.fillStyle='#54504a'; g.fillRect(0,0,N,N); let y=0; while(y<N){ const h=22+rr()*20; let x=-rr()*40; while(x<N){ const w=30+rr()*55; const t=128+Math.floor(rr()*50); g.fillStyle=`rgb(${t},${t-4},${t-12})`; for(const ox of [0,-N]){ g.beginPath(); g.moveTo(ox+x+2,y+2+rr()*2); g.lineTo(ox+x+w-2,y+1+rr()*3); g.lineTo(ox+x+w-1,y+h-2); g.lineTo(ox+x+1,y+h-1-rr()*3); g.closePath(); g.fill(); } x+=w; } y+=h; } for(let i=0;i<3000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.08)':'rgba(20,20,20,.1)'; g.fillRect(rr()*N,rr()*N,2,2); } },0x8a857c,{roughness:.95});
    // 격자창(格子窓): 흰 회반죽 틀 + 어두운 나무 살
    const WIN=tmat('d_hwin',128,(g,N)=>{ g.fillStyle='#ecebe6'; g.fillRect(0,0,N,N); g.fillStyle='#24211e'; g.fillRect(14,14,N-28,N-28); g.fillStyle='#8f8a82'; for(let i=0;i<7;i++) g.fillRect(20+i*(N-40)/6-3,14,6,N-28); },0x2b2a29,{roughness:.8});
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
    // 연직 삼각판(박공 면): 앞면이 로컬 +z
    const tri=(x,y,z,w,h,ry,mat,dep)=>{ dep=dep||.12; const sh=new T.Shape(); sh.moveTo(-w/2,0); sh.lineTo(0,h); sh.lineTo(w/2,0); sh.lineTo(-w/2,0); const g=new T.ExtrudeGeometry(sh,{depth:dep,bevelEnabled:false}); g.translate(0,0,-dep); const m=new T.Mesh(g,mat); m.position.set(x,y,z); m.rotation.y=ry||0; return put(m); };
    // 치도리하후(千鳥破風): 지붕 경사 위에 앉은 삼각 박공 — 기와 프리즘 + 흰 박공면 + 게교(懸魚). (x,z)=처마선 위 박공 앞면 중심, ry=바깥 방향
    const chidori=(x,yb,z,w,h,ry,dep)=>{ dep=dep||h/.55+1; const c=Math.cos(ry), s=Math.sin(ry); const g=new T.ExtrudeGeometry((()=>{ const sh=new T.Shape(); sh.moveTo(-w/2-.5,-.15); sh.lineTo(0,h+.35); sh.lineTo(w/2+.5,-.15); sh.lineTo(-w/2-.5,-.15); return sh; })(),{depth:dep,bevelEnabled:false}); g.translate(0,0,-dep);
      const m=new T.Mesh(g,HT); m.position.set(x,yb,z); m.rotation.y=ry; put(m); tri(x+s*.22,yb,z+c*.22,w,h,ry,WH,.25); K.b(x+s*.3,yb+h*.62,z+c*.3,.5,h*.3,.5,WH2,ry); K.b(x+s*.3,yb+h*.78,z+c*.3,.9,.12,.5,DKW,ry); };
    // 가라하후(唐破風): 가운데 볼록, 끝이 살짝 들리는 곡선 박공
    const kara=(x,yb,z,w,h,ry,dep)=>{ dep=dep||4.2; const c=Math.cos(ry), s=Math.sin(ry); const f=t=>{ const q=Math.abs(t); return h*(.5*(1+Math.cos(Math.PI*Math.min(1,q/.92))))+(q>.8?h*.22*Math.pow((q-.8)/.2,2):0); };
      const P=(t,dz,y)=>{ const lx=t*w/2; return [x+c*lx+s*dz,y,z-s*lx+c*dz]; };
      K.surf((u,v)=>{ const t=u*2-1, dz=.6-v*dep; const p=P(t,dz,yb+f(t)+.35); return [p[0],p[1],p[2],u*w/2,v*dep/2]; },28,4,HT);
      K.surf((u,v)=>{ const t=u*2-1; const p=P(t,.55,yb+(f(t)+.1)*v); return p; },28,1,WH);
      K.surf((u,v)=>{ const t=u*2-1; const p=P(t,.62,yb+f(t)+.05+.32*v); return p; },28,1,WH2); };
    // 석축: 아래로 갈수록 바깥으로 벌어지는 곡선 경사(扇の勾配) — 윗면 w×d, 높이 h, 밑 벌어짐 bt
    const ishigaki=(cx,cz,w,d,y0,h,bt)=>{ const off=t=>bt*Math.pow(1-t,2.2);
      K.surf((u,v)=>{ const s=u*4, k=Math.floor(Math.min(3.999,s)), f=s-k, o=off(v); let x,z,L0; if(k===0){ x=-(w/2+o)+(w+2*o)*f; z=d/2+o; } else if(k===1){ x=w/2+o; z=d/2+o-(d+2*o)*f; } else if(k===2){ x=w/2+o-(w+2*o)*f; z=-(d/2+o); } else { x=-(w/2+o); z=-(d/2+o)+(d+2*o)*f; } L0=(k%2?d:w); return [cx+x,y0+h*v,cz+z,(k*(w+d)/2+f*L0)/8*2,h*v/8]; },96,10,STN);
      K.b(cx,y0+h-.3,cz,w-.1,.3,d-.1,STN); };
    // 한 층(흰 벽 몸통 + 격자창 줄)
    const WINL=[]; const story=(cx,cz,w,d,y0,h,yWin,nWin)=>{ K.b(cx,y0,cz,w,h,d,WH); for(const [ox,oz,L,ry] of [[0,d/2,w,0],[0,-d/2,w,Math.PI],[w/2,0,d,Math.PI/2],[-w/2,0,d,-Math.PI/2]]){ const n=Math.max(1,Math.floor(L/(nWin||2.6))); for(let i=0;i<n;i++){ const u=-L/2+L*(i+.5)/n; WINL.push([cx+ox+Math.cos(ry)*u+Math.sin(ry)*.03,yWin,cz+oz-Math.sin(ry)*u+Math.cos(ry)*.03,ry]); } } };
    const flushWin=()=>{ if(!WINL.length) return; const g=new T.PlaneGeometry(1.1,1.25); const m=new T.InstancedMesh(g,WIN,WINL.length); const M4=new T.Matrix4(), Q=new T.Quaternion(), E3=new T.Euler(); WINL.forEach((p,i)=>{ E3.set(0,p[3],0); Q.setFromEuler(E3); M4.compose(new T.Vector3(p[0],p[1],p[2]),Q,new T.Vector3(1,1,1)); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; put(m,false); WINL.length=0; };
    // 샤치호코(鯱): 회색 기와 — 몸통 + 위로 휜 꼬리
    const shachi=(x,y,z,s,sc)=>{ sc=sc||1; K.b(x,y,z,.7*sc,1.1*sc,.5*sc,GR); K.b(x-s*.25*sc,y+1.0*sc,z,.5*sc,.7*sc,.45*sc,GR); K.b(x-s*.5*sc,y+1.5*sc,z,.6*sc,.3*sc,.3*sc,GRD); };
    // 소천수(3층) — 층마다 처마, 꼭대기 이리모야
    const keep3=(cx,cz,w,d,y0,ry)=>{ let ww=w, dd=d, y=y0; const hs=[4.2,3.8,3.6]; for(let k=0;k<3;k++){ const top=k<2?y+hs[k]+1.6:y+hs[k]; story(cx,cz,ww,dd,y,top-y,y+hs[k]-1.8,2.4); if(k<2){ hip(cx,y+hs[k]-.2,cz,ww+3.6,dd+3.6,(dd+3.6)/2*.62,{p:1.15,lift:.35,mat:HT,under:WH,rim:WH2,thk:.3,rmat:GR,nu:24,nv:16,hip0:.0}); } y+=hs[k]; ww-=2.6; dd-=2.2; }
      ww+=2.6; dd+=2.2; const ye=y-.2; roofHF(cx,ye,cz,ww+3.4,dd+3.4,(dd+3.4)/2*.8,{dt:.42,mat:HT,under:WH,gmat:WH,thk:.3,sori:.35,rmat:GR,rw:.5,rh:.5,swap:!!ry}); const rx=ry?0:(ww+3.4-(dd+3.4)*.58)/2, rz=ry?(dd+3.4-(ww+3.4)*.58)/2:0; for(const s of [-1,1]) shachi(cx+s*rx,ye+(dd+3.4)/2*.8+.15,cz+s*rz,s,.8); return y; };

    // 흰 토담(土塀) + 기와 갓 + 총안(狹間) · 망루(櫓)
    const DW=[], DR=[], HZ=[]; const dobe=(x0,z0,x1,z1,y)=>{ const L=Math.hypot(x1-x0,z1-z0), ry=Math.atan2(x1-x0,z1-z0)+Math.PI/2; DW.push(bx((x0+x1)/2,y,(z0+z1)/2,L,2.2,.6,ry)); DR.push(bx((x0+x1)/2,y+2.2,(z0+z1)/2,L+.3,.35,1.3,ry)); const n=Math.floor(L/2.2); for(let i=0;i<n;i++){ const t=(i+.5)/n; HZ.push([x0+(x1-x0)*t,y+1.1,z0+(z1-z0)*t,ry]); } };
    const flushDobe=()=>{ merge(DW,WH); merge(DR,GR); if(HZ.length) inst(boxG(.35,.35,.7),DKW,HZ.map(h=>[h[0],h[1],h[2],h[3]])); DW.length=0; DR.length=0; HZ.length=0; };
    const yagura=(x,z,w,d,y)=>{ K.b(x,y,z,w,4.2,d,WH); K.b(x,y+4.2,z,w-1.5,3.4,d-1.5,WH); hip(x,y+3.9,z,w+2,d+2,1.3,{p:1.1,mat:HT,under:WH,thk:.25,ridge:false,nu:12,nv:8,rmat:GR}); roofHF(x,y+7.4,z,w+.6,d+.6,(d+.6)/2*.8,{dt:.45,mat:HT,under:WH,gmat:WH,thk:.25,sori:.3,rmat:GR,rw:.4,rh:.4}); };
    // ================= 배경(K.life): 히메산 계단식 곽(曲輪)·흰 토담·망루·소나무 숲·해자·산노마루·오테마에 거리 =================
    const H0=[-52,18.5,-46,16.5];
    LIFE(()=>{
      // 높이장: 정상 평지(y=0, 비젠마루·천수 주변) → 니노마루(-11) → 산노마루·해자 바깥 시가(-33). 단 가장자리는 급경사(석축 색)
      const ss=E.ss; const plat=(x,z,x0,x1,z0,z1,e)=>ss(Math.min(x-x0,x1-x,z-z0,z1-z)/e+1);
      const hf=(x,z)=>{ const p0=plat(x,z,-66,32,-58,40,2.2), p1=plat(x,z,-140,95,-150,120,2.5); const base=-33; let h=base+22*p1+11*p0; const moat=(z>175&&z<215&&x>-260&&x<240)||(x>-300&&x<-260&&z>-200&&z<215)||(x>240&&x<280&&z>-200&&z<215); if(moat) h=-37; if(p1<.02) h+=E.fbm(x*.02,z*.02,2)*1.2; return h; };
      const TR=E.terrain(-1100,1100,-1100,1100,160,160,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.03,z*.03,2); if(h<-35) return [.36,.42,.42]; if(ny<.72) return [.55+.05*n,.53+.05*n,.49+.04*n]; if(h>-.5) return [.78+.03*n,.75+.03*n,.67]; if(h>-11.5&&h<-10.5) return [.48+.05*n,.58+.05*n,.38]; if(z>110&&z<175&&Math.abs(x)<220&&h<-32) return [.5+.05*n,.62+.05*n,.38]; return [.6+.04*n,.6+.04*n,.56]; },H0);
      for(const [x,z,w,d] of [[-10,195,500,40],[-280,7,40,415],[260,7,40,415]]) K.water(x,-35.6,z,w,d);
      // 정상 단 가장자리 흰 토담(土塀) + 기와 갓 · 니노마루 단 토담 — 삼각·사각 총안(狹間) 점
      dobe(-138,118,93,118,-11); dobe(93,118,93,-148,-11); dobe(-138,118,-138,-148,-11); flushDobe();
      for(const [x,z,w,d,y] of [[85,110,12,8,-11],[-130,110,11,8,-11],[85,-140,10,8,-11],[-60,112,24,7,-11]])yagura(x,z,w,d,y);
      // 산노마루 광장 쪽 흰 다리(사쿠라몬교)와 오테몬 · 오테마에 거리 가로수
      K.b(-10,-35.4,195,14,1.6,44,WH2); K.b(-10,-33.8,214,24,7,8,K.col(0x6d6a65,{roughness:.8})); roofHF(-10,-26.8,214,28,11,3.4,{dt:.5,mat:HT,under:WH,gmat:WH,thk:.3,sori:.3,rmat:GR});
      E.plane(E.MAS,-10,-32.97,145,300,60);
      const BL=[]; for(let x=-1050;x<1050;x+=28) for(let z=-1050;z<1050;z+=28){ const xx=x+(E.r()-.5)*6, zz=z+(E.r()-.5)*6; if(xx>-320&&xx<300&&zz>-260&&zz<240) continue; if(Math.abs(xx+10)<26&&zz>240) continue; if(Math.hypot(xx,zz)>1050||E.r()<.12) continue; const far=Math.hypot(xx,zz)>600; BL.push([xx,zz,16+E.r()*10,16+E.r()*10,far&&E.r()<.35?16+E.r()*30:6+E.r()*12,E.r()<.4?'#9ea4aa':E.r()<.5?'#b5b0a7':'#8f8c86']); }
      const BL2=BL.map(b=>{ const y=TR.h(b[0],b[1]); return [b[0],b[1],b[2],b[3],b[4]+y+33,b[5]]; }); { const m=E.blocks(BL2); if(m) m.position.y=-33; }
      // 히메산 소나무 숲(경사면) + 오테마에 거리 가로수
      E.forest(E.scatter(-260,240,-240,210,6.5,TR.h,(x,z,h)=>{ const inP0=x>-69&&x<35&&z>-61&&z<43; const inP1=x>-143&&x<98&&z>-153&&z<123; return !inP0&&(h<-1&&h>-34)&&(!inP1||h<-11.6)&&!(z>110&&z<175&&Math.abs(x)<220)&&E.r()<.8; },(x,z,h)=>7+E.vn(x*.05,z*.05)*6,(x,z,h)=>E.r()<.7?1:0),{trunks:false});
      E.forest(E.scatter(-120,100,-145,115,9,TR.h,(x,z,h)=>h<-10.5&&h>-11.5&&!(x>-69&&x<35&&z>-61&&z<43)&&E.r()<.35,(x,z,h)=>6+E.r()*4,1),{trunks:false});
      { const L=[]; for(let z=250;z<1000;z+=14) for(const s of [-1,1]) L.push([-10+s*20,TR.h(-10+s*20,z),z,8,0,E.r(),1]); E.forest(L,{trunks:true}); }
    });

    // ================= 0: 천수 마당 석축(扇の勾配)·마당 =================
    K.layer(0);
    const Y0=14.85, Yc=9; // 대천수 석축 윗면 14.85 m · 소천수·와타리야구라가 선 천수 마당 석축 9 m(추정)
    ishigaki(-19,-16,58,52,0,Yc,3.5); E.plane(E.MAS,-19,Yc+.01,-16,57.6,51.6);
    // 정상 평지(비젠마루 등) 가장자리 흰 토담과 모서리 망루 — 남쪽 담에 출입 틈
    dobe(-64.5,38.5,-44,38.5,0); dobe(-36,38.5,30.5,38.5,0); dobe(30.5,38.5,30.5,-56.5,0); dobe(30.5,-56.5,-64.5,-56.5,0); dobe(-64.5,-56.5,-64.5,38.5,0); flushDobe();
    yagura(-58,32,9,7,0); yagura(24,-50,10,8,0);
    ishigaki(0,0,26,22,0,Y0,5.0); K.b(0,Y0-.02,0,25.6,.08,21.6,K.col(0x8f8a80,{roughness:.95}));

    // ================= 1~5: 대천수(5층) =================
    const S=[[24,20,5.2],[22.5,18.5,4.4],[19.5,15.5,4.2],[16,12.5,4.0],[11,8.5,4.6]];
    let y=Y0; const tops=[];
    for(let k=0;k<5;k++){ K.layer(1+k); const [w,d,h]=S[k]; story(0,0,w,d,y,(k<4?h+2.0:h),y+h-2.0,k===4?2.1:2.5); K.b(0,y+h-.55,0,w+.06,.12,d+.06,WH2);
      if(k<4){ const E2=w+4.8, D2=d+4.8, ye=y+h-.4; hip(0,ye,0,E2,D2,D2/2*.6,{p:1.15,lift:.55,mat:HT,under:WH,rim:WH2,thk:.35,rmat:GR,nu:40,nv:26}); tops.push([ye,E2,D2]); }
      flushWin(); y+=h; }
    // 꼭대기 이리모야(入母屋) — 용마루 동서, 박공은 동·서 · 샤치호코 한 쌍
    K.layer(6); const yT=y-.25; roofHF(0,yT,0,15.6,13,5.6,{dt:.42,mat:HT,under:WH,gmat:WH,thk:.4,sori:.45,rmat:GR,rw:.7,rh:.8,nu:36});
    const rL=(15.6-13*.58)/2; for(const s of [-1,1]) shachi(s*rL,yT+5.6+.3,0,s,1.35);
    // 박공: 층마다 엇갈려(남면 정면 기준) — 1층 처마: 작은 치도리 둘 · 2층: 오치도리(큰 삼각) · 3층: 가라하후 + 양옆 치도리 · 4층: 비익 치도리(쌍)
    { K.layer(2); const [ye1,E1,D1]=tops[0]; chidori(-6.5,ye1+.1,D1/2-.4,4.6,2.4,0); chidori(6.5,ye1+.1,D1/2-.4,4.6,2.4,0); chidori(E1/2-.4,ye1+.1,0,6,3,Math.PI/2); chidori(-E1/2+.4,ye1+.1,0,6,3,-Math.PI/2); chidori(0,ye1+.1,-D1/2+.4,6,3,Math.PI);
      K.layer(3); const [ye2,E2,D2]=tops[1]; chidori(0,ye2+.1,D2/2-.4,11,5.2,0); kara(E2/2-.5,ye2,0,5,1.4,Math.PI/2); kara(-E2/2+.5,ye2,0,5,1.4,-Math.PI/2); chidori(-5,ye2+.1,-D2/2+.4,4.4,2.3,Math.PI); chidori(5,ye2+.1,-D2/2+.4,4.4,2.3,Math.PI);
      K.layer(4); const [ye3,E3,D3]=tops[2]; kara(0,ye3,D3/2-.3,5.2,1.5,0); chidori(-6,ye3+.1,D3/2-.4,3.6,1.9,0); chidori(6,ye3+.1,D3/2-.4,3.6,1.9,0); chidori(E3/2-.4,ye3+.1,0,5.6,2.9,Math.PI/2); chidori(-E3/2+.4,ye3+.1,0,5.6,2.9,-Math.PI/2); kara(0,ye3,-D3/2+.3,5,1.4,Math.PI);
      K.layer(5); const [ye4,E4,D4]=tops[3]; chidori(-2.6,ye4+.1,D4/2-.4,4.4,2.4,0); chidori(2.6,ye4+.1,D4/2-.4,4.4,2.4,0); chidori(0,ye4+.1,-D4/2+.4,5,2.6,Math.PI); }
    // ================= 2: 소천수 3기 + 와타리야구라(2층) — 사각 고리 =================
    K.layer(2);
    keep3(-40,4,12,10,Yc,0); keep3(-40,-34.5,12,11,Yc,1); keep3(2,-34.5,14,11,Yc,0);
    const watari=(cx,cz,w,d,swap)=>{ const Y0=Yc; story(cx,cz,w,d,Y0,4.0+1.2,Y0+2.2,2.6); hip(cx,Y0+3.8,cz,w+3,d+3,(Math.min(w,d)+3)/2*.55,{R:swap?0:Math.max(0,w-d),p:1.1,mat:HT,under:WH,rim:WH2,thk:.3,rmat:GR,nu:24,nv:16,lift:.3}); story(cx,cz,w-2,d-2,Y0+4.0,3.4+1.2,Y0+6.2,2.6); roofHF(cx,Y0+7.2,cz,w+1.4,d+1.4,(swap?w+1.4:d+1.4)/2*.75,{dt:.45,swap:!!swap,mat:HT,under:WH,gmat:WH,thk:.3,sori:.3,rmat:GR,rw:.45,rh:.45}); };
    watari(-23,4.5,21,7,false); watari(-40,-15,7,26,true); watari(-20,-35,27,7,false); watari(2,-21,7,16,true);
    flushWin();
    // 정리: 기본 대지(평지 바닥·도로·잔디·가로수)는 빼고 사람만
    { const rt=K.bldg.parent, st=rt&&rt.children[0]; if(st&&st!==K.bldg&&st!==K.life) st.add=()=>st; // 산 지형이 바닥이라 기본 평지 바닥도 뺌
      const la=K.life.add.bind(K.life); K.life.add=(...o)=>{ o.forEach(m=>{ if(m&&m.material===K.M.people) la(m); }); return K.life; }; }
  }});
