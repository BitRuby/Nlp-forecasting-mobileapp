import { Layer } from '../screens/AI/types';

export type WsMessage =
  | { error: Error }
  | { id: string; preds: Preds; layers: Layer[] }
  | { finish: boolean };

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
