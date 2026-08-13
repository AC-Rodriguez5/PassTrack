import { Pressable, Text } from 'react-native';

const Button = ({ name, variant = 'primary', size, onPress, disabled = false, className = '' }) => {
  const buttonStyle =
    variant === 'primary'? 'bg-blue-500 shadow-blue-500/20 active:bg-blue-600'
                :variant === 'danger' ? 'bg-red-500 shadow-red-500/20 active:bg-red-600'
                :variant === 'secondary' || variant === 'cancel' ? 'bg-white active:bg-slate-200 border border-slate-200'
                : 'border border-blue-500 bg-white active:bg-blue-50'; // Default / Outline

  const textStyle = variant === 'primary' ? 'text-white' :
                    variant === 'secondary || variant cancel' ? 'text-white' :
                    variant === 'danger' ? 'text-white' : 'text-slate-700';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      className={`w-${size} items-center justify-center rounded-2xl px-1.5 py-3.5  ${buttonStyle} ${disabled ? 'opacity-60' : ''} ${className}`}
    >
      <Text className={`text-sm font-semibold ${textStyle}`}>{name}</Text>
    </Pressable>
  );
};

export default Button;