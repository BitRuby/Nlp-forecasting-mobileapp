import React, { useState } from 'react';
import {
  Text,
  Modal,
  Pressable,
  StyleSheet,
  View,
  TouchableHighlight,
  ScrollView,
  Keyboard,
} from 'react-native';
import Input from './Input';
import Button from './Button';
import { COLORS } from './utils';
import Icons from './Icons';

export interface ISelect {
  items: string[];
  name: string;
  placeholder: string;
  value: string;
  setValue: (name: string, value: any) => void;
}

export default function Select({
  items,
  name,
  placeholder,
  value,
  setValue,
}: ISelect) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const toggleVisible = () => setModalVisible(prev => !prev);

  return (
    <>
      <View style={styles.container} onTouchStart={() => Keyboard.dismiss()}>
        <View pointerEvents="none">
          <Input
            name={name}
            placeholder={placeholder}
            value={!value ? items[0] : value}
            setValue={() => {}}
          />
        </View>
        <Pressable style={styles.iconContainer} onPress={toggleVisible}>
          <Icons size={20} icon="faAngleDown" color={COLORS.white} />
        </Pressable>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <ScrollView style={styles.content}>
              {items?.map(item => (
                <TouchableHighlight
                  key={item}
                  style={styles.item}
                  underlayColor={COLORS.gray2}
                  onPress={() => {
                    toggleVisible();
                    setValue(name, item);
                  }}>
                  <Text style={styles.itemValue}>{item}</Text>
                </TouchableHighlight>
              ))}
            </ScrollView>
            <View style={styles.button}>
              <Button onClick={toggleVisible} title={'Close'} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: { position: 'absolute', right: 12, top: 25 },
  container: { position: 'relative' },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modal: {
    backgroundColor: COLORS.dark,
    width: '75%',
    maxHeight: '75%',
    padding: 30,
    elevation: 5,
    alignItems: 'center',
  },
  content: {
    width: '95%',
    paddingVertical: 10,
  },
  item: {
    width: '100%',
    paddingVertical: 10,
  },
  itemValue: {
    fontFamily: 'Poppins-Light',
    color: COLORS.white,
    textAlign: 'center',
  },
  button: {
    width: '95%',
    marginTop: 0,
  },
});
