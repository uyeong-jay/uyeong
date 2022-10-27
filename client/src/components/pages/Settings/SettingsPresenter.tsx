import React, { ChangeEvent, FormEvent, useState } from 'react';
import { StyledSection } from './SettingsStyle';
import Button from '@atoms/Button';
import WideButton from '@atoms/WideButton';
import InputBox from '@molecules/InputBox';
import Image from 'next/image';
import { UserResponse } from '@app/services/api';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  userUpdateInfo: {
    avatar: any;
    nickname: string;
    password: string;
    cf_password: string;
  };
  userData: UserResponse | undefined;
}

const SettingsPresenter = ({ onSubmit, onChangeInput, userUpdateInfo, userData }: Props) => {
  const { avatar, nickname, password, cf_password } = userUpdateInfo;
  const [passwordType, setPasswordType] = useState(true);
  const [cfPasswordType, setCfPasswordType] = useState(true);

  return (
    <StyledSection>
      <div>
        <Image
          src={avatar ? URL.createObjectURL(avatar) : userData?.user?.avatar ? userData?.user?.avatar : ''}
          // onLoad={() => URL.revokeObjectURL()}
          alt="user avater"
          width={100}
          height={100}
        />
        <span>
          <i className="fas fa-camera" />
          <p>Change</p>
          <input type="file" name="file" id="file_up" accept="image/*" /* onChange={onChangeAvatar} */ />
        </span>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <InputBox labelText="Nickname" name="nickname" value={nickname} onChange={onChangeInput} />
        </div>

        <div>
          <InputBox
            labelText="Email"
            name="email"
            type="email"
            onChange={onChangeInput}
            placeholder={userData?.user?.email}
            readOnly
          />
        </div>

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
          variant="join"
          text="Join"
          type="submit"
          // disabled={nickname && email && password && cf_password ? false : true}
        />
      </form>
    </StyledSection>
  );
};

export default SettingsPresenter;
