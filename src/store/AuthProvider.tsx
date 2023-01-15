import { useReducer, useCallback } from 'react';
import { AuthContext, INIT_STATE, IAuthed } from './authContext';
import { getLocalStorage } from '../utils';

interface IReducerState {
  id: string | number;
  name: string;
  email: string;
  token: string;
  photo: string;
  theme: string;
  authed: boolean;
}
interface IReducerAction {
  type: string;
  payload?: any;
}

const authReducer = (state: IReducerState, action: IReducerAction) => {
  switch (action.type) {
    case 'LOGIN': {
      const { id, name, email, token, photo, theme } = action.payload;
      localStorage.setItem(
        'AUTH',
        JSON.stringify({ id, name, email, token, photo, theme })
      );
      return { id, name, email, token, photo, theme, authed: true };
    }
    case 'LOGOUT': {
      localStorage.removeItem('AUTH');
      return {
        id: '',
        name: '',
        email: '',
        token: '',
        photo: '',
        theme: 'light',
        authed: false,
      };
    }
    case 'SWITCH_THEME': {
      const { theme } = action.payload;
      const localStorageData = getLocalStorage()!;
      const objToSave = {
        ...localStorageData,
        theme: theme ? 'dark' : 'light',
        authed: state.authed,
      };
      localStorage.setItem('AUTH', JSON.stringify(objToSave));
      return objToSave;
    }
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [auth, dispatchAuth] = useReducer(authReducer, INIT_STATE());

  const loginHandler = useCallback(
    ({ id, name, email, token, photo, theme }: IAuthed) => {
      dispatchAuth({
        type: 'LOGIN',
        payload: { id, name, email, token, photo, theme },
      });
    },
    [dispatchAuth]
  );

  const logoutHandler = useCallback(() => {
    dispatchAuth({ type: 'LOGOUT' });
  }, [dispatchAuth]);

  const setLayoutTheme = useCallback(
    ({ theme }: { theme: boolean }) => {
      dispatchAuth({ type: 'SWITCH_THEME', payload: { theme } });
    },
    [dispatchAuth]
  );

  const authContext = {
    authStatus: auth,
    loginHandler,
    logoutHandler,
    setLayoutTheme,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
