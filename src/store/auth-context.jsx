import { createContext } from 'react';


export const INIT_STATE = () => {
  const authed = JSON.parse(localStorage.getItem('AUTH'));
  return authed
    ? { ...authed, authed: true }
    : { name: '', email: '', authed: false };
};

export const AuthContext = createContext({
  authStatus: INIT_STATE(),
  loginHandler: ({ name, email }) => {},
  logoutHandler: () => {},
  updateUserHandler: (data) => {},
});
