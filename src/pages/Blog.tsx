import BlogSEO from '../components/sections/BlogSEO';
import Footer from '../components/sections/Footer';

export default function Blog() {
  return (
    <div className="pt-16 min-h-screen bg-charcoal flex flex-col justify-between">
      {/* Blog & SEO Grid Section */}
      <BlogSEO />
      
      <Footer />
    </div>
  );
}
