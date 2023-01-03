interface IReorderHandler {
  array: any[];
  orderValue: string;
  orderDirection: string;
}

const getObjValue = ({
  obj,
  value,
}: {
  obj: { [key: string]: any };
  value: string | string[];
}) => {
  const search = Array.isArray(value) ? value : [value];
  return search.reduce(
    (acc, key) => (acc[key] !== 'undefined' ? acc[key] : undefined),
    obj
  );
};

export const reorderHandler = ({
  array,
  orderValue,
  orderDirection,
}: IReorderHandler) => {
  return array.sort((a, b) => {
    const aObj = getObjValue({ obj: a, value: orderValue });
    const bObj = getObjValue({ obj: b, value: orderValue });

    if (aObj.toLowerCase() > bObj.toLowerCase())
      return +orderDirection === 0 ? 1 : -1;

    if (aObj.toLowerCase() < bObj.toLowerCase())
      return +orderDirection === 0 ? -1 : 1;

    return 0;
  });
};
