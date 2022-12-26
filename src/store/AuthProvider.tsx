import { useReducer, useCallback } from 'react';
import { AuthContext, INIT_STATE, IAuthed } from './authContext';

interface IReducerState {
  name?: string;
  email: string;
  token: string;
  authed: boolean;
}
interface IReducerAction {
  type: string;
  payload?: any;
}

const authReducer = (state: IReducerState, action: IReducerAction) => {
  switch (action.type) {
    case 'LOGIN': {
      const { name, email, token } = action.payload;
      localStorage.setItem('AUTH', JSON.stringify({ name, email, token }));
      return { name, email, token, authed: true };
    }
    case 'LOGOUT': {
      localStorage.removeItem('AUTH');
      return { name: '', email: '', token: '', authed: false };
    }
    case 'UPDATE': {
      console.log('action UPDATE', action);
      return state;
    }
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [auth, dispatchAuth] = useReducer(authReducer, INIT_STATE());

  const loginHandler = useCallback(
    ({ name, email, token }: IAuthed) => {
      dispatchAuth({ type: 'LOGIN', payload: { name, email, token } });
    },
    [dispatchAuth]
  );

  const logoutHandler = useCallback(() => {
    dispatchAuth({ type: 'LOGOUT' });
  }, [dispatchAuth]);

  const updateUserHandler = useCallback((data: any) => {
    console.log('data obj to update user in auth context', data);
  }, []);

  const authContext = {
    authStatus: auth,
    loginHandler,
    logoutHandler,
    updateUserHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
