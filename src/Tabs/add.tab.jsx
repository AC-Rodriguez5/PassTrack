import { useState } from 'react';
import { Text, View } from 'react-native';
import { Globe2, Plus } from 'lucide-react-native';
import {
  AppHeader,
  CategoryChip,
  Field,
  PrimaryButton,
  Screen,
  SecondaryButton,
} from '../design/ui.jsx';
import { useAppTheme } from '../context/theme.context.jsx';
import { accountFormSchema, getFieldErrors } from '../validation/forms.validation.js';

const categories = [
  ['social', 'Social'],
  ['email', 'Email'],
  ['banking', 'Banking'],
  ['finance', 'Finance'],
  ['work', 'Work'],
  ['school', 'School'],
  ['subscription', 'Subscription'],
  ['other', 'Other'],
];

const statuses = [
  ['active', 'Active'],
  ['expired', 'Expired'],
  ['archived', 'Archived'],
];

const initialForm = {
  name: '',
  username: '',
  category: 'other',
  websiteUrl: '',
  notes: '',
  status: 'active',
  renewalDate: '',
  expirationDate: '',
};

export default function Add({ navigation }) {
  const { colors } = useAppTheme();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const updateField = (field) => (value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = () => {
    const result = accountFormSchema.safeParse(form);
    if (!result.success) {
      setErrors(getFieldErrors(result));
      return;
    }

    setForm(initialForm);
    navigation.navigate('SuccessStates');
  };

  return (
    <Screen contentClassName="px-5 pb-8">
      <AppHeader title="Add account" subtitle="Keep the essentials together and easy to find." />

      <Field
        label="Service or account name"
        placeholder="e.g. Netflix membership"
        value={form.name}
        onChangeText={updateField('name')}
        error={errors.name}
      />
      <Field
        label="Username or email (optional)"
        placeholder="alex@example.com"
        value={form.username}
        onChangeText={updateField('username')}
        error={errors.username}
        autoCapitalize="none"
      />
      <Field
        label="Website (optional)"
        placeholder="https://example.com"
        value={form.websiteUrl}
        onChangeText={updateField('websiteUrl')}
        error={errors.websiteUrl}
        keyboardType="url"
        autoCapitalize="none"
        icon={<Globe2 size={18} color={colors.muted} />}
      />

      <Text className="mb-2 text-sm font-medium text-ink">Category</Text>
      <View className="mb-3 flex-row flex-wrap">
        {categories.map(([value, label]) => (
          <CategoryChip
            key={value}
            label={label}
            selected={form.category === value}
            onPress={() => updateField('category')(value)}
            containerClassName="mb-2 mr-2"
          />
        ))}
      </View>

      <Text className="mb-2 text-sm font-medium text-ink">Status</Text>
      <View className="mb-5 flex-row">
        {statuses.map(([value, label]) => (
          <CategoryChip
            key={value}
            label={label}
            selected={form.status === value}
            onPress={() => updateField('status')(value)}
          />
        ))}
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1">
          <Field
            label="Renewal date"
            placeholder="YYYY-MM-DD"
            value={form.renewalDate}
            onChangeText={updateField('renewalDate')}
            error={errors.renewalDate}
          />
        </View>
        <View className="flex-1">
          <Field
            label="Expiration date"
            placeholder="YYYY-MM-DD"
            value={form.expirationDate}
            onChangeText={updateField('expirationDate')}
            error={errors.expirationDate}
          />
        </View>
      </View>

      <Field
        label="Notes (optional)"
        placeholder="Add helpful context"
        value={form.notes}
        onChangeText={updateField('notes')}
        error={errors.notes}
        multiline
      />

      <View className="mt-2">
        <PrimaryButton
          label="Save account"
          icon={<Plus size={18} color="white" />}
          onPress={submit}
        />
      </View>
      <View className="mt-3">
        <SecondaryButton label="Cancel" onPress={() => navigation.navigate('Home')} />
      </View>
    </Screen>
  );
}
