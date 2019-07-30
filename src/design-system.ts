import Color from 'color';

export interface DesignSystem {
  colors: {
    [key: string]: Color
  }
}

export interface InputDict {
  [key: string]: any;
}

export const computeDesignSystem = (inputs: InputDict): DesignSystem => {
  const baseColor = Color(inputs.baseColor.value);
  
  return {
    colors: {
      base: baseColor.alpha(.5).rgb(),
      darker: baseColor.darken(.5).desaturate(.25).rgb()
    }
  };
};