import { Pressable, Text } from 'react-native';

const Button = ({ name, variant = 'primary', size, onPress, disabled = false, className = '' }) => {
  const buttonStyle =
    variant === 'primary'
      ? 'bg-indigo-600 shadow-indigo-600/20'
      : variant === 'danger'
        ? 'bg-rose-600 shadow-rose-600/20'
        : 'border border-slate-200 bg-white shadow-slate-200';

  const textStyle = variant === 'primary' ? 'text-white' : 'text-slate-700';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      className={`w-${size} items-center justify-center rounded-2xl px-1.5 py-3.5 shadow-sm ${buttonStyle} ${disabled ? 'opacity-60' : ''} ${className}`}
    >
      <Text className={`text-sm font-semibold ${textStyle}`}>{name}</Text>
    </Pressable>
  );
};

export default Button;