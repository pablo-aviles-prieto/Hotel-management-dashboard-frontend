import {
  LeftArrow,
  RightArrow,
  Mail,
  Bell,
  Logout,
  Login,
  Sun,
  Moon,
} from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.mainBground};
  color: ${({ theme }) => theme.mainColor};
  box-shadow: 0px 3px 10px #00000005;
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

export const Header = ({ children, auth, authHandler }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    authHandler(false);
    navigate('/login', { replace: true });
  };

  return (
    <>
      <HeaderDiv height='90px'>
        <FlexDiv gap='20px'>
          <RightArrow width='25px' />
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
        </FlexDiv>
        <div>
          <p>Theme</p>
          <Sun height='15px' />
        </div>
      </HeaderDiv>
      {children}
    </>
  );
};
