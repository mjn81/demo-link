import React from 'react';

import { LoginForm } from 'components';

const Login = () => {
  
  return (
    <div className="login__container">
      <h2 className="tag-demo">Link (Demo)</h2>
      <section className="login__form">
        <h1 className="login__title">Login</h1>
        <LoginForm />
      </section>
    </div>
  );
};

export default Login;
