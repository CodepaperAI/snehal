import Footer from '../../components/sections/Footer';

export default function NewProjects() {
  return (
    <div className="pt-32 min-h-screen bg-charcoal flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-serif mb-6">New Projects & Developments</h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Explore exclusive pre-construction opportunities with Panama's premier developers.
        </p>
        <div className="mt-12 p-8 border border-white/5 bg-charcoal-light/30 rounded-sm inline-block">
          <span className="text-gold uppercase tracking-widest text-xs font-semibold">New Projects Timeline & Magazine Coming Soon</span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
