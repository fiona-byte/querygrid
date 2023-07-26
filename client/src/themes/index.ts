import { DefaultTheme } from './default';

export type ThemeMode = 'default';

export const getTheme = (themeMode: ThemeMode) => {
  switch (themeMode) {
    default:
      return DefaultTheme;
  }
};
