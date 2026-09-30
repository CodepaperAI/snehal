import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { TranslationProvider } from '../context/TranslationContext';
import Header from '../components/sections/Header';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';
import AnalyticsScripts from '../components/sections/AnalyticsScripts';
import ScrollToTop from '../components/ui/ScrollToTop';
import { ThemeProvider } from '../context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://snehal-zeta.vercel.app'),
  title: {
    default: 'Global Realty Panama | Luxury Real Estate & Private Investment Advisory',
    template: '%s | Global Realty Panama',
  },
  description: 'Luxury Panama real estate, live property search, relocation guidance, and private investment advisory for global buyers.',
  keywords: [
    'Panama real estate',
    'luxury Panama properties',
    'Panama investment property',
    'Costa del Este real estate',
    'Santa Maria Panama homes',
    'Panama relocation',
  ],
  openGraph: {
    title: 'Global Realty Panama',
    description: 'Luxury real estate and investment advisory in Panama.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Global Realty Panama',
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Global Realty Panama',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://snehal-zeta.vercel.app',
    areaServed: 'Panama',
    telephone: '+507 297-4765',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office 3536, 35th Floor, Tower Financial Center, Calle 50',
      addressLocality: 'Bella Vista, District of Panama',
      addressRegion: 'Panama Province',
      addressCountry: 'PA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+507 6708-2030',
      contactType: 'customer service',
    },
    serviceType: [
      'Luxury real estate advisory',
      'Property investment advisory',
      'Relocation support',
      'Rental and sales listings',
    ],
  };

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('site-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';document.documentElement.style.colorScheme=t==='light'?'light':'dark'}catch(e){}})()`,
          }}
        />
        <ScrollToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AnalyticsScripts />
        <ThemeProvider>
          <TranslationProvider>
          <div className="site-shell relative min-h-screen bg-charcoal text-white font-sans selection:bg-gold selection:text-charcoal">
            {/* Global Navigation Header */}
            <Header />
            
            <main>
              {children}
            </main>

            {/* Persistent Lead Conversion WhatsApp Button */}
            <FloatingWhatsApp />
          </div>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
