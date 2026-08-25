import { useState } from 'react';
import { Text, View } from 'react-native';
import { Check, Mail, UserRound } from 'lucide-react-native';
import {
  AppHeader,
  Field,
  PasswordField,
  PrimaryButton,
  Screen,
  SecondaryButton,
} from '../design/ui.jsx';
import { useAppTheme } from '../context/theme.context.jsx';
import { getFieldErrors, registerFormSchema } from '../validation/forms.validation.js';

const initialForm = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Register({ navigation }) {
  const { colors } = useAppTheme();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const updateField = (field) => (value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const requirements = [
    { label: '8+ characters', met: form.password.length >= 8 },
    { label: 'Upper & lowercase', met: /[a-z]/.test(form.password) && /[A-Z]/.test(form.password) },
    { label: 'A number', met: /\d/.test(form.password) },
    { label: 'A special character', met: /[^A-Za-z0-9]/.test(form.password) },
  ];

  const submit = () => {
    const result = registerFormSchema.safeParse(form);
    if (!result.success) {
      setErrors(getFieldErrors(result));
      return;
    }

    navigation.replace('EmailVerification', {
      email: result.data.email,
      purpose: 'registration',
    });
  };

  return (
    <Screen>
      <AppHeader
        title="Create account"
        subtitle="Build a private vault that is yours alone."
        onBack={() => navigation.goBack()}
      />

      <Field
        label="First name"
        placeholder="Alex"
        value={form.firstName}
        onChangeText={updateField('firstName')}
        error={errors.firstName}
        autoCapitalize="words"
        icon={<UserRound size={18} color={colors.muted} />}
      />
      <Field
        label="Middle name (optional)"
        placeholder="Santos"
        value={form.middleName}
        onChangeText={updateField('middleName')}
        error={errors.middleName}
        autoCapitalize="words"
      />
      <Field
        label="Last name"
        placeholder="Rodriguez"
        value={form.lastName}
        onChangeText={updateField('lastName')}
        error={errors.lastName}
        autoCapitalize="words"
      />
      <Field
        label="Email address"
        placeholder="alex@example.com"
        value={form.email}
        onChangeText={updateField('email')}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        icon={<Mail size={18} color={colors.muted} />}
      />
      <PasswordField
        label="Password"
        value={form.password}
        onChangeText={updateField('password')}
        error={errors.password}
        autoComplete="new-password"
      />

      <View className="mb-5 rounded-xl border border-line bg-surface p-4">
        <Text className="mb-3 text-sm font-medium text-ink">A strong password includes</Text>
        <View className="flex-row flex-wrap">
          {requirements.map((item) => (
            <View key={item.label} className="mb-2 w-1/2 flex-row items-center pr-2">
              <View className={`h-5 w-5 items-center justify-center rounded-full ${item.met ? 'bg-accent-soft' : 'border border-line'}`}>
                {item.met ? <Check size={12} color={colors.accent} /> : null}
              </View>
              <Text className="ml-2 text-xs text-muted">{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <PasswordField
        label="Confirm password"
        value={form.confirmPassword}
        onChangeText={updateField('confirmPassword')}
        error={errors.confirmPassword}
        autoComplete="new-password"
      />

      <View className="mt-2">
        <PrimaryButton label="Create account" onPress={submit} />
      </View>
      <View className="mt-3">
        <SecondaryButton label="Already have an account? Sign in" onPress={() => navigation.navigate('Login')} />
      </View>
    </Screen>
  );
}
