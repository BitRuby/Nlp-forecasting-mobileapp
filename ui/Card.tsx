import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { COLORS, FONT_SIZE } from './utils';
import Text from './Text';

interface ICard {
  content: { [x: string]: string | undefined };
  backgroundColor?: string;
  onPress?: () => void;
}

export function Card({ content, backgroundColor, onPress }: ICard) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={
          backgroundColor
            ? { ...styles.container, backgroundColor }
            : styles.container
        }>
        {Object.keys(content).map(key => {
          if (content[key]) {
            return (
              <View key={key} style={styles.textContainer}>
                <Text style={styles.key}>{`${key}: `}</Text>
                <Text style={styles.value}>{`${content[key]}`}</Text>
              </View>
            );
          } else {
            return <></>;
          }
        })}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.gray1,
    borderWidth: 1,
    marginVertical: 8,
    paddingVertical: 10,
  },
  textContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  key: {
    color: COLORS.white,
    fontFamily: 'Poppins-Light',
    marginRight: 0,
    fontSize: FONT_SIZE,
  },
  value: {
    color: COLORS.white,
    fontFamily: 'Poppins-Bold',
    fontSize: FONT_SIZE,
  },
});
