# next-opendesk-sme-org Design Spec

**Date**: 2026-05-11
**Status**: Approved
**Source**: `next-opendesk-edu-org` (template)
**Target**: `next-opendesk-sme-org`

---

## 1. Overview

Fork `next-opendesk-edu-org` to create `next-opendesk-sme-org` — the official website for [openDesk SME](https://opendesk-sme.org), an open-source digital workplace adapted for small and medium enterprises. The key differentiator is the integration of open-source ERP and invoicing tools.

---

## 2. Tech Stack

Identical to Edu version:

- **Framework**: Next.js 16.2.1 (App Router, standalone output)
- **UI**: React 19.2.4, Tailwind CSS v4
- **Language**: TypeScript (strict mode)
- **i18n**: next-intl — English, Deutsch, Français, 中文
- **Content**: Markdown with MDX support
- **Testing**: Vitest (unit), Playwright (e2e)
- **Deployment**: Docker multi-stage build, Traefik reverse proxy

---

## 3. Content Changes (Edu → SME)

| Element | Edu | SME |
|---------|-----|-----|
| Target audience | Higher education institutions | Small/medium enterprises |
| Hero headline | Education-focused messaging | Business process automation, cost savings |
| Case studies | University references | Business/SME references |
| Feature highlights | Academic tools, research support | ERP, invoicing, time tracking, CRM |
| Brand tone | Academic, collaborative | Professional, efficient, business-oriented |

---

## 4. Integration Showcase

### 4.1 Initial Integrations (v1)

#### ERPNext
- Full open-source ERP (invoicing, accounting, inventory, HR, CRM)
- Part of the Frappe/ERPNext stack
- Self-hostable, active community
- URL: https://erpnext.org

#### Invoice Ninja
- Open-source invoicing platform
- Time tracking → invoices → payments
- White-label ready, multiple payment gateways
- URL: https://invoiceninja.org

### 4.2 Roadmap Integrations

| Integration | Status | Notes |
|-------------|--------|-------|
| Dolibarr | Roadmap | Lightweight ERP/CRM, PHP-based, easy deployment |
| Kimai | Roadmap | Time tracking, good for time-based billing |
| Invoice Ninja (additional) | Roadmap | Show more advanced Invoice Ninja features |

---

## 5. New Content Sections

### 5.1 Integrations Page (`/integrations`)
- Hero: "Open-source integrations for your business"
- Cards for each integration (ERPNext, Invoice Ninja, Dolibarr, Kimai)
- Status badges: "Available now" vs "Coming soon"
- Feature comparison table
- Links to each project's documentation

### 5.2 SME-Specific Homepage Sections
- **"Why openDesk for SMEs?"** section replacing education focus
- **ROI calculator** concept (placeholder for future)
- **Business process automation** showcase instead of academic tools

---

## 6. Design System

### 6.1 Colors
- Keep primary openDesk brand colors
- Secondary palette adjusted for SME/professional tone
- Status colors: green (available), amber (roadmap)

### 6.2 Layout
- Identical structure to Edu site
- Same component patterns
- Responsive breakpoints maintained

### 6.3 Typography
- Same font stack as Edu
- Adjusted headings for business audience

---

## 7. Internationalization

Same 4 locales as Edu: `en`, `de`, `fr`, `zh`
- Translate all SME-specific content
- Maintain consistent terminology across languages

---

## 8. Deployment

### 8.1 Repository
- **GitHub**: `opendesk-sme/opendesk-sme-website`
- **Codeberg**: `opendesk-sme/opendesk-sme-website` (auto-mirror via GitHub Actions)

### 8.2 Domains
- Primary: `opendesk-sme.org`, `www.opendesk-sme.org`
- Docker/Traefik labels updated from Edu domains

### 8.3 CI/CD
- Same GitHub Actions workflow as Edu
- Lint, test, build validation
- SSH deploy to production
- Health check verification

---

## 9. Project Structure

```
next-opendesk-sme-org/
├── src/                    # Next.js App Router
├── content/                # Markdown articles (SME-focused)
│   ├── en/
│   ├── de/
│   ├── fr/
│   └── zh/
├── messages/               # i18n translation files
├── public/                 # Static assets
├── docs/superpowers/       # Specs and plans
├── docker-compose.yml      # Traefik config (sme domain)
├── Dockerfile
└── [configs identical to Edu]
```

---

## 10. Implementation Phases

### Phase 1: Foundation
- [ ] Fork Edu repo to SME repo
- [ ] Update package.json name
- [ ] Update domain references (Edu → SME)
- [ ] Verify build works

### Phase 2: Content Adaptation
- [ ] Update homepage hero/messaging
- [ ] Create SME-specific content sections
- [ ] Update case studies/references
- [ ] Translate all content to 4 languages

### Phase 3: Integration Showcase
- [ ] Create `/integrations` page
- [ ] Add ERPNext card + details
- [ ] Add Invoice Ninja card + details
- [ ] Add Dolibarr (roadmap) card
- [ ] Add Kimai (roadmap) card

### Phase 4: Production
- [ ] Update Docker/Traefik for SME domains
- [ ] Set up GitHub repo with Actions
- [ ] Deploy to production
- [ ] Verify all tests pass

---

## 11. License

Apache-2.0 (same as Edu)

Note: openDesk artwork and visual assets include copyright by BMUV and ZenDiS.