'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Bath, BedDouble, Check, Maximize2, X } from 'lucide-react';
import { premiumProjects, type Project } from '../../data/projects';

type FeaturedProject = Project & {
  area?: string;
  beds?: number;
  baths?: number;
  size?: string;
};

type FeaturedProjectsProps = { projects?: FeaturedProject[] };

export default function FeaturedProjects({ projects: liveProjects }: FeaturedProjectsProps) {
  const [activeProject, setActiveProject] = useState<FeaturedProject | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const projects = liveProjects?.length ? liveProjects : premiumProjects;
  const carouselProjects = projects.length > 1 ? [...projects, ...projects] : projects;

  const handleLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'new-listings-carousel',
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          property: activeProject?.title,
          action: 'Request Private Tour',
          message: `Developer: ${activeProject?.developer ?? 'Wasi listing'}`,
        }),
      });

      if (!response.ok) throw new Error('Lead submission failed');
      setFormSubmitted(true);
      window.setTimeout(() => {
        setActiveProject(null);
        setFormSubmitted(false);
      }, 2500);
    } catch (error) {
      console.error(error);
      setFormError('Unable to submit right now. Please use WhatsApp for the fastest response.');
    }
  };

  return (
    <section id="featured-projects" className="overflow-hidden border-b border-charcoal-border bg-charcoal-dark py-16 md:py-20">
      <div className="mx-auto mb-9 flex max-w-7xl items-end justify-between gap-6 px-6 lg:px-12">
        <div>
          <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Curated Portfolio</span>
          <h2 className="font-serif text-3xl font-normal tracking-wide text-white md:text-5xl">
            Featured Premium <span className="italic font-light text-white/95">Developments</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">Explore 10 of the newest Panama properties, updated directly from our live Wasi inventory.</p>
        </div>
        <a href="/buy" className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-light sm:flex">
          View all properties <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="new-listings-viewport group/carousel" aria-label="Featured premium developments carousel">
        <div className="new-listings-track flex w-max gap-5 px-6 lg:px-12">
          {carouselProjects.map((project, index) => (
            <ListingCard
              key={`${project.id}-${index}`}
              project={project}
              duplicate={index >= projects.length}
              onTour={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      <div className="mt-7 px-6 sm:hidden">
        <a href="/buy" className="flex items-center justify-center gap-2 border border-gold/40 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
          View all properties <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.button
              type="button"
              aria-label="Close consultation form"
              className="absolute inset-0 cursor-default bg-charcoal-dark/85 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
            />
            <motion.div className="relative z-10 w-full max-w-md overflow-hidden border border-white/10 bg-charcoal shadow-2xl" initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 20 }}>
              <button type="button" aria-label="Close" onClick={() => setActiveProject(null)} className="absolute right-4 top-4 text-white/50 transition-colors hover:text-white"><X className="h-5 w-5" /></button>
              <div className="p-7 md:p-8">
                {formSubmitted ? (
                  <div className="space-y-4 py-12 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-gold/10"><Check className="h-6 w-6 text-gold" /></div>
                    <h3 className="font-serif text-xl text-white">Tour Request Submitted</h3>
                    <p className="text-xs leading-relaxed text-white/50">Snehal Panchal&apos;s advisory desk will contact you shortly about {activeProject.title}.</p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div><span className="mb-1 block text-[9px] font-semibold uppercase tracking-widest text-gold">Request Private Tour</span><h3 className="font-serif text-xl text-white">{activeProject.title}</h3></div>
                    {['name', 'email', 'phone'].map((field) => (
                      <label key={field} className="block text-[9px] uppercase tracking-wider text-white/45">{field === 'phone' ? 'WhatsApp Number' : field === 'name' ? 'Your Full Name' : 'Email Address'}
                        <input name={field} type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} required className="mt-1.5 w-full border border-white/10 bg-charcoal-light px-4 py-3 text-xs normal-case text-white outline-none transition-colors focus:border-gold" />
                      </label>
                    ))}
                    {formError && <p className="text-xs text-red-300">{formError}</p>}
                    <button type="submit" className="mt-2 w-full bg-gradient-gold py-3 text-[10px] font-bold uppercase tracking-widest text-charcoal">Submit Request</button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .new-listings-track { animation: new-listings-scroll 52s linear infinite; }
        .new-listings-viewport:hover .new-listings-track,
        .new-listings-viewport:focus-within .new-listings-track { animation-play-state: paused; }
        @keyframes new-listings-scroll { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .new-listings-viewport { overflow-x: auto; scrollbar-width: thin; }
          .new-listings-track { animation: none; }
        }
      `}</style>
    </section>
  );
}

function ListingCard({ project, duplicate, onTour }: { project: FeaturedProject; duplicate: boolean; onTour: () => void }) {
  const location = project.area || project.location.split(',')[0];
  return (
    <article aria-hidden={duplicate || undefined} className="w-[82vw] max-w-[390px] shrink-0 overflow-hidden border border-white/10 bg-charcoal transition-colors hover:border-gold/45 sm:w-[370px]">
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-light">
        <Image src={project.image} alt={duplicate ? '' : project.title} fill unoptimized sizes="(max-width: 640px) 82vw, 370px" className="object-cover transition-transform duration-700 hover:scale-[1.04]" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-charcoal-dark/80 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">{location}</span>
      </div>
      <div className="p-6">
        <p className="font-serif text-2xl text-gold">{project.price}</p>
        <h3 className="mt-2 min-h-14 font-serif text-xl leading-snug text-white">{project.title}</h3>
        <div className="mt-5 flex min-h-8 items-center gap-5 border-y border-white/8 py-3 text-[11px] text-white/50">
          {project.beds ? <span className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5 text-gold" />{project.beds} Beds</span> : null}
          {project.baths ? <span className="flex items-center gap-1.5"><Bath className="h-3.5 w-3.5 text-gold" />{project.baths} Baths</span> : null}
          {project.size && project.size !== 'Upon request' ? <span className="flex items-center gap-1.5"><Maximize2 className="h-3.5 w-3.5 text-gold" />{project.size}</span> : null}
          {!project.beds && !project.baths && (!project.size || project.size === 'Upon request') ? <span>{project.tagline}</span> : null}
        </div>
        <button type="button" tabIndex={duplicate ? -1 : 0} onClick={onTour} className="mt-5 flex w-full items-center justify-center gap-2 border border-white/15 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-gold hover:text-gold">Request Private Tour <ArrowRight className="h-3.5 w-3.5" /></button>
      </div>
    </article>
  );
}
