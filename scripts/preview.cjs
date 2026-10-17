const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");
const root = path.resolve(__dirname, "../build");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};
http
  .createServer((req, res) => {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405);
      return res.end();
    }
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
    } catch {
      res.writeHead(400);
      return res.end();
    }
    let file = path.resolve(root, "." + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403);
      return res.end();
    }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      if (path.extname(pathname)) {
        res.writeHead(404);
        return res.end();
      }
      file = path.join(root, "index.html");
    }
    const data = fs.readFileSync(file);
    const headers = {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": file.includes(path.sep + "static" + path.sep)
        ? "public, max-age=31536000, immutable"
        : "no-cache",
      "X-Content-Type-Options": "nosniff",
      Vary: "Accept-Encoding",
    };
    if (/gzip/.test(req.headers["accept-encoding"] || "")) {
      headers["Content-Encoding"] = "gzip";
      res.writeHead(200, headers);
      res.end(req.method === "HEAD" ? undefined : zlib.gzipSync(data));
    } else {
      res.writeHead(200, headers);
      res.end(req.method === "HEAD" ? undefined : data);
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log("CarPaint preview: http://127.0.0.1:" + port),
  );
