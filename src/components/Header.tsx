import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import type { AuthTab } from '../App';

const NAV_LINKS = [
  { label: 'Features', to: '/#features', type: 'anchor' },
  { label: 'How it works', to: '/#how-it-works', type: 'anchor' },
  { label: 'Pricing', to: '/#pricing', type: 'anchor' },
  { label: 'Blog', to: '/blog', type: 'route' },
  { label: 'Docs', to: '/docs', type: 'route' },
];

interface Props {
  onOpenAuth: (tab?: AuthTab) => void;
}

export default function Header({ onOpenAuth }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleAnchorClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const isActive = (to: string) =>
    !to.includes('#') && location.pathname === to;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || location.pathname !== '/'
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
            <Zap size={14} className="text-white" fill="white" />
          </div>
          <span className="font-semibold text-white text-sm tracking-tight">withaibuild</span>
          <span className="text-white/20 text-sm">.com</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, to, type }) =>
            type === 'route' ? (
              <Link
                key={label}
                to={to}
                className={`text-sm transition-colors duration-200 ${
                  isActive(to) ? 'text-white' : 'text-white/45 hover:text-white/80'
                }`}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={to}
                onClick={(e) => handleAnchorClick(e, to.replace('/', ''))}
                className="text-sm text-white/45 hover:text-white/80 transition-colors duration-200"
              >
                {label}
              </a>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => onOpenAuth('signin')} className="text-sm text-white/45 hover:text-white transition-colors px-4 py-2">
            Sign in
          </button>
          <button onClick={() => onOpenAuth('signup')} className="text-sm bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors font-medium">
            Get started
          </button>
        </div>

        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-white/5 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, to, type }) =>
            type === 'route' ? (
              <Link
                key={label}
                to={to}
                className={`text-sm py-2.5 transition-colors ${
                  isActive(to) ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={to}
                onClick={(e) => handleAnchorClick(e, to.replace('/', ''))}
                className="text-sm text-white/50 hover:text-white py-2.5 transition-colors"
              >
                {label}
              </a>
            )
          )}
          <div className="flex flex-col gap-2 pt-3 mt-1 border-t border-white/5">
            <button onClick={() => { onOpenAuth('signin'); setMenuOpen(false); }} className="text-sm text-white/50 hover:text-white text-left transition-colors py-2">
              Sign in
            </button>
            <button onClick={() => { onOpenAuth('signup'); setMenuOpen(false); }} className="text-sm bg-blue-500 hover:bg-blue-400 text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-left">
              Get started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
