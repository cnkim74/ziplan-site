__bsigFill({"tajmahal":function(K){
// 실측(개략): 흰 대리석 기단 95×95 m 높이 ~7 m(아래 낮은 사암 테라스) · 본당 57 m 모서리 깎인 정사각(벽 ~25 m) · 중앙 피슈타크(이완 아치 틀) ~33 m, 좌우 2단 아치 니치 · 양파 돔 지름 ~20 m 정상 ~73 m · 차트리 4(옥상 모서리) · 미나렛 4(기단 모서리) ~41 m 발코니 3 · 서 모스크·동 자와브(붉은 사암+흰 돔 3) · 앞(+z) 차르바그 정원: 수로·중앙 연못·사이프러스 · 뒤(-z) 야무나 강
    const MB=K.col(0xf5f1e9,{roughness:.55}), MBd=K.col(0xe8e2d6,{roughness:.6}), MBs=K.col(0xd8d1c3,{roughness:.7}), RS=K.col(0x9e5a45,{roughness:.9}), RSl=K.col(0xbd8a70,{roughness:.9}), SAND=K.col(0xc9ad95,{roughness:.95}), DK=K.col(0x2e2a26,{roughness:1}), DK2=K.col(0x4a423a,{roughness:1}), GD=K.col(0xd9b04a,{roughness:.35,metalness:.6}), CY=K.col(0x2f5a36,{roughness:.9}), GRN=K.M.grass, WT=K.M.water;
    const Y0=7.6, F=28.45, C=12, F2=(F-C/2)*Math.SQRT2, H=25.5;
    const W=(lx,lz,ry)=>[lx*Math.cos(ry)+lz*Math.sin(ry),-lx*Math.sin(ry)+lz*Math.cos(ry)];
    const bx=(lx,y,lz,w,h,d,mat,ry)=>{ const [x,z]=W(lx,lz,ry); return K.b(x,y,z,w,h,d,mat,ry); };
    const cc=(lx,y,lz,r,h,mat,seg,o)=>{ const [x,z]=W(lx,lz,ry0); return K.c(x,y,z,r,h,mat,seg,o); }; let ry0=0;
    const archPts=(w,h)=>{ const ys=h-w*.62, P=[[-w/2,0],[-w/2,-ys]]; for(let i=1;i<=8;i++){ const t=i/8; P.push([-w/2*(1-t),-(ys+(h-ys)*Math.pow(t,.55))]); } for(let i=7;i>=1;i--){ const t=i/8; P.push([w/2*(1-t),-(ys+(h-ys)*Math.pow(t,.55))]); } P.push([w/2,-ys],[w/2,0]); return P; };
    const arch=(lx,y,lz,w,h,d,mat,ry)=>{ const [x,z]=W(lx,lz,ry); const m=K.ex(archPts(w,h),d,mat,[x,y,z]); m.rotation.order='YXZ'; m.rotation.set(Math.PI/2,ry,0); return m; };
    const onion=(x,y,z,R,Hh,mat,bul)=>K.surf((u,v)=>{ const a=u*Math.PI*2, t=v; const f=(1+(bul||.2)*Math.sin(Math.PI*Math.pow(t,.8)))*Math.pow(1-Math.pow(t,2.4),.6); const r=Math.max(.03,R*f); return [x+r*Math.cos(a),y+Hh*t,z+r*Math.sin(a)]; },40,22,mat);
    const chhatri=(x,y,z,R,ch,mat)=>{ K.c(x,y,z,R*1.25,.5,mat,8); for(let i=0;i<8;i++){ const a=i*Math.PI/4+Math.PI/8; K.c(x+R*.95*Math.cos(a),y+.5,z+R*.95*Math.sin(a),R*.09,ch,mat,8); } K.c(x,y+.5+ch,z,R*1.2,R*.22,mat,8); K.c(x,y+.5+ch+R*.22,z,R*.85,R*.25,mat,16); onion(x,y+.5+ch+R*.47,z,R*.9,R*1.45,mat,.25); K.c(x,y+.5+ch+R*.47+R*1.4,z,R*.07,R*.55,GD,8,{r2:.02}); };
    const niche=(lx,y,lz,w,h,ry,mat2)=>{ bx(lx,y,lz,w+1.6,h+1.2,.3,mat2||MBs,ry); arch(lx,y+.5,lz-.6,w,h,1.0,DK,ry); };
    // ---- 0: 테라스·기단·정원 ----
    K.layer(0);
    K.b(0,0,-6,190,1.0,112,SAND); // 낮은 사암 테라스(강변)
    K.b(0,1.0,0,95.5,Y0-1.0,95.5,MB); K.b(0,Y0,0,95.9,.4,95.9,MBd); // 흰 대리석 기단
    for(let i=0;i<9;i++) K.b(0,1.0+i*.72,48.0+(9-i)*.55,16,.72,(9-i)*1.1+.1,MB); // 정면 계단
    for(let i=0;i<3;i++) K.b(0,i*.33,57+(3-i)*.6,22,.33,(3-i)*1.2,SAND);
    K.b(0,0,105,170,.25,100,GRN); K.b(0,.25,105,10.5,.5,100,SAND); K.b(0,.75,105,7.6,.3,100,MB); K.water(0,1.07,105,6.2,99); // 정원·수로
    K.b(0,.25,105,27,1.0,27,MB); K.water(0,1.27,105,24,24); for(let i=0;i<5;i++) K.c(0,1.27,88+i*8.5,.25,.9,MB,6); // 중앙 연못·분수
    K.b(0,.25,105,170,.2,5,SAND); for(const s of [-1,1]) K.b(s*45,.25,105,4,.2,100,SAND); K.b(0,.25,156,170,.2,4,SAND);
    for(let i=0;i<11;i++){ const z=60+i*9; if(Math.abs(z-105)<16) continue; for(const s of [-1,1]) K.c(s*11.5,.5,z,1.3,9,CY,7,{r2:.1}); } // 사이프러스
    for(let i=0;i<4;i++) for(const s of [-1,1]){ K.tree(s*32,66+i*24,6); K.tree(s*66,78+i*22,6.5); K.tree(s*50,60+i*30,5); }
    // ---- 1: 본당 몸체(모깎기 팔각) · 피슈타크 · 니치 ----
    K.layer(1);
    const OCT=[[-F,-(F-C)],[-(F-C),-F],[F-C,-F],[F,-(F-C)],[F,F-C],[F-C,F],[-(F-C),F],[-F,F-C]];
    K.ex(OCT,H,MB,[0,Y0,0]); K.ex(OCT.map(p=>[p[0]*1.012,p[1]*1.012]),1.0,MBd,[0,Y0+H,0],{shell:.7}); K.ex(OCT.map(p=>[p[0]*.985,p[1]*.985]),.5,MBd,[0,Y0+H,0]); // 벽 · 난간 · 옥상판
    for(let f=0;f<4;f++){ const ry=f*Math.PI/2; ry0=ry;
      bx(0,Y0,F+.3,21,33,1.6,MB,ry); bx(0,Y0+32.6,F+.3,21.6,.8,2.2,MBd,ry); // 피슈타크 틀(난간 위로 솟음)
      bx(0,Y0+.6,F+1.12,17.6,30,.1,MBd,ry); bx(0,Y0+1.1,F+1.18,15.8,29.0,.06,MBs,ry); // 캘리그래피 띠(이중 테두리)
      arch(0,Y0+1.0,F-.9,14.2,26.5,2.25,DK,ry); // 이완 아치(깊은 그늘)
      arch(0,Y0+1.0,F-.95,8.6,13.5,2.35,DK2,ry); bx(0,Y0+1.0,F+1.42,5.0,8.5,.14,DK,ry); // 안쪽 작은 입구 아치
      for(const s of [-1,1]){ const lx=s*13.4; niche(lx,Y0+1.2,F+.02,4.6,9.6,ry); niche(lx,Y0+13.2,F+.02,4.6,9.6,ry); // 2단 니치
        for(const [qx,qz,yy] of [[s*9.9,F+.3,Y0+33.4],[s*(F-C-.3),F-.5,Y0+H+1.0]]){ cc(qx,yy,qz,.5,4.8,MB,8,{r2:.36}); cc(qx,yy+4.8,qz,.6,.5,MB,8,{half:1}); } } // 굴다스타(소첨탑)
      const ry2=ry+Math.PI/4; niche(0,Y0+1.2,F2+.02,7.0,9.6,ry2); niche(0,Y0+13.2,F2+.02,7.0,9.6,ry2); } // 모깎기 면 2단 니치
    // ---- 2: 드럼·양파 돔·차트리 ----
    K.layer(2);
    K.c(0,Y0+H,0,9.8,7.2,MB,48); K.c(0,Y0+H+6.6,0,10.4,.6,MBd,48); // 드럼
    onion(0,Y0+H+7.2,0,9.9,25.5,MB,.2);
    K.c(0,Y0+H+7.2+25.0,0,.9,1.2,GD,10,{r2:.5}); K.c(0,Y0+H+7.2+26.2,0,.45,6.8,GD,10,{r2:.12}); K.c(0,Y0+H+7.2+33.0,0,.7,.7,GD,10,{half:1}); K.b(0,Y0+H+7.2+33.4,0,1.6,.2,.2,GD); // 금동 첨탑·초승달
    for(const [x,z] of [[-17.4,-17.4],[17.4,-17.4],[-17.4,17.4],[17.4,17.4]]) chhatri(x,Y0+H+1.0,z,3.9,4.2,MB);
    // ---- 3: 미나렛 4(기단 모서리) ----
    K.layer(3);
    for(const [x,z] of [[-43.6,-43.6],[43.6,-43.6],[-43.6,43.6],[43.6,43.6]]){ K.c(x,Y0,z,4.4,2.2,MB,8); K.c(x,Y0+2.2,z,2.7,34.8,MB,24,{r2:1.95});
      for(const [y,r] of [[Y0+13.5,3.6],[Y0+25,3.3],[Y0+37,3.0]]){ K.c(x,y-1.0,z,r-1.0,1.0,MBd,16,{r2:r}); K.c(x,y,z,r,.55,MB,16); K.c(x,y+.55,z,r-.15,.9,MBs,16,{hollow:1}); }
      chhatri(x,Y0+37.6,z,2.1,3.2,MB); }
    // ---- 0: 서 모스크 · 동 자와브(붉은 사암 + 흰 돔 3 + 차트리 4) — 중앙(본당)을 향함 ----
    K.layer(0);
    for(const sx of [-1,1]){ const ry=sx>0?-Math.PI/2:Math.PI/2, cx=sx*84, cz=-6;
      K.b(cx,1.0,cz,24,16,56,RS); K.b(cx,17,cz,25,1.2,57,RSl);
      K.b(sx*72.3,1.0,cz,1.6,23,16,RS); K.b(sx*72.3,24,cz,2.2,.8,16.6,RSl); { const m=K.ex(archPts(9.5,17),1.4,DK,[sx*72.9,2.0,cz]); m.rotation.order='YXZ'; m.rotation.set(Math.PI/2,ry,0); }
      K.b(sx*73.3,1.6,cz,.12,21.5,13.2,MBd); K.b(sx*73.4,2.0,cz,.1,20.5,11.6,RS);
      for(const dz of [-19,19]) for(const y of [2.0,10]){ const m2=K.ex(archPts(4.6,6.8),1.0,DK,[sx*72.0+(sx>0?.9:-.9),y,cz+dz]); m2.rotation.order='YXZ'; m2.rotation.set(Math.PI/2,ry,0); K.b(sx*72.1,y-.3,cz+dz,.1,7.6,6.0,RSl); }
      for(const [dz,r] of [[-19,4.8],[0,6.4],[19,4.8]]){ K.c(cx,17,cz+dz,r,2.6,MB,32); onion(cx,19.6,cz+dz,r,r*2.3,MB,.22); K.c(cx,19.6+r*2.25,cz+dz,.35,3,GD,8,{r2:.08}); }
      for(const [dx,dz] of [[-10,-26],[10,-26],[-10,26],[10,26]]) chhatri(cx+dx,18.2,cz+dz,1.7,2.3,RSl); }
  
    // ---- 주변 환경(v19 보강): 실제 맥락 지형·이웃·식생·물(K.life — bbox 밖) ----
    { const T=K.T; const L0=K.cur;
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


    const W=(()=>{ const TT=K.T;
      // 하늘 돔(초고층·넓은 맥락용): 뷰어 하늘 구(600)보다 카메라가 멀어질 때 검게 비는 것을 막음 — 밤이면 밤색
      const sky=(R)=>{ const g=new TT.SphereGeometry(R,32,16); const p=g.attributes.position; const mk=night=>{ const col=[]; const top=new TT.Color(night?0x0b1226:0x9fc0de).convertSRGBToLinear(), hor=new TT.Color(night?0x2a3350:0xeee9df).convertSRGBToLinear(), c=new TT.Color(); for(let i=0;i<p.count;i++){ const t=Math.max(0,Math.min(1,p.getY(i)/(R*.63))); c.copy(hor).lerp(top,Math.pow(t,.65)); col.push(c.r,c.g,c.b); } return new TT.Float32BufferAttribute(col,3); }; const cD=mk(false), cN=mk(true); g.setAttribute('color',cD); const m=new TT.Mesh(g,new TT.MeshBasicMaterial({vertexColors:true,side:TT.BackSide,fog:false,depthWrite:false})); m.renderOrder=-1; m.frustumCulled=false; let cur=0; m.onBeforeRender=(r,sc)=>{ const n=sc.fog&&sc.fog.color&&sc.fog.color.r<.3?1:0; if(n!==cur){ cur=n; g.setAttribute('color',n?cN:cD); } }; K.life.add(m); return m; };
      // life 평면(bbox 밖): 재질 m, 중심 x,z, 크기 w,d, 높이 y, 회전 ry
      const lplane=(m,x,y,z,w,d,ry)=>{ const g=new TT.PlaneGeometry(w,d); g.rotateX(-Math.PI/2); if(ry) g.rotateY(ry); g.translate(x,y,z); if(m.userData&&m.userData.tm){ const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); } const me=new TT.Mesh(g,m); me.receiveShadow=m!==WATER; K.life.add(me); return me; };
      // 다각형 바닥(life): pts [[x,z],…]
      const lpoly=(m,pts,y)=>{ pts=pts.slice(); { let a=0; for(let i=0;i<pts.length;i++){ const p=pts[i], q=pts[(i+1)%pts.length]; a+=p[0]*q[1]-q[0]*p[1]; } if(a>0) pts.reverse(); } const sh=new TT.Shape(); pts.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); const g=new TT.ShapeGeometry(sh); g.rotateX(-Math.PI/2); g.translate(0,y,0); if(m.userData&&m.userData.tm){ const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); } m.side=TT.DoubleSide; const me=new TT.Mesh(g,m); me.receiveShadow=true; K.life.add(me); return me; };
      const solid=(hex,o)=>{ const m=new TT.MeshStandardMaterial(Object.assign({color:hex,roughness:.95},o||{})); m.color.convertSRGBToLinear(); m.userData.nocast=1; return m; };
      const WATER=E.WATER;
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
      const ring=(o)=>{ const L=[]; const st=o.step||50, cs=Math.cos(o.ry||0), sn=Math.sin(o.ry||0); for(let a=-o.r1;a<o.r1;a+=st) for(let b=-o.r1;b<o.r1;b+=st){ const x0=a+(E.r()-.5)*st*.25, z0=b+(E.r()-.5)*st*.25; const x=(o.cx||0)+x0*cs+z0*sn, z=(o.cz||0)-x0*sn+z0*cs; const r=Math.hypot(x0,z0); if(r<o.r0||r>o.r1) continue; if(o.keep&&!o.keep(x,z,r)) continue; if(o.clr&&x>-o.clr*.12&&z>-o.clr*.12&&Math.hypot(x,z)<o.clr) continue; if(E.r()>(o.fill||.65)) continue;
          const tall=o.tall&&E.r()<o.tall[0]; const gl=tall||E.r()<(o.gp||0); const w=st*(.45+E.r()*.35), d=st*(.45+E.r()*.35); const h=tall?o.tall[1]+E.r()*o.tall[2]:o.h(r,x,z); const pal=gl?(o.gpal||['#b7c5cf','#a3b4c0','#c3cdd4']):o.pal; const rf=!gl&&o.roof?o.roof:null; L.push([x,z,w,d,h,pal[Math.floor(E.r()*pal.length)],o.ry||0,gl?'g':(o.kind||'p'),rf?rf[0]:null,rf?rf[1]:0,rf?rf[2]:0,o.hy?o.hy(x,z):0]); } return city(L); };
      // 맨해튼 격자: x 방향 블록 길이 bx(애비뉴 간격), z 방향 by(스트리트 간격), 블록마다 남북 두 줄로 필지를 나눔 — o={x0,x1,z0,z1,bx,bz,aw,sw,skip(x,z,w,d)→bool, h(x,z)→높이, pal, gpal, gp}
      const manh=(o)=>{ const L=[]; const bx=o.bx||260, bz=o.bz||80, aw=o.aw||30, sw=o.sw||18; for(let X=o.x0;X<o.x1;X+=bx) for(let Z=o.z0;Z<o.z1;Z+=bz){ const W0=bx-aw, D0=bz-sw; for(const row of [-1,1]){ let x=X-W0/2; while(x<X+W0/2-4){ const w=Math.min(X+W0/2-x,10+E.r()*E.r()*45); const cx=x+w/2, cz=Z+row*D0/4, d=D0/2-(E.r()<.3?E.r()*8:0); x+=w; if(o.skip&&o.skip(cx,cz,w,d)) continue; const h=o.h(cx,cz); if(h<=0) continue; const gl=h>110&&E.r()<(o.gp===undefined?.5:o.gp); const pal=gl?(o.gpal||['#a9b8c3','#9aabb7','#bcc6cc']):(o.pal||['#cbbfa8','#b9a993','#a38f7a','#d8d0c0','#9c8f84','#c4b49c']); L.push([cx,cz+(row>0?-(D0/2-d)/2:(D0/2-d)/2),w-.6,d,h,pal[Math.floor(E.r()*pal.length)],0,gl?'g':'p']); } } } return city(L); };
      // 뷰어의 일반 대지(잔디판·포장판·길·차선)를 이 모형이 떠 있는 동안만 숨김 — site 자식의 visible을 getter로 바꿔(life가 보일 때 false) 첫 프레임·썸네일에서도 적용, 'site' 단계처럼 life가 꺼지면 원래대로 보이고, 다른 모형으로 바뀌면(표식이 life에서 빠지면) 자동으로 원상
      const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
        const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
      return {sky,lplane,lpoly,solid,WATER,city,grid,ring,manh,own}; })();

    // 배경 도우미: rib 길(폴리라인 → 띠, 높이 y 또는 y(x,z)) · LB life 상자(그림자 없음) · LC life 원기둥 · GRV/ASP/LAWN 바닥 재질
    const rib=(m,pts,w,y)=>{ const P=[],U=[],I=[], tm=(m.userData&&m.userData.tm)||6; for(let i=0;i<pts.length;i++){ const a=pts[Math.max(0,i-1)], b=pts[Math.min(pts.length-1,i+1)]; const dx=b[0]-a[0], dz=b[1]-a[1], l=Math.hypot(dx,dz)||1; const nx=-dz/l*w/2, nz=dx/l*w/2, x=pts[i][0], z=pts[i][1]; for(const s of [1,-1]){ const px=x+s*nx, pz=z+s*nz; P.push(px,typeof y==='function'?y(px,pz):y,pz); U.push(px/tm,-pz/tm); } if(i) I.push(2*i-2,2*i,2*i-1, 2*i-1,2*i,2*i+1); }
      const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(P,3)); g.setAttribute('uv',new T.Float32BufferAttribute(U,2)); g.setIndex(I); g.computeVertexNormals(); if(g.attributes.normal.getY(0)<0){ const J=[]; for(let k=0;k<I.length;k+=3) J.push(I[k],I[k+2],I[k+1]); g.setIndex(J); g.computeVertexNormals(); } const me=new T.Mesh(g,m); me.receiveShadow=true; me.castShadow=false; K.life.add(me); return me; };
    const LB=(x,y,z,w,h,d,mat,ry)=>{ K.cur=K.life; const m=K.b(x,y,z,w,h,d,mat,ry); m.castShadow=false; return m; };
    const LC=(x,y,z,r,h,mat,seg,o)=>{ K.cur=K.life; const m=K.c(x,y,z,r,h,mat,seg,o); m.castShadow=false; return m; };
    const GRV=E.tmat(E.masTex(),0xcdbf9e,{tint:0xe2dccd,roughness:.97}); GRV.userData.tm=6;
    const ASP=W.solid(0x55585b,{roughness:.93}), LINE=W.solid(0xe9e7df), CURB=W.solid(0xb9b5ac);
    const AX=(R,n,k,e)=>{ const A=E.axis(R,n,k).concat(e||[]); A.sort((a,b)=>a-b); return A.filter((v,i)=>i===0||v-A[i-1]>.05); }; // 지형 축(가운데 촘촘) + 구멍 모서리 선
    const VIEW=(x,z,r0)=>{ const a=Math.atan2(z,x); return Math.abs(a-.87)<.6&&Math.hypot(x,z)<r0; }; // 눈높이·정면 카메라 쪽 부채꼴(가리지 않게 비움)

    // 아그라 야무나강 남쪽 둑(축: +z=남(정원·정문), -z=북(강)): 강변 사암 테라스 바로 뒤로 강둑이 내려가고 넓은 모래톱 사이로 야무나강, 건너편 둑에 마흐타브 바그(달빛 정원) · 정원(차르바그)은 붉은 사암 총안 담으로 세 면을 두르고 남쪽 끝에 붉은 사암 대문(다르와자-이 라우자, 흰 대리석 테두리·모서리 차트리) · 그 밖은 앞마당과 타지 간지 마을, 동쪽 숲 — 정원 길이는 모형처럼 축약, 배치·높이 개략(추정)
    K.layer(0); E.own();
    const HOLE=[-95,95,-62,50];
    const hf=(x,z)=>{ let h=0; if(z<-62){ const t=-62-z; h=-7.5*E.ss(t/26); if(t>40&&t<300) h=-8.6+(E.fbm(x*.01,z*.01,2)-.5)*1.6; if(t>=300) h=-8.6+7.5*E.ss((t-300)/30); }
        else h=(E.fbm(x*.006,z*.006,3)-.5)*3*E.ss((Math.hypot(x,z-60)-260)/200); return h; };
    const TR=E.terrain(0,0,0,0,AX(2600,170,4.4,[HOLE[0],HOLE[1]]),AX(2600,170,4.4,[HOLE[2],HOLE[3]]),hf,(x,z,h,ny)=>{ const n=E.fbm(x*.05,z*.05,2);
        if(z<-62&&h<-1){ if(h<-7.8) return [.78+.04*n,.72+.04*n,.58+.03*n]; return [.66+.04*n,.58+.04*n,.45]; } // 모래톱 · 강둑
        if(z<-380) return [.42+.05*n,.5+.05*n,.3]; // 건너편 마흐타브 바그·들
        if(Math.abs(x)<100&&z>50&&z<160) return [.45,.56,.32];
        if(z>160&&z<230&&Math.abs(x)<120) return [.72+.03*n,.6+.03*n,.48]; // 앞마당(붉은 사암 포장)
        const d=E.ss((Math.hypot(x,z)-600)/1500)*.5, c=E.vn(x*.01,z*.01)>.62?[.4,.48,.3]:[.68+.04*n,.62+.04*n,.5+.03*n]; return c.map((v,i)=>v+([.74,.73,.72][i]-v)*d); },HOLE);
    // 야무나강: 모래톱 사이 물길(건기 폭 약 120 m) — 굽이
    { const P=[]; for(let x=-2600;x<=2600;x+=40) P.push([x,-215+40*Math.sin(x*.0012)]); rib(E.WATER,P,130,-8.2); }
    // 붉은 사암 총안 담(정원 세 면, 높이 약 7 m) + 모서리 팔각 탑 · 남쪽 대문
    const RS=K.col(0x9e5a45,{roughness:.9}), RSl=K.col(0xbd8a70,{roughness:.9}), MBw=K.col(0xf2ede4,{roughness:.6}), DKa=K.col(0x2e2a26,{roughness:1});
    for(const s of [-1,1]){ LB(s*100,0,105,2.2,7,110,RS); LB(s*100,7,105,2.6,.6,110,RSl); LC(s*100,0,160,4.5,11,RS,8); LC(s*100,11,160,4,3.5,MBw,8,{r2:2.2}); }
    LB(-61,0,160,78,7,2.2,RS); LB(61,0,160,78,7,2.2,RS); LB(-61,7,160,78,.6,2.6,RSl); LB(61,7,160,78,.6,2.6,RSl);
    { const z=166, H=23; LB(0,0,z,44,H,26,RS); LB(0,H,z,45,1.2,27,RSl); LB(0,.4,z-13.1,16,19,.3,MBw); LB(0,1.2,z-13.3,12,16,.5,DKa); LB(0,.4,z+13.1,16,19,.3,MBw); LB(0,1.2,z+13.3,12,16,.5,DKa);
      for(let i=0;i<11;i++) LC(-15+i*3,H+1.2,z-12.6,.9,2.2,MBw,8,{half:0}); for(const sx of [-1,1]) for(const sz of [-1,1]){ LC(sx*21,0,z+sz*12,2.6,H+3,RS,8); LC(sx*21,H+3,z+sz*12,2.4,2.6,MBw,8); LC(sx*21,H+5.6,z+sz*12,2.2,3.4,MBw,10,{r2:.15}); } } // 다르와자(흰 대리석 테두리·이완 아치·꼭대기 소돔 열·모서리 차트리 — 개략)
    // 앞마당 둘레 회랑 · 타지 간지 마을(갈색·흰 2~4층 평지붕) · 마흐타브 바그 담
    const BL=[[-95,195,70,10,6,'#a7614a',0,'n',null,0,0,TR.h(-95,195)],[95,195,70,10,6,'#a7614a',0,'n',null,0,0,TR.h(95,195)]];
    for(let gx=-1800;gx<1800;gx+=18) for(let gz=240;gz<1800;gz+=18){ const x=gx+(E.r()-.5)*5, z=gz+(E.r()-.5)*5; if(Math.hypot(x,z-200)>1500||E.r()<.35) continue; if(x>300&&z<700&&E.vn(x*.01,z*.01)>.45) continue;
      BL.push([x,z,8+E.r()*7,8+E.r()*6,5+E.r()*8,E.r()<.4?'#d9c9b0':E.r()<.5?'#c9a487':'#e8e0d2',0,'p',null,0,0,TR.h(x,z)]); }
    for(const [x,z,w,d] of [[0,-395,300,3],[-150,-480,3,170],[150,-480,3,170]]) BL.push([x,z,w,d,4,'#a7614a',0,'n',null,0,0,TR.h(x,z)]);
    W.city(BL);
    // 식생: 정원 담 밖 동·서 숲(타지 숲), 마흐타브 바그 과수, 강둑 덤불, 마을 나무
    E.forest(E.scatter(-1800,1800,-1600,1800,14,TR.h,(x,z,h)=>{ if(Math.abs(x)<110&&z>-70&&z<240) return false; if(VIEW(x,z,330)) return false; if(z<-70&&z>-380) return h>-3&&E.r()<.2; if(z>240) return E.r()<.12; return (Math.abs(x)>110&&z>-60&&z<240&&E.r()<.75)||(z<-380&&E.r()<.55); },(x,z)=>8+E.r()*6,(x,z)=>E.r()<.15?2:0),{trunks:false});
    W.sky(3000);
    tidy(1);

    K.cur=L0; }
  }});
