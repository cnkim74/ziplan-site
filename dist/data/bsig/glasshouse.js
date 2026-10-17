__bsigFill({"glasshouse":function(K){
// 실측(개략): 17.1×9.75 m, 높이 3.2, 벽돌 기단 .3, 벽돌 원통 지름 3.0(지붕 위 .6 돌출), 검은 H형강 기둥
    const W=17.1,D=9.75,H=3.2,pl=.3; const BK=K.M.skinMat('brickR').clone(); BK.color.setHex(0xb08274).convertSRGBToLinear(); const DK=K.col(0x1f2022,{metalness:.5,roughness:.4}), GL=K.M.glass, WD=K.M.wood;
    K.layer(0);
    K.b(0,0,0,W+.9,pl,D+.9,BK); K.b(0,pl,0,W-.3,.03,D-.3,K.M.skinMat('brickD'));
    K.layer(1);
    K.b(0,pl+.03,0,W-.2,H,D-.2,GL);
    // 기둥(모서리 + 장변 1/3 지점) · 멀리언 · 문틀(각 면 중앙) · 바닥 강철 실
    for(const x of [-W/2+.1,-W/6,W/6,W/2-.1]) for(const z of [-D/2+.1,D/2-.1]) K.b(x,pl,z,.18,H,.18,DK);
    for(const z of [-D/2+.1,D/2-.1]) for(const x of [-W/3,W/3,-.55,.55]) K.b(x,pl,z,.08,H,.14,DK);
    for(const x of [-W/2+.1,W/2-.1]) for(const z of [-.55,.55,-D/2+.1+D/4,D/2-.1-D/4]) K.b(x,pl,z,.14,H,.08,DK);
    for(const yy of [pl,pl+H-.08]){ for(const z of [-D/2+.1,D/2-.1]) K.b(0,yy,z,W-.1,.08,.12,DK); for(const x of [-W/2+.1,W/2-.1]) K.b(x,yy,0,.12,.08,D-.1,DK); }
    // 벽돌 원통(욕실·벽난로) — 지붕 위로 돌출
    K.c(3.6,pl,-.6,1.5,H+.3+.6,BK,28);
    // 가구: 주방 카운터, 식탁, 거실(바르셀로나 체어·러그), 침실 칸막이 장·침대, 이젤
    K.b(-6,pl+.03,-3.5,3.6,.9,.65,WD); K.b(-6,pl+.93,-3.5,3.7,.05,.75,K.col(0xe9e4da)); K.b(-6,pl+.03,2.2,1.8,.74,1.0,WD);
    K.b(-1,pl+.04,.6,4.2,.02,3.2,K.col(0xb8ab93)); K.b(-1.3,pl+.06,1.6,2.0,.42,.9,K.col(0x3a2a22,{roughness:.5})); for(const x of [-2.2,-.4]) K.b(x,pl+.06,-.6,.8,.4,.8,K.col(0x3a2a22,{roughness:.5}));
    K.b(-1.3,pl+.06,.3,1.1,.4,.7,K.col(0x2a2a2a,{metalness:.4,roughness:.3}));
    K.b(6.3,pl+.03,.8,.5,1.8,3.6,WD); K.b(7.3,pl+.03,-2.4,2.0,.48,1.6,K.col(0xeeeae2)); K.b(1.2,pl+.03,-3.2,.08,1.7,1.2,K.col(0x8a6a48));
    K.layer(2);
    K.b(0,pl+H,0,W,.3,D,DK); K.b(0,pl+H+.3,0,W-.4,.03,D-.4,K.M.roofFlat);
    // ---- s5 주변 환경(v15 E): 지형·숲·물·이웃 — 뷰어 기본 대지·소품 숨김 ----
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

// SITE=town
      // 맥락(SAH Archipedia 「Glass House」): 뉴케이넌 49에이커 사유지, 숲을 내려다보는 곶(promontory) 위 잔디 — 잔디 건너편 벽돌집(서쪽 면 창 없음, 동쪽에 둥근 창 3), 북쪽 원형 수영장(1955), 뒤 잔디에서 내려다보는 인공 연못과 파빌리온(1962). 거리·연못 크기는 추정
      E.own(); const clr=(x,z,R)=>{ if(Math.hypot(x,z)>(R||150)) return true; const a=Math.atan2(z,x); return !(a>.3&&a<1.95); };
      const PZ=[-58,6], inPond=(x,z)=>((x-PZ[0])/24)**2+((z-PZ[1])/15)**2;
      const hf=(x,z)=>{ let h=(E.fbm(x*.015+3,z*.015,3)-.5)*4;
        const edge=E.ss((-x-20)/26); h=h*(1-.7*E.ss(1-Math.hypot(x*.8,z)/50))-9*edge; // 서쪽으로 곶이 떨어짐(약 9 m, 추정)
        const p=inPond(x,z); if(p<1) h=-9.6-.8*(1-p); else if(p<2.6){ const t=E.ss((p-1)/1.6); h=-8.35*(1-t)+h*t; }
        h+=E.peaks(x,z,[[-500,-700,600,400,45,1.3],[700,-400,500,500,35,1.3],[-900,400,600,600,40,1.3],[400,900,700,500,30,1.3]]);
        if(Math.hypot(x*.8,(z+4)*.9)<26) h=-.05; return h; };
      const TR=E.terrain(0,0,0,0,E.axis(2400,150,4,10),E.axis(2400,150,4,10),hf,(x,z,h,ny)=>{ const d=Math.hypot(x*.8,(z+4)*.9); const n=E.fbm(x*.08,z*.08,2);
        if(d<44&&x>-26) return [.42+.05*n,.55+.05*n,.29+.03*n]; // 다듬은 잔디
        if(inPond(x,z)<1.25) return [.36,.42,.3]; if(inPond(x,z)<3&&h<-5) return [.44,.53,.31]; // 연못가 풀밭
        return E.mcol(x,z,h,ny,{far:700,farW:1000,cliff:.15}); });
      // 연못 + 파빌리온(흰 기둥·평지붕, 수면 위 단) — 추정 규모
      { const g=new K.T.CircleGeometry(1,40); g.rotateX(-Math.PI/2); g.scale(24,1,15); g.translate(PZ[0],-8.6,PZ[1]); const m=new K.T.Mesh(g,E.WATER); K.life.add(m);
        const PW=K.col(0xece8df,{roughness:.6}); const pv=new K.T.Group(); K.life.add(pv); K.cur=pv; K.b(PZ[0]+8,-9.0,PZ[1]+3,8,.6,6,PW); for(const sx of [-1,1]) for(const sz of [-1,1]) K.b(PZ[0]+8+sx*3.6,-8.4,PZ[1]+3+sz*2.6,.35,2.2,.35,PW); K.b(PZ[0]+8,-6.2,PZ[1]+3,8.2,.3,6.2,PW); K.cur=null; }
      // 벽돌집(게스트하우스, 1949): 잔디 건너편 — 유리집을 향한 면은 창 없음, 반대쪽 둥근 창 3(배치·치수 추정 16 × 7.5 × 3.2 m)
      { const BK=K.M.skinMat('brickR').clone(); BK.color.setHex(0xa87566).convertSRGBToLinear(); const gr=new K.T.Group(); K.life.add(gr); K.cur=gr;
        K.b(2,0,-27,16,3.2,7.6,BK); K.b(2,3.2,-27,16.3,.25,7.9,K.col(0x2a2a2a,{roughness:.6})); for(const x of [-3,2,7]){ K.c(x,.85,-30.84,.85,.08,K.col(0x1d2226,{roughness:.2,metalness:.4}),20,{axis:'z'}); } K.b(-6.04,0,-27,.06,2.3,1.1,K.col(0x2a2a2a)); K.cur=null; }
      // 원형 수영장(북) · 잔디 길(자갈) · 뉴잉글랜드 막돌 담
      { const g=new K.T.CircleGeometry(4.2,32); g.rotateX(-Math.PI/2); g.translate(24,.02,-20); K.life.add(new K.T.Mesh(g,E.WATER)); const r=new K.T.Mesh(new K.T.RingGeometry(4.2,5.0,32).rotateX(-Math.PI/2).translate(24,.015,-20),K.col(0xd9d4c8,{roughness:.9})); K.life.add(r); }
      { const GV=E.tmat(E.masTex(),0xcdbf9e); GV.userData.nocast=1; const gs=[]; const seg=(x0,z0,x1,z1,w)=>{ const L=Math.hypot(x1-x0,z1-z0); const g=new K.T.PlaneGeometry(L,w); g.rotateX(-Math.PI/2); g.rotateY(-Math.atan2(z1-z0,x1-x0)); g.translate((x0+x1)/2,.012,(z0+z1)/2); gs.push(g); };
        seg(0,-5.2,1,-23,1.4); seg(8,-27,30,-46,1.8); seg(30,-46,60,-140,3.2); const m=new K.T.Mesh(E.mergeG(gs),GV); m.receiveShadow=true; K.life.add(m); }
      { const SW=E.tmat(E.wallTex('gh_sw','#7c7468',['#8f877a','#a39b8c','#6e675d','#9a9182','#857d70'],40,40,90),0x8a8276); const gs=[]; const wall=(x0,z0,x1,z1)=>{ const L=Math.hypot(x1-x0,z1-z0); const g=new K.T.BoxGeometry(L,.9,.7); const uv=g.attributes.uv; for(let i=0;i<uv.count;i++) uv.setXY(i,uv.getX(i)*L/2,uv.getY(i)*.45); g.rotateY(-Math.atan2(z1-z0,x1-x0)); g.translate((x0+x1)/2,TR.h((x0+x1)/2,(z0+z1)/2)+.4,(z0+z1)/2); gs.push(g); };
        wall(-26,-40,24,-44); wall(24,-44,44,-30); wall(44,-30,48,4); wall(-34,-36,-26,-40); const m=new K.T.Mesh(E.mergeG(gs),SW); m.castShadow=true; m.receiveShadow=true; K.life.add(m); }
      // 숲: 참나무·단풍(활엽) + 솔송·스트로브잣나무(침엽) — 잔디 곶과 카메라 쪽은 비움
      E.forest(E.scatter(-1400,1400,-1400,1400,9,TR.h,(x,z,h)=>{ const d=Math.hypot(x*.8,(z+4)*.9); if(d<46&&x>-28) return false; if(inPond(x,z)<1.6) return false; if(Math.hypot(x-2,z+27)<14) return false; if(!clr(x,z,120)) return false; if(inPond(x,z)<3.5&&h<-5) return E.r()<.1; return E.r()<.85; },(x,z,h)=>13+E.vn(x*.04,z*.04)*9,(x,z)=>E.vn(x*.03+7,z*.03)<.3?2:0),{trunks:true,pal:[['#5b7a3c','#6b8a45','#4f6d36','#7a8f48','#8a9a52'],null,['#2f4a33','#3a5638','#284030']]});
      // 잔디 위 몇 그루(곶 가장자리 큰 참나무)
      E.forest([[-24,TR.h(-24,-22),-22,15,0,.3,1.2],[-26,TR.h(-26,14),14,14,0,.6,1.1],[34,TR.h(34,-6),-6,14,0,.2,1.2],[-16,TR.h(-16,-38),-38,15,0,.8,1.1],[20,TR.h(20,-36),-36,13,2,.5,1]],{trunks:true,cast:true});
      tidy(1);

    }
  }});
