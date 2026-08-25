import { Pressable, ScrollView, Text, View } from 'react-native';
import { ArrowDownUp, LayoutGrid } from 'lucide-react-native';
import {
  AppHeader,
  CategoryChip,
  CredentialRow,
  Screen,
  SearchField,
} from '../design/ui.jsx';
import { categories, credentials } from '../design/mockData.js';
import { useAppTheme } from '../context/theme.context.jsx';

export default function Vault({ navigation }) {
  const { colors } = useAppTheme();
  return (
    <Screen contentClassName="px-5 pb-8">
      <AppHeader
        title="Vault"
        subtitle="24 saved accounts"
        right={(
          <Pressable
            onPress={() => navigation.navigate('Categories')}
            className="h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface"
          >
            <LayoutGrid size={19} color={colors.ink} />
          </Pressable>
        )}
      />

      <SearchField placeholder="Search your vault" onPress={() => navigation.navigate('Search')} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 mt-4 px-5">
        {categories.map((category, index) => (
          <CategoryChip
            key={category.name}
            label={category.name}
            selected={index === 0}
            onPress={index === 0 ? undefined : () => navigation.navigate('CategoryDetails')}
          />
        ))}
      </ScrollView>

      <View className="mt-6 flex-row items-center justify-between border-b border-line pb-3">
        <Text className="text-[15px] font-semibold text-ink">All accounts</Text>
        <Pressable className="min-h-10 flex-row items-center px-1">
          <ArrowDownUp size={16} color={colors.muted} />
          <Text className="ml-2 text-sm text-muted">Recently used</Text>
        </Pressable>
      </View>

      {credentials.map((item) => (
        <CredentialRow key={item.id} item={item} onPress={() => navigation.navigate('CredentialDetails')} />
      ))}
    </Screen>
  );
}
