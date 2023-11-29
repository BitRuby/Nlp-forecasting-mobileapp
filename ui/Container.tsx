import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from './utils';

export interface IContainer {
  children: string | JSX.Element | JSX.Element[];
}

export default function Container({ children }: IContainer) {
  return <SafeAreaView style={styles.background}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.dark,
    flex: 1,
    padding: 20,
  },
});
