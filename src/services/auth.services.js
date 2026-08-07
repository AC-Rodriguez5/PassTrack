import axios from 'axios';
import {API_URI} from '../config/api.config.js'
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
                console.log(`API_URI: ${API_URI}/user/register`)


                const response = await axios.post(
                    `${API_URI}/user/register`,{
                        firstName, middleName, lastName, email, password
                });
                console.log(response.data);

                
                alert(`data created succesfull`);
                
                navigation.navigate("Login");

            }catch(error){
                alert('something went wrong');
            }
}

export {handleRegister};