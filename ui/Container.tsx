import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from './utils';

export interface IContainer {
  children: string | JSX.Element | JSX.Element[];
  scroll?: boolean;
}

export default function Container({ children, scroll }: IContainer) {
  return scroll ? (
    <ScrollView style={styles.background}>{children}</ScrollView>
  ) : (
    <SafeAreaView style={styles.background}>{children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.dark,
    flex: 1,
    padding: 20,
  },
});
