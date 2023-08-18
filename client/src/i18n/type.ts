export type Languages = 'en' | 'de';

export const languages = [
  { name: 'English', short: 'en' },
  { name: 'German', short: 'de' },
] as const;

export type Internationalization = {
  language: Languages;
  languages: typeof languages;
  changeLanguage: (language: Languages) => void;
};
