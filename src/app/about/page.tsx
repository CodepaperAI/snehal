'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Network, PiggyBank, ArrowRight } from 'lucide-react';
import FounderProfile from '../../components/sections/FounderProfile';
import Footer from '../../components/sections/Footer';

export default function About() {
  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-gold" />,
      title: 'Registry & Legal Integrity',
      description: 'We conduct rigorous title background investigations, verify public registry liens, and handle direct corporate acquisitions to ensure absolute transaction security for foreign investors.'
    },
    {
      icon: <Network className="w-8 h-8 text-gold" />,
      title: 'Bespoke Builder Access',
      description: 'Our advisory network maintains direct desk links with Panama’s top developer syndicates, granting our clients immediate access to off-market blocks and pre-construction pricing guides.'
    },
    {
      icon: <PiggyBank className="w-8 h-8 text-gold" />,
      title: 'Tax & Escrow Optimization',
      description: 'We structure local corporations, facilitate Qualified Investor Visa residency setup, and coordinate bank escrow arrangements to protect foreign capital allocations.'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-charcoal text-white font-sans flex flex-col justify-between">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-16 md:py-24">
        <div className="max-w-4xl space-y-6">
          <motion.span 
            className="text-gold uppercase tracking-[0.25em] text-xs font-semibold block"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Philosophy
          </motion.span>
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal text-white leading-tight tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Bespoke Acquisitions <br />
            <span className="italic font-light text-white/65 font-serif">& Private Real Estate Advisory</span>
          </motion.h1>
          <motion.p 
            className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-2xl pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Global Realty Panama combines international investment standards with direct developer access to secure high-yield assets, branded residences, and residency benefits for private families and wealth.
          </motion.p>
        </div>

        {/* Core Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-16 md:pt-24 border-t border-charcoal-border mt-16 md:mt-24">
          {values.map((val, idx) => (
            <motion.div 
              key={idx}
              className="space-y-4 p-6 border border-white/5 bg-charcoal-light/10 rounded-sm hover:border-gold/25 transition-all duration-300 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div>{val.icon}</div>
              <h3 className="text-lg font-serif text-white font-normal">{val.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Founder Profile & Partner Logo Marquee Section */}
      <FounderProfile />

      {/* Consultation Callout CTA */}
      <section className="py-24 bg-charcoal overflow-hidden border-b border-charcoal-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div 
            className="relative glass-panel rounded-sm p-8 md:p-16 text-center max-w-4xl mx-auto border border-white/10 shadow-2xl flex flex-col items-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -inset-3 border border-gold/10 translate-x-1.5 translate-y-1.5 rounded-sm pointer-events-none -z-10" />
            
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">Private Consulting</span>
            <h3 className="text-3xl md:text-4xl font-serif text-white font-normal max-w-2xl leading-snug">
              Partner with Panama's <br className="hidden sm:inline" />
              <span className="italic text-white/95">Premier Real Estate Advisory Desk</span>
            </h3>
            <p className="text-white/60 text-xs md:text-sm font-light max-w-lg leading-relaxed">
              We structure custom property tours, coordinate direct legal residency compliance, and handle capital transfers with complete privacy.
            </p>
            <div className="pt-4 flex items-center justify-center">
              <a 
                href="https://wa.me/50760000000"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-gold hover:bg-gold-light text-charcoal text-[10px] tracking-widest font-bold uppercase transition-all duration-300 rounded-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
              >
                <span>Talk to an Advisor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expansive Footer */}
      <Footer />
    </div>
  );
}
