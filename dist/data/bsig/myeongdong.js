__bsigFill({"myeongdong":function(K){
// 출처: 종탑 높이 45 m, 성당은 진입로보다 13 m 높은 언덕 위, 1898 프와넬 신부 설계·우리나라 최초의 대규모 고딕 성당, 붉은 벽돌과 먹빛 벽돌의 대조 — 서울시 미디어허브 「명동성당, 알고 보면 더 새롭다」(archives/2000733)
// 추정 치수: 라틴 십자 길이 69 m · 트랜셉트 폭 29 m · 삼랑식(신랑 11 + 측랑 6×2) · 측랑 처마 8 · 신랑 벽 15.5 · 용마루 23 · 종탑 8×8 벽돌 25 + 8각 첨탑 20 = 45 m · 언덕은 6 m 단(13 m를 압축)으로, 앞쪽 넓은 계단과 비탈길
    const T=K.T; const BK=K.M.skinMat('brickR'), GB=K.col(0x8d8b86,{roughness:.9}), SL=K.col(0x454a53,{roughness:.6}), GW=K.M.glassW, DK=K.col(0x2a2420,{roughness:.8}), PV=K.M.pave, ST=K.M.stone, GS=K.M.grass;
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const inst=(geo,mat,items,cast)=>{ if(!items.length) return null; const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),E=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); E.set(0,it[3]||0,0); Q.setFromEuler(E); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; return put(m,cast); };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    const triG=(d)=>{ const sh=new T.Shape(); sh.moveTo(-.5,0); sh.lineTo(.5,0); sh.lineTo(0,.75); sh.closePath(); const g=new T.ExtrudeGeometry(sh,{depth:d,bevelEnabled:false}); g.translate(0,0,-d/2); return g; };
    const HL=6; // 언덕 단 높이
    const NW=11, AW=6, AH=8, NH=15.5, RID=23, TW=8, TH=25, SP=20, ZT=30.5, ZN=11.75, LN=40.5, ZX=-14, ZC=-24.25, ZA=-29;
    const LB=[], LT=[]; const lancet=(x,y,z,w,h,ry)=>{ LB.push([x,y,z,ry,w,h,1]); LT.push([x,y+h,z,ry,w,w,1]); }; // 첨두 창 = 상자 + 뾰족 삼각(인스턴스 2개 메시)
    const BR=[]; // 버트레스·필라스터(인스턴스)
    K.layer(0);
    // 언덕 단(6 m): 윗면 광장 + 앞쪽 넓은 계단 + 양옆 비탈길 · 단 옆면은 돌 옹벽
    K.b(0,0,-2,56,HL,84,ST); K.b(0,HL-.02,-2,54,.1,82,PV); K.b(0,-.02,2,60,.04,96,PV);
    { const n=14; for(let i=0;i<n;i++) K.b(0,0,40+(n-i)*.9+.45,18,HL*(i+1)/n,.9,GB); } // 정면 큰 계단(14단)
    for(const s of [-1,1]) K.b(s*23,-3,55,8,6,30,ST,0,{slope:-.2}); // 양옆 비탈길(경사 블록, 6 m를 30 m에)
    for(const [x,z] of [[-20,22],[20,22],[-22,-8],[22,-8],[-16,-34],[16,-34],[-24,8],[24,8]]){ K.c(x,HL,z,.2,3.6,K.M.trunk,6); const sp=new T.Mesh(new T.SphereGeometry(3.2,10,8),K.M.leaf2); sp.position.set(x,HL+5.8,z); put(sp); } // 언덕 위 나무(줄기가 단 위에서 시작)
    // 몸체: 측랑·신랑·트랜셉트·성가대·후진 (y=HL 위)
    const Y0=HL;
    K.b(0,Y0,ZN,NW,NH,LN,BK); for(const s of [-1,1]) K.b(s*(NW/2+AW/2),Y0,ZN,AW,AH,LN,BK);
    K.b(0,Y0,ZX,29,NH,11,BK); K.b(0,Y0,ZC,NW,NH,9.5,BK); K.b(0,Y0,ZC,NW+2*AW,AH,9.5,BK); K.c(0,Y0,ZA,NW/2+AW,AH,BK,28); K.c(0,Y0,ZA,5.5,NH,BK,20);
    for(const y of [2.2,7.5]) K.b(0,Y0+y,ZN,NW+2*AW+.16,.3,LN+.16,GB); for(const y of [11.2,14.9]) K.b(0,Y0+y,ZN,NW+.16,.3,LN+.16,GB); for(const y of [2.2,7.5,14.9]) K.b(0,Y0+y,ZX,29.16,.3,11.16,GB);
    // 버트레스(측랑 9칸) + 신랑 벽 필라스터 + 측랑 창·고창
    for(const s of [-1,1]) for(let k=0;k<9;k++){ const z=-8.3+k*5, xo=s*(NW/2+AW); BR.push([xo+s*.6,Y0,z,0,1.2,5.2,1.1],[xo+s*.4,Y0+5.2,z,0,.8,2.6,1.0],[s*(NW/2+.25),Y0+AH+1.5,z,0,.5,NH-AH-1.5,.8]); K.b(xo+s*.45,Y0+7.8,z,.9,.6,1.2,GB);
      if(k<8){ const zc=z+2.5; lancet(xo+s*.08,Y0+2.6,zc,1.5,3.4,Math.PI/2*s); lancet(s*(NW/2+.08),Y0+11.6,zc,1.2,2.6,Math.PI/2*s); } }
    // 트랜셉트 끝: 큰 첨두창 + 모서리 버트레스
    for(const s of [-1,1]){ lancet(s*14.58,Y0+5,ZX,3.6,7,Math.PI/2*s); for(const sz of [-1,1]) BR.push([s*14.8,Y0,ZX+sz*4.8,0,1.2,9,1.2],[s*14.2,Y0,ZX+sz*5.9,0,1.2,9,1.2]); lancet(s*14.58,Y0+12.5,ZX,1.2,2.4,Math.PI/2*s); }
    // 후진·회랑 창
    for(let i=-2;i<=2;i++){ const a=i*Math.PI/5.2, nx=Math.sin(a), nz=-Math.cos(a), ry=Math.PI-a; lancet(nx*5.62,Y0+10,ZA+nz*5.62,1.1,3.0,ry); lancet(nx*11.62,Y0+3,ZA+nz*11.62,1.4,3.0,ry); BR.push([nx*11.9,Y0,ZA+nz*11.9,ry,1.0,7.6,1.1]); }
    // 정면 측랑 끝 박공·창, 종탑 몸체·모서리 버트레스·띠
    for(const s of [-1,1]){ K.pedim(s*(NW/2+AW/2),Y0+AH,ZN+LN/2,AW,2.2,.4,BK,0); lancet(s*(NW/2+AW/2),Y0+2.6,ZN+LN/2+.1,1.6,3.6,0); }
    K.b(0,Y0,ZT,TW,TH,TW,BK);
    for(const sx of [-1,1]) for(const sz of [-1,1]) BR.push([sx*(TW/2+.5),Y0,ZT+sz*(TW/2-.6),0,1.0,13,1.2],[sx*(TW/2-.6),Y0,ZT+sz*(TW/2+.5),0,1.2,13,1.0],[sx*(TW/2+.3),Y0+13,ZT+sz*(TW/2-.6),0,.6,9,1.2],[sx*(TW/2-.6),Y0+13,ZT+sz*(TW/2+.3),0,1.2,9,.6]);
    for(const y of [7.3,17.2,24.3]) K.b(0,Y0+y,ZT,TW+.5,.35,TW+.5,GB);
    K.b(0,Y0,ZT+TW/2+.08,4.4,5.2,.24,GB); K.pedim(0,Y0+5.2,ZT+TW/2+.08,4.4,2.6,.24,GB,0); K.b(0,Y0,ZT+TW/2+.16,3.0,4.4,.2,DK); K.pedim(0,Y0+4.4,ZT+TW/2+.16,3.0,1.8,.2,DK,0); // 정문
    lancet(0,Y0+8.6,ZT+TW/2+.1,2.6,6.0,0); lancet(0,Y0+8.6,ZT-TW/2-.1,1.6,4.0,Math.PI);
    for(let q=0;q<4;q++){ const a=q*Math.PI/2, nx=Math.sin(a), nz=Math.cos(a); for(const sx of [-1,1]){ const lx=sx*1.5; lancet(nx*(TW/2+.1)+Math.cos(a)*lx,Y0+18.2,ZT+nz*(TW/2+.1)-Math.sin(a)*lx,1.1,3.6,a); } } // 종루 소리창(루버)
    inst(boxG(1,1,1),BK,BR); inst(boxG(1,1,.16),GW,LB); inst(triG(.16),GW,LT);
    K.layer(1);
    // 지붕: 신랑·성가대 박공, 측랑 경사, 트랜셉트 박공, 회랑 원뿔띠, 후진 원뿔
    K.roofGable(0,Y0+NH,ZN,NW+1.0,LN+.6,RID-NH,SL); K.roofGable(0,Y0+NH,ZC,NW+1.0,10.5,RID-NH,SL); K.roofGable(0,Y0+NH,ZX,29.8,11.8,RID-NH,SL,'x');
    for(const s of [-1,1]) K.b(s*(NW/2+AW/2+.25),Y0+AH+1.45,ZN,LN+.8,.3,AW+.9,SL,Math.PI/2,{slope:-.5*s});
    for(const s of [-1,1]) K.b(s*(NW/2+AW/2+.25),Y0+AH+1.45,ZC,9.6,.3,AW+.9,SL,Math.PI/2,{slope:-.5*s});
    K.c(0,Y0+AH,ZA,12,1.9,SL,28,{r2:9}); K.c(0,Y0+AH+1.9,ZA,9,.2,SL,28); K.c(0,Y0+NH,ZA,6.1,RID-NH,SL,20,{r2:.15});
    K.layer(2);
    K.b(0,Y0+TH-.4,ZT,TW+1.0,.5,TW+1.0,GB); K.c(0,Y0+TH+.1,ZT,4.5,SP-.6,SL,8,{r2:.06}); K.b(0,Y0+TH+SP-.5,ZT,.16,2.2,.16,GB); K.b(0,Y0+TH+SP+.9,ZT,1.1,.16,.16,GB);
    for(const sx of [-1,1]) for(const sz of [-1,1]){ K.b(sx*3.7,Y0+TH,ZT+sz*3.7,1.0,1.0,1.0,BK); K.c(sx*3.7,Y0+TH+1,ZT+sz*3.7,.6,3.4,SL,8,{r2:.03}); }
    // ---- s5 주변 환경(v15 E + v13 W): 지형·숲·물·이웃 — 뷰어 기본 대지·소품 숨김 ----
    {
    // ---- 배경·바닥(v15): 캔버스 질감 · 높이장 지형(K.life — bbox 밖) · 인스턴스 숲 · 뷰어 기본 바닥 숨김 ----
        const E=(()=>{ const TT=K.T; let sd=131; const r=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
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

    // ---- 세계 랜드마크 공용(v13 W): 하늘 돔 · life 바닥판 · 창 질감 도시 블록(지붕 포함) · 물 ----
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

// SITE=town //W
      // 맥락: 명동 언덕(종현) 위 — 언덕 비탈의 느티나무·소나무, 둘레는 명동 상가(6~15층, 간판색 섞인 저중층)와 을지로 쪽 사무 고층, 언덕 뒤(남, −z) 약 1.3 km에 남산(해발 약 262 m)과 N서울타워. 배치·거리 추정
      E.own(); const T3=K.T;
      const hill=(x,z)=>{ const d=Math.hypot(x/78,(z+12)/86); return 5.94*(1-E.ss((d-1)/.7)); };
      const hf=(x,z)=>{ let h=hill(x,z); if(z>40.2) h*=E.ss((Math.abs(x)-30)/26)*E.ss((Math.abs(x)-30)/26)+(1-E.ss((z-40)/1))*0; // 정면 계단 앞 광장(양옆 비탈로 부드럽게)
        h+=E.peaks(x,z,[[80,-1350,520,380,255,1.35],[-700,-1300,500,300,120,1.3],[900,-1600,600,400,150,1.3]]); h+=(E.fbm(x*.01,z*.01,2)-.5)*2*E.ss((Math.hypot(x,z)-160)/200);
        if(Math.abs(x)<28&&z>-44&&z<40) h=Math.min(h,5.94); return Math.max(h,-.06); };
      const TR=E.terrain(0,0,0,0,E.axis(3000,170,4.4,-10),E.axis(3000,170,4.4,-10),hf,(x,z,h,ny)=>{ const n=E.fbm(x*.06,z*.06,2)*.05; const hl=hill(x,z);
        if(z>40.2&&Math.abs(x)<40) return [.72+n,.70+n,.66+n]; if(hl>.3&&h<7) return [.40+n,.50+n,.30+n]; // 언덕 잔디·숲 바닥
        if(h>8) return E.mcol(x,z,h,ny,{far:1100,farW:900,cliff:.2}); return [.55+n,.55+n,.56+n]; }); // 시가 아스팔트·포장
      // 언덕 숲(느티·은행 + 소나무)
      E.forest(E.scatter(-110,110,-120,60,7,TR.h,(x,z,h)=>{ const hl=hill(x,z); if(hl<.6) return false; if(Math.abs(x)<30&&z>-46&&z<44) return false; if(Math.atan2(z,x)>.3&&Math.atan2(z,x)<2.0&&z>-6) return false; return E.r()<.75; },()=>9+E.r()*5,(x,z)=>E.r()<.35?1:0),{trunks:true,cast:true});
      // 남산 숲 + N서울타워(타워 236 m, 정상)
      E.forest(E.scatter(-1400,1600,-2200,-900,18,TR.h,(x,z,h)=>h>20&&E.r()<.85,()=>14+E.r()*6,(x,z)=>E.r()<.5?1:0),{trunks:false});
      { const yT=TR.h(80,-1350); const gr=new T3.Group(); K.life.add(gr); K.cur=gr; const WT=K.col(0xe8e6e0,{roughness:.6}); K.c(80,yT-2,-1350,6,120,WT,16,{r2:4.2}); K.c(80,yT+118,-1350,10,22,K.col(0x8d939a,{roughness:.4,metalness:.3}),20); K.c(80,yT+140,-1350,3,90,WT,10,{r2:1}); K.b(80,yT-2,-1350,40,12,30,WT); K.cur=null; }
      // 명동 상가(언덕 둘레, 간판색 조금) · 을지로 쪽 사무 고층(앞 +z 멀리) · 퇴계로 쪽
      const camN=(x,z)=>{ for(const [a,D] of [[.75,80],[1.0,80],[Math.PI/2,110]]) if(Math.hypot(x-Math.cos(a)*D,z-Math.sin(a)*D)<45) return true; return false; };
      W.ring({cx:0,cz:0,r0:96,r1:520,step:30,fill:.88,keep:(x,z)=>!camN(x,z)&&hill(x,z)<.2&&!(z>44&&Math.abs(x)<40&&z<120),h:(r,x,z)=>18+E.r()*26,pal:['#cfc7b8','#b8b2a8','#d9d1c3','#a9a39b','#c7b9a4','#9fa6ad'],gp:.3,tall:[.08,70,50],roof:['#8d8f92',1.2,1]});
      W.ring({cx:0,cz:700,r0:0,r1:420,step:46,fill:.85,keep:(x,z)=>z>380,h:()=>50+E.r()*60,pal:['#c9c3b8','#b5b0a6'],gp:.65,tall:[.2,110,60]});
      W.ring({cx:0,cz:-420,r0:0,r1:420,step:34,fill:.8,keep:(x,z)=>z<-150&&TR.h(x,z)<14,h:()=>14+E.r()*20,pal:['#d4cbbb','#c2baa9','#b9b3a9'],gp:.2,hy:(x,z)=>TR.h(x,z)});
      // 가톨릭회관(언덕 옆 10층 사무동, 추정) · 언덕 위 사제관 벽돌동
      W.city([[-60,-30,22,40,34,'#c2b8a8',0,'p','#8d8f92',1,1,TR.h(-60,-30)],[38,-50,20,14,10,'#9a4f3a',0,'p','#5d5f63',2,2,TR.h(38,-50)]]);
      W.sky(2600);
      tidy(1);

    }
  }});
