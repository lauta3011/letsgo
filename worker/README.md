# Chat proxy (Cloudflare Worker)

Holds the NVIDIA API key and answers `POST /chat` for the portfolio chatbot. The Worker
reads `my-cv.md` at the repository root at deploy time, so the CV never needs to be copied.

## Deploy

Run from the repository root:

```bash
npx wrangler login
npx wrangler secret put LLM_API_KEY   # paste the nvapi-... key from build.nvidia.com
npx wrangler deploy
```

The endpoint becomes `https://chatty-chat.lauta-3011.workers.dev/chat`, which is what
`PUBLIC_CHAT_API_URL` points to in `.env`.

## Local development

```bash
# Put LLM_API_KEY=nvapi-... in .dev.vars (gitignored), then:
npx wrangler dev
```

`wrangler dev` serves `http://localhost:8787`. Use `/chat` and send an `Origin` header of
`http://localhost:4321` (the Astro dev server) so CORS passes.

## Configuration

| Name              | Where                                 | Default                        |
| ----------------- | ------------------------------------- | ------------------------------ |
| `LLM_API_KEY`     | Worker secret (never committed)       | required                       |
| `NVIDIA_MODEL`    | `wrangler.toml` `[vars]` or dashboard | `nvidia/nemotron-3.5-bolt-e4b` |
| `DAILY_CHAT_LIMIT`| `wrangler.toml` `[vars]`              | `200`                          |
| `ALLOWED_ORIGINS` | optional comma-separated additions    | GitHub Pages + localhost       |

## Abuse protection (all on the free plan)

- `CHAT_RATE_LIMITER` — Cloudflare Rate Limiting binding, 5 requests / 60 s per IP. Counters
  live per Cloudflare location and are approximate by design. No per-call charge.
- `DAILY_BUDGET` — a single SQLite-backed Durable Object that enforces an exact global
  daily ceiling (`DAILY_CHAT_LIMIT`) so rotating IPs cannot drain the model quota. When the
  cap is hit the Worker returns `429` with `Retry-After` until the next UTC midnight.
  The slot is taken only after request validation, so malformed traffic never consumes it,
  and it is refunded when the upstream model call fails.
- If either binding is unavailable the Worker degrades gracefully: the rate limiter falls
  back to a local counter and the budget check fails open. A storage hiccup never takes
  the chat down.

Reach for Cloudflare Turnstile only if you see traffic the per-IP limit does not stop. It is
free (unlimited challenges) but adds a `challenges.cloudflare.com` script to the page.

Note: WAF rate-limiting rules need a zone, so they do not apply to `*.workers.dev`. Attach a
custom domain to the Worker first if you want an edge-level rule.

## Deploying the new bindings

`npx wrangler deploy` creates the Durable Object and applies the `v1` migration declared in
`wrangler.toml` on its own — no dashboard steps, no KV namespace to create. Secrets persist
across deploys.
