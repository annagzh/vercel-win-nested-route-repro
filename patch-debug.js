// Instruments @vercel/next's NEXT_MISSING_LAMBDA error to include the actual
// keys of the lambdas map, so we can see how they're delimited on Windows.
const fs = require('fs');
const candidates = [
  'node_modules/vercel/node_modules/@vercel/next/dist/index.js',
  'node_modules/@vercel/next/dist/index.js',
];
const target = 'Unable to find lambda for route: ${routeFileNoExt}';
const replacement =
  'Unable to find lambda for route: ${routeFileNoExt} :: srcRoute=${JSON.stringify(srcRoute)} :: outputPathPageOrig=${JSON.stringify(outputPathPageOrig)} :: LAMBDA_KEYS=${JSON.stringify(Object.keys(lambdas))}';
let patched = false;
for (const f of candidates) {
  if (!fs.existsSync(f)) continue;
  const src = fs.readFileSync(f, 'utf8');
  if (!src.includes(target)) { console.log('target string not found in', f); continue; }
  fs.writeFileSync(f, src.split(target).join(replacement));
  console.log('patched', f);
  patched = true;
}
if (!patched) { console.log('PATCH FAILED'); process.exit(1); }
