// SEO Configuration for Backroad Beauty & Co.

export const SEO_CONFIG = {
  site: {
    name: 'Backroad Beauty & Co.',
    url: 'https://backroadbeautyandco.com',
    description: 'Luxury spa and self-care experience in Butler, Ohio. Head spa rituals, facials, massages, waxing, and bridal packages.',
    phone: '419-688-4000',
    email: 'Danielle@backroadbeautyandco.com',
    address: {
      streetAddress: '82 Main St',
      addressLocality: 'Butler',
      addressRegion: 'OH',
      postalCode: '44822',
      addressCountry: 'US'
    }
  },
  pages: {
    home: {
      title: 'Luxury Spa & Self-Care | Backroad Beauty & Co.',
      description: 'Modern rituals for the wild & polished. Premium spa treatments, head spa rituals, facials, and wellness services in Butler, Ohio.',
      path: '/'
    },
    accessibility: {
      title: 'Accessibility Statement | Backroad Beauty & Co.',
      description: 'Learn about our commitment to web accessibility and how to contact us with accessibility concerns.',
      path: '/accessibility'
    }
  }
};

// Structured Data Schemas
export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://backroadbeautyandco.com',
  name: 'Backroad Beauty & Co.',
  image: 'https://backroadbeautyandco.com/og-image.jpg',
  description: 'Luxury spa and self-care experience offering head spa rituals, facials, massages, waxing, and bridal packages.',
  url: 'https://backroadbeautyandco.com',
  telephone: '419-688-4000',
  email: 'Danielle@backroadbeautyandco.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '82 Main St',
    addressLocality: 'Butler',
    addressRegion: 'OH',
    postalCode: '44822',
    addressCountry: 'US'
  },
  priceRange: '$$',
  areaServed: {
    '@type': 'City',
    name: 'Butler, Ohio'
  },
  sameAs: [
    'https://www.facebook.com/backroadbeautyandco',
    'https://www.instagram.com/backroadbeautyandco'
  ]
});

export const getBeautySalonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  '@id': 'https://backroadbeautyandco.com',
  name: 'Backroad Beauty & Co.',
  url: 'https://backroadbeautyandco.com',
  telephone: '419-688-4000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '82 Main St',
    addressLocality: 'Butler',
    addressRegion: 'OH',
    postalCode: '44822',
    addressCountry: 'US'
  },
  description: 'Luxury boutique spa offering head spa rituals, facials, massages, waxing, and bridal packages.',
  image: 'https://backroadbeautyandco.com/og-image.jpg',
  priceRange: '$$',
  knowsAbout: [
    'Head Spa Rituals',
    'Facial Treatments',
    'Massage Therapy',
    'Waxing Services',
    'Lash Extensions',
    'Bridal Services'
  ]
});

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Backroad Beauty & Co.',
  url: 'https://backroadbeautyandco.com',
  logo: 'https://backroadbeautyandco.com/logo.png',
  description: 'Luxury spa and self-care experience in Butler, Ohio.',
  sameAs: [
    'https://www.facebook.com/backroadbeautyandco',
    'https://www.instagram.com/backroadbeautyandco'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '419-688-4000',
    email: 'Danielle@backroadbeautyandco.com'
  }
});

export const getFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does Backroad Beauty & Co. offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer luxury spa services including head spa rituals, facials, massages, waxing, lash extensions, bridal packages, and more.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I book an appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can book an appointment by filling out our online booking form or calling us at 419-688-4000.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is your location?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We are located at 82 Main St, Butler, OH 44822.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you offer bridal packages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We offer the Ride or Die Bridal Experience and VIP Bridal Experience packages for groups.'
      }
    }
  ]
});
