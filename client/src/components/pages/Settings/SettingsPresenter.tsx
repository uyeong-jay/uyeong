import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { DIV, FORM } from './SettingsStyle';
import Button from '@atoms/Button';
import InputBox from '@molecules/InputBox';
import Image from 'next/image';
import { UserResponse } from '@app/services/user/userApi';
import NotFound from '@src/pages/404';
import { IUserUpdateInfo } from './SettingsContainer';
import CameraIcon from '@icons/CameraIcon';
import PageTitle from '@atoms/PageTitle';
import FormButton from '@molecules/FormButton';
import PageFrame from '@templates/PageFrame';

interface Props {
  userUpdateInfo: IUserUpdateInfo;
  userData?: UserResponse;
  fileObj?: File;
  userUpdateLoading: boolean;
  userUpdateSuccess: boolean;
  settingErrMsg: string;
  authErr: any;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SettingsPresenter = ({
  userUpdateInfo,
  userData,
  fileObj,
  userUpdateLoading,
  userUpdateSuccess,
  settingErrMsg,
  authErr,
  onSubmit,
  onChangeInput,
  onChangeAvatar,
}: Props) => {
  const { nickname, email, old_password, new_password, cf_new_password } = userUpdateInfo;
  const [isOldPasswordType, setOldPasswordType] = useState(false);
  const [isNewPasswordType, setNewPasswordType] = useState(false);
  const [isCfNewPasswordType, setCfNewPasswordType] = useState(false);

  // URL.revokeObjectURL() 정상 실행을 위해 추가한 코드
  const [fileUrl, setFileUrl] = useState('/');
  useEffect(() => {
    if (fileObj) {
      // console.log('만들어짐:', fileObj);
      setFileUrl(URL.createObjectURL(fileObj));
    }
  }, [fileObj]);

  if (!userData?.user) return <NotFound />;
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
            <Image
              className="settings-user-avatar"
              src={fileObj ? fileUrl : userData?.user?.avatar}
              onLoad={() => {
                // console.log('지워짐:', fileUrl);
                URL.revokeObjectURL(fileUrl);
              }}
              alt="user avater"
              width={100}
              height={100}
            />
          </div>

          <span>
            <CameraIcon />
            <p>Upload</p>
            <input type="file" name="file" accept=".jpg, .jpeg, .png, .gif" onChange={onChangeAvatar} />
          </span>
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

          <FormButton variant="update" text="UPDATE" formIsLoading={userUpdateLoading} />

          {settingErrMsg || authErr ? (
            <DIV.ErrMsg>{settingErrMsg ? settingErrMsg : authErr.data.msg}</DIV.ErrMsg>
          ) : (
            userUpdateSuccess && <DIV.SuccessMsg>Update successfully completed!</DIV.SuccessMsg>
          )}
        </FORM.SettingsMainForm>
      </PageFrame>
    </>
  );
};

export default SettingsPresenter;
