import Stripe from "npm:stripe@23.0.0"
import {
  corsHeaders, customBudget, json, originAllowed, planCatalog, serviceClient, validSelection,
} from "../_shared/consultoria.ts"

type PlanId = keyof typeof planCatalog | "custom"
type PaymentMethod = "card" | "pix"

function randomLetters(length = 8) {
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(bytes, (value) => String.fromCharCode(97 + value % 26)).join("")
}

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("Origin")
  const cors = corsHeaders(origin)
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors })
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, cors)
  if (!originAllowed(origin)) return json({ error: "origin_not_allowed" }, 403, cors)

  try {
    const body = await request.json() as Record<string, unknown>
    const slug = typeof body.slug === "string" ? body.slug.trim() : ""
    const planId = String(body.planId ?? "") as PlanId
    const method = String(body.method ?? "") as PaymentMethod
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !["essencial", "estrategica", "completa", "custom"].includes(planId) || !["card", "pix"].includes(method)) {
      return json({ error: "validation_failed" }, 422, cors)
    }

    const supabase = serviceClient()
    const { data: proposal, error: proposalError } = await supabase
      .from("prospeccao_propostas").select("id, slug").eq("slug", slug).eq("status", "publicada").maybeSingle()
    if (proposalError) throw proposalError
    if (!proposal) return json({ error: "proposal_not_found" }, 404, cors)

    const fixed = planId === "custom" ? null : planCatalog[planId]
    const selection = fixed
      ? { services: [...fixed.services], tags: [...fixed.tags] }
      : validSelection(body.serviceIds, body.tagIds)
    if (!selection) return json({ error: "invalid_customization" }, 422, cors)

    const calculated = fixed ?? customBudget(selection.tags.length)
    const amountCents = method === "pix" ? calculated.pixCents : calculated.cardCents
    const { data: previous } = await supabase.from("prospeccao_orcamentos")
      .select("versao").eq("proposta_id", proposal.id).order("versao", { ascending: false }).limit(1).maybeSingle()
    const version = (previous?.versao ?? 0) + 1
    const { data: budget, error: budgetError } = await supabase.from("prospeccao_orcamentos").insert({
      proposta_id: proposal.id,
      versao: version,
      plano_id: planId,
      servicos: selection.services,
      entregaveis: selection.tags,
      horas: calculated.hours,
      prazo_dias_uteis: calculated.days,
      valor_cartao_centavos: calculated.cardCents,
      valor_pix_centavos: calculated.pixCents,
      status: "confirmado",
      valido_ate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }).select("id").single()
    if (budgetError) throw budgetError

    const stripeKey = Deno.env.get("STRIPE_API_KEY")
    if (!stripeKey) return json({ error: "payments_not_configured", budgetId: budget.id }, 503, cors)
    const liveKey = /^(?:sk|rk)_live_/.test(stripeKey)
    if (liveKey && Deno.env.get("STRIPE_LIVE_ENABLED") !== "true") {
      return json({ error: "live_payments_disabled", budgetId: budget.id }, 503, cors)
    }

    const siteUrl = (Deno.env.get("SITE_URL") ?? "https://ocris.art.br").replace(/\/$/, "")
    const stripe = new Stripe(stripeKey)
    const lineItem = fixed
      ? { price: method === "pix" ? fixed.pixPrice : fixed.cardPrice, quantity: 1 }
      : {
          price_data: {
            currency: "brl",
            unit_amount: amountCents,
            product_data: { name: "OCrisArts — Consultoria Personalizada" },
          },
          quantity: 1,
        }
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "hosted_page",
      line_items: [lineItem],
      allowed_payment_method_types: [method],
      client_reference_id: budget.id,
      success_url: `${siteUrl}/consultoria/${encodeURIComponent(slug)}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/consultoria/${encodeURIComponent(slug)}?checkout=cancelled`,
      locale: "pt-BR",
      integration_identifier: `ocrisarts_consultoria_${randomLetters()}`,
      metadata: { proposta_id: proposal.id, orcamento_id: budget.id, plano_id: planId, metodo: method },
    })
    if (!session.url) throw new Error("stripe_session_url_missing")

    const { error: paymentError } = await supabase.from("prospeccao_pagamentos").insert({
      proposta_id: proposal.id,
      orcamento_id: budget.id,
      stripe_checkout_session_id: session.id,
      metodo: method,
      valor_centavos: amountCents,
      status: "pendente",
    })
    if (paymentError) throw paymentError
    await supabase.from("prospeccao_orcamentos").update({ status: "checkout_iniciado", atualizado_em: new Date().toISOString() }).eq("id", budget.id)
    await supabase.from("prospeccao_propostas").update({ stripe_checkout_session_id: session.id, status_pagamento: "pendente", atualizado_em: new Date().toISOString() }).eq("id", proposal.id)
    return json({ checkoutUrl: session.url }, 201, cors)
  } catch (error) {
    console.error("consultoria-checkout", error instanceof Error ? error.message : "unknown_error")
    return json({ error: "internal_error" }, 500, cors)
  }
})
