export const NAIVE = 'NAIVE';
export const DENSE = 'DENSE';
export const CONV1D = 'CONV1D';
export const LSTM = 'LSTM';

export const ALGORITHMS = [NAIVE, DENSE, CONV1D, LSTM];

const relu = 'relu';
const sigmoid = 'sigmoid';
const softmax = 'softmax';

export const ACTIVATION_FUNCTIONS = [relu, sigmoid, softmax];

const same = 'same';
const valid = 'valid';

export const PADDING_FUNCTIONS = [same, valid];

const MEAN_SQUARED_ERROR = 'meanSquaredError';
const BINARY_CROSSENTROPY = 'binaryCrossentropy';
const CATEGORIAL_CROSSENTROPY = 'categoricalCrossentropy';

export const LOSS_FUNCTIONS = [
  MEAN_SQUARED_ERROR,
  BINARY_CROSSENTROPY,
  CATEGORIAL_CROSSENTROPY,
];

const ADAGARD = 'adagrad';
const ADADELTA = 'adadelta';
const ADAM = 'adam';
const ADAMAX = 'adamax';
const RMSPROP = 'rmsprop';
const SGD = 'sgd';

export const OPTIMIZER_FUNCTIONS = [
  ADAM,
  ADAGARD,
  ADADELTA,
  ADAMAX,
  RMSPROP,
  SGD,
];

const NEG = 'neg';
const NEU = 'neu';
const POS = 'pos';
const COMPOUND = 'compound';
const VECTORIZED = 'vectorized';

export const COLUMNS = [NEG, NEU, POS, COMPOUND, VECTORIZED];

const Normalize = 'Normalize';
const Standarize = 'Standarize';
const None = 'None';

export const SCALE_TYPES = [Normalize, Standarize, None];

export const UNIT_SEQUENCE = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
