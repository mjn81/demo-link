import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { FormFieldTypes, Generator } from './Generator';
import UserSvg from 'assets/icons/user.svg';
import PasswordSvg from 'assets/icons/password.svg';
import { useLoginMutation, useRegisterMutation } from 'hooks';
import { ILogin, IRegister } from 'interfaces';

const initialValues = { username: '', password: '' };

const validator = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const fields = [
  {
    fieldType: FormFieldTypes.input,
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    icon: UserSvg,
  },
  {
    fieldType: FormFieldTypes.input,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    icon: PasswordSvg,
  },
];


export const LoginForm = () => {
  const { mutate } = useLoginMutation();

  const handleSubmit = (values: ILogin) => {
    mutate(values);
  };

  return (
    <Generator
      fields={fields}
      initialValues={initialValues}
      submitBtn={'Login'}
      submit={handleSubmit}
      validator={validator}
      optionsClass="button-container"
      options={
        <Link to="/auth/register" className="btn secondary">
          Register
        </Link>
      }
    />
  );
};

export const RegisterForm = () => {
  const { mutate } = useRegisterMutation();

  const handleSubmit = (values: IRegister) => {
    mutate(values);
  };

  return (
    <Generator
      fields={fields}
      initialValues={initialValues}
      submitBtn={'Register'}
      submit={handleSubmit}
      validator={validator}
      optionsClass="button-container"
      options={
        <Link to="/auth/login" className="btn secondary">
          Back to Login
        </Link>
      }
    />
  );
};
