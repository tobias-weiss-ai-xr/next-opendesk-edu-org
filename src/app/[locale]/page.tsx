import Image from "next/image";
import EmailLink from "@/components/EmailLink";
import { getAllPosts } from "@/lib/content";
import { SECTION_INFO } from "@/lib/content";
import { SITE_NAME } from "@/lib/config";
import PostCard from "@/components/PostCard";
import {Link} from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import type {Metadata} from 'next';
import '../hero.css';

const HOME_TITLES: Record<string, string> = {
  en: `${SITE_NAME} — Open-Source Digital Workplace for Higher Education`,
  de: `${SITE_NAME} — Open-Source-Digitalarbeitsplatz für Hochschulen`,
  fr: `${SITE_NAME} — Espace de travail numérique open source`,
  zh: `${SITE_NAME} — 面向高等教育的开源数字化工作平台`,
};

interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * Homepage FAQ entries, localized per supported locale.
 * Surfaced as FAQPage JSON-LD structured data for rich search results.
 */
const FAQ_ENTRIES: Record<string, FaqEntry[]> = {
  en: [
    {
      question: 'What is openDesk Edu?',
      answer:
        'openDesk Edu is an open-source digital workplace for higher education that combines openDesk CE with 15 integrated education services for a seamless digital transformation.',
    },
    {
      question: 'Is openDesk Edu free and open source?',
      answer:
        'Yes. openDesk Edu is fully open source and can be self-hosted by universities at no licensing cost, giving you full control over your digital infrastructure.',
    },
    {
      question: 'What services are included?',
      answer:
        'openDesk Edu integrates 15 services, including learning management (Moodle, ILIAS), collaboration tools, cloud infrastructure, and single sign-on with your university identity provider.',
    },
    {
      question: 'Who is openDesk Edu for?',
      answer:
        'openDesk Edu is designed for universities and higher education institutions that want a sovereign, self-hosted digital workplace with integrated teaching and collaboration services.',
    },
    {
      question: 'How can my university get started?',
      answer:
        'Contact us at info@opendesk-edu.org to discuss deployment, integration with your campus SSO, and a tailored rollout for your institution.',
    },
  ],
  de: [
    {
      question: 'Was ist openDesk Edu?',
      answer:
        'openDesk Edu ist ein Open-Source-Digitalarbeitsplatz für Hochschulen, der openDesk CE mit 15 integrierten Bildungsdiensten für eine nahtlose digitale Transformation verbindet.',
    },
    {
      question: 'Ist openDesk Edu kostenlos und quelloffen?',
      answer:
        'Ja. openDesk Edu ist vollständig quelloffen und kann von Hochschulen ohne Lizenzkosten selbst gehostet werden, was Ihnen die volle Kontrolle über Ihre digitale Infrastruktur gibt.',
    },
    {
      question: 'Welche Dienste sind enthalten?',
      answer:
        'openDesk Edu integriert 15 Dienste, darunter Lernmanagement (Moodle, ILIAS), Kollaborationswerkzeuge, Cloud-Infrastruktur und Single Sign-on mit Ihrem Hochschul-Identitätsanbieter.',
    },
    {
      question: 'Für wen ist openDesk Edu gedacht?',
      answer:
        'openDesk Edu richtet sich an Universitäten und Hochschulen, die einen souveränen, selbst gehosteten Digitalarbeitsplatz mit integrierten Lehr- und Kollaborationsdiensten wünschen.',
    },
    {
      question: 'Wie kann meine Hochschule starten?',
      answer:
        'Kontaktieren Sie uns unter info@opendesk-edu.org, um Deployment, die Integration in Ihr Campus-SSO und einen maßgeschneiderten Rollout für Ihre Einrichtung zu besprechen.',
    },
  ],
  fr: [
    {
      question: "Qu'est-ce qu'openDesk Edu ?",
      answer:
        "openDesk Edu est un espace de travail numérique open source pour l'enseignement supérieur qui combine openDesk CE avec 15 services éducatifs intégrés pour une transformation numérique fluide.",
    },
    {
      question: 'openDesk Edu est-il gratuit et open source ?',
      answer:
        "Oui. openDesk Edu est entièrement open source et peut être auto-hébergé par les universités sans frais de licence, vous donnant un contrôle total sur votre infrastructure numérique.",
    },
    {
      question: 'Quels services sont inclus ?',
      answer:
        "openDesk Edu intègre 15 services, dont la gestion de l'apprentissage (Moodle, ILIAS), les outils de collaboration, l'infrastructure cloud et l'authentification unique avec votre fournisseur d'identité universitaire.",
    },
    {
      question: 'À qui s\'adresse openDesk Edu ?',
      answer:
        'openDesk Edu est conçu pour les universités et établissements d\'enseignement supérieur souhaitant un espace de travail numérique souverain et auto-hébergé avec des services d\'enseignement et de collaboration intégrés.',
    },
    {
      question: 'Comment mon université peut-elle commencer ?',
      answer:
        'Contactez-nous à info@opendesk-edu.org pour discuter du déploiement, de l\'intégration avec votre SSO de campus et d\'un déploiement adapté à votre établissement.',
    },
  ],
  zh: [
    {
      question: '什么是 openDesk Edu？',
      answer:
        'openDesk Edu 是面向高等教育的一站式开源数字化工作平台，将 openDesk CE 与 15 项集成教育服务相结合，实现无缝的数字化转型。',
    },
    {
      question: 'openDesk Edu 是否免费且开源？',
      answer:
        '是的。openDesk Edu 完全开源，高校可自行托管，无需支付许可费用，让您全面掌控自身的数字基础设施。',
    },
    {
      question: '包含哪些服务？',
      answer:
        'openDesk Edu 集成了 15 项服务，包括学习管理（Moodle、ILIAS）、协作工具、云基础设施，以及与高校身份提供商的单点登录（SSO）。',
    },
    {
      question: 'openDesk Edu 面向哪些用户？',
      answer:
        'openDesk Edu 面向希望拥有主权化、自托管的数字化工作平台并集成教学与协作服务的高校与高等教育机构。',
    },
    {
      question: '我的高校如何开始使用？',
      answer:
        '请通过 info@opendesk-edu.org 联系我们，探讨部署方案、与校园 SSO 的集成，以及为贵机构量身定制的上线计划。',
    },
  ],
};

function buildFaqJsonLd(locale: string) {
  const entries = FAQ_ENTRIES[locale] ?? FAQ_ENTRIES.en;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: entries.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

interface PageProps {
  params: Promise<{locale: string}>;
}

export const revalidate = 3600;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: HOME_TITLES[locale] ?? HOME_TITLES.en,
  };
}

export default async function Home({ params }: PageProps) {
  const {locale} = await params;
  const t = await getTranslations();
  const allPosts = await getAllPosts(locale);
  const blogPosts = allPosts.filter(p => p.section === 'blog');
  const latestPosts = blogPosts.slice(0, 3);
  const faqLd = buildFaqJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      {/* Full-screen Animated Hero */}
      <section className="hero-background" aria-label="Hero">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-dot-grid" aria-hidden="true" />

        {/* Floating particles */}
        <div className="particle particle-1" aria-hidden="true" />
        <div className="particle particle-2" aria-hidden="true" />
        <div className="particle particle-3" aria-hidden="true" />
        <div className="particle particle-4" aria-hidden="true" />
        <div className="particle particle-5" aria-hidden="true" />
        <div className="particle particle-6" aria-hidden="true" />
        <div className="particle particle-7" aria-hidden="true" />
        <div className="particle particle-8" aria-hidden="true" />

        {/* Pulsing glow blobs */}
        <div className="glow-blob-1" aria-hidden="true" />
        <div className="glow-blob-2" aria-hidden="true" />
        <div className="glow-blob-3" aria-hidden="true" />

        {/* Connection lines */}
        <div className="connection-line connection-1" aria-hidden="true" />
        <div className="connection-line connection-2" aria-hidden="true" />
        <div className="connection-line connection-3" aria-hidden="true" />

        {/* Edge accents */}
        <div className="hero-edge-left" aria-hidden="true" />
        <div className="hero-edge-right" aria-hidden="true" />

        {/* Hero content */}
        <div className="hero-content">
          <div className="mb-6 flex justify-center">
            <Image
              src="/static/brand/icon.svg"
              alt={`${SITE_NAME} logo`}
              width={120}
              height={120}
              priority
            />
          </div>
          <h1 className="hero-title">{SITE_NAME}</h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <p className="hero-description">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {SECTION_INFO.map((section) => (
              <Link
                key={section.slug}
                href={`/${section.slug}` as React.ComponentProps<typeof Link>['href']}
                className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-button transition-colors"
              >
                {section.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10 pt-6 border-t border-white/10">
            <a
              href="https://codeberg.org/opendesk-edu/opendesk-edu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              <CodebergLogo className="w-5 h-5" />
              Codeberg
            </a>
            <a
              href="https://github.com/opendesk-edu/opendesk-edu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              <GitHubLogo className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Page content below hero */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Latest Posts */}
        {blogPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t('sections.latestArticles')}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <PostCard key={`${post.section}/${post.slug}`} post={post} locale={locale} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href={"/blog" as React.ComponentProps<typeof Link>['href']}
                className="text-accent hover:text-accent-button transition-colors font-semibold"
              >
                {t('sections.viewAll')}
              </Link>
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t('home.getInTouch')}</h2>
          <p className="text-foreground-secondary mb-4">
            {t('home.getInTouchDescription')}
          </p>
          <EmailLink className="text-accent hover:text-accent-button transition-colors font-semibold">
            info@opendesk-edu.org
          </EmailLink>
        </section>
      </div>
    </>
  );
}

function CodebergLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5zm0 19.7c-5.1 0-9.2-4.1-9.2-9.2S6.9 2.8 12 2.8s9.2 4.1 9.2 9.2-4.1 9.2-9.2 9.2zm2.8-14.8c-.1 0-.2.1-.3.1l-2.4.8-2.4-.8c-.1-.1-.2-.1-.3-.1-.3 0-.5.2-.5.5v7.8c0 .3.2.5.5.5.1 0 .2 0 .3-.1l2.4-.8 2.4.8c.1.1.2.1.3.1.3 0 .5-.2.5-.5V7c0-.3-.2-.5-.5-.5z"/>
    </svg>
  );
}

function GitHubLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .3C5.4.3 0 5.7 0 12.3c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.7 18.6.3 12 .3z"/>
    </svg>
  );
}
