import fs from "node:fs"

import assert from "node:assert/strict"


function referencedMedia(source) {
  const media = new Set()

  for (const match of source.matchAll(
    /`\$\{assetPathPrefix\}(\/[^`]+\.(?:png|jpe?g|svg|mp4|webm|gif|webp|avif))`|["'](\/(?:assets|videos)\/[^"']+\.(?:png|jpe?g|svg|mp4|webm|gif|webp|avif))["']/g,
  ))
    media.add(match[1] ? `/assets${match[1]}` : match[2])

  return [...media]
}

const currentFiles = [
  ...fs
    .readdirSync("src/components")
    .filter((f) => f.endsWith(".tsx"))
    .map((file) => "src/components/" + file),

  ...fs
    .readdirSync("src/pages")
    .filter((f) => f.endsWith(".tsx"))
    .map((file) => "src/pages/" + file),

  "src/data/cases.ts",
]

const currentMedia = new Set(
  currentFiles.flatMap((file) =>
    referencedMedia(fs.readFileSync(file, "utf8")),
  ),
)

for (const directory of fs.readdirSync("public/assets/cases")) {
  const prefix = `/assets/cases/${directory}/`
  const expected = [...currentMedia]
    .filter((asset) => asset.startsWith(prefix))
    .map((asset) => asset.slice(prefix.length))
    .sort()

  assert.deepEqual(
    fs.readdirSync(`public/assets/cases/${directory}`).sort(),
    expected,
    `${directory} keeps only final case assets`,
  )
}

const pt = JSON.parse(fs.readFileSync("src/i18n/pt-BR.json", "utf8"))

for (const locale of ["en", "es"]) {
  const copy = JSON.parse(fs.readFileSync(`src/i18n/${locale}.json`, "utf8"))

  assert.deepEqual(Object.keys(copy), Object.keys(pt))
  assert.ok(Object.values(copy).every((v) => typeof v === "string" && v.length))
}

const ui = JSON.parse(fs.readFileSync("src/i18n/ui.json", "utf8"))

for (const values of Object.values(ui))
  for (const locale of ["pt-BR", "en", "es"])
    assert.ok(values[locale]?.length, "Translated UI labels")

for (const file of currentFiles) {
  const source = fs.readFileSync(file, "utf8")

  for (const match of source.matchAll(/"label":"([^"]+)"/g))
    assert.ok(
      Object.values(pt).includes(match[1]) || ui[match[1]],
      `Translated taxonomy: ${match[1]}`,
    )
}

const casesSource = fs.readFileSync("src/data/cases.ts", "utf8")
const spvat = casesSource.match(
  /slug: "regra-incerta"[\s\S]*?methodology: \[(.*?)\], services:/,
)?.[1]

assert.match(spvat ?? "", /"Pensar"/)
assert.match(spvat ?? "", /"Fazer"/)

assert.ok(
  !/zoom\s*:/.test(
    fs.readFileSync("src/index.css", "utf8") +
      fs.readFileSync("src/figma-layout.css", "utf8"),
  ),
  "No global zoom",
)

console.log(
  "Final case assets, translations and SPVAT stages verified; no global zoom.",
)
