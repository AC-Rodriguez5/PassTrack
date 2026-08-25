import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../auth/login.jsx';
import Register from '../auth/register.jsx';
import ForgotPassword from '../auth/forgotPassword.jsx';
import { EmailVerificationScreen, NewPasswordScreen } from '../auth/emailVerification.jsx';
import BottomNavigation from './bottomNav.jsx';
import { AppearanceScreen, PersonalInformationScreen } from '../profile/profile.screens.jsx';
import {
  CategoriesScreen,
  CategoryDetailsScreen,
  CredentialDetailsScreen,
  DeleteConfirmScreen,
  EditCredentialScreen,
  EmptySearchScreen,
  EmptyVaultScreen,
  LoadingStateScreen,
  PasswordGeneratorScreen,
  SearchResultsScreen,
  SearchScreen,
  SecurityFindingDetailsScreen,
  SettingsScreen,
  SuccessStatesScreen,
  ValidationStatesScreen,
} from '../prototype/screens.jsx';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="MainTabs" component={BottomNavigation} options={{ animation: 'fade' }} />
      <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
      <Stack.Screen name="Appearance" component={AppearanceScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="CredentialDetails" component={CredentialDetailsScreen} />
      <Stack.Screen name="EditCredential" component={EditCredentialScreen} />
      <Stack.Screen name="PasswordGenerator" component={PasswordGeneratorScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} />
      <Stack.Screen name="SecurityFindingDetails" component={SecurityFindingDetailsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EmptyVault" component={EmptyVaultScreen} />
      <Stack.Screen name="EmptySearch" component={EmptySearchScreen} />
      <Stack.Screen name="LoadingState" component={LoadingStateScreen} />
      <Stack.Screen name="ValidationStates" component={ValidationStatesScreen} />
      <Stack.Screen name="SuccessStates" component={SuccessStatesScreen} />
      <Stack.Screen name="DeleteConfirm" component={DeleteConfirmScreen} options={{ animation: 'fade' }} />
    </Stack.Navigator>
  );
}
