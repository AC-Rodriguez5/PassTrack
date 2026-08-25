import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Mail } from 'lucide-react-native';
import {
  BrandMark,
  Field,
  PasswordField,
  PrimaryButton,
  Screen,
  SecondaryButton,
  MotionPressable,
} from '../design/ui.jsx';
import { useAppTheme } from '../context/theme.context.jsx';
import { getFieldErrors, loginFormSchema } from '../validation/forms.validation.js';

const providers = [
  { name: 'Google', icon: 'google', iconColor: '#4285F4' },
  { name: 'Facebook', icon: 'facebook-f', iconColor: '#1877F2' },
  { name: 'Apple', icon: 'apple' },
];

function ProviderButton({ provider, onPress, inkColor }) {
  return (
    <MotionPressable
      onPress={onPress}
      containerClassName="mb-3"
      className="relative h-[52px] w-full flex-row items-center justify-center rounded-xl border border-line bg-surface px-14"
      accessibilityRole="button"
      accessibilityLabel={`Continue with ${provider.name}`}
    >
      <View className="absolute left-4 h-8 w-8 items-center justify-center">
        <FontAwesome6
          name={provider.icon}
          iconStyle="brand"
          size={20}
          color={provider.iconColor ?? inkColor}
        />
      </View>
      <Text className="text-[15px] font-semibold text-ink" numberOfLines={1}>
        Continue with {provider.name}
      </Text>
    </MotionPressable>
  );
}

export default function Login({ navigation }) {
  const { colors } = useAppTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const submit = () => {
    const result = loginFormSchema.safeParse({ email, password });
    if (!result.success) {
      setErrors(getFieldErrors(result));
      return;
    }
    navigation.replace('MainTabs');
  };

  return (
    <Screen contentClassName="min-h-full px-5 pb-10">
      <View className="mt-8">
        <BrandMark />
      </View>

      <View className="mt-12">
        <Text className="text-[30px] font-semibold text-ink">Welcome back</Text>
        <Text className="mt-2 max-w-[310px] text-[15px] leading-6 text-muted">
          Your private space for the accounts that matter.
        </Text>
      </View>

      <View className="mt-9">
        <Field
          label="Email address"
          placeholder="alex@example.com"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setErrors((current) => ({ ...current, email: undefined }));
          }}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          icon={<Mail size={18} color={colors.muted} />}
        />
        <PasswordField
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setErrors((current) => ({ ...current, password: undefined }));
          }}
          error={errors.password}
          autoComplete="current-password"
        />
        <Pressable
          onPress={() => navigation.navigate('ForgotPassword')}
          className="min-h-11 self-end justify-center"
        >
          <Text className="text-sm font-semibold text-accent">Forgot password?</Text>
        </Pressable>
      </View>

      <View className="mt-5">
        <PrimaryButton label="Sign in" onPress={submit} />
      </View>

      <View className="my-6 flex-row items-center">
        <View className="h-px flex-1 bg-line" />
        <Text className="mx-3 text-xs text-muted">Or continue with</Text>
        <View className="h-px flex-1 bg-line" />
      </View>

      <View>
        {providers.map((provider) => (
          <ProviderButton
            key={provider.name}
            provider={provider}
            inkColor={colors.ink}
            onPress={() => navigation.replace('MainTabs')}
          />
        ))}
      </View>

      <View className="my-4 flex-row items-center">
        <View className="h-px flex-1 bg-line" />
        <Text className="mx-3 text-xs text-muted">New to PassTrack?</Text>
        <View className="h-px flex-1 bg-line" />
      </View>

      <SecondaryButton label="Create an account" onPress={() => navigation.navigate('Register')} />

      <View className="mt-10 flex-row items-center justify-center">
        <View className="h-2 w-2 rounded-full bg-accent" />
        <Text className="ml-2 text-xs text-muted">Your vault locks when you leave</Text>
      </View>
    </Screen>
  );
}
