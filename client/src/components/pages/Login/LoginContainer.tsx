import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginPresenter from './LoginPresenter';
import { useGetUserDataQuery, useLoginMutation } from '@app/services/userApi';

const LoginContainer = () => {
  const initialState = { email: '', password: '' };
  const [userLoginInfo, setUserLoginInfo] = useState(initialState);

  const { data: userData } = useGetUserDataQuery();
  const [login, { isSuccess: loginSuccess, isLoading: loginLoading, error }] = useLoginMutation();

  const router = useRouter();

  useEffect(() => {
    if (loginSuccess) router.replace('/');
    //router.push > window.history에 push에 넣은 새로운 url 기록을 추가
    //router.replace > 현 페이지를 repalce에 넣은 url로 대체
    //(로그인시 자주 사용)
  }, [loginSuccess, router]);

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserLoginInfo({ ...userLoginInfo, [name]: value });
    },
    [userLoginInfo],
  );

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      //유저 데이터(아이디, 비번) 전달
      await login(userLoginInfo);
    },
    [login, userLoginInfo],
  );

  return (
    <LoginPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      userLoginInfo={userLoginInfo}
      userData={userData}
      loginSuccess={loginSuccess}
      loginLoading={loginLoading}
      error={error}
    />
  );
};

export default LoginContainer;
