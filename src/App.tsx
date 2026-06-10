import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/sections/Header';
import Home from './pages/Home';
import BuyProperty from './pages/BuyProperty';
import RentProperty from './pages/RentProperty';
import NewProjects from './pages/NewProjects';
import Invest from './pages/Invest';
import Relocation from './pages/Relocation';
import Areas from './pages/Areas';
import IndianInvestors from './pages/IndianInvestors';
import Blog from './pages/Blog';
import About from './pages/About';

// Step 1: Global context and conversion utilities
import { TranslationProvider } from './context/TranslationContext';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <TranslationProvider>
      <div className="relative min-h-screen bg-charcoal text-white font-sans selection:bg-gold selection:text-charcoal">
        {/* Reset Scroll position on navigation */}
        <ScrollToTop />
        
        {/* Step 1: Global Navigation Header */}
        <Header />
        
        <main>
          {/* Client-Side Routing Pages */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<BuyProperty />} />
            <Route path="/rent" element={<RentProperty />} />
            <Route path="/new-projects" element={<NewProjects />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/relocation" element={<Relocation />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/indian-investors" element={<IndianInvestors />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Persistent Lead Conversion WhatsApp Button */}
        <FloatingWhatsApp />
      </div>
    </TranslationProvider>
  );
}

export default App;
