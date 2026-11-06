import { corsHeaders, json, originAllowed, serviceClient } from "../_shared/consultoria.ts"

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("Origin")
  const cors = corsHeaders(origin)
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors })
  if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405, cors)
  if (!originAllowed(origin)) return json({ error: "origin_not_allowed" }, 403, cors)

  const slug = new URL(request.url).searchParams.get("slug")?.trim() ?? ""
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 160) return json({ error: "invalid_slug" }, 422, cors)

  try {
    const { data, error } = await serviceClient()
      .from("prospeccao_propostas")
      .select("slug, conteudo_publicavel")
      .eq("slug", slug)
      .eq("status", "publicada")
      .maybeSingle()
    if (error) throw error
    if (!data) return json({ error: "proposal_not_found" }, 404, cors)
    return json({ slug: data.slug, ...data.conteudo_publicavel }, 200, cors)
  } catch (error) {
    console.error("consultoria-proposta", error instanceof Error ? error.message : "unknown_error")
    return json({ error: "internal_error" }, 500, cors)
  }
})
