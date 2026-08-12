import { Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

export default function FloatingAddButton() {
    const navigation = useNavigation();
    return (
        <Pressable
            className="absolute bottom-[70px] right-5 h-16 w-16 items-center justify-center rounded-full bg-blue-500 shadow-lg"
            onPress={() => navigation.navigate("Add")}
       >
            <Plus
                size={24}
                color="white"
            />

        </Pressable>
    );
}