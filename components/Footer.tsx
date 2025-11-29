import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-sage-100 bg-cream-200 text-charcoal-600 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <span className="mb-4 block text-2xl font-semibold text-charcoal-800">CelebrantSuccess</span>
            <p className="text-sm text-charcoal-600">
              Helping wedding, funeral, and family celebrants grow booked-out businesses with AI tools, signature web design, and SEO.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="rounded-full bg-sage-100 p-2 text-charcoal-700 transition hover:bg-champagne-light"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="rounded-full bg-sage-100 p-2 text-charcoal-700 transition hover:bg-champagne-light"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="rounded-full bg-sage-100 p-2 text-charcoal-700 transition hover:bg-champagne-light"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-charcoal-800">Services</h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-charcoal-600">
              <li><Link to="/services" className="hover:text-charcoal-800">Web Design</Link></li>
              <li><Link to="/services" className="hover:text-charcoal-800">SEO Packages</Link></li>
              <li><Link to="/services" className="hover:text-charcoal-800">Branding</Link></li>
              <li><Link to="/directory" className="hover:text-charcoal-800">Directory Listing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-charcoal-800">AI Tools</h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-charcoal-600">
              <li><Link to="/tools" className="hover:text-charcoal-800">Script Generator</Link></li>
              <li><Link to="/tools" className="hover:text-charcoal-800">Vow Builder</Link></li>
              <li><Link to="/tools" className="hover:text-charcoal-800">Social Media Posts</Link></li>
              <li><Link to="/tools" className="hover:text-charcoal-800">Contract Builder</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-charcoal-800">Contact</h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-charcoal-600">
              <li><a href="mailto:hello@celebrantsuccess.com" className="hover:text-charcoal-800">hello@celebrantsuccess.com</a></li>
              <li>London, United Kingdom</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-sage-100 pt-6 text-xs text-charcoal-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} CelebrantSuccess.com. All rights reserved.</p>
          <p className="flex items-center gap-2">Made with <Heart className="h-3 w-3 text-rose" /> for Celebrants</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
