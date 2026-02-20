import { usePageLoader } from '../hooks/usePageLoader';
import PageSkeleton from '../components/PageSkeleton';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-base font-bold text-white mb-3 tracking-tight">{title}</h2>
    <div className="space-y-3 text-sm text-white/50 leading-[1.9]">{children}</div>
  </div>
);

export default function TermsPage() {
  const loading = usePageLoader();
  if (loading) return <PageSkeleton />;
  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-xs text-white/30">Last updated: February 1, 2026</p>
        </div>

        <div className="text-sm text-white/50 leading-[1.9] mb-10">
          These Terms of Service ("Terms") govern your use of the withaibuild platform and related
          services operated by withaibuild, Inc. ("withaibuild", "we", "us"). By creating an account
          or using the Service, you agree to these Terms. If you do not agree, do not use the Service.
        </div>

        <Section title="1. The Service">
          <p>withaibuild provides an AI-powered platform that generates, hosts, and deploys web applications from natural language prompts. The Service includes the builder interface, hosting infrastructure, and any associated APIs or tools we make available.</p>
          <p>We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.</p>
        </Section>

        <Section title="2. Accounts">
          <p>You must create an account to use the Service. You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account.</p>
          <p>You must be at least 16 years old to create an account. If you are creating an account on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.</p>
        </Section>

        <Section title="3. Acceptable use">
          <p>You agree not to use the Service to:</p>
          <ul className="space-y-2 ml-4">
            {[
              'Generate, host, or distribute illegal content',
              'Build applications designed to deceive, defraud, or harm others',
              'Attempt to reverse-engineer, scrape, or extract the AI models or platform infrastructure',
              'Violate the intellectual property rights of others',
              'Generate malware, spyware, or other malicious software',
              'Violate any applicable laws or regulations',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p>We reserve the right to suspend or terminate accounts that violate these rules without notice.</p>
        </Section>

        <Section title="4. Your content">
          <p><strong className="text-white/70">Ownership.</strong> You retain ownership of the content you input (prompts, data) and the code generated for you. The generated code is licensed to you under the MIT License.</p>
          <p><strong className="text-white/70">License to withaibuild.</strong> By using the Service, you grant withaibuild a limited, non-exclusive licence to process your inputs and host your generated apps for the purpose of providing the Service.</p>
          <p><strong className="text-white/70">Responsibility.</strong> You are solely responsible for ensuring that your apps comply with applicable laws, including data protection laws, consumer protection laws, and any regulations applicable to your industry.</p>
        </Section>

        <Section title="5. Intellectual property">
          <p>withaibuild, its logo, and all platform-related trademarks are the property of withaibuild, Inc. Nothing in these Terms grants you the right to use them without our written permission.</p>
          <p>The withaibuild platform software, AI models, and infrastructure are proprietary and protected by intellectual property laws.</p>
        </Section>

        <Section title="6. Billing and payments">
          <p>Paid plans are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law or as stated in our refund policy.</p>
          <p>If a payment fails, we will notify you and may suspend your access to paid features until payment is resolved. We will not delete your projects without reasonable notice.</p>
          <p>We may change our pricing with 30 days' notice. Continued use of the Service after the notice period constitutes acceptance of the new pricing.</p>
        </Section>

        <Section title="7. Disclaimers">
          <p>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT GENERATED CODE WILL BE FREE OF DEFECTS.</p>
          <p>You are responsible for testing and validating generated applications before using them in production, particularly for applications that handle sensitive data or financial transactions.</p>
        </Section>

        <Section title="8. Limitation of liability">
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, WITHAIBUILD'S LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE IS LIMITED TO THE AMOUNT YOU PAID TO WITHAIBUILD IN THE 12 MONTHS PRECEDING THE CLAIM.</p>
          <p>WITHAIBUILD IS NOT LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES.</p>
        </Section>

        <Section title="9. Termination">
          <p>You may close your account at any time from your account settings. We may terminate or suspend your account for violations of these Terms or for any reason with 30 days' notice.</p>
          <p>Upon termination, you have 30 days to export your project data. After this period, your data may be permanently deleted.</p>
        </Section>

        <Section title="10. Governing law">
          <p>These Terms are governed by the laws of the State of California, without regard to its conflict of laws provisions. Disputes will be resolved in the courts of San Francisco County, California.</p>
        </Section>

        <Section title="11. Contact">
          <p>Questions about these Terms? Contact us at <span className="text-white/60">legal@withaibuild.com</span>.</p>
        </Section>
      </div>
    </div>
  );
}
