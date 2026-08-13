import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import Button from '../../components/button.components.jsx';
import {useNavigation} from '@react-navigation/native';

export default function DeleteModalStatic() {
    const navigation = useNavigation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
    >
      {/* Dark Backdrop Overlay */}
      <View className="flex-1 bg-black/50 items-center justify-center px-6">
        
        {/* Modal Card */}
        <View className="w-full bg-white rounded-3xl p-6 items-center shadow-lg">
          
          {/* Trash Icon Container */}
          <View className="w-16 h-16 bg-slate-100 rounded-2xl items-center justify-center mb-4">
            <Trash2 size={32} color="#94a3b8" />
          </View>

          {/* Title */}
          <Text className="text-xl font-bold text-slate-900 text-center mb-2">
            Delete Account?
          </Text>

          {/* Description */}
          <Text className="text-sm text-slate-400 text-center leading-5 mb-6">
            This will permanently remove{' '}
            <Text className="font-bold text-slate-600">Facebook</Text> from PassTrack. This cannot be undone.
          </Text>

          {/* Action Buttons */}
            <View className="flex-row gap-3 w-full">
                <View className="flex-1">
                    <Button 
                        name="Delete" 
                        onPress={() => {
                        navigation.goBack();
                        navigation.navigate('MainTabs')
                        alert('Deleted successfully');
                        }}
                        variant="danger" 
                        size={0} 
                    />
                </View>

                <View className="flex-1">
                    <Button 
                        name="Cancel" 
                        onPress={() => navigation.goBack()}
                        variant="cancel" // or "light" depending on your button component variants
                        size={0} 
                    />
                </View>
            </View>

        </View>
      </View>
    </Modal>
  );
}