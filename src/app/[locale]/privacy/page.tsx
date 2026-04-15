import type { Metadata } from "next";

interface PageProps {
  params: Promise<{locale: string}>;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  await params;
  return {
    title: "Privacy Policy | openDesk Edu",
  };
}

export default async function PrivacyPage({params}: PageProps) {
  await params;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <article className="prose">
        <h1>Privacy Policy</h1>

        {/* TODO: Legal review required */}

        <h2>1. General Information</h2>
        <p>
          We take the protection of your personal data very seriously. We treat
          your personal data confidentially and in accordance with the statutory
          data protection regulations and this privacy policy.
        </p>
        <p>
          When you use this website, various personal data are collected. Personal
          data is any data with which you could be personally identified.
        </p>

        <h2>2. Data Processing</h2>

        <h3>2.1 Analytics &amp; Cookies</h3>
        <p>
          This website uses <strong>privacy-friendly analytics</strong> only.
          No cookies are set by default. If you give your consent, we use the
          following services:
        </p>
        <ul>
          <li>
            <strong>Plausible Analytics</strong> — a cookie-free, open-source,
            and privacy-friendly analytics tool. Data is processed on our behalf
            by Plausible Labs OÜ ( Estonia). No personal data is collected; all
            data is aggregated and anonymous. For more information, see{" "}
            <a
              href="https://plausible.io/privacy-focused-web-analytics"
              target="_blank"
              rel="noopener noreferrer"
            >
              plausible.io/privacy-focused-web-analytics
            </a>
            .
          </li>
          <li>
            <strong>Microsoft Clarity</strong> — a session recording and
            heatmap tool. Clarity may collect device information, usage patterns,
            and page interaction data. Data is processed by Microsoft Corporation
            (USA). For more information, see{" "}
            <a
              href="https://clarity.microsoft.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              clarity.microsoft.com/privacy
            </a>
            .
          </li>
        </ul>
        <p>
          You can withdraw your consent at any time by clearing your browser&apos;s
          local storage or using the cookie consent banner at the bottom of each page.
        </p>

        <h3>2.2 Server Logs</h3>
        <p>
          The website hosting provider automatically collects and stores
          information in server log files, which your browser automatically
          transmits to us. These are:
        </p>
        <ul>
          <li>Browser type and browser version</li>
          <li>Operating system used</li>
          <li>Referrer URL</li>
          <li>Hostname of the accessing computer</li>
          <li>Time of the server request</li>
          <li>IP address (anonymized)</li>
        </ul>
        <p>
          These data are not combined with other data sources. The basis for data
          processing is Art. 6 (1) (f) GDPR.
        </p>

        <h3>2.3 Contact</h3>
        <p>
          If you contact us via e-mail, your data from the e-mail (sender,
          recipients, date, subject, content) will be stored for the purpose of
          processing your inquiry. We do not pass on this data without your
          consent. The processing of the data sent to us is carried out on the
          basis of Art. 6 (1) (b) GDPR.
        </p>

        <h2>3. SSL/TLS Encryption</h2>
        <p>
          This site uses SSL/TLS encryption for security reasons and to protect
          the transmission of confidential content. You can recognize an encrypted
          connection by the &quot;https://&quot; in the address line of your browser
          and the lock symbol.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Our website does not set any cookies by default. Analytics scripts are
          only loaded after you explicitly consent via the cookie consent banner.
          If you accept analytics, the services listed in section 2.1 may set
          their own cookies as described in their respective privacy policies.
        </p>

        <h2>5. External Links</h2>
        <p>
          Our website contains links to external websites. We have no influence
          on the content and privacy practices of those sites. We recommend
          reading the privacy policies of the linked websites.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          You have the right at any time to receive information about your stored
          personal data, its origin and recipients, and the purpose of data
          processing. You also have a right to correct, block, or delete this
          data. For this purpose, as well as for questions about personal data,
          you can contact us at any time at{" "}
          <a href="mailto:info@opendesk-edu.org">info@opendesk-edu.org</a>.
        </p>

        <h2>7. Contact</h2>
        <p>
          If you have any questions about this privacy policy, please contact us:
        </p>
        <p>
          E-Mail:{" "}
          <a href="mailto:info@opendesk-edu.org">info@opendesk-edu.org</a>
        </p>
      </article>
    </div>
  );
}
