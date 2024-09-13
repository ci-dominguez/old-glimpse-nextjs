export interface Color {
  id: string;
  name: string;
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

export interface ColorSystemCard {
  id: string;
  name: string;
  description: string | null;
  baseColors: string[];
  backgroundColor: string;
  isFavorite: boolean;
}
