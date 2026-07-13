import Footer from '../../components/sections/Footer';

const areas = [
  {
    name: 'Costa del Este',
    profile: 'Modern waterfront master-planned district with corporate towers, parks, schools, and high-rise residences.',
    price: '$2,500-$4,500 / m2',
    yield: '5-7%',
    lifestyle: 'Executive families, international schools, bayfront living',
  },
  {
    name: 'Santa Maria',
    profile: 'Private golf community with luxury towers, villas, resort amenities, and strong long-term ownership appeal.',
    price: '$3,200-$6,000 / m2',
    yield: '4-6%',
    lifestyle: 'Golf, privacy, embassies, premium family living',
  },
  {
    name: 'Avenida Balboa',
    profile: 'Iconic skyline corridor facing Cinta Costera and Panama Bay with strong rental demand.',
    price: '$2,200-$4,200 / m2',
    yield: '5-8%',
    lifestyle: 'Walkability, ocean views, city access',
  },
  {
    name: 'Punta Pacifica',
    profile: 'Established luxury high-rise zone near hospitals, malls, marinas, and the financial district.',
    price: '$2,800-$5,200 / m2',
    yield: '5-7%',
    lifestyle: 'Oceanfront condos, medical access, premium rentals',
  },
  {
    name: 'Casco Viejo',
    profile: 'UNESCO heritage district with boutique hospitality, restaurants, nightlife, and scarce inventory.',
    price: '$3,500-$7,000 / m2',
    yield: '6-9%',
    lifestyle: 'Historic charm, short stays, culture',
  },
  {
    name: 'Buenaventura',
    profile: 'Beach resort community with villas, golf, marina access, and luxury second-home demand.',
    price: '$2,000-$4,800 / m2',
    yield: '4-7%',
    lifestyle: 'Beach club, weekend homes, resort amenities',
  },
];

export default function Areas() {
  return (
    <div className="pt-32 min-h-screen bg-charcoal flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <span className="text-gold uppercase tracking-[0.25em] text-xs font-semibold">Area Intelligence</span>
          <h1 className="mt-5 text-4xl md:text-6xl font-serif mb-6">Panama Neighborhoods Guide</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Lifestyle, pricing, rental yield, services, and investment context for Panama's highest-demand real estate communities.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {areas.map((area) => (
            <article key={area.name} className="border border-white/5 bg-charcoal-light/25 p-6 hover:border-gold/30 transition-colors">
              <h2 className="text-2xl font-serif text-white">{area.name}</h2>
              <p className="mt-3 min-h-20 text-sm leading-relaxed text-white/55">{area.profile}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 border-y border-white/5 py-4">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/35">Price / m2</span>
                  <strong className="mt-1 block text-sm font-semibold text-gold">{area.price}</strong>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/35">Rental Yield</span>
                  <strong className="mt-1 block text-sm font-semibold text-gold">{area.yield}</strong>
                </div>
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-white/45">{area.lifestyle}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 border border-gold/20 bg-gold/10 p-6">
          <h2 className="text-2xl font-serif text-white">Area Comparison Ready</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">
            These benchmarks give the site a stronger investor preview now. The next layer can connect each area card to live Wasi inventory and deeper school, hospital, commute, and ROI pages.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
