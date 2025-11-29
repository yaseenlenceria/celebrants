import React from 'react';
import { Check, ArrowRight, Globe2, LineChart, MapPinned, Stars } from 'lucide-react';

const PricingCard: React.FC<{
  title: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}> = ({ title, price, description, features, recommended = false }) => (
  <div
    className={`relative flex flex-col p-8 rounded-2xl border backdrop-blur-lg ${
      recommended ? 'border-accent-400 bg-champagne-light shadow-[0_20px_60px_rgba(0,0,0,0.35)]' : 'border-sage-100 bg-cream-200'
    }`}
  >
    {recommended && (
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-champagne text-ink-900 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
        Most Popular
      </div>
    )}
    <h3 className="text-xl font-semibold text-charcoal-800 font-serif">{title}</h3>
    <div className="mt-4 flex items-baseline text-charcoal-800">
      <span className="text-4xl font-extrabold tracking-tight">{price}</span>
      {price !== 'Custom' && <span className="ml-1 text-xl font-semibold text-charcoal-600">+VAT</span>}
    </div>
    <p className="mt-2 text-charcoal-600 text-sm">{description}</p>

    <ul className="mt-6 flex flex-col gap-3 flex-1">
      {features.map((feature) => (
        <li key={feature} className="flex text-charcoal-700 text-sm">
          <Check className="flex-shrink-0 w-5 h-5 text-champagne-400 mr-3" />
          {feature}
        </li>
      ))}
    </ul>

    <button
      className={`mt-8 w-full py-3 px-4 rounded-lg font-medium transition-colors ${
        recommended ? 'bg-champagne text-ink-900 hover:bg-champagne-dark' : 'bg-champagne-light text-charcoal-800 hover:bg-white/15'
      }`}
    >
      Choose Plan
    </button>
  </div>
);

const Services: React.FC = () => {
  return (
    <div className="bg-cream-100 min-h-screen text-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sage-100 bg-cream-200 px-4 py-2 text-xs uppercase tracking-[0.2em] text-charcoal-600">
            <MapPinned className="h-4 w-4" /> UK & Ireland launch studio
          </div>
          <h1 className="text-4xl font-extrabold text-charcoal-800 font-serif sm:text-5xl">
            Websites, SEO, and AI tooling built for celebrants
          </h1>
          <p className="mt-2 text-xl text-charcoal-600 max-w-3xl mx-auto">
            We design premium sites, get you ranking for "wedding celebrant + city", and hand you AI tools to respond faster to couples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Launch Lite"
            price="�799"
            description="For new celebrants who want a confident launch in 3 weeks."
            features={['Signature one-page site', 'Copy & imagery included', 'Lead form + calendar links', 'On-page SEO & tracking', 'Google Business setup']}
          />
          <PricingCard
            title="Booked-Out"
            price="�1,450"
            description="For established celebrants ready to raise rates and bookings."
            recommended
            features={['5-page bespoke site', 'Brand mini-kit (palette + type)', 'Reviews & portfolio carousels', 'Local SEO sprint + schema', 'Automated lead replies']}
          />
          <PricingCard
            title="Market Leader"
            price="Custom"
            description="Everything to dominate your county with content, PR, and funnels."
            features={['10-page site + blog', 'Quarterly content plan', 'Directory + Google Maps ranking', 'Email nurture setup', 'Dedicated success manager']}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-cream-200 border border-sage-100 rounded-2xl p-8 space-y-5">
            <div className="flex items-center gap-3">
              <LineChart className="h-6 w-6 text-champagne-400" />
              <h2 className="text-2xl font-bold text-charcoal-800 font-serif">Growth & SEO (Monthly)</h2>
            </div>
            <p className="text-charcoal-600">Rank for intent searches like "celebrant dublin" or "humanist celebrant manchester" and stay booked through the year.</p>
            <ul className="space-y-3 text-sm text-charcoal-700">
              <li className="flex items-start gap-2"><Check className="h-4 w-4 text-champagne-400 mt-1" /> Keyword map for your counties + content calendar</li>
              <li className="flex items-start gap-2"><Check className="h-4 w-4 text-champagne-400 mt-1" /> Monthly blog or landing page written and uploaded</li>
              <li className="flex items-start gap-2"><Check className="h-4 w-4 text-champagne-400 mt-1" /> Google Business optimisation + review replies</li>
              <li className="flex items-start gap-2"><Check className="h-4 w-4 text-champagne-400 mt-1" /> Reporting with leads, calls, and search wins</li>
            </ul>
            <button className="inline-flex items-center gap-2 rounded-full bg-champagne text-ink-900 px-5 py-3 font-semibold hover:bg-champagne-dark">
              Start SEO Sprint <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-cream-200 border border-sage-100 rounded-2xl p-8 space-y-5">
            <div className="flex items-center gap-3">
              <Stars className="h-6 w-6 text-champagne-400" />
              <h2 className="text-2xl font-bold text-charcoal-800 font-serif">AI Tools Access</h2>
            </div>
            <p className="text-charcoal-600">Unlimited access to ceremony scripts, vows, social posts, contracts, and the new review builder.</p>
            <div className="flex items-center justify-between bg-cream-200 rounded-xl border border-sage-100 px-4 py-3">
              <div>
                <p className="text-lg font-semibold text-charcoal-800">Pro Toolkit</p>
                <p className="text-charcoal-600 text-sm">Cancel anytime, includes onboarding</p>
              </div>
              <span className="text-3xl font-bold text-champagne-300">�29<span className="text-sm text-charcoal-600 font-normal">/mo</span></span>
            </div>
            <ul className="space-y-3 text-sm text-charcoal-700">
              <li className="flex items-start gap-2"><Check className="h-4 w-4 text-champagne-400 mt-1" /> Unlimited Script & Vow generation</li>
              <li className="flex items-start gap-2"><Check className="h-4 w-4 text-champagne-400 mt-1" /> Social + contract templates tuned for UK/Ireland</li>
              <li className="flex items-start gap-2"><Check className="h-4 w-4 text-champagne-400 mt-1" /> Review builder for Google & directory profiles</li>
              <li className="flex items-start gap-2"><Check className="h-4 w-4 text-champagne-400 mt-1" /> Priority support via WhatsApp</li>
            </ul>
            <button className="inline-flex items-center gap-2 rounded-full bg-white text-ink-900 px-5 py-3 font-semibold hover:bg-ink-100">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            title: 'Directory Launch Kit',
            detail: 'Profile copy, hero image sourcing, schema, and review requests to help you rank in our directory and on Google.',
            icon: <Globe2 className="h-5 w-5" />,
          }, {
            title: 'Local SEO Cleanup',
            detail: 'Citation fixes, Google Business overhaul, and map-pack targeting for your county.',
            icon: <MapPinned className="h-5 w-5" />,
          }, {
            title: 'Content Day',
            detail: 'Shoot day planning + prompts for real ceremony photos and reels so you never rely on stock.',
            icon: <Stars className="h-5 w-5" />,
          }].map((card) => (
            <div key={card.title} className="bg-cream-200 border border-sage-100 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3 text-champagne-300">
                {card.icon}
                <h3 className="text-lg font-semibold text-charcoal-800">{card.title}</h3>
              </div>
              <p className="text-sm text-charcoal-600">{card.detail}</p>
              <button className="text-champagne-200 text-sm inline-flex items-center gap-2">Add to plan <ArrowRight className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
