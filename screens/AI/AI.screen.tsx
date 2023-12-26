import React, { useState, useEffect, useMemo } from 'react';
import Container from '../../ui/Container';
import List, { ItemProps } from '../../ui/List';
import LoadingOverlay from '../../ui/Loading';
import { getTrainingResults } from '../../data/train';
import Button from '../../ui/Button';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TrainHistoryElement } from './types';

type TrainNavProp = StackNavigationProp<{
  Train: undefined;
}>;

export default function AIScreen() {
  const navigation = useNavigation<TrainNavProp>();
  const [data, setData] = useState<TrainHistoryElement[]>([]);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    (async () => {
      setLoadingStates({ getTrainingResults: true });
      const trainResults = await getTrainingResults();
      if (trainResults) {
        setData(trainResults);
      }
      setLoadingStates({ getTrainingResults: false });
    })();
  }, []);

  const list = useMemo(() => {
    return data.map((e: TrainHistoryElement) => {
      let elements = {
        Algorithm: e.algorithm,
        Date: e.date,
        'Processed Dataset': e.processedDatasetId.name,
        'Loss Function': e.lossFunction,
      } as {
        Algorithm: string;
        Date: string;
        'Processed Dataset': string;
        'Loss Function': string;
        Accuracy: number;
        MSE: number;
      };
      if (e.result.test.accuracy) {
        elements = {
          ...elements,
          Accuracy: e.result.test.accuracy,
        };
      }
      if (e.result.test.mse) {
        elements = {
          ...elements,
          MSE: e.result.test.mse,
        };
      }
      return {
        id: e._id,
        data: elements,
      };
    }) as ItemProps[];
  }, [data]);

  function handleNavigateToTrain() {
    navigation.navigate('Train');
  }

  return (
    <>
      <Container>
        <List data={list} showKeys />
        <LoadingOverlay loadingStates={loadingStates} />
      </Container>
      <Button
        style={styles.trainButton}
        onClick={handleNavigateToTrain}
        title={'Train'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  trainButton: {
    paddingHorizontal: 20,
  },
});
