import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../auth/login.jsx';
import Register from '../auth/register.jsx';
import ForgotPassword from '../auth/forgotPassword.jsx';

import Home from '../Tabs/home.tab.jsx';
import Add from '../Tabs/add.tab.jsx';
import Category from '../Tabs/category.tab.jsx';
import Profile from '../Tabs/profile.tab.jsx';
import Security from '../Tabs/security.tab.jsx';


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
            {/* <Stack.Screen
                name='forgotPass'
                component = {ForgotPassword}
            /> */}


            <Stack.Screen
                name='home'
                component = {Home}
            />
            {/* <Stack.Screen
                name='add'
                component = {Add}
            />
            <Stack.Screen
                name='category'
                component = {Category}
            /> */}
            <Stack.Screen
                name='profile'
                component = {Profile}
            />
            {/* <Stack.Screen
                name='security'
                component = {Security}
            /> */}



        </Stack.Navigator>
    );

}
