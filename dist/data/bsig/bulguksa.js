__bsigFill({"bulguksa":function(K){
// 출처: 다보탑 높이 10.29 m · 석가탑 10.75 m, 다보탑 十자 기단·사방 돌계단·8각 탑신·사각 난간, 석가탑 2단 기단 3층, 대웅전과 자하문 사이 뜰 동서에 마주 섬(동쪽이 다보탑) — 한국어 위키백과 「경주 불국사 다보탑」 · 청운교·백운교(국보) 33단: 위 백운교 16단·아래 청운교 17단, 연화교·칠보교(국보) 18단: 연화교 10단·칠보교 8단 — 국가유산청 국가유산포털
// 추정 치수: 대웅전 영역 석단 높이 6.5 m(33단 × 0.2), 극락전 영역 3.5 m(18단), 대웅전 20 × 16 m(정면 5칸 측면 5칸, 1765 재건), 무설전 28 × 9 m, 극락전 12 × 9 m, 자하문 11 × 6 m, 범영루 6 × 6 m 2층(석주 기단 8 m), 회랑 폭 4.6 m, 비로전·관음전은 뒤 단(+4·+7 m), 계단 폭 5.2 / 4.4 m
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
    const RK=K.col(0x9a948a,{roughness:1}), RK2=K.col(0x7f7a72,{roughness:1});
    const Y1=6.5, Y2=3.5; // 대웅전 영역 · 극락전 영역 단 높이
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
    // 배경(v13, K.life): 토함산 서쪽 기슭 — 절 뒤로 숲 덮인 능선이 겹겹이 오르고 앞(남)은 완만히 내려감. 토함산 745 m(절 약 250 m) → 상대 약 500 m를 0.5배로 압축(추정) · 출처: 국가유산청 「경주 불국사」
    const ZB=-96, X0=-72, X1=68, ZF=70; const dOut=(x,z)=>Math.hypot(Math.max(X0-x,0,x-X1),Math.max(ZB-z,0,z-ZF));
    const MT=[[380,-560,560,420,125,1.4],[40,-370,400,250,58,1.25],[-260,-260,240,240,62,1.3],[330,-200,240,260,70,1.3],[-420,-440,360,320,85,1.3],[-560,220,340,300,50,1.3],[560,260,340,280,55,1.3]];
    const hf=(x,z)=>{ const e=E.ss((dOut(x,z)-6)/90); let h=E.peaks(x,z,MT)*(.82+.34*E.ridged(x*.006+.3,z*.006)); h=h*e+Math.max(0,ZB-12-z)*.14*E.ss((ZB-z)/40)*E.ss(1-Math.abs(x-0)/260); return .09+h; };
    const TR=E.terrain(-1100,1100,-1100,1100,80,80,hf,(x,z,h,ny)=>{ const n=E.fbm(x*.02,z*.02,2); if(h<1.2&&dOut(x,z)<70) return [.56+.05*n,.6+.05*n,.44]; return E.mcol(x,z,h,ny,{rock:0,cliff:.2,low:-1}); });
    { const ex=[[-75,70,-100,72],[-40,-20,44,74],[10,30,60,90]]; const fr=(x,z)=>z>-20&&Math.abs(x+2)<95+Math.max(0,z)*.55; const ok=(x,z)=>!fr(x,z)&&!ex.some(r=>x>r[0]&&x<r[1]&&z>r[2]&&z<r[3]);
      E.forest(E.scatter(-800,800,-800,700,13,TR.h,(x,z,h)=>dOut(x,z)>70&&!fr(x,z)&&E.r()<.93,(x,z,h)=>10+E.vn(x*.03,z*.03)*7,(x,z,h)=>E.vn(x*.012+1,z*.012)<.55?1:0),{trunks:false}); // 산 숲(소나무 많이)
      E.forest(E.scatter(-150,150,-200,150,6.5,TR.h,(x,z,h)=>ok(x,z)&&dOut(x,z)<=70&&E.r()<(z>ZF?.55:.85),(x,z,h)=>8+E.vn(x*.1,z*.1)*6,(x,z,h)=>E.vn(x*.04+5,z*.04)<.62?1:0),{cast:true}); } // 절 둘레 소나무·활엽 숲
    K.layer(0);
    // ---- 앞마당(속세) · 대석단 ----
    E.plane(E.MAS,-2,.12,40,128,52,Q); E.plane(E.MAS,-2,.12,-42,128,108,Q); E.plane(E.MAS,20,.13,60,8,40,Q); E.plane(E.MAS,-35,.13,60,7,30,Q); // 앞마당(속세)·뒤뜰 마사토, 다리 앞 길
    // 대웅전 영역 석단(x -12~52, z 14~-56): 아래 2.6 m 자연석(큰 돌 블록), 위 장대석 띠 + 석주
    const plat=(x0,x1,z0,z1,h,y0)=>{ y0=y0||0; const w=x1-x0, d=z0-z1, cx=(x0+x1)/2, cz=(z0+z1)/2; B(cx,y0,cz,w,h,d,ST); // 몸통
      for(let x=x0+.2;x<x1-.6;x+=1.4+rnd()*1.6){ const bw=1.2+rnd()*1.4, bh=.7+rnd()*.5; const yy=y0+rnd()*(h*.4-bh); B(x+bw/2,yy,z0+.12,bw,bh,.3,rnd()<.5?RK:RK2); } // 자연석(앞면)
      for(let k=0;k<3;k++) B(cx,y0+h*.45+k*(h*.5/3),z0+.1,w,.12,.26,SG2); for(let x=x0+3;x<x1-1;x+=5.2) B(x,y0+h*.42,z0+.18,.5,h*.58,.4,SG); B(cx,y0+h-.4,z0+.16,w,.4,.34,SG); // 장대석 줄눈·석주·갑석
      for(let k=0;k<3;k++) B(x1+.1,y0+h*.45+k*(h*.5/3),cz,.26,.12,d,SG2); for(const sx of [x0-.12,x1+.12]) for(let z=z1+.2;z<z0-.6;z+=1.4+rnd()*1.6){ const bw=1.2+rnd()*1.4, bh=.7+rnd()*.5; const yy=y0+rnd()*Math.max(.1,h*.75-bh); B(sx,yy,z+bw/2,.3,bh,bw,rnd()<.5?RK:RK2); } };
    plat(-12,52,14,-56,Y1); plat(-56,-14,14,-36,Y2); B(-13,0,-11,2,Y1,50,ST);
    E.plane(E.MAS,20,Y1+.03,-21,64,70,Q); E.plane(E.MAS,-35,Y2+.03,-11,42,50,Q); // 단 위 마당(마사토)
    // 청운교(아래 17단)·백운교(위 16단): 폭 5.2, 가운데 참, 아래쪽은 홍예(반원 터널) · 돌난간
    const bridge=(x,zt,yt,nUp,nDn,w,arch)=>{ const run=.42, rise=yt/(nUp+nDn); const Lu=nUp*run, Ld=nDn*run, zL=zt+Lu, zL2=zL+2.6; // zt: 위 단 앞면 z
      for(let k=0;k<nUp;k++) B(x,0,zt+(k+.5)*run,w,yt-(k+1)*rise,run,ST); B(x,0,zL+1.3,w,yt-nUp*rise,2.6,ST); // 위 계단 + 참
      for(let k=0;k<nDn;k++){ const h=yt-nUp*rise-(k+1)*rise; B(x,0,zL2+(k+.5)*run,w,h,run,ST); }
      if(arch){ const r=Math.min(1.6,(yt-nUp*rise)*.42); const g=archG(r,w+.3); g.translate(x,r*.25,zL2+Ld*.42); Q(DR,g); B(x,0,zL2+Ld*.42,w+.3,r*.25+.05,r*2.0,DR); }
      for(const s of [-1,1]){ const xx=x+s*(w/2+.25); for(let k=0;k<=nUp;k+=4) B(xx,yt-k*rise,zt+k*run,.4,1.1,.4,SG); for(let k=0;k<=nDn;k+=4) B(xx,yt-nUp*rise-k*rise,zL2+k*run,.4,1.1,.4,SG); B(xx,yt-nUp*rise+.9,zL+1.3,.36,.2,2.8,SG);
        const g1=new T.BoxGeometry(.3,.22,Math.hypot(Lu,nUp*rise)); g1.rotateX(Math.atan2(nUp*rise,Lu)); g1.translate(xx,yt-nUp*rise/2+1.0,zt+Lu/2); Q(SG,g1); const g2=new T.BoxGeometry(.3,.22,Math.hypot(Ld,nDn*rise)); g2.rotateX(Math.atan2(nDn*rise,Ld)); g2.translate(xx,(yt-nUp*rise)/2+1.0,zL2+Ld/2); Q(SG,g2); } };
    bridge(20,14,Y1,16,17,5.2,1); bridge(-35,14,Y2,10,8,4.4,1);
    // ---- 대웅전 영역: 자하문 · 회랑 · 범영루(석주 기단)·좌경루 · 다보탑·석가탑·석등 · 대웅전 · 무설전 ----
    hall(20,12,11,6,{y:Y1,base:.5,ch:3.4,nb:3,nd:2,ov:2.2,rh:3.4,step:1.3}); // 자하문
    corr(2,12,17,'x',1,{y:Y1,w:4.6,ch:3.0,rh:2.0}); corr(36,12,16,'x',1,{y:Y1,w:4.6,ch:3.0,rh:2.0}); corr(-12,-19,56,'z',-1,{y:Y1,w:4.6,ch:3.0,rh:2.0}); corr(52,-19,56,'z',1,{y:Y1,w:4.6,ch:3.0,rh:2.0}); corr(4,-50,30,'x',-1,{y:Y1,w:4.6,ch:3.0,rh:2.0}); corr(44,-50,14,'x',-1,{y:Y1,w:4.6,ch:3.0,rh:2.0});
    { for(const [x,up] of [[-8,1],[48,0]]){ if(up){ for(let i=0;i<2;i++) for(let j=0;j<2;j++){ for(let k=0;k<5;k++) B(x-1.8+i*3.6,k*1.3,14.2+2.6-j*2.6,.9,1.3,.9,k%2?SG:SG2); } B(x,Y1,15.5,7,.3,6,SG); } // 범영루 석주(돌을 쌓은 기둥)
        hall(x,15,5.6,5.2,{y:Y1,base:.3,open:1,rail:1,ch:3.0,nb:2,nd:2,ov:1.8,rh:3.0,plain:1,up:{W:5.2,D:4.8,ch:2.6,nb:1,nd:1,rh:3.2,lift:1.4}}); } }
    hall(20,-22,20,16,{y:Y1,base:1.0,ch:3.9,nb:5,nd:5,ov:3.2,rh:5.0,step:1.4}); stairs(20,-13,Y1+1.0,Y1,3.6,4,'z',1);
    hall(20,-46,28,9,{y:Y1,base:.8,ch:3.5,nb:8,nd:3,ov:2.4,dt:1,rh:3.4,plain:1});
    // 다보탑(동, x 30): 十자 기단 + 4방 계단 + 네모 난간 + 8각 탑신·난간·지붕 · 석가탑(서, x 10): 2단 기단 + 3층 몸돌·지붕돌
    { const x=30, z=-2, y=Y1; B(x,y,z,5.6,1.0,5.6,SG); for(const s of [-1,1]){ stairs(x,z+s*2.8,y+1.0,y,1.6,3,'z',s); stairs(x+s*2.8,z,y+1.0,y,1.6,3,'x',s); } for(const [dx,dz] of [[-1,-1],[1,-1],[1,1],[-1,1]]) B(x+dx*2.1,y+1.0,z+dz*2.1,.4,1.6,.4,SG); for(const s of [-1,1]){ B(x,y+2.5,z+s*2.1,4.6,.14,.14,SG); B(x+s*2.1,y+2.5,z,.14,.14,4.6,SG); } for(const [dx,dz] of [[-1,-1],[1,-1],[1,1],[-1,1]]) B(x+dx*1.5,y+1.0,z+dz*1.5,.42,2.8,.42,SG); B(x,y+3.8,z,4.0,.4,4.0,SG);
      const o8=(r,h,yy,seg)=>{ const g=new T.CylinderGeometry(r,r,h,seg||8); g.translate(x,yy+h/2,z); Q(SG,g); }; o8(1.1,.5,y+4.2); for(let i=0;i<8;i++){ const a=i*Math.PI/4; B(x+Math.cos(a)*1.5,y+4.7,z+Math.sin(a)*1.5,.18,1.4,.18,SG); } o8(1.6,.14,y+5.9); o8(.8,1.2,y+6.0); o8(1.3,.3,y+7.2); o8(.5,.6,y+7.5); o8(1.1,.25,y+8.1); for(let k=0;k<4;k++) o8(.5-k*.1,.45,y+8.35+k*.45); } // 다보탑 ≈ 10.3 m
    { const x=10, z=-2, y=Y1; B(x,y,z,5.4,.9,5.4,SG); B(x,y+.9,z,3.8,1.2,3.8,SG); let yy=y+2.1; for(let k=0;k<3;k++){ const bw=2.4-k*.35; B(x,yy,z,bw,1.5-k*.15,bw,SG); yy+=1.5-k*.15; B(x,yy,z,bw+1.3,.5,bw+1.3,SG); B(x,yy+.5,z,bw+.6,.35,bw+.6,SG); yy+=.85; } C(x,yy,z,.26,2.4,SG,8,.14); B(x,yy+2.2,z,.6,.3,.6,SG); } // 석가탑 ≈ 10.75 m
    B(20,Y1,-8,1.6,.3,1.6,SG); C(20,Y1+.3,-8,.22,1.4,SG,8,.2); B(20,Y1+1.7,-8,1.0,.8,1.0,SG); B(20,Y1+2.5,-8,1.3,.3,1.3,SG); // 석등
    // 뒤 단: 비로전(+4) · 관음전(+7, 더 뒤) — 축대 + 계단
    plat(-10,30,-58,-74,4,Y1); plat(19,49,-73,-87,7,Y1); stairs(10,-58,Y1+4,Y1,3,8,'z',1); stairs(34,-73,Y1+7,Y1+4,3,8,'z',1);
    hall(10,-67,13,9,{y:Y1+4,base:.7,ch:3.4,nb:5,nd:3,ov:2.4,rh:3.6}); hall(34,-81,10,8,{y:Y1+7,base:.7,ch:3.2,nb:3,nd:3,ov:2.2,rh:3.6});
    // ---- 극락전 영역: 안양문 · 회랑 · 극락전 ----
    hall(-35,12,8,5,{y:Y2,base:.5,ch:3.2,nb:3,nd:2,ov:2.0,dt:1,rh:2.8,plain:1}); corr(-47.5,12,15,'x',1,{y:Y2,w:4.2,ch:2.9,rh:1.9}); corr(-23,12,10,'x',1,{y:Y2,w:4.2,ch:2.9,rh:1.9}); corr(-56,-10,44,'z',-1,{y:Y2,w:4.2,ch:2.9,rh:1.9}); corr(-14,-10,44,'z',1,{y:Y2,w:4.2,ch:2.9,rh:1.9}); corr(-35,-32,38,'x',-1,{y:Y2,w:4.2,ch:2.9,rh:1.9});
    hall(-35,-14,12,9,{y:Y2,base:.9,ch:3.6,nb:3,nd:3,ov:2.6,rh:4.0,step:1.3}); stairs(-13,-4,Y1,Y2,2.4,8,'x',-1);
    // 당간지주·앞마당 소나무·단 위 소나무
    for(const s of [-1,1]) B(20+s*.9,0,42,.5,3.6,.4,SG2); E.forest([[-58,.1,40,8,1],[-50,.1,62,8,1],[52,.1,46,7,1],[62,.1,30,9,1],[-66,.1,24,8,1],[-30,.1,70,7,1],[44,.1,68,8,1],[-60,.1,-50,9,0],[60,.1,-60,9,1],[-5,.1,-90,8,1],[-30,.1,-60,8,0]],{cast:true}); for(const [x,z,h] of [[-50,-2,5],[-52,-26,5]]) pine(x,Y2,z,h); for(const [x,z,h] of [[-8,-38,5],[48,-40,5]]) pine(x,Y1,z,h);
    finishHanok();
  }});
