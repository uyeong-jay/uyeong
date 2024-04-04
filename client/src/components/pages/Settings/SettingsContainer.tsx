import React, { useState, useCallback, ChangeEvent, FormEvent, useEffect } from 'react';
import SettingsPresenter from './SettingsPresenter';
import { useGetUserDataQuery, useUpdateMutation } from '@app/services/user/userApi';
import validUserInfo from '@utils/valid/validUserInfo';
import getUploadImageUrl from '@utils/uploadImage';
import validFile from '@utils/valid/validFile';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fileStatus, setFileModified, setFileRemoved, setFileUnchanged } from '@pages/Write/WriteSlice';

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
  const [update, { isLoading: isUpdatingUserData, isSuccess: userUpdateSuccess, error: UserUpdateErr }] =
    useUpdateMutation();

  const initialState = {
    avatar: userData?.user?.avatar ?? '',
    email: userData?.user?.email,
    nickname: userData?.user?.nickname,
    old_password: '',
    new_password: '',
    cf_new_password: '',
  };
  const [userUpdateInfo, setUserUpdateInfo] = useState<IUserUpdateInfo>(initialState);
  const [settingErrMsg, setSettingErrMsg] = useState('');
  const [isUpdatingUserInfo, setUpdatingUserInfo] = useState(false);

  const dispatch = useAppDispatch();
  const fileState = useAppSelector((state) => state.write.fileState);
  const { unchanged, modified, removed } = fileStatus;

  const [fileObj, setFileObj] = useState<File>(); //obj: 클라우드에 없는 새로운 이미지
  const [fileUrl, setFileUrl] = useState(''); //url: 클라우드에 이미 존재하는 이미지

  const [isModalOpen, setModalOpen] = useState(false);
  const [isToggled, setToggled] = useState(false);
  const [isClickedUpload, setClickedUpload] = useState(false);

  useEffect(() => {
    if (!isUpdatingUserData) setUpdatingUserInfo(false);
  }, [isUpdatingUserData]);

  useEffect(() => {
    //settings page 언마운트시 실행
    return () => {
      dispatch(setFileUnchanged());
    };
  }, [dispatch]);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      //valid를 한번만 실행하기 위해 만든 배열
      const errMsg = [];

      const isUnchangedAvatar = ((fileObj || fileUrl) && fileState === removed) || fileState === unchanged;

      //form에러
      errMsg.push(validUserInfo(userUpdateInfo, userData?.user, isUnchangedAvatar));

      //에러 보여주기
      setSettingErrMsg(errMsg[0]);

      // 에러가 없으면 유저 데이터 업데이트
      if (!errMsg[0]) {
        setUpdatingUserInfo(true);

        const data = {
          userUpdateInfo: {
            ...userUpdateInfo,
            avatar:
              fileState === unchanged
                ? userUpdateInfo.avatar
                : fileState === modified
                ? await getUploadImageUrl(userUpdateInfo.avatar as File)
                : '',
          },
          token: userData?.access_token,
        };

        //유저 데이터 업데이트
        await update(data);

        // 유저 데이터 초기화 (nickname, avatar, email 제외)
        setUserUpdateInfo({
          ...userUpdateInfo,
          old_password: '',
          new_password: '',
          cf_new_password: '',
        });

        // if (!(fileObj || fileUrl)) {
        //   setFileObj(undefined);
        //   setToggled(false);
        // }

        dispatch(setFileUnchanged());
        setClickedUpload(false);
        setModalOpen(true);
      }
    },
    [
      dispatch,
      fileObj,
      fileState,
      fileUrl,
      modified,
      removed,
      unchanged,
      update,
      userData?.access_token,
      userData?.user,
      userUpdateInfo,
    ],
  );

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setUserUpdateInfo({ ...userUpdateInfo, [name]: value });
    },
    [userUpdateInfo],
  );

  const onClickUpload = useCallback(() => {
    setClickedUpload(true);
  }, []);

  const onChangeAvatar = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      //valid를 한번만 실행하기 위해 만든 배열
      const errMsg = [];

      //file 에러
      errMsg.push(validFile(file));

      //파일을 선택 안했을때는 alert 되지 않도록 따로 빼서 작성
      if (errMsg[0]) alert(errMsg[0]);

      //에러가 없으면 avatar 업데이트
      if (!errMsg[0] && file) {
        setFileObj(file);
        dispatch(setFileModified());
        setToggled(false);

        // 이미지를 넣을때마다 cloud에 올리는게 아닌 잠시 file을 보관해두기
        setUserUpdateInfo({ ...userUpdateInfo, avatar: file });
      }
    },
    [dispatch, userUpdateInfo],
  );

  const onClickDeleteImg = useCallback(() => {
    if (fileObj) setFileObj(undefined);
    if (!fileObj) setFileUrl('');
    dispatch(setFileRemoved());
    setToggled(true);
  }, [dispatch, fileObj]);

  const onClickRestoreImg = useCallback(() => {
    if (typeof userUpdateInfo.avatar === 'object') {
      setFileObj(userUpdateInfo.avatar);
      if (isClickedUpload) {
        dispatch(setFileModified()); //새로운 이미지(obj)일 경우만 클라우드에 업로드
      }
    }
    if (typeof userUpdateInfo.avatar === 'string') {
      setFileUrl(userUpdateInfo.avatar);
      dispatch(setFileUnchanged());
    }
    setToggled(false);
  }, [dispatch, isClickedUpload, userUpdateInfo.avatar]);

  return (
    <SettingsPresenter
      userUpdateInfo={userUpdateInfo}
      userData={userData}
      fileObj={fileObj}
      fileUrl={fileUrl}
      setFileUrl={setFileUrl}
      isUpdatingUserData={isUpdatingUserData}
      isUpdatingUserInfo={isUpdatingUserInfo}
      userUpdateSuccess={userUpdateSuccess}
      settingErrMsg={settingErrMsg}
      UserUpdateErr={UserUpdateErr}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      onSubmit={onSubmit}
      onClickUpload={onClickUpload}
      onChangeInput={onChangeInput}
      onChangeAvatar={onChangeAvatar}
      onClickDeleteImg={onClickDeleteImg}
      onClickRestoreImg={onClickRestoreImg}
      isToggled={isToggled}
    />
  );
};

export default SettingsContainer;
