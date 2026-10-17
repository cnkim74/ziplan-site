__bsigFill({"therme":function(K){
// 출처: tour-switzerland.ch 「Vals Therme」 — 1996 개장, 발스 규암 60,000장, 얇은 콘크리트 줄눈 사이 가로 켜쌓기, 판 두께 10~12 cm·깊이 30~50 cm, 실내 풀 36°C·불탕 42°C·냉탕 14°C·바깥 풀 36°C·꽃탕·소리 동굴·마시는 샘, 위 호텔(7132 Hotel)에서 터널, 비탈에 일부 묻힘
// 추정: 평면 58 × 34 m·높이 7.6 m, 바깥 풀 위치·크기(21 × 13 m), 블록·지붕판 배치와 틈 폭, 개구부 크기·위치, 비탈 경사, 호텔 동 위치·높이, 산 높이·계곡 방향, 마을 위치
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
    const QZ=TX.mk(TX.tex('eu_valsq',512,(g,N,rr)=>{ g.fillStyle='#4b4e4a'; g.fillRect(0,0,N,N); let y=0; const hs=[4,6,8]; while(y<N){ const h=hs[Math.floor(rr()*3)]; let x=-rr()*80; while(x<N){ const w=40+rr()*140; const t=rr(); const c=[118+t*36|0,122+t*32|0,114+t*30|0]; if(rr()<.2){ c[1]+=6; c[2]+=10; } g.fillStyle=`rgb(${c[0]},${c[1]},${c[2]})`; g.fillRect(x+1,y+.5,w-1.5,h-1.2); x+=w; } y+=h; } for(let k=0;k<3000;k++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.05)':'rgba(0,0,0,.06)'; g.fillRect(rr()*N,rr()*N,2,1); } }),2.2,{roughness:.88});
    const GRS=TX.mk(TX.tex('eu_valsroof2',512,(g,N,rr)=>{ g.fillStyle='#6f8a4b'; g.fillRect(0,0,N,N); for(let k=0;k<9000;k++){ const t=rr(); g.fillStyle=`rgba(${80+t*60|0},${110+t*50|0},${50+t*30|0},.35)`; g.fillRect(rr()*N,rr()*N,2,3); } g.fillStyle='rgba(200,210,205,.7)'; const xs=[0,.11,.27,.39,.52,.66,.8,.9,1], zs=[0,.18,.33,.5,.62,.8,1]; for(const f of xs) g.fillRect(f*N-.6,0,1.2,N); for(const f of zs) g.fillRect(0,f*N-.6,N,1.2); }),60,{roughness:1});
    const GLD=K.col(0x27333a,{roughness:.05,metalness:.72}), CONC=K.col(0x8c8f8a,{roughness:.9}), DECK=K.col(0x7d817c,{roughness:.85});
    const POOL=K.col(0x4f8f96,{roughness:.04,metalness:.1,transparent:true,opacity:.85});
    const X0=-29, X1=29, Z0=-17, Z1=17, HH=7.6, PX0=-27, PX1=-6, PZ0=3; // 바깥 풀 마당(앞 왼쪽, 지붕 없음)
    const deep={th:1.0,glass:GLD,inset:.85,frame:K.col(0x3c3a36,{roughness:.6,metalness:.4}),fw:.05};
    // 앞 데크(돌) — 건물 앞 계곡 쪽 테라스
    B(0,-2.5,24,70,2.5,16,DECK); B(0,-.25,0,62,.25,38,DECK);
    // ---- 0: 돌 볼륨 — 뒤(북)·옆 벽은 막히고, 앞(계곡) 벽에 깊은 개구부 ----
    // 뒤쪽 큰 덩어리(풀 마당 뒤): x X0..X1, z Z0..PZ0
    B(0,0,(Z0+PZ0)/2,X1-X0-2,HH,PZ0-Z0-2,K.col(0x3e413e,{roughness:.9}));
    wallF('x',Z0,-1,X0,X1,0,HH,[],[],QZ,deep);
    wallF('z',X0,-1,Z0+1,PZ0,0,HH,[[[1.6,5.8]]],[[-12,-8]],QZ,deep);
    // 풀 마당 뒤 벽(남향, 풀을 바라봄): 큰 개구부 둘 + 좁은 틈
    wallF('x',PZ0,1,X0,PX1,0,HH,[[.0,6.4]],[[-24,-17.5],[-15.6,-15],[-12.4,-7.4]],QZ,deep);
    // 오른쪽 앞 덩어리: x PX1..X1, z PZ0..Z1 — 앞면 개구부(가로로 긴 창·키 큰 틈)
    B((PX1+X1)/2,0,(PZ0+Z1)/2,X1-PX1-2,HH,Z1-PZ0-1,K.col(0x3e413e,{roughness:.9}));
    wallF('x',Z1,1,PX1,X1,0,HH,[[1.0,6.5]],[[-3.2,4.4],[7.6,8.4],[11.5,19.5],[23,24]],QZ,deep);
    wallF('z',PX1,-1,PZ0+1,Z1,0,HH,[[.0,6.2]],[[7,13]],QZ,deep);
    wallF('z',X1,1,Z0+1,Z1-1,0,HH,[[2.2,5.4]],[[0,4],[8,10]],QZ,deep);
    // 풀 마당 왼쪽 낮은 돌벽(계곡 쪽으로 열림)
    wallF('z',X0,-1,PZ0,Z1,0,2.2,[],[],QZ,{th:1.0});
    // 바깥 풀(36°C): 돌 수조 + 물 + 김
    B((PX0+PX1)/2,-1.2,(PZ0+Z1)/2+.6,PX1-PX0-1.6,1.1,Z1-PZ0-3.4,K.col(0x3b5458,{roughness:.6})); B((PX0+PX1)/2,.02,(PZ0+Z1)/2+.6,PX1-PX0-1.6,.03,Z1-PZ0-3.4,POOL); { const cx=(PX0+PX1)/2, cz=(PZ0+Z1)/2+.6, w=PX1-PX0-1.6, d=Z1-PZ0-3.4; for(const s of [-1,1]){ B(cx,0,cz+s*(d/2+.3),w+1.2,.18,.6,QZ); B(cx+s*(w/2+.3),0,cz,.6,.18,d,QZ); } }
    { const ST=K.col(0xffffff,{roughness:1,transparent:true,opacity:.1,depthWrite:false}); for(let i=0;i<5;i++){ const g=new T.SphereGeometry(1.6+rnd()*1.4,10,7); g.scale(1.4,.55,1); g.translate(PX0+3+rnd()*(PX1-PX0-6),.6+rnd()*1.6,PZ0+3+rnd()*(Z1-PZ0-6)); Q(ST,g); } }
    // 실내 풀 반사(개구부 너머)
    B(10,.02,10,14,.02,8,POOL);
    flush();
    // ---- 1: 지붕 — 블록마다 얹은 판(틈은 유리 띠) 위 잔디, 가장자리 얇은 콘크리트 판 ----
    K.layer(1);
    const roofP=[[X0,Z0-3.2,X1,PZ0],[PX1,PZ0,X1,Z1]];
    for(const [a,b,c,d] of roofP){ B((a+c)/2,HH,(b+d)/2,c-a+.5,.45,d-b+.5,CONC); B((a+c)/2,HH+.45,(b+d)/2,c-a+.3,.18,d-b+.3,GRS); }
    // 지붕판 틈(빛 띠) — 앞 처마 면에 가는 유리 줄
    for(const x of [-22.6,-13.4,-6.6,1.2,9.3,17.4,23.2]) if(x>PX1||true) B(x,HH,(x>PX1?Z1:PZ0)+.24,.1,.45,.04,K.col(0xdfe8ea,{roughness:.1,metalness:.3}));
    flush();
    // ---- 배경(K.life): 산비탈(뒤로 솟음) · 계곡·강 · 침엽수림 · 호텔 · 발스 마을(돌판 지붕) · 눈 덮인 봉우리 ----
    LIFE(()=>{
      const pk=[[-300,-1100,900,520,1250,1.6],[700,-1000,800,600,1100,1.4],[-1200,-600,700,700,900,1.5],[200,1250,1000,520,1150,1.5],[-900,1100,700,600,950,1.4],[1300,900,700,700,900,1.4],[1500,-500,700,700,1000,1.4]];
      const hf=(x,z)=>{ let h; if(z<Z0-2){ h=HH+.15+(-(z-(Z0-2)))*.32; } else if(z<=Z1+8){ const t=Math.min(1,Math.max(0,(Z1+8-z)/(Z1+8-(Z0-2)))); h=Math.abs(x)>30.1?(HH+.15)*Math.pow(t,1.15)-.1:-.3; } else { h=-.3-(z-(Z1+8))*.11; }
        const vall=z>60?-(z-60)*.04:0; h+=vall; h=Math.max(h,-40+E.fbm(x*.01,z*.01,2)*6); return h+E.peaks(x,z,pk)+(Math.abs(x)>40||z<-30||z>40?E.fbm(x*.012,z*.012,3)*14-7:0); };
      const TR=E.terrain(0,0,0,0,E.axis(3200,170,4.6),E.axis(3200,170,4.6),hf,(x,z,h,ny)=>{ let c=E.mcol(x,z,h,ny,{cliff:.9,far:900,cx:0,cz:0}); const sn=E.ss((h-480)/140)*E.ss((ny-.55)/.2); if(h<60&&ny>.85){ const m=[.5+E.fbm(x*.05,z*.05,2)*.08,.6,.33]; c=c.map((v,i)=>v+(m[i]-v)*.6); } return c.map((v,i)=>v+([.95,.96,.98][i]-v)*sn); },[X0-1,X1+1,Z0-3,Z1+8]);
      // 계곡 바닥 강(발저 라인)
      { const pts=[]; for(let x=-1500;x<=1500;x+=30) pts.push(new T.Vector3(x,0,0)); const g=new T.PlaneGeometry(3000,14,100,1); g.rotateX(-Math.PI/2); const p=g.attributes.position; for(let i=0;i<p.count;i++){ const x=p.getX(i), z=p.getZ(i)+180+Math.sin(x*.004)*40; p.setZ(i,z); p.setY(i,TR.h(x,z)+.4); } g.computeVertexNormals(); const m=new T.Mesh(g,E.WATER); K.life.add(m); }
      const tr=E.scatter(-1500,1500,-1500,1500,20,TR.h,(x,z,h)=>!(Math.abs(x)<170&&z>-130&&z<160)&&h<620&&h>-30&&E.vn(x*.01,z*.01)>.38&&!(Math.abs(z-180-Math.sin(x*.004)*40)<20),()=>11+E.r()*7,()=>2); E.forest(tr,{trunks:false});
      // 호텔(뒤 비탈 위, 1960년대 동 — 위치·높이 추정) · 터널 입구 쪽 길
      const hot=[[-70,-70,46,16,18,'#d9d4c8'],[10,-92,60,16,21,'#e2ddd2'],[80,-62,30,14,15,'#cfc9bc']]; for(const [x,z,w,d,h,c] of hot){ const y=TR.h(x,z); B(x,y-4,z,w,h+4,d,K.col(parseInt(c.slice(1),16),{roughness:.9})); for(let k=1;k<6;k++) B(x,y+k*3.1,z+d/2+.05,w-2,1.2,.1,GLD); B(x,y+h,z,w+1.2,.4,d+1.2,K.col(0x6d6a65,{roughness:.9})); }
      // 발스 마을: 흰 벽 + 회색 돌판 지붕 집(인스턴스)
      { const wall=[], roof=[]; for(let i=0;i<120;i++){ const x=-60-E.r()*520, z=150+E.r()*170; if(Math.abs(z-180-Math.sin(x*.004)*40)<14) continue; const y=TR.h(x,z), s=7+E.r()*5, ry=E.r()*.4; wall.push([x,y-1,z,ry,s,6.5+E.r()*3,s*.8]); roof.push([x,y+6+E.r()*.2,z,ry,s*1.15,3.4,s*.95]); }
        const rg=(()=>{ const sh=new T.Shape(); sh.moveTo(-.5,0); sh.lineTo(0,1); sh.lineTo(.5,0); const g=new T.ExtrudeGeometry(sh,{depth:1,bevelEnabled:false}); g.translate(0,0,-.5); return g; })();
        inst(boxG(1,1,1),K.col(0xe9e4da,{roughness:.9}),wall,false); inst(rg,K.col(0x707274,{roughness:.85}),roof,false); }
    });
    tidy(1);
  }});
