import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import DocsPage from './pages/DocsPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import StatusPage from './pages/StatusPage';
import RoadmapPage from './pages/RoadmapPage';
import ChangelogPage from './pages/ChangelogPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import CookieBanner from './components/CookieBanner';
import AuthModal from './components/AuthModal';

export type AuthTab = 'signin' | 'signup' | 'forgot';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

interface InnerProps {
  onOpenAuth: (tab?: AuthTab) => void;
}

function AppInner({ onOpenAuth }: InnerProps) {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-[#080808]">
        <Header onOpenAuth={onOpenAuth} />
        <Routes>
          <Route path="/" element={<HomePage onOpenAuth={onOpenAuth} />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <CookieBanner />
      </div>
    </>
  );
}

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<AuthTab>('signin');

  const openAuth = (tab: AuthTab = 'signin') => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  return (
    <BrowserRouter>
      <AppInner onOpenAuth={openAuth} />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} defaultTab={authTab} />}
    </BrowserRouter>
  );
}
