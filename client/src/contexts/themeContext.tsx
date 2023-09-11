import { createContext, ReactNode, useCallback } from 'react';
import { ThemeProvider as MUIProvider } from '@mui/material/styles';
import { getTheme, ThemeMode } from '@theme/index';
import useThemeStore from '@store/themeStore';

type ThemeProps = {
  children?: ReactNode;
};

type ThemeContext = {
  themeMode: ThemeMode;
  changeTheme: (themeMode: ThemeMode) => void;
};

export const ThemeContext = createContext<ThemeContext>({
  themeMode: 'default',
  changeTheme: (_themeMode: ThemeMode) => null,
});

const fontStyleOverride = {
  styleOverrides: {
    body: {
      fontFamily: "'IBM Plex Sans'",
    },
    root: {
      fontFamily: "'IBM Plex Sans'",
      '& .MuiOutlinedInput-root': {
        fontFamily: "'IBM Plex Sans'",
      },
    },
  },
};

const ThemeProvider = ({ children }: ThemeProps) => {
  const { theme: themeMode, setThemeMode } = useThemeStore((state) => state);

  const changeTheme = useCallback((themeMode: ThemeMode) => setThemeMode(themeMode), [themeMode]);

  return (
    <ThemeContext.Provider value={{ changeTheme, themeMode }}>
      <MUIProvider
        theme={{
          ...getTheme(themeMode),
          typography: { ...getTheme(themeMode).typography, fontFamily: "'IBM Plex Sans'" },
          components: {
            ...getTheme(themeMode).components,
            MuiCssBaseline: fontStyleOverride,
            MuiTextField: fontStyleOverride,
            MuiSelect: fontStyleOverride,
            MuiButton: fontStyleOverride,
          },
        }}
      >
        {children}
      </MUIProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
