import tinycolor from 'tinycolor2';

let hueStep = 2;
let saturationStep = 16;
let saturationStep2 = 5;
let brightnessStep1 = 5;
let brightnessStep2 = 15;
let lightColorCount = 5;
let darkColorCount = 4;

interface IHSV {
  h: number;
  s: number;
  v: number;
}

let getHue = function (hsv: IHSV, i: number, isLight: boolean) {
  let hue;
  if (hsv.h >= 60 && hsv.h <= 240) {
    hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
  } else {
    hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return Math.round(hue);
};

let getSaturation = function (hsv: IHSV, i: number, isLight: boolean) {
  let saturation;
  if (isLight) {
    saturation = Math.round(hsv.s * 100) - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = Math.round(hsv.s * 100) + saturationStep;
  } else {
    saturation = Math.round(hsv.s * 100) + saturationStep2 * i;
  }
  if (saturation > 100) {
    saturation = 100;
  }
  if (isLight && i === lightColorCount && saturation > 10) {
    saturation = 10;
  }
  if (saturation < 6) {
    saturation = 6;
  }
  return Math.round(saturation);
};

let getValue = function (hsv: IHSV, i: number, isLight: boolean) {
  if (isLight) {
    return Math.round(hsv.v * 100) + brightnessStep1 * i;
  }
  return Math.round(hsv.v * 100) - brightnessStep2 * i;
};

export const colorPalette = function (color: string, index: number) {
  let isLight = index <= 6;
  let hsv = tinycolor(color).toHsv();
  let i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;
  return tinycolor({
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight),
  }).toHexString();
};

const blue = '#1890ff';
const purple = '#722ed1';
const cyan = '#13c2c2';
const green = '#52c41a';
const magenta = '#eb2f96';
const red = '#f5222d';
const orange = '#fa8c16';
const yellow = '#fadb14';
const volcano = '#fa541c';
const geekblue = '#2f54eb';
const lime = '#a0d911';
const gold = '#faad14';

export const baseColors = {
  blue,
  purple,
  cyan,
  green,
  magenta,
  red,
  orange,
  yellow,
  volcano,
  geekblue,
  lime,
  gold,
};

const arr = new Array(10).fill(1);
const colors = Object.values(baseColors).map((color) => {
  return arr.map((_item, i) => {
    if (i === 5) return color;
    return colorPalette(color, i + 1);
  });
});

export default colors;
