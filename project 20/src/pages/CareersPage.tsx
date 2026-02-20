import { useState } from 'react';
import { MapPin, ArrowRight, X, Briefcase, Clock, CheckCircle2, AlertCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { usePageLoader } from '../hooks/usePageLoader';
import PageSkeleton from '../components/PageSkeleton';
import { supabase } from '../lib/supabase';
import { useRateLimit } from '../hooks/useRateLimit';
import { sanitizeText, sanitizeUrl, isValidEmail, isValidUrl } from '../lib/security';

const ROLES = [
  {
    id: 'senior-ai-engineer',
    title: 'Senior AI Engineer',
    team: 'Engineering',
    location: 'Remote (US / EU)',
    type: 'Full-time',
    level: 'Senior',
    salary: '$160K – $220K + equity',
    desc: 'Work on the core AI generation pipeline. You\'ll improve prompt understanding, code quality, and generation speed.',
    responsibilities: [
      'Own and improve our LLM prompt architecture for code generation',
      'Research and integrate new models and fine-tuning techniques',
      'Build evaluation pipelines to measure and improve output quality',
      'Collaborate with product to define the AI roadmap',
    ],
    requirements: [
      '5+ years of software engineering experience',
      'Deep experience with LLMs (OpenAI, Anthropic, open-source)',
      'Strong TypeScript and Python skills',
      'Experience building production AI systems at scale',
    ],
  },
  {
    id: 'fullstack-engineer',
    title: 'Full-stack Engineer',
    team: 'Engineering',
    location: 'Remote (US / EU)',
    type: 'Full-time',
    level: 'Mid / Senior',
    salary: '$130K – $180K + equity',
    desc: 'Own features end-to-end — from database schema to UI. We use React, Tailwind, Supabase, and TypeScript.',
    responsibilities: [
      'Ship new product features from design to production',
      'Maintain and improve our React + Supabase front-end stack',
      'Write clean, well-tested TypeScript',
      'Participate in code review and help set engineering standards',
    ],
    requirements: [
      '3+ years with React and TypeScript',
      'Experience with Supabase or similar BaaS platforms',
      'Good instincts for UX and performance',
      'Ability to work autonomously and ship fast',
    ],
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    team: 'Design',
    location: 'Remote',
    type: 'Full-time',
    level: 'Senior',
    salary: '$130K – $170K + equity',
    desc: 'Define and own the product design language. You think in systems, sweat the details, and prototype quickly in Figma and code.',
    responsibilities: [
      'Own the end-to-end design process for new product features',
      'Maintain and evolve our design system in Figma',
      'Work directly with engineers to ensure pixel-perfect implementation',
      'Conduct user research and translate findings into design decisions',
    ],
    requirements: [
      '4+ years of product design experience at a SaaS company',
      'Strong Figma skills; comfortable prototyping in code',
      'Portfolio showing systems thinking and strong visual craft',
      'Experience designing developer-facing products is a plus',
    ],
  },
  {
    id: 'developer-advocate',
    title: 'Developer Advocate',
    team: 'Growth',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid / Senior',
    salary: '$110K – $150K + equity',
    desc: 'Build relationships with the developer community. Create tutorials, demos, and content that helps builders get the most out of our platform.',
    responsibilities: [
      'Create technical content: blog posts, videos, live streams',
      'Represent the company at conferences and developer events',
      'Gather and synthesise community feedback for the product team',
      'Build and manage our Discord and forum communities',
    ],
    requirements: [
      'Strong public communication skills (writing and speaking)',
      'Genuine passion for developer tools and the builder community',
      'Hands-on coding experience — you\'ll be building demos',
      'Experience with content creation and social media is a plus',
    ],
  },
  {
    id: 'growth-engineer',
    title: 'Growth Engineer',
    team: 'Growth',
    location: 'Remote (US)',
    type: 'Full-time',
    level: 'Mid / Senior',
    salary: '$120K – $160K + equity',
    desc: 'Own growth experiments, referral programs, and onboarding flows. You sit at the intersection of engineering and marketing.',
    responsibilities: [
      'Design and run A/B tests across the onboarding funnel',
      'Build and iterate on referral and viral growth loops',
      'Instrument analytics and build dashboards to measure growth KPIs',
      'Collaborate with product and marketing on campaigns',
    ],
    requirements: [
      '3+ years of full-stack or growth engineering experience',
      'Comfortable with analytics tools (Amplitude, Mixpanel, etc.)',
      'Strong data intuition — you make decisions from numbers',
      'Experience at a high-growth B2C or PLG SaaS company preferred',
    ],
  },
];

const PERKS = [
  { title: 'Fully remote', desc: 'Work from anywhere. We have team members across 6 countries.' },
  { title: 'Competitive salary + equity', desc: 'Top-of-market compensation with meaningful ownership.' },
  { title: 'Async-first culture', desc: 'We trust you to manage your time. Results matter, not hours.' },
  { title: '$3,000 equipment budget', desc: 'Set up your ideal workspace, no questions asked.' },
  { title: '$1,500/year learning budget', desc: 'Courses, books, conferences — whatever helps you grow.' },
  { title: 'Unlimited PTO', desc: 'Minimum 20 days. We actually enforce the minimum.' },
];

const TEAM_COLOR: Record<string, string> = {
  Engineering: 'text-blue-400 bg-blue-500/10',
  Design: 'text-cyan-400 bg-cyan-500/10',
  Growth: 'text-green-400 bg-green-500/10',
};

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface ApplicationModal {
  role: (typeof ROLES)[number];
}

const MAX_COVER = 5000;

function ApplyModal({ role, onClose }: ApplicationModal & { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', linkedin: '', portfolio: '', cover: '' });
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState('');
  const { check } = useRateLimit({ key: 'job_application', maxAttempts: 2, windowMs: 120_000 });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const { allowed, remainingMs } = check();
    if (!allowed) {
      const secs = Math.ceil(remainingMs / 1000);
      setError(`Too many attempts. Please wait ${secs} seconds.`);
      setState('error');
      return;
    }

    const name = sanitizeText(form.name);
    const email = sanitizeText(form.email);
    const cover = sanitizeText(form.cover);
    const linkedin = sanitizeUrl(form.linkedin);
    const portfolio = sanitizeUrl(form.portfolio);

    if (!name || !email || !cover) return;

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      setState('error');
      return;
    }

    if (form.linkedin && !isValidUrl(form.linkedin)) {
      setError('Please enter a valid LinkedIn URL.');
      setState('error');
      return;
    }

    if (form.portfolio && !isValidUrl(form.portfolio)) {
      setError('Please enter a valid portfolio URL.');
      setState('error');
      return;
    }

    setState('submitting');
    setError('');
    const { error: err } = await supabase.from('job_applications').insert({
      role: role.title,
      name,
      email,
      linkedin,
      portfolio,
      cover,
    });
    if (err) {
      setError('Something went wrong. Please try again.');
      setState('error');
    } else {
      setState('success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#141414] border border-[#2a2a2a] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-[#141414] border-b border-[#1f1f1f] px-6 py-4 flex items-start justify-between z-10">
          <div>
            <p className="text-xs text-[#666] mb-0.5">Applying for</p>
            <h2 className="text-sm font-semibold text-white">{role.title}</h2>
            <div className="flex items-center gap-2 mt-1.5">
              <span className={`text-xs px-2 py-0.5 rounded-full ${TEAM_COLOR[role.team]}`}>{role.team}</span>
              <span className="text-xs text-[#666]">{role.location}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#2a2a2a] transition-colors text-[#666] hover:text-[#ccc]">
            <X size={16} />
          </button>
        </div>

        {state === 'success' ? (
          <div className="px-6 py-14 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 size={40} className="text-green-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Application submitted</h3>
            <p className="text-sm text-[#999] leading-relaxed mb-6">
              Thanks, {form.name.split(' ')[0]}! We review every application and will be in touch within
              1–2 weeks if there's a fit.
            </p>
            <button onClick={onClose} className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="px-6 py-5 space-y-4">
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
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name *">
                <input
                  required
                  value={form.name}
                  onChange={set('name')}
                  maxLength={100}
                  placeholder="Jane Smith"
                  className="w-full bg-[#1e1e1e] border border-[#333] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#3b82f6] transition"
                />
              </Field>
              <Field label="Email address *">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  maxLength={254}
                  placeholder="jane@example.com"
                  className="w-full bg-[#1e1e1e] border border-[#333] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#3b82f6] transition"
                />
              </Field>
            </div>
            <Field label="LinkedIn profile" hint="optional">
              <input
                value={form.linkedin}
                onChange={set('linkedin')}
                maxLength={500}
                placeholder="https://linkedin.com/in/janesmith"
                className="w-full bg-[#1e1e1e] border border-[#333] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#3b82f6] transition"
              />
            </Field>
            <Field label="Portfolio / GitHub" hint="optional">
              <input
                value={form.portfolio}
                onChange={set('portfolio')}
                maxLength={500}
                placeholder="https://github.com/janesmith"
                className="w-full bg-[#1e1e1e] border border-[#333] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#3b82f6] transition"
              />
            </Field>
            <Field label="Why do you want to join? *" hint="3–5 sentences is enough">
              <div className="space-y-1">
                <textarea
                  required
                  rows={5}
                  value={form.cover}
                  onChange={set('cover')}
                  maxLength={MAX_COVER}
                  placeholder="Tell us what excites you about this role and what you'd bring to the team..."
                  className="w-full bg-[#1e1e1e] border border-[#333] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#3b82f6] transition resize-none leading-relaxed"
                />
                <p className={`text-xs text-right ${form.cover.length > MAX_COVER * 0.9 ? 'text-orange-400' : 'text-[#444]'}`}>
                  {form.cover.length}/{MAX_COVER}
                </p>
              </div>
            </Field>

            {state === 'error' && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-800/40 rounded-xl px-3.5 py-2.5">
                <AlertCircle size={13} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={state === 'submitting'}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
            >
              {state === 'submitting' ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Submitting…
                </>
              ) : (
                'Submit application'
              )}
            </button>
            <p className="text-xs text-[#444] text-center leading-relaxed">
              We read every application personally. No automated rejections.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5">
        <label className="text-xs font-medium text-[#aaa]">{label}</label>
        {hint && <span className="text-xs text-[#555]">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function RoleCard({ role, onApply }: { role: (typeof ROLES)[number]; onApply: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#0d0d0d] border border-white/6 hover:border-white/10 rounded-2xl transition-all duration-200">
      <button
        className="w-full text-left p-5"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${TEAM_COLOR[role.team]}`}>{role.team}</span>
              <span className="text-xs text-white/30 bg-white/5 px-2.5 py-0.5 rounded-full">{role.type}</span>
              <span className="text-xs text-white/30 bg-white/5 px-2.5 py-0.5 rounded-full">{role.level}</span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">{role.title}</h3>
            <p className="text-xs text-white/40 leading-relaxed mb-3">{role.desc}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/30">
              <span className="flex items-center gap-1"><MapPin size={11} />{role.location}</span>
              <span className="flex items-center gap-1"><Briefcase size={11} />{role.salary}</span>
              <span className="flex items-center gap-1"><Clock size={11} />{role.type}</span>
            </div>
          </div>
          <div className="text-white/25 flex-shrink-0 mt-0.5">
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-5">
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2.5">Responsibilities</p>
            <ul className="space-y-1.5">
              {role.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2 text-xs text-white/40 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-blue-500/60 flex-shrink-0 mt-1.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2.5">Requirements</p>
            <ul className="space-y-1.5">
              {role.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2 text-xs text-white/40 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-white/25 flex-shrink-0 mt-1.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={onApply}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
          >
            Apply for this role
            <ArrowRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function CareersPage() {
  const loading = usePageLoader();
  const [applying, setApplying] = useState<(typeof ROLES)[number] | null>(null);

  if (loading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">Careers</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5 leading-snug">
            Build the future of software development
          </h1>
          <p className="text-white/45 text-sm max-w-xl leading-[1.9]">
            We're a small, ambitious team on a mission to make building software accessible to
            everyone. If you want your work to matter and you like moving fast, we'd like to meet you.
          </p>
        </div>

        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-white">Open roles</h2>
            <span className="text-xs text-white/30 bg-white/5 px-2.5 py-1 rounded-full">{ROLES.length} positions</span>
          </div>
          <div className="space-y-3">
            {ROLES.map((role) => (
              <RoleCard key={role.id} role={role} onApply={() => setApplying(role)} />
            ))}
          </div>
        </div>

        <div className="mb-14">
          <h2 className="text-sm font-semibold text-white mb-5">What we offer</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PERKS.map(({ title, desc }) => (
              <div key={title} className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-5">
                <p className="text-sm font-semibold text-white mb-1.5">{title}</p>
                <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/3 border border-white/7 rounded-2xl p-7">
          <h3 className="text-sm font-semibold text-white mb-2">Don't see your role?</h3>
          <p className="text-xs text-white/40 leading-relaxed mb-5">
            We're always interested in exceptional people. If you think you belong here, send us a
            note telling us what you'd work on and why.
          </p>
          <a
            href="mailto:jobs@withaibuild.com"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            jobs@withaibuild.com
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {applying && <ApplyModal role={applying} onClose={() => setApplying(null)} />}
    </div>
  );
}
