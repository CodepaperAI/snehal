import Hero from '../components/sections/Hero';
import ValueProposition from '../components/sections/ValueProposition';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import BentoAreaGuide from '../components/sections/BentoAreaGuide';
import FounderProfile from '../components/sections/FounderProfile';
import BlogSEO from '../components/sections/BlogSEO';
import Footer from '../components/sections/Footer';
import { getFeaturedProjects } from '../lib/wasi';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      <ValueProposition />
      <BentoAreaGuide />
      <FounderProfile />
      <BlogSEO />
      <Footer />
    </>
  );
}
