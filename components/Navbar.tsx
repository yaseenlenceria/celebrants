import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Feather } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'AI Tools', path: '/tools' },
    { name: 'Directory', path: '/directory' },
    { name: 'Resources', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-sage-100 bg-cream-100/95 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-champagne-light/20 via-transparent to-sage-100/10 pointer-events-none" />
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-champagne via-champagne-dark to-sage-200 text-charcoal-800 shadow-xl shadow-champagne/40 animate-glow">
            <Feather className="h-6 w-6" />
          </div>
          <div className="leading-tight">
            <span className="block text-lg font-semibold tracking-tight text-charcoal-800">CelebrantSuccess</span>
            <span className="text-xs uppercase tracking-[0.28em] text-charcoal-600">business studio</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-200 ${
                isActive(link.path) ? 'text-champagne-dark' : 'text-charcoal-600 hover:text-charcoal-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/services"
            className="rounded-full bg-gradient-to-r from-champagne via-champagne-dark to-sage-200 px-5 py-2 text-sm font-semibold text-charcoal-800 shadow-lg shadow-champagne/40 transition hover:translate-y-[-1px] hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-charcoal-600 transition hover:bg-sage-100"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-sage-100 bg-cream-200 md:hidden">
          <div className="flex flex-col gap-2 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                  isActive(link.path) ? 'bg-champagne/20 text-charcoal-800' : 'text-charcoal-700 hover:bg-sage-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/services"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-xl bg-gradient-to-r from-champagne via-champagne-dark to-sage-200 px-4 py-3 text-center text-sm font-semibold text-charcoal-800 shadow-lg shadow-champagne/40"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
