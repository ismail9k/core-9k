# Projects Page Design

## Intent

Give the site a `/projects` page that lists things Abdelrahman has built, next to the existing blog. For now it is seeded with two dummy projects so the page can ship and be filled with real projects later by adding Markdown files.

## Goals

- A `/projects` page reachable from the main nav (after Blog).
- Each project shows a thumbnail, a name, a one-line description, optional tech tags, and optional links to its GitHub repo and a live demo.
- Adding a project means adding one Markdown file under `content/projects/`, the same way blog posts work.
- Two dummy projects: **Pixel Palette** (with repo and demo links) and **Terminal Notes** (repo only).

## Non-goals

- Individual project detail pages. Cards link out to GitHub/demo.
- Showing projects on the home page.
- Filtering or searching by tag.

## Anti-goals

- Dummy content that could pass as real: placeholder demo links use `example.com`.
- A look that departs from the blog: the page must feel like part of the same site.

## Constraints

- Nuxt 4, Nuxt Content 3, Tailwind 4, static generation (`npm run generate`) for Cloudflare Pages.
- Pages are only generated if linked from `/` or `/rss.xml`, so the nav link is required for `/projects` to be in the build.
- The site column is narrow (`max-w-2xl`).

## Decisions

Decided in chat:
- Placeholder projects for now (user: "Create two dummy projects for me").
- **Showcase layout with thumbnails** (style C, picked from three mockups): each project is a row with a small image on the left and the text on the right.

Claude's calls (open to change):
- **Thumbnail**: about 96×72px, rounded corners, image cropped to fill (`object-cover`). On phones it stays beside the text at a smaller size.
- **Images**: stored in `public/projects/` and referenced by an optional `image` front-matter field (e.g. `/projects/pixel-palette.svg`), with the project title as alt text.
- **No image**: a neutral rounded tile showing the project's first letter, so a missing image never leaves a gap.
- **Dummy images**: simple SVGs: a color gradient for Pixel Palette, a dark terminal prompt for Terminal Notes.
- **Data model**: a Nuxt Content `data` collection `projects` from `content/projects/*.md` with front matter `title` (required), `description` (required), `tags` (optional list), `repo` (optional URL), `demo` (optional URL), `image` (optional path), `order` (number, default 0; lower comes first).
- **Row**: thumbnail, then title with `GitHub` / `Demo` links beside it (new tab, shown only when set), description, and tags as a small `Vue · Canvas API` line.
- **Page copy**: heading "Projects"; meta description "Things I have built."
- `AGENTS.md` gets a short note on the projects collection.

## Left to the builder

- Exact Tailwind classes, as long as they follow the existing blog styling and dark-mode variants.
- Component and file naming beyond `content/projects/`.
