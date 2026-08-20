import { Suspense } from 'react';
import PropertyExplorer from '../../components/sections/PropertyExplorer';

export default function BuyProperty() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-charcoal" />}>
      <PropertyExplorer
        listingType="sale"
        eyebrow="Curated Estates"
        titleTop="Exclusive Portfolio"
        titleBottom="to Buy in Panama"
        description="Browse signature villas, custom waterfront penthouses, and private estates. Filter by premier areas, budgets, or spaces."
        liveLabel="Live Wasi Listings"
      />
    </Suspense>
  );
}
