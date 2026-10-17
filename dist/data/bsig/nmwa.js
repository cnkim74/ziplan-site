__bsigFill({"nmwa":function(K){
// 사실: 르 코르뷔지에 설계(실시 설계·감리 마에카와 구니오·사카쿠라 준조·요시자카 다카마사) · 1959 개관 · 필로티(소나무 거푸집 콘크리트 기둥) · 외벽은 구조와 분리된 걸어 단 프리캐스트 패널 · 정사각 평면, 가운데 19세기 홀과 나선형으로 올라가는 전시 동선(무한성장 미술관) · 모듈러로 기둥 간격·앞마당 치수 결정 · 2016 세계유산 · 1979 신관(마에카와 구니오), 1997 기획전시관(지하)
// 출처: 국토교통성 관광청 다언어 해설 「国立西洋美術館本館」 · ArchJourney 「The National Museum of Western Art」(프리캐스트 패널·정사각 평면·경사로·채광)
// 추정: 본관 44.45 m(6.35 m × 7칸) 정사각, 1층 높이 5 m, 2층 전시실 높이 6.6 m, 지붕 채광탑 크기·높이, 2층 앞 발코니, 신관 크기·위치, 도쿄 문화회관·공원 숲 배치
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
    K.layer(0); E.own();
    const G=6.35, NB=7, W=G*NB, H1=5.0, H2=6.6, TOP=H1+H2;
    // 자갈 박은 프리캐스트 판: 회녹색 바탕 + 작은 자갈 + 판 줄눈(가로 1.6 × 세로 .8 m 추정) — 512 px = 3.2 m
    const PB=TX.mk(TX.tex('nmwapeb',512,(g,N,rr)=>{ g.fillStyle='#7c8478'; g.fillRect(0,0,N,N); const cs=['#5f6a5c','#949b8e','#6e7a6a','#4e574b','#a4a89b','#78846f','#8a9586']; for(let k=0;k<9000;k++){ g.fillStyle=cs[Math.floor(rr()*cs.length)]; const x=rr()*N,y=rr()*N,r=1+rr()*2.6; g.beginPath(); g.ellipse(x,y,r,r*.75,rr()*3,0,7); g.fill(); } g.fillStyle='rgba(50,54,48,.55)'; for(let i=0;i<=2;i++) g.fillRect(i*N/2-1.5,0,3,N); for(let j=0;j<=4;j++) g.fillRect(0,j*N/4-1.5,N,3); }),3.2,{roughness:.95});
    const CON=TX.ando('nm','#c6c2b9'), CON2=TX.ando('nm2','#b3afa6'), PAV=K.col(0xbdb6aa,{roughness:.95}), PAVJ=K.col(0x8e877b,{roughness:.95}), FR=K.col(0x2f3235,{roughness:.5,metalness:.5}), GLW=K.col(0x2f3c44,{roughness:.06,metalness:.75}), GLL=K.col(0xa9c6d0,{roughness:.04,metalness:.4,transparent:true,opacity:.42,depthWrite:false}), BRZ=K.col(0x3b3326,{roughness:.45,metalness:.7}), STN=K.col(0x9b958a,{roughness:.9}), WH=K.col(0xe9e6df,{roughness:.8});
    // 대지: 앞마당(+z) 포장 — 모듈러 줄눈(2.26/1.13 m), 본관 아래 바닥
    B(0,-.25,10,96,.25,100,PAV);
    { const items=[]; for(let x=-46;x<=46;x+=2.26) items.push([x,0,40,0,.06,.02,36]); for(let z=23;z<=58;z+=2.26) items.push([0,0,z,0,92,.02,.06]); inst(boxG(1,1,1),PAVJ,items,false); }
    // 1층: 필로티 기둥(격자 둘레·안쪽) + 안으로 들인 유리벽(앞 2칸, 옆 1칸 들임)
    const xs=[]; for(let i=0;i<=NB;i++) xs.push(-W/2+i*G);
    { const items=[]; for(const x of xs) for(const z of xs){ const inner=Math.abs(x)<W/2-.1&&Math.abs(z)<W/2-.1; if(!inner&&!(z>W/2-2*G-.1)) continue; items.push([x,0,z,0,1,1,1]); } inst(cylG(.3,H1,14,.3),CON,items); }
    const gx0=-W/2+G, gx1=W/2-G, gz0=-W/2, gz1=W/2-2*G; // 유리로 감싼 1층 영역
    B(0,0,(gz0+gz1)/2,gx1-gx0,.12,gz1-gz0,K.col(0x8d8a84));
    for(const [x,z,w,d] of [[0,gz1,gx1-gx0,.06],[gx0,(gz0+gz1)/2,.06,gz1-gz0],[gx1,(gz0+gz1)/2,.06,gz1-gz0]]) B(x,0,z,w,H1-.4,d,GLW);
    { const items=[]; for(let x=gx0;x<=gx1+.01;x+=G/3) items.push([x,0,gz1+.05,0,1,1,1]); for(let z=gz0;z<=gz1+.01;z+=G/3){ items.push([gx0-.05,0,z,0,1,1,1]); items.push([gx1+.05,0,z,0,1,1,1]); } inst(boxG(.1,H1-.4,.12),FR,items); }
    B(0,H1-.4,gz1,gx1-gx0,.4,.25,CON2); B(0,0,gz1+.2,7,2.6,.1,GLW); // 입구 문
    // 1층 뒤쪽(-z) 벽 일부 · 계단실 매스(추정)
    B(0,0,-W/2+.15,W,H1,.3,CON2);
    flush();
    // ---- 1: 2층 전시실 상자(자갈 판 외벽) ----
    K.layer(1);
    B(0,H1-.6,0,W+.2,.6,W+.2,CON); // 2층 바닥판(필로티 위 처마)
    for(const [x,z,w,d] of [[0,W/2-.2,W,.4],[0,-W/2+.2,W,.4],[W/2-.2,0,.4,W],[-W/2+.2,0,.4,W]]) B(x,H1,z,w,H2,d,PB);
    // 앞면: 2층 왼쪽에 깊이 판 발코니(난간 + 유리) — 추정
    { const bx0=-W/2+G*1.5, bw=G*2; B(bx0,H1,W/2+.05,bw,H2,.12,GLW); B(bx0,H1,W/2+1.4,bw+.4,.25,2.8,CON); B(bx0,H1+.25,W/2+2.75,bw+.4,1.0,.12,CON2); for(const s of [-1,1]) B(bx0+s*(bw/2+.1),H1,W/2+1.4,.3,H2,2.8,PB); }
    // 옆면 가로 창 띠(전시실 아래 낮은 창 — 추정)
    for(const s of [-1,1]) B(s*(W/2+.05),H1+.4,0,.08,.9,W-2*G,GLW);
    // 2층 바닥 안: 19세기 홀(가운데 2 × 2칸 빈 곳 · 경사로)
    B(0,H1-.6,0,G*2,.62,G*2,K.col(0x6f6c66));
    { const gs=[]; for(let i=0;i<16;i++){ const t=i/16; gs.push(bx(-G*.6,t*H1,-G+.3+t*2*G-.3,1.6,.18,2*G/16+.05)); } for(const g of gs) Q(CON2,g); }
    flush();
    // ---- 2: 지붕 · 삼각 채광탑 · 나선 채광 띠 ----
    K.layer(2);
    B(0,TOP,0,W+.2,.5,W+.2,CON); B(0,TOP+.5,0,W+.3,.6,.3,CON2);
    for(const [x,z,w,d] of [[0,W/2,W+.3,.3],[0,-W/2,W+.3,.3],[W/2,0,.3,W+.3],[-W/2,0,.3,W+.3]]) B(x,TOP+.5,z,w,.6,d,CON2);
    // 19세기 홀 위 삼각 채광탑(밑변 약 9 m, 높이 4.2 m — 추정): 유리 경사면 + 콘크리트 테
    { const a=G*1.45, h=4.2; const P=[[-a,a*.7],[a,a*.7],[0,-a*.95]]; const top=[0,TOP+.5+h,a*.15];
      for(let i=0;i<3;i++){ const p=P[i], q=P[(i+1)%3]; const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute([p[0],TOP+.5,p[1],q[0],TOP+.5,q[1],top[0],top[1],top[2]],3)); g.computeVertexNormals(); const m=new T.Mesh(g,K.col(0x9fb9c2,{roughness:.05,metalness:.6,side:T.DoubleSide})); put(m); }
      for(let i=0;i<3;i++){ const p=P[i], q=P[(i+1)%3]; const L=Math.hypot(q[0]-p[0],q[1]-p[1]); B((p[0]+q[0])/2,TOP+.5,(p[1]+q[1])/2,L,.5,.5,CON2,-Math.atan2(q[1]-p[1],q[0]-p[0])); }
      const cur=(p)=>{ const pts=[new T.Vector3(p[0],TOP+.6,p[1]),new T.Vector3(top[0],top[1],top[2])]; Q(FR,new T.TubeGeometry(new T.CatmullRomCurve3(pts),2,.12,5,false)); }; P.forEach(cur); }
    // 채광 띠(전시실 위 길쭉한 톱라이트 4개, 바람개비 배치 — 추정)
    for(const [x,z,w,d] of [[-G*.5,-G*2.1,G*3.2,1.6],[G*2.1,-G*.5,1.6,G*3.2],[G*.5,G*2.1,G*3.2,1.6],[-G*2.1,G*.5,1.6,G*3.2]]){ B(x,TOP+.5,z,w,1.3,d,CON2); B(x,TOP+1.8,z,w+.3,.2,d+.3,CON); B(x,TOP+.9,z+(d<2?d/2+.02:0),d<2?w-.4:.05,.8,d<2?.05:w-.4,GLW); }
    B(W/2-G*1.2,TOP+.5,-W/2+G*1.2,4,2.4,5,CON2); // 옥탑 설비(추정)
    flush();
    // ---- 0: 신관(1979, 마에카와 — 갈색 타일 · 뒤쪽) · 앞마당 조각 ----
    K.layer(0);
    { const TIL=TX.mk(TX.tex('nmwatile',256,(g,N,rr)=>{ g.fillStyle='#5e4637'; g.fillRect(0,0,N,N); for(let j=0;j<16;j++) for(let i=0;i<8;i++){ const c=(rr()-.5)*30; g.fillStyle=`rgb(${120+c|0},${84+c*.8|0},${62+c*.6|0})`; g.fillRect(i*32+(j%2)*16+1,j*16+1,30,14); } }),1.6,{roughness:.85});
      B(-6,0,-44,40,10.5,26,TIL); B(-6,10.5,-44,40.4,.5,26.4,CON2); B(-6,1.2,-30.9,30,2.2,.1,GLW); B(-6,0,-31.2,12,.6,.6,CON2); B(-6,.5,-31,40,.08,.1,FR); }
    // 「지옥의 문」(높이 약 6.35 m) — 앞마당 동쪽 · 「생각하는 사람」 · 「칼레의 시민」
    { const x=14, z=36; B(x,0,z,6.6,.6,2.2,STN); B(x,.6,z,4.0,6.0,1.0,BRZ); B(x,6.6,z,4.6,.6,1.2,BRZ); for(const s of [-1,1]) B(x+s*2.2,.6,z,.5,6.6,1.2,BRZ); B(x,.6,z+.55,3.0,4.6,.1,K.col(0x2c261c,{roughness:.6,metalness:.6})); }
    { const x=-12, z=33; B(x,0,z,1.6,2.4,1.6,STN); B(x,2.4,z,.9,1.3,.9,BRZ); C(x,3.7,z+.1,.32,.4,BRZ,8); }
    { const x=-20, z=44; B(x,0,z,4.6,.5,3.2,STN); for(let i=0;i<6;i++) C(x-1.8+(i%3)*1.8,.5,z-.7+Math.floor(i/3)*1.4,.3,2.1,BRZ,7,.25); }
    // 앞마당 둘레 낮은 화단·나무(느티나무)
    for(const x of [-44,44]) tree(x,0,54,9);
    B(0,0,58.5,96,.5,1.2,STN);
    flush();
    // ---- 배경(K.life): 우에노 공원 — 큰 나무 숲, 동쪽 도쿄 문화회관(마에카와 1961, 깊은 처마), 남쪽 공원 길, 멀리 시가 ----
    LIFE(()=>{
      const LOT=[-48,48,-60,60];
      E.terrain(-1400,1400,-1400,1400,70,70,()=>0,(x,z)=>{ const n=E.fbm(x*.04,z*.04,2); const road=Math.abs(z-78)<9||Math.abs(x-62)<7; if(road) return [.55,.55,.53]; return [.42+.05*n,.5+.05*n,.34+.03*n]; },LOT);
      B(0,.03,78,2800,.05,16,K.col(0xc4bdb1,{roughness:.95})); B(62,.03,0,12,.05,2800,K.col(0xc4bdb1,{roughness:.95}));
      // 도쿄 문화회관(동쪽): 낮은 콘크리트 상자 + 위로 휘어 오른 깊은 처마(개략)
      { const x=120, z=20; B(x,0,z,70,12,60,CON2); B(x,12,z,80,1.4,70,CON); S(CON,(u,v)=>{ const xx=x-40+80*u; return [xx,13.4+v*4+3*Math.pow(Math.abs(u-.5)*2,2),z+35-v*3]; },20,2); B(x,0,z+30.2,60,9,.1,GLW); }
      // 공원 숲(큰 활엽수·벚나무)
      E.forest(E.scatter(-1300,1300,-1300,1300,13,()=>0,(x,z)=>{ if(x>-55&&x<55&&z>-65&&z<64) return false; if(Math.abs(x)<90&&z>0&&z<260) return false; if(Math.abs(z-78)<12||Math.abs(x-62)<10) return false; if(x>78&&x<165&&z>-15&&z<60) return false; const d=Math.hypot(x,z); return d<420||E.r()<.25; },()=>13+E.r()*7,()=>E.r()<.15?2:0),{trunks:true});
      // 멀리 시가(남·동)
      const BL=[]; for(let x=-1300;x<1300;x+=40) for(let z=450;z<1300;z+=40){ if(E.r()<.3) continue; BL.push([x,z,22+E.r()*12,20+E.r()*12,12+E.r()*34,E.r()<.5?'#b4b2ad':'#9a9ea3']); } BLK(BL);
    });
    tidy(1);
  }});
