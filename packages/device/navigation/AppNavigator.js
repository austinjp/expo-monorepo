import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;

// import React from 'react';
// import { createCompatNavigatorFactory, createSwitchNavigator } from '@react-navigation/compat';
// import { NavigationContainer } from '@react-navigation/native';
// 
// import MainTabNavigator from './MainTabNavigator';
// 
// export default function AppNavigator() {
//   const Csn = createSwitchNavigator({
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     Main: MainTabNavigator,
//   });
// 
//   return (
//     <NavigationContainer />
//   )
//   // return (
//   //   <NavigationContainer><Csn /></NavigationContainer>
//   // )
// };
