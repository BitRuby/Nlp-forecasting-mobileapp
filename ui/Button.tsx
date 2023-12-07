import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, TouchableHighlight, Animated } from 'react-native';
import { COLORS, FONT_SIZE } from './utils';

interface IButton {
  onClick: () => void;
  title: string;
  disabled?: boolean;
}

export default function Button({ onClick, disabled, title }: IButton) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: disabled ? 0.5 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [disabled, fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableHighlight
        style={styles.container}
        disabled={disabled}
        onPress={onClick}
        underlayColor={COLORS.gray1}>
        <Text style={styles.text}>{title}</Text>
      </TouchableHighlight>
    </Animated.View>
  );
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.green,
    marginVertical: 10,
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: FONT_SIZE,
    color: COLORS.white,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 8,
  },
});
