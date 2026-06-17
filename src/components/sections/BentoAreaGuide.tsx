'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, School, History, Compass } from 'lucide-react';

interface Area {
  id: number;
  name: string;
  badge: string;
  pricePerM2: string;
  rentalYield: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  gridClass: string;
}

export default function BentoAreaGuide() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const areas: Area[] = [
    {
      id: 1,
      name: 'Costa del Este',
      badge: 'High Rental Yield',
      pricePerM2: '$2,800 / m²',
      rentalYield: '7.8% ROI',
      description: 'Panama\'s master-planned corporate hub. Home to multinational HQs, wide boulevards, luxury oceanview towers, and high-quality walking infrastructure.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      icon: <DollarSign className="w-4 h-4 text-gold" />,
      gridClass: 'md:col-span-2 md:row-span-1'
    },
    {
      id: 2,
      name: 'Santa Maria',
      badge: 'Elite Schools',
      pricePerM2: '$3,200 / m²',
      rentalYield: '6.2% ROI',
      description: 'An exclusive gated country club enclave revolving around a signature Nicklaus golf course, featuring private lakes and top-tier international academies.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
      icon: <School className="w-4 h-4 text-gold" />,
      gridClass: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 3,
      name: 'Punta Pacifica',
      badge: 'Oceanfront Luxury',
      pricePerM2: '$3,500 / m²',
      rentalYield: '7.1% ROI',
      description: 'A high-density luxury skyline built right on the Pacific edge, featuring private marinas, a world-class John Hopkins affiliated hospital, and penthouse duplexes.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      icon: <Compass className="w-4 h-4 text-gold" />,
      gridClass: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 4,
      name: 'Casco Viejo',
      badge: 'Historic Charm',
      pricePerM2: '$4,200 / m²',
      rentalYield: '8.5% ROI',
      description: 'Panama\'s historic colonial district (UNESCO). Combining 17th-century Spanish architecture, rooftop lounges, Michelin-star dining, and restored boutique lofts.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      icon: <History className="w-4 h-4 text-gold" />,
      gridClass: 'md:col-span-2 md:row-span-1'
    }
  ];

  return (
    <section id="areas-guide" className="py-24 md:py-32 bg-charcoal border-b border-charcoal-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <motion.span 
            className="text-gold uppercase tracking-[0.25em] text-xs font-semibold block mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Neighborhood Directory
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-white leading-tight tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Explore Panama's <br />
            <span className="italic font-light text-white/95">Premier Neighborhoods</span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {areas.map((area) => (
            <motion.div
              key={area.id}
              className={`relative h-[320px] rounded-sm overflow-hidden border border-white/5 shadow-xl group cursor-pointer ${area.gridClass}`}
              onMouseEnter={() => setHoveredCard(area.id)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Background Image */}
              <img 
                src={area.image} 
                alt={area.name} 
                className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
              />

              {/* Default Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/40 to-charcoal-dark/10 z-10 transition-opacity duration-500" />

              {/* Initial Card Content (Visible by Default) */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end h-full">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-3 py-1 bg-gold/15 backdrop-blur-sm border border-gold/30 rounded-full text-[9px] uppercase tracking-widest text-gold font-semibold flex items-center gap-1.5">
                    {area.icon}
                    <span>{area.badge}</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-normal text-white group-hover:text-gold transition-colors duration-300">
                  {area.name}
                </h3>
              </div>

              {/* Quick Stats Overlay (Visible on Hover) */}
              <motion.div 
                className="absolute inset-0 bg-charcoal-dark/85 backdrop-blur-[4px] p-6 md:p-8 z-35 flex flex-col justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === area.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Top Stats */}
                <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">Average Price</span>
                    <span className="text-sm font-semibold text-white font-sans">{area.pricePerM2}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">Rental Yield</span>
                    <span className="text-sm font-semibold text-gold font-sans">{area.rentalYield}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-white/70 font-light leading-relaxed my-4">
                  {area.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-white hover:text-gold transition-colors">
                  <span>Explore Listings</span>
                  <motion.span
                    animate={{ x: hoveredCard === area.id ? 4 : 0 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
