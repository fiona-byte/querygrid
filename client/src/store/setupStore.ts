import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type SetupState = {
  install: boolean;
  setInstall: (install: boolean) => void;
};

const useSetupStore = create<SetupState>()(
  persist(
    (set) => ({
      install: false,
      setInstall: (install) => set(() => ({ install })),
    }),
    {
      name: 'setup',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useSetupStore;
