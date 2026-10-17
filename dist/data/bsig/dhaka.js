__bsigFill({"dhaka":function(K){
// 출처: 아홉 매스(중앙 8각 의회당 + 둘레 여덟 동)·인공 호수가 본관 세 면을 감쌈·1962 착공, 1971 중단, 1982 준공·약 200에이커 — archeyes.com(bangladeshs-national-parliament-house-by-louis-kahn) · 높이 155 ft·8층 — koryogroup.com 여행 안내
// 추정: 의회당 8각 외접 반지름 22 m · 둘레 매스 높이 31~36 m · 매스 배치·크기 · 대리석 띠 간격(가로 약 1.5 m, 세로 약 4.6 m) · 호수 폭 · 축: +z = 남(호수), −z = 북(대통령 광장)
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
    // ---- 재질: 노출 콘크리트 + 흰 대리석 띠(질감) · 그늘 속 안벽 · 벽돌 ----
    const cT=tex('dhakaConc',256,(g,N,rr)=>{ g.fillStyle='#8f8a81'; g.fillRect(0,0,N,N); for(let i=0;i<3000;i++){ g.fillStyle=rr()<.5?'rgba(255,255,255,.05)':'rgba(50,46,38,.08)'; g.fillRect(rr()*N,rr()*N,2+rr()*3,2); } for(let k=0;k<2;k++){ g.fillStyle='rgba(60,56,48,.05)'; g.fillRect(rr()*N,N*.3,20+rr()*30,N*.7); } g.fillStyle='#e9e6dd'; for(let j=0;j<4;j++) g.fillRect(0,j*N/4,N,2); g.fillStyle='rgba(233,230,221,.8)'; g.fillRect(0,0,2,N); });
    const CO=tmat(cT,0xffffff,{roughness:.88}), COd=tmat(cT,0x8d877d,{roughness:.9}), IN=K.col(0x4a4640,{roughness:.95}), GLS=K.col(0x3a4652,{roughness:.15,metalness:.6}), BR=K.col(0xa45a3e,{roughness:.9}), BRd=K.col(0x8c4a33,{roughness:.9}), WHM=K.col(0xe6e2d8,{roughness:.6});
    // 구멍 뚫린 벽: w × h, 두께 t, 구멍 [{c:[x,y,r]} | {tri:[x,y,s,dir]} | {r:[x,y,w,h]} | {arch:[x,y,w,h]}] (로컬: 가운데 x=0, 바닥 y=0)
    const holePath=o=>{ const p=new T.Path(); if(o.c){ const [x,y,r]=o.c; p.absarc(x,y,r,0,Math.PI*2,true); } else if(o.tri){ const [x,y,s,d]=o.tri; if(d>0){ p.moveTo(x-s/2,y); p.lineTo(x,y+s*.87); p.lineTo(x+s/2,y); } else { p.moveTo(x-s/2,y+s*.87); p.lineTo(x+s/2,y+s*.87); p.lineTo(x,y); } p.closePath(); } else if(o.r){ const [x,y,w,h]=o.r; p.moveTo(x-w/2,y); p.lineTo(x+w/2,y); p.lineTo(x+w/2,y+h); p.lineTo(x-w/2,y+h); p.closePath(); } else if(o.arch){ const [x,y,w,h]=o.arch; p.moveTo(x-w/2,y); p.lineTo(x+w/2,y); p.lineTo(x+w/2,y+h-w/2); p.absarc(x,y+h-w/2,w/2,0,Math.PI,false); p.lineTo(x-w/2,y); } return p; };
    const wall=(cx,cz,ry,w,h,t,holes,mat,y0)=>{ const sh=new T.Shape(); sh.moveTo(-w/2,0); sh.lineTo(w/2,0); sh.lineTo(w/2,h); sh.lineTo(-w/2,h); sh.closePath(); (holes||[]).forEach(o=>sh.holes.push(holePath(o))); const g=new T.ExtrudeGeometry(sh,{depth:t,bevelEnabled:false,curveSegments:20}); g.translate(0,y0||0,-t/2); g.rotateY(ry); g.translate(cx,0,cz); return mk(wuv(g,6,6),mat||CO); };
    // 매스: 중심(cx,cz), 바깥 방향 ry(로컬 +z가 바깥), 폭 W(로컬 x) · 깊이 D · 높이 H · 바깥 벽 구멍 F · 옆벽 구멍 S · 안쪽 벽(빛 우물 뒤) 구멍 B
    const mass=(cx,cz,ry,W,D,H,F,S,B)=>{ const c=Math.cos(ry), s=Math.sin(ry); const P=(lx,lz)=>[cx+lx*c+lz*s,cz-lx*s+lz*c];
      let p=P(0,D/2-.6); wall(p[0],p[1],ry,W,H,1.2,F); p=P(0,-D/2+.6); wall(p[0],p[1],ry,W,H,1.2,[]);
      for(const sx of [-1,1]){ p=P(sx*(W/2-.6),0); wall(p[0],p[1],ry+Math.PI/2,D-2.4,H,1.2,S); }
      p=P(0,D/2-5.5); wall(p[0],p[1],ry,W-2.4,H-2,.9,B,COd); // 빛 우물 뒤 두 번째 벽
      const q=P(0,-2.5); K.b(q[0],0,q[1],W-2.6,H-2.2,D-8.4,IN,ry); K.b(cx,H-.6,cz,W,.6,D,CO,ry); // 그늘진 안쪽 몸체 · 지붕판
      p=P(0,D/2-3); K.b(p[0],0,p[1],W-2.4,.4,3.6,COd,ry); };
    K.layer(0);
    // ---- 기단(호수 위 플랫폼) ----
    K.b(0,0,0,128,.8,128,CO); K.b(0,0,0,131,.3,131,COd);
    // ---- 둘레 매스 8동 ----
    const Y=.8;
    K.layer(0); K.cur=K.layer(0);
    const M8=[
      [0,-44,Math.PI,34,18,32,[{tri:[0,6,18,1]},{c:[0,24,4.5]}],[{r:[0,4,5,14]}],[{c:[0,13,7]}]], // 북: 진입
      [44,2,Math.PI/2,32,20,33,[{c:[-7.5,17,6]},{c:[7.5,17,6]},{r:[0,2,6,8]}],[{arch:[0,4,6,16]}],[{tri:[0,4,14,1]}]], // 동: 장관동
      [-44,2,-Math.PI/2,32,20,33,[{c:[-7.5,17,6]},{c:[7.5,17,6]},{r:[0,2,6,8]}],[{arch:[0,4,6,16]}],[{tri:[0,4,14,1]}]], // 서: 위원회
      [35,35,Math.PI/4,22,18,36,[{c:[0,19,8.5]},{r:[0,2,8,6]}],[{tri:[0,6,10,1]}],[{arch:[0,4,7,20]}]], // 남동
      [-35,35,-Math.PI/4,22,18,36,[{c:[0,19,8.5]},{r:[0,2,8,6]}],[{tri:[0,6,10,1]}],[{arch:[0,4,7,20]}]], // 남서
      [35,-35,Math.PI*3/4,22,18,36,[{tri:[0,4,16,1]},{r:[0,24,10,5]}],[{c:[0,18,4]}],[{c:[0,14,6]}]], // 북동
      [-35,-35,-Math.PI*3/4,22,18,36,[{tri:[0,4,16,1]},{r:[0,24,10,5]}],[{c:[0,18,4]}],[{c:[0,14,6]}]] ]; // 북서
    M8.forEach(([x,z,ry,W,D,H,F,S,B])=>{ const g=K.cur; mass(x,z,ry,W,D,H,F,S,B); });
    // 남: 기도실 — 사각 몸체 + 네 모서리 원통 탑(빛 탑) + 호수 쪽 반원 아치 개구부
    { const cz=46; wall(0,cz+13.4,0,26,30,1.2,[{arch:[0,3,9,20]},{c:[-8,22,2.6]},{c:[8,22,2.6]}]); wall(0,cz-13.4,0,26,30,1.2,[]); for(const s of [-1,1]) wall(s*13.4,cz,Math.PI/2,26,30,1.2,[{arch:[0,3,8,18]}]); K.b(0,0,cz,22,28,22,IN); K.b(0,29.4,cz,28,.6,28,CO); wall(0,cz+9,0,22,28,.9,[{c:[0,13,5.5]}],COd);
      for(const sx of [-1,1]) for(const sz of [-1,1]){ const g=new T.CylinderGeometry(4.6,4.6,34,28,1,true); g.translate(sx*13,17+Y,cz+sz*13); mk(wuv(g,6,6),CO); K.c(sx*13,Y,cz+sz*13,4.2,33.4,IN,20); K.c(sx*13,Y+33.4,cz+sz*13,4.7,.6,CO,28); } }
    // ---- 중앙 8각 의회당(높이 47 m): 8면 벽 + 위쪽 빛 슬롯 + 지붕 테 ----
    K.layer(1); K.cur=K.layer(1);
    { const R=22, a8=Math.PI/8; const fw=2*R*Math.sin(a8); for(let i=0;i<8;i++){ const a=i*Math.PI/4+a8; const rr=R*Math.cos(a8); const x=Math.sin(a)*rr, z=Math.cos(a)*rr; wall(x,z,a,fw+.5,47,1.4,i%2?[{r:[0,36,3,8]},{c:[0,28,2.4]}]:[{r:[-4,34,2,10]},{r:[4,34,2,10]}]); }
      K.c(0,Y,0,20,45,IN,8); const ring=new T.CylinderGeometry(R+.6,R+.6,1.2,8); ring.rotateY(a8); ring.translate(0,47+Y,0); mk(ring,CO); K.c(0,47.6,0,15,1.6,CO,8); K.c(0,49.2,0,5,1.2,COd,16); }
    // 대리석 띠 강조(코니스) — 매스마다 꼭대기 흰 테두리
    // ---- 배경(K.life): 인공 호수(남·동·서) · 북쪽 대통령 광장(벽돌) · 벽돌 숙소동(아치) · 나무 · 도시 ----
    K.cur=K.life;
    const LAWN=lmat(0x77904f);
    lplane(LAWN,0,-.05,0,3000,3000);
    lpoly(WATER,[[-190,-40],[-66,-40],[-66,66],[66,66],[66,-40],[190,-40],[190,230],[-190,230]],.06);
    K.b(0,0,0,134,.35,134,COd); // 호안 테
    { const BK=tex('dhakaBrick',256,(g,N,rr)=>{ g.fillStyle='#7d5a4a'; g.fillRect(0,0,N,N); for(let j=0;j<32;j++) for(let i=0;i<16;i++){ const t=.85+rr()*.3; g.fillStyle=`rgb(${Math.round(150*t)},${Math.round(98*t)},${Math.round(78*t)})`; g.fillRect(i*16+(j%2)*8+1,j*8+1,14,6); } }); const BKt=BK.clone(); BKt.needsUpdate=true; BKt.repeat.set(170/5,120/5); const BKm=lmat(0xffffff,{map:BKt}); lplane(BKm,0,.05,-110,170,120); for(let i=0;i<4;i++) K.b(0,0,-50-i*1.2,90-i*4,.8-i*.18,1.2,CO); }
    // 벽돌 숙소동(호수 건너): 아치 벽 판 + 벽돌 매스
    { const BRm=K.col(0xa45a3e,{roughness:.9}); for(const [x,z,L] of [[-150,150,90],[150,150,90],[-215,40,80],[215,40,80],[0,255,140]]){ const ry=Math.atan2(-x,-z); K.b(x,0,z,L,14,16,BRm,ry); const c=Math.cos(ry), s=Math.sin(ry); for(let k=0;k<7;k++){ const lx=-L/2+L*(k+.5)/7; wall(x+lx*c+8.4*s,z-lx*s+8.4*c,ry,L/7,13,.8,[{arch:[0,1.5,L/7*.55,9]}],BRm); } } }
    forest(scatter(-500,500,-500,500,22,()=>0,(x,z)=>{ const inL=x>-195&&x<195&&z>-45&&z<235; const pl=Math.abs(x)<90&&z<-40&&z>-175; return !inL&&!pl&&Math.hypot(x,z)>120; },()=>10+rnd()*6,0));
    palms([[-80,0,-60,10],[80,0,-60,11],[-80,0,-150,10],[80,0,-150,9]]);
    { const L=[]; for(let i=0;i<120;i++){ const a=rnd()*Math.PI*2, r=600+rnd()*700; L.push([Math.cos(a)*r,Math.sin(a)*r,30+rnd()*30,30+rnd()*30,15+rnd()*45,['#d8d2c4','#c9c1b0','#e2ddd0'][Math.floor(rnd()*3)],'p']); } city(L); }
    sky(2400); K.cur=null;
  }});
