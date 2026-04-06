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
import { CalendarIcon, Star, ArrowRight, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { BaseCrudService } from '@/integrations';
import { Testimonials, BookingRequests } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Constants & Assets ---
const ASSETS = {
  hero: "https://static.wixstatic.com/media/488851_97a93575eb444db8b6de52281d7dd5c3~mv2.jpeg", // Green Chairs
  about: "https://static.wixstatic.com/media/488851_5e21ed44cdf646f297480fe814679196~mv2.jpeg", // Dress
  atmosphereFeature: "https://static.wixstatic.com/media/488851_9f50c4f3cbde4697ace403a5c03a4784~mv2.jpeg", // Salon Chairs
  booking: "https://static.wixstatic.com/media/488851_7660d48fd27340308b624b1fe91c19a6~mv2.jpeg" // Reception
};

// Service Menu Data - Organized by Category
const SERVICE_CATEGORIES = [
  {
    title: "HEAD SPA RITUALS",
    services: [
      { name: "The Grounding Ritual", duration: "60 min", price: "$110", description: "Relaxing scalp therapy to hydrate, stimulate, and reset. Includes blow dry + quick style" },
      { name: "The Restoration Ritual", duration: "90 min", price: "$145", description: "Deeper detox + extended massage for full mind + scalp renewal. Includes blow dry + quick style" },
      { name: "The Full Reset Ritual", duration: "120 min", price: "$180", description: "Intensive scalp therapy and full restoration experience. Includes full blowout" },
      { name: "Upgrade any 60 or 90 min ritual to full blowout", price: "+$25", description: "" }
    ]
  },
  {
    title: "PEDICURE RITUALS",
    services: [
      { name: "The Roadhouse Pedi", price: "$55", description: "Clean, shape, exfoliate, and polish for a refreshed, no-fuss finish." },
      { name: "The Backroad Pedi", price: "$70", description: "Full pedicure with callus work, exfoliation, massage, and polish." },
      { name: "The Wildflower Pedi", price: "$85", description: "Extended massage, deep exfoliation, and elevated care for full relaxation." }
    ]
  },
  {
    title: "ADD-ON RITUALS",
    services: [
      { name: "Scalp Boost", price: "$15", description: "" },
      { name: "Eye Revival", price: "$15", description: "" },
      { name: "Targeted Extractions", price: "$20", description: "" },
      { name: "Aroma Ritual", price: "$10", description: "" }
    ]
  },
  {
    title: "WAXING MENU - FACE",
    services: [
      { name: "Brow Shape", price: "$20", description: "" },
      { name: "Lip", price: "$12", description: "" },
      { name: "Chin", price: "$12", description: "" },
      { name: "Full Face", price: "$40", description: "" }
    ]
  },
  {
    title: "WAXING MENU - BODY",
    services: [
      { name: "Underarms", price: "$20", description: "" },
      { name: "Half Arm", price: "$30", description: "" },
      { name: "Full Arm", price: "$45", description: "" },
      { name: "Half Leg", price: "$40", description: "" },
      { name: "Full Leg", price: "$65", description: "" }
    ]
  },
  {
    title: "WAXING MENU - BIKINI + BRAZILIAN",
    services: [
      { name: "Bikini Line", price: "$35", description: "" },
      { name: "Full Bikini", price: "$50", description: "" },
      { name: "Brazilian (Female)", price: "$65", description: "Complete hair removal, front to back." },
      { name: "Maintenance Brazilian (4-6 weeks)", price: "$55", description: "" }
    ]
  },
  {
    title: "INTIMATE SKIN CARE",
    services: [
      { name: "Vagacial", price: "$70", description: "Soothing treatment to help with ingrowns, irritation, and discoloration." },
      { name: "Deluxe Vagacial", price: "$90", description: "Includes deep exfoliation, extractions, mask, and high-frequency." }
    ]
  },
  {
    title: "SIGNATURE COMBO",
    services: [
      { name: "The Smooth Ritual (Brazilian + Vagacial)", price: "$120", description: "Best Value. Complete hair removal paired with a targeted skin treatment to soothe, prevent ingrowns, and leave skin smooth and refreshed." }
    ]
  },
  {
    title: "FACIAL TREATMENTS",
    services: [
      { name: "The Quick Reset (Express Facial)", duration: "30 min", price: "$55", description: "A results-driven refresh to cleanse, exfoliate, and hydrate—perfect for a quick skin pick-me-up." },
      { name: "The Reset Facial", duration: "60 min", price: "$85", description: "A customized facial designed to restore balance, improve texture, and bring out your natural glow." },
      { name: "The Deep Facial", duration: "90 min", price: "$120", description: "Advanced treatment with extended massage and targeted care for deeper correction and visible results." },
      { name: "Backroad Back Facial", duration: "95 min", price: "$95", description: "A deep-cleansing back treatment to target congestion, smooth texture, and clarify the skin." }
    ]
  },
  {
    title: "BROW & LASH RITUALS",
    services: [
      { name: "The Lifted Gaze (Lash Lift & Tint)", price: "$70", description: "Lifted, darkened lashes for an effortless, low-maintenance look." },
      { name: "The Wild Brow (Brow Lamination & Tint)", price: "$65", description: "Full, brushed-up brows with a soft, structured finish." },
      { name: "The Full Gaze", price: "$120", description: "Lash lift, tint, and brow lamination for a complete, undone but polished look." }
    ]
  },
  {
    title: "LASH EXTENSIONS",
    services: [
      { name: "The Soft Set (Classic Full Set)", price: "$85", description: "Natural, mascara-like lashes with soft definition." },
      { name: "The Textured Set (Hybrid Full Set)", price: "$105", description: "A fuller, wispy blend of classic and volume lashes." },
      { name: "The Bold Set (Volume Full Set)", price: "$125", description: "Full, fluffy, and dramatic lashes." }
    ]
  },
  {
    title: "LASH EXTENSIONS - FILLS",
    services: [
      { name: "2 Week Fill", price: "$45", description: "" },
      { name: "3 Week Fill", price: "$60", description: "" },
      { name: "4 Week Fill", price: "$75", description: "(After 4 weeks, full set required)" }
    ]
  },
  {
    title: "PRIVATE PARTY PACKAGES",
    isPackage: true,
    packages: [
      {
        name: "THE BACKROAD SOCIAL (GROUP OF 5)",
        price: "$275 total | $55 per guest",
        description: "A laid-back, private experience perfect for girls' night or a casual get-together.",
        includes: ["Private space (1.5 hours)", "Custom Trucker Hat Bar (1 hat per guest)", "Light refreshments setup (BYOB friendly)", "Photo-worthy setup + aesthetic space", "Option to add services per guest"]
      },
      {
        name: "THE WILD COLLECTIVE (GROUP OF 5)",
        price: "$400 total | $80 per guest",
        description: "A more elevated experience with beauty + creativity combined.",
        includes: ["Private space (2 hours)", "Custom Trucker Hat Bar", "Choice of ONE service per guest: Express Facial, Lash Lift & Tint", "BYOB setup + curated vibe"]
      },
      {
        name: "THE BACKROAD BASH (GROUP OF 10)",
        price: "$500 total | $50 per guest",
        description: "Perfect for birthdays, bachelorettes, or larger gatherings.",
        includes: ["Private space (2 hours)", "Custom Trucker Hat Bar", "BYOB experience", "Group-friendly setup + seating", "Services available as add-ons"]
      },
      {
        name: "THE FULL EXPERIENCE (GROUP OF 10)",
        price: "$900 total | $90 per guest",
        description: "Your signature luxury party package.",
        includes: ["Private space (2.5 hours)", "Custom Trucker Hat Bar", "Choice of ONE service per guest: Express Facial, Lash Lift & Tint", "BYOB + elevated setup", "Priority booking + full experience vibe"]
      }
    ]
  },
  {
    title: "MEN'S RITUALS",
    subtitle: "Built for the modern man who works hard, rides fast, and knows when to slow it down.",
    services: [
      { name: "The Pit Reset (Express Facial)", duration: "30 min", price: "$55", description: "A quick tune-up for tired, stressed skin. Cleanse, exfoliate, and hydrate—perfect between appointments or before a night out." },
      { name: "The Full Detail (Custom Facial)", duration: "60 min", price: "$90", description: "Deep cleanse, exfoliation, extractions, and targeted treatment designed for your skin's needs. Leaves you refreshed, balanced, and recharged." },
      { name: "The Overhaul (Advanced Facial)", duration: "90 min", price: "$125", description: "A full skin reset using advanced techniques like hydrodermabrasion or microcurrent to restore clarity, smoothness, and tone." },
      { name: "Backroad Reset (Back Facial)", duration: "60 min", price: "$95", description: "Targets buildup, breakouts, and tension across the back. Deep cleanse, exfoliation, and hydration for hard-to-reach areas." }
    ]
  },
  {
    title: "MEN'S MASSAGE RITUALS",
    services: [
      { name: "The Slow Ride (Relaxation Massage)", description: "Unwind, decompress, and let the stress roll off.", subservices: [
        { name: "The Quick Cruise", duration: "30 min", price: "$45" },
        { name: "The Slow Ride", duration: "60 min", price: "$75" },
        { name: "The Long Haul", duration: "90 min", price: "$105" }
      ]},
      { name: "The Heated Ride (Hot Stone Massage)", description: "Smooth heated stones melt tension deep into the muscles for a heavier, grounding experience.", subservices: [
        { name: "The Heated Ride", duration: "60 min", price: "$95" },
        { name: "The Long Heated Ride", duration: "90 min", price: "$125" }
      ]}
    ]
  },
  {
    title: "MEN'S GROOMING SERVICES",
    services: [
      { name: "The Clean Up (Brow Wax)", price: "$15", description: "Sharpens and cleans up the brow area without over-shaping." },
      { name: "The Beard Reset", price: "$30", description: "Steam, cleanse, condition, and shape for a clean, healthy beard." },
      { name: "The Smooth Finish (Back or Chest Wax)", price: "$50-$60", description: "Removes unwanted hair for a clean, polished look." }
    ]
  },
  {
    title: "HEAD SPA (MEN'S)",
    services: [
      { name: "The Engine Reset (Head Spa Ritual)", duration: "60 min", price: "$85", description: "Deep scalp cleanse, exfoliation, massage, and hydration to promote hair and scalp health." },
      { name: "The Engine Reset (Head Spa Ritual)", duration: "90 min", price: "$110", description: "Deep scalp cleanse, exfoliation, massage, and hydration to promote hair and scalp health." },
      { name: "The Engine Reset (Head Spa Ritual)", duration: "120 min", price: "$140", description: "Deep scalp cleanse, exfoliation, massage, and hydration to promote hair and scalp health. Includes Blowout" }
    ]
  },
  {
    title: "MEN'S ADD-ONS",
    services: [
      { name: "Hot Towels + Aromatherapy", price: "$10", description: "" },
      { name: "Scalp Massage Upgrade", price: "+$15", description: "" },
      { name: "Eye De-Puff Treatment", price: "$10", description: "" }
    ]
  },
  {
    title: "RIDE OR DIE BRIDAL EXPERIENCE",
    isBridal: true,
    description: "A BOLD, ELEVATED BRIDAL MORNING FOR YOU AND YOUR CREW - DESIGNED TO KEEP THINGS CALM, SEAMLESS, AND UNFORGETTABLE.",
    includes: ["HAIR STYLING", "MAKEUP APPLICATION", "MINI SKIN RITUAL (EXPRESS FACIAL PREP)", "LASH APPLICATION", "PRIVATE BRIDAL SUITE (3-4 HOURS)", "BYOB SETUP (JUICE, WATER, ICE PROVIDED)", "LIGHT SNACKS + SIGNATURE GOODIE BAGS"],
    pricing: [
      { tier: "BRIDE +5", price: "$1,650" },
      { tier: "ADDITIONAL GUESTS", price: "$225" }
    ]
  },
  {
    title: "RIDE OR DIE: VIP BRIDAL EXPERIENCE",
    isBridal: true,
    description: "FULL LUXURY, HEAD-TO-TOE EXPERIENCE. AN ALL-INCLUSIVE BRIDAL MORNING WITH MORE TIME, MORE SERVICES, AND A FULLY ELEVATED EXPERIENCE.",
    includes: ["EVERYTHING IN RIDE OR DIE +", "EXTENDED SKIN RITUAL", "EXPRESS PEDICURE (NO POLISH)", "BLOWOUT/STYLING UPGRADE OPTION", "4-5 HOUR PRIVATE SUITE", "ELEVATED SNACK DISPLAY", "PREMIUM GOODIE BAGS INCLUDED"],
    pricing: [
      { tier: "BRIDE +5", price: "$2,400" },
      { tier: "ADDITIONAL GUESTS", price: "$295" }
    ]
  },
  {
    title: "BRIDAL BOOKING DETAILS",
    isBridal: true,
    details: ["RETAINER REQUIRED TO RESERVE DATE", "FINAL HEADCOUNT DUE 14 DAYS PRIOR", "BRIDAL TRIAL BOOKED SEPARATELY", "BYOB ALLOWED (MUST FOLLOW OHIO GUIDELINES)"]
  },
  {
    title: "MASSAGE RITUALS",
    services: [
      { name: "THE SLOW RIDE", description: "A CALMING FULL-BODY MASSAGE DESIGNED TO EASE TENSION, QUIET THE MIND, AND LEAVE YOU FEELING RESTORED.", subservices: [
        { name: "QUICK CRUISE", duration: "30 min", price: "$45" },
        { name: "SLOW RIDE", duration: "60 min", price: "$75" },
        { name: "LONG HAUL", duration: "90 min", price: "$105" }
      ]},
      { name: "THE HEATED RIDE", description: "HEATED STONES COMBINED WITH SLOW, INTENTIONAL MASSAGE WORK DEEP INTO TENSION, LEAVING THE BODY RELAXED, HEAVY, AND FULLY RESTORED.", subservices: [
        { name: "HEATED RIDE", duration: "60 min", price: "$95" },
        { name: "LONG HEATED RIDE", duration: "90 min", price: "$125" }
      ]}
    ]
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
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
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

  // --- Parallax Setup ---
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  const { scrollYProgress: aboutScroll } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const aboutImageY = useTransform(aboutScroll, [0, 1], ["-15%", "15%"]);

  // --- Data Fidelity: Preserved Logic ---
  useEffect(() => {
    loadTestimonials();
  }, []);

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
        /* Focus visible styles for better accessibility */
        *:focus-visible {
          outline: 2px solid #D4A0A7;
          outline-offset: 2px;
        }
      `}</style>

      <Header />
      <main id="main-content" className="focus:outline-none" tabIndex={-1}>
      
      {/* 1. HERO SECTION - Immersive, Parallax, Elegant */}
      <section ref={heroRef} id="home" className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden" aria-label="Hero section featuring Backroad Beauty & Co. luxury spa experience">
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
      <section ref={aboutRef} id="about" className="relative py-32 md:py-48 px-6 bg-ivory overflow-hidden" aria-label="About section - Learn about Backroad Beauty & Co.">
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

      {/* 3. PHILOSOPHY SECTION - Narrative, Elegant Layout */}
      <section id="philosophy" className="py-32 md:py-48 px-6 bg-white relative overflow-hidden" aria-label="Philosophy section - Our approach to beauty and wellness">
        <div className="absolute top-0 left-0 w-[30vw] h-[30vw] bg-sage-green/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[35vw] h-[35vw] bg-blush-pink/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 pointer-events-none" />
        
        <div className="max-w-[100rem] mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-24"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-accent-gold" aria-hidden="true" />
              <span className="uppercase tracking-[0.2em] text-xs font-medium text-accent-gold">Our Story</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl text-deep-taupe mb-6 leading-[1.15]">
              The <span className="italic text-sage-green">Philosophy</span>
            </motion.h2>
          </motion.div>

          {/* Philosophy Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column - Main Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="font-heading text-2xl md:text-3xl text-deep-taupe">
                  A Sanctuary Beyond the Ordinary
                </h3>
                <p className="text-lg text-deep-taupe/70 leading-relaxed font-light">
                  At Backroad Beauty & Co, we believe the best things in life are found a little further out where the air is clearer, the pace is slower, and the beauty is raw. We created this space to be more than just a spa; it's a sanctuary for those who value both a polished look and a wild heart.
                </p>
                <p className="text-lg text-deep-taupe/70 leading-relaxed font-light">
                  We've traded clinical coldness for warm woods, botanical scents, and an atmosphere that invites you to exhale the moment you walk through the door.
                </p>
              </div>

              <div className="w-16 h-[1px] bg-accent-gold/50" aria-hidden="true" />

              <div className="space-y-6">
                <h3 className="font-heading text-2xl md:text-3xl text-deep-taupe">
                  The Rituals
                </h3>
                <p className="text-lg text-deep-taupe/70 leading-relaxed font-light">
                  Our menu is a curated collection of modern rituals designed to ground you. Whether you are seeking the transformative rhythm of our Meadow Stream Scalp Ritual, the advanced rejuvenation of a custom facial, or the confidence of a perfectly sculpted brow, every treatment is an intentional moment of rest.
                </p>
                <p className="text-lg text-deep-taupe/70 leading-relaxed font-light">
                  We don't just treat the skin; we restore the spirit.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Boutique & Closing */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-blush-pink/5 to-sage-green/5 p-10 md:p-12 rounded-lg border border-blush-pink/20">
                <h3 className="font-heading text-2xl md:text-3xl text-deep-taupe mb-6">
                  The Boutique & Studio
                </h3>
                <p className="text-lg text-deep-taupe/70 leading-relaxed font-light mb-6">
                  Beyond the treatment room, Backroad Beauty & Co is a place to gather and stay a while. Our studio is home to The Everlast Link, where we celebrate moments in time with custom-fit permanent jewelry.
                </p>
                <p className="text-lg text-deep-taupe/70 leading-relaxed font-light">
                  In our boutique, you'll find our signature Hat Bar—a space to create your own style with custom-patched trucker and cowboy hats that transition effortlessly from the spa to the trail.
                </p>
              </div>

              <div className="w-16 h-[1px] bg-accent-gold/50" aria-hidden="true" />

              <div className="space-y-6">
                <h3 className="font-heading text-2xl md:text-3xl text-deep-taupe">
                  The Closing
                </h3>
                <p className="text-lg text-deep-taupe/70 leading-relaxed font-light">
                  We celebrate the trailblazers, the dreamers, and the locals. We are here for those who know that true luxury isn't about being fancy—it's about being seen, being cared for, and being yourself.
                </p>
                <p className="text-xl md:text-2xl text-deep-taupe font-light italic leading-relaxed">
                  Welcome to the backroad. We've been waiting for you.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION - Aesthetic Menu Layout */}
      <section id="services" className="py-32 md:py-48 px-6 bg-ivory relative" aria-label="Services section - Browse our complete menu of treatments">
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

          {/* Service Categories Grid */}
          <div className="space-y-24 md:space-y-32">
            {SERVICE_CATEGORIES.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: catIndex * 0.1 }}
                className="border-t border-deep-taupe/10 pt-16"
              >
                {/* Category Header */}
                <div className="mb-12">
                  <h3 className="font-heading text-3xl md:text-4xl text-deep-taupe mb-2">
                    {category.title}
                  </h3>
                  {category.subtitle && (
                    <p className="text-lg text-deep-taupe/60 font-light italic">{category.subtitle}</p>
                  )}
                </div>

                {/* Regular Services */}
                {category.services && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    {category.services.map((service, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                        className="group"
                      >
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="flex-1">
                            <h4 className="font-heading text-lg md:text-xl text-deep-taupe group-hover:text-primary transition-colors">
                              {service.name}
                            </h4>
                            {service.duration && (
                              <p className="text-sm text-deep-taupe/50 mt-1">{service.duration}</p>
                            )}
                          </div>
                          <p className="font-heading text-lg md:text-xl text-accent-gold whitespace-nowrap ml-4">
                            {service.price}
                          </p>
                        </div>
                        {service.description && (
                          <p className="text-base text-deep-taupe/70 font-light leading-relaxed">
                            {service.description}
                          </p>
                        )}
                        
                        {/* Subservices */}
                        {service.subservices && (
                          <div className="mt-6 ml-4 space-y-4 border-l-2 border-blush-pink/30 pl-6">
                            {service.subservices.map((sub, subIdx) => (
                              <div key={subIdx}>
                                <div className="flex justify-between items-start gap-4">
                                  <p className="text-base text-deep-taupe/80">{sub.name}</p>
                                  <p className="font-heading text-base text-accent-gold whitespace-nowrap ml-4">{sub.price}</p>
                                </div>
                                {sub.duration && (
                                  <p className="text-sm text-deep-taupe/50 mt-1">{sub.duration}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Party Packages */}
                {category.packages && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    {category.packages.map((pkg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                        className="bg-blush-pink/5 p-8 md:p-10 rounded-lg border border-blush-pink/20 group hover:border-blush-pink/40 transition-colors"
                      >
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <h4 className="font-heading text-lg md:text-xl text-deep-taupe group-hover:text-primary transition-colors">
                            {pkg.name}
                          </h4>
                          <p className="font-heading text-lg text-accent-gold whitespace-nowrap ml-4">{pkg.price}</p>
                        </div>
                        <p className="text-base text-deep-taupe/70 font-light mb-6">{pkg.description}</p>
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-widest text-deep-taupe/50 font-medium">Includes:</p>
                          {pkg.includes.map((item, itemIdx) => (
                            <p key={itemIdx} className="text-sm text-deep-taupe/70 flex items-start gap-3">
                              <span className="text-accent-gold mt-1" aria-hidden="true">•</span>
                              <span>{item}</span>
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Bridal Experiences */}
                {category.isBridal && category.includes && (
                  <div className="bg-gradient-to-br from-blush-pink/10 to-sage-green/5 p-10 md:p-14 rounded-lg border border-blush-pink/30">
                    <p className="text-lg text-deep-taupe/80 font-light mb-8 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-deep-taupe/50 font-medium mb-4">Includes:</p>
                        <ul className="space-y-3">
                          {category.includes.map((item, idx) => (
                            <li key={idx} className="text-base text-deep-taupe/80 flex items-start gap-3">
                              <span className="text-accent-gold mt-1" aria-hidden="true">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {category.pricing && (
                        <div>
                          <p className="text-xs uppercase tracking-widest text-deep-taupe/50 font-medium mb-4">Pricing:</p>
                          <div className="space-y-4">
                            {category.pricing.map((price, idx) => (
                              <div key={idx} className="flex justify-between items-center">
                                <p className="text-base text-deep-taupe/80">{price.tier}</p>
                                <p className="font-heading text-lg text-accent-gold">{price.price}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bridal Details */}
                {category.isBridal && category.details && (
                  <div className="bg-deep-taupe/5 p-8 md:p-10 rounded-lg border border-deep-taupe/10 mt-8">
                    <p className="text-xs uppercase tracking-widest text-deep-taupe/50 font-medium mb-6">Booking Details:</p>
                    <ul className="space-y-3">
                      {category.details.map((detail, idx) => (
                        <li key={idx} className="text-base text-deep-taupe/80 flex items-start gap-3">
                          <span className="text-primary mt-1" aria-hidden="true">→</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIAL SECTION - Soft, Flowing Layout */}
      <section id="testimonials" className="py-32 md:py-48 px-6 bg-blush-pink/10 relative overflow-hidden" aria-label="Testimonials section - Hear from our satisfied clients">
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

      {/* 5. BOOKING SECTION (CRITICAL) - Split Layout, Functional */}
      <section id="booking" className="relative bg-ivory" aria-label="Booking section - Reserve your appointment">
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
                    <PopoverContent className="w-auto p-0 bg-ivory border-deep-taupe/10" align="start" side="top" sideOffset={8}>
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

      {/* 6. CONTACT SECTION - Elegant Footer Prelude */}
      <section id="contact" className="py-32 px-6 bg-deep-taupe text-ivory text-center relative overflow-hidden" aria-label="Contact section - Get in touch with us">
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
      </main>
    </div>
  );
}