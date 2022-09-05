import React, { ChangeEvent, FormEvent, useState } from 'react';
import JoinPresenter from './JoinPresenter';
import { useAppDispatch } from '@app/hooks';
import { fetchUserJoin } from './joinSlice';

const JoinContainer = () => {
  const initialState = { nickName: '', email: '', password: '', cf_password: '' };
  const [userJoinInfo, setUserJoinInfo] = useState(initialState);
  const { nickName, email, password, cf_password } = userJoinInfo;

  const dispatch = useAppDispatch();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserJoinInfo({ ...userJoinInfo, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(fetchUserJoin(userJoinInfo));
  };

  return (
    <>
      <JoinPresenter
        onSubmit={onSubmit}
        onChangeInput={onChangeInput}
        nickName={nickName}
        email={email}
        password={password}
        cf_password={cf_password}
      />
    </>
  );
};

export default JoinContainer;
