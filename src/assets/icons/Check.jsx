import * as React from 'react';

export const Check = (props) => (
  <svg
    className='w-6 h-6'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m9 12 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'
    />
  </svg>
);
