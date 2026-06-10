import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, Languages, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  origin: string;
}

export default function FounderProfile() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      quote: "Snehal's direct access to off-market inventory in Santa Maria and Ocean Reef was the key to our transaction. His understanding of corporate structures and residency visas made the relocation seamless for our family.",
      author: "Rajesh K. Singhania",
      role: "Founder & CEO, Apex Fintech",
      origin: "Mumbai, India to Panama City"
    },
    {
      quote: "As American retirees, navigating Panama's property registry felt daunting. Snehal's absolute transparency and legal connections gave us complete peace of mind. He is the ultimate professional.",
      author: "Dr. Charles & Sarah Miller",
      role: "Expat Homeowners",
      origin: "Austin, Texas to Playa Bonita"
    },
    {
      quote: "We partnered with Global Realty for our institutional portfolio entry. Snehal's developer-direct pricing with Empresas Bern saved us substantial capital. A flawless consulting experience.",
      author: "Alejandro G. Varela",
      role: "Managing Partner, LatAm Capital Group",
      origin: "Madrid, Spain"
    }
  ];

  const partnerLogos = [
    { name: 'Empresas Bern', text: 'EMPRESAS BERN' },
    { name: 'Santa Maria', text: 'SANTA MARIA' },
    { name: 'Ocean Reef Islands', text: 'OCEAN REEF' },
    { name: 'Panama Investment', text: 'PANAMA CAPITAL' },
    { name: 'Bern Development', text: 'BERN LUXURY' },
    { name: 'SJD Architects', text: 'SJD GLOBAL' }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="founder-profile" className="py-24 md:py-32 bg-charcoal-dark border-b border-charcoal-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Split Founder Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          
          {/* Left: Professional Portrait */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -inset-4 border border-gold/15 translate-x-3 translate-y-3 rounded-sm z-0 pointer-events-none" />
            
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-charcoal border border-white/10 shadow-2xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" 
                alt="Snehal Panchal - Founder of Global Realty Panama" 
                className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 ease-in-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/50 to-transparent pointer-events-none z-20" />
            </div>
          </motion.div>

          {/* Right: Biography */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <span className="text-gold uppercase tracking-[0.25em] text-xs font-semibold block">
              Founder Profile & Advisory
            </span>
            
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-white tracking-wide">
              Snehal Panchal <br />
              <span className="italic font-light text-white/60 text-2xl md:text-3xl block mt-2">Founder | Global Realty Panama</span>
            </h2>

            <div className="h-[1px] w-20 bg-gold/30 my-4" />

            <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">
              Snehal Panchal is an expert international investment advisor specializing in structuring real estate acquisitions in Panama. Serving as a direct bridge between local developer syndicates and global High-Net-Worth Individuals (HNWIs) and family offices, Snehal delivers bespoke, transparent, and legally optimized advisory.
            </p>

            <p className="text-sm text-white/50 font-light leading-relaxed">
              Prioritizing absolute transactional security, currency protection, and seamless relocation, Snehal’s advisory desk handles private property procurement, Qualified Investor Visa permanent residency compliance, and post-purchase asset management.
            </p>

            {/* Core Competencies Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
              <div className="space-y-2">
                <Languages className="w-5 h-5 text-gold" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Multilingual</h4>
                <p className="text-[11px] text-white/40 leading-relaxed font-light">Advising in fluent English, Español, Portuguese, and Hindi/Gujarati.</p>
              </div>
              <div className="space-y-2">
                <ShieldCheck className="w-5 h-5 text-gold" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Trust Signals</h4>
                <p className="text-[11px] text-white/40 leading-relaxed font-light">Escrow arrangements, verified public registry searches, and developer-direct rates.</p>
              </div>
              <div className="space-y-2">
                <Award className="w-5 h-5 text-gold" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Partner Network</h4>
                <p className="text-[11px] text-white/40 leading-relaxed font-light">Direct connections with Empresas Bern and Santa Maria planning desks.</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Client Testimonials Slider */}
        <div className="border-t border-charcoal-border pt-20 mt-20">
          <div className="max-w-3xl mx-auto text-center space-y-8 relative">
            <div className="flex justify-center text-gold/30">
              <Quote className="w-12 h-12 fill-current" />
            </div>

            <div className="min-h-[160px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-lg md:text-xl font-serif text-white/90 leading-relaxed font-light italic">
                    "{testimonials[activeIndex].quote}"
                  </p>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                      {testimonials[activeIndex].author}
                    </h4>
                    <p className="text-xs text-gold mt-1">
                      {testimonials[activeIndex].role} • <span className="text-white/40">{testimonials[activeIndex].origin}</span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center justify-center gap-6 pt-4">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-colors cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex space-x-1.5">
                {testimonials.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-5 bg-gold' : 'bg-white/20'}`}
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-colors cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Infinity Grayscale Marquee */}
        <div className="border-t border-charcoal-border pt-16 mt-20 overflow-hidden relative">
          <div className="text-center mb-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-semibold">Authorized Advisory Partner Network</span>
          </div>

          <div className="w-full overflow-hidden relative select-none py-4">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-[200%] gap-16 items-center animate-marquee whitespace-nowrap">
              {partnerLogos.map((logo, index) => (
                <div 
                  key={`l1-${index}`} 
                  className="flex-1 text-center font-serif text-white/20 hover:text-white/45 transition-colors text-sm md:text-base tracking-[0.3em] uppercase inline-block"
                >
                  {logo.text}
                </div>
              ))}
              {partnerLogos.map((logo, index) => (
                <div 
                  key={`l2-${index}`} 
                  className="flex-1 text-center font-serif text-white/20 hover:text-white/45 transition-colors text-sm md:text-base tracking-[0.3em] uppercase inline-block"
                >
                  {logo.text}
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes marqueeScroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-marquee {
              display: flex;
              animation: marqueeScroll 35s linear infinite;
            }
          `}</style>
        </div>

      </div>
    </section>
  );
}
