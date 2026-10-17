__bsigFill({"ddp":function(K){
// 실측(개략): 전체 길이 약 280 m · 최고 높이 29 m(지상 4층·지하 3층) · 알루미늄 패널 45,133장(가로 이음선) · 지붕 잔디 언덕 · 어울림 광장(지하 광장, 계단으로 내려감) · 옛 동대문운동장 조명탑 2기 · 복원된 서울 성곽 구간
// v11: 덩어리 5개를 따로 두지 않고 '부드러운 최대값(smooth-max)'으로 녹여 한 장의 연속 곡면(높이장 220×120)으로 — 이음새 없는 은빛 껍질. 패널 줄눈은 높이 기준 띠 텍스처(2.1 m 간격), 아랫단 3 m는 어두운 유리 띠
    const T=K.T; const PV=K.M.pave, PV2=K.col(0xb9b2a6,{roughness:.9}), GR=K.M.grass, ST=K.M.stone, DK=K.M.dark, GL=K.M.glassW, WH=K.col(0xf4f2ee,{emissive:0x886688,emissiveIntensity:.35});
    const put=(m,cast)=>{ m.castShadow=cast!==false; m.receiveShadow=true; (K.cur||K.layer(0)).add(m); return m; };
    // 껍질 텍스처: 높이(v) 따라 줄눈 선 + 아랫단 유리 띠
    const HMAX=30; const cv=document.createElement('canvas'); cv.width=16; cv.height=1024; const cx2=cv.getContext('2d'); cx2.fillStyle='#d4d7db'; cx2.fillRect(0,0,16,1024); const nb=14; cx2.fillStyle='#5a5f66'; for(let k=1;k<nb;k++){ const yy=1024-Math.round(1024*(3.2+(HMAX-3.2)*k/nb)/HMAX); cx2.fillRect(0,yy-1,16,3); } cx2.fillStyle='#262b31'; cx2.fillRect(0,1024-Math.round(1024*3.2/HMAX),16,1024); const tex=new T.CanvasTexture(cv); tex.encoding=T.sRGBEncoding; tex.wrapS=tex.wrapT=T.ClampToEdgeWrapping; const AL=new T.MeshStandardMaterial({color:0xffffff,map:tex,metalness:.5,roughness:.38,side:T.DoubleSide}); AL.userData.k='ddpshell';
    // 덩어리(lobe): [cx,cz,rx,rz,h,rot] — 수퍼타원 평면 + 둥근 단면, smooth-max로 합침
    const LOBES=[[-60,-2,95,50,26,.1],[30,-14,67,39,21,-.25],[55,22,55,29,15,.35],[-30,46,47,25,11,-.15],[100,-24,40,17,9,.15],[-120,10,40,22,7,0]];
    const KS=.42, P=2.6; const f=(x,z)=>{ let s=0; for(const [cx,cz,rx,rz,h,rot] of LOBES){ const dx=x-cx, dz=z-cz, c=Math.cos(rot), sn=Math.sin(rot); const a=(dx*c+dz*sn)/rx, bb=(-dx*sn+dz*c)/rz; const d=Math.pow(Math.pow(Math.abs(a),P)+Math.pow(Math.abs(bb),P),1/P); const hi=d<1?h*Math.pow(1-Math.pow(d,2.4),.5):0; s+=Math.exp(KS*hi); } return Math.log(s/LOBES.length)/KS; };
    // ---- 0: 대지 데크(지하층 위) · 어울림 광장(한 층 낮은 광장) · 성곽 · 조명탑 ----
    K.layer(0);
    K.b(-45,0,0,210,1.2,170,PV); K.b(105,0,-32.5,90,1.2,105,PV); K.b(105,0,77.5,90,1.2,15,PV); K.b(140,0,45,20,1.2,50,PV);
    K.b(95,-.01,45,70,.06,50,PV2); for(let k=0;k<3;k++) K.b(60.6+k*1.3,0,45,1.3,.9-k*.3,40,ST); K.b(118,0,45,10,.6,12,GL); // 광장 바닥·계단·지하 입구 유리
    for(const [px,pz] of [[80,30],[96,34],[112,30],[84,60],[104,62],[122,58]]) K.tree(px,pz,6);
    K.b(-45,1.2,-72,100,4.2,2.6,ST); for(let i=0;i<13;i++) K.b(-93+i*8,5.4,-72,3.6,1.0,2.6,ST); K.b(5,1.2,-72,2.4,5.4,2.6,ST); K.b(-20,1.2,-66,22,.8,6,PV2);
    for(const [px,pz] of [[128,-62],[88,-74]]){ K.c(px,1.2,pz,.7,32,K.M.alu,8,{r2:.45}); K.b(px,33.2,pz,5.2,2.6,1.2,DK); K.b(px,32.4,pz,1.2,1,1.2,DK); }
    // ---- 1: 연속 곡면 껍질(한 장) + 잔디 언덕 + LED 장미 ----
    K.layer(1);
    const X0=-165,X1=145,Z0=-72,Z1=92; K.surf((u,v)=>{ const x=X0+(X1-X0)*u, z=Z0+(Z1-Z0)*v; const h=f(x,z); const y=h<.9?-.3:h; return [x,y,z,u,Math.max(0,y)/HMAX]; },230,124,AL);
    K.blob(-135,1.2,10,100,12,70,GR); K.blob(-90,1.2,-40,60,6,40,GR); K.b(-15,1.2,66,50,.15,24,GR); // 잔디 언덕(지붕 공원으로 이어짐)
    for(let i=0;i<40;i++){ const a=i*2.399, r=6+Math.sqrt(i)*4.4; const px=-135+Math.cos(a)*r*1.25, pz=10+Math.sin(a)*r*.9; const q=1-Math.pow((px+135)/50,2)-Math.pow((pz-10)/35,2); if(q<=0) continue; K.b(px,1.2+12*Math.sqrt(q)-.1,pz,.14,.55,.14,WH); }
  }});
