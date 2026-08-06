import { useState } from 'react';
import { TextInput, View } from 'react-native';

const TextField = ({IDs,Type = 'text', Name, RequireAutocomplete = false, className = '', error = false, disabled = false}) => {
  const [isFocused, setIsFocused] = useState(false);
  const normalizedType = String(Type || 'text').toLowerCase();
  const isPassword = normalizedType === 'password';

  const borderStyle = error
    ? 'border-rose-400 bg-rose-50'
    : isFocused
      ? 'border-indigo-400 bg-white'
      : 'border-slate-200 bg-slate-50';

  return (
    <View className={`w-full ${className}`}>
      <TextInput
        key={IDs}
        placeholder={Name}
        placeholderTextColor="#94a3b8"
        autoComplete={RequireAutocomplete ? 'name' : 'off'}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!disabled}
        secureTextEntry={isPassword}
        keyboardType={normalizedType === 'email' ? 'email-address' : 'default'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full rounded-2xl border px-4 py-3.5 text-base text-slate-900 ${borderStyle} ${disabled ? 'opacity-60' : ''}`}
      />
    </View>
  );
};

export default TextField;