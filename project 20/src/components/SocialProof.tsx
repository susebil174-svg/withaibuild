const STATS = [
  { value: '50K+', label: 'Apps built' },
  { value: '12K+', label: 'Active builders' },
  { value: '< 30s', label: 'Average build time' },
  { value: '99.9%', label: 'Uptime' },
];

const TESTIMONIALS = [
  {
    quote: 'I built and deployed my entire SaaS MVP in one afternoon. withaibuild is insane.',
    author: 'Alex Martinez',
    role: 'Indie Hacker',
    photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
  },
  {
    quote: 'We went from idea to paying customers in 3 days. No way that happens without this tool.',
    author: 'Sarah Kowalski',
    role: 'Startup Founder',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
  },
  {
    quote: 'The code quality is actually good. I was surprised how clean and maintainable everything is.',
    author: 'James Thompson',
    role: 'Senior Engineer at Stripe',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
              <div className="text-xs text-white/30">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map(({ quote, author, role, photo }) => (
            <div
              key={author}
              className="card-hover bg-[#0d0d0d] border border-white/6 rounded-2xl p-6"
            >
              <p className="text-sm text-white/60 leading-relaxed mb-5">"{quote}"</p>
              <div className="flex items-center gap-3">
                <img src={photo} alt={author} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-white">{author}</p>
                  <p className="text-xs text-white/30">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
