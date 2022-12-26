import React, { useState, useLayoutEffect } from 'react';

export const useContainerDimensions = (
  myRef: React.RefObject<HTMLDivElement>
) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const sideBarMenu = document.querySelector('#sidebar-menu');
    const getDimensions = () => ({
      width: myRef.current!.offsetWidth,
      height: myRef.current!.offsetHeight,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);
    sideBarMenu!.addEventListener('transitionend', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      sideBarMenu!.removeEventListener('transitionend', handleResize);
    };
  }, [myRef]);

  return dimensions;
};
