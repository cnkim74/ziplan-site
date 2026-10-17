__bsigFill({"elbphil":function(K){
// 출처: elbphilharmonie.de 「Elbphilharmonie Building」 — 최고 110 m·지붕 최저 88 m, 2017.1.11 개관(플라자 2016.11.4), 카이슈파이허 A 1966년, 플라자 37 m, 유리 1,100장, 지붕 오목 8조각 물결·경사 최대 57°, 창고 위 17개 층·25층, 대공연장 2,100석·리사이틀홀 550석
// 추정: 평면 사다리꼴(길이 120 m, 폭 서쪽 28 m·동쪽 38 m), 벽돌 창 격자 간격, 플라자 띠 높이(37~44 m), 지붕 높이장 모양, 말굽 로지아 위치, 부두 폭, 주변 하펜시티·슈파이허슈타트·항구 크레인·성 미하엘 교회 위치
    const T=K.T; const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    // 큐: 재료별로 상자(숫자 배열)·지오메트리를 모았다가 flush()에서 메시 하나로 병합 — 수백 개 부재가 메시 10여 개로. 상자는 toNonIndexed 없이 36정점을 바로 써서 빠름
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
    const skyDome=(cx,cy,cz,R)=>{ const g=new T.SphereGeometry(R,32,16); const p=g.attributes.position; const mkCol=night=>{ const col=[]; const top=new T.Color(night?0x0b1226:0x9fc0de).convertSRGBToLinear(), hor=new T.Color(night?0x2a3350:0xeee9df).convertSRGBToLinear(), c=new T.Color(); for(let i=0;i<p.count;i++){ const t=Math.max(0,Math.min(1,p.getY(i)/(R*.63))); c.copy(hor).lerp(top,Math.pow(t,.65)); col.push(c.r,c.g,c.b); } return new T.Float32BufferAttribute(col,3); }; const cD=mkCol(false), cN=mkCol(true); g.setAttribute('color',cD); const m=new T.Mesh(g,new T.MeshBasicMaterial({vertexColors:true,side:T.BackSide,fog:false,depthWrite:false})); m.position.set(cx,cy,cz); m.renderOrder=-1; m.frustumCulled=false; let cur=0; m.onBeforeRender=(r,sc)=>{ const n=sc.fog&&sc.fog.color&&sc.fog.color.r<.3?1:0; if(n!==cur){ cur=n; g.setAttribute('color',n?cN:cD); } }; K.life.add(m); return m; };
    const TX=(()=>{ const CC=(typeof window!=='undefined')?(window.__kTex15||(window.__kTex15={})):{};
      const tex=(key,px,draw)=>{ if(CC[key]) return CC[key]; if(typeof document==='undefined') return null; const cv=document.createElement('canvas'); cv.width=cv.height=px; const g=cv.getContext('2d'); let s=17; const rr=()=>{ s=(s*16807)%2147483647; return s/2147483647; }; draw(g,px,rr); const t=new T.CanvasTexture(cv); t.wrapS=t.wrapT=T.RepeatWrapping; t.encoding=T.sRGBEncoding; t.anisotropy=8; return CC[key]=t; };
      const mk=(t,tm,o,hex)=>{ const m=new T.MeshStandardMaterial(Object.assign({color:t?0xffffff:(hex||0xcccccc),map:t||null,roughness:.86},o||{})); if(!t) m.color.convertSRGBToLinear(); m.userData.tm=tm; return m; };
      // 안도 콘크리트: 512 px = 3.6 m → 패널 1.8 × 0.9 m(가로 2 × 세로 4), 패널마다 구멍 3 × 2, 패널 이음 줄눈, 얼룩·물자국 약간
      const ando=(key,base,o)=>mk(tex('ando'+key,512,(g,N,rr)=>{ const pw=N/2, ph=N/4; g.fillStyle=base; g.fillRect(0,0,N,N);
          for(let j=0;j<4;j++) for(let i=0;i<2;i++){ const v=(rr()-.5)*14; g.fillStyle=`rgba(${v>0?255:0},${v>0?255:0},${v>0?250:0},${Math.abs(v)/100})`; g.fillRect(i*pw,j*ph,pw,ph); }
          for(let k=0;k<2600;k++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.05)':'rgba(30,30,30,.05)'; const z=1+rr()*2; g.fillRect(rr()*N,rr()*N,z,z); }
          for(let k=0;k<5;k++){ const x=rr()*N; const gr=g.createLinearGradient(0,0,0,N); gr.addColorStop(0,'rgba(90,88,82,.08)'); gr.addColorStop(1,'rgba(90,88,82,0)'); g.fillStyle=gr; g.fillRect(x,0,6+rr()*14,N*(.3+rr()*.6)); }
          g.fillStyle='rgba(70,68,64,.55)'; for(let i=0;i<=2;i++) g.fillRect(i*pw-1,0,2,N); for(let j=0;j<=4;j++) g.fillRect(0,j*ph-1,N,2);
          for(let j=0;j<4;j++) for(let i=0;i<2;i++) for(const fx of [1/6,.5,5/6]) for(const fy of [.25,.75]){ const x=i*pw+fx*pw, y=j*ph+fy*ph; g.fillStyle='rgba(235,233,228,.6)'; g.beginPath(); g.arc(x,y,5.5,0,7); g.fill(); g.fillStyle='#55534f'; g.beginPath(); g.arc(x,y,3.6,0,7); g.fill(); } }),3.6,Object.assign({roughness:.78},o||{}));
      // 커튼월 세로 결(멀리언 + 층 띠 + 반사 얼룩) — 512 px = tm m
      const cw=(key,base,mull,band,nx,ny,tm,o)=>mk(tex('cw'+key,512,(g,N,rr)=>{ g.fillStyle=base; g.fillRect(0,0,N,N); const pw=N/nx, ph=N/ny; for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){ const v=(rr()-.5)*30; g.fillStyle=`rgba(${v>0?255:20},${v>0?255:30},${v>0?255:40},${Math.abs(v)/160})`; g.fillRect(i*pw,j*ph,pw,ph); } const gr=g.createLinearGradient(0,0,N,N); gr.addColorStop(0,'rgba(255,255,255,.10)'); gr.addColorStop(.5,'rgba(255,255,255,0)'); gr.addColorStop(1,'rgba(255,255,255,.08)'); g.fillStyle=gr; g.fillRect(0,0,N,N); g.fillStyle=band; for(let j=0;j<ny;j++) g.fillRect(0,j*ph,N,Math.max(2,ph*.12)); g.fillStyle=mull; for(let i=0;i<nx;i++) g.fillRect(i*pw,0,Math.max(2,pw*.09),N); }),tm,Object.assign({metalness:.35,roughness:.25},o||{}));
      return {tex,mk,ando,cw}; })();
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
    const tidy=keep=>{ const L=K.life, add0=L.add; L.add=function(...a){ a.forEach(o=>{ if(keep&&o.isMesh&&!o.isInstancedMesh&&o.material===K.M.people) return; o.visible=false; }); return add0.apply(this,a); }; };
    const BLK=(()=>{ const TT=T;
      const blocks=(list)=>{ if(!list.length) return; const n=list.length*30, P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3); let o=0; const c=new TT.Color();
        const quad=(a,b,cc,d,nx,ny,nz,k)=>{ for(const q of [a,b,cc,a,cc,d]){ P[o*3]=q[0]; P[o*3+1]=q[1]; P[o*3+2]=q[2]; N[o*3]=nx; N[o*3+1]=ny; N[o*3+2]=nz; Cc[o*3]=c.r*k; Cc[o*3+1]=c.g*k; Cc[o*3+2]=c.b*k; o++; } };
        for(const [x,z,w,d,h,hex] of list){ c.set(hex).convertSRGBToLinear(); const X0=x-w/2,X1=x+w/2,Z0=z-d/2,Z1=z+d/2; quad([X0,h,Z1],[X1,h,Z1],[X1,h,Z0],[X0,h,Z0],0,1,0,1.06); quad([X0,0,Z1],[X1,0,Z1],[X1,h,Z1],[X0,h,Z1],0,0,1,.95); quad([X1,0,Z0],[X0,0,Z0],[X0,h,Z0],[X1,h,Z0],0,0,-1,.9); quad([X1,0,Z1],[X1,0,Z0],[X1,h,Z0],[X1,h,Z1],1,0,0,.86); quad([X0,0,Z0],[X0,0,Z1],[X0,h,Z1],[X0,h,Z0],-1,0,0,.86); }
        const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(Cc,3)); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:.9})); m.receiveShadow=true; K.life.add(m); return m; };
      return blocks; })();
    const LIFE=f=>{ const pc=K.cur; K.cur=K.life; f(); flush(); K.cur=pc; };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    // ---- EU 공용(이 build 안에서만): 뚫린 창 벽(리빌 깊이) · 볼륨 · 창 배열 · 경사 판 ----
    // wallF: ax 'x' → 벽이 x 방향(z=c), 'z' → z 방향(x=c) · sg 바깥 방향(±1) · rows [[y아래,y위]] · cols [[a시작,a끝]] — 창은 면에서 inset만큼 들어가 리빌이 보임
    const wallF=(ax,c,sg,a0,a1,y0,y1,rows,cols,M,o)=>{ o=o||{}; const th=o.th||.3, gm=o.glass||K.col(0x37444c,{roughness:.06,metalness:.7}), fm=o.frame, ins=o.inset===undefined?th*.7:o.inset;
      const box=(a,b,ya,yb,dO,dI,m)=>{ const w=b-a, h=yb-ya, t=dI-dO; if(w<=.001||h<=.001||t<=0) return; const mid=(a+b)/2, off=c-sg*(dO+dI)/2; if(ax==='x') B(mid,ya,off,w,h,t,m); else B(off,ya,mid,t,h,w,m); };
      const solid=(a,b,ya,yb)=>box(a,b,ya,yb,0,th,M);
      let yy=y0; for(const [yb,yt] of rows){ if(yb>yy+.001) solid(a0,a1,yy,yb); let aa=a0; for(const [ab,at] of cols){ if(ab>aa+.001) solid(aa,ab,yb,yt); box(ab,at,yb,yt,ins,ins+.05,gm);
          if(fm){ const fw=o.fw||.07; box(ab,at,yb,yb+fw,ins-.05,ins+.02,fm); box(ab,at,yt-fw,yt,ins-.05,ins+.02,fm); box(ab,ab+fw,yb,yt,ins-.05,ins+.02,fm); box(at-fw,at,yb,yt,ins-.05,ins+.02,fm); if(o.mull){ for(let a=ab+o.mull;a<at-o.mull*.4;a+=o.mull) box(a-fw/2,a+fw/2,yb,yt,ins-.05,ins+.02,fm); } if(o.tr){ for(const f of o.tr){ const y=yb+(yt-yb)*f; box(ab,at,y-fw/2,y+fw/2,ins-.05,ins+.02,fm); } } }
          if(o.sill) box(ab-.04,at+.04,yb-.05,yb,-o.sill,ins,o.sillM||M); aa=at; }
        if(a1>aa+.001) solid(aa,a1,yb,yt); yy=yt; }
      if(y1>yy+.001) solid(a0,a1,yy,y1); };
    // vol: 상자 볼륨 + 네 면 창(F={s:[rows,cols],n,e,w} 남 +z·북 −z·동 +x·서 −x)
    const vol=(x0,x1,z0,z1,y0,y1,M,F,o)=>{ o=o||{}; const th=o.th||.3; B((x0+x1)/2,y0,(z0+z1)/2,x1-x0-2*th+.04,y1-y0,z1-z0-2*th+.04,o.core||M); const R=f=>F&&F[f]?F[f]:[[],[]];
      wallF('x',z1,1,x0,x1,y0,y1,R('s')[0],R('s')[1],M,o); wallF('x',z0,-1,x0,x1,y0,y1,R('n')[0],R('n')[1],M,o); wallF('z',x1,1,z0+th,z1-th,y0,y1,R('e')[0],R('e')[1],M,o); wallF('z',x0,-1,z0+th,z1-th,y0,y1,R('w')[0],R('w')[1],M,o); };
    const evenCols=(a0,a1,w,n,edge)=>{ const L=[], e=edge||0, sp=(a1-a0-2*e)/n; for(let i=0;i<n;i++){ const cc=a0+e+sp*(i+.5); L.push([cc-w/2,cc+w/2]); } return L; };
    const stepCols=(a0,a1,w,sp,edge)=>{ const L=[], e=edge||0; const n=Math.max(1,Math.floor((a1-a0-2*e+ (sp-w))/sp)); const tot=n*sp-(sp-w); const st=(a0+a1)/2-tot/2; for(let i=0;i<n;i++) L.push([st+i*sp,st+i*sp+w]); return L; };
    const floorsR=(y0,fh,n,sill,head)=>{ const L=[]; for(let i=0;i<n;i++) L.push([y0+i*fh+sill,y0+i*fh+fh-head]); return L; };
    // 다각형 판(평면 pts [[x,z]…], 꼭짓점별 높이 hf(x,z)) — 위 면 + 옆 띠(두께 th)
    const UP=new T.Vector3(0,1,0);
    const rod=(a,b,r,mat,seg)=>{ const dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2]; const L=Math.hypot(dx,dy,dz); if(L<.001) return; const g=new T.CylinderGeometry(r,r,L,seg||6,1,true); g.applyMatrix4(new T.Matrix4().makeRotationFromQuaternion(new T.Quaternion().setFromUnitVectors(UP,new T.Vector3(dx/L,dy/L,dz/L)))); g.translate((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2); Q(mat,g); };

    K.layer(0); E.own();
    const zN=x=>-15-(x+60)/120*4, zS=x=>13+(x+60)/120*6; // 북(잔트토르 항)·남(엘베강) 벽 — x는 서(−60) → 동(+60)
    const BRK=TX.mk(TX.tex('eu_elbbrk',512,(g,N,rr)=>{ g.fillStyle='#4a2a22'; g.fillRect(0,0,N,N); const bw=N/16, bh=N/48; for(let j=0;j<48;j++){ const off=(j%2)*bw/2; for(let i=-1;i<17;i++){ const c=(rr()-.5)*30; g.fillStyle=`rgb(${120+c|0},${62+c*.6|0},${46+c*.5|0})`; g.fillRect(i*bw+off+1,j*bh+1,bw-2,bh-2); } } for(let k=0;k<1200;k++){ g.fillStyle='rgba(20,10,8,.08)'; g.fillRect(rr()*N,rr()*N,3,2); } }),3.5,{roughness:.9});
    const GW=TX.mk(TX.tex('eu_elbglass',512,(g,N,rr)=>{ g.fillStyle='#9fb6c4'; g.fillRect(0,0,N,N); const pw=N/4, ph=N/4; for(let j=0;j<4;j++) for(let i=0;i<4;i++){ const x=i*pw, y=j*ph; const gr=g.createLinearGradient(x,y,x+pw,y+ph); const t=rr(); gr.addColorStop(0,`rgba(${210+t*30|0},${225+t*20|0},${235},1)`); gr.addColorStop(.5,`rgba(${120+t*40|0},${150+t*40|0},${170+t*30|0},1)`); gr.addColorStop(1,`rgba(${190+t*40|0},${208+t*30|0},${222},1)`); g.fillStyle=gr; g.fillRect(x+2,y+2,pw-4,ph-4); g.fillStyle='rgba(255,255,255,.28)'; for(let a=0;a<120;a++){ const yy=y+rr()*ph; if(yy>y+ph*(.35+.3*rr())) continue; g.beginPath(); g.arc(x+4+rr()*(pw-8),yy,1.4,0,7); g.fill(); } if(rr()<.22){ g.fillStyle='rgba(40,52,60,.85)'; g.beginPath(); g.moveTo(x+pw*.22,y+ph*.95); g.lineTo(x+pw*.22,y+ph*.5); g.bezierCurveTo(x+pw*.22,y+ph*.12,x+pw*.78,y+ph*.12,x+pw*.78,y+ph*.5); g.lineTo(x+pw*.78,y+ph*.95); g.closePath(); g.fill(); g.strokeStyle='rgba(235,240,242,.9)'; g.lineWidth=3; g.stroke(); } } g.fillStyle='#e9eef0'; for(let i=0;i<=4;i++) g.fillRect(i*pw-2,0,4,N); for(let j=0;j<=4;j++) g.fillRect(0,j*ph-2,N,4); }),18,{roughness:.12,metalness:.5,side:T.DoubleSide});
    const ROOF=K.col(0xeeeeea,{roughness:.32,metalness:.35,side:T.DoubleSide}), GLD=K.col(0x2c3940,{roughness:.05,metalness:.75}), QUAY=K.col(0x8f8a82,{roughness:.95}), PAVE=K.col(0xa49e94,{roughness:.95}), FR=K.col(0x3a3330,{roughness:.6});
    // 부두(카이저회프트): 화강석 포장 + 물로 떨어지는 안벽
    LIFE(()=>{ const pts=[[-66,-22],[78,-28],[78,27],[-66,19]]; K.ex(pts,3,QUAY,[0,-3.02,0]); B(6,-.03,-1,142,.04,44,PAVE); });
    // ---- 0: 벽돌 받침(카이슈파이허 A) — 작은 창 격자(리빌) ----
    const PB=37; const n0=[[-60,-15],[60,-19],[60,19],[-60,13]];
    K.ex(n0.map(([x,z])=>[x*.985,z*.96]),PB,K.col(0x4a3a33,{roughness:.9}),[0,0,0]);
    const side=(a,b,rows,cols)=>{ const dx=b[0]-a[0], dz=b[1]-a[1], L=Math.hypot(dx,dz), ang=-Math.atan2(dz,dx); const cx=(a[0]+b[0])/2, cz=(a[1]+b[1])/2; const nx=dz/L, nz=-dx/L; // 바깥 법선(시계 방향 꼭짓점 기준)
      const th=.5; const box=(u0,u1,y0,y1,d0,d1,m)=>{ const w=u1-u0, h=y1-y0, t=d1-d0; if(w<=0||h<=0) return; const um=(u0+u1)/2-L/2, dm=(d0+d1)/2; B(cx+dx/L*um-nx*dm,y0,cz+dz/L*um-nz*dm,w,h,t,m,ang); };
      let yy=0; for(const [yb,yt] of rows){ if(yb>yy) box(0,L,yy,yb,0,th,BRK); let uu=0; for(const [ub,ut] of cols(L)){ if(ub>uu) box(uu,ub,yb,yt,0,th,BRK); box(ub,ut,yb,yt,.36,.42,GLD); uu=ut; } if(L>uu) box(uu,L,yb,yt,0,th,BRK); yy=yt; } if(PB>yy) box(0,L,yy,PB,0,th,BRK); };
    const rows=[[1.2,4.6]]; for(let y=7.2;y<PB-2;y+=2.9) rows.push([y,y+1.25]);
    const cols=L=>stepCols(0,L,1.25,3.3,1.6);
    side(n0[0],n0[1],rows,cols); side(n0[1],n0[2],rows,cols); side(n0[2],n0[3],rows,cols); side(n0[3],n0[0],rows,cols);
    // 동쪽 입구(튜브 에스컬레이터 들어가는 큰 아치 — 단순화)
    B(60.2,0,0,.3,7,10,GLD); B(61.5,7,0,3,.4,12,K.col(0xdcdcd8,{roughness:.4,metalness:.4}));
    flush();
    // ---- 1: 플라자(37 m) 띠 · 휜 유리 몸체 ----
    K.layer(1);
    const rh=(x,z)=>{ const u=(x+60)/120, w=(z-zN(x))/(zS(x)-zN(x)); // 지붕 높이장: 서쪽 끝 최고 110 m, 가운데 안장, 동쪽 봉우리 — 오목한 조각들이 물결
      const pW=Math.exp(-Math.pow((u-.04)/.12,2))*Math.exp(-Math.pow((w-.62)/.5,2)), pE=Math.exp(-Math.pow((u-.82)/.12,2))*Math.exp(-Math.pow((w-.4)/.55,2)), pM=Math.exp(-Math.pow((u-.42)/.1,2))*Math.exp(-Math.pow((w-.55)/.35,2));
      return 88+21.5*pW+15*pE+9*pM+1.8*Math.sin(u*Math.PI*8+w*2)*(1-pW); };
    // 플라자 층: 안으로 들어간 유리 + 기둥 + 곡선 개구부(검게)
    { const sh=n0.map(([x,z])=>[x*.97,z*.9]); K.ex(sh,8,K.col(0x7e8d95,{roughness:.08,metalness:.6}),[0,PB,0]); B(0,PB,0,124,.6,42,K.col(0xcfcac2,{roughness:.8})); for(let x=-56;x<=56;x+=8){ C(x,PB,zN(x)+1.6,.35,8,FR,8,.35); C(x,PB,zS(x)-1.4,.35,8,FR,8,.35); } }
    const PY=PB+8;
    for(let s=0;s<4;s++){ const a=n0[s], b=n0[(s+1)%4]; const L=Math.hypot(b[0]-a[0],b[1]-a[1]);
      S(GW,(u,v)=>{ const x=a[0]+(b[0]-a[0])*u, z=a[1]+(b[1]-a[1])*u; const top=rh(x,z); const bul=.6*Math.sin(v*Math.PI)*(1+.4*Math.sin(u*20)); const nx=(b[1]-a[1])/L, nz=-(b[0]-a[0])/L; return [x+nx*bul,PY+(top-PY)*v,z+nz*bul,u*L/18,(PY+(top-PY)*v)/18]; },Math.max(8,Math.round(L/3)),14); }
    // 지붕(물결 조각) + 둥근 구멍 몇 개
    S(ROOF,(u,v)=>{ const x=-60+120*u, z=zN(x)+(zS(x)-zN(x))*v; return [x,rh(x,z)+.15,z]; },72,18);
    for(const [x,w] of [[-30,.5],[-5,.45],[20,.55],[44,.5]]){ const z=zN(x)+(zS(x)-zN(x))*w; const g=new T.CircleGeometry(1.6,14); g.rotateX(-Math.PI/2); g.translate(x,rh(x,z)+.3,z); Q(K.col(0x3b4146,{roughness:.6}),g); }
    flush();
    // ---- 배경(K.life): 엘베강 · 하펜시티(동) · 슈파이허슈타트(북동, 벽돌+초록 구리 지붕) · 강 건너 항구 크레인 · 성 미하엘 ----
    LIFE(()=>{
      const land=(x,z)=>(x>90&&z>-60&&z<60)||(z<-70&&x>-200)||z>430||(x>-260&&x<90&&z<-75&&z>-140&&x>-60);
      E.terrain(-1800,1800,-1800,1800,90,90,(x,z)=>land(x,z)?0:-5,(x,z,h)=>{ const n=E.fbm(x*.04,z*.04,2); return h<-1?[.3,.36,.38]:[.52+.03*n,.5+.03*n,.48+.03*n]; },[-72,80,-30,29]);
      const wg=new T.PlaneGeometry(3600,3600); wg.rotateX(-Math.PI/2); wg.translate(0,-2.4,0); const wm=new T.Mesh(wg,E.WATER); wm.receiveShadow=false; K.life.add(wm);
      const hc=[]; for(let x=96;x<1400;x+=44) for(let z=-56;z<56;z+=40) if(E.r()<.85) hc.push([x+(E.r()-.5)*6,z+(E.r()-.5)*4,28+E.r()*10,26+E.r()*8,24+E.r()*20,['#d9d3c8','#b8a99a','#e8e6e0','#8e98a0','#c6b49c'][Math.floor(E.r()*5)]]);
      const cap=[]; for(let x=-40;x<1400;x+=48) for(let z=-300;z<-80;z+=46) if(E.r()<.8){ const h=18+E.r()*12; hc.push([x,z,36,30,h,['#8a4a36','#7a4232','#93523c'][Math.floor(E.r()*3)]]); cap.push([x,z,30,24,h+4,'#5f8f7d']); }
      for(let x=-1600;x<1600;x+=60) for(let z=460;z<1500;z+=70) if(E.r()<.5) hc.push([x,z,40+E.r()*30,30+E.r()*20,10+E.r()*14,['#8f969c','#a3a39b','#6e7a84'][Math.floor(E.r()*3)]]);
      BLK(hc); BLK(cap);
      // 항구 크레인(강 건너, 남쪽)
      const CR=[K.col(0x2f5c8f,{roughness:.6,metalness:.4}),K.col(0xc9452f,{roughness:.6,metalness:.4})]; for(let i=0;i<9;i++){ const x=-500+i*70, z=470, m=CR[i%2]; for(const dx of [-8,8]) for(const dz of [-6,6]) B(x+dx,0,z+dz,1.2,42,1.2,m); B(x,42,z,18,3,14,m); B(x,45,z-25,3,3,90,m); B(x,48,z+8,6,8,6,m); }
      // 성 미하엘 교회 탑(북동 · 약 132 m — 위치 추정)
      { const x=700, z=-520; B(x,0,z,14,70,14,K.col(0x8a4b38,{roughness:.9})); B(x,70,z,11,22,11,K.col(0x8a4b38,{roughness:.9})); C(x,92,z,5,14,K.col(0x5f9180,{roughness:.6,metalness:.3}),8,4); C(x,106,z,3,24,K.col(0x5f9180,{roughness:.6,metalness:.3}),8,.3); }
    });
    tidy(1);
  }});
