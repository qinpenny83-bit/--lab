import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';

const ROOT = normalize(process.argv[2] || 'dist');
const PORT = Number(process.argv[3] || 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json',
};

createServer(async (req, res) => {
  try {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
    } catch {
      pathname = '/';
    }
    if (pathname === '/') pathname = '/index.html';

    const file = normalize(join(ROOT, pathname));
    if (file !== ROOT && !file.startsWith(ROOT + sep)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    const body = await readFile(file).catch(() => null);
    if (body) {
      res.writeHead(200, { 'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream' });
      res.end(body);
      return;
    }

    const idx = await readFile(join(ROOT, 'index.html')).catch(() => null);
    if (idx) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(idx);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } catch {
    res.writeHead(500);
    res.end('Server Error');
  }
}).listen(PORT, () => {
  console.log(`preview: http://127.0.0.1:${PORT}  root=${join(process.cwd(), ROOT)}`);
});
