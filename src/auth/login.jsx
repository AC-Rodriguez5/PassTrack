import { View, Text, Linking, Pressable} from 'react-native';
import Button from '../components/button.jsx';
import TextField from '../components/textField.jsx';

const Login = () => {
  return (
    <View className="flex-1 justify-center px-6 py-12">

        <View className="w-full items-center mb-10">
             <Text className="mt-10 text-center text-2xl font-bold text-gray-900">
                PassTrack
            </Text>
            <Text className='text-gray-400'>your accounts, all in one place.</Text>
        </View>

        <View className="mt-10 w-full">
           
           <View className = 'mt-2'>
                <Text className="block text-sm/6 font-medium text-gray-900">Email Address</Text>
                    <View className='mb-2'>
                        <TextField
                            IDs="email"
                            Name="Email Address"
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
            </View>

            <View className = 'mt-8'>
                <Button name="Log in" variant="primary" size={65}/>
            </View>


            <View className='items-center mt-2'>
                <Text class="mt-10 text-center text-sm/6 text-gray-500">
                    Dont Have an Account? < Pressable onPress={() => Linking.openURL('https://youtube.com')}><Text className = "font-semibold text-indigo-600 hover:text-indigo-500">Sign UP</Text></Pressable>
                </Text>
                <Pressable onPress={() => Linking.openURL('https://youtube.com')}>
                    <Text className = "font-semibold text-indigo-600 hover:text-indigo-500">Forgot Password</Text>
                </Pressable>
            </View>
  
        </View>
    </View>
  );
};

export default Login;