import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText, ButtonGreen } from '../components/Styles';
import { AuthContext } from '../store/authContext';
import { toast } from 'react-toastify';
import styled from 'styled-components';

interface IDataFetch {
  email: string;
  password: string;
}

const StyledForm = styled.form`
  div {
    margin-bottom: 10px;
  }
  label {
    display: block;
  }
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.darkGreyToLightGrey};
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
        <>
          <h1 id='login-title'>Login page</h1>
          <StyledForm onSubmit={submitHandler}>
            <div>
              <StyledLabel htmlFor='username'>Username</StyledLabel>
              <InputText
                borderRadius='4px'
                padding='5px'
                name='username'
                placeholder='hotel@miranda.com'
                value={emailInput}
                id='username'
                type='text'
                onChange={(e) => setEmailInput(e.target.value)}
                autoComplete='username'
              />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <StyledLabel htmlFor='password'>Password</StyledLabel>
              <InputText
                borderRadius='4px'
                padding='5px'
                name='password'
                placeholder='test123'
                value={passwordInput}
                id='password'
                type='password'
                onChange={(e) => setPasswordInput(e.target.value)}
                autoComplete='current-password'
              />
            </div>
            <div>
              <ButtonGreen padding='10px 68px' type='submit'>
                Log in
              </ButtonGreen>
            </div>
          </StyledForm>
        </>
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
