import React, { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from '@_settings/styled';
import Loader from '@modals/Loader';
import Button from '@atoms/Button';
import WideButton from '@atoms/WideButton';
import InputBox from '@molecules/InputBox';
import { ErrorMessage, UserData } from '@slices/userSlice';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
  loginState: {
    user: UserData | null;
    login: {
      loading: boolean;
      error: ErrorMessage | null;
    };
  };
}

const StyledSection = styled.section`
  border: 2px dotted lightslategray;
  width: 750px;
  border-radius: 20% 50% 30% / 30% 40% 40%;
  padding: 100px;
  margin: 50px 0 50px 0;

  & form {
    & div:nth-child(1) input {
      border-radius: 50px 80px 50px 80px;
    }
    & div:nth-child(2) input {
      border-radius: 90px 55px 80px 50px;
    }
  }

  & p a {
    color: blue;
  }
`;

const LoginPresenter = ({ onSubmit, onChangeInput, email, password, loginState }: Props) => {
  const [passwordType, setPasswordType] = useState(true);

  return (
    <>
      <Head>
        <title>UYeong | Login</title>
      </Head>
      {/* 로딩화면 */}
      {loginState.login.loading && <Loader />}

      <StyledSection>
        <form onSubmit={onSubmit}>
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

          {/* 에러 메시지 */}
          {loginState.login.error && <div style={{ color: 'red' }}>{loginState.login.error}</div>}

          {/* widebutton >> atoms 에서 가져오기 */}
          <WideButton variant="login" text="Login" type="submit" /* disabled={email && password ? false : true} */ />
        </form>

        <p>
          비밀번호를 잊어버리셨나요? ( <Link href="/fotget_password">Forget password?</Link> )
          <br />
          가입이 안 되어 있나요? ( <Link href="/join">Wanna join?</Link> )
        </p>
      </StyledSection>
    </>
  );
};

export default LoginPresenter;
