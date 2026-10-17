const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const sources = {
  hero: 'photo_5328239889897692512_w.jpg',
  putty: 'photo_5328239889897692505_y.jpg',
  primer: 'photo_5328239889897692496_w.jpg',
  topcoat: 'photo_5328239889897692504_w.jpg',
  paint: 'photo_5328239889897692510_w.jpg',
  hardener: 'photo_5328239889897692482_w.jpg',
  plastic: 'photo_5328239889897692486_w.jpg',
};
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    const output = path.resolve(__dirname, '../public/images/optimized');
    fs.mkdirSync(output, { recursive: true });
    const manifest = {};
    for (const [name, source] of Object.entries(sources)) {
      const buffer = fs.readFileSync(path.resolve(__dirname, '../public/images', source));
      const result = await page.evaluate(async url => {
        const image = new Image(); image.src = url; await image.decode();
        const versions = [...new Set([480, 960, 1440].map(width => Math.min(width, image.width)))].map(width => {
          const canvas = document.createElement('canvas');
          canvas.width = width; canvas.height = Math.round(width * image.height / image.width);
          canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
          return { width, data: canvas.toDataURL('image/webp', .86).split(',')[1] };
        });
        return { width: image.width, height: image.height, versions };
      }, 'data:image/jpeg;base64,' + buffer.toString('base64'));
      for (const version of result.versions) fs.writeFileSync(path.join(output, `${name}-${version.width}.webp`), Buffer.from(version.data, 'base64'));
      manifest[name] = { width: result.width, height: result.height, source: `/images/${source}`, src: `/images/optimized/${name}-${result.versions[Math.min(1, result.versions.length - 1)].width}.webp`, srcSet: result.versions.map(v => `/images/optimized/${name}-${v.width}.webp ${v.width}w`).join(', ') };
    }
    fs.writeFileSync(path.resolve(__dirname, '../src/assets/showroom.json'), JSON.stringify(manifest, null, 2) + '\n');
    console.log('Optimized 7 supplied product photos; originals preserved.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
