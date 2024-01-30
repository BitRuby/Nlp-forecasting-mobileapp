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
import Input from '../../ui/Input';

type TrainNavProp = StackNavigationProp<{
  Train: undefined;
  'GA Model Optimization': undefined;
  BatchTrainScreen: undefined;
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
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    Dataset: '',
  });

  function handleChangeValue(inputName: string, value: string) {
    setInputs(prev => ({
      ...prev,
      [inputName]: value,
    }));
  }

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
          Epochs: e.epochs,
          Date: e.date,
          'Processed Dataset': e.processedDatasetId.name,
          'Loss Function': e.lossFunction,
          ...(e.layers !== undefined && {
            Layers: mapValues(e.layers),
          }),
          'Training Time': `${e.trainingTime.toPrecision(2)}s`,
        } as {
          Algorithm: string;
          Date: string;
          'Processed Dataset': string;
          'Loss Function': string;
          Layers?: string;
          MSE?: number;
          Accuracy?: number;
          'Training Time': string;
        };
        if (e.lossFunction === 'meanSquaredError') {
          elements = {
            ...elements,
            MSE: e.result?.mse,
          };
        } else {
          elements = {
            ...elements,
            Accuracy: e.result?.accuracy,
          };
        }
        return {
          id: e._id,
          data: elements,
        };
      })
      .filter(
        e =>
          selectedColumns.find(g => e.data.Algorithm === g) &&
          e.data['Processed Dataset'].includes(inputs.Dataset),
      )
      .sort((a, b) => {
        if (
          a.data['Loss Function'] === 'meanSquaredError' &&
          a.data.MSE &&
          b.data.MSE
        ) {
          return a.data.MSE - b.data.MSE;
        } else if (a.data.Accuracy && b.data.Accuracy) {
          return b.data.Accuracy - a.data.Accuracy;
        } else {
          return 1;
        }
      }) as ItemProps[];
  }, [data, inputs.Dataset, selectedColumns]);

  function handleNavigateToTrain() {
    navigation.navigate('Train');
  }

  function handleNavigateToTrainButton() {
    navigation.navigate('BatchTrainScreen');
  }

  function handleNavigateToGaModelOptimization() {
    navigation.navigate('GA Model Optimization');
  }

  return (
    <>
      <Container>
        <Filter>
          <Input
            placeholder="Dataset"
            name={'Dataset'}
            setValue={handleChangeValue}
            value={inputs.Dataset}
          />
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
        onClick={handleNavigateToTrainButton}
        title={'Batch train'}
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
