import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  Calendar,
  Check,
  ExternalLink,
  Globe,
  Heart,
  MapPin,
  Quote,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { EnrichedCelebrant, getCelebrantBySlug } from '../services/celebrantService';

const buildWebsiteUrl = (url?: string) => {
  if (!url) return undefined;
  return url.startsWith('http') ? url : `https://${url}`;
};

const gradientBackdrop = {
  background:
    'radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.15), transparent 28%), radial-gradient(circle at 80% 0%, rgba(183, 110, 121, 0.18), transparent 30%), linear-gradient(145deg, #0f1724, #131b29 45%, #0c111a)',
};

const haloGradient = {
  background:
    'radial-gradient(60% 60% at 50% 45%, rgba(255, 255, 255, 0.08), transparent), radial-gradient(45% 45% at 20% 20%, rgba(212, 175, 55, 0.16), transparent)',
};

const CelebrantProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationCelebrant = (location.state as any)?.celebrant as EnrichedCelebrant | undefined;
  const [celebrant, setCelebrant] = useState<EnrichedCelebrant | null>(locationCelebrant ?? null);
  const [loading, setLoading] = useState(!locationCelebrant);

  useEffect(() => {
    let active = true;

    // If we arrived via a Link with state, use it immediately
    if (locationCelebrant && (locationCelebrant.slug === slug || locationCelebrant.id === Number(slug))) {
      setCelebrant(locationCelebrant);
      setLoading(false);
      return () => {
        active = false;
      };
    }

    if (!slug) {
      setLoading(false);
      return () => undefined;
    }

    getCelebrantBySlug(slug)
      .then((data) => {
        if (!active) return;
        setCelebrant(data ?? null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug, locationCelebrant]);

  const pageFontHeading = { fontFamily: '"Playfair Display", "Bricolage Grotesque", serif' };
  const pageFontBody = { fontFamily: '"Plus Jakarta Sans", "Bricolage Grotesque", sans-serif' };

  if (loading) {
    return (
      <div className="bg-cream-100 text-charcoal-800 min-h-screen flex items-center justify-center">
        <p className="text-sm text-charcoal-600">Loading celebrant profile...</p>
      </div>
    );
  }

  if (!celebrant) {
    return (
      <div className="bg-cream-100 text-charcoal-800 min-h-screen flex items-center justify-center">
        <div className="text-center flex flex-col gap-3">
          <p className="text-lg">That celebrant is no longer listed.</p>
          <Link to="/directory" className="text-champagne underline text-sm inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to directory
          </Link>
        </div>
      </div>
    );
  }

  const websiteUrl = buildWebsiteUrl(celebrant.livePlace?.website || celebrant.website);
  const displayLocation = celebrant.livePlace?.fullAddress || celebrant.location;
  const displayName = celebrant.livePlace?.name || celebrant.name;
  const rating = celebrant.livePlace?.rating ?? celebrant.rating;
  const heroImage = celebrant.livePlace?.photos?.[0] || celebrant.image;
  const allPhotos = celebrant.livePlace?.photos || (celebrant.image ? [celebrant.image] : []);
  const liveReviews = celebrant.livePlace?.reviews?.slice(0, 9);
  const activeReviews = liveReviews && liveReviews.length > 0 ? liveReviews : null;
  const isLiveListing = celebrant.isLiveSearch || celebrant.id >= 100000;
  const primaryTagline = celebrant.description || 'Warm, bespoke ceremonies crafted with intention and care.';

  const reviewFallback = [
    {
      client: 'Ella & Rosie',
      quote: 'The script sounded like we wrote it ourselves. Every guest commented on the warmth and flow.',
      score: '5.0',
      date: 'June 2024',
    },
    {
      client: 'Sean & Ciara',
      quote: 'Handled two families, three traditions, and a surprise poem with ease. Felt effortless.',
      score: '4.9',
      date: 'May 2024',
    },
    {
      client: 'James & Michael',
      quote: 'Our ceremony was heartfelt, personal, and exactly what we envisioned. Absolutely perfect.',
      score: '5.0',
      date: 'April 2024',
    },
    {
      client: 'Mia & Alex',
      quote: 'Captured our story beautifully and made everyone feel included. Pure magic.',
      score: '5.0',
      date: 'March 2024',
    },
    {
      client: 'David & Sarah',
      quote: 'Professional, warm, and incredibly organized. Made our day stress-free.',
      score: '4.8',
      date: 'February 2024',
    },
    {
      client: 'Emma & Liam',
      quote: 'The ceremony was the highlight of our wedding. Everyone said it was the best they\'d been to.',
      score: '5.0',
      date: 'January 2024',
    },
  ];

  const statCards = useMemo(
    () => [
      celebrant.yearsExperience > 0
        ? { icon: Award, label: 'Experience', value: `${celebrant.yearsExperience}+ yrs` }
        : null,
      celebrant.ceremoniesPerformed > 0
        ? { icon: Heart, label: 'Ceremonies', value: `${celebrant.ceremoniesPerformed}+ couples` }
        : null,
      { icon: Star, label: 'Average rating', value: `${rating.toFixed(1)} / 5` },
    ].filter(Boolean) as { icon: typeof Award; label: string; value: string }[],
    [celebrant.ceremoniesPerformed, celebrant.yearsExperience, rating],
  );

  const journey = [
    {
      title: 'Story-first discovery',
      body: 'A calm, guided conversation that gathers rituals, readings, and the tone you want guests to feel.',
    },
    {
      title: 'Script & rehearsal',
      body: 'A crafted ceremony script, edits included, plus light rehearsal so you can enjoy the moment.',
    },
    {
      title: 'Presence on the day',
      body: 'Confident, reassuring delivery with coordination alongside your photographer and planner.',
    },
  ];

  const specialtyChips = celebrant.specialties && celebrant.specialties.length > 0 ? celebrant.specialties : null;

  return (
    <div className="relative min-h-screen bg-cream-100 text-charcoal-800" style={pageFontBody}>
      <div className="absolute inset-0 -z-10" style={gradientBackdrop} />

      {/* NAVIGATION BAR */}
      <nav className="relative max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-cream-100 bg-charcoal-800/80 hover:bg-charcoal-800 px-5 py-2.5 rounded-full shadow-lg border border-white/10 transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {isLiveListing && celebrant.livePlace?.placeLink && (
          <a
            href={celebrant.livePlace.placeLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-champagne border border-champagne/60 bg-white/10 backdrop-blur px-5 py-2.5 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            Verified listing <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </nav>

      {/* DRAMATIC HERO SECTION */}
      <section className="relative min-h-[700px] overflow-hidden">
        {/* Massive background image with overlay */}
        {heroImage ? (
          <>
            <img
              src={heroImage}
              alt={displayName}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/95 via-charcoal-900/75 to-charcoal-900/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-rose-dark" />
        )}

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 flex flex-col justify-center min-h-[700px]">
          {/* Floating badges */}
          <div className="flex flex-wrap items-center gap-3 mb-8 animate-fadeIn">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-cream-100 text-xs tracking-[0.18em] uppercase shadow-lg">
              {celebrant.type}
            </span>
            {isLiveListing && (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-champagne/90 text-charcoal-900 text-xs tracking-[0.18em] uppercase shadow-lg shadow-champagne/30 animate-float">
                <Sparkles className="h-3.5 w-3.5" /> Live listing
              </span>
            )}
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-cream-100 text-xs tracking-[0.18em] uppercase shadow-lg">
              <MapPin className="h-3.5 w-3.5" /> {displayLocation}
            </span>
          </div>

          {/* Huge heading */}
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[1.05] text-cream-100 mb-6 max-w-5xl"
            style={pageFontHeading}
          >
            {displayName}
          </h1>

          {/* Tagline */}
          <p className="text-xl lg:text-2xl text-cream-100/90 font-light max-w-3xl mb-10 leading-relaxed">
            {primaryTagline}
          </p>

          {/* Rating and stats inline */}
          <div className="flex flex-wrap items-center gap-6 mb-12">
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-7 w-7 fill-champagne text-champagne" />
                ))}
              </div>
              <div className="border-l border-white/30 pl-4">
                <div className="text-3xl font-black text-cream-100">{rating.toFixed(1)}</div>
                <div className="text-xs text-cream-100/70 uppercase tracking-wider">Average rating</div>
              </div>
            </div>

            {celebrant.ceremoniesPerformed > 0 && (
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                <Heart className="h-8 w-8 text-champagne" />
                <div>
                  <div className="text-3xl font-black text-cream-100">{celebrant.ceremoniesPerformed}+</div>
                  <div className="text-xs text-cream-100/70 uppercase tracking-wider">Ceremonies</div>
                </div>
              </div>
            )}

            {celebrant.yearsExperience > 0 && (
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                <Award className="h-8 w-8 text-champagne" />
                <div>
                  <div className="text-3xl font-black text-cream-100">{celebrant.yearsExperience}+</div>
                  <div className="text-xs text-cream-100/70 uppercase tracking-wider">Years experience</div>
                </div>
              </div>
            )}
          </div>

          {/* Specialties */}
          {specialtyChips && (
            <div className="mb-12 max-w-4xl">
              <div className="text-sm text-cream-100/70 uppercase tracking-[0.14em] mb-3">Signature focus</div>
              <div className="flex flex-wrap gap-3">
                {specialtyChips.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-cream-100 text-sm shadow-lg"
                  >
                    <Check className="h-4 w-4 text-champagne" /> {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prominent CTAs */}
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-3 bg-champagne text-charcoal-900 px-8 py-4 rounded-full font-black text-lg hover:bg-champagne/90 transition-all duration-300 shadow-[0_20px_50px_rgba(212,175,55,0.5)] hover:shadow-[0_25px_60px_rgba(212,175,55,0.6)] hover:scale-105">
              <Calendar className="h-6 w-6" /> Book this celebrant
            </button>
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-xl text-cream-100 font-bold text-lg hover:border-white/60 hover:bg-white/20 transition-all duration-300 shadow-lg"
              >
                <Globe className="h-6 w-6" /> Visit website
              </a>
            )}
            {celebrant.livePlace?.placeLink && (
              <a
                href={celebrant.livePlace.placeLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-xl text-cream-100 font-bold text-lg hover:border-white/60 hover:bg-white/20 transition-all duration-300 shadow-lg"
              >
                <MapPin className="h-6 w-6" /> View on Google Maps
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Light background */}
      <section className="relative bg-cream-100 py-20 lg:py-32 px-6 lg:px-8">
        <div className="absolute inset-0" style={haloGradient} />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* About text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-charcoal-600">
                <Sparkles className="h-4 w-4 text-champagne" /> Ceremonies with character
              </div>
              <h2 className="text-5xl lg:text-6xl text-charcoal-900 font-black leading-tight" style={pageFontHeading}>
                About {displayName.split(' ')[0]}
              </h2>
              <p className="text-xl leading-relaxed text-charcoal-700 font-light">
                {celebrant.fullDescription}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="rounded-2xl bg-gradient-to-br from-cream-200 to-champagne/10 border border-champagne/30 p-6 space-y-2">
                  <div className="text-sm text-charcoal-600 uppercase tracking-[0.14em]">Tone</div>
                  <div className="text-2xl font-bold text-charcoal-900">Calm, intentional, personal</div>
                  <p className="text-charcoal-700 text-sm">Guiding guests without rushing the emotion of the day.</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200/50 border border-sage-300 p-6 space-y-2">
                  <div className="text-sm text-charcoal-600 uppercase tracking-[0.14em]">Extras</div>
                  <div className="text-2xl font-bold text-charcoal-900">Readings, vows, bespoke rituals</div>
                  <p className="text-charcoal-700 text-sm">Support for writing vows plus coordination with music and photographers.</p>
                </div>
              </div>
            </div>

            {/* Journey card */}
            <div className="rounded-3xl bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-cream-100 p-10 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-white/70 mb-8">
                <Calendar className="h-5 w-5" /> The journey
              </div>
              <div className="space-y-8">
                {journey.map((item, idx) => (
                  <div
                    key={item.title}
                    className="pb-8 border-b border-white/10 last:border-none last:pb-0"
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <div className="flex items-center gap-3 text-champagne text-lg font-semibold mb-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-champagne/20">
                        <Check className="h-5 w-5" />
                      </div>
                      {item.title}
                    </div>
                    <p className="text-white/80 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-white/10 rounded-2xl text-sm border border-white/20">
                <Users className="h-5 w-5 text-champagne" /> Families, multicultural + LGBTQ+ friendly
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION - Huge images */}
      {allPhotos.length > 1 && (
        <section className="relative bg-charcoal-900 py-20 lg:py-32 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.18em] text-champagne mb-4">Atmosphere</p>
              <h3 className="text-5xl lg:text-6xl text-cream-100 font-black" style={pageFontHeading}>
                Ceremony moments
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPhotos.slice(1, 10).map((photo, idx) => (
                <div
                  key={photo + idx}
                  className="group relative overflow-hidden rounded-2xl h-[500px] shadow-[0_25px_70px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_90px_rgba(212,175,55,0.3)] transition-all duration-700 animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <img
                    src={photo}
                    alt={`${displayName} ceremony ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REVIEWS SECTION - THE STAR OF THE PAGE */}
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 py-24 lg:py-36 px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.4) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm uppercase tracking-[0.2em] text-champagne mb-6">Testimonials</p>
            <h2 className="text-6xl lg:text-7xl text-cream-100 font-black mb-6" style={pageFontHeading}>
              What couples say
            </h2>
            {celebrant.livePlace?.placeLink && (
              <a
                href={celebrant.livePlace.placeLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-champagne text-sm border-2 border-champagne/40 px-6 py-3 rounded-full hover:border-champagne/80 hover:bg-champagne/10 transition-all duration-300 backdrop-blur"
              >
                View all Google reviews <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeReviews || reviewFallback).map((review, idx) => (
              <div
                key={(review as any).client || (review as any).author || idx}
                className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_80px_rgba(212,175,55,0.2)] animate-float"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Stars - HUGE */}
                <div className="flex gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-8 w-8 ${i < Math.round((review as any).rating || parseFloat((review as any).score) || 5) ? 'text-champagne fill-champagne' : 'text-white/20'}`}
                    />
                  ))}
                </div>

                {/* Quote icon */}
                <Quote className="h-10 w-10 text-champagne/40 mb-4" />

                {/* Quote text - LARGE */}
                <p className="text-2xl text-cream-100 leading-relaxed mb-6 font-light">
                  "{(review as any).text || (review as any).quote}"
                </p>

                {/* Author */}
                <div className="pt-6 border-t border-white/10">
                  <div className="font-bold text-lg text-champagne">
                    {(review as any).author || (review as any).client}
                  </div>
                  {(review as any).date && (
                    <div className="text-sm text-white/60 mt-1">{(review as any).date}</div>
                  )}
                </div>

                {/* Gradient glow on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-champagne/0 via-champagne/0 to-champagne/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE INFO BANNER */}
      {celebrant.livePlace && (
        <section className="relative bg-cream-100 py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-white to-cream-200 border border-champagne/30 p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-200 text-charcoal-800 text-xs tracking-[0.18em] uppercase w-fit">
                <Sparkles className="h-3.5 w-3.5" /> Live listing
              </div>
              <h3 className="text-3xl font-black text-charcoal-900">{celebrant.livePlace.name}</h3>
              {celebrant.livePlace.fullAddress && (
                <div className="flex items-center gap-2 text-charcoal-700">
                  <MapPin className="h-5 w-5" />
                  <span>{celebrant.livePlace.fullAddress}</span>
                </div>
              )}
            </div>
            {celebrant.livePlace.placeLink && (
              <a
                href={celebrant.livePlace.placeLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-charcoal-900/20 text-charcoal-900 bg-white hover:border-charcoal-900/40 hover:shadow-lg transition-all duration-300 font-bold whitespace-nowrap"
              >
                <ExternalLink className="h-5 w-5" /> View on Google Maps
              </a>
            )}
          </div>
        </section>
      )}

      {/* FINAL CTA SECTION */}
      <section className="relative bg-gradient-to-br from-charcoal-900 via-rose-dark to-charcoal-800 text-cream-100 py-24 lg:py-32 px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.3) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-5xl lg:text-6xl font-black leading-tight" style={pageFontHeading}>
            Ready to book {displayName.split(' ')[0]}?
          </h2>
          <p className="text-xl lg:text-2xl text-cream-100/90 max-w-3xl mx-auto font-light leading-relaxed">
            Share your date, venue, and the feeling you want guests to carry home. You'll get a tailored response within one business day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="inline-flex items-center justify-center gap-3 bg-champagne text-charcoal-900 px-10 py-5 rounded-full font-black text-lg hover:bg-champagne/90 shadow-[0_25px_60px_rgba(212,175,55,0.5)] hover:shadow-[0_30px_70px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300">
              <Calendar className="h-6 w-6" /> Start a booking
            </button>
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border-2 border-white/40 px-10 py-5 rounded-full text-cream-100 hover:border-white/60 hover:bg-white/10 font-bold text-lg backdrop-blur transition-all duration-300"
              >
                <Globe className="h-6 w-6" /> Visit website
              </a>
            )}
          </div>

          <Link
            to="/directory"
            className="inline-flex items-center gap-2 text-sm text-cream-100/70 hover:text-cream-100 underline transition-colors duration-300 pt-6"
          >
            <ArrowLeft className="h-4 w-4" /> Browse other celebrants
          </Link>
        </div>
      </section>

      {/* Add animations to global styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CelebrantProfile;
