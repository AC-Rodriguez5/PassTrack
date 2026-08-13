import { View } from 'react-native';
import Button from '../button.components';

export default function CardInfoButton({ navigation }) {
  return (
    <View className="flex-row gap-3 px-6 my-4">
        <View className="flex-1">
            <Button 
            name="Edit" 
            onPress={() => console.log('Edit pressed')}
            variant="primary" 
            size={0} 
            />
        </View>

        <View className="flex-1">
            <Button 
            name="Delete" 
            onPress={() => navigation.navigate("Home")}
            variant="danger" 
            size={0} 
            />
        </View>
    </View>
  );
}