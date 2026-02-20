import { useState, useRef } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

type Tab = 'signin' | 'signup' | 'forgot';

interface Props {
  onClose: () => void;
  defaultTab?: Tab;
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

type SubmitState = 'idle' | 'loading' | 'error';

export default function AuthModal({ onClose, defaultTab = 'signin' }: Props) {
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [forgotSent, setForgotSent] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function resetForm() {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setSubmitState('idle');
    setErrorMsg('');
    setForgotSent(false);
  }

  function switchTab(t: Tab) {
    resetForm();
    setTab(t);
  }

  function handleSocialClick() {
    setSubmitState('loading');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSubmitState('error');
      setErrorMsg('Something went wrong. Please try again.');
    }, 20000);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitState === 'loading') return;

    if (tab === 'forgot') {
      if (!email.trim()) { setErrorMsg('Please enter your email address.'); return; }
      setSubmitState('loading');
      setErrorMsg('');
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setSubmitState('error');
        setErrorMsg('Something went wrong. Please try again.');
      }, 20000);
      return;
    }

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (tab === 'signup') {
      if (!name.trim()) { setErrorMsg('Please enter your name.'); return; }
      if (password !== confirmPassword) { setErrorMsg('Passwords do not match.'); return; }
      if (password.length < 8) { setErrorMsg('Password must be at least 8 characters.'); return; }
    }

    setSubmitState('loading');
    setErrorMsg('');

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSubmitState('error');
      setErrorMsg('Something went wrong. Please try again.');
    }, 20000);
  }

  const inputClass = (hasError?: boolean) =>
    `w-full bg-[#111] border ${hasError ? 'border-red-500/50' : 'border-white/8'} rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-[#0e0e0e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors z-10"
        >
          <X size={16} />
        </button>

        <div className="p-8">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-semibold text-white mb-1">
              {tab === 'signin' && 'Welcome back'}
              {tab === 'signup' && 'Create your account'}
              {tab === 'forgot' && 'Reset your password'}
            </h2>
            <p className="text-xs text-white/35">
              {tab === 'signin' && 'Sign in to access your dashboard'}
              {tab === 'signup' && 'Start building in seconds'}
              {tab === 'forgot' && "We'll send you a reset link"}
            </p>
          </div>

          {tab !== 'forgot' && (
            <>
              <div className="space-y-2 mb-4">
                <button
                  onClick={handleSocialClick}
                  disabled={submitState === 'loading'}
                  className="w-full flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-lg px-4 py-2.5 text-sm text-white/70 hover:text-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
                <button
                  onClick={handleSocialClick}
                  disabled={submitState === 'loading'}
                  className="w-full flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-lg px-4 py-2.5 text-sm text-white/70 hover:text-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <AppleIcon />
                  Continue with Apple
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-xs text-white/25">or</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === 'signup' && (
              <div className="relative">
                <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={`${inputClass()} pl-8`}
                  disabled={submitState === 'loading'}
                />
              </div>
            )}

            <div className="relative">
              <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`${inputClass()} pl-8`}
                disabled={submitState === 'loading'}
              />
            </div>

            {tab !== 'forgot' && (
              <div className="relative">
                <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`${inputClass()} pl-8 pr-9`}
                  disabled={submitState === 'loading'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                >
                  {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            )}

            {tab === 'signup' && (
              <div className="relative">
                <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className={`${inputClass()} pl-8 pr-9`}
                  disabled={submitState === 'loading'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                >
                  {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            )}

            {tab === 'signin' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => switchTab('forgot')}
                  className="text-xs text-white/35 hover:text-blue-400/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {errorMsg && (
              <div className="flex items-start gap-2 bg-red-500/8 border border-red-500/20 rounded-lg px-3 py-2.5">
                <AlertCircle size={13} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-400 leading-relaxed">{errorMsg}</p>
              </div>
            )}

            {forgotSent && (
              <div className="flex items-start gap-2 bg-green-500/8 border border-green-500/20 rounded-lg px-3 py-2.5">
                <p className="text-xs text-green-400 leading-relaxed">
                  If that email exists, a reset link has been sent.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitState === 'loading'}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-500/50 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors mt-1 disabled:cursor-not-allowed"
            >
              {submitState === 'loading' ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  {tab === 'signin' && 'Signing in...'}
                  {tab === 'signup' && 'Creating account...'}
                  {tab === 'forgot' && 'Sending reset link...'}
                </>
              ) : (
                <>
                  {tab === 'signin' && 'Sign in'}
                  {tab === 'signup' && 'Create account'}
                  {tab === 'forgot' && 'Send reset link'}
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-white/30">
            {tab === 'signin' && (
              <>
                Don't have an account?{' '}
                <button onClick={() => switchTab('signup')} className="text-blue-400/80 hover:text-blue-400 transition-colors">
                  Sign up
                </button>
              </>
            )}
            {tab === 'signup' && (
              <>
                Already have an account?{' '}
                <button onClick={() => switchTab('signin')} className="text-blue-400/80 hover:text-blue-400 transition-colors">
                  Sign in
                </button>
              </>
            )}
            {tab === 'forgot' && (
              <>
                Remembered it?{' '}
                <button onClick={() => switchTab('signin')} className="text-blue-400/80 hover:text-blue-400 transition-colors">
                  Back to sign in
                </button>
              </>
            )}
          </div>

          {tab === 'signup' && (
            <p className="mt-4 text-center text-xs text-white/20 leading-relaxed">
              By creating an account, you agree to our{' '}
              <a href="/terms" className="text-white/35 hover:text-white/50 transition-colors">Terms</a>
              {' '}and{' '}
              <a href="/privacy" className="text-white/35 hover:text-white/50 transition-colors">Privacy Policy</a>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
