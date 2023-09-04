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

const ThemeProvider = ({ children }: ThemeProps) => {
  const { theme: themeMode, setThemeMode } = useThemeStore((state) => state);

  const changeTheme = useCallback((themeMode: ThemeMode) => setThemeMode(themeMode), [themeMode]);

  return (
    <ThemeContext.Provider value={{ changeTheme, themeMode }}>
      <MUIProvider theme={getTheme(themeMode)}>{children}</MUIProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
