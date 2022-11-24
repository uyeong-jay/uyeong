import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import SettingsPresenter from './SettingsPresenter';
import { useGetUserDataQuery, useUpdateMutation } from '@app/services/userApi';
import valid from '@utils/valid';
import { getUploadImageUrl } from '@utils/uploadImage';

export interface IUserUpdateInfo {
  avatar: string | File | undefined;
  nickname: string | undefined;
  email: string | undefined;
  old_password: string;
  new_password: string;
  cf_new_password: string;
}

const SettingsContainer = () => {
  const { data: userData } = useGetUserDataQuery();
  const [update, { isLoading: userUpdateLoading, error: authErr }] = useUpdateMutation();

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
      errMsg.push(valid(userUpdateInfo, userData?.user));
      //토큰 만료 에러 만들기

      setSettingErrMsg(errMsg[0]);

      //에러 없으면 유저 데이터 업데이트
      if (!errMsg[0]) {
        // 데이터: {유저데이터, access토큰}
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

      //파일 체크 util 만들기
      if (file) {
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

        // URL.revokeObjectURL() 정상 실행을 위해 추가한 코드
        setFileObj(file);
        //아무런 변경이 없을때 valid 에러내기 위해 추가한 코드
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
      fileObj={fileObj}
      userUpdateLoading={userUpdateLoading}
      settingErrMsg={settingErrMsg}
      authErr={authErr}
    />
  );
};

export default SettingsContainer;
