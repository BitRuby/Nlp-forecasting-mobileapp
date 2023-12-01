import { API_URL } from './utils';

export async function getAllKeywords() {
  try {
    const fetched = await fetch(`${API_URL}/keyword`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function getTweetsByKeywordId(keywordId: string) {
  try {
    const fetched = await fetch(`${API_URL}/keyword/${keywordId}`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function applySentimentAnalyze(body: {
  keywordId: string;
  dictionaryLength: number;
  transformations:
    | 'REMOVE_USERNAMES'
    | 'REMOVE_URLS'
    | 'REMOVE_PUNCTUATION_MARKS'
    | 'TEXT_TO_LOWERCASE'
    | 'REMOVE_SHORT_WORDS';
}) {
  try {
    const fetched = await fetch(`${API_URL}/keywordId/applySentiment`, {
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
