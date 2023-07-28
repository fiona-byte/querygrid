import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Languages } from '../i18n/type';

type InternationalizationState = {
  language: Languages;
  setLanguage: (language: Languages) => void;
};

const useInternationalizationStore = create<InternationalizationState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set(() => ({ language })),
    }),
    {
      name: 'language',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useInternationalizationStore;
