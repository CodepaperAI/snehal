export interface Project {
  id: number;
  title: string;
  location: string;
  tagline: string;
  price: string;
  rawPrice: number;
  description: string;
  image: string;
  developer: string;
  cta1: string;
  cta2: string;
}

export const premiumProjects: Project[] = [
  {
    id: 1,
    title: 'Ocean Reef Marina Residences',
    location: 'Ocean Reef Islands, Panama Bay',
    tagline: 'Private Man-Made Island Living & Yacht Club',
    price: '$1,350,000',
    rawPrice: 1350000,
    developer: 'Grupo Los Pueblos',
    description: 'The pinnacle of private island luxury in Central America. Located in the heart of Panama Bay, Ocean Reef consists of two man-made islands connected by a private marina. Offering custom estate lots, low-rise garden apartments, and luxury villas with absolute privacy, secure helipads, and yacht slips.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    cta1: 'Schedule Viewing',
    cta2: 'Request Investment Guide'
  },
  {
    id: 2,
    title: 'La Maison by Fendi Casa',
    location: 'Santa Maria Golf & Country Club',
    tagline: 'Ultra-Luxury Gated Golf Enclave',
    price: '$980,000',
    rawPrice: 980000,
    developer: 'GC Development',
    description: 'Situated in the highly coveted Santa Maria community, La Maison is a soaring branded residential skyscraper featuring interiors designed by Fendi Casa. Overlooking a signature Jack Nicklaus championship golf course, the tower offers full-floor apartments, private elevator entries, and five-star resort amenities.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    cta1: 'Schedule Viewing',
    cta2: 'Talk to Advisor'
  },
  {
    id: 3,
    title: 'Arcadia & Matisse Towers',
    location: 'Costa del Este Skyline',
    tagline: 'Premium Corporate Hub Living & High Rental Yields',
    price: '$520,000',
    rawPrice: 520000,
    developer: 'Empresas Bern',
    description: 'Matisse and Arcadia represent the gold standard of high-rise living in Costa del Este. Located walking distance to corporate headquarters of multinational giants, these projects offer high rental demand, oceanfront views, multi-level wellness spas, and structural design matching global luxury benchmarks.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    cta1: 'Schedule Viewing',
    cta2: 'Request Investment Guide'
  },
  {
    id: 4,
    title: 'Nogal & Pine Residences',
    location: 'Costa del Este Gated District',
    tagline: 'Empresas Bern Signature Architecture',
    price: '$420,000',
    rawPrice: 420000,
    developer: 'Empresas Bern',
    description: 'A showcase of Empresas Bern’s architectural mastery. Nogal merges organic elements with urban minimalism, offering boutique luxury residences, private co-working suites, private cinemas, and dynamic sky lounges optimized for modern international business operators.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    cta1: 'Free Consultation',
    cta2: 'Talk to Advisor'
  },
  {
    id: 5,
    title: 'The Westin Casa Bonita Residences',
    location: 'Playa Bonita, Beachfront',
    tagline: 'Oceanfront Branded Residences & Resort Access',
    price: '$490,000',
    rawPrice: 490000,
    developer: 'Empresas Bern / Westin',
    description: 'Offering private resort living just 15 minutes from Panama City. The Westin Casa Bonita residences boast panoramic ocean views overlooking the Panama Canal entrance, private beach club access, fractional ownership programs, and professional property management for passive investors.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    cta1: 'Schedule Viewing',
    cta2: 'Request Investment Guide'
  },
  {
    id: 6,
    title: 'JW Marriott Luxury Tower Penthouses',
    location: 'Punta Pacifica Waterfront',
    tagline: 'Iconic Oceanfront Sail Spire Penthouses',
    price: '$1,150,000',
    rawPrice: 1150000,
    developer: 'Newland International Properties',
    description: 'Set inside the iconic sail-shaped skyscraper in Punta Pacifica (formerly Trump Ocean Club). These premier penthouses offer 360-degree views of the skyline and ocean, full access to the JW Marriott hotel spa, multiple infinity pools, fine dining terraces, and an integrated private casino.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
    cta1: 'Schedule Viewing',
    cta2: 'Talk to Advisor'
  },
  {
    id: 7,
    title: 'Casco Viejo Historic Restorations',
    location: 'Casco Viejo, UNESCO District',
    tagline: 'Restored Colonial Heritage Condominiums',
    price: '$680,000',
    rawPrice: 680000,
    developer: 'Conservatorio S.A. / Private Syndicates',
    description: 'Unique boutique apartments set behind beautifully preserved 17th-century Spanish colonial facades. Located in Panama City\'s historical cultural heart, featuring private rooftop gardens, exposed brickwork, internal courtyards, and immediate adjacency to Michelin restaurants and diplomatic residences.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    cta1: 'Free Consultation',
    cta2: 'Request Investment Guide'
  },
  {
    id: 8,
    title: 'The Ritz-Carlton Reserve Residences',
    location: 'Pearl Islands Archipelago',
    tagline: 'Branded Island Estate Sanctuary',
    price: '$3,800,000',
    rawPrice: 3800000,
    developer: 'Ritz-Carlton Development Group',
    description: 'A highly limited collection of branded residences on a private island reserve. Designed by award-winning architects, these carbon-neutral villas feature private infinity pools, open-concept pavilions, private beach coves, and signature five-star Ritz-Carlton hospitality services.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    cta1: 'Schedule Viewing',
    cta2: 'Talk to Advisor'
  }
];
