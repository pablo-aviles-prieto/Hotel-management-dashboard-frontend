export const dateHandler = (date: string) => {
  return new Date(date).toISOString().substring(0, 10);
};
