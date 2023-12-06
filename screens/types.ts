export interface IPrice {
  _id: string;
  date: string;
  open: number;
  close: number;
  volume: number;
  high: number;
  low: number;
  market: string;
}

export interface ITweet {
  _id: string;
  date: string;
  content: string;
  compound: string;
  neg: number;
  neu: number;
  pos: number;
  keyword: string;
  transformed: string;
  vectorized: number[];
}

export interface IDailyTweet {
  _id: string;
  date: string;
  rows: string[];
  keywordId: string;
}
