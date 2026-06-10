import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { blogPosts } from '../../data/blog';

export default function BlogSEO() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // The first post serves as the featured hero layout at the top
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <section className="py-24 md:py-32 bg-charcoal border-b border-charcoal-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 text-center md:text-left">
          <motion.span 
            className="text-gold uppercase tracking-[0.25em] text-xs font-semibold block mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Insights & Strategy
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-white leading-tight tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Advisory Insights <br />
            <span className="italic font-light text-white/95">& Market Intelligence</span>
          </motion.h2>
        </div>

        {/* Featured Hero Layout (At the Top) */}
        {featuredPost && (
          <motion.div
            className="group cursor-pointer rounded-sm border border-white/5 bg-charcoal-light/10 hover:bg-charcoal-light/25 overflow-hidden shadow-2xl mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onMouseEnter={() => setHoveredCard(featuredPost.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Image Column */}
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[300px] overflow-hidden">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/50 to-transparent pointer-events-none" />
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-8 lg:p-12 space-y-6 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-widest uppercase font-semibold text-gold">
                <span className="px-2.5 py-1 bg-gold/10 border border-gold/20 rounded-full">{featuredPost.category}</span>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featuredPost.readTime}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight font-normal group-hover:text-gold transition-colors duration-300">
                {featuredPost.title}
              </h3>

              <p className="text-sm text-white/60 font-light leading-relaxed">
                {featuredPost.summary}
              </p>

              <div className="flex items-center gap-3 pt-2 text-xs text-white/40 font-light border-t border-white/5">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-gold" />By {featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
              </div>

              <div className="pt-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-white group-hover:text-gold transition-colors flex items-center gap-2">
                  <span>Read Full Advisory</span>
                  <motion.span
                    animate={{ x: hoveredCard === featuredPost.id ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </motion.span>
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Remaining Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {remainingPosts.map((post) => (
            <motion.div
              key={post.id}
              className="group cursor-pointer border border-white/5 hover:border-white/10 bg-charcoal-light/10 hover:bg-charcoal-light/25 rounded-sm overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-104"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-charcoal-dark/70 backdrop-blur-md border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-white/90">
                  {post.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/45 to-transparent pointer-events-none" />
              </div>

              {/* Content Panel */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[9px] tracking-widest uppercase font-semibold text-white/40">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-lg font-serif text-white font-normal leading-snug group-hover:text-gold transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-xs text-white/50 font-light leading-relaxed truncate-3-lines">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-white/40 font-light flex items-center gap-1"><User className="w-3.5 h-3.5 text-gold/60" />{post.author}</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white group-hover:text-gold transition-colors flex items-center gap-1.5">
                    <span>Read</span>
                    <motion.span
                      animate={{ x: hoveredCard === post.id ? 3 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </motion.span>
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
