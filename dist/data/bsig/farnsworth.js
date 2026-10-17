__bsigFill({"farnsworth":function(K){
// 실측(개략): 바닥·지붕판 23.5×8.8 m, 바닥 1.6 m 띄움, 기둥 8개(6.7 m 간격) 판 바깥쪽, 유리 구간 16.8 m(동쪽), 포치 6.7 m(서쪽), 테라스 16.8×6.7 m(높이 .75)
    const W=23.5,D=8.8,lift=1.6,ts=.38,H=2.85, Wh=K.M.white, TR=K.M.stone, GL=K.M.glass, WD=K.M.wood;
    const top=lift+ts, ceil=top+H, roofT=ceil+ts;
    K.layer(0);
    // 테라스(낮은 판) + 기둥 + 두 번의 계단
    const tx0=-14.6,tx1=2.2,tz0=4.7,tz1=11.4; K.b((tx0+tx1)/2,.75,(tz0+tz1)/2,tx1-tx0,ts,tz1-tz0,Wh); K.b((tx0+tx1)/2,.75+ts,(tz0+tz1)/2,tx1-tx0-.2,.03,tz1-tz0-.2,TR);
    for(const x of [-10.05,-3.35]) for(const z of [tz0-.1,tz1+.1]) K.b(x,0,z,.2,.75+ts,.14,Wh);
    for(let i=0;i<5;i++){ K.b(-8.4,.19*(i+1)-.08,tz1+.2+(4-i)*.36,3.0,.08,.36,TR); } K.b(-8.4,0,tz1+1.2,.1,.75,.1,Wh); K.b(-8.4,.45,tz1+1.2,.1,.08,1.9,Wh);
    for(let i=0;i<3;i++){ K.b(-8.4,1.13+.22*(i+1)-.08,5.2-i*.36,3.0,.08,.36,TR); }
    // 본채 기둥 8개(판을 바깥에서 집음)
    for(const x of [-10.05,-3.35,3.35,10.05]) for(const z of [-D/2-.1,D/2+.1]) K.b(x,0,z,.2,roofT,.14,Wh);
    K.b(0,lift,0,W,ts,D,Wh); K.b(0,top,0,W-.16,.03,D-.16,TR); // 바닥판(흰 C형강 테두리 + 트래버틴)
    K.layer(1);
    // 유리 상자(동쪽 16.8 m) + 흰 멀리언
    const gx0=-5.05,gx1=W/2; K.b((gx0+gx1)/2,top+.03,0,gx1-gx0,H,D-.2,GL);
    for(let i=0;i<=10;i++){ const x=gx0+i*(gx1-gx0)/10; for(const z of [-D/2+.1,D/2-.1]) K.b(x,top,z,.08,H,.1,Wh); }
    for(let j=1;j<3;j++){ const z=-D/2+.1+j*(D-.2)/3; K.b(gx1-.05,top,z,.1,H,.08,Wh); K.b(gx0,top,z,.1,H,.08,Wh); }
    K.b(gx0,top,0,.1,H,D-.2,GL); K.b(-8.4,top,D/2-.1,1.0,H,.06,GL); // 서쪽 유리벽 + 포치 쪽 출입문 유리
    // 코어(프리마베라 목재) + 벽난로 굴뚝
    K.b(2.5,top+.03,-1.6,7.4,2.3,2.6,WD); K.b(2.5,top+2.33,-1.6,7.2,.12,2.4,K.col(0xf1ede6));
    // 가구: 침대·식탁·소파·주방 카운터
    K.b(9.6,top+.03,-1.2,2.0,.45,1.7,K.col(0xeeeae2)); K.b(9.6,top+.48,-1.2,2.0,.12,1.7,K.col(0xd8cfc2)); K.b(-2.5,top+.03,1.6,1.8,.72,.9,WD); K.b(5,top+.03,2.2,2.2,.4,.9,K.col(0x3b3b3b,{roughness:.5}));
    K.b(3.5,top+.03,-3.9,6,.9,.6,K.col(0x2c2c2c,{roughness:.4})); K.b(3.5,top+.9,-3.9,6.1,.05,.7,K.col(0xe8e4dc));
    K.layer(2);
    K.b(0,ceil,0,W,ts,D,Wh); K.b(0,roofT,0,W-.3,.04,D-.3,K.M.roofFlat); K.b(1.6,roofT,-1.2,.6,.5,.6,K.col(0x3a3a3a));
    // ---- 배경 보강(S5): 실제 대지 맥락 — K.life(bbox 밖) ----
    { const T=K.T;
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

    // 맥락(위키백과 「Farnsworth House」): 폭스강 북쪽 둑의 범람원, 강둑에서 약 23 m(남쪽 = +z) · 북쪽으로 살짝 오르는 풀밭 · 세 면을 둘러싼 활엽수 숲 · 서쪽 나무 줄 뒤 폭스리버 드라이브 · 강 폭 약 70 m(추정)
    K.layer(0); E.own();
    { const RZ0=28, RZ1=98; // 강(수면 -2.1, 둑 경사)
      const hf=(x,z)=>{ let h=Math.max(0,-z-14)*.018+(E.fbm(x*.01,z*.01,3)-.5)*1.2*E.ss((Math.hypot(x,z)-40)/60); // 북으로 오르는 풀밭
        if(z>RZ0-6){ const t=E.ss((z-(RZ0-6))/6); h=h*(1-t)+(-2.9)*t; } if(z>RZ1){ const t=E.ss((z-RZ1)/10); h=-2.9*(1-t)+(1.2+E.fbm(x*.01,z*.01,2)*3)*t; }
        h+=E.peaks(x,z,[[-1200,-900,900,500,28,1.3],[1100,-1100,900,600,22,1.3]]);
        const d=Math.hypot(Math.max(0,Math.abs(x+3)-16),Math.max(0,Math.abs(z-1)-9)); const k=E.ss(d/14); return -.04*(1-k)+h*k; };
      const TR=E.terrain(0,0,0,0,E.axis(2400,150,4.2,0),E.axis(2400,150,4.2,0),hf,(x,z,h,ny)=>{ const n=E.fbm(x*.05,z*.05,2);
        if(h<-2.2) return [.42,.39,.31]; if(z>RZ0-7&&z<RZ0+1||z>RZ1-1&&z<RZ1+6) return [.44+.05*n,.43+.05*n,.3]; // 진흙 둑
        const mow=Math.hypot(x,z)<45?1:0; return mow?[.43+.06*n,.58+.06*n,.3+.03*n]:[.46+.08*n,.55+.07*n,.3+.04*n]; });
      { const g=new T.PlaneGeometry(2400,RZ1-RZ0+8,1,1); g.rotateX(-Math.PI/2); g.translate(0,-2.1,(RZ0+RZ1)/2); const m=new T.Mesh(g,E.WATER); K.life.add(m); }
      // 서쪽 폭스리버 드라이브(나무 줄 뒤, 개략) · 북쪽 진입 오솔길
      { const RD=E.tmat(null,0x6d6c68,{roughness:.9}); const g=new T.PlaneGeometry(7,600); g.rotateX(-Math.PI/2); g.translate(-165,0,-200); const m=new T.Mesh(g,RD); m.position.y=.08; K.life.add(m);
        const pts=[]; for(let i=0;i<40;i++){ const z=-14-i*4, x=-6-Math.sin(i*.25)*10-i*1.6; pts.push([x,z]); } const PT=E.tmat(null,0xb9ad8f,{roughness:1}); for(let i=0;i<pts.length-1;i++){ const [ax,az]=pts[i],[bx,bz]=pts[i+1]; const L=Math.hypot(bx-ax,bz-az); const gg=new T.PlaneGeometry(1.4,L+.3); gg.rotateX(-Math.PI/2); gg.rotateY(Math.atan2(bx-ax,bz-az)); gg.translate((ax+bx)/2,TR.h((ax+bx)/2,(az+bz)/2)+.04,(az+bz)/2); K.life.add(new T.Mesh(gg,PT)); } }
      // 활엽수 숲(단풍나무·참나무·미루나무) — 북·동·서 세 면과 강 건너, 집 앞 풀밭과 눈높이 시선(남동)은 비움
      const clear=(x,z)=>{ const r=Math.hypot(x+3,z-1); if(r<34) return true; if(z>5&&r<160) return true; if(z>RZ0-4&&z<RZ1+4) return true; if(Math.abs(x+165)<8) return true; return false; };
      E.forest(E.scatter(-900,900,-900,700,7,TR.h,(x,z,h)=>!clear(x,z)&&(Math.hypot(x,z)>55||E.r()<.35)&&!(z<-30&&z>-130&&Math.abs(x)<60&&E.r()<.75),(x,z,h)=>(z>RZ1?14:12)+E.vn(x*.04,z*.04)*9,(x,z,h)=>E.r()<.12?2:0),{trunks:true,pal:[null,null,null,null]});
      // 강둑 버드나무·미루나무 띠(키 큰 활엽, 동쪽·서쪽 둑)
      { const L=[]; for(let x=-420;x<420;x+=9){ for(const z of [RZ0-4,RZ1+5]){ const xx=x+(E.r()-.5)*6; if(clear(xx,z-0)&&z<RZ1) continue; L.push([xx,TR.h(xx,z),z+(E.r()-.5)*4,15+E.r()*7,0,E.r(),1.15]); } } E.forest(L,{trunks:true,pal:[['#5a7a3c','#6b8a45','#4f6e36','#7a944e']]}); }
    }
    tidy(1);

    }
  }});
