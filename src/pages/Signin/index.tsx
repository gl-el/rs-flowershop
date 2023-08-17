import React, { useState } from 'react';
import s from './Singin.module.scss';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ThemeProvider } from '@mui/material/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, useForm, UseFormProps } from 'react-hook-form';

import RootLayout from '../../layouts/index';
import { Typography } from '../../components/UI/Typography';
import FormTheme from '../../themes/FormTheme';
import { validateEmail } from '../../utils/validators';
import { CustomerData } from '../../types/types';
import EmailInput from '../../components/UI/FormFields/EmailInput';
import PasswordInput from '../../components/UI/FormFields/PasswordInput';
import FirstNameInput from '../../components/UI/FormFields/FirstNameInput';
import LastNameInput from '../../components/UI/FormFields/LastNameInput';
import BirthDateInput from '../../components/UI/FormFields/BirthDateInput';

const Signin: React.FC = () => {
  const [emailError, setEmailError] = useState('');

  const currentDate = new Date();
  const thirteenYearsAgo2 = new Date(
    currentDate.getFullYear() - 13,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const minDate = new Date(1900, 1, 1);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email (e.g., example@example.com)')
      .test('custom-email-validation', `${emailError}`, (value) => {
        return validateEmail(value as string, setEmailError);
      })
      .matches(/^\S[^]*\S$/, 'Email should not contain spaces at the beginning or end'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (e.g., [A-Z])')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter (e.g., [a-z])')
      .matches(/[0-9]/, 'Password must contain at least one digit (e.g., [0-9])')
      .matches(
        /[!@#$%^&*]/,
        'Password must contain at least one special character (e.g., !@#$%^&*)'
      )
      .matches(/^\S*$/, 'Password cannot contain spaces'),
    firstName: yup
      .string()
      .required('First name is required')
      .matches(
        /^[^0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/`|]*$/,
        'First name cannot contain special characters or numbers.'
      )
      .matches(/^[a-zA-Z]+$/, 'First name must contain at least one character (e.g., a-z,A-Z)'),
    lastName: yup
      .string()
      .required('Last name is required')
      .matches(
        /^[^0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/`|]*$/,
        'Last name cannot contain special characters or numbers.'
      )
      .matches(/^[a-zA-Z]+$/, 'Last name must contain at least one character (e.g., a-z,A-Z)'),
    birthDate: yup
      .date()
      .max(thirteenYearsAgo2)
      .min(minDate)
      .typeError('Please enter a valid date')
      .required('Date is required'),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerData>({
    resolver: yupResolver(schema) as Resolver<CustomerData>,
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: null,
    },
    mode: 'onChange',
  } as UseFormProps<CustomerData>);

  const onSubmit = (data: CustomerData) => {
    console.log(data);
  };

  return (
    <RootLayout>
      <div className={s.main}>
        <div className={clsx(s.elements__flow, s.signin__header, s.signin__header_flow)}>
          <div className={clsx(s.form__element, s.signin__header_element, s.header__img)}></div>
          <div className={clsx(s.form__element, s.signin__header_element, s.header__message)}>
            <div className={s.header__message_container}>
              <Typography variant="h2" className={s.welcome}>
                Welcome! Create
                <br /> your account now
              </Typography>
              <span className={s.login__text}>
                Already have an account?
                <Link to="/login" className={s.login__link}>
                  <button className={s.login__btn}>LOG IN</button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ThemeProvider theme={FormTheme}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={clsx(s.elements__flow)}>
            <div className={clsx(s.form__element, s.form__element_left)}>
              <Typography variant="h2" className={s.form__title_size}>
                1. Account Info
              </Typography>
            </div>
            <div className={clsx(s.form__element, s.form__element_right, s.form__element_flow)}>
              <EmailInput register={register} errors={errors} />
              <PasswordInput register={register} errors={errors} />
            </div>
          </div>
          <div className={clsx(s.elements__flow)}>
            <div className={clsx(s.form__element, s.form__element_left)}>
              <Typography variant="h2" className={s.form__title_size}>
                2. User Info
              </Typography>
            </div>
            <div className={clsx(s.form__element, s.form__element_right, s.form__element_flow)}>
              <FirstNameInput register={register} errors={errors} />
              <LastNameInput register={register} errors={errors} />
              <BirthDateInput register={register} errors={errors} control={control} reset={reset} />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </ThemeProvider>
    </RootLayout>
  );
};
export default Signin;