import { FlatList } from 'react-native';
import AccountCard from './accountCard.jsx';

export default function AccountList({ accounts }) {
    return (
        <FlatList
            data={accounts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <AccountCard
                    account={item}
                    category={item.category}
                    onPress={() => console.log(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 100
            }}
        />
    );
}