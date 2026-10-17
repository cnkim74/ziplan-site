__bsigFill({"bangju":function(K){
// 출처: 2009년 3월 16일 건립, 소재는 나무와 징크(아연) 금속, 인공 수조를 만들어 건물이 물 위에 떠 있는 듯 — ktriptips.com/kor/tourspot/2663244 · 설계 이타미 준(유동룡), 2010 한국건축가협회 건축물대상, 서까래가 벽 기둥으로 이어지는 목구조·낮은 창으로 빛 — brunch.co.kr/@dreamnplanner/219
// 추정 치수: 본체 36×13 m, 처마 높이 4.3 m, 용마루 13.6 m(약 50° 경사), 삼각 금속판 밑변 1.3 m × 11단(단마다 반 칸 엇갈림, 판마다 조금씩 다른 기울기 → 하늘빛이 다르게 반사), 수반 64×40 m, 진입 다리 폭 2.6 m·길이 24 m, 나무 현관 상자 5×4×3.6 m
    const T=K.T; const SH=K.col(0xe4e8ec,{metalness:.5,roughness:.22}), ZNb=K.col(0x5e6367,{metalness:.5,roughness:.5}), RG=K.col(0xc3c8cc,{metalness:.5,roughness:.35}), WD=K.col(0x6a4a30,{roughness:.85}), WD2=K.col(0x3f2c1d,{roughness:.9}), WDl=K.col(0x8a6440,{roughness:.8}), Cc=K.M.conc, GLc=K.M.glass, GS=K.M.grass, DKw=K.col(0x222a2e,{roughness:.9}), WT=K.M.water, CB=K.col(0xbdb8ae,{roughness:1}), PV=K.M.gravel;
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    const inst=(geo,mat,items,cast)=>{ if(!items.length) return null; const m=new T.InstancedMesh(geo,mat,items.length); const M4=new T.Matrix4(),Q=new T.Quaternion(),S=new T.Vector3(),V=new T.Vector3(),E=new T.Euler(); items.forEach((it,i)=>{ V.set(it[0],it[1],it[2]); E.set(it[7]||0,it[3]||0,it[8]||0); Q.setFromEuler(E); S.set(it[4]||1,it[5]||1,it[6]||1); M4.compose(V,Q,S); m.setMatrixAt(i,M4); }); m.instanceMatrix.needsUpdate=true; return put(m,cast); };
    const boxG=(w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2,0); return g; };
    const bx=(x,y,z,w,h,d)=>{ const g=new T.BoxGeometry(w,h,d); g.translate(x,y+h/2,z); return g; };
    const merge=(geos,mat,cast)=>{ if(!geos.length) return null; let n=0; const G=geos.map(g=>g.index?g.toNonIndexed():g); for(const g of G) n+=g.attributes.position.count; const Pa=new Float32Array(n*3),Na=new Float32Array(n*3),Ua=new Float32Array(n*2); let o=0; for(const g of G){ Pa.set(g.attributes.position.array,o*3); Na.set(g.attributes.normal.array,o*3); if(g.attributes.uv) Ua.set(g.attributes.uv.array,o*2); o+=g.attributes.position.count; } const g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(Pa,3)); g.setAttribute('normal',new T.BufferAttribute(Na,3)); g.setAttribute('uv',new T.BufferAttribute(Ua,2)); return put(new T.Mesh(g,mat),cast); };
    let seed=3; const rnd=()=>{ seed=(seed*9301+49297)%233280; return seed/233280; };
    const L=36, W=13, EH=3.9, RH=13.6, OV=1.4, HZ=W/2+OV, HR=RH-EH; // 길이·폭·처마·용마루·처마 내밈
    K.layer(0);
    K.b(0,-.3,0,104,.33,76,GS); K.b(0,.02,0,64,.06,40,DKw); { const wm=new T.MeshStandardMaterial({color:0x3a4e58,roughness:.06,metalness:.55,transparent:true,opacity:.9}); wm.color.convertSRGBToLinear(); const w=new T.Mesh(new T.PlaneGeometry(64,40),wm); w.rotation.x=-Math.PI/2; w.position.set(0,.12,0); put(w,false); } { const gs=[]; for(const [x,z,w,d] of [[0,-20.2,64.8,.4],[0,20.2,64.8,.4],[-32.2,0,.4,40.8],[32.2,0,.4,40.8]]) gs.push(bx(x,.02,z,w,.22,d)); merge(gs,CB,false); } // 잔디 · 어두운 바닥의 수반 · 가장자리 턱
    K.b(0,.12,0,L+3,.9,W+3,Cc); K.b(0,1.02,0,L+2,.08,W+2,Cc); // 콘크리트 기단(물 위 1 m)
    // 몸체: 짙은 나무 속벽 + 유리 + 세로 나무 미늘창(인스턴스)
    K.b(0,1.1,0,L,EH-1.1,W-.4,WD2); for(const s of [-1,1]) K.b(0,1.1,s*(W/2-.1),L-.6,EH-1.4,.08,GLc);
    inst(boxG(.12,EH-1.5,.46),WD,(()=>{ const a=[]; for(const s of [-1,1]) for(let i=0;i<=64;i++) a.push([-L/2+.4+i*(L-.8)/64,1.1,s*(W/2+.16)]); return a; })());
    for(const s of [-1,1]) K.b(0,EH-.45,s*(W/2+.1),L+.4,.25,.7,WD2); // 처마 밑 나무 띠
    // 양 끝 유리 박공 + 나무 멀리온
    for(const s of [-1,1]){ K.pedim(s*(L/2+.06),EH-.3,0,.1,HR-.2,W+2*OV-.6,GLc); K.b(s*(L/2+.06),1.1,0,.1,EH-1.4,W-.5,GLc); { const gs=[]; for(let k=-2;k<=2;k++){ const zz=k*2.7; const hh=EH-.3+(HR-.2)*(1-Math.abs(zz)/(HZ-.3))-1.1; gs.push(bx(s*(L/2+.1),1.1,zz,.14,Math.max(1,hh),.14)); } merge(gs,WD2); } }
    // 나무 현관 상자(동쪽 끝 남면에서 돌출) + 긴 진입 다리(수반을 건너는 나무 데크)
    K.b(12,1.02,W/2+2.2,5,3.6,4.4,WD2); K.b(12,1.02,W/2+4.42,2.2,2.6,.08,GLc); K.b(12,4.62,W/2+2.2,5.4,.3,4.8,ZNb);
    K.b(12,.12,22,2.8,.9,24,Cc); K.b(12,1.02,22,2.6,.08,24,K.M.deck); inst(boxG(.08,1.0,.08),WDl,(()=>{ const a=[]; for(let i=0;i<=11;i++) for(const s of [-1,1]) a.push([12+s*1.25,1.1,10.5+i*2.1]); return a; })()); { const gs=[]; for(const s of [-1,1]) gs.push(bx(12+s*1.25,2.05,22,.08,.06,23.6)); merge(gs,WDl,false); }
    K.b(12,0,37,6,.06,6,PV); K.b(30,0,34,30,.06,10,PV); // 다리 앞 자갈 마당·주차
    // 지붕(층 1): 바탕 박공 + 용마루 + 삼각 금속판 비늘(인스턴스 1개)
    K.layer(1);
    for(const s of [-1,1]) K.surf((u,v)=>[-L/2-OV+(L+2*OV)*u,EH-.3+(HR+.1)*v,s*HZ*(1-v)],2,2,ZNb,{thick:.22}); K.b(0,RH-.3,0,L+2*OV+.4,.45,.8,RG); // 바탕 지붕 두 장(끝은 유리 박공이 보이게)
    { const Bw=1.3, NR=11, pitch=Math.hypot(HR,HZ)/NR, th=pitch*1.14; const sh=new T.Shape(); sh.moveTo(-Bw/2,0); sh.lineTo(Bw/2,0); sh.lineTo(0,th); sh.closePath(); const g=new T.ExtrudeGeometry(sh,{depth:.05,bevelEnabled:false});
      const items=[]; const nx=Math.round((L+2*OV)/Bw);
      for(const s of [-1,1]){ const rx=s>0?-Math.PI/4:-Math.PI*3/4; // 판을 지붕 경사면에 눕힘
        for(let r=0;r<NR;r++){ for(let k=0;k<=nx;k++){ for(const half of [0,1]){ // half 0: 꼭짓점 위쪽(밑변이 단 아래), 1: 꼭짓점 아래쪽(밑변이 단 위)
          const x=-L/2-OV+(k+half*.5)*Bw; if(x>L/2+OV+.1) continue; const vb=(half?r+1:r)/NR; const up=half===0; const localUp=(s>0)===up; const rz=localUp?0:Math.PI;
          const d=.05+.045*(NR-r)+(half?.02:0); const n=[0,Math.SQRT1_2,s*Math.SQRT1_2]; const y=EH-.3+HR*vb+n[1]*d, z=s*HZ*(1-vb)+n[2]*d;
          items.push([x,y,z,(rnd()-.5)*.2,1,1,1,rx+(rnd()-.5)*.14,rz]); } } } }
      inst(g,SH,items,false); }
    // 주변: 낮은 곰솔 몇 그루(수반 밖)
    for(const [x,z,h] of [[-44,-26,5],[-46,16,6],[46,-24,5],[48,20,5],[-28,-32,5],[30,-34,6]]) K.tree(x,z,h);
  }});
