import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from './utils';

interface ILoadingOverlay {
  loadingStates: { [key: string]: boolean };
}

function LoadingOverlay({ loadingStates }: ILoadingOverlay) {
  return (
    <Modal
      transparent
      animationType="none"
      visible={Object.keys(loadingStates).some(key => loadingStates[key])}>
      <View style={styles.overlay}>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={80} color={COLORS.green} />
        </View>
      </View>
    </Modal>
  );
}

export default React.memo(
  LoadingOverlay,
  (prevProps, nextProps) => prevProps.loadingStates === nextProps.loadingStates,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
