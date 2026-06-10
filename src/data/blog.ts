export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  image: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Best Areas to Live in Panama',
    slug: 'best-areas-to-live-in-panama',
    category: 'Lifestyle',
    readTime: '6 min read',
    date: 'June 08, 2026',
    author: 'Snehal Panchal',
    summary: 'An analytical comparison of Panama City’s top premium residential sectors. We review safety indexes, private schools, connectivity, and local amenities for Casco Viejo, Santa Maria, and Punta Pacifica.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Panama Real Estate for Americans',
    slug: 'panama-real-estate-for-americans',
    category: 'Relocation',
    readTime: '8 min read',
    date: 'May 28, 2026',
    author: 'Snehal Panchal',
    summary: 'A comprehensive guide for US citizens looking to acquire real estate in Panama. We detail currency hedges, Foreign Earned Income Exclusion (FEIE), double taxation treaties, and financing pathways.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Invest in Panama',
    slug: 'invest-in-panama',
    category: 'Investment',
    readTime: '7 min read',
    date: 'May 15, 2026',
    author: 'Snehal Panchal',
    summary: 'An overview of Panama’s macroeconomic indicators, territorial tax structures, and high-yield real estate sectors. Learn why Panama remains the financial anchor of Latin America.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Crypto Real Estate in Panama',
    slug: 'crypto-real-estate-in-panama',
    category: 'Fintech',
    readTime: '5 min read',
    date: 'April 30, 2026',
    author: 'Snehal Panchal',
    summary: 'Structuring real estate transactions using digital assets in Panama. A step-by-step review of legislative compliance, title transfers, escrow setups, and institutional fiat conversion.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Santa Maria vs Costa del Este',
    slug: 'santa-maria-vs-costa-del-este',
    category: 'Lifestyle',
    readTime: '9 min read',
    date: 'April 12, 2026',
    author: 'Snehal Panchal',
    summary: 'A direct side-by-side comparison of Panama’s two premier planned developments. We evaluate golf-course exclusivity, family parks, walkability, shopping, and price-per-square-meter projections.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Buying property in Panama as a foreigner',
    slug: 'buying-property-in-panama-as-a-foreigner',
    category: 'Legal',
    readTime: '7 min read',
    date: 'March 25, 2026',
    author: 'Snehal Panchal',
    summary: 'Demystifying the purchase process for international buyers. We cover public registry checks, promise to purchase agreements, closing costs, and title insurances.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    title: 'Best Condos for Families in Panama',
    slug: 'best-condos-for-families-in-panama',
    category: 'Lifestyle',
    readTime: '6 min read',
    date: 'March 10, 2026',
    author: 'Snehal Panchal',
    summary: 'Evaluating high-rise family amenities. We list developments that offer private play parks, multi-level swimming facilities, and immediate walking safety to international academies.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    title: 'Residency through investment in Panama',
    slug: 'residency-through-investment-in-panama',
    category: 'Legal',
    readTime: '8 min read',
    date: 'Feb 18, 2026',
    author: 'Snehal Panchal',
    summary: 'A walkthrough of the Panama Qualified Investor Visa program. Acquire permanent residency inside 30 days via a $300,000 unencumbered real estate acquisition.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  }
];
