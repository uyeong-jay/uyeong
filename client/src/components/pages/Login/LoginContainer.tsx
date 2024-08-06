import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginPresenter from './LoginPresenter';
import { useGetUserDataQuery, useLoginMutation } from '@app/services/user/userApi';

const LoginContainer = () => {
  const initialState = { email: '', password: '' };
  const [userLoginInfo, setUserLoginInfo] = useState(initialState);

  const { data: userData } = useGetUserDataQuery();
  const [login, { isSuccess: isLoginSuccess, isLoading: isLoggingIn, isError: isLoginError, error: loginError }] =
    useLoginMutation();
  const [isLoggingInFirst, setLoggingInFirst] = useState(false);

  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);

  //modal로 인해 error만 따로 빼두기
  useEffect(() => {
    if (isLoginError) {
      setModalOpen(true);
      setLoggingInFirst(false);
    }
  }, [isLoginError]);

  useEffect(() => {
    if (isLoginSuccess) router.replace('/');
  }, [isLoginSuccess, router]);

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

      setLoggingInFirst(true); //에러가 났을 경우를 제외하면 false로 바꿀 필요x

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
      isLoginSuccess={isLoginSuccess}
      isLoggingIn={isLoggingIn}
      isLoggingInFirst={isLoggingInFirst}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      isLoginError={isLoginError}
      loginError={loginError}
    />
  );
};

export default LoginContainer;
