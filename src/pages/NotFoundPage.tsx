import { Link } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';
import { usePageLoader } from '../hooks/usePageLoader';
import PageSkeleton from '../components/PageSkeleton';

export default function NotFoundPage() {
  const loading = usePageLoader();
  if (loading) return <PageSkeleton />;
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Zap size={24} className="text-blue-400" />
          </div>
        </div>
        <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">404</p>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-4">Page not found</h1>
        <p className="text-sm text-white/40 leading-relaxed mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
          <Link
            to="/docs"
            className="text-sm text-white/40 hover:text-white/70 transition-colors px-5 py-2.5"
          >
            Browse docs
          </Link>
        </div>
      </div>
    </div>
  );
}
