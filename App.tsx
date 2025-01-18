import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from 'screens/Login';
import UploadPicture from 'screens/uploadpicture';
import PurchaseScreen from 'screens/purchase';
import Alert from 'screens/alert';
import LeaderboardScreen from 'screens/leaderboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'> 
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UploadPicture" component={UploadPicture} />
        <Stack.Screen name="PurchaseScreen" component={PurchaseScreen} />
        <Stack.Screen name="Alert" component={Alert} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});