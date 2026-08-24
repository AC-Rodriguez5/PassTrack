import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorScheme, vars } from 'nativewind';

const THEME_STORAGE_KEY = 'passtrack.appearance';

const themes = {
  light: {
    canvas: '#F4F6F4',
    surface: '#FFFFFF',
    ink: '#17201D',
    muted: '#66736E',
    line: '#DDE3DF',
    accent: '#2F7D6D',
    accentSoft: '#E5F0ED',
    success: '#39775A',
    warning: '#A66A19',
    danger: '#B14E4E',
    appBackdrop: '#E7EBE8',
  },
  dark: {
    canvas: '#101513',
    surface: '#171D1A',
    ink: '#F1F5F2',
    muted: '#A5B0AB',
    line: '#303A35',
    accent: '#62B7A5',
    accentSoft: '#203A34',
    success: '#75C499',
    warning: '#E0A34C',
    danger: '#E07A7A',
    appBackdrop: '#080B0A',
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemScheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
  const [preference, setPreferenceState] = useState('system');
  const [deviceScheme, setDeviceScheme] = useState(systemScheme);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((storedPreference) => {
      if (['system', 'light', 'dark'].includes(storedPreference)) {
        setPreferenceState(storedPreference);
      }
    });

    const subscription = Appearance.addChangeListener(({ colorScheme: nextScheme }) => {
      setDeviceScheme(nextScheme === 'dark' ? 'dark' : 'light');
    });

    return () => subscription.remove();
  }, []);

  const scheme = preference === 'system' ? deviceScheme : preference;
  const colors = themes[scheme];

  useEffect(() => {
    colorScheme.set(scheme);
  }, [scheme]);

  const setPreference = async (nextPreference) => {
    setPreferenceState(nextPreference);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextPreference);
  };

  const value = useMemo(() => ({
    colors,
    isDark: scheme === 'dark',
    preference,
    scheme,
    setPreference,
  }), [colors, preference, scheme]);

  const themeVariables = vars({
    '--color-canvas': colors.canvas,
    '--color-surface': colors.surface,
    '--color-ink': colors.ink,
    '--color-muted': colors.muted,
    '--color-line': colors.line,
    '--color-accent': colors.accent,
    '--color-accent-soft': colors.accentSoft,
    '--color-success': colors.success,
    '--color-warning': colors.warning,
    '--color-danger': colors.danger,
  });

  return (
    <ThemeContext.Provider value={value}>
      <View className="flex-1" style={themeVariables}>{children}</View>
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useAppTheme must be used inside ThemeProvider');
  return context;
}

