import React, { useState } from 'react';
import {
  Modal as ReactModal,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from './Button';
import { COLORS } from './utils';
import Text from './Text';

export interface IModal {
  title?: string;
  children: string | boolean | JSX.Element | JSX.Element[];
  actions?: string | boolean | JSX.Element | JSX.Element[];
  visible?: boolean;
  withCloseAction?: boolean;
  toggleVisible?: () => void;
}

export default function Modal({
  title,
  children,
  actions,
  visible,
  withCloseAction,
  toggleVisible,
}: IModal) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const toggle = () => setModalVisible(prev => !prev);

  return (
    <ReactModal
      animationType="none"
      transparent={true}
      visible={visible !== undefined ? visible : modalVisible}>
      <TouchableWithoutFeedback
        onPress={toggleVisible !== undefined ? toggleVisible : toggle}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              {title && <Text>{title}</Text>}
              <ScrollView style={styles.content}>{children}</ScrollView>
              <View style={styles.button}>
                {actions}
                {withCloseAction && (
                  <Button
                    onClick={
                      toggleVisible !== undefined ? toggleVisible : toggle
                    }
                    title={'Close'}
                  />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </ReactModal>
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
