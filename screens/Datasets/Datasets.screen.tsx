import React, { useMemo, useState, useCallback } from 'react';
import Container from '../../ui/Container';
import List, { ItemProps } from '../../ui/List';
import LoadingOverlay from '../../ui/Loading';
import { getAllDatasets } from '../../data/dataset';
import Button from '../../ui/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Data {
  name: string;
  _id: string;
}

type DatasetStackParamList = {
  ['Dataset']: { id: string; name: string };
};

type DatasetScreenNavigationProp = StackNavigationProp<
  DatasetStackParamList,
  'Dataset'
>;

type NewDatasetStackParamList = {
  ['New Dataset']: undefined;
};

type NewDatasetScreenNavigationProp = StackNavigationProp<
  NewDatasetStackParamList,
  'New Dataset'
>;

export default function DatasetsScreen() {
  const datasetNavigation = useNavigation<DatasetScreenNavigationProp>();
  const newDatasetNavigation = useNavigation<NewDatasetScreenNavigationProp>();
  const [data, setData] = useState<Data[]>([]);
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setLoadingStates({ getAllDatasets: true });
          const result = await getAllDatasets();
          if (result) {
            setData(result);
          }
        } finally {
          setLoadingStates({ getAllDatasets: false });
        }
      })();
    }, []),
  );

  const list = useMemo(() => {
    return data.map((e: any) => ({
      id: e._id,
      data: {
        name: e.name,
      },
      icon: 'faDatabase',
    })) as ItemProps[];
  }, [data]);

  const handleSelectElement = useCallback(
    (_id: string) => {
      const selectElement = data.find(e => e._id === _id);
      if (selectElement) {
        return datasetNavigation.navigate('Dataset', {
          id: selectElement._id,
          name: selectElement.name,
        });
      }
    },
    [data, datasetNavigation],
  );

  const handleNewDataset = () => {
    return newDatasetNavigation.navigate('New Dataset');
  };

  return (
    <Container>
      <LoadingOverlay loadingStates={loadingStates} />
      <List data={list} onSelect={handleSelectElement} />
      <Button onClick={handleNewDataset} title={'New dataset'} />
    </Container>
  );
}
