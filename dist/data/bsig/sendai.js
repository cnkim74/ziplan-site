__bsigFill({"sendai":function(K){
// 개략: 50×50 m, 7층 층고(추정) 7.0/5.0/4.8/5.0/4.9/4.9/4.9 = 36.5 · 바닥판 .4 m 강판 샌드위치(흰 테두리) · 튜브 13개: 모서리 근처 큰 것 4개(r 3~4.5), 작은 것 9개(r 1~1.8), 흰 강관 격자(와이어프레임)·살짝 기울어짐 · +z=남(정면, 조젠지도리) 유리 더블스킨
    const W=50, hs=[7.0,5.0,4.8,5.0,4.9,4.9,4.9]; const WF=K.col(0xffffff,{roughness:.5}), TB=K.col(0xe9eef0,{roughness:.3,metalness:.2,transparent:true,opacity:.1,depthWrite:false}), GL=K.col(0xa9c0c8,{roughness:.1,metalness:.2,transparent:true,opacity:.14,depthWrite:false}), PL=K.col(0xf7f7f5,{roughness:.5}), MU=K.col(0xd9dcdf,{roughness:.4,metalness:.5}), FL=K.col(0x9f9d97,{roughness:.9}), CE=K.col(0x4e5256,{roughness:.9});
    const tubes=[[-17,-17,4.2,.6],[16,-18,3.6,.4],[-18,16,3.2,.5],[17,17,4.5,.6],[0,-19,1.6,.3],[-19,-2,1.4,.3],[19,2,1.8,.3],[2,19,1.5,.3],[-7,-6,1.2,.2],[8,-4,1.1,.2],[-6,8,1.3,.2],[6,10,1.0,.2],[0,1,1.2,.2]]; // [x,z,r,기울기 폭]
    let y=0;
    K.b(0,-.02,0,W+40,.04,W+34,K.M.pave);
    for(let f=0;f<7;f++){ K.layer(f); const h=hs[f], y0=y;
      if(f>0){ K.b(0,y0,0,W,.4,W,PL); K.b(0,y0+.4,0,W-.2,.03,W-.2,FL); }
      else K.b(0,0,0,W,.12,W,FL);
      K.b(0,y0+h-.12,0,W-.3,.1,W-.3,CE); // 어두운 천장(튜브 대비)
      const gy=f>0?y0+.4:.12, gh=h-(f>0?.4:.12);
      for(const [x,z,w,d] of [[0,W/2,W,.06],[0,-W/2,W,.06],[W/2,0,.06,W],[-W/2,0,.06,W]]) K.b(x,gy,z,w,gh,d,GL);
      K.b(0,gy,W/2+.7,W+1.4,gh,.05,GL); for(let k=0;k<=10;k++) K.b(-W/2+k*W/10,gy,W/2+.7,.12,gh,.12,MU); // 남쪽 더블스킨 + 멀리언
      for(let k=0;k<=6;k++){ K.b(-W/2-.03,gy,-W/2+k*W/6,.1,gh,.1,MU); K.b(W/2+.03,gy,-W/2+k*W/6,.1,gh,.1,MU); }
      K.b(0,gy,W/2+.7,W+1.4,.3,.6,PL); K.b(0,gy+gh-.3,W/2+.7,W+1.4,.3,.6,PL); // 더블스킨 층별 걸이판
      tubes.forEach(([x,z,r,k],i)=>{ const dx=Math.sin(f*1.3+i)*k, dz=Math.cos(f*.9+i*2)*k, r2=r*(1+.12*Math.sin(f+i)), rt=r2*(1-.1*Math.cos(f+i)), nb=i<4?10:6, bw=i<4?.32:.22, cx=x+dx, cz=z+dz;
        for(const ph of [0,1]) K.surf((u,v)=>{ const sN=u*nb*2, a=sN/(nb*2)*Math.PI*2, tri=Math.abs(((sN+ph)%2+2)%2-1), yy=y0+(f>0?.4:.12)+(h-(f>0?.4:.12))*tri, rr=r2+(rt-r2)*tri, wv=(v-.5)*bw; return [cx+rr*Math.cos(a)-wv*Math.sin(a),yy,cz+rr*Math.sin(a)+wv*Math.cos(a)]; },nb*8,1,WF); // 지그재그 격자 리본 2개 = X 격자
        const m2=K.c(cx,y0,cz,r2-.08,h,TB,i<4?18:10,{r2:rt-.08}); m2.castShadow=false; });
      y+=h; }
    K.layer(7); K.b(0,y,0,W,.5,W,PL); K.b(0,y+.5,0,W-.4,.04,W-.4,FL); K.b(-12,y+.5,-14,10,2.2,8,K.col(0xcfd3d6)); K.b(12,y+.5,14,8,1.6,6,K.col(0xcfd3d6));
    tubes.slice(0,4).forEach(([x,z,r])=>{ K.c(x,y+.5,z,r*.9,1.2,TB,18); });
    for(const x of [-18,-6,6,18]) K.tree(x,W/2+6,8);
  }});
