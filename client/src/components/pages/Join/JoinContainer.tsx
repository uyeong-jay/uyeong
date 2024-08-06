import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import JoinPresenter from './JoinPresenter';
import { useGetUserDataQuery, useJoinMutation } from '@app/services/user/userApi';
import { validUserJoinInfo } from '@utils/valid/validUserInfo';
import validEmail from '@utils/valid/validEmail';

const JoinContainer = () => {
  const { data: userData } = useGetUserDataQuery();
  const [
    join,
    { data: joinData, isSuccess: isJoinSuccess, isLoading: isjoining, isError: isJoinError, error: joinError },
  ] = useJoinMutation();

  const initialState = { nickname: '', email: '', emailCode: '', password: '', cf_password: '' };
  const [userJoinInfo, setUserJoinInfo] = useState(initialState);

  const [isSendingEmail, setSendingEmail] = useState(false);
  const [isVerifiedEmail, setVerifiedEmail] = useState(false);
  const [isVerified, setVerified] = useState(false);

  //input 강제 수정 방지 state
  const [verifiedEmailAddr, setVerifiedEmailAddr] = useState('');
  const [verifiedEmailCode, setVerifiedEmailCode] = useState('');

  const [isTimeout, setTimeout] = useState(false);

  const [joinErrMsg, setJoinErrMsg] = useState('');
  const [isjoiningFirst, setjoiningFirst] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  //modal error용
  useEffect(() => {
    if (isJoinError) {
      setModalOpen(true);
      setjoiningFirst(false);
      setSendingEmail(false);
    }
  }, [isJoinError]);

  //이메일 전송 성공시
  useEffect(() => {
    if (!isVerifiedEmail && !isTimeout && isJoinSuccess) {
      setModalOpen(true);
      setSendingEmail(false);
      setVerifiedEmail(true);
      setVerifiedEmailAddr(userJoinInfo.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isJoinSuccess, isVerifiedEmail]);

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserJoinInfo({ ...userJoinInfo, [name]: value });
    },
    [userJoinInfo],
  );

  const onClickVerifyEmail = useCallback(
    (e) => {
      e.preventDefault();
      if (isVerifiedEmail) return; //이미 인증된 경우 리턴
      setTimeout(false);

      //이메일 유효성 확인
      if (!validEmail(userJoinInfo.email)) {
        setJoinErrMsg('Please enter a valid email address.'); //모달 오픈x
        return;
      }

      //로딩
      setSendingEmail(true);
      setJoinErrMsg('');

      //이메일 보내기
      join(userJoinInfo);
    },
    [isVerifiedEmail, join, userJoinInfo],
  );

  const onClickVerify = useCallback(
    (e) => {
      e.preventDefault();
      if (!isVerifiedEmail || isVerified) return; //이미 인증된 경우 리턴

      //only client
      if (joinData?.verificationCode?.toString() === userJoinInfo.emailCode) {
        setVerified(true);
        setJoinErrMsg('');
        setVerifiedEmailCode(userJoinInfo.emailCode);
      } else {
        setVerified(false);
        setJoinErrMsg('The verification code is incorrect.');
      }
    },
    [isVerified, isVerifiedEmail, joinData?.verificationCode, userJoinInfo.emailCode],
  );

  const onTimeout = useCallback(() => {
    if (isVerified) return; //이미 인증된 경우 리턴
    setUserJoinInfo({ ...userJoinInfo, emailCode: '' });
    setTimeout(true);
    setVerifiedEmail(false);
    setVerified(false);
    setModalOpen(true);
    setJoinErrMsg(
      'Sorry, your email verification code has expired. Please click the "Verify Email" button again to request a new one.',
    );
  }, [isVerified, userJoinInfo]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isModalOpen || !isVerifiedEmail || !isVerified) return;

      //valid를 한번만 실행하기 위해 만든 배열
      const errMsg = [];

      //form에러
      errMsg.push(validUserJoinInfo(userJoinInfo));

      //에러 보여주기
      setJoinErrMsg(errMsg[0]);

      if (!errMsg[0]) {
        // 에러가 없으면 유저 데이터 업데이트
        join({ ...userJoinInfo, email: verifiedEmailAddr, emailCode: verifiedEmailCode }); //verifiedEmailAddr, verifiedEmailCode > input 강제 수정 방지 데이터
        setjoiningFirst(true); //에러가 났을 경우를 제외하면 false로 바꿀 필요x
        setJoinErrMsg('');
      } else {
        setModalOpen(true);
      }
    },
    [isModalOpen, isVerified, isVerifiedEmail, join, userJoinInfo, verifiedEmailAddr, verifiedEmailCode],
  );

  return (
    <JoinPresenter
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      onClickVerifyEmail={onClickVerifyEmail}
      onClickVerify={onClickVerify}
      onTimeout={onTimeout}
      userJoinInfo={userJoinInfo}
      userData={userData}
      joinData={joinData}
      isJoinSuccess={isJoinSuccess}
      isjoining={isjoining}
      isjoiningFirst={isjoiningFirst}
      isSendingEmail={isSendingEmail}
      isVerifiedEmail={isVerifiedEmail}
      isVerified={isVerified}
      isTimeout={isTimeout}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      isJoinError={isJoinError}
      joinErrMsg={joinErrMsg}
      joinError={joinError}
    />
  );
};

export default JoinContainer;
