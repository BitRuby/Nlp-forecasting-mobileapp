import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ALGORITHMS, LOSS_FUNCTIONS } from './utils';
import Select from '../../ui/Select';
import Text from '../../ui/Text';
import Container from '../../ui/Container';
import LoadingOverlay from '../../ui/Loading';
import { getProcessedDatasets } from '../../data/processedDataset';
import Button from '../../ui/Button';
import { StyleSheet } from 'react-native';
import { performBatchTraining } from '../../data/train';
import useWebSocket from '../../hooks/useWebSocket';
import List from '../../ui/List';

type ProcessDatasetNavProp = StackNavigationProp<{
  'New Process Dataset': undefined;
}>;

export default function BatchTrainScreen() {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    LossFunction: LOSS_FUNCTIONS[0],
    Algorithm: 'DENSE',
  });
  const navigation = useNavigation<ProcessDatasetNavProp>();
  const [processedDatasets, setProcessedDatasets] = useState<string[]>([]);
  const [processedDatasetsDetails, setProcessedDatasetsDetails] = useState<{
    [key: string]: {
      id: string;
      trainElements: number;
      testElements: number;
      dataShape: string;
    };
  }>({});
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );
  const [trainInProgress, setTrainInProgress] = useState<boolean>(false);
  const ws = useWebSocket();

  useEffect(() => {
    if (ws.finish) {
      setTrainInProgress(false);
    }
  }, [ws.finish]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setLoadingStates({ getProcessedDatasets: true });
          const data = await getProcessedDatasets();
          if (data) {
            let datasets = {};
            data.forEach((ds: any) => {
              datasets = {
                ...datasets,
                [ds.name]: {
                  id: ds._id,
                  trainElements: ds.trainFeatures.length,
                  testElements: ds.testFeatures.length,
                  dataShape: `[${ds.trainFeatures[0].length}, ${ds.trainFeatures[0][0].length}]`,
                },
              };
            });
            setProcessedDatasetsDetails(datasets);
            setProcessedDatasets(Object.keys(datasets));
            setInputs(prev => ({
              ...prev,
              ProcessedDataset: Object.keys(datasets)[0],
            }));
          }
        } finally {
          setLoadingStates({ getProcessedDatasets: false });
        }
      })();
    }, []),
  );

  function handleChangeValue(inputName: string, value: string) {
    setInputs(prev => ({
      ...prev,
      [inputName]: value,
    }));
  }

  async function startBatchTraining() {
    setTrainInProgress(true);
    await performBatchTraining({
      algorithm: inputs.Algorithm,
      lossFunction: inputs.LossFunction,
      processedDatasetId: processedDatasetsDetails[inputs.ProcessedDataset].id,
    });
  }

  function createProcessedDataset() {
    navigation.navigate('New Process Dataset');
  }

  function actions(toggle: () => void) {
    return (
      <Button
        onClick={() => {
          toggle();
          createProcessedDataset();
        }}
        title={'Create processed dataset'}
      />
    );
  }

  const trainDisabled =
    !inputs.ProcessedDataset || !inputs.Algorithm || !inputs.LossFunction;

  const sortList = useMemo(() => {
    const sorted = ws.preds.sort((a, b) => {
      if (a.data.MSE) {
        return a.data.MSE - b.data.MSE;
      } else {
        return b.data.Accuracy - a.data.Accuracy;
      }
    });
    return sorted;
  }, [ws.preds]);

  return (
    <>
      <Container>
        <Select
          items={processedDatasets}
          name={'ProcessedDataset'}
          placeholder={'Select processed dataset'}
          value={inputs.ProcessedDataset}
          setValue={handleChangeValue}
          actions={actions}
        />
        {processedDatasetsDetails[inputs.ProcessedDataset] && (
          <>
            <Text>
              {'Train Elements: ' +
                processedDatasetsDetails[inputs.ProcessedDataset].trainElements}
            </Text>
            <Text>
              {'Test Elements: ' +
                processedDatasetsDetails[inputs.ProcessedDataset].testElements}
            </Text>
            <Text>
              {'Data Shape: ' +
                processedDatasetsDetails[inputs.ProcessedDataset].dataShape}
            </Text>
          </>
        )}
        <Select
          items={ALGORITHMS}
          name={'Algorithm'}
          placeholder={'Select algorithm'}
          value={inputs.Algorithm}
          setValue={handleChangeValue}
        />
        <Select
          items={LOSS_FUNCTIONS}
          name={'LossFunction'}
          placeholder={'Select loss function'}
          value={inputs.LossFunction}
          setValue={handleChangeValue}
        />
        <LoadingOverlay loadingStates={loadingStates} />
        <List data={sortList} showKeys />
      </Container>
      <Button
        loading={trainInProgress}
        disabled={trainInProgress || trainDisabled}
        style={styles.button}
        onClick={startBatchTraining}
        title={'Start batch training'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  trainFlex: {
    flex: 2,
  },
  trainLoading: {
    marginRight: 10,
  },
  trainContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 20,
  },
});
