import { NODE_API_URL } from './utils';

export async function getAllMarkets() {
  try {
    const fetched = await fetch(`${NODE_API_URL}/market`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function getPricesByMarketId(marketId: string) {
  try {
    const fetched = await fetch(`${NODE_API_URL}/market/${marketId}`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}
