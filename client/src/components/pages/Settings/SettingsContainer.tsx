import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import SettingsPresenter from './SettingsPresenter';
import { useGetUserDataQuery, useUpdateMutation } from '@app/services/user/userApi';
import validUserInfo from '@utils/valid/validUserInfo';
import getUploadImageUrl from '@utils/uploadImage';
import validFile from '@utils/valid/validFile';

export interface IUserUpdateInfo {
  avatar?: string | File;
  nickname?: string;
  email?: string;
  old_password: string;
  new_password: string;
  cf_new_password: string;
}

const SettingsContainer = () => {
  const { data: userData } = useGetUserDataQuery();
  const [update, { isLoading: userUpdateLoading, isSuccess: userUpdateSuccess, error: authErr }] = useUpdateMutation();

  const initialState = {
    avatar: '',
    email: userData?.user?.email,
    nickname: userData?.user?.nickname,
    old_password: '',
    new_password: '',
    cf_new_password: '',
  };

  const [userUpdateInfo, setUserUpdateInfo] = useState<IUserUpdateInfo>(initialState);
  const [fileObj, setFileObj] = useState<File>();
  const [settingErrMsg, setSettingErrMsg] = useState('');

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      //에러 모아 놓기
      const errMsg = [];

      //form에러
      errMsg.push(validUserInfo(userUpdateInfo, userData?.user));

      //토큰 만료 에러 만들기

      //에러 보여주기
      setSettingErrMsg(errMsg[0]);

      //에러 없으면 유저 데이터 업데이트
      if (!errMsg[0]) {
        const data = {
          userUpdateInfo: {
            ...userUpdateInfo,
            avatar: userUpdateInfo.avatar && fileObj ? await getUploadImageUrl(fileObj) : userData?.user?.avatar,
          },
          token: userData?.access_token,
        };

        //유저 데이터 업데이트
        await update(data);

        // 유저 데이터 초기화 (보여지는 nickname, email 제외)
        setUserUpdateInfo({ ...userUpdateInfo, avatar: '', old_password: '', new_password: '', cf_new_password: '' });
      }
    },
    [fileObj, update, userData?.access_token, userData?.user, userUpdateInfo],
  );

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setUserUpdateInfo({ ...userUpdateInfo, [name]: value });
    },
    [userUpdateInfo],
  );

  const onChangeAvatar = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      //파일 에러
      validFile(file);

      //파일 에러
      if (file) {
        // URL.revokeObjectURL() 정상 실행을 위해 추가한 코드
        setFileObj(file);

        // 이미지를 넣을때마다 cloud에 올라가는걸 방지 하려고 잠시 file을 넣어두기
        setUserUpdateInfo({ ...userUpdateInfo, avatar: file });
      }
    },
    [userUpdateInfo],
  );

  return (
    <SettingsPresenter
      userUpdateInfo={userUpdateInfo}
      userData={userData}
      fileObj={fileObj}
      userUpdateLoading={userUpdateLoading}
      userUpdateSuccess={userUpdateSuccess}
      settingErrMsg={settingErrMsg}
      authErr={authErr}
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      onChangeAvatar={onChangeAvatar}
    />
  );
};

export default SettingsContainer;
