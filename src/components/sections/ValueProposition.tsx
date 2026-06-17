'use client';

import { motion } from 'framer-motion';

export default function ValueProposition() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const metrics = [
    { value: '10+', label: 'Years of Expertise' },
    { value: '$50M+', label: 'Premium Assets Managed' },
    { value: '500+', label: 'Global Investors Advised' },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-charcoal border-b border-charcoal-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Asymmetrical Split-Screen Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left Column: Headline and Description */}
          <div className="lg:col-span-7 space-y-6">
            <motion.span 
              className="text-gold uppercase tracking-[0.25em] text-xs font-semibold block"
              variants={itemVariants}
            >
              Exclusive Advisory
            </motion.span>
            
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-white leading-[1.15] tracking-wide"
              variants={itemVariants}
            >
              Design your future <br />
              <span className="italic font-light text-white/90">in Panama.</span>
            </motion.h2>
            
            <motion.p 
              className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-2xl pt-2"
              variants={itemVariants}
            >
              We bridge the gap between global investors and Panama's most exclusive real estate opportunities. By combining international standard advisory with local market dominance, we curate high-yield acquisitions, oceanfront development portfolios, and permanent residency solutions for sophisticated families and private wealth.
            </motion.p>

            <motion.p 
              className="text-sm text-white/50 font-light leading-relaxed max-w-xl"
              variants={itemVariants}
            >
              Panama continues to serve as the economic anchor of the region—offering dollarized stability, territorial tax advantages, and world-class healthcare and education options. We ensure your market entry is secure, streamlined, and optimized for generational growth.
            </motion.p>
          </div>

          {/* Right Column: Luxury Penthouse Image */}
          <motion.div 
            className="lg:col-span-5 relative"
            variants={itemVariants}
          >
            {/* Elegant thin gold border behind the image */}
            <div className="absolute -inset-3 border border-gold/20 translate-x-2 translate-y-2 rounded-sm z-0 pointer-events-none" />
            
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-charcoal-light border border-white/10 shadow-2xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" 
                alt="Luxury Penthouse Living Room in Panama City" 
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000 ease-in-out hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/40 to-transparent z-20 pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Metrics Strip */}
        <motion.div 
          className="border-t border-charcoal-border pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl md:text-5xl font-serif font-light text-gradient-gold">
                {metric.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/60 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
