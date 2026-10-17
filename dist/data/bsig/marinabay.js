__bsigFill({"marinabay":function(K){
// 출처: 타워 55층·스카이파크 340 m·캔틸레버 67 m(북 타워 밖)·2010 개장·사프디 — structurae.net/en/structures/marina-bay-sands(높이 206.9 m; 지붕 높이 약 194 m로 흔히 인용)
// 추정: 타워 간격 117.5 m·타워 폭(남북) 38 m·위 깊이 32 m·동쪽 다리 벌어짐 36 m(약 23층=75 m에서 만남)·포디엄 높이 22 m·아트사이언스 손가락 10개(최고 약 60 m)·수영장 길이 약 150 m · 축: +z = 서쪽(만), −x = 북쪽
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
    // ---- 재질: 타워 유리(층 띠 질감, 반사) · 스카이파크 흰 금속 · 포디엄 · 아트사이언스 흰 외피 ----
    const gT=tex('mbsGlass',256,(g,N,rr)=>{ g.fillStyle='#aebdc8'; g.fillRect(0,0,N,N); for(let j=0;j<2;j++){ for(let i=0;i<4;i++){ const t=.9+rr()*.18; g.fillStyle=`rgb(${Math.round(150*t)},${Math.round(170*t)},${Math.round(186*t)})`; g.fillRect(i*N/4+2,j*N/2+N/2*.16,N/4-4,N/2*.8); } g.fillStyle='#dfe4e6'; g.fillRect(0,j*N/2,N,N/2*.14); } g.fillStyle='rgba(230,236,240,.55)'; for(let i=0;i<4;i++) g.fillRect(i*N/4,0,3,N); });
    const GL=tmat(gT,0xffffff,{roughness:.22,metalness:.35}), GLd=tmat(gT,0xb9c6cf,{roughness:.2,metalness:.4});
    const MW=K.col(0xe9ebec,{roughness:.35,metalness:.4}), MWd=K.col(0xc9cdd0,{roughness:.4,metalness:.45}), DK=K.col(0x3a4652,{roughness:.2,metalness:.6}), DECK=K.col(0xb69a78,{roughness:.8}), POOL=K.col(0x3fa3c4,{roughness:.05,metalness:.1}), STN=K.col(0xd8d2c6,{roughness:.7}), GLP=K.col(0x8db0c2,{roughness:.06,metalness:.5,transparent:true,opacity:.5,depthWrite:false}), WH=K.col(0xf3f1ec,{roughness:.45}), GRN=K.col(0x5f8a46,{roughness:.95});
    // ---- 타워 단면(z,y): 서쪽 다리 수직 · 동쪽 다리 휘어 벌어짐 · 아래 아트리움 홈 — 남북(x)으로 압출 ----
    const H=191, ZW=16, ZE=-16, SP=36, YM=75; const off=y=>y<YM?-SP*Math.pow(1-y/YM,2):0;
    const prof=()=>{ const P=[[ZW,0],[ZW,H],[ZE,H]]; for(let i=0;i<=16;i++){ const y=H-(H)*i/16; P.push([ZE+off(y),y]); } P.push([-2+off(0),0]); for(let i=0;i<=12;i++){ const y=YM*i/12; P.push([-2+off(y),y]); } P.push([2,YM],[2,0]); return P; };
    const TW=38, TX=[-117.5,0,117.5];
    K.layer(0);
    for(const cx of TX){ const sh=new T.Shape(); prof().forEach(([z,y],i)=>i?sh.lineTo(-z,y):sh.moveTo(-z,y)); const g=new T.ExtrudeGeometry(sh,{depth:TW,bevelEnabled:false,curveSegments:2}); g.rotateY(Math.PI/2); g.translate(cx-TW/2,0,0); mk(wuv(g,6,7),GL);
      // 아트리움 끝 유리막(남북) + 로비 바닥 · 동쪽 다리 바깥 측면의 흰 수직 띠(층 끝선)
      for(const s of [-1,1]){ const sh2=new T.Shape(); sh2.moveTo(-2,0); for(let i=0;i<=10;i++){ const y=YM*i/10; sh2.lineTo(-(-2+off(y)),y); } sh2.lineTo(-2,YM); sh2.lineTo(-2,0); const g2=new T.ShapeGeometry(sh2); g2.rotateY(Math.PI/2); g2.translate(cx+s*(TW/2-1.5),0,0); const me=mk(g2,GLP,false); me.material=GLP.clone(); me.material.side=T.DoubleSide; }
      for(const s of [-1,1]) tb(cx+s*(TW/2+.15),0,ZW-.6,.3,H,1.2,MW,4,4); // 서쪽 면 양끝 흰 핀
      tb(cx,0,ZW+.2,TW-.4,6,.4,DK,4,4); // 1층 로비 유리 띠(어둡게)
    }
    // ---- 스카이파크(배): 340 m · 폭 38 · 북쪽 캔틸레버 67 m 뱃머리 ----
    K.layer(1);
    const XN=-117.5-TW/2-67, XS=117.5+TW/2+4.5; // 북 끝 −203.5, 남 끝 140.5 → 길이 344(≈340)
    const hull=[[XS,-19],[XS,19],[-150,19],[-185,15],[XN+4,6],[XN,0],[XN+4,-6],[-185,-15],[-150,-19]];
    K.ex(hull,4.2,MW,[0,H,0]); K.ex(hull.map(([x,z])=>[x*.985+(x<0?-1.5:0),z*.86]),2.2,MWd,[0,H-2.2,0]);
    { const g=new T.BoxGeometry(70,3,30); const p=g.attributes.position; for(let i=0;i<p.count;i++){ if(p.getY(i)<0) p.setZ(i,p.getZ(i)*(.55+.45*(p.getX(i)+35)/70)); if(p.getY(i)<0&&p.getX(i)<0) p.setY(i,p.getY(i)+1.4); } g.computeVertexNormals(); g.translate(-172,H-3.6,0); mk(g,MWd); } // 캔틸레버 밑 쐐기(뱃머리가 얇아짐)
    const YD=H+4.2; K.b(-4,YD,0,330,.3,32,DECK); // 데크
    // 인피니티 풀: 서쪽(만) 가장자리 약 150 m — 가장자리 물 넘침 턱
    K.b(-78,YD,11.5,150,1.1,10,STN); K.b(-78,YD+1.0,11.5,149,.12,9.4,POOL); K.b(-78,YD,17,150,.8,.6,GLP);
    // 데크: 카바나·정원 띠·레스토랑 파빌리온 · 유리 난간 · 북쪽 끝 전망 데크
    { const CB=[]; for(let i=0;i<14;i++) CB.push([-148+i*10.5,YD,3.2,0,3,2.4,3]); inst(new T.BoxGeometry(1,1,1).translate(0,.5,0),WH,CB); }
    for(const [x,w] of [[-20,26],[60,40],[118,22]]){ K.b(x,YD,-6,w,4.2,14,GLd); K.b(x,YD+4.2,-6,w+3,.5,17,MW); }
    K.b(-4,YD,-18.6,330,1.2,.15,GLP); K.b(-4,YD,18.6,330,1.2,.15,GLP);
    forest(scatter(-145,140,-14,-2,7,()=>YD,(x)=>Math.abs(x+20)>16&&Math.abs(x-60)>22&&Math.abs(x-118)>13,()=>4.2,0),{grp:K.layer(1),cast:true});
    palms([[-152,YD,6,5.5],[-150,YD,-8,6],[-5,YD,6,5.5],[30,YD,6,6],[90,YD,6,5.5],[135,YD,10,5]],K.layer(1));
    // ---- 포디엄(만 쪽): 석재 기단 + 휘는 금속·유리 지붕 6줄 · 로비 캐노피 ----
    K.layer(0);
    tb(0,0,72,300,12,76,STN,6,4); for(let i=0;i<6;i++){ const x0=-150+i*50; K.surf((u,v)=>{ const x=x0+u*50, z=34+v*76; const a=Math.sin(u*Math.PI); return [x,12+a*(3.5+2.5*Math.sin(v*Math.PI))+v*3,z,u*8,v*14]; },10,10,i%2?GLd:MWd); } for(let i=0;i<=6;i++) K.b(-150+i*50,12,72,1.2,7.5,76,MW);
    K.b(0,0,-26,300,1.2,10,STN); K.b(0,8,-33,TX[2]-TX[0]+TW,.6,16,MW); // 타워 동쪽 진입 캐노피(추정)
    // 이벤트 플라자 계단(만으로 내려감) · 산책로
    for(let i=0;i<5;i++) K.b(-20,0,112+i*3,200,(5-i)*.45,3,STN);
    // ---- 아트사이언스 뮤지엄: 원형 받침 + 손가락 10개(연꽃) · 연못 ----
    { const ax=-235, az=175; K.c(ax,0,az,16,9,STN,32,{r2:12}); K.c(ax,9,az,11,6,WH,32);
      const HS=[60,52,46,40,34,30,34,40,46,54]; for(let k=0;k<10;k++){ const a=k/10*Math.PI*2+.2, Hh=HS[k]*.8; const ca=Math.cos(a), sa=Math.sin(a);
        K.surf((u,v)=>{ const w=(1-v*.55)*6.2, th=(u-.5)*Math.PI; const R=8+v*v*Hh*.3+Math.cos(th)*1.5*(1-v), Y=8+v*Hh*.82; const s=Math.sin(th)*w; return [ax+ca*R-sa*s,Y-(v>.92?(v-.92)*20*Math.abs(Math.sin(th)):0),az+sa*R+ca*s,u,v]; },10,10,WH); } }
    // ---- 크리스털 파빌리온 2(물 위 유리) ----
    for(const [x,z,w] of [[-120,168,26],[-75,176,20]]){ K.b(x,0,z,w,.8,w*.7,STN); K.ex([[-w/2,0],[0,-w*.35],[w/2,0],[0,w*.35]].map(([a,b])=>[x+a,z+b]),9,GLd,[0,.8,0]); K.pyr(x,9.8,z,w*.62,5,GLd); }
    K.layer(2);
    // ---- 배경(K.life): 마리나 베이 · 건너편 CBD · 가든스 바이 더 베이(슈퍼트리·돔) · 도로 ----
    K.cur=K.life;
    lplane(lmat(0xa7a59e),0,-.05,-480,2600,1220); lplane(lmat(0x9b9a95),-150,.01,128,1400,8); K.b(-150,-1.4,130.5,1400,1.4,3,STN); // 땅(만 앞까지) · 해안 산책로 · 호안
    lpoly(WATER,[[-900,140],[400,140],[420,260],[300,700],[-900,700]],-.6); lplane(WATER,0,-.62,1600,4000,1800); // 만 + 바다
    lpoly(lmat(0x9fa097),[[-900,560],[300,560],[500,700],[700,1300],[-900,1300]],0); // 건너편 땅
    { const L=[]; for(let i=0;i<110;i++){ const x=-850+rnd()*1050, z=620+rnd()*520; const tall=rnd()<.45; const h=tall?140+rnd()*140:40+rnd()*70; L.push([x,z,28+rnd()*28,28+rnd()*24,h,tall?['#9fb0bd','#b6c2ca','#8a9ba8'][Math.floor(rnd()*3)]:['#d4cfc4','#c2bcb0','#e0dcd2'][Math.floor(rnd()*3)],tall?'g':'p']); } city(L); }
    { const L=[]; for(let i=0;i<40;i++){ const x=-900+rnd()*500, z=-600+rnd()*500; L.push([x,z,30+rnd()*20,30+rnd()*20,20+rnd()*50,'#cdc8bd','p']); } city(L); }
    lplane(lmat(0x6f8f55),320,-.02,-330,700,560); // 가든스 바이 더 베이(동·남)
    { const ST=[],CN=[]; for(let i=0;i<14;i++){ const x=250+rnd()*240, z=-260-rnd()*260, h=25+rnd()*25; ST.push([x,0,z,0,1,h,1]); CN.push([x,h,z,0,1,1,1]); } const sg=new T.CylinderGeometry(1.6,3.2,1,8).translate(0,.5,0); const cg=new T.CylinderGeometry(9,1.6,5,12,1,true).translate(0,2.5,0); const sm=new T.MeshStandardMaterial({color:0x5b4a6b,roughness:.7}); sm.color.convertSRGBToLinear(); const cm=new T.MeshStandardMaterial({color:0x7a5f8c,roughness:.7,side:T.DoubleSide}); cm.color.convertSRGBToLinear(); inst(sg,sm,ST,false,K.life); inst(cg,cm,CN,false,K.life); }
    for(const [x,z,w] of [[300,-120,90],[420,-150,70]]){ const g=new T.SphereGeometry(1,24,12,0,Math.PI*2,0,Math.PI/2); g.scale(w/2,w*.32,w*.34); g.translate(x,0,z); ladd(new T.Mesh(g,K.col(0xb7c9d3,{roughness:.1,metalness:.5}))); }
    forest(scatter(180,620,-620,-60,22,()=>0,(x,z)=>!(x>230&&x<500&&z<-240&&z>-540)&&!(x<480&&z>-200),()=>9+rnd()*5,0));
    palms([[-180,0,128,9],[-140,0,128,10],[-60,0,128,9],[40,0,128,10],[110,0,128,9],[160,0,120,10],[-200,0,90,9],[180,0,60,10]]);
    lplane(lmat(0x4a4c50),0,.02,-75,600,16); lplane(lmat(0x4a4c50),180,.02,30,16,260); // 도로
    sky(2600); K.cur=null;
  }});
