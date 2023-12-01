import { API_URL } from './utils';

export async function getAllDatasets() {
  try {
    const fetched = await fetch(`${API_URL}/dataset`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function createDataset(body: {
  marketId: string;
  keywordId: string;
  name: string;
}) {
  try {
    const fetched = await fetch(`${API_URL}/dataset`, {
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

export async function getDatasetById(datasetId: string) {
  try {
    const fetched = await fetch(`${API_URL}/dataset/${datasetId}`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}
