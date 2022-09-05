import React, { ChangeEvent, FormEvent, useState } from 'react';
import LoginPresenter from './LoginPresenter';
import { useAppDispatch } from '@app/hooks';
import { fetchUserLogin } from './loginSlice';

const LoginContainer = () => {
  const initialState = { email: '', password: '' };
  const [userLoginInfo, setUserLoginInfo] = useState(initialState);
  const { email, password } = userLoginInfo;

  const dispatch = useAppDispatch();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLoginInfo({ ...userLoginInfo, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(fetchUserLogin(userLoginInfo));
    //로딩중 구현

    //유저 데이터(아이디, 비번) 전달

    //성공 or 실패 응답 받기

    //실패 표시(리턴)

    //성공 표시(리턴)
  };

  return <LoginPresenter onSubmit={onSubmit} onChangeInput={onChangeInput} email={email} password={password} />;
};

export default LoginContainer;
