__bsigFill({"ronchamp":function(K){
// 개략: 내부 약 25×13 m · 남벽(+z) 두께 하부 3.7→상부 1.4 m(바깥면이 안으로 기움), 벽 높이 서쪽 ~6 → 동남 모서리(뱃머리) ~10.5 m · 지붕 두께 서 0.9→동남 2.5 m(짙은 회색, 동남으로 치솟음) · 큰 탑 22 m(서남, 반원 후드) · 작은 탑 15 m 2개(북벽, 등을 맞댐) · 동쪽(+x) 야외 제단 · +z=남(정면), +x=동
    const Wh=K.col(0xf4f2ea,{roughness:.95}), Rf=K.col(0x6e6b63,{roughness:.95}), Rd=K.col(0x4e4b45,{roughness:.9}), DKw=K.col(0x3a3732,{roughness:.9}), ST=K.M.stone, WD=K.M.wood, RED=K.col(0xb5452c,{roughness:.6}), CG=[K.col(0xe8c35a),K.col(0x5b8fd6),K.col(0xd2563b),K.col(0x6fae6a)];
    // 평면 제어점 [x, z, 벽두께, 지붕 내밈, 벽 높이] — 시계방향(남서→남→남동 뱃머리→동→북동→북→북서→서)
    const P=[[-10.8,4.6,3.0,1.2,6.4],[-5.5,6.4,3.4,1.4,7.0],[0,7.3,3.5,1.6,7.8],[6,6.8,3.2,1.9,8.8],[11,5.2,2.4,2.6,10.0],[13.6,3.6,1.4,3.6,10.6],[12.2,.2,1.1,4.0,10.2],[11.4,-3.2,1.1,3.6,9.4],[12.4,-6.4,1.0,2.2,8.4],[11.6,-7.6,.9,.9,7.8],[6,-7.5,.9,.6,7.2],[0,-7.2,.9,.6,6.8],[-6,-6.8,.9,.6,6.4],[-10.2,-6.0,1.0,.6,6.1],[-12.6,-3.4,1.1,.5,5.9],[-13.4,.2,1.3,.5,6.0],[-12.6,2.8,2.0,.8,6.2]];
    const N=P.length, cr=(a,b,c,d,t)=>.5*(2*b+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t);
    const O0=u=>{ const s=(((u%1)+1)%1)*N, i=Math.floor(s), t=s-i, g=k=>P[((k%N)+N)%N], a=g(i-1),b=g(i),c=g(i+1),d=g(i+2); return [0,1,2,3,4].map(k=>cr(a[k],b[k],c[k],d[k],t)); };
    const O=u=>{ const p=O0(u), q=O0(u+.002), r=O0(u-.002); const tx=q[0]-r[0], tz=q[1]-r[1], L=Math.hypot(tx,tz)||1; return {x:p[0],z:p[1],t:p[2],off:p[3],h:p[4],nx:-tz/L,nz:tx/L}; };
    const cl=v=>Math.max(0,Math.min(1,v));
    // 지붕 밑면 높이: 서쪽 6.2 → 동남 뱃머리 11, 가운데 살짝 처짐 / 두께 서 .9 → 동남 2.6
    const under=(x,z)=>{ const ux=cl((x+14)/28), vz=cl((z+8)/16); return 6.0+4.4*Math.pow(ux,2.2)+1.6*ux*ux*vz+.4*vz-.5*Math.sin(Math.PI*ux)*(1-.6*vz); };
    const thk=(x,z)=>{ const ux=cl((x+14)/28), vz=cl((z+8)/16); return .9+1.4*Math.pow(ux,1.5)+.4*ux*vz; };
    const NU=120, outOff=(o,v)=>o.t>1.6?o.t/2-v*(o.t-1.3)/2:o.t/2;
    K.layer(0);
    K.surf((u,v)=>{ const o=O(u); return [v*o.x,.05,v*o.z]; },NU,1,DKw); // 바닥
    K.surf((u,v)=>{ const o=O(u), f=outOff(o,v); return [o.x+o.nx*f,v*o.h,o.z+o.nz*f]; },NU,5,Wh); // 바깥 벽면(남벽은 안으로 기움)
    K.surf((u,v)=>{ const o=O(u); return [o.x-o.nx*o.t/2,(1-v)*o.h,o.z-o.nz*o.t/2]; },NU,1,Wh); // 안쪽 벽면
    K.surf((u,v)=>{ const o=O(u), f=outOff(o,1), k=f*(1-v)-o.t/2*v; return [o.x+o.nx*k,o.h,o.z+o.nz*k]; },NU,1,Wh); // 벽 윗면
    // 남벽 창(제각각, 깊이 들어간 어두운 구멍 + 색유리 몇 장) · 남쪽 법랑 문 · 동벽 성모상 창 · 북쪽 문
    const win=(u,y,w,hh,mat,deep)=>{ const o=O(u), f=outOff(o,(y+hh/2)/o.h), k=f-(deep||.5); K.b(o.x+o.nx*k,y,o.z+o.nz*k,w,hh,1.0,mat||DKw,Math.atan2(o.nx,o.nz)); };
    const SW=[[.07,1.3,.6,.6],[.11,3.3,.5,2.3],[.15,.9,1.5,1.0],[.19,5.2,.5,.5],[.23,2.4,.5,.5],[.26,1.0,.9,.6],[.30,5.3,1.1,.8],[.33,3.2,.5,.5],[.37,1.8,1.0,.9],[.41,4.5,.5,2.2],[.45,.9,.5,.5],[.49,2.8,2.0,1.7],[.55,6.3,.6,.6],[.59,1.2,1.0,1.0],[.63,4.3,.5,.5],[.67,2.5,.6,.9],[.71,5.8,.9,.6],[.75,.9,1.4,1.5],[.79,3.6,.5,.5],[.83,7.0,.6,.6],[.87,2.0,1.7,2.1],[.91,5.3,.5,1.0],[.95,.9,.6,.6],[.1,5.6,.5,.5],[.44,6.6,.5,.5],[.53,.9,.6,.6],[.69,3.8,.5,.5]];
    SW.forEach(([s,yy,w,hh],i)=>{ win(s*4.6/N,yy,w,hh,DKw); if(i%3===0) win(s*4.6/N,yy+.1,w*.6,hh*.6,CG[i%4],.2); });
    win(.025*4.6/N,0,2.3,2.7,RED,.3); // 남쪽 법랑 문(채색)
    win((5+1.4)/N,3.6,.6,.7,DKw); win((5+2.3)/N,5.2,1.1,1.4,Wh,.1); win((5+2.3)/N,5.3,.9,1.1,DKw,.0); win((5+3.2)/N,1.7,.5,.5,DKw); // 동벽: 성모상 창
    win((10+2.0)/N,0,1.3,2.3,WD,.2); // 북쪽 작은 문
    // 탑 3개: 흰 원통(위가 기울어 열림) + 반구 후드(뒤 절반) + 어두운 개구
    const tower=(cx,cz,r,H,dir)=>{ const drop=r*1.1;
      K.surf((u,v)=>{ const a=u*Math.PI*2, yt=H-drop*Math.max(0,Math.cos(a-dir)); return [cx+r*Math.cos(a),v*yt,cz+r*Math.sin(a)]; },56,4,Wh);
      K.c(cx,H-drop-.5,cz,r-.1,drop+.5,DKw,32); // 개구 안쪽 어두운 통
      K.surf((u,v)=>{ const a=dir+Math.PI/2+u*Math.PI, e=v*Math.PI/2; return [cx+r*Math.cos(e)*Math.cos(a),H+r*.9*Math.sin(e),cz+r*Math.cos(e)*Math.sin(a)]; },30,8,Wh); // 후드
      K.surf((u,v)=>{ const a=dir+Math.PI/2+u*Math.PI; const rr=r*(1-v); return [cx+rr*Math.cos(a),H+.02,cz+rr*Math.sin(a)]; },30,2,Wh); }; // 후드 밑 막음
    tower(-13.0,1.8,3.5,20,-Math.PI/2); // 큰 탑(서남, 개구는 북쪽)
    tower(-5.6,-7.6,1.8,13.5,Math.PI); tower(-2.0,-7.6,1.8,13.5,0); // 작은 탑 2개(북벽, 등을 맞댐 — 서향·동향)
    // 동쪽 야외 예배 공간(지붕 아래): 단·제단·설교단·십자가·성가대석
    K.b(17.5,0,-1,10,.2,13,ST); K.b(17,.2,-1,8,.14,10,ST);
    K.b(16.2,.34,-.8,2.3,1.0,1.0,ST); // 야외 제단
    K.b(14,2.4,-5.4,1.8,1.1,1.8,Rf); K.b(14.6,.34,-5.4,.5,2.1,.5,Rf); for(let i=0;i<5;i++) K.b(15.4+i*.35,.34+i*.4,-7.0,.5,.4,1.0,Rf); // 설교단+계단
    K.b(22,0,-8.6,.22,7,.22,WD); K.b(22,4.9,-8.6,2.2,.22,.22,WD); // 십자가
    K.b(16,.34,4.2,3,.45,.5,Rf); K.b(19.5,.34,3.4,3,.45,.5,Rf);
    // 서쪽: 가고일(물받이 주둥이)과 조각 수조
    K.b(-15.0,5.2,-2.2,3.4,.55,.7,Rf); K.c(-18.2,0,-2.2,1.9,1.1,Rf,6); K.c(-18.2,1.1,-2.2,1.6,.08,K.M.water,6); K.c(-18.2,1.1,-2.2,.5,1.6,Rf,4); K.pyr(-16.9,1.1,-1.2,1.0,1.3,Rf);
    // 북동쪽 평화의 피라미드 · 종 걸이 틀
    for(let i=0;i<5;i++) K.b(27,i*.7,-15,7-i*1.3,.7,7-i*1.3,ST);
    for(const x of [-24,-22.4,-20.8]) K.b(x,0,10,.18,5.2,.18,K.M.dark); K.b(-22.4,5.2,10,3.6,.18,.18,K.M.dark); for(const x of [-23.2,-21.6]) K.c(x,4.2,10,.35,.7,K.M.alu,12,{r2:.22});
    // 지붕: 짙은 회색 두꺼운 셸 — 윗면·밑면·테두리 띠, 동남 뱃머리로 치솟음
    K.layer(1);
    const RO=u=>{ const o=O(u); return [o.x+o.nx*o.off,o.z+o.nz*o.off]; };
    K.surf((u,v)=>{ const [px,pz]=RO(u), x=px*v, z=-.3+(pz+.3)*v; return [x,under(x,z)+thk(x,z),z]; },NU,8,Rf);
    K.surf((u,v)=>{ const [px,pz]=RO(u), x=px*v, z=-.3+(pz+.3)*v; return [x,under(x,z),z]; },NU,6,Rd);
    K.surf((u,v)=>{ const [px,pz]=RO(u), y=under(px,pz); return [px,y+v*thk(px,pz),pz]; },NU,1,Rf);
    K.b(-14.6,under(-14.6,-2.2)+thk(-14.6,-2.2)-.2,-2.2,1.4,.4,1.8,Rf); // 지붕 물 빠지는 홈 마감
  }});
