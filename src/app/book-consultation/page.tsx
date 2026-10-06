'use client';

import { FormEvent, useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, Clock, Phone } from 'lucide-react';

const consultationTypes = [
  'Property purchase consultation',
  'Investment strategy consultation',
  'Relocation consultation',
  'Private property viewing',
];

export default function BookConsultationPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const minimumDate = useMemo(
    () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Panama' }).format(new Date()),
    [],
  );

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const bookingForm = event.currentTarget;
    setStatus('submitting');
    const form = new FormData(bookingForm);
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'consultation-calendar',
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        tourDate: `${form.get('date')} at ${form.get('time')} (Panama time)`,
        tourType: form.get('consultationType'),
        message: form.get('message'),
        action: 'Schedule consultation',
      }),
    });

    setStatus(response.ok ? 'success' : 'error');
    if (response.ok) bookingForm.reset();
  }

  return (
    <main className="min-h-screen bg-charcoal px-6 pb-24 pt-40 text-white lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <section className="lg:sticky lg:top-36">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Private advisory</span>
          <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Schedule your consultation</h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/60">
            Select your preferred date and time. Our Panama advisory team will confirm the appointment and contact you directly.
          </p>
          <div className="mt-9 space-y-4 border-t border-white/10 pt-7 text-sm text-white/65">
            <p className="flex items-center gap-3"><Clock className="h-4 w-4 text-gold" /> Times are shown in Panama time (UTC−5).</p>
            <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold" /> Mobile / WhatsApp: +507 6708-2030</p>
            <p className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-gold" /> Appointments are confirmed by our advisory team.</p>
          </div>
        </section>

        <section className="border border-white/10 bg-charcoal-light/80 p-6 shadow-2xl sm:p-9">
          {status === 'success' ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="h-12 w-12 text-gold" />
              <h2 className="mt-6 font-serif text-3xl">Consultation requested</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/60">Thank you. Our advisory team will contact you to confirm your selected date and time.</p>
              <button type="button" onClick={() => setStatus('idle')} className="mt-8 border border-gold/50 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gold hover:bg-gold hover:text-charcoal">Schedule another</button>
            </div>
          ) : (
            <form onSubmit={submitBooking} className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" autoComplete="name" />
              <Field label="WhatsApp number" name="phone" type="tel" autoComplete="tel" />
              <div className="sm:col-span-2"><Field label="Email address" name="email" type="email" autoComplete="email" /></div>
              <label className="text-xs uppercase tracking-wider text-white/55">Preferred date
                <input required name="date" type="date" min={minimumDate} className="mt-2 w-full border border-white/10 bg-charcoal px-4 py-3.5 text-sm text-white outline-none focus:border-gold [color-scheme:dark]" />
              </label>
              <label className="text-xs uppercase tracking-wider text-white/55">Preferred time
                <input required name="time" type="time" min="08:00" max="18:00" step="1800" className="mt-2 w-full border border-white/10 bg-charcoal px-4 py-3.5 text-sm text-white outline-none focus:border-gold [color-scheme:dark]" />
              </label>
              <label className="text-xs uppercase tracking-wider text-white/55 sm:col-span-2">Consultation type
                <select required name="consultationType" className="mt-2 w-full border border-white/10 bg-charcoal px-4 py-3.5 text-sm normal-case text-white outline-none focus:border-gold">
                  {consultationTypes.map((type) => <option key={type}>{type}</option>)}
                </select>
              </label>
              <label className="text-xs uppercase tracking-wider text-white/55 sm:col-span-2">How can we help? <span className="normal-case text-white/30">(optional)</span>
                <textarea name="message" rows={4} className="mt-2 w-full resize-none border border-white/10 bg-charcoal px-4 py-3.5 text-sm normal-case text-white outline-none focus:border-gold" />
              </label>
              {status === 'error' && <p role="alert" className="text-sm text-red-300 sm:col-span-2">We could not submit your request. Please try again or contact us on WhatsApp.</p>}
              <button disabled={status === 'submitting'} className="bg-gradient-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-charcoal transition-opacity hover:opacity-90 disabled:opacity-60 sm:col-span-2">
                {status === 'submitting' ? 'Sending request…' : 'Request consultation'}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

function Field({ label, name, type = 'text', autoComplete }: { label: string; name: string; type?: string; autoComplete?: string }) {
  return (
    <label className="block text-xs uppercase tracking-wider text-white/55">{label}
      <input required name={name} type={type} autoComplete={autoComplete} className="mt-2 w-full border border-white/10 bg-charcoal px-4 py-3.5 text-sm normal-case text-white outline-none focus:border-gold" />
    </label>
  );
}
