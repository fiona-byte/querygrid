import { createContext, ReactNode, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Internationalization, Languages, languages } from '@lang/type';
import useInternationalizationStore from '@store/i18nStore';

type InternationalizationProps = {
  children?: ReactNode;
};

export const InternationalizationContext = createContext<Internationalization>({
  language: 'en',
  languages: languages,
  changeLanguage: (_language: Languages) => null,
});

const InternationalizationProvider = ({ children }: InternationalizationProps) => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useInternationalizationStore();

  const changeLanguage = useCallback((lang: Languages) => setLanguage(lang), [language]);

  useEffect(() => {
    i18n.changeLanguage(language).catch((err) => console.log('CHANGE LANGUAGE ERROR', err)); // TODO: remove console.log()
  }, [language]);

  return (
    <InternationalizationContext.Provider value={{ changeLanguage, language, languages }}>
      {children}
    </InternationalizationContext.Provider>
  );
};

export default InternationalizationProvider;
