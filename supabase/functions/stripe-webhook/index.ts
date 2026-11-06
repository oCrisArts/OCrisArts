import Stripe from "npm:stripe@23.0.0"
import { json, serviceClient } from "../_shared/consultoria.ts"

const headers = { "Cache-Control": "no-store" }

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, headers)
  const stripeKey = Deno.env.get("STRIPE_API_KEY")
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")
  const signature = request.headers.get("stripe-signature")
  if (!stripeKey || !webhookSecret || !signature) return json({ error: "webhook_not_configured" }, 503, headers)

  try {
    const stripe = new Stripe(stripeKey)
    const event = await stripe.webhooks.constructEventAsync(await request.text(), signature, webhookSecret)
    const supabase = serviceClient()
    const { data: existing } = await supabase.from("prospeccao_pagamento_eventos")
      .select("stripe_event_id").eq("stripe_event_id", event.id).maybeSingle()
    if (existing) return json({ received: true, duplicate: true }, 200, headers)

    let sessionId = ""
    let paymentIntentId = ""
    let paymentStatus: "pendente" | "pago" | "falhou" | "expirado" | "reembolsado" | null = null
    if (["checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed", "checkout.session.expired"].includes(event.type)) {
      const session = event.data.object as Stripe.Checkout.Session
      sessionId = session.id
      paymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? ""
      if (event.type === "checkout.session.async_payment_succeeded") paymentStatus = "pago"
      else if (event.type === "checkout.session.async_payment_failed") paymentStatus = "falhou"
      else if (event.type === "checkout.session.expired") paymentStatus = "expirado"
      else paymentStatus = session.payment_status === "unpaid" ? "pendente" : "pago"
    } else if (event.type === "charge.refunded") {
      const charge = event.data.object as Stripe.Charge
      paymentIntentId = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id ?? ""
      paymentStatus = "reembolsado"
    }

    let paymentId: string | null = null
    if (paymentStatus && (sessionId || paymentIntentId)) {
      let query = supabase.from("prospeccao_pagamentos").select("id, proposta_id, orcamento_id")
      query = sessionId ? query.eq("stripe_checkout_session_id", sessionId) : query.eq("stripe_payment_intent_id", paymentIntentId)
      const { data: payment, error: lookupError } = await query.maybeSingle()
      if (lookupError) throw lookupError
      if (payment) {
        paymentId = payment.id
        await supabase.from("prospeccao_pagamentos").update({ status: paymentStatus, stripe_payment_intent_id: paymentIntentId || null, atualizado_em: new Date().toISOString() }).eq("id", payment.id)
        const budgetStatus = paymentStatus === "pago" ? "pago" : paymentStatus === "expirado" ? "expirado" : paymentStatus === "reembolsado" ? "cancelado" : "checkout_iniciado"
        await supabase.from("prospeccao_orcamentos").update({ status: budgetStatus, atualizado_em: new Date().toISOString() }).eq("id", payment.orcamento_id)
        await supabase.from("prospeccao_propostas").update({ status_pagamento: paymentStatus === "expirado" ? "falhou" : paymentStatus, atualizado_em: new Date().toISOString() }).eq("id", payment.proposta_id)
      }
    }

    const { error: eventError } = await supabase.from("prospeccao_pagamento_eventos").insert({ stripe_event_id: event.id, tipo: event.type, pagamento_id: paymentId })
    if (eventError && eventError.code !== "23505") throw eventError
    return json({ received: true }, 200, headers)
  } catch (error) {
    console.error("stripe-webhook", error instanceof Error ? error.message : "unknown_error")
    return json({ error: "invalid_webhook" }, 400, headers)
  }
})
