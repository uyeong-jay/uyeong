import React, { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';
import { DIV, FORM } from './SettingsStyle';
import Button from '@atoms/Button';
import InputBox from '@molecules/InputBox';
import Image from 'next/image';
import { UserResponse } from '@app/services/user/userApi';
import { IUserUpdateInfo } from './SettingsContainer';
import CameraIcon from '@icons/CameraIcon';
import PageTitle from '@atoms/PageTitle';
import FormButton from '@molecules/FormButton';
import PageFrame from '@templates/PageFrame';
import Modal from '@modals/Modal';
import XMarkIcon from '@icons/XMarkIcon';
import UserIcon from '@icons/UserIcon';
import RotateIcon from '@icons/RotateIcon';
import MiniLoader from '@modals/MiniLoader';

interface Props {
  userUpdateInfo: IUserUpdateInfo;
  userData?: UserResponse;
  fileObj?: File;
  fileUrl: string;
  isUpdatingUserData: boolean;
  isUpdatingUserInfo: boolean;
  isUserDataUpdated: boolean;
  settingErrMsg: string;
  UserUpdateErr: any;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClickUpload: () => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickDeleteImg: () => void;
  onClickRestoreImg: () => void;
  isToggled: boolean;
}

const SettingsPresenter = ({
  userUpdateInfo,
  userData,
  fileObj,
  fileUrl,
  isUpdatingUserData,
  isUpdatingUserInfo,
  isUserDataUpdated,
  settingErrMsg,
  UserUpdateErr,
  isModalOpen,
  setModalOpen,
  onSubmit,
  onClickUpload,
  onChangeInput,
  onChangeAvatar,
  onClickDeleteImg,
  onClickRestoreImg,
  isToggled,
}: Props) => {
  const { nickname, avatar, email, old_password, new_password, cf_new_password } = userUpdateInfo;
  const [isOldPasswordType, setOldPasswordType] = useState(false);
  const [isNewPasswordType, setNewPasswordType] = useState(false);
  const [isCfNewPasswordType, setCfNewPasswordType] = useState(false);

  if (!userData?.user)
    return (
      <DIV.ErrorPage>
        <MiniLoader w={30} />
      </DIV.ErrorPage>
    );
  return (
    <>
      <Head>
        <title>UYeong | Settings</title>
      </Head>
      {/* 로딩중 */}
      <PageFrame>
        <PageTitle text="Settings" />

        {/* 프로필 사진 수정 */}
        <DIV.SettingsTop>
          <div className="settings-user-avatar-wrapper settings-user-avatar">
            {fileUrl && (
              <Image
                className="settings-user-avatar"
                src={fileUrl}
                onLoad={() => {
                  URL.revokeObjectURL(fileUrl);
                }}
                alt="user avater"
                width={100}
                height={100}
                priority
              />
            )}
            {!fileUrl && (
              <>
                <UserIcon />
              </>
            )}
          </div>

          <DIV.SettingsTopBtns>
            <button onClick={onClickUpload}>
              <CameraIcon />
              <span>Upload</span>
              <input type="file" name="file" accept=".jpg, .jpeg, .png, .gif" onChange={onChangeAvatar} />
            </button>

            <DIV.ToggleBtnWrapper>
              {!isToggled && (
                <button onClick={onClickDeleteImg} disabled={fileObj || avatar ? false : true}>
                  <XMarkIcon />
                </button>
              )}
              {isToggled && (
                <button onClick={onClickRestoreImg}>
                  <RotateIcon />
                </button>
              )}
            </DIV.ToggleBtnWrapper>
          </DIV.SettingsTopBtns>
        </DIV.SettingsTop>

        {/* 정보 수정하기 */}
        <FORM.SettingsMainForm onSubmit={onSubmit}>
          <h3>Personal Information</h3>
          <div>
            <InputBox labelText="Nickname" name="nickname" value={nickname} onChange={onChangeInput} />
          </div>
          <div>
            <InputBox labelText="Email" type="email" name="email" defaultValue={email} disabled />
          </div>

          <h3>Password</h3>
          <div>
            <InputBox
              labelText="Current password"
              name="old_password"
              type={!isOldPasswordType ? 'password' : 'text'}
              value={old_password}
              onChange={onChangeInput}
            />
            <Button
              variant="primary"
              text={!isOldPasswordType ? 'Show' : 'Hide'}
              type="button"
              onClick={() => setOldPasswordType(!isOldPasswordType)}
              disabled={old_password ? false : true}
            />
          </div>
          <div>
            <InputBox
              labelText="New password"
              name="new_password"
              type={!isNewPasswordType ? 'password' : 'text'}
              value={new_password}
              onChange={onChangeInput}
            />
            <Button
              variant="primary"
              text={!isNewPasswordType ? 'Show' : 'Hide'}
              type="button"
              onClick={() => setNewPasswordType(!isNewPasswordType)}
              disabled={new_password ? false : true}
            />
          </div>
          <div>
            <InputBox
              labelText={'Confirm \n new password'}
              name="cf_new_password"
              type={!isCfNewPasswordType ? 'password' : 'text'}
              value={cf_new_password}
              onChange={onChangeInput}
            />
            <Button
              variant="primary"
              text={!isCfNewPasswordType ? 'Show' : 'Hide'}
              type="button"
              onClick={() => setCfNewPasswordType(!isCfNewPasswordType)}
              disabled={cf_new_password ? false : true}
            />
          </div>

          <FormButton variant="update" text="UPDATE" formIsLoading={isUpdatingUserInfo || isUpdatingUserData} />

          {/* 서버에서 받아온 에러는 깜빡 거려서 div에 조건 걸지 않고 작성 */}
          <DIV.SettingsErrMsg>
            {settingErrMsg || UserUpdateErr ? (settingErrMsg ? settingErrMsg : UserUpdateErr.data.msg) : ''}
          </DIV.SettingsErrMsg>
        </FORM.SettingsMainForm>

        {isUserDataUpdated && (
          <Modal type="alert" msg="Update successfully completed!" isOpen={isModalOpen} setOpen={setModalOpen} />
        )}
      </PageFrame>
    </>
  );
};

export default SettingsPresenter;
