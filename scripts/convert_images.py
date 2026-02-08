from PIL import Image
from pathlib import Path

# Configure sizes and quality
sizes = [400, 800, 1200]
quality = 80

images_dir = Path(__file__).resolve().parents[1] / 'images'
output_dir = images_dir  # write next to originals

supported = ['.jpg', '.jpeg', '.png']

for p in images_dir.iterdir():
    if p.suffix.lower() in supported:
        try:
            img = Image.open(p)
            orig_w, orig_h = img.size
            for w in sizes:
                if w >= orig_w:
                    # don't upscale; still create webp at original size once
                    if w != sizes[0]:
                        continue
                h = int(orig_h * (w / orig_w))
                resized = img.resize((w, h), Image.LANCZOS)
                out_name = f"{p.stem}-{w}.webp"
                out_path = output_dir / out_name
                resized.save(out_path, 'WEBP', quality=quality, method=6)
            # Also save a full-size webp
            full_out = output_dir / f"{p.stem}-full.webp"
            img.save(full_out, 'WEBP', quality=quality, method=6)
            print(f"Converted {p.name}")
        except Exception as e:
            print(f"Failed {p.name}: {e}")
