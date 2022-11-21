import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';

export const ProtectRoute = () => {
  const { authStatus } = useContext(AuthContext);
  if (!authStatus.authed) return <Navigate to='/login' replace />;
  return (
    <>
      <Outlet />
    </>
  );
};
