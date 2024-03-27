import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import JoinPresenter from './JoinPresenter';
import { useGetUserDataQuery, useJoinMutation } from '@app/services/user/userApi';

const JoinContainer = () => {
  const initialState = { nickname: '', email: '', password: '', cf_password: '' };
  const [userJoinInfo, setUserJoinInfo] = useState(initialState);

  const { data: userData } = useGetUserDataQuery();
  const [join, { isSuccess: joinSuccess, isLoading: isjoining, isError: isJoinError, error }] = useJoinMutation();
  const [isjoiningFirst, setjoiningFirst] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  //modal로 인해 error만 따로 빼두기
  useEffect(() => {
    if (isJoinError) {
      setModalOpen(true);
      setjoiningFirst(false);
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

      setjoiningFirst(true); //에러가 났을 경우를 제외하면 false로 바꿀 필요 없음

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
      joinSuccess={joinSuccess}
      isjoining={isjoining}
      isjoiningFirst={isjoiningFirst}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      isJoinError={isJoinError}
      error={error}
    />
  );
};

export default JoinContainer;
