import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginPresenter from './LoginPresenter';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { fetchUserLogin } from './loginSlice';

const LoginContainer = () => {
  const initialState = { email: '', password: '' };
  const [userLoginInfo, setUserLoginInfo] = useState(initialState);
  const { email, password } = userLoginInfo;

  const router = useRouter();

  const loginState = useAppSelector((state) => state.login);
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

  //login 성공시
  useEffect(() => {
    if (loginState.user) router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState.user]);

  return (
    <LoginPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      email={email}
      password={password}
      loginState={loginState}
    />
  );
};

export default LoginContainer;
