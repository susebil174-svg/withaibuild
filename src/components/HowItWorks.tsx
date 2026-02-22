const STEPS = [
  {
    number: '01',
    title: 'Describe your app',
    description:
      'Type a natural language description of what you want to build. Be as vague or detailed as you like — AI adapts.',
    detail: 'Build a SaaS dashboard with user analytics, charts, and a subscription billing page.',
  },
  {
    number: '02',
    title: 'Review and refine',
    description:
      'AI generates your full app instantly. Use follow-up prompts to adjust the design, add features, or fix anything.',
    detail: 'Make the sidebar collapsible and add a dark mode toggle.',
  },
  {
    number: '03',
    title: 'Deploy and share',
    description:
      'Hit deploy and get a live URL in seconds. Share your app with users or export the code to your own repository.',
    detail: 'your-app.withaibuild.com — live in 3 seconds',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-4">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Ship in three steps
          </h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            No tutorials. No boilerplate. No DevOps headaches. Just build.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map(({ number, title, description, detail }, index) => (
            <div key={number} className="relative">
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(100%+12px)] w-[calc(100%-24px)] h-px bg-gradient-to-r from-white/10 to-transparent z-10" />
              )}
              <div className="card-hover bg-[#0d0d0d] border border-white/6 rounded-2xl p-6 h-full flex flex-col">
                <div className="text-4xl font-bold text-white/8 mb-4 font-mono">{number}</div>
                <h3 className="text-sm font-semibold text-white mb-3">{title}</h3>
                <p className="text-xs text-white/40 leading-relaxed mb-5 flex-1">{description}</p>
                <div className="bg-[#111] border border-white/6 rounded-xl p-3">
                  <p className="text-xs text-blue-400/80 font-mono leading-relaxed">{detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
