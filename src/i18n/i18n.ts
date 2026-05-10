import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';
import uz from './locales/uz.json';

const STORAGE_KEY = 'sss-lang';
const SUPPORTED = ['en', 'ru', 'uz'] as const;

function normalizeLng(code: string): (typeof SUPPORTED)[number] {
  const base = code.split('-')[0]?.toLowerCase() ?? 'ru';
  return (SUPPORTED as readonly string[]).includes(base)
    ? (base as (typeof SUPPORTED)[number])
    : 'ru';
}

function initialLng(): (typeof SUPPORTED)[number] {
  if (typeof window === 'undefined') return 'ru';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return normalizeLng(stored);
  return normalizeLng(navigator.language || 'ru');
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    uz: { translation: uz },
  },
  lng: initialLng(),
  fallbackLng: 'en',
  supportedLngs: [...SUPPORTED],
  interpolation: { escapeValue: false },
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language;
}

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem(STORAGE_KEY, lng);
});

export default i18n;
export { SUPPORTED };
