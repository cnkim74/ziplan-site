__bsigFill({"eiffel":function(K){
// 실측(개략): 다리 바깥 폭 125 m · 1층 57.6 m(70.7 m 각) · 2층 115.7 m(~41 m 각) · 중간 플랫폼 196 m · 3층 276 m(16.5 m 각) · 안테나 끝 330 m · 1층 아래 장식 아치 반지름 39 m · 각 다리 격자 기둥 4개 · 3단계로 위로 갈수록 밝은 갈색
    const I1=K.col(0x4e3a2b,{roughness:.6,metalness:.3}), I2=K.col(0x5f4a37,{roughness:.6,metalness:.3}), I3=K.col(0x735c45,{roughness:.6,metalness:.3}), GW=K.M.glassW, PV=K.M.pave, ST=K.M.stone, DK=K.M.dark;
    const T=K.T, UP=new T.Vector3(0,1,0);
    const bar=(a,b,r,mat)=>{ const dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2]; const L=Math.hypot(dx,dy,dz); const m=K.c(0,0,0,r,L,mat,6); m.position.set((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2); m.quaternion.setFromUnitVectors(UP,new T.Vector3(dx/L,dy/L,dz/L)); return m; };
    const PR=[[0,62.5],[57.6,35.4],[115.7,20.6],[196,11],[276,7.8],[300,5.2]];
    const Wf=y=>{ for(let i=0;i<PR.length-1;i++){ const [y0,w0]=PR[i],[y1,w1]=PR[i+1]; if(y<=y1||i===PR.length-2){ const t=(y-y0)/(y1-y0); return Math.exp(Math.log(w0)*(1-t)+Math.log(w1)*t); } } return 5; };
    const S=y=>y<57.6?12.5-(12.5-5.8)*y/57.6:5.8-(5.8-4.3)*(y-57.6)/58.1;
    const mat=y=>y<57.6?I1:y<115.7?I2:I3;
    K.layer(0);
    K.b(0,-.3,0,180,.3,180,PV); for(const sx of [-1,1]) for(const sz of [-1,1]) K.b(sx*50,0,sz*50,28,1.0,28,ST); // 샹 드 마르스·기초
    const LV=[0,14,28,42,57.6,77,96,115.7];
    for(const sx of [-1,1]) for(const sz of [-1,1]){
      const P=(y,ix,iz)=>{ const w=Wf(y), s=S(y); return [sx*(w-s)+ix*s,y,sz*(w-s)+iz*s]; };
      for(let i=0;i<LV.length-1;i++){ const y0=LV[i],y1=LV[i+1]; const M=mat(y0); K.layer(y0<57.6?0:1);
        for(const ix of [-1,1]) for(const iz of [-1,1]) bar(P(y0,ix,iz),P(y1,ix,iz),y0<57.6?.95:.72,M);
        for(const y of (i===0?[y0,y1]:[y1])){ bar(P(y,-1,-1),P(y,1,-1),.38,M); bar(P(y,1,-1),P(y,1,1),.38,M); bar(P(y,1,1),P(y,-1,1),.38,M); bar(P(y,-1,1),P(y,-1,-1),.38,M); }
        for(const ix of [-1,1]){ bar(P(y0,ix,-1),P(y1,ix,1),.3,M); if(ix===sx) bar(P(y0,ix,1),P(y1,ix,-1),.3,M); }
        for(const iz of [-1,1]){ bar(P(y0,-1,iz),P(y1,1,iz),.3,M); if(iz===sz) bar(P(y0,1,iz),P(y1,-1,iz),.3,M); } } }
    // 1층 아래 장식 아치 4
    K.layer(0);
    { const pts=[]; const R=39,Ri=35.5; for(let i=0;i<=22;i++){ const a=i/22*Math.PI; pts.push([R*Math.cos(a),-R*Math.sin(a)]); } for(let i=22;i>=0;i--){ const a=i/22*Math.PI; pts.push([Ri*Math.cos(a),-Ri*Math.sin(a)]); }
      for(let f=0;f<4;f++){ const ry=f*Math.PI/2; const m=K.ex(pts,2.6,I1,[Math.sin(ry)*31.5,13,Math.cos(ry)*31.5]); m.rotation.order='YXZ'; m.rotation.set(Math.PI/2,ry,0); } }
    // 1층(57.6)·2층(115.7) 플랫폼
    K.layer(1);
    const sq=h=>[[-h,-h],[h,-h],[h,h],[-h,h]];
    K.ex(sq(35.35),5.2,I1,[0,52.2,0],{shell:.7}); K.ex(sq(35.35),2.4,I2,[0,57.4,0],{shell:17}); K.ex(sq(35.35),1.1,I2,[0,59.8,0],{shell:.5});
    for(const [x,z] of [[0,27],[0,-27],[27,0],[-27,0]]) K.b(x,59.8,z,x?12:30,3.6,x?30:12,GW);
    K.ex(sq(20.5),3.0,I2,[0,112.7,0],{shell:.6}); K.ex(sq(20.5),2.4,I2,[0,115.7,0],{shell:9}); K.ex(sq(20.5),1.0,I3,[0,118.1,0],{shell:.4});
    for(const [x,z] of [[0,16],[0,-16],[16,0],[-16,0]]) K.b(x,118.1,z,x?6:20,3.2,x?20:6,GW);
    // 2층 위 단일 격자 축 (115.7 → 300)
    K.layer(2);
    const UV=[115.7,140,165,196,225,250,276,300];
    for(let i=0;i<UV.length-1;i++){ const y0=UV[i],y1=UV[i+1]; const Q=(y,ix,iz)=>{ const w=Wf(y)*.92; return [ix*w,y,iz*w]; };
      for(const ix of [-1,1]) for(const iz of [-1,1]) bar(Q(y0,ix,iz),Q(y1,ix,iz),.6,I3);
      bar(Q(y1,-1,-1),Q(y1,1,-1),.3,I3); bar(Q(y1,1,-1),Q(y1,1,1),.3,I3); bar(Q(y1,1,1),Q(y1,-1,1),.3,I3); bar(Q(y1,-1,1),Q(y1,-1,-1),.3,I3);
      for(const ix of [-1,1]){ bar(Q(y0,ix,-1),Q(y1,ix,1),.25,I3); bar(Q(y0,ix,1),Q(y1,ix,-1),.25,I3); }
      for(const iz of [-1,1]){ bar(Q(y0,-1,iz),Q(y1,1,iz),.25,I3); bar(Q(y0,1,iz),Q(y1,-1,iz),.25,I3); } }
    K.ex(sq(11),1.4,I3,[0,196,0],{shell:4}); // 중간 플랫폼
    K.layer(3);
    K.b(0,276,0,18,1.2,18,I3); K.b(0,277.2,0,16,6.5,16,GW); K.b(0,283.7,0,17,.8,17,I3); K.b(0,284.5,0,10,3.5,10,I3); // 3층 전망대
    K.c(0,288,0,1.1,16,I3,8,{r2:.7}); K.c(0,304,0,.5,26,DK,6,{r2:.15}); // 안테나 → 330 m
  }});
