export const reorderByOldestDate = (dataArray) => {
  return [...dataArray].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );
};
