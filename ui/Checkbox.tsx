import React from 'react';
import { StyleSheet, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { COLORS } from './utils';
import Text from './Text';

interface ICheckbox {
  name: string;
  setValue: (name: string, value: any) => void;
  value: boolean;
}

export default function Checkbox({ name, setValue, value }: ICheckbox) {
  const onValueChange = (val: boolean) => {
    setValue(name, val);
  };

  return (
    <View style={styles.container}>
      <CheckBox
        style={styles.checkbox}
        value={value}
        onValueChange={onValueChange}
        tintColors={{ true: COLORS.green, false: COLORS.gray1 }}
      />
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  checkbox: {
    marginTop: -5,
    marginRight: 5,
    marginLeft: -2,
  },
});
