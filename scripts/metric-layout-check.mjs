import assert from "node:assert/strict"
import { chromium } from "@playwright/test"
import { createServer } from "vite"

const server = await createServer({
  server: { host: "127.0.0.1", port: 8555 },
})
await server.listen()

let browser
try {
  browser = await chromium.launch({ channel: "msedge", headless: true })
} catch {
  browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  })
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

async function widths(selector) {
  await page.locator(selector).first().waitFor({ state: "attached" })
  return page.locator(selector).evaluateAll((cards) =>
    cards.map((card) => Math.round(card.getBoundingClientRect().width)),
  )
}

async function structure(selector) {
  return page.locator(selector).first().evaluate((card) => ({
    root: card.tagName,
    children: Array.from(card.children).map((child) => child.tagName),
    content: Array.from(card.lastElementChild?.children ?? []).map(
      (child) => child.tagName,
    ),
    number: {
      width: Math.round(card.firstElementChild?.getBoundingClientRect().width ?? 0),
      height: Math.round(card.firstElementChild?.getBoundingClientRect().height ?? 0),
    },
    height: Math.round(card.getBoundingClientRect().height),
    contentAlignment: getComputedStyle(card.lastElementChild).justifyContent,
  }))
}

try {
  await page.goto("http://127.0.0.1:8555/#evidencias")
  const homeWidths = await widths(
    '[data-name="div.evidence-track"] > [data-name^="metric-result"]',
  )
  assert.equal(homeWidths.length, 24)
  assert.ok(homeWidths.every((width) => width > 75 && width < 400))
  const homeStructure = await structure(
    '[data-name="div.evidence-track"] > [data-name^="metric-result"]',
  )

  await page.goto("http://127.0.0.1:8555/cases/regra-incerta")
  const caseWidths = await widths(
    '[data-name="section.results"] [data-name="div.metrics"] > [data-name^="metric-result"]',
  )
  assert.equal(caseWidths.length, 3)
  assert.ok(caseWidths.every((width) => width > 75 && width < 400))
  const caseStructure = await structure(
    '[data-name="section.results"] [data-name="div.metrics"] > [data-name^="metric-result"]',
  )
  assert.deepEqual(homeStructure, caseStructure)
  assert.deepEqual(homeStructure, {
    root: "ARTICLE",
    children: ["STRONG", "DIV"],
    content: ["H3", "P"],
    number: { width: 75, height: 75 },
    height: 75,
    contentAlignment: "center",
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("http://127.0.0.1:8555/#evidencias")
  const mobileHomeWidths = await widths(
    '[data-name="div.evidence-track"] > [data-name^="metric-result"]',
  )
  assert.ok(mobileHomeWidths.every((width) => width <= 350))

  await page.goto("http://127.0.0.1:8555/cases/regra-incerta")
  const mobileCaseWidths = await widths(
    '[data-name="section.results"] [data-name="div.metrics"] > [data-name^="metric-result"]',
  )
  assert.ok(mobileCaseWidths.every((width) => width <= 350))
  assert.equal((await structure(
    '[data-name="section.results"] [data-name="div.metrics"] > [data-name^="metric-result"]',
  )).number.width, 75)

  console.log({
    homeCards: homeWidths.length,
    caseCards: caseWidths.length,
    widths: { home: [...new Set(homeWidths)], cases: [...new Set(caseWidths)] },
    mobileMaxWidth: Math.max(...mobileHomeWidths, ...mobileCaseWidths),
    numberBox: "75x75",
    semanticStructure: "article > strong + div > h3 + p",
  })
} finally {
  await browser.close()
  await server.close()
}
