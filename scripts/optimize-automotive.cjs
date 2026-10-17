const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

// Rebuild responsive derivatives from the project's original photographs.
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    const output = path.resolve(__dirname, '../src/assets/automotive');
    fs.mkdirSync(output, { recursive: true });
    for (const [name, source] of [
      ['paint', 'HomeService/bacground.jpeg'],
      ['detail', 'HomeBox/bacground.png'],
      ['finish', 'HomeContact/background.png'],
    ]) {
      const original = fs.readFileSync(path.resolve(__dirname, '../src/images/HomePage', source));
      const mime = source.endsWith('.png') ? 'image/png' : 'image/jpeg';
      for (const width of (name === 'detail' ? [640, 1200] : [640, 1200, 1800])) {
        const data = await page.evaluate(async ({ url, width }) => {
          const image = new Image();
          image.src = url;
          await image.decode();
          const canvas = document.createElement('canvas');
          canvas.width = Math.min(width, image.naturalWidth);
          canvas.height = Math.round(canvas.width * image.naturalHeight / image.naturalWidth);
          canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
          return canvas.toDataURL('image/webp', 0.84).split(',')[1];
        }, { url: `data:${mime};base64,${original.toString('base64')}`, width });
        fs.writeFileSync(path.join(output, `${name}-${width}.webp`), Buffer.from(data, 'base64'));
      }
    }
    console.log('Responsive automotive WebP images generated.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
