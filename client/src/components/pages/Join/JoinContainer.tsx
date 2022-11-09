import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import JoinPresenter from './JoinPresenter';
import { useGetUserDataQuery, useJoinMutation } from '@app/services/api';

const JoinContainer = () => {
  const initialState = { nickname: '', email: '', password: '', cf_password: '' };
  const [userJoinInfo, setUserJoinInfo] = useState(initialState);

  const { data: userData } = useGetUserDataQuery();
  const [join, { isSuccess, isLoading, error }] = useJoinMutation();

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserJoinInfo({ ...userJoinInfo, [name]: value });
    },
    [userJoinInfo],
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      join(userJoinInfo);
    },
    [join, userJoinInfo],
  );

  return (
    <JoinPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      userJoinInfo={userJoinInfo}
      userData={userData}
      isSuccess={isSuccess}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default JoinContainer;
