const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

const STATIC_FILES = [
  'index.html',
  'styles.css',
  'fallback-data.js',
  'app.js',
  'favicon.svg',
  'favicon.ico',
  '_redirects'
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

// Ensure netlify/functions has a copy of fallback-data.js for bundlers
const netlifyFuncs = path.join(ROOT, 'netlify', 'functions');
if (fs.existsSync(netlifyFuncs)) {
  const srcFallback = path.join(ROOT, 'fallback-data.js');
  const destFallback = path.join(netlifyFuncs, 'fallback-data.js');
  if (fs.existsSync(srcFallback)) {
    fs.copyFileSync(srcFallback, destFallback);
    console.log('[build] Copied fallback-data.js -> netlify/functions/fallback-data.js');
  }
}

console.log('[build] Site build complete (dist directory ready).');
