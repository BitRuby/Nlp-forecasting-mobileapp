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

export const economicIndicatorTypesArray: EconomicIndicatorTypes[] = [
  'RealGDP',
  'RealGDPPerCapita',
  'TreasuryYield',
  'FederalFundsRate',
  'CPI',
  'Inflation',
  'RetailSales',
  'DurableGoodsOrders',
  'UnemploymentRate',
  'NonfarmPayroll',
];

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

export const technicalIndicatorTypesArray: TechnicalIndicatorTypes[] = [
  'SMA',
  'EMA',
  'WMA',
  'DEMA',
  'TEMA',
  'TRIMA',
  'KAMA',
  'MAMA',
  'VWAP',
  'T3',
  'MACD',
  'MACDEXT',
  'STOCH',
  'STOCHF',
  'RSI',
  'STOCHRSI',
  'WILLR',
  'ADX',
  'ADXR',
  'APO',
  'PPO',
  'MOM',
  'BOP',
  'CCI',
  'CMO',
  'ROC',
  'ROCR',
  'AROON',
  'AROONOSC',
  'MFI',
  'TRIX',
  'ULTOSC',
  'DX',
  'MINUS_DI',
  'PLUS_DI',
  'MINUS_DM',
  'PLUS_DM',
  'BBANDS',
  'MIDPOINT',
  'MIDPRICE',
  'SAR',
  'TRANGE',
  'ATR',
  'NATR',
  'AD',
  'ADOSC',
  'OBV',
  'HT_TRENDLINE',
  'HT_SINE',
  'HT_TRENDMODE',
  'HT_DCPERIOD',
  'HT_DCPHASE',
  'HT_PHASOR',
];

export function incrementDate(inputDate: string, i: number) {
  const date = new Date(inputDate);
  date.setDate(date.getDate() + i);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
