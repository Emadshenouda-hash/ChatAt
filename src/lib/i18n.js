import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation JSON objects
import enTranslations from '../locales/en/common.json';
import arTranslations from '../locales/ar/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    // Next.js will provide the language via routing, so we don't set it here directly.
    // i18next will pick up the language from the context provided by Next.js.
    // If no language is detected (e.g., on initial load before routing is fully processed),
    // it will fall back to the defaultLocale defined in next.config.js.
    fallbackLng: 'ar', // Keep a fallback language in case Next.js context isn't immediately available
    
    interpolation: { escapeValue: false },
  });

export default i18n;
