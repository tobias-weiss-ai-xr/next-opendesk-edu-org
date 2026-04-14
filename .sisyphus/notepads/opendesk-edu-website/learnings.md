# Learnings

## [2026-04-14] Session Start
- Project directory is empty (only .sisyphus/ exists)
- Reference project at C:\Users\Tobias\git\next-graphwiz-ai
- Artwork repo at C:\Users\Tobias\git\opendesk-edu-artwork
## Project Initialization Learnings

- ESLint 9 requires eslint.config.mjs (flat config), not .eslintrc
- Vitest exits code 1 when no test files found; need \passWithNoTests: true\ in config
- Husky \prepare\ script warns about missing .git (expected before git init)
- Added \emark-rehype\, \clsx\, \	ailwind-merge\ beyond reference project deps
- Used \
ext dev --turbopack\ for dev script (task requirement)
- Created tsconfig.json, vitest.config.ts, src/test/setup.ts as essential infrastructure files
- 626 packages installed, 1 high severity vulnerability (expected for fresh install)

## [2026-04-14] Tasks 3-7: Scaffolding Files

- Created 8 scaffolding files: next.config.ts, globals.css, playwright.config.ts, e2e/.gitkeep, barrel exports, Dockerfile, docker-compose.yml
- next.config.ts: standalone output, MDX via @next/mdx, turbopack root config, security headers
- globals.css: Purple palette (#571EFA accent, #341291 accent-button) replacing blue (#0288d1, #01579b)
- Light theme border: #E5E7EB, secondary text: #6B7280 (matching design system spec)
- Dark theme kept reference values (#30363d border, #8b949e secondary text)
- Playwright config uses chromium only, dev server on port 3000
- Dockerfile uses multi-stage build (deps → builder → runner) with node:20-alpine
- docker-compose.yml uses Traefik labels with opendesk-edu.org domains
- npm run lint and npx tsc --noEmit both pass cleanly
