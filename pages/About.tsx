import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Target, Users, Lightbulb, Shield, Sparkles, TrendingUp, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cream-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 font-serif mb-6">
              Empowering Celebrants to Build{' '}
              <span className="text-champagne-dark">Thriving Businesses</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              We're celebrants who built the tools we always wished we had. Now we're sharing them with you.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-champagne-light rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-sage-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Story Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-champagne-dark font-semibold tracking-wide uppercase mb-3">Our Story</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-serif">
              Born from Real Struggles, Built for Real Solutions
            </h3>
          </div>

          <div className="prose prose-lg max-w-none text-slate-600">
            <p className="text-lg leading-relaxed mb-6">
              CelebrantSuccess was founded by working celebrants who intimately understood the challenges of running a ceremony business. We spent countless nights writing scripts, struggling with SEO, and wondering why there wasn't a platform built specifically for our needs.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              After years of cobbling together different tools, hiring expensive marketing agencies who didn't understand our industry, and watching talented celebrants struggle to get found online, we decided enough was enough.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              We built CelebrantSuccess to be the all-in-one platform we always wished existed: professional websites designed specifically for celebrants, AI tools that actually understand ceremony writing, and SEO that gets you found for the searches that matter.
            </p>
            <p className="text-lg leading-relaxed font-medium text-champagne-900">
              Today, we're proud to support hundreds of celebrants across the country, helping them spend less time on marketing and more time creating beautiful ceremonies.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-center w-16 h-16 bg-champagne-light rounded-full mb-6">
                <Target className="h-8 w-8 text-champagne-dark" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-serif mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                To empower celebrants to build thriving, sustainable businesses through innovative technology and targeted marketing solutions. We believe every talented celebrant deserves to be fully booked, and we're here to make that happen.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-center w-16 h-16 bg-sage-100 rounded-full mb-6">
                <Sparkles className="h-8 w-8 text-sage-200" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-serif mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                To become the trusted business partner for celebrants worldwide, providing the tools, training, and community support needed to transform ceremony work from a side hustle into a professional, profitable career.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-champagne-dark font-semibold tracking-wide uppercase mb-3">What We Stand For</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-serif">
              Our Core Values
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-champagne-light rounded-full mx-auto mb-4">
                <Users className="h-8 w-8 text-champagne-dark" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Community</h4>
              <p className="text-slate-600">
                We believe in lifting each other up. Success isn't a zero-sum game - when one celebrant thrives, we all benefit from a stronger industry.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-champagne-light rounded-full mx-auto mb-4">
                <Award className="h-8 w-8 text-champagne-dark" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Professionalism</h4>
              <p className="text-slate-600">
                Excellence in everything we do. From our tools to our support, we maintain the highest standards because your reputation depends on it.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-champagne-light rounded-full mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-champagne-dark" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Innovation</h4>
              <p className="text-slate-600">
                We embrace cutting-edge technology to solve old problems. Our AI tools and SEO strategies keep you ahead of the competition.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-champagne-light rounded-full mx-auto mb-4">
                <Heart className="h-8 w-8 text-champagne-dark" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Support</h4>
              <p className="text-slate-600">
                You're never alone on this journey. Our team is here to help you succeed with responsive support and expert guidance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-champagne-dark font-semibold tracking-wide uppercase mb-3">Meet the Team</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-serif">
              Celebrants Helping Celebrants
            </h3>
            <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
              Our team combines years of ceremony experience with expertise in technology, marketing, and business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <Users className="h-16 w-16 text-champagne-dark" />
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-slate-900 font-serif mb-1">Sarah Mitchell</h4>
                <p className="text-champagne-dark font-medium mb-3">Founder & CEO</p>
                <p className="text-slate-600">
                  Celebrant for 12 years, built her first website with duct tape and hope. Now helps others skip the struggle.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <TrendingUp className="h-16 w-16 text-sage-200" />
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-slate-900 font-serif mb-1">James O'Connor</h4>
                <p className="text-champagne-dark font-medium mb-3">Head of Marketing</p>
                <p className="text-slate-600">
                  SEO wizard who ranked 50+ celebrants for "near me" searches. Believes every celebrant deserves page one.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-champagne-300 to-champagne-500 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <Lightbulb className="h-16 w-16 text-champagne-dark" />
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-slate-900 font-serif mb-1">Emma Thompson</h4>
                <p className="text-champagne-dark font-medium mb-3">Head of Technology</p>
                <p className="text-slate-600">
                  Built the AI tools that write better vows than her first drafts. Passionate about automation for creatives.
                </p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <Shield className="h-16 w-16 text-slate-600" />
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-slate-900 font-serif mb-1">Michael Chen</h4>
                <p className="text-champagne-dark font-medium mb-3">Customer Success Lead</p>
                <p className="text-slate-600">
                  Former celebrant who knows your pain points. Dedicated to making sure you get results, not just tools.
                </p>
              </div>
            </div>

            {/* Team Member 5 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-champagne-200 to-champagne-400 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <Heart className="h-16 w-16 text-champagne-dark" />
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-slate-900 font-serif mb-1">Rachel Green</h4>
                <p className="text-champagne-dark font-medium mb-3">Content Director</p>
                <p className="text-slate-600">
                  Award-winning wedding writer who's crafted 500+ ceremonies. Creates the templates that save you hours.
                </p>
              </div>
            </div>

            {/* Team Member 6 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-sage-300 to-sage-500 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <Award className="h-16 w-16 text-sage-200" />
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-slate-900 font-serif mb-1">David Williams</h4>
                <p className="text-champagne-dark font-medium mb-3">Business Strategy</p>
                <p className="text-slate-600">
                  Helped 100+ celebrants transition from part-time to full-time. Turns passion into profitable businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-champagne-700 to-champagne-600">
        <div className="max-w-4xl mx-auto text-center py-20 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-serif mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-champagne-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join hundreds of celebrants who are building thriving businesses with CelebrantSuccess. Let's grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-champagne-700 bg-white hover:bg-cream-100 transition-colors shadow-lg"
            >
              Try AI Tools Free
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-champagne-700 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
