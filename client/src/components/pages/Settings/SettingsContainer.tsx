import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import SettingsPresenter from './SettingsPresenter';
import { useGetUserDataQuery } from '@app/services/api';

interface IUserUpdateInfo {
  avatar: string | File;
  nickname: string;
  password: string;
  cf_password: string;
}

const SettingsContainer = () => {
  const initialState = { avatar: '', nickname: '', password: '', cf_password: '' };
  const [userUpdateInfo, setUserUpdateInfo] = useState<IUserUpdateInfo>(initialState);

  const { data: userData } = useGetUserDataQuery();

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

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // console.log(files);

    if (files) {
      const file = files[0];
      setUserUpdateInfo({ ...userUpdateInfo, avatar: file });
    }
  };

  return (
    <SettingsPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      onChangeFile={onChangeFile}
      userUpdateInfo={userUpdateInfo}
      userData={userData}
    />
  );
};

export default SettingsContainer;
