import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText, ButtonGreen } from '../components/Styles';
import { AuthContext } from '../store/auth-context';
import styled from 'styled-components';

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

const Login = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const { authStatus, loginHandler, logoutHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      usernameInput.trim() !== 'test@test.com' ||
      passwordInput.trim() !== 'test123'
    )
      return alert('Invalid username and password');

    loginHandler({ email: usernameInput, name: 'test name' });
    setUsernameInput('');
    setPasswordInput('');
    navigate('/', { replace: true });
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
                placeholder='test@test.com'
                value={usernameInput}
                id='username'
                type='text'
                onChange={(e) => setUsernameInput(e.target.value)}
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
