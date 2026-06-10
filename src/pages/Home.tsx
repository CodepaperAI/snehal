import Hero from '../components/sections/Hero';
import ValueProposition from '../components/sections/ValueProposition';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import BentoAreaGuide from '../components/sections/BentoAreaGuide';
import FounderProfile from '../components/sections/FounderProfile';
import BlogSEO from '../components/sections/BlogSEO';
import Footer from '../components/sections/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <FeaturedProjects />
      <BentoAreaGuide />
      <FounderProfile />
      <BlogSEO />
      <Footer />
    </>
  );
}
