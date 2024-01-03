import { Layer } from '../screens/AI/types';

const URL = '192.168.165.235:5050';
export const API_URL = `http://${URL}`;
export const WS_URL = `ws://${URL}`;

export const mapValues = (layers: Layer[]) => {
  let str = '';
  layers.forEach((el: Layer) => {
    if (el.units) {
      str += `${el.units} ${el.activation}/`;
    }
    if (el.filters) {
      str += `${el.filters} ${el.activation}/`;
    }
  });
  return str.slice(0, str.length - 1);
};
