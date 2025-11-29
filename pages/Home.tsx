import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Star, TrendingUp, PenTool, Layout, Globe, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-cream-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,125,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(162,175,142,0.12),transparent_28%)]" />
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gradient-to-br from-champagne/20 via-sage-200/20 to-cream-300/30 blur-3xl" />
      <div className="relative">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <span className="inline-flex max-w-fit items-center gap-2 rounded-full border border-sage-100 bg-cream-200 px-4 py-2 text-xs uppercase tracking-[0.22em] text-charcoal-600">
                Cobalt Studio for Celebrants
              </span>
              <h1 className="text-4xl font-extrabold leading-tight text-charcoal-800 sm:text-5xl md:text-6xl">
                Become the <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne via-champagne-dark to-sage-200">booked-out</span> celebrant in your city
              </h1>
              <p className="max-w-xl text-lg text-charcoal-600">
                Signature websites, AI ceremony writing, and marketing that lifts you above the noise. Designed for celebrants who want a premium, modern presence.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/tools"
                  className="rounded-full bg-gradient-to-r from-champagne via-champagne-dark to-sage-200 px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal-800 shadow-lg shadow-champagne/40 transition hover:-translate-y-0.5"
                >
                  Try AI Tools
                </Link>
                <Link
                  to="/services"
                  className="rounded-full border border-sage-100 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal-700 transition hover:border-champagne hover:text-charcoal-800"
                >
                  View Services
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[{ label: 'Scripts Delivered', value: '42k+' }, { label: 'Avg. Booking Lift', value: '3.2x' }, { label: 'Cities Served', value: '87' }].map((stat) => (
                  <div key={stat.label} className="glass-surface rounded-2xl px-4 py-3 shadow-2xl shadow-champagne/20">
                    <p className="text-sm uppercase tracking-[0.14em] text-charcoal-600">{stat.label}</p>
                    <p className="text-2xl font-semibold text-charcoal-800">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass-surface grid-accent relative overflow-hidden rounded-3xl p-8 shadow-[0_20px_80px_rgba(212,175,125,0.25)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-charcoal-600">AI Ceremony Suite</p>
                    <p className="mt-2 text-3xl font-semibold text-charcoal-800">One tap, fully written scripts</p>
                  </div>
                  <div className="rounded-full bg-champagne-light p-3 text-champagne-dark">
                    <PenTool className="h-7 w-7" />
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[{ title: 'Ceremony Script', detail: 'Full narrative with readings & rituals' }, { title: 'Vows Builder', detail: 'Personal voice preserved beautifully' }, { title: 'Social Posts', detail: '7-day batch in your tone' }, { title: 'Contracts', detail: 'Polished, ready-to-send' }].map((card) => (
                    <div key={card.title} className="rounded-2xl border border-sage-100 bg-cream-200 p-4 shadow-inner shadow-champagne/10">
                      <p className="text-sm font-semibold text-charcoal-800">{card.title}</p>
                      <p className="text-sm text-charcoal-600">{card.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3 text-sm text-charcoal-600">
                  <CheckCircle className="h-5 w-5 text-champagne-dark" />
                  <span>Specialist prompts tuned only for celebrants</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Target Audience Section */}
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-sage-100 bg-cream-200 p-8 shadow-[0_12px_50px_rgba(212,175,125,0.2)]">
            <div className="grid items-end gap-8 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <p className="text-xs uppercase tracking-[0.16em] text-charcoal-600">Who we help</p>
                <h2 className="mt-2 text-3xl font-semibold text-charcoal-800">Built around modern celebrants</h2>
              </div>
              <div className="lg:col-span-3 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { name: 'Wedding Celebrants', icon: Users },
                  { name: 'Funeral Celebrants', icon: Star },
                  { name: 'Family Celebrants', icon: Layout },
                  { name: 'Corporate Events', icon: Globe },
                ].map((item) => (
                  <div key={item.name} className="group relative overflow-hidden rounded-2xl border border-sage-100 bg-cream-100 p-4 transition hover:border-champagne hover:shadow-lg hover:shadow-champagne/20">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-champagne-light text-charcoal-800 group-hover:scale-105 group-hover:bg-champagne transition">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.18em] text-charcoal-500">Focus</span>
                    </div>
                    <p className="mt-4 text-sm font-semibold text-charcoal-800">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Value Props / Services */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-charcoal-600">Everything you need</p>
            <h2 className="mt-2 text-4xl font-semibold text-charcoal-800">Run your studio with one toolkit</h2>
            <p className="mt-4 text-lg text-charcoal-600 lg:mx-auto lg:max-w-2xl">
              Strategy, design, and automation stitched together so you stay present with your couples while the business runs smoothly.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="glass-surface rounded-3xl p-6 shadow-[0_12px_50px_rgba(212,175,125,0.2)]">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-sage-100 to-sage-200 p-3 text-charcoal-800">
                  <Globe className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="text-sm uppercase tracking-[0.14em] text-charcoal-600">Presence</p>
              </div>
              <p className="mt-4 text-2xl font-semibold text-charcoal-800">Signature Websites</p>
              <p className="mt-2 text-charcoal-600">Editorial layouts, booking forms, and galleries built to look bespoke—not templated.</p>
            </div>

            <div className="glass-surface rounded-3xl p-6 shadow-[0_12px_50px_rgba(212,175,125,0.2)]">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-champagne to-champagne-dark p-3 text-charcoal-800">
                  <TrendingUp className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="text-sm uppercase tracking-[0.14em] text-charcoal-600">Growth</p>
              </div>
              <p className="mt-4 text-2xl font-semibold text-charcoal-800">SEO & Local Maps</p>
              <p className="mt-2 text-charcoal-600">Rank for intent searches, optimize Google Business, and capture the right leads weekly.</p>
            </div>

            <div className="glass-surface rounded-3xl p-6 shadow-[0_12px_50px_rgba(212,175,125,0.2)]">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-champagne-light to-sage-100 p-3 text-charcoal-800">
                  <PenTool className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="text-sm uppercase tracking-[0.14em] text-charcoal-600">Workflow</p>
              </div>
              <p className="mt-4 text-2xl font-semibold text-charcoal-800">AI Magic Tools</p>
              <p className="mt-2 text-charcoal-600">Scripts, vows, and social posts that sound like you—ready minutes after booking.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-sage-100 bg-gradient-to-r from-champagne-light via-cream-200 to-sage-100 p-10 text-center shadow-[0_16px_60px_rgba(212,175,125,0.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,125,0.15),transparent_45%),radial-gradient(circle_at_80%_40%,rgba(162,175,142,0.12),transparent_36%)]" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <h2 className="text-3xl font-semibold text-charcoal-800 sm:text-4xl">
                Ready to sound unmistakably you?
              </h2>
              <p className="max-w-2xl text-lg text-charcoal-700">
                Join the studio trusted by celebrants worldwide to write faster, book better clients, and present a premium brand.
              </p>
              <Link
                to="/tools"
                className="rounded-full bg-champagne-dark px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal-800 shadow-xl shadow-champagne/40 transition hover:-translate-y-0.5"
              >
                Launch AI Generator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
