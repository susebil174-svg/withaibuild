import { Check } from 'lucide-react';
import { useState } from 'react';
import type { AuthTab } from '../App';

const PLANS = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for trying out withaibuild.',
    features: [
      '5 projects',
      '50 AI generations / month',
      'Community templates',
      'withaibuild subdomain',
      'Public projects only',
    ],
    cta: 'Start for free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: { monthly: 19, yearly: 15 },
    description: 'For developers and indie makers.',
    features: [
      'Unlimited projects',
      '500 AI generations / month',
      'Custom domains',
      'Private projects',
      'Code export',
      'Priority support',
    ],
    cta: 'Get started',
    highlighted: true,
  },
  {
    name: 'Team',
    price: { monthly: 49, yearly: 39 },
    description: 'For teams building together.',
    features: [
      'Everything in Pro',
      'Unlimited AI generations',
      'Team collaboration',
      'Advanced analytics',
      'SSO & audit logs',
      'Dedicated support',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
];

interface Props {
  onOpenAuth: (tab?: AuthTab) => void;
}

export default function Pricing({ onOpenAuth }: Props) {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-28 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-white/40 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Start free, upgrade when you need more. No hidden fees.
          </p>

          <div className="inline-flex items-center gap-1 bg-white/5 border border-white/8 rounded-xl p-1 mt-8">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                !yearly ? 'bg-white/10 text-white font-medium' : 'text-white/40 hover:text-white/70'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-1.5 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 ${
                yearly ? 'bg-white/10 text-white font-medium' : 'text-white/40 hover:text-white/70'
              }`}
            >
              Yearly
              <span className="text-xs bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded-md">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {PLANS.map((plan) => {
            const price = yearly ? plan.price.yearly : plan.price.monthly;
            return (
              <div
                key={plan.name}
                className={`card-hover relative rounded-2xl p-6 flex flex-col ${
                  plan.highlighted
                    ? 'bg-blue-500/8 border border-blue-500/30'
                    : 'bg-[#0d0d0d] border border-white/6'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-white/40 mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">${price}</span>
                    <span className="text-sm text-white/30">/ mo</span>
                  </div>
                </div>

                <ul className="flex-1 space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlighted ? 'bg-blue-500/20' : 'bg-white/8'}`}>
                        <Check size={10} className={plan.highlighted ? 'text-blue-400' : 'text-white/50'} />
                      </div>
                      <span className="text-xs text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.name === 'Team' ? (
                  <a
                    href="/contact"
                    className="w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-center block bg-white/6 hover:bg-white/10 text-white/70 hover:text-white"
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-center ${
                      plan.highlighted
                        ? 'bg-blue-500 hover:bg-blue-400 text-white'
                        : 'bg-white/6 hover:bg-white/10 text-white/70 hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
