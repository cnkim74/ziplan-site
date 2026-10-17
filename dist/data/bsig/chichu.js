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
  }});
