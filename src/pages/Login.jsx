import { useRef } from 'react';

const Login = ({ onSubmit, auth }) => {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      usernameInput.current.value.trim() === 'test' &&
      passwordInput.current.value.trim() === 'test123'
    ) {
      onSubmit(true);
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
              ref={usernameInput}
              id='username'
              type='text'
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              placeholder='test123'
              ref={passwordInput}
              id='password'
              type='password'
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
