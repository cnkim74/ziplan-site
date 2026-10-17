__bsigFill({"teshima":function(K){
// 실측(개략): 물방울 평면 약 60×40 m(한쪽 끝이 뾰족) · 정점 4.5 m의 아주 낮은 흰 콘크리트 셸 · 타원 구멍 2개(약 8×6 m·6×5 m, 유리 없음) · 옆에 같은 꼴의 작은 카페·숍 셸(약 20×14 m) · 바다를 내려다보는 계단식 논 사이 언덕 · 구불구불한 콘크리트 산책로
    const C=K.col(0xeeeae2,{roughness:.75}), C2=K.col(0xe3dfd6,{roughness:.9}), PV=K.col(0xd6d1c6,{roughness:.9}), GS=K.M.grass;
    // 셸: (각 θ, 반지름 비 v) 매개 — 물방울 윤곽 · 납작한 돔 프로필 · 구멍 안은 바닥까지 꺼짐
    const shell=(cx,cz,A,B,H,rot,holes)=>{ const cr=Math.cos(rot), sr=Math.sin(rot);
      K.surf((u,v)=>{ const th=u*Math.PI*2; const px=A*v*Math.cos(th)*(1+.12*Math.cos(th)), pz=B*v*Math.sin(th)*(1-.28*Math.cos(th)); let y=H*Math.pow(Math.max(0,1-Math.pow(v,2.4)),.75); for(const [hx,hz,hr,hd] of holes){ const q=Math.pow((px-hx)/hr,2)+Math.pow((pz-hz)/hd,2); if(q<1) y=.08; else if(q<1.25) y=Math.min(y,H*.55+(q-1)*4*H*.45); } return [cx+px*cr-pz*sr,y,cz+px*sr+pz*cr]; },96,26,C,{thick:.22});
      K.surf((u,v)=>{ const th=u*Math.PI*2; const px=A*Math.cos(th)*(1+.12*Math.cos(th))*(.985+v*.015), pz=B*Math.sin(th)*(1-.28*Math.cos(th))*(.985+v*.015); return [cx+px*cr-pz*sr,.03+v*.08,cz+px*sr+pz*cr]; },96,1,C2); // 바닥 테두리
    };
    K.layer(0);
    K.layer(1);
    shell(0,0,30,21,4.5,.12,[[-9,-3,4.2,3.2],[11,5,3.2,2.6]]); // 본관 셸 + 구멍 2
    shell(-22,34,10,7,2.6,-.4,[[1,0,2.0,1.6]]); // 카페·숍 셸
    K.layer(0);
    { const pts=[[-55,22],[-38,30],[-26,27],[-12,22],[-4,13],[4,10],[16,12],[30,18],[48,12]]; for(let i=0;i<pts.length-1;i++){ const [ax,az]=pts[i],[bx,bz]=pts[i+1]; const dx=bx-ax,dz=bz-az,L=Math.hypot(dx,dz); K.b((ax+bx)/2,0,(az+bz)/2,L+1,.12,2.2,PV,-Math.atan2(dz,dx)); } } // 구불구불한 산책로
    for(const [x,z,h] of [[-40,-22,5],[44,-20,5],[40,26,4],[-44,34,5]]) K.tree(x,z,h);
  }});
