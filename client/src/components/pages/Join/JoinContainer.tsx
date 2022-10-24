import React, { ChangeEvent, FormEvent, useState } from 'react';
import JoinPresenter from './JoinPresenter';
import { useJoinMutation } from '@app/services/api';

const JoinContainer = () => {
  const initialState = { nickname: '', email: '', password: '', cf_password: '' };
  const [userJoinInfo, setUserJoinInfo] = useState(initialState);
  const { nickname, email, password, cf_password } = userJoinInfo;

  const [join, { isSuccess, isLoading, error }] = useJoinMutation();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserJoinInfo({ ...userJoinInfo, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    join(userJoinInfo);
  };

  return (
    <JoinPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      nickname={nickname}
      email={email}
      password={password}
      cf_password={cf_password}
      isSuccess={isSuccess}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default JoinContainer;
