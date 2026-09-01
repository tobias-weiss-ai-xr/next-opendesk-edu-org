import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("openSourceStatement");
  return {
    title: `${t("title")} | openDesk Edu`,
  };
}

export default async function OpenSourceStatementPage() {
  const t = await getTranslations("openSourceStatement");

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <article className="prose">
        <h1>{t("title")}</h1>
        <p>{t("intro")}</p>

        <h2>{t("whatIsOpenSource")}</h2>
        <p>{t("whatIsOpenSourceText")}</p>

        <h2>{t("ourStance")}</h2>
        <p>{t("ourStanceText")}</p>

        <h2>{t("openSourceWeUse")}</h2>
        <ul>
          <li>{t("techNext")}</li>
          <li>{t("techNode")}</li>
          <li>{t("techPostgres")}</li>
          <li>{t("techGit")}</li>
          <li>{t("techDocker")}</li>
        </ul>
        <p>{t("sourceAvailable")}</p>

        <h2>{t("otherLicenses")}</h2>
        <p>{t("otherLicensesText")}</p>

        <h2>{t("contact")}</h2>
        <p>
          <a href="mailto:info@opendesk-edu.org">info@opendesk-edu.org</a>
        </p>
      </article>
    </div>
  );
}
