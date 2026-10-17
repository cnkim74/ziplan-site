__bsigFill({"suzhoumuseum":function(K){
// 출처: Wikipedia 'Suzhou Museum' — I. M. 페이 + 페이 파트너십, 2006-10-06 개관, 대지 10,700 ㎡, 신관 연면적 19,000 ㎡ 이상, 흰 회벽 + 흑·백·회색 팔레트, 지붕은 ‘중국흑’ 화강석 판 + 철골·유리, 지붕 유리에 금속 차양, 가운데 정원(자갈 연못·곧은/굽은 다리·팔각 정자·대숲), 북쪽이 졸정원과 맞닿음
// 추정: 대지 약 140 × 76 m 배치, 동·서관 폭·높이(서관 2층 약 13 m, 동관 1층 약 8 m), 로비 높이 약 16 m, 연못·편석가산(片石假山)·정자 크기와 위치, 충왕부·졸정원·북사탑(약 76 m) 배치(개략)
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
    const WH=K.col(0xf2f0ea,{roughness:.88}), WHD=K.col(0xf2f0ea,{roughness:.88,side:T.DoubleSide}), WH2=K.col(0xe6e3dc,{roughness:.9}), GR=K.col(0x4b4e51,{roughness:.55}), GRL=K.col(0x8a8c8c,{roughness:.6}), STL=K.col(0x5e6264,{roughness:.35,metalness:.6});
    const GL=K.col(0x9fb4bd,{roughness:.05,metalness:.35,transparent:true,opacity:.42,depthWrite:false}), GLD=K.col(0x3d4b52,{roughness:.08,metalness:.5}), WOOD=K.col(0xa8835a,{roughness:.7});
    // 화강석 지붕: 마름모로 켠 ‘중국흑’ 판 — 512 px = 4 m
    const RT=(()=>{ const t=TX.tex('sz_roof',512,(g,N,rr)=>{ g.fillStyle='#3a3d40'; g.fillRect(0,0,N,N); const s=N/8; for(let j=-1;j<9;j++) for(let i=-1;i<9;i++){ const c=52+rr()*16|0; g.fillStyle=`rgb(${c},${c+3},${c+6})`; g.beginPath(); g.moveTo(i*s+s/2,j*s); g.lineTo(i*s+s,j*s+s/2); g.lineTo(i*s+s/2,j*s+s); g.lineTo(i*s,j*s+s/2); g.closePath(); g.fill(); } g.strokeStyle='rgba(20,20,22,.8)'; g.lineWidth=2; for(let k=-8;k<16;k++){ g.beginPath(); g.moveTo(k*s,0); g.lineTo(k*s+N,N); g.moveTo(k*s,N); g.lineTo(k*s+N,0); g.stroke(); } }); const m=new T.MeshStandardMaterial({color:0xffffff,map:t||null,roughness:.5,metalness:.1,side:T.DoubleSide}); if(!t) m.color.setHex(0x404346); m.userData.tm=4; return m; })();
    // 절두 상자(world UV): y0→y1, 위가 ix/iz만큼 안으로
    const frust=(x,y0,y1,z,w,d,ix,iz,mat)=>{ const h=y1-y0; const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); const p=g.attributes.position; const kx=Math.max(.01,(w-2*ix)/w), kz=Math.max(.01,(d-2*iz)/d); for(let i=0;i<p.count;i++) if(p.getY(i)>h/2){ p.setX(i,p.getX(i)*kx); p.setZ(i,p.getZ(i)*kz); } g.computeVertexNormals(); const n=g.attributes.normal, uv=g.attributes.uv, tm=mat.userData.tm||4; for(let i=0;i<p.count;i++){ const X=p.getX(i)+x, Y=p.getY(i)+y0, Z=p.getZ(i)+z; if(Math.abs(n.getY(i))>.3) uv.setXY(i,X/tm,Z/tm); else if(Math.abs(n.getX(i))>.5) uv.setXY(i,Z/tm,Y/tm); else uv.setXY(i,X/tm,Y/tm); } g.translate(x,y0,z); Q(mat,g); };
    // 박공 지붕(다면): 축 방향 ax('x'|'z'), 처마 높이 y, 지붕 높이 h, 꼭대기 유리 채광 띠(폭 sk)
    const pRoof=(x,y,z,w,d,h,ax,sk)=>{ const L=ax==='x'?w:d, S=ax==='x'?d:w; const g=new T.BufferGeometry(); const hw=S/2, hl=L/2, r=hl-S*.32, s2=sk/2; // 우진각 변형: 용마루 짧게, 가운데 유리 띠
      const P=[], tri=(a,b,c)=>P.push(...a,...b,...c); const v=(u,yy,t)=>ax==='x'?[x+t,y+yy,z+u]:[x+u,y+yy,z+t];
      const A=v(-hw,0,-hl),Bq=v(hw,0,-hl),Cq=v(hw,0,hl),D=v(-hw,0,hl),E1=v(-s2,h,-hl),E2=v(-s2,h,hl),F1=v(s2,h,-hl),F2=v(s2,h,hl);
      tri(D,E2,E1); tri(D,E1,A); tri(Bq,F1,F2); tri(Bq,F2,Cq); // 두 경사면(박공)
      g.setAttribute('position',new T.Float32BufferAttribute(P,3)); g.computeVertexNormals(); const uv=[]; for(let i=0;i<P.length;i+=3) uv.push((ax==='x'?P[i]:P[i+2])/4,P[i+1]/4); g.setAttribute('uv',new T.Float32BufferAttribute(uv,2)); Q(RT,g);
      { const gw=new T.BufferGeometry(); const W=[]; const t3=(a,b,c)=>W.push(...a,...b,...c); t3(A,F1,E1); t3(A,Bq,F1); t3(Cq,E2,F2); t3(Cq,D,E2); gw.setAttribute('position',new T.Float32BufferAttribute(W,3)); gw.computeVertexNormals(); Q(WHD,gw); } // 흰 박공벽
      for(const e of [-1,1]){ const ang=Math.atan2(h,hw-s2), len=Math.hypot(h,hw-s2); for(const sd of [-1,1]){ const g2=new T.BoxGeometry(len+.5,.45,.5); g2.rotateZ((ax==='x'?-1:1)*sd*ang); const u=sd*(-(hw+s2)/2), t=e*hl; const c=v(u,h/2,t); if(ax==='x'){ g2.rotateY(Math.PI/2); } g2.translate(c[0],c[1],c[2]); Q(GR,g2); } } // 박공 먹선(회색 화강석 테)
      if(sk>0){ const gg=new T.BufferGeometry(); const Q2=[E1,E2,F2,E1,F2,F1]; const top=Q2.map(q=>[q[0],q[1]+.02,q[2]]); gg.setAttribute('position',new T.Float32BufferAttribute(top.flat(),3)); gg.computeVertexNormals(); Q(GLD,gg); const lw=ax==='x'?2*hl:sk, ld=ax==='x'?sk:2*hl; B(x,y+h-.1,z,lw+.3,.25,ld+.3,STL); } // 채광 띠 + 금속 테
      // 처마 회색 띠(먹선)
      B(x,y-.45,z,w+.5,.5,d+.5,GR); };
    // 흰 매스 + 회색 모서리 띠(코너 기둥선)
    const wing=(x,z,w,d,h,o)=>{ o=o||{}; B(x,0,z,w,h,d,WH); B(x,h-.6,z,w+.12,.6,d+.12,GR); for(const sx of [-1,1]) for(const sz of [-1,1]) B(x+sx*(w/2-.15),0,z+sz*(d/2-.15),.42,h-.6,.42,GR); B(x,0,z,w+.1,.35,d+.1,GRL); if(o.roof!==false) pRoof(x,h+.45,z,w,d,o.rh||3.2,o.ax||(w>d?'x':'z'),o.sk===undefined?1.6:o.sk); };
    // 유리 회랑(정원 쪽): 회색 철골 멀리언
    const gallery=(x0,x1,z,h,face)=>{ const L=Math.abs(x1-x0), cx=(x0+x1)/2; B(cx,0,z,L,h,.12,GL); for(let i=0;i<=Math.round(L/2.4);i++) B(Math.min(x0,x1)+i*L/Math.round(L/2.4),0,z+face*.1,.14,h,.22,STL); B(cx,h*.62,z+face*.1,L,.12,.22,STL); B(cx,h,z,L+.4,.5,3.6,GR); B(cx,h-.1,z-face*1.6,L,.12,3.2,WOOD); };
    // ================= 0: 바닥·연못·편석가산·담 =================
    K.layer(0);
    B(0,-.06,0,150,.06,90,flat(K.col(0xb8b3a8,{roughness:1}))); // 대지 판
    E.plane(E.BAK,0,.0,30,46,16); // 입구 마당 박석
    // 연못(정원 북쪽 대부분) — 가장자리 자갈 · 수면
    { const sh=[[-30,-33],[24,-33],[30,-27],[30,-14],[18,-8],[4,-10],[-8,-6],[-26,-9],[-31,-18]]; K.ex(sh.map(p=>[p[0]*1.04,p[1]*1.04-.6]),.1,K.col(0x9b968c,{roughness:1}),[0,0,0]); K.ex(sh,.06,WATER,[0,.06,0]); }
    // 잔디·자갈 마당(연못 밖)
    for(const [x,z,w,d] of [[-24,-4,18,8],[22,-4,20,8]]) B(x,0,z,w,.05,d,K.col(0x8f9b72,{roughness:1}));
    // 북쪽 흰 담(졸정원 경계) + 편석가산: 얇은 돌 판을 산 모양으로(앞은 밝게, 뒤는 어둡게)
    B(0,0,-37.6,140,6.2,.6,WH); B(0,6.2,-37.6,140.6,.35,1.2,GR);
    { const rk=[[-26,4.2,5,0],[-20,5.6,6,1],[-14,3.6,4,0],[-9,4.8,5,1],[-3,3.2,4,0],[3,4.4,6,1],[9,5.4,5,1],[15,3.8,5,0],[20,4.6,4,1],[25,3.0,4,0]]; rk.forEach(([x,h,w,dark],i)=>{ const pts=[[-w/2,0],[-w*.32,h*.55],[-w*.12,h*.9],[w*.05,h],[w*.22,h*.78],[w*.4,h*.5],[w/2,0]]; const sh=new T.Shape(); pts.forEach(([a,b],k)=>k?sh.lineTo(a,b):sh.moveTo(a,b)); const g=new T.ExtrudeGeometry(sh,{depth:.35+((i*37)%5)*.08,bevelEnabled:false}); g.translate(x,0,-37.25+(dark?0:.5)); Q(dark?K.col(0x5b5955,{roughness:.9}):K.col(0x8b877f,{roughness:.9}),g); }); }
    // 동·서·남 담(흰 벽 + 회색 갓)
    for(const [x,z,w,d] of [[-70.3,0,.6,76],[70.3,0,.6,76],[-42,38.3,56,.6],[42,38.3,56,.6]]){ B(x,0,z,w,4.6,d,WH); B(x,4.6,z,w+.6,.3,d+.6,GR); }
    flush();
    // ================= 1: 입구 문·로비·서관(2층)·동관(1층)·유리 회랑 =================
    K.layer(1);
    // 입구: 흰 문간 + 회색 문틀 + 절두 피라미드 지붕(유리 꼭대기)
    B(0,0,34,20,6.6,7,WH); B(0,6.1,34,20.2,.5,7.2,GR); B(0,0,37.55,7.2,5,.15,GR); B(0,0,37.62,6.4,4.6,.1,GLD); for(const s of [-1,1]) B(s*3.7,0,37.6,.5,5.2,.3,GR);
    frust(0,6.6,8.8,34,20,7,6,2.2,RT); frust(0,8.8,9.6,34,7.6,2.4,1.2,.5,GLD);
    // 입구 마당 양옆 흰 담 + 육각 창
    for(const s of [-1,1]){ B(s*21,0,28,.6,5,18,WH); B(s*21,5,28,1.2,.3,18.6,GR); const g=new T.CylinderGeometry(1.1,1.1,.7,6); g.rotateZ(Math.PI/2); g.translate(s*21,2.6,28); Q(GLD,g); }
    // 로비: 흰 정방 매스 + 층층 피라미드(화강석 → 유리 → 유리 꼭대기), 철골 띠
    B(0,0,10,24,8.4,22,WH); B(0,8.0,10,24.3,.6,22.3,GR); for(const sx of [-1,1]) for(const sz of [-1,1]) B(sx*11.85,0,10+sz*10.85,.5,8,.5,GR);
    B(0,0,21.05,9,6.8,.12,GL); B(0,0,21.15,9.2,.3,.25,STL); for(let i=0;i<=4;i++) B(-4.5+i*2.25,0,21.15,.14,6.8,.2,STL); B(0,6.8,21.15,9.4,.3,.3,STL); // 로비 남쪽 유리문
    B(0,0,-1.05,14,7,.12,GL); for(let i=0;i<=6;i++) B(-7+i*14/6,0,-1.15,.14,7,.2,STL); // 정원 쪽 유리
    frust(0,8.6,11.6,10,24,22,4.2,4.2,RT); frust(0,11.6,13.8,10,15.6,13.6,2.6,2.6,GLD); B(0,13.8,10,10.6,.25,8.6,STL); frust(0,14.05,16.2,10,10.4,8.4,3.2,2.6,GLD);
    for(const k of [0,1]){ const y=11.6+k*2.2; B(0,y,10,k?15.8:24.4-8.4+ .2,.18,k?13.8:22.4-8.4+.2,STL); }
    // 서관(2층, 동선 따라 셋) · 링크
    wing(-51,25,38,24,10,{ax:'z',rh:3.6}); wing(-51,1,38,22,10.5,{ax:'x',rh:3.8}); wing(-51,-25,38,24,9.4,{ax:'z',rh:3.4});
    wing(-20,15,18,12,6.2,{ax:'x',rh:2.2,sk:1}); // 로비-서관 연결
    // 동관(1층)
    wing(51,22,38,30,6.4,{ax:'z',rh:2.8}); wing(51,-12,38,26,6.0,{ax:'x',rh:2.6}); wing(20,15,18,12,6.0,{ax:'x',rh:2.2,sk:1});
    // 정원 둘레 유리 회랑(동·서) — 정원 쪽 철골 멀리언
    { const gz=[[-32,-34,-2],[32,-34,-2]]; for(const [x,z0,z1] of gz){ const s=Math.sign(x); B(x,0,(z0+z1)/2,.12,4.6,z1-z0,GL); for(let i=0;i<=13;i++) B(x-s*.1,0,z0+i*(z1-z0)/13,.22,4.6,.14,STL); B(x,4.6,(z0+z1)/2,3.6,.5,z1-z0+.4,GR); B(x+s*1.6,0,(z0+z1)/2,.3,4.6,z1-z0,WH); } }
    // 서관 정원 쪽 창(사각 액자창) · 동관 육각창
    for(let i=0;i<4;i++){ B(-31.95,3.2,-30+i*7,.12,2.2,2.2,GLD); B(-31.9,3.0,-30+i*7,.18,2.6,2.6,GR); }
    flush();
    // ================= 2: 정원 — 돌다리 · 팔각 정자 · 대숲 · 소나무 =================
    K.layer(2);
    // 곧은 돌다리(세 번 꺾임) — 화강석 판 + 낮은 난간 없음
    for(const [x,z,w,d] of [[-8,-8.5,2.2,8],[-4,-13,10,2.2],[2,-18.5,2.2,11]]) { B(x,.05,z,w,.35,d,K.col(0xc9c4b8,{roughness:.8})); B(x,-.4,z,w*.6,.45,d*.6,GR); }
    // 팔각 정자(연못 동쪽): 회색 철골 기둥 · 유리 지붕 아래 루버 · 화강석 팔각 지붕
    { const x=16, z=-22; B(x,-.2,z,7,.5,7,K.col(0xc9c4b8)); const cg=new T.CylinderGeometry(.12,.12,3.3,8); cg.translate(0,1.65,0); const L=[]; for(let i=0;i<8;i++){ const a=i/8*Math.PI*2+Math.PI/8; L.push([x+Math.cos(a)*2.9,.3,z+Math.sin(a)*2.9]); } inst(cg,STL,L); const ring=new T.CylinderGeometry(3.2,3.2,.35,8); ring.rotateY(Math.PI/8); ring.translate(x,3.75,z); Q(GR,ring); const cone=new T.ConeGeometry(4.0,2.4,8); cone.rotateY(Math.PI/8); cone.translate(x,5.1,z); Q(RT,cone); const top=new T.ConeGeometry(.9,.9,8); top.rotateY(Math.PI/8); top.translate(x,6.55,z); Q(GLD,top); }
    // 대숲(가는 녹색 줄기 + 잎 뭉치)
    { const st=[], lf=[]; for(const [cx,cz,n,rr] of [[-27,-28,40,3.2],[27,-31,28,2.6],[-18,30,18,2],[18,30,18,2],[-30,-3,16,2.2]]) for(let i=0;i<n;i++){ const a=i*2.39, r=rr*Math.sqrt(i/n); const x=cx+Math.cos(a)*r, z=cz+Math.sin(a)*r, h=5+((i*37)%10)*.25; st.push([x,0,z,0,1,h/6,1]); lf.push([x,h*.72,z,a,1,1.1,1]); } const sg=new T.CylinderGeometry(.04,.05,6,5); sg.translate(0,3,0); inst(sg,K.col(0x6f8f3a,{roughness:.7}),st); const lg=new T.IcosahedronGeometry(.9,0); lg.scale(.8,1.5,.8); inst(lg,K.col(0x5e8a3c,{roughness:.9}),lf); }
    flush();
    // ================= 배경(K.life): 졸정원(북) · 충왕부(동) · 쑤저우 옛 시가(흰 벽·회색 기와) · 북사탑 =================
    LIFE(()=>{
      const hf=(x,z)=>-.05;
      E.terrain(-1500,1500,-1500,1500,60,60,hf,(x,z)=>{ const n=E.fbm(x*.02,z*.02,2); return [.56+.04*n,.58+.04*n,.5+.03*n]; },[-80,80,-45,45]);
      E.plane(K.col(0x5f6062,{roughness:.95}),0,.02,52,600,14); // 동북가(東北街)
      E.plane(E.BAK,0,.03,42,60,6); E.plane(E.BAK,0,.03,104,220,90);
      // 옛 가옥: 흰 벽 + 회색 맞배 기와(병합)
      const HW=[], HR=[]; const house=(x,z,w,d,h,ry)=>{ HW.push(bx(x,0,z,w,h,d,ry)); const sh=new T.Shape(); sh.moveTo(-d/2-.6,0); sh.lineTo(0,d*.32); sh.lineTo(d/2+.6,0); const g=new T.ExtrudeGeometry(sh,{depth:w+.8,bevelEnabled:false}); g.translate(0,0,-(w+.8)/2); g.rotateY(Math.PI/2+(ry||0)); g.translate(x,h,z); HR.push(g); };
      for(let x=-600;x<600;x+=14) for(let z=-600;z<600;z+=12){ const xx=x+(E.r()-.5)*3, zz=z+(E.r()-.5)*3; if(xx>-80&&xx<80&&zz>-45&&zz<60) continue; if(Math.abs(zz-52)<10) continue; if(Math.abs(xx)<110&&zz>40&&zz<150) continue; if(xx>-200&&xx<120&&zz<-45&&zz>-330) continue; if(E.r()<.3) continue; house(xx,zz,9+E.r()*4,7+E.r()*3,E.r()<.6?5.5:8.2,0); }
      // 졸정원 안 정자·회랑(몇 채)
      for(const [x,z,w,d] of [[-40,-120,12,7],[30,-160,9,6],[-120,-90,14,7],[60,-90,8,6],[-90,-230,10,8],[10,-260,16,8]]) house(x,z,w,d,4.2,0);
      // 충왕부(동쪽 옛 저택 — 높은 전각 몇 채)
      for(const [x,z] of [[110,0],[110,-30],[110,28]]) house(x,z,22,12,7.5,0);
      HW.forEach(g=>Q(WH2,g)); HR.forEach(g=>Q(K.col(0x55585a,{roughness:.8}),g));
      // 졸정원 연못
      for(const [x,z,w,d] of [[-60,-170,120,50],[40,-210,60,40],[-140,-150,40,70]]){ const g=new T.PlaneGeometry(w,d); g.rotateX(-Math.PI/2); g.translate(x,.02,z); Q(WATER,g); }
      // 북사탑(9층 팔각 약 76 m, 서북쪽 — 위치 개략)
      { const x=-760, z=-80; for(let i=0;i<9;i++){ const r=9-i*.6, y=i*7.4; const g=new T.CylinderGeometry(r*.92,r,5.4,8); g.translate(x,y+2.7,z); Q(K.col(0xb07a4a,{roughness:.85}),g); const e=new T.CylinderGeometry(r*.5,r*1.35,2,8); e.translate(x,y+6.4,z); Q(K.col(0x3d3a37,{roughness:.8}),e); } const sp=new T.ConeGeometry(1.2,10,8); sp.translate(x,72,z); Q(K.col(0x6a5a40,{roughness:.5,metalness:.4}),sp); }
      flush();
      // 나무: 졸정원 숲 · 가로수 · 마당 소나무
      E.forest(E.scatter(-260,160,-340,-45,9,hf,(x,z)=>E.r()<.8,()=>8+E.r()*6,(x,z)=>E.r()<.3?1:0),{trunks:true});
      E.forest(E.scatter(-600,600,-600,600,30,hf,(x,z)=>E.r()<.25&&!(x>-120&&x<120&&z>-50&&z<160),()=>8+E.r()*5,0),{trunks:false});
      E.forest([[-12,0,-30,6.5,1,.3],[8,0,-31,5.5,1,.6],[-24,0,-14,4.5,0,.2],[24,0,-6,5,0,.7],[-40,0,62,8,0,.4],[40,0,62,8,0,.5],[-70,0,64,7,0,.1],[70,0,64,7,0,.9],[-100,0,100,9,0,.3],[100,0,100,9,0,.6]],{trunks:true,cast:true});
    });
    tidySite();
  }});
