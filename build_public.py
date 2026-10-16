#!/usr/bin/env python3
"""ZIPLAN 공개 사이트 빌드 — crit.html(클로드 아티팩트용)에서 dist/ (실제 웹 배포용)를 만든다.
   - 표준 HTML 뼈대(doctype·viewport·OG) 감싸기
   - pdf.js는 CDN(cdnjs)에서 (1.4MB 워커를 배포 파일에 넣지 않음)
   - claude.ai 전용 문구를 공개용으로 바꿈 (AI·로그인·광장은 베타 준비 중)
   원본 crit.html은 수정하지 않는다."""
SITE_URL = 'https://ziplan-site-dist.vercel.app'   # 정식 주소(도메인 바꾸면 여기만) — canonical·OG·sitemap에 쓰인다
import os, re, shutil, pathlib
root = pathlib.Path(__file__).parent
dist = root / 'dist'
if dist.exists(): shutil.rmtree(dist)
dist.mkdir()
s = (root / 'crit.html').read_text(encoding='utf-8')

head = '''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="ZIPLAN 집플랜 — 모두의 건축. 계획은 당신이, 표현은 ZIP이. 내집코드·대지 분석·컨셉·도면·모형·패널·포트폴리오·자료실.">
<meta property="og:title" content="ZIPLAN 집플랜 — 모두의 건축">
<meta property="og:description" content="계획은 당신이, 표현은 ZIP이. 컨셉부터 패널까지, 대안을 보고 고르는 건축 작업대.">
<meta property="og:type" content="website">
<meta property="og:site_name" content="ZIPLAN 집플랜">
<meta property="og:locale" content="ko_KR">
<meta property="og:url" content="%s/">
<meta property="og:image" content="%s/img/house-dusk.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="%s/">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="brand/ziplan-app-icon-180.png">
'''
head = head.replace('%s', SITE_URL)
assert s.startswith('<meta charset="utf-8">\n')
s = s[len('<meta charset="utf-8">\n'):]
s = s.replace('<title>ZIPLAN</title>', '<title>ZIPLAN 집플랜 — 모두의 건축 | 집 구경·내 집 짓기·건축 공부</title>', 1)
# head 끝 = </style> 다음 (첫 <nav> 앞)
i = s.index('<nav>')
s = head + s[:i] + '</head>\n<body>\n' + s[i:] + '\n</body>\n</html>\n'

# pdf.js → CDN
s = s.replace("const base=new URL('vendor/pdfjs/',location.href);", "const base='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/';")
# 공개용 문구
s = s.replace('<b>AI 준비 중</b> claude.ai 안에서 열면 AI 버튼이 켜집니다. 계산과 배치는 지금도 됩니다.',
              '<b>베타</b> AI 이미지 크릿과 광장은 정식 오픈 때 열립니다. 로그인·저장, 취향 랩·내집코드·설계 흐름·도면·DXF·아틀라스·건축 여행은 지금 바로 됩니다.')
s = s.replace("title='claude.ai에서 열면 켜집니다'", "title='정식 오픈 때 열립니다'")
s = s.replace('광장은 claude.ai 안에서 열면 보입니다. (공용 저장소 연결 필요)', '광장은 정식 오픈 때 열립니다. 지금은 패널·도면을 만들어 두세요.')
s = s.replace('로그인된 claude.ai 안에서만 올릴 수 있고, 내 글은 나만 고치거나 지울 수 있습니다.', '정식 오픈 후 로그인하면 올릴 수 있고, 내 글은 나만 고치거나 지울 수 있습니다.')
s = s.replace('로그인된 claude.ai 안에서만 저장됩니다.', '저장은 정식 오픈 때 열립니다.')
s = s.replace('저장은 claude.ai 안에서 열었을 때 됩니다.', '파일 저장은 정식 오픈 때 열립니다.')
s = s.replace('이 화면에선 이미지를 보낼 수 없습니다. claude.ai 안에서 열어 주세요.', 'AI 크릿은 정식 오픈 때 열립니다.')
s = s.replace('claude.ai 안에서 이 페이지를 열면 그 계정으로 자동 로그인되어 프로젝트가 계정에 저장됩니다.', '정식 오픈 때 이메일 로그인이 열립니다.')
s = s.replace('claude.ai 안에서 열면 그 계정으로 자동 로그인됩니다. 내 작업실에서 저장·불러오기. 올린 사진은 용량 때문에 이 브라우저에만 남습니다. 정식 서비스에서는 이메일 로그인과 결제가 들어갑니다.', '정식 오픈 때 이메일 로그인과 계정 저장이 열립니다. 지금 만든 것은 PNG·SVG로 내려받아 두세요.')
s = s.replace('로그인된 claude.ai 안에서만 됩니다.', '정식 오픈 때 열립니다.')
s = s.replace('로그인된 claude.ai 안에서만 올릴 수 있습니다.', '올리기는 정식 오픈 때 열립니다.')
s = s.replace('이미지를 보낼 수 없는 화면입니다. claude.ai 안에서 열어 주세요.', 'AI 크릿은 정식 오픈 때 열립니다.')
s = s.replace('(프로토타입)', '(베타)')
# 정교 모형(BSIG) build 함수는 따로 떼어 data/bsig.js로 (첫 화면 JS를 1.4MB 줄임 — 아이패드 등에서 파싱·메모리 부담)
import subprocess, json as _json, hashlib as _hl
_BSIG_SPLIT = r'''// build_public.py가 부른다: stdin = 전체 HTML, stdout = JSON {html, data}
// BSIG 블록(const BSIG={ … };)에서 build 함수만 떼어 data/bsig.js로, 페이지엔 메타(치수·설명·도면)만 남긴다.
let s=require('fs').readFileSync(0,'utf8'); const L=s.split('\n');
const a=L.findIndex(l=>l.startsWith('const BSIG={')); let b=a+1; while(!/^};\s*$/.test(L[b])) b++;
const B=new Function(L.slice(a,b+1).join('\n')+';return BSIG')();
const meta={}, fns=[];
for(const id of Object.keys(B)){ const o=B[id]; const {build,...m}=o; meta[id]=m; let f=build.toString(); if(/^build\s*\(/.test(f)) f='function'+f.slice(5); else if(/^\(/.test(f)) f='function'+f; fns.push(JSON.stringify(id)+':'+f); }
const data='__bsigFill({'+fns.join(',\n')+'});\n';
L.splice(a,b-a+1,'const BSIG='+JSON.stringify(meta)+';');
process.stdout.write(JSON.stringify({html:L.join('\n'),data}));
'''
_r = subprocess.run(['node', '-e', _BSIG_SPLIT], input=s.encode('utf-8'), capture_output=True)
if _r.returncode == 0:
    _o = _json.loads(_r.stdout.decode('utf-8'))
    (dist / 'data').mkdir(exist_ok=True)
    (dist / 'data' / 'bsig.js').write_text(_o['data'], encoding='utf-8')
    _v = _hl.md5(_o['data'].encode('utf-8')).hexdigest()[:8]
    s = _o['html'].replace("const BSIG_V='src';", "const BSIG_V='%s';" % _v)
else:
    print('경고: BSIG 분리 실패 — 한 파일로 둡니다', _r.stderr.decode('utf-8')[:400])
(dist / 'index.html').write_text(s, encoding='utf-8')

# favicon: 마크 SVG
(dist / 'favicon.svg').write_text((root / 'brand' / 'ziplan-app-icon.svg').read_text(encoding='utf-8'), encoding='utf-8')
import shutil as _sh
(dist / 'brand').mkdir(exist_ok=True)
for _f in (root / 'brand').glob('ziplan-*'):
    _sh.copy(_f, dist / 'brand' / _f.name)

# 지원 파일
for rel in ['privacy.html','terms.html','vendor/liquid-glass/container.js','vendor/liquid-glass/button.js','vendor/liquid-glass/glass.css','vendor/liquid-glass/LICENSE','vendor/html2canvas.min.js','vendor/html2canvas.LICENSE','effects/nav-glass.js','effects/nav-glass.css','effects/shader-gradient.js','data/portfolio.js','data/library.js','img/house-dusk.jpg','img/exax-retail.webp','img/exax-terrace.webp','img/exax-court.webp','img/p-sketch.webp','img/p-model.webp','img/p-crit.webp','img/alt-site.webp','img/alt-a.webp','img/alt-b.webp','img/alt-c.webp']+['img/%s.avif'%n for n in ('f-site','f-sketch','f-plan','f-mass','f-model','f-build','f-home','pn-aerial','pn-persp','pn-concept')]+['img/l-%s-%s%s.webp'%(l,o,sz) for l in ('bg','mid','fg') for o in ('off','on') for sz in ('','-960')]:
    if not (root / rel).exists():
        print('WARNING missing', rel); continue
    (dist / rel).parent.mkdir(parents=True, exist_ok=True)
    shutil.copy(root / rel, dist / rel)

# ===== v18b: 검색 노출용 정적 페이지 =====
# crit.html의 데이터(BLD·BSIG 메타·TPL·PH·TFEAT·TV_ABROAD·TV_SEASON·KB2·ENC)를 node로 꺼내
# /atlas/<id>/ · /travel/<id>/ · /ask/<slug>/ · /dict/<id>/ + 목록 4개 + sitemap.xml · robots.txt · 404.html 을 만든다.
# 큰 앱 JS 없이 공용 static.css 하나만. 버튼은 앱 딥링크(#atlas?b= · #travel?p= · #ask?q=)로.
import json as _sj, html as _sh, math as _sm, datetime as _sd, time as _st
from urllib.parse import quote as _q
_t0 = _st.time()
BUILD_DATE = _sd.date.today().isoformat()
_EXTRACT = r'''
const L=require('fs').readFileSync(0,'utf8').split('\n');
function idx(re){const i=L.findIndex(l=>re.test(l)); if(i<0) throw new Error('no '+re); return i;}
function block(a,b){const i=idx(a); let j=i; while(j<L.length&&!b.test(L[j])) j++; return L.slice(i,j+1).join('\n');}
function line(a){return L[idx(a)];}
const ev=(src,names)=>new Function(src+';return {'+names+'}')();
const out=ev([line(/^const PH=\{/),line(/^const TREG=\{/),block(/^const TPL=\[/,/^\]\.map\(a=>\(\{id:a\[0\]/),block(/^const TFEAT=\{/,/^\};/),line(/^const TV_SEASON=\[/),block(/^const TV_ABROAD = \[/,/^\];/)].join('\n'),'PH,TREG,TPL,TFEAT,TV_SEASON,TV_ABROAD');
const kb=ev(block(/^const KB2=\[/,/^\];/)+'\n'+line(/^function kbTopic\(/)+'\n'+line(/^function kbSlugs\(/),'KB2,kbTopic,kbSlugs');
const sl=kb.kbSlugs(kb.KB2);
out.KB2=kb.KB2.map((k,i)=>({re:k[0],html:k[1],go:k[2],gol:k[3],cat:k[4],topic:kb.kbTopic(k),alt:kb.kbTopic([k[0],'',k[2],k[3],k[4]]),slug:sl[i]}));
const enc=ev([line(/^const ENCD=/),line(/^const EG=/),line(/^const ES=/),block(/^const ENC=\[/,/^\];/)].join('\n'),'ENC');
out.ENC=enc.ENC.map(e=>{const {svg,...m}=e; let s=''; try{s=svg();}catch(x){} return {...m,svg:s};});
const dc=ev(block(/^const DNA_CATS=\[/,/^\];/),'DNA_CATS'); const LAB=new Set(); dc.DNA_CATS.forEach(c=>c[2].forEach(s=>LAB.add(s.split('|')[0])));
const B=ev(block(/^const BLD=\[\[/,/\]\];\s*$/)+'\n'+line(/^const BLD_REG=/),'BLD,BLD_REG,BLD_ERA');
out.BLD_REG=B.BLD_REG; out.BLD_ERA=B.BLD_ERA;
out.BLDX=B.BLD.map(a=>({id:a[0],name:a[1],arch:a[2],year:a[3],city:a[4],reg:a[5],era:a[6],keys:a[7].filter(k=>LAB.has(k)),line:a[8],p:a[9],w:a[10],lic:a[11],by:a[12]}));
const S=new Function(block(/^const BSIG=\{/,/^};\s*$/)+';return BSIG')(); out.BSIG={};
for(const id of Object.keys(S)){ const o=S[id]; out.BSIG[id]={dims:o.dims||'',desc:o.desc||'',feats:o.feats||[],see:o.see||[]}; }
process.stdout.write(JSON.stringify(out));
'''

def _esc(s): return _sh.escape('' if s is None else str(s), quote=True)
def _txt(h):
    h = re.sub(r'<br\s*/?>|<hr\s*/?>|</p>|</li>', ' ', h or '')
    return re.sub(r'\s+', ' ', _sh.unescape(re.sub(r'<[^>]+>', '', h))).strip()
def _clip(s, n):
    s = (s or '').strip()
    return s if len(s) <= n else s[:n-1].rstrip(' ,·—-') + '…'
def _enc(s): return _q(str(s), safe="-_.!~*'()")   # = JS encodeURIComponent
def _url(path): return SITE_URL + _q(path, safe="/-_.~")
def _ld(o): return '<script type="application/ld+json">' + _sj.dumps(o, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/') + '</script>'

_WM = 'https://upload.wikimedia.org/wikipedia/commons/'
def _bld_img(b, w):   # crit.html bldImg(b,w) 그대로
    if not b.get('p'): return ''
    seg = b['p'].split('/'); n = seg[2]; en = _enc(n); tif = re.search(r'\.tiff?$', n, re.I)
    if (b.get('w') or 0) <= w and not tif: return _WM + seg[0] + '/' + seg[1] + '/' + en
    return _WM + 'thumb/' + seg[0] + '/' + seg[1] + '/' + en + '/' + ('lossy-page1-' if tif else '') + str(w) + 'px-' + en + ('.jpg' if tif else '')
def _bld_file(b): return 'https://commons.wikimedia.org/wiki/File:' + _enc(b['p'].split('/')[2])
def _ph_img(p, w):    # PH[0](1920 썸네일 또는 원본)를 bldImg와 같은 규칙으로 w px 썸네일로
    u, ow = p[0], (p[4] if len(p) > 4 and p[4] else 1920)
    if ow <= w: return u if '/thumb/' not in u else u
    m = re.match(r'^(.*/thumb/.+/)((?:lossy-page1-)?)\d+px-(.+)$', u)
    if m: return m.group(1) + m.group(2) + '%dpx-' % w + m.group(3)
    m = re.match(r'^' + re.escape(_WM) + r'([0-9a-f])/([0-9a-f]{2})/([^/]+)$', u)
    if m:
        n = m.group(3); tif = re.search(r'\.tiff?$', n, re.I)
        return _WM + 'thumb/%s/%s/%s/%s%dpx-%s%s' % (m.group(1), m.group(2), n, 'lossy-page1-' if tif else '', w, n, '.jpg' if tif else '')
    return u

_MARK = '<svg viewBox="-6 -6 112 112" width="24" height="24" aria-hidden="true"><g fill="currentColor"><path d="M4 6H56V16L23 38H56V48H4V38L37 16H4Z"/><rect x="76" y="6" width="12" height="42"/></g><g fill="#2b6cff"><rect x="4" y="54" width="92" height="10"/><rect x="4" y="54" width="12" height="44"/><rect x="84" y="54" width="12" height="34"/><rect x="4" y="78" width="92" height="10"/></g></svg>'
_TOP = ('<div class="top"><a class="logo" href="/" aria-label="ZIPLAN 홈">' + _MARK + '<span>ZI<b>P</b>LAN</span></a>'
        '<div class="doors"><a href="/#atlas">집 구경</a><a href="/#dna">내 집 짓기</a><a href="/#flow">건축 공부</a><a href="/#plaza">광장</a></div></div>')
_FOOT = ('<div class="foot"><div class="fl"><a href="/atlas/">건축 아틀라스</a><a href="/travel/">건축 여행</a><a href="/ask/">건축 물어보기</a><a href="/dict/">건축 사전</a><a href="/">ZIPLAN 앱</a></div>'
         '<p>ZIPLAN 집플랜 — 모두의 건축. 사진은 위키미디어 공용(Wikimedia Commons)의 자유 라이선스 이미지이며, 작가와 라이선스를 사진 아래에 적었습니다. '
         '법규·비용 정보는 개략이며 실제 적용은 관할 관청과 공식 자료로 확인하세요. <a href="/privacy">개인정보 처리방침</a> · <a href="/terms">이용약관</a></p></div>')
_DEF_IMG = SITE_URL + '/img/house-dusk.jpg'
_PAGES = []   # (path, bytes)

def _page(path, title, desc, main, img=None, img_alt='', ld=None, crumbs=None, og_type='article', noindex=False):
    can = _url(path)
    g = []
    if ld: g.extend(ld if isinstance(ld, list) else [ld])
    if crumbs:
        g.append({'@type': 'BreadcrumbList', 'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': _url(u)} for i, (n, u) in enumerate(crumbs)]})
    head = ['<!doctype html><html lang="ko"><head><meta charset="utf-8">',
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
            '<title>%s</title>' % _esc(title), '<meta name="description" content="%s">' % _esc(desc)]
    if noindex: head.append('<meta name="robots" content="noindex">')
    else: head.append('<link rel="canonical" href="%s">' % _esc(can))
    head += ['<meta property="og:site_name" content="ZIPLAN 집플랜">', '<meta property="og:locale" content="ko_KR">',
             '<meta property="og:type" content="%s">' % og_type, '<meta property="og:title" content="%s">' % _esc(title),
             '<meta property="og:description" content="%s">' % _esc(desc), '<meta property="og:url" content="%s">' % _esc(can),
             '<meta property="og:image" content="%s">' % _esc(img or _DEF_IMG)]
    if img_alt: head.append('<meta property="og:image:alt" content="%s">' % _esc(img_alt))
    head += ['<meta name="twitter:card" content="summary_large_image">',
             '<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#111214" media="(prefers-color-scheme: dark)">',
             '<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/brand/ziplan-app-icon-180.png">',
             '<link rel="stylesheet" href="/static.css">']
    if g: head.append(_ld({'@context': 'https://schema.org', '@graph': g}))
    cr = ''
    if crumbs:
        cr = '<div class="crumb">' + ' <i>›</i> '.join(('<a href="%s">%s</a>' % (_esc(_q(u, safe="/-_.~")), _esc(n))) if i < len(crumbs) - 1 else '<span>%s</span>' % _esc(n) for i, (n, u) in enumerate(crumbs)) + '</div>'
    doc = ''.join(head) + '</head><body>' + _TOP + '<main class="pg">' + cr + main + '</main>' + _FOOT + '</body></html>\n'
    rel = path.strip('/')
    f = dist / rel / 'index.html' if rel and not rel.endswith('.html') else dist / (rel or 'index.html')
    f.parent.mkdir(parents=True, exist_ok=True)
    b = doc.encode('utf-8'); f.write_bytes(b)
    if not noindex: _PAGES.append((path, len(b)))
    return title

def _figure(src, srcset, alt, credit_html, eager=True):
    ss = (' srcset="%s" sizes="(max-width: 860px) 100vw, 820px"' % _esc(srcset)) if srcset else ''
    return ('<figure class="hero"><img src="%s"%s alt="%s"%s decoding="async" referrerpolicy="no-referrer">'
            '<figcaption>%s</figcaption></figure>') % (_esc(src), ss, _esc(alt), ' fetchpriority="high"' if eager else ' loading="lazy"', credit_html)

def _links(items, cls='links'):
    if not items: return ''
    return '<ul class="%s">' % cls + ''.join('<li><a href="%s">%s</a>%s</li>' % (_esc(_q(u, safe="/-_.~")), _esc(t), (' <span>%s</span>' % _esc(s)) if s else '') for u, t, s in items) + '</ul>'

def _sec(h, body):
    return '<section><h2>%s</h2>%s</section>' % (_esc(h), body) if body else ''

def _hav(a, b):
    R = 6371; la1, lo1, la2, lo2 = map(_sm.radians, (a['lat'], a['lon'], b['lat'], b['lon']))
    x = _sm.sin((la2 - la1) / 2) ** 2 + _sm.cos(la1) * _sm.cos(la2) * _sm.sin((lo2 - lo1) / 2) ** 2
    return 2 * R * _sm.asin(_sm.sqrt(x))

_STATIC_CSS = r''':root{--bg:#fbfbfd;--card:#fff;--fg:#1d1d1f;--fg2:#4a4a50;--fg3:#7a7a82;--line:#e3e3e8;--acc:#2b6cff;--acc2:#e8efff;--chip:#f1f1f5;--warn:#fff6e5;--warnl:#f0c36a;--r:14px;--font:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",system-ui,sans-serif}
@media (prefers-color-scheme:dark){:root{--bg:#111214;--card:#1a1b1f;--fg:#f2f2f5;--fg2:#c4c4cc;--fg3:#8d8d96;--line:#2c2d33;--acc:#6b9bff;--acc2:#1c2640;--chip:#24252b;--warn:#2b2414;--warnl:#7a5d22}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.7 var(--font);word-break:keep-all;overflow-wrap:anywhere}
a{color:var(--acc);text-decoration:none}a:hover{text-decoration:underline}
.top{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:16px;padding:10px max(16px,calc(50vw - 430px));background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:saturate(1.6) blur(14px);-webkit-backdrop-filter:saturate(1.6) blur(14px);border-bottom:1px solid var(--line)}
.logo{display:flex;align-items:center;gap:8px;color:var(--fg);font:900 19px/1 "Archivo Black",var(--font);letter-spacing:.02em}.logo b{color:#2b6cff}.logo:hover{text-decoration:none}
.doors{display:flex;gap:4px;margin-left:auto;overflow-x:auto;scrollbar-width:none}.doors::-webkit-scrollbar{display:none}
.doors a{white-space:nowrap;padding:6px 11px;border-radius:999px;color:var(--fg2);font-size:14px;font-weight:600}.doors a:hover{background:var(--chip);text-decoration:none}
.pg{max-width:860px;margin:0 auto;padding:18px 16px 40px}
.crumb{font-size:13px;color:var(--fg3);margin:4px 0 18px}.crumb a{color:var(--fg3)}.crumb i{font-style:normal;margin:0 4px}
.kick{margin:0;color:var(--acc);font-size:13px;font-weight:700;letter-spacing:.04em}
h1{font-size:clamp(28px,5vw,42px);line-height:1.2;margin:6px 0 6px;letter-spacing:-.02em}h1 small{font-size:.5em;color:var(--fg3);font-weight:600;margin-left:8px;letter-spacing:0}
h2{font-size:20px;margin:34px 0 10px;letter-spacing:-.01em}h3{font-size:16px;margin:20px 0 6px}
.sub{margin:0 0 18px;color:var(--fg2);font-size:17px}
.lead{font-size:19px;line-height:1.65;margin:18px 0}
.hero{margin:0 -16px 6px;background:var(--chip)}.hero img{display:block;width:100%;aspect-ratio:3/2;object-fit:cover;background:var(--chip)}
.hero figcaption{font-size:12px;color:var(--fg3);padding:6px 16px 0}.hero figcaption a{color:var(--fg3);text-decoration:underline}
@media (min-width:700px){.hero{margin:0 0 6px;border-radius:var(--r);overflow:hidden}.hero figcaption{padding:6px 2px 8px}}
.nophoto{font-size:13px;color:var(--fg3);background:var(--chip);border-radius:var(--r);padding:14px 16px}
.cta{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0 6px}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:10px 18px;border-radius:999px;background:var(--acc);color:#fff;font-weight:700;font-size:15px}.btn:hover{text-decoration:none;filter:brightness(1.06)}
.btn.ghost{background:var(--acc2);color:var(--acc)}
.chips{display:flex;flex-wrap:wrap;gap:6px;padding:0;margin:8px 0;list-style:none}.chips li,.chips span{background:var(--chip);border-radius:999px;padding:4px 11px;font-size:14px;color:var(--fg2)}
.facts{display:grid;grid-template-columns:max-content 1fr;gap:6px 16px;margin:18px 0;padding:16px;background:var(--card);border:1px solid var(--line);border-radius:var(--r);font-size:15px}.facts dt{color:var(--fg3)}.facts dd{margin:0}
ul.pts{padding-left:20px}ul.pts li{margin:4px 0}
.links{list-style:none;padding:0;margin:8px 0;display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:6px 18px}.links li{padding:7px 0;border-bottom:1px solid var(--line);font-size:15px}.links span{color:var(--fg3);font-size:13px}
.ans{font-size:17px;line-height:1.8;background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:18px 20px;margin:16px 0}.ans hr{border:0;border-top:1px solid var(--line);margin:14px 0}
.note{background:var(--warn);border:1px solid var(--warnl);border-radius:var(--r);padding:12px 16px;font-size:14px;color:var(--fg2);margin:14px 0}
.diag{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:12px;margin:16px 0 4px;color:var(--fg)}
.encsvg{width:100%;max-width:520px;margin:0 auto;height:auto;display:block;color:var(--fg)}.encsvg .l{fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.encsvg .f{fill:color-mix(in srgb,currentColor 8%,transparent);stroke:currentColor;stroke-width:1.4;stroke-linejoin:round}.encsvg .k{fill:#ff5e3a22;stroke:#ff5e3a;stroke-width:2;stroke-linejoin:round}.encsvg .a{fill:none;stroke:#3f7bff;stroke-width:2;stroke-dasharray:7 5;marker-end:url(#ea)}.encsvg text{font-size:10.5px;fill:var(--fg2);font-family:var(--font);font-weight:600}
.cap{font-size:12px;color:var(--fg3);margin:0 0 10px}
.grp h2{position:sticky;top:52px;background:var(--bg);padding:6px 0;z-index:1}
.stop{padding:12px 0;border-bottom:1px solid var(--line)}.stop b a{color:var(--fg)}.stop p{margin:2px 0;color:var(--fg2);font-size:15px}
.foot{border-top:1px solid var(--line);padding:22px max(16px,calc(50vw - 430px)) 40px;color:var(--fg3);font-size:13px}.foot .fl{display:flex;flex-wrap:wrap;gap:6px 16px;margin-bottom:8px}.foot a{color:var(--fg2)}
@media (max-width:520px){.top{gap:8px}.logo{font-size:16px;gap:6px}.logo svg{width:20px;height:20px}.doors a{padding:6px 7px;font-size:13px}.facts{grid-template-columns:1fr;gap:2px}.facts dd{margin-bottom:8px}.lead{font-size:18px}.btn{flex:1 1 auto}}
'''

def _build_static(D):
    (dist / 'static.css').write_text(_STATIC_CSS, encoding='utf-8')
    PH, TREG, TPL, TFEAT, BX, BSIG = D['PH'], D['TREG'], D['TPL'], D['TFEAT'], D['BLDX'], D['BSIG']
    REG, ERA = D['BLD_REG'], D['BLD_ERA']
    BY = {b['id']: b for b in BX}; TP = {p['id']: p for p in TPL}
    def country(b):
        c = b['city']; i = c.rfind(',')
        return ('한국' if b['reg'] == 'kr' else c.strip()) if i < 0 else c[i + 1:].strip()
    def cityname(b): return b['city'].split(',')[0].strip()
    STOP = {}   # 해외 코스 스톱 bld id -> (도시, 스톱)
    for c in D['TV_ABROAD']:
        for s in c['stops']: STOP[s['bld']] = (c, s)
    SEASON = {}
    for se in D['TV_SEASON']:
        for sp in se['spots']: SEASON.setdefault(sp['id'], []).append((se, sp))
    titles = {}
    def T(t, alt):
        if t in titles: t = alt
        k = 2
        while t in titles: t = '%s (%d)' % (alt, k); k += 1
        titles[t] = 1; return t
    def near(p, n=5):
        L = sorted(((_hav(p, q), q) for q in TPL if q['id'] != p['id']), key=lambda x: x[0])[:n]
        return [('/travel/%s/' % q['id'], q['n'], '약 %s km' % (('%.1f' % d) if d < 10 else '%d' % round(d))) for d, q in L]
    bld_credit = lambda b: '사진: <a href="%s" rel="noopener">%s</a> · %s · Wikimedia Commons' % (_esc(_bld_file(b)), _esc(b.get('by') or '작가 미상'), _esc(b.get('lic') or ''))
    ph_credit = lambda p: '사진: <a href="%s" rel="noopener">%s</a> · %s · Wikimedia Commons' % (_esc(p[1]), _esc(p[2] or '작가 미상'), _esc(p[3]))
    nA = nT = nQ = nE = 0

    # ---------- 건축 아틀라스 ----------
    byArch, byCountry = {}, {}
    for b in BX:
        byArch.setdefault(b['arch'], []).append(b); byCountry.setdefault(country(b), []).append(b)
    for b in BX:
        cn = country(b); sig = BSIG.get(b['id'])
        img = _bld_img(b, 1280) if b.get('p') else None
        title = T('%s — %s · %s | ZIPLAN 건축 아틀라스' % (b['name'], b['arch'], b['year']), '%s(%s) — %s · %s | ZIPLAN 건축 아틀라스' % (b['name'], b['city'], b['arch'], b['year']))
        _yr = str(b['year']); _yr = _yr + '년' if _yr.strip().isdigit() else _yr
        desc = _clip('%s(%s, %s, %s) — %s. 사진 출처·3D 모형·같은 건축가의 다른 건물까지.' % (b['name'], b['arch'], _yr, b['city'], b['line'].rstrip('.')), 155)
        m = ['<p class="kick">%s · %s</p>' % (' · '.join(_esc(x) for x in dict.fromkeys([REG.get(b['reg'], ''), cn]) if x), _esc(ERA.get(b['era'], ''))),
             '<h1>%s</h1>' % _esc(b['name']), '<p class="sub">%s · %s · %s</p>' % (_esc(b['arch']), _esc(b['year']), _esc(b['city']))]
        if img:
            ss = '%s 500w, %s 1280w' % (_bld_img(b, 500), img) if (b.get('w') or 0) > 500 else ''
            m.append(_figure(img, ss, '%s (%s)' % (b['name'], b['city']), bld_credit(b)))
        else:
            m.append('<p class="nophoto">자유 라이선스 사진을 찾지 못한 건물이에요. 앱에서 단어로 지은 3D 모형으로 볼 수 있어요.</p>')
        m.append('<p class="lead">%s</p>' % _esc(b['line']))
        m.append('<div class="cta"><a class="btn" href="/#atlas?b=%s">3D 모형으로 보기</a><a class="btn ghost" href="/#atlas?b=%s&amp;build=1">이런 집 지어보기</a></div>' % (b['id'], b['id']))
        m.append('<dl class="facts"><dt>건축가</dt><dd>%s</dd><dt>연도</dt><dd>%s</dd><dt>도시</dt><dd>%s</dd><dt>지역</dt><dd>%s</dd><dt>시대</dt><dd>%s</dd>%s</dl>' % (
            _esc(b['arch']), _esc(b['year']), _esc(b['city']), _esc(REG.get(b['reg'], '')), _esc(ERA.get(b['era'], '')), ('<dt>모형</dt><dd>실제 치수로 지은 정교 모형</dd>' if sig else '')))
        if sig:
            s = ''
            if sig['desc']: s += '<p>%s</p>' % _esc(sig['desc'])
            if sig['dims']: s += '<p class="cap">치수: %s</p>' % _esc(sig['dims'])
            if sig['feats']: s += '<h3>특징</h3><ul class="pts">' + ''.join('<li>%s</li>' % _esc(x) for x in sig['feats']) + '</ul>'
            if sig['see']: s += '<h3>꼭 볼 곳</h3><ul class="pts">' + ''.join('<li>%s</li>' % _esc(x) for x in sig['see']) + '</ul>'
            m.append(_sec('정교 모형 — 치수와 특징', s))
        if b['keys']: m.append(_sec('이 건물을 말하는 단어', '<ul class="chips">' + ''.join('<li>%s</li>' % _esc(k) for k in b['keys']) + '</ul>'))
        go = []
        if b['id'] in TP: go.append(('/travel/%s/' % b['id'], '건축 여행: ' + TP[b['id']]['n'], TREG[TP[b['id']]['r']][0]))
        if b['id'] in STOP: go.append(('/travel/%s/' % b['id'], '답사 코스: ' + STOP[b['id']][0]['name'], STOP[b['id']][0]['country']))
        if b['id'] in TP: go += near(TP[b['id']], 4)
        m.append(_sec('가 보기', _links(go)))
        sa = [x for x in byArch[b['arch']] if x['id'] != b['id']][:10]
        m.append(_sec('%s의 다른 건물' % b['arch'], _links([('/atlas/%s/' % x['id'], x['name'], '%s · %s' % (x['year'], x['city'])) for x in sa])))
        sc = [x for x in byCountry[cn] if x['id'] != b['id'] and x['arch'] != b['arch']][:10]
        m.append(_sec('%s의 다른 건물' % cn, _links([('/atlas/%s/' % x['id'], x['name'], '%s · %s' % (x['arch'], x['year'])) for x in sc])))
        ld = {'@type': 'LandmarksOrHistoricalBuildings', 'name': b['name'], 'description': b['line'], 'url': _url('/atlas/%s/' % b['id']),
              'address': {'@type': 'PostalAddress', 'addressLocality': cityname(b), 'addressCountry': cn}}
        if img: ld['image'] = img
        _page('/atlas/%s/' % b['id'], title, desc, ''.join(m), img=img, img_alt=b['name'], ld=ld,
              crumbs=[('ZIPLAN', '/'), ('건축 아틀라스', '/atlas/'), (b['name'], '/atlas/%s/' % b['id'])]); nA += 1
    # 목록
    m = ['<p class="kick">집 구경 · 건축 아틀라스</p><h1>건축 아틀라스 — %d채</h1>' % len(BX),
         '<p class="lead">세계 %d개 나라의 건축 %d채. 건물마다 건축가·연도·한 줄 설명과 위키미디어 공용 사진(작가·라이선스 표기), 앱에서 바로 여는 3D 모형이 있어요.</p>' % (len(byCountry), len(BX)),
         '<div class="cta"><a class="btn" href="/#atlas">앱에서 아틀라스 열기</a></div>']
    for rk, rn in REG.items():
        cs = sorted({country(b) for b in BX if b['reg'] == rk}, key=lambda c: (-len(byCountry[c]), c))
        if not cs: continue
        s = ''
        for c in cs:
            L = [b for b in byCountry[c] if b['reg'] == rk]
            s += '<h3>%s <span class="cap">%d</span></h3>' % (_esc(c), len(L)) + _links([('/atlas/%s/' % b['id'], b['name'], '%s · %s' % (b['arch'], b['year'])) for b in L])
        m.append('<section class="grp"><h2>%s</h2>%s</section>' % (_esc(rn), s))
    _page('/atlas/', 'ZIPLAN 건축 아틀라스 — 세계 건축 %d채 사진·건축가·연도' % len(BX), _clip('종묘부터 시드니 오페라하우스까지, 세계 %d개 나라 건축 %d채를 나라·지역별로. 건축가·연도·한 줄 설명과 자유 라이선스 사진, 3D 모형.' % (len(byCountry), len(BX)), 155),
          ''.join(m), ld={'@type': 'CollectionPage', 'name': 'ZIPLAN 건축 아틀라스', 'url': _url('/atlas/')}, crumbs=[('ZIPLAN', '/'), ('건축 아틀라스', '/atlas/')], og_type='website')

    # ---------- 건축 여행: 국내 ----------
    for p in TPL:
        rn = TREG.get(p['r'], ['', ''])[0]; ph = PH.get(p['id']); img = _ph_img(ph, 1280) if ph else None
        title = T('%s — %s 건축 여행 · %s | ZIPLAN' % (p['n'], rn, p['a']), '%s(%s) — %s 건축 여행 | ZIPLAN' % (p['n'], p['a'], rn))
        desc = _clip('%s(%s, %s) — %s 볼 포인트: %s.' % (p['n'], p['a'], p['y'], p['why'], p['see']), 155)
        m = ['<p class="kick">%s · 건축 여행</p>' % _esc(rn), '<h1>%s</h1>' % _esc(p['n']), '<p class="sub">%s · %s</p>' % (_esc(p['a']), _esc(p['y']))]
        if ph:
            ss = '%s 500w, %s 1280w' % (_ph_img(ph, 500), img) if (ph[4] if len(ph) > 4 else 1920) > 500 else ''
            m.append(_figure(img, ss, p['n'], ph_credit(ph)))
        else:
            m.append('<p class="nophoto">상업적으로 쓸 수 있는 자유 라이선스 사진을 찾지 못해 사진을 싣지 않았어요.</p>')
        m.append('<p class="lead">%s</p>' % _esc(p['why']))
        cta = '<a class="btn" href="/#travel?p=%s">앱에서 지도·코스 보기</a>' % p['id']
        if p['id'] in BY: cta += '<a class="btn ghost" href="/#atlas?b=%s">3D 모형으로 보기</a><a class="btn ghost" href="/#atlas?b=%s&amp;build=1">이런 집 지어보기</a>' % (p['id'], p['id'])
        else: cta += '<a class="btn ghost" href="/#dna">이런 집 지어보기</a>'
        m.append('<div class="cta">%s</div>' % cta)
        m.append('<dl class="facts"><dt>지역</dt><dd>%s</dd><dt>설계</dt><dd>%s</dd><dt>연도</dt><dd>%s</dd><dt>볼 포인트</dt><dd>%s</dd><dt>지도</dt><dd><a href="https://map.kakao.com/link/map/%s,%s,%s" rel="noopener">카카오맵</a> · <a href="https://map.kakao.com/link/to/%s,%s,%s" rel="noopener">길찾기</a></dd></dl>' % (
            _esc(rn), _esc(p['a']), _esc(p['y']), _esc(p['see']), _esc(_q(p['n'], safe='')), p['lat'], p['lon'], _esc(_q(p['n'], safe='')), p['lat'], p['lon']))
        if TFEAT.get(p['id']): m.append(_sec('건축 포인트', '<ul class="pts">' + ''.join('<li>%s</li>' % _esc(x) for x in TFEAT[p['id']]) + '</ul>'))
        if SEASON.get(p['id']):
            m.append(_sec('계절 추천', ''.join('<h3>%s · %s</h3><p>%s</p>%s' % (_esc(se['name']), _esc(sp.get('when', '')), _esc(sp.get('why', '')), ('<p class="cap">%s</p>' % _esc(sp['note'])) if sp.get('note') else '') for se, sp in SEASON[p['id']])))
        if p.get('tags'): m.append('<ul class="chips">' + ''.join('<li>%s</li>' % _esc(t) for t in p['tags']) + '</ul>')
        m.append(_sec('근처 건축 여행지', _links(near(p, 6))))
        if p['id'] in BY: m.append(_sec('건축 아틀라스', _links([('/atlas/%s/' % p['id'], BY[p['id']]['name'], '건축가·사진·3D 모형')])))
        sr = [q for q in TPL if q['r'] == p['r'] and q['id'] != p['id']][:12]
        m.append(_sec('%s의 다른 건축 여행지' % rn, _links([('/travel/%s/' % q['id'], q['n'], q['a']) for q in sr])))
        ld = {'@type': 'TouristAttraction', 'name': p['n'], 'description': p['why'], 'url': _url('/travel/%s/' % p['id']),
              'geo': {'@type': 'GeoCoordinates', 'latitude': p['lat'], 'longitude': p['lon']},
              'address': {'@type': 'PostalAddress', 'addressRegion': rn, 'addressCountry': 'KR'}}
        if img: ld['image'] = img
        _page('/travel/%s/' % p['id'], title, desc, ''.join(m), img=img, img_alt=p['n'], ld=ld,
              crumbs=[('ZIPLAN', '/'), ('건축 여행', '/travel/'), (p['n'], '/travel/%s/' % p['id'])]); nT += 1
    # ---------- 건축 여행: 해외 코스 ----------
    for c in D['TV_ABROAD']:
        stops = [(s, BY[s['bld']]) for s in c['stops'] if s['bld'] in BY]
        img0 = next((_bld_img(b, 1280) for s, b in stops if b.get('p')), None)
        title = T('%s 건축 여행 코스 — 답사 %d곳 · %s | ZIPLAN' % (c['name'], len(stops), c['days']), '%s(%s) 건축 여행 코스 | ZIPLAN' % (c['name'], c['country']))
        desc = _clip('%s(%s) 건축 답사 %d곳과 날짜별 코스, 시기·항공·비자·물가·교통 팁. %s' % (c['name'], c['country'], len(stops), ', '.join(b['name'] for s, b in stops[:5])), 155)
        m = ['<p class="kick">%s · 해외 건축 여행</p>' % _esc(c['country']), '<h1>%s 건축 여행 코스</h1>' % _esc(c['name']), '<p class="sub">%s · %s · 답사 %d곳</p>' % (_esc(c['en']), _esc(c['days']), len(stops))]
        fl = c.get('fly') or {}; co = c.get('cost') or {}
        m.append('<dl class="facts"><dt>좋은 시기</dt><dd>%s</dd><dt>항공</dt><dd>%s · %s · %s</dd><dt>비자</dt><dd>%s</dd><dt>교통</dt><dd>%s</dd>%s</dl>' % (
            _esc(c['best']), _esc(fl.get('from', '')), _esc(fl.get('time', '')), _esc(fl.get('price', '')), _esc(c['visa']), _esc(c.get('transit', '')),
            ''.join('<dt>%s</dt><dd>%s</dd>' % (k2, _esc(co[k1])) for k1, k2 in (('coffee', '커피'), ('meal', '식사'), ('metro', '대중교통'), ('hostel', '숙소'), ('daily', '하루 예산')) if co.get(k1))))
        m.append('<p class="note">항공권·물가는 대략값이고 운영 시간은 바뀔 수 있어요. 출발 전에 공식 사이트에서 확인하세요.</p>')
        m.append('<div class="cta"><a class="btn" href="/#travel">앱에서 해외 코스·지도 보기</a></div>')
        m.append(_sec('답사 코스 %d곳' % len(stops), ''.join('<div class="stop"><b><a href="/travel/%s/">%s</a></b> <span class="cap">%s · %s</span><p>%s</p></div>' % (b['id'], _esc(b['name']), _esc(b['arch']), _esc(b['year']), _esc(s['note'])) for s, b in stops)))
        if c.get('route'): m.append(_sec('날짜별 코스', '<dl class="facts">' + ''.join('<dt>%s</dt><dd>%s</dd>' % (_esc(d), _esc(r)) for d, r in c['route']) + '</dl>'))
        if c.get('tips'): m.append(_sec('팁', '<ul class="pts">' + ''.join('<li>%s</li>' % _esc(t) for t in c['tips']) + '</ul>'))
        m.append(_sec('다른 해외 코스', _links([('/travel/%s/' % x['id'], x['name'], x['country']) for x in D['TV_ABROAD'] if x['id'] != c['id']])))
        ld = {'@type': 'TouristTrip', 'name': '%s 건축 여행 코스' % c['name'], 'description': desc, 'url': _url('/travel/%s/' % c['id']),
              'itinerary': {'@type': 'ItemList', 'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'item': {'@type': 'TouristAttraction', 'name': b['name'], 'url': _url('/travel/%s/' % b['id'])}} for i, (s, b) in enumerate(stops)]}}
        _page('/travel/%s/' % c['id'], title, desc, ''.join(m), img=img0, img_alt=c['name'], ld=ld,
              crumbs=[('ZIPLAN', '/'), ('건축 여행', '/travel/'), (c['name'], '/travel/%s/' % c['id'])]); nT += 1
        for s, b in stops:
            img = _bld_img(b, 1280) if b.get('p') else None
            title = T('%s — %s 건축 답사 · %s | ZIPLAN' % (b['name'], c['name'], b['arch']), '%s(%s) — 건축 답사 | ZIPLAN' % (b['name'], b['city']))
            desc = _clip('%s(%s, %s) — %s 운영: %s' % (b['name'], b['arch'], b['year'], s['note'], s.get('hours', '')), 155)
            mm = ['<p class="kick">%s · %s 건축 답사</p>' % (_esc(c['country']), _esc(c['name'])), '<h1>%s</h1>' % _esc(b['name']), '<p class="sub">%s · %s · %s</p>' % (_esc(b['arch']), _esc(b['year']), _esc(b['city']))]
            if img:
                ss = '%s 500w, %s 1280w' % (_bld_img(b, 500), img) if (b.get('w') or 0) > 500 else ''
                mm.append(_figure(img, ss, b['name'], bld_credit(b)))
            mm.append('<p class="lead">%s</p>' % _esc(s['note']))
            mm.append('<div class="cta"><a class="btn" href="/#atlas?b=%s">3D 모형으로 보기</a><a class="btn ghost" href="/#atlas?b=%s&amp;build=1">이런 집 지어보기</a></div>' % (b['id'], b['id']))
            mm.append('<dl class="facts"><dt>운영</dt><dd>%s</dd><dt>근처</dt><dd>%s</dd><dt>코스</dt><dd><a href="/travel/%s/">%s 건축 여행 코스</a></dd></dl>' % (_esc(s.get('hours', '')), _esc(s.get('near', '')), c['id'], _esc(c['name'])))
            mm.append('<p class="note">운영 시간·관람 조건은 바뀔 수 있어요. 방문 전 공식 사이트에서 확인하세요.</p>')
            mm.append(_sec('건축 아틀라스', _links([('/atlas/%s/' % b['id'], b['name'], '건축가·사진·한 줄 설명')])))
            mm.append(_sec('%s 코스의 다른 곳' % c['name'], _links([('/travel/%s/' % x['id'], x['name'], x['arch']) for t, x in stops if x['id'] != b['id']])))
            ld = {'@type': 'TouristAttraction', 'name': b['name'], 'description': s['note'], 'url': _url('/travel/%s/' % b['id']),
                  'address': {'@type': 'PostalAddress', 'addressLocality': cityname(b), 'addressCountry': country(b)}}
            if img: ld['image'] = img
            _page('/travel/%s/' % b['id'], title, desc, ''.join(mm), img=img, img_alt=b['name'], ld=ld,
                  crumbs=[('ZIPLAN', '/'), ('건축 여행', '/travel/'), (c['name'], '/travel/%s/' % c['id']), (b['name'], '/travel/%s/' % b['id'])]); nT += 1
    m = ['<p class="kick">집 구경 · 건축 여행</p><h1>건축 여행 — 국내 %d곳 · 해외 %d도시</h1>' % (len(TPL), len(D['TV_ABROAD'])),
         '<p class="lead">건축으로 고른 국내 여행지 %d곳과 해외 답사 코스 %d곳. 장소마다 볼 포인트·건축 포인트·근처 여행지, 자유 라이선스 사진(작가·라이선스 표기)을 모았어요.</p>' % (len(TPL), len(STOP)),
         '<div class="cta"><a class="btn" href="/#travel">앱에서 지도·코스 짜기</a></div>']
    for rk, (rn, _c) in TREG.items():
        L = [p for p in TPL if p['r'] == rk]
        if L: m.append('<section class="grp"><h2>%s <span class="cap">%d</span></h2>%s</section>' % (_esc(rn), len(L), _links([('/travel/%s/' % p['id'], p['n'], p['a']) for p in L])))
    m.append('<section class="grp"><h2>해외 건축 답사 코스</h2>%s</section>' % _links([('/travel/%s/' % c['id'], '%s 건축 여행 코스' % c['name'], '%s · %d곳' % (c['country'], len(c['stops']))) for c in D['TV_ABROAD']]))
    _page('/travel/', 'ZIPLAN 건축 여행 — 국내 건축 여행지 %d곳 · 해외 답사 코스' % len(TPL), _clip('서울·경주·안동·제주부터 도쿄·교토·싱가포르까지. 건축으로 고른 국내 %d곳과 해외 %d도시 답사 코스, 볼 포인트와 근처 여행지.' % (len(TPL), len(D['TV_ABROAD'])), 155),
          ''.join(m), ld={'@type': 'CollectionPage', 'name': 'ZIPLAN 건축 여행', 'url': _url('/travel/')}, crumbs=[('ZIPLAN', '/'), ('건축 여행', '/travel/')], og_type='website')

    # ---------- 건축 물어보기 ----------
    SKIP = re.compile(r'^\^|안녕|고마워|고맙|뭘 ?물어|농담|지쳤|망했|굿 ?나잇|잘 ?자|멋지다|배고|사귀자|심심')
    LAW = re.compile(r'건축법|시행령|조례|주차장법|국토계획법|법률|허가|신고')
    KB = [k for k in D['KB2'] if not (k['cat'] == '일상' and SKIP.search(k['re'][:40])) and not (k['cat'] == '놀이' and k['re'].startswith('심심'))]
    byCat = {}
    for k in KB: byCat.setdefault(k['cat'], []).append(k)
    for k in KB:
        path = '/ask/%s/' % k['slug']; ans = _txt(k['html'])
        title = T('%s — %s | ZIPLAN 건축 물어보기' % (k['topic'], k['cat']), '%s (%s) — %s | ZIPLAN 건축 물어보기' % (k['topic'], k['alt'], k['cat']))
        desc = _clip(ans, 150)
        m = ['<p class="kick">건축 물어보기 · %s</p>' % _esc(k['cat']), '<h1>%s</h1>' % _esc(k['topic'])]
        if k['alt'] and k['topic'] not in k['alt']: m.append('<p class="sub">%s</p>' % _esc(k['alt']))
        m.append('<div class="ans">%s</div>' % k['html'])
        if k['cat'] in ('법규', '도시') or (k['cat'] in ('시공·비용', '일상', '진로', '학업') and LAW.search(ans)):
            m.append('<p class="note">개략 안내예요. 실제 기준은 지자체 조례·개정 법령·대지 조건에 따라 달라요 — 관할 관청(시·군·구 건축 담당 부서)과 공식 자료로 꼭 확인하세요.</p>')
        cta = '<a class="btn" href="/#ask?q=%s">ZIPLAN에서 이어서 묻기</a>' % _esc(_enc(k['slug']))
        if k['go'] and k['go'].startswith('#'): cta += '<a class="btn ghost" href="/%s">%s</a>' % (_esc(k['go']), _esc(k['gol'] or '앱에서 열기'))
        m.append('<div class="cta">%s</div>' % cta)
        L = byCat[k['cat']]; i = L.index(k); rel = (L[i + 1:] + L[:i])[:10]
        m.append(_sec('%s — 다른 질문' % k['cat'], _links([('/ask/%s/' % x['slug'], x['topic'], '') for x in rel])))
        ld = {'@type': 'FAQPage', 'url': _url(path), 'mainEntity': [{'@type': 'Question', 'name': k['topic'], 'acceptedAnswer': {'@type': 'Answer', 'text': _clip(ans, 1200)}}]}
        _page(path, title, desc, ''.join(m), ld=ld, crumbs=[('ZIPLAN', '/'), ('건축 물어보기', '/ask/'), (k['topic'], path)]); nQ += 1
    m = ['<p class="kick">건축 공부 · 물어보기</p><h1>건축 물어보기 — %d개 질문</h1>' % len(KB),
         '<p class="lead">평면도·건폐율·캔틸레버부터 건축사 시험, 답사 준비, 집 짓는 순서까지. ZIPLAN 길잡이가 쉬운 말로 답한 질문을 분류별로 모았어요. 법규 답은 개략이니 관할 관청에서 꼭 확인하세요.</p>',
         '<div class="cta"><a class="btn" href="/#ask?q=">앱에서 물어보기</a></div>']
    for cat, L in byCat.items():
        m.append('<section class="grp"><h2>%s <span class="cap">%d</span></h2>%s</section>' % (_esc(cat), len(L), _links([('/ask/%s/' % x['slug'], x['topic'], '') for x in L])))
    _page('/ask/', 'ZIPLAN 건축 물어보기 — 용어·법규·구조·거장 %d문답' % len(KB), _clip('건축 용어, 법규, 구조, 재료, 환경, 역사, 거장, 한옥, 도면, 학업·진로, 집 짓기까지 — 쉬운 말로 답한 건축 질문 %d개.' % len(KB), 155),
          ''.join(m), ld={'@type': 'CollectionPage', 'name': 'ZIPLAN 건축 물어보기', 'url': _url('/ask/')}, crumbs=[('ZIPLAN', '/'), ('건축 물어보기', '/ask/')], og_type='website')

    # ---------- 건축 사전 ----------
    ENC = D['ENC']; EB = {e['id']: e for e in ENC}
    for e in ENC:
        path = '/dict/%s/' % e['id']
        title = T('%s(%s) 뜻 — 그림으로 보는 건축 사전 | ZIPLAN' % (e['t'], e['en']), '%s(%s) — %s | ZIPLAN 건축 사전' % (e['t'], e['en'], e['cat']))
        desc = _clip('%s(%s): %s' % (e['t'], e['en'], e['easy']), 155)
        m = ['<p class="kick">건축 사전 · %s</p>' % _esc(e['cat']), '<h1>%s <small>%s</small></h1>' % (_esc(e['t']), _esc(e['en']))]
        if e.get('al'): m.append('<p class="sub">다른 말: %s</p>' % _esc(', '.join(e['al'])))
        if e.get('svg'): m.append('<div class="diag">%s</div><p class="cap">그림: ZIPLAN 도해</p>' % e['svg'])
        m.append('<p class="lead">%s</p>' % _esc(e['easy']))
        if e.get('pts'): m.append('<ul class="pts">' + ''.join('<li>%s</li>' % _esc(x) for x in e['pts']) + '</ul>')
        m.append('<div class="cta"><a class="btn" href="/#ask?q=%s">ZIPLAN에서 물어보기</a></div>' % _esc(_enc(e['t'].replace(' ', ''))))
        ex = []
        for lab, i in e.get('ex', []):
            if i in TP: ex.append(('/travel/%s/' % i, lab, '건축 여행'))
            elif i in BY: ex.append(('/atlas/%s/' % i, lab, '건축 아틀라스'))
        m.append(_sec('실제 건물에서 보기', _links(ex)))
        m.append(_sec('같이 보면 좋은 말', _links([('/dict/%s/' % i, EB[i]['t'], EB[i]['en']) for i in e.get('see', []) if i in EB])))
        sc = [x for x in ENC if x['cat'] == e['cat'] and x['id'] != e['id'] and x['id'] not in e.get('see', [])]
        m.append(_sec('%s 분류의 다른 말' % e['cat'], _links([('/dict/%s/' % x['id'], x['t'], x['en']) for x in sc])))
        ld = {'@type': 'DefinedTerm', 'name': e['t'], 'alternateName': [e['en']] + list(e.get('al', [])), 'description': e['easy'], 'url': _url(path),
              'inDefinedTermSet': {'@type': 'DefinedTermSet', 'name': 'ZIPLAN 건축 사전', 'url': _url('/dict/')}}
        _page(path, title, desc, ''.join(m), ld=ld, crumbs=[('ZIPLAN', '/'), ('건축 사전', '/dict/'), (e['t'], path)]); nE += 1
    cats = []
    for e in ENC:
        if e['cat'] not in cats: cats.append(e['cat'])
    m = ['<p class="kick">건축 공부 · 건축 사전</p><h1>그림으로 보는 건축 사전 — %d개</h1>' % len(ENC),
         '<p class="lead">스킵플로어, 캔틸레버, 처마, 용적률… 어려운 건축 용어를 그림 한 장과 쉬운 문장으로 풀었어요.</p>']
    for cat in cats:
        L = [e for e in ENC if e['cat'] == cat]
        m.append('<section class="grp"><h2>%s <span class="cap">%d</span></h2>%s</section>' % (_esc(cat), len(L), _links([('/dict/%s/' % e['id'], e['t'], e['en']) for e in L])))
    _page('/dict/', 'ZIPLAN 건축 사전 — 그림으로 보는 건축 용어 %d개' % len(ENC), _clip('공간·구조·환경·법규·한옥·도면·재료 — 건축 용어 %d개를 그림 한 장과 쉬운 설명으로.' % len(ENC), 155),
          ''.join(m), ld={'@type': 'DefinedTermSet', 'name': 'ZIPLAN 건축 사전', 'url': _url('/dict/')}, crumbs=[('ZIPLAN', '/'), ('건축 사전', '/dict/')], og_type='website')

    # ---------- 404 · sitemap · robots ----------
    _page('/404.html', '페이지를 찾을 수 없어요 | ZIPLAN', '요청한 페이지가 없어요. 건축 아틀라스·건축 여행·물어보기·사전에서 찾아보세요.',
          '<p class="kick">404</p><h1>페이지를 찾을 수 없어요</h1><p class="lead">주소가 바뀌었거나 없는 페이지예요. 아래에서 다시 찾아보세요.</p>'
          '<div class="cta"><a class="btn" href="/">ZIPLAN 홈</a><a class="btn ghost" href="/atlas/">건축 아틀라스</a><a class="btn ghost" href="/travel/">건축 여행</a><a class="btn ghost" href="/ask/">건축 물어보기</a><a class="btn ghost" href="/dict/">건축 사전</a></div>', noindex=True)
    urls = ['/'] + [p for p, _ in _PAGES]
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls: sm.append('<url><loc>%s</loc><lastmod>%s</lastmod></url>' % (_esc(_url(u)), BUILD_DATE))
    sm.append('</urlset>')
    (dist / 'sitemap.xml').write_text('\n'.join(sm) + '\n', encoding='utf-8')
    (dist / 'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: %s/sitemap.xml\n' % SITE_URL, encoding='utf-8')
    sz = sum(s for _, s in _PAGES)
    print('정적 페이지: 아틀라스 %d · 여행 %d · 물어보기 %d · 사전 %d + 목록 4 = %d쪽, 평균 %.1f KB, 합계 %d KB, sitemap URL %d, %.1f초' % (
        nA, nT, nQ, nE, len(_PAGES), sz / len(_PAGES) / 1024, sz / 1024, len(urls), _st.time() - _t0))

_r2 = subprocess.run(['node', '-e', _EXTRACT], input=(root / 'crit.html').read_bytes(), capture_output=True)
if _r2.returncode == 0:
    _build_static(_sj.loads(_r2.stdout.decode('utf-8')))
else:
    print('경고: 정적 페이지 데이터 추출 실패 — 정적 페이지 없이 진행', _r2.stderr.decode('utf-8')[:600])

# vercel.json: 정적 사이트, 캐시
(dist / 'vercel.json').write_text('{"images":{"sizes":[128,256,384,640,960,1280,1920],"formats":["image/avif","image/webp"],"minimumCacheTTL":2678400,"remotePatterns":[{"protocol":"https","hostname":"d8j0ntlcm91z4.cloudfront.net"},{"protocol":"https","hostname":"upload.wikimedia.org","pathname":"/wikipedia/commons/**"}]},"cleanUrls":true,"headers":[{"source":"/(.*)","headers":[{"key":"X-Content-Type-Options","value":"nosniff"}]},{"source":"/(vendor|effects|data)/(.*)","headers":[{"key":"Cache-Control","value":"public, max-age=86400"}]},{"source":"/static.css","headers":[{"key":"Cache-Control","value":"public, max-age=3600"}]},{"source":"/sitemap.xml","headers":[{"key":"Content-Type","value":"application/xml; charset=utf-8"}]}]}', encoding='utf-8')
files = [str(p.relative_to(dist)) for p in dist.rglob('*') if p.is_file()]
total = sum((dist / f).stat().st_size for f in files)
print(len(files), 'files,', round(total/1024), 'KB'); print('\n'.join(sorted(f for f in files if not re.match(r'(atlas|travel|ask|dict)/', f))))
