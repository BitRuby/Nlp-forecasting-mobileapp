/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, FONT_SIZE } from '../ui/utils';
import MainScreen from '../screens/Main.screen';
import MarketsScreen from '../screens/Markets.screen';
import Icons, { IconTypes } from '../ui/Icons';
import TweetsScreen from '../screens/Tweets.screen';
import DatasetsScreen from '../screens/Datasets.screen';
import RulesScreen from '../screens/Rules.screen';
import AIScreen from '../screens/AI.screen';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import MarketScreen from '../screens/Market.screen';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import TweetScreen from '../screens/Tweet.screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Route({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) {
  return (
    <>
      <StatusBar backgroundColor={COLORS.dark} barStyle={'light-content'} />
      {children}
    </>
  );
}

function HeaderLeft({ navigation }: any): JSX.Element {
  return (
    <TouchableOpacity onPress={navigation.openDrawer}>
      <Icons
        size={FONT_SIZE + 8}
        style={styles.headerMenu}
        icon={'faAlignLeft'}
      />
    </TouchableOpacity>
  );
}

function screenOptions(props: {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}): StackNavigationOptions {
  return {
    headerStyle: {
      backgroundColor: COLORS.dark,
    },
    headerTintColor: COLORS.white,
    headerTitleAlign: 'center',
    headerTitleStyle: styles.headerTitle,
    headerLeft: () => <HeaderLeft navigation={props.navigation} />,
  };
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }: { color: string }) => {
          let iconName: IconTypes = 'faQuestionCircle';
          if (route.name === 'Start') {
            iconName = 'faHome';
          }
          if (route.name === 'Markets') {
            iconName = 'faChartSimple';
          }
          if (route.name === 'Tweets') {
            iconName = 'faTwitter';
          }
          if (route.name === 'Datasets') {
            iconName = 'faDatabase';
          }
          if (route.name === 'Rules') {
            iconName = 'faMagnifyingGlassChart';
          }
          if (route.name === 'AI') {
            iconName = 'faBrain';
          }
          return (
            <TouchableOpacity onPress={() => navigation.navigate(route.name)}>
              <Icons icon={iconName} size={18} color={color} />
            </TouchableOpacity>
          );
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.gray2,
      })}>
      <Tab.Screen name="Start">
        {() => (
          <Route>
            <MainScreen />
          </Route>
        )}
      </Tab.Screen>
      <Tab.Screen name="Markets" options={{ unmountOnBlur: true }}>
        {() => (
          <Route>
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen name=" Markets " component={MarketsScreen} />
              <Stack.Screen name="Market" component={MarketScreen} />
            </Stack.Navigator>
          </Route>
        )}
      </Tab.Screen>
      <Tab.Screen name="Tweets" options={{ unmountOnBlur: true }}>
        {() => (
          <Route>
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen name=" Tweets " component={TweetsScreen} />
              <Stack.Screen name="Tweet" component={TweetScreen} />
            </Stack.Navigator>
          </Route>
        )}
      </Tab.Screen>
      <Tab.Screen name="Datasets" options={{ unmountOnBlur: true }}>
        {() => (
          <Route>
            <DatasetsScreen />
          </Route>
        )}
      </Tab.Screen>
      <Tab.Screen name="Rules" options={{ unmountOnBlur: true }}>
        {() => (
          <Route>
            <RulesScreen />
          </Route>
        )}
      </Tab.Screen>
      <Tab.Screen name="AI" options={{ unmountOnBlur: true }}>
        {() => (
          <Route>
            <AIScreen />
          </Route>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  headerMenu: {
    color: COLORS.white,
    marginLeft: 20,
  },
});
