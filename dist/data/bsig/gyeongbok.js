__bsigFill({"gyeongbok":function(K){
// 실측: 근정전 정면 5칸 29.7 m × 측면 5칸 20.3 m, 기둥 16척(4.85 m), 중층 팔작 · 광화문 홍예 가운데 높이 17척5촌(5.3 m) 너비 18척(5.5 m), 양옆 16척 × 14척5촌, 문루 정면 3칸(27·25·25척) 측면 2칸 2층 우진각 — 출처: 한국민족문화대백과 E0002439 「광화문」, 한국어 위키백과 「경복궁 근정전」
// 광화문 월대 2023 복원 길이 48.7 m × 너비 29.7 m(국가유산청 2023-10 보도) · 경회루 정면 7칸 측면 5칸(약 34.4 × 28.5 m), 돌기둥 48(바깥 네모 24·안 원형 24), 연못 동서 128 × 남북 113 m, 섬 2 — 출처: 국가유산청 국가유산포털 「경복궁 경회루」 · 향원정 육각 2층 정자(1867~73), 취향교 길이 32 m(2021 복원, 남쪽) — 국가유산청
// 축약: 실제 광화문→향원정 약 650 m, 궁장 동서 약 430 m. 이 모형은 전각은 실제 크기로, 전각 사이 거리와 궁장(320 × 490 m)을 약 0.75배로 줄였음. 추정: 광화문 석축 46 × 16 × 8 m, 흥례문·근정문 기단, 사정전 20 × 10 m, 강녕전 33 × 14 m, 교태전 27 × 12 m(용마루 없음), 경회루 연못 105 × 100 m로 축소, 향원지 56 × 56 m, 궁장 높이 4.2 m
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
    // ---- 한옥 공용(이 build 안): 재료 · 곡면 지붕 roof() · 전각 hall() · 담 wall() · 행각 corr() · 계단 stairs() · 기둥은 한 InstancedMesh ----
    const GW=K.M.giwa.clone(); GW.side=T.DoubleSide; const RU=K.col(0x5a4a3c,DS()), RED=K.col(0x9a3b2a,{roughness:.8}), GRN=K.col(0x2f6b4f), BLU=K.col(0x2b5a8a), WH=K.col(0xe9e2d2,{roughness:.95}), DK=K.col(0x2e3a30,{roughness:.6}), DR=K.col(0x2b2a28), OC=K.col(0xc9a86a), BR=K.col(0x2f5a4b), ST=K.col(0xd4cfc3,{roughness:.9}), SG=K.col(0xbdb6a8,{roughness:.95}), SG2=K.col(0xa39c8e,{roughness:.95}), WLB=K.col(0x7d7466,{roughness:.95}), DOOR=K.col(0x7a4a2c,{roughness:.8}), EA=flat(K.col(0xd6cfc0,{roughness:1})), GRS=flat(K.M.grass), PV=flat(K.M.pave), PINE=K.M.leaf3, TRK=K.M.trunk;
    const COLS=[]; const col=(x,y,z,r,h)=>COLS.push([x,y,z,0,r,h,r]); // 기둥: 단위 원기둥을 (r,h,r)로 스케일
    const roof=(cx,ye,cz,E,D,H,o)=>{ o=o||{}; const dt=o.dt===undefined?.45:o.dt, so=o.sori===undefined?.6:o.sori, thk=o.thk||.35, sw=!!o.swap, mt=o.mat||GW, um=o.under||UND; const EE=sw?D:E, DD=sw?E:D; const R=Math.max(0,EE-DD*(1-dt));
      const g=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),1.7); const y0=ye+H*(1-g(dt));
      const yf=(a,b)=>{ const aa=Math.abs(a)/(EE/2), bb=Math.abs(b)/(DD/2); const ta=Math.abs(a)>R/2?(Math.abs(a)-R/2)/(DD/2)+dt:0; return ye+H*(1-g(Math.max(bb,ta)))+so*Math.pow(aa,3)*Math.pow(bb,3); };
      const P=(a,b,y)=>sw?[cx+b,y,cz+a,b/2,a/2]:[cx+a,y,cz+b,a/2,b/2];
      const sheet=(a0,a1,m,dy,n)=>S(m,(u,v)=>{ const a=a0+(a1-a0)*u, b=-DD/2+DD*v; return P(a,b,yf(a,b)+dy); },n,o.nv||8);
      const segs=(dt>0&&dt<1)?[[-EE/2,-R/2,6],[-R/2,R/2,14],[R/2,EE/2,6]]:[[-EE/2,EE/2,o.nu||24]];
      for(const [a0,a1,n] of segs){ sheet(a0,a1,mt,0,n); sheet(a0,a1,um,-thk,n); }
      S(um,(u,v)=>{ const s=u*4, k=Math.floor(s), f=s-k; let a,b; if(k===0){a=-EE/2+EE*f;b=-DD/2;} else if(k===1){a=EE/2;b=-DD/2+DD*f;} else if(k===2){a=EE/2-EE*f;b=DD/2;} else {a=-EE/2;b=DD/2-DD*f;} const y=yf(a,b); return P(a,b,y-thk+thk*v); },48,1);
      if(dt>0){ for(const s of [-1,1]){ const a=s*R/2; S(o.gmat||um,(u,v)=>{ const b=-dt*DD/2+dt*DD*u; const yt=yf(a-s*.02,b), yb=y0-thk; return P(a-s*.05,b,yb+(yt-yb)*v); },8,1); } }
      if(R>.6&&o.ridge!==false){ if(o.noridge){ const gg=new T.CylinderGeometry(.55,.55,R+.3,8); gg.rotateZ(Math.PI/2); if(sw) gg.rotateY(Math.PI/2); gg.translate(cx,ye+H-.05,cz); Q(o.rmat||DR,gg); } else { const rw=o.rw||Math.max(.8,DD*.035), rhh=o.rh||Math.max(.5,H*.13); if(o.rmat) B(cx,ye+H-.15,cz,sw?rw:R+.5,rhh,sw?R+.5:rw,o.rmat); else { B(cx,ye+H-.22,cz,sw?rw:R+.3,rhh,sw?R+.3:rw,YS); B(cx,ye+H-.22+rhh,cz,sw?rw*.7:R+.6,.18,sw?R+.6:rw*.7,DR); if(R>3) for(const e of [-1,1]){ const ex=sw?cx:cx+e*(R/2+.15), ez=sw?cz+e*(R/2+.15):cz; B(ex,ye+H-.3,ez,rw*1.15,rhh+rw*1.2,rw*1.15,DR); } } } }
      if(o.hips!==false){ const hw=Math.max(.16,Math.min(.34,DD*.011)), hh=hw*1.1; const rib=(fa,n)=>S(YS,(u,v)=>{ const q=fa(u); const k=(v-.5)*2; const aa=q[0]+q[2]*k*hw, bb2=q[1]+q[3]*k*hw; return P(aa,bb2,yf(aa,bb2)+(1-Math.abs(k))*hh+.05); },n,2);
        for(const s of [-1,1]) for(const t of [-1,1]){ const a0=s*R/2, b0=t*Math.min(dt,1)*DD/2, a1=s*EE/2, b1=t*DD/2; if(dt<.99){ const L=Math.hypot(a1-a0,b1-b0)||1; rib(u=>[a0+(a1-a0)*u,b0+(b1-b0)*u,-(b1-b0)/L,(a1-a0)/L],10); } if(dt>.01&&R>1) rib(u=>[s*(R/2-.15),t*Math.min(dt,1)*DD/2*u,1,0],5); } } yf.E=EE; yf.D=DD; yf.dt=dt; yf.R=R; yf.sw=sw; yf.cx=cx; yf.cz=cz; return yf; };
    // 잡상: 추녀마루(모서리→용마루 끝) 위에 n개
    const japsang=(yf,n)=>{ const dt=Math.min(1,yf.dt||0); for(const s of [-1,1]) for(const t of [-1,1]){ const a0=s*yf.R/2, b0=t*dt*yf.D/2, a1=s*yf.E/2, b1=t*yf.D/2; for(let k=0;k<n;k++){ const q=.86-.4*k/Math.max(1,n-1); const a=a0+(a1-a0)*q, b=b0+(b1-b0)*q; const y=yf(a,b)+.3; if(yf.sw) B(yf.cx+b,y,yf.cz+a,.3,.48,.3,DR); else B(yf.cx+a,y,yf.cz+b,.3,.48,.3,DR); } const a=a0+(a1-a0)*.985, b=b0+(b1-b0)*.985; if(yf.sw) B(yf.cx+b,yf(a,b),yf.cz+a,.5,.75,.5,DR); else B(yf.cx+a,yf(a,b),yf.cz+b,.5,.75,.5,DR); } };
    const stairs=(x,z,yt,yb,w,n,axis,dir,mat)=>{ const rise=(yt-yb)/n, run=.42; for(let k=0;k<n-1;k++){ const h=yt-yb-(k+1)*rise, off=dir*(k+.5)*run; if(axis==='z') B(x,yb,z+off,w,h,run,mat||ST); else B(x+off,yb,z,run,h,w,mat||ST); } for(const s of [-1,1]){ const L=(n-1)*run; if(axis==='z') B(x+s*(w/2+.22),yb,z+dir*L/2,.44,yt-yb+.3,L+.3,mat||ST); else B(x+dir*L/2,yb,z+s*(w/2+.22),L+.3,yt-yb+.3,.44,mat||ST); } };
    // 전각: 기단 · 기둥 · 몸체(어두운 창호 + 세로 창살) · 머름·창방 · 공포 띠(녹·청 블록) · 지붕. o: base 기단높이, ch 기둥높이, nb 정면칸, nd 측면칸, dt(0 우진각 · .45 팔작 · 1 맞배), ov 처마 내밈, rh 지붕 높이, up:{W,D,ch} 상층, open 하층 개방(누각), y 바닥 레벨, noridge 무량각, mat 지붕 재료
    const hall=(cx,cz,W,D,o)=>{ o=o||{}; const y=o.y||0, b=o.base===undefined?.9:o.base, ch=o.ch||3.6, nb=o.nb||5, nd=o.nd||3, ov=o.ov||2.2, rh=o.rh||(Math.min(W,D)*.22+1.2), pad=o.pad===undefined?1.6:o.pad;
      if(b>0) B(cx,y,cz,W+2*pad,b,D+2*pad,o.bmat||ST); const y1=y+b; const r=o.r||Math.min(.34,.2+ch*.03);
      for(let i=0;i<=nb;i++) for(let j=0;j<=nd;j++){ if(i>0&&i<nb&&j>0&&j<nd) continue; col(cx-W/2+i*W/nb,y1,cz-D/2+j*D/nd,r,ch); }
      if(!o.open){ B(cx,y1,cz,W-.25,ch,D-.25,o.body||DK); B(cx,y1,cz,W-.2,.7,D-.2,o.sill||RED); if(o.lattice!==false){ for(let i=0;i<nb;i++){ const x0=cx-W/2+i*W/nb, x1=x0+W/nb; const n=Math.max(2,Math.round((x1-x0)/.45)); for(let k=1;k<n;k++) for(const s of [-1,1]) LAT.push([x0+(x1-x0)*k/n,y1+.8,cz+s*(D/2-.1),0,1,ch-1.4,1]); } } }
      else { B(cx,y1+ch-.05,cz,W+.3,.25,D+.3,o.floor||OC); if(o.rail) rail(cx,y1+ch+.2,cz,W+.3,D+.3,.9); }
      B(cx,y1+ch,cz,W+1.0,.45,D+1.0,CHB); B(cx,y1+ch-.12,cz,W+.9,.12,D+.9,RED); dapo(cx,y1+ch+.45,cz,W+1.1,D+1.1,o.step||1.5,o.plain); B(cx,y1+ch+1.35,cz,W+1.6,.4,D+1.6,BR);
      if(o.sign!==0&&!o.up&&!o.plain&&!o.swap&&!o.open&&W>=10) SIGN(cx,y1+ch-1.25,cz+D/2+.14,Math.min(3.2,W*.17)); let yr=y1+ch+1.75; const yf=roof(cx,yr,cz,W+2*ov,D+2*ov,o.up?rh*.72:rh,{dt:o.up?0:(o.dt===undefined?.45:o.dt),ridge:!o.up,swap:o.swap,sori:o.sori,thk:o.thk,gmat:OC,rh:o.rhh,noridge:o.noridge,mat:o.mat,nv:o.nv});
      if(o.up){ const u=o.up, W2=u.W, D2=u.D, c2=u.ch||ch*.8, y2=yr+(o.up.lift||2.2); const nb2=u.nb||Math.max(1,nb-2), nd2=u.nd||Math.max(1,nd-1); for(let i=0;i<=nb2;i++) for(let j=0;j<=nd2;j++){ if(i>0&&i<nb2&&j>0&&j<nd2) continue; col(cx-W2/2+i*W2/nb2,y2,cz-D2/2+j*D2/nd2,r*.85,c2); }
        B(cx,y2,cz,W2-.2,c2,D2-.2,o.body||DK); B(cx,y2,cz,W2-.15,.6,D2-.15,RED); for(let i=0;i<nb2;i++){ const x0=cx-W2/2+i*W2/nb2, x1=x0+W2/nb2; const n=Math.max(2,Math.round((x1-x0)/.45)); for(let k=1;k<n;k++) for(const s of [-1,1]) LAT.push([x0+(x1-x0)*k/n,y2+.7,cz+s*(D2/2-.08),0,1,c2-1.1,1]); }
        B(cx,y2+c2,cz,W2+1.0,.45,D2+1.0,CHB); dapo(cx,y2+c2+.45,cz,W2+1.1,D2+1.1,o.step||1.5,o.plain); B(cx,y2+c2+1.35,cz,W2+1.6,.4,D2+1.6,BR);
        if(o.sign!==0&&!o.plain&&!o.swap&&W2>=8) SIGN(cx,y2+c2-1.2,cz+D2/2+.14,Math.min(3.6,W2*.22)); const yr2=y2+c2+1.75; return roof(cx,yr2,cz,W2+2*ov,D2+2*ov,u.rh||rh,{dt:o.dt===undefined?.45:o.dt,swap:o.swap,sori:(o.sori||.6)*1.3,thk:(o.thk||.35)*1.2,gmat:OC,rh:.6,rw:1.0,mat:o.mat}); }
      return yf; };
    const LAT=[]; // 창살(세로 살) 인스턴스
    const dapo=(cx,y,cz,w,d,step,plain)=>{ if(plain){ B(cx,y,cz,w,.9,d,GRN); return; } const ring=[]; for(let x=-w/2+step/2;x<w/2;x+=step) ring.push([cx+x,cz-d/2,0],[cx+x,cz+d/2,0]); for(let z=-d/2+step/2;z<d/2;z+=step) ring.push([cx-w/2,cz+z,1],[cx+w/2,cz+z,1]); B(cx,y,cz,w-.3,.9,d-.3,GRN); ring.forEach((p,i)=>{ const ry=p[2]?Math.PI/2:0; B(p[0],y,p[1],.55,.9,.9,i%2?GRN:BLU,ry); B(p[0],y+.6,p[1],.7,.3,1.4,OC,ry); }); };
    const rail=(cx,y,cz,w,d,h)=>{ for(const [x0,z0,x1,z1] of [[-w/2,-d/2,w/2,-d/2],[w/2,-d/2,w/2,d/2],[w/2,d/2,-w/2,d/2],[-w/2,d/2,-w/2,-d/2]]){ const L=Math.hypot(x1-x0,z1-z0); const ax=Math.abs(x1-x0)>0; B(cx+(x0+x1)/2,y+h-.1,cz+(z0+z1)/2,ax?L+.1:.12,.1,ax?.12:L+.1,RED); const n=Math.max(2,Math.round(L/1.2)); for(let i=0;i<=n;i++){ const t=i/n; B(cx+x0+(x1-x0)*t,y,cz+z0+(z1-z0)*t,.1,h-.1,.1,RED); } } };
    // 담(궁장·사고석 담): 기단 + 회벽 + 기와 지붕 두 장, 축 정렬
    const wall=(x0,z0,x1,z1,h,o)=>{ o=o||{}; const ax=Math.abs(x1-x0)>Math.abs(z1-z0); const L=ax?Math.abs(x1-x0):Math.abs(z1-z0); const cx=(x0+x1)/2, cz=(z0+z1)/2, y=o.y||0, t=o.t||.8; const w=ax?L:t, d=ax?t:L; B(cx,y,cz,w,h*.4,d,o.base||WLB); B(cx,y+h*.4,cz,w,h*.6,d,o.mat||WH); B(cx,y+h,cz,w+(ax?.3:.9),.2,d+(ax?.9:.3),RU); B(cx,y+h+.2,cz,w+(ax?.2:.7),.18,d+(ax?.7:.2),DR); };
    // 행각(회랑): 기단 + 기둥 2열 + 바깥 회벽 + 맞배지붕. axis 'x'|'z', out = 바깥쪽 부호
    const corr=(cx,cz,len,axis,out,o)=>{ o=o||{}; const ax=axis==='x', y=o.y||0, wd=o.w||6.2, ch=o.ch||3.4; B(cx,y,cz,ax?len:wd+1.2,.6,ax?wd+1.2:len,ST); const n=Math.round(len/4.2); for(let i=0;i<=n;i++){ const t=-len/2+i*len/n; for(const r of [-wd/2+.3,wd/2-.3]) col(ax?cx+t:cx+r,y+.6,ax?cz+r:cz+t,.27,ch); }
      if(out){ B(ax?cx:cx+out*(wd/2-.3),y+.6,ax?cz+out*(wd/2-.3):cz,ax?len:.4,ch,ax?.4:len,WH); B(ax?cx:cx+out*(wd/2-.3),y+.6,ax?cz+out*(wd/2-.3):cz,ax?len+.1:.46,.9,ax?.46:len+.1,WLB); }
      B(cx,y+.6+ch,cz,ax?len+.4:wd+.6,.45,ax?wd+.6:len+.4,CHB); B(cx,y+1.05+ch,cz,ax?len+.6:wd+1.0,.5,ax?wd+1.0:len+.6,BR); roof(cx,y+1.55+ch,cz,ax?len+2.4:wd+3.4,ax?wd+3.4:len+2.4,o.rh||2.3,{swap:!ax,dt:1,thk:.3,sori:.3,gmat:OC,nv:6}); };
    const paving=(cx,y,cz,w,d,sx,sz)=>{ for(let x=-w/2+sx*(.6+rnd()*.5);x<w/2-.5;x+=sx*(.75+rnd()*.5)) B(cx+x,y,cz,.09,.025,d,SG2); for(let z=-d/2+sz*(.6+rnd()*.5);z<d/2-.5;z+=sz*(.75+rnd()*.5)) B(cx,y,cz+z,w,.025,.09,SG2); };
    const finishHanok=()=>{ flush(); inst(cylG(1,1,10,.92),RED,COLS); inst((()=>{ const g=new T.BoxGeometry(1,1,1); g.translate(0,.5,0); return g; })(),SG,COLS.map(c=>[c[0],c[1]-.03,c[2],0,c[4]*2.5,.34,c[4]*2.5])); inst((()=>{ const g=new T.BoxGeometry(.07,1,.07); g.translate(0,.5,0); return g; })(),OC,LAT,false); COLS.length=0; LAT.length=0; };
    const PAV=flat(K.col(0xcfc8ba,{roughness:.95})), WAT=K.M.water, HBR=K.col(0xa0522d,{roughness:.9}), SKIN=K.col(0xb9b3a6,{roughness:.95}), ISL=K.col(0xd8cfb4,{roughness:1});
    // ---- 0: 땅 · 궁장 · 4문 · 광화문(석축 3홍예 + 월대) · 흥례문 마당 · 금천 ----
    const YS=K.col(0xcfc9bd,{side:K.T.DoubleSide,roughness:.9}), UND=K.col(0x3a594e,{side:K.T.DoubleSide,roughness:.85}), CHB=K.col(0x3f7564,{roughness:.8}); const SIGN=(x,y,z,w)=>{ const h=w*.48; B(x,y-h,z,w+.3,h+.3,.12,OC); B(x,y-h+.15,z+.04,w,h,.12,K.col(0x22324a,{roughness:.6})); };
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
    K.layer(0);
    const XW=160, ZS=200, ZN=-250; // 궁장 동서 ±160, 남 +200(광화문), 북 -250(신무문)
    E.plane(E.MAS,0,.1,(ZS+ZN)/2,2*XW,ZS-ZN,Q); // 궁 안 마당(마사토 질감)
    E.plane(E.BAK,0,.12,129,10,126,Q); E.plane(E.BAK,0,.12,163,40,30,Q); // 광화문~근정문 어도(박석) · 광화문 안 마당
    const WH4=4.2; wall(-XW,ZS,-25,ZS,WH4); wall(25,ZS,XW,ZS,WH4); wall(-XW,ZN,-10,ZN,WH4); wall(10,ZN,XW,ZN,WH4); wall(-XW,ZS,-XW,55,WH4); wall(-XW,38,-XW,ZN,WH4); wall(XW,ZS,XW,55,WH4); wall(XW,38,XW,ZN,WH4);
    // 건춘문(동)·영추문(서)·신무문(북): 석축 1홍예 + 단층 문루 · 동십자각(동남 모서리 밖 2층 망루)
    const gate1=(x,z,ry)=>{ const sw=!!ry; B(x,0,z,sw?12:18,6,sw?18:12,SKIN); B(x,0,z,sw?12.4:5.2,4.6,sw?5.2:12.4,DR); hall(x,z,sw?8:13,sw?13:8,{y:6,base:.3,ch:3.0,nb:3,nd:2,ov:1.8,dt:0,rh:3.2,plain:1,swap:sw}); };
    gate1(XW,46,1); gate1(-XW,46,1); gate1(0,ZN,0);
    { const x=XW+6, z=ZS+6; B(x,0,z,12,6.5,12,SKIN); hall(x,z,8,8,{y:6.5,base:.3,ch:2.8,nb:3,nd:3,ov:1.6,dt:0,rh:3.4,plain:1}); } // 동십자각
    // 광화문: 석축 46 × 16 × 8 m, 홍예 3(가운데 5.5 × 5.3, 양옆 4.4 × 4.85 — 어두운 통로 + 반원) · 2층 문루 3×2칸 우진각 · 앞 월대 48.7 × 29.7
    { const z=ZS, H=8; B(0,0,z,46,H,16,SKIN); B(0,H-.5,z,47,.5,17,SG); for(const [x,w,h] of [[0,5.5,5.3],[-9.2,4.4,4.85],[9.2,4.4,4.85]]){ B(x,0,z,w,h-w/2,16.3,DR); const g=archG(w/2,16.3,1); g.translate(x,h-w/2,z); Q(DR,g); }
      hall(0,z,23.4,6.0,{y:H,base:.3,ch:3.4,nb:3,nd:2,ov:2.6,dt:0,rh:5.2,up:{W:21.6,D:5.4,ch:3.0,nb:3,nd:2,rh:5.0,lift:1.6},step:1.3});
      B(0,0,z+8+14.85,48.7,1.1,29.7,ST); E.plane(E.BAK,0,1.11,z+8+14.85,48.7,29.7,Q); B(0,1.1,z+8+14.85,3.2,.18,29.7,SG); // 월대 + 어도
      for(const s of [-1,1]) B(s*2.6,1.28,z+8+14.85,.15,.2,29.7,SG2); stairs(0,z+8+29.7,1.1,0,6,3,'z',1); for(const s of [-1,1]) stairs(s*24.35,z+8+14.85,1.1,0,6,3,'x',s);
      for(const s of [-1,1]) for(const t of [-1,1]){ const g=new T.SphereGeometry(1.3,8,6); g.scale(1,.8,1.6); g.translate(s*23,1.9,z+8+14.85+t*13); Q(SG2,g); } } // 해태·서수 자리(약식)
    // 흥례문(3×2칸 중층 우진각) + 좌우 행각(동서 ±75)이 광화문 마당을 닫음 · 금천 + 영제교 · 근정문 행각
    hall(0,135,19,8,{base:1.2,ch:3.8,nb:3,nd:2,ov:2.4,dt:0,rh:4.4,up:{W:17,D:7,ch:3.0,rh:4.2,lift:1.6},step:1.4}); stairs(0,135+4+1.8,1.2,0,6,3,'z',1); stairs(0,135-4-1.8,1.2,0,6,3,'z',-1);
    corr(-47,135,56,'x',1); corr(47,135,56,'x',1); corr(-75,167.5,65,'z',-1); corr(75,167.5,65,'z',1); corr(-75,112,46,'z',-1); corr(75,112,46,'z',1);
    { const z=110; B(0,0,z,140,.18,9,K.col(0x7f8a86)); B(0,.18,z,140,.02,8,WAT); for(const s of [-1,1]) B(0,0,z+s*4.8,140,.55,.6,SG); // 금천(물길) + 호안
      B(0,0,z,13,.8,11,ST); B(0,.8,z,13,.2,11,SG); for(const s of [-1,1]) for(let i=0;i<=6;i++) B(s*6.6,1.0,z-5.5+i*11/6,.4,1.0,.4,SG); for(const s of [-1,1]) B(s*6.6,1.9,z,.3,.2,11.4,SG); } // 영제교(홍예 2 약식)
    // ---- 근정전 영역(실측 기반 축약판): 행각 ±53/-42·근정문 중층(z 62)·2단 월대·품계석·삼도 ----
    corr(-53,10,104,'z',-1); corr(53,10,104,'z',1); corr(0,-42,113,'x',-1); corr(-32.5,62,41,'x',1); corr(32.5,62,41,'x',1);
    hall(0,62,15,7,{base:1.2,ch:4.4,nb:3,nd:2,ov:2.6,dt:0,rh:4.2,up:{W:13.4,D:6.6,ch:2.8,rh:4.0,lift:1.6},step:1.4}); stairs(0,68,1.2,0,7,4,'z',1); stairs(0,56,1.2,0,7,4,'z',-1);
    for(const s of [-1,1]){ const xc=s*56.5, zc=62-104/3; B(xc,0,zc,10,.8,9.5,ST); hall(xc,zc,7.4,6.8,{y:.8,base:0,ch:3.4,nb:2,nd:2,ov:2.2,rh:3.6,up:{W:7.2,D:6.6,ch:3.0,rh:3.4,lift:1.6},plain:1}); } // 융문루·융무루
    E.plane(E.BAK,0,.13,12,100,100,Q); B(0,.1,40,2.4,.22,36,ST); for(const s of [-1,1]) B(s*3.1,.1,40,2.0,.14,36,SG); // 조정 박석 + 삼도
    for(let i=0;i<24;i++){ const x=(i<12?-1:1)*5.2, z=26+(i%12)*3; B(x,.06,z,.9,.18,.8,SG2); B(x,.24,z,.34,1.0,.3,SG2); } // 품계석 24
    B(0,0,0,54,1.5,44,ST); B(0,1.5,0,42,1.5,32,ST); E.plane(E.BAK,0,1.51,0,54,44,Q); E.plane(E.BAK,0,3.01,0,42,32,Q);
    for(const x of [-5,0,5]) stairs(x,22,1.5,0,4.2,5,'z',1); for(const x of [-16,16]) stairs(x,22,1.5,0,3.6,5,'z',1); for(const s of [-1,1]) stairs(s*27,4,1.5,0,3.6,5,'x',s); for(const x of [-5,0,5]) stairs(x,16,3.0,1.5,4.2,5,'z',1); for(const s of [-1,1]) stairs(s*21,2,3.0,1.5,3.6,5,'x',s);
    const srail=(y,x0,z0,x1,z1,gaps)=>{ const L=Math.hypot(x1-x0,z1-z0), n=Math.round(L/3.2), ax=Math.abs(x1-x0)>0; const segs=[]; let t=0; for(const [g0,g1] of (gaps||[])){ segs.push([t,g0]); t=g1; } segs.push([t,1]); for(const [a,b] of segs){ if(b-a<.01) continue; const mx=x0+(x1-x0)*(a+b)/2, mz=z0+(z1-z0)*(a+b)/2, l=L*(b-a); B(mx,y+.62,mz,ax?l:.28,.22,ax?.28:l,SG); B(mx,y+.3,mz,ax?l:.2,.12,ax?.2:l,SG); } for(let i=0;i<=n;i++){ const t=i/n; if((gaps||[]).some(([g0,g1])=>t>g0+.001&&t<g1-.001)) continue; B(x0+(x1-x0)*t,y,z0+(z1-z0)*t,.36,1.0,.36,SG); B(x0+(x1-x0)*t,y+1.0,z0+(z1-z0)*t,.46,.12,.46,SG2); } };
    srail(1.5,-27,22,27,22,[[.17,.24],[.37,.63],[.76,.83]]); srail(1.5,27,22,27,-22,[[.36,.46]]); srail(1.5,27,-22,-27,-22); srail(1.5,-27,-22,-27,22,[[.54,.64]]); srail(3.0,-21,16,21,16,[[.31,.69]]); srail(3.0,21,16,21,-16,[[.38,.5]]); srail(3.0,21,-16,-21,-16); srail(3.0,-21,-16,-21,16,[[.5,.62]]);
    // 근정전: 정면 5칸 29.7 × 측면 5칸 20.3, 기둥 4.85, 중층 팔작(상층 18 × 12.6) + 잡상
    const yfG=hall(0,0,29.7,20.3,{y:3.0,base:.9,ch:4.85,nb:5,nd:5,ov:5.2,rh:4.7,up:{W:18,D:12.6,ch:3.6,nb:3,nd:3,rh:5.6,lift:1.55},step:1.5,r:.5});
    japsang(yfG,7);
    // ---- 사정전(편전 5×3칸, 만춘전·천추전) · 강녕전(11×5칸, 용마루 없음) · 교태전(9×4칸, 용마루 없음) + 행각 · 아미산 ----
    hall(0,-68,20,10,{base:1.0,ch:3.8,nb:5,nd:3,ov:2.6,rh:4.6}); for(const s of [-1,1]) hall(s*26,-68,12,8,{base:.8,ch:3.2,nb:3,nd:2,ov:2.0,rh:3.4,plain:1});
    corr(0,-48,96,'x',1,{w:5.4,ch:3.0,rh:2.0}); corr(-48,-72,48,'z',-1,{w:5.4,ch:3.0,rh:2.0}); corr(48,-72,48,'z',1,{w:5.4,ch:3.0,rh:2.0}); hall(0,-48,8,5.4,{base:.7,ch:3.4,nb:1,nd:1,ov:1.8,dt:1,rh:3.0,plain:1,swap:0}); // 사정문
    hall(0,-115,33,14,{base:1.1,ch:3.8,nb:11,nd:5,ov:3.0,rh:5.4,noridge:1,step:1.4}); for(const s of [-1,1]) hall(s*30,-115,10,8,{base:.8,ch:3.2,nb:3,nd:2,ov:2.0,rh:3.4,plain:1,noridge:1}); // 강녕전 + 연생전·경성전
    corr(0,-96,100,'x',1,{w:5.0,ch:2.9,rh:1.9}); hall(0,-96,8,5,{base:.7,ch:3.3,nb:1,nd:1,ov:1.8,dt:1,rh:3.0,plain:1}); corr(-50,-118,44,'z',-1,{w:5.0,ch:2.9,rh:1.9}); corr(50,-118,44,'z',1,{w:5.0,ch:2.9,rh:1.9}); // 향오문 + 행각
    hall(0,-155,27,12,{base:1.0,ch:3.6,nb:9,nd:4,ov:2.8,rh:4.8,noridge:1,step:1.4}); corr(0,-136,80,'x',1,{w:5.0,ch:2.9,rh:1.9}); hall(0,-136,8,5,{base:.7,ch:3.3,nb:1,nd:1,ov:1.8,dt:1,rh:3.0,plain:1}); corr(-40,-158,44,'z',-1,{w:5.0,ch:2.9,rh:1.9}); corr(40,-158,44,'z',1,{w:5.0,ch:2.9,rh:1.9}); // 교태전 + 양의문 + 행각
    for(let k=0;k<4;k++) B(0,k*.9,-172-k*2.6,34,.9,2.6,SG); for(const x of [-9,9]){ for(let i=0;i<6;i++){ const g=new T.CylinderGeometry(1.1,1.1,.45,6); g.translate(x,3.6+i*.45,-181); Q(HBR,g); } B(x,6.3,-181,2.6,.5,2.6,DR); } // 아미산 화계 4단 + 육각 굴뚝 2
    wall(-40,-184,40,-184,2.6,{t:.5});
    // ---- 경회루: 연못(105 × 100 축약) · 섬(동쪽 큰 섬에 경회루, 서쪽 작은 섬 2) · 돌다리 3 · 2층 누각 7×5칸 돌기둥 48 ----
    { const px=-100, pz=-60, PW=105, PD=100; B(px,0,pz,PW+2,.16,PD+2,K.col(0x5f6e6a)); B(px,.16,pz,PW,.02,PD,WAT); for(const [x0,z0,x1,z1] of [[px-PW/2,pz-PD/2,px+PW/2,pz-PD/2],[px-PW/2,pz+PD/2,px+PW/2,pz+PD/2],[px-PW/2,pz-PD/2,px-PW/2,pz+PD/2],[px+PW/2,pz-PD/2,px+PW/2,pz+PD/2]]){ const ax=z0===z1; B((x0+x1)/2,0,(z0+z1)/2,ax?PW+2.4:1.2,.5,ax?1.2:PD+2.4,SG); }
      const ix=px+22, iz=pz; B(ix,0,iz,52,.7,42,ST); // 큰 섬(장대석 호안)
      const W=34.4, D=28.5, F=5.0; for(let i=0;i<=6;i++) for(let j=0;j<=4;j++){ const x=ix-W/2+i*W/6, z=iz-D/2+j*D/4; const outer=i===0||i===6||j===0||j===4; if(outer) B(x,.7,z,1.0,F,1.0,SG); else C(x,.7,z,.5,F,SG,12,.46); } // 돌기둥 48: 바깥 네모 24 · 안 원형 24
      B(ix,.7+F,iz,W+1.6,.5,D+1.6,RED); hall(ix,iz,W,D,{y:1.2+F,base:0,ch:3.9,nb:7,nd:5,ov:4.0,rh:5.8,step:1.5,r:.36}); rail(ix,1.2+F,iz,W+1.4,D+1.4,.9);
      for(let k=0;k<3;k++){ const z=iz-12+k*12; B(ix+26+13.5,.1,z,27,.7,3.2,ST); for(const s of [-1,1]) B(ix+26+13.5,.8,z+s*1.7,27,.5,.3,SG); } // 동쪽 돌다리 3
      for(const [x,z,r] of [[px-28,pz-8,9],[px-22,pz+22,7]]){ const g=new T.CylinderGeometry(r,r*1.05,.9,14); g.translate(x,.5,z); Q(ISL,g); pine(x-1,.75,z+1,7); pine(x+2.5,.75,z-2,5.5); } // 서쪽 작은 섬 2 + 소나무
      for(const [x,z,h] of [[px-40,pz+54,7],[px+10,pz+56,6],[px-48,pz-54,6.5],[px+30,pz-56,7]]) pine(x,0,z,h); }
    // ---- 향원정: 향원지 56 × 56 · 둥근 섬(지름 28) · 육각 2층 정자 · 취향교 32 m(남쪽) ----
    { const px=0, pz=-215, PW=56; B(px,0,pz,PW+2,.16,PW+2,K.col(0x5f6e6a)); B(px,.16,pz,PW,.02,PW,WAT); for(const s of [-1,1]){ B(px,0,pz+s*PW/2,PW+2.4,.5,1.2,SG); B(px+s*PW/2,0,pz,1.2,.5,PW+2.4,SG); }
      const gi=new T.CylinderGeometry(14,14.6,.9,24); gi.translate(px,.5,pz); Q(ISL,gi); for(let i=0;i<7;i++){ const a=i*.9+.4; pine(px+Math.cos(a)*10.5,.75,pz+Math.sin(a)*10.5,4+(i%3)); }
      // 정자: 육각 기단 + 6기둥 + 2층 + 육각 지붕(원뿔 근사 2단)
      const r6=3.4; const gb=new T.CylinderGeometry(r6+1.2,r6+1.5,.9,6); gb.translate(px,1.2,pz); Q(ST,gb); for(let i=0;i<6;i++){ const a=i*Math.PI/3+Math.PI/6; col(px+Math.cos(a)*r6,1.65,pz+Math.sin(a)*r6,.2,5.6); }
      { const g1=new T.CylinderGeometry(r6-.2,r6-.2,2.6,6); g1.translate(px,3.0,pz); Q(DK,g1); const g2=new T.CylinderGeometry(r6+1.6,r6+1.6,.3,6); g2.translate(px,4.4,pz); Q(OC,g2); const g3=new T.ConeGeometry(r6+2.6,1.4,6); g3.translate(px,4.6+.7,pz); Q(GW,g3); const g4=new T.CylinderGeometry(r6-.4,r6-.4,2.2,6); g4.translate(px,5.0,pz); Q(DK,g4); const g5=new T.ConeGeometry(r6+2.2,2.6,6); g5.translate(px,7.3+1.3,pz); Q(GW,g5); const g6=new T.CylinderGeometry(.3,.5,1.0,6); g6.translate(px,10.6,pz); Q(DR,g6); }
      B(px,.9,pz+14+9,2.8,.3,32,OC); for(const s of [-1,1]){ B(px+s*1.5,1.2,pz+14+9,.12,.9,32,RED); } for(let i=0;i<9;i++) C(px-1.1,.1,pz+10+i*3.6,.22,.85,SG2,6,.2),C(px+1.1,.1,pz+10+i*3.6,.22,.85,SG2,6,.2); } // 취향교
    // ---- 빈터 채우기(v13): 수정전 · 궐내각사 · 동궁(자선당·비현각) · 계조당 · 소주방 · 자경전(꽃담·십장생 굴뚝) · 흥복전 · 태원전 · 집옥재 ----
    // 출처: 수정전 정면 10칸 측면 4칸(1867, 보물) · 자경전 정면 10칸, 서쪽 꽃담·십장생 굴뚝(보물) · 집옥재 맞배 + 벽돌 박공벽 — 국가유산청 국가유산포털 / 위치·크기는 궁역 축약(0.75)에 맞춘 추정
    hall(-100,24,33,13,{base:1.3,ch:3.8,nb:10,nd:4,ov:2.6,rh:4.2,step:1.5}); B(-100,0,40,28,1.0,9,ST); E.plane(E.BAK,-100,1.01,40,28,9,Q); stairs(-100,44.5,1.0,0,4,3,'z',1); // 수정전 + 월대
    for(const [x,z,w,d] of [[-140,180,14,7],[-118,180,12,7],[-96,182,10,6],[-140,160,13,7],[-116,158,12,6],[-140,138,14,7],[-112,138,11,7],[-140,112,12,6],[-118,112,13,7],[-96,110,10,6],[-140,86,12,7],[-115,86,12,6]]) hall(x,z,w,d,{base:.6,ch:2.9,nb:Math.round(w/3),nd:2,ov:1.8,dt:1,rh:2.7,plain:1,lattice:false,body:WH}); // 궐내각사(홍문관·내각 등)
    wall(-155,196,-85,196,2.4,{t:.4}); wall(-85,196,-85,74,2.4,{t:.4}); wall(-155,74,-85,74,2.4,{t:.4}); wall(-128,74,-128,196,2.0,{t:.35});
    hall(108,14,22,10,{base:1.0,ch:3.4,nb:7,nd:3,ov:2.4,rh:4.0}); hall(108,-24,16,9,{base:.9,ch:3.3,nb:5,nd:3,ov:2.2,rh:3.6}); wall(80,34,140,34,2.8,{t:.5}); wall(80,34,80,-40,2.8,{t:.5}); wall(140,34,140,-40,2.8,{t:.5}); wall(80,-40,140,-40,2.8,{t:.5}); wall(80,-5,140,-5,2.4,{t:.4}); hall(110,34,6,4.5,{base:.5,ch:3.0,nb:1,nd:1,ov:1.6,dt:1,rh:2.6,plain:1}); // 동궁: 자선당·비현각
    hall(112,104,18,9,{base:.9,ch:3.3,nb:5,nd:3,ov:2.2,rh:3.6}); wall(90,124,136,124,2.6,{t:.45}); wall(90,124,90,84,2.6,{t:.45}); wall(136,124,136,84,2.6,{t:.45}); wall(90,84,136,84,2.6,{t:.45}); // 계조당(2023 복원)
    for(const [x,z,w] of [[92,-92,14],[118,-92,12],[92,-118,14],[120,-120,12]]) hall(x,z,w,7,{base:.6,ch:3.0,nb:Math.round(w/3),nd:2,ov:1.9,dt:1,rh:2.8,plain:1}); wall(76,-78,140,-78,2.4,{t:.4}); wall(76,-78,76,-134,2.4,{t:.4}); // 소주방
    { const KB=K.col(0xa55a3c,{roughness:.9}); hall(98,-160,27,11,{base:1.0,ch:3.5,nb:10,nd:3,ov:2.6,rh:4.2,step:1.4}); wall(74,-142,74,-186,3.0,{t:.6,mat:KB,base:K.col(0x8a4a33)}); wall(74,-142,124,-142,3.0,{t:.5}); wall(124,-142,124,-186,3.0,{t:.5}); wall(74,-186,124,-186,3.0,{t:.5}); B(98,0,-182,10,3.6,1.6,KB); B(98,3.6,-182,10.6,.3,2.0,DR); for(let i=0;i<4;i++) C(94.5+i*2.3,3.9,-182,.35,1.1,KB,6); } // 자경전 + 서쪽 꽃담 + 십장생 굴뚝
    hall(-80,-152,30,12,{base:1.0,ch:3.6,nb:9,nd:4,ov:2.6,rh:4.4,step:1.4}); wall(-102,-136,-56,-136,2.6,{t:.45}); // 흥복전(2019 복원)
    hall(-132,-150,20,10,{base:1.0,ch:3.4,nb:5,nd:3,ov:2.4,rh:3.8}); wall(-152,-134,-112,-134,2.6,{t:.45}); wall(-152,-134,-152,-170,2.6,{t:.45}); wall(-112,-134,-112,-170,2.6,{t:.45}); // 태원전
    { const yz=hall(-118,-226,20,10,{base:1.0,ch:3.8,nb:5,nd:3,ov:2.2,dt:1,rh:4.2,step:1.4}); for(const s of [-1,1]) B(-118+s*10.6,1.0,-226,1.2,8.2,12,K.col(0x6f6a64,{roughness:.95})); } // 집옥재(맞배 + 벽돌 박공벽)
    E.plane(GRS,-60,.11,-210,60,40,Q); E.plane(GRS,70,.11,-215,60,40,Q); E.plane(GRS,-120,.11,-188,60,20,Q); // 잔디 조각(향원정 둘레)
    // ---- 궁 안 나무: 숲 군집(인스턴스) — 건물·연못·마당은 피함 ----
    { const ex=[[-82,82,-190,212],[-158,-42,-116,-4],[-34,34,-249,-181],[-156,-80,72,200],[-118,-82,8,48],[78,142,-42,36],[88,138,82,126],[74,142,-80,-136],[72,126,-140,-190],[-104,-54,-160,-134],[-154,-110,-136,-172],[-132,-104,-236,-216],[150,175,30,62],[-175,-150,30,62],[-12,12,-262,-238]];
      const ok=(x,z)=>!ex.some(r=>x>r[0]&&x<r[1]&&z>r[2]&&z<r[3])&&E.fbm(x*.02+3,z*.02)>.44;
      E.forest(E.scatter(-156,156,-246,196,7.5,()=>.1,ok,(x,z)=>9+E.vn(x*.1,z*.1)*6,(x,z)=>E.vn(x*.05+9,z*.05)<.5?1:0),{cast:true}); }
    // ---- 배경(life): 북악산(뒤) · 인왕산(서) · 응봉·낙산 능선(동) — 높이장 + 숲, 앞 세종대로·광화문광장 · 서촌/북촌/도심 낮은 블록 ----
    // 출처: 북악산 342 m, 인왕산 338 m(국토지리정보원) · 경복궁 해발 약 40 m → 상대 높이 약 300 m. 모형은 북악 정상까지 거리·높이를 약 0.55배로 압축(추정)
    { const PX=172, PZ0=-262, PZ1=262; const dOut=(x,z)=>Math.hypot(Math.max(-PX-x,0,x-PX),Math.max(PZ0-z,0,z-PZ1));
      const MT=[[-40,-790,640,430,215,1.75],[-340,-660,320,230,115,1.15],[330,-680,360,250,100,1.2],[650,-480,300,250,62,1.25],[-660,-480,300,380,170,1.2],[-1080,-860,540,440,150,1.15],[250,-1200,680,340,180,1.15],[960,-920,440,380,110,1.15]];
      const mt=(x,z)=>{ const h=E.peaks(x,z,MT); if(h<.5) return 0; return h*(.8+.36*E.ridged(x*.004+1.7,z*.004))*E.ss((dOut(x,z)-40)/160)*E.ss((-z-180)/160); };
      const hf=(x,z)=>.09+mt(x,z);
      const TR=E.terrain(-2000,2000,-2000,2000,100,100,hf,(x,z,h,ny)=>{ if(h<1.2){ const n=E.fbm(x*.01,z*.01,3); if(z<-270&&Math.abs(x)<520) return [.36+.05*n,.45+.05*n,.3]; const park=E.vn(x*.004+3,z*.004)>.7; return park?[.55+.05*n,.62+.05*n,.47]:[.66+.06*n,.65+.06*n,.61+.05*n]; } return E.mcol(x,z,h,ny,{rock:1,rockH:140,cliff:.8,low:4,lowc:[.62,.66,.52]}); });
      // 산 숲: 능선 따라 군집(크기 변화), 정상부 바위 근처는 성글게
      E.forest(E.scatter(-1250,1150,-1300,-220,15,TR.h,(x,z,h)=>h>5&&E.r()<(h>140?.55:.95),(x,z,h)=>9+E.vn(x*.03,z*.03)*7,(x,z,h)=>h>120||E.vn(x*.01,z*.01)<.45?1:0),{trunks:false});
      E.forest(E.scatter(-500,500,-640,-292,10,TR.h,(x,z,h)=>h<6&&Math.abs(z+282)>12&&E.r()<.85,(x,z,h)=>8+E.vn(x*.05,z*.05)*6,(x,z,h)=>E.vn(x*.02+4,z*.02)<.5?1:0),{trunks:false}); // 청와대·북악 기슭 숲
      // 길: 율곡로(궁 앞 동서) · 세종대로 + 광화문광장 · 삼청로·효자로
      const ASP=K.col(0x55575b,{roughness:.95}), PLZ=K.col(0xc9c4b8,{roughness:.95}), WK=K.col(0xb0aca3,{roughness:.95});
      const lp=(m,x,z,w,d,y)=>{ const g=new T.PlaneGeometry(w,d); g.rotateX(-Math.PI/2); const me=new T.Mesh(g,m); me.position.set(x,y||.2,z); me.receiveShadow=true; K.life.add(me); };
      lp(ASP,0,258,2400,24); lp(ASP,10,760,70,980); lp(PLZ,-42,760,34,980,.24); lp(WK,0,244,2400,6,.22); lp(ASP,200,-20,22,600); lp(ASP,-200,-20,22,600); lp(ASP,0,-282,420,16);
      { const st=[]; for(let i=0;i<18;i++){ const z=290+i*36; for(const x of [-56,-28,48]) st.push([x,.2,z,9,0,E.r()]); } E.forest(st); }
      // 블록: 서촌·북촌(낮은 기와집 결) · 도심(남쪽 사무동, 낮게 유지해 궁을 가리지 않음)
      const BL=[]; for(let x=-1000;x<1000;x+=34) for(let z=-520;z<1000;z+=34){ const xx=x+(E.r()-.5)*6, zz=z+(E.r()-.5)*6; if(Math.abs(xx)<215&&zz<300) continue; if(zz<-270&&Math.abs(xx)<520) continue; if(xx>-75&&xx<70&&zz>250) continue; if(Math.abs(zz-258)<30) continue; if(TR.h(xx,zz)>.6||TR.h(xx+14,zz+14)>.6||TR.h(xx-14,zz-14)>.6) continue; if(Math.hypot(xx,zz*1.1)>1050) continue; if(E.r()<.12) continue;
        const south=zz>280; const w=18+E.r()*12, d=16+E.r()*12; const h=south?(Math.abs(xx)<240&&zz<520?6+E.r()*8:9+E.r()*E.r()*26):(4+E.r()*3.5); BL.push([xx,zz,w,d,h,south?(E.r()<.3?'#8e9ba5':E.r()<.5?'#aaa69e':'#9c988f'):(E.r()<.6?'#5d5f63':'#77736b')]); }
      E.blocks(BL); }
    finishHanok();
  }});
