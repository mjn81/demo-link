import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { useRegisterMutation } from 'hooks';

const Register = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { mutate } = useRegisterMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value as string;
    const password = passwordRef.current?.value as string;
    mutate({ username, password });
  };

  return (
    <div>
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1 className="login__title">register</h1>
          <input type="text" placeholder="Enter a username" ref={usernameRef} />
          <input type="password" placeholder="Enter a password" ref={passwordRef} />
          <div className="login__container-button">
            <button type="submit" className="primary">
              Register
            </button>

            <Link to="/auth/login" className="capitalize font-bold button">
              go back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
