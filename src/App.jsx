import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './appNavigation/app.navigation.jsx';
import { ThemeProvider, useAppTheme } from './context/theme.context.jsx';

function ThemedApp() {
  const { colors, isDark } = useAppTheme();
  const theme = {
    dark: isDark,
    colors: {
      primary: colors.accent,
      background: colors.canvas,
      card: colors.surface,
      text: colors.ink,
      border: colors.line,
      notification: colors.danger,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' },
      medium: { fontFamily: 'System', fontWeight: '500' },
      bold: { fontFamily: 'System', fontWeight: '700' },
      heavy: { fontFamily: 'System', fontWeight: '800' },
    },
  };

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={colors.canvas} />
      <View className="flex-1 items-center" style={{ backgroundColor: colors.appBackdrop }}>
        <View className="w-full max-w-[480px] flex-1 overflow-hidden" style={{ backgroundColor: colors.canvas }}>
          <NavigationContainer theme={theme}>
            <AppNavigator />
          </NavigationContainer>
        </View>
      </View>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}


