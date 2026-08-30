import AreaExplorer from '../../components/sections/AreaExplorer';
import Footer from '../../components/sections/Footer';

export default function Areas() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-charcoal pt-32">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Area Intelligence</span>
          <h1 className="mb-6 mt-5 font-serif text-4xl md:text-6xl">Panama Neighborhoods Guide</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/60">
            Select a location to compare lifestyle, connectivity, property types, nearby anchors, pricing, and investment context across Panama&apos;s highest-demand communities.
          </p>
        </div>
        <AreaExplorer />
      </div>
      <Footer />
    </div>
  );
}
