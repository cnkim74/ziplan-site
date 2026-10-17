__bsigFill({"sydney":function(K){
// 실측(개략): 포디움 약 185×120 m · 콘서트홀(서, -x) 셸 정점 67 m, 조운 서덜랜드 극장(동, +x) ~57 m, 베넬롱 레스토랑(남동) ~20 m
// 각 군은 북향(항구, -z) 큰 셸 3장이 비늘처럼 겹쳐 북쪽으로 갈수록 높아지고, 남쪽 끝에 남향 작은 셸 1장이 등을 맞대고 앉음 · 셸 사이 틈은 유리(루버 월) · 모든 셸 = 반지름 75 m 구의 조각(좌우 대칭 두 조각이 능선에서 만남)
    const SH=K.col(0xf6f3ec,{roughness:.32}), SH3=K.col(0xeae6dc,{roughness:.4}), SH2=K.col(0xd9d4c8,{roughness:.5}), PK=K.col(0xcdb7a5,{roughness:.9}), PK2=K.col(0xbfa793,{roughness:.9}), PK3=K.col(0xb39a86,{roughness:.9}), GL=K.M.glass, DK=K.col(0x3a3a3c,{roughness:.6,metalness:.3}), AL=K.M.alu;
    const PD=11, R0=102; // 포디움 상면 높이 · 구 반지름(실제 75 m — 모형에선 조금 키워 날이 서게)
    const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]], crs=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]], dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
    const center=(p0,p1,p2,R)=>{ const a=sub(p1,p0), b=sub(p2,p0), ab=crs(a,b), n2=dot(ab,ab), t1=crs(ab,a), t2=crs(b,ab), bb=dot(b,b), aa=dot(a,a);
      const cc=[0,1,2].map(k=>p0[k]+(t1[k]*bb+t2[k]*aa)/(2*n2)); const rc=Math.hypot(...sub(cc,p0)); const RR=Math.max(R,rc*1.04), d=Math.sqrt(RR*RR-rc*rc), nn=Math.sqrt(n2);
      const c1=cc.map((v,k)=>v+ab[k]/nn*d), c2=cc.map((v,k)=>v-ab[k]/nn*d); return {c:c1[1]<c2[1]?c1:c2,R:RR}; };
    const slerp=(p,q,t)=>{ const w=Math.max(-1,Math.min(1,dot(p,q))), om=Math.acos(w); if(om<1e-5) return p; const s=Math.sin(om); return [0,1,2].map(k=>(Math.sin((1-t)*om)*p[k]+Math.sin(t*om)*q[k])/s); };
    // 셸 하나: cx 중심, zm 입(마우스) z, dir(+1 남향 / -1 북향), w 반폭, H 높이, L 능선 발~입 길이, ov 정점 내밈
    const shell=(cx,zm,dir,w,H,L,ov,glass)=>{ const B=[cx,PD,zm-dir*L], T=[cx,PD+H,zm+dir*ov];
      const half=s=>{ const F=[cx+s*w,PD,zm]; const {c:C,R}=center(B,F,T,R0); const unit=p=>{ const d=sub(p,C), l=Math.hypot(...d); return d.map(v=>v/l); };
        const rho=Math.sqrt(R*R-(cx-C[0])*(cx-C[0])); const ang=p=>Math.atan2(p[1]-C[1],p[2]-C[2]); let aB=ang(B), aT=ang(T); if(aT-aB>Math.PI) aB+=2*Math.PI; if(aB-aT>Math.PI) aT+=2*Math.PI;
        const ridge=v=>{ const a=aB+(aT-aB)*v; return unit([cx,C[1]+rho*Math.sin(a),C[2]+rho*Math.cos(a)]); };
        const M=[(F[0]+T[0])/2+s*w*.06,(F[1]+T[1])/2*.9,(F[2]+T[2])/2-dir*H*.26]; const rim=v=>unit([0,1,2].map(k=>(1-v)*(1-v)*F[k]+2*v*(1-v)*M[k]+v*v*T[k])); const at=(d,r)=>[C[0]+r*d[0],C[1]+r*d[1],C[2]+r*d[2]]; // 입 가장자리: 뒤로 휘어 오목한 앞날
        return {C,R,ridge,rim,at}; };
      const Lh=half(-1), Rh=half(1);
      [Lh,Rh].forEach((h,hi)=>K.surf((u,v)=>h.at(slerp(h.ridge(v),h.rim(v),u),h.R),16,24,hi?SH:SH3));
      K.surf((u,v)=>{ const s=u*2-1, h=s<0?Lh:Rh, d=h.rim(1-Math.abs(s)); return h.at(d,h.R-1.4*v); },36,1,SH2); // 입 가장자리 두께
      if(glass){ const q0=(p)=>[cx+(p[0]-cx)*.84,PD,zm-dir*4.5]; K.surf((u,v)=>{ const s=u*2-1, h=s<0?Lh:Rh, d=h.rim(1-Math.abs(s)); const p=h.at(d,h.R-.8); const q=q0(p); const k=v*v*.55+v*.45; return [p[0]+(q[0]-p[0])*k,p[1]+(q[1]-p[1])*k,p[2]+(q[2]-p[2])*k]; },32,6,GL);
        for(let i=1;i<8;i++){ const s=i/8*2-1, h=s<0?Lh:Rh, d=h.rim(1-Math.abs(s)); const p=h.at(d,h.R-.8); const q=q0(p); const n=Math.max(1,Math.round((p[1]-PD)/4)); for(let k=0;k<n;k++){ const t0=k/n,t1=(k+1)/n, k0=t0*t0*.55+t0*.45, k1=t1*t1*.55+t1*.45; const a=[p[0]+(q[0]-p[0])*k0,p[1]+(q[1]-p[1])*k0,p[2]+(q[2]-p[2])*k0], b=[p[0]+(q[0]-p[0])*k1,p[1]+(q[1]-p[1])*k1,p[2]+(q[2]-p[2])*k1]; K.b((a[0]+b[0])/2,Math.min(a[1],b[1]),(a[2]+b[2])/2,.16,Math.abs(a[1]-b[1])+.05,.16,DK); } } } };
    K.layer(0);
    // 포디움: 하단 산책로(+4) → 상단 포디움(+11) · 남쪽 기념비적 계단(폭 95 m) · 옆면 수평 띠(콘코스)
    K.b(0,0,10,132,4,230,PK2); K.b(0,4,-18,114,PD-4,150,PK); K.b(0,4,66,114,PD-4,18,PK);
    for(const s of [-1,1]){ K.b(s*57.2,4,-18,.6,1.6,150,PK3); K.b(s*57.2,8.2,-18,.6,.7,150,PK3); for(let i=0;i<18;i++) K.b(s*56.6,5.6,-90+i*8.3,.7,2.6,1.0,PK); } // 옆면 콘코스 띠 + 기둥
    K.b(0,4,-93.2,114,1.6,.6,PK3); K.b(0,8.2,-93.2,114,.7,.6,PK3); for(let i=0;i<13;i++) K.b(-52+i*8.6,5.6,-93,1.0,2.6,.7,PK);
    const NS=20, run=30/NS, rise=(PD-4)/NS; for(let i=0;i<NS;i++) K.b(0,4,105-run*(i+.5),96,(i+1)*rise,run,PK);
    for(const s of [-1,1]) K.b(s*54,4,90,6,PD-4+.6,30,PK2); // 계단 옆 날개
    K.b(0,4,118,114,.3,12,PK3); // 앞 광장(포코트) 포장
    K.b(0,PD,-18,110,.08,150,PK2); for(const s of [-1,1]) for(let i=0;i<8;i++) K.c(s*53.5,PD,-80+i*20,.14,3,AL,8); // 상부 광장 포장·가로등
    // 콘서트홀(서, -x): 북향 3장(비늘처럼 겹쳐 북으로 갈수록 높음) + 남향 1장(등을 맞댐)
    const CH=-28, JS=30;
    K.layer(1); shell(CH,-12,-1,19,32,40,6,true); shell(CH,50,1,16,22,26,6,true);
    K.layer(2); shell(CH,-40,-1,23,44,52,8,true);
    K.layer(3); shell(CH,-70,-1,27,56,62,10,true);
    // 조운 서덜랜드 극장(동, +x): 조금 작게
    K.layer(1); shell(JS,-12,-1,16,27,34,6,true); shell(JS,44,1,13,19,22,5,true);
    K.layer(2); shell(JS,-38,-1,19,37,44,8,true);
    K.layer(3); shell(JS,-66,-1,22,47,54,9,true);
    // 베넬롱 레스토랑(남동): 작은 셸 2장(남향·북향)
    K.layer(1); shell(48,78,1,9,14,16,4,true); shell(48,58,-1,7,11,13,3,true);
  }});
