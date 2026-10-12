#!/usr/bin/env python3
"""ZIPLAN 공개 사이트 빌드 — crit.html(클로드 아티팩트용)에서 dist/ (실제 웹 배포용)를 만든다.
   - 표준 HTML 뼈대(doctype·viewport·OG) 감싸기
   - pdf.js는 CDN(cdnjs)에서 (1.4MB 워커를 배포 파일에 넣지 않음)
   - claude.ai 전용 문구를 공개용으로 바꿈 (AI·로그인·광장은 베타 준비 중)
   원본 crit.html은 수정하지 않는다."""
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
<meta property="og:image" content="img/house-dusk.jpg">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
'''
assert s.startswith('<meta charset="utf-8">\n')
s = s[len('<meta charset="utf-8">\n'):]
# head 끝 = </style> 다음 (첫 <nav> 앞)
i = s.index('<nav>')
s = head + s[:i] + '</head>\n<body>\n' + s[i:] + '\n</body>\n</html>\n'

# pdf.js → CDN
s = s.replace("const base=new URL('vendor/pdfjs/',location.href);", "const base='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/';")
# 공개용 문구
s = s.replace('<b>AI 준비 중</b> claude.ai 안에서 열면 AI 버튼이 켜집니다. 계산과 배치는 지금도 됩니다.',
              '<b>베타</b> AI 제안·크릿, 로그인, 광장은 정식 오픈 때 열립니다. 내집코드·대지·도면·모형·패널·자료실은 지금 바로 됩니다.')
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
(dist / 'index.html').write_text(s, encoding='utf-8')

# favicon: 마크 SVG
(dist / 'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a9bff"/><stop offset="1" stop-color="#1f5bff"/></linearGradient></defs><rect width="100" height="100" rx="24" fill="url(#g)"/><path d="M32 75V39L50 25L68 39V56H32" fill="none" stroke="#fff" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/></svg>', encoding='utf-8')

# 지원 파일
for rel in ['privacy.html','terms.html','vendor/liquid-glass/container.js','vendor/liquid-glass/button.js','vendor/liquid-glass/glass.css','vendor/liquid-glass/LICENSE','vendor/html2canvas.min.js','vendor/html2canvas.LICENSE','effects/nav-glass.js','effects/nav-glass.css','effects/shader-gradient.js','data/portfolio.js','data/library.js','img/house-dusk.jpg','img/p-sketch.webp','img/p-model.webp','img/p-crit.webp','img/alt-site.webp','img/alt-a.webp','img/alt-b.webp','img/alt-c.webp']+['img/%s.avif'%n for n in ('f-site','f-sketch','f-plan','f-mass','f-model','f-build','f-home','pn-aerial','pn-persp','pn-concept')]+['img/l-%s-%s%s.webp'%(l,o,sz) for l in ('bg','mid','fg') for o in ('off','on') for sz in ('','-960')]:
    if not (root / rel).exists():
        print('WARNING missing', rel); continue
    (dist / rel).parent.mkdir(parents=True, exist_ok=True)
    shutil.copy(root / rel, dist / rel)

# vercel.json: 정적 사이트, 캐시
(dist / 'vercel.json').write_text('{"images":{"sizes":[640,960,1280,1920],"formats":["image/avif","image/webp"],"minimumCacheTTL":2678400,"remotePatterns":[{"protocol":"https","hostname":"d8j0ntlcm91z4.cloudfront.net"}]},"cleanUrls":true,"headers":[{"source":"/(.*)","headers":[{"key":"X-Content-Type-Options","value":"nosniff"}]},{"source":"/(vendor|effects|data)/(.*)","headers":[{"key":"Cache-Control","value":"public, max-age=86400"}]}]}', encoding='utf-8')
files = [str(p.relative_to(dist)) for p in dist.rglob('*') if p.is_file()]
total = sum((dist / f).stat().st_size for f in files)
print(len(files), 'files,', round(total/1024), 'KB'); print('\n'.join(sorted(files)))
