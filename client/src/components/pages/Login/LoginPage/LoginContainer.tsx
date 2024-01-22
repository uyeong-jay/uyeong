import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginPresenter from './LoginPresenter';
import { useGetUserDataQuery, useLoginMutation } from '@app/services/user/userApi';

const LoginContainer = () => {
  const initialState = { email: '', password: '' };
  const [userLoginInfo, setUserLoginInfo] = useState(initialState);

  const { data: userData } = useGetUserDataQuery();
  const [login, { isSuccess: loginSuccess, isLoading: loginLoading, isError: isLoginError, error }] =
    useLoginMutation();

  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);

  //modal로 인해 error만 따로 빼두기
  useEffect(() => {
    if (isLoginError) {
      setModalOpen(true);
    }
  }, [isLoginError]);

  useEffect(() => {
    if (loginSuccess) router.replace('/');
    //router.push > window.history에 push()에 넣은 새로운 url 추가
    //router.replace > 현 페이지를 repalce()에 넣은 url로 대체 (로그인시 자주 사용)
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
      if (isModalOpen) return;

      await login(userLoginInfo);
    },
    [isModalOpen, login, userLoginInfo],
  );

  return (
    <LoginPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      userLoginInfo={userLoginInfo}
      userData={userData}
      loginSuccess={loginSuccess}
      loginLoading={loginLoading}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      isLoginError={isLoginError}
      error={error}
    />
  );
};

export default LoginContainer;
