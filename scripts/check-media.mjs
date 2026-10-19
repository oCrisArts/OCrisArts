import fs from "node:fs"
import path from "node:path"
const files = fs
  .readdirSync("public", { recursive: true })
  .map((f) => path.join("public", f))
  .filter((f) => fs.statSync(f).isFile())
let failures = []
for (const file of files) {
  const fd = fs.openSync(file, "r"),
    header = Buffer.alloc(150),
    count = fs.readSync(fd, header, 0, 150, 0)
  fs.closeSync(fd)
  if (
    header
      .toString("utf8", 0, count)
      .startsWith("version https://git-lfs.github.com/spec/v1")
  )
    failures.push(`Unresolved Git LFS pointer: ${file}`)
  if (file.endsWith(".mp4") && header.toString("ascii", 4, 8) !== "ftyp")
    failures.push(`Invalid MP4 header: ${file}`)
}
const sourceFiles = [
  ...fs
    .readdirSync("src", { recursive: true })
    .filter((file) => /\.(?:tsx?|css|json)$/.test(file))
    .filter((file) => !file.replaceAll("\\", "/").startsWith("pages/cases/"))
    .map((file) => path.join("src", file)),
  ...fs
    .readdirSync("scripts", { recursive: true })
    .filter((file) => /\.(?:mjs|js|ts)$/.test(file))
    .map((file) => path.join("scripts", file)),
  "index.html",
]
for (const file of sourceFiles) {
  const source = fs.readFileSync(file, "utf8")
  for (const match of source.matchAll(
    /(?:\/assets\/|\/videos\/|\$\{assetPathPrefix\}\/)([a-zA-Z0-9._\/-]+)/g,
  )) {
    const relative =
      (match[0].startsWith("/videos/") ? "videos/" : "assets/") + match[1]
    if (!fs.existsSync("public/" + relative))
      failures.push(`Missing media referenced by ${file}: ${relative}`)
  }
}
if (failures.length) throw Error([...new Set(failures)].join("\n"))
console.log(
  `${files.length} public files checked; no LFS pointers or missing referenced media.`,
)
