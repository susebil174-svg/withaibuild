import { usePageLoader } from '../hooks/usePageLoader';
import PageSkeleton from '../components/PageSkeleton';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-base font-bold text-white mb-3 tracking-tight">{title}</h2>
    <div className="space-y-3 text-sm text-white/50 leading-[1.9]">{children}</div>
  </div>
);

export default function PrivacyPage() {
  const loading = usePageLoader();
  if (loading) return <PageSkeleton />;
  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs text-white/30">Last updated: February 1, 2026</p>
        </div>

        <div className="text-sm text-white/50 leading-[1.9] mb-10">
          This Privacy Policy explains how withaibuild, Inc. ("withaibuild", "we", "us", or "our")
          collects, uses, and shares information about you when you use our platform at withaibuild.com
          and related services (collectively, the "Service").
        </div>

        <Section title="1. Information we collect">
          <p><strong className="text-white/70">Account information.</strong> When you create an account, we collect your email address and, optionally, your name and profile photo.</p>
          <p><strong className="text-white/70">Usage data.</strong> We collect information about how you use the Service, including the prompts you submit, the apps you generate, and actions you take in the platform.</p>
          <p><strong className="text-white/70">Payment information.</strong> If you subscribe to a paid plan, payment information is processed by Stripe. We do not store your full credit card number.</p>
          <p><strong className="text-white/70">Log data.</strong> Our servers automatically record information including your IP address, browser type, operating system, referring URLs, and pages visited.</p>
          <p><strong className="text-white/70">Cookies.</strong> We use essential cookies to maintain your session and preferences. We do not use advertising cookies.</p>
        </Section>

        <Section title="2. How we use your information">
          <p>We use your information to:</p>
          <ul className="space-y-2 ml-4">
            {[
              'Provide, maintain, and improve the Service',
              'Process transactions and send related information',
              'Send service-related communications (security alerts, product updates)',
              'Respond to support requests',
              'Monitor and analyse usage patterns to improve AI generation quality',
              'Detect and prevent fraud or abuse',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p>We do not sell your personal information to third parties.</p>
        </Section>

        <Section title="3. How we share your information">
          <p><strong className="text-white/70">Service providers.</strong> We share information with vendors who help us operate the Service, including Supabase (database and auth), Stripe (payments), and Cloudflare (CDN). These providers are contractually required to protect your data.</p>
          <p><strong className="text-white/70">AI processing.</strong> Prompts you submit are sent to third-party AI model providers (currently Anthropic) to generate your apps. Your prompts are not used to train AI models without your explicit consent.</p>
          <p><strong className="text-white/70">Legal requirements.</strong> We may disclose your information if required by law or in response to valid legal process.</p>
          <p><strong className="text-white/70">Business transfers.</strong> If withaibuild is acquired or merges with another company, your information may be transferred as part of that transaction.</p>
        </Section>

        <Section title="4. Data retention">
          <p>We retain your account information for as long as your account is active. Project data (generated code, database contents) is retained until you delete the project or close your account.</p>
          <p>You may request deletion of your account and associated data at any time by emailing <span className="text-white/60">privacy@withaibuild.com</span>. We will process deletion requests within 30 days.</p>
        </Section>

        <Section title="5. Security">
          <p>We implement industry-standard security measures including TLS encryption for data in transit, encryption at rest for database contents, access controls and audit logging for internal systems, and regular security reviews.</p>
          <p>No method of transmission or storage is 100% secure. If you believe your account has been compromised, contact us immediately at <span className="text-white/60">security@withaibuild.com</span>.</p>
        </Section>

        <Section title="6. Your rights">
          <p>Depending on your location, you may have the right to access, correct, or delete your personal data; object to or restrict certain processing; and data portability.</p>
          <p>To exercise any of these rights, email <span className="text-white/60">privacy@withaibuild.com</span>.</p>
        </Section>

        <Section title="7. Children">
          <p>The Service is not directed to individuals under 16. We do not knowingly collect personal information from children. If you believe a child has provided us with their data, contact us and we will delete it.</p>
        </Section>

        <Section title="8. Changes to this policy">
          <p>We may update this policy from time to time. We will notify you of material changes via email or a prominent notice in the Service at least 14 days before they take effect.</p>
        </Section>

        <Section title="9. Contact">
          <p>If you have questions about this policy, contact us at <span className="text-white/60">privacy@withaibuild.com</span> or write to:</p>
          <div className="bg-white/3 border border-white/7 rounded-xl p-4 font-mono text-xs text-white/40 leading-relaxed">
            withaibuild, Inc.<br />
            Attn: Privacy<br />
            340 Pine St, Suite 800<br />
            San Francisco, CA 94104
          </div>
        </Section>
      </div>
    </div>
  );
}
