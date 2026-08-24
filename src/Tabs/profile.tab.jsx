import { Pressable, Text, View } from 'react-native';
import {
  Download,
  Fingerprint,
  KeyRound,
  LogOut,
  MonitorSmartphone,
  Moon,
  Settings,
  ShieldCheck,
  UserRound,
} from 'lucide-react-native';
import { AppHeader, Screen, SectionHeader, SettingsRow } from '../design/ui.jsx';
import { demoUser } from '../design/mockData.js';
import { useAppTheme } from '../context/theme.context.jsx';

export default function Profile({ navigation }) {
  const { colors, preference } = useAppTheme();
  const fullName = [demoUser.firstName, demoUser.middleName, demoUser.lastName].filter(Boolean).join(' ');
  const initials = `${demoUser.firstName[0]}${demoUser.lastName[0]}`.toUpperCase();
  const appearance = preference === 'system' ? 'Device' : preference[0].toUpperCase() + preference.slice(1);

  const logout = () => navigation.replace('Login');

  return (
    <Screen contentClassName="px-5 pb-8">
      <AppHeader title="Profile" subtitle="Your account, preferences, and privacy." />

      <View className="flex-row items-center border-b border-line pb-6">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-accent">
          <Text className="text-lg font-semibold text-white">{initials}</Text>
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold text-ink">{fullName}</Text>
          <Text className="mt-1 text-sm text-muted">{demoUser.email}</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Settings')} className="h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface">
          <Settings size={19} color={colors.ink} />
        </Pressable>
      </View>

      <SectionHeader title="Account" />
      <SettingsRow
        icon={<UserRound size={18} color={colors.accent} />}
        title="Personal information"
        onPress={() => navigation.navigate('PersonalInformation')}
      />
      <SettingsRow
        icon={<KeyRound size={18} color={colors.accent} />}
        title="Change password"
        detail={`Verify through ${demoUser.email}`}
        onPress={() => navigation.navigate('EmailVerification', {
          email: demoUser.email,
          purpose: 'password-change',
        })}
      />

      <SectionHeader title="Security & preferences" />
      <SettingsRow icon={<Fingerprint size={18} color={colors.accent} />} title="Biometric unlock" value="On" />
      <SettingsRow icon={<ShieldCheck size={18} color={colors.accent} />} title="Auto-lock" value="1 minute" />
      <SettingsRow icon={<MonitorSmartphone size={18} color={colors.accent} />} title="Session management" detail="Review signed-in devices" />
      <SettingsRow
        icon={<Moon size={18} color={colors.accent} />}
        title="Appearance"
        value={appearance}
        onPress={() => navigation.navigate('Appearance')}
      />

      <SectionHeader title="Data" />
      <SettingsRow icon={<Download size={18} color={colors.accent} />} title="Export vault" detail="Download an encrypted copy" />

      <SectionHeader title="Session" />
      <SettingsRow
        icon={<LogOut size={18} color={colors.danger} />}
        title="Log out"
        danger
        onPress={logout}
      />
    </Screen>
  );
}
