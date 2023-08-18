import { createContext, ReactNode, useCallback, useState, useEffect } from 'react';
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
  const { language, setLanguage } = useInternationalizationStore((state) => state);
  const [lang, setLang] = useState<Languages>(language);

  const changeLanguage = useCallback(
    (lang: Languages) => {
      setLang(lang);
      setLanguage(lang);
    },
    [lang],
  );

  useEffect(() => {
    i18n.changeLanguage(lang).catch((err) => console.log('CHANGE LANGUAGE ERROR', err)); // TODO: remove console.log()
  }, [lang]);

  return (
    <InternationalizationContext.Provider value={{ changeLanguage, language: lang, languages }}>
      {children}
    </InternationalizationContext.Provider>
  );
};

export default InternationalizationProvider;
