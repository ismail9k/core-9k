# AGENTS.md

Canonical instruction file for this repository, shared by all coding agents
(Claude Code, Codex, Cursor, and others). Claude Code reaches it through the
`@AGENTS.md` import in `CLAUDE.md`. Repository guidance belongs here, while
tool-specific pointer files contain no duplicate guidance.

## Project knowledge

Abdelrahman Ismail's personal website and blog (`ismail9k.com`), built with Nuxt 4, Nuxt Content 3 and Tailwind CSS 4. It is generated as a static site and deployed to Cloudflare Pages.

<!--
Fill this in as the project develops. Keep it under a page so stale context does
not burden every session. When an agent makes the same mistake twice, record the
correction here.
-->

### Commands

```bash
npm install        # also runs `nuxt prepare` (postinstall), which regenerates .nuxt/ types
npm run dev        # dev server with hot reload for pages and Markdown
npm run generate   # static build into .output/public (also reachable through the `dist` symlink)
npm run preview    # serve the last build locally
npm run build      # server (Nitro) build; the deployed site uses `generate`
```

There is no test suite, linter or formatter set up.

### Conventions

### Architecture

- **Content pipeline.** `content.config.ts` defines a single `blog` collection (`type: 'page'`) sourced from `content/blog/*.md`. Front matter takes `title`, `description`, `date` and an optional `tags` array; `title` and `description` come with the page collection type, and the schema adds the other two. Nuxt Content indexes the Markdown into a SQLite database (`better-sqlite3`, cached in `.data/content/`), and pages query it with `queryCollection('blog')`.
- **Routing.** A post's collection `path` comes from its file location (`content/blog/hello-world.md` → `/blog/hello-world`). `app/pages/blog/[...slug].vue` looks the post up with `.path(route.path)`, so a post's URL is only correct while the file stays under `content/blog/` and that page stays at `pages/blog/`. A post with no match returns a fatal 404.
- **Listings.** `app/pages/index.vue` (the latest 3 posts) and `app/pages/blog/index.vue` (all posts) sort by `date` descending and render each post with `app/components/PostCard.vue`.
- **Projects.** `content.config.ts` also defines a `projects` collection (`type: 'data'`) from `content/projects/*.md`; front matter only (`title`, `description`, optional `tags`, `repo`, `demo`, `image`, and `order`, ascending). Thumbnails live in `public/projects/`. `app/pages/projects.vue` lists them with `app/components/ProjectCard.vue`; projects have no detail pages and are reachable through the Projects nav link.
- **RSS.** `server/routes/rss.xml.ts` builds the feed by hand with the server-side `queryCollection(event, 'blog')` from `@nuxt/content/server`. The site URL is hardcoded there as `SITE_URL`.
- **Prerendering.** `nuxt.config.ts` sets `nitro.prerender` with `crawlLinks: true` and lists `/` and `/rss.xml` as starting routes. Every page, including each post, has to be reachable through a link from those routes, or `generate` leaves it out of the static output.
- **Styling.** Tailwind 4 is loaded through the Vite plugin; `app/assets/css/main.css` has no `tailwind.config` and adds `@tailwindcss/typography` with `@plugin`. Rendered post bodies use `prose prose-zinc dark:prose-invert`. Dark mode follows the `dark:` variant (the system color scheme), and there is no theme toggle.
- **Shell.** `app/app.vue` → `app/layouts/default.vue`, which holds the header, the nav (Home, Blog) and the footer (GitHub and RSS links).

### Things agents get wrong

## Agent configuration

Skill-managed settings live under `docs/agents/` as small, focused files rather
than inline here, so each can be read by only the skill that needs it:

- `docs/agents/issue-tracker.md` — where issues and intents live for this repo,
  how to read them, and how finished work links back to them (written by the
  `setup-issue-tracker` skill)

As more skills are adopted, each may add its own file under `docs/agents/`.
List those files here so this section remains a table of contents rather than
accumulating their configuration inline.

## Workflow

1. Talk the problem through — with Superpowers' `brainstorming` when it is
   installed. For work with no intent issue, once the problem is understood
   and before any approach is proposed, ask: build it now, or track it first?
   `superpowers-issue-bridge` defines this step.
2. **Build now:** continue with the usual development workflow — spec, plan,
   code, and pull request. No intent issue is involved.
3. **Track first:** `brainstorm-to-issue` files an intent issue in the tracker
   recorded in `docs/agents/issue-tracker.md`, with any decisions already made
   under Constraints. The session ends there.
4. To build a tracked issue, reference it (for example, "implement #42").
   `superpowers-issue-bridge` seeds brainstorming from the issue and carries
   its reference into the spec and plan.
5. When the work lands, link it back using the Linking section of
   `docs/agents/issue-tracker.md`. `superpowers-issue-bridge` asks whether the
   work fully resolves the issue, which closes it, or is partial.
6. **After a pull request opens:** when a watcher wakes you on a pull request
   you opened — a failing check, a merge conflict, or new review comments, as
   Claude Code's pull request auto-fix does — the user turning that watcher on
   is the go-ahead to push to its branch and reply on it. Answer review
   comments with `answer-pr-reviews`. Debug a failing check from its log with
   Superpowers' `systematic-debugging`. Resolve a merge conflict by merging
   the base branch in, never by rebasing. Run the project's checks under
   `verification-before-completion` before every push. Never force-push,
   resolve a thread, approve, merge, enable auto-merge, or mark a draft ready
   — accepting the work stays with the user.
