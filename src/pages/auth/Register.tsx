import { useRef } from 'react';

import { RegisterForm } from 'components';

const Register = () => {

  return (
    <div>
      <div className="login__container">
        <section className="login__form">
          <h1 className="login__title">register</h1>
          <RegisterForm />
        </section>
      </div>
    </div>
  );
};

export default Register;
