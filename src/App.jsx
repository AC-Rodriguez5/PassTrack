import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './appNavigation/app.navigation.jsx'

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
   
  );
}


