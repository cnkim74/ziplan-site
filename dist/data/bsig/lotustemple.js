__bsigFill({"lotustemple":function(K){
// 출처: 꽃잎 27장(입구·바깥·안쪽 잎 9장씩)·9각 평면·아홉 문·연못 9·지름 70 m(입구 잎)/130 m(연못 포함)·흰 펜텔리콘 대리석·붉은 사암 기단과 계단·현장 타설 철근콘크리트·10.8 ha·1986 준공·높이 40.8 m(입구 층 기준) — en.wikipedia.org/wiki/Lotus_Temple(다른 자료는 34.3 m)
// 추정: 꽃잎 곡률·폭·밑동 반지름(입구 21·바깥 19·안쪽 14 m) · 꼭대기 높이 약 36 m(기단 포함) · 기단 높이 2.5 m · 연못 모양(연잎형) · 정원 배치 개략 · 축: +z = 정문(진입로)
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
    // ---- 재질: 흰 대리석(삼각 패널 줄눈) · 붉은 사암 · 연못 물 ----
    const mT=tex('lotusMarble',256,(g,N,rr)=>{ g.fillStyle='#f1efe8'; g.fillRect(0,0,N,N); for(let i=0;i<1800;i++){ g.fillStyle=rr()<.5?'rgba(200,196,186,.18)':'rgba(255,255,255,.3)'; g.fillRect(rr()*N,rr()*N,3,2); } g.strokeStyle='rgba(150,146,138,.55)'; g.lineWidth=1.4; for(let i=-4;i<=8;i++){ g.beginPath(); g.moveTo(i*N/4,0); g.lineTo(i*N/4+N/2,N); g.stroke(); g.beginPath(); g.moveTo(i*N/4,0); g.lineTo(i*N/4-N/2,N); g.stroke(); } for(let j=0;j<4;j++){ g.beginPath(); g.moveTo(0,j*N/4); g.lineTo(N,j*N/4); g.stroke(); } });
    const MB=tmat(mT,0xffffff,{roughness:.42}), MBu=tmat(mT,0xd9d6ce,{roughness:.5}), SS=K.col(0xa5523b,{roughness:.85}), SSl=K.col(0xb86a4e,{roughness:.85}), GLS=K.col(0x2f3a44,{roughness:.12,metalness:.6}), WHT=K.col(0xf2f0ea,{roughness:.5});
    const N9=9, TAU=Math.PI*2, Y0=2.6; // 기단 위 입구 층
    // 꽃잎: 방위 φ, 중심선 2차 베지어 (r0,y0)→(rc,yc)→(r1,y1), 폭 W, 볼록 B(바깥으로 부풂), 두께 th
    const petal=(phi,r0,y0,rc,yc,r1,y1,Wd,B,mat)=>{ const cp=Math.cos(phi), sp=Math.sin(phi); const bz=(v,a,b,c)=>(1-v)*(1-v)*a+2*(1-v)*v*b+v*v*c;
      const wf=v=>Wd*Math.pow(1-v,.62)*(.72+.28*Math.sin(Math.PI*Math.min(1,v*1.3)));
      const fn=(u,v,o)=>{ const s=2*u-1; const r=bz(v,r0,rc,r1), y=bz(v,y0,yc,y1); const dr=2*(1-v)*(rc-r0)+2*v*(r1-rc), dy=2*(1-v)*(yc-y0)+2*v*(y1-yc); const L=Math.hypot(dr,dy)||1; const nr=dy/L, ny=-dr/L; const w=wf(v); const bul=B*w*(1-s*s)+(o||0); const R=r+nr*bul, Y=y+ny*bul; const lat=s*w; return [cp*R-sp*lat,Y,sp*R+cp*lat,u*w/3,v*Math.hypot(r1-r0,y1-y0)/4]; };
      K.surf((u,v)=>fn(u,v,0),12,22,mat); K.surf((u,v)=>fn(u,v,-.45),12,22,MBu); };
    K.layer(0);
    // ---- 9각 기단(붉은 사암) + 계단 9 · 안쪽 예배당 벽(9각 드럼) + 문 9 ----
    const ngon=(r,rot)=>{ const P=[]; for(let i=0;i<N9;i++){ const a=rot+i*TAU/N9; P.push([Math.cos(a)*r,Math.sin(a)*r]); } return P; };
    K.ex(ngon(37,Math.PI/2+Math.PI/9),Y0-.3,SS,[0,0,0]); K.ex(ngon(37.6,Math.PI/2+Math.PI/9),.3,SSl,[0,Y0-.3,0]); K.ex(ngon(39,Math.PI/2+Math.PI/9),.5,SSl,[0,0,0]);
    { const STP=[]; for(let k=0;k<N9;k++){ const a=Math.PI/2+k*TAU/N9, ry=Math.atan2(Math.cos(a),Math.sin(a)); for(let i=0;i<6;i++){ const d=37.2+(6-i)*.55; STP.push([Math.cos(a)*d,0,Math.sin(a)*d,ry,8,(i+1)*Y0/6,.6]); } } inst(new T.BoxGeometry(1,1,1).translate(0,.5,0),SSl,STP); }
    K.ex(ngon(18.5,Math.PI/2+Math.PI/9),9,WHT,[0,Y0,0]); for(let k=0;k<N9;k++){ const a=Math.PI/2+k*TAU/N9, ry=Math.atan2(Math.cos(a),Math.sin(a)); const d=18.5*Math.cos(Math.PI/9); K.b(Math.cos(a)*(d+.05),Y0,Math.sin(a)*(d+.05),5.2,5.6,.2,GLS,ry); K.b(Math.cos(a)*(d+.15),Y0+5.6,Math.sin(a)*(d+.15),6,.4,.4,WHT,ry); }
    // ---- 꽃잎 27장: 입구 잎 9(바깥으로 휨) · 바깥 잎 9(반쯤 열림) · 안쪽 잎 9(위에서 모임) ----
    K.layer(1);
    for(let k=0;k<N9;k++){ const a=Math.PI/2+k*TAU/N9; petal(a,21,Y0+.2,24.5,Y0+12,34,Y0+9.5,12.5,.22,MB); }
    K.layer(2);
    for(let k=0;k<N9;k++){ const a=Math.PI/2+(k+.5)*TAU/N9; petal(a,18.5,Y0+3,22,Y0+16,14.5,Y0+27,11.5,.2,MB); }
    K.layer(3);
    for(let k=0;k<N9;k++){ const a=Math.PI/2+k*TAU/N9; petal(a,14,Y0+7,17.5,Y0+22,4,Y0+33.5,10.5,.18,MB); }
    K.c(0,Y0+30,0,3.4,2.2,GLS,18); // 꼭대기 채광(꽃잎 사이 빛)
    // ---- 배경(K.life): 연못 9(연잎형) · 산책로 · 붉은 사암 길 · 정원 잔디·나무 · 진입로 · 델리 시가 ----
    K.cur=K.life;
    const LAWN=lmat(0x7f9a52), PATH=lmat(0xc9a68a), PWT=lmat(0x4f7d84,{roughness:.05,metalness:.02});
    lplane(LAWN,0,-.06,0,3000,3000); ldisc(PATH,0,.0,0,68,72);
    for(let k=0;k<N9;k++){ const c=Math.PI/2+(k+.5)*TAU/N9; const P=[]; for(let i=0;i<=16;i++){ const t=i/16; const ang=c+(t-.5)*TAU/N9*.78; const r=44+18*Math.sin(Math.PI*t)*.0; P.push([Math.cos(ang)*(41+1.2*Math.sin(Math.PI*t)),Math.sin(ang)*(41+1.2*Math.sin(Math.PI*t))]); } for(let i=16;i>=0;i--){ const t=i/16; const ang=c+(t-.5)*TAU/N9*.78; const ro=41+22*Math.pow(Math.sin(Math.PI*t),.7); P.push([Math.cos(ang)*ro,Math.sin(ang)*ro]); } lpoly(SSl,P.map(([x,z])=>[x*1.0,z*1.0]),.08); lpoly(PWT,P.map(([x,z])=>{ const r=Math.hypot(x,z), a=Math.atan2(z,x); const rr=41.8+(r-41)*.93; return [Math.cos(a)*rr,Math.sin(a)*rr]; }),.18); }
    lplane(PATH,0,.03,140,9,150); lplane(PATH,0,.03,215,60,14); for(const s of [-1,1]) lplane(lmat(0x6f8a48),s*16,.02,140,20,150); // 진입로 + 양옆 잔디판
    forest(scatter(-260,260,-260,260,14,()=>0,(x,z)=>{ const r=Math.hypot(x,z); return r>78&&!(Math.abs(x)<34&&z>60)&&rnd()<.45; },()=>7+rnd()*5,0));
    { const L=[]; for(let i=0;i<140;i++){ const a=rnd()*TAU, r=420+rnd()*700; L.push([Math.cos(a)*r,Math.sin(a)*r,20+rnd()*30,20+rnd()*30,8+rnd()*30,['#d9d0be','#cbbfa8','#e4ddce','#bfb3a0'][Math.floor(rnd()*4)],'p']); } city(L); }
    forest(scatter(-600,600,-600,600,40,()=>0,(x,z)=>{ const r=Math.hypot(x,z); return r>280&&r<420&&rnd()<.6; },()=>9+rnd()*5,0));
    sky(2400); K.cur=null;
  }});
