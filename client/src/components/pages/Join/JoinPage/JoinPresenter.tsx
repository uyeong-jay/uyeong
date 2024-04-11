import React, { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';
import { DIV, FORM, P } from './JoinStyle';
import Head from 'next/head';
import Link from 'next/link';
import InputBox from '@molecules/InputBox';
import Button from '@atoms/Button';
import { UserRequest, UserResponse } from '@app/services/user/userApi';
import NotFound from '@src/pages/404';
import PageTitle from '@atoms/PageTitle';
import FormButton from '@molecules/FormButton';
import Modal from '@modals/Modal';
import PartyPopper from '@icons/PartyPopper';
import PageFrame from '@templates/PageFrame';

interface Props {
  onClickBtn: MouseEventHandler<HTMLButtonElement>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  userJoinInfo: UserRequest;
  userData?: UserResponse;
  joinSuccess: boolean;
  isjoining: boolean;
  isjoiningFirst: boolean;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  isJoinError: boolean;
  joinErrMsg: string;
  error: any;
}

const JoinPresenter = ({
  onClickBtn,
  onSubmit,
  onChangeInput,
  userJoinInfo,
  userData,
  joinSuccess,
  isjoining,
  isjoiningFirst,
  isModalOpen,
  setModalOpen,
  isJoinError,
  joinErrMsg,
  error,
}: Props) => {
  const { nickname, email, password, cf_password } = userJoinInfo;
  const [passwordType, setPasswordType] = useState(true);
  const [cfPasswordType, setCfPasswordType] = useState(true);

  if (userData?.user && !joinSuccess) return <NotFound />;
  return (
    <>
      <Head>
        <title>UYeong | Join</title>
      </Head>

      {joinSuccess ? (
        <PageFrame>
          <DIV.JoinSuccess>
            <div>
              <PartyPopper />
              <h1>Congratulation!</h1>
              <PartyPopper />
            </div>
            <p>
              Your account has been successfully created. <br />
              Please click the button below to log in to your account!
            </p>
            <Link href="/login" passHref>
              Log in
            </Link>
          </DIV.JoinSuccess>
        </PageFrame>
      ) : (
        <PageFrame>
          <PageTitle text="Create your account" />

          <FORM.JoinForm onSubmit={onSubmit}>
            <div>
              <InputBox labelText="Nickname" name="nickname" value={nickname} onChange={onChangeInput} />
            </div>
            <div>
              <InputBox labelText="Email" type="email" name="email" value={email} onChange={onChangeInput} />
            </div>

            <button onClick={onClickBtn} style={{ border: '1px solid black', width: '100px', height: '50px' }}>
              asdasd
            </button>

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
                labelText={'Confirm password'}
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
            <FormButton
              variant="join"
              text="Create"
              formIsLoading={isjoiningFirst || isjoining}
              disabled={nickname && email && password && cf_password ? false : true}
            />
          </FORM.JoinForm>

          <P.JoinFooter>
            Already have an account? <Link href="/login">Log in here!</Link>
          </P.JoinFooter>

          {/* 에러 메시지 */}
          <Modal
            type="alert"
            msg={joinErrMsg || (isJoinError && error.data.msg)}
            isOpen={isModalOpen}
            setOpen={setModalOpen}
            shakeAlert
          />
        </PageFrame>
      )}
    </>
  );
};

export default JoinPresenter;
