# Extração dos assets do PDF original

Scripts usados para gerar `public/assets/` a partir de `Lulu (digital).pdf`. Requer poppler-utils e Python com Pillow, NumPy e SciPy.

```bash
mkdir -p work/render && pdftoppm -r 200 -png "Lulu (digital).pdf" work/render/p
python3 cutout.py work/render work/cut      # recortes da Lulu (fundo removido por flood fill a partir das bordas)
python3 decor.py  work/render work/dec      # elementos decorativos (corações, notas, letras…)
# export.py espera work/cut, work/dec, work/render e os mockups em ../images/{1..4}.jpg
python3 export.py work ../../public/assets  # WebP responsivo + og-image + favicon
```

Os recortes não alteram traço nem cor da ilustração, só removem o fundo.
