import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const STORAGE_KEY = 'withaibuild_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4 shadow-2xl">
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="text-sm font-semibold text-white leading-snug">We use cookies</p>
          <button onClick={decline} className="text-[#555] hover:text-[#999] transition-colors flex-shrink-0 mt-0.5">
            <X size={14} />
          </button>
        </div>
        <p className="text-xs text-[#777] leading-relaxed mb-4">
          We use essential cookies to make our site work and analytics cookies to understand how you use it.
          Read our{' '}
          <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
            Privacy Policy
          </Link>{' '}
          to learn more.
        </p>
        <div className="flex gap-2">
          <button
            onClick={decline}
            className="flex-1 py-2 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 py-2 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
