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
  return search.reduce((acc, key) => {
    console.log('acc[key]', acc[key]);
    console.log('key', key);
    return acc[key];
  }, obj);
};

export const reorderHandler = ({
  array,
  orderValue,
  orderDirection,
}: IReorderHandler) => {
  return array.sort((a, b) => {
    const aObj = getObjValue({ obj: a, value: orderValue });
    const bObj = getObjValue({ obj: b, value: orderValue });
    console.log('aObj', aObj);
    console.log('bObj', bObj);

    // Since some objValues (returned from getObjValue) can be numbers or string, have to check for it
    if (
      (typeof aObj !== 'number' ? aObj.toLowerCase() : aObj) >
      (typeof bObj !== 'number' ? bObj.toLowerCase() : bObj)
    )
      return +orderDirection === 0 ? 1 : -1;

    if (
      (typeof aObj !== 'number' ? aObj.toLowerCase() : aObj) <
      (typeof bObj !== 'number' ? bObj.toLowerCase() : bObj)
    )
      return +orderDirection === 0 ? -1 : 1;

    return 0;
  });
};
