import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { House, KeyRound, Plus, ShieldCheck, UserRound } from 'lucide-react-native';
import Home from '../Tabs/home.tab.jsx';
import Vault from '../Tabs/vault.tab.jsx';
import Add from '../Tabs/add.tab.jsx';
import Security from '../Tabs/security.tab.jsx';
import Profile from '../Tabs/profile.tab.jsx';
import { useAppTheme } from '../context/theme.context.jsx';

const Tab = createBottomTabNavigator();

function TabIcon({ Icon, focused, colors, add = false }) {
  return (
    <View className={`h-9 w-11 items-center justify-center overflow-hidden rounded-lg ${add ? 'bg-accent' : 'bg-transparent'}`}>
      {focused && !add ? (
        <Animated.View
          entering={FadeIn.duration(160)}
          exiting={FadeOut.duration(120)}
          className="absolute inset-0 rounded-lg bg-accent-soft"
        />
      ) : null}
      <Icon size={20} color={add ? 'white' : focused ? colors.accent : colors.muted} strokeWidth={focused ? 2.4 : 2} />
    </View>
  );
}

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const bottomPadding = Math.max(insets.bottom, 8);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 1 },
        tabBarStyle: {
          height: 68 + bottomPadding,
          paddingTop: 7,
          paddingBottom: bottomPadding,
          borderTopColor: colors.line,
          backgroundColor: colors.surface,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: ({ focused }) => <TabIcon Icon={House} focused={focused} colors={colors} /> }} />
      <Tab.Screen name="Vault" component={Vault} options={{ tabBarIcon: ({ focused }) => <TabIcon Icon={KeyRound} focused={focused} colors={colors} /> }} />
      <Tab.Screen name="Add" component={Add} options={{ tabBarIcon: ({ focused }) => <TabIcon Icon={Plus} focused={focused} colors={colors} add /> }} />
      <Tab.Screen name="Security" component={Security} options={{ tabBarIcon: ({ focused }) => <TabIcon Icon={ShieldCheck} focused={focused} colors={colors} /> }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: ({ focused }) => <TabIcon Icon={UserRound} focused={focused} colors={colors} /> }} />
    </Tab.Navigator>
  );
}
