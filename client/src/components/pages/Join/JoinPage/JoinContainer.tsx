import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import JoinPresenter from './JoinPresenter';
import { useGetUserDataQuery, useJoinMutation } from '@app/services/user/userApi';
import { validUserJoinInfo } from '@utils/valid/validUserInfo';

const JoinContainer = () => {
  const initialState = { nickname: '', email: '', password: '', cf_password: '' };
  const [userJoinInfo, setUserJoinInfo] = useState(initialState);
  const [joinErrMsg, setJoinErrMsg] = useState('');

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
      console.log(isModalOpen);
      if (isModalOpen) return;

      //valid를 한번만 실행하기 위해 만든 배열
      const errMsg = [];

      //form에러
      errMsg.push(validUserJoinInfo(userJoinInfo));

      //에러 보여주기
      setJoinErrMsg(errMsg[0]);

      if (!errMsg[0]) {
        // 에러가 없으면 유저 데이터 업데이트
        join(userJoinInfo);
        setjoiningFirst(true); //에러가 났을 경우를 제외하면 false로 바꿀 필요 없음
        setJoinErrMsg('');
      } else {
        setModalOpen(true);
      }
    },
    [isModalOpen, join, userJoinInfo],
  );

  const onClickBtn = useCallback((e) => {
    e.preventDefault();

    console.log('clicked');
  }, []);

  return (
    <JoinPresenter
      onClickBtn={onClickBtn}
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
      joinErrMsg={joinErrMsg}
      error={error}
    />
  );
};

export default JoinContainer;
