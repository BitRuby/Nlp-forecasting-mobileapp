/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import List from '../ui/List';
import { COLORS } from '../ui/utils';

const Drawer = createDrawerNavigator();

function DrawerContent(props: DrawerContentComponentProps) {
  const onElementClick = (name: string) => {
    return props.navigation.navigate(name);
  };

  const getCurrentRouteName = (): string => {
    const state = props.navigation.getState().routes[0].state;
    if (state?.index) {
      return state?.routes[state.index].name;
    }
    return 'Start';
  };

  const getRouteNames = (): string[] => {
    const state = props.navigation.getState().routes[0].state;
    return state?.routeNames || [];
  };

  return (
    <List
      onSelect={onElementClick}
      data={getRouteNames().map(e => ({
        id: e,
        data: {
          name: e,
        },
      }))}
      selected={[getCurrentRouteName()]}
      style={styles.list}
      selectedStyles={styles.selectedList}
    />
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  list: {
    borderWidth: 0,
  },
  selectedList: {
    backgroundColor: COLORS.green,
  },
});
