import { NODE_API_URL } from './utils';

export async function getAllDatasets() {
  try {
    const fetched = await fetch(`${NODE_API_URL}/dataset`);
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
    const fetched = await fetch(`${NODE_API_URL}/dataset/create`, {
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

export async function getDatasetById(body: {
  datasetId: string;
  startDate: string;
  endDate: string;
}) {
  try {
    const fetched = await fetch(`${NODE_API_URL}/dataset`, {
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
