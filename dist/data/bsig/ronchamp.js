__bsigFill({"ronchamp":function(K){
// 개략: 내부 약 25×13 m · 남벽(+z) 두께 하부 3.7→상부 1.4 m(바깥면이 안으로 기움), 벽 높이 서쪽 ~6 → 동남 모서리(뱃머리) ~10.5 m · 지붕 두께 서 0.9→동남 2.5 m(짙은 회색, 동남으로 치솟음) · 큰 탑 22 m(서남, 반원 후드) · 작은 탑 15 m 2개(북벽, 등을 맞댐) · 동쪽(+x) 야외 제단 · +z=남(정면), +x=동
    const Wh=K.col(0xf4f2ea,{roughness:.95}), Rf=K.col(0x6e6b63,{roughness:.95}), Rd=K.col(0x4e4b45,{roughness:.9}), DKw=K.col(0x3a3732,{roughness:.9}), ST=K.M.stone, WD=K.M.wood, RED=K.col(0xb5452c,{roughness:.6}), CG=[K.col(0xe8c35a),K.col(0x5b8fd6),K.col(0xd2563b),K.col(0x6fae6a)];
    // 평면 제어점 [x, z, 벽두께, 지붕 내밈, 벽 높이] — 시계방향(남서→남→남동 뱃머리→동→북동→북→북서→서)
    const P=[[-10.8,4.6,3.0,1.2,6.4],[-5.5,6.4,3.4,1.4,7.0],[0,7.3,3.5,1.6,7.8],[6,6.8,3.2,1.9,8.8],[11,5.2,2.4,2.6,10.0],[13.6,3.6,1.4,3.6,10.6],[12.2,.2,1.1,4.0,10.2],[11.4,-3.2,1.1,3.6,9.4],[12.4,-6.4,1.0,2.2,8.4],[11.6,-7.6,.9,.9,7.8],[6,-7.5,.9,.6,7.2],[0,-7.2,.9,.6,6.8],[-6,-6.8,.9,.6,6.4],[-10.2,-6.0,1.0,.6,6.1],[-12.6,-3.4,1.1,.5,5.9],[-13.4,.2,1.3,.5,6.0],[-12.6,2.8,2.0,.8,6.2]];
    const N=P.length, cr=(a,b,c,d,t)=>.5*(2*b+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t);
    const O0=u=>{ const s=(((u%1)+1)%1)*N, i=Math.floor(s), t=s-i, g=k=>P[((k%N)+N)%N], a=g(i-1),b=g(i),c=g(i+1),d=g(i+2); return [0,1,2,3,4].map(k=>cr(a[k],b[k],c[k],d[k],t)); };
    const O=u=>{ const p=O0(u), q=O0(u+.002), r=O0(u-.002); const tx=q[0]-r[0], tz=q[1]-r[1], L=Math.hypot(tx,tz)||1; return {x:p[0],z:p[1],t:p[2],off:p[3],h:p[4],nx:-tz/L,nz:tx/L}; };
    const cl=v=>Math.max(0,Math.min(1,v));
    // 지붕 밑면 높이: 서쪽 6.2 → 동남 뱃머리 11, 가운데 살짝 처짐 / 두께 서 .9 → 동남 2.6
    const under=(x,z)=>{ const ux=cl((x+14)/28), vz=cl((z+8)/16); return 6.0+4.4*Math.pow(ux,2.2)+1.6*ux*ux*vz+.4*vz-.5*Math.sin(Math.PI*ux)*(1-.6*vz); };
    const thk=(x,z)=>{ const ux=cl((x+14)/28), vz=cl((z+8)/16); return .9+1.4*Math.pow(ux,1.5)+.4*ux*vz; };
    const NU=120, outOff=(o,v)=>o.t>1.6?o.t/2-v*(o.t-1.3)/2:o.t/2;
    K.layer(0);
    K.surf((u,v)=>{ const o=O(u); return [v*o.x,.05,v*o.z]; },NU,1,DKw); // 바닥
    K.surf((u,v)=>{ const o=O(u), f=outOff(o,v); return [o.x+o.nx*f,v*o.h,o.z+o.nz*f]; },NU,5,Wh); // 바깥 벽면(남벽은 안으로 기움)
    K.surf((u,v)=>{ const o=O(u); return [o.x-o.nx*o.t/2,(1-v)*o.h,o.z-o.nz*o.t/2]; },NU,1,Wh); // 안쪽 벽면
    K.surf((u,v)=>{ const o=O(u), f=outOff(o,1), k=f*(1-v)-o.t/2*v; return [o.x+o.nx*k,o.h,o.z+o.nz*k]; },NU,1,Wh); // 벽 윗면
    // 남벽 창(제각각, 깊이 들어간 어두운 구멍 + 색유리 몇 장) · 남쪽 법랑 문 · 동벽 성모상 창 · 북쪽 문
    const win=(u,y,w,hh,mat,deep)=>{ const o=O(u), f=outOff(o,(y+hh/2)/o.h), k=f-(deep||.5); K.b(o.x+o.nx*k,y,o.z+o.nz*k,w,hh,1.0,mat||DKw,Math.atan2(o.nx,o.nz)); };
    const SW=[[.07,1.3,.6,.6],[.11,3.3,.5,2.3],[.15,.9,1.5,1.0],[.19,5.2,.5,.5],[.23,2.4,.5,.5],[.26,1.0,.9,.6],[.30,5.3,1.1,.8],[.33,3.2,.5,.5],[.37,1.8,1.0,.9],[.41,4.5,.5,2.2],[.45,.9,.5,.5],[.49,2.8,2.0,1.7],[.55,6.3,.6,.6],[.59,1.2,1.0,1.0],[.63,4.3,.5,.5],[.67,2.5,.6,.9],[.71,5.8,.9,.6],[.75,.9,1.4,1.5],[.79,3.6,.5,.5],[.83,7.0,.6,.6],[.87,2.0,1.7,2.1],[.91,5.3,.5,1.0],[.95,.9,.6,.6],[.1,5.6,.5,.5],[.44,6.6,.5,.5],[.53,.9,.6,.6],[.69,3.8,.5,.5]];
    SW.forEach(([s,yy,w,hh],i)=>{ win(s*4.6/N,yy,w,hh,DKw); if(i%3===0) win(s*4.6/N,yy+.1,w*.6,hh*.6,CG[i%4],.2); });
    win(.025*4.6/N,0,2.3,2.7,RED,.3); // 남쪽 법랑 문(채색)
    win((5+1.4)/N,3.6,.6,.7,DKw); win((5+2.3)/N,5.2,1.1,1.4,Wh,.1); win((5+2.3)/N,5.3,.9,1.1,DKw,.0); win((5+3.2)/N,1.7,.5,.5,DKw); // 동벽: 성모상 창
    win((10+2.0)/N,0,1.3,2.3,WD,.2); // 북쪽 작은 문
    // 탑 3개: 흰 원통(위가 기울어 열림) + 반구 후드(뒤 절반) + 어두운 개구
    const tower=(cx,cz,r,H,dir)=>{ const drop=r*1.1;
      K.surf((u,v)=>{ const a=u*Math.PI*2, yt=H-drop*Math.max(0,Math.cos(a-dir)); return [cx+r*Math.cos(a),v*yt,cz+r*Math.sin(a)]; },56,4,Wh);
      K.c(cx,H-drop-.5,cz,r-.1,drop+.5,DKw,32); // 개구 안쪽 어두운 통
      K.surf((u,v)=>{ const a=dir+Math.PI/2+u*Math.PI, e=v*Math.PI/2; return [cx+r*Math.cos(e)*Math.cos(a),H+r*.9*Math.sin(e),cz+r*Math.cos(e)*Math.sin(a)]; },30,8,Wh); // 후드
      K.surf((u,v)=>{ const a=dir+Math.PI/2+u*Math.PI; const rr=r*(1-v); return [cx+rr*Math.cos(a),H+.02,cz+rr*Math.sin(a)]; },30,2,Wh); }; // 후드 밑 막음
    tower(-13.0,1.8,3.5,20,-Math.PI/2); // 큰 탑(서남, 개구는 북쪽)
    tower(-5.6,-7.6,1.8,13.5,Math.PI); tower(-2.0,-7.6,1.8,13.5,0); // 작은 탑 2개(북벽, 등을 맞댐 — 서향·동향)
    // 동쪽 야외 예배 공간(지붕 아래): 단·제단·설교단·십자가·성가대석
    K.b(17.5,0,-1,10,.2,13,ST); K.b(17,.2,-1,8,.14,10,ST);
    K.b(16.2,.34,-.8,2.3,1.0,1.0,ST); // 야외 제단
    K.b(14,2.4,-5.4,1.8,1.1,1.8,Rf); K.b(14.6,.34,-5.4,.5,2.1,.5,Rf); for(let i=0;i<5;i++) K.b(15.4+i*.35,.34+i*.4,-7.0,.5,.4,1.0,Rf); // 설교단+계단
    K.b(22,0,-8.6,.22,7,.22,WD); K.b(22,4.9,-8.6,2.2,.22,.22,WD); // 십자가
    K.b(16,.34,4.2,3,.45,.5,Rf); K.b(19.5,.34,3.4,3,.45,.5,Rf);
    // 서쪽: 가고일(물받이 주둥이)과 조각 수조
    K.b(-15.0,5.2,-2.2,3.4,.55,.7,Rf); K.c(-18.2,0,-2.2,1.9,1.1,Rf,6); K.c(-18.2,1.1,-2.2,1.6,.08,K.M.water,6); K.c(-18.2,1.1,-2.2,.5,1.6,Rf,4); K.pyr(-16.9,1.1,-1.2,1.0,1.3,Rf);
    // 북동쪽 평화의 피라미드 · 종 걸이 틀
    for(let i=0;i<5;i++) K.b(27,i*.7,-15,7-i*1.3,.7,7-i*1.3,ST);
    for(const x of [-24,-22.4,-20.8]) K.b(x,0,10,.18,5.2,.18,K.M.dark); K.b(-22.4,5.2,10,3.6,.18,.18,K.M.dark); for(const x of [-23.2,-21.6]) K.c(x,4.2,10,.35,.7,K.M.alu,12,{r2:.22});
    // 지붕: 짙은 회색 두꺼운 셸 — 윗면·밑면·테두리 띠, 동남 뱃머리로 치솟음
    K.layer(1);
    const RO=u=>{ const o=O(u); return [o.x+o.nx*o.off,o.z+o.nz*o.off]; };
    K.surf((u,v)=>{ const [px,pz]=RO(u), x=px*v, z=-.3+(pz+.3)*v; return [x,under(x,z)+thk(x,z),z]; },NU,8,Rf);
    K.surf((u,v)=>{ const [px,pz]=RO(u), x=px*v, z=-.3+(pz+.3)*v; return [x,under(x,z),z]; },NU,6,Rd);
    K.surf((u,v)=>{ const [px,pz]=RO(u), y=under(px,pz); return [px,y+v*thk(px,pz),pz]; },NU,1,Rf);
    K.b(-14.6,under(-14.6,-2.2)+thk(-14.6,-2.2)-.2,-2.2,1.4,.4,1.8,Rf); // 지붕 물 빠지는 홈 마감
  
    // ---------- v16 주변 환경(K.life): 부를레몽 언덕(해발 약 470 m) — 꼭대기 풀밭 + 숲 비탈 + 순례자 숙소·사제관 + 피아노의 수도원 + 보주 산자락 ----------
    {     const T=K.T; const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const inst=(geo,mat,items,cast,grp,fit)=>{ if(!items.length) return null; if(fit) geo=geo.clone(); const m=new T.InstancedMesh(geo,mat,items.length); m.frustumCulled=false; const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),Eu=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); Eu.set(it[7]||0,it[3]||0,it[8]||0); Q.setFromEuler(Eu); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; if(fit){ if(!geo.boundingBox) geo.computeBoundingBox(); const gb=geo.boundingBox.clone(), bb=new T.Box3(); for(let i=0;i<items.length;i++){ m.getMatrixAt(i,M4); bb.union(gb.clone().applyMatrix4(M4)); } geo.boundingBox=bb; geo.boundingSphere=bb.getBoundingSphere(new T.Sphere()); } if(grp){ m.castShadow=!!cast; m.receiveShadow=true; grp.add(m); return m; } return put(m,cast); };
    const bx=(x,y,z,w,h,d,ry)=>{ const g=new T.BoxGeometry(w,h,d); if(ry) g.rotateY(ry); g.translate(x,y+h/2,z); return g; };
    const merge=(geos,mat,cast,grp)=>{ if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); const m=new T.Mesh(g,mat); if(grp){ m.castShadow=!!cast; m.receiveShadow=true; grp.add(m); return m; } return put(m,cast); };
    const cylG=(r,h,seg,r2)=>{ const g=new T.CylinderGeometry(r2===undefined?r*.9:r2,r,h,seg||10); g.translate(0,h/2,0); return g; };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    const tbox=(x,y,z,w,h,d,mat,tm,ry)=>{ const g=new T.BoxGeometry(w,h,d); const uv=g.attributes.uv; const dims=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]]; for(let f=0;f<6;f++) for(let i=0;i<4;i++){ const k=f*4+i; uv.setXY(k,uv.getX(k)*dims[f][0]/tm+(x*.13%1),uv.getY(k)*dims[f][1]/tm); } const m=new T.Mesh(g,mat); m.position.set(x,y+h/2,z); if(ry) m.rotation.y=ry; return put(m); };
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
    const W=(()=>{ const TT=K.T;
      // 하늘 돔(초고층·넓은 맥락용): 뷰어 하늘 구(600)보다 카메라가 멀어질 때 검게 비는 것을 막음 — 밤이면 밤색
      const sky=(R)=>{ const g=new TT.SphereGeometry(R,32,16); const p=g.attributes.position; const mk=night=>{ const col=[]; const top=new TT.Color(night?0x0b1226:0x9fc0de).convertSRGBToLinear(), hor=new TT.Color(night?0x2a3350:0xeee9df).convertSRGBToLinear(), c=new TT.Color(); for(let i=0;i<p.count;i++){ const t=Math.max(0,Math.min(1,p.getY(i)/(R*.63))); c.copy(hor).lerp(top,Math.pow(t,.65)); col.push(c.r,c.g,c.b); } return new TT.Float32BufferAttribute(col,3); }; const cD=mk(false), cN=mk(true); g.setAttribute('color',cD); const m=new TT.Mesh(g,new TT.MeshBasicMaterial({vertexColors:true,side:TT.BackSide,fog:false,depthWrite:false})); m.renderOrder=-1; m.frustumCulled=false; let cur=0; m.onBeforeRender=(r,sc)=>{ const n=sc.fog&&sc.fog.color&&sc.fog.color.r<.3?1:0; if(n!==cur){ cur=n; g.setAttribute('color',n?cN:cD); } }; K.life.add(m); return m; };
      // life 평면(bbox 밖): 재질 m, 중심 x,z, 크기 w,d, 높이 y, 회전 ry
      const lplane=(m,x,y,z,w,d,ry)=>{ const g=new TT.PlaneGeometry(w,d); g.rotateX(-Math.PI/2); if(ry) g.rotateY(ry); g.translate(x,y,z); if(m.userData&&m.userData.tm){ const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); } const me=new TT.Mesh(g,m); me.receiveShadow=m!==WATER; K.life.add(me); return me; };
      // 다각형 바닥(life): pts [[x,z],…]
      const lpoly=(m,pts,y)=>{ pts=pts.slice(); { let a=0; for(let i=0;i<pts.length;i++){ const p=pts[i], q=pts[(i+1)%pts.length]; a+=p[0]*q[1]-q[0]*p[1]; } if(a>0) pts.reverse(); } const sh=new TT.Shape(); pts.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z)); const g=new TT.ShapeGeometry(sh); g.rotateX(-Math.PI/2); g.translate(0,y,0); if(m.userData&&m.userData.tm){ const p=g.attributes.position, uv=g.attributes.uv, tm=m.userData.tm; for(let i=0;i<p.count;i++) uv.setXY(i,p.getX(i)/tm,-p.getZ(i)/tm); } m.side=TT.DoubleSide; const me=new TT.Mesh(g,m); me.receiveShadow=true; K.life.add(me); return me; };
      const solid=(hex,o)=>{ const m=new TT.MeshStandardMaterial(Object.assign({color:hex,roughness:.95},o||{})); m.color.convertSRGBToLinear(); m.userData.nocast=1; return m; };
      const WATER=E.WATER;
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
    // 시선 확보: 눈높이(az≈.75)·정면(az=π/2) 카메라와 모형 사이 띠 안이면 true — 나무·소품을 비움
    const VC=(()=>{ const bb=new T.Box3().setFromObject(K.bldg), sz=bb.getSize(new T.Vector3()), c=bb.getCenter(new T.Vector3()); return {c,sz,r:Math.max(sz.x,sz.z,sz.y*1.5)}; })();
    const vcam=(x,z,m)=>{ for(const [a,D] of [[.75,VC.r*.95+10],[Math.PI/2,VC.r*1.3+12]]){ const ca=Math.cos(a), sa=Math.sin(a), dx=x-VC.c.x, dz=z-VC.c.z; const t=dx*ca+dz*sa; if(t<0||t>D+25) continue; if(Math.abs(-dx*sa+dz*ca)<Math.max(VC.sz.x,VC.sz.z)*.22+5+(m||0)+t*.18) return true; } return false; };


    E.own(); const sol=W.solid;
    // 방위: +z 남(정면), +x 동. 언덕 꼭대기(지름 ~90 m)는 거의 평평한 풀밭, 사방으로 숲이 덮인 비탈이 골짜기(약 −110 m)로 내려감 · 북동쪽 멀리 보주 산맥(압축)
    const top=(x,z)=>Math.hypot(x*.9,z+4);
    const hf=(x,z)=>{ const r=top(x,z); let h=-.06; if(r>38) h-=Math.pow((r-38)/520,1.15)*125*E.ss((r-38)/80); h=Math.max(h,-125); h+=(E.fbm(x*.006,z*.006,3)-.5)*30*E.ss((r-200)/300);
      h+=E.peaks(x,z,[[1400,-2300,1500,900,520,1.2],[-600,-2600,1100,700,400,1.25],[2300,-900,900,800,330,1.3],[-2400,600,900,1100,220,1.3]]); return h; };
    const TR=E.terrain(0,0,0,0,E.axis(3600,130,3.6),E.axis(3600,130,3.6),hf,(x,z,h,ny)=>{ const r=top(x,z); const n=E.fbm(x*.05,z*.05,2);
      if(r<46||(Math.abs(x+30)<5&&z>0&&z<160)) { if((Math.abs(x-3)<2.2&&z>7&&z<30)||(Math.hypot(x-16,z+1)<10)||(Math.abs(x+30-(z>40?0:0))<1.8&&z>-2&&z<160)) return [.72,.67,.56]; return [.48+.05*n,.58+.05*n,.33+.04*n]; }
      if(h<-100) return [.5+.05*n,.58+.05*n,.38]; return E.mcol(x,z,h,ny,{low:-200,rock:.2,rockH:300}); });
    // 순례 길(마사토): 서쪽 진입로 → 남쪽 정문 앞 → 동쪽 야외 제단 앞 풀밭 · 북서쪽 숙소로 가는 길
    const GV=sol(0xcdbf9f); W.lplane(GV,-30,-.035,80,3.6,150); W.lpoly(GV,[[-31.8,6],[-28.2,4],[2,9.5],[6,12],[5,16],[0,13]],-.034); W.lpoly(GV,[[6,12],[9,8],[22,6],[26,9],[20,12]],-.034); W.lpoly(GV,[[-31.8,6],[-28,2],[-44,-30],[-48,-28]],-.034);
    // 숲: 꼭대기 풀밭 둘레부터 비탈 전체(참나무·너도밤나무 활엽 + 가문비 섞임) — 남쪽 정면 잔디와 눈높이 시선은 비움
    const cam=(x,z)=>{ const t=x*.73+z*.68, p=Math.abs(-x*.68+z*.73); return t>0&&p<30+t*.3&&t<160; };
    E.forest(E.scatter(-420,420,-420,420,11,TR.h,(x,z,h)=>{ const r=top(x,z); if(r<52) return false; if(cam(x,z)||vcam(x,z,8)) return false; if(z>30&&Math.abs(x)<60&&r<95) return false; if(h<-108) return E.r()<.2; return r<900?E.r()<.88:E.r()<.55; },(x,z,h)=>11+E.vn(x*.02,z*.02)*8,(x,z,h)=>E.vn(x*.01+3,z*.01)>.62?2:0),{trunks:false});
    E.forest(E.scatter(-1700,1700,-1700,1700,26,TR.h,(x,z,h)=>!(Math.abs(x)<422&&Math.abs(z)<422)&&(h<-108?E.r()<.15:E.r()<.6),(x,z,h)=>18+E.vn(x*.02,z*.02)*8,(x,z,h)=>E.vn(x*.01+3,z*.01)>.62?2:0),{trunks:false});
    E.forest([[-40,0,22],[-46,0,-20],[34,0,26],[44,0,-30],[-12,0,-40],[12,0,-44],[-30,0,-44]].filter(([x,y,z])=>!vcam(x,z,6)).map(([x,y,z],i)=>[x,TR.h(x,z),z,8+i%3*1.5,0,i*.15,.9]),{trunks:true,cast:true});
    // 순례자 숙소(Abri du pèlerin)·사제관(Maison du chapelain) — 르코르뷔지에, 북서쪽 낮은 긴 집(콘크리트 + 거친 회벽, 추정 크기·위치)
    W.city([[-48,-36,32,7,3.2,'#d9d4c8',0,'n','#7a7a72',.4,.3,TR.h(-48,-36)],[-62,-14,15,7,3.4,'#d9d4c8',0,'n','#7a7a72',.4,.3,TR.h(-62,-14)]]);
    // 렌초 피아노 수도원·문간채(2011) — 남서쪽 비탈에 반쯤 묻힌 낮은 단(콘크리트·유리·구리 지붕, 추정)
    { const L=[]; for(let i=0;i<3;i++){ const x=-120-i*14, z=40+i*8, y=TR.h(x,z); L.push([x,z,46,9,3.4,'#b7b2a8',-.5,'g','#8f8a6c',.3,.2,y]); } const x=-210,z=150; L.push([x,z,24,12,4,'#c3beb3',-.4,'g','#7f8b6a',.3,.2,TR.h(x,z)]); W.city(L); }
    // 언덕 아래 롱샹 마을(남서쪽 골짜기, 압축) · 붉은 기와 집들
    W.ring({cx:-300,cz:900,r0:0,r1:420,step:30,fill:.5,h:()=>6+E.r()*4,pal:['#ece2cf','#e3d5bb','#d9cbb2'],roof:['#a8573a',2.2,3],kind:'p',hy:(x,z)=>TR.h(x,z),keep:(x,z)=>TR.h(x,z)<-95});
    W.sky(5200); tidy(1);
    }
  }});
