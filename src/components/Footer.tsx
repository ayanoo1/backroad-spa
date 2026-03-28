export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-deep-taupe/5 border-t border-deep-taupe/10 py-16 px-6">
      <div className="max-w-[100rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl text-deep-taupe mb-4">
              Backroad Beauty & Co.
            </h3>
            <p className="font-paragraph text-base text-deep-taupe/70 leading-relaxed">
              A luxury self-care experience designed to help you relax, reset, and glow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl text-deep-taupe mb-4">Quick Links</h4>
            <nav className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Atmosphere', href: '#atmosphere' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'Book Now', href: '#booking' },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block font-paragraph text-base text-deep-taupe/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xl text-deep-taupe mb-4">Contact</h4>
            <div className="space-y-3 font-paragraph text-base text-deep-taupe/70">
              <p>
                <a href="tel:419-688-4000" className="hover:text-primary transition-colors">
                  419-688-4000
                </a>
              </p>
              <p>
                <a href="mailto:Danielle@backroadbeautyandco.com" className="hover:text-primary transition-colors">
                  Danielle@backroadbeautyandco.com
                </a>
              </p>
              <p className="pt-2">
                82 Main St<br />
                Butler, OH 44822
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-deep-taupe/10 text-center">
          <p className="font-paragraph text-sm text-deep-taupe/60">
            © {new Date().getFullYear()} Backroad Beauty & Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
