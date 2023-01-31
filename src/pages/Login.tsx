import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MainCard,
  ButtonGreen,
  ImgHolder,
  StyledForm,
  StyledLabel,
  InputText,
  InputContainer,
} from '../components/Styles';
import { AuthContext } from '../store/authContext';
import { toast } from 'react-toastify';
import styled from 'styled-components';

interface IDataFetch {
  email: string;
  password: string;
}

const Container = styled.div`
  display: flex;
  h1 {
    text-align: center;
  }
  .side-container {
    width: 50%;
    min-height: 550px;
    max-height: 650px;
  }
  .left-container {
    display: flex;
    align-items: center;
  }
  .form-container {
    margin: 0 auto;
    width: 295px;
  }
`;

const API_URI = process.env.REACT_APP_API_URI;

const Login: React.FC<{ lightTheme: boolean }> = ({ lightTheme }) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const { authStatus, loginHandler, logoutHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await sendLogin({
      email: emailInput,
      password: passwordInput,
    });

    if (!res.ok) return toast.error('Check username and/or password');

    const parsedRes = await res.json();

    loginHandler({
      id: parsedRes.user.id,
      email: emailInput,
      name: parsedRes.user.name,
      token: parsedRes.token,
      photo: parsedRes.user.photo,
      theme: lightTheme ? 'light' : 'dark',
    });
    toast(`🤗 Welcome back ${parsedRes.user.name} 🤗`, {
      autoClose: 3000,
      hideProgressBar: true,
    });
    navigate('/', { replace: true });
  };

  const sendLogin = async ({
    email,
    password,
  }: IDataFetch): Promise<Response> => {
    return fetch(`${API_URI}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  };

  return (
    <div>
      {!authStatus.authed ? (
        <Container>
          <MainCard
            borderRadius='16px 0 0 16px'
            className='side-container left-container'
          >
            <div className='form-container'>
              <h1>Login</h1>
              <StyledForm onSubmit={submitHandler}>
                <InputContainer>
                  <StyledLabel htmlFor='username'>Username</StyledLabel>
                  <InputText
                    borderRadius='4px'
                    padding='5px'
                    name='username'
                    placeholder='hotel@miranda.com'
                    value={emailInput}
                    id='username'
                    type='text'
                    width='100%'
                    onChange={(e) => setEmailInput(e.target.value)}
                    autoComplete='username'
                  />
                </InputContainer>
                <InputContainer style={{ marginBottom: '25px' }}>
                  <StyledLabel htmlFor='password'>Password</StyledLabel>
                  <InputText
                    borderRadius='4px'
                    padding='5px'
                    name='password'
                    placeholder='test123'
                    value={passwordInput}
                    id='password'
                    type='password'
                    width='100%'
                    onChange={(e) => setPasswordInput(e.target.value)}
                    autoComplete='current-password'
                  />
                </InputContainer>
                <InputContainer>
                  <ButtonGreen
                    style={{ width: '100%' }}
                    padding='10px 68px'
                    type='submit'
                  >
                    Log in
                  </ButtonGreen>
                </InputContainer>
              </StyledForm>
            </div>
          </MainCard>
          <div className='side-container'>
            <ImgHolder
              style={{ borderRadius: '0 16px 16px 0' }}
              height='100%'
              width='auto'
            >
              <img
                src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/d8/e7/35/facade.jpg?w=700'
                alt='Hotel view'
              />
            </ImgHolder>
          </div>
        </Container>
      ) : (
        <>
          <h1>Welcome again!</h1>
          <div style={{ marginTop: '20px' }}>
            <ButtonGreen padding='10px 40px' onClick={() => logoutHandler()}>
              Log out
            </ButtonGreen>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
