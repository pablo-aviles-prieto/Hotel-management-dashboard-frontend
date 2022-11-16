import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onSubmit, auth }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (usernameInput.trim() !== 'test' || passwordInput.trim() !== 'test123')
      return alert('Invalid username and password');

    onSubmit(true);
    setUsernameInput('');
    setPasswordInput('');
    navigate('/', { replace: true });
  };

  return (
    <>
      <h1 id='login-title'>Login page</h1>
      {!auth ? (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              name='username'
              placeholder='test'
              value={usernameInput}
              id='username'
              type='text'
              onChange={(e) => setUsernameInput(e.target.value)}
              autoComplete='username'
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
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
            <button type='submit'>Log in</button>
          </div>
        </form>
      ) : (
        <div>
          <button onClick={() => onSubmit(false)}>Log out</button>
        </div>
      )}
    </>
  );
};

export default Login;
