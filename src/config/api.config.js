import Constants from 'expo-constants';

const hostUri = Constants.expoConfig?.hostUri ?? Constants.manifest2?.extra?.expoGo?.debuggerHost ?? 'localhost:8081';
const host = hostUri.split(':')[0];

export const API_URI = `http://${host}:8080/api`; 
