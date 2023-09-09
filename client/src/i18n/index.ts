import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    supportedLngs: ['en', 'de'],
    ns: ['translations'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json`,
    },
  })
  .catch((err) => console.log(err)); // TODO: remove console.log

export default i18n;
