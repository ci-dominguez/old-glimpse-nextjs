import { oklch, interpolate, formatHex } from 'culori';

export function generateColorScale(
  baseColor: string,
  backgroundColor: string,
  scaleSize: number = 10
): string[] {
  const baseOklch = oklch(baseColor);
  const bgOklch = oklch(backgroundColor);

  if (!baseOklch || !bgOklch) {
    throw new Error('Invalid color input');
  }

  const isLightBackground = bgOklch.l > 0.5;

  const interpolator = interpolate([
    isLightBackground
      ? { mode: 'oklch', l: 0.1, c: baseOklch.c, h: baseOklch.h }
      : { mode: 'oklch', l: 0.9, c: baseOklch.c, h: baseOklch.h },
    baseOklch,
    isLightBackground
      ? { mode: 'oklch', l: 0.9, c: baseOklch.c * 0.5, h: baseOklch.h }
      : { mode: 'oklch', l: 0.1, c: baseOklch.c * 0.5, h: baseOklch.h },
  ]);

  //Generate the scale
  const scale: string[] = [];
  for (let i = 0; i < scaleSize; i++) {
    const t = i / (scaleSize - 1);
    const color = interpolator(t);
    scale.push(formatHex(color));
  }

  return scale;
}
