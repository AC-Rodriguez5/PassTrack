import { View, Text } from 'react-native';

export default function WelcomeHeader({ firstName = 'Christian' }) {
    return (
        <View className="mb-6 mt-5">

            <Text className="text-base text-gray-800">
                Welcome back,
            </Text>

            <Text className="mt-1 text-[22px] font-bold text-blue-500">
                {firstName}
            </Text>

            <Text className="mt-1 text-xs text-gray-400">
                Your accounts, all in one place.
            </Text>

        </View>
    );
}