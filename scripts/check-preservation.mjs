import fs from "node:fs"

import assert from "node:assert/strict"

import { execFileSync } from "node:child_process"

const gitArgs = ["-c", `safe.directory=${process.cwd().replaceAll("\\", "/")}`]

function gitFiles(directory) {
  try {
    return execFileSync(
      "git",
      [...gitArgs, "ls-tree", "--name-only", `HEAD:${directory}`],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    )
      .trim()
      .split("\n")
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => `${directory}/${file}`)
  } catch {
    return []
  }
}

const legacyOriginals = gitFiles("src/figma")
const originals = legacyOriginals.length
  ? legacyOriginals
  : [
      ...gitFiles("src/pages/cases"),
      "src/pages/FrontPage.tsx",
      "src/components/CaseCard.tsx",
    ].filter((file) => file !== "src/pages/cases/CorridaEmJogo.tsx")

function referencedMedia(source) {
  const media = new Set()

  for (const match of source.matchAll(
    /`\$\{assetPathPrefix\}(\/[^`]+\.(?:png|jpe?g|svg|mp4|webm|gif|webp|avif))`|["'](\/(?:assets|videos)\/[^"']+\.(?:png|jpe?g|svg|mp4|webm|gif|webp|avif))["']/g,
  ))
    media.add(match[1] ? `/assets${match[1]}` : match[2])

  return [...media]
}

const assetMapping = new Map(
  fs
    .readFileSync("docs/assets-mapping.csv", "utf8")
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => {
      const [oldPath, newPath] = line.trim().split(",")
      return [oldPath, newPath]
    }),
)

const currentFiles = [
  ...fs
    .readdirSync("src/components")
    .filter((f) => f.endsWith(".tsx"))
    .map((file) => "src/components/" + file),

  ...fs
    .readdirSync("src/pages")
    .filter((f) => f.endsWith(".tsx"))
    .map((file) => "src/pages/" + file),

  ...fs
    .readdirSync("src/pages/cases")
    .filter((f) => f.endsWith(".tsx"))
    .map((file) => "src/pages/cases/" + file),

  "src/data/cases.ts",
]

const currentMedia = new Set(
  currentFiles.flatMap((file) =>
    referencedMedia(fs.readFileSync(file, "utf8")),
  ),
)

const corridaAssets = [
  "artefato-documentacao.svg",
  "artefato-fluxo-de-navegacao.svg",
  "artefato-jornada-operacional.svg",
  "artefato-prototipos-streaming.svg",
  "artefato-wireframes-operacionais.svg",
  "carrossel-prototipo-01.png",
  "carrossel-prototipo-02.png",
  "carrossel-prototipo-03.png",
  "carrossel-prototipo-04.png",
  "contexto-porsche-cup.svg",
  "desafio.png",
  "hero.png",
]

assert.deepEqual(
  fs.readdirSync("public/assets/cases/corrida-em-jogo").sort(),
  corridaAssets,
  "Corrida em jogo keeps only final case assets",
)

for (const file of originals) {
  const original = execFileSync("git", [...gitArgs, "show", `HEAD:${file}`], {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  })

  for (const asset of referencedMedia(original)) {
    const currentAsset = assetMapping.get(asset) ?? asset
    assert.ok(
      currentMedia.has(currentAsset),
      `Original evidence retained: ${file} ${asset} -> ${currentAsset}`,
    )
  }
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
  `${originals.length} original pages: referenced evidence preserved; translations covered; SPVAT stages verified; no global zoom.`,
)
