import { cpSync, existsSync, mkdirSync, rmSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
const root = process.cwd();
const dist = resolve(root, 'dist');
const needed = ['index.html', 'style.css', 'app.js', 'content.js'];
for (const name of needed) {
  const full = resolve(root, name);
  if (!existsSync(full) || !statSync(full).isFile()) throw Error(`Eksik dosya: ${name}`);
}
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
for (const name of ['style.css', 'app.js', 'content.js']) {
  if (!html.includes(`./${name}`)) throw Error(`HTML referansı eksik: ${name}`);
}
if (!readFileSync(resolve(root, 'content.js'), 'utf8').includes('window.MEKTUP')) throw Error('Mektup içeriği bulunamadı');
rmSync(dist, {recursive: true, force: true});
mkdirSync(dist, {recursive: true});
for (const name of needed) cpSync(resolve(root, name), resolve(dist, name));
console.log(`Build tamamlandı. ${needed.length} dosya dist/ içine kopyalandı.`);
