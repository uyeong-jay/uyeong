import React, { ChangeEvent, FormEvent, useState } from 'react';
import LoginPresenter from './LoginPresenter';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { fetchUserLogin } from './loginSlice';

const LoginContainer = () => {
  const initialState = { email: '', password: '' };
  const [userLoginInfo, setUserLoginInfo] = useState(initialState);
  const { email, password } = userLoginInfo;

  const user = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLoginInfo({ ...userLoginInfo, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //유저 데이터(아이디, 비번) 전달
    dispatch(fetchUserLogin(userLoginInfo));
  };

  return (
    <LoginPresenter onSubmit={onSubmit} onChangeInput={onChangeInput} email={email} password={password} user={user} />
  );
};

export default LoginContainer;
