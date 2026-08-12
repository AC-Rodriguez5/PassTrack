import { View , Text} from 'react-native';
import AddAccount from '../components/AddAcount/addAcount.form.jsx';
import TopHeader from '../components/AddAcount/AddAccount.topHeader.jsx';

export default function Add(){
   return(
      <View className="flex-1 bg-[#F5F6FA]">
       
         <TopHeader />
       
            <View className ="flex-1 px-5">
               <Text className="mt-5 mb-5 text-gray-400">Fill in the details to save a new account.</Text>
               <AddAccount />
            </View>

                
      </View>
   )
}