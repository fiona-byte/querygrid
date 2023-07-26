import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ThemeMode } from '../themes';

type ThemeState = {
  theme: ThemeMode;
  setThemeMode: (theme: ThemeMode) => void;
};

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'default',
      setThemeMode: (theme) => set(() => ({ theme })),
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useThemeStore;
