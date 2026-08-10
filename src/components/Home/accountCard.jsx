import { View, Text, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

export default function AccountCard({ account, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            className="mb-2 flex-row items-center rounded-xl border border-gray-200 bg-white px-3 py-3"
        >

            {/* Icon */}
            <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-500">
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