import {
  oklch,
  rgb,
  hsl,
  hsv,
  lab,
  lch,
  p3,
  a98,
  prophoto,
  formatHex,
  formatRgb,
  formatHsl,
  Okhsl,
  Rgb,
  Hsl,
  Oklch,
  Hsv,
  Lab,
  Lch,
  P3,
  A98,
  Prophoto,
} from 'culori';

interface ColorSpaces {
  okhsl: string;
  hex: string;
  rgb: string;
  hsl: string;
  oklch: string;
  cmyk: string;
  hsb: string;
  lab: string;
  lch: string;
  displayp3: string;
  a98: string;
  prophoto: string;
  xyz: string;
}

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

export function okhslToRgb(okhsl: Okhsl): Rgb {
  const oklchColor = oklch(okhsl);
  return rgb(oklchColor);
}

export function rgbToOkhsl(rgb: Rgb): Okhsl {
  const oklchColor = oklch(rgb);
  return {
    mode: 'okhsl',
    h: oklchColor.h,
    s: oklchColor.c,
    l: oklchColor.l,
  };
}

export function rgbToHex(rgb: Rgb): string {
  return formatHex(rgb);
}

export function hexToRgb(hex: string): Rgb {
  return rgb(hex)!;
}

export function rgbToHsl(rgb: Rgb): Hsl {
  return hsl(rgb);
}

export function rgbToOklch(rgb: Rgb): Oklch {
  return oklch(rgb);
}

export function rgbToCmyk(rgb: Rgb): {
  c: number;
  m: number;
  y: number;
  k: number;
} {
  const r = rgb.r;
  const g = rgb.g;
  const b = rgb.b;
  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;
  return { c, m, y, k };
}

export function rgbToHsv(rgb: Rgb): Hsv {
  return hsv(rgb);
}

export function rgbToLab(rgb: Rgb): Lab {
  return lab(rgb);
}

export function labToLch(lab: Lab): Lch {
  return lch(lab);
}

export function rgbToP3(rgb: Rgb): P3 {
  return p3(rgb);
}

export function rgbToA98(rgb: Rgb): A98 {
  return a98(rgb);
}

export function rgbToProphoto(rgb: Rgb): Prophoto {
  return prophoto(rgb);
}

export function rgbToXyz(rgb: Rgb): { x: number; y: number; z: number } {
  const r = rgb.r;
  const g = rgb.g;
  const b = rgb.b;

  const rLinear = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  const gLinear = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  const bLinear = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  const x = 0.4124564 * rLinear + 0.3575761 * gLinear + 0.1804375 * bLinear;
  const y = 0.2126729 * rLinear + 0.7151522 * gLinear + 0.072175 * bLinear;
  const z = 0.0193339 * rLinear + 0.119192 * gLinear + 0.9503041 * bLinear;

  return { x, y, z };
}

function formatOklch(oklch: Oklch): string {
  return `oklch(${(oklch.l * 100).toFixed(2)}% ${oklch.c.toFixed(
    4
  )} ${oklch.h!.toFixed(2)})`;
}

export function generateAllColorSpaces(okhsl: Okhsl): ColorSpaces {
  const rgbColor = okhslToRgb(okhsl);
  const labColor = rgbToLab(rgbColor);

  return {
    okhsl: `okHsl(${Math.round(okhsl.h!)} ${Math.round(
      okhsl.s * 100
    )}% ${Math.round(okhsl.l * 100)}%)`,
    hex: rgbToHex(rgbColor),
    rgb: formatRgb(rgbColor),
    hsl: formatHsl(rgbToHsl(rgbColor)),
    oklch: formatOklch(rgbToOklch(rgbColor)),
    cmyk: (() => {
      const { c, m, y, k } = rgbToCmyk(rgbColor);
      return `cmyk(${(c * 100).toFixed(2)}% ${(m * 100).toFixed(2)}% ${(
        y * 100
      ).toFixed(2)}% ${(k * 100).toFixed(2)}%)`;
    })(),
    hsb: (() => {
      const hsvColor = rgbToHsv(rgbColor);
      return `hsb(${Math.round(hsvColor.h!)} ${(hsvColor.s * 100).toFixed(
        2
      )}% ${(hsvColor.v * 100).toFixed(2)}%)`;
    })(),
    lab: (() => {
      return `lab(${labColor.l.toFixed(2)}% ${labColor.a.toFixed(
        2
      )} ${labColor.b.toFixed(2)})`;
    })(),
    lch: (() => {
      const lchColor = labToLch(labColor);
      return `lch(${lchColor.l.toFixed(2)}% ${lchColor.c.toFixed(
        2
      )} ${lchColor.h!.toFixed(2)})`;
    })(),
    displayp3: (() => {
      const p3Color = rgbToP3(rgbColor);
      return `color(display-p3 ${p3Color.r.toFixed(4)} ${p3Color.g.toFixed(
        4
      )} ${p3Color.b.toFixed(4)})`;
    })(),
    a98: (() => {
      const a98Color = rgbToA98(rgbColor);
      return `color(a98-rgb ${a98Color.r.toFixed(4)} ${a98Color.g.toFixed(
        4
      )} ${a98Color.b.toFixed(4)})`;
    })(),
    prophoto: (() => {
      const prophotoColor = rgbToProphoto(rgbColor);
      return `color(prophoto-rgb ${prophotoColor.r.toFixed(
        4
      )} ${prophotoColor.g.toFixed(4)} ${prophotoColor.b.toFixed(4)})`;
    })(),
    xyz: (() => {
      const xyzColor = rgbToXyz(rgbColor);
      return `color(xyz ${xyzColor.x.toFixed(4)} ${xyzColor.y.toFixed(
        4
      )} ${xyzColor.z.toFixed(4)})`;
    })(),
  };
}
