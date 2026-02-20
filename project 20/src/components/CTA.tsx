import { ArrowRight, Zap } from 'lucide-react';
import type { AuthTab } from '../App';

interface Props {
  onOpenAuth: (tab?: AuthTab) => void;
}

export default function CTA({ onOpenAuth }: Props) {
  return (
    <section className="py-28 px-6 border-t border-white/5">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[300px] rounded-full bg-blue-500/6 blur-[100px]" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
              <Zap size={20} className="text-blue-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Start building today
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Join thousands of developers and founders shipping faster with withaibuild. Free to start, no credit card required.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button onClick={() => onOpenAuth('signup')} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200">
                Start building for free
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('examples');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="text-sm text-white/50 hover:text-white px-6 py-3 rounded-xl border border-white/8 hover:border-white/16 transition-all duration-200"
              >
                View examples
              </button>
            </div>
            <p className="text-xs text-white/20 mt-5">No credit card required. Free forever plan available.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
