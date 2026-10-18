// Gera public/og.png (1200x630) a partir da foto. Uso: npm run og
import sharp from 'sharp';

const W = 1200;
const H = 630;
const size = 400;

const mask = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`);
const photo = await sharp('src/assets/profile.png')
  .resize(size, size)
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

const text = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0c0a09"/>
  <rect x="0" y="0" width="12" height="${H}" fill="#5eead4"/>
  <g font-family="DejaVu Sans, Arial, Helvetica, sans-serif">
    <text x="90" y="250" font-size="30" fill="#5eead4">// raphaelcardoso.com.br</text>
    <text x="90" y="330" font-size="62" font-weight="700" fill="#f5f5f4">Raphael Cardoso</text>
    <text x="90" y="395" font-size="34" fill="#a8a29e">Arquiteto de Software</text>
    <text x="90" y="440" font-size="34" fill="#a8a29e">e Soluções</text>
  </g>
</svg>`);

await sharp(text)
  .composite([{ input: photo, left: W - size - 90, top: (H - size) / 2 }])
  .png()
  .toFile('public/og.png');
console.log('public/og.png gerado');
