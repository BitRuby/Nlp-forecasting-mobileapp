import { API_URL } from './utils';

export async function createProcessedDataset(body: {
  datasetId: string;
  name: string;
  startDate: string;
  endDate: string;
  windowSize: number;
  horizonSize: number;
  scaleType: string;
  testFraction: number;
  pickColumns: Array<string>;
  scaleColumnsSeparately?: boolean;
}) {
  try {
    const fetched = await fetch(`${API_URL}/processedDataset/create`, {
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

export async function getProcessedDatasets() {
  try {
    const fetched = await fetch(`${API_URL}/processedDataset`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function getProcessedDataset(processedDatasetId: string) {
  try {
    const fetched = await fetch(
      `${API_URL}/processedDataset/${processedDatasetId}`,
    );
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}
