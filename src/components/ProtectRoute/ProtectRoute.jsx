import { Navigate, Outlet } from 'react-router-dom';

export const ProtectRoute = (props) => {
  if (!props.auth) return <Navigate to='/login' replace />;
  return (
    <>
      <Outlet />
    </>
  );
};
