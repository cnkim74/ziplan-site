__bsigFill({"watarun":function(K){
// 출처: 중앙 쁘랑 높이 자료마다 66.8~86 m · 모서리 작은 쁘랑 4기 · 도자기 조각·색 파양스·조개 장식(중국 무역선 밸러스트 도자기) · 짜오프라야강 서안 톤부리 · 2단 위 에라완을 탄 인드라 상 4 — en.wikipedia.org/wiki/Wat_Arun
// 추정: 중앙 쁘랑 72 m로 둠 · 기단 3단 36·28·20 m(높이 6·8·8 m) · 작은 쁘랑 약 26 m · 몬돕 위치(네 방위 26 m)·높이 약 16 m · 우보솟 크기 16 × 34 m와 위치(서쪽, 실제 배치 단순화) · 강 폭 약 250 m · 축: +z = 동(강)
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
    // ---- 재질: 도자기 모자이크(흰 바탕 + 꽃무늬 점) · 흰 회반죽 · 기와(주황·초록) · 금빛 장식 ----
    const pcT=tex('arunPorc',256,(g,N,rr)=>{ g.fillStyle='#d9d5cb'; g.fillRect(0,0,N,N); for(let i=0;i<1500;i++){ g.fillStyle=rr()<.5?'rgba(120,115,105,.18)':'rgba(255,255,255,.25)'; g.fillRect(rr()*N,rr()*N,2,2); } const C=['#c2577a','#4f86b8','#5d9a62','#e0b03c','#d9774a','#8a6bb0','#f2f0ea'];
      for(let j=0;j<6;j++) for(let i=0;i<6;i++){ const cx=(i+.5+(j%2)*.5)*N/6, cy=(j+.5)*N/6; const c=C[Math.floor(rr()*C.length)]; for(let k=0;k<6;k++){ const a=k/6*Math.PI*2; g.fillStyle=c; g.beginPath(); g.ellipse(cx+Math.cos(a)*7,cy+Math.sin(a)*7,5,3,a,0,7); g.fill(); } g.fillStyle=C[Math.floor(rr()*4)+2]; g.beginPath(); g.arc(cx,cy,3.5,0,7); g.fill(); }
      g.fillStyle='rgba(90,85,78,.35)'; for(let j=0;j<6;j++) g.fillRect(0,j*N/6,N,2); });
    const PC=tmat(pcT,0xffffff,{roughness:.55}), WH=K.col(0xece8df,{roughness:.7}), WHd=K.col(0xcfc9bd,{roughness:.8}), GD=K.col(0xc9a64a,{roughness:.35,metalness:.6}), TO=K.col(0xc8642c,{roughness:.6}), TG=K.col(0x3f7d4f,{roughness:.6}), RD=K.col(0x8c2f2a,{roughness:.7}), PV=K.col(0xb8b2a5,{roughness:.9}), DK=K.col(0x2e2a26,{roughness:.9});
    // 모서리 꺾인 정사각 단면(반폭 1 기준, 3단 꺾임) — 쁘랑·기단 공용
    const rsq=(h,r)=>{ const P=[]; for(const [sx,sz] of [[1,1],[1,-1],[-1,-1],[-1,1]]){ const C=[[h-3*r,h],[h-3*r,h-r],[h-2*r,h-r],[h-2*r,h-2*r],[h-r,h-2*r],[h-r,h-3*r],[h,h-3*r]]; const pts=(sx*sz>0)?C:C.map(([a,b])=>[b,a]); pts.forEach(([a,b])=>P.push([sx*a,sz*b])); } return P; };
    const SEC=rsq(1,.12); const NP=SEC.length; let PER=0; for(let i=0;i<NP;i++){ const a=SEC[i], b=SEC[(i+1)%NP]; PER+=Math.hypot(b[0]-a[0],b[1]-a[1]); }
    // 쁘랑: 몸체(니치 띠) → 층층이 줄어드는 옥수수 윤곽 → 금속 첨탑(바즈라). s = 축척
    const prang=(x0,y0,z0,s)=>{ const R0=8.6*s, Hb=12*s, Hc=31*s; const prof=v=>{ // v 0~1 → [반지름, 높이]
        if(v<.22){ const q=v/.22; return [R0*(1+.05*Math.sin(q*Math.PI)),y0+q*Hb]; } const q=(v-.22)/.78; const tiers=9, f=(q*tiers)%1; const r=R0*(.13+.87*Math.pow(1-q,.6))*(1+.11*Math.pow(1-f,3)-.03); return [r,y0+Hb+q*Hc]; };
      K.surf((u,v)=>{ const i=Math.min(NP-1,Math.round(u*NP))%NP; const [r,y]=prof(v); const p=SEC[i]; return [x0+p[0]*r,y,z0+p[1]*r,u*PER*r/5,y/5]; },NP,64,PC);
      const top=y0+Hb+Hc; K.c(x0,top-.4*s,z0,1.5*s,1.2*s,WH,12); K.c(x0,top+.8*s,z0,.9*s,3.2*s,GD,8,{r2:.35*s}); K.c(x0,top+4*s,z0,.35*s,4.6*s,GD,6,{r2:.06*s}); for(const a of [0,Math.PI/2]) K.b(x0,top+5.6*s,z0,2.2*s,.18*s,.18*s,GD,a); // 첨탑 + 삼지창 가지
      // 몸체 네 방위 니치(인드라 상 자리) + 박공
      for(const [ax,az] of [[1,0],[0,1],[-1,0],[0,-1]]){ const ry=Math.atan2(ax,az), e=R0*.98; K.b(x0+ax*e,y0+1.5*s,z0+az*e,4.2*s,7*s,.6*s,WH,ry); K.b(x0+ax*(e+.32*s),y0+2.3*s,z0+az*(e+.32*s),2.6*s,4.6*s,.1*s,DK,ry); K.pedim(x0+ax*e,y0+8.5*s,z0+az*e,4.6*s,3*s,.7*s,WH,ry); } return top+8.6*s; };
    // 꺾인 정사각 기단 한 층(질감 UV)
    const tier=(S,y0,h,mat)=>{ const sh=new T.Shape(); rsq(S/2,S*.06).forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); const g0=new T.ExtrudeGeometry(sh,{depth:h,bevelEnabled:false}); g0.rotateX(-Math.PI/2); g0.translate(0,y0,0); return mk(wuv(g0,5,5),mat); };
    K.layer(0);
    // ---- 마당 포장 + 기단 3단(가파른 계단) · 난간 ----
    tier(52,0,.6,PV); const LV=[[38,.6,7],[29,7.6,7.5],[21,15.1,7.5]]; const POST=[],STP=[],RAIL=[];
    LV.forEach(([S,y0,h])=>{ tier(S,y0,h,PC); tier(S+.9,y0+h-.5,.5,WH); const e=S/2-.4; for(const [ax,az] of [[1,0],[0,1],[-1,0],[0,-1]]){ const ry=Math.atan2(ax,az); for(let k=-6;k<=6;k++){ if(Math.abs(k)<1) continue; const t=k*(S*.42)/6; POST.push([ax*e+az*t,y0+h,az*e-ax*t,ry,1,1,1]); } RAIL.push([ax*e,y0+h+.95,az*e,ry,S*.84,1,1]); } });
    // 계단: 네 면 가운데, 각 단마다 매우 가파르게(약 60°)
    LV.forEach(([S,y0,h],i)=>{ const S0=i?LV[i-1][0]:44; const e1=S/2, run=Math.min((S0-S)/2+.2,h*.58), n=Math.round(h/.3); for(const [ax,az] of [[1,0],[0,1],[-1,0],[0,-1]]){ const ry=Math.atan2(ax,az); for(let k=0;k<n;k++){ const t=k/n; const d=e1+run*(1-t)-run/n/2; STP.push([ax*d,y0,az*d,ry,2.6,h*(k+1)/n,run/n+.03]); } } });
    inst(new T.BoxGeometry(1,1,1).translate(0,.5,0),WH,STP); inst(new T.BoxGeometry(.3,1,.3).translate(0,.5,0),WH,POST); inst(new T.BoxGeometry(1,.12,.3),TO,RAIL);
    // ---- 중앙 쁘랑(정점 72 m) ----
    K.layer(1); prang(0,22.6,0,1);
    // 2단 위 에라완(코끼리)·인드라 자리 표시 — 작은 흰 상
    for(const [ax,az] of [[1,0],[0,1],[-1,0],[0,-1]]){ const ry=Math.atan2(ax,az); K.b(ax*12.5+az*6,15.1,az*12.5-ax*6,1.6,2.0,2.4,WH,ry); K.b(ax*12.5+az*6,17.1,az*12.5-ax*6,.8,1.2,.8,GD,ry); }
    // ---- 작은 쁘랑 4(모서리) · 몬돕 4(방위) ----
    K.layer(2);
    for(const sx of [-1,1]) for(const sz of [-1,1]){ const x=sx*26, z=sz*26; K.b(x,0,z,9,.6,9,PV); tier0(x,z); prang(x,4.4,z,.36); }
    function tier0(x,z){ const sh=new T.Shape(); rsq(4,.5).forEach(([a,b],i)=>i?sh.lineTo(x+a,-(z+b)):sh.moveTo(x+a,-(z+b))); const g0=new T.ExtrudeGeometry(sh,{depth:3.8,bevelEnabled:false}); g0.rotateX(-Math.PI/2); g0.translate(0,.6,0); mk(wuv(g0,5,5),PC); }
    for(const [ax,az] of [[1,0],[0,1],[-1,0],[0,-1]]){ const x=ax*30, z=az*30; K.b(x,0,z,9,1.2,9,PV); K.b(x,1.2,z,6.4,5.2,6.4,WH); for(const a of [[1,0],[0,1],[-1,0],[0,-1]]) K.b(x+a[0]*3.25,2,z+a[1]*3.25,a[0]?.1:2,3,a[1]?.1:2,DK); K.b(x,6.4,z,7.4,.5,7.4,TG);
      for(let k=0;k<5;k++){ const w=6.6-k*1.15; K.roofPyr(x,6.9+k*1.5,z,w,w,1.7,k%2?TG:TO); } K.c(x,14.2,z,.45,3,GD,8,{r2:.05}); }
    // ---- 우보솟(서쪽): 흰 벽 + 겹지붕(주황·초록 테) + 쵸파 · 담 ----
    K.layer(3);
    { const x=0, z=-62, w=16, L=34; K.b(x,0,z,w+4,1.2,L+4,PV); K.b(x,1.2,z,w,6.4,L,WH); for(let i=-3;i<=3;i++) for(const s of [-1,1]) K.b(x+s*(w/2+.05),2.2,z+i*4.4,.12,3.4,1.6,DK); for(const s of [-1,1]) K.b(x,2.2,z+s*(L/2+.05),3,4.6,.12,RD);
      const rf=(y,ww,ll,hh,m)=>{ K.roofGable(x,y,z,ww,ll,hh,m); };
      rf(7.4,w+4.6,L+2.4,3.6,TG); rf(7.6,w+4,L+1.6,3.6,TO); rf(9.4,w+1.6,L-2,4.6,TG); rf(9.6,w+1.2,L-2.6,4.6,TO); K.b(x,14.1,z,.35,.4,L-2.4,GD);
      for(const s of [-1,1]){ K.b(x,13.6,z+s*(L/2-1.4),.3,1.6,.3,GD); K.b(x,15,z+s*(L/2-.9),.25,.3,1.2,GD); K.pedim(x,8.2,z+s*(L/2+.85),w,6,.3,K.col(0xb48a3c,{roughness:.5,metalness:.4})); } }
    // 사원 담(흰 회벽 + 주황 기와 갓)
    for(const [x,z,w,d] of [[-21,38,34,1],[21,38,34,1],[-21,-38,34,1],[21,-38,34,1],[38,-21,1,34],[38,21,1,34],[-38,-21,1,34],[-38,21,1,34],[0,-104,90,1],[-45,-71,1,66],[45,-71,1,66]]){ K.b(x,0,z,w,2.6,d,WH); K.b(x,2.6,z,w+.6,.35,d+.6,TO); }
    for(const [ax,az] of [[1,0],[0,1],[-1,0],[0,-1]]){ const ry=Math.atan2(ax,az); for(const s of [-1,1]) K.b(ax*38+az*s*2.6,0,az*38-ax*s*2.6,1.4,4.2,1.4,WH,ry); K.roofGable(ax*38,4.2,az*38,ax?2.4:6.6,ax?6.6:2.4,1.8,TO,ax?undefined:undefined); } // 담 문 4
    // ---- 배경(K.life): 강변 데크·선착장 · 짜오프라야강 · 동안(왕궁 쪽) 낮은 시가 · 나무 ----
    K.cur=K.life;
    lplane(PV,0,.02,-25,110,130); lplane(lmat(0x9aa08a),0,-.05,-300,1400,600); lplane(lmat(0xbdb6a6),0,.05,48,900,14); K.b(0,-1.6,55,900,1.6,1,PV); // 마당 · 서안 땅 · 강변 산책로 · 호안
    lplane(WATER,0,-.9,190,2400,290); { const RV=lmat(0x7b7253,{roughness:.2,metalness:.05}); lplane(RV,0,-.95,190,2400,300); } // 강(흙탕물 아래, 반사 물 위)
    lplane(lmat(0x9d9f90),0,-.05,620,2400,580); K.b(0,-1.6,335,2400,1.6,1,PV);
    { const L=[]; for(let i=0;i<120;i++){ const x=-900+rnd()*1800, z=360+rnd()*500; if(Math.abs(x+80)<120&&z<520) continue; L.push([x,z,14+rnd()*22,14+rnd()*22,6+rnd()*16,['#e2ddd2','#d3cbbd','#c8bfae','#e9e4da'][Math.floor(rnd()*4)],'p']); } for(let i=0;i<10;i++) L.push([-700+rnd()*1400,700+rnd()*200,30,30,80+rnd()*90,'#aebbc6','g']); city(L); }
    { const GM=K.col(0xd6b45a,{roughness:.35,metalness:.5}); for(const [x,z,h] of [[-80,420,38],[-120,450,30],[-40,470,34],[-160,400,26]]){ K.c(x,0,z,5,h*.35,WH,12); K.dome(x,h*.35,z,4.6,h*.3,GM); K.c(x,h*.62,z,1.2,h*.38,GM,8,{r2:.05}); } for(const [x,z] of [[-60,380],[-100,385]]){ K.b(x,0,z,22,7,40,WH); K.roofGable(x,7,z,24,40,7,TO); } } // 건너편 왕궁·사원 지붕들(개략)
    for(const [x,z,r] of [[-60,140,.2],[30,200,-.1],[120,170,.4],[-200,230,0]]){ K.b(x,-.9,z,3,1.1,16,K.col(0x6a4a30,{roughness:.8}),r); K.b(x,.2,z,2.6,1.2,6,K.col(0xa13c2e,{roughness:.7}),r); } // 배
    palms([[-50,0,34,11],[-38,0,36,10],[42,0,34,11],[52,0,30,9],[-52,0,-10,10],[52,0,-40,11],[-48,0,-80,9],[46,0,-84,10]]);
    { const L=[]; for(let i=0;i<150;i++){ const x=-600+rnd()*1200, z=-650+rnd()*680; if(Math.abs(x)<60&&z>-112) continue; if(Math.abs(x)<75&&z>-125&&z<45) continue; L.push([x,z,9+rnd()*14,9+rnd()*14,4+rnd()*9,['#e6e0d4','#d8cfbf','#c9bda8','#b8a68f'][Math.floor(rnd()*4)],'p']); } city(L); }
    forest(scatter(-600,600,-650,30,30,()=>0,(x,z)=>!(Math.abs(x)<75&&z>-125)&&rnd()<.5,()=>8+rnd()*6,0)); palms(scatter(-300,300,-300,40,34,()=>0,(x,z)=>!(Math.abs(x)<75&&z>-125)&&rnd()<.5,()=>0,0).map(it=>[it[0],0,it[2],9+rnd()*6]));
    sky(2400); K.cur=null;
  }});
