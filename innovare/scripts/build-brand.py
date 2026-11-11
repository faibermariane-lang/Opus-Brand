"""Gera os SVGs da marca a partir do PDF vetorial do logo (pdftocairo -svg).
Uso: python3 -I scripts/build-brand.py assets-marca/logo-innovare-pdf-p1.svg
(o SVG vem de: pdftocairo -svg -f 1 -l 1 assets-marca/Logo-INNOVARE.pdf)
Saída: public/brand/*.svg e src/components/brand/paths.ts
"""
import re, sys, json, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
src = pathlib.Path(sys.argv[1]).read_text()
ds = re.findall(r' d="([^"]+)"', src)
def bbox(d):
    n = [float(x) for x in re.findall(r'-?\d+\.?\d*', d)]
    xs, ys = n[0::2], n[1::2]
    return min(xs), min(ys), max(xs), max(ys)
word, sub = [], []
for d in ds:
    b = bbox(d)
    (sub if b[1] > 380 else word).append(d)
def union(lst):
    bs = [bbox(d) for d in lst]
    return min(b[0] for b in bs), min(b[1] for b in bs), max(b[2] for b in bs), max(b[3] for b in bs)
W = union(word); A = union(word + sub)
def r(v): return round(v, 2)
def compact(d):
    return re.sub(r'(\d+\.\d{2})\d+', r'\1', d).replace(' Z M', 'ZM').strip()
word = [compact(d) for d in word]; sub = [compact(d) for d in sub]
pad = 2
full_vb = f"{r(A[0]-pad)} {r(A[1]-pad)} {r(A[2]-A[0]+2*pad)} {r(A[3]-A[1]+2*pad)}"
word_vb = f"{r(W[0]-pad)} {r(W[1]-pad)} {r(W[2]-W[0]+2*pad)} {r(W[3]-W[1]+2*pad)}"
# Símbolo redesenhado como traço (centro 0,0) a partir das medidas do original
LENS = "M -157 -184 A 251.6 251.6 0 0 1 157 -184 A 251.6 251.6 0 0 1 -157 -184 Z"
DIAMOND = "M -104 -104 A 229 229 0 0 0 104 -104 A 229 229 0 0 0 104 104 A 229 229 0 0 0 -104 104 A 229 229 0 0 0 -104 -104 Z"
CIRCLE_R = 296.6
STROKE = 7.6
colors = {"green": "#09281C", "gold": "#D5B26F", "cream": "#F0E6C2"}
out = root / "public" / "brand"; out.mkdir(parents=True, exist_ok=True)
def symbol_body(color, sw=STROKE):
    lenses = "".join(f'<path d="{LENS}" transform="rotate({a})"/>' for a in (0, 90, 180, 270))
    return (f'<g fill="none" stroke="{color}" stroke-width="{sw}" stroke-linejoin="miter">'
            f'<circle r="{CIRCLE_R}"/>{lenses}<path d="{DIAMOND}"/></g>')
def paths(lst, color):
    return "".join(f'<path d="{d}"/>' for d in lst).join([f'<g fill="{color}">', '</g>'])
for name, c in colors.items():
    (out / f"symbol-{name}.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-304 -304 608 608" role="img" aria-label="Símbolo Innovare">{symbol_body(c)}</svg>\n')
    (out / f"logo-{name}.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{full_vb}" role="img" aria-label="Innovare Contabilidade">{paths(word + sub, c)}</svg>\n')
    (out / f"wordmark-{name}.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{word_vb}" role="img" aria-label="Innovare">{paths(word, c)}</svg>\n')
    # Empilhado: símbolo acima do logotipo
    lw, lh = A[2]-A[0], A[3]-A[1]
    s = 0.62 * lh / 304  # símbolo com altura ~1.24x a do logotipo
    sym_h = 608 * s
    gap = lh * 0.35
    H = sym_h + gap + lh
    (out / f"logo-stacked-{name}.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {r(lw)} {r(H)}" role="img" aria-label="Innovare Contabilidade">'
        f'<g transform="translate({r(lw/2)} {r(sym_h/2)}) scale({r(s*1000)/1000})">{symbol_body(c, 10)}</g>'
        f'<g transform="translate({r(-A[0])} {r(sym_h + gap - A[1])})">{paths(word + sub, c)}</g></svg>\n')
    # Horizontal: símbolo à esquerda do logotipo
    ww, wh = W[2]-W[0], W[3]-W[1]
    s2 = wh * 1.4 / 608
    sym = 608 * s2
    gap2 = wh * 0.28
    (out / f"logo-symbol-{name}.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {r(sym + gap2 + ww)} {r(sym)}" role="img" aria-label="Innovare">'
        f'<g transform="translate({r(sym/2)} {r(sym/2)}) scale({r(s2*1000)/1000})">{symbol_body(c, 11)}</g>'
        f'<g transform="translate({r(sym + gap2 - W[0])} {r((sym - wh)/2 - W[1])})">{paths(word, c)}</g></svg>\n')
ts = root / "src" / "components" / "brand" / "paths.ts"; ts.parent.mkdir(parents=True, exist_ok=True)
ts.write_text("// Gerado por scripts/build-brand.py a partir do PDF vetorial do logotipo. Não editar à mão.\n"
    f"export const LOGO_VIEWBOX = {json.dumps(full_vb)};\n"
    f"export const WORDMARK_VIEWBOX = {json.dumps(word_vb)};\n"
    f"export const WORDMARK_PATHS = {json.dumps(word, ensure_ascii=False)};\n"
    f"export const SUBMARK_PATHS = {json.dumps(sub)};\n"
    f"export const SYMBOL = {{ viewBox: '-304 -304 608 608', circleR: {CIRCLE_R}, stroke: {STROKE}, lens: {json.dumps(LENS)}, diamond: {json.dumps(DIAMOND)} }} as const;\n")
print("word", len(word), "sub", len(sub), full_vb, word_vb)
