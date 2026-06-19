'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Grid, BedDouble, Bath, Square, ChevronDown, Check, ArrowRight, X } from 'lucide-react';
import Footer from './Footer';

interface Property {
  id: number;
  title: string;
  location: string;
  area: string;
  price: string;
  rawPrice: number;
  beds: number;
  baths: number;
  size: string;
  image: string;
  description?: string;
  detailUrl?: string;
  coordinates: { x: number; y: number }; // Percentage coordinates on mock vector map
}

type WasiPropertiesResponse = {
  status: string;
  type?: string;
  total: number;
  projects: Array<{
    id: number;
    title: string;
    location: string;
    area?: string;
    price: string;
    rawPrice: number;
    beds?: number;
    baths?: number;
    size?: string;
    image: string;
    description?: string;
    detailUrl?: string;
  }>;
};

export type PropertyExplorerProps = {
  /** Which Wasi listing pool to request. */
  listingType?: 'sale' | 'rent';
  /** Number of listings to request from the API. */
  take?: number;
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  /** Label shown in the live/backup status pill. */
  liveLabel?: string;
  backupLabel?: string;
};

function getMapCoordinates(index: number) {
  const coordinates = [
    { x: 55, y: 38 },
    { x: 72, y: 48 },
    { x: 42, y: 55 },
    { x: 28, y: 68 },
    { x: 15, y: 80 },
    { x: 80, y: 32 },
    { x: 62, y: 64 },
    { x: 35, y: 42 },
    { x: 47, y: 74 },
    { x: 68, y: 28 },
    { x: 22, y: 52 },
    { x: 88, y: 58 },
  ];

  return coordinates[index % coordinates.length];
}

const fallbackProperties: Property[] = [
  {
    id: 1,
    title: 'Ocean Reef Marina Penthouse',
    location: 'Ocean Reef Islands',
    area: 'Ocean Reef Islands',
    size: '580 m²',
    beds: 4,
    baths: 5.5,
    price: '$2,450,000',
    rawPrice: 2450000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 55, y: 38 }
  },
  {
    id: 2,
    title: 'Santa Maria Fairway Villa',
    location: 'Santa Maria Golf Club',
    area: 'Santa Maria',
    size: '720 m²',
    beds: 5,
    baths: 6,
    price: '$1,850,000',
    rawPrice: 1850000,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 72, y: 48 }
  },
  {
    id: 3,
    title: 'Punta Pacifica Oceanfront Duplex',
    location: 'Punta Pacifica, High-Rise',
    area: 'Punta Pacifica',
    size: '340 m²',
    beds: 3,
    baths: 3.5,
    price: '$890,000',
    rawPrice: 890000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 42, y: 55 }
  },
  {
    id: 4,
    title: 'Casco Viejo Historic Loft',
    location: 'Casco Viejo, Colonial District',
    area: 'Casco Viejo',
    size: '210 m²',
    beds: 2,
    baths: 2.5,
    price: '$620,000',
    rawPrice: 620000,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 28, y: 68 }
  },
  {
    id: 5,
    title: 'Buenaventura Exclusive Estate',
    location: 'Buenaventura Resort',
    area: 'Buenaventura',
    size: '650 m²',
    beds: 5,
    baths: 5.5,
    price: '$2,100,000',
    rawPrice: 2100000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 15, y: 80 }
  },
  {
    id: 6,
    title: 'Costa del Este Sky Villa',
    location: 'Costa del Este, Towers',
    area: 'Costa del Este',
    size: '420 m²',
    beds: 4,
    baths: 4.5,
    price: '$1,150,000',
    rawPrice: 1150000,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 80, y: 32 }
  }
];

export default function PropertyExplorer({
  listingType = 'sale',
  take = 12,
  eyebrow,
  titleTop,
  titleBottom,
  description,
  liveLabel = 'Live Wasi Listings',
  backupLabel = 'Curated Backup Listings',
}: PropertyExplorerProps) {
  const [liveProperties, setLiveProperties] = useState<Property[]>([]);
  const [isLoadingLiveProperties, setIsLoadingLiveProperties] = useState(true);
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [selectedBeds, setSelectedBeds] = useState('All Beds');
  const [showMapView, setShowMapView] = useState(false);
  const [activePropertyModal, setActivePropertyModal] = useState<Property | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Dropdown UI states
  const [activeFilter, setActiveFilter] = useState<'area' | 'price' | 'beds' | null>(null);

  const prices = ['All Prices', 'Under $750K', '$750K - $1.5M', '$1.5M - $3M', 'Over $3M'];
  const bedsOptions = ['All Beds', '2+ Beds', '3+ Beds', '4+ Beds', '5+ Beds'];

  useEffect(() => {
    let isMounted = true;

    async function loadLiveProperties() {
      try {
        const response = await fetch(`/api/wasi/properties?type=${listingType}&take=${take}`);
        const data = (await response.json()) as WasiPropertiesResponse;

        if (!response.ok || data.status !== 'success') {
          throw new Error('Unable to load live Wasi listings');
        }

        const mappedProperties = data.projects.map((project, index) => ({
          id: project.id,
          title: project.title,
          location: project.location,
          area: project.area || project.location || 'Panama',
          price: project.price,
          rawPrice: project.rawPrice,
          beds: project.beds ?? 0,
          baths: project.baths ?? 0,
          size: project.size || 'Upon request',
          image: project.image,
          description: project.description,
          detailUrl: project.detailUrl,
          coordinates: getMapCoordinates(index),
        }));

        if (isMounted) {
          setLiveProperties(mappedProperties);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setIsLoadingLiveProperties(false);
        }
      }
    }

    loadLiveProperties();

    return () => {
      isMounted = false;
    };
  }, [listingType, take]);

  const properties = liveProperties.length > 0 ? liveProperties : fallbackProperties;
  const areas = ['All Areas', ...Array.from(new Set(properties.map((property) => property.area).filter(Boolean)))];

  // Filtering Logic
  const filteredProperties = properties.filter(prop => {
    // Area filter
    if (selectedArea !== 'All Areas' && prop.area !== selectedArea) return false;

    // Price filter
    if (selectedPrice !== 'All Prices') {
      if (selectedPrice === 'Under $750K' && prop.rawPrice >= 750000) return false;
      if (selectedPrice === '$750K - $1.5M' && (prop.rawPrice < 750000 || prop.rawPrice > 1500000)) return false;
      if (selectedPrice === '$1.5M - $3M' && (prop.rawPrice < 1500000 || prop.rawPrice > 3000000)) return false;
      if (selectedPrice === 'Over $3M' && prop.rawPrice <= 3000000) return false;
    }

    // Beds filter
    if (selectedBeds !== 'All Beds') {
      const minBeds = parseInt(selectedBeds);
      if (prop.beds < minBeds) return false;
    }

    return true;
  });

  const toggleFilter = (type: 'area' | 'price' | 'beds') => {
    setActiveFilter(activeFilter === type ? null : type);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setActivePropertyModal(null);
      setFormSubmitted(false);
    }, 2500);
  };

  return (
    <div className="pt-28 min-h-screen bg-charcoal text-white font-sans flex flex-col justify-between">

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            className="text-gold uppercase tracking-[0.25em] text-xs font-semibold block mb-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-white leading-tight mb-4 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {titleTop} <br />
            <span className="italic font-light text-white/90">{titleBottom}</span>
          </motion.h1>
          <motion.p
            className="text-white/60 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {description}
          </motion.p>
          <motion.div
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span>{liveProperties.length > 0 ? `${liveProperties.length} ${liveLabel}` : isLoadingLiveProperties ? 'Loading Wasi Listings' : backupLabel}</span>
          </motion.div>
        </div>

        {/* Sticky Floating Filter Pill Bar */}
        <div className="sticky top-20 z-30 mb-12 max-w-4xl mx-auto px-4">
          <div className="glass-panel rounded-full px-6 py-2.5 shadow-2xl flex items-center justify-between gap-4 w-full flex-nowrap overflow-x-auto">
            <div className="flex items-center space-x-2 flex-grow">

              {/* Area Filter */}
              <div className="relative">
                <button
                  onClick={() => toggleFilter('area')}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-white/5 text-xs text-white font-medium transition-colors focus:outline-none cursor-pointer whitespace-nowrap"
                >
                  <span className="text-white/40 font-normal mr-1">Area:</span>
                  <span className="text-gold">{selectedArea}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                </button>
                <AnimatePresence>
                  {activeFilter === 'area' && (
                    <motion.div
                      className="absolute left-0 mt-3 w-56 rounded-sm glass-dropdown shadow-2xl z-50 overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="py-1">
                        {areas.map((area, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => { setSelectedArea(area); setActiveFilter(null); }}
                              className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide transition-colors flex items-center justify-between ${
                                selectedArea === area ? 'bg-gold/10 text-gold' : 'text-white/80 hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              <span>{area}</span>
                              {selectedArea === area && <Check className="w-3.5 h-3.5 text-gold" />}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <span className="text-white/10">|</span>

              {/* Price Filter */}
              <div className="relative">
                <button
                  onClick={() => toggleFilter('price')}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-white/5 text-xs text-white font-medium transition-colors focus:outline-none cursor-pointer whitespace-nowrap"
                >
                  <span className="text-white/40 font-normal mr-1">Budget:</span>
                  <span className="text-gold">{selectedPrice}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                </button>
                <AnimatePresence>
                  {activeFilter === 'price' && (
                    <motion.div
                      className="absolute left-0 mt-3 w-56 rounded-sm glass-dropdown shadow-2xl z-50 overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="py-1">
                        {prices.map((price, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => { setSelectedPrice(price); setActiveFilter(null); }}
                              className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide transition-colors flex items-center justify-between ${
                                selectedPrice === price ? 'bg-gold/10 text-gold' : 'text-white/80 hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              <span>{price}</span>
                              {selectedPrice === price && <Check className="w-3.5 h-3.5 text-gold" />}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <span className="text-white/10">|</span>

              {/* Beds Filter */}
              <div className="relative">
                <button
                  onClick={() => toggleFilter('beds')}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-white/5 text-xs text-white font-medium transition-colors focus:outline-none cursor-pointer whitespace-nowrap"
                >
                  <span className="text-white/40 font-normal mr-1">Beds:</span>
                  <span className="text-gold">{selectedBeds}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                </button>
                <AnimatePresence>
                  {activeFilter === 'beds' && (
                    <motion.div
                      className="absolute left-0 mt-3 w-56 rounded-sm glass-dropdown shadow-2xl z-50 overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="py-1">
                        {bedsOptions.map((beds, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => { setSelectedBeds(beds); setActiveFilter(null); }}
                              className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide transition-colors flex items-center justify-between ${
                                selectedBeds === beds ? 'bg-gold/10 text-gold' : 'text-white/80 hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              <span>{beds}</span>
                              {selectedBeds === beds && <Check className="w-3.5 h-3.5 text-gold" />}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* View Mode Toggle Button */}
            <button
              onClick={() => setShowMapView(!showMapView)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-gold hover:bg-gold-light text-charcoal rounded-full text-xs font-semibold tracking-wider transition-colors cursor-pointer shrink-0"
            >
              {showMapView ? <Grid className="w-3.5 h-3.5" /> : <Map className="w-3.5 h-3.5" />}
              <span>{showMapView ? 'Grid View' : 'Map View'}</span>
            </button>
          </div>
        </div>

        {/* Vector Map Preview Panel */}
        <AnimatePresence>
          {showMapView && (
            <motion.div
              className="w-full max-w-4xl mx-auto h-[420px] rounded-sm border border-white/5 bg-charcoal-light/40 backdrop-blur-md overflow-hidden relative mb-12 z-10 shadow-2xl"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 420, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Custom Vector Blueprint Map of Panama City waterfront using styled grids & SVGs */}
              <div className="absolute inset-0 bg-[#090909] opacity-40 z-0">
                <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
              </div>

              {/* Vector Coastlines and Sea representation */}
              <svg className="absolute inset-0 w-full h-full text-white/5 z-0" viewBox="0 0 800 400" preserveAspectRatio="none">
                {/* Coastal outline path */}
                <path d="M 0 100 Q 150 180 300 120 T 600 280 T 800 200 L 800 400 L 0 400 Z" fill="rgba(212,175,55,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                {/* Ocean Reef Island Circles */}
                <circle cx="440" cy="150" r="25" fill="none" stroke="rgba(212,175,55,0.07)" strokeWidth="1" />
                <circle cx="480" cy="160" r="18" fill="none" stroke="rgba(212,175,55,0.07)" strokeWidth="1" />
                <line x1="420" y1="180" x2="440" y2="150" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              </svg>

              {/* Ocean labeling */}
              <div className="absolute bottom-8 right-16 text-[10px] tracking-[0.3em] text-white/20 uppercase font-semibold select-none z-10">
                Pacific Ocean / Panama Bay
              </div>
              <div className="absolute top-8 left-8 text-[10px] tracking-[0.3em] text-white/20 uppercase font-semibold select-none z-10">
                Panama City Downtown
              </div>

              {/* Property Map Pins */}
              {filteredProperties.map(prop => (
                <div
                  key={prop.id}
                  className="absolute z-20 group"
                  style={{ left: `${prop.coordinates.x}%`, top: `${prop.coordinates.y}%` }}
                >
                  {/* Pulsating Pin */}
                  <div className="relative flex items-center justify-center cursor-pointer">
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-gold/30 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold border border-white/20" />
                  </div>

                  {/* Popover on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-charcoal-dark border border-white/10 rounded-sm py-2 px-3.5 shadow-2xl pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 w-48 z-30 backdrop-blur-md">
                    <h5 className="text-[10px] font-semibold text-white truncate">{prop.title}</h5>
                    <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/5">
                      <span className="text-[9px] uppercase tracking-wider text-white/40">{prop.area}</span>
                      <span className="text-[10px] font-semibold text-gold font-sans">{prop.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence>
            {filteredProperties.map(prop => (
              <motion.div
                key={prop.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group border border-white/5 hover:border-white/10 bg-charcoal-light/10 hover:bg-charcoal-light/25 rounded-sm overflow-hidden flex flex-col shadow-lg transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-charcoal-dark/70 backdrop-blur-md border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-white/90">
                    {prop.area}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/40 to-transparent pointer-events-none" />
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-gold font-serif text-xl md:text-2xl font-light block">
                      {prop.price}
                    </span>
                    <h3 className="text-white text-base md:text-lg font-serif font-normal tracking-wide group-hover:text-gold transition-colors duration-300">
                      {prop.title}
                    </h3>
                  </div>

                  {/* Structural Specs */}
                  <div className="flex items-center justify-between text-xs text-white/50 border-y border-white/5 py-3 font-light">
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-gold" />
                      <span>{prop.beds > 0 ? `${prop.beds} Beds` : 'Beds TBD'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-gold" />
                      <span>{prop.baths > 0 ? `${prop.baths} Baths` : 'Baths TBD'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Square className="w-3.5 h-3.5 text-gold" />
                      <span>{prop.size}</span>
                    </div>
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => setActivePropertyModal(prop)}
                    className="w-full py-3 border border-white/10 group-hover:border-gold hover:bg-gradient-gold hover:text-charcoal hover:font-bold text-[10px] tracking-widest uppercase font-semibold text-white/90 transition-all duration-300 rounded-sm cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Request Private Tour</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {prop.detailUrl && (
                    <a
                      href={prop.detailUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center text-[10px] font-semibold uppercase tracking-widest text-white/45 transition-colors hover:text-gold"
                    >
                      View Wasi Listing
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {filteredProperties.length === 0 && (
            <div className="col-span-full py-24 text-center border border-dashed border-white/10 rounded-sm">
              <span className="text-white/40 text-sm font-light uppercase tracking-widest">No listings match your selection criteria</span>
            </div>
          )}
        </div>

      </div>

      {/* Private Tour Form Modal */}
      <AnimatePresence>
        {activePropertyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-charcoal-dark/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePropertyModal(null)}
            />

            {/* Modal Dialog */}
            <motion.div
              className="relative bg-charcoal border border-white/10 rounded-sm w-full max-w-lg overflow-hidden shadow-2xl z-10"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setActivePropertyModal(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full border border-gold flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-xl font-serif text-white">Consultation Requested</h3>
                    <p className="text-white/50 text-xs leading-relaxed max-w-xs mx-auto">
                      Our Lead Investment Advisory team will contact you within the next 2 hours via email or WhatsApp to coordinate your tour.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-5">
                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-gold font-semibold block mb-1">Private Tour Registration</span>
                      <h3 className="text-xl font-serif text-white">{activePropertyModal.title}</h3>
                      <p className="text-white/40 text-xs mt-1">{activePropertyModal.location} • {activePropertyModal.price}</p>
                    </div>

                    {activePropertyModal.description && (
                      <p className="max-h-24 overflow-y-auto pr-2 text-xs leading-relaxed text-white/55">
                        {activePropertyModal.description}
                      </p>
                    )}
                    {activePropertyModal.detailUrl && (
                      <a
                        href={activePropertyModal.detailUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex text-[10px] font-semibold uppercase tracking-widest text-gold hover:text-gold-light"
                      >
                        Open original Wasi listing
                      </a>
                    )}

                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2.5 bg-charcoal-light text-white text-xs border border-white/5 rounded-sm focus:border-gold focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-1">Email Address</label>
                          <input
                            type="email"
                            required
                            className="w-full px-4 py-2.5 bg-charcoal-light text-white text-xs border border-white/5 rounded-sm focus:border-gold focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-1">Phone (WhatsApp)</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 / +507 ..."
                            className="w-full px-4 py-2.5 bg-charcoal-light text-white text-xs border border-white/5 rounded-sm focus:border-gold focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-1">Preferred Tour Date</label>
                          <input
                            type="date"
                            required
                            className="w-full px-4 py-2.5 bg-charcoal-light text-white text-xs border border-white/5 rounded-sm focus:border-gold focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-1">Tour Type</label>
                          <select className="w-full px-4 py-2.5 bg-charcoal-light text-white text-xs border border-white/5 rounded-sm focus:border-gold focus:outline-none transition-colors">
                            <option>In-Person Private Tour</option>
                            <option>Virtual Video Tour (WhatsApp/Zoom)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-gold text-charcoal font-bold text-xs tracking-widest uppercase transition-colors hover:bg-gold-light rounded-sm cursor-pointer shadow-lg mt-4"
                    >
                      Book Private Tour
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
