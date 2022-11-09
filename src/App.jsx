import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Bookings from './pages/Bookings';
import BookingDetails from './pages/BookingDetails';
import Rooms from './pages/Rooms';
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

const App = () => {
  const [auth, setAuth] = useState(!!localStorage.getItem('AUTH'));
  const [lightTheme, setLightTheme] = useState(true);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('AUTH', 'yes');
      setAuth(true);
    } else {
      localStorage.removeItem('AUTH');
      setAuth(false);
    }
  }, [auth]);

  const authHandler = (boolean) => {
    setAuth(boolean);
  };

  const switchThemeHandler = () => {
    setLightTheme((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={lightTheme ? LIGHT_THEME : DARK_THEME}>
      <Layout authProp={[auth, authHandler]} themeProp={[lightTheme, switchThemeHandler]}>
        <Routes>
          <Route
            path='/'
            element={<Homepage onThemeChange={switchThemeHandler} />}
          />
          <Route
            path='/login'
            element={<Login onSubmit={authHandler} auth={auth} />}
          />
          <Route path='*' element={<ProtectRoute auth={auth} />}>
            <Route path='bookings' element={<Bookings />} />
            <Route path='bookings/:id' element={<BookingDetails />} />
            <Route path='rooms' element={<Rooms />} />
            <Route path='rooms/new' element={<NewRoom />} />
            <Route path='rooms/list' element={<RoomsList />} />
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
