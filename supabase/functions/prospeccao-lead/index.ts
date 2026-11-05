import { createClient } from "npm:@supabase/supabase-js@2.95.0"

const allowedOrigins = (Deno.env.get("ALLOWED_ORIGINS") ?? "https://ocris.art.br,http://localhost:8443,http://localhost:5173")
  .split(",").map((origin) => origin.trim()).filter(Boolean)

function corsHeaders(origin: string | null) {
  const allowed = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0]
  return { "Access-Control-Allow-Origin": allowed, "Access-Control-Allow-Headers": "authorization, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", Vary: "Origin" }
}

function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), { status, headers: { ...headers, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } })
}

async function sha256(value: string) {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY")
  if (!secret) return true
  if (!token) return false
  const body = new FormData()
  body.set("secret", secret); body.set("response", token); body.set("remoteip", ip)
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body })
  const result = await response.json() as { success?: boolean }
  return result.success === true
}

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("Origin")
  const cors = corsHeaders(origin)
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors })
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, cors)
  if (origin && !allowedOrigins.includes(origin)) return json({ error: "origin_not_allowed" }, 403, cors)

  try {
    const body = await request.json() as Record<string, unknown>
    const idea = typeof body.idea === "string" ? body.idea.trim() : ""
    const name = typeof body.name === "string" ? body.name.trim() : ""
    const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.replace(/[\s()-]/g, "") : ""
    const locale = ["pt-BR", "en", "es"].includes(String(body.locale)) ? String(body.locale) : "pt-BR"
    const sourcePath = typeof body.sourcePath === "string" && /^\/[A-Za-z0-9/_-]*$/.test(body.sourcePath) ? body.sourcePath : "/"
    const policyVersion = typeof body.privacyPolicyVersion === "string" ? body.privacyPolicyVersion.trim() : ""
    const startedAt = Number(body.startedAt)
    const honeypot = typeof body.website === "string" ? body.website.trim() : ""

    if (honeypot || !Number.isFinite(startedAt) || Date.now() - startedAt < 2500) return json({ error: "invalid_submission" }, 400, cors)
    if (body.consent !== true || !policyVersion) return json({ error: "consent_required" }, 422, cors)
    if (idea.length < 10 || idea.length > 1500 || name.length < 2 || name.length > 120 || !/^\+[1-9][0-9]{9,14}$/.test(whatsapp)) return json({ error: "validation_failed" }, 422, cors)

    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
    if (!await verifyTurnstile(String(body.turnstileToken ?? ""), forwarded)) return json({ error: "bot_check_failed" }, 403, cors)
    const salt = Deno.env.get("LEAD_FINGERPRINT_SALT")
    if (!salt) throw new Error("LEAD_FINGERPRINT_SALT is not configured")
    const fingerprint = await sha256(`${salt}:${forwarded}`)

    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    if (!supabaseUrl || !serviceRole) throw new Error("Supabase server secrets are not configured")
    const supabase = createClient(supabaseUrl, serviceRole, { auth: { persistSession: false, autoRefreshToken: false } })
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count, error: countError } = await supabase.from("prospeccao_leads").select("id", { count: "exact", head: true }).eq("request_fingerprint", fingerprint).gte("created_at", since)
    if (countError) throw countError
    if ((count ?? 0) >= 3) return json({ error: "rate_limited" }, 429, cors)

    const { error } = await supabase.from("prospeccao_leads").insert({ name, whatsapp, idea, consent_granted: true, consented_at: new Date().toISOString(), privacy_policy_version: policyVersion, locale, source_path: sourcePath, request_fingerprint: fingerprint })
    if (error) throw error
    return json({ ok: true, status: "novo" }, 201, cors)
  } catch (error) {
    console.error("prospeccao-lead", error instanceof Error ? error.message : "unknown_error")
    return json({ error: "internal_error" }, 500, cors)
  }
})
