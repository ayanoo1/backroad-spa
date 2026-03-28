import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Atmosphere', href: '#atmosphere' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-deep-taupe/10">
      <div className="max-w-[100rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#home')}
            className="font-heading text-2xl md:text-3xl text-deep-taupe hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
            aria-label="Backroad Beauty & Co. - Home"
          >
            Backroad Beauty & Co.
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="font-paragraph text-base text-deep-taupe hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('#booking')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph rounded-full px-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Book Now
            </Button>
            <Link
              to="/accessibility"
              className="font-paragraph text-sm text-deep-taupe/60 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              aria-label="Accessibility Statement"
            >
              Accessibility
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-deep-taupe hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-ivory border-t border-deep-taupe/10 overflow-hidden"
          >
            <nav className="px-6 py-6 space-y-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left font-paragraph text-lg text-deep-taupe hover:text-primary transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-primary rounded px-2"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('#booking')}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph rounded-full py-6 mt-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Book Now
              </Button>
              <Link
                to="/accessibility"
                className="block w-full text-left font-paragraph text-lg text-deep-taupe hover:text-primary transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-primary rounded px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accessibility
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
