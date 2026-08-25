import { useState } from 'react';
import { Text, View } from 'react-native';
import { Mail } from 'lucide-react-native';
import {
  AppHeader,
  Field,
  PrimaryButton,
  Screen,
  SecondaryButton,
} from '../design/ui.jsx';
import { useAppTheme } from '../context/theme.context.jsx';

export default function ForgotPassword({ navigation }) {
  const { colors } = useAppTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const continueToVerification = () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setError('Enter a valid email address.');
      return;
    }
    navigation.navigate('EmailVerification', {
      email: normalizedEmail,
      purpose: 'password-change',
    });
  };

  return (
    <Screen>
      <AppHeader title="Reset password" onBack={() => navigation.goBack()} />

      <View className="mt-10 h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft">
        <Mail size={27} color={colors.accent} />
      </View>
      <Text className="mt-7 text-[26px] font-semibold text-ink">Check in with your email</Text>
      <Text className="mt-3 max-w-[330px] text-[15px] leading-6 text-muted">
        Enter the email connected to your vault. We will send a secure reset link if an account exists.
      </Text>

      <View className="mt-9">
        <Field
          label="Email address"
          placeholder="alex@example.com"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setError('');
          }}
          error={error}
          keyboardType="email-address"
          autoCapitalize="none"
          icon={<Mail size={18} color={colors.muted} />}
        />
      </View>
      <PrimaryButton label="Continue" onPress={continueToVerification} />
      <View className="mt-3">
        <SecondaryButton label="Return to sign in" onPress={() => navigation.navigate('Login')} />
      </View>
    </Screen>
  );
}
