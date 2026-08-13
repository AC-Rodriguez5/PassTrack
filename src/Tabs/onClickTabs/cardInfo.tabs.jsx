import {View, Text} from 'react-native';

import TopHeader from '../../components/CardInfo/TopHeader.jsx';
import LogoHeader from '../../components/CardInfo/logoHeader.jsx';
import CardForm from '../../components/CardInfo/cardForm.jsx';
import AdditionalCardForm from '../../components/CardInfo/cardForm.additional.jsx';
import CardInfoButton from '../../components/CardInfo/Button.CardInfo.jsx';

export default function CardInfo(){
    return(
        <View className=" ">
        
                    <TopHeader />
        
                    <View className ="flex-1 px-5 items-center mt-5">
                       <LogoHeader category = "social"/>
                       <Text className="font-bold text-xl mt-2">Facebook</Text>
                    </View>
                    <CardForm />
                    <AdditionalCardForm />
                    <CardInfoButton />
                </View>
    )
}