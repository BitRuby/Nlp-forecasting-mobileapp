/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, FONT_SIZE } from '../ui/utils';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons/faAlignLeft';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faDatabase } from '@fortawesome/free-solid-svg-icons/faDatabase';
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassChart';
import { faBrain } from '@fortawesome/free-solid-svg-icons/faBrain';
import MainScreen from '../screens/Main.screen';

const Tab = createBottomTabNavigator();

const icons = {
  faQuestionCircle,
  faHome,
  faChartSimple,
  faTwitter,
  faDatabase,
  faMagnifyingGlassChart,
  faBrain,
};

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
      <FontAwesomeIcon
        size={FONT_SIZE + 8}
        style={styles.headerMenu}
        icon={faAlignLeft}
      />
    </TouchableOpacity>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: {
          backgroundColor: COLORS.dark,
        },
        headerTintColor: COLORS.white,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitle,
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        tabBarIcon: ({ color }) => {
          let iconName = icons.faQuestionCircle;
          if (route.name === 'Start') {
            iconName = icons.faHome;
          }
          if (route.name === 'Markets') {
            iconName = icons.faChartSimple;
          }
          if (route.name === 'Tweets') {
            iconName = icons.faTwitter;
          }
          if (route.name === 'Datasets') {
            iconName = icons.faDatabase;
          }
          if (route.name === 'Rules') {
            iconName = icons.faMagnifyingGlassChart;
          }
          if (route.name === 'AI') {
            iconName = icons.faBrain;
          }
          return (
            <TouchableOpacity onPress={() => navigation.navigate(route.name)}>
              <FontAwesomeIcon icon={iconName} size={18} color={color} />
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
      <Tab.Screen name="Markets">
        {() => (
          <Route>
            <></>
          </Route>
        )}
      </Tab.Screen>
      <Tab.Screen name="Tweets">
        {() => (
          <Route>
            <></>
          </Route>
        )}
      </Tab.Screen>
      <Tab.Screen name="Datasets">
        {() => (
          <Route>
            <></>
          </Route>
        )}
      </Tab.Screen>
      <Tab.Screen name="Rules">
        {() => (
          <Route>
            <></>
          </Route>
        )}
      </Tab.Screen>
      <Tab.Screen name="AI">
        {() => (
          <Route>
            <></>
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
