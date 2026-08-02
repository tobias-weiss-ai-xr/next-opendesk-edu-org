import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('aiStatement');
  return {
    title: `${t('title')} | openDesk Edu`,
  };
}

export default async function AIStatementPage() {
  const t = await getTranslations('aiStatement');

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <article className="prose">
        <h1>{t('title')}</h1>
        <p>{t('intro')}</p>

        <h2>{t('principles')}</h2>
        <ul>
          <li>{t('principleHuman')}</li>
          <li>{t('principleAI')}</li>
          <li>{t('principleMeasured')}</li>
          <li>{t('principleTransparency')}</li>
        </ul>

        <h2>{t('whereWeUseAI')}</h2>
        <ul>
          <li>{t('useContent')}</li>
          <li>{t('useSoftware')}</li>
          <li>{t('useLearning')}</li>
        </ul>

        <h2>{t('infrastructure')}</h2>
        <p>{t('infrastructureText')}</p>

        <h2>{t('protectingUsers')}</h2>
        <ul>
          <li>{t('protectData')}</li>
          <li>{t('protectAutomation')}</li>
        </ul>

        <h2>{t('contact')}</h2>
        <p>
          <a href="mailto:info@opendesk-edu.org">info@opendesk-edu.org</a>
        </p>
      </article>
    </div>
  );
}