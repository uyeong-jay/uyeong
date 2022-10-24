import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import LoginPresenter from './LoginPresenter';
import { useLoginMutation } from '@app/services/api';

const LoginContainer = () => {
  const initialState = { email: '', password: '' };
  const [userLoginInfo, setUserLoginInfo] = useState(initialState);
  const { email, password } = userLoginInfo;

  const [login, { isLoading, error }] = useLoginMutation();

  const router = useRouter();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLoginInfo({ ...userLoginInfo, [name]: value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //유저 데이터(아이디, 비번) 전달
    await login(userLoginInfo);
    router.replace('/');
    //router.push > window.history에 push에 넣은 새로운 url 기록을 추가
    //router.replace > 현 페이지를 repalce에 넣은 url로 대체
    //(로그인시 자주 사용)
  };

  return (
    <LoginPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      email={email}
      password={password}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default LoginContainer;
