import { Zap, Globe, Users, Target } from 'lucide-react';
import { usePageLoader } from '../hooks/usePageLoader';
import PageSkeleton from '../components/PageSkeleton';

const TEAM = [
  { name: 'Alex Chen', role: 'Co-founder & CEO', bio: 'Previously engineering lead at Vercel. Built developer tools used by 2M+ engineers.', photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
  { name: 'Sara Kim', role: 'Co-founder & CPO', bio: 'Former PM at Figma. Obsessed with removing friction between ideas and execution.', photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
  { name: 'Lena Vo', role: 'Staff Engineer', bio: 'Full-stack infrastructure. Previously at Supabase and PlanetScale.', photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
  { name: 'James Park', role: 'Head of Growth', bio: 'Grew two developer-focused products from 0 to 100K users. Writes about B2D marketing.', photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
  { name: 'Maya Patel', role: 'AI Engineer', bio: 'PhD in NLP from Stanford. Specialises in code generation and structured output from LLMs.', photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
  { name: 'Riku Tanaka', role: 'Design Engineer', bio: 'Design systems and interaction design. Previously at Linear and Notion.', photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
];

const VALUES = [
  {
    icon: Target,
    title: 'Ruthless focus on the builder',
    desc: 'Every feature we ship must make the act of building software faster, easier, or more enjoyable. Nothing else.',
  },
  {
    icon: Globe,
    title: 'Software should be for everyone',
    desc: 'A billion people have ideas that software could bring to life. The barrier today is execution. We exist to remove it.',
  },
  {
    icon: Users,
    title: 'We ship what we use',
    desc: 'withaibuild is built on withaibuild. Every frustration we fix, we fix for ourselves first.',
  },
  {
    icon: Zap,
    title: 'Speed is a feature',
    desc: 'Momentum is fragile. If we slow you down — even by a second — we have failed. Speed is not negotiable.',
  },
];

export default function AboutPage() {
  const loading = usePageLoader();
  if (loading) return <PageSkeleton />;
  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">About</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6 leading-snug">
            We're building the fastest path from idea to shipped product
          </h1>
          <div className="space-y-4 max-w-2xl">
            <p className="text-sm text-white/50 leading-[1.9]">
              withaibuild started in 2025 with a simple observation: the gap between having an idea
              and shipping software is too large, too slow, and too expensive. Most good ideas never
              become products — not because the ideas are bad, but because execution is hard.
            </p>
            <p className="text-sm text-white/50 leading-[1.9]">
              We believe AI fundamentally changes this equation. Not by replacing engineers, but by
              making the mechanical parts of software development — boilerplate, configuration,
              deployment — invisible. What remains is the interesting work: figuring out what to
              build and whether it matters.
            </p>
            <p className="text-sm text-white/50 leading-[1.9]">
              withaibuild is our bet that within five years, shipping a full-stack web app will feel
              as natural as writing a document. We're a small team, we move fast, and we care
              deeply about the quality of what we build.
            </p>
          </div>
        </div>

        <div className="mb-16 grid grid-cols-2 sm:grid-cols-4 gap-6 py-10 border-t border-b border-white/5">
          {[
            { value: '50K+', label: 'Apps built' },
            { value: '12K+', label: 'Active builders' },
            { value: '< 30s', label: 'Avg build time' },
            { value: '2025', label: 'Founded' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-white mb-1">{value}</p>
              <p className="text-xs text-white/30">{label}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-lg font-bold text-white mb-6">What we believe</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-5">
                <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={15} className="text-blue-400" />
                </div>
                <p className="text-sm font-semibold text-white mb-2">{title}</p>
                <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-6">The team</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {TEAM.map(({ name, role, bio, photo }) => (
              <div key={name} className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-5 flex gap-4">
                <img
                  src={photo}
                  alt={name}
                  className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{name}</p>
                  <p className="text-xs text-blue-400/80 mb-2">{role}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-white/3 border border-white/7 rounded-2xl p-8 text-center">
          <p className="text-sm font-medium text-white mb-2">Want to join us?</p>
          <p className="text-xs text-white/40 mb-5">We're a small team building something ambitious. If that sounds exciting, we'd love to hear from you.</p>
          <a href="/careers" className="inline-block text-sm bg-blue-500 hover:bg-blue-400 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">
            View open roles
          </a>
        </div>
      </div>
    </div>
  );
}
