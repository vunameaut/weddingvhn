import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const html = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Tạo 404.html để mọi static server (Wasmer node-static, GitHub Pages, Vercel...)
// tự động fallback về Single Page Application thay vì hiện trang 404 thô.
fs.writeFileSync(path.join(distDir, '404.html'), html);
console.log('✓ Created dist/404.html');

// 2. Tạo sẵn thư mục vật lý chứa index.html cho các route chính.
// Điều này giúp máy chủ static (như node-static trên Wasmer) trả về mã 200 OK ngay lập tức
// khi người dùng truy cập trực tiếp link /DoQuan, /MaiLinh, /doquan, /mailinh...
const routes = [
  'DoQuan',
  'doquan',
  'MaiLinh',
  'mailinh',
  'co-dau',
  'chu-re',
  'admin'
];

for (const route of routes) {
  const targetDir = path.join(distDir, route);
  try {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), html);
    console.log(`✓ Created dist/${route}/index.html`);
  } catch (err) {
    console.warn(`! Note for ${route}:`, err.message);
  }
}

console.log('Postbuild finished successfully!');
