import { Pressable, ScrollView, Text, View } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import {
  CredentialRow,
  Screen,
  SearchField,
  SectionHeader,
  SecurityHealth,
  ServiceIcon,
} from '../design/ui.jsx';
import { credentials, demoUser } from '../design/mockData.js';
import { useAppTheme } from '../context/theme.context.jsx';

export default function Home({ navigation }) {
  const { colors } = useAppTheme();
  const quickAccess = credentials.slice(0, 4);
  const firstName = demoUser.firstName;
  const initials = `${demoUser.firstName[0]}${demoUser.lastName[0]}`.toUpperCase();

  return (
    <Screen contentClassName="px-5 pb-8">
      <View className="mb-6 mt-3 flex-row items-center">
        <View className="flex-1">
          <Text className="text-sm text-muted">Good morning, {firstName}</Text>
          <View className="mt-1 flex-row items-center">
            <ShieldCheck size={16} color={colors.accent} />
            <Text className="ml-2 text-[22px] font-semibold text-ink">Your vault is protected.</Text>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate('Profile')}
          className="ml-3 h-11 w-11 items-center justify-center rounded-full bg-accent"
        >
          <Text className="text-xs font-semibold text-white">{initials}</Text>
        </Pressable>
      </View>

      <SearchField onPress={() => navigation.navigate('Search')} />
      <SecurityHealth onPress={() => navigation.navigate('Security')} />

      <SectionHeader title="Quick access" action="View vault" onAction={() => navigation.navigate('Vault')} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 px-5">
        {quickAccess.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => navigation.navigate('CredentialDetails')}
            className="mr-3 w-24 items-center rounded-xl border border-line bg-surface px-2 py-4"
          >
            <ServiceIcon item={item} size={42} />
            <Text className="mt-3 w-full text-center text-sm font-medium text-ink" numberOfLines={1}>{item.name}</Text>
            <Text className="mt-1 text-[11px] text-muted">Open</Text>
          </Pressable>
        ))}
      </ScrollView>

      <SectionHeader title="Recently used" action="See all" onAction={() => navigation.navigate('Vault')} />
      <View className="rounded-xl border border-line bg-surface px-4">
        {credentials.slice(0, 4).map((item) => (
          <CredentialRow
            key={item.id}
            item={item}
            showPassword
            onPress={() => navigation.navigate('CredentialDetails')}
          />
        ))}
      </View>
    </Screen>
  );
}
