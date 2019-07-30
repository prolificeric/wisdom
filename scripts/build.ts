import { computeDesignSystem } from '../src/design-system';
import inputs from '../inputs.json';

const json = JSON.stringify(computeDesignSystem(inputs), null, 2);

console.log(json);