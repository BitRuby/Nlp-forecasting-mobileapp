import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from './utils';

export interface IContainer {
  children: string | JSX.Element | JSX.Element[];
}

export default function Container({ children }: IContainer) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.gray,
  },
});
