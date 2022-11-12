export const firstLetterToUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase();
};

export const trimToLength = (str: string, length: number) => {
  if (str.length < length) return str;
  return str.slice(0, length) + '...';
};
