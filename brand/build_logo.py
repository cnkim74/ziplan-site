INK='#111111'; BLUE='#2b6cff'
Z='<path d="M4 6H56V16L23 38H56V48H4V38L37 16H4Z"/>'
I='<rect x="76" y="6" width="12" height="42"/>'
P='<rect x="4" y="54" width="92" height="10"/><rect x="4" y="54" width="12" height="44"/><rect x="84" y="54" width="12" height="34"/><rect x="4" y="78" width="92" height="10"/>'
def mark(ink=INK,blue=BLUE): return f'<g fill="{ink}">{Z}{I}</g><g fill="{blue}">{P}</g>'
# wordmark: cap height 48, stroke 11, x advance
def L_Z(x): return f'<path transform="translate({x} 0)" d="M0 0H40V10L14 38H40V48H0V38L26 10H0Z"/>',40
def L_I(x): return f'<rect x="{x}" y="0" width="11" height="48"/>',11
def L_P(x): return f'<path transform="translate({x} 0)" d="M0 0H38V30H11V48H0ZM11 10V20H27V10Z" fill-rule="evenodd"/>',38
def L_L(x): return f'<path transform="translate({x} 0)" d="M0 0H11V38H34V48H0Z"/>',34
def L_A(x): return f'<path transform="translate({x} 0)" d="M0 0H40V48H29V30H11V48H0ZM11 10V20H29V10Z" fill-rule="evenodd"/>',40
def L_N(x): return f'<path transform="translate({x} 0)" d="M0 0H12L29 30V0H40V48H28L11 18V48H0Z"/>',40
def word(ink=INK,blue=BLUE,gap=9):
    x=0; parts=[]
    for f,c in [(L_Z,ink),(L_I,ink),(L_P,blue),(L_L,ink),(L_A,ink),(L_N,ink)]:
        s,w=f(x); parts.append(f'<g fill="{c}">{s}</g>'); x+=w+gap
    return ''.join(parts), x-gap
def svg(body,vb,w=None,h=None,bg=None,rx=0):
    vx,vy,vw,vh=vb; b=f'<rect x="{vx}" y="{vy}" width="{vw}" height="{vh}" rx="{rx}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vx} {vy} {vw} {vh}"'+(f' width="{w}" height="{h}"' if w else '')+f'>{b}{body}</svg>'
out={}
out['ziplan-mark.svg']=svg(mark(),(-6,-6,112,112))
out['ziplan-mark-white.svg']=svg(mark('#ffffff','#4f8dff'),(-6,-6,112,112))
out['ziplan-app-icon.svg']=svg(f'<g transform="translate(14 14)">{mark("#ffffff","#4f8dff")}</g>',(0,0,128,128),bg='#111111',rx=28)
wd,ww=word()
out['ziplan-wordmark.svg']=svg(wd,(-4,-4,ww+8,56))
wdw,_=word('#ffffff','#4f8dff')
# horizontal lockup: mark 104 tall, wordmark scaled to cap 48 -> center
def lock(ink,blue,bg=None):
    m=mark(ink,blue); w,ww=word(ink,blue)
    s=0.86; gx=128
    body=f'{m}<g transform="translate({gx} {50-24*s}) scale({s})">{w}</g>'
    return svg(body,(-8,-8,gx+ww*s+16,116),bg=bg)
out['ziplan-logo-horizontal.svg']=lock(INK,BLUE)
out['ziplan-logo-horizontal-white.svg']=lock('#ffffff','#4f8dff')
# stacked
w2,ww2=word()
out['ziplan-logo-stacked.svg']=svg(f'<g transform="translate({(ww2*0.9-100)/2} 0)">{mark()}</g><g transform="translate(0 122) scale(0.9)">{w2}</g>',(-10,-10,ww2*0.9+20,186))
for k,v in out.items(): open(k,'w').write(v)
print(ww, list(out))
