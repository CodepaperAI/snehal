import PropertyExplorer from '../../components/sections/PropertyExplorer';

export default function NewProjects() {
  return (
    <PropertyExplorer
      listingType="sale"
      take={24}
      eyebrow="New Developments"
      titleTop="New Projects &"
      titleBottom="Pre-Construction in Panama"
      description="Explore exclusive pre-construction opportunities and the latest signature developments from Panama's premier developers."
      liveLabel="Live Wasi Projects"
      backupLabel="Curated Backup Projects"
    />
  );
}
