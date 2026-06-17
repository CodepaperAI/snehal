import Footer from '../../components/sections/Footer';

export default function RentProperty() {
  return (
    <div className="pt-32 min-h-screen bg-charcoal flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-serif mb-6">Rent Premium Properties</h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Exclusive short and long-term luxury rentals in Panama's most sought-after neighborhoods.
        </p>
        <div className="mt-12 p-8 border border-white/5 bg-charcoal-light/30 rounded-sm inline-block">
          <span className="text-gold uppercase tracking-widest text-xs font-semibold">Rentals Directory Coming Soon</span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
