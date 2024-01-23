import { NODE_API_URL } from './utils';

export async function getAllEconomicIndicators() {
  try {
    const fetched = await fetch(`${NODE_API_URL}/economicIndicator`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function getEconomicIndicator(type: string) {
  try {
    const fetched = await fetch(`${NODE_API_URL}/economicIndicator/${type}`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}
