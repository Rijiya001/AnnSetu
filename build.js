const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

const STATIC_FILES = [
  'index.html',
  'styles.css',
  'app.js',
  'favicon.svg',
  'favicon.ico'
];

if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST, { recursive: true });
}

for (const file of STATIC_FILES) {
  const src = path.join(ROOT, file);
  const dest = path.join(DIST, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`[build] Copied ${file} -> dist/${file}`);
  }
}

console.log('[build] Site build complete (dist directory ready).');

