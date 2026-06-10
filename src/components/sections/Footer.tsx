import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our private portfolio updates.');
  };

  return (
    <footer className="bg-charcoal-dark border-t border-charcoal-border pt-20 pb-12 text-white/70 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
        
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-6">
          <a href="#" className="flex flex-col group w-max">
            <span className="font-serif text-lg md:text-xl tracking-[0.2em] font-medium text-white group-hover:text-gold transition-colors duration-300">
              GLOBAL REALTY
            </span>
            <span className="text-[9px] tracking-[0.45em] text-gold uppercase -mt-0.5">
              Panama
            </span>
          </a>
          <p className="text-sm font-light leading-relaxed max-w-sm text-white/50">
            Trusted Real Estate & Investment Advisory curating high-yield assets, oceanfront penthouses, and permanent residency programs for global wealth.
          </p>
          <div className="space-y-3.5 pt-2 text-sm font-light">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Santa Maria Office, Tower 200, Panama City</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold flex-shrink-0" />
              <span>+507 6000 0000</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold flex-shrink-0" />
              <span>advisory@globalrealtypanama.com</span>
            </div>
          </div>
        </div>

        {/* Links Column 1: Properties */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white text-xs uppercase tracking-widest font-semibold border-l border-gold pl-3">
            Properties
          </h4>
          <ul className="space-y-2.5 text-sm font-light pl-3">
            <li><a href="/buy" className="hover:text-gold transition-colors duration-250">Buy Property</a></li>
            <li><a href="/rent" className="hover:text-gold transition-colors duration-250">Rent Property</a></li>
            <li><a href="/new-projects" className="hover:text-gold transition-colors duration-250">New Projects</a></li>
            <li><a href="/areas" className="hover:text-gold transition-colors duration-250">Areas Guide</a></li>
          </ul>
        </div>

        {/* Links Column 2: Investment */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-white text-xs uppercase tracking-widest font-semibold border-l border-gold pl-3">
            Advisory Paths
          </h4>
          <ul className="space-y-2.5 text-sm font-light pl-3">
            <li><a href="/invest" className="hover:text-gold transition-colors duration-250">Invest in Panama</a></li>
            <li><a href="/indian-investors" className="hover:text-gold transition-colors duration-250">For Indian Investors</a></li>
            <li><a href="/relocation" className="hover:text-gold transition-colors duration-250">Expat & Family Relocation</a></li>
            <li><a href="/about" className="hover:text-gold transition-colors duration-250">About Our Network</a></li>
          </ul>
        </div>

        {/* Newsletter Signup Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-white text-xs uppercase tracking-widest font-semibold border-l border-gold pl-3">
            Private Portfolio
          </h4>
          <p className="text-sm font-light text-white/50 pl-3 leading-relaxed">
            Get exclusive access to off-market listings, pre-construction drops, and residency law updates.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2.5 pl-3 pt-2">
            <input 
              type="email" 
              required
              placeholder="Your email address" 
              className="w-full px-4 py-3 bg-charcoal text-white text-xs rounded-sm border border-white/10 focus:border-gold focus:outline-none transition-colors"
            />
            <button 
              type="submit"
              className="w-full py-3 bg-gradient-gold hover:bg-gold-light text-charcoal text-[10px] tracking-widest font-bold uppercase transition-all duration-300 rounded-sm cursor-pointer shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 border-t border-charcoal-border pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-white/40">
        <div>
          © {new Date().getFullYear()} Global Realty Panama. All Rights Reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gold transition-colors" aria-label="Instagram">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="#" className="hover:text-gold transition-colors" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="#" className="hover:text-gold transition-colors" aria-label="Facebook">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
        </div>
        <div>
          Designed in accordance with Luzen Editorial DNA.
        </div>
      </div>
    </footer>
  );
}
