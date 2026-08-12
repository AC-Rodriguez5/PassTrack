import { View, Text, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

export default function AccountCard({ account,category, onPress }) {
   const accountColors = {
        social: 'bg-blue-500',
        email: 'bg-red-500',
        banking: 'bg-green-600',
        finance: 'bg-green-600'
    };

    return (
        <Pressable
            onPress={onPress}
            className="mb-2 flex-row items-center rounded-xl border border-gray-200 bg-white px-5 py-5"
        >

            {/* Icon */}
            <View className={`h-12 w-12 items-center justify-center rounded-full ${accountColors[account.category]}`}>
                <Text className="text-xs font-bold text-white">
                    {account.initials}
                </Text>
            </View>

            {/* Information */}
            <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-gray-900">
                    {account.name}
                </Text>

                <Text
                    numberOfLines={1}
                    className="mt-0.5 text-[11px] text-gray-400"
                >
                    {account.email}
                </Text>
            </View>

            {/* Arrow */}
            <ChevronRight
                size={18}
                color="#C4CAD4"
            />

        </Pressable>
    );
}