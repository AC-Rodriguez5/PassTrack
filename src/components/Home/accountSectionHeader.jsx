import { View, Text } from 'react-native';

export default function AccountSectionHeader({ count = 15 }) {
    return (
        <View className="mb-2 flex-row items-center justify-between">

            <Text className="text-sm font-semibold text-gray-900">
                All Accounts
            </Text>

            <Text className="text-xs text-gray-400">
                {count} accounts
            </Text>

        </View>
    );
}