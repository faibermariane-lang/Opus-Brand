"""Extract Lulu cutouts (transparent background) from rendered PDF pages.

Usage: python3 -I cutout.py <render_dir> <out_dir>
Background removal = flood fill from crop border through pixels close to the
background palette (auto-sampled from the border), plus removal of large
enclosed background-colored islands. The original illustration is untouched.
"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

RENDER, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

# name: (page, (x0, y0, x1, y1) in 200dpi px [page 3309x1812], tol, island_min, extra_bg)
CREAM=([254,241,231],7,True)
JOBS = {
    # name: (page, box, [(color, tol, island_removal_ok)])
    "lulu-cover-smile": (1, (60, 560, 1720, 1806), [([251,232,245],9,True),([140,190,235],60,False)]),
    "lulu-full-crayon": (2, (1900, 200, 2950, 1806), [([223,230,246],18,True),([202,198,232],14,True),([208,222,246],16,True),([196,215,240],16,True),([120,175,225],45,False)]),
    "lulu-happy-arms": (13, (1560, 280, 3309, 1806), [([200,215,205],18,True),([255,255,255],1,False)]),
    "lulu-peek": (17, (1640, 680, 3309, 1806), [([251,232,245],9,True),([140,190,235],60,False)]),
    "lulu-reading": (6, (1560, 40, 3309, 1806), [([179,230,233],18,True),([205,236,240],14,True),([195,233,236],14,True),([150,215,225],18,True)]),
    "lulu-worried": (5, (1700, 460, 3309, 1806), [CREAM,([150,218,150],30,True),([216,160,216],30,True),([236,234,124],30,True),([210,210,210],14,True)]),
    "lulu-thinking": (7, (1560, 120, 3309, 1806), [CREAM]),
    "lulu-calm-desk": (12, (1480, 640, 3000, 1806), [CREAM,([150,218,150],30,True),([173,106,188],30,True),([236,234,124],30,True),([162,210,234],30,True)]),
}


def border_palette(arr, k=6):
    b = np.concatenate([arr[0], arr[-1], arr[:, 0], arr[:, -1]]).astype(int)
    q = (b // 12) * 12
    vals, counts = np.unique(q, axis=0, return_counts=True)
    order = np.argsort(-counts)
    pal = []
    for i in order:
        if counts[i] < len(b) * 0.01:
            break
        c = vals[i] + 6
        # skip dark / hair-like colors: never treat them as background
        if c.sum() < 330:
            continue
        pal.append(c)
        if len(pal) >= k:
            break
    return np.array(pal)


def near(arr, pal, tol):
    a = arr.astype(int)
    m = np.zeros(arr.shape[:2], bool)
    for c in pal:
        m |= (np.abs(a - c).max(axis=2) <= tol)
    return m


for name, (page, box, pal) in JOBS.items():
    src = Image.open(os.path.join(RENDER, f"p-{page:02d}.png")).convert("RGB")
    box = (box[0], box[1], min(box[2], src.width), min(box[3], src.height - 4))
    im = src.crop(box)
    arr = np.asarray(im)
    a = arr.astype(int)
    bgc = np.zeros(arr.shape[:2], bool); isl = np.zeros_like(bgc)
    for c, t, ok in pal:
        m = np.abs(a - np.array(c)).max(axis=2) <= t
        bgc |= m
        if ok: isl |= m
    lab, n = ndi.label(bgc)
    edge_labels = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    sizes = ndi.sum(bgc, lab, index=np.arange(1, n + 1))
    bg = np.isin(lab, list(edge_labels))
    il, inn = ndi.label(isl)
    isz = ndi.sum(isl, il, index=np.arange(1, inn + 1))
    bg |= np.isin(il, np.where(isz >= 2500)[0] + 1)
    fg = ~bg
    # keep the largest foreground component(s) — drop floating decorations
    flab, fn = ndi.label(fg)
    fsizes = ndi.sum(fg, flab, index=np.arange(1, fn + 1))
    keep = [int(np.argmax(fsizes)) + 1]
    fg = np.isin(flab, keep)
    fg = ndi.binary_fill_holes(fg) & ~(bg & ~ndi.binary_fill_holes(fg)) if False else fg
    alpha = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))
    rgba = im.copy()
    rgba.putalpha(alpha)
    bbox = alpha.point(lambda v: 255 if v > 8 else 0).getbbox()
    rgba = rgba.crop(bbox)
    rgba.save(os.path.join(OUT, f"{name}.png"))
    print(name, rgba.size)
