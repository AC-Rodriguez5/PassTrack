import {View , Pressable, Text} from 'react-native';
import {X} from 'lucide-react-native';
import {useNavigation} from'@react-navigation/native';


export default function TopHeader(){
    const navigation = useNavigation();
    return(
        <View className ="h-[68px] flex-row items-center   border-b border-gray-200 bg-white px-5">

            <Pressable className="h-9 w-9 items-center justify-center" 
             onPress={() => navigation.navigate("Home")}>
                <X size={24} color="#000" />
            </Pressable>
            
            <Text className=" flex-1 text-center font-bold text-xl">Add New Account</Text>

            

        </View>
    )
}