"""Extract small decorative elements from the rendered PDF pages (transparent PNG).
alpha is derived from the colour distance to the local background
(per-column median for gradient pages)."""
import sys, os
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

RENDER, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

# name: (page, box at 200dpi, mode)
JOBS = {
    "heart-pair-a": (1, (110, 530, 290, 795), "flat"),
    "heart-pair-b": (1, (1430, 1000, 1650, 1240), "flat"),
    "cloud-stroke": (1, (30, 30, 575, 320), "flat"),
    "note-triple": (4, (700, 130, 1000, 450), "column"),
    "note-double": (4, (1800, 220, 2200, 580), "column"),
    "note-orange": (4, (1500, 710, 1760, 1090), "column"),
    "note-green": (4, (970, 1150, 1190, 1520), "column"),
    "note-clef": (4, (1700, 1180, 1980, 1740), "column"),
    "letter-a": (6, (1550, 215, 1810, 520), "flat"),
    "letter-d": (6, (2990, 120, 3220, 330), "flat"),
    "exclaim": (6, (2140, 50, 2250, 280), "flat"),
    "question-red": (6, (3060, 580, 3230, 910), "flat"),
    "letter-c": (6, (1850, 900, 2010, 1070), "flat"),
    "sparkle": (6, (1590, 740, 1680, 850), "flat"),
    "sparkle-b": (6, (2770, 120, 2840, 220), "flat"),
    "daisy": (14, (410, 1530, 610, 1720), "flat"),
    "question-red-b": (7, (2880, 130, 3120, 560), "flat"),
}

for name, (page, box, mode) in JOBS.items():
    src = Image.open(os.path.join(RENDER, f"p-{page:02d}.png")).convert("RGB")
    box = (box[0], box[1], min(box[2], src.width), min(box[3], src.height))
    arr = np.asarray(src.crop(box)).astype(float)
    if mode == "column":
        bg = np.median(np.asarray(src).astype(float)[:, box[0]:box[2]], axis=0)[None, :, :]
    else:
        b = np.concatenate([arr[0], arr[-1], arr[:, 0], arr[:, -1]])
        bg = np.median(b, axis=0)[None, None, :]
    d = np.abs(arr - bg).max(axis=2)
    alpha = np.clip((d - 14) * 6, 0, 255)
    m = alpha > 60
    lab, n = ndi.label(m)
    if n:
        sz = ndi.sum(m, lab, index=np.arange(1, n + 1))
        keep = np.isin(lab, np.where(sz >= max(30, sz.max() * 0.02))[0] + 1)
        keep = ndi.binary_dilation(keep, iterations=3)
        alpha = alpha * keep
    # un-premultiply the background tint for cleaner edges
    a = (alpha / 255.0)[..., None]
    rgb = np.where(a > 0.05, (arr - bg * (1 - a)) / np.maximum(a, 0.05), arr)
    out = np.dstack([np.clip(rgb, 0, 255), alpha]).astype(np.uint8)
    im = Image.fromarray(out, "RGBA")
    bb = im.getchannel("A").point(lambda v: 255 if v > 10 else 0).getbbox()
    im = im.crop(bb) if bb else im
    im.save(os.path.join(OUT, f"{name}.png"))
    print(name, im.size)
