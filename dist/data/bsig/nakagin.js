__bsigFill({"nakagin":function(K){
// 실측(개략): 코어 2개(A 13층 약 54 m · B 11층 약 47 m) 철근콘크리트, 각 변 약 6 m · 캡슐 140개 2.5×4×2.5 m, 둥근 창 Ø1.3 m, 코어 각 면에 2개씩 반층(1.95 m) 엇갈려 부착, 볼트 4개 · 1~2층 공용 기단(입구 로비·상가·필로티) · 상부 기계실
    const C=K.col(0x9b9a95,{roughness:.9}), CP=K.col(0xdcdbd5,{roughness:.6}), CP2=K.col(0xd3d2cb,{roughness:.6}), GW=K.M.glassW, DK=K.M.dark, AL=K.M.alu, CT=K.col(0x8e8d88,{roughness:.9}), RIM=K.col(0x5b5b58,{roughness:.6});
    const disk=(x,y,z,r,a,mat)=>K.surf((u,v)=>{ const t=u*Math.PI*2, rr=v*r; return [x+Math.cos(t)*rr*Math.cos(a),y+Math.sin(t)*rr,z-Math.cos(t)*rr*Math.sin(a)]; },18,1,mat);
    const PITCH=3.6, Y0=9.0, CORE=6.2, CAP=[2.5,2.5,4.0];
    // ---- 0: 기단(2층 공용부) ----
    K.layer(0);
    K.b(0,0,0,24,3.6,15,GW); for(let i=0;i<7;i++) for(const z of [-8.4,8.4]) K.c(-12+i*4,0,z,.3,3.6,C,10); K.b(0,3.6,0,28,4.4,18,C); K.b(0,3.6,0,28.2,.5,18.2,CT);
    for(let i=0;i<12;i++) K.b(-11+i*2,5.2,9.05,1.5,1.4,.15,GW); for(let i=0;i<7;i++) for(const s of [-1,1]) K.b(s*14.05,5.2,-6+i*2,.15,1.4,1.4,GW);
    K.b(0,3.3,10.8,7,.35,4.2,C); for(const x of [-3,3]) K.c(x,0,12.6,.14,3.3,AL,8); K.b(0,0,9.5,6,.18,1.2,CT); K.b(0,0,10.6,6.4,.1,1.2,CT); // 입구 캐노피·계단
    K.b(0,8.0,0,27,.9,17,C); // 기단 파라펫(옥상)
    // ---- 코어 + 캡슐 ----
    const towers=[[-6.6,-1.5,13,1],[6.6,1.5,11,3]]; // [x,z,캡슐 단수, 마주보는 면 s]
    towers.forEach(([tx,tz,nl,face],ti)=>{ const H=Y0+nl*PITCH+2.6; K.layer(1); K.b(tx,0,tz,CORE,H,CORE,C); K.b(tx,H,tz,4.4,2.4,4.4,C); K.b(tx,H+2.4,tz,2.0,1.6,2.0,CT); K.c(tx+1.6,H+2.4,tz-1.4,.12,3.5,AL,6);
      for(let l=0;l<nl;l++){ K.layer(1+Math.min(l,6)); const yl=Y0+l*PITCH;
        for(const s of [0,2]){ const a=s*Math.PI/2; K.b(tx+Math.sin(a)*3.02,yl+.6,tz+Math.cos(a)*3.02,.45,1.5,.08,GW,a); } // 코어 계단 슬릿창
        for(let s=0;s<4;s++) for(let k=0;k<2;k++){
          if((l*5+s*3+k*7)%11===0) continue; if(s===face&&k!==ti) continue; if(l===nl-1&&(s+k)%3===0) continue;
          const a=s*Math.PI/2, nx=Math.sin(a), nz=Math.cos(a), txx=Math.cos(a), tzz=-Math.sin(a), off=(k?1:-1)*1.42; const y=yl+((s+k)%2)*PITCH/2;
          const cx=tx+nx*(CORE/2+CAP[2]/2)+txx*off, cz=tz+nz*(CORE/2+CAP[2]/2)+tzz*off;
          K.b(cx,y,cz,CAP[0],CAP[1],CAP[2],(l+s+k)%2?CP:CP2,a); disk(cx+nx*(CAP[2]/2+.02),y+1.3,cz+nz*(CAP[2]/2+.02),.72,a,RIM); disk(cx+nx*(CAP[2]/2+.06),y+1.3,cz+nz*(CAP[2]/2+.06),.6,a,GW); } }
    });
    for(const l of [3,7]) K.b(0,Y0+l*PITCH+1.2,0,7.4,.5,1.4,C); // 두 코어를 잇는 다리
  }});
