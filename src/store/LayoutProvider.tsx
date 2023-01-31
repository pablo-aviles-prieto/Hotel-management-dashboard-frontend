import { useState } from 'react';
import { LayoutContext } from './layoutContext';

export const LayoutProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [sideBarState, setSideBarState] = useState<boolean>(false);

  const switchSideBarState = () => {
    setSideBarState((prevState) => !prevState);
  };

  const authContext = {
    sideBarState,
    switchSideBarState,
  };

  return (
    <LayoutContext.Provider value={authContext}>
      {children}
    </LayoutContext.Provider>
  );
};
