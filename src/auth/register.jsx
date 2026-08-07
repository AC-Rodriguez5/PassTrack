import { View, Text, Pressable} from 'react-native';
import Button from '../components/button.components.jsx';
import TextField from '../components/textField.components.jsx';
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react';
import { handleRegister } from '../services/auth.services.js'


export default function Register (){
    const[firstName, setFirstName] = useState("");
    const[middleName, setMiddleName] = useState("");
    const[lastName, setLastName] = useState("");
    
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const[confirmPassword, setConfirmPassword] = useState("");

    const navigation = useNavigation();

    const handleSubmit = async () => {
        await handleRegister({
            firstName,
            middleName,
            lastName,
            email,
            password,
            confirmPassword,
            navigation,
        });
    };

    return (
    <View className="flex-1 justify-center px-6 py-12">

            <View className="w-full items-center mb-10">
                <Text className="mt-10 text-center text-2xl font-bold text-gray-900">
                    Create Account
                </Text>
                <Text className='text-gray-400'>Sign Up to start managing your passwords.</Text>
            </View>

            <View className="mt-10 w-full">
            
            <View className = 'mt-2'>
                    <Text className="block text-sm/6 font-medium text-gray-900">Full Name</Text>
                        <View className='mb-2'>
                            <TextField
                                IDs="lastName"
                                Name="Last name"
                                Type="text"
                                RequireAutocomplete={true}
                                value = {lastName}
                                onChangeText = {setLastName}
                                />
                                <TextField className ='mt-2'
                                IDs="firstName"
                                Name="First name"
                                Type="text"
                                RequireAutocomplete={true}
                                value = {firstName}
                                onChangeText = {setFirstName}
                                />
                                <TextField className = 'mt-2'
                                IDs="middleName"
                                Name="Middle name (optional)"
                                Type="email"
                                RequireAutocomplete={false}
                                value = {middleName}
                                onChangeText={setMiddleName}
                                />
                        </View>
                </View>

                <View className = 'mt-2'>
                    <Text className="block text-sm/6 font-medium text-gray-900"> Email</Text>
                        <View className='mb-2'>
                            <TextField
                                IDs="email"
                                Name="Juandelacruz@gmail.com"
                                Type="email"
                                RequireAutocomplete={true}
                                value = {email}
                                onChangeText = {setEmail}
                            />
                        </View>
                </View>
            
            <View className = 'mt-2'>
                    <View className = "flex-row items-center justify-between">
                        <Text className="block text-sm/6 font-medium text-gray-900">Password</Text>
                    </View>
                        <View className='mb-2'>
                            <TextField
                                    IDs="password"
                                    Name="Password"
                                    Type="password"
                                    RequireAutocomplete={true}
                                    value = {password}
                                    onChangeText = {setPassword}
                                    />
                        </View>
                        <View className = "flex-row items-center justify-between">
                        <Text className="block text-sm/6 font-medium text-gray-900">Confirm Password</Text>
                    </View>
                        <View className='mb-2'>
                            <TextField
                                    IDs="confirmPassword"
                                    Name="Password"
                                    Type="password"
                                    RequireAutocomplete={true}
                                    value ={confirmPassword}
                                    onChangeText= {setConfirmPassword}
                                    />
                        </View>
                </View>

                <View className = 'mt-8'>
                    <Button
                        name="Create Account"
                        onPress={() => {
                            console.log("BUTTON PRESSED");

                            handleRegister({
                                firstName,
                                middleName,
                                lastName,
                                email,
                                password,
                                confirmPassword,
                                navigation,
                            });
                        }}
                        variant="primary"
                        size={65}
                    />
                </View>


                <View className='items-center mt-2'>
                    <Text className="mt-1 text-center text-sm/6 text-gray-500">
                        Already have an account? < Pressable onPress={()=> navigation.navigate("Login")}><Text className = "font-semibold text-indigo-600 hover:text-indigo-500"> 
                            Login</Text></Pressable>
                    </Text>
                </View>
    
            </View>
        </View>
  );
} 
