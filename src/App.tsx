import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Bookings from './pages/Bookings';
import BookingDetails from './pages/BookingDetails';
import BookingEdit from './pages/BookingEdit';
import NewBooking from './pages/NewBooking';
import RoomsList from './pages/RoomsList';
import NewRoom from './pages/NewRoom';
import RoomDetails from './pages/RoomDetails';
import RoomEdit from './pages/RoomEdit';
import Users from './pages/Users';
import NewUser from './pages/NewUser';
import UserDetails from './pages/UserDetails';
import UserEdit from './pages/UserEdit';
import Contact from './pages/Contact';
import ContactDetails from './pages/ContactDetails';
import NewContact from './pages/NewContact';
import ContactEdit from './pages/ContactEdit';
import { NotFound, ProtectRoute, Layout } from './components';
import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, DARK_THEME } from './themes';
import { AuthContext } from './store/authContext';
import { getLocalStorage } from './utils';

const App = () => {
  // If we don't find in localStorage a theme prop set as dark, we set the lightTheme to true as default
  const [lightTheme, setLightTheme] = useState<boolean>(
    getLocalStorage()?.theme !== 'dark'
  );
  const { authStatus, setLayoutTheme } = useContext(AuthContext);

  const switchThemeHandler = () => {
    console.log('1', lightTheme);
    setLightTheme((prevState) => !prevState);
    console.log('2', lightTheme);
    setLayoutTheme({ theme: lightTheme });
  };

  return (
    <ThemeProvider theme={lightTheme ? LIGHT_THEME : DARK_THEME}>
      <Layout themeProp={[lightTheme, switchThemeHandler]}>
        <Routes>
          <Route
            path='/'
            element={
              authStatus.authed ? (
                <Homepage />
              ) : (
                <Navigate to='/login' replace />
              )
            }
          />
          <Route path='/login' element={<Login lightTheme={lightTheme} />} />
          <Route path='*' element={<ProtectRoute />}>
            <Route path='bookings' element={<Bookings />} />
            <Route path='bookings/new' element={<NewBooking />} />
            <Route path='bookings/:id' element={<BookingDetails />} />
            <Route path='bookings/:id/edit' element={<BookingEdit />} />
            <Route path='rooms' element={<RoomsList />} />
            <Route path='rooms/new' element={<NewRoom />} />
            <Route path='rooms/:id' element={<RoomDetails />} />
            <Route path='rooms/:id/edit' element={<RoomEdit />} />
            <Route path='users' element={<Users />} />
            <Route path='users/new' element={<NewUser />} />
            <Route path='users/:id' element={<UserDetails />} />
            <Route path='users/:id/edit' element={<UserEdit />} />
            <Route path='contacts' element={<Contact />} />
            <Route path='contacts/new' element={<NewContact />} />
            <Route path='contacts/:id' element={<ContactDetails />} />
            <Route path='contacts/:id/edit' element={<ContactEdit />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
