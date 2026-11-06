import assert from "node:assert/strict"
import fs from "node:fs/promises"
import { chromium } from "@playwright/test"
import { createServer } from "vite"

const server = await createServer({ server: { host: "127.0.0.1", port: 8560, strictPort: true } })
await server.listen()
const browser = await chromium.launch({ channel: "msedge", headless: true })
const errors = []

try {
  await fs.mkdir(".cache/qa/prospeccao", { recursive: true })
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport })
    page.on("pageerror", (error) => errors.push(error.message))
    await page.route(/figma\.com/, (route) => route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Demo</title>" }))
    await page.goto("http://127.0.0.1:8560/consultoria")
    await page.getByRole("heading", { name: "Transforme sua ideia em um caminho possível." }).waitFor()
    assert.equal(await page.locator("#planos .proposal-plan-card").count(), 3)
    assert.equal(await page.locator("#faq details").count(), 12)
    await page.goto("http://127.0.0.1:8560/consultoria/cliente-exemplo")
    await page.getByRole("heading", { name: "Olá, Cliente Exemplo" }).waitFor()
    assert.equal(await page.locator(".proposal-plan-card").count(), 3)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `proposal overflow ${viewport.width}`)
    await page.locator(".proposal-plan-card").first().getByRole("button", { name: /Quero começar/ }).click()
    await page.getByRole("dialog", { name: /Consultoria Essencial/ }).waitFor()
    await page.getByRole("button", { name: /Cartão/ }).click()
    await page.getByText("O pagamento online está em preparação.").waitFor()
    await page.getByRole("button", { name: "Fechar" }).click()
    await page.locator(".proposal-customize-trigger").scrollIntoViewIfNeeded()
    await page.locator(".proposal-customize-trigger").click()
    await page.getByRole("dialog").waitFor()
    await page.getByRole("button", { name: /Confirmar minha consultoria/ }).click()
    assert.equal(await page.locator(".proposal-plan-card").count(), 4)
    await page.screenshot({ path: `.cache/qa/prospeccao/proposal-${viewport.width}.png`, fullPage: true })
    await page.close()
  }

  const legacy = await browser.newPage()
  await legacy.goto("http://127.0.0.1:8560/start-you-project/cliente-exemplo")
  await legacy.getByRole("heading", { name: "Olá, Cliente Exemplo" }).waitFor()
  assert.match(legacy.url(), /\/consultoria\/cliente-exemplo$/)
  await legacy.close()

  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("http://127.0.0.1:8560/")
  const decline = page.getByRole("button", { name: "Recusar", exact: true })
  if (await decline.count()) await decline.click()
  await page.locator("#contato").scrollIntoViewIfNeeded()
  await page.locator("#contato textarea").fill("Preciso validar uma nova experiência digital antes de desenvolver.")
  await page.locator("#contato .conversation-submit").click()
  await page.locator("#contato textarea").fill("Pessoa Teste")
  await page.locator("#contato .conversation-submit").click()
  await page.locator("#contato textarea").fill("+55 48 99999-9999")
  await page.locator("#contato .conversation-submit").click()
  await page.locator("#contato .contact-consent input").check()
  await page.locator("#contato .conversation-submit").click()
  await page.getByText("O cadastro seguro ainda não está configurado neste ambiente.").waitFor()
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "contact overflow")
  await page.screenshot({ path: ".cache/qa/prospeccao/contact-mobile.png", fullPage: true })
  assert.deepEqual(errors, [])
  console.log(JSON.stringify({ proposal: "passed", contact: "passed", viewports: [390, 1440], errors }))
} finally {
  await browser.close()
  await server.close()
}
