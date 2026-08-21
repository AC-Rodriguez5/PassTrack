import { View, TextInput, Pressable } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';

export default function AccountSearch() {
    return (
        <View className="mb-5 h-[42px] flex-row items-center rounded-xl border border-gray-200 bg-white px-3">

            <Search size={17} color="#AAB2C0" />

            <TextInput
                placeholder="Search accounts"
                placeholderTextColor="#B8BFCA"
                className="ml-2 flex-1 text-sm text-gray-800 focus:outline-none"
            />

            <Pressable>
                <SlidersHorizontal
                    size={17}
                    color="#8D96A5"
                />
            </Pressable>

        </View>
    );
}