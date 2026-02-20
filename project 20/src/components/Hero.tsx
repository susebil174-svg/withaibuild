import { useState } from 'react';
import { ArrowRight, Sparkles, Code2, Globe, Layers } from 'lucide-react';
import BuildSimulator from './BuildSimulator';

const EXAMPLES = [
  'Build a SaaS dashboard with analytics and user management',
  'Create an e-commerce store with product listings and cart',
  'Design a portfolio website with dark mode toggle',
  'Make a project management app with kanban boards',
];

export default function Hero() {
  const [prompt, setPrompt] = useState('');
  const [focused, setFocused] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);

  function handleBuildClick() {
    if (!prompt.trim()) return;
    setShowSimulator(true);
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
      {showSimulator && (
        <BuildSimulator prompt={prompt} onClose={() => setShowSimulator(false)} />
      )}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-sky-400/3 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 text-xs text-white/60">
          <Sparkles size={12} className="text-blue-400" />
          Powered by AI — Build anything in seconds
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
          Build full-stack apps
          <br />
          <span className="gradient-text">with a single prompt</span>
        </h1>

        <p className="text-base md:text-lg text-white/40 max-w-xl mx-auto mb-12 leading-relaxed">
          Describe what you want to build. withaibuild generates production-ready code, deploys it instantly, and lets you iterate in real time.
        </p>

        <div className={`relative bg-[#111] rounded-2xl transition-all duration-300 ${focused ? 'glow-border' : 'border border-white/8'}`}>
          <textarea
            className="w-full bg-transparent text-white/90 placeholder-white/25 text-sm px-5 pt-5 pb-16 resize-none outline-none leading-relaxed min-h-[130px]"
            placeholder="Describe what you want to build..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && prompt.trim()) {
                handleBuildClick();
              }
            }}
          />
          <div className="absolute bottom-4 left-5 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {[
                { icon: Code2, label: 'React' },
                { icon: Globe, label: 'Full-stack' },
                { icon: Layers, label: 'Any stack' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 bg-white/5 hover:bg-white/8 px-2.5 py-1 rounded-md transition-colors"
                >
                  <Icon size={11} />
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={handleBuildClick}
              disabled={!prompt.trim()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                prompt.trim()
                  ? 'bg-blue-500 hover:bg-blue-400 text-white'
                  : 'bg-white/5 text-white/25 cursor-not-allowed'
              }`}
            >
              Build it
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div id="examples" className="mt-6">
          <p className="text-xs text-white/20 mb-3">Try an example</p>
          <div className="flex flex-wrap justify-center gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                onClick={() => setPrompt(example)}
                className="text-xs text-white/40 hover:text-white/70 bg-white/4 hover:bg-white/7 border border-white/6 hover:border-white/12 px-3 py-1.5 rounded-full transition-all duration-200"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-20 w-full max-w-5xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d0d0d]">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-[#111]">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <div className="ml-4 flex-1 bg-white/5 rounded-md h-5 max-w-[200px]" />
          </div>
          <div className="grid md:grid-cols-2 divide-x divide-white/5 min-h-[280px]">
            <div className="p-6 font-mono text-xs leading-relaxed text-white/30 overflow-hidden">
              <span className="text-blue-400/70">const</span>{' '}
              <span className="text-green-400/70">App</span>{' '}
              <span className="text-white/40">= () =&gt; {'{'}</span>
              <br />
              {'  '}<span className="text-blue-400/70">return</span>{' '}
              <span className="text-white/40">{'('}</span>
              <br />
              {'    '}<span className="text-orange-400/60">&lt;div</span>{' '}
              <span className="text-sky-400/60">className</span>
              <span className="text-white/40">="</span>
              <span className="text-yellow-400/60">app</span>
              <span className="text-white/40">"&gt;</span>
              <br />
              {'      '}<span className="text-orange-400/60">&lt;Header</span>{' '}
              <span className="text-white/40">/&gt;</span>
              <br />
              {'      '}<span className="text-orange-400/60">&lt;Dashboard</span>{' '}
              <span className="text-white/40">/&gt;</span>
              <br />
              {'      '}<span className="text-orange-400/60">&lt;Footer</span>{' '}
              <span className="text-white/40">/&gt;</span>
              <br />
              {'    '}<span className="text-orange-400/60">&lt;/div&gt;</span>
              <br />
              {'  '}<span className="text-white/40">{')'}</span>
              <br />
              <span className="text-white/40">{'}'}</span>
              <br />
              <br />
              <div className="shimmer h-3 rounded bg-white/5 w-3/4 mb-2" />
              <div className="shimmer h-3 rounded bg-white/5 w-1/2 mb-2" />
              <div className="shimmer h-3 rounded bg-white/5 w-2/3" />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <div className="h-8 bg-blue-500/10 rounded-lg w-full" />
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-white/4 rounded-lg" />
                ))}
              </div>
              <div className="h-24 bg-white/4 rounded-lg" />
              <div className="h-6 bg-white/4 rounded-lg w-3/4" />
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-white/20 mt-4">Live preview updates as you type</p>
      </div>
    </section>
  );
}
