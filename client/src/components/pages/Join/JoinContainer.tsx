import React, { ChangeEvent, FormEvent, useState } from 'react';
import JoinPresenter from './JoinPresenter';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { fetchUserJoin } from './joinSlice';

const JoinContainer = () => {
  const initialState = { nickname: '', email: '', password: '', cf_password: '' };
  const [userJoinInfo, setUserJoinInfo] = useState(initialState);
  const { nickname, email, password, cf_password } = userJoinInfo;

  const user = useAppSelector((state) => state.join);

  const dispatch = useAppDispatch();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserJoinInfo({ ...userJoinInfo, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userJoinInfo);
    dispatch(fetchUserJoin(userJoinInfo));
  };

  return (
    <JoinPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      nickname={nickname}
      email={email}
      password={password}
      cf_password={cf_password}
      user={user}
    />
  );
};

export default JoinContainer;
