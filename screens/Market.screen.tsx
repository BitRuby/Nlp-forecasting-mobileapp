import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Container from '../ui/Container';
import { useRoute } from '@react-navigation/native';
import DateSelect from '../ui/DateSelect';
import List, { ItemProps } from '../ui/List';
import { getPricesByMarketId } from '../data/markets';
import { IPrice } from './types';
import LoadingOverlay from '../ui/Loading';
import { COLORS } from '../ui/utils';

interface MarketScreenRouteParams {
  id: string;
}

export default function MarketScreen() {
  const route = useRoute();
  const { id } = route.params as MarketScreenRouteParams;
  const [inputs, setInputs] = useState<{ [k: string]: string }>({});
  const [data, setData] = useState<IPrice[]>([]);
  const [list, setList] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const minDate = useMemo(
    () =>
      data.length
        ? Math.min(...data.map(e => new Date(e.date).getTime()))
        : undefined,
    [data],
  );

  const maxDate = useMemo(
    () =>
      data.length
        ? Math.max(...data.map(e => new Date(e.date).getTime()))
        : undefined,
    [data],
  );

  const minClose = useMemo(
    () => (list.length ? Math.min(...list.map(e => e.data.Close)) : undefined),
    [list],
  );

  const maxClose = useMemo(
    () => (list.length ? Math.max(...list.map(e => e.data.Close)) : undefined),
    [list],
  );

  const medianClose = useMemo(
    () =>
      list.length
        ? list.sort()[Math.floor(list.length / 2)].data.Close
        : undefined,
    [list],
  );
  const averageClose = useMemo(
    () =>
      list.length
        ? list.reduce((prev, curr) => prev + curr.data.Close, 0) / list.length
        : undefined,
    [list],
  );

  const minVolume = useMemo(
    () => (list.length ? Math.min(...list.map(e => e.data.Volume)) : undefined),
    [list],
  );

  const maxVolume = useMemo(
    () => (list.length ? Math.max(...list.map(e => e.data.Volume)) : undefined),
    [list],
  );

  const medianVolume = useMemo(
    () =>
      list.length
        ? list.sort()[Math.floor(list.length / 2)].data.Volume
        : undefined,
    [list],
  );
  const averageVolume = useMemo(
    () =>
      list.length
        ? list.reduce((prev, curr) => prev + curr.data.Volume, 0) / list.length
        : undefined,
    [list],
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await getPricesByMarketId(id);
      if (result) {
        setData(result);
        setList(mapDataToListValues(result));
      }
      setIsLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    if (minDate && maxDate) {
      setInputs(prev => ({
        ...prev,
        ['DateFrom']: new Date(minDate).toISOString().slice(0, 10),
        ['DateTo']: new Date(maxDate).toISOString().slice(0, 10),
      }));
    }
  }, [maxDate, minDate]);

  const filter = useCallback(() => {
    return new Promise<IPrice[]>(resolve => {
      const fromDateObj = new Date(inputs.DateFrom);
      const toDateObj = new Date(inputs.DateTo);
      const filteredData = data.filter(item => {
        const itemDate = new Date(item.date);
        if (inputs.DateFrom && inputs.DateTo) {
          return itemDate >= fromDateObj && itemDate <= toDateObj;
        } else if (inputs.DateFrom) {
          return itemDate >= fromDateObj;
        } else if (inputs.DateTo) {
          return itemDate <= toDateObj;
        }
      });
      resolve(filteredData);
    });
  }, [data, inputs.DateFrom, inputs.DateTo]);

  useEffect(() => {
    (async () => {
      if (inputs.DateFrom || inputs.DateTo) {
        const filtered = await filter();
        if (filtered.length > 0) {
          setList(mapDataToListValues(filtered));
        }
      }
    })();
  }, [filter, inputs.DateFrom, inputs.DateTo]);

  function mapDataToListValues(dataToBeMapped: IPrice[]) {
    return dataToBeMapped.map(e => ({
      id: e._id,
      data: {
        Date: e.date,
        Close: e.close,
        Volume: e.volume,
      },
    }));
  }

  function handleChangeValue(name: string, value: string) {
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <Container>
      <LoadingOverlay isVisible={isLoading} />
      <View style={styles.dateContainer}>
        <DateSelect
          name={'DateFrom'}
          value={inputs.DateFrom}
          setValue={handleChangeValue}
          minDate={minDate}
          maxDate={maxDate}
        />
        <View style={styles.margin} />
        <DateSelect
          name={'DateTo'}
          value={inputs.DateTo}
          setValue={handleChangeValue}
          minDate={minDate}
          maxDate={maxDate}
        />
      </View>
      <List
        style={{
          backgroundColor: COLORS.gray2,
        }}
        data={[
          {
            id: 'SummaryValues',
            data: {
              'Close min': minClose,
              'Close max': maxClose,
              'Close avg': averageClose,
              'Close median': medianClose,
              'Volume min': minVolume,
              'Volume max': maxVolume,
              'Volume avg': averageVolume,
              'Volume median': medianVolume,
            },
          },
        ]}
        showKeys
      />
      <List data={list} showKeys />
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
