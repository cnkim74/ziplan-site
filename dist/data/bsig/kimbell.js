__bsigFill({"kimbell":function(K){
// 실측(개략): 사이클로이드 볼트 폭 6.7 × 길이 30.5 m, 볼트 사이 평지붕 띠 2.1 m · 3단(남북) × 6열 = 18 자리 중 16개 볼트(중앙단 서쪽 2자리는 진입 마당) · 서쪽(+z) 양끝 볼트 + 중앙단 마당 앞 볼트는 열린 포르티코, 그 뒤가 유리 입구
// 벽 상단(볼트 기점) 3.9 m, 볼트 솟음 2.13 m · 트래버틴 벽·노출콘크리트 볼트·납 지붕 · 서쪽(+z)이 진입 정면: 자갈 마당·호랑가시 숲·반사 못
    const C=K.M.conc, TR=K.M.stone.clone(), GW=K.M.glassW, GR=K.M.gravel; TR.color.set(0xe9dec7); TR.color.convertSRGBToLinear();
    const VW=6.7, GAP=2.1, VL=30.5, SP=4.1, A=VW/(2*Math.PI), PL=.3, XP=[-(VL+GAP),0,VL+GAP], ZC=j=>-25.35+VW/2+j*(VW+GAP);
    K.layer(0);
    K.b(0,0,-2,110,PL,64,TR); // 기단 테라스
    for(let r=0;r<3;r++) for(let j=0;j<6;j++){ const xc=XP[r], zc=ZC(j); const miss=r===1&&j>=4, open=(r!==1&&j===5)||(r===1&&j===3); if(miss) continue;
      K.layer(0);
      for(const e of [-1,1]) for(const s of [-1,1]) K.b(xc+e*(VL/2-.35),PL,zc+s*(VW/2-.35),.6,SP-PL,.6,C); // 모서리 기둥 4
      if(!open){ for(const e of [-1,1]) K.b(xc+e*(VL/2-.3),PL,zc,.35,SP-PL,VW-1.2,TR); // 양끝 트래버틴 벽
        if(j===0) K.b(xc,PL,zc-VW/2+.2,VL-1.2,SP-PL,.35,TR); if(j===4&&r!==1) K.b(xc,PL,zc+VW/2-.2,VL-1.2,SP-PL,.35,TR); // 동쪽 긴 벽 · 포르티코에 면한 벽
        if(j===5) K.b(xc,PL,zc+VW/2-.2,VL-1.2,SP-PL,.35,TR); // 서쪽 벽
        if(r===1&&j===2){ K.b(xc,PL,zc+VW/2-.2,VL-1.2,SP-PL,.1,K.M.glass); for(let k=0;k<=6;k++) K.b(xc-VL/2+.6+k*(VL-1.2)/6,PL,zc+VW/2-.2,.14,SP-PL,.18,K.M.dark); } } // 중앙 포르티코 뒤 유리 입구 벽
      // 볼트 사이 평지붕 띠(설비) · 가장자리 보
      if(j<5&&!(r===1&&j===3)) K.b(xc,SP-.45,zc+VW/2+GAP/2,VL,.45,GAP+.3,C); if(j===0) K.b(xc,SP-.45,zc-VW/2-.15,VL,.45,.4,C); if(j===5||(r===1&&j===3)) K.b(xc,SP-.45,zc+VW/2+.15,VL,.45,.4,C);
      K.layer(1);
      K.surf((u,v)=>{ const t=u*Math.PI*2; return [xc-VL/2+v*VL,SP+A*(1-Math.cos(t)),zc-VW/2+A*(t-Math.sin(t))]; },26,2,C,{thick:.3}); // 사이클로이드 볼트
      for(const e of [-1,1]) K.surf((u,v)=>{ const t=u*Math.PI*2, ay=A*(1-Math.cos(t)); return open?[xc+e*(VL/2),SP+ay-.3*v,zc-VW/2+A*(t-Math.sin(t))]:[xc+e*(VL/2-.3),SP-.3+v*(ay+.3),zc-VW/2+A*(t-Math.sin(t))]; },26,1,open?C:TR); // 양끝: 트래버틴 아치 판 / 열린 볼트는 아치 테두리 띠
      K.b(xc,SP+2*A+.02,zc,VL-1.4,.1,.9,GW); // 정점 천창 슬릿
      if(!open) for(const e of [-1,1]) K.surf((u,v)=>{ const t=u*Math.PI*2, ay=A*(1-Math.cos(t)), zt=zc-VW/2+A*(t-Math.sin(t)); const k=1-.28*v/Math.max(.3,A); return [xc+e*(VL/2-.2),SP+ay*k,zc+(zt-zc)*(1-.28*v/(VW/2))]; },26,1,GW); // 아치 가장자리 빛 틈
    }
    K.layer(0);
    for(let r=0;r<2;r++) K.b((XP[r]+XP[r+1])/2,SP-.45,-3.5,GAP+.3,.45,44,C); K.b(0,SP-.45,-16.4,GAP+.3,.45,18,C); // 단 사이 띠
    for(let r=0;r<2;r++){ K.b((XP[r]+XP[r+1])/2,PL,-25.35+.2,GAP,SP-PL,.35,TR); }
    // 진입 마당(자갈 + 호랑가시 숲) · 포르티코 앞 반사 못 · 서쪽 잔디·가로수
    K.b(0,PL,16.5,VL-1.4,.06,17,GR); for(let i=0;i<6;i++) for(let k=0;k<4;k++) K.tree(-12.5+i*5,10.5+k*4,4.2);
    for(const r of [0,2]){ const x=XP[r]; K.b(x,0,34,VL*.7,.5,8,TR); K.water(x,.52,34,VL*.7-.6,7.4); }
    K.b(0,0,33,10,.32,16,TR); for(let i=0;i<5;i++) for(const s of [-1,1]) K.tree(s*(7+i*1.5),38+i*2.5,5.5);
    for(let i=0;i<8;i++) K.tree(-50+i*14,-36,7);
  }});
