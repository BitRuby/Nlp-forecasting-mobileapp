import { NODE_API_URL } from './utils';

export async function getTechnicalIndicators() {
  try {
    const fetched = await fetch(`${NODE_API_URL}/technicalIndicator/all`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function getTechnicalIndicator() {
  try {
    const fetched = await fetch(`${NODE_API_URL}/technicalIndicator`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}
