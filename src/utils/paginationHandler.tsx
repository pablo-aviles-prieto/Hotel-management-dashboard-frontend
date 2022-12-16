const onBtnClick = (
  setPage: React.Dispatch<React.SetStateAction<number>>,
  i: number
) => {
  setPage(i + 1);
  document.getElementById('pages-container')?.scrollIntoView();
};

export const numberOfPages = (totalLength: number, offset: number) => {
  if (totalLength <= offset) return 1;
  return Math.ceil(totalLength / offset);
};

export const paginationDataHandler = (
  data: any[],
  offset: number,
  selectedPage: number
) => {
  if (numberOfPages(data.length, offset) < selectedPage)
    return data.slice(0, offset);
  const initialSlice = (selectedPage - 1) * offset;
  const finalSlice = selectedPage * offset;
  return data.slice(initialSlice, finalSlice);
};

export const paginationButtonsHandler = (
  page: number,
  totalPages: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const newArr = [...Array(totalPages)].map((_, i) => {
    if (i + 1 === page)
      return (
        <div
          onClick={() => onBtnClick(setPage, i)}
          key={i}
          className='selected-page'
        >
          {i + 1}
        </div>
      );

    if (i === page || i + 2 === page)
      return (
        <div
          onClick={() => onBtnClick(setPage, i)}
          key={i}
          className='adjacent-page'
        >
          {i + 1}
        </div>
      );

    if (i === 0)
      return (
        <div
          onClick={() => onBtnClick(setPage, i)}
          key={i}
          className='first-page'
        >
          {i + 1}
        </div>
      );

    if (i + 1 === totalPages)
      return (
        <div
          onClick={() => onBtnClick(setPage, i)}
          key={i}
          className='last-page'
        >
          {i + 1}
        </div>
      );

    return <div key={i}>{i + 1}</div>;
  });
  return newArr;
};
