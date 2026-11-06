import { createClient } from "npm:@supabase/supabase-js@2.95.0"

export const allowedOrigins = (Deno.env.get("ALLOWED_ORIGINS") ?? "https://ocris.art.br,http://localhost:8443,http://localhost:5173,http://127.0.0.1:8560")
  .split(",").map((origin) => origin.trim()).filter(Boolean)

export function corsHeaders(origin: string | null) {
  const allowed = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0]
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, stripe-signature",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Cache-Control": "no-store",
    Vary: "Origin",
  }
}

export function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json; charset=utf-8" },
  })
}

export function originAllowed(origin: string | null) {
  return !origin || allowedOrigins.includes(origin)
}

export function serviceClient() {
  const url = Deno.env.get("SUPABASE_URL")
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  if (!url || !key) throw new Error("supabase_server_secrets_missing")
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}

export const serviceIds = ["branding", "web", "apps", "ux"] as const
export const deliverableIds = [
  "product-discovery", "journey-map", "flow", "wireframes", "prototypes", "figma",
  "figma-make-prototype", "validation", "design-thinking", "design-system", "test-plan",
  "heuristic-analysis", "usability-research",
] as const

export const planCatalog = {
  essencial: {
    services: ["web"],
    tags: deliverableIds.slice(0, 7),
    hours: 14,
    days: 16,
    cardCents: 157499,
    pixCents: 141749,
    cardPrice: "price_1UYI4aGjwjNbQit1SXZ8Y8Bd",
    pixPrice: "price_1UYI4xGjwjNbQit1xwo0gRw4",
  },
  estrategica: {
    services: ["web"],
    tags: deliverableIds.slice(0, 11),
    hours: 22,
    days: 12,
    cardCents: 247399,
    pixCents: 222659,
    cardPrice: "price_1UYI4lGjwjNbQit1pf1rYIBx",
    pixPrice: "price_1UYI4zGjwjNbQit17MFYAN1X",
  },
  completa: {
    services: ["web"],
    tags: [...deliverableIds],
    hours: 26,
    days: 6,
    cardCents: 292399,
    pixCents: 263159,
    cardPrice: "price_1UYI4nGjwjNbQit1FnSHGU3M",
    pixPrice: "price_1UYI52GjwjNbQit1OX0dCZXL",
  },
} as const

function roundUpTo99(value: number) {
  return Math.ceil(value - 0.99) + 0.99
}

export function customBudget(tagCount: number) {
  const hours = tagCount * 2
  const pix = roundUpTo99((hours * 100) / (1 - 0.0119))
  const card = roundUpTo99(Math.max(pix / 0.9, (hours * 100) / (1 - 0.0599)))
  return { hours, cardCents: Math.round(card * 100), pixCents: Math.round(pix * 100), days: Math.max(3, Math.ceil(hours / 4)) }
}

export function validSelection(services: unknown, tags: unknown) {
  if (!Array.isArray(services) || !Array.isArray(tags) || services.length === 0 || tags.length === 0) return null
  const uniqueServices = [...new Set(services.filter((value): value is string => typeof value === "string"))]
  const uniqueTags = [...new Set(tags.filter((value): value is string => typeof value === "string"))]
  if (uniqueServices.some((value) => !serviceIds.includes(value as typeof serviceIds[number]))) return null
  if (uniqueTags.some((value) => !deliverableIds.includes(value as typeof deliverableIds[number]))) return null
  return { services: uniqueServices, tags: uniqueTags }
}
