__bsigFill({"seoullo":function(K){
// 출처: 총 길이 1,024 m(고가 810 m + 회현 쪽 지상 214 m), 폭 10.3 m, 가장 높은 곳 17 m, 2017.5.20 개장, 원형 화분 645개(66종 크기, 높이 45·65·95 cm, 지름 1,240~4,800 mm), 24,085주 228종(50과), 조명 기둥 111·조명 555·링 조명 551, 강화유리 난간 1,086장, 엘리베이터 6·에스컬레이터 1, 상판 327개 교체, 고가 1970.8.15~2015.12.13 차량 통행 — 서울시 주택분야 누리집 「서울로 7017」 · 설계 MVRDV, 1970 준공 도로교 · 구조 PSC T형 거더 — Structurae
// 추정: 모형 구간(약 170 m)의 데크 높이 11 m, 교각 간격 25 m, 거더 4줄, 화분 배치, 철로·도로·옛 서울역·서울스퀘어의 위치(개략, 실제 방위와 다를 수 있음)
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
    const HD=11, WD=10.3, L=100, x0=-L/2; let sd=11; const rr=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
    const CO=K.col(0xb9b6b0,{roughness:.85}), CO2=K.col(0xa9a69f,{roughness:.9}), DECK=K.col(0xd9d6cf,{roughness:.9}), JNT=K.col(0xb3afa7,{roughness:.9}), POT=K.col(0xe6e4df,{roughness:.6}), SOIL=K.col(0x6b5845,{roughness:1}), GLR=K.col(0xbcd3dc,{roughness:.05,metalness:.3,transparent:true,opacity:.3,depthWrite:false}), ALU=K.col(0xb8bcc0,{roughness:.35,metalness:.6}), RING=K.col(0xa9c8ff,{roughness:.4,emissive:0x3a6cff,emissiveIntensity:.15}), LMP=K.col(0xf4f1ea,{emissive:0xffe2a8,emissiveIntensity:.2}), GLE=K.col(0x8fb0bf,{roughness:.05,metalness:.5,transparent:true,opacity:.4,depthWrite:false}), DK=K.col(0x3a3d40,{roughness:.5,metalness:.4});
    // 0: 교각(옛 고가 RC 기둥 + 횡보) — 25 m 간격
    K.layer(0);
    for(let x=x0+10;x<=L/2;x+=25){ B(x,0,0,1.8,HD-3.4,2.4,CO); B(x,0,0,2.6,.4,3.2,CO2); B(x,HD-3.4,0,2.0,1.2,WD-1.2,CO); }
    flush();
    // 1: 상판 — T형 거더 4줄 + 슬래브 + 옆면 테두리, 보행 바닥(줄눈), 강화유리 난간 + 손스침
    K.layer(1);
    for(const z of [-3.6,-1.2,1.2,3.6]){ B(0,HD-2.2,z,L,1.6,.5,CO); B(0,HD-.75,z,L,.25,1.6,CO); } B(0,HD-.5,0,L,.4,WD,CO); B(0,HD-.6,WD/2-.15,L,.7,.3,CO2); B(0,HD-.6,-WD/2+.15,L,.7,.3,CO2);
    B(0,HD-.1,0,L,.12,WD-.6,DECK); for(let x=x0;x<=L/2;x+=2.4) B(x,HD+.02,0,.06,.01,WD-.6,JNT); for(const z of [-2.2,2.2]) B(0,HD+.02,z,L,.01,.05,JNT);
    for(const s of [-1,1]){ const z=s*(WD/2-.25); B(0,HD-.1,z,L,1.25,.04,GLR); B(0,HD+1.15,z,L,.07,.12,ALU); for(let x=x0;x<=L/2;x+=1.9) B(x,HD-.1,z,.06,1.22,.08,ALU); }
    // 조명 기둥(가는 원통 + 머리) — 약 15 m 간격, 양쪽 엇갈림
    for(let x=x0+6,i=0;x<L/2;x+=15,i++){ const z=(i%2?1:-1)*(WD/2-.7); C(x,HD,z,.09,5.2,ALU,8,.07); B(x,HD+5.2,z,.5,.18,.5,LMP); }
    // 엘리베이터(유리 승강로) + 계단 — 데크 옆으로 땅에 닿음
    { const x=8, z=WD/2+2.2; B(x,0,z,3.2,HD+3,3.2,GLE); for(const [a,b] of [[-1,-1],[1,-1],[-1,1],[1,1]]) B(x+a*1.55,0,z+b*1.55,.15,HD+3,.15,DK); B(x,HD+3,z,3.6,.3,3.6,DK); B(x,HD-.1,WD/2+.35,3,.12,1.2,DECK); B(x,0,z,4,.3,4,CO2); }
    { const x1=64, n=50; for(let i=0;i<n;i++){ const t=(i+.5)/n; B(x1-t*18,t*HD-.1,-WD/2-1.2,.36,.12,1.8,CO2); } B(x1-9,HD*.5-.6,-WD/2-2.15,18.5,1.1,.04,GLR); for(let x=x1-18;x<=x1-2;x+=4) B(x,0,-WD/2-1.2,.5,(x1-x)/18*HD-.4,.5,CO); B(x1-19,HD-.4,-WD/2-1.2,2,.3,1.8,CO2); }
    flush();
    // 2: 원형 화분(지름 1.24~4.8 m, 높이 .45/.65/.95) + 흙 + 링 조명, 식물(나무·관목)
    K.layer(2);
    const PL=[], CI=[], HTS=[.45,.65,.95]; let x=x0+1.5, side=1;
    while(x<L/2-1.5){ const big=rr()<.32; const r=big?1.6+rr()*.8:.62+rr()*.85; const h=HTS[Math.floor(rr()*3)]; let z=side*(WD/2-.55-r)+(rr()-.5)*.6; if(rr()<.18) z=(rr()-.5)*1.2; z=Math.max(-WD/2+.5+r,Math.min(WD/2-.5-r,z));
      if((Math.abs(x-8)<2.5&&z>0)||CI.some(c=>Math.hypot(c[0]-x,c[1]-z)<c[2]+r+.35)){ x+=.6; continue; } CI.push([x,z,r]);
      const g=new T.CylinderGeometry(r,r*.98,h,28); g.translate(x,HD+h/2,z); Q(POT,g); const s=new T.CylinderGeometry(r-.08,r-.08,.04,24); s.translate(x,HD+h-.06,z); Q(SOIL,s); const ring=new T.TorusGeometry(r+.01,.035,4,28); ring.rotateX(Math.PI/2); ring.translate(x,HD+h-.03,z); Q(RING,ring);
      if(r>1.5) PL.push([x,HD+h-.1,z,4+rr()*3.5,rr()<.25?2:0,rr(),1]); else { PL.push([x,HD+h-.1,z,.9+r*.9,0,rr(),1.5*r/(.9+r*.9)+.4]); if(rr()<.5) PL.push([x+(rr()-.5)*r,HD+h-.1,z+(rr()-.5)*r,.6+rr()*.5,0,rr(),1.3]); }
      { const st=rr()<.55; x+=st?.3+rr()*.6:r*2+.35+rr()*.9; side=st||rr()<.6?-side:side; } }
    flush(); E.forest(PL,{trunks:true,grp:K.cur,cast:true});
    // ---- 배경(v15, K.life): 서울역 일대 — 데크가 모형 구간 밖으로 이어짐(양쪽 각 250 m), 아래 서울역 철로(자갈 도상·레일·KTX·전철)와 플랫폼 지붕, 도로(차량), 옛 서울역(1925 붉은 벽돌·돔), 서울스퀘어, 남산 쪽 도심 블록. 위치는 개략(추정) ----
    { const L0=K.cur; K.cur=K.life;
      { const g=new T.PlaneGeometry(3000,3000); g.rotateX(-Math.PI/2); const m=new T.Mesh(g,K.col(0xa9a69f,{roughness:1})); m.position.y=-.02; m.receiveShadow=true; K.life.add(m); }
      // 데크 연장(단순화): 교각 + 상판 + 난간 + 화분 몇 개
      for(const s of [-1,1]){ const xa=s*(L/2+125); for(let xx=s*(L/2+15);Math.abs(xx)<L/2+250;xx+=s*25){ B(xx,0,0,1.8,HD-3.4,2.4,CO); B(xx,HD-3.4,0,2,1.2,WD-1.2,CO); } for(const z of [-3.6,-1.2,1.2,3.6]) B(xa,HD-2.2,z,250,1.6,.5,CO); B(xa,HD-.6,0,250,.6,WD,CO); B(xa,HD,0,250,.06,WD-.6,DECK); for(const zz of [-1,1]){ B(xa,HD,zz*(WD/2-.25),250,1.2,.04,GLR); B(xa,HD+1.15,zz*(WD/2-.25),250,.07,.12,ALU); }
        for(let k=0;k<40;k++){ const xx=s*(L/2+4+k*6.1+rr()*2), r=.7+rr()*1.4, z=(k%2?1:-1)*(WD/2-.6-r); const g=new T.CylinderGeometry(r,r,.65,18); g.translate(xx,HD+.33,z); Q(POT,g); } }
      // 철로(서울역 북쪽 구간) — 자갈 도상, 레일, 플랫폼·지붕, 열차
      const BAL=K.col(0x8c8478,{roughness:1}), RAIL=K.col(0x6b6e72,{roughness:.4,metalness:.7}), SLP=K.col(0x9a948a,{roughness:.9});
      B(-45,0,0,70,.25,600,BAL); for(let i=0;i<9;i++){ const x=-75+i*7.4; for(const d of [-.72,.72]) B(x+d,.25,0,.08,.15,600,RAIL); }
      for(let i=0;i<2;i++){ const x=-60+i*30; B(x,0,60,8,1.1,180,K.col(0xc9c4ba)); for(let z=-20;z<=140;z+=10) B(x,1.1,z+10,.3,4.5,.3,DK); B(x,5.6,60,10,.3,170,K.col(0xdedcd6,{roughness:.6,metalness:.2})); }
      const KTX=K.col(0xf2f2f0,{roughness:.35,metalness:.2}), BLU=K.col(0x2f5fae,{roughness:.4}), WIN=K.col(0x1f262c,{roughness:.1,metalness:.6});
      for(const [x,z0,n,col] of [[-67.6,-40,8,KTX],[-38,60,6,K.col(0xd7d9db,{roughness:.4,metalness:.3})]]){ for(let i=0;i<n;i++){ const z=z0+i*20.5; B(x,.6,z,3.0,3.4,20,col); B(x,2.3,z,3.04,.9,18,WIN); B(x,.9,z,3.04,.3,20,col===KTX?BLU:K.col(0x2e7d5b)); } }
      // 도로(데크 동쪽 아래) — 왕복 8차로, 차선, 건널목, 차
      const ASP=K.col(0x4f5256,{roughness:.95}), LN=K.col(0xe9e7e0);
      B(38,0,0,30,.06,600,ASP); for(const d of [-7.5,-3.75,3.75,7.5]) for(let z=-290;z<290;z+=9) B(38+d,.06,z,.15,.01,4.5,LN); B(38,.06,0,.3,.01,600,K.col(0xe0c341)); for(let i=0;i<12;i++) B(38,.06,-18+i*.9,30,.01,.45,LN);
      const CAR=[0xe8e8e6,0x23262a,0x8a949c,0x9c2b28,0x2d4a6e]; for(let i=0;i<18;i++){ const ln=[-9.4,-5.6,-1.9,1.9,5.6,9.4][i%6], z=-140+i*17+rr()*6; B(38+ln,.15,z,1.8,.8,4.4,K.col(CAR[i%5],{roughness:.3,metalness:.4})); B(38+ln,.95,z,1.6,.55,2.3,WIN); } for(let i=0;i<3;i++){ const z=-60+i*55; B(38+(i%2?7.5:-7.5),.2,z,2.5,2.9,11,K.col(0x3b8f4a,{roughness:.4})); B(38+(i%2?7.5:-7.5),1.6,z,2.54,1.0,10,WIN); }
      B(64,0,0,22,.12,600,K.col(0xbdb8ae,{roughness:.95}));
      // 옛 서울역(1925, 현 문화역서울284) — 붉은 벽돌 + 화강석 띠·창틀, 가운데 돔(비잔틴풍) — 크기 개략
      { const x=40, z=-80, BR=K.col(0x9a4f3d,{roughness:.9}), ST=K.col(0xd9d2c3,{roughness:.8}), DM=K.col(0x4f5a55,{roughness:.6,metalness:.3});
        B(x,0,z,74,12,22,BR); B(x,0,z,74.4,1.6,22.4,ST); B(x,6,z,74.3,.5,22.3,ST); B(x,12,z,74.6,.8,22.6,ST); for(const s of [-1,1]){ B(x+s*31,0,z,12,15,24,BR); B(x+s*31,15,z,12.4,.7,24.4,ST); }
        B(x,0,z,22,16,26,BR); B(x,16,z,22.4,.8,26.4,ST); const dr=new T.CylinderGeometry(7.4,7.6,4,24); dr.translate(x,18.8,z); Q(ST,dr); const dm=new T.SphereGeometry(7.6,24,12,0,Math.PI*2,0,Math.PI/2); dm.scale(1,1.15,1); dm.translate(x,20.8,z); Q(DM,dm); C(x,29.4,z,.5,2.5,DM,8,.2);
        for(let i=0;i<14;i++){ const xx=x-33+i*5.1; if(Math.abs(xx-x)<11.5) continue; B(xx,2.2,z+11.05,1.6,3,.1,WIN); B(xx,7.6,z+11.05,1.6,3,.1,WIN); } for(let i=0;i<3;i++) B(x-6+i*6,1,z+13.05,4,6,.1,WIN); }
      // 새 서울역(유리 역사, 개략) · 서울스퀘어(옛 대우빌딩, 짙은 외벽 대형 오피스) · 도심 블록
      B(-30,0,-130,120,22,50,K.col(0x9fb6c3,{roughness:.1,metalness:.5})); B(-30,22,-130,124,1,54,K.col(0xdcdad4));
      { const x=150, z=-70, SQ=TX.cw('sq','#3a332d','#6b5e52','#2a241f',12,16,40,{metalness:.25,roughness:.5}); B(x,0,z,100,82,46,SQ); B(x,82,z,100.5,1.2,46.5,K.col(0x2a2622)); }
      const BL=[]; for(let gx=-700;gx<700;gx+=46) for(let gz=-700;gz<700;gz+=46){ const xx=gx+(rr()-.5)*10, zz=gz+(rr()-.5)*10; if(Math.abs(zz)<26&&Math.abs(xx)<480) continue; if(xx>-90&&xx<-2) continue; if(xx>20&&xx<78&&Math.abs(zz)<300) continue; if(Math.hypot(xx-40,zz+80)<60||Math.hypot(xx-150,zz+70)<70||Math.hypot(xx+30,zz+130)<75) continue; const an=Math.atan2(zz,xx), r=Math.hypot(xx,zz); if(r<200&&an>.1&&an<2.4) continue; BL.push([xx,zz,22+rr()*18,22+rr()*18,10+rr()*rr()*90,rr()<.4?'#8e9ba5':rr()<.5?'#b8b3aa':'#a29e96']); } E.blocks(BL);
      // 남산(남동쪽 원경, 축약)
      E.terrain(200,1400,-1400,-200,40,40,(x,z)=>E.peaks(x,z,[[800,-800,600,500,170,1.4]])-1,(x,z,h,ny)=>E.mcol(x,z,h,ny,{low:2}));
      flush(); K.cur=L0; }
    tidySite();
  }});
