import Color from 'color';
import inputs from './inputs.json';

export interface DesignSystem {
  colors: {
    [key: string]: number[]
  }
}

const baseColor = Color(inputs.baseColor.value);

export default {
  colors: {
    base: baseColor.alpha(.5).rgb().array(),
    darker: baseColor.darken(.5).desaturate(.25).rgb().array()
  }
} as DesignSystem;