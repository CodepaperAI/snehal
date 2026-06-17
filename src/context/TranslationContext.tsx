'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

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
    relocation: 'Relocation',
    areas: 'Areas Guide',
    blog: 'Blog',
    about: 'About Us',
    cta: 'Schedule Consultation',
    heroTitle: 'Live, Invest & Grow in Panama',
    heroSubtitle: 'Trusted Real Estate & Investment Advisory for Families, Expats & Global Investors.',
    browse: 'Browse Properties',
    whatsapp: 'WhatsApp Us',
  },
  es: {
    home: 'Inicio',
    properties: 'Propiedades',
    buy: 'Comprar Propiedad',
    rent: 'Alquilar Propiedad',
    newProjects: 'Proyectos Nuevos',
    invest: 'Invertir en Panamá',
    relocation: 'Relocalización',
    areas: 'Guía de Áreas',
    blog: 'Blog',
    about: 'Sobre Nosotros',
    cta: 'Agendar Consulta',
    heroTitle: 'Viva, Invierta y Crezca en Panamá',
    heroSubtitle: 'Asesoría Inmobiliaria y de Inversión de Confianza para Familias, Expats e Inversores Globales.',
    browse: 'Ver Propiedades',
    whatsapp: 'Escríbanos',
  },
  pt: {
    home: 'Início',
    properties: 'Propriedades',
    buy: 'Comprar Imóvel',
    rent: 'Alugar Imóvel',
    newProjects: 'Novos Projetos',
    invest: 'Investir no Panamá',
    relocation: 'Relocalização',
    areas: 'Guia de Áreas',
    blog: 'Blog',
    about: 'Sobre Nós',
    cta: 'Agendar Consulta',
    heroTitle: 'Viva, Invista e Cresça no Panamá',
    heroSubtitle: 'Assessoria Imobiliária e de Investimento de Confiança para Famílias, Expats e Investidores Globais.',
    browse: 'Buscar Imóveis',
    whatsapp: 'Fale Conosco',
  },
  hi: {
    home: 'होम',
    properties: 'संपत्तियां',
    buy: 'संपत्ति खरीदें',
    rent: 'किराए पर लें',
    newProjects: 'नई परियोजनाएं',
    invest: 'पनामा में निवेश करें',
    relocation: 'स्थानांतरण मार्गदर्शन',
    areas: 'क्षेत्र गाइड',
    blog: 'ब्लॉग',
    about: 'हमारे बारे में',
    cta: 'परामर्श शेड्यूल करें',
    heroTitle: 'पनामा में जिएं, निवेश करें और बढ़ें',
    heroSubtitle: 'परिवारों, प्रवासियों और वैश्विक निवेशकों के लिए विश्वसनीय रियल एस्टेट और निवेश सलाहकार।',
    browse: 'संपत्तियाँ ब्राउज़ करें',
    whatsapp: 'व्हाट्सएप करें',
  }
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
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
