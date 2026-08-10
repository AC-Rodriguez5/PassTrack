import { Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';

export default function FloatingAddButton() {
    return (
        <Pressable
            className="absolute bottom-[70px] right-5 h-12 w-12 items-center justify-center rounded-full bg-blue-500 shadow-lg"
        >
            <Plus
                size={24}
                color="white"
            />
        </Pressable>
    );
}