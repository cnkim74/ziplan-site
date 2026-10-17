__bsigFill({"templeheaven":function(K){
// 출처: 北京旅游网(visitbeijing.com.cn) 「天坛公园」 — 祈年殿 높이 38 m·지름 32.7 m, 祈谷坛 3단 높이 5.6 m(아래 지름 91·가운데 80·위 68 m), 기둥 28(용정주 4 높이 19.2 m·금주 12·첨주 12), 1420 창건 · 1889 낙뢰 화재 후 재건
// 추정: 각 처마 높이·지름(아래 32.7 → 가운데 약 27 → 위 약 22 m), 북·남 계단 폭, 마당 담(약 160 × 190 m)·기년문·배전·황건전 크기, 단폐교 길이 약 360 m, 황궁우·회음벽(지름 약 65 m)·환구단까지 거리와 크기(개략)
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
    // 큰 모형(300 m↑)용 하늘 돔: 뷰어의 하늘 구(반지름 600)보다 카메라가 멀어지면 모서리가 검게 비므로 life 그룹에 더 큰 돔을 하나 더 둠(같은 그라데이션, 밤이면 안개색으로 판단해 밤 색으로 바꿈). 모형과 함께 버려져 다른 모형엔 영향 없음
    const skyDome=(cx,cy,cz,R)=>{ const g=new T.SphereGeometry(R,32,16); const p=g.attributes.position; const mkCol=night=>{ const col=[]; const top=new T.Color(night?0x0b1226:0x9fc0de).convertSRGBToLinear(), hor=new T.Color(night?0x2a3350:0xeee9df).convertSRGBToLinear(), c=new T.Color(); for(let i=0;i<p.count;i++){ const t=Math.max(0,Math.min(1,p.getY(i)/(R*.63))); c.copy(hor).lerp(top,Math.pow(t,.65)); col.push(c.r,c.g,c.b); } return new T.Float32BufferAttribute(col,3); }; const cD=mkCol(false), cN=mkCol(true); g.setAttribute('color',cD); const m=new T.Mesh(g,new T.MeshBasicMaterial({vertexColors:true,side:T.BackSide,fog:false,depthWrite:false})); m.position.set(cx,cy,cz); m.renderOrder=-1; m.frustumCulled=false; let cur=0; m.onBeforeRender=(r,sc)=>{ const n=sc.fog&&sc.fog.color&&sc.fog.color.r<.3?1:0; if(n!==cur){ cur=n; g.setAttribute('color',n?cN:cD); } }; K.life.add(m); return m; };
    // ---- 재료 질감(v15): 캔버스 텍스처 — 안도 노출콘크리트(1.8×0.9 m 거푸집 패널 + 폼타이 구멍 6개), 파주석 줄쌓기, 제주 현무암, 금속·유리 결. B()는 userData.tm(텍스처 한 장의 실제 크기 m)으로 UV를 맞춤 ----
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
      // 파주석: 갈색·녹슨 주황·회갈색 쪼갠 돌을 줄쌓기(줄 높이 12~30 cm, 길이 30~110 cm) — 512 px = 4 m
      const paju=()=>mk(tex('paju',512,(g,N,rr)=>{ g.fillStyle='#3f362f'; g.fillRect(0,0,N,N); const tones=['#7d6a58','#8c7764','#6e5c4c','#9a8470','#5f5044','#a08b74','#866b55','#94796a','#6d5f55','#8f6f52']; let y=0; while(y<N){ let h=Math.round(16+rr()*22); if(N-y<20) h=N-y; let x=-rr()*60; while(x<N){ const w=40+rr()*100; g.fillStyle=tones[Math.floor(rr()*tones.length)]; for(const ox of [0,-N,N]){ g.fillRect(ox+x+1.5,y+1.5,w-3,h-3); } for(let k=0;k<6;k++){ g.fillStyle=rr()<.5?'rgba(255,240,220,.10)':'rgba(40,25,15,.14)'; g.fillRect(x+rr()*w,y+rr()*h,4+rr()*16,1+rr()*3); } x+=w; } y+=h; } }),4,{roughness:.95});
      // 제주 현무암 담(밭담·돌담): 검회색 둥근 돌 쌓기 + 구멍
      const basalt=()=>mk(tex('basalt',256,(g,N,rr)=>{ g.fillStyle='#1f1e1d'; g.fillRect(0,0,N,N); for(let k=0;k<160;k++){ const x=rr()*N,y=rr()*N,r=10+rr()*16; const c=50+rr()*30|0; g.fillStyle=`rgb(${c},${c-2},${c-4})`; for(const ox of [0,-N,N]) for(const oy of [0,-N,N]){ g.beginPath(); g.ellipse(x+ox,y+oy,r,r*.7,rr()*3,0,7); g.fill(); } } for(let k=0;k<900;k++){ g.fillStyle='rgba(10,10,10,.6)'; g.fillRect(rr()*N,rr()*N,1.5,1.5); } }),2.2,{roughness:1});
      // 석회 바른 흙담(전통 담장 몸체) — 미색 + 박힌 돌
      const toDam=()=>mk(tex('todam',256,(g,N,rr)=>{ g.fillStyle='#cdbfa6'; g.fillRect(0,0,N,N); for(let k=0;k<70;k++){ const x=rr()*N,y=rr()*N,r=6+rr()*12; const c=120+rr()*50|0; g.fillStyle=`rgb(${c},${c-8},${c-20})`; g.beginPath(); g.ellipse(x,y,r,r*.6,rr()*3,0,7); g.fill(); } for(let k=0;k<2000;k++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.08)':'rgba(60,50,40,.08)'; g.fillRect(rr()*N,rr()*N,2,2); } }),2.5,{roughness:1});
      // 커튼월 세로 결(멀리언 + 층 띠 + 반사 얼룩) — 512 px = tm m
      const cw=(key,base,mull,band,nx,ny,tm,o)=>mk(tex('cw'+key,512,(g,N,rr)=>{ g.fillStyle=base; g.fillRect(0,0,N,N); const pw=N/nx, ph=N/ny; for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){ const v=(rr()-.5)*30; g.fillStyle=`rgba(${v>0?255:20},${v>0?255:30},${v>0?255:40},${Math.abs(v)/160})`; g.fillRect(i*pw,j*ph,pw,ph); } const gr=g.createLinearGradient(0,0,N,N); gr.addColorStop(0,'rgba(255,255,255,.10)'); gr.addColorStop(.5,'rgba(255,255,255,0)'); gr.addColorStop(1,'rgba(255,255,255,.08)'); g.fillStyle=gr; g.fillRect(0,0,N,N); g.fillStyle=band; for(let j=0;j<ny;j++) g.fillRect(0,j*ph,N,Math.max(2,ph*.12)); g.fillStyle=mull; for(let i=0;i<nx;i++) g.fillRect(i*pw,0,Math.max(2,pw*.09),N); }),tm,Object.assign({metalness:.35,roughness:.25},o||{}));
      return {tex,mk,ando,paju,basalt,toDam,cw}; })();
    // 범용 대지 정리: 생성기(pgBuild)가 모형 뒤에 까는 범용 대지(담 2.4 m·길·가로등·수영장·벤치·볼라드·임의 나무)는 이 모형의 실제 맥락과 맞지 않으므로, 빌드 직후(마이크로태스크) 이 모형의 site 그룹을 통째로 숨기고(바닥은 이 모형의 대지 판 + K.life 지형이 대신), life에 나중에 붙은 범용 소품도 사람만 남김 — 맥락은 아래 K.life 배경이 대신함
    const tidySite=()=>{ const MM=K.M, n0=K.life.children.length; Promise.resolve().then(()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(site&&site!==K.bldg&&site!==K.life) site.children.forEach(o=>{ o.visible=false; }); K.life.children.forEach((o,i)=>{ if(i<n0) return; if(o.material===MM.people) return; o.visible=false; }); }); };
    // ---- 배경·바닥 공용(v13): 캔버스 질감(박석·마사토) · 높이장 지형(K.life — bbox 밖이라 썸네일 거리에 영향 없음) · 인스턴스 숲 ----
    const E=(()=>{ const TT=K.T; let sd=97; const r=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
      const C=(typeof window!=='undefined')?(window.__kTex13||(window.__kTex13={})):{};
      const tex=(key,px,draw)=>{ if(C[key]) return C[key]; if(typeof document==='undefined') return null; const cv=document.createElement('canvas'); cv.width=cv.height=px; const g=cv.getContext('2d'); let s=31; const rr=()=>{ s=(s*16807)%2147483647; return s/2147483647; }; draw(g,px,rr); const t=new TT.CanvasTexture(cv); t.wrapS=t.wrapT=TT.RepeatWrapping; t.encoding=TT.sRGBEncoding; t.anisotropy=8; return C[key]=t; };
      // 박석: 회색 화강석을 가로줄로 불규칙하게(줄 높이·돌 너비가 제각각), 줄눈은 어둡게 — 512 px = 9 m
      const bakTex=()=>tex('bak',512,(g,N,rr)=>{ g.fillStyle='#6f6a61'; g.fillRect(0,0,N,N); const tones=['#a8a296','#b3ad9f','#9a9488','#a39d90','#aea89a','#958f83','#b8b2a4']; let y=0; while(y<N){ let h=Math.round(26+rr()*26); if(N-y<40) h=N-y; let x=-rr()*60; while(x<N){ const w=38+rr()*70; const j=()=>(rr()-.5)*5; g.fillStyle=tones[Math.floor(rr()*tones.length)]; for(const ox of [0,-N]){ g.beginPath(); g.moveTo(ox+x+2+j(),y+2+j()); g.lineTo(ox+x+w-2+j(),y+2+j()); g.lineTo(ox+x+w-2+j(),y+h-2+j()); g.lineTo(ox+x+2+j(),y+h-2+j()); g.closePath(); g.fill(); } x+=w; } y+=h; }
        for(let i=0;i<4000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.10)':'rgba(40,36,30,.10)'; g.fillRect(rr()*N,rr()*N,1.5,1.5); } });
      // 마사토: 옅은 황토 바탕(#d9cdb0) + 모래 알갱이 점 — 512 px = 7 m
      const masTex=()=>tex('mas',512,(g,N,rr)=>{ g.fillStyle='#cfc1a0'; g.fillRect(0,0,N,N); for(let i=0;i<0;i++){ g.fillStyle=`rgba(${rr()<.5?'190,172,135':'232,224,204'},.07)`; const x=rr()*N,y=rr()*N,w=30+rr()*90; g.beginPath(); g.ellipse(x,y,w,w*.6,rr()*3,0,7); g.fill(); } const cs=['#bfae88','#dacfb4','#ae9d77','#9c8d6f','#c8b997']; for(let i=0;i<7000;i++){ g.fillStyle=cs[Math.floor(rr()*cs.length)]; const z=rr()<.85?1.2:2.4; g.fillRect(rr()*N,rr()*N,z,z); } });
      const lin=(h)=>new TT.Color(h).convertSRGBToLinear();
      const mat=(t,hex,tm,o)=>{ const m=new TT.MeshStandardMaterial(Object.assign({color:t?0xffffff:hex,map:t||null,roughness:.96},o||{})); if(!t) m.color.convertSRGBToLinear(); m.userData.tm=tm; m.userData.nocast=1; return m; };
      const BAK=mat(bakTex(),0xb9b3a6,9), MAS=mat(masTex(),0xd9cdb0,7); if(BAK.map) BAK.color.setHex(0xd2cec6).convertSRGBToLinear(); if(MAS.map) MAS.color.setHex(0xd8d0c0).convertSRGBToLinear();
      // 평면 바닥 한 장(월드 좌표 UV) → 병합 큐 Q가 있으면 그쪽으로
      const plane=(m,x,y,z,w,d,q)=>{ const g=new TT.PlaneGeometry(w,d,1,1); g.rotateX(-Math.PI/2); g.translate(x,y,z); const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm||5; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); if(q){ q(m,g); return null; } const me=new TT.Mesh(g,m); me.receiveShadow=true; (K.cur||K.layer(0)).add(me); return me; };
      // 지형: hf(x,z) 높이, cf(x,z,h,ny) → [r,g,b](sRGB 0~1). life 그룹(그림자 안 던짐)
      const terrain=(x0,x1,z0,z1,nx,nz,hf,cf,hole)=>{ // hole [hx0,hx1,hz0,hz1]: 그 사각형만 비움(격자선을 구멍 모서리에 맞춤) — 모형 바닥을 그대로 보이게
        const ax=(a0,a1,n,e)=>{ const L=[]; for(let i=0;i<=n;i++) L.push(a0+(a1-a0)*i/n); if(e) e.forEach(v=>{ if(v>a0&&v<a1) L.push(v); }); L.sort((a,b)=>a-b); return L.filter((v,i)=>i===0||v-L[i-1]>.01); };
        const XS=ax(x0,x1,nx,hole&&[hole[0],hole[1]]), ZS=ax(z0,z1,nz,hole&&[hole[2],hole[3]]); const W=XS.length, H=ZS.length, n=W*H; const Y=new Float32Array(n), P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3);
        for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, x=XS[i], z=ZS[j]; Y[k]=hf(x,z); P[k*3]=x; P[k*3+1]=Y[k]; P[k*3+2]=z; }
        const lc=v=>v<.04045?v*.0773993808:Math.pow(v*.9478672986+.0521327014,2.4);
        for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, i0=Math.max(0,i-1), i1=Math.min(W-1,i+1), j0=Math.max(0,j-1), j1=Math.min(H-1,j+1); const hx=(Y[j*W+i1]-Y[j*W+i0])/(XS[i1]-XS[i0]), hz=(Y[j1*W+i]-Y[j0*W+i])/(ZS[j1]-ZS[j0]); const L=Math.sqrt(hx*hx+1+hz*hz); N[k*3]=-hx/L; N[k*3+1]=1/L; N[k*3+2]=-hz/L; const v=cf(P[k*3],P[k*3+2],Y[k],1/L); Cc[k*3]=lc(v[0]); Cc[k*3+1]=lc(v[1]); Cc[k*3+2]=lc(v[2]); }
        const I=[]; for(let j=0;j<H-1;j++) for(let i=0;i<W-1;i++){ if(hole){ const cx=(XS[i]+XS[i+1])/2, cz=(ZS[j]+ZS[j+1])/2; if(cx>hole[0]&&cx<hole[1]&&cz>hole[2]&&cz<hole[3]) continue; } const a=j*W+i, b=a+1, c=a+W, d=c+1; I.push(a,c,b,b,c,d); }
        const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(Cc,3)); g.setIndex(new TT.BufferAttribute(new Uint32Array(I),1)); g.computeBoundingSphere();
        const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:1})); m.receiveShadow=true; m.castShadow=false; K.life.add(m);
        const bs=(A,v)=>{ let lo=0, hi=A.length-2; if(v<=A[0]) return 0; if(v>=A[hi+1]) return hi; while(lo<hi){ const md=(lo+hi+1)>>1; if(A[md]<=v) lo=md; else hi=md-1; } return lo; };
        m.h=(x,z)=>{ const i=bs(XS,x), j=bs(ZS,z); const u=Math.min(1,Math.max(0,(x-XS[i])/(XS[i+1]-XS[i]))), v=Math.min(1,Math.max(0,(z-ZS[j])/(ZS[j+1]-ZS[j]))); const a=Y[j*W+i], b=Y[j*W+i+1], c=Y[(j+1)*W+i], d=Y[(j+1)*W+i+1]; return (a*(1-u)+b*u)*(1-v)+(c*(1-u)+d*u)*v; }; return m; };
      // 숲: 나무 무리 — items [x,y,z,h,kind(0 활엽 둥근 수관,1 소나무 납작 수관,2 침엽 원뿔), tone 0~1]. 수관 + 줄기 InstancedMesh, 색은 인스턴스마다 다르게
      const mergeG=gs=>{ const G=gs.map(g=>g.index?g.toNonIndexed():g); let n=0; for(const g of G) n+=g.attributes.position.count; const P=new Float32Array(n*3), N=new Float32Array(n*3); let o=0; for(const g of G){ P.set(g.attributes.position.array,o*3); N.set(g.attributes.normal.array,o*3); o+=g.attributes.position.count; } const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); return g; };
      const crownG=[ (()=>{ const a=new TT.IcosahedronGeometry(.5,1); a.scale(1,.78,1); a.translate(0,.62,0); const b=new TT.IcosahedronGeometry(.3,0); b.translate(.22,.78,.1); return mergeG([a,b]); })(),
        (()=>{ const a=new TT.IcosahedronGeometry(.5,0); a.scale(1.15,.42,1.0); a.translate(0,.82,0); const b=new TT.IcosahedronGeometry(.32,0); b.scale(1.1,.45,1); b.translate(-.25,.66,.12); return mergeG([a,b]); })(),
        (()=>{ const a=new TT.ConeGeometry(.36,.62,7); a.translate(0,.55,0); const b=new TT.ConeGeometry(.26,.45,7); b.translate(0,.85,0); return mergeG([a,b]); })() ];
      const trunkG=(()=>{ const g=new TT.CylinderGeometry(.03,.05,.6,5); g.translate(0,.3,0); return g; })();
      const LEAF=[['#46663a','#567a43','#3a5833','#62824a','#4d6e3e'],['#34502f','#3f5d36','#2e482b','#4a6739'],['#2a432b','#344f33','#243a25']];
      const forest=(items,o)=>{ o=o||{}; const byK=[[],[],[]]; items.forEach(it=>byK[it[4]||0].push(it)); const M4=new TT.Matrix4(), Qt=new TT.Quaternion(), V=new TT.Vector3(), Sc=new TT.Vector3(), Eu=new TT.Euler(), c=new TT.Color(); const out=[];
        byK.forEach((L,k)=>{ if(!L.length) return; const cm=new TT.MeshStandardMaterial({color:0xffffff,roughness:.92,flatShading:true}); const im=new TT.InstancedMesh(crownG[k],cm,L.length); const tm=o.trunks!==false?new TT.InstancedMesh(trunkG,K.M.trunk,L.length):null;
          L.forEach((it,i)=>{ const h=it[3], w=h*(it[6]||1); Eu.set(0,(it[0]*13.1+it[2]*7.7)%6.28,0); Qt.setFromEuler(Eu); V.set(it[0],it[1],it[2]); Sc.set(w,h,w); M4.compose(V,Qt,Sc); im.setMatrixAt(i,M4); if(tm) tm.setMatrixAt(i,M4); const P=LEAF[k]; const t=it[5]===undefined?((it[0]*.37+it[2]*.61)%1+1)%1:it[5]; c.set(P[Math.floor(t*P.length)%P.length]).convertSRGBToLinear(); im.setColorAt(i,c); });
          im.instanceMatrix.needsUpdate=true; if(im.instanceColor) im.instanceColor.needsUpdate=true; im.castShadow=!!o.cast; im.receiveShadow=true; (o.grp||K.life).add(im); out.push(im); if(tm){ tm.instanceMatrix.needsUpdate=true; tm.castShadow=!!o.cast; (o.grp||K.life).add(tm); } }); return out; };
      // 숲 흩뿌리기: 영역 [x0,x1,z0,z1], 간격 sp, 높이 함수 hf, 조건 ok(x,z,h)→false면 생략, 나무 크기 hs(x,z,h)
      const scatter=(x0,x1,z0,z1,sp,hf,ok,hs,kind)=>{ const L=[]; for(let z=z0;z<z1;z+=sp) for(let x=x0;x<x1;x+=sp){ const xx=x+(r()-.5)*sp*.9, zz=z+(r()-.5)*sp*.9; const h=hf(xx,zz); if(ok&&!ok(xx,zz,h)) continue; const s=hs?hs(xx,zz,h):sp*1.2; const kd=typeof kind==='function'?kind(xx,zz,h):(kind===undefined?(r()<.45?1:0):kind); L.push([xx,h-s*.08,zz,s*(.8+r()*.45),kd,r(),.85+r()*.4]); } return L; };
      // 도시 블록(멀리, 낮게): 한 메시 · 꼭짓점 색
      const blocks=(list)=>{ if(!list.length) return; const n=list.length*30, P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3); let o=0; const c=new TT.Color();
        const quad=(a,b,cc,d,nx,ny,nz,k)=>{ for(const q of [a,b,cc,a,cc,d]){ P[o*3]=q[0]; P[o*3+1]=q[1]; P[o*3+2]=q[2]; N[o*3]=nx; N[o*3+1]=ny; N[o*3+2]=nz; Cc[o*3]=c.r*k; Cc[o*3+1]=c.g*k; Cc[o*3+2]=c.b*k; o++; } };
        for(const [x,z,w,d,h,hex] of list){ c.set(hex).convertSRGBToLinear(); const X0=x-w/2,X1=x+w/2,Z0=z-d/2,Z1=z+d/2; quad([X0,h,Z1],[X1,h,Z1],[X1,h,Z0],[X0,h,Z0],0,1,0,1.06); quad([X0,0,Z1],[X1,0,Z1],[X1,h,Z1],[X0,h,Z1],0,0,1,.95); quad([X1,0,Z0],[X0,0,Z0],[X0,h,Z0],[X1,h,Z0],0,0,-1,.9); quad([X1,0,Z1],[X1,0,Z0],[X1,h,Z0],[X1,h,Z1],1,0,0,.86); quad([X0,0,Z0],[X0,0,Z1],[X0,h,Z1],[X0,h,Z0],-1,0,0,.86); }
        const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P,3)); g.setAttribute('normal',new TT.BufferAttribute(N,3)); g.setAttribute('color',new TT.BufferAttribute(Cc,3)); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,roughness:.9})); m.receiveShadow=true; K.life.add(m); return m; };
      // 값 잡음(능선 질감)
      const hsh=(x,z)=>{ let n=Math.imul(x|0,374761393)+Math.imul(z|0,668265263)|0; n=Math.imul(n^(n>>>13),1274126177); return ((n^(n>>>16))>>>0)/4294967296; };
      const vn=(x,z)=>{ const xi=Math.floor(x), zi=Math.floor(z), xf=x-xi, zf=z-zi; const u=xf*xf*(3-2*xf), v=zf*zf*(3-2*zf); const a=hsh(xi,zi), b=hsh(xi+1,zi), c=hsh(xi,zi+1), d=hsh(xi+1,zi+1); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; };
      const fbm=(x,z,o)=>{ let s=0, a=.5, f=1; for(let i=0;i<(o||4);i++){ s+=a*vn(x*f,z*f); a*=.5; f*=2.03; } return s; };
      const ridged=(x,z)=>{ let s=0,a=.5,f=1; for(let i=0;i<3;i++){ s+=a*(1-Math.abs(vn(x*f,z*f)*2-1)); a*=.5; f*=2.1; } return s; };
      const ss=t=>{ t=Math.min(1,Math.max(0,t)); return t*t*(3-2*t); };
      // 산 봉우리 합: pk [x,z,rx,rz,h,pow]
      const peaks=(x,z,pk)=>{ let h=0; for(let i=0;i<pk.length;i++){ const q=pk[i]; const ax=(x-q[0])/q[2], az=(z-q[1])/q[3]; const d2=ax*ax+az*az; if(d2<1){ const d=Math.sqrt(d2); const e=1-ss(d); h=Math.max(h,q[4]*Math.pow(e,q[5]||1.3))+q[4]*.04*(1-d)*(1-d); } } return h; };
      // 기본 산색: 숲(짙은 녹색 변주) · 바위(높은 곳·급경사) · 아래 풀
      const mcol=(x,z,h,ny,o)=>{ o=o||{}; const n=fbm(x*.02,z*.02,2), m=vn(x*.006+5,z*.006); let c=[.2+.07*n,.29+.08*n,.16+.05*n]; if(m>.6) c=[c[0]*.85+.05,c[1]*.9+.04,c[2]*.85]; const rock=Math.min(1,(h>(o.rockH||150)-50?(o.rock||0)*ss((h-(o.rockH||150))/50)*ss((.9-ny)/.12)*ss((vn(x*.012,z*.012)-.35)/.2):0)+(o.cliff||0)*ss((.62-ny)/.12)); if(rock>0){ const rc=[.58+.08*n,.56+.07*n,.52+.06*n]; c=c.map((v,i)=>v+(rc[i]-v)*Math.min(1,rock)); } const low=ss((o.low||6)-h); if(low>0){ const gc=o.lowc||[.62,.66,.5]; c=c.map((v,i)=>v+(gc[i]-v)*low); } return c; };
      return {BAK,MAS,mat,plane,terrain,forest,scatter,blocks,fbm,ridged,vn,ss,peaks,mcol,r,lin,tex}; })();
    const LIFE=f=>{ const pc=K.cur; K.cur=K.life; f(); K.cur=pc; };
    // ===== 재료 =====
    const MAR=K.col(0xece9df,{roughness:.5}), MAR2=K.col(0xd8d4c8,{roughness:.6}), RED=K.col(0x9a2a1e,{roughness:.6}), RED2=K.col(0x7c2219,{roughness:.7}), GOLD=K.col(0xd6aa45,{roughness:.28,metalness:.75}), DK=K.col(0x2a2622,{roughness:.9});
    const WATER=K.col(0x5b7f8c,{roughness:.05,metalness:.02});
    const ctex=(key,px,draw,o)=>{ const t=TX.tex('th_'+key,px,draw); const m=new T.MeshStandardMaterial(Object.assign({color:0xffffff,map:t||null,roughness:.5},o||{})); if(!t) m.color.setHex(o&&o.fb||0x888888); return m; };
    // 짙푸른 유리기와: 수키와 골(세로) + 기와 마디(가로) — 한 장 = 골 8줄
    const TILE=ctex('tile',256,(g,N)=>{ g.fillStyle='#16316a'; g.fillRect(0,0,N,N); const w=N/8; for(let i=0;i<8;i++){ const gr=g.createLinearGradient(i*w,0,i*w+w,0); gr.addColorStop(0,'#10285a'); gr.addColorStop(.35,'#2f5aa6'); gr.addColorStop(.55,'#4b78c2'); gr.addColorStop(.8,'#1d3d7c'); gr.addColorStop(1,'#0c2050'); g.fillStyle=gr; g.fillRect(i*w+w*.18,0,w*.64,N); } g.fillStyle='rgba(5,15,40,.45)'; for(let j=0;j<8;j++) g.fillRect(0,j*N/8,N,3); },{roughness:.22,metalness:.25,fb:0x24468a});
    // 처마 밑(서까래·연목): 짙은 청록 바탕에 둥근 서까래 끝
    const SOF=ctex('sof',128,(g,N)=>{ g.fillStyle='#1f4a48'; g.fillRect(0,0,N,N); for(let i=0;i<8;i++){ g.fillStyle=i%2?'#2c6a62':'#23565a'; g.fillRect(i*N/8+2,0,N/8-4,N); } g.fillStyle='#16345a'; g.fillRect(0,N*.8,N,N*.2); },{roughness:.8,fb:0x24524f});
    // 두공 띠: 청·녹 두공 + 금테, 사이 어둠
    const DOU=ctex('dou',256,(g,N)=>{ g.fillStyle='#1a1d1c'; g.fillRect(0,0,N,N); const w=N/4; for(let i=0;i<4;i++){ const x=i*w; g.fillStyle='#2f6f66'; g.fillRect(x+w*.2,N*.55,w*.6,N*.45); g.fillStyle='#2a4f86'; g.fillRect(x+w*.08,N*.32,w*.84,N*.2); g.fillStyle='#2f6f66'; g.fillRect(x+w*.02,N*.1,w*.96,N*.18); g.strokeStyle='#d8b04a'; g.lineWidth=3; g.strokeRect(x+w*.2,N*.55,w*.6,N*.45); g.strokeRect(x+w*.08,N*.32,w*.84,N*.2); g.strokeRect(x+w*.02,N*.1,w*.96,N*.18); } g.fillStyle='#1d3e74'; g.fillRect(0,0,N,N*.08); },{roughness:.6,fb:0x2f6060});
    // 액방(화새채화): 청·녹 칸 + 금빛 테두리·용 무늬(점)
    const BAND=ctex('band',256,(g,N)=>{ g.fillStyle='#2a4f86'; g.fillRect(0,0,N,N); g.fillStyle='#2f7a6c'; g.fillRect(N*.33,0,N*.34,N); g.strokeStyle='#e0b850'; g.lineWidth=6; g.strokeRect(4,N*.12,N-8,N*.76); g.beginPath(); g.moveTo(N*.33,N*.12); g.lineTo(N*.26,N*.5); g.lineTo(N*.33,N*.88); g.moveTo(N*.67,N*.12); g.lineTo(N*.74,N*.5); g.lineTo(N*.67,N*.88); g.stroke(); g.fillStyle='#e6c25a'; for(let i=0;i<5;i++){ g.beginPath(); g.arc(N*(.42+i*.04),N*(.5+Math.sin(i*1.7)*.15),8,0,7); g.fill(); } g.fillStyle='#8e2a20'; g.fillRect(0,0,N,N*.1); g.fillRect(0,N*.9,N,N*.1); },{roughness:.55,fb:0x2a5a70});
    // 격자문(한 칸): 붉은 틀 + 위 격심(꽃살) + 아래 판(금 장식) 
    const DOOR=ctex('door',256,(g,N)=>{ g.fillStyle='#8f2219'; g.fillRect(0,0,N,N); for(const x0 of [0,N/2]){ g.fillStyle='#3b1410'; g.fillRect(x0+N*.06,N*.06,N*.38,N*.52); g.strokeStyle='#c2493a'; g.lineWidth=3; for(let k=-8;k<16;k++){ g.beginPath(); g.moveTo(x0+N*.06+k*12,N*.06); g.lineTo(x0+N*.06+k*12+N*.52,N*.58); g.moveTo(x0+N*.44-k*12,N*.06); g.lineTo(x0+N*.44-k*12-N*.52,N*.58); g.stroke(); } g.fillStyle='#8f2219'; g.fillRect(x0,0,N*.06,N); g.fillRect(x0+N*.44,0,N*.06,N); g.fillStyle='#a52b20'; g.fillRect(x0+N*.08,N*.66,N*.34,N*.26); g.strokeStyle='#d9ae48'; g.lineWidth=4; g.strokeRect(x0+N*.12,N*.7,N*.26,N*.18); } g.fillStyle='#d9ae48'; g.fillRect(0,N*.6,N,4); },{roughness:.6,fb:0x8f2219});
    const uvS=(g,su,sv)=>{ const uv=g.attributes.uv; for(let i=0;i<uv.count;i++) uv.setXY(i,uv.getX(i)*su,uv.getY(i)*sv); return g; };
    const lathe=(pts,mat,seg,su,sv,y)=>{ const g=new T.LatheGeometry(pts.map(p=>new T.Vector2(p[0],p[1])),seg||64); if(su||sv) uvS(g,su||1,sv||1); if(y) g.translate(0,y,0); Q(mat,g); return g; };
    const ring=(r,y,h,mat,seg,su,sv)=>{ const g=new T.CylinderGeometry(r,r,h,seg||64,1,true); g.translate(0,y+h/2,0); if(su||sv) uvS(g,su||1,sv||1); Q(mat,g); };
    const disc=(r,y,h,mat,seg)=>{ const g=new T.CylinderGeometry(r,r,h,seg||64); g.translate(0,y+h/2,0); Q(mat,g); };
    // 원추 지붕: 처마 끝 반지름 Re(높이 ye) → 위 반지름 Rt(높이 yt), 오목한 곡선 · 아래 처마 밑면
    const roofC=(Re,ye,Rt,yt,Rin,o)=>{ o=o||{}; const P=[]; const n=12; P.push([Re+.15,ye-.55]); P.push([Re+.25,ye]); for(let i=1;i<=n;i++){ const t=i/n; P.push([Re+.25-(Re+.25-Rt)*t, ye+(yt-ye)*Math.pow(t,1.55)+ .35*Math.sin(t*Math.PI)*(1-t)]); } const L=2*Math.PI*Re; lathe(P,TILE,96,L/4,6);
      lathe([[Rin,ye-1.3],[Re+.15,ye-.55]],SOF,96,L/2,1); // 처마 밑면
      // 기와 마루(골 8줄마다 굵은 마루 대신 끝단 금속 띠): 처마 끝 테
      ring(Re+.27,ye-.62,.62,K.col(0x1b2f5c,{roughness:.4}),96); };
    // 난간 기둥·용머리 인스턴스 목록
    const POST=[], HEAD=[], PAN=[];
    const balus=(R,y,gaps)=>{ const n=Math.round(2*Math.PI*R/2.2); for(let i=0;i<n;i++){ const a=i/n*Math.PI*2; const x=Math.sin(a)*R, z=Math.cos(a)*R; if(gaps.some(gp=>{ const da=Math.abs(((a-gp)%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI); return da<(Math.abs(Math.cos(gp))>.5?6.6:3.2)/R; })) continue; POST.push([x,y,z,a,1,1,1]); HEAD.push([Math.sin(a)*(R+.35),y-.55,Math.cos(a)*(R+.35),a,1,1,1]); } };
    // 계단(로컬 +z 방향으로 내려감) → 각도 a로 회전
    const rot=(x,z,a)=>[x*Math.cos(a)+z*Math.sin(a), -x*Math.sin(a)+z*Math.cos(a)];
    const Bd=(x,y,z,w,h,d,mat,a)=>{ const p=rot(x,z,a); B(p[0],y,p[1],w,h,d,mat,a); };
    const slab=(x,za,ya,zb,yb,w,th,mat,a)=>{ const L=Math.hypot(zb-za,yb-ya); const g=new T.BoxGeometry(w,th,L); g.rotateX(-Math.atan2(yb-ya,zb-za)); g.translate(x,(ya+yb)/2,(za+zb)/2); g.rotateY(a); Q(mat,g); };
    const stairs=(R,y0,y1,a,wide)=>{ const h=y1-y0, n=Math.round(h/.155), rise=h/n, tr=.34, run=n*tr; const fl=wide?[[-4.1,3.4],[4.1,3.4]]:[[0,4.6]];
      for(const [cx,w] of fl) for(let i=0;i<n;i++) Bd(cx,y0,R-1+ (run+1)-(i+.5)*tr-(.0),w,(i+1)*rise,tr,MAR2,a);
      const edges=wide?[-6.05,-2.15,2.15,6.05]:[-2.55,2.55]; for(const ex of edges){ slab(ex,R+run+.1,y0+.25,R-.5,y1+.25,.5,.5,MAR,a); Bd(ex,y0,R+run-.1,.5,.9,.5,MAR,a); }
      if(wide){ slab(0,R+run,y0+.05,R-.6,y1-.05,3.3,.4,K.col(0xdedad0,{roughness:.7}),a); for(let k=0;k<6;k++){ const t=(k+.5)/6; const zz=R+run-(run+.6)*t, yy=y0+h*t; const p=rot(0,zz,a); const g=new T.SphereGeometry(.55,10,6); g.scale(2.2,.35,1); g.translate(p[0],yy+.2,p[1]); Q(MAR2,g); } } }; // 어로석: 용·봉 부조(볼록 판)
    // ================= 0: 기곡단 3단 =================
    K.layer(0);
    const TR=[[45.5,0,1.87],[40,1.87,3.73],[34,3.73,5.6]];
    B(0,-.05,0,120,.05,120,flat(K.col(0x9e988c,{roughness:1})));
    TR.forEach(([R,y0,y1],k)=>{ disc(R,y0,y1-y0-.25,MAR,96); disc(R+.18,y1-.25,.25,MAR2,96); /* 수미좌 띠 */ ring(R+.05,y0+.25,.35,MAR2,96); ring(R+.05,y0+(y1-y0)*.6,.12,K.col(0xc9c4b6),96);
      // 난간판(얕은 판, 안쪽) + 기둥
      ring(R-.3,y1,.82,MAR,128); ring(R-.42,y1,.82,MAR2,128); balus(R-.36,y1,[0,Math.PI,Math.PI/2,-Math.PI/2]);
      stairs(R,y0,y1,0,true); stairs(R,y0,y1,Math.PI,true); stairs(R,y0,y1,Math.PI/2,false); stairs(R,y0,y1,-Math.PI/2,false); });
    // 단 윗면 박석 줄(동심원 띠, 얕게)
    for(const [R,y] of [[44,1.87],[38.5,3.73]]) ring(R-2.6,y,.02,K.col(0xcfcabd),96);
    { const pg=new T.BoxGeometry(.28,1.25,.28); pg.translate(0,.62,0); const cap=new T.SphereGeometry(.2,8,6); cap.translate(0,1.36,0); inst(pg,MAR,POST); inst(cap,MAR,POST); const hg=new T.BoxGeometry(.28,.3,.9); hg.translate(0,0,0); inst(hg,MAR2,HEAD); }
    flush();
    // ================= 1: 아래층 — 첨주 12 · 격자문 원통 · 액방 · 두공 · 아래 처마 =================
    K.layer(1);
    const yb=5.6; disc(14.6,yb,.45,MAR,96); disc(15.2,yb,.2,MAR2,96); const y0=yb+.45;
    ring(11.6,y0,7.7,DOOR,96,24,1); disc(11.5,y0,7.7,RED2,48);
    { const cg=new T.CylinderGeometry(.48,.52,8.6,12); cg.translate(0,4.3,0); const L=[]; for(let i=0;i<12;i++){ const a=(i+.5)/12*Math.PI*2; L.push([Math.sin(a)*12.25,y0,Math.cos(a)*12.25]); } inst(cg,RED,L); const bg=new T.CylinderGeometry(.75,.75,.35,12); bg.translate(0,.17,0); inst(bg,MAR2,L); }
    ring(12.55,y0+7.7,1.15,BAND,96,12,1); disc(12.5,y0+7.68,.04,DK,48);
    ring(13.1,y0+8.85,.95,DOU,96,40,1);
    roofC(16.35,y0+9.95,10.9,y0+13.4,12.6);
    flush();
    // ================= 2: 가운데 몸체 · 가운데 처마 =================
    K.layer(2);
    const y2=y0+12.6; ring(10.55,y2,3.35,DOOR,96,20,.55); disc(10.45,y2,4.2,RED2,48); ring(10.75,y2+3.35,1.0,BAND,96,10,1); ring(11.2,y2+4.35,.85,DOU,96,34,1);
    roofC(13.6,y2+5.2,8.0,y2+8.6,10.6);
    flush();
    // ================= 3: 위 몸체 · 위 처마(원추) · 보주 =================
    K.layer(3);
    const y3=y2+7.9; ring(7.65,y3,3.1,DOOR,96,14,.55); disc(7.55,y3,4.0,RED2,48); ring(7.85,y3+3.1,.95,BAND,96,8,1); ring(8.3,y3+4.05,.8,DOU,96,26,1);
    roofC(10.9,y3+4.85,.95,y3+12.4,7.7);
    { const yt=y3+12.2; lathe([[.01,yt],[1.05,yt],[.75,yt+.55],[.62,yt+1.2],[.9,yt+1.6],[.01,yt+1.65]],GOLD,24); const s=new T.SphereGeometry(1.35,20,14); s.translate(0,yt+2.9,0); Q(GOLD,s); const c=new T.ConeGeometry(.28,1.2,10); c.translate(0,yt+4.6,0); Q(GOLD,c); }
    flush();
    // ================= 배경(K.life): 기년전 마당(담·기년문·동서 배전·황건전) · 단폐교 · 황궁우(회음벽) · 환구단 · 측백 숲 =================
    LIFE(()=>{
      const hf=(x,z)=>{ const r=Math.hypot(x,z); return -.12-(r>1100?(r-1100)*.02:0)+E.fbm(x*.004,z*.004,2)*.3*(r>200?1:0); };
      const inYard=(x,z)=>Math.abs(x)<82&&z>-150&&z<100, onAxis=(x,z)=>Math.abs(x)<26&&z>90&&z<760, nearRound=(x,z)=>Math.hypot(x,z-540)<44||(Math.abs(x)<82&&Math.abs(z-700)<82);
      E.terrain(-1600,1600,-1300,1900,80,90,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.03,z*.03,2); if(inYard(x,z)||onAxis(x,z)||nearRound(x,z)) return [.6+.03*n,.59+.03*n,.55]; return [.36+.06*n,.42+.06*n,.27+.04*n]; },[-60,60,-60,60]);
      // 마당 박석(전돌) — 기단 둘레
      E.plane(E.BAK,0,-.03,-25,160,250);
      // 마당 담(붉은 벽 + 푸른 기와 갓) · 기년문(남) · 동·서 배전 · 북쪽 황건전 마당
      const W=[], WC=[]; const wall=(x,z,w,d)=>{ W.push(bx(x,0,z,w,4.2,d)); WC.push(bx(x,4.2,z,w+(w>d?0:1.2),.7,d+(d>w?0:1.2))); };
      wall(-80,-25,1.6,250); wall(80,-25,1.6,250); wall(0,-150,161.6,1.6); wall(-48,100,64,1.6); wall(48,100,64,1.6); wall(0,-95,161.6,1.6);
      for(const g of W) Q(RED2,g); for(const g of WC) Q(TILE,g);
      const hall=(x,z,w,d,h,rh,yb)=>{ B(x,0,z,w+3,yb,d+3,MAR); B(x,yb,z,w,h,d,RED); B(x,yb+h-.9,z,w+.2,.9,d+.2,BAND); const g=new T.ConeGeometry(Math.hypot(w,d)/2*1.08,rh,4,1); g.rotateY(Math.PI/4); g.scale((w+3.2)/Math.max(w,d),1,(d+3.2)/Math.max(w,d)); g.translate(x,yb+h+rh/2,z); Q(TILE,g); B(x,yb+h+rh-.6,z,w>d?w*.55:.6,.7,w>d?.6:d*.55,TILE); };
      hall(0,100,26,13,6.8,5.6,1.4); B(0,1.4,106.6,7,4.8,.3,DK); // 기년문
      hall(-60,10,13,40,6,4.6,1.2); hall(60,10,13,40,6,4.6,1.2); // 동·서 배전(9칸)
      hall(0,-122,32,15,7,6,2.0); // 황건전
      // 단폐교: 기년문 남쪽 → 성정문, 북쪽이 높음(약 3 m → 1 m), 가운데 신도(돌)
      { const z0=106, z1=466, n=12; for(let i=0;i<n;i++){ const za=z0+(z1-z0)*i/n, zb=z0+(z1-z0)*(i+1)/n, h=3-2*((i+.5)/n); B(0,0,(za+zb)/2,30,h,zb-za+.05,K.col(0x8e8a84,{roughness:.95})); B(0,h,(za+zb)/2,8,.06,zb-za,MAR2); B(-11,h,(za+zb)/2,8,.04,zb-za,K.col(0xb2ada3)); B(11,h,(za+zb)/2,8,.04,zb-za,K.col(0xb2ada3)); } }
      hall(0,470,22,10,6,4.4,1.0); // 성정문
      // 황궁우: 회음벽(지름 약 65 m) + 둥근 전각 1층 푸른 원추 지붕
      { const rw=new T.CylinderGeometry(32.5,32.5,3.7,96,1,true); rw.translate(0,1.85,540); Q(K.col(0x6f6a64,{roughness:.9,side:T.DoubleSide}),rw); const rc=new T.CylinderGeometry(33.2,33.2,.6,96,1,true); rc.translate(0,4,540); Q(TILE,rc);
        const d=new T.CylinderGeometry(10,10,2.6,48); d.translate(0,1.3,530); Q(MAR,d); const dr=new T.CylinderGeometry(7.6,7.6,6.2,48); dr.translate(0,5.7,530); Q(RED,dr); const bd=new T.CylinderGeometry(8,8,.9,48,1,true); bd.translate(0,9.25,530); Q(BAND,bd);
        const rf=new T.LatheGeometry([[10.3,9.6],[10.5,10.0],[7,12.8],[3,16.4],[.5,18.6]].map(p=>new T.Vector2(p[0],p[1])),48); rf.translate(0,0,530); Q(TILE,rf); const s=new T.SphereGeometry(.8,12,8); s.translate(0,19.4,530); Q(GOLD,s);
        hall(-22,548,14,7,4.5,3.4,1.0); hall(22,548,14,7,4.5,3.4,1.0); }
      // 환구단: 흰 대리석 3단 원형 노천 제단(추정 지름 70·50·30 m) + 둘레 원·네모 담(낮은 붉은 벽)
      [[35,0,1.7],[25,1.7,3.4],[15,3.4,5.1]].forEach(([R,a,b])=>{ const g=new T.CylinderGeometry(R,R,b-a,64); g.translate(0,(a+b)/2,700); Q(MAR,g); const p=new T.CylinderGeometry(R-.3,R-.3,.9,64,1,true); p.translate(0,b+.45,700); Q(MAR2,p); });
      { const g=new T.CylinderGeometry(52,52,1.4,96,1,true); g.translate(0,.7,700); Q(K.col(0x8a3a2c,{side:T.DoubleSide}),g); } for(const [x,z,w,d] of [[0,620,160,1],[0,780,160,1],[-80,700,1,160],[80,700,1,160]]) B(x,0,z,w,1.6,d,RED2);
      flush();
      // 측백 숲(오래된 측백·회화나무, 짙은 녹색) — 마당·축선·제단 둘레는 비움
      E.forest(E.scatter(-900,900,-700,1000,13,hf,(x,z)=>!(inYard(x,z)||Math.abs(x)<92&&z>-160&&z<105)&&!onAxis(x,z)&&!nearRound(x,z)&&!(Math.abs(x)<36&&z>90&&z<770),(x,z)=>11+E.vn(x*.05,z*.05)*6,(x,z)=>E.r()<.6?2:0),{trunks:false});
      // 멀리 도시(남쪽 2환 바깥 블록, 낮게)
      const BL=[]; for(let x=-1500;x<1500;x+=70) for(let z=-1200;z<1800;z+=70){ if(Math.abs(x)<1000&&z>-800&&z<1150) continue; if(E.r()<.35) continue; BL.push([x+(E.r()-.5)*20,z+(E.r()-.5)*20,30+E.r()*20,30+E.r()*20,10+E.r()*E.r()*60,E.r()<.5?'#bdb8ad':'#a6a39b']); } E.blocks(BL);
    });
    tidySite();
  }});
