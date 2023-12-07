import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Container from '../../ui/Container';
import { useNavigation, useRoute } from '@react-navigation/native';
import List, { ItemProps } from '../../ui/List';
import { getDatasetById } from '../../data/dataset';
import LoadingOverlay from '../../ui/Loading';
import { IDataset } from './types';
import Filter from '../../ui/Filter';
import DateSelect from '../../ui/DateSelect';

interface DatasetScreenRouteParams {
  id: string;
  name: string;
}

export default function Dataset({}) {
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );
  const route = useRoute();
  const navigation = useNavigation();
  const { id, name } = route.params as DatasetScreenRouteParams;
  const [inputs, setInputs] = useState<{ [k: string]: string }>({});
  const [data, setData] = useState<IDataset[]>([]);
  const [list, setList] = useState<ItemProps[]>([]);

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

  const setTitle = useCallback(
    (title: string) => {
      navigation.setOptions({
        title: `${title} Details`,
      });
    },
    [navigation],
  );

  useEffect(() => {
    setTitle(name);
  }, [name, setTitle]);

  useEffect(() => {
    if (minDate && maxDate) {
      setInputs(prev => ({
        ...prev,
        ['DateFrom']: new Date(minDate).toISOString().slice(0, 10),
        ['DateTo']: new Date(maxDate).toISOString().slice(0, 10),
      }));
    }
  }, [maxDate, minDate]);

  useEffect(() => {
    (async () => {
      try {
        setLoadingStates({ getDatasetByIdWithPagination: true });
        const result = await getDatasetById({
          datasetId: id,
          startDate: inputs.DateFrom,
          endDate: inputs.DateTo,
        });
        console.log(result);
        if (result) {
          setData(result);
          setList(mapDataToListValues(result));
        }
      } finally {
        setLoadingStates({ getDatasetByIdWithPagination: false });
      }
    })();
  }, [id, inputs.DateFrom, inputs.DateTo, inputs.endDate, inputs.startDate]);

  function mapDataToListValues(dataToBeMapped: IDataset[]) {
    return dataToBeMapped.map(e => ({
      id: e._id,
      data: {
        Date: e.date,
        Price: e.price,
        Tweets: e.tweets,
      },
    }));
  }

  function handleChangeValue(inputName: string, value: string) {
    setInputs(prev => ({
      ...prev,
      [inputName]: value,
    }));
  }

  return (
    <Container>
      <Filter>
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
      </Filter>
      <List showKeys data={list} />
      <LoadingOverlay loadingStates={loadingStates} />
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
