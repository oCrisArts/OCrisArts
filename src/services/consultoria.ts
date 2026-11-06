import type { ConsultancySelection } from "../components/ConsultancyCard"
import type { PaymentMethod, PublicProposal } from "../data/prospeccao"

function configuration() {
  return {
    url: import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, ""),
    key: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  }
}

function headers() {
  const { key } = configuration()
  return {
    "Content-Type": "application/json",
    ...(key ? { apikey: key, Authorization: `Bearer ${key}` } : {}),
  }
}

export async function fetchPublicProposal(slug: string, signal?: AbortSignal): Promise<PublicProposal | null> {
  const { url } = configuration()
  if (!url) return null
  const response = await fetch(`${url}/functions/v1/consultoria-proposta?slug=${encodeURIComponent(slug)}`, { headers: headers(), signal })
  if (response.status === 404) return null
  if (!response.ok) throw new Error("proposal_request_failed")
  return await response.json() as PublicProposal
}

export async function createCheckout(slug: string, selection: ConsultancySelection, method: PaymentMethod) {
  const { url } = configuration()
  if (!url) throw new Error("checkout_not_configured")
  const response = await fetch(`${url}/functions/v1/consultoria-checkout`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      slug,
      planId: selection.id,
      method,
      serviceIds: selection.serviceIds,
      tagIds: selection.tags.map((tag) => tag.id),
    }),
  })
  const body = await response.json().catch(() => ({})) as { checkoutUrl?: string; error?: string }
  if (!response.ok || !body.checkoutUrl) throw new Error(body.error ?? "checkout_request_failed")
  return body.checkoutUrl
}
