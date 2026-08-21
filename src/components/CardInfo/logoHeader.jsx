import {View, Text} from 'react-native';

export default function LogoHeader ({category}){
       const accountColors = {
            social: 'bg-blue-500',
            email: 'bg-red-500',
            banking: 'bg-green-600',
            finance: 'bg-green-600'
        };
        const normalizedInput = category?.toLowerCase()
        const bgColor = accountColors[normalizedInput] || 'bg-gray-500';
    
        return (

                <View className={`h-16 w-16 items-center justify-center rounded-full ${bgColor}`}>
                    <Text className="text-2xl font-bold text-white">
                        FA
                    </Text>
                </View>
                )
}