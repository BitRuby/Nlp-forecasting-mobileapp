/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import { COLORS, FONT_SIZE } from '../ui/utils';
import Icons, { IconTypes } from '../ui/Icons';
import MainScreen from '../screens/Main.screen';
import Markets from '../screens/Markets';
import Tweets from '../screens/Tweets';
import Datasets from '../screens/Datasets';
import Rules from '../screens/Rules';
import AIScreen from '../screens/AI/AI.screen';

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
              <Stack.Screen
                name=" Markets "
                component={Markets.MarketsScreen}
              />
              <Stack.Screen name="Market" component={Markets.MarketScreen} />
            </Stack.Navigator>
          </Route>
        )}
      </Tab.Screen>
      <Tab.Screen name="Tweets" options={{ unmountOnBlur: true }}>
        {() => (
          <Route>
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen name=" Tweets " component={Tweets.TweetsScreen} />
              <Stack.Screen name="Tweet" component={Tweets.TweetScreen} />
              <Stack.Screen
                name="Content Transformations"
                component={Tweets.ContentTransformationsScreen}
              />
            </Stack.Navigator>
          </Route>
        )}
      </Tab.Screen>
      <Tab.Screen name="Datasets" options={{ unmountOnBlur: true }}>
        {() => (
          <Route>
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen
                name=" Datasets "
                component={Datasets.DatasetsScreen}
              />
              <Stack.Screen name="Dataset" component={Datasets.DatasetScreen} />
              <Stack.Screen
                name="New Dataset"
                component={Datasets.NewDatasetScreen}
              />
            </Stack.Navigator>
          </Route>
        )}
      </Tab.Screen>
      <Tab.Screen name="Rules" options={{ unmountOnBlur: true }}>
        {() => (
          <Route>
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen name=" Rules " component={Rules.RulesScreen} />
              {/* <Stack.Screen name="Rule" component={Datasets.DatasetScreen} /> */}
              <Stack.Screen name="New Rules" component={Rules.NewRulesScreen} />
            </Stack.Navigator>
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
