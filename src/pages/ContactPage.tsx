import { useState } from 'react';
import { Mail, MessageSquare, Zap, CheckCircle2, Loader2, AlertCircle, MapPin, Clock } from 'lucide-react';
import { usePageLoader } from '../hooks/usePageLoader';
import PageSkeleton from '../components/PageSkeleton';
import { supabase } from '../lib/supabase';
import { useRateLimit } from '../hooks/useRateLimit';
import { sanitizeText, isValidEmail } from '../lib/security';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const TOPICS = [
  { value: 'general', label: 'General inquiry' },
  { value: 'sales', label: 'Sales & pricing' },
  { value: 'support', label: 'Technical support' },
  { value: 'billing', label: 'Billing' },
  { value: 'press', label: 'Press & media' },
  { value: 'partnership', label: 'Partnership' },
];

const VALID_TOPICS = TOPICS.map((t) => t.value);
const MAX_NAME = 100;
const MAX_MESSAGE = 3000;

export default function ContactPage() {
  const loading = usePageLoader();
  const [form, setForm] = useState({ name: '', email: '', topic: 'general', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState('');
  const { check } = useRateLimit({ key: 'contact_form', maxAttempts: 3, windowMs: 60_000 });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) return;

    const { allowed, remainingMs } = check();
    if (!allowed) {
      const secs = Math.ceil(remainingMs / 1000);
      setError(`Too many attempts. Please wait ${secs} seconds before trying again.`);
      setState('error');
      return;
    }

    const name = sanitizeText(form.name);
    const email = sanitizeText(form.email);
    const message = sanitizeText(form.message);
    const topic = VALID_TOPICS.includes(form.topic) ? form.topic : 'general';

    if (!name || !email || !message) return;

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      setState('error');
      return;
    }

    setState('submitting');
    setError('');

    const { error: err } = await supabase.from('contact_messages').insert({
      name,
      email,
      topic,
      message,
    });

    if (err) {
      setError('Something went wrong. Please try again or email us directly.');
      setState('error');
    } else {
      setState('success');
    }
  };

  if (loading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">Contact</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Get in touch
          </h1>
          <p className="text-white/40 text-sm max-w-lg leading-relaxed">
            Have a question, a partnership idea, or just want to say hi? We're a small team and we read every message.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {state === 'success' ? (
              <div className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-10 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-green-400" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Message sent!</h3>
                <p className="text-sm text-[#999] leading-relaxed mb-6">
                  Thanks, {form.name.split(' ')[0]}. We typically reply within one business day.
                </p>
                <button
                  onClick={() => { setState('idle'); setForm({ name: '', email: '', topic: 'general', message: '' }); }}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-6 space-y-4">
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
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#aaa]">Full name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={set('name')}
                      maxLength={MAX_NAME}
                      placeholder="Jane Smith"
                      className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#3b82f6] transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#aaa]">Email address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      maxLength={254}
                      placeholder="jane@example.com"
                      className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#3b82f6] transition"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#aaa]">Topic</label>
                  <select
                    value={form.topic}
                    onChange={set('topic')}
                    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f0] focus:outline-none focus:border-[#3b82f6] transition appearance-none"
                  >
                    {TOPICS.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-[#aaa]">Message *</label>
                    <span className={`text-xs ${form.message.length > MAX_MESSAGE * 0.9 ? 'text-orange-400' : 'text-[#555]'}`}>
                      {form.message.length}/{MAX_MESSAGE}
                    </span>
                  </div>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={set('message')}
                    maxLength={MAX_MESSAGE}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#3b82f6] transition resize-none leading-relaxed"
                  />
                </div>

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
                      Sending…
                    </>
                  ) : (
                    'Send message'
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-5">
              <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center mb-3">
                <Mail size={15} className="text-blue-400" />
              </div>
              <p className="text-sm font-semibold text-white mb-1">Email us</p>
              <p className="text-xs text-[#666] mb-3 leading-relaxed">For anything that doesn't fit the form.</p>
              <a href="mailto:hello@withaibuild.com" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                hello@withaibuild.com
              </a>
            </div>

            <div className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-5">
              <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center mb-3">
                <MessageSquare size={15} className="text-blue-400" />
              </div>
              <p className="text-sm font-semibold text-white mb-1">Live chat</p>
              <p className="text-xs text-[#666] mb-3 leading-relaxed">Available for Pro and Team plan users inside the builder.</p>
              <a href="https://app.withaibuild.com" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Open the builder
              </a>
            </div>

            <div className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-5">
              <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center mb-3">
                <Zap size={15} className="text-blue-400" />
              </div>
              <p className="text-sm font-semibold text-white mb-1">Documentation</p>
              <p className="text-xs text-[#666] mb-3 leading-relaxed">Most questions are answered in our docs.</p>
              <a href="/docs" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Browse docs
              </a>
            </div>

            <div className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <MapPin size={13} className="text-[#555] flex-shrink-0" />
                <p className="text-xs text-[#777]">San Francisco, CA</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={13} className="text-[#555] flex-shrink-0" />
                <p className="text-xs text-[#777]">We reply within 1 business day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
