// HPI 1.7-V
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Star, ArrowRight, Sparkles, ZoomIn, X } from 'lucide-react';
import { format } from 'date-fns';
import { BaseCrudService } from '@/integrations';
import { AtmosphereGallery, Testimonials, BookingRequests } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Constants & Assets ---
const ASSETS = {
  hero: "https://static.wixstatic.com/media/488851_97a93575eb444db8b6de52281d7dd5c3~mv2.jpeg", // Green Chairs
  about: "https://static.wixstatic.com/media/488851_5e21ed44cdf646f297480fe814679196~mv2.jpeg", // Dress
  atmosphereFeature: "https://static.wixstatic.com/media/488851_9f50c4f3cbde4697ace403a5c03a4784~mv2.jpeg", // Salon Chairs
  booking: "https://static.wixstatic.com/media/488851_7660d48fd27340308b624b1fe91c19a6~mv2.jpeg" // Reception
};

// Service Menu Images
const SERVICE_MENUS = [
  {
    title: "Spa Rituals & Pedicure Services",
    image: "https://static.wixstatic.com/media/488851_cf5e8cca046d4e65b350f7488aa9490b~mv2.jpeg",
    alt: "Head Spa Rituals, Pedicure Rituals, and Add-On Services menu"
  },
  {
    title: "Waxing Menu",
    image: "https://static.wixstatic.com/media/488851_db8653d5230b4a2dae61d86f83dcd172~mv2.jpeg",
    alt: "Face, Body, Bikini + Brazilian, Intimate Skin Care, and Signature Combo services"
  },
  {
    title: "Facial Treatments & Lash Services",
    image: "https://static.wixstatic.com/media/488851_0a387cdedba64c60af81c513dee9a182~mv2.jpeg",
    alt: "Facial Treatments, Brow & Lash Rituals, Lash Extensions, and Fills menu"
  },
  {
    title: "Private Party Packages",
    image: "https://static.wixstatic.com/media/488851_024506fbcbb94e45a99fc983a0ced4c7~mv2.jpeg",
    alt: "BYOB Private Event Experience and group packages"
  }
];

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.21, 0.47, 0.32, 0.98] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function HomePage() {
  // --- Data Fidelity: Preserved State ---
  const [atmosphereImages, setAtmosphereImages] = useState<AtmosphereGallery[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requestedService: '',
    message: ''
  });
  const [preferredDate, setPreferredDate] = useState<Date>();

  // --- Refs for Scroll Animations ---
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const atmosphereRef = useRef<HTMLElement>(null);

  // --- Parallax Setup ---
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  const { scrollYProgress: aboutScroll } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const aboutImageY = useTransform(aboutScroll, [0, 1], ["-15%", "15%"]);

  // --- Data Fidelity: Preserved Logic ---
  useEffect(() => {
    loadGalleryImages();
    loadTestimonials();
  }, []);

  const loadGalleryImages = async () => {
    try {
      const { items } = await BaseCrudService.getAll<AtmosphereGallery>('atmospheregallery');
      setAtmosphereImages(items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  const loadTestimonials = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Testimonials>('testimonials');
      setTestimonials(items.sort((a, b) => 
        new Date(b.testimonialDate || 0).getTime() - new Date(a.testimonialDate || 0).getTime()
      ));
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setIsLoadingTestimonials(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await BaseCrudService.create('bookingrequests', {
        _id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        requestedService: formData.requestedService,
        preferredDate: preferredDate?.toISOString(),
        message: formData.message
      });
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', requestedService: '', message: '' });
      setPreferredDate(undefined);
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-ivory selection:bg-blush-pink selection:text-deep-taupe overflow-clip font-paragraph">
      <style>{`
        .clip-arch { clip-path: polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%); }
        .clip-soft-arch { clip-path: ellipse(120% 100% at 50% 0%); }
        .glass-panel { background: rgba(248, 245, 240, 0.85); backdrop-filter: blur(12px); }
        .hairline-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(74, 74, 74, 0.15), transparent); }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <Header />
      
      {/* 1. HERO SECTION - Immersive, Parallax, Elegant */}
      <section ref={heroRef} id="home" className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <Image
            src={ASSETS.hero}
            alt="Backroad Beauty & Co. luxury spa interior with elegant green chairs and warm lighting"
            className="w-full h-full object-cover scale-105"
            width={1920}
          />
          {/* Soft, warm gradient overlay to ensure text readability while maintaining the vibe */}
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-ivory/50 to-ivory/90 mix-blend-overlay" />
          <div className="absolute inset-0 bg-ivory/40" />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
              <div className="w-12 h-[1px] bg-deep-taupe/40" aria-hidden="true" />
              <span className="uppercase tracking-[0.2em] text-xs font-medium text-deep-taupe/70">Boutique Spa</span>
              <div className="w-12 h-[1px] bg-deep-taupe/40" aria-hidden="true" />
            </motion.div>

            <motion.h1 
              variants={fadeUp}
              className="font-heading text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.1] text-deep-taupe mb-8 tracking-tight"
            >
              Modern Rituals for the <br className="hidden md:block" />
              <span className="italic font-light text-primary">Wild & Polished</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl lg:text-2xl text-deep-taupe/80 mb-12 max-w-2xl font-light leading-relaxed"
            >
              A luxury self-care experience designed to help you relax, reset, and glow.
            </motion.p>
            
            <motion.div variants={fadeUp}>
              <Button
                size="lg"
                className="bg-deep-taupe hover:bg-primary text-ivory font-paragraph text-base tracking-wide px-10 py-7 rounded-none transition-all duration-500 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book Your Appointment
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase tracking-widest text-deep-taupe/50">Scroll to discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-deep-taupe/50 to-transparent" />
        </motion.div>
      </section>

      {/* 2. ABOUT / EXPERIENCE - Asymmetrical, Parallax Image */}
      <section ref={aboutRef} id="about" className="relative py-32 md:py-48 px-6 bg-ivory overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blush-pink/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-5 relative">
              <motion.div 
                style={{ y: aboutImageY }}
                className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-t-full"
              >
                <Image
                  src={ASSETS.about}
                  alt="Boutique spa details and elegant interior design at Backroad Beauty & Co."
                  className="w-full h-full object-cover"
                  width={800}
                />
                <div className="absolute inset-0 border border-ivory/20 rounded-t-full m-4 pointer-events-none" />
              </motion.div>
              {/* Floating accent */}
              <motion.div 
                initial={{ opacity: 0, rotate: -10 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -bottom-12 -right-6 md:-right-12 bg-white p-6 shadow-xl max-w-[200px] z-10"
              >
                <Sparkles className="w-6 h-6 text-accent-gold mb-3" aria-hidden="true" />
                <p className="text-xs uppercase tracking-widest text-deep-taupe/60 leading-relaxed">Intentional Self-Care</p>
              </motion.div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 lg:pl-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl text-deep-taupe mb-8 leading-[1.15]">
                  A Space to <br/>
                  <span className="italic text-sage-green">Slow Down</span>
                </motion.h2>
                
                <motion.div variants={fadeUp} className="w-16 h-[1px] bg-accent-gold mb-8" />

                <motion.p variants={fadeUp} className="text-lg md:text-xl text-deep-taupe/70 leading-relaxed mb-8 max-w-2xl font-light">
                  Backroad Beauty & Co. is a space to slow down, reconnect, and indulge in intentional self-care. 
                  Every detail is designed to leave you feeling calm, confident, and renewed.
                </motion.p>
                
                <motion.p variants={fadeUp} className="text-base text-deep-taupe/60 leading-relaxed max-w-2xl">
                  We believe that true beauty radiates from a place of inner peace. Our boutique environment is carefully curated to provide an intimate escape from the everyday, where modern elegance meets countryside tranquility.
                </motion.p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION - Clean Vertical Layout with Service Menu Images */}
      <section id="services" className="py-32 md:py-48 px-6 bg-ivory relative">
        <div className="hairline-divider absolute top-0 left-0 w-full" />
        
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-24"
          >
            <motion.span variants={fadeUp} className="uppercase tracking-[0.2em] text-xs font-medium text-sage-green mb-4 block">Our Offerings</motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl text-deep-taupe mb-6">
              Service Menu
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-deep-taupe/60 max-w-2xl mx-auto font-light">
              Explore our complete range of treatments and services.
            </motion.p>
          </motion.div>

          {/* Vertical Stack of Service Menu Images */}
          <div className="space-y-20 md:space-y-32">
            {SERVICE_MENUS.map((menu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="flex flex-col items-center"
              >
                {/* Section Title */}
                <motion.h3 
                  variants={fadeUp}
                  className="font-heading text-2xl md:text-3xl text-deep-taupe mb-8 text-center"
                >
                  {menu.title}
                </motion.h3>

                {/* Image Container with Zoom Capability */}
                <motion.div
                  className="relative w-full max-w-2xl group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setExpandedImage(menu.image)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={menu.image}
                      alt={menu.alt}
                      className="w-full h-auto object-contain bg-ivory"
                      width={800}
                    />
                    {/* Zoom Overlay */}
                    <div className="absolute inset-0 bg-deep-taupe/0 group-hover:bg-deep-taupe/20 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white/90 p-3 rounded-full shadow-lg"
                        aria-hidden="true"
                      >
                        <ZoomIn className="w-6 h-6 text-deep-taupe" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Zoom Modal */}
      {expandedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setExpandedImage(null)}
          className="fixed inset-0 bg-deep-taupe/80 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded service menu image"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] bg-ivory rounded-lg overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close image"
            >
              <X className="w-6 h-6 text-deep-taupe" />
            </button>
            <Image
              src={expandedImage}
              alt="Expanded service menu"
              className="w-full h-full object-contain"
              width={1200}
            />
          </motion.div>
        </motion.div>
      )}

      {/* 4. ATMOSPHERE / SPACE SECTION - Sticky Narrative & CMS Gallery */}
      <section ref={atmosphereRef} id="atmosphere" className="relative bg-ivory">
        {/* Part 1: The Structural Feature (Using provided image) */}
        <div className="relative h-[80svh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-deep-taupe">
            <Image
              src={ASSETS.atmosphereFeature}
              alt="Elegant salon chairs and spa interior at Backroad Beauty & Co."
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
              width={1920}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="glass-panel p-12 md:p-20 max-w-3xl border border-white/20"
            >
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-deep-taupe mb-6">
                Your Sanctuary <span className="italic text-primary">Awaits</span>
              </h2>
              <p className="text-lg text-deep-taupe/70 font-light">
                Step into a world of tranquility and refined luxury. Every corner is designed to envelop you in comfort.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Part 2: The CMS Gallery (Data Fidelity) */}
        <div className="py-32 px-6 max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {isLoadingGallery ? (
              <div className="col-span-full py-20 text-center text-deep-taupe/40">Curating atmosphere...</div>
            ) : atmosphereImages.length > 0 ? (
              atmosphereImages.map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: (index % 3) * 0.15 }}
                  className={`relative group overflow-hidden bg-sage-green/5 ${
                    index === 0 ? 'md:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={image.image || ''}
                    alt={image.altText || image.title || 'Spa atmosphere'}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    width={800}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-taupe/80 via-deep-taupe/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {image.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="font-heading text-2xl text-ivory mb-2">{image.title}</h3>
                      {image.description && (
                        <p className="text-sm text-ivory/80 font-light line-clamp-2">{image.description}</p>
                      )}
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-deep-taupe/40">Gallery coming soon.</div>
            )}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIAL SECTION - Soft, Flowing Layout */}
      <section id="testimonials" className="py-32 md:py-48 px-6 bg-blush-pink/10 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blush-pink/50 to-transparent -translate-y-1/2" />
        
        <div className="max-w-[100rem] mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl text-deep-taupe mb-6">
              Words of <span className="italic text-primary">Affirmation</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {isLoadingTestimonials ? (
              <div className="col-span-full text-center text-deep-taupe/40">Loading experiences...</div>
            ) : testimonials.length > 0 ? (
              testimonials.slice(0, 3).map((testimonial, index) => ( // Limit to 3 for layout consistency
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white p-10 md:p-12 relative group"
                >
                  {/* Quote mark decoration */}
                  <div className="absolute top-8 right-8 text-6xl font-heading text-blush-pink/30 leading-none select-none">"</div>
                  
                  <div className="flex items-center gap-1 mb-8" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (testimonial.rating || 0)
                            ? 'fill-accent-gold text-accent-gold'
                            : 'text-deep-taupe/10'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  
                  <p className="text-lg text-deep-taupe/80 mb-10 leading-relaxed font-light italic relative z-10">
                    {testimonial.reviewText}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    {testimonial.clientPhoto ? (
                      <Image
                        src={testimonial.clientPhoto}
                        alt={testimonial.clientName || 'Client'}
                        className="w-12 h-12 rounded-full object-cover"
                        width={48}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-sage-green/20 flex items-center justify-center text-sage-green font-heading">
                        {testimonial.clientName?.charAt(0) || 'C'}
                      </div>
                    )}
                    <div>
                      <p className="font-heading text-lg text-deep-taupe">{testimonial.clientName}</p>
                      {testimonial.testimonialDate && (
                        <p className="text-xs text-deep-taupe/50 uppercase tracking-wider mt-1">
                          {format(new Date(testimonial.testimonialDate), 'MMM yyyy')}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-deep-taupe/40">No testimonials yet.</div>
            )}
          </div>
        </div>
      </section>

      {/* 6. BOOKING SECTION (CRITICAL) - Split Layout, Functional */}
      <section id="booking" className="relative bg-ivory">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90svh]">
          
          {/* Left: Form Area */}
          <div className="flex flex-col justify-center px-6 py-24 lg:px-20 xl:px-32 order-2 lg:order-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-xl w-full mx-auto lg:mx-0"
            >
              <motion.div variants={fadeUp} className="mb-12">
                <h2 className="font-heading text-4xl md:text-5xl text-deep-taupe mb-4">
                  Reserve Your Time
                </h2>
                <p className="text-deep-taupe/60 font-light">
                  Begin your journey to relaxation. Fill out the request below and we will confirm your appointment shortly.
                </p>
              </motion.div>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-sage-green/10 border-l-2 border-sage-green p-6 mb-8"
                >
                  <p className="text-deep-taupe font-medium">Request Received</p>
                  <p className="text-sm text-deep-taupe/70 mt-1">Thank you. We'll contact you shortly to confirm your booking.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={fadeUp} className="space-y-3">
                    <Label htmlFor="name" className="text-xs uppercase tracking-widest text-deep-taupe/70">Full Name <span aria-label="required">*</span></Label>
                    <Input
                      id="name"
                      required
                      aria-required="true"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="border-0 border-b border-deep-taupe/20 rounded-none px-0 py-2 bg-transparent focus-visible:ring-0 focus-visible:border-primary text-base"
                      placeholder="Jane Doe"
                    />
                  </motion.div>

                  <motion.div variants={fadeUp} className="space-y-3">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-deep-taupe/70">Email Address <span aria-label="required">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      aria-required="true"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="border-0 border-b border-deep-taupe/20 rounded-none px-0 py-2 bg-transparent focus-visible:ring-0 focus-visible:border-primary text-base"
                      placeholder="jane@example.com"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={fadeUp} className="space-y-3">
                    <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-deep-taupe/70">Phone Number <span aria-label="required">*</span></Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      aria-required="true"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="border-0 border-b border-deep-taupe/20 rounded-none px-0 py-2 bg-transparent focus-visible:ring-0 focus-visible:border-primary text-base"
                      placeholder="(555) 000-0000"
                    />
                  </motion.div>

                  <motion.div variants={fadeUp} className="space-y-3">
                    <Label htmlFor="service" className="text-xs uppercase tracking-widest text-deep-taupe/70">Service <span aria-label="required">*</span></Label>
                    <Select
                      required
                      value={formData.requestedService}
                      onValueChange={(value) => handleInputChange('requestedService', value)}
                    >
                      <SelectTrigger id="service" className="border-0 border-b border-deep-taupe/20 rounded-none px-0 py-2 bg-transparent focus:ring-0 focus:border-primary text-base shadow-none" aria-required="true">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-ivory border-deep-taupe/10">
                        <SelectItem value="facial">Facial Treatment</SelectItem>
                        <SelectItem value="massage">Massage Therapy</SelectItem>
                        <SelectItem value="body-treatment">Body Treatment</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                <motion.div variants={fadeUp} className="space-y-3">
                  <Label className="text-xs uppercase tracking-widest text-deep-taupe/70">Preferred Date <span aria-label="required">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal border-0 border-b border-deep-taupe/20 rounded-none px-0 py-2 bg-transparent hover:bg-transparent hover:text-primary focus-visible:ring-0 shadow-none text-base ${!preferredDate && "text-muted-foreground"}`}
                        aria-required="true"
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
                        {preferredDate ? format(preferredDate, 'PPP') : 'Select a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-ivory border-deep-taupe/10" align="start">
                      <Calendar
                        mode="single"
                        selected={preferredDate}
                        onSelect={setPreferredDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="bg-ivory"
                      />
                    </PopoverContent>
                  </Popover>
                </motion.div>

                <motion.div variants={fadeUp} className="space-y-3">
                  <Label htmlFor="message" className="text-xs uppercase tracking-widest text-deep-taupe/70">Additional Notes</Label>
                  <Textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Any special requests?"
                    className="border-0 border-b border-deep-taupe/20 rounded-none px-0 py-2 bg-transparent focus-visible:ring-0 focus-visible:border-primary text-base resize-none"
                  />
                </motion.div>

                <motion.div variants={fadeUp} className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !preferredDate}
                    className="w-full bg-deep-taupe hover:bg-primary text-ivory font-paragraph text-base tracking-wide py-7 rounded-none transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Appointment'}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>

          {/* Right: Image Area */}
          <div className="relative h-[50svh] lg:h-auto order-1 lg:order-2 overflow-hidden">
            <Image
              src={ASSETS.booking}
              alt="Reception at Backroad Beauty & Co."
              className="absolute inset-0 w-full h-full object-cover"
              width={1200}
            />
            <div className="absolute inset-0 bg-deep-taupe/10 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION - Elegant Footer Prelude */}
      <section id="contact" className="py-32 px-6 bg-deep-taupe text-ivory text-center relative overflow-hidden">
        {/* Subtle background texture/noise could go here, using a radial gradient for now */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-12">
              <Sparkles className="w-8 h-8 text-accent-gold mx-auto mb-6 opacity-80" />
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">
                Visit Us
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
              <motion.div variants={fadeUp} className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-ivory/50 mb-4">Location</p>
                <p className="text-lg font-light">82 Main St</p>
                <p className="text-lg font-light">Butler, OH 44822</p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-ivory/50 mb-4">Contact</p>
                <p className="text-lg font-light">
                  <a href="tel:419-688-4000" className="hover:text-primary transition-colors">419-688-4000</a>
                </p>
                <p className="text-lg font-light">
                  <a href="mailto:Danielle@backroadbeautyandco.com" className="hover:text-primary transition-colors">Danielle@backroadbeautyandco.com</a>
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-ivory/50 mb-4">Proprietor</p>
                <p className="font-heading text-2xl italic">Danielle</p>
                <p className="text-sm font-light text-ivory/70">Owner & Lead Esthetician</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}