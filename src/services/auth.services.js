import axios from 'axios';
import {API_URI} from '../config/api.config.js'

//register new aacounts
const handleRegister = async ({
            firstName,
            middleName,
            lastName,
            email,
            password,
            confirmPassword,
            navigation,
        }) => {
            try{
              
                if(password !== confirmPassword){
                    alert(`password do not match`);
                    return;
                }
                console.log(`API_URI: ${API_URI}/auth/register`)

                const response = await axios.post(
                    `${API_URI}/auth/register`,{
                        firstName, middleName, lastName, email, password
                });
                console.log(response.data);
                alert(`data created succesfull`);
                
                navigation.navigate("Login");

            }catch(error){
                const message = error.response?.data?.message || error.message || 'something went wrong';
                alert(message);
            }
}

const handleLogin = async ({
    email, password, navigation
    }) => {
        try{
            const response = await axios.post(
                `${API_URI}/auth/login`,{
                    email, password
                }
            );
            console.log(response.data);

            navigation.navigate("MainTabs");

        }catch(error){
            const message = error.response?.data?.message || error.message || 'something went wrong';
            alert(message);
        }
}





export {handleRegister, handleLogin};