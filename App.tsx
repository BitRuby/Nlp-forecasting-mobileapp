import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { COLORS } from './ui/utils';
import Container from './ui/Container';
import Text from './ui/Text';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import LoadingOverlay from './ui/Loading';

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <Container>
      <StatusBar backgroundColor={COLORS.gray} barStyle={'light-content'} />
      <Text icon="faExclamationCircle">
        Warning! This is very early version of app! Might be updated in future
      </Text>
      <Text>As I said this application may be not useful.</Text>
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
      <LoadingOverlay isVisible={isLoading} />
    </Container>
  );
}

export default App;
