'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MapPin, DollarSign, Home } from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '50760000000';

  // Search dropdown states
  const [activeSearchDropdown, setActiveSearchDropdown] = useState<'area' | 'budget' | 'type' | null>(null);
  
  // Selected values
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [selectedBudget, setSelectedBudget] = useState('Any Budget');
  const [selectedType, setSelectedType] = useState('Property Type');

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveSearchDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const areas = ['All Areas', 'Santa Maria', 'Costa del Este', 'Punta Pacifica', 'Casco Viejo', 'Ocean Reef Islands'];
  const budgets = selectedType === 'Rent'
    ? ['Any Budget', 'Under $2K', '$2K - $4K', '$4K - $7.5K', '$7.5K+']
    : ['Any Budget', '$300K - $500K', '$500K - $1M', '$1M - $3M', '$3M - $5M', '$5M+'];
  const types = ['Property Type', 'Buy', 'Rent', 'New Projects', 'Penthouse', 'Oceanfront Villa', 'Luxury Condo', 'Private Estate'];

  const handleDropdownToggle = (type: 'area' | 'budget' | 'type') => {
    if (activeSearchDropdown === type) {
      setActiveSearchDropdown(null);
    } else {
      setActiveSearchDropdown(type);
    }
  };

  const handleSelect = (category: 'area' | 'budget' | 'type', value: string) => {
    if (category === 'area') setSelectedArea(value);
    if (category === 'budget') setSelectedBudget(value);
    if (category === 'type') {
      setSelectedType(value);
      setSelectedBudget('Any Budget');
    }
    setActiveSearchDropdown(null);
  };

  const handleSearch = () => {
    const target =
      selectedType === 'Rent'
        ? '/rent'
        : selectedType === 'New Projects'
          ? '/new-projects'
          : '/buy';
    const params = new URLSearchParams();

    if (selectedArea !== 'All Areas') params.set('area', selectedArea);
    if (selectedBudget !== 'Any Budget') params.set('budget', selectedBudget);
    if (!['Property Type', 'Buy', 'Rent', 'New Projects'].includes(selectedType)) {
      params.set('propertyType', selectedType);
    }

    router.push(`${target}${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <section className="relative flex min-h-[820px] w-full flex-col items-center justify-center overflow-hidden bg-charcoal py-28 sm:min-h-[780px] lg:min-h-screen lg:py-24">
      
      {/* Panama skyline hero supplied for the main landing experience. */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/hero-panama-skyline.webp"
          alt="Panama City skyline and historic waterfront at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-charcoal-dark/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.18)_0%,rgba(5,5,5,0.58)_76%,rgba(5,5,5,0.78)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/55 via-charcoal-dark/15 to-charcoal-dark/95" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 mx-auto mt-12 flex w-full max-w-5xl flex-col items-center px-6 text-center sm:mt-16">
        {/* Animated Subtitle */}
        <motion.span 
          className="text-gold uppercase tracking-[0.3em] text-[10px] sm:text-xs font-semibold mb-4 block"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          GLOBAL REALTY PANAMA • LUXURY PORTFOLIO
        </motion.span>

        {/* Headline */}
        <motion.h1 
          className="mb-6 max-w-4xl font-serif text-[2.7rem] font-normal leading-[1.08] tracking-[0.015em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.7)] sm:text-5xl md:text-7xl"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Live, Invest & Grow <br className="hidden sm:inline" />
          <span className="italic font-light text-white/95">in Panama</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          className="mb-8 max-w-2xl font-sans text-sm font-light leading-relaxed tracking-wide text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:text-base md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          Trusted Real Estate & Investment Advisory for Families, Expats & Global Investors looking for high-yield assets and residency in Latin America's primary financial hub.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          <a
            href="#featured-projects"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-gold text-charcoal hover:bg-gold-light text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
          >
            Browse Properties
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-charcoal-light/40 hover:bg-charcoal-light/70 text-white border border-white/10 hover:border-gold/30 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-sm shadow-xl flex items-center justify-center gap-2.5 hover:scale-[1.02] backdrop-blur-sm cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white hover:fill-gold transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.99 11.999.99c-5.437 0-9.862 4.37-9.866 9.8.001 2.019.538 3.992 1.554 5.75L2.68 20.2l4.008-.95c.002 0-.041.004-.041.004zM18.06 14.9c-.33-.165-1.953-.964-2.253-1.074-.3-.109-.518-.165-.736.165-.218.33-.846 1.074-1.037 1.293-.19.218-.38.245-.71.08-.33-.165-1.393-.513-2.653-1.637-.984-.877-1.648-1.96-1.84-2.29-.19-.33-.02-.508.145-.671.147-.146.33-.385.495-.578.165-.19.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.736-1.775-1.008-2.434-.265-.636-.53-.55-.736-.56-.19-.01-.408-.012-.625-.012-.218 0-.573.082-.873.407-.3.33-1.145 1.116-1.145 2.72 0 1.605 1.172 3.159 1.334 3.38.163.22 2.307 3.524 5.59 4.943.78.337 1.39.538 1.86.687.784.249 1.497.214 2.062.13.629-.094 1.953-.798 2.227-1.57.275-.77.275-1.43.193-1.57-.083-.14-.3-.22-.63-.385z"/>
            </svg>
            WhatsApp Us
          </a>
        </motion.div>

        {/* Smart Search Bar */}
        <motion.div 
          ref={dropdownRef}
          className="w-full max-w-4xl glass-panel shadow-2xl rounded-sm p-4 md:p-6 mb-8 flex flex-col md:flex-row items-center gap-4 text-left relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Dropdown 1: Area */}
          <div className="w-full md:w-1/3 relative border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
            <span className="text-[10px] uppercase tracking-widest text-white/50 block mb-1">
              Select Area
            </span>
            <button 
              onClick={() => handleDropdownToggle('area')}
              className="w-full flex items-center justify-between text-white font-medium hover:text-gold transition-colors focus:outline-none cursor-pointer py-1"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-sm truncate">{selectedArea}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${activeSearchDropdown === 'area' ? 'rotate-180 text-gold' : ''}`} />
            </button>

            <AnimatePresence>
              {activeSearchDropdown === 'area' && (
                <motion.div 
                  className="absolute left-0 right-0 top-full mt-3 rounded-sm glass-dropdown shadow-2xl z-50 overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="py-1">
                    {areas.map((area, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleSelect('area', area)}
                          className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide transition-colors ${
                            selectedArea === area ? 'bg-gold/10 text-gold' : 'text-white/80 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {area}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dropdown 2: Budget */}
          <div className="w-full md:w-1/3 relative border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:px-4">
            <span className="text-[10px] uppercase tracking-widest text-white/50 block mb-1">
              Budget Range
            </span>
            <button 
              onClick={() => handleDropdownToggle('budget')}
              className="w-full flex items-center justify-between text-white font-medium hover:text-gold transition-colors focus:outline-none cursor-pointer py-1"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gold" />
                <span className="text-sm truncate">{selectedBudget}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${activeSearchDropdown === 'budget' ? 'rotate-180 text-gold' : ''}`} />
            </button>

            <AnimatePresence>
              {activeSearchDropdown === 'budget' && (
                <motion.div 
                  className="absolute left-0 right-0 top-full mt-3 rounded-sm glass-dropdown shadow-2xl z-50 overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="py-1">
                    {budgets.map((budget, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleSelect('budget', budget)}
                          className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide transition-colors ${
                            selectedBudget === budget ? 'bg-gold/10 text-gold' : 'text-white/80 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {budget}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dropdown 3: Property Type */}
          <div className="w-full md:w-1/3 relative pb-2 md:pb-0 md:pl-4">
            <span className="text-[10px] uppercase tracking-widest text-white/50 block mb-1">
              Property Type
            </span>
            <button 
              onClick={() => handleDropdownToggle('type')}
              className="w-full flex items-center justify-between text-white font-medium hover:text-gold transition-colors focus:outline-none cursor-pointer py-1"
            >
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-gold" />
                <span className="text-sm truncate">{selectedType}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${activeSearchDropdown === 'type' ? 'rotate-180 text-gold' : ''}`} />
            </button>

            <AnimatePresence>
              {activeSearchDropdown === 'type' && (
                <motion.div 
                  className="absolute left-0 right-0 top-full mt-3 rounded-sm glass-dropdown shadow-2xl z-50 overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="py-1">
                    {types.map((type, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleSelect('type', type)}
                          className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide transition-colors ${
                            selectedType === type ? 'bg-gold/10 text-gold' : 'text-white/80 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search CTA Button */}
          <button 
            onClick={handleSearch}
            className="w-full md:w-auto px-6 py-4 bg-gradient-gold hover:bg-gold-light text-charcoal font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 rounded-sm shadow-lg transition-all duration-300 hover:scale-[1.03] cursor-pointer whitespace-nowrap self-stretch md:self-auto"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
