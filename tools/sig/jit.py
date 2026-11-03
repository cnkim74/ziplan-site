import sys
from PIL import Image, ImageChops
a=Image.open(sys.argv[1]).convert('RGB'); b=Image.open(sys.argv[2]).convert('RGB')
d=ImageChops.difference(a,b).convert('L')
th=int(255*.12)
m=d.point(lambda v:255 if v>th else 0)
n=sum(1 for v in m.getdata() if v)
m.save(sys.argv[3])
print(n)
