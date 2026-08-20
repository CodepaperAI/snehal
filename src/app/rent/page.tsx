import { Suspense } from 'react';
import PropertyExplorer from '../../components/sections/PropertyExplorer';

export default function RentProperty() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-charcoal" />}>
      <PropertyExplorer
        listingType="rent"
        eyebrow="Premium Rentals"
        titleTop="Luxury Residences"
        titleBottom="to Rent in Panama"
        description="Exclusive short and long-term luxury rentals in Panama's most sought-after neighborhoods. Filter by premier areas, budgets, or spaces."
        liveLabel="Live Wasi Rentals"
        backupLabel="Curated Backup Rentals"
      />
    </Suspense>
  );
}
