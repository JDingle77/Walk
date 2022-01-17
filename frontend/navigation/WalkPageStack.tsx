import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WalkPage from '../screens/WalkPage';
import WalkTrackingPage from '../screens/WalkTrackingPage';

const Stack = createNativeStackNavigator();

export default function WalkPageNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="WalkPage" component={WalkPage} />
        <Stack.Screen name="WalkTracking" component={WalkTrackingPage} />
    </Stack.Navigator>
  );
}