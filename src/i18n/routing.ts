import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'fr', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      de: '/ueber-uns',
      fr: '/a-propos',
      zh: '/about'
    },
    '/imprint': {
      en: '/imprint',
      de: '/impressum',
      fr: '/mentions-legales',
      zh: '/imprint'
    },
    '/privacy': {
      en: '/privacy',
      de: '/datenschutz',
      fr: '/politique-de-confidentialite',
      zh: '/privacy'
    },
    '/ai-statement': {
      en: '/ai-statement',
      de: '/ki-statement',
      fr: '/declaration-ia',
      zh: '/ai-statement'
    },
    '/open-source-statement': {
      en: '/open-source-statement',
      de: '/open-source-statement',
      fr: '/declaration-open-source',
      zh: '/open-source-statement'
    },
    '/components': '/components',
    '/docs': '/docs',
    '/blog': '/blog',
    '/blog/tag/[tag]': '/blog/tag/[tag]',
    '/[...slug]': '/[...slug]',
  }
});

