__bsigFill({"cityhall":function(K){
// 출처: 신청사 지하 5층 지상 13층, 연면적 90,788 ㎡, 유걸 2008년 설계경기 당선 — 한국어 위키백과 「서울특별시청」 · 구청사 1926 경성부청사(국가등록문화유산), 2012 서울도서관 개관 — 서울도서관
// 추정 치수: 구청사 70 × 25 m 4층 18 m, 중앙 탑 28 m · 신청사 90 × 50 m 높이 55 m(13층), 파도 유리는 55 m 높이에서 앞으로 26 m 내밈(구청사 지붕 위) · 수직 정원 폭 40 m 높이 28 m · 서울광장 타원 130 × 90 m
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
    const PV=flat(K.M.pave), GR=flat(K.M.grass), STO=K.col(0xcfc8bb,{roughness:.9}), STO2=K.col(0xb7b0a3,{roughness:.9}), WIN=K.col(0x2f3a44,{roughness:.3,metalness:.4}), SLB=K.col(0xe4e1da,{roughness:.8}), STL=K.col(0x8e949a,{roughness:.35,metalness:.6}), GRW=K.col(0x4f8a3d,{roughness:1}), GRW2=K.col(0x3f7030,{roughness:1}), LF=K.M.leaf2, TILE=K.col(0x6e6a66,{roughness:.9});
    // 파도 유리: 반투명 + 다이아그리드 선 텍스처
    const cv=document.createElement('canvas'); cv.width=128; cv.height=128; const g2=cv.getContext('2d'); g2.fillStyle='rgba(150,190,210,1)'; g2.fillRect(0,0,128,128); g2.strokeStyle='#4c5a66'; g2.lineWidth=3; g2.beginPath(); g2.moveTo(0,0); g2.lineTo(128,128); g2.moveTo(128,0); g2.lineTo(0,128); g2.moveTo(0,64); g2.lineTo(128,64); g2.stroke(); const tex=new T.CanvasTexture(cv); tex.encoding=T.sRGBEncoding; tex.wrapS=tex.wrapT=T.RepeatWrapping; const WAVE=new T.MeshStandardMaterial({color:0xffffff,map:tex,metalness:.4,roughness:.12,transparent:true,opacity:.55,depthWrite:false,side:T.DoubleSide}); WAVE.userData.k='cityhallwave';
    const GLB=K.col(0x9cc0d2,{roughness:.1,metalness:.5,transparent:true,opacity:.6,depthWrite:false});
    K.layer(0);
    B(0,-.02,40,200,.05,260,PV); { const g=new T.CylinderGeometry(1,1,.25,40); g.scale(65,1,45); g.translate(0,0,110); Q(GR,g); } for(const [x,z] of [[-80,70],[80,70],[-85,130],[85,130],[-40,165],[40,165]]) tree(x,0,z,8,LF); // 서울광장(잔디 타원)
    // ---- 구청사(1926): 석조 4층, 수평 띠, 창 격자, 중앙 돌출부 + 탑(시계탑), 뒤 ㄷ자 날개 ----
    { const W=70, D=25, H=18, zc=22; B(0,0,zc,W,H,D,STO); B(0,0,zc,W+.6,1.2,D+.6,STO2); for(let f=0;f<4;f++){ B(0,4.5*(f+1)-.3,zc,W+.3,.35,D+.3,STO2); for(let i=0;i<16;i++){ const x=-W/2+2.6+i*4.3; if(Math.abs(x)<7) continue; B(x,4.5*f+1.2,zc+D/2+.05,1.9,2.6,.15,WIN); B(x,4.5*f+1.2,zc-D/2-.05,1.9,2.6,.15,WIN); } }
      B(0,0,zc+D/2+1.5,16,H+1.5,3.5,STO); for(let f=0;f<4;f++) for(const x of [-4.5,0,4.5]) B(x,4.5*f+1.2,zc+D/2+3.1,2.2,2.6,.15,WIN); B(0,H+1.5,zc+D/2+.5,10,9.5,8,STO); B(0,H+11,zc+D/2+.5,10.6,1.2,8.6,STO2); B(0,H+12.2,zc+D/2+.5,6,3,5,STO2); B(0,H+15.2,zc+D/2+.5,3,1.5,3,STO); C(0,H+16.5,zc+D/2+.5,.12,4,STL,6,.1); // 중앙 현관부 + 탑
      for(const x of [-3.2,3.2]) B(x,H+3,zc+D/2+4.6,2.0,2.4,.2,WIN); for(const x of [-2.4,-.8,.8,2.4]) C(x,0,zc+D/2+4.2,.45,5.5,STO2,10,.45); B(0,5.5,zc+D/2+4.2,8,.8,3,STO2); // 시계창·현관 기둥
      B(0,H,zc,W-1,.8,D-1,TILE); for(const s of [-1,1]) B(s*(W/2-6),0,zc-D/2-6,12,H-3,12,STO); } // 지붕 · 뒤 날개
    // ---- 신청사(2012): 뒤 유리 매스(13층) + 앞으로 덮치는 파도 유리(위로 갈수록 26 m 내밈) ----
    { const W=90, D=48, H=55, zc=-28, NF=13, FH=H/NF; B(0,0,zc,W,H,D,GLB); for(let f=1;f<=NF;f++) B(0,f*FH-.25,zc,W+.2,.5,D+.2,SLB); B(0,H,zc,W+.4,1.2,D+.4,SLB); for(const s of [-1,1]){ B(s*(W/2+.1),0,zc+D/2,.4,H,.6,STL); B(s*(W/2+.1),0,zc-D/2,.4,H,.6,STL); } // 몸체·층 띠·모서리 프레임
      const z0=zc+D/2; const front=(x,y)=>{ const t=y/H; return z0+26*Math.pow(t,2.4)*(.86+.14*Math.cos(x/W*Math.PI))+2.2*Math.sin(t*Math.PI); };
      S(WAVE,(u,v)=>{ const x=-W/2+W*u, y=H*v; return [x,y,front(x,y),u*12,v*7]; },36,20); // 파도 유리(앞면)
      for(const s of [-1,1]) S(WAVE,(u,v)=>{ const y=H*v, x=s*W/2; return [x,y,z0+(front(x,y)-z0)*u,u*4,v*7]; },8,16); // 옆 삼각 유리
      S(SLB,(u,v)=>{ const x=-W/2+W*u; return [x,H+1.2*v,front(x,H)+.1,u,v]; },24,1); S(SLB,(u,v)=>{ const x=-W/2+W*u, y=H; return [x,y+1.2,z0+(front(x,H)-z0)*v,u,v]; },24,4); // 파도 위 지붕판(얇게)
      for(let i=0;i<=12;i++){ const x=-W/2+W*i/12; for(let k=0;k<16;k++){ const y=H*k/16, y2=H*(k+1)/16; const za=front(x,y), zb=front(x,y2); const L=Math.hypot(y2-y,zb-za); const g=new T.BoxGeometry(.3,L,.3); g.rotateX(-Math.atan2(zb-za,y2-y)); g.translate(x,(y+y2)/2,(za+zb)/2-.2); Q(STL,g); } } // 유리 뒤 철골 세로 부재
      for(let k=1;k<NF;k++) B(0,k*FH,z0+(front(0,k*FH)-z0)*.5,W-2,.35,(front(0,k*FH)-z0)+.5,SLB); // 파도 안 층 바닥(앞으로 나아감)
      B(0,0,z0+1.0,40,28,.8,GRW); for(let i=0;i<60;i++){ const x=-19+rnd()*38, y=1+rnd()*26; B(x,y,z0+1.6,1.2+rnd()*2,.8+rnd()*1.4,.5,i%2?GRW2:GRW); } // 수직 정원(7층 높이) — 유리 뒤
      B(0,0,z0+6,36,.5,10,SLB); for(const x of [-10,0,10]) B(x,0,z0+11,5,4.5,.3,GLB); } // 로비 바닥·입구
    flush();
  }});
