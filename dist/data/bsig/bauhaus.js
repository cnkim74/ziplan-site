__bsigFill({"bauhaus":function(K){
// 출처: 영문 위키백과 「Bauhaus Dessau」 — 그로피우스 설계, 1925.9 착공·1926.3.21 상량·1926.12.4 개관, 철근콘크리트 골조, 공방동 강철 틀 유리 커튼월(기둥을 안으로 들여 유리 연속, 1976 재건 때 알루미늄), 다리 2층(행정·그로피우스 사무실), 프렐러하우스 5층 스튜디오 28실, 강당·무대·식당은 공방동과 아틀리에동 사이 낮은 동
// 추정: 각 동의 치수(공방동 44 × 22 m, 직업학교동 42 × 16 m, 프렐러하우스 12 × 34 m), 층고 4 m, 다리 위치·폭, 길 방향, 발코니 개수(동쪽 4개 층 × 6), 세로 BAUHAUS 글자 위치, 주변 주택·숲
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
    const WH=K.col(0xf1efe9,{roughness:.88}), WH2=K.col(0xe4e1da,{roughness:.9}), PL=K.col(0x5a5c5e,{roughness:.85}), FR=K.col(0x24272a,{roughness:.45,metalness:.5}), GLW=K.col(0x34434c,{roughness:.05,metalness:.72}), RF=K.col(0x8f8c86,{roughness:.95});
    const GLC=K.col(0xb3ccd4,{roughness:.03,metalness:.5,transparent:true,opacity:.28,depthWrite:false,side:T.DoubleSide}), SLAB=K.col(0xe9e6df,{roughness:.8}), INT=K.col(0xcfc9be,{roughness:.9});
    const ASP=K.col(0x55585b,{roughness:.95}), SIDE=K.col(0xb9b4aa,{roughness:.95}), GR=K.col(0x86a160,{roughness:1});
    const ribbon={th:.32,frame:FR,glass:GLW,mull:1.25,fw:.06};
    // 바닥: 잔디 대지 + 바우하우스 거리(다리 밑 동서) + 보도
    B(0,-.12,0,150,.12,110,GR); for(const [x,z,w,d] of [[-26,26.5,52,8],[-62,9,20,26],[45,13,14,40]]) B(x,-.06,z,w,.06,d,K.col(0xb3ad9f,{roughness:1})); B(0,-.02,-11,150,.04,9,ASP); for(const z of [-16.4,-5.6]) B(0,-.02,z,150,.06,1.8,SIDE); B(-26,-.02,24.5,50,.05,3,SIDE); B(30,-.02,33,16,.05,3,SIDE);
    // ---- 공방동: 어두운 기단(반지하 창) → 유리 커튼월 3개 층 → 흰 파라펫 띠 ----
    const WX0=-48, WX1=-4, WZ0=-2, WZ1=20, GL=.45; // 유리면은 슬래브 끝에서 GL만큼 밖
    vol(WX0-GL,WX1,WZ0-GL,WZ1+GL,0,2.4,PL,{s:[[[.55,1.85]],stepCols(WX0,WX1,2.2,3.6,1)],w:[[[.55,1.85]],stepCols(WZ0,WZ1,2.2,3.6,1)],n:[[[.55,1.85]],stepCols(WX0,-24,2.2,3.6,1)]},{th:.35,frame:FR,glass:GLW,fw:.05});
    for(const y of [2.4,6.4,10.4]) B((WX0+WX1)/2,y-.3,(WZ0+WZ1)/2,WX1-WX0,.3,WZ1-WZ0,SLAB); // 바닥판(유리 너머로 보임)
    for(let x=WX0+3;x<WX1-1;x+=6) for(let z=WZ0+3.5;z<WZ1-1;z+=6.5) C(x,2.4,z,.28,12,WH2,10,.24);
    B(-8,2.4,(WZ0+WZ1)/2,7,12,WZ1-WZ0-1,INT); // 동쪽 계단·코어(흰 벽 뒤)
    // 커튼월: 남·서·북(다리 서쪽까지) — 유리 + 세로 멀리언 1.1 m + 가로 창살 + 층 슬래브 높이 어두운 띠
    const cwY0=2.4, cwY1=14.5;
    const cwall=(ax,c,a0,a1)=>{ const L=a1-a0, mid=(a0+a1)/2; if(ax==='x') B(mid,cwY0,c,L,cwY1-cwY0,.04,GLC); else B(c,cwY0,mid,.04,cwY1-cwY0,L,GLC);
      for(let a=a0;a<=a1+.01;a+=1.1){ if(ax==='x') B(a,cwY0,c,.07,cwY1-cwY0,.12,FR); else B(c,cwY0,a,.12,cwY1-cwY0,.07,FR); }
      for(let fl=0;fl<3;fl++){ const yb=cwY0+fl*4; for(const f of [.0,.95,1.95,2.95]){ const y=yb+f; if(ax==='x') B(mid,y,c,L,.06,.11,FR); else B(c,y,mid,.11,.06,L,FR); }
        if(ax==='x') B(mid,yb+3.55,c-.02,L,.45,.06,K.col(0x2f3437,{roughness:.6})); else B(c-.02,yb+3.55,mid,.06,.45,L,K.col(0x2f3437,{roughness:.6})); } };
    cwall('x',WZ1+GL,WX0-GL,WX1-.3); cwall('z',WX0-GL,WZ0-GL,WZ1+GL); cwall('x',WZ0-GL,WX0-GL,-22.2);
    B((WX0-GL+WX1)/2,cwY1,(WZ0+WZ1)/2,WX1-WX0+GL,1.7,WZ1-WZ0+2*GL,WH); B((WX0-GL+WX1)/2,cwY1+1.7,(WZ0+WZ1)/2,WX1-WX0+GL+.1,.12,WZ1-WZ0+2*GL+.1,WH2); B((WX0+WX1)/2,cwY1+1.72,(WZ0+WZ1)/2,WX1-WX0-.8,.06,WZ1-WZ0,RF);
    // 공방동 동쪽 끝: 흰 벽 + 띠창(강당 동과 이어짐)
    wallF('z',WX1,1,WZ0-GL,WZ1+GL,2.4,14.5,floorsR(2.4,4,3,1,.9),[[-1.6,0.6],[16,19.8]],WH,ribbon);
    flush();
    // ---- 1: 다리(길 위 2층, 행정) · 직업학교동 · 강당 동 ----
    K.layer(1);
    // 다리: 바닥 5.2 m, 2개 층 띠창(양면), 아래 기둥 4
    vol(-22,-6,-20.2,WZ0-GL,5.2,13.4,WH,{w:[[[6.1,8.6],[9.9,12.4]],[[-19.6,-2.8]]],e:[[[6.1,8.6],[9.9,12.4]],[[-19.6,-2.8]]]},Object.assign({},ribbon,{core:WH2}));
    B(-14,4.85,-11.2,16.4,.38,18.6,WH2); for(const x of [-21,-7]) for(const z of [-16.2,-5.8]) B(x,0,z,.5,4.85,.5,WH); B(-14,13.4,-11.2,16.2,.12,18.6,WH2);
    // 직업학교동: 반지하 띠창 + 3개 층 띠창(남·북), 세로 BAUHAUS 글자(동쪽 끝 남면 — 추정 위치)
    const SX0=-26, SX1=16, SZ0=-36, SZ1=-20.2, SH=14.2;
    vol(SX0,SX1,SZ0,SZ1,0,SH,WH,{s:[[[.5,1.7]].concat(floorsR(2.2,4,3,1,1)),[[SX0+1.2,-22.6],[-5.4,SX1-3.4]]],n:[[[.5,1.7]].concat(floorsR(2.2,4,3,1,1)),[[SX0+1.2,SX1-1.2]]],w:[floorsR(2.2,4,3,1,1),[[SZ0+1.6,SZ1-1.6]]],e:[floorsR(2.2,4,3,1,1),[[SZ0+1.2,SZ0+6]]]},ribbon);
    B((SX0+SX1)/2,0,(SZ0+SZ1)/2,SX1-SX0+.1,.55,SZ1-SZ0+.1,PL); B((SX0+SX1)/2,SH,(SZ0+SZ1)/2,SX1-SX0+.1,.12,SZ1-SZ0+.1,WH2); B((SX0+SX1)/2,SH+.12,(SZ0+SZ1)/2,SX1-SX0-.8,.05,SZ1-SZ0-.8,RF);
    if(typeof document!=='undefined'){ const cv=document.createElement('canvas'); cv.width=128; cv.height=896; const g=cv.getContext('2d'); g.fillStyle='#26292c'; g.font='bold 104px Arial'; g.textAlign='center'; g.textBaseline='middle'; 'BAUHAUS'.split('').forEach((ch,i)=>g.fillText(ch,64,(i+.5)*128)); const tx=new T.CanvasTexture(cv); tx.encoding=T.sRGBEncoding; const p=new T.Mesh(new T.PlaneGeometry(1.1,7.7),new T.MeshStandardMaterial({map:tx,transparent:true,roughness:.6,depthWrite:false})); p.position.set(SX1-1.5,7.4,SZ1+.05); put(p,false); }
    // 입구 캐노피(다리 동쪽, 길 쪽)
    B(-3,3.3,-18.9,6,.18,2.6,WH); B(-3,0,-20.25,3.2,2.6,.06,GLW);
    // 강당·무대·식당 동(낮은 1개 층, 남쪽 큰 창)
    vol(WX1,24,1,15,0,6.3,WH,{s:[[[1.1,5.2]],stepCols(-3,23,2.6,3.4,.6)],n:[[[1.1,5.2]],stepCols(-3,23,2.6,3.4,.6)]},Object.assign({},ribbon,{mull:0,tr:[.62]}));
    B(10,0,8,28.2,.5,14.2,PL); B(10,6.3,8,28.1,.12,14.1,WH2);
    flush();
    // ---- 2: 프렐러하우스(5층, 스튜디오 28실) — 동쪽 발코니 ----
    K.layer(2);
    const PX0=24, PX1=36, PZ0=-4, PZ1=30, PH=17.4, pf=floorsR(2.2,3.05,5,.75,.55);
    vol(PX0,PX1,PZ0,PZ1,0,PH,WH,{e:[pf,stepCols(PZ0,PZ1,1.6,5.2,1.2)],w:[pf,stepCols(PZ0,PZ1,1.6,5.2,1.2)],s:[pf,[[PX0+2,PX0+6],[PX1-6,PX1-2]]],n:[pf.slice(1),[[PX0+3,PX1-3]]]},{th:.3,frame:FR,glass:GLW,fw:.06,tr:[.7],sill:.12,sillM:WH2});
    B(30,0,13,12.1,1.0,34.1,PL); B(30,PH,13,12.1,.12,34.1,WH2); B(30,PH+.12,13,11.2,.05,33.2,RF);
    // 발코니: 2~5층 동쪽 — 콘크리트 판 + 가는 난간(위 손잡이·옆판)
    for(let fl=1;fl<5;fl++){ const y=2.2+fl*3.05; for(const [a,b] of stepCols(PZ0,PZ1,1.6,5.2,1.2)){ const z=(a+b)/2; B(PX1+.45,y-.12,z,.9,.14,1.5,WH); B(PX1+.88,y+.02,z,.04,1.02,1.5,FR); for(const s of [-1,1]) B(PX1+.45,y+.02,z+s*.73,.9,1.02,.04,FR); B(PX1+.45,y+1.0,z,.94,.05,1.56,FR); } }
    // 옥상 난간(옥상 테라스)
    B(30,PH+.12,PZ0+.2,12,1.0,.04,FR); B(30,PH+.12,PZ1-.2,12,1.0,.04,FR); for(const x of [PX0+.2,PX1-.2]) B(x,PH+.12,13,.04,1.0,33.6,FR);
    flush();
    // ---- 배경(K.life): 평평한 땅 · 길 연장 · 소나무·활엽 숲(서쪽 마이스터 하우스 숲) · 낮은 주택 블록 ----
    LIFE(()=>{
      E.terrain(-1400,1400,-1400,1400,48,48,()=>-.04,(x,z)=>{ const n=E.fbm(x*.03,z*.03,2); return [.38+.05*n,.47+.05*n,.3+.04*n]; },[-75,75,-55,55]);
      B(0,-.02,-11,2800,.04,9,ASP); B(-200,-.02,200,9,.04,800,ASP); B(260,-.02,0,10,.04,2800,ASP);
      const tr=[]; for(const it of E.scatter(-900,900,-900,900,15,()=>0,(x,z)=>!(Math.abs(x)<95&&Math.abs(z)<75)&&!(Math.abs(z+11)<10)&&!(Math.abs(x-260)<14)&&!(Math.abs(x+200)<12&&z>-200)&&(x<-160||E.r()<.32),()=>9+E.r()*7,(x)=>x<-160?(E.r()<.7?1:2):0)) tr.push(it); E.forest(tr,{trunks:true});
      const bl=[]; for(let x=-700;x<700;x+=34) for(let z=-700;z<700;z+=30){ const xx=x+(E.r()-.5)*8, zz=z+(E.r()-.5)*8; if(xx<-150) continue; if(Math.abs(xx)<120&&Math.abs(zz)<95) continue; if(Math.abs(zz+11)<14||Math.abs(xx-260)<16) continue; if(E.r()<.45) continue; bl.push([xx,zz,12+E.r()*14,10+E.r()*6,7+E.r()*8,['#e3dccd','#d9cdb6','#cfc2aa','#e8e3d8','#c9b9a0'][Math.floor(E.r()*5)]]); } BLK(bl);
    });
    tidy(1);
  }});
