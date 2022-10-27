import React, { ChangeEvent, FormEvent, useState } from 'react';
import { StyledSection } from './JoinStyle';
import Head from 'next/head';
import Link from 'next/link';
import Loader from '@modals/Loader';
import InputBox from '@molecules/InputBox';
import Button from '@atoms/Button';
import WideButton from '@atoms/WideButton';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  userJoinInfo: {
    nickname: string;
    email: string;
    password: string;
    cf_password: string;
  };
  isSuccess: boolean;
  isLoading: boolean;
  error: any;
}

const JoinPresenter = ({ onSubmit, onChangeInput, userJoinInfo, isSuccess, isLoading, error }: Props) => {
  const { nickname, email, password, cf_password } = userJoinInfo;
  const [passwordType, setPasswordType] = useState(true);
  const [cfPasswordType, setCfPasswordType] = useState(true);

  return (
    <>
      <Head>
        <title>UYeong | Join</title>
      </Head>
      {/* 로딩화면 */}
      {isLoading && <Loader />}

      {isSuccess ? (
        <div>가입이 완료 되었습니다. 로그인을 해주세요.</div>
      ) : (
        <StyledSection>
          <form onSubmit={onSubmit}>
            <div>
              <InputBox labelText="Nickname" name="nickname" value={nickname} onChange={onChangeInput} />
            </div>

            <div>
              <InputBox labelText="Email" name="email" type="email" value={email} onChange={onChangeInput} />
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
            {error && <div style={{ color: 'red' }}>{error.data.msg}</div>}

            <WideButton
              variant="join"
              text="Join"
              type="submit"
              // disabled={nickname && email && password && cf_password ? false : true}
            />
          </form>

          <p>
            비밀번호를 잊어버리셨나요? ( <Link href="/fotget_password">Forget password?</Link> )
            <br />
            이미 가입이 되어 있나요? ( <Link href="/login">Login now!</Link> )
          </p>
        </StyledSection>
      )}
    </>
  );
};

export default JoinPresenter;
