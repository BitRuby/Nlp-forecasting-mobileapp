import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
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
import Filter from '../../ui/Filter';
import { StyleSheet } from 'react-native';

type NewModelNavProp = StackNavigationProp<{ 'New Model': undefined }>;

export default function AIScreen() {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const navigation = useNavigation<NewModelNavProp>();
  const [datasets, setDatasets] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );

  function toggleModalVisible() {
    setModalVisible(prev => !prev);
  }

  useEffect(() => {
    (async () => {
      setLoadingStates({ getProcessedDatasets: true });
      const data = await getProcessedDatasets();
      if (data) {
        setDatasets(data.map((e: any) => e.name));
      }
      setLoadingStates({ getProcessedDatasets: false });
    })();
  }, []);

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
      kernelSize: inputs.KernelSize,
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
    return layers.map(layer => (
      <Card
        onPress={() => deleteLayer(layer.key)}
        key={layer.key}
        content={{
          units: layer.units,
          activation: layer.activation,
          kernelSize: layer.kernelSize || '',
          filters: layer.filters || '',
          padding: layer.padding || '',
        }}
      />
    ));
  }

  function startTraining() {}

  const toggleVisible = () => setModalVisible(prev => !prev);

  const addLayerButtonPressable =
    (inputs.Units && inputs.ActivationFunction) ||
    (inputs.Algorithm === CONV1D &&
      inputs.KernelSize &&
      inputs.Filters &&
      inputs.PaddingFunctions);

  return (
    <>
      <Container scroll>
        <Select
          items={datasets}
          name={'Dataset'}
          placeholder={'Select dataset'}
          value={inputs.Dataset}
          setValue={handleChangeValue}
        />
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
        <Select
          items={OPTIMIZER_FUNCTIONS}
          name={'OptimizerFunctions'}
          placeholder={'Select optimizer function'}
          value={inputs.OptimizerFunctions}
          setValue={handleChangeValue}
        />
        <Input
          number
          placeholder="Enter number of epochs"
          name={'Epochs'}
          setValue={handleChangeValue}
          value={inputs.Epochs}
        />
        <Input
          number
          placeholder="Enter batch size"
          name={'BatchSize'}
          setValue={handleChangeValue}
          value={inputs.BatchSize}
        />
        {inputs.Algorithm !== NAIVE ? (
          <>
            <Text>Layers: </Text>
            <Filter>
              <>
                {generateLayers()}
                <Button
                  color={COLORS.gray1}
                  onClick={toggleModalVisible}
                  title={'Add Layer'}
                />
              </>
            </Filter>
          </>
        ) : (
          <></>
        )}
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
          <Input
            placeholder="Enter units number"
            name={'Units'}
            setValue={handleChangeValue}
            value={inputs.Units}
          />
          <Select
            items={ACTIVATION_FUNCTIONS}
            name={'ActivationFunction'}
            placeholder={'Select activation function'}
            value={inputs.ActivationFunction}
            setValue={handleChangeValue}
          />
          {inputs.Algorithm === CONV1D ? (
            <Input
              placeholder="Enter Kernel Size"
              name={'KernelSize'}
              setValue={handleChangeValue}
              value={inputs.KernelSize}
            />
          ) : (
            <></>
          )}
          {inputs.Algorithm === CONV1D ? (
            <Input
              placeholder="Enter filter size"
              name={'Filters'}
              setValue={handleChangeValue}
              value={inputs.Filters}
            />
          ) : (
            <></>
          )}
          {inputs.Algorithm === CONV1D ? (
            <Select
              items={PADDING_FUNCTIONS}
              name={'PaddingFunctions'}
              placeholder={'Select padding function'}
              value={inputs.PaddingFunctions}
              setValue={handleChangeValue}
            />
          ) : (
            <></>
          )}
        </Modal>
        <LoadingOverlay loadingStates={loadingStates} />
      </Container>
      <Button
        style={styles.trainButton}
        onClick={startTraining}
        title={'Start training'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  trainButton: {
    paddingHorizontal: 20,
  },
});
