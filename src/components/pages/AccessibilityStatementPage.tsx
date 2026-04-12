import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function AccessibilityStatementPage() {
  return (
    <div className="min-h-screen bg-ivory font-paragraph">
      <Helmet>
        <title>Accessibility Statement | Backroad Beauty & Co.</title>
        <meta name="description" content="Learn about our commitment to web accessibility and how to contact us with accessibility concerns." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://backroadbeautyandco.com/accessibility" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Accessibility Statement | Backroad Beauty & Co." />
        <meta property="og:description" content="Learn about our commitment to web accessibility and how to contact us with accessibility concerns." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://backroadbeautyandco.com/accessibility" />
      </Helmet>

      <Header />
      
      <main id="main-content" className="focus:outline-none pt-32 pb-20" tabIndex={-1}>
        {/* Hero Section */}
        <section className="px-6 py-20 bg-ivory" aria-label="Accessibility Statement heading">
          <div className="max-w-[100rem] mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.h1 
                variants={fadeUp}
                className="font-heading text-5xl md:text-6xl text-deep-taupe mb-6"
              >
                Accessibility Statement
              </motion.h1>
              <motion.p 
                variants={fadeUp}
                className="text-lg text-deep-taupe/70 leading-relaxed"
              >
                At Backroad Beauty & Co., we are committed to ensuring digital accessibility for all visitors. We strive to meet or exceed WCAG 2.1 Level AA standards and continuously work to improve the accessibility of our website.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="px-6 py-20 bg-ivory" aria-label="Detailed accessibility information">
          <div className="max-w-3xl mx-auto space-y-16">
            
            {/* Commitment */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-deep-taupe mb-6">
                Our Commitment
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-deep-taupe/70 leading-relaxed mb-4">
                We believe that everyone deserves equal access to information and services. Our website is designed with accessibility in mind, incorporating features that make it easier for people with disabilities to navigate and use our site.
              </motion.p>
            </motion.div>

            {/* WCAG Compliance */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-deep-taupe mb-6">
                WCAG 2.1 Level AA Compliance
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-deep-taupe/70 leading-relaxed mb-6">
                We have implemented the following accessibility features to comply with WCAG 2.1 Level AA standards:
              </motion.p>
              <motion.ul variants={fadeUp} className="space-y-4">
                {[
                  "Color contrast ratios that meet or exceed 4.5:1 for normal text and 3:1 for large text",
                  "Readable font sizes (minimum 16px for body text) with proper line spacing",
                  "Descriptive alt text for all images and visual content",
                  "Keyboard navigation support throughout the entire website",
                  "Screen reader compatibility using semantic HTML and ARIA labels",
                  "Clear heading hierarchy (H1, H2, H3, etc.) for proper document structure",
                  "Properly labeled form fields with associated labels and error messages",
                  "Skip navigation links for quick access to main content",
                  "Focus indicators visible on all interactive elements",
                  "Accessible booking form with clear instructions and validation messages"
                ].map((item, index) => (
                  <li key={index} className="flex gap-4 text-base text-deep-taupe/70">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Accessibility Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-deep-taupe mb-6">
                Key Accessibility Features
              </motion.h2>
              
              <motion.div variants={fadeUp} className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl text-deep-taupe mb-3">Keyboard Navigation</h3>
                  <p className="text-base text-deep-taupe/70">
                    All interactive elements can be accessed and operated using keyboard navigation. Use the Tab key to move between elements and Enter or Space to activate buttons and links.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-deep-taupe mb-3">Screen Reader Support</h3>
                  <p className="text-base text-deep-taupe/70">
                    Our website is compatible with popular screen readers including NVDA, JAWS, and VoiceOver. All content is properly structured with semantic HTML to ensure screen readers can accurately interpret the page content.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-deep-taupe mb-3">Mobile Accessibility</h3>
                  <p className="text-base text-deep-taupe/70">
                    The website is fully responsive and accessible on mobile devices. Touch targets are appropriately sized (minimum 44x44 pixels) for easy interaction on touchscreen devices.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-deep-taupe mb-3">Color and Contrast</h3>
                  <p className="text-base text-deep-taupe/70">
                    We use sufficient color contrast throughout the site to ensure readability for users with low vision or color blindness. Information is never conveyed by color alone.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-deep-taupe mb-3">Accessible Forms</h3>
                  <p className="text-base text-deep-taupe/70">
                    All form fields are clearly labeled, with error messages that explain how to correct issues. The booking form includes date picker accessibility and clear instructions.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Limitations */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-deep-taupe mb-6">
                Known Limitations
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-deep-taupe/70 leading-relaxed mb-4">
                While we strive for full accessibility, some limitations may exist:
              </motion.p>
              <motion.ul variants={fadeUp} className="space-y-3">
                {[
                  "Embedded third-party content may have varying levels of accessibility",
                  "Some animations may not be suitable for users with vestibular disorders (we provide options to reduce motion)"
                ].map((item, index) => (
                  <li key={index} className="flex gap-4 text-base text-deep-taupe/70">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Feedback */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-deep-taupe mb-6">
                Accessibility Feedback
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-deep-taupe/70 leading-relaxed mb-4">
                We welcome feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
              </motion.p>
              <motion.div variants={fadeUp} className="bg-blush-pink/10 p-6 rounded-lg">
                <p className="text-base text-deep-taupe mb-2">
                  <strong>Email:</strong> <a href="mailto:Danielle@backroadbeautyandco.com" className="text-primary hover:underline">Danielle@backroadbeautyandco.com</a>
                </p>
                <p className="text-base text-deep-taupe">
                  <strong>Phone:</strong> <a href="tel:419-688-4000" className="text-primary hover:underline">419-688-4000</a>
                </p>
              </motion.div>
            </motion.div>

            {/* Standards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-deep-taupe mb-6">
                Standards and Guidelines
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-deep-taupe/70 leading-relaxed">
                This website aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA published by the World Wide Web Consortium (W3C). For more information about WCAG 2.1, visit <a href="https://www.w3.org/WAI/WCAG21/quickref/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">w3.org/WAI/WCAG21/quickref/</a>.
              </motion.p>
            </motion.div>

            {/* Last Updated */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="text-sm text-deep-taupe/50 pt-8 border-t border-deep-taupe/10"
            >
              Last updated: March 28, 2026
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
