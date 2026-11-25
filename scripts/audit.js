const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'index.html',
  'about.html',
  'products.html',
  'gallery.html',
  'shop.html',
  'categories.html',
  'product-details.html',
  'contact.html'
];

let issues = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`Auditing ${file}...`);

  // Check script and link references
  const matches = content.matchAll(/(?:href|src)="([^"]+)"/g);
  for (const m of matches) {
    const link = m[1];
    if (
      link.startsWith('#') ||
      link.startsWith('http') ||
      link.startsWith('mailto:') ||
      link.startsWith('tel:') ||
      link.startsWith('data:')
    ) {
      continue;
    }
    const cleanPath = link.split('?')[0].split('#')[0];
    if (cleanPath && !fs.existsSync(cleanPath)) {
      console.error(`  [MISSING ASSET in ${file}]: ${link} -> ${cleanPath}`);
      issues++;
    }
  }
});

if (issues === 0) {
  console.log('AUDIT PASSED: All local links, scripts, stylesheets, and images exist!');
} else {
  console.log(`AUDIT FAILED: ${issues} missing references.`);
  process.exit(1);
}
