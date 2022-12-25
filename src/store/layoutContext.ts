import { createContext } from 'react';

export const LayoutContext = createContext({
  sideBarState: false,
  switchSideBarState: () => {},
});
