import { API_URL } from './utils';

export async function performTraining(body: {
  algorithm: 'NAIVE' | 'DENSE' | 'CONV1D' | 'LSTM';
  epochs: number;
  batchSize: number;
  layerValues: Array<{
    units: number;
    activation?: 'relu' | 'sigmoid' | 'softmax';
    kernelSize?: number;
    filters?: number;
    padding?: 'causal' | 'same' | 'valid';
  }>;
  lossFunction:
    | 'meanSquaredError'
    | 'binaryCrossentropy'
    | 'categoricalCrossentropy';
  optimizerFunction:
    | 'adam'
    | 'adamax'
    | 'adagrad'
    | 'adadelta'
    | 'rmsprop'
    | 'sgd';
  processedDatasetId: number;
  metrics: 'mse' | 'accuracy';
}) {
  try {
    const fetched = await fetch(`${API_URL}/train`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}
