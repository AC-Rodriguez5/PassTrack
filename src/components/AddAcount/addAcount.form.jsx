import { View, Text, ScrollView } from 'react-native';

import TextField from '../textField.components.jsx';
import Button from '../button.components.jsx';

import { useNavigation } from '@react-navigation/native';

export default function AddAccount() {
    const navigation = useNavigation();
    return (
        <ScrollView 
            className="flex-1 bg-[#F5F6FA] px-5" 
            contentContainerClassName="pb-10"
            showsVerticalScrollIndicator={false}
        >
       
            <View className="justify-center px-6 py-5 bg-white rounded-3xl border border-gray-200">
                <Text className="text-gray-700 font-semibold text-base">Account Name *</Text>
                <TextField 
                    IDs="email"
                    Name="Email Address"
                    Type="email"
                    RequireAutocomplete={true}
                    className="mt-2"
                />

                <Text className="text-gray-700 font-semibold text-base mt-3">Account Name *</Text>
                <TextField 
                    IDs="email"
                    Name="Email Address"
                    Type="email"
                    RequireAutocomplete={true}
                    className="mt-2"
                />

                <Text className="text-gray-700 font-semibold text-base mt-3">Account Name *</Text>
                <TextField 
                    IDs="email"
                    Name="Email Address"
                    Type="email"
                    RequireAutocomplete={true}
                    className="mt-2"
                />

                <Text className="text-gray-700 font-semibold text-base mt-3">Account Name *</Text>
                <TextField 
                    IDs="email"
                    Name="Email Address"
                    Type="email"
                    RequireAutocomplete={true}
                    className="mt-2"
                />
                
                <Text className="text-gray-700 font-semibold text-base mt-3">Account Name *</Text>
                <TextField 
                    IDs="email"
                    Name="Email Address"
                    Type="email"
                    RequireAutocomplete={true}
                    className="mt-2"
                />
                
                <Text className="text-gray-700 font-semibold text-base mt-3">Account Name *</Text>
                <TextField 
                    IDs="email"
                    Name="Email Address"
                    Type="email"
                    RequireAutocomplete={true}
                    className="mt-2"
                />
            </View>

            <Button 
                name="Save Account" 
                onPress={() => console.log('Save pressed')}
                variant="primary" 
                size={0} 
                className="mt-5"
            />

            <Button 
                name="Cancel" 
                onPress={() => navigation.navigate("Home") }
                variant="cancel" 
                size={0} 
                className="mt-3"
            />
        </ScrollView>
    );
}