import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Star, TrendingUp, PenTool, Layout, Globe, Users, Heart, Award, Calendar, Sparkles, ArrowRight, Quote, Instagram, Facebook, Twitter } from 'lucide-react';

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Wedding Celebrant, London",
      content: "My bookings increased 3x within 2 months. The AI tools save me 10+ hours per week.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&q=80",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Funeral Celebrant, Manchester",
      content: "Finally, a website that reflects the dignity of my work. Families comment on it constantly.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&q=80",
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "Family Celebrant, Bristol",
      content: "The AI ceremony writer captures my voice perfectly. It's like having a creative assistant.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face&q=80",
      rating: 5
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Answer a few questions about your celebrant style and services",
      icon: Users
    },
    {
      number: "02",
      title: "Customize Your Site",
      description: "Choose from designer templates crafted specifically for celebrants",
      icon: Layout
    },
    {
      number: "03",
      title: "Launch & Grow",
      description: "Go live with AI tools, booking forms, and marketing automation",
      icon: TrendingUp
    }
  ];

  const showcaseItems = [
    {
      title: "Ceremony Scripts",
      count: "42,000+",
      description: "AI-generated ceremonies that sound like you",
      icon: PenTool,
      color: "from-champagne to-champagne-dark"
    },
    {
      title: "Happy Couples",
      count: "8,400+",
      description: "Celebrating love stories worldwide",
      icon: Heart,
      color: "from-rose-gold to-pink-400"
    },
    {
      title: "Expert Celebrants",
      count: "1,200+",
      description: "Professionals trust our platform",
      icon: Award,
      color: "from-sage-300 to-sage-400"
    },
    {
      title: "Years of Excellence",
      count: "15+",
      description: "Leading the industry innovation",
      icon: Sparkles,
      color: "from-blue-400 to-indigo-500"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-cream-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,125,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(162,175,142,0.12),transparent_28%)]" />
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gradient-to-br from-champagne/20 via-sage-200/20 to-cream-300/30 blur-3xl" />
      <div className="relative">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pt-24">
          <div className="grid items-center gap-16 lg:grid-cols-[45%_55%]">
            {/* LEFT: Image with Enhanced Effects */}
            <div className="order-2 lg:order-1">
              <div className="group relative overflow-hidden rounded-3xl shadow-[0_25px_100px_rgba(212,175,125,0.3)] transition-all duration-700 hover:shadow-[0_30px_120px_rgba(212,175,125,0.4)]">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&q=80"
                  alt="Professional celebrant conducting a beautiful ceremony"
                  className="image-crisp h-full w-full object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/30 via-transparent to-transparent" />
                {/* Floating elements */}
                <div className="absolute top-4 right-4 rounded-full bg-champagne-light/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-charcoal-800 animate-pulse">
                  ✨ Premium Quality
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-cream-200/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-charcoal-700">
                  <Star className="h-3 w-3 fill-current text-champagne" />
                  4.9/5 Rating
                </div>
              </div>
            </div>

            {/* RIGHT: Enhanced Text Content */}
            <div className="order-1 lg:order-2 flex flex-col gap-8">
              <div className="space-y-4">
                <span className="inline-flex max-w-fit items-center gap-2 rounded-full border border-sage-100 bg-cream-200 px-5 py-2.5 text-xs uppercase tracking-[0.22em] text-charcoal-600 shadow-sm">
                  <Sparkles className="h-3 w-3 text-champagne" />
                  Cobalt Studio for Celebrants
                </span>
                <h1 className="text-4xl font-extrabold leading-tight text-charcoal-800 sm:text-5xl md:text-6xl lg:text-7xl">
                  Become the <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne via-champagne-dark to-sage-200 animate-gradient bg-300% bg-clip-text">booked-out</span> celebrant in your city
                </h1>
                <p className="max-w-xl text-lg text-charcoal-600 leading-relaxed">
                  Signature websites, AI ceremony writing, and marketing that lifts you above the noise. Designed for celebrants who want a premium, modern presence that attracts ideal clients.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/tools"
                  className="group relative rounded-full bg-gradient-to-r from-champagne via-champagne-dark to-sage-200 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal-800 shadow-lg shadow-champagne/40 transition-all duration-300 hover:shadow-xl hover:shadow-champagne/50 hover:-translate-y-0.5 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Try AI Tools
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-champagne-dark to-champagne opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
                <Link
                  to="/services"
                  className="group rounded-full border border-sage-100 px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal-700 transition-all duration-300 hover:border-champagne hover:text-charcoal-800 hover:bg-cream-100"
                >
                  View Services
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {showcaseItems.map((item, index) => (
                  <div key={item.title} className="group glass-surface rounded-2xl px-4 py-4 shadow-2xl shadow-champagne/20 transition-all duration-300 hover:scale-105 hover:shadow-champagne/30" style={{animationDelay: `${index * 100}ms`}}>
                    <div className={`inline-flex rounded-lg bg-gradient-to-r ${item.color} p-2 text-white mb-2`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <p className="text-2xl font-bold text-charcoal-800">{item.count}</p>
                    <p className="text-sm font-medium text-charcoal-700">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced AI Ceremony Suite Section */}
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="glass-surface grid-accent relative overflow-hidden rounded-3xl p-8 shadow-[0_25px_100px_rgba(212,175,125,0.3)]">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-champagne via-sage-200 to-champagne animate-pulse" />
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-champagne-light/20 to-transparent blur-2xl animate-bounce" style={{animationDuration: '4s'}} />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-gradient-to-r from-champagne to-champagne-dark p-3 text-white animate-pulse">
                    <PenTool className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-charcoal-600">AI Ceremony Suite</p>
                </div>
                <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-charcoal-800">One tap, fully written scripts</h2>
                <p className="mt-3 text-lg text-charcoal-600">Professional ceremony writing that captures your unique voice and style</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Ceremony Script', detail: 'Full narrative with readings & rituals', icon: PenTool, color: 'from-champagne to-champagne-dark' },
                { title: 'Vows Builder', detail: 'Personal voice preserved beautifully', icon: Heart, color: 'from-rose-gold to-pink-400' },
                { title: 'Social Posts', detail: '7-day batch in your tone', icon: Sparkles, color: 'from-sage-300 to-sage-400' },
                { title: 'Contracts', detail: 'Polished, ready-to-send', icon: CheckCircle, color: 'from-blue-400 to-indigo-500' }
              ].map((card, index) => (
                <div key={card.title} className="group rounded-2xl border border-sage-100 bg-gradient-to-br from-cream-50 to-cream-200 p-5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-champagne/20" style={{animationDelay: `${index * 150}ms`}}>
                  <div className={`inline-flex rounded-xl bg-gradient-to-r ${card.color} p-2.5 text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-charcoal-800 mb-1">{card.title}</h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{card.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm font-medium text-charcoal-700 bg-cream-100 rounded-full px-4 py-2">
                <CheckCircle className="h-5 w-5 text-champagne-dark animate-pulse" />
                <span>Specialist prompts tuned only for celebrants</span>
              </div>
              <Link
                to="/tools"
                className="group rounded-full bg-gradient-to-r from-sage-200 to-sage-300 px-6 py-2.5 text-sm font-semibold text-charcoal-800 transition-all duration-300 hover:from-champagne hover:to-champagne-dark hover:text-white hover:scale-105 hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  Try Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-charcoal-600">Success Stories</p>
            <h2 className="mt-2 text-4xl font-bold text-charcoal-800">Loved by celebrants worldwide</h2>
            <p className="mt-4 text-lg text-charcoal-600 max-w-2xl mx-auto">Join thousands of successful celebrants who transformed their business with our platform</p>
          </div>

          <div className="relative">
            <div className="grid gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className={`glass-surface rounded-3xl p-6 shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 ${
                    index === currentTestimonial ? 'ring-2 ring-champagne/50' : ''
                  }`}
                  onMouseEnter={() => setCurrentTestimonial(index)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-champagne/20"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-charcoal-800">{testimonial.name}</h3>
                      <p className="text-sm text-charcoal-600">{testimonial.role}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current text-champagne" />
                        ))}
                      </div>
                    </div>
                    <Quote className="h-5 w-5 text-champagne/30 flex-shrink-0" />
                  </div>
                  <p className="text-charcoal-700 leading-relaxed">"{testimonial.content}"</p>
                </div>
              ))}
            </div>

            {/* Testimonial dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-champagne w-8'
                      : 'bg-champagne/30 hover:bg-champagne/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Target Audience Section */}
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-sage-100 bg-gradient-to-br from-cream-50 to-cream-200 p-8 shadow-[0_16px_60px_rgba(212,175,125,0.25)]">
            <div className="grid items-center gap-8 lg:grid-cols-[35%_65%]">
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-charcoal-600">Who we help</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-charcoal-800">Built for modern celebrants</h2>
                <p className="text-charcoal-600">Specialized solutions tailored to your unique ceremony style and professional needs</p>
                <div className="flex flex-wrap gap-3">
                  {['Professional', 'Creative', 'Compassionate', 'Modern'].map((trait) => (
                    <span key={trait} className="rounded-full bg-champagne/10 px-3 py-1 text-xs font-medium text-champagne-dark border border-champagne/20">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {[
                  { name: 'Wedding Celebrants', icon: Users, description: 'Create unforgettable love stories', color: 'from-champagne to-champagne-dark' },
                  { name: 'Funeral Celebrants', icon: Star, description: 'Honor lives with dignity', color: 'from-sage-300 to-sage-400' },
                  { name: 'Family Celebrants', icon: Heart, description: 'Mark life\'s precious moments', color: 'from-rose-gold to-pink-400' },
                  { name: 'Corporate Events', icon: Globe, description: 'Professional ceremony leadership', color: 'from-blue-400 to-indigo-500' },
                ].map((item) => (
                  <div key={item.name} className="group relative overflow-hidden rounded-2xl border border-sage-100 bg-gradient-to-br from-cream-100 to-cream-50 p-5 transition-all duration-300 hover:border-champagne hover:shadow-lg hover:shadow-champagne/20 hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.18em] text-charcoal-500 font-medium">Specialty</span>
                    </div>
                    <h3 className="text-lg font-bold text-charcoal-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-charcoal-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-charcoal-600">Simple Process</p>
            <h2 className="mt-2 text-4xl font-bold text-charcoal-800">Get started in three simple steps</h2>
            <p className="mt-4 text-lg text-charcoal-600 max-w-2xl mx-auto">From setup to success, we make it easy to establish your premium celebrant presence</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step.number} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-champagne to-sage-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                <div className="relative glass-surface rounded-3xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-champagne-dark opacity-20">{step.number}</span>
                    <div className="rounded-xl bg-gradient-to-br from-champagne to-champagne-dark p-3 text-white">
                      <step.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal-800 mb-3">{step.title}</h3>
                  <p className="text-charcoal-600 leading-relaxed">{step.description}</p>
                </div>
                {/* Connection line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-champagne to-sage-200 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

      {/* Enhanced Value Props / Services */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-charcoal-600">Complete Solution</p>
            <h2 className="mt-2 text-4xl font-bold text-charcoal-800">Everything you need to thrive</h2>
            <p className="mt-4 text-lg text-charcoal-600 lg:mx-auto lg:max-w-2xl">
              Strategy, design, and automation woven together so you can focus on creating memorable ceremonies while we handle the business growth.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group glass-surface rounded-3xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:ring-2 hover:ring-champagne/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-xl bg-gradient-to-br from-sage-100 to-sage-200 p-4 text-charcoal-800 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-7 w-7" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-charcoal-600">Digital Presence</p>
              </div>
              <h3 className="text-2xl font-bold text-charcoal-800 mb-3">Signature Websites</h3>
              <p className="text-charcoal-600 mb-4 leading-relaxed">Editorial layouts, intelligent booking forms, and beautiful galleries crafted to reflect your unique celebrant style.</p>
              <ul className="space-y-2 text-sm text-charcoal-600">
                {['Mobile-optimized design', 'Integrated calendar booking', 'Client photo galleries'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-champagne-dark flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="group glass-surface rounded-3xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:ring-2 hover:ring-champagne/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-xl bg-gradient-to-br from-champagne to-champagne-dark p-4 text-white group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-charcoal-600">Business Growth</p>
              </div>
              <h3 className="text-2xl font-bold text-charcoal-800 mb-3">SEO & Marketing</h3>
              <p className="text-charcoal-600 mb-4 leading-relaxed">Rank for ceremony searches, optimize Google Business Profile, and attract ideal clients consistently.</p>
              <ul className="space-y-2 text-sm text-charcoal-600">
                {['Local SEO optimization', 'Google Business setup', 'Content marketing strategy'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-champagne-dark flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="group glass-surface rounded-3xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:ring-2 hover:ring-champagne/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-xl bg-gradient-to-br from-champagne-light to-sage-100 p-4 text-charcoal-800 group-hover:scale-110 transition-transform duration-300">
                  <PenTool className="h-7 w-7" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-charcoal-600">Creative Workflow</p>
              </div>
              <h3 className="text-2xl font-bold text-charcoal-800 mb-3">AI Studio Tools</h3>
              <p className="text-charcoal-600 mb-4 leading-relaxed">Professional scripts, personalized vows, and social content that captures your authentic voice in minutes.</p>
              <ul className="space-y-2 text-sm text-charcoal-600">
                {['Voice-matched AI writing', 'Ceremony templates', 'Social media automation'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-champagne-dark flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-sage-100 bg-gradient-to-br from-champagne-light via-cream-200 to-sage-100 p-12 text-center shadow-[0_20px_80px_rgba(212,175,125,0.4)]">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,125,0.15),transparent_45%),radial-gradient(circle_at_80%_40%,rgba(162,175,142,0.12),transparent_36%)]" />
            <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-champagne/20 animate-pulse" />
            <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-sage-200/30 animate-bounce" style={{animationDuration: '3s'}} />

            <div className="relative z-10 flex flex-col items-center gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-champagne/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-charcoal-800">
                  <Sparkles className="h-4 w-4" />
                  Start Your Journey Today
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-800">
                  Ready to sound <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne via-champagne-dark to-sage-200">unmistakably you</span>?
                </h2>
                <p className="max-w-2xl text-lg text-charcoal-700 leading-relaxed">
                  Join the studio trusted by celebrants worldwide to write faster, book better clients, and present a premium brand that attracts your ideal ceremonies.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/tools"
                  className="group relative rounded-full bg-gradient-to-r from-champagne-dark to-champagne px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-charcoal-800 shadow-xl shadow-champagne/40 transition-all duration-300 hover:shadow-2xl hover:shadow-champagne/50 hover:-translate-y-0.5 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Launch AI Generator
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-champagne to-champagne-dark opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
                <Link
                  to="/services"
                  className="group rounded-full border-2 border-sage-200 bg-cream-50/50 backdrop-blur-sm px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal-700 transition-all duration-300 hover:border-champagne hover:bg-cream-100 hover:text-charcoal-800"
                >
                  View All Services
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center gap-8 mt-8 pt-8 border-t border-sage-200">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-champagne" />
                      ))}
                    </div>
                    <p className="text-xs text-charcoal-600">4.9/5 Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-charcoal-800">1,200+</p>
                    <p className="text-xs text-charcoal-600">Celebrants</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-charcoal-600">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-champagne-dark" />
                    No setup fee
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-champagne-dark" />
                    14-day trial
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-champagne-dark" />
                    Cancel anytime
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
