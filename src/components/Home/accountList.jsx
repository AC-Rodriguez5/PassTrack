import { FlatList } from 'react-native';
import AccountCard from './accountCard.jsx';

import {useNavigation} from '@react-navigation/native'

export default function AccountList({ accounts }) {
    const navigation = useNavigation();
    return (
        <FlatList
            data={accounts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <AccountCard
                    account={item}
                    category={item.category}
                    onPress={() =>navigation.navigate("cardInfo")}
                />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 100
            }}
        />
    );
}