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
