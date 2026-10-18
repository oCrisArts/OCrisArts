import { createServer, preview } from "vite"
import { chromium } from "@playwright/test"
import assert from "node:assert/strict"
import fs from "node:fs/promises"
const dev = await createServer({ server: { host: "127.0.0.1", port: 8553 } })
await dev.listen()
const prod = await preview({ preview: { host: "127.0.0.1", port: 8554 } })
let browser
try {
  browser = await chromium.launch({ channel: "msedge", headless: true })
} catch {
  browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  })
}
const errors = []
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
})
// Deterministic SDK network stubs: inspect our initialization and events without sending test traffic.
const thirdParty = []
await context.route(
  /googletagmanager\.com|static\.hotjar\.com|clarity\.ms/,
  (route) => {
    thirdParty.push(route.request().url())
    return route.fulfill({ contentType: "application/javascript", body: "" })
  },
)
const page = await context.newPage()
page.on("pageerror", (error) => errors.push(error.message))
page.on("console", (message) => {
  if (
    message.type() === "error" &&
    /hydration|hydrated|Minified React error/i.test(message.text())
  )
    errors.push(message.text())
})
const events = () => page.evaluate(() => window.__trackingDebug || [])
try {
  await page.goto("http://127.0.0.1:8553/")
  await page.locator("h1").waitFor()
  await page.waitForTimeout(1200)
  assert.equal(
    await page.locator('[data-node-id="4:35836"] [data-case-slug]').count(),
    8,
  )
  assert.equal(
    await page.locator('[data-node-id="4:35828"] [data-case-slug]').count(),
    2,
  )
  assert.equal(thirdParty.length, 0, "No scripts before consent")
  await page.getByRole("button", { name: "Recusar", exact: true }).click()
  await page.locator(".top-navigation__language").click()
  await page
    .locator("#language-menu")
    .getByRole("button", { name: "EN", exact: true })
    .click()
  await page.waitForURL("**/en")
  await page.waitForFunction(() => document.documentElement.lang === "en")
  await page.locator("h1").waitFor()
  assert.equal(
    thirdParty.length,
    0,
    "No scripts after refusal or language navigation",
  )
  assert.equal(await page.locator("html").getAttribute("lang"), "en")
  await page.getByRole("button", { name: "Privacy", exact: true }).click()
  await page.getByRole("button", { name: "Accept", exact: true }).click()
  await page.waitForTimeout(1200)
  assert.equal(thirdParty.length, 3, "Each provider initialized once")
  assert.equal(
    (await events()).filter((e) => e.event === "page_view").length,
    1,
  )
  const commands = await page.evaluate(() =>
    window.dataLayer.map((x) => Array.from(x)),
  )
  assert.equal(commands.filter((x) => x[0] === "config").length, 1)
  assert.equal(commands.find((x) => x[0] === "config")[2].send_page_view, false)
  assert.equal(commands[0][0], "consent")
  assert.equal(commands[0][2].analytics_storage, "denied")
  await page.evaluate(() =>
    document
      .querySelector('[data-node-id="4:35827"]')
      .scrollIntoView({ behavior: "instant" }),
  )
  await page.waitForTimeout(2000)
  const impressions = (await events()).filter(
    (e) => e.event === "case_impression",
  )
  assert.ok(
    impressions.length > 0 && impressions.length <= 8,
    "Visible card impressions",
  )
  assert.equal(
    new Set(impressions.map((e) => e.parameters.case_slug)).size,
    impressions.length,
    "No duplicate impressions from Hero clones",
  )
  assert.equal(
    (await events()).filter((e) => e.event === "case_carousel_interaction")
      .length,
    0,
    "Automatic movement is not interaction",
  )
  const rail = await page.locator('[data-node-id="4:35836"]').boundingBox()
  const dragY = Math.max(100, Math.min(800, rail.y + rail.height / 2))
  await page.mouse.move(650, dragY)
  await page.mouse.down()
  await page.mouse.move(470, dragY, { steps: 8 })
  await page.mouse.up()
  assert.equal(
    (await events()).filter((e) => e.event === "case_carousel_interaction")
      .length,
    1,
    "One event per real drag",
  )
  await page.evaluate(() =>
    document
      .querySelector('[data-name="section.services"]')
      .scrollIntoView({ behavior: "instant" }),
  )
  await page.waitForTimeout(1200)
  for (const service of ["branding", "web", "apps", "ux"])
    await page.locator(`[data-service-name="${service}"]`).click()
  assert.equal(
    (await events()).filter((e) => e.event === "service_click").length,
    4,
  )
  await page.waitForFunction(
    () =>
      window.__trackingDebug?.some(
        (e) =>
          e.event === "video_complete" && e.parameters.video_id === "web.mp4",
      ),
    {},
    { timeout: 20000 },
  )
  await page.waitForTimeout(4000)
  assert.equal(
    (await events()).filter(
      (e) =>
        e.event === "video_complete" && e.parameters.video_id === "web.mp4",
    ).length,
    1,
    "Video loops do not repeat completion",
  )
  assert.equal(
    (await events()).filter(
      (e) => e.event === "video_play" && e.parameters.video_id === "web.mp4",
    ).length,
    1,
    "Video loops do not repeat playback",
  )
  await page.evaluate(() =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    }),
  )
  await page.waitForTimeout(300)
  assert.deepEqual(
    (await events())
      .filter((e) => e.event === "scroll_depth")
      .map((e) => e.parameters.percent)
      .sort((a, b) => a - b),
    [25, 50, 75, 90],
  )
  await fs.mkdir(".cache/qa", { recursive: true })
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }))
  await page.waitForTimeout(700)
  await page.screenshot({ path: ".cache/qa/desktop.png" })
  await page.locator(".top-navigation__language").click()
  await page
    .locator("#language-menu")
    .getByRole("button", { name: "ES", exact: true })
    .click()
  await page.waitForURL("**/es")
  await page.locator("h1").waitFor()
  await page.waitForFunction(
    () =>
      window.__trackingDebug?.filter((e) => e.event === "page_view").length ===
      2,
  )
  assert.equal(
    (await events()).filter((e) => e.event === "page_view").length,
    2,
  )
  const card = page.locator(
    '[data-node-id="4:35836"] [data-case-slug="navegacao-confusa"]',
  )
  // Native anchor navigation via keyboard; avoids clicking a moving card mid-animation.
  await page.evaluate(() =>
    window.scrollTo({
      top: document.querySelector('[data-node-id="4:35827"]').offsetTop + 500,
      behavior: "instant",
    }),
  )
  await page.waitForTimeout(1000)
  await card.focus()
  await page.keyboard.press("Enter")
  await page.waitForURL("**/es/cases/navegacao-confusa")
  await page.locator("h1").waitFor()
  await page.waitForFunction(
    () =>
      window.__trackingDebug?.filter((e) => e.event === "page_view").length ===
      3,
  )
  assert.equal(
    (await events()).filter((e) => e.event === "case_open").length,
    1,
  )
  assert.equal(
    (await events()).filter((e) => e.event === "page_view").length,
    3,
  )
  await page.locator(".top-navigation__language").click()
  await page
    .locator("#language-menu")
    .getByRole("button", { name: "EN", exact: true })
    .click()
  await page.waitForURL("**/en/cases/navegacao-confusa")
  await page.waitForFunction(() => document.documentElement.lang === "en")
  await page.locator("h1").waitFor()
  assert.match(await page.locator("h1").innerText(), /Confusing navigation/)
  for (const section of [
    "context",
    "challenge",
    "process",
    "artifacts",
    "results",
  ]) {
    await page
      .locator(`[data-section-id="${section}"]`)
      .first()
      .evaluate((el) => el.scrollIntoView({ behavior: "instant" }))
    await page.waitForTimeout(1600)
  }
  assert.equal(
    (await events()).filter(
      (e) => e.event === "case_section_view" && e.parameters.language === "en",
    ).length,
    5,
    "Five case sections observed",
  )
  assert.equal(thirdParty.length, 3, "No reinitialization on SPA navigation")
  await page
    .locator("#contato")
    .evaluate((el) => el.scrollIntoView({ behavior: "instant" }))
  await page.waitForTimeout(1200)
  await page.locator('input[name="name"]').fill("TEST_PERSONAL_DO_NOT_RECORD")
  assert.equal(
    (await events()).filter((e) => e.event === "form_start").length,
    1,
  )
  await page.locator('input[name="name"]').fill("TEST_PERSONAL_DO_NOT_RECORD_2")
  assert.equal(
    (await events()).filter((e) => e.event === "form_start").length,
    1,
  )
  assert.ok(!JSON.stringify(await events()).includes("TEST_PERSONAL"))
  assert.equal(
    (await events()).filter((e) => e.event === "form_success").length,
    0,
  )
  await page.getByRole("button", { name: "Privacy", exact: true }).click()
  await page.getByRole("button", { name: "Decline", exact: true }).click()
  await page.waitForTimeout(1300)
  assert.equal(thirdParty.length, 3, "Revocation reloads without SDKs")
  const report = {
    desktop: "passed",
    consent: "passed",
    navigation: "passed",
    events: "passed",
    errors,
  }
  const slugs = [
    "navegacao-confusa",
    "cadastros-complexos",
    "regra-incerta",
    "qualificacao-complexa",
    "corrida-em-jogo",
    "beneficios-dispersos",
    "cadastro-travado",
    "uma-marca-por-cliente",
  ]
  let routes = 0
  for (const lang of ["", "/en", "/es"])
    for (const base of ["", ...slugs.map((s) => "/cases/" + s)]) {
      const route = lang + base || "/"
      const response = await page.goto("http://127.0.0.1:8554" + route)
      assert.equal(response.status(), 200, route)
      const html = await response.text()
      assert.ok(html.includes("<h1"), `Initial HTML content: ${route}`)
      assert.ok(
        html.includes(`href="https://ocris.art.br${route}" data-seo`),
        `Canonical ${route}`,
      )
      await page.locator("h1").waitFor()
      assert.equal(await page.locator("h1").count(), 1)
      assert.equal(await page.locator("link[hreflang]").count(), 4)
      assert.equal(
        await page.locator('meta[name="robots"]').getAttribute("content"),
        "noindex, nofollow",
      )
      routes++
    }
  report.routes = routes
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("http://127.0.0.1:8553/")
  await page.locator("h1").waitFor()
  await page.waitForTimeout(1000)
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
    "Mobile horizontal overflow",
  )
  await page.locator(".top-navigation__language").click()
  assert.equal(await page.locator("#language-menu button").count(), 3)
  await page
    .locator("#language-menu")
    .getByRole("button", { name: "ES", exact: true })
    .click()
  await page.waitForURL("**/es")
  await page.locator("h1").waitFor()
  await page.waitForFunction(() => document.documentElement.lang === "es")
  await page.waitForTimeout(1000)
  await fs.mkdir(".cache/qa", { recursive: true })
  await page.screenshot({ path: ".cache/qa/mobile.png" })
  report.mobile = "passed"
  const viewports = [320, 375, 390, 768, 1024, 1440, 1920]
  await fs.mkdir(".cache/qa/viewports", { recursive: true })
  for (const width of viewports) {
    await page.setViewportSize({
      width,
      height: Math.max(720, Math.round(width * 0.625)),
    })
    await page.goto("http://127.0.0.1:8553/")
    await page.locator("h1").waitFor()
    await page.waitForTimeout(250)
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
      `Horizontal overflow at ${width}px`,
    )
    assert.equal(
      await page.locator('[data-node-id="4:35828"] [data-case-slug]').count(),
      2,
      `Two hero cards at ${width}px`,
    )
    assert.equal(
      await page.locator('[data-node-id="4:35836"] [data-case-slug]').count(),
      8,
      `Eight case cards at ${width}px`,
    )
    await page.screenshot({ path: `.cache/qa/viewports/${width}.png` })
  }
  report.viewports = viewports
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto("http://127.0.0.1:8553/cases/navegacao-confusa")
  await page.locator("h1").waitFor()
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: "instant" }))
  await page.waitForTimeout(400)
  const casesButton = page
    .locator(".bottom-navigation--case")
    .getByRole("button", { name: "Cases", exact: true })
  await casesButton.click()
  assert.equal(
    await page.locator("#case-popover [data-case-slug]").count(),
    8,
    "Eight compact cases",
  )
  await page.keyboard.press("Escape")
  assert.equal(
    await page.locator("#case-popover").count(),
    0,
    "Popover closes with Escape",
  )
  await casesButton.click()
  await page.mouse.click(10, 100)
  assert.equal(
    await page.locator("#case-popover").count(),
    0,
    "Popover closes outside",
  )
  await casesButton.click()
  await page
    .locator('#case-popover [data-case-slug="cadastros-complexos"]')
    .click()
  await page.waitForURL("**/cases/cadastros-complexos")
  assert.equal(
    await page.locator("#case-popover").count(),
    0,
    "Popover closes after selection",
  )
  report.casePopover = "passed"
  assert.deepEqual(errors, [], "Browser runtime errors")
  await fs.writeFile(
    ".cache/qa/browser-report.json",
    JSON.stringify(report, null, 2),
  )
  console.log(JSON.stringify(report))
} catch (error) {
  await fs.mkdir(".cache/qa", { recursive: true })
  await page.screenshot({ path: ".cache/qa/failure.png" })
  console.log(
    await page.evaluate(() => ({
      url: location.pathname,
      active: document.activeElement.tagName,
      errors: window.__trackingDebug,
    })),
  )
  throw error
} finally {
  await browser.close()
  await dev.close()
  await new Promise((resolve) => prod.httpServer.close(resolve))
}
