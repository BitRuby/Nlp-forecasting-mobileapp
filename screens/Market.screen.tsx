import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Container from '../ui/Container';
import { useRoute } from '@react-navigation/native';
import { IPrice } from './types';
import Select from '../ui/Select';
import DateSelect from '../ui/DateSelect';

interface MarketScreenRouteParams {
  prices: IPrice[];
}

export default function MarketScreen() {
  const route = useRoute();
  const [inputs, setInputs] = useState<{ [k: string]: string }>({});
  const { prices } = route.params as MarketScreenRouteParams;

  function handleChangeValue(name: string, value: string) {
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <Container>
      <Select
        items={['Daily', 'Weekly', 'Monthly', 'Yearly']}
        name={'Period'}
        placeholder={'Period'}
        value={inputs.Period}
        setValue={handleChangeValue}
      />
      <View style={styles.dateContainer}>
        <DateSelect
          name={'DateFrom'}
          value={inputs.DateFrom}
          setValue={handleChangeValue}
        />
        <View style={styles.margin} />
        <DateSelect
          name={'DateTo'}
          value={inputs.DateTo}
          setValue={handleChangeValue}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  margin: {
    marginHorizontal: 5,
  },
});
