__bsigFill({"parthenon":function(K){
// 실측(개략): 스타일로베이트 30.88×69.5 m · 크레피도마 3단(각 0.52 m) · 도리아 기둥 8×17=46주 높이 10.43 m, 하부 지름 1.9 m, 상부 1.48 m, 20 플루트, 엔타시스(가운데 부풂) · 주간 4.30 m(모서리 좁힘)
// 엔타블러처: 아키트레이브 1.35 + 프리즈(트리글리프·메토프) 1.35 + 코니스 0.6 · 페디먼트 높이 3.43 m · 셀라 21.7×59 m(프로나오스·오피스토도모스 각 6주) · 지붕은 남아 있지 않음(유적) · +z=동쪽 정면(입구)
    const ST=K.col(0xe8dfc9,{roughness:.8}), ST2=K.col(0xdfd3b9,{roughness:.85}), SD=K.col(0xc9b89a,{roughness:.9}), DK=K.col(0x2e2a26,{roughness:1}), RK=K.col(0xbfb39c,{roughness:.95}), RK2=K.col(0xa89c86,{roughness:.95});
    const X8=[-14.4,-10.72,-6.42,-2.14,2.14,6.42,10.72,14.4], Z17=[-33.75,-30.07,-25.77,-21.48,-17.18,-12.89,-8.59,-4.3,0,4.3,8.59,12.89,17.18,21.48,25.77,30.07,33.75];
    const SY=1.56, CH=9.6, TOP=SY+CH+.45+.38;
    // 도리아 기둥: 엔타시스(1/3 높이 최대) + 20 플루트(반지름 변조) 회전면
    const shaft=(x,z,r0,r1,h,y)=>K.surf((u,v)=>{ const a=u*Math.PI*2; const e=1+.045*Math.sin(Math.PI*Math.pow(v,.8))*(1-v*.5); const r=(r0+(r1-r0)*v)*e*(1+.035*Math.cos(a*20)); return [x+Math.cos(a)*r,y+v*h,z+Math.sin(a)*r]; },60,9,ST);
    const col=(x,z,r,r2,h,y)=>{ y=y===undefined?SY:y; h=h||CH; shaft(x,z,r,r2,h,y); K.c(x,y+h,z,r2*.98,.45,ST2,20,{r2:r*1.12}); K.b(x,y+h+.45,z,r*2.25,.38,r*2.25,ST2); };
    const up=(m,ry)=>{ m.rotation.order='YXZ'; m.rotation.set(Math.PI/2,ry||0,0); return m; };
    K.layer(0);
    K.b(0,-.1,0,96,.1,60,RK); K.b(-44,-.1,10,10,.9,22,RK2); K.b(38,-.1,-18,12,.6,14,RK2); // 아크로폴리스 바위면 + 바위 더미
    for(let i=0;i<3;i++) K.b(0,i*.52,0,69.5+(2-i)*1.4,.52,30.88+(2-i)*1.4,ST); // 크레피도마
    for(let i=0;i<8;i++) for(let j=0;j<17;j++){ if(i>0&&i<7&&j>0&&j<16) continue; const corner=(i===0||i===7)&&(j===0||j===16); col(X8[i],Z17[j],corner?.98:.95,.74); }
    // 셀라(유적: 서쪽 끝 벽은 높고, 긴 벽은 낮게 남음) + 프로나오스·오피스토도모스 기둥 6+6
    K.b(0,SY,-17,21.7,CH+.8,20,ST2); K.b(10.25,SY,8,1.2,CH+.8,30,ST2); K.b(-10.25,SY,8,1.2,CH+.8,30,ST2); // 서쪽 셀라 블록(오피스토도모스·서실) + 긴 벽
    K.b(0,SY,23.2,21.7,CH+.8,1.4,ST2); K.b(0,SY,23.9,4.9,8.6,.3,DK); K.b(0,SY,-27.7,21.7,CH+.8,1.4,ST2); K.b(0,SY,-27.0,3.6,7.2,.3,DK); // 동·서 셀라 벽 + 문
    K.b(0,SY,-3,19.3,.3,25,SD); // 셀라 바닥(지붕 없음)
    for(const s of [-1,1]){ for(const x of [-8.6,-5.2,-1.7,1.7,5.2,8.6]) col(x,s*27.5,.78,.62,CH,SY); }
    // ---- 1: 엔타블러처(아키트레이브 · 트리글리프 프리즈 · 코니스) ----
    K.layer(1);
    const RECT=(w,d)=>[[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2]];
    K.ex(RECT(30.88,69.5),1.35,ST,[0,TOP,0],{shell:2.0}); K.ex(RECT(30.48,69.1),1.35,SD,[0,TOP+1.35,0],{shell:1.8}); // 아키트레이브·프리즈(링 — 안은 하늘)
    const tri=(x,z,w,d)=>K.b(x,TOP+1.35,z,w,1.35,d,ST);
    { const tx=[]; for(let i=0;i<8;i++){ tx.push(X8[i]); if(i<7) tx.push((X8[i]+X8[i+1])/2); } tx[0]=-15.0; tx[tx.length-1]=15.0; for(const s of [-1,1]) for(const x of tx) tri(x,s*34.65,.85,.2);
      const tz=[]; for(let j=0;j<17;j++){ tz.push(Z17[j]); if(j<16) tz.push((Z17[j]+Z17[j+1])/2); } tz[0]=-34.3; tz[tz.length-1]=34.3; for(const s of [-1,1]) for(const z of tz) tri(s*15.34,z,.2,.85); }
    K.ex(RECT(31.9,70.5),.6,ST,[0,TOP+2.7,0],{shell:2.6}); for(const s of [-1,1]) K.b(0,TOP+2.9,s*35.4,31.9,.4,.4,ST2); // 코니스(링) + 전면 돌출 띠
    // ---- 2: 페디먼트(라킹 코니스 + 팀파눔 벽, 지붕 없음 — 유적) ----
    K.layer(2);
    const PY=TOP+3.3;
    for(const s of [-1,1]){ const m=K.ex([[-16.3,0],[16.3,0],[0,-3.65]],.8,ST,[0,PY,s*34.6],{shell:.7}); up(m,s>0?0:Math.PI); K.ex([[-15.2,0],[15.2,0],[0,-3.2]],.5,SD,[0,PY,s*33.4]).rotation.set(Math.PI/2,s>0?0:Math.PI,0,'YXZ'); }
    for(const [x,h] of [[-12,1.0],[-8.5,1.6],[-5,2.2],[-1.5,2.9],[2,2.6],[5.5,2.0],[9,1.4],[12.5,.9]]) K.b(x,PY+.05,34.1,1.1,h,.6,ST2); // 동쪽 팀파눔 조각군(개략)
    for(const [x,h] of [[-11,1.1],[-6,2.0],[-1,2.9],[4,2.4],[9,1.5]]) K.b(x,PY+.05,-34.1,1.3,h,.6,ST2);
    for(const s of [-1,1]) K.b(0,PY+.05,s*34.6,31.9,.5,.9,ST2); // 지붕선 흔적(가로 대리석 보)
  }});
