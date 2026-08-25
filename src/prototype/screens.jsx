import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import {
  AlertTriangle,
  ArrowDownUp,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  FileText,
  Fingerprint,
  Globe2,
  KeyRound,
  Layers3,
  LockKeyhole,
  Moon,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react-native';
import {
  AppHeader,
  Button,
  CategoryChip,
  CredentialRow,
  DetailRow,
  EmptyState,
  Field,
  palette,
  PasswordField,
  PrimaryButton,
  Screen,
  SecondaryButton,
  SectionHeader,
  ServiceIcon,
  SettingsRow,
  SkeletonCredential,
  Switch,
  Toast,
} from '../design/ui.jsx';
import { categories, credentials } from '../design/mockData.js';
import { useAppTheme } from '../context/theme.context.jsx';

function SearchInput({ value, placeholder = 'Search your vault' }) {
  return (
    <View className="h-12 flex-row items-center rounded-xl border border-accent bg-surface px-4">
      <Search size={19} color={palette.accent} />
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={palette.muted}
        className="ml-3 flex-1 text-[15px] text-ink"
      />
      {value ? <X size={18} color={palette.muted} /> : null}
    </View>
  );
}

export function SearchScreen({ navigation }) {
  return (
    <Screen>
      <AppHeader title="Search" onBack={() => navigation.goBack()} />
      <SearchInput placeholder="Search accounts, websites, or usernames" />

      <SectionHeader title="Recent searches" action="Clear" />
      {['github', 'school email', 'netflix'].map((term) => (
        <Pressable key={term} className="min-h-12 flex-row items-center border-b border-line">
          <Clock3 size={17} color={palette.muted} />
          <Text className="ml-3 flex-1 text-sm text-ink">{term}</Text>
          <ChevronRight size={16} color={palette.muted} />
        </Pressable>
      ))}

      <SectionHeader title="Useful actions" />
      <SettingsRow
        icon={<KeyRound size={18} color={palette.accent} />}
        title="Generate a password"
        detail="Create a strong password quickly"
        onPress={() => navigation.navigate('PasswordGenerator')}
      />
      <SettingsRow
        icon={<Layers3 size={18} color={palette.accent} />}
        title="Browse categories"
        detail="Find accounts by context"
        onPress={() => navigation.navigate('Categories')}
      />

      <View className="mt-8">
        <SecondaryButton label="Preview results for “google”" onPress={() => navigation.navigate('SearchResults')} />
      </View>
    </Screen>
  );
}

export function SearchResultsScreen({ navigation }) {
  return (
    <Screen>
      <AppHeader title="Search results" subtitle="3 results for “google”" onBack={() => navigation.goBack()} />
      <SearchInput value="google" />

      <SectionHeader title="Accounts" />
      <View className="rounded-xl border border-line bg-surface px-4">
        <CredentialRow item={credentials[0]} onPress={() => navigation.navigate('CredentialDetails')} />
      </View>

      <SectionHeader title="Categories" />
      <SettingsRow
        icon={<Layers3 size={18} color={palette.accent} />}
        title="Personal"
        detail="4 saved accounts"
        onPress={() => navigation.navigate('CategoryDetails')}
      />

      <SectionHeader title="Actions" />
      <SettingsRow
        icon={<Plus size={18} color={palette.accent} />}
        title="Add another Google account"
        onPress={() => navigation.navigate('MainTabs', { screen: 'Add' })}
      />
    </Screen>
  );
}

export function CredentialDetailsScreen({ navigation }) {
  const item = credentials[0];
  return (
    <Screen>
      <AppHeader
        title="Account details"
        onBack={() => navigation.goBack()}
        right={(
          <Pressable className="h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface">
            <MoreVertical size={19} color={palette.ink} />
          </Pressable>
        )}
      />

      <View className="items-center border-b border-line pb-7">
        <ServiceIcon item={item} size={64} />
        <Text className="mt-4 text-[24px] font-semibold text-ink">Google</Text>
        <Text className="mt-1 text-sm text-muted">accounts.google.com</Text>
      </View>

      <SectionHeader title="Credentials" />
      <View className="rounded-xl border border-line bg-surface px-4">
        <DetailRow label="Username" value="alex@gmail.com" />
        <DetailRow label="Password" value="••••••••••••••" action="Reveal" last />
      </View>

      <SectionHeader title="Account information" />
      <View className="rounded-xl border border-line bg-surface px-4">
        <DetailRow label="Website" value="accounts.google.com" action="Open" />
        <DetailRow label="Category" value="Personal" action="Change" last />
      </View>

      <View className="mt-6 border-l-2 border-accent pl-4">
        <Text className="text-xs font-medium uppercase text-muted">Notes</Text>
        <Text className="mt-2 text-sm leading-5 text-ink">Primary account for email, Drive, and calendar.</Text>
      </View>

      <View className="mt-7 flex-row justify-between border-y border-line py-4">
        <Text className="text-xs text-muted">Updated 3 days ago</Text>
        <Text className="text-xs text-muted">Created May 14, 2026</Text>
      </View>

      <View className="mt-7">
        <PrimaryButton label="Edit account" onPress={() => navigation.navigate('EditCredential')} />
      </View>
      <View className="mt-3">
        <SecondaryButton label="Delete account" danger icon={<Trash2 size={17} color={palette.danger} />} onPress={() => navigation.navigate('DeleteConfirm')} />
      </View>
    </Screen>
  );
}

export function EditCredentialScreen({ navigation }) {
  return (
    <Screen>
      <AppHeader title="Edit Google" subtitle="Update only what has changed." onBack={() => navigation.goBack()} />
      <Field label="Service or app name" value="Google" />
      <Field label="Username or email" value="alex@gmail.com" />
      <PasswordField action="Generate new" onAction={() => navigation.navigate('PasswordGenerator')} />
      <Field label="Website" value="https://accounts.google.com" icon={<Globe2 size={18} color={palette.muted} />} />

      <Text className="mb-2 text-sm font-medium text-ink">Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 mb-5 px-5">
        {['Personal', 'Work', 'Social', 'Finance'].map((label, index) => (
          <CategoryChip key={label} label={label} selected={index === 0} />
        ))}
      </ScrollView>

      <Field label="Notes" value="Primary account for email, Drive, and calendar." multiline />
      <PrimaryButton label="Save changes" onPress={() => navigation.navigate('SuccessStates')} />
      <View className="mt-3"><SecondaryButton label="Cancel" onPress={() => navigation.goBack()} /></View>

      <View className="mt-8 border-t border-line pt-6">
        <SecondaryButton label="Delete account" danger onPress={() => navigation.navigate('DeleteConfirm')} />
      </View>
    </Screen>
  );
}

export function PasswordGeneratorScreen({ navigation }) {
  const options = ['Uppercase', 'Lowercase', 'Numbers', 'Symbols'];
  return (
    <Screen>
      <AppHeader title="Password generator" subtitle="Strong by default, simple to adjust." onBack={() => navigation.goBack()} />

      <View className="rounded-2xl bg-[#14201C] p-5">
        <Text className="text-xs font-medium uppercase text-white/60">Generated password</Text>
        <Text className="mt-4 text-center text-[22px] font-semibold text-white">N7!kP9#vQ2@Lm8</Text>
        <View className="mt-5 flex-row">
          <Button
            label="Copy"
            variant="inverse"
            size="sm"
            containerClassName="mr-2 flex-1"
            className="w-full"
            icon={<Copy size={17} color="white" />}
          />
          <Button
            label="Regenerate"
            variant="inverse"
            size="sm"
            containerClassName="flex-1"
            className="w-full"
            icon={<RefreshCw size={17} color="white" />}
          />
        </View>
      </View>

      <View className="mt-6 flex-row items-center justify-between">
        <Text className="text-[16px] font-semibold text-ink">Password length</Text>
        <View className="h-9 min-w-11 items-center justify-center rounded-lg bg-accent-soft px-3">
          <Text className="font-semibold text-accent">16</Text>
        </View>
      </View>
      <View className="my-6 h-2 justify-center rounded-full bg-line">
        <View className="h-2 w-[62%] rounded-full bg-accent" />
        <View className="absolute left-[58%] h-6 w-6 rounded-full border-2 border-accent bg-white" />
      </View>

      <SectionHeader title="Include" />
      {options.map((option) => (
        <View key={option} className="min-h-14 flex-row items-center border-b border-line">
          <Text className="flex-1 text-[15px] text-ink">{option}</Text>
          <Switch />
        </View>
      ))}

      <View className="mt-7 flex-row items-center rounded-xl border border-line bg-surface p-4">
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-accent-soft">
          <ShieldCheck size={20} color={palette.accent} />
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-sm font-semibold text-ink">Strong</Text>
          <Text className="mt-0.5 text-xs text-muted">Estimated to resist common guessing attacks.</Text>
        </View>
      </View>
    </Screen>
  );
}

export function CategoriesScreen({ navigation }) {
  return (
    <Screen>
      <AppHeader title="Categories" subtitle="Browse your vault by context." onBack={() => navigation.goBack()} />
      {categories.slice(1).map((category, index) => (
        <Pressable
          key={category.name}
          onPress={() => navigation.navigate('CategoryDetails')}
          className="min-h-[66px] flex-row items-center border-b border-line py-3"
        >
          <View className="h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
            <Text className="text-sm font-semibold text-accent">{category.name.slice(0, 2).toUpperCase()}</Text>
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-[15px] font-semibold text-ink">{category.name}</Text>
            <Text className="mt-1 text-xs text-muted">{category.count} accounts</Text>
          </View>
          <ChevronRight size={18} color={palette.muted} />
        </Pressable>
      ))}
    </Screen>
  );
}

export function CategoryDetailsScreen({ navigation }) {
  const workAccounts = credentials.filter((item) => item.category === 'Work');
  return (
    <Screen>
      <AppHeader title="Work" subtitle="6 accounts" onBack={() => navigation.goBack()} />
      <SearchInput placeholder="Search Work accounts" />
      <View className="mt-5 flex-row items-center justify-between border-b border-line pb-3">
        <Text className="text-sm font-semibold text-ink">Accounts</Text>
        <Pressable className="min-h-10 flex-row items-center">
          <ArrowDownUp size={16} color={palette.muted} />
          <Text className="ml-2 text-sm text-muted">Name</Text>
        </Pressable>
      </View>
      {workAccounts.map((item) => (
        <CredentialRow key={item.id} item={item} onPress={() => navigation.navigate('CredentialDetails')} />
      ))}
    </Screen>
  );
}

export function SecurityFindingDetailsScreen({ navigation }) {
  return (
    <Screen>
      <AppHeader title="Reused password" onBack={() => navigation.goBack()} />
      <View className="h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
        <AlertTriangle size={28} color={palette.danger} />
      </View>
      <Text className="mt-6 text-[24px] font-semibold text-ink">One password, three accounts</Text>
      <Text className="mt-3 text-[15px] leading-6 text-muted">
        This password is being used by Facebook, Instagram, and Reddit. Changing each one limits the impact if a service is compromised.
      </Text>

      <SectionHeader title="Affected accounts" />
      <View className="rounded-xl border border-line bg-surface px-4">
        {[credentials[3], { ...credentials[7], name: 'Instagram', initials: 'IG' }, { ...credentials[7], name: 'Reddit', initials: 'R' }].map((item) => (
          <CredentialRow key={item.name} item={item} />
        ))}
      </View>

      <View className="mt-8">
        <PrimaryButton label="Change these passwords" />
      </View>
      <View className="mt-5 border-l-2 border-accent pl-4">
        <Text className="text-sm leading-5 text-muted">
          Use a different generated password for every account. You only need to remember your PassTrack master password.
        </Text>
      </View>
    </Screen>
  );
}

export function SettingsScreen({ navigation }) {
  const { colors, preference } = useAppTheme();
  const appearance = preference === 'system' ? 'Device' : preference[0].toUpperCase() + preference.slice(1);

  return (
    <Screen>
      <AppHeader title="Settings" subtitle="Tune PassTrack to your routine." onBack={() => navigation.goBack()} />
      <SectionHeader title="Preferences" />
      <SettingsRow
        icon={<Moon size={18} color={colors.accent} />}
        title="Appearance"
        value={appearance}
        onPress={() => navigation.navigate('Appearance')}
      />
      <SettingsRow icon={<KeyRound size={18} color={palette.accent} />} title="Default password length" value="16" />
      <SettingsRow icon={<Fingerprint size={18} color={palette.accent} />} title="Biometric unlock" value="On" />
      <SettingsRow icon={<LockKeyhole size={18} color={palette.accent} />} title="Auto-lock" value="1 minute" />

      <SectionHeader title="Application" />
      <SettingsRow icon={<FileText size={18} color={palette.accent} />} title="Privacy policy" />
      <SettingsRow icon={<ShieldCheck size={18} color={palette.accent} />} title="About PassTrack" detail="Version 1.0.0" />

      <SectionHeader title="Prototype states" />
      <SettingsRow icon={<KeyRound size={18} color={palette.accent} />} title="Empty vault" onPress={() => navigation.navigate('EmptyVault')} />
      <SettingsRow icon={<Search size={18} color={palette.accent} />} title="Empty search" onPress={() => navigation.navigate('EmptySearch')} />
      <SettingsRow icon={<Clock3 size={18} color={palette.accent} />} title="Loading state" onPress={() => navigation.navigate('LoadingState')} />
      <SettingsRow icon={<AlertTriangle size={18} color={palette.accent} />} title="Validation and errors" onPress={() => navigation.navigate('ValidationStates')} />
      <SettingsRow icon={<Check size={18} color={palette.accent} />} title="Success feedback" onPress={() => navigation.navigate('SuccessStates')} />
    </Screen>
  );
}

export function EmptyVaultScreen({ navigation }) {
  return (
    <Screen scroll={false} contentClassName="px-5 pb-8">
      <AppHeader title="Vault" subtitle="0 saved accounts" onBack={() => navigation.goBack()} />
      <EmptyState
        title="No passwords saved yet"
        description="Add your first account and keep your credentials organized in one private place."
        action="Add account"
        onAction={() => navigation.navigate('MainTabs', { screen: 'Add' })}
      />
    </Screen>
  );
}

export function EmptySearchScreen({ navigation }) {
  return (
    <Screen scroll={false} contentClassName="px-5 pb-8">
      <AppHeader title="Search" onBack={() => navigation.goBack()} />
      <SearchInput value="spotify family" />
      <EmptyState
        title="Nothing matched your search"
        description="We couldn't find anything matching “spotify family”. Try another term or add a new account."
        action="Add Spotify account"
        onAction={() => navigation.navigate('MainTabs', { screen: 'Add' })}
        icon={<Search size={30} color={palette.accent} />}
      />
    </Screen>
  );
}

export function LoadingStateScreen({ navigation }) {
  return (
    <Screen>
      <AppHeader title="Loading states" subtitle="Skeletons follow the shape of real content." onBack={() => navigation.goBack()} />
      <View className="h-12 rounded-xl bg-line" />
      <View className="mt-5 rounded-2xl border border-line bg-surface p-5">
        <View className="h-3 w-28 rounded bg-line" />
        <View className="mt-4 h-7 w-16 rounded bg-line" />
        <View className="mt-4 h-2 w-full rounded bg-line" />
      </View>
      <SectionHeader title="Loading accounts" />
      <View className="rounded-xl border border-line bg-surface px-4">
        {[1, 2, 3, 4, 5].map((item) => <SkeletonCredential key={item} />)}
      </View>
    </Screen>
  );
}

export function ValidationStatesScreen({ navigation }) {
  return (
    <Screen>
      <AppHeader title="Validation & errors" subtitle="Specific, calm, and close to the problem." onBack={() => navigation.goBack()} />
      <Field label="Email address" value="alex@" error="Enter a valid email address." />
      <PasswordField error="Password must contain at least 8 characters." />
      <Field label="Service or app name" error="Service name is required." />

      <View className="mt-3 flex-row rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle size={20} color={palette.warning} />
        <View className="ml-3 flex-1">
          <Text className="text-sm font-semibold text-ink">Unable to reach PassTrack</Text>
          <Text className="mt-1 text-xs leading-5 text-muted">Check your connection and try again. Your changes are still here.</Text>
        </View>
      </View>

      <View className="mt-6"><Button label="Try again" variant="outline" /></View>
    </Screen>
  );
}

export function SuccessStatesScreen({ navigation }) {
  return (
    <Screen>
      <AppHeader title="Feedback states" subtitle="Short messages that never interrupt the task." onBack={() => navigation.goBack()} />
      <View className="gap-3">
        <Toast message="Password copied" />
        <Toast message="Username copied" />
        <Toast message="Account saved" />
        <Toast message="Credential updated" />
      </View>

      <SectionHeader title="Confirmation sheet" />
      <View className="overflow-hidden rounded-2xl border border-line bg-surface">
        <View className="items-center pt-3"><View className="h-1 w-10 rounded-full bg-line" /></View>
        <View className="p-5">
          <View className="h-12 w-12 items-center justify-center rounded-xl bg-accent-soft">
            <Check size={22} color={palette.accent} />
          </View>
          <Text className="mt-4 text-lg font-semibold text-ink">Account saved</Text>
          <Text className="mt-2 text-sm leading-5 text-muted">Google is now available in your Personal category.</Text>
          <View className="mt-5"><PrimaryButton label="View account" onPress={() => navigation.navigate('CredentialDetails')} /></View>
        </View>
      </View>
    </Screen>
  );
}

export function DeleteConfirmScreen({ navigation }) {
  return (
    <Screen scroll={false} edges={['top', 'left', 'right', 'bottom']} contentClassName="justify-end bg-black/30 px-4 pb-4">
      <View className="rounded-2xl bg-surface p-5">
        <View className="items-center"><View className="h-1 w-10 rounded-full bg-line" /></View>
        <View className="mt-6 h-12 w-12 items-center justify-center rounded-xl bg-red-50">
          <Trash2 size={22} color={palette.danger} />
        </View>
        <Text className="mt-4 text-xl font-semibold text-ink">Delete Google?</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">
          This permanently removes the credential from your vault. This action cannot be undone.
        </Text>
        <View className="mt-6"><PrimaryButton label="Delete account" destructive onPress={() => navigation.navigate('SuccessStates')} /></View>
        <View className="mt-3"><SecondaryButton label="Keep account" onPress={() => navigation.goBack()} /></View>
      </View>
    </Screen>
  );
}
