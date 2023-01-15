import { createContext } from 'react';

export interface IAuthed {
  id: string | number;
  name: string;
  photo: string;
  email: string;
  token: string;
  theme: string;
}

interface IINIT_STATE extends IAuthed {
  authed: boolean;
}

export const INIT_STATE = (): IINIT_STATE => {
  const getLocalStorage = localStorage.getItem('AUTH');
  const authInfo: IAuthed | null = getLocalStorage
    ? JSON.parse(getLocalStorage)
    : null;
  return authInfo
    ? { ...authInfo, authed: true }
    : {
        id: '',
        name: '',
        photo: '',
        email: '',
        token: '',
        theme: 'light',
        authed: false,
      };
};

export const AuthContext = createContext({
  authStatus: INIT_STATE(),
  loginHandler: ({ id, name, email, token, photo }: IAuthed) => {},
  logoutHandler: () => {},
  setLayoutTheme: ({ theme }: { theme: boolean }) => {},
});
