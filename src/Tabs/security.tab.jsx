import { Text, View } from 'react-native';
import {
  AppHeader,
  Screen,
  SectionHeader,
  SecurityFinding,
  SecurityHealth,
} from '../design/ui.jsx';
import { securityFindings } from '../design/mockData.js';

export default function Security({ navigation }) {
  return (
    <Screen contentClassName="px-5 pb-8">
      <AppHeader title="Security" subtitle="Clear actions for a healthier vault." />
      <SecurityHealth compact />

      <SectionHeader title="Needs attention" />
      <Text className="mb-2 text-sm leading-5 text-muted">
        Fix the highest-impact items first. PassTrack will guide you through each one.
      </Text>
      <View className="rounded-xl border border-line bg-surface px-4">
        {securityFindings.map((item) => (
          <SecurityFinding
            key={item.title}
            item={item}
            onPress={item.severity === 'safe' ? undefined : () => navigation.navigate('SecurityFindingDetails')}
          />
        ))}
      </View>

      <View className="mt-6 border-l-2 border-accent pl-4">
        <Text className="text-sm font-semibold text-ink">A calm security habit</Text>
        <Text className="mt-1 text-sm leading-5 text-muted">
          Start with reused passwords. One unique password prevents a breach from spreading between accounts.
        </Text>
      </View>
    </Screen>
  );
}
