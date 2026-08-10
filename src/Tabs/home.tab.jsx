import { View, Text } from 'react-native';

import AccountCard from '../components/Home/accountCard.jsx'
import AccountList from '../components/Home/accountList.jsx'
import AccountSearch from '../components/Home/accountSearch.jsx'
import AccountSectionHeader from '../components/Home/accountSectionHeader.jsx'
import FloatinAddButton from '../components/Home/floatingAddButton.jsx'
import TopHeader from '../components/Home/topHeader.jsx'
import WelcomeHeader from '../components/Home/welcomeHeader.jsx'


export default function Home(){
	return (
		<View className="flex-1 bg-[#F5F6FA]">

			{/* <TopHeader />

			<View className ="flex-1 px-5">
				<WelcomeHeader />
				<AccountSearch />
				<AccountSectionHeader />
				<AccountList />
			</View>

			<FloatinAddButton />
			 */}
			<Text> HELLO TANGINA</Text>
		</View>

	);
}