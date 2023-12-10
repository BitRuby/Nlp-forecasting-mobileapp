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

  const currentRouteName =
    props.navigation.getState().routes[props.navigation.getState().index].name;

  const routesList = [
    'Start',
    'Markets',
    'Tweets',
    'Datasets',
    'New Dataset',
    'Rules',
    'New Rules',
    'AI',
  ];

  return (
    <List
      onSelect={onElementClick}
      data={routesList.map(e => ({
        id: e,
        data: {
          name: e,
        },
      }))}
      selected={[currentRouteName]}
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
