import { Text, View } from 'react-native';
import { Check, Laptop, Moon, Sun } from 'lucide-react-native';
import { AppHeader, MotionPressable, Screen, SectionHeader } from '../design/ui.jsx';
import { demoUser } from '../design/mockData.js';
import { useAppTheme } from '../context/theme.context.jsx';

function InformationRow({ label, value, last = false }) {
  return (
    <View className={`py-4 ${last ? '' : 'border-b border-line'}`}>
      <Text className="text-xs font-medium uppercase text-muted">{label}</Text>
      <Text className="mt-1.5 text-[15px] text-ink">{value || 'Not provided'}</Text>
    </View>
  );
}

export function PersonalInformationScreen({ navigation }) {
  return (
    <Screen>
      <AppHeader title="Personal information" subtitle="The non-sensitive details attached to your account." onBack={() => navigation.goBack()} />
      <SectionHeader title="Identity" />
      <View className="rounded-xl border border-line bg-surface px-4">
        <InformationRow label="First name" value={demoUser.firstName} />
        <InformationRow label="Middle name" value={demoUser.middleName} />
        <InformationRow label="Last name" value={demoUser.lastName} />
        <InformationRow label="Email address" value={demoUser.email} last />
      </View>

      <View className="mt-6 border-l-2 border-accent pl-4">
        <Text className="text-sm leading-5 text-muted">
          Passwords, authentication tokens, and internal account identifiers are never displayed here.
        </Text>
      </View>
    </Screen>
  );
}

const appearanceOptions = [
  { value: 'system', label: 'Use device setting', detail: 'Follow your phone automatically', Icon: Laptop },
  { value: 'light', label: 'Light', detail: 'Bright canvas with dark text', Icon: Sun },
  { value: 'dark', label: 'Dark', detail: 'Low-light canvas with soft contrast', Icon: Moon },
];

export function AppearanceScreen({ navigation }) {
  const { colors, preference, setPreference } = useAppTheme();

  return (
    <Screen>
      <AppHeader title="Appearance" subtitle="Choose how PassTrack looks on this device." onBack={() => navigation.goBack()} />
      <View className="overflow-hidden rounded-xl border border-line bg-surface px-4">
        {appearanceOptions.map(({ value, label, detail, Icon }, index) => {
          const selected = preference === value;
          return (
            <MotionPressable
              key={value}
              onPress={() => setPreference(value)}
              className={`min-h-[72px] flex-row items-center py-3 ${index === appearanceOptions.length - 1 ? '' : 'border-b border-line'}`}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
            >
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-accent-soft">
                <Icon size={19} color={colors.accent} />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-[15px] font-semibold text-ink">{label}</Text>
                <Text className="mt-0.5 text-xs text-muted">{detail}</Text>
              </View>
              <View className={`h-6 w-6 items-center justify-center rounded-full border ${selected ? 'border-accent bg-accent' : 'border-line'}`}>
                {selected ? <Check size={14} color="white" /> : null}
              </View>
            </MotionPressable>
          );
        })}
      </View>
    </Screen>
  );
}
