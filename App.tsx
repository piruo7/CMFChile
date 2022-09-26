import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import {Navigation} from './src/navigation/Navigation';

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
      ...DefaultTheme.colors,
      primary: '#6d4c95',
      secondary: '#f1c40f',
      tertiary: '#ffffff',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle="dark-content"
          />
          <Navigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
