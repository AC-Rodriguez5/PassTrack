import { View, Text } from 'react-native';

import AccountCard from '../components/Home/accountCard.jsx'
import AccountList from '../components/Home/accountList.jsx'
import AccountSearch from '../components/Home/accountSearch.jsx'
import AccountSectionHeader from '../components/Home/accountSectionHeader.jsx'
import FloatingAddButton from '../components/Home/floatingAddButton.jsx'
import TopHeader from '../components/Home/topHeader.jsx'
import WelcomeHeader from '../components/Home/welcomeHeader.jsx'


export default function Home(){
		const accounts = [
		{
			id: '1',
			name: 'Facebook',
			email: 'ac.rodriguez@gmail.com',
			initials: 'FA',
			category: 'social'
		},
		{
			id: '2',
			name: 'Instagram',
			email: 'ac.rodriguez@gmail.com',
			initials: 'IN',
			category: 'social'
		},
		{
			id: '3',
			name: 'Gmail',
			email: 'ac.rodriguez@gmail.com',
			initials: 'GM',
			category: 'email'
		},
		{
			id: '4',
			name: 'BDO',
			email: 'ac.rodriguez@gmail.com',
			initials: 'BD',
			category: 'banking'
		},
		{
			id: '5',
			name: 'Maya',
			email: 'ac.rodriguez@gmail.com',
			initials: 'MA',
			category: 'finance'
		},
		{
			id: '6',
			name: 'GCash',
			email: 'ac.rodriguez@gmail.com',
			initials: 'GC',
			category: 'finance'
		}
	];

	return (
		

		<View className="flex-1 bg-[#F5F6FA]">

			<TopHeader />

			<View className ="flex-1 px-5">
				<WelcomeHeader />
				<AccountSearch />
				<AccountSectionHeader />
				<AccountList accounts={accounts} />
			</View>

			<FloatingAddButton />
			
		</View>

	);
}