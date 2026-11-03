// 패치 병합: node tools/sig/merge.js <hall-json> patch1.js [patch2.js …]
// - BSIG 끝에 새 항목 추가(같은 id가 이미 있으면 중단), BSIG_SITE 'town', SIG_TH 추가
// - hall-json: '{"kold":["id",…],…}' 전시실(AT_HALLS k)별 추가 id
// 썸네일: render.sh none <ids> thumb th/ → convert -resize 720x480 -quality 72 img/sig/<id>.webp, 360x240 → img/sig/s/<id>.webp, SIG_TH_V 올리기
const fs=require('fs');const F=__dirname+'/../../crit.html';let s=fs.readFileSync(F,'utf8');
const halls=JSON.parse(process.argv[2]||'{}');const L=s.split('\n');const st=L.findIndex(l=>l.startsWith('const BSIG={'));let e=st;while(!L[e].startsWith('};'))e++;
const ids=[];let body='';
for(const f of process.argv.slice(3)){const p=fs.readFileSync(f,'utf8');const P=new Function(p+';return BSIG_PATCH')();for(const k of Object.keys(P)){if(new RegExp('^ '+k+':\\{dims','m').test(s)) throw new Error('이미 있음: '+k);ids.push(k);}
 let b=p.slice(p.indexOf('const BSIG_PATCH={')+18);b=b.slice(0,b.lastIndexOf('};')).replace(/^\n+|\s+$/g,'');if(!b.endsWith(','))b+=',';body+=b+'\n';}
L.splice(e,0,body.replace(/\n$/,''));s=L.join('\n');
s=s.replace(/(const BSIG_SITE=\{[^\n]*)\};/,(m,a)=>a+','+ids.map(i=>JSON.stringify(i)+':"town"').join(',')+'};');
s=s.replace(/const SIG_TH=new Set\('([^']*)'/,(m,a)=>"const SIG_TH=new Set('"+a.split(' ').concat(ids).filter(Boolean).sort().join(' ')+"'");
for(const k in halls){const re=new RegExp("(\\{k:'"+k+"'[^\\n]*?ids:\\[)([^\\]]*)\\]");s=s.replace(re,(m,a,b)=>a+b+','+halls[k].map(x=>JSON.stringify(x)).join(',')+']');}
fs.writeFileSync(F,s);console.log('merged',ids.length,ids.join(' '));
