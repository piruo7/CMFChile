import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/* SCREENS */
import InitialScreen from '../screens/InitialScreen';
import IndicatorsScreen from '../screens/IndicatorsScreen';
import IndicatorHistoryScreen from '../screens/IndicatorHistoryScreen';
import IndicatorDetailScreen from '../screens/IndicatorDetailScreen';

export type RootStackParams = {
  InitialScreen: {navigation: undefined; route: undefined};
  IndicatorsScreen: {navigation: undefined; route: undefined};
  IndicatorHistoryScreen: {navigation: undefined; route: undefined};
  IndicatorDetailScreen: {navigation: undefined; route: undefined};
};

const Stack = createNativeStackNavigator<RootStackParams>();

export function Navigation() {
  return (
    <Stack.Navigator initialRouteName={'InitialScreen'}>
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen
        name="IndicatorsScreen"
        component={IndicatorsScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="IndicatorHistoryScreen"
        component={IndicatorHistoryScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="IndicatorDetailScreen"
        component={IndicatorDetailScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}
