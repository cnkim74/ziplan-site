__bsigFill({"bonte":function(K){
// 출처: 2012 설립 · 설계 안도 다다오 · 노출 콘크리트 주재료 + 한국 전통 기와 담장·돌담길, 건물 사이 좁고 긴 물길·작은 호수·입구의 수벽, 개관 당시 2개 관 → 현재 5개 관 — 전북일보 「[팔도 건축기행] 제주도 본태박물관」(2024) · 신관 본스타: 높이 8.28 m, 지하 1층·지상 2층, 노출 콘크리트 위 스테인리스 외장, 2026.3 개관 — 마리끌레르(2026.2)
// 추정: 두 동의 크기·배치(1관 46 × 13 m, 2관 40 × 12 m, 높이 8~8.5 m), 담장 길이·물길 폭, 본스타 위치·크기, 대지 경사(남쪽으로 약 3%) — 공개 도면 없음, 항공사진 인상으로 개략
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
    const CO=TX.ando('bt','#cbc7bf'), CO2=TX.ando('bt2','#c1bdb5'), DAM=TX.toDam(), BAS=TX.basalt(), GI=K.M.giwa, GLW=K.col(0x34424b,{roughness:.06,metalness:.72}), GLC=K.col(0x8fb0bf,{roughness:.05,metalness:.5,transparent:true,opacity:.38,depthWrite:false}), FR=K.col(0x2f3236,{roughness:.45,metalness:.5}), WT=K.col(0x4f7f95,{roughness:.04,metalness:.55,transparent:true,opacity:.86}), WTF=K.col(0xdfeef3,{roughness:.1,metalness:.2,transparent:true,opacity:.55,depthWrite:false}), PAV=K.col(0xb9b4aa,{roughness:.95}), STN=K.col(0x8f8a82,{roughness:.9}), SS=K.col(0xe2e6ea,{roughness:.28,metalness:.5}), GRS=K.col(0x7d9a5c,{roughness:1}), DKG=K.col(0x2d3a2c,{roughness:1});
    const HOLE=[-48,56,-32,38];
    const Bm=(x,y,z,w,h,d,m,ry)=>B(x,y,-z,w,h,d,m,ry?-ry:0); // 배치를 남북으로 뒤집어 씀(진입 담장이 남쪽 정면)
    K.layer(0);
    // 대지: 단 두 개(북쪽 1관 단 +1.2 m, 남쪽 2관·수공간 단 0) — 옹벽은 콘크리트, 마당은 판석·잔디
    Bm(4,-.3,-3,104,.3,70,GRS); Bm(4,0,-25,104,.06,26,PAV); 
    for(let i=0;i<10;i++) Bm(-46+i*1.2,0,-22,.6,.08,3.2,STN);
    // 제1관(전통공예) — 46 × 13 m, 높이 8.5 m, 1~2층이 한 공간. 남쪽 수공간 쪽 1층 띠창, 동쪽 끝 모서리 유리 로비
    { const x=-7, z=-12, w=46, d=13, h=8.5, t=.4;
      Bm(x-w/2+t/2,0,z,t,h,d,CO); Bm(x,0,z-d/2+t/2,w,h,t,CO); Bm(x-3,0,z+d/2-t/2,w-6,1.0,t,CO); Bm(x-3,3.4,z+d/2-t/2,w-6,h-3.4,t,CO); Bm(x-3,1.0,z+d/2-.15,w-6,2.4,.05,GLW); for(let i=0;i<=10;i++) Bm(x-w/2+3+i*(w-6)/10-3+0,1.0,z+d/2-.1,.08,2.4,.1,FR);
      Bm(x+w/2-3,0,z+d/2-.2,6,h-.6,.06,GLC); Bm(x+w/2-.2,0,z+1.5,.06,h-.6,d-3,GLC); Bm(x+w/2-t/2,0,z-d/2+1.5,t,h,3,CO); for(const k of [0,1,2]) Bm(x+w/2-6+k*3,0,z+d/2-.15,.08,h-.6,.1,FR); Bm(x+w/2-3,h-.6,z,6,.6,d,CO);
      Bm(x+6,5.4,z-d/2-.02,18,.35,.06,GLW); Bm(x,0,z,w-1,.2,d-1,K.col(0x6d6a65)); }
    // 제2관(현대미술) — 40 × 12 m, 수공간 쪽으로 긴 유리면, 서쪽 끝 높은 홀(명상실 쪽), 두 동을 잇는 유리 브리지
    { const x=-8, z=10, w=40, d=12, h=8, t=.4;
      Bm(x-w/2+t/2,0,z,t,h,d,CO); Bm(x+w/2-t/2,0,z,t,h,d,CO); Bm(x,0,z+d/2-t/2,w,h,t,CO); Bm(x+4,0,z-d/2+t/2,w-8,.6,t,CO); Bm(x+4,4.4,z-d/2+t/2,w-8,h-4.4,t,CO); Bm(x+4,.6,z-d/2+.15,w-8,3.8,.05,GLW); for(let i=0;i<=8;i++) Bm(x-w/2+4+i*(w-8)/8,.6,z-d/2+.1,.08,3.8,.1,FR);
      Bm(x-w/2+4,0,z-d/2+t/2,8,h,t,CO2); Bm(x-w/2+2.5,0,z,5,h+2.5,d,CO); Bm(x,0,z,w-1,.2,d-1,K.col(0x6d6a65));
      Bm(x+14,0,z+d/2+3,14,.6,6,CO2); Bm(x+14,.6,z+d/2+3,13.2,.04,5.2,WT); } // 남쪽 카페 앞 작은 연못(연꽃)
    // 두 동 사이 수공간: 1관 단(+1.2)에서 계단식으로 흘러내리는 얕은 물 + 수벽
    { const x=-8, z=-1.5; Bm(x,0,z,34,.35,8.6,CO2); Bm(x,.35,z,33.2,.03,7.8,WT); for(let i=0;i<3;i++){ Bm(x+18+i*1.6,0,z,1.6,.35+.3*(i+1),8.6,CO2); Bm(x+18+i*1.6,.35+.3*(i+1),z,1.5,.03,7.8,WT); } Bm(x+23,0,z,1.2,2.4,8.6,CO); Bm(x+22.38,.4,z,.04,2.0,7.6,WTF);
      for(let i=0;i<6;i++) Bm(x-12+i*5,.36,z+2.2,.8,.1,.8,STN); Bm(x-17.4,0,z,.4,1.6,8.6,CO2); }
    // 유리 브리지(1관 서쪽 끝 ↔ 2관) — 콘크리트 바닥·지붕 + 유리
    Bm(-27,4.2,-1.5,3.2,.3,9.6,CO); Bm(-27,7.6,-1.5,3.4,.3,9.6,CO); Bm(-28.55,4.5,-1.5,.06,3.1,9.6,GLC); Bm(-25.45,4.5,-1.5,.06,3.1,9.6,GLC);
    // 진입로: 동쪽 주차장 → 기와 담장(돌 기단 + 흙담 + 기와 지붕) 남쪽 판석 길 → 물길(폭 약 .6 m) → 1관 로비
    { const z=-25, x0=-14, x1=48, L=x1-x0, xm=(x0+x1)/2; Bm(xm,0,z-.9,L,.5,.7,BAS); Bm(xm,.5,z-.9,L,1.5,.55,DAM); Bm(xm,2.0,z-.9,L+.2,.12,.9,K.col(0x8e8a84));
      { const sh=new T.Shape(); sh.moveTo(-.75,0); sh.quadraticCurveTo(-.3,.12,0,.42); sh.quadraticCurveTo(.3,.12,.75,0); sh.lineTo(-.75,0); const g=new T.ExtrudeGeometry(sh,{depth:L+.6,bevelEnabled:false}); g.translate(0,0,-(L+.6)/2); g.rotateY(Math.PI/2); g.translate(xm,2.12,-(z-.9)); Q(GI,g); Bm(xm,2.5,z-.9,L+.6,.12,.18,K.col(0x3d3f42)); }
      Bm(xm,0,z-.25,L,.3,.7,BAS); Bm(xm,.06,z-.25,L-.4,.2,.5,WT); for(let i=0;i<26;i++) Bm(x0+1.2+i*2.35,.04,z+1.3,2.1,.06,1.6,PAV); }
    // 본스타(신관, 2026) — 높이 8.28 m, 노출 콘크리트 위 세로 스테인리스 패널(하늘을 비춤), 옥상 산책로. 위치·평면 크기는 추정
    { const x=33, z=-11, w=14, d=10, h=8.28; Bm(x,0,z,w,h,d,CO2); for(let i=0;i<=28;i++){ const u=-w/2+i*w/28; Bm(x+u,.0,z+d/2+.06,.48,h-.1,.08,SS); Bm(x+u,.0,z-d/2-.06,.48,h-.1,.08,SS); } for(let i=0;i<=20;i++){ const u=-d/2+i*d/20; Bm(x+w/2+.06,0,z+u,.08,h-.1,.48,SS); Bm(x-w/2-.06,0,z+u,.08,h-.1,.48,SS); }
      Bm(x-2,0,z+d/2+.12,3,2.6,.06,GLW); Bm(x,h,z,w+.3,.15,d+.3,CO2); Bm(x,h+.15,z+d/2,w,1.1,.04,GLC); Bm(x,h+.15,z-d/2,w,1.1,.04,GLC); Bm(x+w/2,h+.15,z,.04,1.1,d,GLC); Bm(x-w/2,h+.15,z,.04,1.1,d,GLC); }
    flush();
    // ---- 배경(v15, K.life): 제주 중산간 — 남쪽으로 내려가는 완만한 땅, 현무암 밭담으로 나뉜 귤밭·초지, 곰솔·삼나무 방풍림, 남서쪽 산방산(종 모양 용암돔, 원경 축약), 남쪽 멀리 바다, 북쪽 한라산 자락. 배치·높이 개략(추정) ----
    { const L0=K.cur; K.cur=K.life;
      const dOut=(x,z)=>Math.hypot(Math.max(HOLE[0]-x,0,x-HOLE[1]),Math.max(HOLE[2]-z,0,z-HOLE[3]));
      const MT=[[-430,520,120,110,95,1.6],[60,-1500,1300,700,260,1.2],[-900,-500,500,300,60,1.3],[700,-400,400,260,45,1.3]];
      const hf=(x,z)=>{ const d=dOut(x,z); const base=-z*.035*E.ss(d/60)+E.fbm(x*.01,z*.01,3)*4*E.ss(d/80); const sea=z>620?-(z-620)*.2:0; return Math.max(-6,.06+base+E.peaks(x,z,MT)+sea); };
      const clr=(x,z)=>{ const a=Math.atan2(z-3,x-4), r=Math.hypot(x-4,z-3); return r<130&&a>.05&&a<2.7; }; const field=(x,z)=>{ const i=Math.floor((x+2000)/38), j=Math.floor((z+2000)/30); return E.vn(i*1.7,j*1.3); };
      const TR=E.terrain(-1100,1100,-1600,1100,110,110,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.04,z*.04,2); if(z>640&&h<.5) return [.36,.52,.6]; if(dOut(x,z)<4) return [.55+.04*n,.6+.04*n,.45]; if(Math.hypot(x+430,z-520)<130&&h>20) return E.mcol(x,z,h,ny,{cliff:.9,low:0}); const f=field(x,z); if(f<.35) return [.33+.05*n,.42+.05*n,.24]; if(f<.6) return [.6+.05*n,.62+.05*n,.42]; if(f<.8) return [.46+.04*n,.36+.03*n,.27]; return [.42+.05*n,.5+.05*n,.3]; },HOLE);
      { const g=new T.PlaneGeometry(4000,1200); g.rotateX(-Math.PI/2); const m=new T.Mesh(g,K.col(0x4f7f95,{roughness:.1,metalness:.5})); m.position.set(0,-2,1300); K.life.add(m); }
      // 밭담(현무암) — 밭 경계를 따라 낮은 검은 돌담
      for(let gx=-380;gx<380;gx+=38) for(let gz=-320;gz<420;gz+=30){ if(dOut(gx,gz)<10||E.r()<.35) continue; const y=TR.h(gx+19,gz); B(gx+19,y-.1,gz,38,1.0,.6,BAS); if(E.r()<.6){ const y2=TR.h(gx,gz+15); B(gx,y2-.1,gz+15,.6,1.0,30,BAS); } }
      flush();
      // 귤밭(낮고 짙은 둥근 나무 줄) · 방풍림(삼나무·곰솔) · 대지 주변 소나무
      const L=[]; for(let gx=-380;gx<380;gx+=38) for(let gz=-320;gz<420;gz+=30){ const f=field(gx+5,gz+5); if(dOut(gx,gz)<14) continue; if(clr(gx+15,gz+12)&&f>.85) continue; if(f<.35){ for(let i=0;i<5;i++) for(let j=0;j<4;j++){ const x=gx+4+i*7, z=gz+4+j*6.5; if(clr(x,z)&&Math.hypot(x-4,z-3)<90) continue; L.push([x,TR.h(x,z),z,3.2,0,.1+E.r()*.2,1.2]); } } else if(f>.85){ for(let i=0;i<10;i++){ const x=gx+i*3.8, z=gz; L.push([x,TR.h(x,z),z,13+E.r()*4,2,E.r(),.6]); } } }
      E.forest(L,{trunks:false}); E.forest(E.scatter(-120,140,-130,110,9,TR.h,(x,z,h)=>dOut(x,z)>6&&dOut(x,z)<55&&!clr(x,z)&&E.r()<.55,()=>8+E.r()*5,()=>E.r()<.6?1:0),{trunks:false});
      K.cur=L0; }
    K.layer(1);
    Bm(-7,8.5,-12,46.4,.25,13.4,CO); Bm(-7,8.75,-12,45.6,.12,12.6,K.col(0x8f8b84)); Bm(-12,8.87,-12,24,.15,1.2,GLC); Bm(-8,8.25,10,39.6,.12,11.6,K.col(0x8f8b84)); for(const [x,z] of [[-24,-14],[8,-9],[4,12],[-20,12]]) Bm(x,8.8,z,1.6,.9,1.2,K.col(0x9a968f)); Bm(-8,8,10,40.4,.25,12.4,CO); Bm(-10,10.5,10,5.2,.25,12.2,CO); Bm(-8,8.25,10,39.6,.12,11.6,K.col(0x8f8b84));
    flush();
    tidySite();
  }});
