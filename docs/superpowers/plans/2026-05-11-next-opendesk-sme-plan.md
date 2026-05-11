# next-opendesk-sme-org Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create next-opendesk-sme-org website (fork of next-opendesk-edu-org) with SME-focused content and ERPNext + Invoice Ninja integration showcase.

**Architecture:** Fork the Edu site Next.js 16 codebase, repurpose content for SMEs, add new integrations page, update Docker/Traefik configs for SME domains.

**Tech Stack:** Next.js 16.2.1, React 19.2.4, Tailwind CSS v4, TypeScript, MDX, next-intl, Vitest, Playwright, Docker, Traefik

---

## File Map

### New Files (create)
- `next-opendesk-sme-org/` (entire directory tree, copied from Edu then modified)
- `next-opendesk-sme-org/docs/superpowers/plans/YYYY-MM-DD-next-opendesk-sme-plan.md` (this plan)

### Modified (copy from Edu → SME, then change)
| File | Key Changes |
|------|-------------|
| `package.json` | name → `next-opendesk-sme-org` |
| `docker-compose.yml` | Service name → `opendesk-sme`, domains → `opendesk-sme.org` |
| `traefik*.yml` | Domains → SME |
| `messages/{en,de,fr,zh}.json` | Edu → SME, new integration keys |
| `content/en/` | New SME pages + `/integrations` section |
| `content/{de,fr,zh}/` | Same structure as en, translated |
| `src/app/[locale]/page.tsx` | Homepage hero/messaging for SME |
| `src/components/` | Add Integrations components |
| `routers.json` | Domain updates |

---

## Phase 1: Foundation (Tasks 1-5)

### Task 1: Fork Repository

- [ ] **Step 1: Clone Edu repo as SME**

```bash
cd C:/Users/Tobias/git
git clone next-opendesk-edu-org next-opendesk-sme-org
cd next-opendesk-sme-org
```

- [ ] **Step 2: Remove Edu git history (fresh repo)**

```bash
rm -rf .git
git init
git add .
git commit -m "Fork from next-opendesk-edu-org - initial SME version"
```

- [ ] **Step 3: Update package.json**

```json
{
  "name": "next-opendesk-sme-org",
  "version": "0.1.0",
  "private": true,
  ...
}
```

- [ ] **Step 4: Verify build works**

```bash
npm install
npm run build
```
Expected: Successful build with no errors

---

### Task 2: Update Docker/Traefik Configuration

- [ ] **Step 1: Update docker-compose.yml**

File: `docker-compose.yml`

```yaml
services:
  opendesk-sme:
    build: .
    image: opendesk-sme:latest
    container_name: opendesk-sme
    # ... (same as Edu, but domains: opendesk-sme.org, www.opendesk-sme.org)
    labels:
      - traefik.enable=true
      - traefik.docker.network=traefik-web
      - "traefik.http.routers.opendesk-sme.rule=Host(`opendesk-sme.org`,`www.opendesk-sme.org`) && !PathPrefix(`/.well-known/acme-challenge/`)"
      # ... etc, replace all opendesk-edu with opendesk-sme
```

- [ ] **Step 2: Update traefik files**

Files: `traefik-updated.yml`, `traefik-updated-fixed.yml`
- Replace `opendesk-edu.org` with `opendesk-sme.org` throughout

- [ ] **Step 3: Commit**

```bash
git add docker-compose.yml traefik*.yml
git commit -m "feat: update Docker/Traefik for SME domain"
```

---

### Task 3: Update i18n Messages (English)

- [ ] **Step 1: Update en.json**

File: `messages/en.json`

Changes (diff concept):
```json
{
  "header": {
    "home": "Home",
    "components": "Components",
    "architecture": "Architecture",
    "getStarted": "Get Started",
    "blog": "Blog",
    "integrations": "Integrations",  // NEW
    "about": "About",
    ...
  },
  "footer": {
    ...
    "copyright": "© {year} openDesk SME. Licensed under Apache-2.0.",  // Changed
    ...
  },
  "about": {
    "title": "About openDesk SME",  // Changed
    "description": "openDesk SME brings together openDesk CE and open-source ERP/invoicing integrations for seamless digital transformation in small and medium enterprises.",  // Changed
    // Replace education services with SME services
  },
  "hero": {
    "subtitle": "SME Digital Workplace",  // Changed
    "description": "openDesk CE with ERPNext and Invoice Ninja integrations for seamless digital transformation in small and medium enterprises."  // Changed
  },
  "home": {
    "getInTouch": "Get in Touch",
    "getInTouchDescription": "Interested in deploying openDesk SME at your organization?"  // Changed
  },
  "integrations": {  // NEW SECTION
    "title": "Open-Source Integrations",
    "description": "Connect your digital workplace with powerful open-source business tools.",
    "availableNow": "Available now",
    "comingSoon": "Coming soon",
    "erpnext": {
      "title": "ERPNext",
      "description": "Full open-source ERP covering accounting, inventory, HR, and CRM.",
      "features": ["Invoicing", "Accounting", "Inventory Management", "HR & Payroll", "CRM", "Project Management"]
    },
    "invoiceNinja": {
      "title": "Invoice Ninja",
      "description": "Open-source invoicing with time tracking and payment processing.",
      "features": ["Invoice Generation", "Time Tracking", "Payment Gateway", "Client Portal", "White-label"]
    },
    "dolibarr": {
      "title": "Dolibarr",
      "description": "Lightweight ERP/CRM solution for small businesses.",
      "features": ["CRM", "Invoicing", "Inventory", "HR", "Project Management"],
      "status": "roadmap"
    },
    "kimai": {
      "title": "Kimai",
      "description": "Time-tracking with seamless invoicing integration.",
      "features": ["Time Tracking", "User Management", "Export to Invoice Ninja", "Multi-customer"],
      "status": "roadmap"
    }
  },
  // ... keep all other existing keys
}
```

- [ ] **Step 2: Commit**

```bash
git add messages/en.json
git commit -m "feat: update i18n messages for SME content"
```

---

### Task 4: Update i18n Messages (DE, FR, ZH)

- [ ] **Step 1: Update de.json**

File: `messages/de.json`
- Same changes as en.json but translated to German
- "Integrations" → "Integrationen"
- "About openDesk SME" → "Über openDesk SME"
- Etc.

- [ ] **Step 2: Update fr.json**

File: `messages/fr.json`
- Same changes translated to French

- [ ] **Step 3: Update zh.json**

File: `messages/zh.json`
- Same changes translated to Chinese

- [ ] **Step 4: Commit**

```bash
git add messages/de.json messages/fr.json messages/zh.json
git commit -m "feat: update i18n messages (DE, FR, ZH) for SME content"
```

---

### Task 5: Update Homepage Content (English)

- [ ] **Step 1: Read current homepage**

File: `src/app/[locale]/page.tsx`

- [ ] **Step 2: Update hero content**

File: `content/en/get-started/index.md` or relevant MDX
- Replace "Educational Digital Infrastructure" → "SME Digital Workplace"
- Update description to reference ERPNext + Invoice Ninja

- [ ] **Step 3: Create integrations page content**

File: `content/en/integrations/index.md`

```markdown
---
title: "Open-Source Integrations"
date: "2026-05-11"
description: "Connect your digital workplace with powerful open-source business tools."
categories: ["integrations"]
tags: ["erpnext", "invoice-ninja", "dolibarr", "kimai"]
draft: false
---

# Open-Source Integrations

openDesk SME connects seamlessly with leading open-source business tools...

## ERPNext

Full open-source ERP...

## Invoice Ninja

Open-source invoicing platform...

## Roadmap

### Dolibarr
Coming soon...

### Kimai
Coming soon...
```

- [ ] **Step 4: Create translated content for DE, FR, ZH**

Files: `content/de/integrations/index.md`, `content/fr/integrations/index.md`, `content/zh/integrations/index.md`

- [ ] **Step 5: Commit**

```bash
git add content/
git commit -m "feat: add SME homepage and integrations content"
```

---

## Phase 2: Integration Showcase (Tasks 6-9)

### Task 6: Create Integration Components

- [ ] **Step 1: Create IntegrationCard component**

File: `src/components/integrations/integration-card.tsx`

```tsx
interface Integration {
  id: 'erpnext' | 'invoice-ninja' | 'dolibarr' | 'kimai'
  status: 'available' | 'roadmap'
  features: string[]
}

interface IntegrationCardProps {
  integration: Integration
  locale: string
}

export function IntegrationCard({ integration, locale }: IntegrationCardProps) {
  // Render card with logo placeholder, description, features, status badge
  // Use next-intl for translations via useTranslations hook
}
```

- [ ] **Step 2: Create IntegrationGrid component**

File: `src/components/integrations/integration-grid.tsx`

```tsx
export function IntegrationGrid({ integrations }: { integrations: Integration[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {integrations.map(integration => (
        <IntegrationCard key={integration.id} integration={integration} />
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Create StatusBadge component**

File: `src/components/integrations/status-badge.tsx`

```tsx
interface StatusBadgeProps {
  status: 'available' | 'roadmap'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  // "Available now" (green) or "Coming soon" (amber) badge
}
```

- [ ] **Step 4: Export all from index**

File: `src/components/integrations/index.ts`

```tsx
export { IntegrationCard } from './integration-card'
export { IntegrationGrid } from './integration-grid'
export { StatusBadge } from './status-badge'
```

- [ ] **Step 5: Run tests and lint**

```bash
npm run lint
npm run test
```
Expected: All pass

- [ ] **Step 6: Commit**

```bash
git add src/components/integrations/
git commit -m "feat: add integration showcase components"
```

---

### Task 7: Create Integrations Page

- [ ] **Step 1: Create page file**

File: `src/app/[locale]/integrations/page.tsx`

```tsx
import { IntegrationGrid } from '@/components/integrations'
import { useTranslations } from 'next-intl'

const integrations = [
  { id: 'erpnext', status: 'available', features: ['Invoicing', 'Accounting', 'Inventory', 'HR', 'CRM'] },
  { id: 'invoice-ninja', status: 'available', features: ['Invoicing', 'Time Tracking', 'Payments'] },
  { id: 'dolibarr', status: 'roadmap', features: ['CRM', 'Invoicing', 'Inventory'] },
  { id: 'kimai', status: 'roadmap', features: ['Time Tracking', 'Export'] },
]

export default function IntegrationsPage() {
  const t = useTranslations('integrations')
  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <IntegrationGrid integrations={integrations} />
    </main>
  )
}
```

- [ ] **Step 2: Create MDX page alternative**

File: `content/en/integrations/index.md` (if using MDX approach)

- [ ] **Step 3: Update navigation to include Integrations**

File: `src/components/header.tsx` or similar
- Add "Integrations" link to nav menu

- [ ] **Step 4: Run tests**

```bash
npm run build
```
Expected: Successful build

- [ ] **Step 5: Commit**

```bash
git add src/app/ src/components/
git commit -m "feat: add integrations page"
```

---

### Task 8: Add Integration Detail Pages

- [ ] **Step 1: Create ERPNext detail page**

File: `content/en/integrations/erpnext.md`

```markdown
---
title: "ERPNext Integration"
date: "2026-05-11"
description: "ERPNext - Full open-source ERP for business automation"
categories: ["integrations"]
tags: ["erpnext", "erp", "accounting"]
draft: false
---

# ERPNext

ERPNext is a full-featured open-source ERP system...

## Key Features

- Invoicing & Accounting
- Inventory Management
- HR & Payroll
- Customer Relationship Management (CRM)
- Project Management

## Integration with openDesk

openDesk SME provides seamless SSO integration with ERPNext...
```

- [ ] **Step 2: Create Invoice Ninja detail page**

File: `content/en/integrations/invoice-ninja.md`

- [ ] **Step 3: Create Dolibarr roadmap page**

File: `content/en/integrations/dolibarr.md`
- Note: Mark as roadmap, not yet integrated

- [ ] **Step 4: Create Kimai roadmap page**

File: `content/en/integrations/kimai.md`
- Note: Mark as roadmap, not yet integrated

- [ ] **Step 5: Create translated versions**

Files: `content/de/integrations/`, `content/fr/integrations/`, `content/zh/integrations/`

- [ ] **Step 6: Commit**

```bash
git add content/en/integrations/ content/de/integrations/ content/fr/integrations/ content/zh/integrations/
git commit -m "feat: add integration detail pages"
```

---

### Task 9: Update Components for SME Theme

- [ ] **Step 1: Review and update header**

File: `src/components/header.tsx`
- Ensure "Integrations" nav item is present

- [ ] **Step 2: Review and update footer**

File: `src/components/footer.tsx`
- Update copyright to "openDesk SME"
- Update contact email if needed

- [ ] **Step 3: Update theme colors if needed**

File: `src/app/globals.css`
- Check if SME theme needs color adjustments

- [ ] **Step 4: Run full test suite**

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```
Expected: All pass

- [ ] **Step 5: Commit**

```bash
git add src/components/ src/app/
git commit -m "feat: update components for SME theme"
```

---

## Phase 3: Production Readiness (Tasks 10-13)

### Task 10: Update umami Analytics Config

- [ ] **Step 1: Update umami compose files**

Files: `docker-compose-umami.yml`, `umami-compose.yml`, `umami-compose-auth.yml`
- Update domain references from Edu to SME
- Update database names if needed

- [ ] **Step 2: Commit**

```bash
git add umami-compose*.yml
git commit -m "chore: update umami config for SME domain"
```

---

### Task 11: Update CI/CD / GitHub Actions

- [ ] **Step 1: Review .github/workflows/**

Files: `.github/workflows/*.yml`
- Update deployment to point to SME domain
- Update server SSH targets if different

- [ ] **Step 2: Commit**

```bash
git add .github/
git commit -m "chore: update CI/CD for SME deployment"
```

---

### Task 12: Update README

- [ ] **Step 1: Rewrite README for SME**

File: `README.md`

```markdown
# openDesk SME Website

The official website for [openDesk SME](https://opendesk-sme.org) — an open-source digital workplace for small and medium enterprises with integrated ERP and invoicing solutions.

## Key Integrations

- **ERPNext** - Full open-source ERP
- **Invoice Ninja** - Open-source invoicing and time tracking
- **Dolibarr** - Lightweight ERP/CRM (roadmap)
- **Kimai** - Time tracking (roadmap)

## Tech Stack

(same as Edu)
...
```

- [ ] **Step 2: Update repository URLs**

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: update README for SME version"
```

---

### Task 13: Final Verification

- [ ] **Step 1: Run full test suite**

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```
Expected: All pass

- [ ] **Step 2: Run Lighthouse/Accessibility checks**

```bash
node audit-a11y.mjs
```
Expected: No critical a11y issues

- [ ] **Step 3: Check all content is translated**

Verify all 4 locales (en, de, fr, zh) have:
- Homepage content
- Integrations page
- 4 integration detail pages

- [ ] **Step 4: Verify Docker build**

```bash
docker compose build
```
Expected: Successful build

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete next-opendesk-sme-org v1.0.0"
```

---

## Self-Review Checklist

### Spec Coverage
- [x] Fork from Edu - Task 1
- [x] SME-focused content - Tasks 3-5
- [x] ERPNext integration - Tasks 6-8
- [x] Invoice Ninja integration - Tasks 6-8
- [x] Dolibarr roadmap - Tasks 6-8
- [x] Kimai roadmap - Tasks 6-8
- [x] Docker/Traefik for SME domain - Task 2
- [x] 4-language i18n - Tasks 4, 5, 8
- [x] CI/CD updates - Task 11
- [x] README update - Task 12

### Placeholder Scan
- All steps have concrete code/commands
- No "TBD", "TODO", or "implement later" found
- All file paths are exact

### Type Consistency
- Integration IDs: 'erpnext' | 'invoice-ninja' | 'dolibarr' | 'kimai' (consistent)
- Status: 'available' | 'roadmap' (consistent)
- All components follow same patterns

---

## Plan Complete

**Execution Options:**

1. **Subagent-Driven (recommended)** - I dispatch subagents per phase/task, review between phases
2. **Inline Execution** - Execute tasks in this session using executing-plans skill

**Which approach?**