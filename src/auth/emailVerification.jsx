import { useState } from 'react';
import { Text, View } from 'react-native';
import { MailCheck, RotateCw } from 'lucide-react-native';
import {
  AppHeader,
  Field,
  PasswordField,
  PrimaryButton,
  Screen,
  SecondaryButton,
} from '../design/ui.jsx';
import { useAppTheme } from '../context/theme.context.jsx';

function maskEmail(email = '') {
  const [local = '', domain = ''] = email.split('@');
  if (!domain) return email;
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${'*'.repeat(Math.max(local.length - visible.length, 3))}@${domain}`;
}

export function EmailVerificationScreen({ navigation, route }) {
  const { colors } = useAppTheme();
  const email = route.params?.email ?? '';
  const purpose = route.params?.purpose ?? 'registration';
  const [code, setCode] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState(`A six-digit code was sent to ${maskEmail(email)}.`);
  const [error, setError] = useState('');

  const sendVerification = () => {
    setError('');
    setDeliveryMessage(`A new six-digit code was sent to ${maskEmail(email)}.`);
  };

  const verify = () => {
    if (!/^\d{6}$/.test(code)) {
      setError('Enter the six-digit code from your email.');
      return;
    }

    setError('');
    if (purpose === 'password-change') {
      navigation.replace('NewPassword', { email, code });
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <Screen>
      <AppHeader
        title="Verify your email"
        subtitle={purpose === 'password-change' ? 'Confirm your identity before changing your password.' : 'One final step protects your new account.'}
        onBack={() => navigation.goBack()}
      />

      <View className="h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft">
        <MailCheck size={28} color={colors.accent} />
      </View>
      <Text className="mt-6 text-[22px] font-semibold text-ink">Check {maskEmail(email)}</Text>
      <Text className="mt-2 text-sm leading-6 text-muted">
        Enter the verification code from the email. Codes should expire quickly and can only be used once.
      </Text>

      {deliveryMessage ? (
        <View className="mt-6 rounded-xl border border-line bg-surface px-4 py-3">
          <Text className="text-sm text-success">{deliveryMessage}</Text>
        </View>
      ) : null}

      {error ? (
        <View className="mt-6 rounded-xl border border-danger bg-surface px-4 py-3">
          <Text className="text-sm leading-5 text-danger">{error}</Text>
        </View>
      ) : null}

      <View className="mt-7">
        <Field
          label="Six-digit verification code"
          placeholder="000000"
          value={code}
          onChangeText={(value) => setCode(value.replace(/\D/g, '').slice(0, 6))}
          keyboardType="number-pad"
          maxLength={6}
          textContentType="oneTimeCode"
          autoComplete="one-time-code"
        />
      </View>

      <PrimaryButton
        label="Verify email"
        onPress={verify}
      />
      <View className="mt-3">
        <SecondaryButton
          label="Send a new code"
          icon={<RotateCw size={16} color={colors.accent} />}
          onPress={sendVerification}
        />
      </View>
    </Screen>
  );
}

export function NewPasswordScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmation) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    navigation.replace('Login');
  };

  return (
    <Screen>
      <AppHeader title="Create a new password" subtitle="Use a password you have not used elsewhere." onBack={() => navigation.goBack()} />
      <PasswordFieldWithConfirmation
        password={password}
        confirmation={confirmation}
        setPassword={setPassword}
        setConfirmation={setConfirmation}
      />
      {error ? <Text className="mb-4 text-sm text-danger">{error}</Text> : null}
      <PrimaryButton label="Update password" onPress={submit} />
    </Screen>
  );
}

function PasswordFieldWithConfirmation({ password, confirmation, setPassword, setConfirmation }) {
  return (
    <>
      <PasswordField label="New password" value={password} onChangeText={setPassword} autoComplete="new-password" />
      <PasswordField label="Confirm new password" value={confirmation} onChangeText={setConfirmation} autoComplete="new-password" />
    </>
  );
}
