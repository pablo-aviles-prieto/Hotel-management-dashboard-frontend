import { useState } from 'react';

const Login = ({ onSubmit, auth }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (usernameInput.trim() === 'test' && passwordInput.trim() === 'test123') {
      onSubmit(true);
    } else {
      alert('Invalid username and password');
    }
  };

  return (
    <>
      <h1>Login page</h1>
      {!auth ? (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              placeholder='test'
              value={usernameInput}
              id='username'
              type='text'
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              placeholder='test123'
              value={passwordInput}
              id='password'
              type='password'
              onChange={(e) => setPasswordInput(e.target.value)}
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
