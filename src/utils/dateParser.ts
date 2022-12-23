export const dateHandler = (date: string) => {
  return new Date(date).toUTCString().replace(/(?<=2022).*$/, '');
};
