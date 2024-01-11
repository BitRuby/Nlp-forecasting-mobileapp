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
import { mapValues } from '../../data/utils';
import Filter from '../../ui/Filter';
import { ALGORITHMS, NAIVE, DENSE, CONV1D, LSTM } from './utils';
import MultiSelect from '../../ui/MultiSelect';

type TrainNavProp = StackNavigationProp<{
  Train: undefined;
  'Batch Train': undefined;
  'GA Model Optimization': undefined;
}>;

export default function AIScreen() {
  const navigation = useNavigation<TrainNavProp>();
  const [data, setData] = useState<TrainHistoryElement[]>([]);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    NAIVE,
    DENSE,
    CONV1D,
    LSTM,
  ]);

  function handleChangeSelectedColumns(inputName: string, value: string) {
    setSelectedColumns(prev => {
      if (prev.find(e => e === value)) {
        return prev.filter(e => e !== value);
      } else {
        return [...prev, value];
      }
    });
  }

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
    return data
      .map((e: TrainHistoryElement) => {
        let elements = {
          Algorithm: e.algorithm,
          Date: e.date,
          'Processed Dataset': e.processedDatasetId.name,
          'Loss Function': e.lossFunction,
          Layers: mapValues(e.layers),
        } as {
          Algorithm: string;
          Date: string;
          'Processed Dataset': string;
          'Loss Function': string;
          Accuracy: number;
          MSE: number;
          Layers: string;
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
      })
      .filter(e => selectedColumns.find(g => e.data.Algorithm === g))
      .sort((a, b) => {
        if (a.data.MSE) {
          return a.data.MSE - b.data.MSE;
        } else {
          return a.data.Accuracy - b.data.Accuracy;
        }
      }) as ItemProps[];
  }, [data, selectedColumns]);

  function handleNavigateToTrain() {
    navigation.navigate('Train');
  }

  function handleNavigateToBatchTrain() {
    navigation.navigate('Batch Train');
  }

  function handleNavigateToGaModelOptimization() {
    navigation.navigate('GA Model Optimization');
  }

  return (
    <>
      <Container>
        <Filter>
          <MultiSelect
            placeholder="Algorithm"
            items={ALGORITHMS}
            name={'Algorithm'}
            setValue={handleChangeSelectedColumns}
            values={selectedColumns}
          />
        </Filter>
        <List data={list} showKeys />
        <LoadingOverlay loadingStates={loadingStates} />
      </Container>
      <Button
        style={styles.trainButton}
        onClick={handleNavigateToTrain}
        title={'Train'}
      />
      <Button
        style={styles.trainButton}
        onClick={handleNavigateToBatchTrain}
        title={'Batch Train'}
      />
      <Button
        style={styles.trainButton}
        onClick={handleNavigateToGaModelOptimization}
        title={'GA Model Optimization'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  trainButton: {
    paddingHorizontal: 20,
  },
});
