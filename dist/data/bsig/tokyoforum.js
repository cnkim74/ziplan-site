__bsigFill({"tokyoforum":function(K){
// 사실: 라파엘 비뇰리 설계 · 1989 국제 공모(395개 안, 50여 개국) · 1996 완공 · 유리 홀 높이 60 m, 렌즈형 평면, 유리 2만 5천 ㎡ 이상 · 지붕(약 2만 5천 t)을 기둥 2개가 받침 · 홀 A 5,000석·B 3,000석·C 1,500석·D 600석이 대지 서쪽 가장자리에 · 동쪽은 신칸센 고가 · 대지 6.7 ha
// 출처: austria-architects.com 「Tokyo International Forum」(60 m, 25,000 ㎡ 유리, 기둥 2개, 홀 좌석 수, 6.7 ha, 신칸센 고가) — 유리 홀 길이는 207 m(일반 자료)와 225 m(같은 출처) 두 값이 있어 207 m로 둠
// 추정: 유리 홀 최대 폭 31 m(선로 쪽 12 m + 광장 쪽 19 m), 두 기둥 간격 124 m, 용골 트러스 깊이, 홀 동 각각의 길이·높이·순서, 브리지 위치·층, 광장 폭 30 m, 주변 마루노우치 빌딩 높이·배치
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
    const L2=103.5, WF=12, WB=19, HG=57.5, ROOFT=2.5;
    const zf=x=>WF*Math.max(0,1-Math.pow(x/L2,2)), zb=x=>-WB*Math.max(0,1-Math.pow(x/L2,2)); // 앞(선로 쪽) · 뒤(광장 쪽) 유리면 z
    const STN=TX.mk(TX.tex('tifgran',512,(g,N,rr)=>{ g.fillStyle='#b9b4ab'; g.fillRect(0,0,N,N); for(let k=0;k<9000;k++){ const c=150+rr()*70|0; g.fillStyle=`rgba(${c},${c-3},${c-8},.35)`; g.fillRect(rr()*N,rr()*N,1.6,1.6); } g.fillStyle='rgba(90,86,80,.6)'; for(let i=0;i<=4;i++) g.fillRect(i*N/4-1,0,2,N); for(let j=0;j<=8;j++) g.fillRect(0,j*N/8-1,N,2); }),4.8,{roughness:.7});
    const PAV=TX.mk(TX.tex('tifpav',512,(g,N,rr)=>{ g.fillStyle='#a8a196'; g.fillRect(0,0,N,N); for(let j=0;j<8;j++) for(let i=0;i<8;i++){ const c=(rr()-.5)*24; g.fillStyle=`rgb(${168+c|0},${161+c|0},${150+c|0})`; g.fillRect(i*64+1,j*64+1,62,62); } }),6,{roughness:.9});
    const ALU=K.col(0xc9ccd0,{roughness:.35,metalness:.7}), STL=K.col(0xe6e8ea,{roughness:.4,metalness:.5}), FR=K.col(0x9ea3a8,{roughness:.35,metalness:.7}), GLW=K.col(0x3b4a53,{roughness:.05,metalness:.75}), DK=K.col(0x2e3134,{roughness:.6});
    const GLL=K.col(0xbcd6df,{roughness:.03,metalness:.45,transparent:true,opacity:.3,depthWrite:false,side:T.DoubleSide});
    // 땅: 대지 포장(광장)
    B(0,-.3,-40,240,.3,120,PAV);
    // ---- 유리 홀 1층 바닥 · 유리 벽(앞·뒤 곡면) + 세로 멀리언 + 가로 띠 ----
    B(0,-.02,-3,2*L2-6,.1,WF+WB-4,K.col(0xcfcac2,{roughness:.6}));
    for(const f of [zf,zb]){ S(GLL,(u,v)=>{ const x=-L2+2*L2*u; return [x,v*HG,f(x)]; },64,4);
      const items=[]; for(let x=-L2+4.5;x<L2-3;x+=4.5) items.push([x,0,f(x),0,1,1,1]); inst(boxG(.18,HG,.5),FR,items);
      const hz=[]; for(let y=6;y<HG;y+=6.4) hz.push(y); for(const y of hz){ const P=[]; for(let i=0;i<=40;i++){ const x=-L2+2*L2*i/40; P.push(new T.Vector3(x,y,f(x)+(f===zf?.1:-.1))); } Q(FR,new T.TubeGeometry(new T.CatmullRomCurve3(P),60,.07,4,false)); } }
    // 끝(뾰족한 뱃머리) 기둥
    for(const sx of [-1,1]) C(sx*L2,0,0,.6,HG,ALU,10);
    // 1층 입구 문(광장 쪽)
    for(const x of [-40,0,40]){ B(x,0,zb(x)-.05,8,3.4,.12,GLW); B(x,3.4,zb(x)-1.3,10,.25,2.6,ALU); }
    flush();
    // ---- 1: 기둥 2개 · 용골 트러스 · 내부 경사로·다리 ----
    K.layer(1);
    const XC=62; for(const sx of [-1,1]){ const x=sx*XC; // 기둥: 위아래 가늘고 가운데 굵은 강관(밑·머리 지름 1 m 남짓)
      Q(STL,(()=>{ const pts=[]; for(let i=0;i<=10;i++){ const t=i/10; pts.push(new T.Vector2(.55+1.1*Math.sin(t*Math.PI),t*(HG-9))); } const g=new T.LatheGeometry(pts,16); g.translate(x,0,-2); return g; })()); }
    // 용골: 아래 현(가운데로 처진 곡선) + 가로 늑골(배 밑 모양) + 지붕판
    const ylo=x=>HG-2-10.5*Math.max(0,1-Math.pow(x/(L2-6),2));
    { const P=[]; for(let i=0;i<=40;i++){ const x=-(L2-6)+2*(L2-6)*i/40; P.push(new T.Vector3(x,ylo(x),-2)); } Q(STL,new T.TubeGeometry(new T.CatmullRomCurve3(P),80,.9,8,false)); }
    for(let x=-L2+8;x<L2-6;x+=6.5){ const P=[]; const za=zb(x)+.6, zc=zf(x)-.6; for(let i=0;i<=10;i++){ const t=i/10; const z=za+(zc-za)*t; const y=HG-.3-(HG-.3-ylo(x))*Math.sin(t*Math.PI); P.push(new T.Vector3(x,y,z+(-2-((za+zc)/2))*Math.sin(t*Math.PI)*.0)); } Q(STL,new T.TubeGeometry(new T.CatmullRomCurve3(P),20,.22,5,false)); }
    // 경사로·다리(뒤쪽 유리면을 따라 층마다)
    for(const [y,x0,x1] of [[12,-70,40],[22,-40,70],[32,-60,30],[42,-30,50]]){ const gs=[]; for(let x=x0;x<x1;x+=3){ const z=zb(x)+3.2; gs.push(bx(x,y,z,3.05,.5,4)); gs.push(bx(x,y+.5,z+2,3.05,1.1,.06)); } for(const g of gs) Q(STL,g); }
    flush();
    // ---- 2: 지붕(렌즈 판 + 가운데 채광 띠) ----
    K.layer(2);
    { const sh=new T.Shape(); for(let i=0;i<=40;i++){ const x=-L2+2*L2*i/40; i?sh.lineTo(x,-zf(x)-.3):sh.moveTo(x,-zf(x)-.3); } for(let i=40;i>=0;i--){ const x=-L2+2*L2*i/40; sh.lineTo(x,-zb(x)+.3); } const g=new T.ExtrudeGeometry(sh,{depth:ROOFT,bevelEnabled:false}); g.rotateX(-Math.PI/2); g.translate(0,HG,0); Q(ALU,g); }
    B(0,HG+ROOFT,-3.5,150,.35,4,K.col(0x9fc0cc,{roughness:.05,metalness:.6}));
    flush();
    // ---- 홀 동(광장 건너편 -z) — A가 가장 크고 높음, 화강석 판 + 유리 로비 ----
    K.layer(0);
    const HALLS=[[-74,-72.5,52,45,57],[-24,-70,36,40,40],[16,-69,34,38,34],[60,-67,44,34,27]];
    for(const [x,z,w,d,h] of HALLS){ B(x,0,z,w,h,d,STN); B(x,h,z,w+.4,.6,d+.4,ALU); B(x,0,z+d/2+.05,w-6,6,.1,GLW); for(let y=9;y<h-3;y+=9) B(x,y,z+d/2+.06,w-4,1.2,.1,GLW); B(x,6,z+d/2+2,w-2,.4,4,ALU); }
    // 홀 사이 유리 로비(낮게)
    for(const [x,w] of [[-45,8],[-4,6],[36,8]]){ B(x,0,-69,w,22,30,GLL); B(x,22,-69,w+.4,.4,30.4,ALU); }
    // 광장 → 유리 홀 공중 브리지(유리, 높이 다르게)
    for(const [x,y] of [[-60,22],[-10,32],[40,12]]){ const z0=zb(x), z1=HALLS.reduce((a,b)=>Math.abs(b[0]-x)<b[2]/2?b[1]+b[3]/2:a,-50); const L=z0-z1; B(x,y,(z0+z1)/2,4.5,.5,L,ALU); B(x,y+.5,(z0+z1)/2,4.3,2.8,L,GLL); B(x,y+3.3,(z0+z1)/2,4.5,.3,L,ALU); }
    // 광장: 느티나무 두 줄 · 벤치
    for(let x=-90;x<=90;x+=11){ for(const z of [-30,-42]) tree(x,0,z,11,K.M.leaf2); }
    flush();
    // ---- 배경(K.life): 고가 선로(유라쿠초 붉은 벽돌 아치 + 신칸센 콘크리트 고가), 전철, 마루노우치 빌딩, 길 ----
    LIFE(()=>{
      const LOT=[-120,120,-100,18];
      E.terrain(-1600,1600,-1600,1600,60,60,()=>0,(x,z)=>{ const n=E.fbm(x*.04,z*.04,2); return [.5+.03*n,.5+.03*n,.49+.03*n]; },LOT);
      const ASP=K.col(0x4f5255,{roughness:.95}); B(0,.03,-112,3200,.05,22,ASP); B(-130,.03,0,18,.05,3200,ASP); B(130,.03,-40,14,.05,3200,ASP);
      // JR 고가: 붉은 벽돌 아치(유라쿠초) — 아치 반복 입면
      const BRK=TX.mk(TX.tex('tifbrick',256,(g,N,rr)=>{ g.fillStyle='#6a3a2c'; g.fillRect(0,0,N,N); for(let j=0;j<32;j++) for(let i=0;i<8;i++){ const c=(rr()-.5)*30; g.fillStyle=`rgb(${140+c|0},${70+c*.6|0},${52+c*.5|0})`; g.fillRect(i*32+(j%2)*16+1,j*8+1,30,6); } }),2,{roughness:.9});
      for(const zz of [26,34]){ B(0,0,zz,1600,9,7,BRK); for(let x=-790;x<800;x+=12) B(x,0,zz+3.55,7,6,.1,K.col(0x1e1c1b)); B(0,9,zz,1600,1.2,7.6,K.col(0x8b8a86)); }
      B(0,0,44,1600,12,10,K.col(0xa7a49d,{roughness:.9})); B(0,12,44,1600,1.4,11,K.col(0x8d8b86)); for(const zz of [41,47]) B(0,13.4,zz,1600,2.2,.25,K.col(0x8d8b86));
      // 전철(야마노테 연두 띠) · 신칸센(흰 차체 파란 띠)
      { const car=(x,z,y,col,band,n)=>{ for(let i=0;i<n;i++){ const xx=x+i*20.5; B(xx,y,z,20,3.6,2.9,K.col(col,{roughness:.35,metalness:.5})); B(xx,y+1.2,z+1.46,19,1,.04,K.col(0x2a3238,{roughness:.1,metalness:.7})); B(xx,y+.5,z+1.47,19.6,.35,.03,K.col(band)); } };
        car(-90,24,10.2,0xd9dcdf,0x8cc63f,8); car(40,36,10.2,0xd9dcdf,0x8cc63f,6); car(-150,44,13.4,0xf2f2f0,0x1d4f9c,10); }
      // 마루노우치·유라쿠초 빌딩(서·북·남) — 높은 사무 빌딩 + 낮은 블록
      const BL=[]; for(let x=-1500;x<1500;x+=46) for(let z=-1500;z<1500;z+=46){ const xx=x+(E.r()-.5)*10, zz=z+(E.r()-.5)*10; if(xx>-140&&xx<140&&zz>-135&&zz<60) continue; if(zz>14&&zz<60) continue; if(zz>=60&&zz<330&&Math.abs(xx)<420) continue; const lowE=zz>=60; if(Math.abs(zz+112)<16||Math.abs(xx+130)<14||Math.abs(xx-130)<12) continue; const tall=zz<0&&Math.hypot(xx,zz)<700&&E.r()<.55; BL.push([xx,zz,30+E.r()*12,28+E.r()*12,tall?(90+E.r()*110):lowE?(14+E.r()*30):(20+E.r()*35),E.r()<.4?'#9ea6ae':E.r()<.6?'#c3bfb7':'#7e8790']); } BLK(BL);
    });
    tidy(1);
  }});
