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

export async function getTweetsByKeywordIdPaginated(body: {
  keywordId: string;
  page: number;
  rowsPerPage: number;
  startDate: string;
  endDate: string;
  sentiment: string;
}) {
  if (
    !body.keywordId &&
    !body.page &&
    !body.rowsPerPage &&
    !body.startDate &&
    !body.endDate &&
    !body.sentiment
  ) {
    return;
  }
  try {
    const fetched = await fetch(`${API_URL}/keyword`, {
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

export async function getDailyTweetsByKeywordId(keywordId: string) {
  try {
    const fetched = await fetch(`${API_URL}/keyword/daily/${keywordId}`);
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
  transformations: Transformations;
}) {
  try {
    console.log(body);
    const fetched = await fetch(`${API_URL}/keyword/applySentiment`, {
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

export type Transformations = Array<
  | 'REMOVE_USERNAMES'
  | 'REMOVE_URLS'
  | 'REMOVE_PUNCTUATION_MARKS'
  | 'TEXT_TO_LOWERCASE'
  | 'REMOVE_SHORT_WORDS'
>;
