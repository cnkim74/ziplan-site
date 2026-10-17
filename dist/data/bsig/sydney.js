__bsigFill({"sydney":function(K){
// 실측(개략): 포디움 약 185×120 m · 콘서트홀(서, -x) 셸 정점 67 m, 조운 서덜랜드 극장(동, +x) ~57 m, 베넬롱 레스토랑(남동) ~20 m
// 각 군은 북향(항구, -z) 큰 셸 3장이 비늘처럼 겹쳐 북쪽으로 갈수록 높아지고, 남쪽 끝에 남향 작은 셸 1장이 등을 맞대고 앉음 · 셸 사이 틈은 유리(루버 월) · 모든 셸 = 반지름 75 m 구의 조각(좌우 대칭 두 조각이 능선에서 만남)
    const SH=K.col(0xf6f3ec,{roughness:.32}), SH3=K.col(0xeae6dc,{roughness:.4}), SH2=K.col(0xd9d4c8,{roughness:.5}), PK=K.col(0xcdb7a5,{roughness:.9}), PK2=K.col(0xbfa793,{roughness:.9}), PK3=K.col(0xb39a86,{roughness:.9}), GL=K.M.glass, DK=K.col(0x3a3a3c,{roughness:.6,metalness:.3}), AL=K.M.alu;
    const PD=11, R0=102; // 포디움 상면 높이 · 구 반지름(실제 75 m — 모형에선 조금 키워 날이 서게)
    const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]], crs=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]], dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
    const center=(p0,p1,p2,R)=>{ const a=sub(p1,p0), b=sub(p2,p0), ab=crs(a,b), n2=dot(ab,ab), t1=crs(ab,a), t2=crs(b,ab), bb=dot(b,b), aa=dot(a,a);
      const cc=[0,1,2].map(k=>p0[k]+(t1[k]*bb+t2[k]*aa)/(2*n2)); const rc=Math.hypot(...sub(cc,p0)); const RR=Math.max(R,rc*1.04), d=Math.sqrt(RR*RR-rc*rc), nn=Math.sqrt(n2);
      const c1=cc.map((v,k)=>v+ab[k]/nn*d), c2=cc.map((v,k)=>v-ab[k]/nn*d); return {c:c1[1]<c2[1]?c1:c2,R:RR}; };
    const slerp=(p,q,t)=>{ const w=Math.max(-1,Math.min(1,dot(p,q))), om=Math.acos(w); if(om<1e-5) return p; const s=Math.sin(om); return [0,1,2].map(k=>(Math.sin((1-t)*om)*p[k]+Math.sin(t*om)*q[k])/s); };
    // 셸 하나: cx 중심, zm 입(마우스) z, dir(+1 남향 / -1 북향), w 반폭, H 높이, L 능선 발~입 길이, ov 정점 내밈
    const shell=(cx,zm,dir,w,H,L,ov,glass)=>{ const B=[cx,PD,zm-dir*L], T=[cx,PD+H,zm+dir*ov];
      const half=s=>{ const F=[cx+s*w,PD,zm]; const {c:C,R}=center(B,F,T,R0); const unit=p=>{ const d=sub(p,C), l=Math.hypot(...d); return d.map(v=>v/l); };
        const rho=Math.sqrt(R*R-(cx-C[0])*(cx-C[0])); const ang=p=>Math.atan2(p[1]-C[1],p[2]-C[2]); let aB=ang(B), aT=ang(T); if(aT-aB>Math.PI) aB+=2*Math.PI; if(aB-aT>Math.PI) aT+=2*Math.PI;
        const ridge=v=>{ const a=aB+(aT-aB)*v; return unit([cx,C[1]+rho*Math.sin(a),C[2]+rho*Math.cos(a)]); };
        const M=[(F[0]+T[0])/2+s*w*.06,(F[1]+T[1])/2*.9,(F[2]+T[2])/2-dir*H*.26]; const rim=v=>unit([0,1,2].map(k=>(1-v)*(1-v)*F[k]+2*v*(1-v)*M[k]+v*v*T[k])); const at=(d,r)=>[C[0]+r*d[0],C[1]+r*d[1],C[2]+r*d[2]]; // 입 가장자리: 뒤로 휘어 오목한 앞날
        return {C,R,ridge,rim,at}; };
      const Lh=half(-1), Rh=half(1);
      [Lh,Rh].forEach((h,hi)=>K.surf((u,v)=>h.at(slerp(h.ridge(v),h.rim(v),u),h.R),16,24,hi?SH:SH3));
      K.surf((u,v)=>{ const s=u*2-1, h=s<0?Lh:Rh, d=h.rim(1-Math.abs(s)); return h.at(d,h.R-1.4*v); },36,1,SH2); // 입 가장자리 두께
      if(glass){ const q0=(p)=>[cx+(p[0]-cx)*.84,PD,zm-dir*4.5]; K.surf((u,v)=>{ const s=u*2-1, h=s<0?Lh:Rh, d=h.rim(1-Math.abs(s)); const p=h.at(d,h.R-.8); const q=q0(p); const k=v*v*.55+v*.45; return [p[0]+(q[0]-p[0])*k,p[1]+(q[1]-p[1])*k,p[2]+(q[2]-p[2])*k]; },32,6,GL);
        for(let i=1;i<8;i++){ const s=i/8*2-1, h=s<0?Lh:Rh, d=h.rim(1-Math.abs(s)); const p=h.at(d,h.R-.8); const q=q0(p); const n=Math.max(1,Math.round((p[1]-PD)/4)); for(let k=0;k<n;k++){ const t0=k/n,t1=(k+1)/n, k0=t0*t0*.55+t0*.45, k1=t1*t1*.55+t1*.45; const a=[p[0]+(q[0]-p[0])*k0,p[1]+(q[1]-p[1])*k0,p[2]+(q[2]-p[2])*k0], b=[p[0]+(q[0]-p[0])*k1,p[1]+(q[1]-p[1])*k1,p[2]+(q[2]-p[2])*k1]; K.b((a[0]+b[0])/2,Math.min(a[1],b[1]),(a[2]+b[2])/2,.16,Math.abs(a[1]-b[1])+.05,.16,DK); } } } };
    K.layer(0);
    // 포디움: 하단 산책로(+4) → 상단 포디움(+11) · 남쪽 기념비적 계단(폭 95 m) · 옆면 수평 띠(콘코스)
    K.b(0,0,10,132,4,230,PK2); K.b(0,4,-18,114,PD-4,150,PK); K.b(0,4,66,114,PD-4,18,PK);
    for(const s of [-1,1]){ K.b(s*57.2,4,-18,.6,1.6,150,PK3); K.b(s*57.2,8.2,-18,.6,.7,150,PK3); for(let i=0;i<18;i++) K.b(s*56.6,5.6,-90+i*8.3,.7,2.6,1.0,PK); } // 옆면 콘코스 띠 + 기둥
    K.b(0,4,-93.2,114,1.6,.6,PK3); K.b(0,8.2,-93.2,114,.7,.6,PK3); for(let i=0;i<13;i++) K.b(-52+i*8.6,5.6,-93,1.0,2.6,.7,PK);
    const NS=20, run=30/NS, rise=(PD-4)/NS; for(let i=0;i<NS;i++) K.b(0,4,105-run*(i+.5),96,(i+1)*rise,run,PK);
    for(const s of [-1,1]) K.b(s*54,4,90,6,PD-4+.6,30,PK2); // 계단 옆 날개
    K.b(0,4,118,114,.3,12,PK3); // 앞 광장(포코트) 포장
    K.b(0,PD,-18,110,.08,150,PK2); for(const s of [-1,1]) for(let i=0;i<8;i++) K.c(s*53.5,PD,-80+i*20,.14,3,AL,8); // 상부 광장 포장·가로등
    // 콘서트홀(서, -x): 북향 3장(비늘처럼 겹쳐 북으로 갈수록 높음) + 남향 1장(등을 맞댐)
    const CH=-28, JS=30;
    K.layer(1); shell(CH,-12,-1,19,32,40,6,true); shell(CH,50,1,16,22,26,6,true);
    K.layer(2); shell(CH,-40,-1,23,44,52,8,true);
    K.layer(3); shell(CH,-70,-1,27,56,62,10,true);
    // 조운 서덜랜드 극장(동, +x): 조금 작게
    K.layer(1); shell(JS,-12,-1,16,27,34,6,true); shell(JS,44,1,13,19,22,5,true);
    K.layer(2); shell(JS,-38,-1,19,37,44,8,true);
    K.layer(3); shell(JS,-66,-1,22,47,54,9,true);
    // 베넬롱 레스토랑(남동): 작은 셸 2장(남향·북향)
    K.layer(1); shell(48,78,1,9,14,16,4,true); shell(48,58,-1,7,11,13,3,true);
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
      const pads=(PD,ry)=>{ if(!PD.length) return; const P=new Float32Array(PD.length*18), C=new Float32Array(PD.length*18), N=new Float32Array(PD.length*18); const c=new TT.Color(); const cs=Math.cos(ry), sn=Math.sin(ry); const PV=['#aaa498','#b4aea2','#a39e94','#bbb5a9','#aea99f'], PK=['#6f8d4d','#7b9858','#66844a']; PD.forEach(([x,z,hw,y,park],i)=>{ c.set(park?PK[i%3]:PV[(i*7)%5]).convertSRGBToLinear(); const Y=y+.09; const q=[[-hw,hw],[hw,hw],[hw,-hw],[-hw,hw],[hw,-hw],[-hw,-hw]]; q.forEach((v,k)=>{ const o=i*18+k*3; P[o]=x+v[0]*cs+v[1]*sn; P[o+1]=Y; P[o+2]=z-v[0]*sn+v[1]*cs; N[o+1]=1; C[o]=c.r; C[o+1]=c.g; C[o+2]=c.b; }); }); const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(C,3)); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:.95})); m.receiveShadow=true; K.life.add(m); }; // v18i: 블록 보도·필지 판 — 사이 바닥이 길로 읽히게
      const ring=(o)=>{ const L=[], PDs=[]; const st=o.step||50, cs=Math.cos(o.ry||0), sn=Math.sin(o.ry||0); for(let a=-o.r1;a<o.r1;a+=st) for(let b=-o.r1;b<o.r1;b+=st){ const x0=a+(E.r()-.5)*st*.25, z0=b+(E.r()-.5)*st*.25; const x=(o.cx||0)+x0*cs+z0*sn, z=(o.cz||0)-x0*sn+z0*cs; const r=Math.hypot(x0,z0); if(r<o.r0||r>o.r1) continue; if(o.keep&&!o.keep(x,z,r)) continue; if(o.clr&&x>-o.clr*.12&&z>-o.clr*.12&&Math.hypot(x,z)<o.clr) continue; if(o.pads!==false){ const px=(o.cx||0)+a*cs+b*sn, pz=(o.cz||0)-a*sn+b*cs; PDs.push([px,pz,st*.41,o.hy?o.hy(px,pz):0,E.r()<.12]); } if(E.r()>(o.fill||.65)) continue;
          const tall=o.tall&&E.r()<o.tall[0]; const gl=tall||E.r()<(o.gp||0); const w=st*(.45+E.r()*.35), d=st*(.45+E.r()*.35); const h=tall?o.tall[1]+E.r()*o.tall[2]:o.h(r,x,z); const pal=gl?(o.gpal||['#b7c5cf','#a3b4c0','#c3cdd4']):o.pal; const rf=!gl&&o.roof?o.roof:null; L.push([x,z,w,d,h,pal[Math.floor(E.r()*pal.length)],o.ry||0,gl?'g':(o.kind||'p'),rf?rf[0]:null,rf?rf[1]:0,rf?rf[2]:0,o.hy?o.hy(x,z):0]); } const out=city(L); pads(PDs,o.ry||0); return out; };
      // 맨해튼 격자: x 방향 블록 길이 bx(애비뉴 간격), z 방향 by(스트리트 간격), 블록마다 남북 두 줄로 필지를 나눔 — o={x0,x1,z0,z1,bx,bz,aw,sw,skip(x,z,w,d)→bool, h(x,z)→높이, pal, gpal, gp}
      const manh=(o)=>{ const L=[]; const bx=o.bx||260, bz=o.bz||80, aw=o.aw||30, sw=o.sw||18; for(let X=o.x0;X<o.x1;X+=bx) for(let Z=o.z0;Z<o.z1;Z+=bz){ const W0=bx-aw, D0=bz-sw; for(const row of [-1,1]){ let x=X-W0/2; while(x<X+W0/2-4){ const w=Math.min(X+W0/2-x,10+E.r()*E.r()*45); const cx=x+w/2, cz=Z+row*D0/4, d=D0/2-(E.r()<.3?E.r()*8:0); x+=w; if(o.skip&&o.skip(cx,cz,w,d)) continue; const h=o.h(cx,cz); if(h<=0) continue; const gl=h>110&&E.r()<(o.gp===undefined?.5:o.gp); const pal=gl?(o.gpal||['#a9b8c3','#9aabb7','#bcc6cc']):(o.pal||['#cbbfa8','#b9a993','#a38f7a','#d8d0c0','#9c8f84','#c4b49c']); L.push([cx,cz+(row>0?-(D0/2-d)/2:(D0/2-d)/2),w-.6,d,h,pal[Math.floor(E.r()*pal.length)],0,gl?'g':'p']); } } } return city(L); };
      // 뷰어의 일반 대지(잔디판·포장판·길·차선)를 이 모형이 떠 있는 동안만 숨김 — site 자식의 visible을 getter로 바꿔(life가 보일 때 false) 첫 프레임·썸네일에서도 적용, 'site' 단계처럼 life가 꺼지면 원래대로 보이고, 다른 모형으로 바뀌면(표식이 life에서 빠지면) 자동으로 원상
      const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
        const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
      return {sky,lplane,lpoly,solid,WATER,city,grid,ring,manh,own}; })();

// SITE=town //W
      // 맥락: 베넬롱 곶 — 서쪽 시드니 코브(서큘러 키 페리 부두, 그 뒤 록스·CBD 고층), 동쪽 팜 코브와 왕립 식물원, 북쪽 항구 건너 키리빌리·노스시드니, 북서 약 1 km 하버브리지(아치 경간 503 m, 정점 해발 134 m, 상판 약 49 m, 화강암 탑 89 m). 위치·방향 추정
      E.own(); const T3=K.T; const SEA=-.9;
      const land=(x,z)=>{ if(Math.abs(x)<68&&z>-110) return 1; if(z>150&&x>-115&&x<125) return 1; if(z>300) return 1; if(x<-390&&z>-330) return 1; if(x>560&&z>-420) return 1; if(z<-1150+((x+600)*.08)) return 1; return 0; };
      const hf=(x,z)=>{ const L=land(x,z); if(!L) return -8; let h=(E.fbm(x*.006,z*.006,3)-.4)*14; if(z<-1000) h=8+E.fbm(x*.004,z*.004,3)*30; if(x<-390&&z>-330&&z<300) h=6+E.ss((-x-390)/200)*12; if(Math.abs(x)<130&&z>-110&&z<300) return -.06+(z>150?E.ss((z-150)/150)*6:0); return Math.max(h,.6); };
      const TR=E.terrain(0,0,0,0,E.axis(3400,170,4.4,0),E.axis(3400,170,4.4,0),hf,(x,z,h,ny)=>{ const n=E.fbm(x*.05,z*.05,2)*.05;
        if(h<-1) return [.25,.3,.3]; if(Math.abs(x)<130&&z>-110&&z<150) return [.80+n,.72+n,.64+n]; // 화강암 포장 앞마당
        if(x>120&&z>220&&z<900&&x<700) return [.36+n,.52+n,.27+n]; if(x>560&&z<220) return [.38+n,.53+n,.28+n]; // 식물원·도메인
        if(z<-1000) return E.mcol(x,z,h,ny,{far:1400,farW:1200}); return [.66+n,.64+n,.6+n]; });
      { const g=new T3.PlaneGeometry(8000,8000); g.rotateX(-Math.PI/2); g.translate(0,SEA,0); K.life.add(new T3.Mesh(g,E.WATER)); }
      // 방파 석축(곶 둘레 사암 호안) · 서큘러 키 부두
      { const SS=K.col(0xc7ab83,{roughness:.9}); const gr=new T3.Group(); K.life.add(gr); K.cur=gr; for(const [x,z,w,d] of [[-68,20,1.4,260],[68,20,1.4,260],[-115,225,1.4,150],[125,225,1.4,150]]) K.b(x,-3,z,w,3.4,d,SS);
        const WF=K.col(0x9b9488,{roughness:.8}), RF=K.col(0xe9e5dc,{roughness:.6}); for(let i=0;i<5;i++){ const x=-330+i*44; K.b(x,-1.2,270,14,2.2,70,WF); K.b(x,1.0,262,12,4,30,RF); K.b(x,5.0,262,14,.5,34,K.col(0x2f5d4a,{roughness:.6})); } K.b(-250,0,320,330,9,30,K.col(0xb9b3a6,{roughness:.8})); K.cur=null; }
      // 하버브리지: 두 아치 리브(상·하현 + 사재) · 상판 · 화강암 탑 4
      { const A=[-640,-150], B=[-905,-1160]; const dx=B[0]-A[0], dz=B[1]-A[1], L=Math.hypot(dx,dz), ux=dx/L, uz=dz/L, px=-uz, pz=ux; const S0=(L-503)/2, S1=S0+503;
        const P=(s,o,y)=>[A[0]+ux*s+px*o, y, A[1]+uz*s+pz*o]; const UP=new T3.Vector3(0,1,0); const gs=[], gp=[];
        const tube=(a,b,r,arr)=>{ const v=new T3.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]); const l=v.length(); const g=new T3.CylinderGeometry(r,r,l,6); g.applyMatrix4(new T3.Matrix4().makeRotationFromQuaternion(new T3.Quaternion().setFromUnitVectors(UP,v.normalize()))); g.translate((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2); (arr||gs).push(g); };
        const top=t=>134-(134-58)*Math.pow(2*t-1,2), bot=t=>118-(118-6)*Math.pow(2*t-1,2);
        for(const o of [-15,15]){ let p0=null,q0=null; for(let i=0;i<=28;i++){ const t=i/28, s=S0+503*t; const p=P(s,o,top(t)), q=P(s,o,bot(t)); if(p0){ tube(p0,p,1.6); tube(q0,q,2.2); tube(i%2?p0:q0,i%2?q:p,.9); } if(i%2===0) tube(p,q,.9); p0=p; q0=q; } }
        for(let i=0;i<=28;i+=2){ const t=i/28, s=S0+503*t; tube(P(s,-15,top(t)),P(s,15,top(t)),.6); if(bot(t)>49) tube(P(s,0,bot(t)),P(s,0,49),.5); }
        for(const o of [-24,24]) tube(P(0,o,49),P(L,o,49),.5);
        const ST=K.col(0x9a9a98,{roughness:.6,metalness:.4}); const m=new T3.Mesh(E.mergeG(gs),ST); m.castShadow=true; K.life.add(m);
        const gr=new T3.Group(); K.life.add(gr); K.cur=gr; const ang=Math.atan2(-ux,-uz); K.b((A[0]+B[0])/2,47,(A[1]+B[1])/2,49,2.4,L,K.col(0x6f6f6c,{roughness:.8}),ang);
        const GR=E.tmat(E.wallTex('syd_pyl','#b9a683',['#c8b590','#ad9a77','#bfa985','#a8946f'],60,60,120),0xbca986); for(const s of [S0-20,S1+20]) for(const o of [-18,18]){ const c=P(s,o,0); K.b(c[0],-1,c[2],22,90,26,GR,ang); }
        for(const s of [S0-140,S0-70,S1+70,S1+140]){ const c=P(s,0,0); K.b(c[0],-1,c[2],40,46,8,GR,ang); } K.cur=null; }
      // 도심(CBD, 남서) 유리·석재 고층 · 록스 저층 · 노스시드니 고층(건너편) · 키리빌리 주택
      W.ring({cx:-520,cz:850,r0:0,r1:700,step:52,fill:.85,keep:(x,z)=>z>340&&x<-130,h:(r)=>40+E.r()*60+(1-r/700)*120,pal:['#cfc6b6','#bdb6aa','#d9d2c4'],gp:.55,tall:[.18,150,90],hy:(x,z)=>TR.h(x,z)});
      W.ring({cx:-560,cz:0,r0:0,r1:300,step:30,fill:.8,keep:(x,z)=>land(x,z)&&x<-395&&z<330,h:()=>10+E.r()*14,pal:['#c9a57a','#b98f68','#d6c2a2'],roof:['#7b5a46',1,1],hy:(x,z)=>TR.h(x,z)});
      W.ring({cx:-950,cz:-1500,r0:0,r1:380,step:44,fill:.85,keep:(x,z)=>land(x,z),h:(r)=>40+E.r()*40+(1-r/380)*80,pal:['#cfc6b6','#bdb6aa'],gp:.6,hy:(x,z)=>TR.h(x,z)});
      W.ring({cx:-200,cz:-1400,r0:0,r1:700,step:30,fill:.6,keep:(x,z)=>land(x,z)&&x>-650,h:()=>8+E.r()*14,pal:['#e0d6c4','#d2c3a8','#e8e2d6'],roof:['#8a5a46',2,3],hy:(x,z)=>TR.h(x,z)});
      // 총독 관저(1845, 고딕 리바이벌 사암 — 식물원 안, 추정 규모) · 식물원·도메인 숲 · 맥쿼리 가 무화과나무 줄
      W.city([[-20,330,56,24,14,'#c9ab80',0,'n','#7a6a5a',2,2,TR.h(-20,330)]]);
      E.forest(E.scatter(110,900,-420,1000,12,TR.h,(x,z,h)=>land(x,z)&&h>.4&&!(x>120&&x<560&&z<260)&&!(Math.atan2(z,x)>.35&&Math.atan2(z,x)<1.9&&Math.hypot(x,z)<380)?E.r()<.7:false,()=>12+E.r()*6,0),{trunks:true,pal:[['#3f6a36','#4d7a3e','#36592f','#5b8445']]});
      E.forest(E.scatter(-900,900,-2200,-1050,22,TR.h,(x,z,h)=>land(x,z)?E.r()<.45:false,()=>11+E.r()*5,0),{trunks:false});
      W.sky(3400);
      tidy(1);

    }
  }});
