'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bath, BedDouble, Check, MapPin, Maximize2 } from 'lucide-react';
import type { WasiListingProject } from '../../lib/wasi';

export default function PropertyDetailView({ property }: { property: WasiListingProject }) {
  const [activeImage, setActiveImage] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const images = property.images.length > 0 ? property.images : [property.image];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'internal-property-detail',
          name: formData.get('name'), email: formData.get('email'), phone: formData.get('phone'),
          property: property.title, action: 'Property inquiry',
          message: `${property.location} / ${property.price}. ${formData.get('message') || 'Requested full details and availability.'}`,
        }),
      });
      if (!response.ok) throw new Error('Inquiry submission failed');
      form.reset();
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-charcoal pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Link href="/buy" className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-gold"><ArrowLeft className="h-4 w-4" />Back to properties</Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-white/8 bg-charcoal-dark">
              <Image src={images[activeImage]} alt={`${property.title} — image ${activeImage + 1}`} fill unoptimized priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
              <span className="absolute left-5 top-5 border border-white/15 bg-charcoal-dark/80 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">{property.area}</span>
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                {images.slice(0, 12).map((image, index) => (
                  <button key={`${image}-${index}`} type="button" aria-label={`View property image ${index + 1}`} aria-pressed={activeImage === index} onClick={() => setActiveImage(index)} className={`relative aspect-square overflow-hidden border ${activeImage === index ? 'border-gold' : 'border-white/10 hover:border-gold/50'}`}>
                    <Image src={image} alt="" fill unoptimized sizes="120px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">Private property presentation</span>
            <h1 className="mt-4 font-serif text-3xl leading-tight text-white md:text-5xl">{property.title}</h1>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-white/55"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{property.location}</p>
            <p className="mt-6 font-serif text-3xl text-gold">{property.price}</p>
            <div className="mt-7 grid grid-cols-3 border-y border-white/8 py-5 text-xs text-white/55">
              <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-gold" />{property.beds > 0 ? `${property.beds} Beds` : 'Beds TBD'}</span>
              <span className="flex items-center gap-2"><Bath className="h-4 w-4 text-gold" />{property.baths > 0 ? `${property.baths} Baths` : 'Baths TBD'}</span>
              <span className="flex items-center gap-2"><Maximize2 className="h-4 w-4 text-gold" />{property.size}</span>
            </div>
            <div className="mt-7"><span className="text-[10px] font-semibold uppercase tracking-widest text-white/35">Property overview</span><p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/65">{property.description}</p></div>
          </aside>
        </div>

        <section className="mt-16 grid gap-8 border border-gold/20 bg-charcoal-dark p-7 md:p-9 lg:grid-cols-[0.75fr_1.25fr]" aria-labelledby="property-inquiry-heading">
          <div><span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">Private advisory</span><h2 id="property-inquiry-heading" className="mt-4 font-serif text-3xl text-white">Request availability and full details</h2><p className="mt-4 text-sm leading-relaxed text-white/50">Stay on Global Realty Panama while our advisory desk confirms current availability, developer terms, documentation, and viewing options.</p></div>
          {status === 'success' ? (
            <div className="flex min-h-56 flex-col items-center justify-center text-center"><span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-gold/10"><Check className="h-5 w-5 text-gold" /></span><h3 className="mt-4 font-serif text-xl">Inquiry received</h3><p className="mt-2 text-sm text-white/50">The advisory desk will contact you shortly.</p></div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" autoComplete="name" />
              <Field label="WhatsApp number" name="phone" type="tel" autoComplete="tel" />
              <div className="sm:col-span-2"><Field label="Email address" name="email" type="email" autoComplete="email" /></div>
              <label className="block text-[9px] font-semibold uppercase tracking-widest text-white/45 sm:col-span-2">Your question<textarea name="message" rows={4} className="mt-2 w-full resize-none border border-white/10 bg-charcoal px-4 py-3 text-sm normal-case leading-relaxed text-white outline-none focus:border-gold" /></label>
              {status === 'error' && <p className="text-xs text-red-300 sm:col-span-2">Unable to submit right now. Please use WhatsApp for immediate assistance.</p>}
              <button type="submit" disabled={status === 'submitting'} className="bg-gradient-gold px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal disabled:opacity-60 sm:col-span-2">{status === 'submitting' ? 'Sending...' : 'Request property details'}</button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

function Field({ label, name, type = 'text', autoComplete }: { label: string; name: string; type?: string; autoComplete?: string }) {
  return <label className="block text-[9px] font-semibold uppercase tracking-widest text-white/45">{label}<input required name={name} type={type} autoComplete={autoComplete} className="mt-2 w-full border border-white/10 bg-charcoal px-4 py-3 text-sm normal-case text-white outline-none focus:border-gold" /></label>;
}
