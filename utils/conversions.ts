import { oklab, converter, formatHex, Okhsl } from 'culori';

//Parse OKHsl color space format then return obj with values
export function parseOkhsl(okhslString: string): Okhsl {
  const match = okhslString.match(/okHsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);
  if (!match) {
    throw new Error('Invalid okhsl format');
  }
  const [, h, s, l] = match;
  return {
    mode: 'okhsl',
    h: Number(h),
    s: Number(s) / 100,
    l: Number(l) / 100,
  };
}

//Convert the OKHsl color values to hex color space
export function convertOKHslToHex(okhslString: string): string {
  const okhslColor = parseOkhsl(okhslString);
  console.log('OKHsl color:', okhslColor);

  //OKHsl -> OKLab
  const oklabColor = oklab(okhslColor);
  console.log('OKLab color:', oklabColor);

  //OkLab -> Linear RGB
  let toRgb = converter('rgb');
  const linearRgbColor = toRgb(oklabColor);
  console.log('Linear RGB color:', linearRgbColor);

  //Linear RGB -> sRGB (handled internally by formatHex)
  //sRGB -> Hex
  const hexColor = formatHex(linearRgbColor);
  console.log('Hex color:', hexColor);

  return hexColor!;
}
