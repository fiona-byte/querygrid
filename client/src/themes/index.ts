import { DefaultTheme } from './default';

declare module '@mui/material/styles' {
  interface Palette {
    toolbar: {
      main: string;
      border: string;
    };
    content: {
      main: string;
      secondary: string;
    };
  }
  interface PaletteOptions {
    toolbar?: {
      main?: string;
      border?: string;
    };
    content?: {
      main: string;
      secondary: string;
    };
  }
}

export type ThemeMode = 'default';

export const getTheme = (themeMode: ThemeMode) => {
  switch (themeMode) {
    default:
      return DefaultTheme;
  }
};
