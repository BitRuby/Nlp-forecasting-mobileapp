import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  ViewStyle,
} from 'react-native';
import { COLORS, FONT_SIZE } from './utils';

export interface IInput {
  name: string;
  placeholder?: string;
  setValue: (name: string, value: any) => void;
  value: string;
  style?: ViewStyle;
  editable?: boolean;
  number?: boolean;
}

export default function Input({
  name,
  setValue,
  value,
  placeholder,
  style,
  editable,
  number,
}: IInput) {
  const handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const newText = event.nativeEvent.text;
    setValue(name, newText);
  };

  return (
    <TextInput
      keyboardType={number ? 'numeric' : 'default'}
      editable={editable}
      placeholder={placeholder}
      placeholderTextColor={COLORS.gray2}
      style={{ ...styles.input, ...style }}
      id={name}
      value={value}
      onChange={handleChange}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: COLORS.white,
    color: COLORS.white,
    borderWidth: 1,
    fontFamily: 'Poppins-Light',
    fontSize: FONT_SIZE,
    paddingBottom: 8,
    paddingLeft: 10,
    marginVertical: 10,
  },
});
