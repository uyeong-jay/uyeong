import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FORM, P } from './LoginStyle';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@atoms/Button';
import InputBox from '@molecules/InputBox';
import { UserResponse } from '@app/services/user/userApi';
import NotFound from '@src/pages/404';
import PageTitle from '@atoms/PageTitle';
import FormButton from '@molecules/FormButton';
import Modal from '@organisms/Modal';
import PageFrame from '@templates/PageFrame';

interface Props {
  userLoginInfo: {
    email: string;
    password: string;
  };
  userData?: UserResponse;
  isLoginSuccess: boolean;
  isLoggingIn: boolean;
  isLoggingInFirst: boolean;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoginError: boolean;
  loginError: any;
}

const LoginPresenter = ({
  userLoginInfo,
  userData,
  isLoginSuccess,
  isLoggingIn,
  isLoggingInFirst,
  isModalOpen,
  setModalOpen,
  onSubmit,
  onChangeInput,
  isLoginError,
  loginError,
}: Props) => {
  const [isPasswordType, setPasswordType] = useState(true);
  const { email, password } = userLoginInfo;

  //!isLoginSuccess: isLoginSuccess는 페이지가 바뀔때마다 초기화 되어 url로 검색하여 들어왔을때는 이미 false인 상태로 로그인페이지에 에러 화면이 보이도록 가능
  if (userData?.user && !isLoginSuccess) return <NotFound />;
  return (
    <>
      <Head>
        <title>UYeong | Sign-in</title>
      </Head>
      <PageFrame>
        <PageTitle text="Sign in" />

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
            text="Sign in"
            formIsLoading={isLoggingInFirst || isLoggingIn}
            disabled={email && password ? false : true}
          />
        </FORM.LoginForm>

        <P.LoginFooter>
          Don&#39;t have an account yet? <Link href="/join">Create one here!</Link>
        </P.LoginFooter>

        {/* 에러 메시지 */}
        {isLoginError && (
          <Modal type="alert" msg={loginError.data.msg} isOpen={isModalOpen} setOpen={setModalOpen} shakeAlert />
        )}
      </PageFrame>
    </>
  );
};

export default LoginPresenter;
