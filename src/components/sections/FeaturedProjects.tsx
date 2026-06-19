'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { premiumProjects, type Project } from '../../data/projects';

type FeaturedProjectsProps = {
  projects?: Project[];
};

export default function FeaturedProjects({ projects: liveProjects }: FeaturedProjectsProps) {
  const [activeCtaModal, setActiveCtaModal] = useState<{ project: Project; action: string } | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Display the first 4 premium developments on the home page
  const projects = (liveProjects && liveProjects.length > 0 ? liveProjects : premiumProjects).slice(0, 4);

  const handleCtaClick = (project: Project, action: string) => {
    if (action === 'Open Listing' && project.detailUrl) {
      window.open(project.detailUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    setActiveCtaModal({ project, action });
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // CRM Integration Stub:
    // console.log("Submitting lead data to CRM:", { project: activeCtaModal?.project.title, action: activeCtaModal?.action });
    setTimeout(() => {
      setActiveCtaModal(null);
      setFormSubmitted(false);
    }, 2500);
  };

  return (
    <section id="featured-projects" className="py-24 md:py-32 bg-charcoal-dark border-b border-charcoal-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.span 
            className="text-gold uppercase tracking-[0.25em] text-xs font-semibold block mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Curated Portfolio
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-white leading-tight tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Featured Premium <br />
            <span className="italic font-light text-white/95">Developments</span>
          </motion.h2>
        </div>

        {/* Staggered Portfolio Card Layout */}
        <div className="space-y-20 md:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onCtaClick={handleCtaClick}
            />
          ))}
        </div>

      </div>

      {/* Global Project Lead Capture Modal */}
      <AnimatePresence>
        {activeCtaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div 
              className="absolute inset-0 bg-charcoal-dark/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCtaModal(null)}
            />

            <motion.div 
              className="relative bg-charcoal border border-white/10 rounded-sm w-full max-w-md overflow-hidden shadow-2xl z-10"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                onClick={() => setActiveCtaModal(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full border border-gold flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-xl font-serif text-white">Advisory Request Submitted</h3>
                    <p className="text-white/50 text-xs leading-relaxed max-w-xs mx-auto">
                      Your interest in **{activeCtaModal.project.title}** has been registered. Snehal Panchal\'s desk will reach out via WhatsApp/Email shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div>
                      <span className="text-[9px] tracking-widest uppercase text-gold font-semibold block mb-1">
                        {activeCtaModal.action}
                      </span>
                      <h3 className="text-lg font-serif text-white">{activeCtaModal.project.title}</h3>
                      <p className="text-white/40 text-[10px] mt-0.5">Developer: {activeCtaModal.project.developer}</p>
                    </div>

                    <div className="space-y-3 pt-2 text-xs">
                      <div>
                        <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Your Full Name</label>
                        <input 
                          type="text" 
                          required 
                          className="w-full px-4 py-2.5 bg-charcoal-light text-white border border-white/5 rounded-sm focus:border-gold focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Email Address</label>
                        <input 
                          type="email" 
                          required 
                          className="w-full px-4 py-2.5 bg-charcoal-light text-white border border-white/5 rounded-sm focus:border-gold focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">WhatsApp Number</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+91 / +507 ..."
                          className="w-full px-4 py-2.5 bg-charcoal-light text-white border border-white/5 rounded-sm focus:border-gold focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="pt-1 flex items-center gap-2 text-[10px] text-white/50">
                        <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span>Includes private brochure and current price guide.</span>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-3 bg-gradient-gold text-charcoal font-bold text-xs tracking-widest uppercase hover:bg-gold-light transition-colors rounded-sm cursor-pointer shadow-lg mt-4"
                    >
                      Submit Request
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onCtaClick: (project: Project, action: string) => void;
}

function ProjectCard({ project, index, onCtaClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Alternate side layout on larger viewports
  const isImageLeft = index % 2 === 0;

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image Block */}
      <div 
        className={`lg:col-span-7 relative ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-charcoal border border-white/5 shadow-2xl">
          {/* Main Background Image */}
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Hover Overlay */}
          <motion.div 
            className="absolute inset-0 bg-charcoal-dark/75 backdrop-blur-[2px] flex flex-col justify-center items-center gap-4 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span 
              className="text-gold tracking-[0.2em] text-[10px] uppercase font-semibold"
              animate={{ y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              Starting From
            </motion.span>
            
            <motion.h4 
              className="text-white text-3xl font-serif font-light mb-2"
              animate={{ y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {project.price}
            </motion.h4>
            
            <motion.button 
              onClick={() => onCtaClick(project, project.cta1)}
              className="px-6 py-3 bg-gradient-gold hover:bg-gold-light text-charcoal text-[10px] tracking-widest font-semibold uppercase flex items-center gap-2 rounded-sm transition-colors cursor-pointer shadow-lg"
              animate={{ y: isHovered ? 0 : 15 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <span>{project.cta1}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/30 to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* Description Content Block */}
      <div className={`lg:col-span-5 space-y-5 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-widest uppercase font-semibold text-gold">
            {project.location}
          </span>
          <span className="text-[9px] text-white/30 uppercase tracking-widest font-semibold">• {project.developer}</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-serif font-normal text-white">
          {project.title}
        </h3>
        
        <p className="text-xs tracking-wide uppercase font-medium text-white/50">
          {project.tagline}
        </p>
        
        <p className="text-sm text-white/75 font-light leading-relaxed pt-2">
          {project.description}
        </p>
        
        {/* Double Conversion CTAs */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          <button 
            onClick={() => onCtaClick(project, project.cta1)}
            className="px-5 py-3 bg-gradient-gold hover:bg-gold-light text-charcoal text-[10px] tracking-widest font-bold uppercase transition-all duration-300 rounded-sm cursor-pointer shadow-md"
          >
            {project.cta1}
          </button>
          
          <button 
            onClick={() => onCtaClick(project, project.cta2)}
            className="px-5 py-3 bg-charcoal-light/40 hover:bg-charcoal-light/85 text-white border border-white/10 hover:border-gold/30 text-[10px] tracking-widest font-semibold uppercase transition-all duration-300 rounded-sm cursor-pointer shadow-md"
          >
            {project.cta2}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
