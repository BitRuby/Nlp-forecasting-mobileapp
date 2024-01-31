import React, { useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getProcessedDatasets } from '../../data/processedDataset';
import Select from '../../ui/Select';
import LoadingOverlay from '../../ui/Loading';
import Button from '../../ui/Button';
import Text from '../../ui/Text';
import Input from '../../ui/Input';
import { ALGORITHMS } from './utils';
import { StyleSheet, View } from 'react-native';
import useWebSocket from '../../hooks/useWebSocket';
import { performBatchTraining } from '../../data/train';
import Container from '../../ui/Container';

type ProcessDatasetNavProp = StackNavigationProp<{
  'New Process Dataset': undefined;
}>;

export default function BatchTrainScreen() {
  const navigation = useNavigation<ProcessDatasetNavProp>();
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    ProcessedDataset: '',
    Algorithm: '',
    StartIndex: '',
  });
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );
  const [processedDatasets, setProcessedDatasets] = useState<string[]>([]);
  const [batchTrainingInProgress, setBatchTrainingInProgress] =
    useState<boolean>(false);
  const [processedDatasetsDetails, setProcessedDatasetsDetails] = useState<{
    [key: string]: {
      id: string;
      trainElements: number;
      testElements: number;
      dataShape: string;
      windowSize: string;
    };
  }>({});

  const ws = useWebSocket();

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
                  windowSize: ds.trainFeatures[0].length,
                },
              };
            });
            setProcessedDatasetsDetails(datasets);
            setProcessedDatasets(['', ...Object.keys(datasets)]);
            setInputs(prev => ({
              ...prev,
              ProcessedDataset: '',
            }));
          }
        } finally {
          setLoadingStates({ getProcessedDatasets: false });
        }
      })();
    }, []),
  );

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

  function handleChangeValue(inputName: string, value: string) {
    setInputs(prev => ({
      ...prev,
      [inputName]: value,
    }));
  }

  async function startBatchTraining() {
    setBatchTrainingInProgress(true);
    await performBatchTraining({
      processedDatasetId: inputs.ProcessedDataset
        ? processedDatasetsDetails[inputs.ProcessedDataset].id
        : '',
      algorithm: inputs.Algorithm,
      startIndex: Number(inputs.StartIndex),
    });
    setBatchTrainingInProgress(false);
  }

  return (
    <>
      <Container scroll>
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
          items={['', ...ALGORITHMS]}
          name={'Algorithm'}
          placeholder={'Select algorithm'}
          value={inputs.Algorithm}
          setValue={handleChangeValue}
        />
        <Input
          number
          placeholder="Enter starting index"
          name={'StartIndex'}
          setValue={handleChangeValue}
          value={inputs.StartIndex}
        />
        <LoadingOverlay loadingStates={loadingStates} />
      </Container>
      <>
        {!!ws.iterationAndEta.iteration && !ws.layers.length && (
          <View style={styles.summary}>
            <Text>Batch train progress:</Text>
            <View style={styles.trainContainer}>
              <Text>{`Iteration: ${ws.iterationAndEta.iteration}`}</Text>
              <Text>{`ETA: ${ws.iterationAndEta.eta}`}</Text>
            </View>
          </View>
        )}
      </>
      <Button
        loading={batchTrainingInProgress}
        disabled={batchTrainingInProgress}
        style={styles.button}
        onClick={startBatchTraining}
        title={'Start Batch Training'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  summary: {
    paddingHorizontal: 20,
  },
  trainLoading: {
    marginRight: 10,
  },
  trainContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 20,
  },
});
