export interface Layer {
  units: number;
  activation?: string;
  kernelSize?: number;
  filters?: number;
  padding?: string;
  key: string;
  layer_type?: string;
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

export interface TrainHistoryElement {
  _id: string;
  date: string;
  algorithm: string;
  layers: Layer[];
  optimizerFunction: string;
  lossFunction: string;
  batchSize: number;
  processedDatasetId: ProcessedDataset;
  result: Preds;
  trainingTime: number;
  epochs: number;
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
