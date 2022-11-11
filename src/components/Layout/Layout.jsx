import { useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { MainCard, ImgHolder, ButtonSidebar } from '../Styles';
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
  UpperArrow,
} from '../../assets/icons';

const HeaderDiv = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  padding-left: ${({ sideBarState }) => (!sideBarState ? '5px' : '300px')};
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.mainBground};
  color: ${({ theme }) => theme.mainColor};
  width: 100%;
  box-shadow: 0px 3px 10px ${({ theme }) => theme.smallDivShadow};
  transition: padding-left 0.4s ease-out;
  @media (min-width: 800px) {
    padding: 0 5%;
    padding-left: ${({ sideBarState }) =>
      !sideBarState ? '3%' : 'calc(300px + 3%)'};
  }
`;

const SideBarDiv = styled.div`
  position: fixed;
  top: 0;
  left: ${({ sideBarState }) => (!sideBarState ? '-300px' : '0')};
  height: 100%;
  width: 300px;
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
      padding: 0.5rem 0;
    }
    .navbar-items {
      position: relative;
      a {
        display: flex;
        align-items: center;
        gap: 15px;
        color: ${({ theme }) => theme.menuGrey};
        text-decoration: none;
        padding: 10px 0;
        font-size: 18px;
      }
      &-dropdown {
        padding: 0;
        padding-left: 40px;
        overflow: hidden;
        height: ${({ roomDropdown }) => (!roomDropdown ? '0' : '50px')};
        transition: height 0.4s ease-out;
      }
      #arrow-container {
        cursor: pointer;
        position: absolute;
        top: 13px;
        right: 0;
      }
    }
  }
  &::-webkit-scrollbar {
    width: 0px;
    height: 0;
    background: transparent;
  }
`;

const SidebarFooter = styled.div`
  margin-top: 40px;
  h3 {
    font-size: 14px;
  }
  p {
    font-size: 12px;
    color: #799283;
  }
`;

const BodyDiv = styled.div`
  background-color: ${({ theme }) => theme.secondBground};
  color: ${({ theme }) => theme.mainColor};
  padding: 15px;
  padding-top: 105px;
  min-height: 100vh;
  margin-left: ${({ sideBarState }) => (!sideBarState ? '0' : '300px')};
  transition: margin-left 0.4s ease-out;
  @media (min-width: 800px) {
    padding: 3%;
    padding-top: calc(3% + 90px);
  }
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => gap};
`;

const activeNavPage = {
  color: '#E23428',
  borderRadius: '6px',
  borderLeft: '8px solid #E23428',
  marginLeft: '-20px',
  paddingLeft: '12px',
  fontWeight: '700',
};

const activeNavSubPage = {
  color: '#E23428',
  borderBottom: '3px solid #e234286c',
  fontWeight: '700',
};

export const Layout = ({ children, authProp, themeProp }) => {
  const [roomDropdown, setRoomDropdown] = useState(false);
  const [sideBarState, setSideBarState] = useState(false);
  const navigate = useNavigate();

  const [auth, authHandler] = authProp;
  const [lightTheme, switchThemeHandler] = themeProp;

  const logoutHandler = () => {
    authHandler(false);
    navigate('/login', { replace: true });
  };

  const sideBarHandler = () => {
    setSideBarState((prevState) => !prevState);
  };

  const toggleRoomDropdown = () => {
    setRoomDropdown((prevState) => !prevState);
  };

  const openRoomDropdown = () => {
    setRoomDropdown(true);
  };

  return (
    <>
      <SideBarDiv sideBarState={sideBarState} roomDropdown={roomDropdown}>
        <div id='logo-container'>
          <Hotel height='45px' />
          <div>
            <h3>travl</h3>
            <p>Hotel Admin Dashboard</p>
          </div>
        </div>
        <nav>
          {auth ? (
            <>
              <div className='navbar-items'>
                <NavLink
                  to='/'
                  style={({ isActive }) =>
                    isActive ? activeNavPage : undefined
                  }
                >
                  <Dashboard height='25px' width='25px' />
                  Dashboard
                </NavLink>
              </div>
              <div className='navbar-items'>
                <NavLink
                  to='/rooms'
                  style={({ isActive }) =>
                    isActive ? activeNavPage : undefined
                  }
                  onClick={openRoomDropdown}
                >
                  <Key height='25px' width='25px' />
                  Rooms
                </NavLink>
                <div id='arrow-container' onClick={toggleRoomDropdown}>
                  {!roomDropdown ? (
                    <BottomArrow width='25px' height='25px' />
                  ) : (
                    <UpperArrow width='25px' height='25px' />
                  )}
                </div>
                <div className='navbar-items-dropdown'>
                  <NavLink
                    to='/rooms/new'
                    style={({ isActive }) =>
                      isActive ? activeNavSubPage : undefined
                    }
                    id='nav-rooms'
                  >
                    New room
                  </NavLink>
                  {/* <NavLink
                to='/rooms/list'
                style={({ isActive }) =>
                  isActive ? activeNavSubPage : undefined
                }
                id='nav-rooms'
              >
                List rooms
              </NavLink> */}
                </div>
              </div>
              <div className='navbar-items'>
                <NavLink
                  to='/bookings'
                  style={({ isActive }) =>
                    isActive ? activeNavPage : undefined
                  }
                >
                  <Calendar height='25px' width='25px' />
                  Bookings
                </NavLink>
              </div>
              <div className='navbar-items'>
                <NavLink
                  to='/contact'
                  style={({ isActive }) =>
                    isActive ? activeNavPage : undefined
                  }
                >
                  <Mail width='25px' />
                  Contact
                </NavLink>
              </div>
              <div className='navbar-items'>
                <NavLink
                  to='/users'
                  style={({ isActive }) =>
                    isActive ? activeNavPage : undefined
                  }
                >
                  <Users height='25px' width='25px' />
                  Users
                </NavLink>
              </div>
            </>
          ) : (
            <div className='navbar-items'>
              <NavLink
                to='/login'
                style={({ isActive }) => (isActive ? activeNavPage : undefined)}
              >
                <Users height='25px' width='25px' />
                Log in
              </NavLink>
            </div>
          )}
        </nav>
        {auth && (
          <MainCard
            style={{
              backgroundColor: lightTheme ? '#FFFFFF' : '#292828',
              boxShadow: '0px 20px 30px #00000014',
              borderRadius: '18px',
              marginTop: '60px',
              textAlign: 'center',
            }}
          >
            <ImgHolder
              width='70px'
              height='70px'
              style={{
                margin: 'auto',
                marginTop: '-55px',
              }}
            />
            <h3
              style={{
                marginTop: '15px',
                fontWeight: '400',
              }}
            >
              William Johanson
            </h3>
            <p
              style={{
                margin: '10px 0',
                fontSize: '14px',
                color: lightTheme ? '#B2B2B2' : '#686868',
              }}
            >
              williamjohn@mail.com
            </p>
            <ButtonSidebar padding='15px 45px'>Edit</ButtonSidebar>
          </MainCard>
        )}
        <SidebarFooter>
          <h3>Hotel Admin Dashboard Demo</h3>
          <p>© 2022 Pablo Avilés</p>
        </SidebarFooter>
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
