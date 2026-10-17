__bsigFill({"sumiyoshi":function(K){
// 실측(개략): 외부 3.6×14.1 m, 2층(층고 3.1, 전체 6.4) · 세 칸 4.7 m(앞 방 / 중정 / 뒤 방) · 정면(+z)은 콘크리트 벽에 문 하나(폭 .9, 높이 2.1, 오른쪽에 치우침) · 양옆은 오래된 목조 나가야(2층 기와)가 붙어 있음
    const C=K.col(0xcfcac2,{roughness:.9}), C2=K.col(0xbfbab2,{roughness:.9}), W=3.6,D=14.1,fh=3.1,t=.2, GL=K.col(0xc3d6dc,{roughness:.05,metalness:.5,transparent:true,opacity:.3,depthWrite:false}), DK=K.col(0x242424), WD=K.M.wood, TL=K.col(0x4f5257,{roughness:.8}), NB=K.col(0xd7cfc0,{roughness:1}), WDd=K.col(0x6e5540,{roughness:.9});
    const zs=[-D/2,-D/2+4.7,-D/2+9.4,D/2];
    K.layer(0);
    K.b(0,-.02,0,W+22,.04,D+10,K.M.pave); K.b(0,-.3,0,W,.3,D,C);
    // 이웃 목조 나가야(양옆, 2층 기와) — 집이 끼어 있는 맥락
    for(const s of [-1,1]){ const x=s*(W/2+3.4); K.b(x,0,-.3,6.4,4.8,13.4,NB); K.b(x,0,D/2-.45+.02,6.4,4.8,.1,WDd); for(let i=0;i<9;i++) K.b(x-2.8+i*.7,.2,D/2-.36,.12,4.4,.1,K.col(0x8a7560)); K.b(x,2.6,D/2-.3,6.6,.15,1.0,TL); K.roofGable(x,4.8,-.3,7.0,14.4,1.1,TL,'x'); K.b(x,4.7,D/2-.2,7.0,.2,1.2,TL); }
    for(let f=0;f<2;f++){ K.layer(f); const y=f*fh;
      K.b(-W/2+t/2,y,0,t,fh,D,C); K.b(W/2-t/2,y,0,t,fh,D,C); K.b(0,y,zs[0]+t/2,W,fh,t,C); // 장벽·뒷벽
      if(f===0){ K.b(-.5,y,zs[3]-t/2,2.6,fh,t,C); K.b(1.45,y,zs[3]-t/2,.7,fh,t,C); K.b(1.1,2.1,zs[3]-t/2,.9,fh-2.1,t,C); K.b(1.1,0,zs[3]-.45,.9,2.1,.06,DK); } // 정면: 문 하나(안으로 들어간 어두운 틈)
      else K.b(0,y,zs[3]-t/2,W,fh,t,C);
      K.b(0,y,zs[1],W-2*t,fh,.08,GL); K.b(0,y,zs[2],W-2*t,fh,.08,GL); for(const z of [zs[1],zs[2]]) for(const x of [-1.6,-.6,.6,1.6]) K.b(x,y,z,.08,fh,.1,C2); // 중정 쪽 유리벽
      K.b(0,y+fh-.25,zs[0]+2.35,W-2*t,.25,4.7,C); K.b(0,y+fh-.25,zs[2]+2.35,W-2*t,.25,4.7,C);
      if(f===1){ K.b(.6,y,zs[1]+2.35,1.0,.15,4.7,C); K.b(1.15,y+.15,zs[1]+2.35,.05,.9,4.7,K.M.rail); K.b(.05,y+.15,zs[1]+2.35,.05,.9,4.7,K.M.rail); } // 2층 다리
      else { K.b(0,-.3,zs[1]+2.35,W-2*t,.3,4.7,K.col(0xb9b3a8)); for(let i=0;i<9;i++) K.b(-1.1,y+.3*i,zs[1]+.4+i*.5,.9,.06,.5,C2); K.b(-1.1,y,zs[1]+.3,.9,.3,.3,C2); K.b(1.0,0,zs[1]+3.6,1.2,.06,1.2,K.col(0x7f9a6a)); } } // 중정: 계단·작은 화단
    K.layer(2); K.b(0,2*fh,zs[0]+2.35,W,.3,4.7,C); K.b(0,2*fh,zs[2]+2.35,W,.3,4.7,C); K.b(-W/2+t/2,2*fh,zs[1]+2.35,t,.3,4.7,C); K.b(W/2-t/2,2*fh,zs[1]+2.35,t,.3,4.7,C); }});
