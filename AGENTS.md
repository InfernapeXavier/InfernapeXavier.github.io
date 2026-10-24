# Repository guidance

This is Rohit Choudhari's portfolio website at rohitc.tech. Keep shared
coding-agent instructions in this file; `CLAUDE.md` only imports it.

## Setup and commands

- Use Node.js **24.22.1+ (24.x) or 26.12.1+ (26.x)** and **Bun 1.4.4+**.
  Older runtimes contain the CVE-2026-111497 Brotli decoder vulnerability.
  `package.json` defines the scripts and pins Bun 1.4.4 for reproducibility;
  `bun.lock` is the dependency lockfile; do not introduce npm or Yarn lockfiles.
- Install dependencies with `bun install --frozen-lockfile`.
- `bun run dev`: start Next.js development server (port 3000 by default).
- `bun run build`: create the production build.
- `bun run start`: serve an existing production build.
- `bun run lint`: run ESLint across the repository.
- `bunx tsc --noEmit --incremental false`: check TypeScript without writing a
  build-info file. This is a direct tool invocation, not a package script.
- `bunx prettier --check <changed-files>`: check formatting for specific files.
  Use `bunx prettier --write <changed-files>` to format only those files.
- `bun run format` formats the entire repository; avoid it for scoped edits.
- `bun run prepare`: initialize Husky hooks when needed. The pre-commit hook runs
  lint-staged, which formats staged JS/TS/JSON/CSS/Markdown and runs ESLint fixes
  on staged JS/TS. It does not run type checks or tests.

For Amp orbs, `.agents/setup` checks the toolchain and installs locked development
dependencies and Debian's patched system Brotli library (1.0.9-2+deb12u1 or newer).
Upgrade Node/Bun before setup if its runtime check fails. `.agents/resume` only
checks the restored tools/dependencies; it does not reinstall them. These scripts
are for the orb lifecycle, not prerequisites for every local task.

`scripts/check-runtime.mjs` rejects vulnerable Node releases before development,
builds, and startup, and checks Bun during installation and the orb lifecycle.
Vercel selects a Node major and manages its patch version; verify deployment logs
and rebuild/redeploy existing deployments after a platform runtime security update.
`vercel.json` uses `npm exec --package=bun@1.4.4` to bootstrap the patched Bun
executable rather than Vercel's default Bun; project dependencies still use only
`bun.lock` and frozen Bun installs. The Node security check runs before bootstrap.
See the [Node advisory](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)
and [Bun advisory](https://github.com/oven-sh/bun/security/advisories/GHSA-663w-cv8g-jj2p).

## Project map

- Next.js 16 App Router, React 18, strict TypeScript, and Tailwind CSS 3.
  The `@/*` alias resolves to `src/*`.
- `src/app/page.tsx` and `src/app/home.module.css`: portfolio home page.
- `src/app/layout.tsx`: shared layout, SEO/Open Graph/Twitter metadata, Person
  JSON-LD, Outfit and JetBrains Mono via `next/font/google`, theme provider,
  navigation, Vercel Analytics, and Speed Insights.
- `src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx`: blog index and
  statically generated posts sourced from `src/data/posts.ts`.
- `src/app/uses/page.tsx`: tools and hardware page, with its content defined inline.
- `src/components/`: reusable components; navigation lives in
  `src/components/layout/Navbar.tsx`, with its own CSS Module.
- `src/data/`: project, experience, education, and blog content. Prefer editing
  these sources rather than duplicating content in components.
- `src/contexts/ThemeContext.tsx`: dark-by-default theme persisted under
  `theme-preference` in localStorage; it does **not** select the theme from the
  operating system. It separately tracks the system's reduced-motion preference.
- `src/app/globals.css` and `tailwind.config.ts`: global styles, theme tokens,
  utilities, and animation settings. Component-specific styles use CSS Modules
  alongside Tailwind utilities.
- `src/hooks/useScrollAnimation.ts` and `src/components/AnimateOnScroll.tsx`:
  IntersectionObserver-based reveal behavior.
- `public/`: static assets, referenced by root-relative URLs.
- `src/utils/ipValidation.ts` exists but has no callers in `src/`; do not treat it
  as an active security boundary or assume its validation is comprehensive.

## Editing conventions

- Follow nearby code and keep changes focused. Use typed props and preserve
  Server Components unless browser APIs, state, or effects require `"use client"`.
- Prefer `@/` imports for shared source files and relative imports for colocated
  CSS Modules. Group React/Next.js imports before components and other internal
  imports. Do not create `src/lib/` or `src/styles/` just to match legacy examples.
- Follow `.prettierrc` (two spaces, double quotes, semicolons) and
  `eslint.config.mjs`; unused variables and explicit `any` are lint errors.
- Keep `src/app/sitemap.ts` and the sitemap reference in `public/robots.txt` in
  sync when adding, removing, or renaming public pages or changing the site URL.
- Reuse CSS custom properties/theme utilities. Preserve light/dark support,
  reduced-motion handling, skip links, visible focus, keyboard navigation, and
  meaningful ARIA labels when changing UI.
- `README.md`, `docs/knowledge.md`, and `.cursor/rules/` contain historical setup
  examples (including Yarn, old fonts, and generic branch/PR conventions). For
  current setup, use this file and executable configuration, not those examples.

## Verification

- For guidance-only edits, check changed Markdown with Prettier, verify referenced
  paths/scripts against the checkout, and run `git diff --check`.
- For application changes, run lint, TypeScript checking, and a production build.
  There is currently no test script or checked-in automated test suite; do not
  report tests as passing without actually running applicable checks.
- For UI changes, run the site and inspect affected routes at mobile and desktop
  widths, in both themes. Exercise affected navigation/menu states, keyboard
  access, and reduced motion; capture and inspect screenshots for visual changes.
- Font loading uses Google Fonts during builds; report network/font-fetch failures
  distinctly from source errors rather than silently changing font configuration.

## Git and deployment

- Inspect the worktree and staged diff before editing; preserve unrelated changes.
  Follow the user's ticket, branch, commit, and PR requirements. The remote default
  branch is `master`; do not assume it is `main` or commit directly to either.
- Use focused Conventional Commits (`type(scope): summary`). Do not push, deploy,
  or rewrite published history without explicit authorization.
- Deployment configuration targets Vercel, not GitHub Pages despite the repository
  name. `next.config.js` defines Next.js image rules and security headers;
  `vercel.json` adds hosting headers and immutable caching specifically for
  `/assets/*`. Frame headers differ (`SAMEORIGIN` vs `DENY`); inspect both files
  before changing security policy rather than assuming they agree.
- Never commit secrets, `.env*`, dependencies, or generated build output.
