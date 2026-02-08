const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');
const sizes = [400, 800, 1200];
const quality = 80;

function isImage(file) {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
}

(async () => {
  const files = fs.readdirSync(imagesDir).filter(isImage);
  for (const file of files) {
    const input = path.join(imagesDir, file);
    const { name, ext } = path.parse(file);
    try {
      const img = sharp(input);
      const metadata = await img.metadata();
      for (const w of sizes) {
        if (w > metadata.width) continue;
        const outAvif = path.join(imagesDir, `${name}-${w}.avif`);
        const outWebp = path.join(imagesDir, `${name}-${w}.webp`);
        await img.resize(w).avif({ quality }).toFile(outAvif);
        await img.resize(w).webp({ quality }).toFile(outWebp);
      }
      // full-size
      const outAvifFull = path.join(imagesDir, `${name}-full.avif`);
      const outWebpFull = path.join(imagesDir, `${name}-full.webp`);
      await img.avif({ quality }).toFile(outAvifFull);
      await img.webp({ quality }).toFile(outWebpFull);
      console.log(`Converted ${file}`);
    } catch (err) {
      console.error(`Failed ${file}:`, err.message);
    }
  }
})();
