export type Languages = 'en' | 'de';

export type Internationalization = {
  language: Languages;
  changeLanguage: (language: Languages) => void;
};
