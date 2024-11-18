import React, { useState, useCallback, ChangeEvent, FormEvent, useEffect } from 'react';
import SettingsPresenter from './SettingsPresenter';
import { useGetUserDataQuery, useUpdateMutation } from '@app/services/user/userApi';
import { validUserUpdateInfo } from '@utils/valid/validUserInfo';
import { deleteImage, getPublicIdFromUrl, uploadImage } from '@utils/imageUtils';
import validFile from '@utils/valid/validFile';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fileStatus, setFileModified, setFileRemoved, setFileUnchanged } from '@pages/Write/WriteSlice';
import { useRouter } from 'next/router';
import { CloudinaryTypes } from '@src/pages/settings';

export interface IUserUpdateInfo {
  avatar?: string | File;
  nickname?: string;
  email?: string;
  old_password: string;
  new_password: string;
  cf_new_password: string;
}

interface Props {
  cloudinaryConfig: CloudinaryTypes;
}

const SettingsContainer = ({ cloudinaryConfig }: Props) => {
  const { data: userData } = useGetUserDataQuery();
  const [update, { isLoading: isUpdatingUserData, isSuccess: isUserDataUpdated, error: UserUpdateErr }] =
    useUpdateMutation();
  const router = useRouter();

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

  const [isClickedUpload, setClickedUpload] = useState(false);
  const [imageId, setImageId] = useState('');
  const [isImageUploaded, setImageUploaded] = useState(false);
  const [prevAvatarImage, setPrevAvatarImage] = useState('');

  const [isModalOpen, setModalOpen] = useState(false);
  const [isToggled, setToggled] = useState(false);

  useEffect(() => {
    if (!userData?.user) router.replace('/');
  }, [router, userData?.user]);

  //로딩 종료
  useEffect(() => {
    if (!isUpdatingUserData) setUpdatingUserInfo(false);
  }, [isUpdatingUserData]);

  useEffect(() => {
    //settings page 언마운트시 실행
    return () => {
      dispatch(setFileUnchanged());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isUserDataUpdated) {
      dispatch(setFileUnchanged());
    }
  }, [dispatch, isUserDataUpdated]);

  //유저 업데이트 성공시 이전 업로드된 이미지 삭제
  useEffect(() => {
    if (isUserDataUpdated && prevAvatarImage && userData?.user?.avatar !== prevAvatarImage) {
      const publicId = getPublicIdFromUrl(prevAvatarImage);
      if (publicId) deleteImage(publicId, cloudinaryConfig);
      setPrevAvatarImage('');
    }
  }, [cloudinaryConfig, prevAvatarImage, userData?.user?.avatar, isUserDataUpdated]);

  //유저 업데이트 실패시 업로드된 이미지 삭제
  useEffect(() => {
    if (UserUpdateErr && isImageUploaded) {
      deleteImage(imageId, cloudinaryConfig);
      setImageId('');
      setImageUploaded(false);
    }
  }, [cloudinaryConfig, UserUpdateErr, imageId, isImageUploaded]);

  //이미지 구분하여 임시 저장
  useEffect(() => {
    const userAvatar = userUpdateInfo.avatar;

    if (fileObj) {
      return setFileUrl(URL.createObjectURL(fileObj));
    } else if (!fileObj && userAvatar && typeof userAvatar === 'string') {
      return setFileUrl(userAvatar as string);
    } else {
      setFileUrl('');
    }
  }, [fileObj, setFileUrl, userUpdateInfo.avatar]);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      //valid를 한번만 실행하기 위해 만든 배열
      const errMsg = [];

      const isUnchangedAvatar = ((fileObj || fileUrl) && fileState === removed) || fileState === unchanged;

      //form에러
      errMsg.push(validUserUpdateInfo(userUpdateInfo, userData?.user, isUnchangedAvatar));

      //에러 보여주기
      setSettingErrMsg(errMsg[0]);

      // 에러가 없으면 유저 데이터 업데이트
      if (!errMsg[0]) {
        setUpdatingUserInfo(true);
        setPrevAvatarImage(userData?.user?.avatar ?? '');

        const data = {
          userUpdateInfo: {
            ...userUpdateInfo,
          },
          token: userData?.access_token,
        };

        if (fileState === unchanged) {
          data.userUpdateInfo.avatar = userUpdateInfo.avatar;
        } else if (fileState === modified) {
          const uploadedImageData = await uploadImage(userUpdateInfo.avatar as File, cloudinaryConfig);
          data.userUpdateInfo.avatar = uploadedImageData?.url;
          setImageId(uploadedImageData?.id);
          setImageUploaded(true);
        } else {
          data.userUpdateInfo.avatar = '';
        }

        await update(data);

        // 유저 데이터 초기화
        setUserUpdateInfo({
          ...userUpdateInfo,
          avatar: !(fileObj || fileUrl) ? '' : userUpdateInfo.avatar,
          old_password: '',
          new_password: '',
          cf_new_password: '',
        });

        if (!(fileObj || fileUrl)) {
          setFileObj(undefined);
          setToggled(false);
        }

        setClickedUpload(false);
        setModalOpen(true);
      }
    },
    [
      cloudinaryConfig,
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
    ]
  );

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setUserUpdateInfo({ ...userUpdateInfo, [name]: value });
    },
    [userUpdateInfo]
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

        // 이미지를 넣을때마다 cloud에 올리는게 아닌 잠시 file을 보관
        setUserUpdateInfo({ ...userUpdateInfo, avatar: file });
      }
    },
    [dispatch, userUpdateInfo]
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
      isUpdatingUserData={isUpdatingUserData}
      isUpdatingUserInfo={isUpdatingUserInfo}
      isUserDataUpdated={isUserDataUpdated}
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
