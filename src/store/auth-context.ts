import { createContext } from 'react';

export interface IAuthed {
  name: string;
  email: string;
}

export const INIT_STATE = () => {
  const getLocalStorage = localStorage.getItem('AUTH');
  const authed: IAuthed | null = getLocalStorage
    ? JSON.parse(getLocalStorage)
    : null;
  return authed
    ? { ...authed, authed: true }
    : { name: '', email: '', authed: false };
};

export const AuthContext = createContext({
  authStatus: INIT_STATE(),
  loginHandler: ({ name, email }: IAuthed) => {},
  logoutHandler: () => {},
  updateUserHandler: (data: any) => {},
});
