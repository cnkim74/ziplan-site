__bsigFill({"potala":function(K){
// 출처: New World Encyclopedia 'Potala Palace' — 동서 400 m × 남북 350 m, 13층 117 m, 마르포리(홍산) 위 해발 3,700 m, 경사진 석벽 평균 두께 3 m(밑 5 m), 백궁 1645~1649, 홍궁 1690~1694 증축 · UNESCO 세계유산(1994)
// 추정: 언덕 높이(평지에서 약 95 m)와 모양, 각 매스(백궁·홍궁·서쪽 승원·황색 건물)의 폭·높이·깊이, 창 간격, 지그재그 계단 위치, 포탈라 광장·기념비·약왕산·라싸강·둘레 산 거리(개략)
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
    const WATER=K.col(0x5b7f8c,{roughness:.05,metalness:.02});
    // ===== 언덕(마르포리) 높이장: 건물 매스 바닥 계산과 배경 지형이 같이 씀 =====
    const hill=(x,z)=>{ const ax=x/250, az=(z+75)/150; const d2=ax*ax+az*az; let h=d2<1?96*Math.pow(1-E.ss(Math.sqrt(d2)),.85):0; const b=Math.hypot((x+470)/120,(z-140)/90); if(b<1) h=Math.max(h,72*Math.pow(1-E.ss(b),1.1)); return h; };
    // ===== 질감: 흰 회벽 + 사다리꼴 검은 창틀(위 차양) · 붉은 벽 · 변마장(적갈색 띠) =====
    const mkT=(key,draw,tm,o,fb)=>{ const t=TX.tex('pt_'+key,512,draw); const m=new T.MeshStandardMaterial(Object.assign({color:0xffffff,map:t||null,roughness:.92},o||{})); if(!t){ m.color.setHex(fb); m.color.convertSRGBToLinear(); } m.userData.tm=tm; return m; };
    const winDraw=(base,frame,nx,ny,dens)=>(g,N,rr)=>{ g.fillStyle=base; g.fillRect(0,0,N,N); for(let k=0;k<3000;k++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.06)':'rgba(120,110,90,.06)'; g.fillRect(rr()*N,rr()*N,2,2); } for(let k=0;k<6;k++){ const x=rr()*N; const gr=g.createLinearGradient(0,0,0,N); gr.addColorStop(0,'rgba(150,130,100,.10)'); gr.addColorStop(1,'rgba(150,130,100,0)'); g.fillStyle=gr; g.fillRect(x,0,8+rr()*20,N); }
      const cw=N/nx, ch=N/ny; for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){ if(rr()>dens) continue; const cx=i*cw+cw/2+(j%2)*cw*.0, y0=j*ch+ch*.28, h=ch*.5, wt=cw*.22, wb=cw*.34; g.fillStyle=frame; g.beginPath(); g.moveTo(cx-wt,y0); g.lineTo(cx+wt,y0); g.lineTo(cx+wb,y0+h); g.lineTo(cx-wb,y0+h); g.closePath(); g.fill(); g.fillStyle='#2a1d17'; g.fillRect(cx-wt*.62,y0+h*.18,wt*1.24,h*.62); g.strokeStyle='#8a6a3c'; g.lineWidth=1.5; g.strokeRect(cx-wt*.62,y0+h*.18,wt*1.24,h*.62); g.fillStyle='#6b2a22'; g.fillRect(cx-wt*1.25,y0-ch*.08,wt*2.5,ch*.08); g.fillStyle='rgba(240,236,226,.9)'; g.fillRect(cx-wt*1.3,y0-ch*.1,wt*2.6,ch*.025); } };
    const WW=mkT('ww',winDraw('#efe9dc','#1b1714',6,6,.7),18,{},0xefe9dc);      // 흰 벽 + 창(촘촘)
    const WL=mkT('wl',winDraw('#ece5d6','#1b1714',5,4,.07),20,{},0xece5d6);      // 흰 기단 벽(창 드묾)
    const RW=mkT('rw',winDraw('#8a2a22','#17110f',6,6,.75),18,{},0x8a2a22);       // 홍궁 붉은 벽 + 창
    const YW=mkT('yw',winDraw('#d6ae4c','#1b1714',3,6,.9),12,{},0xd6ae4c);       // 황색 건물
    const BEMA=mkT('bema',(g,N,rr)=>{ g.fillStyle='#4e1f1b'; g.fillRect(0,0,N,N); for(let k=0;k<9000;k++){ g.fillStyle=rr()<.5?'rgba(110,50,40,.35)':'rgba(30,10,8,.35)'; g.fillRect(rr()*N,rr()*N,2,2); } for(let i=0;i<4;i++){ const cx=(i+.5)*N/4; g.fillStyle='#caa140'; g.beginPath(); g.arc(cx,N/2,N*.09,0,7); g.fill(); g.strokeStyle='#efd27a'; g.lineWidth=4; g.stroke(); } g.fillStyle='#f0ebe0'; g.fillRect(0,0,N,N*.08); g.fillRect(0,N*.92,N,N*.08); },6,{roughness:.95},0x4e1f1b);
    const ROCK=K.col(0x8a6f58,{roughness:1}), WHITE=K.col(0xf1ece2,{roughness:.9}), PAR=K.col(0x3a1714,{roughness:.9}), GOLD=K.col(0xd4a93c,{roughness:.3,metalness:.75}), BLK=K.col(0x1d1a18,{roughness:.9}), PV=flat(K.col(0xb7afa2,{roughness:1}));
    // 기울어진 벽 상자(world UV): 윗면이 안쪽으로 inset만큼 들어감
    const wbox=(x,y0,y1,z,w,d,mat,inset)=>{ const h=y1-y0; if(h<=.05) return; const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); const p=g.attributes.position, n=g.attributes.normal, uv=g.attributes.uv, tm=mat.userData.tm||10, ins=inset===undefined?h*.06:inset; const kx=Math.max(.2,(w-2*ins)/w), kz=Math.max(.2,(d-2*ins)/d);
      for(let i=0;i<p.count;i++){ if(p.getY(i)>h/2){ p.setX(i,p.getX(i)*kx); p.setZ(i,p.getZ(i)*kz); } } g.computeVertexNormals(); for(let i=0;i<p.count;i++){ const X=p.getX(i)+x, Y=p.getY(i)+y0, Z=p.getZ(i)+z; const ax=Math.abs(n.getX(i)), az=Math.abs(n.getZ(i)); if(ax>.5) uv.setXY(i,Z/tm,Y/tm); else if(az>.5) uv.setXY(i,X/tm,Y/tm); else uv.setXY(i,X/tm,Z/tm); } g.translate(x,y0,z); Q(mat,g); };
    const base=(x,z,w,d)=>{ let m=1e9; for(const [a,b] of [[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5],[0,.5],[0,-.5],[.5,0],[-.5,0],[0,0]]) m=Math.min(m,hill(x+a*w,z+b*d)); return Math.max(0,m-3); };
    // 매스: 아래 벽 재료 lo(y<ys) → 위 재료 up, 맨 위 변마장 띠(bh) · 흰 난간 갓
    const mass=(x,z,w,d,top,o)=>{ o=o||{}; const y0=o.y0!==undefined?o.y0:base(x,z,w,d), ins=o.ins===undefined?.07:o.ins; const ys=Math.max(y0,o.ys===undefined?y0:o.ys), bh=o.bh===undefined?0:o.bh; const H=top-y0; const wAt=y=>w-2*ins*(y-y0), dAt=y=>d-2*ins*(y-y0);
      if(ys>y0) wbox(x,y0,ys,z,w,d,o.lo||WL,ins*(ys-y0)); wbox(x,ys,top-bh,z,wAt(ys),dAt(ys),o.up||WW,ins*(top-bh-ys)); if(bh>0){ wbox(x,top-bh,top,z,wAt(top-bh)+.6,dAt(top-bh)+.6,BEMA,0); } B(x,top,z,wAt(top)+.8,.7,dAt(top)+.8,o.cap||WHITE); B(x,top+.7,z,wAt(top)-1,.15,dAt(top)-1,K.col(0xb9b0a0,{roughness:1})); return {y0,top,w:wAt(top),d:dAt(top)}; };
    // 지그재그 계단: 벽면(zf)에 붙은 경사 띠(흰 난간벽 + 짙은 갓)
    const ramp=(xa,ya,xb,yb,zf)=>{ const L=Math.hypot(xb-xa,yb-ya), a=Math.atan2(yb-ya,xb-xa); const g=new T.BoxGeometry(L,3.2,4.2); g.rotateZ(a); g.translate((xa+xb)/2,(ya+yb)/2+.6,zf+2.1); Q(WHITE,g); const c=new T.BoxGeometry(L,.5,4.4); c.rotateZ(a); c.translate((xa+xb)/2,(ya+yb)/2+2.4,zf+2.1); Q(PAR,c); const s=new T.BoxGeometry(L,1.2,.2); s.rotateZ(a); s.translate((xa+xb)/2,(ya+yb)/2-.6,zf+4.25); Q(K.col(0xd9d1c2,{roughness:1}),s); };
    const goldRoof=(x,y,z,w,d,h)=>{ B(x,y,z,w*.8,1.6,d*.8,K.col(0x7a2a20,{roughness:.8})); const g=new T.ConeGeometry(Math.hypot(w,d)/2,h,4,1); g.rotateY(Math.PI/4); g.scale(1,1,d/w); g.translate(x,y+1.6+h/2,z); Q(GOLD,g); B(x,y+1.6+h-.3,z,w*.5,.6,.5,GOLD); for(const s of [-1,1]){ const c=new T.ConeGeometry(.35,1.6,8); c.translate(x+s*w*.25,y+1.6+h+.7,z); Q(GOLD,c); } };
    const gyal=(x,y,z,s)=>{ s=s||1; C(x,y,z,.55*s,2.6*s,BLK,10,.55*s); C(x,y+2.6*s,z,.6*s,.5*s,GOLD,10,.6*s); const c=new T.ConeGeometry(.45*s,1*s,10); c.translate(x,y+3.6*s,z); Q(GOLD,c); };
    // ================= 0: 언덕 기슭 흰 기단벽(아래 테라스) · 지그재그 계단 =================
    K.layer(0);
    B(0,-.08,95,520,.08,70,PV);
    const F=mass(10,88,330,26,19,{y0:0,up:WL,ins:.18}); mass(-205,70,60,40,30,{y0:0,up:WL,ins:.2}); mass(195,64,50,44,36,{y0:0,up:WL,ins:.2,bh:2.5});
    ramp(18,0,128,18.4,101-.1); ramp(-14,0,-138,18.4,101-.1); ramp(150,0,178,15,86-.2);
    flush();
    // ================= 1: 백궁·서쪽 승원·홍궁의 큰 흰 벽(언덕을 덮고 올라가는 아랫부분, 창 드묾) =================
    K.layer(1);
    mass(102,50,140,36,44,{ins:.1,up:WL}); mass(-104,46,118,36,40,{ins:.1,up:WL}); mass(-10,46,96,40,50,{ins:.1,up:WL});
    // v21 손질: 남사면을 층층이 내려오는 흰 버팀벽(좁은 벽 매스 — 사진에서 수직 결로 읽히는 부분, 위치·높이 추정)
    for(let i=0;i<17;i++){ const x=-160+i*20; if(Math.abs(x-64)<16||Math.abs(x+68)<16) continue; mass(x,70,10,12,26+((i*7)%3)*6,{ins:.14,up:WL}); }
    ramp(158,19,64,43.5,68); ramp(-150,19,-68,39.5,64);
    flush();
    // ================= 2: 백궁(동, 위쪽 창 띠 + 변마장) · 서쪽 승원 · 홍궁 아래 흰 단 =================
    K.layer(2);
    mass(104,0,128,58,101,{ins:.07,lo:WL,ys:60,bh:4.6}); mass(150,30,40,30,64,{ins:.08,lo:WL,ys:40,bh:2.6});
    mass(-100,4,104,56,80,{ins:.07,lo:WL,ys:52,bh:3.8}); mass(-170,30,40,36,52,{ins:.1,lo:WL,ys:36,bh:2.6});
    mass(-12,8,108,46,70,{ins:.07,lo:WL,ys:52});
    flush();
    // ================= 3: 홍궁 · 황색 건물 · 금빛 지붕 · 갈첸 =================
    K.layer(3);
    const Rp=mass(-10,-16,104,44,117,{ins:.06,y0:62,lo:WW,ys:70,up:RW,bh:5.5});
    B(-10,100,6.6,14,10,1.2,K.col(0x2a1712,{roughness:.9})); B(-10,110,7.2,17,.6,1.6,GOLD); // 홍궁 정면 가운데 큰 차양(검은 휘장) 
    mass(40,-14,15,40,108,{ins:.05,y0:70,up:YW,bh:3});
    for(const [x,z,w,d,h] of [[-36,-24,10,12,5.2],[-20,-30,9,11,4.8],[-2,-26,11,13,5.6],[14,-30,9,10,4.6],[-28,-6,7,8,3.6]]) goldRoof(x,117.7,z,w,d,h);
    for(const [x,z] of [[-52,4],[32,4],[-52,-36],[32,-36],[-10,5.5],[-30,5.5],[10,5.5]]) gyal(x,117.7,z);
    for(const [x,z] of [[48,4],[156,4],[48,-40],[156,-40],[102,-1]]) gyal(x,98.7,z,.8);
    flush();
    // ================= 배경(K.life): 마르포리 북쪽 사면·약왕산 · 쇨 마을과 성벽 · 포탈라 광장·기념비 · 라싸 시가 · 라싸강 · 둘레 산 =================
    LIFE(()=>{
      const PK=[[0,-5600,3000,1100,1150,1.2],[-3600,-1500,1400,2600,980,1.3],[3800,-1200,1500,2600,1050,1.25],[-1600,3600,2600,900,900,1.2],[2200,3800,2400,900,1000,1.2],[-4800,2500,1200,1400,800,1.2],[5200,2600,1300,1500,900,1.2]];
      const valley=(x,z)=>E.ss((Math.abs(z-900)-1500)/900);
      const hf=(x,z)=>{ let h=hill(x,z); h=Math.max(h,E.peaks(x,z,PK)*(.75+.5*E.fbm(x*.0012,z*.0012,3))); h+=E.ridged(x*.0018,z*.0018)*220*valley(x,z)+(h>40?E.ridged(x*.004,z*.004)*h*.18:0); if(Math.abs(z-2200)<160) h=Math.min(h,-1.5); return h; };
      let CF; const TR=E.terrain(-7000,7000,-6500,7000,140,140,hf,CF=(x,z,h,ny)=>{ const n=E.fbm(x*.01,z*.01,2); if(h<-1) return [.52,.56,.5]; if(h<3) return [.68+.04*n,.64+.04*n,.56+.03*n]; if(Math.hypot(x/260,(z+75)/165)<1||Math.hypot((x+470)/125,(z-140)/95)<1){ const g=E.vn(x*.05,z*.05); return g>.62?[.36,.4,.26]:[.5+.06*n,.38+.05*n,.3+.04*n]; } const t=Math.min(1,h/600); const lo=[.52+.06*n,.46+.05*n,.34+.04*n], hi=[.62+.05*n,.55+.04*n,.46+.03*n]; let c=lo.map((v,i)=>v+(hi[i]-v)*t); if(h>900) c=c.map(v=>v+(.92-v)*E.ss((h-900)/250)); if(ny<.75) c=c.map(v=>v*.9); return c; },[-700,700,-500,400]);
      E.terrain(-700,700,-500,400,140,90,hf,CF);
      // 언덕 바위(건물 사이로 보이는 붉은 갈색 바위, 지형 위에 덧칠)
      // 쇨 마을 성벽(앞쪽 사각) · 모서리 둥근 망루 · 남문
      for(const [x,z,w,d] of [[-120,172,220,3],[130,172,200,3],[-232,120,3,104],[232,120,3,104]]) B(x,0,z,w,7,d,WHITE);
      for(const [x,z,w,d] of [[-120,172,221,3.6],[130,172,201,3.6],[-232,120,3.6,105],[232,120,3.6,105]]) B(x,7,z,w,.6,d,PAR);
      for(const x of [-232,232]){ C(x,0,172,9,15,WHITE,24,8.2); C(x,15,172,8.4,1.2,PAR,24,8.4); } B(5,0,172,22,12,8,WHITE); B(5,12,172,23,1,9,PAR); B(5,0,176.1,7,6,.2,BLK);
      const SH=[]; for(let x=-220;x<220;x+=17) for(let z=118;z<165;z+=15){ if(E.r()<.2) continue; SH.push([x+(E.r()-.5)*4,z,12+E.r()*4,10+E.r()*3,5+E.r()*5,E.r()<.7?'#ece6d8':'#d9cdb6']); } E.blocks(SH);
      // 베이징중로 · 포탈라 광장(전돌) · 평화해방기념비(추정 높이 37 m)
      E.plane(K.col(0x5a5a58,{roughness:.95}),0,.05,205,3000,34);
      E.plane(E.BAK,0,.06,330,420,200);
      { const g=new T.BufferGeometry(); const P=[[-7,0,-4],[7,0,-4],[7,0,4],[-7,0,4],[-1.5,37,-1],[1.5,37,-1],[1,37,1],[-1,37,1]]; const I=[0,4,1,1,4,5,1,5,2,2,5,6,2,6,3,3,6,7,3,7,0,0,7,4,4,7,6,4,6,5]; const pos=[]; I.forEach(i=>pos.push(...P[i])); g.setAttribute('position',new T.Float32BufferAttribute(pos,3)); g.computeVertexNormals(); g.translate(0,0,300); Q(K.col(0xe4e0d8,{roughness:.7}),g); B(0,0,300,26,1.2,26,K.col(0x9a948a)); }
      for(let i=0;i<10;i++){ C(-200+i*44,0,236,.4,7,K.col(0x8d8a86),8,.3); } // 광장 가로등
      // 라싸 시가(낮은 흰 건물) · 라싸강
      const BL=[]; for(let x=-2600;x<2600;x+=46) for(let z=-900;z<2100;z+=46){ const xx=x+(E.r()-.5)*10, zz=z+(E.r()-.5)*10; if(xx>-280&&xx<280&&zz>-320&&zz<440) continue; if(Math.hypot((xx+470)/150,(zz-140)/120)<1) continue; if(hf(xx,zz)>3||E.r()<.25) continue; BL.push([xx,zz,18+E.r()*18,16+E.r()*18,6+E.r()*E.r()*24,E.r()<.6?'#e8e2d4':(E.r()<.5?'#cbbfa8':'#b9b4ab')]); } E.blocks(BL);
      { const g=new T.PlaneGeometry(14000,300); g.rotateX(-Math.PI/2); g.translate(0,-1,2200); Q(WATER,g); }
      // 루캉(용왕담) 공원 — 언덕 북쪽 연못 · 버드나무·포플러
      { const g=new T.CylinderGeometry(55,55,.2,40); g.scale(1.6,1,1); g.translate(0,-.05,-310); Q(WATER,g); }
      flush();
      E.forest(E.scatter(-300,300,-420,-200,12,hf,(x,z,h)=>h<4&&Math.hypot(x/1.6,z+310)>60,()=>10+E.r()*5,0),{trunks:true});
      E.forest(E.scatter(-2500,2500,200,2050,60,hf,(x,z,h)=>h<3&&E.r()<.35&&!(Math.abs(x)<300&&z<450),()=>9+E.r()*5,(x,z)=>E.r()<.5?2:0),{trunks:false});
      // 착포리(약왕산) 꼭대기 송신탑
      C(-470,70,140,1.2,40,K.col(0xb44a3a,{roughness:.6}),6,.4);
    });
    tidySite();
  }});
