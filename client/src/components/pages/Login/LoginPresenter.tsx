import React, { ChangeEvent, FormEvent, useState } from 'react';
import { StyledSection } from './LoginStyle';
import Head from 'next/head';
import Link from 'next/link';
// import Loader from '@modals/Loader';
import Button from '@atoms/Button';
import WideButton from '@atoms/WideButton';
import InputBox from '@molecules/InputBox';
import { UserResponse } from '@app/services/api';
import NotFound from '@src/pages/404';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  userLoginInfo: {
    email: string;
    password: string;
  };
  userData: UserResponse | undefined;
  loginSuccess: boolean;
  loginLoading: boolean;
  error: any;
}

const LoginPresenter = ({
  onSubmit,
  onChangeInput,
  userLoginInfo,
  userData,
  loginSuccess,
  /* loginLoading, */
  error,
}: Props) => {
  const [passwordType, setPasswordType] = useState(true);
  const { email, password } = userLoginInfo;

  //!loginSuccess: loginSuccess가 일회성(페이지가 바뀔때마다 새로고침을 실행하기 때문)인 걸 활용하여 url로 검색하여 들어왔을때는 이미 false인 상태이기 때문에 로그인페이지 에러 화면이 보이도록 함
  if (userData?.user && !loginSuccess) return <NotFound />;
  return (
    <>
      <Head>
        <title>UYeong | Login</title>
      </Head>
      {/* 로딩화면 */}
      {/* {loginLoading && <Loader />} */}

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
          {error && <div style={{ color: 'red' }}>{error.data.msg}</div>}

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
