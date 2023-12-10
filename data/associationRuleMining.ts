import { API_URL } from './utils';

export async function getDataBoundaries(body: {
  marketId: string;
  keywordId: string;
  startDate: string;
  endDate: string;
  windowSize: number;
}) {
  try {
    const fetched = await fetch(`${API_URL}/associationRuleMining`, {
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

export async function apriori(body: {
  assiociationRuleMiningId: string;
  minSupport: number;
  minConfidence: number;
}) {
  try {
    const fetched = await fetch(`${API_URL}/associationRuleMining/apriori`, {
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

export async function getRules() {
  try {
    const fetched = await fetch(`${API_URL}/associationRuleMining`);
    const json = await fetched.json();
    return json;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function createRules(body: {
  marketId: string;
  keywordId: string;
  startDate: string;
  endDate: string;
  windowSize: number;
  name: string;
  indicators: string[];
  volume: boolean;
  close: boolean;
}) {
  try {
    const fetched = await fetch(`${API_URL}/associationRuleMining`, {
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

export type EconomicIndicatorTypes =
  | 'RealGDP'
  | 'RealGDPPerCapita'
  | 'TreasuryYield'
  | 'FederalFundsRate'
  | 'CPI'
  | 'Inflation'
  | 'RetailSales'
  | 'DurableGoodsOrders'
  | 'UnemploymentRate'
  | 'NonfarmPayroll';

export type TechnicalIndicatorTypes =
  | 'SMA'
  | 'EMA'
  | 'WMA'
  | 'DEMA'
  | 'TEMA'
  | 'TRIMA'
  | 'KAMA'
  | 'MAMA'
  | 'VWAP'
  | 'T3'
  | 'MACD'
  | 'MACDEXT'
  | 'STOCH'
  | 'STOCHF'
  | 'RSI'
  | 'STOCHRSI'
  | 'WILLR'
  | 'ADX'
  | 'ADXR'
  | 'APO'
  | 'PPO'
  | 'MOM'
  | 'BOP'
  | 'CCI'
  | 'CMO'
  | 'ROC'
  | 'ROCR'
  | 'AROON'
  | 'AROONOSC'
  | 'MFI'
  | 'TRIX'
  | 'ULTOSC'
  | 'DX'
  | 'MINUS_DI'
  | 'PLUS_DI'
  | 'MINUS_DM'
  | 'PLUS_DM'
  | 'BBANDS'
  | 'MIDPOINT'
  | 'MIDPRICE'
  | 'SAR'
  | 'TRANGE'
  | 'ATR'
  | 'NATR'
  | 'AD'
  | 'ADOSC'
  | 'OBV'
  | 'HT_TRENDLINE'
  | 'HT_SINE'
  | 'HT_TRENDMODE'
  | 'HT_DCPERIOD'
  | 'HT_DCPHASE'
  | 'HT_PHASOR';
