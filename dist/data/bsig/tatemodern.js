__bsigFill({"tatemodern":function(K){
// 출처: 영문 위키백과 「Tate Modern」 — 뱅크사이드 발전소(자일스 길버트 스콧, 1947~1963 2단계 건설, 1981 폐쇄), 굴뚝 99 m, 길이 200 m, 2000.5.11 개관, 확장동 2016.6.17 개관·높이 65 m·11개 층(0~10)·벽돌 격자(처음 계획한 유리 계단형 피라미드를 벽돌로 바꿈)·2017 블라바트닉 빌딩으로 개명, 세인트 폴 맞은편·밀레니엄 브리지
// 추정: 터빈 홀 152 m × 35 m × 폭 24 m(널리 쓰이는 값, 이 출처엔 없음), 갤러리 동 깊이 30 m·높이 33 m, 빛의 띠 높이 7 m, 굴뚝 단면 10 m, 블라바트닉 동 평면 꼭짓점·비틀림, 창 띠 위치, 강 폭 250 m·다리 상판 높이 10 m, 세인트 폴(111 m) 위치, 주변 블록
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
    const brickTex=(key,base,holes)=>TX.mk(TX.tex(key,512,(g,N,rr)=>{ g.fillStyle=holes?'#4a3a30':'#5d3f30'; g.fillRect(0,0,N,N); const bw=N/18, bh=N/54; for(let j=0;j<54;j++){ const off=(j%2)*bw/2; for(let i=-1;i<19;i++){ if(holes&&(j%2)&&(i%2)) continue; const c=(rr()-.5)*34, b=base; g.fillStyle=`rgb(${b[0]+c|0},${b[1]+c*.7|0},${b[2]+c*.55|0})`; g.fillRect(i*bw+off+1,j*bh+1,bw-2,bh-1.5); } } for(let k=0;k<1500;k++){ g.fillStyle=rr()<.5?'rgba(255,240,220,.05)':'rgba(20,10,5,.06)'; g.fillRect(rr()*N,rr()*N,2,2); } }),4,{roughness:.9});
    const BR=brickTex('eu_tatebr',[128,82,58]), BR2=brickTex('eu_tatebr2',[112,72,52]), LAT=brickTex('eu_tatelat2',[150,108,80],1);
    const GLD=K.col(0x2d3a42,{roughness:.06,metalness:.72}), FR=K.col(0x2c2e30,{roughness:.5,metalness:.4}), BEAM=K.col(0xd3dfd8,{roughness:.25,metalness:.15,transparent:true,opacity:.86}), BEAMF=K.col(0x9aa4a2,{roughness:.4,metalness:.5});
    const PAV=K.col(0xa59d90,{roughness:.95}), LAWN=K.col(0x7f9a5a,{roughness:1}), CONC=K.col(0xb7b2a8,{roughness:.9});
    const brk={th:.6,frame:FR,glass:GLD,fw:.08};
    // 바닥: 마당·산책로(강 쪽 +z)
    B(0,-.2,10,230,.2,140,PAV); B(0,-.15,49,180,.18,12,LAWN);
    // ---- 갤러리 동(옛 보일러 하우스, 강 쪽): 벽돌 · 키 큰 세로 창 무리 ----
    const tall=[]; for(const s of [-1,1]) for(let k=0;k<6;k++){ const c=s*(22+k*12.5); tall.push([c-3.6,c-2],[c-.8,c+.8],[c+2,c+3.6]); } tall.sort((a,b)=>a[0]-b[0]);
    vol(-100,100,10,40,0,33,BR,{s:[[[1.2,4.8],[7,29.5]],tall],n:[[[22,29]],stepCols(-96,96,1.6,6,2)],e:[[[7,29.5]],[[14,16],[24,26],[34,36]]],w:[[[7,29.5]],[[14,16],[24,26],[34,36]]]},brk);
    B(0,33,25,200.4,.5,30.4,BR2); B(0,33.5,25,199,.08,29,K.col(0x6f6a64,{roughness:.95}));
    // 빛의 띠(지붕 위 2개 층 반투명 유리 상자) + 가로 틀
    B(0,33.5,25,170,7,15,BEAM); for(const y of [33.5,36.9,40.4]) B(0,y,25,170.3,.25,15.3,BEAMF); for(let x=-85;x<=85.1;x+=5) for(const z of [17.4,32.6]) B(x,33.5,z,.12,7,.12,BEAMF);
    // 굴뚝(가운데, 강 쪽으로 약간 돌출): 단 진 밑동 · 세로 홈 · 꼭대기 반투명 '스위스 라이트'
    B(0,0,40.8,26,38,3.2,BR2); for(let x=-11;x<=11;x+=2.2) B(x,4,42.45,.9,32,.15,K.col(0x4a3226,{roughness:.9}));
    B(0,0,38,12,99,10,BR); B(0,38,38,12.8,1.2,10.8,BR2); B(0,70,38,12.6,.8,10.6,BR2);
    for(const [x,z,w,d] of [[-6.05,38,.2,10],[6.05,38,.2,10],[0,43.05,12,.2],[0,32.95,12,.2]]) for(let k=-2;k<=2;k++) B(x+(w<1?0:k*2.2),40,z+(d<1?0:k*2),w<1?.24:.5,58,d<1?.24:.5,K.col(0x4f3527,{roughness:.9}));
    B(0,93,38,11,6,9,K.col(0xe8ecd8,{roughness:.35,emissive:0xd6e8b0,emissiveIntensity:.15,transparent:true,opacity:.92}));
    // 1층 강 쪽 입구 · 캐노피
    for(const x of [-30,30]) B(x,3.6,41.6,14,.3,3,K.col(0x3a3d40,{roughness:.6}));
    flush();
    // ---- 1: 터빈 홀(가운데 띠) — 벽돌 · 지붕 천창 · 서쪽 경사로 ----
    K.layer(1);
    vol(-100,100,-14,10,0,35,BR2,{w:[[[3,33]],[[-12,8]]],e:[[[8,30]],[[-8,4]]],n:[[[18,31]],stepCols(-96,96,2,8,2)]},brk);
    B(0,35,-2,200.4,.4,24.4,BR); flush(); K.roofGable(0,35.4,-2,190,12,3.2,K.col(0x9fb3bb,{roughness:.08,metalness:.55}),'x');
    for(let x=-95;x<=95.1;x+=5) B(x,35.4,-2,.18,2.9,13.4,FR);
    // 서쪽 경사로(터빈 홀로 내려감)
    { const g=new T.PlaneGeometry(40,20); g.rotateX(-Math.PI/2); const p=g.attributes.position; for(let i=0;i<p.count;i++){ const x=p.getX(i); p.setY(i,-.02-Math.max(0,(x+20)/40)*.01); } g.computeVertexNormals(); g.translate(-120,0,-2); Q(CONC,g); }
    flush();
    // ---- 2: 블라바트닉 동 — 비틀린 피라미드 · 벽돌 격자 · 창 띠 · 10층 전망대 ----
    K.layer(2);
    { const P0=[[-8,-14],[48,-14],[55,-40],[30,-70],[-5,-62],[-14,-36]], P1=[[6,-27],[36,-23],[40,-41],[25,-57],[4,-52],[-1,-38]], HT=64.5; const n=P0.length;
      const at=(i,v)=>{ const a=P0[i%n], b=P1[i%n]; return [a[0]+(b[0]-a[0])*v,a[1]+(b[1]-a[1])*v]; };
      let acc=0; for(let i=0;i<n;i++){ const L=Math.hypot(P0[(i+1)%n][0]-P0[i][0],P0[(i+1)%n][1]-P0[i][1]); const u0=acc/4; acc+=L;
        S(LAT,(u,v)=>{ const a=at(i,v), b=at(i+1,v); const x=a[0]+(b[0]-a[0])*u, z=a[1]+(b[1]-a[1])*u; return [x,v*HT,z,u0+u*L/4,v*HT/4]; },6,12);
        for(const [v0,v1] of [[.355,.41],[.885,.935],[.03,.1]]) S(GLD,(u,v)=>{ const vv=v0+(v1-v0)*v; const a=at(i,vv), b=at(i+1,vv); const cx=(a[0]+b[0])/2, cz=(a[1]+b[1])/2; const x=a[0]+(b[0]-a[0])*u, z=a[1]+(b[1]-a[1])*u; const nx=(b[1]-a[1]), nz=-(b[0]-a[0]); const nl=Math.hypot(nx,nz)||1; return [x+nx/nl*.12,vv*HT,z+nz/nl*.12]; },4,1); }
      // 안쪽 코어(격자 뒤 어두운 벽)
      for(let k=0;k<11;k++){ const v=k/11; const pts=[]; for(let i=0;i<n;i++){ const a=at(i,v+.045); const c=at(i,v+.045); pts.push([a[0]+(20-a[0])*.04,a[1]+(-40-a[1])*.04]); } K.ex(pts,HT/11-.02,K.col(0x5a4a40,{roughness:.9}),[0,v*HT,0]); }
      const top=P1.map(p=>[p[0],p[1]]); K.ex(top,.6,K.col(0x7b7570,{roughness:.9}),[0,HT,0]);
      for(let i=0;i<n;i++){ const a=P1[i], b=P1[(i+1)%n]; const L=Math.hypot(b[0]-a[0],b[1]-a[1]); B((a[0]+b[0])/2,HT+.6,(a[1]+b[1])/2,L,1.1,.06,K.col(0x9fb0b6,{roughness:.1,metalness:.4,transparent:true,opacity:.45,depthWrite:false}),-Math.atan2(b[1]-a[1],b[0]-a[0])); } }
    flush();
    // ---- 배경(K.life): 템스강 · 퀸스 워크 · 밀레니엄 브리지 · 세인트 폴 · 시티 · 사우스워크 ----
    LIFE(()=>{
      E.terrain(-1600,1600,-1500,1600,70,70,(x,z)=>z>58&&z<318?-3:0,(x,z)=>{ const n=E.fbm(x*.04,z*.04,2); return [.5+.03*n,.49+.03*n,.47+.03*n]; },[-118,118,-80,58]);
      const wg=new T.PlaneGeometry(3200,262); wg.rotateX(-Math.PI/2); wg.translate(0,-1.1,188); const wm=new T.Mesh(wg,E.WATER); wm.receiveShadow=false; K.life.add(wm);
      for(const z of [58.5,317.5]) B(0,-3,z,3200,3.1,1.2,CONC);
      B(0,0,64,3200,.06,10,PAV);
      // 밀레니엄 브리지: 상판 4 m, 낮게 처진 옆 케이블, Y자 교각 2
      { const AL=K.col(0xc9cdd0,{roughness:.3,metalness:.6}); const zb=z=>9.5+((z-58)/(380-58))*1.5;
        for(let z=58;z<380;z+=8) B(0,zb(z),z+4,4.2,.6,8.1,AL);
        for(const sx of [-1,1]){ const pts=[]; for(let z=58;z<=380;z+=4){ const piers=[150,290]; let sag=0; const segs=[[58,150],[150,290],[290,380]]; for(const [a,b] of segs) if(z>=a&&z<=b){ const t=(z-a)/(b-a); sag=-2.2*Math.sin(t*Math.PI); } pts.push(new T.Vector3(sx*3.6,zb(z)+2.8+sag,z)); } Q(AL,new T.TubeGeometry(new T.CatmullRomCurve3(pts),160,.18,5,false)); for(let z=62;z<378;z+=12) B(sx*2.6,zb(z)+.5,z,2.2,.16,.4,AL); for(let z=58;z<=380;z+=3) B(sx*2.2,zb(z)+.6,z,.05,1.1,.05,AL); }
        for(const z of [150,290]){ B(0,-3,z,2.4,9.2,4.5,K.col(0x9a9c9e,{roughness:.6,metalness:.3})); for(const sx of [-1,1]) rod([0,6,z],[sx*4,zb(z)+2.6,z],.4,AL,6); } }
      // 강 건너(북): 세인트 폴 대성당(돔 111 m) · 시티 블록
      { const SP=K.col(0xd8d3c6,{roughness:.9}), DOM=K.col(0x8f9895,{roughness:.6,metalness:.3}); const cx=30, cz=640;
        B(cx,0,cz,52,24,150,SP); B(cx,0,cz,110,24,34,SP); for(const s of [-1,1]) B(cx+s*14,24,cz+72,10,40,10,SP); C(cx,24,cz,20,24,SP,24); C(cx,48,cz,22,3,SP,24); { const g=new T.SphereGeometry(17,24,12,0,Math.PI*2,0,Math.PI/2); g.scale(1,1.35,1); g.translate(cx,51,cz); Q(DOM,g); } C(cx,73,cz,3,12,SP,12); C(cx,85,cz,.8,26,DOM,8,.2); }
      const bl=[], rf=[]; for(let x=-1500;x<1500;x+=40) for(let z=-1400;z<1500;z+=40){ const xx=x+(E.r()-.5)*8, zz=z+(E.r()-.5)*8; if(zz>50&&zz<330) continue; if(Math.abs(xx)<135&&zz>-95&&zz<60) continue; if(Math.abs(xx)<14&&zz>330&&zz<560) continue; if(Math.abs(xx-30)<80&&Math.abs(zz-640)<95) continue; if(zz>-300&&zz<50&&xx>-260&&xx<-60&&E.r()<.5) continue; if(E.r()<.25) continue; const north=zz>330; const h=north?(16+E.r()*22+(xx>500&&E.r()<.25?60+E.r()*90:0)):(10+E.r()*16); const gl=north&&h>45; bl.push([xx,zz,24+E.r()*12,22+E.r()*12,h,gl?['#9fb1bc','#b3c2ca','#8ea2ae'][Math.floor(E.r()*3)]:['#b9a48e','#a58a72','#cdbfae','#d8cfc0','#8f7563'][Math.floor(E.r()*5)]]); } BLK(bl);
      const tr=[]; for(let x=-100;x<=100;x+=7) for(const z of [44,48,52]) if(Math.abs(x)>8) tr.push([x+(E.r()-.5)*3,0,z+(E.r()-.5)*2,9+E.r()*3,0,.95]); for(let x=-500;x<=500;x+=13) if(Math.abs(x)>120) tr.push([x,0,62,10,0]); E.forest(tr,{pal:[['#8aa262','#9bb16c','#7c955a','#a5b97a']]});
    });
    tidy(1);
  }});
