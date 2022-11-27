const getObjValue = ({ obj, value }) => {
  const search = Array.isArray(value) ? value : [value];
  return search.reduce(
    (acc, key) => (acc[key] !== 'undefined' ? acc[key] : undefined),
    obj
  );
};

export const reorderHandler = ({ array, orderValue, orderDirection }) => {
  return array.sort((a, b) => {
    const aObj = getObjValue({ obj: a, value: orderValue });
    const bObj = getObjValue({ obj: b, value: orderValue });

    if (aObj > bObj) return +orderDirection === 0 ? 1 : -1;
    if (aObj < bObj) return +orderDirection === 0 ? -1 : 1;
    return 0;
  });
};
