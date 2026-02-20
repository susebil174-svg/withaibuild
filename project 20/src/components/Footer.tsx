import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Github, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRateLimit } from '../hooks/useRateLimit';
import { isValidEmail } from '../lib/security';

const LINKS: Record<string, { label: string; to: string }[]> = {
  Product: [
    { label: 'Features', to: '/#features' },
    { label: 'Pricing', to: '/#pricing' },
    { label: 'Roadmap', to: '/roadmap' },
    { label: 'Changelog', to: '/changelog' },
  ],
  Resources: [
    { label: 'Documentation', to: '/docs' },
    { label: 'Blog', to: '/blog' },
    { label: 'Status', to: '/status' },
    { label: 'Careers', to: '/careers' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
  ],
};

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { check } = useRateLimit({ key: 'newsletter', maxAttempts: 3, windowMs: 60_000 });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!email.trim()) return;

    if (!isValidEmail(email)) {
      setState('error');
      return;
    }

    const { allowed } = check();
    if (!allowed) return;

    setState('submitting');
    const { error } = await supabase.from('newsletter_subscribers').insert({ email: email.trim().slice(0, 254) });
    if (error && error.code !== '23505') {
      setState('error');
    } else {
      setState('success');
    }
  };

  if (state === 'success') {
    return (
      <div className="flex items-center gap-2 text-xs text-green-400">
        <CheckCircle2 size={13} />
        You're subscribed. Thanks!
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2 mt-4">
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
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={254}
        placeholder="your@email.com"
        className="flex-1 bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/25 focus:outline-none focus:border-white/25 transition min-w-0"
      />
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white p-2 rounded-lg transition flex-shrink-0"
      >
        {state === 'submitting' ? <Loader2 size={13} className="animate-spin" /> : <ArrowRight size={13} />}
      </button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
                <Zap size={14} className="text-white" fill="white" />
              </div>
              <span className="font-semibold text-white text-sm">withaibuild</span>
            </Link>
            <p className="text-xs text-white/30 leading-relaxed max-w-[200px]">
              Build full-stack apps with a single AI prompt. From idea to deployed in under 30 seconds.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://twitter.com/withaibuild" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors">
                <Twitter size={15} />
              </a>
              <a href="https://github.com/withaibuild" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors">
                <Github size={15} />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-xs text-white/40 font-medium mb-1">Stay up to date</p>
              <p className="text-xs text-white/20 leading-relaxed">Get product updates and builder tips.</p>
              <NewsletterSignup />
            </div>
          </div>

          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map(({ label, to }) => (
                  <li key={label}>
                    {to.startsWith('/') && !to.startsWith('/#') ? (
                      <Link
                        to={to}
                        className="text-xs text-white/30 hover:text-white/60 transition-colors"
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={to}
                        className="text-xs text-white/30 hover:text-white/60 transition-colors"
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; 2026 withaibuild.com. All rights reserved.
          </p>
          <p className="text-xs text-white/20">Built with AI, for builders.</p>
        </div>
      </div>
    </footer>
  );
}
