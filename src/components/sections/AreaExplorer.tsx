'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, Car, CheckCircle2, ExternalLink, MapPinned, Users } from 'lucide-react';

type Area = {
  name: string; profile: string; price: string; yield: string; lifestyle: string;
  location: string; connectivity: string; propertyMix: string; bestFor: string; highlights: string[];
};

const areas: Area[] = [
  {
    name: 'Costa del Este',
    profile: 'Modern waterfront master-planned district with corporate towers, parks, schools, and high-rise residences.',
    price: '$2,500-$4,500 / m2', yield: '5-7%', lifestyle: 'Executive families, international schools, bayfront living',
    location: 'East Panama City, between the city core and Tocumen airport corridor.',
    connectivity: 'Direct Corredor Sur access with convenient links to the financial district and airport.',
    propertyMix: 'Ocean-view apartments, modern family towers, penthouses, and corporate rentals.',
    bestFor: 'Executives, families, long-term investors, and buyers prioritizing modern infrastructure.',
    highlights: ['Town Center Costa del Este', 'International schools', 'Corporate business district', 'Waterfront parks'],
  },
  {
    name: 'Santa Maria',
    profile: 'Private golf community with luxury towers, villas, resort amenities, and strong long-term ownership appeal.',
    price: '$3,200-$6,000 / m2', yield: '4-6%', lifestyle: 'Golf, privacy, embassies, premium family living',
    location: 'Gated enclave east of central Panama City, beside Costa del Este.',
    connectivity: 'Fast access to Corredor Sur, Costa del Este services, and the airport corridor.',
    propertyMix: 'Golf-front villas, branded residences, large family apartments, and premium new developments.',
    bestFor: 'Families, private wealth buyers, golfers, and long-horizon owner-occupiers.',
    highlights: ['Jack Nicklaus golf course', 'Gated community', 'Private schools nearby', 'Low-density luxury setting'],
  },
  {
    name: 'Avenida Balboa',
    profile: 'Iconic skyline corridor facing Cinta Costera and Panama Bay with strong rental demand.',
    price: '$2,200-$4,200 / m2', yield: '5-8%', lifestyle: 'Walkability, ocean views, city access',
    location: 'Central Panama City waterfront along Panama Bay and the Cinta Costera.',
    connectivity: 'Walkable connection to Bella Vista with quick routes toward Casco Viejo and the financial district.',
    propertyMix: 'High-rise condos, furnished rentals, ocean-view apartments, and city penthouses.',
    bestFor: 'Urban professionals, rental investors, part-time residents, and walkability-focused buyers.',
    highlights: ['Cinta Costera', 'Bayfront recreation', 'Central dining and services', 'Panoramic skyline views'],
  },
  {
    name: 'Punta Pacifica',
    profile: 'Established luxury high-rise zone near hospitals, malls, marinas, and the financial district.',
    price: '$2,800-$5,200 / m2', yield: '5-7%', lifestyle: 'Oceanfront condos, medical access, premium rentals',
    location: 'Pacific waterfront peninsula next to Punta Paitilla and San Francisco.',
    connectivity: 'Central access to the banking district, Corredor Sur, Multiplaza, and private healthcare.',
    propertyMix: 'Oceanfront towers, large condos, duplex penthouses, and branded residences.',
    bestFor: 'Medical-access buyers, executives, luxury renters, and investors seeking established inventory.',
    highlights: ['Pacific Ocean views', 'Punta Pacifica Hospital', 'Multiplaza nearby', 'Marina and island access'],
  },
  {
    name: 'Casco Viejo',
    profile: 'UNESCO heritage district with boutique hospitality, restaurants, nightlife, and scarce inventory.',
    price: '$3,500-$7,000 / m2', yield: '6-9%', lifestyle: 'Historic charm, short stays, culture',
    location: 'Historic peninsula southwest of the modern city center.',
    connectivity: 'Highly walkable inside the district with road links to Avenida Balboa and the Canal Zone.',
    propertyMix: 'Restored apartments, boutique lofts, heritage residences, and hospitality-oriented assets.',
    bestFor: 'Lifestyle buyers, boutique investors, culture-led stays, and scarce-asset collectors.',
    highlights: ['UNESCO heritage setting', 'Rooftop dining', 'Historic plazas', 'Boutique hospitality demand'],
  },
  {
    name: 'Buenaventura',
    profile: 'Beach resort community with villas, golf, marina access, and luxury second-home demand.',
    price: '$2,000-$4,800 / m2', yield: '4-7%', lifestyle: 'Beach club, weekend homes, resort amenities',
    location: 'Pacific beach coast near Río Hato, west of Panama City.',
    connectivity: 'Reached by the Pan-American Highway; suited to planned stays rather than a daily city commute.',
    propertyMix: 'Beach villas, resort apartments, golf residences, and large second homes.',
    bestFor: 'Second-home owners, beach lifestyle buyers, retirees, and resort-oriented investors.',
    highlights: ['Pacific beaches', 'Championship golf', 'Beach and sports clubs', 'Resort services'],
  },
];

export default function AreaExplorer() {
  const [selectedName, setSelectedName] = useState(areas[0].name);
  const detailRef = useRef<HTMLDivElement>(null);
  const selectedArea = areas.find((area) => area.name === selectedName) ?? areas[0];

  const selectArea = (name: string) => {
    setSelectedName(name);
    if (window.innerWidth < 768) {
      window.requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  };

  const listingsHref = `/buy?area=${encodeURIComponent(selectedArea.name)}`;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedArea.name}, Panama`)}`;

  return (
    <>
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Select a Panama neighborhood">
        {areas.map((area) => {
          const selected = area.name === selectedArea.name;
          return (
            <button key={area.name} type="button" aria-pressed={selected} onClick={() => selectArea(area.name)} className={`group p-6 text-left transition-all duration-300 ${selected ? 'border border-gold bg-gold/[0.07] shadow-[0_15px_45px_rgba(0,0,0,0.22)]' : 'border border-white/5 bg-charcoal-light/25 hover:-translate-y-1 hover:border-gold/35'}`}>
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-serif text-2xl text-white transition-colors group-hover:text-gold">{area.name}</h2>
                <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-gold bg-gold text-charcoal' : 'border-white/10 text-white/35'}`}>{selected ? <CheckCircle2 className="h-4 w-4" /> : <MapPinned className="h-3.5 w-3.5" />}</span>
              </div>
              <p className="mt-3 min-h-20 text-sm leading-relaxed text-white/55">{area.profile}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 border-y border-white/5 py-4">
                <div><span className="block text-[10px] uppercase tracking-widest text-white/35">Price / m2</span><strong className="mt-1 block text-sm font-semibold text-gold">{area.price}</strong></div>
                <div><span className="block text-[10px] uppercase tracking-widest text-white/35">Rental Yield</span><strong className="mt-1 block text-sm font-semibold text-gold">{area.yield}</strong></div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3"><p className="text-[10px] uppercase leading-relaxed tracking-widest text-white/45">{area.lifestyle}</p><ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${selected ? 'translate-x-1 text-gold' : 'text-white/30 group-hover:translate-x-1 group-hover:text-gold'}`} /></div>
            </button>
          );
        })}
      </div>

      <div ref={detailRef} className="scroll-mt-28 pt-10" aria-live="polite">
        <section className="overflow-hidden border border-gold/25 bg-charcoal-dark shadow-2xl" aria-labelledby="selected-area-name">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="relative overflow-hidden border-b border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.20),transparent_56%)] p-7 lg:border-b-0 lg:border-r lg:p-9">
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold">Selected Location</span>
              <h2 id="selected-area-name" className="mt-4 font-serif text-3xl text-white md:text-4xl">{selectedArea.name}</h2>
              <div className="mt-6 flex gap-3 text-sm leading-relaxed text-white/65"><MapPinned className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><p>{selectedArea.location}</p></div>
              <div className="mt-5 flex gap-3 text-sm leading-relaxed text-white/55"><Car className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><p>{selectedArea.connectivity}</p></div>
              <a href={mapHref} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-light">Open location in Maps <ExternalLink className="h-3.5 w-3.5" /></a>
            </div>
            <div className="p-7 lg:p-9">
              <div className="grid gap-7 md:grid-cols-2">
                <div><span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/35"><Building2 className="h-4 w-4 text-gold" />Typical property mix</span><p className="mt-3 text-sm leading-relaxed text-white/65">{selectedArea.propertyMix}</p></div>
                <div><span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/35"><Users className="h-4 w-4 text-gold" />Best suited for</span><p className="mt-3 text-sm leading-relaxed text-white/65">{selectedArea.bestFor}</p></div>
              </div>
              <div className="mt-8 border-t border-white/8 pt-7"><span className="text-[10px] font-semibold uppercase tracking-widest text-white/35">Location highlights</span><div className="mt-4 grid gap-3 sm:grid-cols-2">{selectedArea.highlights.map((highlight) => <span key={highlight} className="flex items-center gap-2 text-xs text-white/60"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-gold" />{highlight}</span>)}</div></div>
              <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-7 sm:flex-row">
                <Link href={listingsHref} className="inline-flex items-center justify-center gap-2 bg-gradient-gold px-6 py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal">View {selectedArea.name} properties <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/#property-match-heading" className="inline-flex items-center justify-center border border-white/15 px-6 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold">Ask for an area comparison</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-white/35">Indicative market ranges only. Availability, pricing, rental performance, and travel times vary by building, unit, traffic, season, and operating strategy.</p>
    </>
  );
}
