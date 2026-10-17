const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(dir, entry.name))
        : [path.join(dir, entry.name)],
    );
for (const dir of ["src", "public", "build"]) {
  const files = walk(path.resolve(__dirname, "..", dir));
  const bytes = files.reduce((sum, file) => sum + fs.statSync(file).size, 0);
  const gzip = files
    .filter((file) => /\.(js|css)$/.test(file))
    .reduce(
      (sum, file) => sum + zlib.gzipSync(fs.readFileSync(file)).length,
      0,
    );
  console.log(
    dir +
      ": " +
      files.length +
      " files, " +
      (bytes / 1024).toFixed(1) +
      " KiB; JS/CSS gzip: " +
      (gzip / 1024).toFixed(1) +
      " KiB",
  );
}
