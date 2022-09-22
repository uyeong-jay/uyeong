import React, { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from '@_settings/styled';
import Loader from '@modals/Loader';
import InputBox from '@molecules/InputBox';
import Button from '@atoms/Button';
import WideButton from '@atoms/WideButton';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  nickname: string;
  email: string;
  password: string;
  cf_password: string;
  joinState: {
    loading: boolean;
    success: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
  };
}

const StyledSection = styled.section`
  border: 2px dotted lightslategray;
  width: 750px;
  border-radius: 20% 50% 30% / 30% 40% 40%;
  padding: 100px;
  margin: 50px 0 50px 0;

  & form {
    & div:nth-child(odd) input {
      border-radius: 50px 80px 50px 80px;
    }
    & div:nth-child(even) input {
      border-radius: 90px 55px 80px 50px;
    }
  }

  & p a {
    color: blue;
  }
`;

const JoinPresenter = ({ onSubmit, onChangeInput, nickname, email, password, cf_password, joinState }: Props) => {
  const [passwordType, setPasswordType] = useState(true);
  const [cf_passwordType, setCf_passwordType] = useState(true);

  return (
    <>
      <Head>
        <title>UYeong | Join</title>
      </Head>
      {/* 로딩화면 */}
      {joinState.loading && <Loader />}

      {joinState.success ? (
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
                type={cf_passwordType ? 'password' : 'text'}
                value={cf_password}
                onChange={onChangeInput}
              />
              <Button
                variant="primary"
                text={cf_passwordType ? 'Show' : 'Hide'}
                type="button"
                onClick={() => setCf_passwordType(!cf_passwordType)}
                disabled={cf_password ? false : true}
              />
            </div>

            {/* 에러 메시지 */}
            {joinState.error && <div style={{ color: 'red' }}>{joinState.error}</div>}

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
