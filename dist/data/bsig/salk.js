__bsigFill({"salk":function(K){
// 개략(추정): 연구동 2개 각 75×20 m, 광장 위 3개 층(실험실 2 + 설비층) ≈ 14 m · 광장 폭 27 m(서재 탑 사이), 길이 75 · 서재 탑 5개/측: 플라자층은 열린 열주, 위 2개 서재층, 바다(서) 쪽 모서리 45° 티크 창 · 광장 y=.8, 서쪽 끝 물길이 아래 수반으로 떨어짐 · +z=동(진입·유칼립투스 숲), -z=서(바다)
    const C=K.col(0xcfc9bd,{roughness:.9}), C2=K.col(0xbfb8ab,{roughness:.9}), TR=K.M.stone.clone(), TK=K.col(0x8e6a42,{roughness:.7}), GW=K.M.glassW, GL=K.M.glass, WT=K.M.water; TR.color.setHex(0xeadfc6).convertSRGBToLinear();
    const PZ=.8, LL=75, XT=13.5, TD=6, XL0=21, XL1=41, TZ=[-27,-13.5,0,13.5,27];
    // 서재 탑 몸체: 사각 2개 + 45° 회전 상자(모서리 삼각형) — 바다(-z) 쪽 안 모서리가 45°로 깎임
    const tw=(s,tz,y,h,m)=>{ const xi=s*XT; K.b(s*(XT+4.5),y,tz,3,h,7,m); K.b(s*(XT+1.5),y,tz+1.5,3,h,4,m); K.b(s*(XT+2.25),y,tz-1.25,4.2426,h,2.1213,m,s*Math.PI/4); };
    K.layer(0);
    K.b(0,0,0,70,.04,110,K.M.pave);
    // 광장(트래버틴) + 물길 + 동쪽 샘 + 서쪽 끝 낙수·아래 수반·낮은 테라스
    K.b(0,0,0,2*XT+2*TD+1,PZ,LL,TR); K.b(0,PZ,0,2*XT-.2,.06,LL-.4,TR);
    K.b(0,PZ+.07,-1,.35,.04,LL-6,WT); K.b(0,PZ,34,1.6,.45,1.6,TR); K.b(0,PZ+.45,34,1.1,.06,1.1,WT);
    K.b(0,.02,-LL/2-.1,.35,PZ,.1,WT); K.b(0,0,-LL/2-6,18,.35,10,TR); K.water(0,.37,-LL/2-6,17,9); K.b(0,0,-LL/2-9,2*XT+2*TD,.06,8,TR);
    for(const s of [-1,1]) for(let i=0;i<4;i++) K.b(s*11,PZ-(i+1)*.2,-LL/2-.3-i*.5,4,.2,.5,TR); // 서쪽 아래 테라스로 내려가는 계단
    for(let i=0;i<4;i++) K.b(0,PZ-(i+1)*.2,LL/2+.25+i*.5,2*XT+2*TD,.2,.5,TR); // 동쪽 진입 계단
    for(const [x,z] of [[-24,48],[-30,56],[-20,62],[-34,66],[-26,74],[24,50],[31,57],[21,64],[33,70],[26,76],[-12,76],[10,80]]) K.tree(x,z,8+((x*7+z)%5)); // 동쪽 유칼립투스 숲
    for(const s of [-1,1]){ const xc=s*(XL0+XL1)/2, LW=XL1-XL0;
      // 연구동: 설비층(콘크리트 띠) / 실험실층(유리 + 멀리언) 3쌍, 광장 쪽·바깥쪽 모두
      const bands=[[PZ,2.2,'s'],[PZ+2.2,3.4,'l'],[PZ+5.6,2.6,'s'],[PZ+8.2,3.4,'l'],[PZ+11.6,2.6,'s']];
      bands.forEach(([y,hh,t],i)=>{ K.layer(Math.min(i,4)); if(t==='s'){ K.b(xc,y,0,LW,hh,LL,C); for(let k=0;k<6;k++) for(const q of [-1,1]) K.b(s*(q>0?XL1+.04:XL0-.04),y+.7,-LL/2+6+k*12.6,.08,1.2,8.0,K.M.dark); }
        else { K.b(xc,y,0,LW-.8,hh,LL,C2); for(const q of [-1,1]){ const xf=s*(q>0?XL1-.1:XL0+.1); K.b(xf,y,0,.1,hh,LL-.6,GW); for(let k=0;k<=8;k++) K.b(xf,y,-LL/2+.3+k*(LL-.6)/8,.3,hh,.3,C); } K.b(xc,y+hh-.3,0,LW,.3,LL,C); } });
      K.layer(4); K.b(xc,PZ+14.2,0,LW,.5,LL,C); K.b(xc,PZ+14.7,0,LW-6,1.8,LL-10,C2);
      K.b(xc,0,LL/2+2.5,LW,PZ+16,5,C); K.b(xc,0,-LL/2-5,LW,PZ+18,10,C); for(let f=0;f<5;f++) K.b(s*(XL0+XL1)/2,PZ+1.2+f*3.2,-LL/2-10.05,14,1.6,.1,GW); // 동쪽 설비탑 · 서쪽 사무동(6층, 바다 쪽 창)
      // 서재 탑 5개: 플라자층 열린 열주 → 서재층 2개(사이 다리층) · 바다(서) 쪽 안 모서리 45° 티크 창
      TZ.forEach(tz=>{ const xi=s*XT, xo=s*(XT+TD); 
        K.layer(0); for(const [px,pz] of [[xi+s*.4,tz+3.1],[xo-s*.4,tz+3.1],[xo-s*.4,tz-3.1],[s*(XT+3),tz-3.1],[xi+s*.5,tz-.2]]) K.b(px,PZ,pz,.7,3.4,.7,C); K.b(xi+s*.2,PZ,tz+1.5,.4,3.4,4,C);
        K.layer(1); tw(s,tz,PZ+3.4,.5,C); tw(s,tz,PZ+3.9,3.0,C); // 서재층 1
        K.layer(2); tw(s,tz,PZ+6.9,.5,C); for(const [px,pz] of [[xi+s*.4,tz+3.1],[s*(XT+3),tz-3.1]]) K.b(px,PZ+7.4,pz,.6,2.2,.6,C); K.b(xi+s*.2,PZ+7.4,tz+1.5,.4,2.2,4,C); // 다리층(열림)
        K.layer(3); tw(s,tz,PZ+9.6,.5,C); tw(s,tz,PZ+10.1,3.0,C); tw(s,tz,PZ+13.1,.5,C); K.b(xi+s*.2,PZ+13.6,tz+1.5,.3,.9,4,C);
        for(const yy of [PZ+3.9,PZ+10.1]){ const mx=s*(XT+1.5), mz=tz-1.75, nx=-s/Math.SQRT2, nz=-1/Math.SQRT2, ry=Math.atan2(nx,nz); K.b(mx+nx*.26,yy+.2,mz+nz*.26,4.1,2.6,.14,TK,ry); K.b(mx+nx*.34,yy+.5,mz+nz*.34,2.4,1.6,.1,GW,ry); K.b(xi-s*.05,yy+.2,tz+1.5,.1,2.6,3.6,TK); K.b(xi-s*.12,yy+.5,tz+1.5,.1,1.8,2.2,GW); }
        for(const yy of [PZ+3.4,PZ+9.6]) K.b(s*(XT+TD+.75),yy,tz,1.5,.4,2.4,C); // 연구동으로 건너는 다리
      });
    }
  }});
