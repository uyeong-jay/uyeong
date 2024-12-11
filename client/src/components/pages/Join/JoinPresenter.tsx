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
import Modal from '@organisms/Modal';
import PartyPopper from '@icons/PartyPopper';
import PageFrame from '@templates/PageFrame';
import MiniLoader from '@atoms/MiniLoader';
import CountdownTimer from '@atoms/CountdownTimer';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickVerifyEmail: MouseEventHandler<HTMLButtonElement>;
  onClickVerify: MouseEventHandler<HTMLButtonElement>;
  onTimeout: () => void;
  userJoinInfo: UserRequest;
  userData?: UserResponse;
  joinData?: UserResponse;
  isJoinSuccess: boolean;
  isjoining: boolean;
  isjoiningFirst: boolean;
  isSendingEmail: boolean;
  isVerifiedEmail: boolean;
  isVerified: boolean;
  isTimeout: boolean;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  isJoinError: boolean;
  joinErrMsg: string;
  joinError: any;
}

const JoinPresenter = ({
  onSubmit,
  onChangeInput,
  onClickVerifyEmail,
  onClickVerify,
  onTimeout,
  userJoinInfo,
  userData,
  joinData,
  isJoinSuccess,
  isjoining,
  isjoiningFirst,
  isSendingEmail,
  isVerifiedEmail,
  isVerified,
  isTimeout,
  isModalOpen,
  setModalOpen,
  isJoinError,
  joinErrMsg,
  joinError,
}: Props) => {
  const { nickname, email, emailCode, password, cf_password } = userJoinInfo;
  const [passwordType, setPasswordType] = useState(true);
  const [cfPasswordType, setCfPasswordType] = useState(true);

  if (userData?.user && !isJoinSuccess) return <NotFound />;
  return (
    <>
      <Head>
        <title>UYeong | Join</title>
      </Head>

      {isJoinSuccess && joinData?.access_token && isVerifiedEmail && isVerified ? (
        <PageFrame>
          <DIV.JoinSuccess>
            <div>
              <PartyPopper />
              <h1>CONGRATS!</h1>
              <PartyPopper />
            </div>
            <p>
              Your account has been successfully created! <br />
              Please click the button below to sign in to your account.
            </p>
            <Link href="/signin" passHref>
              Sign in
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
              <InputBox
                labelText="Email"
                type="email"
                name="email"
                value={email}
                onChange={onChangeInput}
                readOnly={isVerifiedEmail ? true : false}
                disabled={isVerifiedEmail ? true : false}
              />
              {isSendingEmail ? (
                <span>
                  <MiniLoader w={20} />
                </span>
              ) : (
                <button
                  className="verify-email-btn"
                  type="button"
                  onClick={onClickVerifyEmail}
                  disabled={email && !isVerifiedEmail ? false : true}
                >
                  Verify Email
                </button>
              )}
              {!isVerifiedEmail && !isTimeout && joinErrMsg && <DIV.EmailErrMsg>{joinErrMsg}</DIV.EmailErrMsg>}
            </div>
            {isVerifiedEmail && (
              <div className="verify-code-input">
                <InputBox
                  type="text"
                  name="emailCode"
                  value={emailCode}
                  onChange={onChangeInput}
                  readOnly={isVerified ? true : false}
                  disabled={isVerified ? true : false}
                />
                {isVerifiedEmail && !isVerified && <CountdownTimer initialTime={5 * 60} onTimeout={onTimeout} />}
                <button
                  className="verify-code-btn"
                  type="button"
                  onClick={onClickVerify}
                  disabled={isVerified ? true : false}
                >
                  {isVerified ? 'Verified' : 'Verify'}
                </button>
                {isVerifiedEmail && !isVerified && joinErrMsg && (
                  <DIV.EmailErrMsg className="verify-code-err">{joinErrMsg}</DIV.EmailErrMsg>
                )}
              </div>
            )}

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
              formIsLoading={isVerifiedEmail && isVerified && (isjoiningFirst || isjoining)}
              disabled={isVerifiedEmail && isVerified && nickname && email && password && cf_password ? false : true}
            />
          </FORM.JoinForm>

          <P.JoinFooter>
            Already have an account? <Link href="/signin">Sign in here!</Link>
          </P.JoinFooter>

          {/* 에러 메시지 */}
          {(joinErrMsg || isJoinError) && (
            <Modal
              type="alert"
              msg={joinErrMsg || joinError?.data?.msg}
              isOpen={isModalOpen}
              setOpen={setModalOpen}
              shakeAlert
            />
          )}

          {/* 이메일 인증 성공 메시지 */}
          {isVerifiedEmail && !isVerified && !isTimeout && isJoinSuccess && (
            <Modal
              type="alert"
              msg={`Email sent! 
              Please check your email and enter your verification code below.`}
              isOpen={isModalOpen}
              setOpen={setModalOpen}
            />
          )}
        </PageFrame>
      )}
    </>
  );
};

export default JoinPresenter;
