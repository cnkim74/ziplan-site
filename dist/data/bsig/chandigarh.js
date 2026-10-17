__bsigFill({"chandigarh":function(K){
// 출처: 1951 설계·1951~63 시공·1962 준공·노출 콘크리트(béton brut)·넓은 포르티코와 위로 휜 차양·얇은 벽 기둥·지붕 위 쌍곡면 셸과 기울어진 피라미드·에나멜 회전문·얕은 수반·2016 세계유산 — studiomatrx.org(architecture-canon/palace-of-assembly-chandigarh)
// 추정: 매스 96 × 96 m·높이 18 m · 포르티코 깊이 16 m·차양 낮은 곳 약 17 m/끝 약 28 m · 벽 기둥 8장 · 쌍곡면 밑지름 38 m·허리 26 m·높이 38~42 m(꼭대기 비스듬) · 피라미드 20 m · 수반 96 × 22 m · 고등법원·열린 손 위치는 개략 · 축: +z = 포르티코(고등법원 쪽), +x = 북(시발리크)
    const T=K.T; K.life.clear();
    // ---- 공용 헬퍼(SA v1, 이 build 안에서만): 인스턴스 · 캔버스 질감 · 상자 매핑 UV · life 바닥/물/하늘 · 지형 · 숲 · 야자 · 도시 블록 ----
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const mk=(g,mat,cast)=>put(new T.Mesh(g,mat),cast);
    const inst=(geo,mat,items,cast,grp)=>{ if(!items.length) return null; const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),E=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); E.set(it[7]||0,it[3]||0,it[8]||0,'YXZ'); Q.setFromEuler(E); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; if(grp){ m.castShadow=!!cast; m.receiveShadow=true; grp.add(m); return m; } return put(m,cast); };
    let sd=11; const rnd=()=>{ sd=(sd*16807)%2147483647; return sd/2147483647; };
    const TXC=(typeof window!=='undefined')?(window.__kTexSA||(window.__kTexSA={})):{};
    const tex=(key,px,draw)=>{ if(TXC[key]) return TXC[key]; if(typeof document==='undefined') return null; const cv=document.createElement('canvas'); cv.width=cv.height=px; const g=cv.getContext('2d'); let s=31; const rr=()=>{ s=(s*16807)%2147483647; return s/2147483647; }; draw(g,px,rr); const t=new T.CanvasTexture(cv); t.wrapS=t.wrapT=T.RepeatWrapping; t.encoding=T.sRGBEncoding; t.anisotropy=8; return TXC[key]=t; };
    const tmat=(t,hex,o)=>{ const m=new T.MeshStandardMaterial(Object.assign({color:hex,map:t||null,roughness:.85},o||{})); m.color.convertSRGBToLinear(); return m; };
    // 상자 매핑 UV(월드 좌표, su·sv m당 1장) — 평면 위주 기하에 질감을 이음매 없이
    const wuv=(g,su,sv)=>{ if(g.index) g=g.toNonIndexed(); if(!g.attributes.normal) g.computeVertexNormals(); const p=g.attributes.position,n=g.attributes.normal; const uv=new Float32Array(p.count*2); for(let i=0;i<p.count;i++){ const ax=Math.abs(n.getX(i)),ay=Math.abs(n.getY(i)),az=Math.abs(n.getZ(i)); let u,v; if(ay>ax&&ay>az){ u=p.getX(i); v=p.getZ(i); } else if(ax>az){ u=p.getZ(i); v=p.getY(i); } else { u=p.getX(i); v=p.getY(i); } uv[i*2]=u/su; uv[i*2+1]=v/(sv||su); } g.setAttribute('uv',new T.BufferAttribute(uv,2)); return g; };
    const boxG=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const tb=(x,y,z,w,h,d,mat,su,sv,ry,cast)=>mk(wuv(boxG(x,y,z,w,h,d,ry),su,sv),mat,cast);
    const mergeG=gs=>{ const G=gs.map(g=>g.index?g.toNonIndexed():g); let n=0; for(const g of G) n+=g.attributes.position.count; const P=new Float32Array(n*3), N=new Float32Array(n*3), U=new Float32Array(n*2); let o=0; for(const g of G){ P.set(g.attributes.position.array,o*3); N.set(g.attributes.normal.array,o*3); if(g.attributes.uv) U.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(P,3)); g.setAttribute('normal',new T.BufferAttribute(N,3)); g.setAttribute('uv',new T.BufferAttribute(U,2)); return g; };
    // life(배경, bbox 밖): 재질 · 바닥판 · 다각형 · 원판 · 물
    const lmat=(hex,o)=>{ const m=new T.MeshStandardMaterial(Object.assign({color:hex,roughness:.95},o||{})); m.color.convertSRGBToLinear(); m.userData.nocast=1; return m; };
    const WATER=lmat(0x5b7f8c,{roughness:.05,metalness:.02});
    const ladd=(me,rs)=>{ me.receiveShadow=rs!==false; me.castShadow=false; K.life.add(me); return me; };
    const lplane=(m,x,y,z,w,d,ry)=>{ const g=new T.PlaneGeometry(w,d); g.rotateX(-Math.PI/2); if(ry) g.rotateY(ry); g.translate(x,y,z); return ladd(new T.Mesh(g,m),m!==WATER); };
    const lpoly=(m,pts,y)=>{ pts=pts.slice(); { let a=0; for(let i=0;i<pts.length;i++){ const p=pts[i], q=pts[(i+1)%pts.length]; a+=p[0]*q[1]-q[0]*p[1]; } if(a>0) pts.reverse(); } const sh=new T.Shape(); pts.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); const g=new T.ShapeGeometry(sh); g.rotateX(-Math.PI/2); g.translate(0,y,0); return ladd(new T.Mesh(g,m),m!==WATER); };
    const ldisc=(m,x,y,z,r,seg,sx)=>{ const g=new T.CircleGeometry(r,seg||48); g.rotateX(-Math.PI/2); if(sx) g.scale(sx,1,1); g.translate(x,y,z); return ladd(new T.Mesh(g,m),m!==WATER); };
    // 뷰어의 일반 대지(잔디판·길 등)를 이 모형이 떠 있는 동안만 숨김(v13 W.own과 같음)
    const own=()=>{ const root=K.bldg.parent; if(!root) return; const site=root.children[0]; if(!site||site===K.bldg||site===K.life||!site.isGroup) return; const mkr=new T.Object3D(); K.life.add(mkr); const on=()=>mkr.parent===K.life&&!!K.life.parent&&K.life.visible;
      const hide=o=>{ try{ Object.defineProperty(o,'visible',{configurable:true,get(){ return !on(); },set(v){}}); }catch(e){} }; site.children.forEach(hide); const add0=site.add; site.add=function(...a){ if(mkr.parent===K.life&&K.life.parent) a.forEach(hide); return add0.apply(this,a); }; };
    // 하늘 돔(넓은 맥락용) — 밤이면 밤색
    const sky=(R)=>{ const g=new T.SphereGeometry(R,32,16); const p=g.attributes.position; const mkc=night=>{ const col=[]; const top=new T.Color(night?0x0b1226:0x9fc0de).convertSRGBToLinear(), hor=new T.Color(night?0x2a3350:0xeee9df).convertSRGBToLinear(), c=new T.Color(); for(let i=0;i<p.count;i++){ const t=Math.max(0,Math.min(1,p.getY(i)/(R*.63))); c.copy(hor).lerp(top,Math.pow(t,.65)); col.push(c.r,c.g,c.b); } return new T.Float32BufferAttribute(col,3); }; const cD=mkc(false), cN=mkc(true); g.setAttribute('color',cD); const m=new T.Mesh(g,new T.MeshBasicMaterial({vertexColors:true,side:T.BackSide,fog:false,depthWrite:false})); m.renderOrder=-1; m.frustumCulled=false; let cur=0; m.onBeforeRender=(r,sc)=>{ const n=sc.fog&&sc.fog.color&&sc.fog.color.r<.3?1:0; if(n!==cur){ cur=n; g.setAttribute('color',n?cN:cD); } }; K.life.add(m); return m; };
    // 값 잡음 · 봉우리
    const hsh=(x,z)=>{ let n=Math.imul(x|0,374761393)+Math.imul(z|0,668265263)|0; n=Math.imul(n^(n>>>13),1274126177); return ((n^(n>>>16))>>>0)/4294967296; };
    const vn=(x,z)=>{ const xi=Math.floor(x), zi=Math.floor(z), xf=x-xi, zf=z-zi; const u=xf*xf*(3-2*xf), v=zf*zf*(3-2*zf); const a=hsh(xi,zi), b=hsh(xi+1,zi), c=hsh(xi,zi+1), d=hsh(xi+1,zi+1); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; };
    const fbm=(x,z,o)=>{ let s=0, a=.5, f=1; for(let i=0;i<(o||4);i++){ s+=a*vn(x*f,z*f); a*=.5; f*=2.03; } return s; };
    const ss=t=>{ t=Math.min(1,Math.max(0,t)); return t*t*(3-2*t); };
    const peaks=(x,z,pk)=>{ let h=0; for(let i=0;i<pk.length;i++){ const q=pk[i]; const ax=(x-q[0])/q[2], az=(z-q[1])/q[3]; const d2=ax*ax+az*az; if(d2<1){ const d=Math.sqrt(d2); const e=1-ss(d); h=Math.max(h,q[4]*Math.pow(e,q[5]||1.3)); } } return h; };
    // 지형(life): hf(x,z) 높이, cf(x,z,h,ny) → [r,g,b](sRGB 0~1), hole [x0,x1,z0,z1]은 비움
    const terrain=(x0,x1,z0,z1,nx,nz,hf,cf,hole)=>{ const ax=(a0,a1,n,e)=>{ const L=[]; for(let i=0;i<=n;i++) L.push(a0+(a1-a0)*i/n); if(e) e.forEach(v=>{ if(v>a0&&v<a1) L.push(v); }); L.sort((a,b)=>a-b); return L.filter((v,i)=>i===0||v-L[i-1]>.01); };
      const XS=ax(x0,x1,nx,hole&&[hole[0],hole[1]]), ZS=ax(z0,z1,nz,hole&&[hole[2],hole[3]]); const W=XS.length, H=ZS.length, n=W*H; const Y=new Float32Array(n), P=new Float32Array(n*3), N=new Float32Array(n*3), Cc=new Float32Array(n*3);
      for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, x=XS[i], z=ZS[j]; Y[k]=hf(x,z); P[k*3]=x; P[k*3+1]=Y[k]; P[k*3+2]=z; }
      const lc=v=>v<.04045?v*.0773993808:Math.pow(v*.9478672986+.0521327014,2.4);
      for(let j=0;j<H;j++) for(let i=0;i<W;i++){ const k=j*W+i, i0=Math.max(0,i-1), i1=Math.min(W-1,i+1), j0=Math.max(0,j-1), j1=Math.min(H-1,j+1); const hx=(Y[j*W+i1]-Y[j*W+i0])/(XS[i1]-XS[i0]), hz=(Y[j1*W+i]-Y[j0*W+i])/(ZS[j1]-ZS[j0]); const L=Math.sqrt(hx*hx+1+hz*hz); N[k*3]=-hx/L; N[k*3+1]=1/L; N[k*3+2]=-hz/L; const v=cf(P[k*3],P[k*3+2],Y[k],1/L); Cc[k*3]=lc(v[0]); Cc[k*3+1]=lc(v[1]); Cc[k*3+2]=lc(v[2]); }
      const I=[]; for(let j=0;j<H-1;j++) for(let i=0;i<W-1;i++){ if(hole){ const cx=(XS[i]+XS[i+1])/2, cz=(ZS[j]+ZS[j+1])/2; if(cx>hole[0]&&cx<hole[1]&&cz>hole[2]&&cz<hole[3]) continue; } const a=j*W+i, b=a+1, c=a+W, d=c+1; I.push(a,c,b,b,c,d); }
      const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(P,3)); g.setAttribute('normal',new T.BufferAttribute(N,3)); g.setAttribute('color',new T.BufferAttribute(Cc,3)); g.setIndex(new T.BufferAttribute(new Uint32Array(I),1)); g.computeBoundingSphere();
      const m=new T.Mesh(g,new T.MeshStandardMaterial({vertexColors:true,roughness:1})); m.receiveShadow=true; m.castShadow=false; K.life.add(m); return m; };
    // 숲: items [x,y,z,h,kind(0 활엽 둥근,1 납작,2 원뿔), tone, 폭배율] — 수관 + 줄기 인스턴스, 색 변주
    const crownG=[ (()=>{ const a=new T.IcosahedronGeometry(.5,1); a.scale(1,.78,1); a.translate(0,.62,0); const b=new T.IcosahedronGeometry(.3,0); b.translate(.22,.78,.1); return mergeG([a,b]); })(),
      (()=>{ const a=new T.IcosahedronGeometry(.5,0); a.scale(1.15,.42,1.0); a.translate(0,.82,0); const b=new T.IcosahedronGeometry(.32,0); b.scale(1.1,.45,1); b.translate(-.25,.66,.12); return mergeG([a,b]); })(),
      (()=>{ const a=new T.ConeGeometry(.36,.62,7); a.translate(0,.55,0); const b=new T.ConeGeometry(.26,.45,7); b.translate(0,.85,0); return mergeG([a,b]); })() ];
    const trunkG=(()=>{ const g=new T.CylinderGeometry(.03,.05,.6,5); g.translate(0,.3,0); return g; })();
    const LEAF=[['#46663a','#567a43','#3a5833','#62824a','#4d6e3e'],['#34502f','#3f5d36','#2e482b','#4a6739'],['#2a432b','#344f33','#243a25']];
    const forest=(items,o)=>{ o=o||{}; const byK=[[],[],[]]; items.forEach(it=>byK[it[4]||0].push(it)); const M4=new T.Matrix4(), Qt=new T.Quaternion(), V=new T.Vector3(), Sc=new T.Vector3(), Eu=new T.Euler(), c=new T.Color();
      byK.forEach((L,k)=>{ if(!L.length) return; const cm=new T.MeshStandardMaterial({color:0xffffff,roughness:.92,flatShading:true}); const im=new T.InstancedMesh(crownG[k],cm,L.length); const tm=o.trunks!==false?new T.InstancedMesh(trunkG,K.M.trunk,L.length):null;
        L.forEach((it,i)=>{ const h=it[3], w=h*(it[6]||1); Eu.set(0,(it[0]*13.1+it[2]*7.7)%6.28,0); Qt.setFromEuler(Eu); V.set(it[0],it[1],it[2]); Sc.set(w,h,w); M4.compose(V,Qt,Sc); im.setMatrixAt(i,M4); if(tm) tm.setMatrixAt(i,M4); const P=o.pal||LEAF[k]; const t=it[5]===undefined?((it[0]*.37+it[2]*.61)%1+1)%1:it[5]; c.set(P[Math.floor(t*P.length)%P.length]).convertSRGBToLinear(); im.setColorAt(i,c); });
        im.instanceMatrix.needsUpdate=true; if(im.instanceColor) im.instanceColor.needsUpdate=true; im.castShadow=!!o.cast; im.receiveShadow=true; (o.grp||K.life).add(im); if(tm){ tm.instanceMatrix.needsUpdate=true; tm.castShadow=!!o.cast; (o.grp||K.life).add(tm); } }); };
    const scatter=(x0,x1,z0,z1,sp,hf,ok,hs,kind)=>{ const L=[]; for(let z=z0;z<z1;z+=sp) for(let x=x0;x<x1;x+=sp){ const xx=x+(rnd()-.5)*sp*.9, zz=z+(rnd()-.5)*sp*.9; const h=hf(xx,zz); if(ok&&!ok(xx,zz,h)) continue; const s=hs?hs(xx,zz,h):sp*1.2; const kd=typeof kind==='function'?kind(xx,zz,h):(kind===undefined?(rnd()<.45?1:0):kind); L.push([xx,h-s*.08,zz,s*(.8+rnd()*.45),kd,rnd(),.85+rnd()*.4]); } return L; };
    // 야자: list [x,y,z,h] — 줄기(살짝 기울기) + 잎 9장(아래로 휘는 띠) 인스턴스
    const palms=(list,grp)=>{ if(!list.length) return; const TR=[],FR=[]; list.forEach(([x,y,z,h])=>{ const lean=(rnd()-.5)*.16, ry=rnd()*6.28; TR.push([x,y,z,ry,1,h,1,lean]); const tx=x+Math.sin(lean)*h*Math.sin(ry), tz=z+Math.sin(lean)*h*Math.cos(ry); for(let k=0;k<9;k++){ const a=ry+k*Math.PI*2/9+(rnd()-.5)*.3; FR.push([tx,y+h*.98,tz,a,1+rnd()*.25,1,1,0,0]); } });
      const tg=new T.CylinderGeometry(.16,.26,1,6); tg.translate(0,.5,0); const fg=new T.PlaneGeometry(4.2,.9,6,1); fg.translate(2.1,0,0); fg.rotateX(-Math.PI/2); { const p=fg.attributes.position; for(let i=0;i<p.count;i++){ const u=p.getX(i); p.setY(i,.9*u-.16*u*u); p.setZ(i,p.getZ(i)*(1-.75*u/4.2)); } fg.computeVertexNormals(); }
      const fm=new T.MeshStandardMaterial({color:0x4f7a3a,roughness:.9,side:T.DoubleSide}); fm.color.convertSRGBToLinear(); const G=grp||K.life; inst(tg,K.M.trunk,TR,false,G); inst(fg,fm,FR,false,G); };
    // 도시 블록(life, 멀리): [x,z,w,d,h,hex,kind('g' 유리|'p' 펀치창|'n' 무창)] — 창 질감 + 꼭짓점 색, 한 종류 한 메시
    const winTex=k=>tex('saWin'+k,256,(g,N,rr)=>{ if(k==='g'){ g.fillStyle='#c9d1d8'; g.fillRect(0,0,N,N); for(let j=0;j<4;j++){ g.fillStyle='#f2f4f5'; g.fillRect(0,j*N/4,N,N/4*.14); for(let i=0;i<8;i++){ const t=.85+rr()*.3; g.fillStyle=`rgb(${Math.round(168*t)},${Math.round(186*t)},${Math.round(200*t)})`; g.fillRect(i*N/8+2,j*N/4+N/4*.16,N/8-4,N/4*.84); } } } else { g.fillStyle='#ffffff'; g.fillRect(0,0,N,N); for(let j=0;j<4;j++) for(let i=0;i<4;i++){ g.fillStyle=rr()<.15?'#7d8590':'#59616b'; g.fillRect(i*N/4+N/4*.28,j*N/4+N/4*.22,N/4*.44,N/4*.56); } } });
    const city=(list)=>{ const by={g:[],p:[],n:[]}; list.forEach(b=>(by[b[6]||'p']||by.p).push(b)); for(const k of ['g','p','n']){ const L=by[k]; if(!L.length) continue; const gs=[]; const c=new T.Color(); for(const [x,z,w,d,h,hex] of L){ const g=new T.BoxGeometry(w,h,d).toNonIndexed(); g.translate(x,h/2,z); const p=g.attributes.position, nn=g.attributes.normal, n=p.count; const uv=new Float32Array(n*2), C=new Float32Array(n*3); c.set(hex).convertSRGBToLinear(); for(let i=0;i<n;i++){ const ny=nn.getY(i), nxa=Math.abs(nn.getX(i)); const sh=ny>.5?1.04:nxa>.5?.86:.95; uv[i*2]=ny>.5?.02:((nxa>.5?p.getZ(i):p.getX(i))/12); uv[i*2+1]=ny>.5?.02:p.getY(i)/(k==='g'?15:13.6); C[i*3]=c.r*sh; C[i*3+1]=c.g*sh; C[i*3+2]=c.b*sh; } g.setAttribute('uv',new T.BufferAttribute(uv,2)); g.setAttribute('color',new T.BufferAttribute(C,3)); gs.push(g); }
        const G=mergeG(gs); G.setAttribute('color',new T.BufferAttribute(new Float32Array(gs.reduce((a,g)=>a.concat(Array.from(g.attributes.color.array)),[])),3)); const m=new T.Mesh(G,new T.MeshStandardMaterial({vertexColors:true,map:k==='n'?null:winTex(k),roughness:k==='g'?.4:.9,metalness:k==='g'?.15:0})); ladd(m); } };
    own();
    // ---- 재질: 거푸집 자국 노출 콘크리트 · 어두운 안쪽 · 에나멜 문 ----
    const cT=tex('chdConc',256,(g,N,rr)=>{ g.fillStyle='#a8a296'; g.fillRect(0,0,N,N); for(let j=0;j<16;j++){ const t=.94+rr()*.1; g.fillStyle=`rgba(${Math.round(150*t)},${Math.round(144*t)},${Math.round(132*t)},.35)`; g.fillRect(0,j*N/16,N,N/16-1); g.fillStyle='rgba(70,64,54,.18)'; g.fillRect(0,j*N/16,N,1); } for(let i=0;i<3500;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.05)':'rgba(50,45,38,.08)'; g.fillRect(rr()*N,rr()*N,2,2); } for(let k=0;k<5;k++){ g.fillStyle='rgba(60,55,45,.08)'; g.fillRect(rr()*N,0,6+rr()*14,N); } });
    const CO=tmat(cT,0xffffff,{roughness:.9}), COd=tmat(cT,0x8f897e,{roughness:.92}), IN=K.col(0x3d3a35,{roughness:.95}), GLS=K.col(0x34404a,{roughness:.15,metalness:.6}), MET=K.col(0x6b6e70,{roughness:.4,metalness:.6});
    const dT=tex('chdDoor',256,(g,N,rr)=>{ g.fillStyle='#2d5da8'; g.fillRect(0,0,N,N); g.fillStyle='#e8c33a'; g.beginPath(); g.arc(N*.3,N*.28,N*.14,0,7); g.fill(); g.fillStyle='#c8372d'; g.fillRect(N*.55,N*.1,N*.35,N*.3); g.fillStyle='#2f8a4e'; g.beginPath(); g.moveTo(0,N*.75); for(let i=0;i<=8;i++) g.lineTo(i*N/8,N*(.62+(i%2)*.08)); g.lineTo(N,N); g.lineTo(0,N); g.fill(); g.fillStyle='#f3efe6'; g.fillRect(N*.1,N*.48,N*.8,N*.06); g.strokeStyle='#111'; g.lineWidth=4; g.beginPath(); g.moveTo(N*.2,N*.6); g.bezierCurveTo(N*.4,N*.4,N*.6,N*.8,N*.85,N*.55); g.stroke(); g.strokeStyle='#1a1a1a'; g.lineWidth=3; for(let i=1;i<4;i++){ g.beginPath(); g.moveTo(i*N/4,0); g.lineTo(i*N/4,N); g.stroke(); g.beginPath(); g.moveTo(0,i*N/4); g.lineTo(N,i*N/4); g.stroke(); } });
    const DOOR=tmat(dT,0xffffff,{roughness:.3,metalness:.1});
    const W=96, Hm=18, ZF=48;
    K.layer(0);
    // ---- 사각 매스: 어두운 안쪽 몸체 + 지붕판 + 옆·뒤 브리즈솔레유 격자 ----
    K.b(0,0,0,W-3,Hm-.8,W-3,IN); tb(0,Hm-1.2,0,W,1.2,W,CO,6,6); tb(0,Hm,0,W+.6,.5,W+.6,CO,6,6); tb(0,0,0,W+1,.4,W+1,COd,6,6);
    { const FV=[],FH=[]; for(const [ax,az] of [[1,0],[-1,0],[0,-1]]){ const ry=Math.atan2(ax,az); const n=26; for(let k=0;k<=n;k++){ const t=-W/2+W*k/n; FV.push([ax*(W/2-.6)+az*t,0,az*(W/2-.6)-ax*t,ry,.35,Hm-1.2,1.6]); } for(const y of [0,4.6,9.2,13.8]) FH.push([ax*(W/2-.6),y+3.9,az*(W/2-.6),ry,W,.3,1.6]); }
      inst(new T.BoxGeometry(1,1,1).translate(0,.5,0),CO,FV); inst(new T.BoxGeometry(1,1,1).translate(0,.5,0),CO,FH); }
    // 정면 벽(포르티코 뒤): 유리 띠 + 에나멜 회전문(약 7.6 m 정사각)
    tb(0,0,ZF-.7,W,Hm+3.4,1.4,CO,6,6); K.b(0,0,ZF+.05,W-14,3.4,.1,GLS); K.b(-30,8,ZF+.05,24,1.6,.1,GLS); K.b(30,8,ZF+.05,24,1.6,.1,GLS);
    { const g=new T.BoxGeometry(7.6,7.6,.4); g.translate(0,3.8,ZF+.25); mk(g,[COd,COd,COd,COd,DOOR,COd]); }
    // ---- 포르티코: 홈통처럼 처졌다가 앞으로 휘어 오르는 차양 + 얇은 벽 기둥 8장 ----
    K.layer(1);
    const D=16, ycan=v=>21-5*Math.sin(Math.PI*v*.8)+12*v*v*v;
    K.surf((u,v)=>{ const x=-W/2+u*W; return [x,ycan(v),ZF+v*D,u*16,v*3]; },24,18,CO,{thick:1.0});
    K.surf((u,v)=>{ const x=-W/2+u*W; const y0=ycan(1); return [x,y0-v*1.0,ZF+D,u*16,v]; },8,1,COd);
    for(let k=0;k<8;k++){ const x=-W/2+6+k*(W-12)/7; const sh=new T.Shape(); sh.moveTo(0,0); sh.lineTo(D-1.5,0); for(let i=10;i>=0;i--){ const v=i/10*(D-1.5)/D; sh.lineTo(v*D,ycan(v)-1.0); } sh.lineTo(0,0); const g=new T.ExtrudeGeometry(sh,{depth:.9,bevelEnabled:false}); g.rotateY(-Math.PI/2); g.translate(x+.45,0,ZF); mk(wuv(g,6,6),CO); }
    // ---- 지붕 위: 쌍곡면 의회당(비스듬한 꼭대기 + 금속 테) · 기울어진 피라미드 · 지붕 위 작은 탑 ----
    K.layer(2);
    { const cx=-6, cz=-4, yw=24, rw=13, c=13.5; const rf=y=>rw*Math.sqrt(1+Math.pow((y-yw)/c,2)); const top=a=>38+4*Math.cos(a);
      K.surf((u,v)=>{ const a=u*Math.PI*2; const y=Hm+v*(top(a)-Hm); const r=rf(y); return [cx+Math.cos(a)*r,y,cz+Math.sin(a)*r,u*20,y/5]; },48,20,CO);
      K.surf((u,v)=>{ const a=u*Math.PI*2; const y=top(a)-.2+v*.9; const r=rf(top(a))+.25; return [cx+Math.cos(a)*r,y,cz+Math.sin(a)*r,u,v]; },48,1,MET);
      K.b(cx,38.4,cz,2*rf(38)*.9,.6,.8,MET); K.b(cx+rf(38)*.9-.4,36,cz,.6,3,.6,MET); K.b(cx-rf(38)*.9+.4,36,cz,.6,6.5,.6,MET); }
    { const m=K.pyr(24,Hm,-16,20,11,CO); m.rotation.z=.18; m.rotation.x=-.1; m.position.y+=1.2; K.b(24,Hm,-16,14,1.6,14,COd); }
    K.b(-30,Hm,30,6,7,6,CO); K.b(-30,Hm+7,30,7.4,.5,7.4,COd); // 지붕 위 승강 탑(추정)
    // ---- 배경(K.life): 수반 · 에스플러네이드(콘크리트 포장) · 고등법원 실루엣 · 열린 손 · 잔디 · 시발리크 산줄기 ----
    K.cur=K.life;
    const PAV=lmat(0xb7b1a5), GRS=lmat(0x8a9a5c);
    lplane(GRS,0,-.08,0,4000,4000); lplane(PAV,0,-.02,200,180,320); lplane(PAV,0,-.02,0,140,140);
    lplane(WATER,0,.04,ZF+D+13,W,22); for(const [x,z,w,d] of [[0,ZF+D+1.8,W+1,.6],[0,ZF+D+24.2,W+1,.6],[-W/2-.2,ZF+D+13,.6,23],[W/2+.2,ZF+D+13,.6,23]]) K.b(x,0,z,w,.35,d,COd); // 수반
    { const HC=K.col(0xa8a296,{roughness:.9}); const z=420; K.b(0,0,z,130,14,26,HC); K.surf((u,v)=>{ const x=-70+u*140, zz=z-20+v*40; return [x,26+2*Math.sin(u*Math.PI*10),zz,u,v]; },60,2,HC); for(const [x,c] of [[-6,0x3f8a4f],[0,0xe0b830],[6,0xc0392b]]) K.b(x,0,z+14,4,26,1.6,K.col(c,{roughness:.8})); } // 고등법원(개략)
    { const OH=K.col(0x8f969a,{roughness:.4,metalness:.5}); K.b(150,0,200,3,1,3,COd); K.c(150,1,200,.4,14,OH,8); const sh=new T.Shape(); sh.moveTo(-5,0); sh.lineTo(5,0); sh.lineTo(6,6); sh.lineTo(3,10); sh.lineTo(0,8); sh.lineTo(-3,10); sh.lineTo(-6,6); sh.lineTo(-5,0); const g=new T.ExtrudeGeometry(sh,{depth:.4,bevelEnabled:false}); g.translate(0,15,200); g.translate(150,0,0); ladd(new T.Mesh(g,OH)); } // 열린 손(개략)
    terrain(-3000,3000,-3000,3000,120,120,(x,z)=>{ const r=x>600?ss((x-600)/900):0; return .25+r*(140+120*fbm(z*.0015+2,x*.002,4))+peaks(x,z,[[2400,-800,900,700,320,1.4],[2600,900,900,800,380,1.5]]); },(x,z,h,ny)=>{ const n=fbm(x*.01,z*.01,2); return h>40?[.42+.08*n,.46+.06*n,.33+.05*n]:[.5+.06*n,.56+.06*n,.36]; },[-1200,600,-1200,1200]);
    forest(scatter(-700,550,-700,700,26,()=>0,(x,z)=>!(Math.abs(x)<110&&z>-90&&z<380)&&!(Math.abs(x)<80&&z>380&&z<460)&&!(Math.abs(x-150)<14&&Math.abs(z-200)<14)&&rnd()<.6,()=>9+rnd()*6,0));
    sky(3200); K.cur=null;
  }});
