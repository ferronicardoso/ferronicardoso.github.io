// Gera logo e favicons a partir de src/assets/brand/logo-original.png. Uso: npm run brand
import sharp from 'sharp';

const SRC = 'src/assets/brand/logo-original.png';
// Recorte quadrado em torno da cabeça e da barba, mantendo o fundo creme do original.
const crop = { left: 130, top: 90, width: 1030, height: 1030 };

const square = (size) => sharp(SRC).extract(crop).resize(size, size, { kernel: 'lanczos3' });
const rounded = async (size, radius) => {
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#fff"/></svg>`);
  return square(size).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
};

await square(512).png().toFile('src/assets/brand/logo.png');
await sharp(await rounded(32, 7)).toFile('public/favicon-32.png');
await sharp(await rounded(192, 40)).toFile('public/favicon-192.png');
await square(180).png().toFile('public/apple-touch-icon.png');
console.log('logo.png, favicon-32.png, favicon-192.png e apple-touch-icon.png gerados');
