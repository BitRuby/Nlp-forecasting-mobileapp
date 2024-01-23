import { Layer } from '../screens/AI/types';

const localIpAddress = '192.168.40.235';
const nodeApiPort = '5050';
const pythonApiPort = '5000';
const wsPort = '8765';

export const NODE_API_URL = `http://${localIpAddress}:${nodeApiPort}`;
export const PYTHON_API_URL = `http://${localIpAddress}:${pythonApiPort}`;
export const WS_URL = `ws://${localIpAddress}:${wsPort}`;

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
