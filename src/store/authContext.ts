import { createContext } from 'react';

export interface IAuthed {
  id: string | number;
  name: string;
  photo: string;
  email: string;
  token: string;
}

export const INIT_STATE = () => {
  const getLocalStorage = localStorage.getItem('AUTH');
  const authInfo: IAuthed | null = getLocalStorage
    ? JSON.parse(getLocalStorage)
    : null;
  return authInfo
    ? { ...authInfo, authed: true }
    : { id: '', name: '', photo: '', email: '', token: '', authed: false };
};

export const AuthContext = createContext({
  authStatus: INIT_STATE(),
  loginHandler: ({ name, email }: IAuthed) => {},
  logoutHandler: () => {},
});
