import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation, type Language } from '../../context/TranslationContext';

interface DropdownItem {
  labelKey: string;
  href: string;
  descriptionKey?: string;
}

interface NavSection {
  labelKey: string;
  items: DropdownItem[];
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Language switcher dropdown state
  const { language, setLanguage, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Bar Hooks
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Monitor scroll to trigger sticky background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close language switcher
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const langOptions: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
    { code: 'hi', label: 'हिन्दी' }
  ];

  const menuSections: { [key: string]: NavSection } = {
    properties: {
      labelKey: 'properties',
      items: [
        { labelKey: 'buy', href: '/buy' },
        { labelKey: 'rent', href: '/rent' },
        { labelKey: 'newProjects', href: '/new-projects' },
      ],
    },
    invest: {
      labelKey: 'invest',
      items: [
        { labelKey: 'invest', href: '/invest' },
        { labelKey: 'indianInvestors', href: '/indian-investors' },
      ],
    },
    relocation: {
      labelKey: 'relocation',
      items: [
        { labelKey: 'relocation', href: '/relocation' },
        { labelKey: 'areas', href: '/areas' },
      ],
    },
  };

  return (
    <>
      {/* Step 1.2: Gold Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gold z-50 origin-left"
        style={{ scaleX }}
      />

      <motion.header
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 bg-charcoal-dark/95 backdrop-blur-md border-b border-charcoal-border shadow-lg' 
            : 'py-6 bg-transparent border-b border-white/5'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col group cursor-pointer select-none">
            <span className="font-serif text-lg md:text-xl tracking-[0.2em] font-medium text-white group-hover:text-gold transition-colors duration-300">
              GLOBAL REALTY
            </span>
            <span className="text-[9px] tracking-[0.45em] text-gold uppercase -mt-0.5">
              Panama
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-8">
            <Link to="/" className="text-sm tracking-widest uppercase text-white/90 hover:text-gold transition-colors duration-300">
              {t('home')}
            </Link>

            {/* Properties Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('properties')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1.5 text-sm tracking-widest uppercase text-white/90 hover:text-gold transition-colors duration-300 focus:outline-none cursor-pointer py-2">
                <span>{t('properties')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'properties' ? 'rotate-180 text-gold' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'properties' && (
                  <motion.div 
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-60 p-4 rounded-sm glass-dropdown shadow-2xl z-50"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="space-y-3">
                      {menuSections.properties.items.map((item, idx) => (
                        <Link key={idx} to={item.href} className="block cursor-pointer py-1 group/item">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-white group-hover/item:text-gold transition-colors duration-200">
                            {t(item.labelKey)}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Invest Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('invest')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1.5 text-sm tracking-widest uppercase text-white/90 hover:text-gold transition-colors duration-300 focus:outline-none cursor-pointer py-2">
                <span>{t('invest')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'invest' ? 'rotate-180 text-gold' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'invest' && (
                  <motion.div 
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-60 p-4 rounded-sm glass-dropdown shadow-2xl z-50"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="space-y-3">
                      {menuSections.invest.items.map((item, idx) => (
                        <Link key={idx} to={item.href} className="block cursor-pointer py-1 group/item">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-white group-hover/item:text-gold transition-colors duration-200">
                            {t(item.labelKey)}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Relocation Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('relocation')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1.5 text-sm tracking-widest uppercase text-white/90 hover:text-gold transition-colors duration-300 focus:outline-none cursor-pointer py-2">
                <span>{t('relocation')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'relocation' ? 'rotate-180 text-gold' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'relocation' && (
                  <motion.div 
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-60 p-4 rounded-sm glass-dropdown shadow-2xl z-50"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="space-y-3">
                      {menuSections.relocation.items.map((item, idx) => (
                        <Link key={idx} to={item.href} className="block cursor-pointer py-1 group/item">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-white group-hover/item:text-gold transition-colors duration-200">
                            {t(item.labelKey)}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/blog" className="text-sm tracking-widest uppercase text-white/90 hover:text-gold transition-colors duration-300">
              {t('blog')}
            </Link>
            <Link to="/about" className="text-sm tracking-widest uppercase text-white/90 hover:text-gold transition-colors duration-300">
              {t('about')}
            </Link>
          </nav>

          {/* Right Section CTAs & Language Toggler */}
          <div className="hidden xl:flex items-center space-x-6">
            
            {/* Language Selector Dropdown */}
            <div ref={langDropdownRef} className="relative">
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-1 px-3 py-2 border border-white/10 hover:border-gold/30 rounded-sm text-xs font-semibold uppercase tracking-wider text-white/95 transition-colors cursor-pointer select-none"
              >
                <span className="text-white">{language}</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/40" />
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div 
                    className="absolute right-0 top-full mt-2 w-32 rounded-sm glass-dropdown shadow-2xl z-50 overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ul className="py-1">
                      {langOptions.map(opt => (
                        <li key={opt.code}>
                          <button
                            onClick={() => { setLanguage(opt.code); setLangOpen(false); }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${
                              language === opt.code ? 'bg-gold/10 text-gold' : 'text-white/80 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {opt.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/about"
              className="px-6 py-2.5 text-xs font-semibold tracking-widest uppercase border border-gold/45 text-gold hover:text-charcoal hover:bg-gold transition-all duration-300 rounded-sm cursor-pointer magnetic-btn relative overflow-hidden"
            >
              {t('cta')}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gold transition-colors duration-300 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-charcoal bg-opacity-98 flex flex-col pt-28 px-6 pb-8 overflow-y-auto w-full h-full"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Navigation links in drawer */}
            <div className="flex flex-col space-y-6 flex-grow">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-widest text-white hover:text-gold transition-colors border-b border-white/5 pb-2"
              >
                {t('home')}
              </Link>

              {/* Mobile Properties Category */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">{t('properties')}</span>
                <div className="pl-4 space-y-3 flex flex-col border-l border-gold/20">
                  <Link to="/buy" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 hover:text-gold transition-colors">
                    {t('buy')}
                  </Link>
                  <Link to="/rent" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 hover:text-gold transition-colors">
                    {t('rent')}
                  </Link>
                  <Link to="/new-projects" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 hover:text-gold transition-colors">
                    {t('newProjects')}
                  </Link>
                </div>
              </div>

              {/* Mobile Invest Category */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">{t('invest')}</span>
                <div className="pl-4 space-y-3 flex flex-col border-l border-gold/20">
                  <Link to="/invest" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 hover:text-gold transition-colors">
                    {t('invest')}
                  </Link>
                  <Link to="/indian-investors" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 hover:text-gold transition-colors">
                    {t('indianInvestors')}
                  </Link>
                </div>
              </div>

              {/* Mobile Relocation Category */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">{t('relocation')}</span>
                <div className="pl-4 space-y-3 flex flex-col border-l border-gold/20">
                  <Link to="/relocation" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 hover:text-gold transition-colors">
                    {t('relocation')}
                  </Link>
                  <Link to="/areas" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 hover:text-gold transition-colors">
                    {t('areas')}
                  </Link>
                </div>
              </div>

              <Link 
                to="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-widest text-white hover:text-gold transition-colors border-b border-white/5 pb-2 pt-2"
              >
                {t('blog')}
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-widest text-white hover:text-gold transition-colors border-b border-white/5 pb-2"
              >
                {t('about')}
              </Link>
            </div>

            {/* Mobile Footer Area inside Drawer */}
            <div className="mt-12 space-y-4">
              {/* Mobile Language Switcher */}
              <div className="flex justify-center space-x-4 border-b border-white/5 pb-4">
                {langOptions.map(opt => (
                  <button 
                    key={opt.code}
                    onClick={() => setLanguage(opt.code)}
                    className={`text-xs px-2.5 py-1.5 border rounded-sm font-semibold transition-colors uppercase ${
                      language === opt.code 
                        ? 'border-gold text-gold bg-gold/10' 
                        : 'border-white/5 text-white/50 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {opt.code}
                  </button>
                ))}
              </div>

              <Link 
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3.5 text-center text-xs font-semibold tracking-widest uppercase bg-gradient-gold text-charcoal hover:bg-gold-light transition-colors rounded-sm cursor-pointer"
              >
                {t('cta')}
              </Link>
              <div className="flex justify-center space-x-6 text-white/40 text-xs pt-4">
                <span>Panama City, Panama</span>
                <span>•</span>
                <span>English, Español, Português & हिन्दी</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
