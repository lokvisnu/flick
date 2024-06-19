/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { colors } from './src/theme';
import HomeScreen from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { NotificationProvider } from './src/context/NotoficationContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const MainStack = createNativeStackNavigator();
  const backgroundStyle = {
    backgroundColor: colors.primaryBackground,
    flex: 1,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <NotificationProvider>
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen name="Home" component={HomeScreen} options={{
            headerShown: false,

          }} />
        </MainStack.Navigator>
      </NavigationContainer>
      </NotificationProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
