import React, { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Input from './Input';
import Icons from './Icons';
import { COLORS } from './utils';

interface IDateSelect {
  name: string;
  value: string;
  setValue: (name: string, value: any) => void;
  minDate?: string;
  maxDate?: string;
}

export default function DateSelect({
  name,
  value,
  setValue,
  minDate,
  maxDate,
}: IDateSelect) {
  const [open, setOpen] = useState(false);

  const toggleVisible = () => setOpen(prev => !prev);

  const setDate = (date: Date) =>
    setValue(name, date.toISOString().slice(0, 10));

  return (
    <>
      <View style={styles.container} onTouchStart={() => Keyboard.dismiss()}>
        <View pointerEvents="none">
          <Input name={name} value={value} setValue={() => {}} />
        </View>
        <Pressable style={styles.iconContainer} onPress={toggleVisible}>
          <Icons size={20} icon="faCalendar" color={COLORS.white} />
        </Pressable>
      </View>
      <DatePicker
        modal
        open={open}
        date={value ? new Date(value) : new Date()}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode="date"
        locale="pl"
        theme="dark"
        textColor={COLORS.white}
        minimumDate={minDate ? new Date(minDate) : new Date('2010-01-01')}
        maximumDate={maxDate ? new Date(maxDate) : new Date()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: { position: 'absolute', right: 12, top: 25 },
  container: { position: 'relative', flex: 1 },
});
