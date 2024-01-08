import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ALGORITHMS, LOSS_FUNCTIONS } from './utils';
import Select from '../../ui/Select';
import Text from '../../ui/Text';
import Container from '../../ui/Container';
import LoadingOverlay from '../../ui/Loading';
import { getProcessedDatasets } from '../../data/processedDataset';
import Button from '../../ui/Button';
import { StyleSheet, View } from 'react-native';
import { performModelOptimization } from '../../data/train';
import useWebSocket from '../../hooks/useWebSocket';
import Input from '../../ui/Input';

type ProcessDatasetNavProp = StackNavigationProp<{
  'New Process Dataset': undefined;
}>;

export default function GAModelOptimizationScreen() {
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
  const [optimizationInProgress, setOptimizationInProgress] =
    useState<boolean>(false);
  const ws = useWebSocket();

  useEffect(() => {
    if (ws.finish) {
      setOptimizationInProgress(false);
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

  async function startModelOptimization() {
    setOptimizationInProgress(true);
    await performModelOptimization({
      algorithm: inputs.Algorithm,
      lossFunction: inputs.LossFunction,
      processedDatasetId: processedDatasetsDetails[inputs.ProcessedDataset].id,
      nIndividuals: Number(inputs.nIndividuals),
      chromosomeLength: Number(inputs.chromosomeLength),
      mutationRate: Number(inputs.mutationRate),
      selectedIndividuals: Number(inputs.selectedIndividuals),
      generationLimit: Number(inputs.generationLimit),
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

  const startDisabled =
    !inputs.ProcessedDataset || !inputs.Algorithm || !inputs.LossFunction;

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
        <Input
          placeholder="#Individuals"
          name={'nIndividuals'}
          setValue={handleChangeValue}
          value={inputs.nIndividuals}
          number
        />
        <Input
          placeholder="Chromosome len/#Layers"
          name={'chromosomeLength'}
          setValue={handleChangeValue}
          value={inputs.chromosomeLength}
          number
        />
        <Input
          placeholder="Mutation Rate"
          name={'mutationRate'}
          setValue={handleChangeValue}
          value={inputs.mutationRate}
          number
        />
        <Input
          placeholder="Selected Individuals"
          name={'selectedIndividuals'}
          setValue={handleChangeValue}
          value={inputs.selectedIndividuals}
          number
        />
        <Input
          placeholder="Generation Limit"
          name={'generationLimit'}
          setValue={handleChangeValue}
          value={inputs.generationLimit}
          number
        />
        <LoadingOverlay loadingStates={loadingStates} />
      </Container>
      <>
        {!!ws.iterationAndEta.iteration && !ws.layers.length && (
          <View style={styles.trainContainer}>
            <Text style={styles.trainFlex}>Optimization progress:</Text>
            <Text>{`Iteration: ${ws.iterationAndEta.iteration}`}</Text>
            <Text>{`ETA: ${parseInt(ws.iterationAndEta.eta, 10)}`}</Text>
          </View>
        )}
      </>
      <>
        {!!ws.layers.length && (
          <View style={styles.trainContainer}>
            <Text style={styles.trainFlex}>Best NN settings:</Text>
            <Text>{`${ws.layers.map(
              (e, i) => `${i === 0 ? `${e.units}` : `/${e.units}`}`,
            )}`}</Text>
          </View>
        )}
      </>
      <Button
        loading={optimizationInProgress}
        disabled={optimizationInProgress || startDisabled}
        style={styles.button}
        onClick={startModelOptimization}
        title={'Start Model Optimization'}
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
