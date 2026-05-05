/**
 * Post-build script: Generates a precache manifest from the dist/ folder
 * and injects it into the service worker (sw.js).
 * 
 * This replaces `self.__WB_MANIFEST || []` with the actual list of assets to precache.
 * Large media files (audio/video) are excluded from precaching — they use
 * runtime caching instead (cached on first play).
 */
import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { resolve, relative, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');
const swPath = resolve(distDir, 'sw.js');

// File extensions to PRECACHE (small, critical assets)
const PRECACHE_EXTENSIONS = new Set([
  '.html', '.css', '.js',          // App shell
  '.png', '.jpg', '.jpeg', '.svg', // Images
  '.ttf', '.woff', '.woff2',      // Fonts
  '.json',                         // Manifest, data
]);

// File patterns to SKIP
const SKIP_PATTERNS = ['sw.js', 'manifest.json'];

function walkDir(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

function generateRevision(filePath) {
  const content = readFileSync(filePath);
  return createHash('md5').update(content).digest('hex').slice(0, 8);
}

// Gather precache entries
const allFiles = walkDir(distDir);
const precacheEntries = [];
const runtimeFiles = [];

for (const filePath of allFiles) {
  const relativePath = relative(distDir, filePath).replace(/\\/g, '/');
  const ext = extname(filePath).toLowerCase();
  
  // Skip the service worker itself and manifest
  if (SKIP_PATTERNS.some((p) => relativePath === p)) continue;

  if (PRECACHE_EXTENSIONS.has(ext)) {
    // Hashed filenames (already have cache-busting) → no revision needed
    const hasHash = /[-.][\da-f]{8,}\./i.test(relativePath);
    if (hasHash) {
      precacheEntries.push({ url: `./${relativePath}` });
    } else {
      const revision = generateRevision(filePath);
      precacheEntries.push({ url: `./${relativePath}`, revision });
    }
  } else {
    // Large media files → tracked but not precached
    const size = statSync(filePath).size;
    runtimeFiles.push({ path: relativePath, sizeMB: (size / 1024 / 1024).toFixed(1) });
  }
}

// Inject manifest into service worker
const swContent = readFileSync(swPath, 'utf-8');
const manifest = JSON.stringify(precacheEntries, null, 2);
const updatedSw = swContent.replace(
  'self.__WB_MANIFEST || []',
  manifest
);
writeFileSync(swPath, updatedSw, 'utf-8');

// Report
console.log(`\n✅ Service Worker precache manifest injected`);
console.log(`   Precached: ${precacheEntries.length} files`);
console.log(`   Runtime-cached (on demand): ${runtimeFiles.length} files`);
runtimeFiles.forEach((f) => console.log(`     → ${f.path} (${f.sizeMB} MB)`));
console.log();
