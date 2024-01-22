import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import JoinPresenter from './JoinPresenter';
import { useGetUserDataQuery, useJoinMutation } from '@app/services/user/userApi';

const JoinContainer = () => {
  const initialState = { nickname: '', email: '', password: '', cf_password: '' };
  const [userJoinInfo, setUserJoinInfo] = useState(initialState);

  const { data: userData } = useGetUserDataQuery();
  const [join, { isSuccess, isLoading, isError: isJoinError, error }] = useJoinMutation();
  const [isModalOpen, setModalOpen] = useState(false);

  //modal로 인해 error만 따로 빼두기
  useEffect(() => {
    if (isJoinError) {
      setModalOpen(true);
    }
  }, [isJoinError]);

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
      if (isModalOpen) return;

      join(userJoinInfo);
    },
    [isModalOpen, join, userJoinInfo],
  );

  return (
    <JoinPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      userJoinInfo={userJoinInfo}
      userData={userData}
      isSuccess={isSuccess}
      isLoading={isLoading}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      isJoinError={isJoinError}
      error={error}
    />
  );
};

export default JoinContainer;
