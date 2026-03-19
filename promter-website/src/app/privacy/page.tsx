import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "Privacy Policy — Promter",
  description: "Privacy Policy for Promter.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-white/30 mb-10">Last updated: March 19, 2026</p>

          <div className="space-y-8 text-sm text-white/50 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. Introduction</h2>
              <p>
                Welcome to Promter (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). We respect your privacy and are
                committed to protecting any information related to your use of our website and services
                at promter.dev (the &quot;Service&quot;).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. Information We Collect</h2>
              <p className="mb-3">
                Promter is designed with privacy in mind. Our prompt generation runs entirely in your
                browser — no data is sent to our servers.
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/40">
                <li>
                  <span className="text-white/50 font-medium">No personal data collected:</span> We do not
                  require accounts, logins, or any personal information to use the Service.
                </li>
                <li>
                  <span className="text-white/50 font-medium">No prompt data stored:</span> Your website
                  descriptions and generated prompts are processed locally in your browser and are never
                  transmitted to or stored on our servers.
                </li>
                <li>
                  <span className="text-white/50 font-medium">Analytics:</span> We may use privacy-friendly
                  analytics (such as page views and referral sources) to understand how the Service is used.
                  These do not track individual users or collect personal information.
                </li>
                <li>
                  <span className="text-white/50 font-medium">Public API:</span> Our public JSON endpoints
                  (<code className="text-white/60 font-mono text-xs">/api/prompts.json</code>,{" "}
                  <code className="text-white/60 font-mono text-xs">/api/presets.json</code>) serve static
                  data. We do not log or track individual API requests.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. Cookies</h2>
              <p>
                We do not use cookies for tracking or advertising. We may use essential cookies or
                local storage for functional purposes such as remembering UI preferences within your
                browser session.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. Third-Party Services</h2>
              <p>
                The Service may contain links to third-party websites (e.g., GitHub, AI assistants).
                We are not responsible for the privacy practices of these external services. We
                encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. Data Security</h2>
              <p>
                Since we do not collect or store personal data, the risk of data breaches affecting
                your personal information through our Service is minimal. All prompt generation
                happens client-side in your browser.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">6. Children&apos;s Privacy</h2>
              <p>
                The Service is not directed at children under 13. We do not knowingly collect any
                information from children.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with an updated &quot;Last updated&quot; date. Your continued use of the Service
                after changes constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">8. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, you can reach us through our
                GitHub repository or by opening an issue.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
