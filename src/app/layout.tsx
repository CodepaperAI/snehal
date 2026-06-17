import type { Metadata, Viewport } from 'next';
import './globals.css';
import { TranslationProvider } from '../context/TranslationContext';
import Header from '../components/sections/Header';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'Global Realty Panama | Luxury Real Estate & Private Investment Advisory',
  description: 'Trusted Real Estate & Investment Advisory for Families, Expats & Global Investors.',
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
  return (
    <html lang="en">
      <body>
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
