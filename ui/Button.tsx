import React from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';
import { COLORS } from './utils';

interface IButton {
  onClick: () => void;
  title: string;
}

export default function Button({ onClick, title }: IButton) {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onClick}
      underlayColor={COLORS.lightBlue}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.blue,
    marginVertical: 10,
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 8,
  },
});
