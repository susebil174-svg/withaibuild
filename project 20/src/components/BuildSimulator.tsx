import { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Globe, Building2, Mail, Lock } from 'lucide-react';
import AuthModal from './AuthModal';

interface Props {
  prompt: string;
  onClose: () => void;
}

type Phase = 'form' | 'building' | 'done';

interface FormData {
  companyName: string;
  subdomain: string;
  email: string;
}

const LOG_SEQUENCE: { delay: number; message: string; type: 'info' | 'success' | 'warn' | 'run' }[] = [
  { delay: 400,  message: 'Initializing build environment...', type: 'info' },
  { delay: 900,  message: 'Analyzing prompt and extracting requirements...', type: 'run' },
  { delay: 1600, message: 'Detected: React + TypeScript + Tailwind stack', type: 'success' },
  { delay: 2200, message: 'Scaffolding project structure...', type: 'run' },
  { delay: 2900, message: 'Generated 14 component files', type: 'success' },
  { delay: 3500, message: 'Resolving dependencies...', type: 'run' },
  { delay: 4100, message: 'Installing packages (npm install)...', type: 'info' },
  { delay: 5000, message: 'added 312 packages in 4.2s', type: 'success' },
  { delay: 5600, message: 'Compiling TypeScript sources...', type: 'run' },
  { delay: 6400, message: 'Running ESLint — 0 errors, 0 warnings', type: 'success' },
  { delay: 7100, message: 'Building production bundle...', type: 'run' },
  { delay: 8000, message: 'Bundle size: 142 kB (gzip: 48 kB)', type: 'success' },
  { delay: 8600, message: 'Provisioning Supabase database...', type: 'run' },
  { delay: 9400, message: 'Running migrations (3 files)...', type: 'info' },
  { delay: 10200,'message': 'RLS policies applied', type: 'success' },
  { delay: 10800, message: 'Configuring edge functions...', type: 'run' },
  { delay: 11600, message: 'Deploying to CDN nodes (12 regions)...', type: 'run' },
  { delay: 12400, message: 'SSL certificate issued', type: 'success' },
  { delay: 13000, message: 'DNS propagated successfully', type: 'success' },
  { delay: 13800, message: 'Running smoke tests...', type: 'run' },
  { delay: 14600, message: 'All 24 tests passed', type: 'success' },
  { delay: 15400, message: 'Warming up serverless functions...', type: 'info' },
  { delay: 16200, message: 'Performance audit: 98 / 100', type: 'success' },
  { delay: 17000, message: 'Build complete. Finalizing deployment...', type: 'success' },
];

const TOTAL_DURATION = 18000;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 32);
}

export default function BuildSimulator({ prompt, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>('form');
  const [form, setForm] = useState<FormData>({ companyName: '', subdomain: '', email: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [visibleLogs, setVisibleLogs] = useState<typeof LOG_SEQUENCE>([]);
  const [progress, setProgress] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [visibleLogs]);

  function handleCompanyChange(val: string) {
    setForm(f => ({
      ...f,
      companyName: val,
      subdomain: slugify(val),
    }));
  }

  function validate() {
    const e: Partial<FormData> = {};
    if (!form.companyName.trim()) e.companyName = 'Company name is required';
    if (!form.subdomain.trim()) e.subdomain = 'Subdomain is required';
    else if (!/^[a-z0-9-]+$/.test(form.subdomain)) e.subdomain = 'Only lowercase letters, numbers and hyphens';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    return e;
  }

  function startBuild() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setPhase('building');

    LOG_SEQUENCE.forEach(log => {
      const t = setTimeout(() => {
        setVisibleLogs(prev => [...prev, log]);
      }, log.delay);
      timersRef.current.push(t);
    });

    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + (100 / (TOTAL_DURATION / 100));
        if (next >= 100) { clearInterval(interval); return 100; }
        return next;
      });
    }, 100);

    const doneTimer = setTimeout(() => {
      setProgress(100);
      setPhase('done');
    }, TOTAL_DURATION);
    timersRef.current.push(doneTimer);
  }

  const logColor = {
    info: 'text-white/50',
    run: 'text-blue-400/80',
    success: 'text-green-400/80',
    warn: 'text-yellow-400/80',
  };

  const logPrefix = {
    info: '  ',
    run: '▶ ',
    success: '✓ ',
    warn: '⚠ ',
  };

  return (
    <>
    {showAuth && <AuthModal onClose={() => { setShowAuth(false); onClose(); }} defaultTab="signup" />}
    <div className={`fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm ${showAuth ? 'pointer-events-none opacity-0' : ''}`}>
      <div className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

        {phase === 'form' && (
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">Set up your workspace</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                We'll build and deploy your app at your own subdomain. Takes about 2 minutes.
              </p>
            </div>

            <div className="bg-[#111] rounded-xl border border-white/6 p-4 mb-6 text-xs text-white/30 font-mono leading-relaxed line-clamp-3 italic">
              "{prompt.slice(0, 120)}{prompt.length > 120 ? '...' : ''}"
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 mb-1.5 font-medium">
                  <Building2 size={11} className="inline mr-1.5 mb-0.5" />
                  Company / App Name
                </label>
                <input
                  type="text"
                  className={`w-full bg-[#111] border ${errors.companyName ? 'border-red-500/50' : 'border-white/8'} rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors`}
                  placeholder="Acme Corp"
                  value={form.companyName}
                  onChange={e => handleCompanyChange(e.target.value)}
                />
                {errors.companyName && <p className="text-red-400/80 text-xs mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-1.5 font-medium">
                  <Globe size={11} className="inline mr-1.5 mb-0.5" />
                  Subdomain
                </label>
                <div className={`flex items-center bg-[#111] border ${errors.subdomain ? 'border-red-500/50' : 'border-white/8'} rounded-lg overflow-hidden focus-within:border-blue-500/50 transition-colors`}>
                  <input
                    type="text"
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white/90 placeholder-white/20 outline-none"
                    placeholder="acme-corp"
                    value={form.subdomain}
                    onChange={e => setForm(f => ({ ...f, subdomain: slugify(e.target.value) }))}
                  />
                  <span className="pr-3 text-xs text-white/25 select-none">.withaibuild.com</span>
                </div>
                {errors.subdomain
                  ? <p className="text-red-400/80 text-xs mt-1">{errors.subdomain}</p>
                  : form.subdomain && (
                    <p className="text-white/25 text-xs mt-1">
                      Your app will live at <span className="text-blue-400/60">{form.subdomain}.withaibuild.com</span>
                    </p>
                  )
                }
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-1.5 font-medium">
                  <Mail size={11} className="inline mr-1.5 mb-0.5" />
                  Work Email
                </label>
                <input
                  type="email"
                  className={`w-full bg-[#111] border ${errors.email ? 'border-red-500/50' : 'border-white/8'} rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors`}
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
                {errors.email && <p className="text-red-400/80 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/60 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={startBuild}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                Start Building
                <ArrowRight size={14} />
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-white/20">
              <Lock size={10} className="inline mr-1 mb-0.5" />
              No credit card required. Free to start.
            </p>
          </div>
        )}

        {(phase === 'building' || phase === 'done') && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  {phase === 'done' ? 'Deployment complete!' : 'Building your app...'}
                </h2>
                <p className="text-xs text-white/35 mt-0.5">
                  {phase === 'done'
                    ? `Live at ${form.subdomain}.withaibuild.com`
                    : 'Generating code, provisioning infrastructure...'}
                </p>
              </div>
              {phase === 'building' && (
                <Loader2 size={18} className="text-blue-400 animate-spin flex-shrink-0" />
              )}
              {phase === 'done' && (
                <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
              )}
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-white/30 mb-1.5">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div
              ref={logContainerRef}
              className="bg-[#080808] border border-white/5 rounded-xl p-4 h-56 overflow-y-auto font-mono text-xs space-y-1 scroll-smooth"
            >
              {visibleLogs.map((log, i) => (
                <div key={i} className={`${logColor[log.type]} flex items-start gap-1 animate-fade-in`}>
                  <span className="flex-shrink-0 opacity-60">{logPrefix[log.type]}</span>
                  <span>{log.message}</span>
                </div>
              ))}
              {phase === 'building' && (
                <div className="flex items-center gap-1.5 text-white/20">
                  <span className="animate-pulse">_</span>
                </div>
              )}
            </div>

            {phase === 'done' && (
              <div className="mt-4 space-y-3">
                <div className="bg-green-500/8 border border-green-500/20 rounded-xl p-4">
                  <p className="text-green-400 text-sm font-medium mb-1">Your app is live!</p>
                  <button
                    onClick={() => setShowAuth(true)}
                    className="text-xs text-blue-400/80 hover:text-blue-400 transition-colors flex items-center gap-1"
                  >
                    <Globe size={11} />
                    {form.subdomain}.withaibuild.com
                    <ArrowRight size={10} />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-white/70 border border-white/8 hover:border-white/15 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setShowAuth(true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Open Dashboard
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
