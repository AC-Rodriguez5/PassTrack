import {ArrowLeft, MoreVertical} from 'lucide-react-native';
import {View,Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';



export default function TopHeader(){
    const navigation = useNavigation();
     return(
        <View className ="h-[68px] flex-row items-center justify-between border-b-0 border-gray-200 bg-white px-5">

            <Pressable className="h-9 w-9 items-center justify-center " 
            onPress={() => navigation.navigate("MainTabs")}>
                
                <ArrowLeft size={22} color="#000" />
            </Pressable>

            <Pressable className ="h-9 w-9 items-center justify-center">
                <MoreVertical size={22} color="#000" />
            </Pressable>

        </View>
    )
}