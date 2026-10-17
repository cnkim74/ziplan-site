__bsigFill({"chichu":function(K){
// 출처: 2004 개관 · 설계 안도 다다오 · 최심부 지하 3층에서 지상까지 뚫린 데 마리아 실 — 미술수첩 artwiki/24 · 데 마리아 실 평면 약 10×24 m, 모네 실은 모서리를 둥글린 정사각형(바닥 2 cm 흰 대리석), 진입 순서 = 티켓센터 → 완만한 길 → 직사각 개구부의 콘크리트 벽 → 어두운 통로 → 사각 마당(속새) → 계단 → 벽이 기운 무지붕 통로 → 삼각 마당 — artscape 2004-09 focus
// 추정 치수: 언덕 높이 8 m(지하 2~3층 깊이를 압축), 삼각 마당 한 변 22 m, 사각 마당 12×12 m, 통로 슬릿 폭 2.6 m·길이 18 m, 터렐 오픈 스카이 실 9×9 m(천창 4.5×4.5), 모네 실 14×16 m, 데 마리아 실 10×24 m, 모네 정원 연못 16×10 m
    const T=K.T; const C=K.col(0xd2cec5,{roughness:.92}), C2=K.col(0xc4c0b7,{roughness:.92}), CD=K.col(0x8f8b84,{roughness:.95}), CF=K.col(0xe6e2da,{roughness:.95}), DK=K.col(0x34373a,{roughness:1}), GR=K.M.grass, GV=K.col(0xb6b0a3,{roughness:1}), PV=K.col(0xd3ccbe,{roughness:1}), RD=K.col(0x4f7a3c,{roughness:.95}), LF=K.M.leaf1, LF2=K.M.leaf3, GL=K.M.glassW, WT=K.M.water, MB=K.col(0xf3f1ec,{roughness:.9}), PD=K.col(0x4c5b50,{roughness:1}), TR=K.M.trunk;
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const bx=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const tilt=(x,y0,z,w,h,d,rz)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); g.rotateZ(rz); g.translate(x,y0,z); return g; };
    const merge=(geos,mat,cast)=>{ if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); return put(new T.Mesh(g,mat),cast); };
    let seed=5; const rnd=()=>{ seed=(seed*9301+49297)%233280; return seed/233280; };
    const tree=(x,y,z,h,m)=>{ K.c(x,y,z,.16,h*.45,TR,6); const s=new T.Mesh(new T.SphereGeometry(h*.4,9,7),m||LF); s.position.set(x,y+h*.72,z); put(s); };
    // 언덕: 평탄한 정상(초타원 판, 마당 구멍) + 비탈 띠 — 구멍 가장자리는 콘크리트 벽이 턱(0.4 m)을 이룸
    const H=8, FO=15, CX=0, CZ=-10, A=36, B=28, NS=4, N=96; const sm=t=>t*t*(3-2*t);
    const edge=th=>{ const c=Math.cos(th), s=Math.sin(th); return [CX+A*Math.sign(c)*Math.pow(Math.abs(c),2/NS), CZ+B*Math.sign(s)*Math.pow(Math.abs(s),2/NS)]; };
    K.layer(0);
    K.b(0,-.3,0,104,.32,106,GR); // 잔디(사이트 포장 패드를 덮음)
    const sh=new T.Shape(); for(let i=0;i<N;i++){ const [x,z]=edge(i/N*Math.PI*2); i?sh.lineTo(x,-z):sh.moveTo(x,-z); } sh.closePath();
    const tri=[[-11,-14],[11,-14],[0,-33]], court=[[-6,16],[6,16],[6,4],[1.3,4],[1.3,-13.7],[-1.3,-13.7],[-1.3,4],[-6,4]], tur=[[18.75,5.75],[23.25,5.75],[23.25,10.25],[18.75,10.25]];
    for(const h of [court,tri,tur]){ const p=new T.Path(); h.forEach(([x,z],i)=>i?p.lineTo(x,-z):p.moveTo(x,-z)); p.closePath(); sh.holes.push(p); }
    { const g=new T.ExtrudeGeometry(sh,{depth:.6,bevelEnabled:false}); g.rotateX(-Math.PI/2); g.translate(0,H-.6,0); const uv=g.attributes.uv; for(let i=0;i<uv.count;i++) uv.setXY(i,uv.getX(i)*.5,uv.getY(i)*.5); put(new T.Mesh(g,GR)); }
    K.surf((u,v)=>{ const [ex,ez]=edge(u*Math.PI*2); const dx=ex-CX, dz=ez-CZ, L=Math.hypot(dx,dz); const x=ex+dx/L*v*FO, z=ez+dz/L*v*FO; const nz=.9*Math.sin(u*31.4+2)*Math.sin(v*Math.PI)*(.55+.45*Math.cos(u*18.8+1)); return [x,H*(1-sm(v))+nz-.04*v,z,x/2,z/2]; },N,14,GR);
    // 마당 벽(콘크리트): 구멍 가장자리 따라, 바닥 0.3 → 정상 +0.4 턱
    const W=[]; const seg=(a,b,y0,y1)=>{ const dx=b[0]-a[0], dz=b[1]-a[1], L=Math.hypot(dx,dz); W.push(bx((a[0]+b[0])/2,y0,(a[1]+b[1])/2,L+.6,y1-y0,.6,-Math.atan2(dz,dx))); };
    const RT=H+.4;
    seg([-11,-14],[-1.3,-14],.3,RT); seg([1.3,-14],[11,-14],.3,RT); seg([-1.3,-14],[1.3,-14],5.6,RT); seg([11,-14],[0,-33],.3,RT); seg([0,-33],[-11,-14],.3,RT); // 삼각 마당(밑변 가운데는 슬릿 통로 입구)
    seg([-6,16],[-1.2,16],.3,RT); seg([1.2,16],[6,16],.3,RT); seg([-1.2,16],[1.2,16],3.6,RT); seg([6,4],[6,16],.3,RT); seg([-6,4],[-6,16],.3,RT); seg([-6,4],[-1.3,4],.3,RT); seg([1.3,4],[6,4],.3,RT); seg([-1.3,4],[1.3,4],5.6,RT); // 사각 마당(남쪽 터널 입구·북쪽 슬릿 입구)
    W.push(tilt(-1.3,.3,-4.85,.6,RT-.3,17.7,.045), tilt(1.3,.3,-4.85,.6,RT-.3,17.7,-.045)); // 기운 벽의 무지붕 통로(위로 갈수록 바깥으로 벌어짐)
    merge(W,C);
    // 삼각 마당: 거친 돌 바닥 · 돌덩이 · 긴 벤치벽
    K.ex(tri,.3,CD,[0,.3,0]); { const gs=[]; for(let i=0;i<70;i++){ const t=rnd(), s=rnd()*(1-t); const px=tri[0][0]+(tri[1][0]-tri[0][0])*t+(tri[2][0]-tri[0][0])*s, pz=tri[0][1]+(tri[1][1]-tri[0][1])*t+(tri[2][1]-tri[0][1])*s; if(Math.abs(px)<1.6&&pz>-16) continue; const w=.3+rnd()*.35; gs.push(bx(px,.6,pz,w,.2+rnd()*.25,w*(.7+rnd()*.6),rnd()*3)); } merge(gs,GV,false); }
    K.b(-4.8,.6,-23.1,9,.5,.6,C2,-2.095); // 서쪽 빗변 따라 긴 벤치
    // 사각 마당: 바닥 · 속새(가는 줄기) · 벽 따라 오르는 계단
    K.b(0,.3,10,12,.08,12,GV); { const gs=[]; for(let i=0;i<150;i++){ const x=-5.4+rnd()*10.8, z=4.6+rnd()*10.8; if(Math.abs(x)<1.4) continue; gs.push(bx(x,.38,z,.07,.9+rnd()*.8,.07)); } merge(gs,RD,false); }
    { const gs=[]; for(let k=0;k<10;k++) gs.push(bx(4.6,.3,5.2+k*.9,2.6,.3*(k+1),.9)); merge(gs,C2); }
    K.b(0,.3,-4.85,2.6,.06,17.7,GV); // 슬릿 통로 바닥
    // 어두운 진입 통로(터널): 사각 마당 남쪽 벽 → 비탈 밖으로 나옴 → 직사각 개구부의 콘크리트 벽
    K.b(0,.3,24.75,2.6,.06,17.5,GV); for(const s of [-1,1]) K.b(s*1.5,.3,24.75,.4,3.4,17.5,C2); K.b(0,3.6,24.75,3.6,.4,17.5,C2);
    K.b(-2.35,0,33.7,2.3,5.2,.5,C); K.b(2.35,0,33.7,2.3,5.2,.5,C); K.b(0,3.4,33.7,2.4,1.8,.5,C); K.b(-5.2,0,33.4,3.6,3.2,.5,C2);
    // 터렐 「오픈 스카이」: 땅속 정사각 방 + 천장의 네모 구멍(테두리 턱)
    K.b(21,.3,8,9,.08,9,MB); for(const [x,z,w,d] of [[16.8,8,.6,9.6],[25.2,8,.6,9.6],[21,3.8,8.4,.6],[21,12.2,8.4,.6]]) K.b(x,.3,z,w,H-.9,d,CF); { const gs=[]; for(const [x,z,w,d] of [[18.1,8,.7,8.2],[23.9,8,.7,8.2],[21,5.1,5.4,.7],[21,10.9,5.4,.7]]) gs.push(bx(x,.38,z,w,.45,d)); for(const [x,z,w,d] of [[18.75,8,.6,5.1],[23.25,8,.6,5.1],[21,5.75,5.1,.6],[21,10.25,5.1,.6]]) gs.push(bx(x,H,z,w,.4,d)); merge(gs,C); }
    // 모네 실(지상에는 천창 테두리만): 바깥 틀 + 안쪽 판, 사이의 어두운 슬릿
    K.b(-24,H,-20,13.2,.05,15.2,DK); { const gs=[]; for(const [x,z,w,d] of [[-30.65,-20,.7,16],[-17.35,-20,.7,16],[-24,-27.65,14,.7],[-24,-12.35,14,.7]]) gs.push(bx(x,H,z,w,.9,d)); merge(gs,C); } K.b(-24,H,-20,11.2,.65,13.2,CF);
    // 데 마리아 실(10×24): 낮은 테두리 + 판 + 긴 천창
    { const gs=[]; for(const [x,z,w,d] of [[18.75,-20,.5,24.5],[29.25,-20,.5,24.5],[24,-32.25,11,.5],[24,-7.75,11,.5]]) gs.push(bx(x,H,z,w,.5,d)); merge(gs,C); } K.b(24,H,-20,10,.3,24,CF); K.b(24,H+.3,-20,2.0,.12,19,GL);
    // 지붕 위 콘크리트 선 · 환기 상자
    K.b(-8,H,-5,20,.45,.35,C); K.b(13,H,-27,.35,.45,14,C); K.b(-33,H,-4,1.8,1.1,1.8,C2); K.b(31,H,6,2.2,.8,1.4,C2); K.b(-14,H,10,1.4,.9,1.4,C2);
    // 진입 정원(모네의 정원): 길 · 타원 연못 · 수련 · 식재 덤불 · 티켓 부스 · 나무
    K.layer(1);
    K.b(0,0,44,3.2,.06,21,PV); K.b(-7,0,42,12,.06,2.4,PV); K.b(6,0,47,10,.06,2.4,PV);
    { const g=new T.CircleGeometry(1,40); g.rotateX(-Math.PI/2); g.scale(8.6,1,5.4); g.translate(-15,.03,42); put(new T.Mesh(g,PD),false); const g2=new T.CircleGeometry(1,40); g2.rotateX(-Math.PI/2); g2.scale(8,1,5); g2.translate(-15,.09,42); put(new T.Mesh(g2,WT),false); }
    { const gs=[]; for(let i=0;i<34;i++){ const a=rnd()*Math.PI*2, r=Math.sqrt(rnd())*.88; const g=new T.CylinderGeometry(.3+rnd()*.25,.3+rnd()*.25,.05,7); g.translate(-15+Math.cos(a)*8*r,.13,42+Math.sin(a)*5*r); gs.push(g); } merge(gs,LF2,false); }
    { const A1=[],A2=[]; for(let i=0;i<40;i++){ const a=rnd()*Math.PI*2, r=1+rnd()*.35; const px=-15+Math.cos(a)*9.6*r, pz=42+Math.sin(a)*6.2*r; if(pz>52||px>-3) continue; const rr=.5+rnd()*.7; const g=new T.SphereGeometry(rr,7,5); g.scale(1.2,.8,1.1); g.translate(px,rr*.6,pz); (i%2?A1:A2).push(g); } for(let i=0;i<16;i++){ const px=4+rnd()*14, pz=38+rnd()*8; if(pz>45&&pz<49) continue; const rr=.5+rnd()*.6; const g=new T.SphereGeometry(rr,7,5); g.scale(1.2,.8,1.1); g.translate(px,rr*.6,pz); (i%2?A1:A2).push(g); } merge(A1,LF); merge(A2,LF2); }
    K.b(13,0,51,3.2,2.8,3.2,CF); K.pyr(13,2.8,51,3.8,1.7,DK); K.b(-4,0,54,2.2,.45,.6,C2); K.b(4,0,54,2.2,.45,.6,C2);
    for(const [x,z,h,m] of [[-30,48,7,LF],[-24,52,6,LF2],[22,42,7,LF],[28,50,6,LF2],[-42,34,7,LF],[44,32,6,LF2],[-48,-4,7,LF],[50,-12,6,LF],[-44,-46,7,LF2],[40,-50,7,LF],[0,-52,6,LF2],[-24,-51,6,LF]]) tree(x,0,z,h,m);
      // ---- 주변 환경(S5): 높이장 지형·숲·물·이웃 매스(K.life — bbox 밖) · 뷰어 기본 바닥/소품 숨김 ----
    {
    const T=K.T; const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const inst=(geo,mat,items,cast,grp,fit)=>{ if(!items.length) return null; if(fit) geo=geo.clone(); const m=new T.InstancedMesh(geo,mat,items.length); m.frustumCulled=false; const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),Eu=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); Eu.set(it[7]||0,it[3]||0,it[8]||0); Q.setFromEuler(Eu); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; if(fit){ if(!geo.boundingBox) geo.computeBoundingBox(); const gb=geo.boundingBox.clone(), bb=new T.Box3(); for(let i=0;i<items.length;i++){ m.getMatrixAt(i,M4); bb.union(gb.clone().applyMatrix4(M4)); } geo.boundingBox=bb; geo.boundingSphere=bb.getBoundingSphere(new T.Sphere()); } if(grp){ m.castShadow=!!cast; m.receiveShadow=true; grp.add(m); return m; } return put(m,cast); };
    const bx=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const merge=(geos,mat,cast,grp)=>{ if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); const m=new T.Mesh(g,mat); if(grp){ m.castShadow=!!cast; m.receiveShadow=true; grp.add(m); return m; } return put(m,cast); };
    const cylG=(r,h,seg,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r*.9:r2,r,h,seg||10); g.translate(0,h/2,0); return g; };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
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
    // 렌더러가 build 뒤에 K.life에 더하는 기본 소품(벤치·화분·볼라드·일반 나무, keep=0이면 사람까지)을 숨김 — 이 모형의 맥락은 직접 지음
    const tidy=keep=>{ const L=K.life, add0=L.add; L.add=function(...a){ a.forEach(o=>{ if(keep&&o.isMesh&&!o.isInstancedMesh&&o.material===K.M.people) return; o.visible=false; }); return add0.apply(this,a); }; };
    // ---- 세계 랜드마크 공용(v13 W): 하늘 돔 · life 바닥판 · 창 질감 도시 블록(지붕 포함) · 물 ----
    const W=(()=>{ const TT=K.T;
      // 하늘 돔(초고층·넓은 맥락용): 뷰어 하늘 구(600)보다 카메라가 멀어질 때 검게 비는 것을 막음 — 밤이면 밤색
      const sky=(R)=>{ const g=new TT.SphereGeometry(R,32,16); const p=g.attributes.position; const mk=night=>{ const col=[]; const top=new TT.Color(night?0x0b1226:0x9fc0de).convertSRGBToLinear(), hor=new TT.Color(night?0x2a3350:0xeee9df).convertSRGBToLinear(), c=new TT.Color(); for(let i=0;i<p.count;i++){ const t=Math.max(0,Math.min(1,p.getY(i)/(R*.63))); c.copy(hor).lerp(top,Math.pow(t,.65)); col.push(c.r,c.g,c.b); } return new TT.Float32BufferAttribute(col,3); }; const cD=mk(false), cN=mk(true); g.setAttribute('color',cD); const m=new TT.Mesh(g,new TT.MeshBasicMaterial({vertexColors:true,side:TT.BackSide,fog:false,depthWrite:false})); m.renderOrder=-1; m.frustumCulled=false; let cur=0; m.onBeforeRender=(r,sc)=>{ const n=sc.fog&&sc.fog.color&&sc.fog.color.r<.3?1:0; if(n!==cur){ cur=n; g.setAttribute('color',n?cN:cD); } }; K.life.add(m); return m; };
      // life 평면(bbox 밖): 재질 m, 중심 x,z, 크기 w,d, 높이 y, 회전 ry
      const lplane=(m,x,y,z,w,d,ry)=>{ const g=new TT.PlaneGeometry(w,d); g.rotateX(-Math.PI/2); if(ry) g.rotateY(ry); g.translate(x,y,z); if(m.userData&&m.userData.tm){ const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); } const me=new TT.Mesh(g,m); me.receiveShadow=m!==WATER; K.life.add(me); return me; };
      // 다각형 바닥(life): pts [[x,z],…]
      const lpoly=(m,pts,y)=>{ pts=pts.slice(); { let a=0; for(let i=0;i<pts.length;i++){ const p=pts[i], q=pts[(i+1)%pts.length]; a+=p[0]*q[1]-q[0]*p[1]; } if(a>0) pts.reverse(); } const sh=new TT.Shape(); pts.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); const g=new TT.ShapeGeometry(sh); g.rotateX(-Math.PI/2); g.translate(0,y,0); if(m.userData&&m.userData.tm){ const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); } m.side=TT.DoubleSide; const me=new TT.Mesh(g,m); me.receiveShadow=true; K.life.add(me); return me; };
      const solid=(hex,o)=>{ const m=new TT.MeshStandardMaterial(Object.assign({color:hex,roughness:.95},o||{})); m.color.convertSRGBToLinear(); m.userData.nocast=1; return m; };
      const WATER=solid(0x4f7d8c,{roughness:.05,metalness:.02,transparent:true,opacity:.86});
      // 창 질감: 'p' 석조 펀치창(3 m × 3.4 m 칸) · 'g' 커튼월 띠(유리 + 멀리언) — 흰 바탕, 꼭짓점 색으로 물들임
      const winTex=(kind)=>E.tex('win'+kind,256,(g,N,rr)=>{ if(kind==='g'){ g.fillStyle='#c9d1d8'; g.fillRect(0,0,N,N); for(let j=0;j<4;j++){ g.fillStyle='#f2f4f5'; g.fillRect(0,j*N/4,N,N/4*.14); for(let i=0;i<8;i++){ const t=.85+rr()*.3; g.fillStyle=`rgb(${Math.round(168*t)},${Math.round(186*t)},${Math.round(200*t)})`; g.fillRect(i*N/8+2,j*N/4+N/4*.16,N/8-4,N/4*.84); } } }
        else { g.fillStyle='#ffffff'; g.fillRect(0,0,N,N); for(let j=0;j<4;j++) for(let i=0;i<4;i++){ const lit=rr(); g.fillStyle=lit<.15?'#7d8590':'#59616b'; g.fillRect(i*N/4+N/4*.28,j*N/4+N/4*.22,N/4*.44,N/4*.56); } } });
      // 블록: [x,z,w,d,h,hex,ry,kind('p'|'g'|'n'),roofHex,roofH,roofInset]
      // 뷰 시선 확보: 뷰어 카메라(눈높이 az≈.75·정면 az=π/2, 거리는 bbox로 정해짐 — r=max(폭,깊이,높이×1.5))와 모형 사이 원뿔 안의 블록은 시선보다 낮게 깎음
      let VB=null; const vcap=(x,z,w,d,h)=>{ if(!VB){ const bb=new TT.Box3().setFromObject(K.bldg), sz=bb.getSize(new TT.Vector3()), c=bb.getCenter(new TT.Vector3()); const r=Math.max(sz.x,sz.z,sz.y*1.5); VB={c,sz,r,cams:[[.75,(r*.95+10),1.7+r*.05,.07],[1.0,(r*.95+10),1.7+r*.05,.07],[Math.PI/2,(r*1.3+12),1.7+r*.05,.18],[Math.PI/2,(r*1.3+12),Math.max(2,sz.y*.42),.18]]}; }
        let lim=h; const R0=Math.max(VB.sz.x,VB.sz.z)/2+10, br=Math.hypot(w,d)/2; for(const [a,D,yt,el] of VB.cams){ const ca=Math.cos(a), sa=Math.sin(a); const dx=x-VB.c.x, dz=z-VB.c.z; const t=(dx*ca+dz*sa)/D; if(t<0||t>1.1) continue; const p=Math.abs(-dx*sa+dz*ca); const hw=R0*(1-t)+6+br; if(p>hw) continue; const yc=yt+D*Math.sin(el); const yb=Math.min(VB.sz.y*.15,30)+4; lim=Math.min(lim,yb*(1-t)+yc*t-4); } return lim; };
      const city=(list)=>{ const by={p:[],g:[],n:[]}; list=list.map(b=>{ if(b[12]) return b; const lim=vcap(b[0],b[1],b[2],b[3],b[4]); if(lim>=b[4]) return b; if(lim<5) return null; const c=b.slice(); c[4]=lim; return c; }).filter(Boolean); list.forEach(b=>(by[b[7]||'p']||by.p).push(b)); const out=[];
        for(const k of ['p','g','n']){ const L=by[k]; if(!L.length) continue; let nv=0; for(const b of L) nv+=(b[8]!==undefined&&b[8]!==null&&b[9])?60:30; const P=new Float32Array(nv*3), N=new Float32Array(nv*3), U=new Float32Array(nv*2), C=new Float32Array(nv*3); let o=0; const c=new TT.Color(), rc=new TT.Color(); const CW=12, CH=k==='g'?15:13.6;
          let cr=0,cg=0,cb=0; const V=(px,py,pz,nx,ny,nz,u,v)=>{ const i3=o*3, i2=o*2; P[i3]=px; P[i3+1]=py; P[i3+2]=pz; N[i3]=nx; N[i3+1]=ny; N[i3+2]=nz; U[i2]=u; U[i2+1]=v; C[i3]=cr; C[i3+1]=cg; C[i3+2]=cb; o++; };
          for(const b of L){ const [x,z,w,d,h,hex,ry,kk,rh,rH,rI,by]=b; const Y0=by||0, yb=by?Y0-6:0; c.set(hex).convertSRGBToLinear(); const cs=Math.cos(ry||0), sn=Math.sin(ry||0); const hw=w/2, hd=d/2;
            const XA=lx=>lx*cs, ZA=lx=>-lx*sn; const px=(lx,lz)=>x+lx*cs+lz*sn, pz=(lx,lz)=>z-lx*sn+lz*cs;
            const SD=[[-hw,hd,hw,hd,0,1,.95],[hw,hd,hw,-hd,1,0,.86],[hw,-hd,-hw,-hd,0,-1,.9],[-hw,-hd,-hw,hd,-1,0,.86]]; const u0=((x*.37+z*.11)%1+1)%1;
            for(const [ax,az,bx,bz,nx0,nz0,sh] of SD){ const L2=Math.hypot(bx-ax,bz-az); cr=c.r*sh; cg=c.g*sh; cb=c.b*sh; const nx=nx0*cs+nz0*sn, nz=-nx0*sn+nz0*cs; const Ax=px(ax,az), Az=pz(ax,az), Bx=px(bx,bz), Bz=pz(bx,bz); const u1=u0+L2/CW, v1=h/CH, yt=h+Y0;
              V(Ax,yb,Az,nx,0,nz,u0,0); V(Bx,yb,Bz,nx,0,nz,u1,0); V(Bx,yt,Bz,nx,0,nz,u1,v1); V(Ax,yb,Az,nx,0,nz,u0,0); V(Bx,yt,Bz,nx,0,nz,u1,v1); V(Ax,yt,Az,nx,0,nz,u0,v1); }
            const yt=h+Y0;
            if(rh!==undefined&&rh!==null&&rH){ rc.set(rh).convertSRGBToLinear(); const ins=Math.max(.2,Math.min(rI||rH,Math.min(hw,hd)-.2)); const q=[[-hw,hd],[hw,hd],[hw,-hd],[-hw,-hd]], qi=[[-hw+ins,hd-ins],[hw-ins,hd-ins],[hw-ins,-hd+ins],[-hw+ins,-hd+ins]]; const sl=Math.hypot(ins,rH);
              for(let i=0;i<4;i++){ const j=(i+1)%4; const nn=SD[i]; const nx=(nn[4]*cs+nn[5]*sn)*rH/sl, nz=(-nn[4]*sn+nn[5]*cs)*rH/sl, ny=ins/sl; const sh=[1,.85,.78,.88][i]; cr=rc.r*sh; cg=rc.g*sh; cb=rc.b*sh;
                const Ax=px(q[i][0],q[i][1]), Az=pz(q[i][0],q[i][1]), Bx=px(q[j][0],q[j][1]), Bz=pz(q[j][0],q[j][1]), Cx=px(qi[j][0],qi[j][1]), Cz=pz(qi[j][0],qi[j][1]), Dx=px(qi[i][0],qi[i][1]), Dz=pz(qi[i][0],qi[i][1]);
                V(Ax,yt,Az,nx,ny,nz,.02,.02); V(Bx,yt,Bz,nx,ny,nz,.02,.02); V(Cx,yt+rH,Cz,nx,ny,nz,.02,.02); V(Ax,yt,Az,nx,ny,nz,.02,.02); V(Cx,yt+rH,Cz,nx,ny,nz,.02,.02); V(Dx,yt+rH,Dz,nx,ny,nz,.02,.02); }
              cr=rc.r; cg=rc.g; cb=rc.b; const p0=[px(qi[0][0],qi[0][1]),pz(qi[0][0],qi[0][1])], p1=[px(qi[1][0],qi[1][1]),pz(qi[1][0],qi[1][1])], p2=[px(qi[2][0],qi[2][1]),pz(qi[2][0],qi[2][1])], p3=[px(qi[3][0],qi[3][1]),pz(qi[3][0],qi[3][1])];
              V(p0[0],yt+rH,p0[1],0,1,0,.02,.02); V(p1[0],yt+rH,p1[1],0,1,0,.02,.02); V(p2[0],yt+rH,p2[1],0,1,0,.02,.02); V(p0[0],yt+rH,p0[1],0,1,0,.02,.02); V(p2[0],yt+rH,p2[1],0,1,0,.02,.02); V(p3[0],yt+rH,p3[1],0,1,0,.02,.02); }
            else { const f=k==='n'?1.02:.8; cr=c.r*f; cg=c.g*f; cb=c.b*f; const p0=[px(-hw,hd),pz(-hw,hd)], p1=[px(hw,hd),pz(hw,hd)], p2=[px(hw,-hd),pz(hw,-hd)], p3=[px(-hw,-hd),pz(-hw,-hd)]; V(p0[0],yt,p0[1],0,1,0,.02,.02); V(p1[0],yt,p1[1],0,1,0,.02,.02); V(p2[0],yt,p2[1],0,1,0,.02,.02); V(p0[0],yt,p0[1],0,1,0,.02,.02); V(p2[0],yt,p2[1],0,1,0,.02,.02); V(p3[0],yt,p3[1],0,1,0,.02,.02); } }
          const g=new TT.BufferGeometry(); g.setAttribute('position',new TT.BufferAttribute(P.subarray(0,o*3),3)); g.setAttribute('normal',new TT.BufferAttribute(N.subarray(0,o*3),3)); g.setAttribute('uv',new TT.BufferAttribute(U.subarray(0,o*2),2)); g.setAttribute('color',new TT.BufferAttribute(C.subarray(0,o*3),3));
          const tx=k==='n'?null:winTex(k); const m=new TT.Mesh(g,new TT.MeshStandardMaterial({vertexColors:true,map:tx,roughness:k==='g'?.45:.9,metalness:k==='g'?.1:0})); m.receiveShadow=true; m.castShadow=false; K.life.add(m); out.push(m); } return out; };
      // 흩뿌리기 도우미: 사각 격자 블록(가로 간격 sx·sz, 도로 폭 rw) — ok(x,z)가 false면 생략, f(x,z)→[w,d,h,hex,kind,roofHex,roofH,inset] 
      const grid=(x0,x1,z0,z1,sx,sz,rw,ok,f,ry)=>{ const L=[]; const cs=Math.cos(ry||0), sn=Math.sin(ry||0); for(let a=x0;a<x1;a+=sx) for(let b=z0;b<z1;b+=sz){ const x=a*cs+b*sn, z=-a*sn+b*cs; if(ok&&!ok(x,z)) continue; const q=f(x,z,sx-rw,sz-rw); if(!q) continue; L.push([x,z,q[0],q[1],q[2],q[3],ry||0,q[4],q[5],q[6],q[7]]); } return L; };
      // 도시 고리: o={r0,r1,step,keep(x,z)→bool, h(r)→높이, pal:[색…], gp:유리 비율, tall:[확률,최소,폭], ry, roof:[색,높이,들임] or null, fill:비율}
      const ring=(o)=>{ const L=[]; const st=o.step||50, cs=Math.cos(o.ry||0), sn=Math.sin(o.ry||0); for(let a=-o.r1;a<o.r1;a+=st) for(let b=-o.r1;b<o.r1;b+=st){ const x0=a+(E.r()-.5)*st*.25, z0=b+(E.r()-.5)*st*.25; const x=(o.cx||0)+x0*cs+z0*sn, z=(o.cz||0)-x0*sn+z0*cs; const r=Math.hypot(x0,z0); if(r<o.r0||r>o.r1) continue; if(o.keep&&!o.keep(x,z,r)) continue; if(o.clr&&x>-o.clr*.12&&z>-o.clr*.12&&Math.hypot(x,z)<o.clr) continue; if(E.r()>(o.fill||.65)) continue;
          const tall=o.tall&&E.r()<o.tall[0]; const gl=tall||E.r()<(o.gp||0); const w=st*(.45+E.r()*.35), d=st*(.45+E.r()*.35); const h=tall?o.tall[1]+E.r()*o.tall[2]:o.h(r,x,z); const pal=gl?(o.gpal||['#b7c5cf','#a3b4c0','#c3cdd4']):o.pal; const rf=!gl&&o.roof?o.roof:null; L.push([x,z,w,d,h,pal[Math.floor(E.r()*pal.length)],o.ry||0,gl?'g':(o.kind||'p'),rf?rf[0]:null,rf?rf[1]:0,rf?rf[2]:0,o.hy?o.hy(x,z):0]); } return city(L); };
      // 맨해튼 격자: x 방향 블록 길이 bx(애비뉴 간격), z 방향 by(스트리트 간격), 블록마다 남북 두 줄로 필지를 나눔 — o={x0,x1,z0,z1,bx,bz,aw,sw,skip(x,z,w,d)→bool, h(x,z)→높이, pal, gpal, gp}
      const manh=(o)=>{ const L=[]; const bx=o.bx||260, bz=o.bz||80, aw=o.aw||30, sw=o.sw||18; for(let X=o.x0;X<o.x1;X+=bx) for(let Z=o.z0;Z<o.z1;Z+=bz){ const W0=bx-aw, D0=bz-sw; for(const row of [-1,1]){ let x=X-W0/2; while(x<X+W0/2-4){ const w=Math.min(X+W0/2-x,10+E.r()*E.r()*45); const cx=x+w/2, cz=Z+row*D0/4, d=D0/2-(E.r()<.3?E.r()*8:0); x+=w; if(o.skip&&o.skip(cx,cz,w,d)) continue; const h=o.h(cx,cz); if(h<=0) continue; const gl=h>110&&E.r()<(o.gp===undefined?.5:o.gp); const pal=gl?(o.gpal||['#a9b8c3','#9aabb7','#bcc6cc']):(o.pal||['#cbbfa8','#b9a993','#a38f7a','#d8d0c0','#9c8f84','#c4b49c']); L.push([cx,cz+(row>0?-(D0/2-d)/2:(D0/2-d)/2),w-.6,d,h,pal[Math.floor(E.r()*pal.length)],0,gl?'g':'p']); } } } return city(L); };
      // 뷰어의 일반 대지(잔디판·포장판·길·차선)를 이 모형이 떠 있는 동안만 숨김 — site 자식의 visible을 getter로 바꿔(life가 보일 때 false) 첫 프레임·썸네일에서도 적용, 'site' 단계처럼 life가 꺼지면 원래대로 보이고, 다른 모형으로 바뀌면(표식이 life에서 빠지면) 자동으로 원상
      const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mk=new TT.Object3D(); K.life.add(mk); const on=()=>mk.parent===K.life&&!!K.life.parent&&K.life.visible;
        const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mk.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
      return {sky,lplane,lpoly,solid,WATER,city,grid,ring,manh,own}; })();


    // 나오시마 남쪽 언덕(해발 약 40 m): 미술관은 언덕에 묻히고 남쪽(+z)으로 세토 내해가 내려다보임 · 둘레는 소나무·떡갈나무 잡목 숲 언덕, 바다 건너 크고 작은 섬들(남쪽 메기지마·오기지마 쪽, 동쪽 데시마·쇼도시마 쪽) — 해안선·섬 위치 개략(추정)
    E.own();
    const SEA=-38, inR=(x,z,m)=>Math.abs(x)<52+m&&Math.abs(z)<53+m;
    const shore=x=>230+Math.sin(x*.006)*70+Math.sin(x*.017+1)*25;
    const hf=(x,z)=>{ if(inR(x,z,0)) return -.32; const ex=Math.max(Math.abs(x)-52,0), ez=Math.max(Math.abs(z)-53,0), ed=Math.hypot(ex,ez);
      let h=(E.fbm(x*.01,z*.01,3)-.4)*16*E.ss(ed/60)+ed*.04;
      h+=E.peaks(x,z,[[-150,-280,260,200,55,1.3],[220,-250,240,200,45,1.3],[-420,-60,260,300,38,1.3],[480,40,260,260,30,1.3]]);
      const sz=shore(x); const t=(z-60)/(sz-60); if(t>0) h=h*(1-E.ss(t))+(SEA-1)*Math.pow(E.ss(t),1.2);
      if(z>sz) h=SEA-3-(z-sz)*.05; const wx=-1350+Math.sin(z*.004)*120; if(x<wx+250){ const tw=E.ss((wx+250-x)/250); h=h*(1-tw)+(SEA-2)*tw; if(x<wx) h=SEA-3-(wx-x)*.05; }
      const isl=E.peaks(x,z,[[-500,1300,420,260,150,1.3],[400,1700,380,230,110,1.3],[2300,600,900,500,300,1.25],[1400,1500,500,300,120,1.3],[-1800,1100,700,400,180,1.3]]); if(isl>0) h=Math.max(h,SEA-6+isl+(E.fbm(x*.01,z*.01,2)-.5)*14);
      const R=Math.hypot(x,z), a=Math.atan2(z,x); if(a>-.1&&a<1.7&&R<200&&h>0) h*=E.ss((R-90)/110); return h; };
    const TR=E.terrain(0,0,0,0,E.axis(3400,160,4.2),E.axis(3400,160,4.2,300),hf,(x,z,h,ny)=>{ const q=E.vn(x*.06,z*.06);
        if(inR(x,z,0)) return [.4,.5,.28];
        if(h<SEA+2.5&&h>SEA-4) return [.74+.05*q,.7+.05*q,.6+.04*q]; // 자갈·모래 해변
        if(h>0&&Math.hypot(x,z)<160&&ny>.9) return [.42+.05*q,.5+.05*q,.3+.04*q];
        return E.mcol(x,z,h,ny,{far:1300,farW:1600,cliff:.7,haze:[.66,.72,.78]}); });
    W.lplane(W.WATER,0,SEA,1600,9000,4600); W.lplane(W.WATER,-3200,SEA,-1000,3600,3000); W.lplane(W.WATER,3000,SEA,-1000,3000,3000);
    // 숲: 곰솔·적송(소나무) + 상록 활엽 잡목 — 미술관 언덕 주변은 비우고 카메라(남동) 쪽 근경은 낮게
    const cam=(x,z,R0)=>{ const a=Math.atan2(z,x), R=Math.hypot(x,z); return a>-.1&&a<1.7&&R<R0; };
    const near=E.scatter(-500,500,-500,320,6.5,TR.h,(x,z,h)=>!inR(x,z,3)&&h>SEA+3&&!cam(x,z,170)&&E.r()<.85,(x,z,h)=>8+E.r()*6,(x,z)=>E.vn(x*.03+1,z*.03)<.55?1:0); near.forEach(t=>t[6]*=.85);
    E.forest(near,{trunks:true,pal:[['#3f5d38','#4a6a3f','#557548','#3a5434'],['#33503a','#3d5c42','#2e4834']]});
    E.forest(E.scatter(-3000,3000,-2000,2600,16,TR.h,(x,z,h)=>(Math.abs(x)>495||z<-495||z>315)&&h>SEA+4&&E.r()<.8,(x,z,h)=>10+E.r()*6,(x,z)=>E.r()<.5?1:0),{trunks:false,pal:[['#47643f','#52704a'],['#36533c','#3f5d44']]});
    W.sky(3600); tidy(1);
    }
  }});
