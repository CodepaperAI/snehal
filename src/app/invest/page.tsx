import Footer from '../../components/sections/Footer';
import InvestorTools from '../../components/sections/InvestorTools';

export default function Invest() {
  return (
    <div className="pt-32 min-h-screen bg-charcoal flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <span className="text-gold uppercase tracking-[0.25em] text-xs font-semibold">Investor Center</span>
          <h1 className="mt-5 text-4xl md:text-6xl font-serif mb-6">Invest in Panama</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            High-yield real estate investments, relocation pathways, financing guidance, and due diligence support in Latin America's most strategic financial hub.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            ['Buying Guide', 'Step-by-step ownership, escrow, registry, and closing flow for foreign buyers.'],
            ['Visas & Residency', 'Friendly nations, qualified investor, pensionado, and family relocation pathways.'],
            ['Taxes & Financing', 'Property tax, transfer costs, bank financing, and closing-cost planning.'],
          ].map(([title, copy]) => (
            <div key={title} className="border border-white/5 bg-charcoal-light/25 p-6">
              <h2 className="text-xl font-serif text-white">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{copy}</p>
            </div>
          ))}
        </div>
      </div>
      <InvestorTools />
      <Footer />
    </div>
  );
}
