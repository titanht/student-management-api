export const timeValidationRule = /^(0[1-9]|1[0-2]):[0-5]\d (a|p)m$/;

export const padZeros = (num: number, length: number): string => {
  if (num.toString().length >= length) return num.toString();

  const padZeros = Array(length - num.toString().length)
    .fill(0)
    .join('');

  return `${padZeros}${num}`;
};
