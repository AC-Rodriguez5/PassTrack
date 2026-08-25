import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { cva } from 'class-variance-authority';
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  MoreVertical,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
} from 'lucide-react-native';
import { cn } from './cn.js';
import { useAppTheme } from '../context/theme.context.jsx';

export const palette = {
  canvas: '#F4F6F4',
  surface: '#FFFFFF',
  ink: '#17201D',
  muted: '#66736E',
  line: '#DDE3DF',
  accent: '#2F7D6D',
  accentSoft: '#E5F0ED',
  warning: '#A66A19',
  danger: '#B14E4E',
  success: '#39775A',
};

export function Screen({
  children,
  scroll = true,
  contentClassName = 'px-5 pb-12',
  edges = ['top', 'left', 'right'],
}) {
  const scrollRef = useRef(null);

  useFocusEffect(useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, []));

  const content = scroll ? (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerClassName={contentClassName}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View className={cn('flex-1', contentClassName)}>{children}</View>
  );

  return <SafeAreaView edges={edges} className="flex-1 bg-canvas">{content}</SafeAreaView>;
}

export function MotionPressable({
  children,
  className,
  containerClassName,
  layout,
  onPressIn,
  onPressOut,
  style,
  disabled,
  ...props
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: disabled ? 0.5 : 1,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View layout={layout} className={containerClassName} style={[animatedStyle, style]}>
      <Pressable
        {...props}
        disabled={disabled}
        className={className}
        onPressIn={(event) => {
          scale.value = withTiming(0.975, { duration: 110, easing: Easing.out(Easing.quad) });
          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          scale.value = withTiming(1, { duration: 160, easing: Easing.out(Easing.quad) });
          onPressOut?.(event);
        }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

export function BrandMark({ size = 64, compact = false }) {
  const { isDark } = useAppTheme();
  return (
    <View className="flex-row items-center">
      <View
        className="items-center justify-center overflow-hidden"
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.22,
          backgroundColor: isDark ? '#F4F6F4' : 'transparent',
        }}
      >
        <Image
          source={require('../../assets/passtrack-mark.png')}
          style={{ width: size, height: size }}
          resizeMode="contain"
          accessibilityLabel="PassTrack"
        />
      </View>
      {!compact && (
        <View className="ml-3">
          <Text className="text-[22px] font-semibold text-ink">PassTrack</Text>
          <Text className="mt-0.5 text-xs text-muted">Quietly protected</Text>
        </View>
      )}
    </View>
  );
}

export function AppHeader({ title, subtitle, onBack, right }) {
  const { colors } = useAppTheme();
  return (
    <Animated.View
      entering={FadeInDown.springify().damping(26).stiffness(280)}
      className="mb-6 mt-3 min-h-12 flex-row items-center"
    >
      {onBack && (
        <MotionPressable
          onPress={onBack}
          className="mr-3 h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface"
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={20} color={colors.ink} />
        </MotionPressable>
      )}
      <View className="min-w-0 flex-1">
        <Text className="text-[24px] font-semibold text-ink">{title}</Text>
        {subtitle ? <Text className="mt-1 text-sm text-muted">{subtitle}</Text> : null}
      </View>
      {right}
    </Animated.View>
  );
}

export function SectionHeader({ title, action, onAction }) {
  return (
    <View className="mb-3 mt-7 flex-row items-center justify-between">
      <Text className="text-[17px] font-semibold text-ink">{title}</Text>
      {action ? (
        <MotionPressable onPress={onAction} className="min-h-11 justify-center px-1">
          <Text className="text-sm font-medium text-accent">{action}</Text>
        </MotionPressable>
      ) : null}
    </View>
  );
}

export function SearchField({ placeholder = 'Search accounts, websites, or usernames', onPress }) {
  const { colors } = useAppTheme();
  return (
    <MotionPressable
      onPress={onPress}
      className="h-12 flex-row items-center rounded-xl border border-line bg-surface px-4"
      accessibilityRole="search"
    >
      <Search size={19} color={colors.muted} />
      <Text className="ml-3 flex-1 text-sm text-muted" numberOfLines={1}>{placeholder}</Text>
      <SlidersHorizontal size={18} color={colors.muted} />
    </MotionPressable>
  );
}

export function Field({ label, placeholder, value, error, multiline = false, icon, ...inputProps }) {
  const [focused, setFocused] = useState(false);
  const { colors } = useAppTheme();

  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-medium text-ink">{label}</Text>
      <View
        className={cn(
          'min-h-12 flex-row items-center rounded-xl border bg-surface px-4',
          error ? 'border-danger' : focused ? 'border-accent' : 'border-line',
        )}
      >
        {icon ? <View className="mr-3">{icon}</View> : null}
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          multiline={multiline}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn('flex-1 text-[15px] text-ink', multiline ? 'min-h-24 py-3' : 'h-12')}
          {...inputProps}
        />
      </View>
      {error ? <Text className="mt-1.5 text-xs text-danger">{error}</Text> : null}
    </View>
  );
}

export function PasswordField({
  label = 'Password',
  value = 'N7!kP9#vQ2@Lm8',
  masked = true,
  error,
  action,
  onAction,
  onChangeText,
  placeholder = 'Enter your password',
  ...inputProps
}) {
  const [visible, setVisible] = useState(!masked);
  const [focused, setFocused] = useState(false);
  const { colors } = useAppTheme();

  return (
    <View className="mb-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-sm font-medium text-ink">{label}</Text>
        {action ? (
          <MotionPressable onPress={onAction} className="min-h-8 justify-center">
            <Text className="text-xs font-semibold text-accent">{action}</Text>
          </MotionPressable>
        ) : null}
      </View>
      <View className={cn(
        'h-12 flex-row items-center rounded-xl border bg-surface px-4',
        error ? 'border-danger' : focused ? 'border-accent' : 'border-line',
      )}>
        <KeyRound size={18} color={colors.muted} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="ml-3 h-12 flex-1 text-[15px] text-ink"
          {...inputProps}
        />
        <MotionPressable
          onPress={() => setVisible((current) => !current)}
          className="h-10 w-10 items-end justify-center"
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff size={19} color={colors.muted} /> : <Eye size={19} color={colors.muted} />}
        </MotionPressable>
      </View>
      {error ? <Text className="mt-1.5 text-xs text-danger">{error}</Text> : null}
    </View>
  );
}

const buttonVariants = cva(
  'min-h-12 flex-row items-center justify-center rounded-xl border px-5',
  {
    variants: {
      variant: {
        default: 'border-accent bg-accent',
        secondary: 'border-line bg-surface',
        outline: 'border-line bg-transparent',
        ghost: 'border-transparent bg-transparent',
        inverse: 'border-transparent bg-white/10',
        destructive: 'border-danger bg-danger',
        dangerOutline: 'border-danger bg-surface',
      },
      size: {
        default: 'min-h-12 px-5',
        sm: 'min-h-10 px-4',
        icon: 'h-11 w-11 px-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const buttonLabelVariants = cva('text-[15px] font-semibold', {
  variants: {
    variant: {
      default: 'text-white',
      secondary: 'text-ink',
      outline: 'text-ink',
      ghost: 'text-ink',
      inverse: 'text-white',
      destructive: 'text-white',
      dangerOutline: 'text-danger',
    },
  },
  defaultVariants: { variant: 'default' },
});

export function Button({
  label,
  onPress,
  icon,
  variant = 'default',
  size = 'default',
  className,
  containerClassName,
  disabled,
}) {
  return (
    <MotionPressable
      onPress={onPress}
      disabled={disabled}
      containerClassName={containerClassName}
      className={cn(buttonVariants({ variant, size }), className)}
      accessibilityRole="button"
    >
      {icon ? <View className="mr-2">{icon}</View> : null}
      {label ? <Text className={buttonLabelVariants({ variant })}>{label}</Text> : null}
    </MotionPressable>
  );
}

export function PrimaryButton({ destructive = false, ...props }) {
  return <Button variant={destructive ? 'destructive' : 'default'} {...props} />;
}

export function SecondaryButton({ danger = false, ...props }) {
  return <Button variant={danger ? 'dangerOutline' : 'secondary'} {...props} />;
}

export function ServiceIcon({ item, size = 44 }) {
  return (
    <View
      className="items-center justify-center rounded-xl"
      style={{ width: size, height: size, backgroundColor: item.tone }}
    >
      <Text className="text-xs font-bold" style={{ color: item.color }}>{item.initials}</Text>
    </View>
  );
}

export function CredentialRow({ item, onPress, showPassword = false }) {
  const { colors } = useAppTheme();
  return (
    <MotionPressable
      onPress={onPress}
      layout={LinearTransition.duration(180)}
      className="min-h-[72px] flex-row items-center border-b border-line py-3"
      accessibilityRole="button"
    >
      <ServiceIcon item={item} />
      <View className="ml-3 min-w-0 flex-1">
        <View className="flex-row items-center">
          <Text className="flex-shrink text-[15px] font-semibold text-ink" numberOfLines={1}>{item.name}</Text>
          {item.favorite ? <Star className="ml-1.5" size={13} color={colors.warning} fill={colors.warning} /> : null}
        </View>
        <Text className="mt-0.5 text-[13px] text-muted" numberOfLines={1}>{item.username}</Text>
        {showPassword ? <Text className="mt-0.5 text-xs text-muted">••••••••••••</Text> : null}
      </View>
      <View className="ml-3 items-end">
        <Text className="mb-2 text-[11px] text-muted">{item.category}</Text>
        <MoreVertical size={18} color={colors.muted} />
      </View>
    </MotionPressable>
  );
}

export function CategoryChip({ label, selected = false, onPress, containerClassName = 'mr-2' }) {
  return (
    <MotionPressable
      onPress={onPress}
      containerClassName={containerClassName}
      className={cn(
        'min-h-10 justify-center rounded-full border px-4',
        selected ? 'border-accent bg-accent-soft' : 'border-line bg-surface',
      )}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text className={cn('text-sm font-medium', selected ? 'text-accent' : 'text-muted')}>{label}</Text>
    </MotionPressable>
  );
}

export function SecurityHealth({ compact = false, onPress }) {
  const { colors } = useAppTheme();
  return (
    <Animated.View entering={FadeInDown.delay(60).springify().damping(26).stiffness(280)}>
      <MotionPressable onPress={onPress} className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface">
        <View className="flex-row items-center p-5">
          <View className="h-14 w-14 items-center justify-center rounded-full border-[5px] border-accent-soft">
            <Text className="text-lg font-semibold text-accent">82</Text>
          </View>
          <View className="ml-4 min-w-0 flex-1">
            <View className="flex-row items-center">
              <ShieldCheck size={18} color={colors.accent} />
              <Text className="ml-2 text-[16px] font-semibold text-ink">Security health</Text>
            </View>
            <Text className="mt-1 text-sm text-muted">Good · 3 items need attention</Text>
            {!compact && (
              <View className="mt-3 flex-row items-center">
                <Text className="text-xs text-warning">2 weak</Text>
                <View className="mx-2 h-1 w-1 rounded-full bg-line" />
                <Text className="text-xs text-danger">1 reused</Text>
                <View className="mx-2 h-1 w-1 rounded-full bg-line" />
                <Text className="text-xs text-success">0 exposed</Text>
              </View>
            )}
          </View>
          <ChevronRight size={18} color={colors.muted} />
        </View>
        <View className="h-1 flex-row bg-line">
          <View className="w-[82%] bg-accent" />
        </View>
      </MotionPressable>
    </Animated.View>
  );
}

export function SecurityFinding({ item, onPress }) {
  const { colors } = useAppTheme();
  const tone = item.severity === 'danger' ? colors.danger : item.severity === 'warning' ? colors.warning : item.severity === 'safe' ? colors.success : colors.muted;
  return (
    <MotionPressable onPress={onPress} className="flex-row items-center border-b border-line py-4">
      <View className="h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${tone}16` }}>
        {item.severity === 'safe' ? <Check size={19} color={tone} /> : <AlertTriangle size={19} color={tone} />}
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-[15px] font-semibold text-ink">{item.title}</Text>
        <Text className="mt-0.5 text-xs text-muted">{item.detail}</Text>
      </View>
      <ChevronRight size={18} color={colors.muted} />
    </MotionPressable>
  );
}

export function SettingsRow({ icon, title, detail, value, onPress, danger = false }) {
  const { colors } = useAppTheme();
  return (
    <MotionPressable onPress={onPress} className="min-h-[58px] flex-row items-center border-b border-line py-3">
      <View className="h-9 w-9 items-center justify-center rounded-lg bg-accent-soft">{icon}</View>
      <View className="ml-3 flex-1">
        <Text className={`text-[15px] font-medium ${danger ? 'text-danger' : 'text-ink'}`}>{title}</Text>
        {detail ? <Text className="mt-0.5 text-xs text-muted">{detail}</Text> : null}
      </View>
      {value ? <Text className="mr-2 text-sm text-muted">{value}</Text> : null}
      <ChevronRight size={17} color={colors.muted} />
    </MotionPressable>
  );
}

export function DetailRow({ label, value, action = 'Copy', last = false }) {
  return (
    <View className={`py-4 ${last ? '' : 'border-b border-line'}`}>
      <Text className="text-xs font-medium uppercase text-muted">{label}</Text>
      <View className="mt-2 flex-row items-center">
        <Text className="flex-1 text-[15px] text-ink">{value}</Text>
        <MotionPressable className="ml-3 min-h-10 flex-row items-center justify-center rounded-lg bg-accent-soft px-3">
          <Copy size={15} color={palette.accent} />
          <Text className="ml-1.5 text-xs font-semibold text-accent">{action}</Text>
        </MotionPressable>
      </View>
    </View>
  );
}

export function EmptyState({ title, description, action, onAction, icon }) {
  const { colors } = useAppTheme();
  return (
    <View className="flex-1 items-center justify-center px-6 py-16">
      <View className="h-20 w-20 items-center justify-center rounded-2xl border border-line bg-surface">
        {icon || <KeyRound size={30} color={colors.accent} />}
      </View>
      <Text className="mt-6 text-center text-xl font-semibold text-ink">{title}</Text>
      <Text className="mt-2 max-w-[280px] text-center text-sm leading-5 text-muted">{description}</Text>
      {action ? <View className="mt-6 w-full"><PrimaryButton label={action} onPress={onAction} /></View> : null}
    </View>
  );
}

export function Toast({ message, kind = 'success' }) {
  const success = kind === 'success';
  return (
    <Animated.View
      entering={FadeInUp.springify().damping(24).stiffness(260)}
      className="flex-row items-center rounded-xl border border-line bg-[#14201C] px-4 py-3"
    >
      <View className={`h-6 w-6 items-center justify-center rounded-full ${success ? 'bg-accent' : 'bg-warning'}`}>
        {success ? <Check size={14} color="white" /> : <AlertTriangle size={14} color="white" />}
      </View>
      <Text className="ml-3 flex-1 text-sm font-medium text-white">{message}</Text>
    </Animated.View>
  );
}

export function Switch({ checked, defaultChecked = true, onCheckedChange }) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const progress = useSharedValue(isChecked ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isChecked ? 1 : 0, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });
  }, [isChecked, progress]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 20 }],
  }));

  const toggle = () => {
    const nextValue = !isChecked;
    if (!isControlled) setInternalChecked(nextValue);
    onCheckedChange?.(nextValue);
  };

  return (
    <Pressable
      onPress={toggle}
      className={cn('h-7 w-12 justify-center rounded-full p-1', isChecked ? 'bg-accent' : 'bg-line')}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked }}
    >
      <Animated.View style={thumbStyle} className="h-5 w-5 rounded-full bg-white" />
    </Pressable>
  );
}

function SkeletonBlock({ className }) {
  const opacity = useSharedValue(0.45);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 850, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={animatedStyle} className={cn('bg-line', className)} />;
}

export function SkeletonCredential() {
  return (
    <View className="flex-row items-center border-b border-line py-4">
      <SkeletonBlock className="h-11 w-11 rounded-xl" />
      <View className="ml-3 flex-1">
        <SkeletonBlock className="h-3 w-28 rounded" />
        <SkeletonBlock className="mt-2 h-2.5 w-40 rounded" />
      </View>
      <SkeletonBlock className="h-3 w-12 rounded" />
    </View>
  );
}
