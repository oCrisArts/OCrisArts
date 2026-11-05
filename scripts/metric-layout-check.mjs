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
  return page.locator(selector).first().evaluate((card) => {
    const number = card.firstElementChild
    const body = card.lastElementChild
    const content = body?.firstElementChild
    const cardBox = card.getBoundingClientRect()
    const contentBox = content?.getBoundingClientRect()
    return {
      root: card.tagName,
      children: Array.from(card.children).map((child) => child.tagName),
      bodyChildren: Array.from(body?.children ?? []).map((child) => child.tagName),
      contentChildren: Array.from(content?.children ?? []).map((child) => child.tagName),
      number: { width: Math.round(number?.getBoundingClientRect().width ?? 0), height: Math.round(number?.getBoundingClientRect().height ?? 0) },
      body: { width: Math.round(body?.getBoundingClientRect().width ?? 0), height: Math.round(body?.getBoundingClientRect().height ?? 0) },
      content: { width: Math.round(contentBox?.width ?? 0), height: Math.round(contentBox?.height ?? 0), top: Math.round((contentBox?.top ?? 0) - cardBox.top) },
      width: Math.round(cardBox.width),
      height: Math.round(cardBox.height),
      bodyAlignment: getComputedStyle(body).alignItems,
    }
  })
}

try {
  await page.goto("http://127.0.0.1:8555/#evidencias")
  const homeWidths = await widths(
    '[data-name="div.evidence-track"] > [data-name^="metric-result"]',
  )
  assert.equal(homeWidths.length, 24)
  assert.ok(homeWidths.every((width) => width === 438))
  const homeStructure = await structure(
    '[data-name="div.evidence-track"] > [data-name^="metric-result"]',
  )

  await page.goto("http://127.0.0.1:8555/cases/regra-incerta")
  const caseWidths = await widths(
    '[data-name="section.results"] [data-name="div.metrics"] > [data-name^="metric-result"]',
  )
  assert.equal(caseWidths.length, 3)
  assert.ok(caseWidths.every((width) => width === 438))
  const caseStructure = await structure(
    '[data-name="section.results"] [data-name="div.metrics"] > [data-name^="metric-result"]',
  )
  assert.deepEqual(homeStructure, caseStructure)
  assert.deepEqual(homeStructure, {
    root: "ARTICLE",
    children: ["STRONG", "DIV"],
    bodyChildren: ["DIV"],
    contentChildren: ["H3", "P"],
    number: { width: 75, height: 75 },
    body: { width: 363, height: 75 },
    content: { width: 363, height: 59, top: 8 },
    width: 438,
    height: 75,
    bodyAlignment: "center",
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
    semanticStructure: "article > strong + body > content > h3 + p",
  })
} finally {
  await browser.close()
  await server.close()
}
