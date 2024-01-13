import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ACTIVATION_FUNCTIONS,
  ALGORITHMS,
  CONV1D,
  LOSS_FUNCTIONS,
  NAIVE,
  OPTIMIZER_FUNCTIONS,
  PADDING_FUNCTIONS,
} from './utils';
import { Layer } from './types';
import Select from '../../ui/Select';
import Text from '../../ui/Text';
import Input from '../../ui/Input';
import Container from '../../ui/Container';
import LoadingOverlay from '../../ui/Loading';
import { getProcessedDatasets } from '../../data/processedDataset';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { COLORS } from '../../ui/utils';
import { Card } from '../../ui/Card';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { performTraining } from '../../data/train';
import useWebSocket from '../../hooks/useWebSocket';

type ProcessDatasetNavProp = StackNavigationProp<{
  'New Process Dataset': undefined;
}>;

export default function TrainScreen() {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    LossFunction: LOSS_FUNCTIONS[0],
    OptimizerFunction: OPTIMIZER_FUNCTIONS[0],
    BatchSize: '128',
    Epochs: '100',
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
      windowSize: string;
    };
  }>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );
  const [trainInProgress, setTrainInProgress] = useState<boolean>(false);
  const ws = useWebSocket();

  function toggleModalVisible() {
    setModalVisible(prev => !prev);
  }

  useEffect(() => {
    if (inputs.Algorithm) {
      setLayers([]);
    }
  }, [inputs.Algorithm]);

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

  function addLayer() {
    const newLayer = {
      key: `${new Date().getTime()}`,
      units: inputs.Units,
      activation: inputs.ActivationFunction,
      kernelSize:
        inputs.Algorithm === CONV1D
          ? processedDatasetsDetails[inputs.ProcessedDataset].windowSize
          : '',
      filters: inputs.Filters,
      padding: inputs.Padding,
    };
    setLayers(prev => [...prev, newLayer]);
    toggleModalVisible();
  }

  function deleteLayer(key: string) {
    setLayers(prev => prev.filter(e => e.key !== key));
  }

  function generateLayers() {
    return (
      layers &&
      layers.map(layer => {
        let content = {
          activation: layer.activation,
        } as any;
        if (layer.units) {
          content = {
            ...content,
            units: layer.units,
          };
        }
        if (layer.kernelSize) {
          content = {
            ...content,
            kernelSize: layer.kernelSize,
          };
        }
        if (layer.filters) {
          content = {
            ...content,
            filters: layer.filters,
          };
        }
        if (layer.padding) {
          content = {
            ...content,
            padding: layer.padding,
          };
        }
        return (
          <Card
            onPress={() => deleteLayer(layer.key)}
            key={layer.key}
            content={content}
          />
        );
      })
    );
  }

  async function startTraining() {
    setTrainInProgress(true);
    await performTraining({
      algorithm: inputs.Algorithm,
      epochs: Number(inputs.Epochs),
      batchSize: Number(inputs.BatchSize),
      layerValues: layers,
      lossFunction: inputs.LossFunction,
      optimizerFunction: inputs.OptimizerFunction,
      processedDatasetId: processedDatasetsDetails[inputs.ProcessedDataset].id,
    });
    setTrainInProgress(false);
  }

  const toggleVisible = () => setModalVisible(prev => !prev);

  const addLayerButtonPressable =
    (inputs.Units && inputs.ActivationFunction) ||
    (inputs.Algorithm === CONV1D &&
      inputs.ActivationFunction &&
      inputs.Filters &&
      inputs.Padding);

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

  function getResults() {
    if (ws.preds.length) {
      return (
        <>
          {!!ws.preds[0].data.Accuracy && (
            <Text>{`Accuracy: ${ws.preds[0].data.Accuracy}`}</Text>
          )}
          {!!ws.preds[0].data.MSE && (
            <Text>{`MSE: ${ws.preds[0].data.MSE}`}</Text>
          )}
        </>
      );
    }
  }

  const trainDisabled =
    !inputs.ProcessedDataset ||
    !inputs.Algorithm ||
    !inputs.LossFunction ||
    (inputs.Algorithm !== NAIVE && !inputs.OptimizerFunction) ||
    (inputs.Algorithm !== NAIVE && !inputs.Epochs) ||
    (inputs.Algorithm !== NAIVE && !inputs.BatchSize) ||
    (inputs.Algorithm !== NAIVE && layers.length === 0);

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
        {inputs.Algorithm !== NAIVE ? (
          <Select
            items={OPTIMIZER_FUNCTIONS}
            name={'OptimizerFunction'}
            placeholder={'Select optimizer function'}
            value={inputs.OptimizerFunction}
            setValue={handleChangeValue}
          />
        ) : (
          <></>
        )}
        {inputs.Algorithm !== NAIVE ? (
          <Input
            number
            placeholder="Enter number of epochs"
            name={'Epochs'}
            setValue={handleChangeValue}
            value={inputs.Epochs}
          />
        ) : (
          <></>
        )}
        {inputs.Algorithm !== NAIVE ? (
          <Input
            number
            placeholder="Enter batch size"
            name={'BatchSize'}
            setValue={handleChangeValue}
            value={inputs.BatchSize}
          />
        ) : (
          <></>
        )}
        {inputs.Algorithm !== NAIVE ? (
          <>
            <Text>Layers: </Text>
            {generateLayers()}
          </>
        ) : (
          <></>
        )}
        {inputs.Algorithm !== NAIVE ? (
          <Modal
            title="New layer"
            visible={modalVisible}
            toggleVisible={toggleVisible}
            actions={
              <>
                <Button
                  disabled={!addLayerButtonPressable}
                  onClick={addLayer}
                  title={'Add layer'}
                />
                <Button
                  color={COLORS.gray2}
                  onClick={toggleModalVisible}
                  title={'Cancel'}
                />
              </>
            }>
            {inputs.Algorithm !== CONV1D ? (
              <Input
                placeholder="Enter units number"
                name={'Units'}
                setValue={handleChangeValue}
                value={inputs.Units}
              />
            ) : (
              <></>
            )}
            <Select
              items={ACTIVATION_FUNCTIONS}
              name={'ActivationFunction'}
              placeholder={'Select activation function'}
              value={inputs.ActivationFunction}
              setValue={handleChangeValue}
            />
            {inputs.Algorithm === CONV1D ? (
              <>
                <Input
                  placeholder="Enter Kernel Size"
                  name={'KernelSize'}
                  setValue={handleChangeValue}
                  value={`${
                    processedDatasetsDetails[inputs.ProcessedDataset].windowSize
                  }`}
                  editable={false}
                />
                <Input
                  placeholder="Enter filter size"
                  name={'Filters'}
                  setValue={handleChangeValue}
                  value={inputs.Filters}
                />
                <Select
                  items={PADDING_FUNCTIONS}
                  name={'Padding'}
                  placeholder={'Select padding function'}
                  value={inputs.Padding}
                  setValue={handleChangeValue}
                />
              </>
            ) : (
              <></>
            )}
          </Modal>
        ) : (
          <></>
        )}
        <LoadingOverlay loadingStates={loadingStates} />
      </Container>
      <>
        {!!ws.preds.length && (
          <View style={styles.trainContainer}>
            <Text style={styles.trainFlex}>Train result:</Text>
            {getResults()}
          </View>
        )}
      </>
      {trainInProgress && <ActivityIndicator style={styles.trainLoading} />}
      {inputs.Algorithm !== NAIVE ? (
        <Button
          color={COLORS.gray1}
          style={styles.button}
          onClick={toggleModalVisible}
          title={'Add Layer'}
        />
      ) : (
        <></>
      )}
      <Button
        disabled={trainInProgress || trainDisabled}
        style={styles.button}
        onClick={startTraining}
        title={'Start training'}
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
