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
  const [inputs, setInputs] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  function handleChangeValue(name: string, value: string) {
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleButtonClick() {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }
  return (
    <Container>
      <StatusBar backgroundColor={COLORS.gray} barStyle={'light-content'} />
      <Text icon="faExclamationCircle">
        Warning! This is very early version of app! Might be updated in future
      </Text>
      <Text>As I said this application may be not useful.</Text>
      <Input
        name={'login'}
        placeholder={'Login'}
        setValue={handleChangeValue}
        value={inputs.login}
      />
      <Select
        items={['Moderator', 'Admin', 'Guest']}
        name={'type'}
        placeholder={'Type'}
        value={inputs.type}
        setValue={handleChangeValue}
      />
      <Button onClick={handleButtonClick} title={'Accept'} />
      <LoadingOverlay isVisible={isLoading} />
    </Container>
  );
}

export default App;
