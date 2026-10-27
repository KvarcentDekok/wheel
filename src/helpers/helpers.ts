import { GOLDEN_ANGLE, Lightness, Saturation } from "../const/const";
import type { Lot } from "../types/types";

export function getHslColor(prevColor?: string) {
  const saturation =
    Math.floor(Math.random() * (Saturation.Max - Saturation.Min)) +
    Saturation.Min;
  const lightness =
    Math.floor(Math.random() * (Lightness.Max - Lightness.Min)) + Lightness.Min;

  let hue = Math.floor(Math.random() * 360);

  if (prevColor) {
    const prevHue = getHueFromString(prevColor);

    if (prevHue) {
      hue = (prevHue + GOLDEN_ANGLE) % 360;
    }
  }

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getHueFromString(hslString: string) {
  const match = hslString.match(/hsla?\(\s*(\d+(?:\.\d+)?)/i);

  return match ? parseFloat(match[1]) : null;
}

export function sortLots(a: Lot, b: Lot) {
  const totalA = a.bets.reduce((prev, curr) => prev + (curr.value ?? 0), 0);
  const totalB = b.bets.reduce((prev, curr) => prev + (curr.value ?? 0), 0);

  return totalB - totalA;
}
