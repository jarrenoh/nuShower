import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from 'screens/Login';
import Shower from 'screens/shower';
import PurchaseScreen from 'screens/purchase';
import Alert from 'screens/alert';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'> 
        <Stack.Screen options = {{headerShown: false}} name="Login" component={Login}  />
        <Stack.Screen options = {{headerShown: false}} name="Shower" component={Shower} />
        <Stack.Screen options = {{headerShown: false}} name="PurchaseScreen" component={PurchaseScreen} />
        <Stack.Screen options = {{headerShown: false}} name="Alert" component={Alert} />
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