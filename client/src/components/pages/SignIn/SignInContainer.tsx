import React, { useState } from 'react';
import SignInPresenter from './SignInPresenter';

const SignInContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    //로딩중 구현

    //유저 데이터(아이디, 비번) 전달
    // - apollo/client?

    //성공 or 실패 응답 받기

    //실패 표시(리턴)

    //성공 표시(리턴)
  };

  return (
    <SignInPresenter
      onSubmit={onSubmit}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      email={email}
      password={password}
    />
  );
};

export default SignInContainer;
