import React from 'react';
import { View, Text as TextRN, StyleSheet, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { COLORS, TYPE_COLORS } from './utils';

interface IText {
  children: string | JSX.Element | JSX.Element[];
  style?: TextStyle;
  icon?:
    | 'faCheck'
    | 'faExclamationTriangle'
    | 'faExclamationCircle'
    | 'faCircleInfo';
  iconSize?: number;
  iconType?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'default';
  textType?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'default';
}

const icons = {
  faCheck,
  faExclamationTriangle,
  faExclamationCircle,
  faCircleInfo,
};

export default function Text({
  children,
  style,
  icon,
  iconSize,
  iconType,
  textType,
}: IText) {
  const mergedIconStyles = {
    ...styles.icon,
    color: (iconType && TYPE_COLORS[iconType]) || TYPE_COLORS.default,
  };
  const mergedTextStyles = {
    ...styles.text,
    color: (textType && TYPE_COLORS[textType]) || TYPE_COLORS.default,
    ...style,
  };

  return icon ? (
    <View style={styles.withIconContainer}>
      <FontAwesomeIcon
        style={mergedIconStyles}
        size={iconSize || 18}
        icon={icons[icon]}
      />
      <TextRN style={mergedTextStyles}>{children}</TextRN>
    </View>
  ) : (
    <TextRN style={mergedTextStyles}>{children}</TextRN>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.white,
    marginVertical: 10,
  },
  withIconContainer: {
    flexDirection: 'row',
  },
  icon: { marginRight: 3 },
});
