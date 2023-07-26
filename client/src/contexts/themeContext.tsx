import {
  createContext,
  ReactNode,
  useCallback,
  useState,
  useEffect,
} from 'react';
import type { Theme } from '@mui/material/styles';
import { ThemeProvider as MUIProvider } from '@mui/material/styles';
import { getTheme, ThemeMode } from '../themes';
import useThemeStore from '../store/themeStore';

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
  const [theme, setTheme] = useState<Theme>(getTheme(themeMode));

  const changeTheme = useCallback(
    (themeMode: ThemeMode) => {
      setTheme(getTheme(themeMode));
      setThemeMode(themeMode);
    },
    [theme]
  );

  useEffect(() => {
    setTheme(getTheme(themeMode));
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ changeTheme, themeMode }}>
      <MUIProvider theme={theme}>{children}</MUIProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
