# Prompt Playground — Design

## Intent

A page on ismail9k.com where a visitor compares two versions of a prompt to find out which one works better. A single run can be a fluke, so both prompts run on several test inputs, and an AI judge scores the outputs against criteria the visitor writes. The visitor leaves with an answer to "Is B actually better than A, and at what?"

## Goals

- Visitor writes **prompt A** and **prompt B**, and a list of **test inputs**.
- Visitor pastes **their own API key** for **Anthropic or OpenAI** and picks a model.
- "Run all" runs both prompts on every input, then has an **AI judge** score each pair.
- Visitor defines a **list of judging criteria** (name + optional description). Each criterion is scored separately for A and B; **all criteria weigh equally**.
- Results appear as a **table**: one row per test input, with A's total, B's total and the row winner. An overall line shows wins (e.g. "A wins 2–1") and averages, plus which prompt won each criterion across all inputs.
- Clicking a row expands to show both outputs, per-criterion scores and the judge's one-line reason for each score.

## Non-goals

- No server, no site-owned API key, no accounts, no saved history between visits.
- No more than two prompts at a time.
- No weighted criteria.
- No providers beyond Anthropic and OpenAI.

## Anti-goals

- The visitor's key must never reach the site's own infrastructure or any third party other than the chosen provider. A key sent anywhere else makes this a failure.
- The site must stay a static `npm run generate` build on Cloudflare Pages. Anything that needs a runtime server is out.

## Constraints

- Nuxt 4 + Tailwind 4 site (see `AGENTS.md`). Static generation with `crawlLinks`, so the page must be linked from somewhere reachable (add it to the nav).
- All model calls happen client-side, directly from the browser to the provider:
  - Anthropic requires the `anthropic-dangerous-direct-browser-access: true` header for browser CORS.
  - OpenAI's API must be checked for browser CORS support while building. If it doesn't allow it, stop and report back. Don't add a proxy.
- No test suite exists in the repo.

## Decided by the user

- Purpose: compare two prompt versions (A vs B).
- Layout: prompts on top, then a test-case table with per-row scores and an overall verdict (mockup "B").
- Judging: an AI judge, using a visitor-defined list of criteria, each scored, equal weight.
- Keys: visitors bring their own. Providers: Anthropic and OpenAI.

## Builder's calls (Claude's, not confirmed by the user)

- Route `/playground`, linked as "Playground" in the nav in `app/layouts/default.vue`. Matches the site's zinc styling and dark mode. The layout is `max-w-2xl`; the page may widen itself if the table needs it.
- Test inputs are inserted into each prompt through an `{{input}}` placeholder. If a prompt has no placeholder, the input is sent as the user message and the prompt as the system prompt.
- The judge uses the same provider and key. The visitor picks a judge model separately, defaulting to the generation model.
- Scores are 1–10 per criterion. The judge returns structured JSON. To avoid position bias, which output the judge sees first is randomized per row (and recorded).
- The judge sees both outputs in a single call per row.
- A row's total is the sum of its criterion scores. A criterion's overall winner is the prompt with the higher average on it. If the row-win count and the averages disagree, both are shown.
- Ties are shown as ties.
- Three default criteria are pre-filled (Accurate, Clear, Concise) and can be edited or removed. One example prompt pair with three test inputs is pre-filled.
- The key lives only in memory by default. A "remember key on this device" checkbox stores it in `localStorage`, with a note saying so.
- Calls run with modest concurrency (e.g. 3 at a time). A per-row error shows inline and doesn't kill the run.
- Model lists are a short hardcoded set per provider, plus a free-text field for any other model ID.

## Left to the builder

Component breakdown, state handling, prompt wording for the judge, exact table styling, and loading/progress indicators.
