import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { COLORS } from './ui/utils';
import DrawerNavigator from './navigation/DrawerNavigator';

function App(): JSX.Element {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: COLORS.dark,
          card: COLORS.dark,
          text: COLORS.white,
          border: COLORS.gray2,
        },
      }}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default App;
