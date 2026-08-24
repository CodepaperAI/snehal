import type { Metadata, Viewport } from 'next';
import './globals.css';
import { TranslationProvider } from '../context/TranslationContext';
import Header from '../components/sections/Header';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';
import AnalyticsScripts from '../components/sections/AnalyticsScripts';
import ScrollToTop from '../components/ui/ScrollToTop';

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
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Panama City',
      addressCountry: 'PA',
    },
    serviceType: [
      'Luxury real estate advisory',
      'Property investment advisory',
      'Relocation support',
      'Rental and sales listings',
    ],
  };

  return (
    <html lang="en">
      <body>
        <ScrollToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AnalyticsScripts />
        <TranslationProvider>
          <div className="relative min-h-screen bg-charcoal text-white font-sans selection:bg-gold selection:text-charcoal">
            {/* Global Navigation Header */}
            <Header />
            
            <main>
              {children}
            </main>

            {/* Persistent Lead Conversion WhatsApp Button */}
            <FloatingWhatsApp />
          </div>
        </TranslationProvider>
      </body>
    </html>
  );
}
