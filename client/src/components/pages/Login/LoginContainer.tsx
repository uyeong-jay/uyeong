import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginPresenter from './LoginPresenter';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { fetchLoginData } from '@actions/user';

const LoginContainer = () => {
  const initialState = { email: '', password: '' };
  const [userLoginInfo, setUserLoginInfo] = useState(initialState);
  const { email, password } = userLoginInfo;

  const router = useRouter();

  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLoginInfo({ ...userLoginInfo, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //유저 데이터(아이디, 비번) 전달
    dispatch(fetchLoginData(userLoginInfo));

    localStorage.setItem('login', 'user');
  };

  //login 성공시
  useEffect(() => {
    if (userState.userData) router.replace('/');
    //router.push > window.history에 push에 넣은 새로운 url 기록을 추가
    //router.replace > 현 페이지를 repalce에 넣은 url로 대체
    //(로그인시 자주 사용)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.userData]);

  return (
    <LoginPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      email={email}
      password={password}
      userState={userState}
    />
  );
};

export default LoginContainer;
