import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { StyledSttings } from './SettingsStyle';
import Button from '@atoms/Button';
import WideButton from '@atoms/WideButton';
import InputBox from '@molecules/InputBox';
import Image from 'next/image';
import { UserResponse } from '@app/services/userApi';
import NotFound from '@src/pages/404';
import Loader from '@modals/Loader';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => void;
  userUpdateInfo: {
    avatar: string | File | undefined;
    email: string | undefined;
    nickname: string | undefined;
    old_password: string;
    new_password: string;
    cf_new_password: string;
  };
  userData: UserResponse | undefined;
  fileObj: File | undefined;
  userUpdateLoading: boolean;
  settingErrMsg: string;
  authErr: any;
}

const SettingsPresenter = ({
  onSubmit,
  onChangeInput,
  onChangeAvatar,
  userUpdateInfo,
  userData,
  fileObj,
  userUpdateLoading,
  settingErrMsg,
  authErr,
}: Props) => {
  const { nickname, email, old_password, new_password, cf_new_password } = userUpdateInfo;
  const [oldPasswordType, setOldPasswordType] = useState(true);
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [cfNewPasswordType, setCfNewPasswordType] = useState(true);

  const [fileUrl, setFileUrl] = useState('/');

  // URL.revokeObjectURL() 정상 실행을 위해 추가한 코드
  useEffect(() => {
    if (fileObj) {
      // console.log('만들어짐:', fileObj);
      setFileUrl(URL.createObjectURL(fileObj));
    }
  }, [fileObj]);

  //파일변경시에는 저장 안되도록
  //URL 사용

  if (!userData?.user) return <NotFound loginError />;
  return (
    <>
      <Head>
        <title>UYeong | Settings</title>
      </Head>
      {/* 로딩중 */}
      {userUpdateLoading && <Loader />}

      <StyledSttings>
        {/* 프로필 사진 바꾸기 */}
        <div>
          <div className="user-avatar-container user-avatar">
            <Image
              className="user-avatar"
              src={fileObj ? fileUrl : userData?.user?.avatar}
              onLoad={() => {
                // console.log('지워짐:', fileUrl);
                URL.revokeObjectURL(fileUrl);
              }}
              alt="user avater"
              width={130}
              height={130}
            />
          </div>

          <span>
            <i className="fas fa-camera" />
            <p>Upload</p>
            <input type="file" name="file" accept=".jpg, .jpeg, .png, .gif" onChange={onChangeAvatar} />
          </span>
        </div>

        {/* 정보 수정하기 */}
        <form onSubmit={onSubmit}>
          {/* nickname */}
          <div>
            <InputBox labelText="Nickname" name="nickname" value={nickname} onChange={onChangeInput} />
          </div>

          {/* email - disabled */}
          <div>
            <InputBox labelText="Email" type="email" name="email" defaultValue={email} disabled />
          </div>

          {/* old_password */}
          <div>
            <InputBox
              labelText="Old password"
              name="old_password"
              type={oldPasswordType ? 'password' : 'text'}
              value={old_password}
              onChange={onChangeInput}
            />
            <Button
              variant="primary"
              text={oldPasswordType ? 'Show' : 'Hide'}
              type="button"
              onClick={() => setOldPasswordType(!oldPasswordType)}
              disabled={old_password ? false : true}
            />
          </div>

          {/* new_password */}
          <div>
            <InputBox
              labelText="New password"
              name="new_password"
              type={newPasswordType ? 'password' : 'text'}
              value={new_password}
              onChange={onChangeInput}
            />
            <Button
              variant="primary"
              text={newPasswordType ? 'Show' : 'Hide'}
              type="button"
              onClick={() => setNewPasswordType(!newPasswordType)}
              disabled={new_password ? false : true}
            />
          </div>

          {/* cf_new_password */}
          <div>
            <InputBox
              labelText={'Confirm \n new password'}
              name="cf_new_password"
              type={cfNewPasswordType ? 'password' : 'text'}
              value={cf_new_password}
              onChange={onChangeInput}
            />

            <Button
              variant="primary"
              text={cfNewPasswordType ? 'Show' : 'Hide'}
              type="button"
              onClick={() => setCfNewPasswordType(!cfNewPasswordType)}
              disabled={cf_new_password ? false : true}
            />
          </div>

          {/* 에러 메시지 */}
          {(settingErrMsg || authErr) && (
            <div style={{ color: 'red' }}>{settingErrMsg ? settingErrMsg : authErr.data.msg}</div>
          )}

          <WideButton
            variant="update"
            text="Update"
            type="submit"
            // disabled={nickname && email && new_password && cf_new_password ? false : true}
          />
        </form>
      </StyledSttings>
    </>
  );
};

export default SettingsPresenter;
