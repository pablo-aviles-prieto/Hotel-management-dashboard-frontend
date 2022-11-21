import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Bookings from './pages/Bookings';
import BookingDetails from './pages/BookingDetails';
import NewRoom from './pages/NewRoom';
import RoomsList from './pages/RoomsList';
import RoomDetails from './pages/RoomDetails';
import RoomEdit from './pages/RoomEdit';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';
import Contact from './pages/Contact';
import { NotFound, ProtectRoute, Layout } from './components';
import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, DARK_THEME } from './themes';
import { AuthContext } from './store/auth-context';

const App = () => {
  const [lightTheme, setLightTheme] = useState(true);
  const { authStatus, loginHandler } = useContext(AuthContext);

  const switchThemeHandler = () => {
    setLightTheme((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={lightTheme ? LIGHT_THEME : DARK_THEME}>
      <Layout themeProp={[lightTheme, switchThemeHandler]}>
        <Routes>
          <Route
            path='/'
            element={
              authStatus.authed? (
                <Homepage onThemeChange={switchThemeHandler} />
              ) : (
                <Navigate to='/login' replace />
              )
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<ProtectRoute />}>
            <Route path='bookings' element={<Bookings />} />
            <Route path='bookings/:id' element={<BookingDetails />} />
            <Route path='rooms' element={<RoomsList />} />
            <Route path='rooms/new' element={<NewRoom />} />
            <Route path='rooms/:id' element={<RoomDetails />} />
            <Route path='rooms/:id/edit' element={<RoomEdit />} />
            <Route path='users' element={<Users />} />
            <Route path='users/new' element={<CreateUser />} />
            <Route path='contact' element={<Contact />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
