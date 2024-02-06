export const generateRandomNumber = (min: number, max: number, decimalPlaces: number): number =>
  +(Math.random() * (max - min + 1) + min).toFixed(decimalPlaces);