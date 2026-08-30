'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, Check, Calculator, Globe2, Landmark } from 'lucide-react';

const paths = [
  {
    value: 'Buy a home',
    title: 'Buy in Panama',
    copy: 'Primary residences, second homes, and private family estates.',
    icon: Building2,
  },
  {
    value: 'Invest',
    title: 'Invest for returns',
    copy: 'Yield-focused acquisitions, pre-construction, and portfolio strategy.',
    icon: Landmark,
  },
  {
    value: 'Relocate',
    title: 'Relocate your family',
    copy: 'Property, residency pathways, schools, healthcare, and settling in.',
    icon: Globe2,
  },
] as const;

export default function PropertyMatch() {
  const [intent, setIntent] = useState<(typeof paths)[number]['value']>('Buy a home');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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
          source: 'homepage-property-match',
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          action: intent,
          message: `Intent: ${intent}. Preferred area or requirements: ${formData.get('requirements') || 'Open to recommendations'}`,
        }),
      });

      if (!response.ok) throw new Error('Property match request failed');
      form.reset();
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="border-b border-charcoal-border bg-charcoal py-20 md:py-24" aria-labelledby="property-match-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Private Property Match</span>
            <h2 id="property-match-heading" className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
              Not sure where to <span className="italic font-light text-white/85">start?</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55">
              Tell us what brings you to Panama. Snehal&apos;s advisory desk will shortlist relevant properties and the right ownership or residency path for your goals.
            </p>

            <div className="mt-8 grid gap-3">
              {paths.map((path) => {
                const Icon = path.icon;
                const active = intent === path.value;
                return (
                  <button
                    key={path.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setIntent(path.value)}
                    className={`flex items-start gap-4 border p-4 text-left transition-colors ${active ? 'border-gold bg-gold/10' : 'border-white/8 bg-white/[0.02] hover:border-gold/40'}`}
                  >
                    <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border ${active ? 'border-gold text-gold' : 'border-white/10 text-white/45'}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <strong className="block font-serif text-lg font-normal text-white">{path.title}</strong>
                      <span className="mt-1 block text-xs leading-relaxed text-white/45">{path.copy}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border border-white/10 bg-charcoal-dark p-6 shadow-2xl md:p-8">
            {status === 'success' ? (
              <div className="flex min-h-[410px] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-gold/10 text-gold"><Check className="h-6 w-6" /></span>
                <h3 className="mt-5 font-serif text-2xl text-white">Your property match is underway</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">The advisory desk will review your goals and contact you with a focused shortlist.</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-[10px] font-semibold uppercase tracking-widest text-gold">Send another request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-gold">Selected advisory path</span>
                  <h3 className="mt-2 font-serif text-2xl text-white">{intent}</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" name="name" autoComplete="name" />
                  <Field label="WhatsApp number" name="phone" type="tel" autoComplete="tel" />
                </div>
                <Field label="Email address" name="email" type="email" autoComplete="email" />
                <label className="block text-[9px] font-semibold uppercase tracking-widest text-white/45">
                  Preferred area or requirements
                  <textarea name="requirements" rows={4} placeholder="Budget, bedrooms, timeline, preferred area..." className="mt-2 w-full resize-none border border-white/10 bg-charcoal px-4 py-3 text-sm normal-case leading-relaxed text-white outline-none transition-colors placeholder:text-white/25 focus:border-gold" />
                </label>
                {status === 'error' && <p className="text-xs text-red-300">We could not submit the request. Please use the WhatsApp button for immediate assistance.</p>}
                <button disabled={status === 'submitting'} type="submit" className="flex w-full items-center justify-center gap-2 bg-gradient-gold px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal disabled:opacity-60">
                  {status === 'submitting' ? 'Sending request...' : 'Get my property shortlist'} <ArrowRight className="h-4 w-4" />
                </button>
                <div className="flex flex-col gap-3 border-t border-white/8 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
                  <span>Planning an investment purchase?</span>
                  <Link href="/invest#calculators" className="inline-flex items-center gap-2 font-semibold uppercase tracking-wider text-gold hover:text-gold-light">
                    <Calculator className="h-3.5 w-3.5" /> Open investor calculators
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = 'text', autoComplete }: { label: string; name: string; type?: string; autoComplete?: string }) {
  return (
    <label className="block text-[9px] font-semibold uppercase tracking-widest text-white/45">
      {label}
      <input required name={name} type={type} autoComplete={autoComplete} className="mt-2 w-full border border-white/10 bg-charcoal px-4 py-3 text-sm normal-case text-white outline-none transition-colors focus:border-gold" />
    </label>
  );
}
