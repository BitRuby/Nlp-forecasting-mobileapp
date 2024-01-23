import { Layer } from '../screens/AI/types';
import { NODE_API_URL, PYTHON_API_URL } from './utils';

export async function performTraining(body: {
  algorithm: string;
  epochs: number;
  batchSize: number;
  layerValues: Layer[];
  lossFunction: string;
  optimizerFunction: string;
  processedDatasetId: string;
}) {
  try {
    const fetched = await fetch(`${PYTHON_API_URL}/train`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function getTrainingResults() {
  try {
    const fetched = await fetch(`${NODE_API_URL}/train`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function performModelOptimization(body: {
  algorithm: string;
  lossFunction: string;
  processedDatasetId: string;
  nIndividuals: number;
  chromosomeLength: number;
  mutationRate: number;
  selectedIndividuals: number;
  generationLimit: number;
}) {
  try {
    const fetched = await fetch(`${PYTHON_API_URL}/ga`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}
