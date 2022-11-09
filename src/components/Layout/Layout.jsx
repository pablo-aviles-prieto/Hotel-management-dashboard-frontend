import { useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import {
  LeftArrow,
  RightArrow,
  Mail,
  Bell,
  Logout,
  Login,
  Sun,
  Moon,
  Hotel,
  Dashboard,
  Key,
  Calendar,
  Users,
  BottomArrow,
} from '../../assets/icons';

const HeaderDiv = styled.div`
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  margin-left: ${({ sideBarState }) => (!sideBarState ? '0' : '25%')};
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.mainBground};
  color: ${({ theme }) => theme.mainColor};
  box-shadow: 0px 3px 10px ${({ theme }) => theme.smallDivShadow};
  transition: margin-left 0.4s ease-out;
  @media (min-width: 800px) {
    padding: 0 5%;
  }
`;

const SideBarDiv = styled.div`
  position: fixed;
  top: 0;
  left: ${({ sideBarState }) => (!sideBarState ? '-25%' : '0')};
  height: 100%;
  width: 25%;
  padding: 1rem 1.5rem;
  background-color: ${({ theme }) => theme.mainBground};
  color: ${({ theme }) => theme.mainColor};
  overflow: auto;
  transition: left 0.4s ease-out;
  z-index: 1;
  #logo-container {
    display: flex;
    align-items: center;
    gap: 15px;
    p {
      font-size: 12px;
      color: ${({ theme }) => theme.menuGrey};
    }
  }
  nav {
    margin: 3rem 0;
    div {
      padding: 1rem 0;
    }
    .navbar-items {
      a {
        display: flex;
        align-items: center;
        gap: 15px;
        color: ${({ theme }) => theme.menuGrey};
        text-decoration: none;
        padding: 10px 0;
        padding-left: 16px;
        font-size: 18px;
        div {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 0;
        }
      }
      #nav-rooms {
        justify-content: space-between;
      }
    }
  }
`;

const BodyDiv = styled.div`
  background-color: ${({ theme }) => theme.secondBground};
  color: ${({ theme }) => theme.mainColor};
  padding: 0 5px;
  margin-left: ${({ sideBarState }) => (!sideBarState ? '0' : '25%')};
  transition: margin-left 0.4s ease-out;
  @media (min-width: 800px) {
    padding: 0 5%;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => gap};
`;

export const Layout = ({ children, authProp, themeProp }) => {
  const navigate = useNavigate();
  const [sideBarState, setSideBarState] = useState(false);

  const [auth, authHandler] = authProp;
  const [lightTheme, switchThemeHandler] = themeProp;

  const activeNavPage = {
    color: '#E23428',
    borderRadius: '6px',
    borderLeft: '8px solid #E23428',
    marginLeft: '-20px',
    paddingLeft: '28px',
    fontWeight: '700',
  };

  const logoutHandler = () => {
    authHandler(false);
    navigate('/login', { replace: true });
  };

  const sideBarHandler = () => {
    setSideBarState((prevState) => !prevState);
  };

  return (
    <>
      <SideBarDiv sideBarState={sideBarState}>
        <div id='logo-container'>
          <Hotel height='45px' />
          <div>
            <h3>travl</h3>
            <p>Hotel Admin Dashboard</p>
          </div>
        </div>
        <nav>
          <div className='navbar-items'>
            <NavLink
              to='/'
              style={({ isActive }) => (isActive ? activeNavPage : undefined)}
            >
              <Dashboard height='25px' width='25px' />
              Dashboard
            </NavLink>
          </div>
          <div className='navbar-items'>
            <NavLink
              to='/rooms'
              style={({ isActive }) => (isActive ? activeNavPage : undefined)}
              id='nav-rooms'
            >
              <div>
                <Key height='25px' width='25px' />
                Rooms
              </div>
              <BottomArrow width='25px' height='25px' />
            </NavLink>
          </div>
          <div className='navbar-items'>
            <NavLink
              to='/bookings'
              style={({ isActive }) => (isActive ? activeNavPage : undefined)}
              end
            >
              <Calendar height='25px' width='25px' />
              Bookings
            </NavLink>
          </div>
          <div className='navbar-items'>
            <NavLink
              to='/contact'
              style={({ isActive }) => (isActive ? activeNavPage : undefined)}
              end
            >
              <Mail width='25px' />
              Contact
            </NavLink>
          </div>
          <div className='navbar-items'>
            <NavLink
              to='/users'
              style={({ isActive }) => (isActive ? activeNavPage : undefined)}
              end
            >
              <Users height='25px' width='25px' />
              Users
            </NavLink>
          </div>
        </nav>
      </SideBarDiv>
      <HeaderDiv height='90px' sideBarState={sideBarState}>
        <FlexDiv gap='20px'>
          {!sideBarState ? (
            <RightArrow
              style={{ cursor: 'pointer' }}
              width='25px'
              onClick={sideBarHandler}
            />
          ) : (
            <LeftArrow
              style={{ cursor: 'pointer' }}
              width='25px'
              onClick={sideBarHandler}
            />
          )}
          <h3 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            Dashboard
          </h3>
        </FlexDiv>
        <FlexDiv gap='30px'>
          <Mail
            height='25px'
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/contact')}
          />
          <Bell
            height='25px'
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/bookings')}
          />
          {auth ? (
            <Logout
              height='25px'
              onClick={logoutHandler}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <Login
              height='25px'
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            />
          )}
          <FlexDiv
            style={{
              cursor: 'pointer',
              marginLeft: '35px',
              flexDirection: 'column',
            }}
            onClick={switchThemeHandler}
          >
            <p style={{ fontSize: '14px' }}>Theme</p>
            {lightTheme ? <Moon height='25px' /> : <Sun height='25px' />}
          </FlexDiv>
        </FlexDiv>
      </HeaderDiv>
      <BodyDiv sideBarState={sideBarState}>{children}</BodyDiv>
    </>
  );
};
