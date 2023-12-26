export interface Layer {
  units: string;
  activation?: string;
  kernelSize?: string;
  filters?: string;
  padding?: string;
  key: string;
}

export interface Preds {
  loss?: number;
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1Score?: number;
  mae?: number;
  mse?: number;
  rmse?: number;
  mape?: number;
  mase?: number;
}

export interface Message {
  type: 'train' | 'test';
  epochs?: number;
  preds: Preds;
}

export interface Result {
  train: Preds;
  test: Preds;
}

export interface TrainHistoryElement {
  _id: string;
  date: string;
  algorithm: string;
  layers: Layer[];
  optimizerFunction: string;
  lossFunction: string;
  batchSize: number;
  processedDatasetId: ProcessedDataset;
  result: Result;
}

export interface ProcessedDataset {
  name: string;
  datasetId: string;
  startDate: string;
  endDate: string;
  windowSize: number;
  horizonSize: number;
  scaleType: string;
  trainFeatures: [];
  testFeatures: [];
  trainLabel: [];
  testLabel: [];
}
