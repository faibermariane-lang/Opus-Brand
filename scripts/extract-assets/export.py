import os, sys
from PIL import Image
S, D = sys.argv[1], sys.argv[2]   # scratch dir, public/assets dir
def save(im, path, widths, q=82):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    for w in widths:
        x = im.copy()
        if x.width > w: x = x.resize((w, round(x.height * w / x.width)), Image.LANCZOS)
        x.save(f"{path}-{w}.webp", "WEBP", quality=q, method=6)
lulu = {"lulu-cover-smile":"p01","lulu-full-crayon":"p02","lulu-reading":"p06","lulu-worried":"p05",
        "lulu-thinking":"p07","lulu-calm-desk":"p12","lulu-happy-arms":"p13","lulu-peek":"p17"}
for n,p in lulu.items():
    save(Image.open(f"{S}/cut/{n}.png"), f"{D}/lulu/{n}", [480, 960])
for f in os.listdir(f"{S}/dec"):
    im = Image.open(f"{S}/dec/{f}")
    im.save(f"{D}/decorative/{f[:-4]}.webp" if os.makedirs(f"{D}/decorative", exist_ok=True) is None else "", "WEBP", quality=88, method=6)
pages = {2:"essa-e-a-lulu",3:"parede-da-sala",4:"texturas-e-musicas",5:"barulhos-altos",6:"rotina-na-escola",
         7:"surpresa",8:"muitos-sons",9:"silencio",10:"cartao-da-professora",11:"amigos-esperando",12:"lulu-voltou",
         13:"so-preciso-de-calma",14:"luz-atras-das-nuvens",15:"atividades-desenho-conforto",16:"atividades-rotina-emocoes",1:"capa-dedicatoria",17:"contracapa-obrigada"}
for p,n in pages.items():
    im = Image.open(f"{S}/render/p-{p:02d}.png").convert("RGB")
    save(im, f"{D}/illustrations/p{p:02d}-{n}", [800, 1600], q=80)
mock = {1:"livro-aberto-rotina",2:"livro-aberto-barulhos",3:"capa-e-contracapa",4:"livro-capa"}
for i,n in mock.items():
    im = Image.open(f"{S}/../images/{i}.jpg").convert("RGB")
    save(im, f"{D}/products/mockup-{n}", [800, 1600], q=80)
# OG image 1200x630 from the cover mockup
im = Image.open(f"{S}/../images/4.jpg").convert("RGB")
w,h = im.size; th = round(w*630/1200); top=(h-th)//2
im.crop((0,top,w,top+th)).resize((1200,630), Image.LANCZOS).save(f"{D}/og-image.jpg", quality=85)
# favicon from the peek cutout (head)
ic = Image.open(f"{S}/cut/lulu-peek.png"); s=min(ic.size); 
ic.crop(((ic.width-ic.height)//2,0,(ic.width-ic.height)//2+ic.height,ic.height)).resize((192,192),Image.LANCZOS).save(f"{D}/favicon-192.png")
