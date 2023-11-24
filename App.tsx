import React from 'react';
import { StatusBar } from 'react-native';
import { COLORS } from './ui/utils';
import Container from './ui/Container';
import Text from './ui/Text';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';

function App(): JSX.Element {
  return (
    <Container>
      <StatusBar backgroundColor={COLORS.gray} barStyle={'light-content'} />
      <Text icon="faExclamationCircle">
        Warning! This is very early version of app! Might be updated in future
      </Text>
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
  );
}

export default App;
