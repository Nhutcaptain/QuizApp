import React from 'react';
import { View, StatusBar } from 'react-native';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native'; 
import Router from './src/routers/Router';

export default function App() {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" hidden={true} />
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </View>
  );
}