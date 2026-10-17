__bsigFill({"habitat":function(K){
// 실측(개략): 모듈 11.7×5.3×3.0 m(38×17.5×10 ft) · 12층(36 m) · 3개 피라미드 군(각 ~70 m, 전체 ~230 m) — 모듈을 앞·뒤 두 '다리'로 계단형 후퇴시켜 각 옥상이 테라스
// 상자 사이 틈·반 모듈 엇갈림·90° 돌린 모듈(캔틸레버) · 엘리베이터 코어 3 · 6·10층 보행 거리와 군 사이 다리 · 밝은 회갈색 프리캐스트 · +z 쪽이 긴 계단식 정면
    const CS=[K.col(0xd6d2ca,{roughness:.92}),K.col(0xcbc7bf,{roughness:.92}),K.col(0xdedad2,{roughness:.92})], ED=K.col(0xbdb8ae,{roughness:.9}), GW=K.M.glassW, RL=K.M.rail, CC=K.col(0xc4c0b8,{roughness:.9}), PV=K.M.pave, DK=K.col(0x6a6a66,{roughness:.8}), GRN=K.M.leaf2;
    const MW=11.7, MD=5.3, MH=3.0, GX=12.4, NL=12, ZF0=26, SF=3.2, ZB0=-19, SB=1.5, CL=[[-80,0],[0,8],[80,-2]], NN=[5,5,5,4,4,3,3,3,2,2,1,1];
    const hash=(a,b,c)=>{ let h=(a*73856093)^(b*19349663)^(c*83492791); h=Math.imul(h^(h>>>13),1274126177); return ((h^(h>>>16))>>>0)/4294967296; };
    K.layer(0); K.b(0,-.1,2,250,.1,80,PV); K.b(0,0,44,250,.3,8,K.col(0x58595c)); for(let i=0;i<9;i++) K.tree(-100+i*25,38,6+(i%3)); // 기단 · 앞 도로
    CL.forEach(([cx,cz],ci)=>{
      const mods=[]; // {f,x,z,leg,rot,on}
      for(let f=0;f<NL;f++){ const n=NN[f], sh=(f%2)*GX/2;
        for(let i=0;i<n;i++){ const x0=cx+(i-(n-1)/2)*GX+sh;
          for(const leg of (f>=9?[0]:[1,-1])){ const r=hash(ci,f,i*2+(leg>0?0:1)), r2=hash(ci+7,f*3,i); const x=x0+(r2-.5)*2.2; const rot=leg>0&&f>=1&&f<=8&&r>=.86&&r<.93; const z=leg>0?ZF0+cz-f*SF:leg<0?ZB0+cz+f*SB:cz+(ZF0-f*SF+ZB0+f*SB)/2; const on=f<2||r<.84||rot; mods.push({f,x,z,leg,rot,on,r}); } } }
      // 지지 확인(위→아래): 아래 겹치는 모듈이 없으면 가장 가까운 것을 켬
      for(let f=NL-1;f>0;f--) for(const m of mods){ if(m.f!==f||!m.on) continue; const below=mods.filter(q=>q.f===f-1&&(q.leg===m.leg||m.leg===0||q.leg===0)&&Math.abs(q.x-m.x)<MW*.8); if(!below.length) continue; if(!below.some(q=>q.on)) below.sort((a,b)=>Math.abs(a.x-m.x)-Math.abs(b.x-m.x))[0].on=true; }
      const above=(m)=>mods.some(q=>q.f===m.f+1&&q.on&&Math.abs(q.x-m.x)<MW*.6&&Math.abs(q.z-m.z)<MD);
      for(const m of mods){ if(!m.on) continue; K.layer(Math.min(7,Math.floor(m.f*7/NL))); const y=m.f*MH, mat=CS[(m.f+Math.round(m.x/GX)+ci)%3];
        const zc=m.rot?m.z+(MW-MD)/2-1.2:m.z, w=(m.rot?MD:MW)-.35, d=(m.rot?MW:MD)-.3; K.b(m.x,y,zc,w,MH-.1,d,mat); // 상자(틈을 두고)
        const zf=zc+(m.leg>=0?1:-1)*d/2; // 노출면 창(2개, 안쪽으로 조금 들어감)
        if(m.leg>=0&&!m.rot){ K.b(m.x-1.6,y+.7,zf+.02,4.2,1.6,.12,GW); } else if(m.rot) K.b(m.x,y+.7,zf+.02,3.2,1.6,.12,GW); else K.b(m.x,y+.7,zf-.02,3.4,1.6,.12,GW);
                // 테라스: 위에 상자가 있어도 앞쪽 3 m는 비므로 난간 · 가끔 식재
        if(m.leg>=0){ const r=hash(ci,m.f,Math.round(m.x)); if(r<.65) K.b(m.x,y+MH,zf-.15,w-.3,1.0,.05,RL); else K.b(m.x,y+MH,zf-.25,w-.3,.9,.3,DK); if(r>.4&&r<.55) K.b(m.x+(r-.5)*8,y+MH,zf-1.0,2.2,.7,1.0,GRN); }
        else if(!above(m)) K.b(m.x,y+MH,zc,w-.3,.9,.05,RL); }
      // 코어(엘리베이터·계단) 3 + 6층·10층 보행 거리(두 다리 사이)
      K.layer(0); K.b(cx+GX*1.5,0,cz-3,4.4,NL*MH+2,4.8,CC); K.b(cx-GX*2.2,0,cz-2,3.8,7*MH+1,3.8,CC);
      K.layer(3); K.b(cx,6*MH,cz-1,GX*4.6,.4,3.2,CC); for(const s of [-1,1]) K.b(cx,6*MH+.4,cz-1+s*1.5,GX*4.6,1.0,.05,RL);
      K.layer(5); K.b(cx,10*MH,cz,GX*2.4,.4,3.0,CC);
    });
    // 군 사이 다리(6층)
    K.layer(3); for(const [x,z] of [[-40,4],[40,3]]){ K.b(x,6*MH,z,34,.45,3,CC); for(const s of [-1,1]) K.b(x,6*MH+.45,z+s*1.45,34,1.0,.05,RL); }
  }});
