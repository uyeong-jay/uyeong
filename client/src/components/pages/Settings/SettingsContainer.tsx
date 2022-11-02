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

  const onChangeAvatar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        console.log(file.type);

        //파일 크기 에러
        if (file.size > 1024 * 1024) {
          console.log('사이즈 에러');
          return;
        }

        //파일 확장자 에러
        if (
          file.type !== 'image/jpg' &&
          file.type !== 'image/jpeg' &&
          file.type !== 'image/png' &&
          file.type !== 'image/gif'
        ) {
          console.log('확장자 에러');
          return;
        }

        setUserUpdateInfo({ ...userUpdateInfo, avatar: file });
      }
    },
    [userUpdateInfo],
  );

  return (
    <SettingsPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      onChangeAvatar={onChangeAvatar}
      userUpdateInfo={userUpdateInfo}
      userData={userData}
    />
  );
};

export default SettingsContainer;
