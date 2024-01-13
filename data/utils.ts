import { Layer } from '../screens/AI/types';

const localIpAddress = '192.168.40.235';

const URL = `${localIpAddress}:5050`;
export const API_URL = `http://${URL}`;
export const WS_URL = `ws://${URL}`;

export const mapValues = (layers: Layer[]) => {
  if (!layers) {
    return '';
  } else {
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
  }
};
