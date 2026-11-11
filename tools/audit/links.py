#!/usr/bin/env python3
"""정적 링크 점검: python3 links.py <dist>
dist의 모든 html에서 href/src(로컬)를 모아 파일이 있는지 확인. cleanUrls(/x → x.html, /x/ → x/index.html).
앱 해시(#route)는 crit.html VIEWS에 있는지, 같은 페이지 #id는 id가 있는지 확인."""
import os, re, sys, html
from urllib.parse import urlparse, unquote
D = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else 'dist')
idx = open(os.path.join(D, 'index.html'), encoding='utf-8').read()
m = re.search(r"const VIEWS\s*=\s*\[([^\]]+)\]", idx)
VIEWS = set(re.findall(r"'([\w-]+)'", m.group(1))) if m else set()
VIEWS |= set(re.findall(r'id="view-([\w-]+)"', idx))
def exists(p):
    p = unquote(p)
    f = os.path.join(D, p.lstrip('/'))
    if p.endswith('/'): return os.path.isfile(os.path.join(f, 'index.html'))
    return os.path.isfile(f) or os.path.isfile(f + '.html') or os.path.isfile(os.path.join(f, 'index.html'))
bad = {}; n = 0; files = 0
ids_cache = {}
for root, _, fs in os.walk(D):
    for fn in fs:
        if not fn.endswith('.html'): continue
        fp = os.path.join(root, fn); files += 1
        rel = '/' + os.path.relpath(fp, D).replace(os.sep, '/')
        base = rel.rsplit('/', 1)[0] + '/'
        if rel.endswith('/index.html'): pass
        s = open(fp, encoding='utf-8').read()
        if fn == 'index.html' and root == D:
            s = re.sub(r'<script\b[^>]*>.*?</script>', '', s, flags=re.S)  # 앱 스크립트 안 문자열은 제외
        ids = set(re.findall(r'\bid="([^"]+)"', s))
        for a in re.findall(r'''(?:href|src)\s*=\s*"([^"]*)"''', s):
            a = html.unescape(a).strip()
            if not a or a.startswith(('mailto:', 'tel:', 'javascript:', 'data:', 'http://', 'https://', '//')):
                continue
            n += 1
            u = urlparse(a)
            ok = True
            if not u.path:
                frag = u.fragment.split('?')[0]
                if frag and frag not in ids and not (rel == '/index.html' and frag in VIEWS):
                    ok = False
            else:
                p = u.path if u.path.startswith('/') else base + u.path
                p = os.path.normpath(p).replace(os.sep, '/') + ('/' if u.path.endswith('/') else '')
                if not exists(p): ok = False
                elif u.fragment and (p in ('/', '/index.html')):
                    frag = u.fragment.split('?')[0]
                    if frag not in VIEWS and frag not in set(re.findall(r'\bid="([^"]+)"', idx)): ok = False
            if not ok: bad.setdefault(a, []).append(rel)
print('files', files, 'links', n, 'broken', len(bad))
for a, w in sorted(bad.items(), key=lambda x: -len(x[1]))[:60]:
    print(' ', a, len(w), w[:3])
