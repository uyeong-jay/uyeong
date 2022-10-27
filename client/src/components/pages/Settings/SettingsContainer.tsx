import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import SettingsPresenter from './SettingsPresenter';
import { useGetUserDataQuery } from '@app/services/api';

const SettingsContainer = () => {
  const initialState = { avatar: '', nickname: '', password: '', cf_password: '' };
  const [userUpdateInfo, setUserUpdateInfo] = useState(initialState);

  const { data: userData /* , isLoading, error */ } = useGetUserDataQuery();

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserUpdateInfo({ ...userUpdateInfo, [name]: value });
    },
    [userUpdateInfo],
  );

  return (
    <SettingsPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      userUpdateInfo={userUpdateInfo}
      userData={userData}
    />
  );
};

export default SettingsContainer;
