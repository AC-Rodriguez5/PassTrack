import { View, Text, Linking, Pressable} from 'react-native';
import Button from '../components/button.components.jsx';
import TextField from '../components/textField.components.jsx';
import { useNavigation } from '@react-navigation/native'

export default function Register (){

    const navigation = useNavigation();

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
                                />
                                <TextField className ='mt-2'
                                IDs="firstName"
                                Name="First name"
                                Type="text"
                                RequireAutocomplete={true}
                                />
                                <TextField className = 'mt-2'
                                IDs="middleName"
                                Name="Middle name (optional)"
                                Type="email"
                                RequireAutocomplete={false}
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
                                    />
                        </View>
                </View>

                <View className = 'mt-8'>
                        <Button  name="Create Account" onPress={()=> navigation.navigate("Login")} variant="primary" size={65}/>
                </View>


                <View className='items-center mt-2'>
                    <Text className="mt-1 text-center text-sm/6 text-gray-500">
                        Already have an account? < Pressable onPress={() => navigation.navigate('Login')}><Text className = "font-semibold text-indigo-600 hover:text-indigo-500"> 
                            Login</Text></Pressable>
                    </Text>
                </View>
    
            </View>
        </View>
  );
} 
