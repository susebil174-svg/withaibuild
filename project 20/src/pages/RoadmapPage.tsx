import { useState } from 'react';
import { CheckCircle2, Circle, Clock, Flame, Loader2, AlertCircle } from 'lucide-react';
import { usePageLoader } from '../hooks/usePageLoader';
import PageSkeleton from '../components/PageSkeleton';
import { supabase } from '../lib/supabase';
import { useRateLimit } from '../hooks/useRateLimit';
import { sanitizeText, isValidEmail } from '../lib/security';

const PHASES = [
  {
    label: 'Shipped',
    icon: CheckCircle2,
    color: 'text-green-400',
    borderColor: 'border-green-500/20',
    bg: 'bg-green-500/6',
    items: [
      { title: 'AI prompt → full-stack app generation', desc: 'Generate React + Supabase apps from natural language in under 30 seconds.' },
      { title: 'One-click deployment', desc: 'Deploy to a live withaibuild.com subdomain instantly.' },
      { title: 'Iterative prompting', desc: 'Follow-up prompts apply targeted changes without regenerating the full app.' },
      { title: 'Code export', desc: 'Download full project as a zip or push to GitHub.' },
      { title: 'Template library', desc: '50+ production-ready templates across 8 categories.' },
      { title: 'Custom domains', desc: 'Point your own domain to any withaibuild project.' },
      { title: 'Team collaboration', desc: 'Invite teammates to projects with role-based access.' },
    ],
  },
  {
    label: 'In progress',
    icon: Flame,
    color: 'text-orange-400',
    borderColor: 'border-orange-500/20',
    bg: 'bg-orange-500/6',
    items: [
      { title: 'AI-powered debugging', desc: 'Detect and explain errors in generated apps with one-click fix suggestions.' },
      { title: 'Component library', desc: 'A curated set of pre-built components you can insert into any project.' },
      { title: 'Stripe billing integration', desc: 'Generate full subscription billing flows including webhook handling.' },
      { title: 'Email integration (Resend)', desc: 'Transactional email — confirmations, notifications, digests — generated automatically.' },
    ],
  },
  {
    label: 'Planned',
    icon: Clock,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    bg: 'bg-blue-500/6',
    items: [
      { title: 'Mobile app generation (React Native)', desc: 'Generate iOS and Android apps from the same prompt as your web app.' },
      { title: 'AI-generated tests', desc: 'Generate Vitest unit tests and Playwright end-to-end tests for every generated app.' },
      { title: 'Multi-region deployment', desc: 'Deploy your app closer to your users with configurable edge regions.' },
      { title: 'Secrets manager', desc: 'Manage API keys and secrets securely across projects with rotation support.' },
      { title: 'Analytics built-in', desc: 'First-party analytics without third-party scripts — page views, sessions, funnels.' },
    ],
  },
  {
    label: 'Considering',
    icon: Circle,
    color: 'text-white/30',
    borderColor: 'border-white/8',
    bg: 'bg-white/3',
    items: [
      { title: 'AI code review', desc: 'Automated code review on every generation with security and performance suggestions.' },
      { title: 'Bring your own AI model', desc: 'Connect your own OpenAI or Anthropic API key for private enterprise deployments.' },
      { title: 'White-label option', desc: 'License withaibuild under your own brand for agencies and enterprise.' },
      { title: 'Offline export to Electron', desc: 'Package your withaibuild app as a desktop app with Electron.' },
    ],
  },
];

const MAX_REQUEST = 2000;

function FeatureRequestModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ email: '', request: '' });
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { check } = useRateLimit({ key: 'feature_request', maxAttempts: 5, windowMs: 60_000 });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const { allowed } = check();
    if (!allowed) return;

    const request = sanitizeText(form.request);
    const email = form.email.trim() ? sanitizeText(form.email) : '';

    if (!request) return;

    if (email && !isValidEmail(email)) {
      setState('error');
      return;
    }

    setState('submitting');
    const { error } = await supabase.from('feature_requests').insert({
      email,
      request,
    });
    if (error) {
      setState('error');
    } else {
      setState('success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#141414] border border-[#2a2a2a] rounded-2xl w-full max-w-md shadow-2xl p-6">
        {state === 'success' ? (
          <div className="text-center py-6">
            <div className="flex justify-center mb-4">
              <CheckCircle2 size={36} className="text-green-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Request submitted!</h3>
            <p className="text-sm text-[#999] leading-relaxed mb-5">We review every request. Thanks for helping shape withaibuild.</p>
            <button onClick={onClose} className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">Close</button>
          </div>
        ) : (
          <>
            <h2 className="text-base font-semibold text-white mb-1">Submit a feature request</h2>
            <p className="text-xs text-[#666] mb-5">Tell us what you'd like to see built. We read every one.</p>
            <form onSubmit={submit} className="space-y-3">
              <input
                type="text"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
              />
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#aaa]">Your email <span className="text-[#555]">(optional)</span></label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  maxLength={254}
                  placeholder="jane@example.com"
                  className="w-full bg-[#1e1e1e] border border-[#333] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#3b82f6] transition"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-[#aaa]">Feature request *</label>
                  <span className={`text-xs ${form.request.length > MAX_REQUEST * 0.9 ? 'text-orange-400' : 'text-[#555]'}`}>
                    {form.request.length}/{MAX_REQUEST}
                  </span>
                </div>
                <textarea
                  required
                  rows={4}
                  value={form.request}
                  onChange={(e) => setForm(f => ({ ...f, request: e.target.value }))}
                  maxLength={MAX_REQUEST}
                  placeholder="Describe the feature and why it would be useful..."
                  className="w-full bg-[#1e1e1e] border border-[#333] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#3b82f6] transition resize-none leading-relaxed"
                />
              </div>
              {state === 'error' && (
                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-800/40 rounded-xl px-3.5 py-2.5">
                  <AlertCircle size={13} />
                  Something went wrong. Please try again.
                </div>
              )}
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white transition flex items-center justify-center gap-2"
                >
                  {state === 'submitting' ? <><Loader2 size={13} className="animate-spin" /> Submitting…</> : 'Submit request'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  const loading = usePageLoader();
  const [showModal, setShowModal] = useState(false);
  if (loading) return <PageSkeleton />;
  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-24 px-6">
      {showModal && <FeatureRequestModal onClose={() => setShowModal(false)} />}
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">Roadmap</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Where we're headed
          </h1>
          <p className="text-white/40 text-sm max-w-lg leading-relaxed">
            Our public roadmap. We update this as priorities shift. Have a feature request? Email us at{' '}
            <span className="text-white/60">hello@withaibuild.com</span>
          </p>
        </div>

        <div className="space-y-10">
          {PHASES.map(({ label, icon: Icon, color, borderColor, bg, items }) => (
            <div key={label}>
              <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border ${bg} ${borderColor} ${color} mb-5`}>
                <Icon size={12} />
                {label}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map(({ title, desc }) => (
                  <div
                    key={title}
                    className={`bg-[#0d0d0d] border border-white/6 rounded-2xl p-5`}
                  >
                    <div className="flex items-start gap-2.5">
                      <Icon size={14} className={`${color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <p className="text-sm font-semibold text-white mb-1.5 leading-snug">{title}</p>
                        <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/3 border border-white/7 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-white mb-2">Missing something?</p>
          <p className="text-xs text-white/40 mb-4">We read every feature request. Submit yours and it might appear on the roadmap.</p>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm bg-blue-500 hover:bg-blue-400 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
          >
            Submit a request
          </button>
        </div>
      </div>
    </div>
  );
}
