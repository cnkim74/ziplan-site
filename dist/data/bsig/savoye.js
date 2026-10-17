__bsigFill({"savoye":function(K){
// 실측 기준(개략): 상자 21.5×19 m, 필로티 격자 4.75 m(5×5), 필로티 높이 3.0, 띠창 sill 1.0/높이 1.2, 상자 상단 6.6, 옥상 바람막이 2.6
    const W=21.5,D=19,g=4.75,ph=3.0,sl=.35,sb=1.0,wh=1.2,lb=1.05; const Y1=ph+sl, YW=Y1+sb, YL=YW+wh, YT=YL+lb; // YT=6.6
    const Wh=K.M.white, GN=K.col(0x2f4a3c,{roughness:.7}), GW=K.col(0x5e6c74,{roughness:.1,metalness:.6}), GW2=K.col(0x9fb4bd,{roughness:.15,metalness:.5}), GL=K.M.glass, DK=K.M.dark, PV=K.M.gravel;
    const TX0=1.5, TZ0=-1; // 테라스(+x,+z 사분면) 안쪽 모서리
    K.layer(0);
    K.b(0,0,0,32,.04,30,PV);
    // 필로티 5×5
    for(let i=-2;i<=2;i++) for(let j=-2;j<=2;j++){ if(Math.abs(i)<2&&j<=0&&j>=-1&&Math.abs(i)<=1) continue; K.c(i*g,0,j*g,.15,ph,Wh,12); }
    // 1층 곡면 매스(진녹색): 직사각 + 반원(+z 쪽)
    const R0=7.1, pts=[[-R0,-8],[R0,-8],[R0,-.5]]; for(let k=1;k<16;k++){ const a=k/16*Math.PI; pts.push([R0*Math.cos(a),-.5+R0*Math.sin(a)]); } pts.push([-R0,-.5]);
    K.ex(pts,ph,GN,[0,0,0],{shell:.35});
    // 1층 띠창(곡면 따라) + 측면 띠창 + 현관문
    for(let k=0;k<16;k++){ const a=(k+.5)/16*Math.PI; const x=(R0+.02)*Math.cos(a), z=-.5+(R0+.02)*Math.sin(a); if(Math.abs(a-Math.PI/2)<.11) continue; K.b(x,1.1,z,1.38,1.1,.1,GW2,-(a+Math.PI/2)); }
    K.b(0,0,-.5+R0+.0,1.8,2.5,.12,GL); K.b(0,2.5,-.5+R0+.03,2.0,.1,.16,Wh);
    for(const s of [-1,1]){ K.b(s*(R0+.02),1.1,-4.2,.1,1.1,7.2,GW2); }
    for(const x of [-4.4,0,4.4]) K.b(x,0,-8.03,2.8,2.3,.08,K.col(0xdedbd4)); // 차고문(뒤)
    // 1층 진입 차양·계단 없음(실제도 없음) — 원형 기둥은 곡면 밖에 그대로
    K.layer(1);
    K.b(0,ph,0,W,sl,D,Wh); // 바닥판
    // 사면 띠 벽(sill 밴드·lintel 밴드) + 띠창(테라스 구간은 개방)
    const faces=[{ax:'x',c:-W/2+.15,len:D},{ax:'x',c:W/2-.15,len:D},{ax:'z',c:-D/2+.15,len:W},{ax:'z',c:D/2-.15,len:W}];
    for(const f of faces){ if(f.ax==='x'){ K.b(f.c,Y1,0,.3,sb,D,Wh); K.b(f.c,YL,0,.3,lb,D,Wh); } else { K.b(0,Y1,f.c,W,sb,.3,Wh); K.b(0,YL,f.c,W,lb,.3,Wh); } }
    const open=(ax,c,p)=> (ax==='x'&&c>0&&p>TZ0) || (ax==='z'&&c>0&&p>TX0); // 테라스 쪽 개방 구간
    for(const f of faces){ const n=Math.round(f.len/1.2); for(let i=0;i<n;i++){ const p=-f.len/2+(i+.5)*f.len/n; if(open(f.ax,f.c,p)) continue; const w=f.len/n;
        if(f.ax==='x'){ K.b(f.c,YW,p,.12,wh,w,GW); K.b(f.c+(f.c>0?.1:-.1),YW,p-w/2,.1,wh,.12,Wh); } else { K.b(p,YW,f.c,w,wh,.12,GW); K.b(p-w/2,YW,f.c+(f.c>0?.1:-.1),.12,wh,.1,Wh); } } }
    // 테라스: 거실 유리벽(안쪽 모서리) + 슬라이딩 창틀
    const gh=YT-Y1-.35; K.b(TX0,Y1,(TZ0+D/2)/2,.1,gh,D/2-TZ0,GL); K.b((TX0+W/2)/2,Y1,TZ0,W/2-TX0,gh,.1,GL);
    for(let z=TZ0;z<=D/2;z+=1.5) K.b(TX0,Y1,z,.08,gh,.08,DK); for(let x=TX0;x<=W/2;x+=1.5) K.b(x,Y1,TZ0,.08,gh,.08,DK);
    // 테라스 화단(낮은 흰 벽) + 옥상으로 오르는 외부 람프(2단 꺾임)
    K.b(7.5,Y1,7.2,4,.6,.4,Wh); K.b((TX0+W/2-.3)/2,Y1,(TZ0+D/2-.3)/2,W/2-.3-TX0,.02,D/2-.3-TZ0,K.M.pave);
    const rl=8.6, rise=(YT-Y1)/2; const sA=rise/rl; K.b(2.6,Y1+rise/2-.08,3.2,1.3,.16,rl,Wh,0,{slope:-sA}); K.b(1.95,Y1+rise/2-.08,3.2,.12,.9,rl,Wh,0,{slope:-sA}); K.b(3.25,Y1+rise/2-.08,3.2,.12,.9,rl,Wh,0,{slope:-sA});
    K.b(4.4,Y1+rise*1.5-.08,3.2,1.3,.16,rl,Wh,0,{slope:sA}); K.b(5.05,Y1+rise*1.5-.08,3.2,.12,.9,rl,Wh,0,{slope:sA}); K.b(3.9,Y1+rise+.9,3.2,.12,.5,rl,Wh);
    K.b(3.5,Y1+rise,-1.6,3.2,.16,1.8,Wh); K.b(3.5,Y1+rise,-2.5,3.2,.9,.12,Wh); // 꺾임참
    // 내부 벽 몇 장(테라스 유리 너머)
    K.b(-2,Y1,2,.2,gh,8,Wh); K.b(-4,Y1,-4,8,gh,.2,Wh); K.c(-6.6,Y1,-7,1.3,gh,Wh,24);
    K.layer(2);
    // 지붕판(테라스 제외 L자) — 상단 YT, 두께 .35
    K.ex([[-W/2+.3,-D/2+.3],[W/2-.3,-D/2+.3],[W/2-.3,TZ0],[TX0,TZ0],[TX0,D/2-.3],[-W/2+.3,D/2-.3]],.35,Wh,[0,YT-.35,0]);
    // 옥상 솔라리움: 큰 곡면 바람막이 + 액자 창이 있는 직선 벽 + 계단탑 원통 + 람프 상부 캐노피
    const cx=-3.5,cz=0,ro=6.4,ri=6.1,ap=[],ai=[]; for(let k=0;k<=18;k++){ const a=(100+k*(165/18))*Math.PI/180; ap.push([cx+ro*Math.cos(a),cz+ro*Math.sin(a)]); ai.push([cx+ri*Math.cos(a),cz+ri*Math.sin(a)]); }
    K.ex(ap.concat(ai.reverse()),2.6,K.col(0xdfe3e1),[0,YT,0]);
    K.b(-1.2,YT,5.4,5.2,.9,.3,Wh); K.b(-1.2,YT+2.0,5.4,5.2,.6,.3,Wh); K.b(-3.3,YT+.9,5.4,1.0,1.1,.3,Wh); K.b(1.0,YT+.9,5.4,.8,1.1,.3,Wh); // 액자창 벽
    K.c(-6.6,YT,-7,1.3,2.1,Wh,24); K.b(4.4,YT+2.3,-2.4,4.6,.2,2.6,Wh); K.b(6.5,YT,-2.4,.25,2.3,2.6,Wh);
    K.b(-7.5,YT,-6.5,.25,.6,3,Wh); K.b(7.5,YT,-7.5,3,.5,.25,Wh); // 낮은 난간·화단 벽
  }});
