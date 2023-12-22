import { Layer } from '../screens/AI/types';
import { API_URL } from './utils';

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
