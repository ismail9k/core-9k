# Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/projects` page showing projects as thumbnail rows (showcase style C), sourced from Markdown files and seeded with two dummy projects.

**Architecture:** A Nuxt Content `data` collection (`projects`) sourced from `content/projects/*.md`, queried by `app/pages/projects.vue` and rendered with `app/components/ProjectCard.vue`. Projects have no detail pages; cards link out to GitHub/demo. A nav link makes the page reachable for prerendering.

**Tech Stack:** Nuxt 4, Nuxt Content 3, Tailwind CSS 4.

**Spec:** `docs/superpowers/specs/2026-10-28-projects-page-design.md`

**Status:** A first pass of all tasks exists uncommitted in the working tree. Executors verify each task against it, fix gaps, and commit.

## Global Constraints

- No test suite exists; verification is `npm run generate` plus checks on `.output/public`.
- Follow blog styling: zinc text colors with `dark:` variants, `hover:text-accent-600 dark:hover:text-accent-400` on links.
- External links use `target="_blank" rel="noopener"`.
- Dummy URLs are placeholders and must stay obviously fake (`example.com` for demos).

## Review Focus

- Project with no `image` → first-letter tile of the same size, no broken image (Task 3 check).
- Project with no `repo` and no `demo` → title renders alone, no stray separators (Task 3 check).
- Project with no `tags` → no error, no stray separators (Task 3 check).
- Two projects with equal `order` → both still render (keyed by `title`; titles must be unique).
- `/projects` missing from static output if the nav link is removed → Task 4 check greps the built file.
- Dark mode → text colors use `dark:` variants like the blog list.

---

### Task 1: Projects collection

**Files:**
- Modify: `content.config.ts`

**Interfaces:**
- Produces: collection `projects` with fields `title: string`, `description: string`, `tags?: string[]`, `repo?: string`, `demo?: string`, `image?: string`, `order: number` (default `0`).

- [ ] **Step 1:** Add `projects: defineCollection({ type: 'data', source: 'projects/*.md', schema: z.object({...}) })` beside `blog`, with the fields above.
- [ ] **Step 2:** Run `npm run generate`. Expected: build succeeds.
- [ ] **Step 3:** Commit: `git add content.config.ts && git commit -m "feat: add projects content collection"`

### Task 2: Dummy projects

**Files:**
- Create: `content/projects/pixel-palette.md`
- Create: `content/projects/terminal-notes.md`
- Create: `public/projects/pixel-palette.svg` (pink→yellow→blue gradient)
- Create: `public/projects/terminal-notes.svg` (dark tile, green `$ notes_` prompt)

**Interfaces:**
- Consumes: Task 1 schema (front matter only, empty body).

- [ ] **Step 1:** `pixel-palette.md`: title `Pixel Palette`, description `A tiny tool that pulls a color palette out of any image and exports it as CSS variables.`, tags `[Vue, Canvas API]`, repo `https://github.com/ismail9k/pixel-palette`, demo `https://example.com/pixel-palette`, image `/projects/pixel-palette.svg`, order `1`.
- [ ] **Step 2:** `terminal-notes.md`: title `Terminal Notes`, description `A minimal command-line notebook for jotting down ideas without leaving the shell.`, tags `[Node.js, CLI]`, repo `https://github.com/ismail9k/terminal-notes`, no demo, image `/projects/terminal-notes.svg`, order `2`.
- [ ] **Step 3:** Commit: `git add content/projects public/projects && git commit -m "content: add two dummy projects"`

### Task 3: ProjectCard component and page

**Files:**
- Create: `app/components/ProjectCard.vue`
- Create: `app/pages/projects.vue`

**Interfaces:**
- Consumes: `projects` collection (Task 1).
- Produces: `<ProjectCard :project="{ title, description, tags?, repo?, demo?, image? }" />`.

- [ ] **Step 1:** `ProjectCard.vue`: flex row, `gap-4 py-4`. Left: thumbnail `h-14 w-18 sm:h-18 sm:w-24 shrink-0 rounded-lg object-cover`, `alt` = title; without `image`, a same-size `bg-zinc-100 dark:bg-zinc-800` tile with the title's first letter. Right: title (`font-semibold`) followed by `text-sm` `GitHub` / `Demo` links (only when set, joined by ` · `), description (`text-zinc-600 dark:text-zinc-400`), tags as `text-xs text-zinc-500` joined by ` · `.
- [ ] **Step 2:** `projects.vue`: `useSeoMeta({ title: 'Projects', description: 'Things I have built.' })`; `useAsyncData('projects', () => queryCollection('projects').order('order', 'ASC').all())`; `h1` "Projects" styled like the Blog heading; list of `ProjectCard` keyed by `title`.
- [ ] **Step 3:** Run `npm run dev`, open `/projects`. Expected: Pixel Palette above Terminal Notes; both show their thumbnails; Terminal Notes shows GitHub only; temporarily removing an `image` shows the letter tile.
- [ ] **Step 4:** Commit: `git add app/components/ProjectCard.vue app/pages/projects.vue && git commit -m "feat: add projects page"`

### Task 4: Nav link and static build check

**Files:**
- Modify: `app/layouts/default.vue` (nav, after the Blog link)
- Modify: `AGENTS.md` (Architecture: mention the `projects` collection and page)

- [ ] **Step 1:** Add `<NuxtLink to="/projects" class="hover:text-zinc-500" active-class="font-medium">Projects</NuxtLink>` after Blog.
- [ ] **Step 2:** Add one Architecture bullet to `AGENTS.md` describing the `projects` data collection, `content/projects/*.md`, and that projects have no detail pages.
- [ ] **Step 3:** Run `npm run generate && grep -o "Pixel Palette\|Terminal Notes" .output/public/projects/index.html | sort -u`. Expected: both names printed.
- [ ] **Step 4:** Commit: `git add app/layouts/default.vue AGENTS.md && git commit -m "feat: link projects page in nav"`
