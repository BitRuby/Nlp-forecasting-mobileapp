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
