import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { StyledSection } from './SettingsStyle';
import Button from '@atoms/Button';
import WideButton from '@atoms/WideButton';
import InputBox from '@molecules/InputBox';
import Image from 'next/image';
import { UserResponse } from '@app/services/api';
import { NotFound } from '@src/pages/404';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
  userUpdateInfo: {
    avatar: any;
    nickname: string;
    password: string;
    cf_password: string;
  };
  userData: UserResponse | undefined;
}

const SettingsPresenter = ({ onSubmit, onChangeInput, onChangeFile, userUpdateInfo, userData }: Props) => {
  const { avatar, nickname, password, cf_password } = userUpdateInfo;
  const [passwordType, setPasswordType] = useState(true);
  const [cfPasswordType, setCfPasswordType] = useState(true);

  //URL.createObjectURL(), URL.revokeObjectURL() 정상 실행을 위해 추가한 코드
  const [fileURL, setFileURL] = useState('');
  useEffect(() => {
    if (avatar) setFileURL(URL.createObjectURL(avatar));
    return;
  }, [avatar]);
  // console.log('avatar: ', avatar, 'fileURL: ', fileURL);

  if (!userData?.user) return <NotFound loginError />;
  return (
    <StyledSection>
      {/* 프로필 사진 바꾸기 */}
      <div>
        <div className="user_avatar_container user_avatar">
          <Image
            className="user_avatar"
            src={avatar ? fileURL : userData?.user?.avatar}
            onLoad={() => URL.revokeObjectURL(fileURL)}
            alt="user avater"
            width={130}
            height={130}
          />
        </div>

        <span>
          <i className="fas fa-camera" />
          <p>Edit</p>
          <input type="file" name="file" accept=".gif, .jpg, .png" onChange={onChangeFile} />
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
          <InputBox labelText="Email" name="email" type="email" defaultValue={userData?.user?.email} disabled />
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
        {/* {error && <div style={{ color: 'red' }}>{error.data.msg}</div>} */}

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
