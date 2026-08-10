import {View , Pressable, Text} from 'react-native';
import {Menu} from 'lucide-react-native';

export default function TopHeader(){
    return(
        <View className ="h-[68px] flex-row items-center justify-between border-b border-gray-200 bg-white px-5">

            <Pressable className="h-9 w-9 items-center justify-center rounded-full bg-blue-500">
                <Menu size={22} color="#111827" />
            </Pressable>

            <Pressable className ="h-9 w-9 items-center justify-center rounded-full bg-blue-500">
                <Text className ="text-xs font-bold text-white">
                    CR
                </Text>
            </Pressable>

        </View>
    )
}