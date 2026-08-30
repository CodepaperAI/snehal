'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'en' | 'es' | 'pt' | 'hi';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    properties: 'Properties',
    buy: 'Buy Property',
    rent: 'Rent Property',
    newProjects: 'New Projects',
    invest: 'Invest in Panama',
    indianInvestors: 'Indian Investors',
    relocation: 'Relocation',
    areas: 'Areas Guide',
    blog: 'Blog',
    about: 'About Us',
    cta: 'Schedule Consultation',
    heroTitle: 'Live, Invest & Grow in Panama',
    heroTitleLead: 'Live, Invest & Grow',
    heroTitleAccent: 'in Panama',
    heroEyebrow: 'Global Realty Panama • Luxury Portfolio',
    heroSubtitle: "Trusted Real Estate & Investment Advisory for Families, Expats & Global Investors looking for high-yield assets and residency in Latin America's primary financial hub.",
    browse: 'Browse Properties',
    whatsapp: 'WhatsApp Us',
    selectArea: 'Select Area',
    allAreas: 'All Areas',
    budgetRange: 'Budget Range',
    anyBudget: 'Any Budget',
    propertyType: 'Property Type',
    search: 'Search',
    penthouse: 'Penthouse',
    oceanfrontVilla: 'Oceanfront Villa',
    luxuryCondo: 'Luxury Condo',
    privateEstate: 'Private Estate',
    lightTheme: 'Light theme',
    darkTheme: 'Dark theme',
  },
  es: {
    home: 'Inicio',
    properties: 'Propiedades',
    buy: 'Comprar Propiedad',
    rent: 'Alquilar Propiedad',
    newProjects: 'Proyectos Nuevos',
    invest: 'Invertir en Panamá',
    indianInvestors: 'Inversores de India',
    relocation: 'Relocalización',
    areas: 'Guía de Áreas',
    blog: 'Blog',
    about: 'Sobre Nosotros',
    cta: 'Agendar Consulta',
    heroTitle: 'Viva, Invierta y Crezca en Panamá',
    heroTitleLead: 'Viva, Invierta y Crezca',
    heroTitleAccent: 'en Panamá',
    heroEyebrow: 'Global Realty Panamá • Portafolio de Lujo',
    heroSubtitle: 'Asesoría inmobiliaria y de inversión de confianza para familias, expatriados e inversores globales que buscan activos de alto rendimiento y residencia en el principal centro financiero de América Latina.',
    browse: 'Ver Propiedades',
    whatsapp: 'Escríbanos',
    selectArea: 'Seleccionar Área',
    allAreas: 'Todas las Áreas',
    budgetRange: 'Rango de Presupuesto',
    anyBudget: 'Cualquier Presupuesto',
    propertyType: 'Tipo de Propiedad',
    search: 'Buscar',
    penthouse: 'Ático',
    oceanfrontVilla: 'Villa Frente al Mar',
    luxuryCondo: 'Condominio de Lujo',
    privateEstate: 'Residencia Privada',
    lightTheme: 'Tema claro',
    darkTheme: 'Tema oscuro',
  },
  pt: {
    home: 'Início',
    properties: 'Propriedades',
    buy: 'Comprar Imóvel',
    rent: 'Alugar Imóvel',
    newProjects: 'Novos Projetos',
    invest: 'Investir no Panamá',
    indianInvestors: 'Investidores Indianos',
    relocation: 'Relocalização',
    areas: 'Guia de Áreas',
    blog: 'Blog',
    about: 'Sobre Nós',
    cta: 'Agendar Consulta',
    heroTitle: 'Viva, Invista e Cresça no Panamá',
    heroTitleLead: 'Viva, Invista e Cresça',
    heroTitleAccent: 'no Panamá',
    heroEyebrow: 'Global Realty Panamá • Portfólio de Luxo',
    heroSubtitle: 'Assessoria imobiliária e de investimento confiável para famílias, expatriados e investidores globais que buscam ativos de alto rendimento e residência no principal centro financeiro da América Latina.',
    browse: 'Buscar Imóveis',
    whatsapp: 'Fale Conosco',
    selectArea: 'Selecionar Área',
    allAreas: 'Todas as Áreas',
    budgetRange: 'Faixa de Orçamento',
    anyBudget: 'Qualquer Orçamento',
    propertyType: 'Tipo de Imóvel',
    search: 'Buscar',
    penthouse: 'Cobertura',
    oceanfrontVilla: 'Villa à Beira-Mar',
    luxuryCondo: 'Condomínio de Luxo',
    privateEstate: 'Propriedade Privada',
    lightTheme: 'Tema claro',
    darkTheme: 'Tema escuro',
  },
  hi: {
    home: 'होम',
    properties: 'संपत्तियां',
    buy: 'संपत्ति खरीदें',
    rent: 'किराए पर लें',
    newProjects: 'नई परियोजनाएं',
    invest: 'पनामा में निवेश करें',
    indianInvestors: 'भारतीय निवेशक',
    relocation: 'स्थानांतरण मार्गदर्शन',
    areas: 'क्षेत्र गाइड',
    blog: 'ब्लॉग',
    about: 'हमारे बारे में',
    cta: 'परामर्श शेड्यूल करें',
    heroTitle: 'पनामा में जिएं, निवेश करें और बढ़ें',
    heroTitleLead: 'जिएं, निवेश करें और आगे बढ़ें',
    heroTitleAccent: 'पनामा में',
    heroEyebrow: 'ग्लोबल रियल्टी पनामा • लग्ज़री पोर्टफोलियो',
    heroSubtitle: 'लैटिन अमेरिका के प्रमुख वित्तीय केंद्र में उच्च-प्रतिफल वाली संपत्तियों और निवास की तलाश करने वाले परिवारों, प्रवासियों और वैश्विक निवेशकों के लिए विश्वसनीय रियल एस्टेट एवं निवेश परामर्श।',
    browse: 'संपत्तियाँ ब्राउज़ करें',
    whatsapp: 'व्हाट्सएप करें',
    selectArea: 'क्षेत्र चुनें',
    allAreas: 'सभी क्षेत्र',
    budgetRange: 'बजट सीमा',
    anyBudget: 'कोई भी बजट',
    propertyType: 'संपत्ति का प्रकार',
    search: 'खोजें',
    penthouse: 'पेंटहाउस',
    oceanfrontVilla: 'समुद्रतटीय विला',
    luxuryCondo: 'लग्ज़री कॉन्डो',
    privateEstate: 'निजी एस्टेट',
    lightTheme: 'लाइट थीम',
    darkTheme: 'डार्क थीम',
  }
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem('site-language');
    if (storedLanguage && ['en', 'es', 'pt', 'hi'].includes(storedLanguage)) {
      const frame = window.requestAnimationFrame(() => setLanguage(storedLanguage as Language));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('site-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((key: string) => translations[language][key] || translations.en[key] || key, [language]);
  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
