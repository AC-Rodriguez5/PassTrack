import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../auth/login.jsx';
import Register from '../auth/register.jsx';
import ForgotPassword from '../auth/forgotPassword.jsx';
import onClickCardInfo from '../Tabs/onClickTabs/cardInfo.tabs.jsx';
import Security from '../Tabs/security.tab.jsx';

import BottomNavigation from './bottomNav.jsx';


const Stack = createNativeStackNavigator();

export default function appNavigator(){

    return(
        <Stack.Navigator
            initialRouteName = 'Login'
            screenOptions = {{
                headerShown:false
            }}
        >

            <Stack.Screen
                name='Login'
                component = {Login}
            />
            <Stack.Screen
                name='register'
                component = {Register}
            />
            <Stack.Screen
                name='forgotPass'
                component = {ForgotPassword}
            />

            <Stack.Screen 
                name='MainTabs'
                component ={BottomNavigation}
            />
            
            <Stack.Screen
                name='security'
                component = {Security}
            />

            <Stack.Screen 
                name ='cardInfo'
                component = {onClickCardInfo}
            />



        </Stack.Navigator>
    );

}
