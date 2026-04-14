export const SITE_URL = 'https://opendesk-edu.org';
export const SITE_NAME = 'openDesk Edu';
export const SITE_DESCRIPTION = 'Educational digital infrastructure for universities - openDesk CE with 15 integrated services for seamless digital transformation.';
export const CONTACT_EMAIL = 'info@opendesk-edu.org';
export const PLAUSIBLE_DOMAIN = 'opendesk-edu.org';
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? '';

export const SECTIONS = ['components', 'architecture', 'get-started', 'blog'] as const;

export const SECTION_LABELS: Record<string, string> = {
  components: 'Components',
  architecture: 'Architecture',
  'get-started': 'Get Started',
  blog: 'Blog',
};
