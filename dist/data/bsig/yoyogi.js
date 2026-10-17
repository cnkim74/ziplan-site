__bsigFill({"yoyogi":function(K){
// 사실: 단게 겐조 설계 · 구조 쓰보이 요시카쓰·이노우에 우이치 · 1964 도쿄 올림픽(제1 수영, 제2 농구) · 제1체육관: 콘크리트 주탑 2개 높이 약 40 m, 간격 126 m, 주 케이블 지름 33 cm, 건물 높이 40.37 m · 제2체육관: 기둥 하나 현수 지붕, 높이 42.29 m · 대지 91,000 ㎡, 연면적 34,204 ㎡ · 평면은 어긋난 두 반원(입구는 오목한 쪽)
// 출처: ArchEyes 「Yoyogi National Gymnasium / Kenzo Tange」(40 m 주탑·126 m·33 cm·40.37/42.29 m·91,000 ㎡) · Architecture Lab(주 케이블 약 126 m)
// 추정: 반원 반지름 60 m·어긋남 6 m, 객석 테두리 높이 9~16 m, 등선 최저 27 m, 앵커 블록 위치(주탑 밖 40 m), 제2체육관 지름 66 m·테두리 높이 9 m, 두 체육관 배치·광장 기단 크기, 주변 숲·도시 블록은 개략
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
    // ---- 재질 ----
    const CON=TX.ando('yy','#bdb8ae'), CON2=TX.ando('yy2','#a9a59c'), PAV=K.col(0xc3bdb2,{roughness:.95}), PAV2=K.col(0x9d978c,{roughness:.95}), DK=K.col(0x2b2e31,{roughness:.6}), CAB=K.col(0x3a3d40,{roughness:.45,metalness:.6});
    const GLW=K.col(0x34444e,{roughness:.06,metalness:.75}), GLS=K.col(0xb9d4de,{roughness:.04,metalness:.45,transparent:true,opacity:.45,depthWrite:false,side:T.DoubleSide}), FR=K.col(0x3d4146,{roughness:.5,metalness:.5});
    // 지붕: 법랑 강판 — 매단 케이블 방향으로 이음 줄(1.5 m 간격) + 판 이음(가로)
    const RT=TX.tex('yyroof',512,(g,N,rr)=>{ g.fillStyle='#6d7276'; g.fillRect(0,0,N,N); for(let i=0;i<16;i++){ const v=(rr()-.5)*18; g.fillStyle=`rgba(${v>0?255:0},${v>0?255:0},${v>0?255:0},${Math.abs(v)/160})`; g.fillRect(i*N/16,0,N/16,N); } g.fillStyle='rgba(40,44,48,.75)'; for(let i=0;i<16;i++) g.fillRect(i*N/16,0,3,N); g.fillStyle='rgba(40,44,48,.35)'; for(let j=0;j<8;j++) g.fillRect(0,j*N/8,N,2); for(let k=0;k<1800;k++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.05)':'rgba(20,20,20,.06)'; g.fillRect(rr()*N,rr()*N,2,2); } });
    const ROOF=TX.mk(RT,24,{roughness:.42,metalness:.45,side:T.DoubleSide}); const ROOFU=K.col(0x5d6266,{roughness:.6,side:T.DoubleSide});
    // ---- 제1체육관 기하 ----
    const R=60, s=6, XM=63, HM=40;
    const yc=x=>{ const a=Math.min(1,Math.abs(x)/XM); return 27+11.2*a*a; }; // 등선(주 케이블) 높이
    const zr=(x,side)=>{ const c=side<0?s:-s; const d=R*R-(x-c)*(x-c); return d>0?Math.sqrt(d):0; }; // side -1: 북(-z), +1: 남(+z)
    const yr0=x=>9+5*Math.pow(Math.min(1,Math.abs(x)/66),3); const yrS=(x,side)=>{ const w=Math.min(1,zr(x,side)/R); const xc=Math.max(-XM,Math.min(XM,x)); return yr0(x)+(yc(xc)-2-yr0(x))*Math.pow(1-w,2.2); }; const yr=x=>yr0(x); // 객석 테두리 높이 — 뾰족한 끝으로 갈수록 등선 쪽으로 휘어 오름
    const x0s=side=>side<0?s-R:-s-R, x1s=side=>side<0?s+R:-s+R;
    // 땅: 광장 기단 + 포장
    B(20,-.3,15,280,.3,230,PAV2);
    // 객석 콘크리트 몸체: 테두리 아래 비스듬한 벽(바닥에서 4 m 안쪽 → 테두리) + 바닥 유리 띠
    for(const side of [-1,1]){ const xa=x0s(side)+.5, xb=x1s(side)-.5;
      S(CON,(u,v)=>{ const x=xa+(xb-xa)*u; const z=zr(x,side)*side; const k=v; const zin=z*(1-.08)-side*1.2; const yy=3.6+(yrS(x,side)-1.3-3.6)*k; const zz=zin+(z-zin)*k; return [x,yy,zz,x/3.6,yy/3.6]; },60,4);
      S(GLW,(u,v)=>{ const x=xa+(xb-xa)*u; const z=zr(x,side)*side; const zin=z*(1-.08)-side*1.2; return [x,v*3.6,zin+side*.1]; },60,1);
      // 테두리 보(두께 1.3 m, 바깥으로 살짝 내민 띠)
      S(CON2,(u,v)=>{ const x=xa+(xb-xa)*u; const z=zr(x,side)*side; return [x,yrS(x,side)-1.3+v*1.3,z+side*.3]; },80,1);
      // 바닥 유리 띠 멀리언
      { const items=[]; for(let x=xa+3;x<xb-3;x+=3.2){ const z=zr(x,side)*side; const zin=z*(1-.08)-side*1.2; items.push([x,0,zin+side*.18,0,1,1,1]); } inst(boxG(.14,3.6,.14),FR,items); }
      // 객석 바닥판(안쪽, 지붕을 들면 보임): 경사 계단 객석
      S(CON2,(u,v)=>{ const x=xa+6+(xb-xa-12)*u; const z=zr(x,side)*side; const zz=z*(.25+.65*v); return [x,1+v*(yr(x)-4),zz]; },30,6);
    }
    // 경기장 바닥(수영장 자리 → 지금은 경기장 마루)
    B(0,0,0,92,.4,30,K.col(0xb48a5c,{roughness:.7}));
    // 입구: 뾰족한 끝 아래 오목한 곳 — 유리 벽 + 차양(동·서)
    for(const sx of [-1,1]){ const xe=sx*(R-s-2), side=sx>0?1:-1; // 동쪽은 남측이 오목, 서쪽은 북측이 오목
      const zc=side*12; B(xe,0,zc,1.2,6.2,22,GLW); for(let k=-10;k<=10;k+=2.5) B(xe+sx*.1,0,zc+k,.2,6.2,.15,FR); B(xe+sx*3,6.2,zc,7,.6,24,CON2); for(let i=0;i<5;i++) B(xe+sx*(6+i*1.2),0,zc,1.2,.18*(5-i),22,PAV); }
    flush();
    // ---- 1: 주탑 · 앵커 블록 ----
    K.layer(1);
    for(const sx of [-1,1]){ const x=sx*XM; C(x,0,0,2.4,HM-2,CON,20,1.7); B(x,HM-2.4,0,3.4,2.4,6.8,CON2); for(const z of [-2.2,2.2]) C(x,HM-.1,z,.6,.5,CAB,10,.6);
      const xa=sx*(XM+42); B(xa,0,0,9,4.5,12,CON); B(xa,4.5,0,6,1.2,9,CON2); }
    // 주 케이블 한 쌍(지름 33 cm → 모형 .5 m로 과장 없이 .4) — 주탑 사이 처짐 + 앵커까지
    const cable=(pts,r)=>{ const cur=new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(p[0],p[1],p[2]))); Q(CAB,new T.TubeGeometry(cur,Math.max(8,pts.length*3),r,6,false)); };
    for(const z of [-2.2,2.2]){ const P=[]; for(let i=0;i<=24;i++){ const x=-XM+2*XM*i/24; P.push([x,yc(x)+.25,z]); } cable(P,.3); for(const sx of [-1,1]) cable([[sx*XM,yc(sx*XM)+.25,z],[sx*(XM+20),HM*.5,z*1.3],[sx*(XM+40),4.6,z*1.5]],.3); }
    flush();
    // ---- 2: 지붕(등선 → 양옆 테두리로 처져 내려오는 면) · 등선 천창 ----
    K.layer(2);
    for(const side of [-1,1]){ const xa=x0s(side), xb=x1s(side);
      const fn=(u,v,dy)=>{ const x=xa+(xb-xa)*u; const z0=side*2.6; const ze=zr(x,side)*side+side*.4; const xc=Math.max(-XM,Math.min(XM,x)); const y0=yc(xc); const ye=yrS(x,side); const z=z0+(ze-z0)*v; const y=ye+(y0-ye)*Math.pow(1-v,1.55)+(dy||0); return [x,y,z,x/24,v*Math.abs(ze-z0)/24]; };
      S(ROOF,(u,v)=>fn(u,v),72,18); S(ROOFU,(u,v)=>fn(u,v,-.35),40,10);
      // 지붕 끝 늘어진 테두리판(물받이)
      S(CON2,(u,v)=>{ const p=fn(u,1); return [p[0],p[1]-.6+v*.6,p[2]]; },72,1); }
    // 끝(주탑 쪽) 뾰족하게 빠지는 등 지붕 꼬리: 주탑까지 이어지는 좁은 판
    for(const sx of [-1,1]){ const xa=sx>0?R-s:-(R-s), xb=sx*XM; S(ROOF,(u,v)=>{ const x=xa+(xb-xa)*u; const w=(1-u)*1.5+2.6; const z=(v-.5)*2*w; return [x,yc(x)-.1*Math.abs(v-.5),z,x/24,v]; },10,4); }
    // 등선 천창: 두 케이블 사이 유리 + 가는 리브
    S(GLS,(u,v)=>{ const x=-XM+2*XM*u; return [x,yc(x)+.05,-2.4+4.8*v]; },48,1);
    { const items=[]; for(let x=-XM+3;x<XM;x+=3) items.push([x,yc(x),0,0,1,1,1]); inst(boxG(.12,.18,4.8),FR,items); }
    flush();
    // ---- 제2체육관(소라 지붕) — 남동쪽 ----
    K.layer(0);
    const GX=112, GZ=72, R2=31, RH2=9, MX=GX-7, MZ=GZ-6, MH=42.29;
    const rim2=a=>{ const t=(((a-.6)%(2*Math.PI))+2*Math.PI)%(2*Math.PI); const tail=Math.max(0,(t-4.9)/1.38); return R2*(1+.28*Math.pow(tail,2)); }; // 한쪽 끝이 바깥으로 감겨 나간 꼬리
    S(CON,(u,v)=>{ const a=u*2*Math.PI; const r=rim2(a); const rin=r-3.5; const y=3.4+(RH2-1.2-3.4)*v; const rr=rin+(r-rin)*v; return [GX+Math.cos(a)*rr,y,GZ+Math.sin(a)*rr,a*r/3.6,y/3.6]; },72,3);
    S(GLW,(u,v)=>{ const a=u*2*Math.PI; const r=rim2(a)-3.4; return [GX+Math.cos(a)*r,v*3.4,GZ+Math.sin(a)*r]; },72,1);
    { const items=[]; for(let i=0;i<60;i++){ const a=i/60*2*Math.PI; const r=rim2(a)-3.3; items.push([GX+Math.cos(a)*r,0,GZ+Math.sin(a)*r,-a,1,1,1]); } inst(boxG(.14,3.4,.14),FR,items); }
    S(CON2,(u,v)=>{ const a=u*2*Math.PI; const r=rim2(a)+.3; return [GX+Math.cos(a)*r,RH2-1.2+v*1.2,GZ+Math.sin(a)*r]; },96,1);
    B(GX,0,GZ,30,.4,22,K.col(0xb48a5c,{roughness:.7}));
    flush();
    K.layer(1); C(MX,0,MZ,1.9,MH-1.5,CON,18,1.4); B(MX,MH-1.6,MZ,2.6,1.6,2.6,CON2); flush();
    K.layer(2);
    // 지붕: 기둥 꼭대기에서 테두리로 처져 내려오는 면 + 나선 주 케이블(기둥에서 감겨 내려와 꼬리 끝 지면으로)
    { const A0=.6; const sp=th=>{ const t=th/(2*Math.PI); const rr=1.2+16*Math.pow(t,1.1); const a=A0+th; return [MX+Math.cos(a)*rr, MH-1.4-(MH-1.4-RH2-3)*Math.pow(t,1.05), MZ+Math.sin(a)*rr]; }; // 나선 주 케이블(기둥 꼭대기 → 한 바퀴 감기며 내려옴)
      const fn=(u,v,dy)=>{ const th=u*2*Math.PI*.985; const a=A0+th; const S0=sp(th); const r=rim2(a); const ex=GX+Math.cos(a)*(r+.4), ez=GZ+Math.sin(a)*(r+.4); const y=RH2+(S0[1]-RH2)*Math.pow(1-v,1.6)+(dy||0); return [S0[0]+(ex-S0[0])*v,y,S0[2]+(ez-S0[2])*v,th*8/24,v]; };
      S(ROOF,(u,v)=>fn(u,v),120,14); S(ROOFU,(u,v)=>fn(u,v,-.3),60,8); S(CON2,(u,v)=>{ const p=fn(u,1); return [p[0],p[1]-.6+v*.6,p[2]]; },120,1);
      // 겹침(나선 시작과 끝 사이 단차) — 유리 입구면
      S(GLS,(u,v)=>{ const a=fn(0,v), b=fn(1,v); return [a[0]+(b[0]-a[0])*.5,b[1]+(a[1]-b[1])*u,a[2]+(b[2]-a[2])*.5]; },6,10);
      { const items=[]; for(let i=1;i<10;i++){ const a=fn(0,i/10), b=fn(1,i/10); items.push([(a[0]+b[0])/2,b[1],(a[2]+b[2])/2,0,1,Math.max(.1,a[1]-b[1]),1]); } inst(boxG(.16,1,.16),FR,items); }
      const P=[]; for(let i=0;i<=40;i++) P.push(sp(i/40*2*Math.PI*.985)); const e=sp(2*Math.PI*.985); const a=A0+2*Math.PI; P.push([e[0]+Math.cos(a)*14,RH2*.5,e[2]+Math.sin(a)*14],[e[0]+Math.cos(a)*24,1.2,e[2]+Math.sin(a)*24]); cable(P,.32);
      { const a=A0+2*Math.PI; B(e[0]+Math.cos(a)*25,0,e[2]+Math.sin(a)*25,6,2.4,6,CON); } }
    flush();
    // ---- 광장 기단(두 체육관을 잇는 낮은 산책 데크·상가) ----
    K.layer(0);
    { const pts=[[30,30],[60,48],[84,58]]; for(const [x,z] of pts){} B(60,0,48,62,4.2,16,CON,-.55); B(60,4.2,48,64,.5,18,CON2,-.55); B(60,.2,48,58,3.4,.2,GLW,-.55); B(60,4.7,48,62,1.05,.25,K.col(0x8f8b84),-.55);
      for(let i=0;i<7;i++){ const t=i/6; B(32+t*56,0,32+t*31,2.2,.15*i+.2,8,PAV,-.55); } }
    B(70,0,38,170,.08,120,PAV,-.2);
    flush();
    // ---- 배경(K.life): 요요기 공원·메이지 신궁 숲(북·서), NHK 방송센터(남서), 시부야 시가(남), 하라주쿠 선로·다리(동) ----
    LIFE(()=>{
      const LOT=[-150,180,-120,130];
      const TR=E.terrain(-1600,1600,-1600,1600,80,80,(x,z)=>.0,(x,z)=>{ const n=E.fbm(x*.03,z*.03,2); const park=(z<-125&&x<420)||(x<-160&&z<200); if(park) return [.34+.05*n,.46+.05*n,.27]; return [.58+.03*n,.58+.03*n,.56]; },LOT);
      const ASP=K.col(0x55585b,{roughness:.95});
      // 길: 남쪽 이노카시라 거리 방향 · 동쪽 메이지 거리 방향(개략)
      B(0,.02,160,3200,.05,16,ASP); B(230,.02,0,16,.05,3200,ASP); B(-200,.02,40,12,.05,3200,ASP);
      // 숲: 요요기 공원 + 메이지 신궁(넓은 활엽·상록 숲)
      E.forest(E.scatter(-1500,420,-1500,-125,14,()=>0,(x,z)=>!(Math.abs(x-230)<12),()=>12+E.r()*8,()=>E.r()<.25?2:0),{trunks:false});
      E.forest(E.scatter(-1500,-160,-125,200,14,()=>0,(x,z)=>!(Math.abs(x+200)<10),()=>12+E.r()*7,()=>E.r()<.25?2:0),{trunks:false});
      // 대지 둘레 느티나무 줄
      E.forest(E.scatter(-150,180,-120,130,9,()=>0,(x,z)=>{ const e=x<-135||x>165||z<-108||z>118; return e; },()=>9+E.r()*4,0),{trunks:true});
      // NHK 방송센터(남서) · 시부야 시가(남·동) — 블록
      const BL=[[-300,120,100,70,30,'#c9c4b9'],[-300,30,60,50,22,'#b9b5ad']]; for(let x=-1400;x<1400;x+=34) for(let z=170;z<1400;z+=34){ const xx=x+(E.r()-.5)*10, zz=z+(E.r()-.5)*10; if(Math.abs(zz-160)<20||Math.abs(xx-230)<20||Math.abs(xx+200)<16||xx<-160&&zz<200) continue; if(xx>-170&&xx<20&&zz<260) continue; const far=Math.hypot(xx,zz)>600, nr=zz<340; BL.push([xx,zz,18+E.r()*12,16+E.r()*12,far?(10+E.r()*30):nr?(5+E.r()*6):(8+E.r()*22),E.r()<.4?'#a9adb2':E.r()<.6?'#c4bfb6':'#8f9399']); }
      for(let x=250;x<1400;x+=34) for(let z=-1400;z<170;z+=34){ const xx=x+(E.r()-.5)*10, zz=z+(E.r()-.5)*10; if(Math.abs(xx-230)<24) continue; BL.push([xx,zz,18+E.r()*12,16+E.r()*12,8+E.r()*22,E.r()<.5?'#b4b2ad':'#9a9ea3']); }
      BLK(BL);
      // JR 야마노테선(동쪽 길 옆) — 선로 띠
      B(262,.05,0,14,.3,3200,K.col(0x7b736a,{roughness:1})); for(const dx of [-3,3]) B(262+dx,.35,0,.12,.12,3200,K.col(0x8a8d90,{metalness:.6,roughness:.4}));
    });
    tidy(1);
  }});
