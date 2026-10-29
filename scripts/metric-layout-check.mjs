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

try {
  await page.goto("http://127.0.0.1:8555/#evidencias")
  const homeWidths = await widths(
    '[data-name="div.evidence-track"] > [data-name^="metric-result"]',
  )
  assert.equal(homeWidths.length, 24)
  assert.deepEqual([...new Set(homeWidths)], [320])

  await page.goto("http://127.0.0.1:8555/cases/regra-incerta")
  const caseWidths = await widths(
    '[data-name="section.results"] [data-name="div.metrics"] > [data-name^="metric-result"]',
  )
  assert.equal(caseWidths.length, 3)
  assert.deepEqual([...new Set(caseWidths)], [320])

  console.log({ homeCards: homeWidths.length, caseCards: caseWidths.length, width: 320 })
} finally {
  await browser.close()
  await server.close()
}
