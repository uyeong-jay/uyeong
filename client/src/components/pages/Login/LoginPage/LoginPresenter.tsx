import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FORM, P } from './LoginStyle';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@atoms/Button';
import InputBox from '@molecules/InputBox';
import { UserResponse } from '@app/services/user/userApi';
import NotFound from '@src/pages/404';
import PageTitle from '@atoms/PageTitle';
import { SECTION } from '@templates/SectionFrame';
import FormButton from '@molecules/FormButton';
import Modal from '@modals/Modal';

interface Props {
  userLoginInfo: {
    email: string;
    password: string;
  };
  userData?: UserResponse;
  loginSuccess: boolean;
  loginLoading: boolean;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoginError: boolean;
  error: any;
}

const LoginPresenter = ({
  userLoginInfo,
  userData,
  loginSuccess,
  loginLoading,
  isModalOpen,
  setModalOpen,
  onSubmit,
  onChangeInput,
  isLoginError,
  error,
}: Props) => {
  const [isPasswordType, setPasswordType] = useState(true);
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

      <SECTION.Frame>
        <PageTitle text="Login" />

        <FORM.LoginForm onSubmit={onSubmit}>
          <div>
            <InputBox labelText="Email" type="email" name="email" value={email} onChange={onChangeInput} />
          </div>

          <div>
            <InputBox
              labelText="Password"
              name="password"
              type={isPasswordType ? 'password' : 'text'}
              value={password}
              onChange={onChangeInput}
            />
            <Button
              variant="primary"
              text={isPasswordType ? 'Show' : 'Hide'}
              type="button"
              onClick={() => setPasswordType(!isPasswordType)}
              disabled={password ? false : true}
            />
          </div>

          <FormButton
            variant="login"
            text="Login"
            formIsLoading={loginLoading}
            disabled={email && password ? false : true}
          />
        </FORM.LoginForm>

        <P.LoginFooter>
          Don&#39;t have an account yet? <Link href="/join">Create one here!</Link>
        </P.LoginFooter>

        {/* 에러 메시지 */}
        {isLoginError && (
          <Modal type="alert" msg={error.data.msg} isOpen={isModalOpen} setOpen={setModalOpen} shakeAlert />
        )}
      </SECTION.Frame>
    </>
  );
};

export default LoginPresenter;
