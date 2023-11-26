import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { COLORS } from './ui/utils';
import Container from './ui/Container';
import Text from './ui/Text';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import LoadingOverlay from './ui/Loading';
import List from './ui/List';

const _data = [
  { id: 1, data: { title: 'Banana', kcal: 205, protein: 1.5 } },
  { id: 2, data: { title: 'Kiwi' } },
  { id: 3, data: { title: 'Strawberry', kcal: 91 } },
  { id: 4, data: { title: 'Mango' } },
  { id: 5, data: { title: 'Apple' } },
  { id: 6, data: { title: 'Cherry' } },
  { id: 7, data: { title: 'Orange' } },
  { id: 8, data: { title: 'Peach' } },
  { id: 9, data: { title: 'Pear' } },
];

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [inputs, setInputs] = useState<{ [k: string]: string }>({});
  const [selected, setSelected] = useState<string[]>([]);

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

  const onSelect = (id: string) => {
    console.log(id);
    setSelected((prev: string[]) => {
      if (prev.find(e => e === id)) {
        return prev.filter(e => e !== id);
      } else {
        return [...prev, id];
      }
    });
  };

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
      <List data={_data} selected={selected} onSelect={onSelect} />
      <LoadingOverlay isVisible={isLoading} />
    </Container>
  );
}

export default App;
