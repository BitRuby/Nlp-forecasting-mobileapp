import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { COLORS } from './ui/utils';
import Container from './ui/Container';
import Text from './ui/Text';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        backgroundColor={styles.background.backgroundColor}
        barStyle={'light-content'}
      />
      <Container>
        <Text>Hello world!</Text>
        <Input
          name={'Login'}
          placeholder={'Login'}
          setValue={() => {}}
          value={''}
        />
        <Select
          items={['Moderator', 'Admin', 'Guest']}
          name={'Type'}
          placeholder={'Type'}
          value={''}
          setValue={() => {}}
        />
        <Button
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
          title={'Accept'}
        />
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.gray,
    flex: 1,
    flexDirection: 'column',
  },
});

export default App;
