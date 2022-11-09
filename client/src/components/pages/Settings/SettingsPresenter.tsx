import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { StyledSection } from './SettingsStyle';
import Button from '@atoms/Button';
import WideButton from '@atoms/WideButton';
import InputBox from '@molecules/InputBox';
import Image from 'next/image';
import { UserResponse } from '@app/services/api';
import NotFound from '@src/pages/404';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => void;
  userUpdateInfo: {
    avatar: string | File | undefined;
    email: string | undefined;
    nickname: string | undefined;
    password: string;
    cf_password: string;
  };
  userData: UserResponse | undefined;
  fileObj: File | undefined;
  settingErrMsg: string;
}

const SettingsPresenter = ({
  onSubmit,
  onChangeInput,
  onChangeAvatar,
  userUpdateInfo,
  userData,
  fileObj,
  settingErrMsg,
}: Props) => {
  const { nickname, email, password, cf_password } = userUpdateInfo;
  const [passwordType, setPasswordType] = useState(true);
  const [cfPasswordType, setCfPasswordType] = useState(true);

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
    <StyledSection>
      {/* 프로필 사진 바꾸기 */}
      <div>
        <div className="user_avatar_container user_avatar">
          <Image
            className="user_avatar"
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
          <InputBox labelText="Email" name="email" type="email" defaultValue={email} disabled />
        </div>

        {/* password */}
        <div>
          <InputBox
            labelText="Password"
            name="password"
            type={passwordType ? 'password' : 'text'}
            value={password}
            onChange={onChangeInput}
          />
          <Button
            variant="primary"
            text={passwordType ? 'Show' : 'Hide'}
            type="button"
            onClick={() => setPasswordType(!passwordType)}
            disabled={password ? false : true}
          />
        </div>

        {/* cf_password */}
        <div>
          <InputBox
            labelText={'Confirm \n password'}
            name="cf_password"
            type={cfPasswordType ? 'password' : 'text'}
            value={cf_password}
            onChange={onChangeInput}
          />

          <Button
            variant="primary"
            text={cfPasswordType ? 'Show' : 'Hide'}
            type="button"
            onClick={() => setCfPasswordType(!cfPasswordType)}
            disabled={cf_password ? false : true}
          />
        </div>

        {/* 에러 메시지 */}
        {settingErrMsg && <div style={{ color: 'red' }}>{settingErrMsg}</div>}

        <WideButton
          variant="update"
          text="Update"
          type="submit"
          // disabled={nickname && email && password && cf_password ? false : true}
        />
      </form>
    </StyledSection>
  );
};

export default SettingsPresenter;
