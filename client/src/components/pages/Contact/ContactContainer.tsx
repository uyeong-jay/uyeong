import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ContactPresenter from './ContactPresenter';
import validEmail from '@utils/valid/validEmail';
import { EmailjsProps } from '@src/pages/contact';

export interface UserContactInfo {
  user_name: string;
  user_email: string;
  message: string;
}

interface Props {
  emailjsConfig: EmailjsProps;
}

const ContactContainer = ({ emailjsConfig }: Props) => {
  const initialState = {
    user_name: '',
    user_email: '',
    message: '',
  };

  const [userContactInfo, setUserContactInfo] = useState(initialState);

  const form = useRef(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isSendingMsg, setSendingMsg] = useState(false);
  const [isMsgSentSuccess, setMsgSentSuccess] = useState(false);
  const [sendErrorMsg, setSendErrorMsg] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //textarea 높이 수정
  const resizeHeight = useCallback(() => {
    const textareaEl = textareaRef.current;
    if (textareaEl !== null) {
      textareaEl.style.height = '150px';
      // console.log(textareaEl.scrollHeight); //2
      textareaEl.style.height = textareaEl.scrollHeight + 2 + 'px';
      // console.log(textareaEl.style.height); //152px
    }
  }, []);

  useEffect(() => {
    resizeHeight();
  }, [resizeHeight]);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { user_name, user_email, message } = userContactInfo;

      //유효성 검사
      if (user_name.length < 2) {
        setSendErrorMsg('Please enter your name with more than 2 characters.');
        return setModalOpen(true);
      }
      if (!validEmail(user_email)) {
        setSendErrorMsg('Please enter your email in the correct format.');
        return setModalOpen(true);
      }
      if (message.length < 10) {
        setSendErrorMsg('Please enter your message with more than 10 characters.');
        return setModalOpen(true);
      }

      try {
        setSendingMsg(true);

        const result = await emailjs.sendForm(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          form.current !== null ? form.current : '',
          emailjsConfig.publicKey
        );

        //성공시
        // console.log(result.text);
        if (result.text) {
          //값 초기화
          setUserContactInfo({
            user_name: '',
            user_email: '',
            message: '',
          });

          setSendErrorMsg('');
          setMsgSentSuccess(true);
          setModalOpen(true);
          setSendingMsg(false);
        }
      } catch (error: any) {
        setSendErrorMsg(
          'Sorry, the email failed to send because the token expired. Please click the email link at the bottom of the page to try sending it again. Thank you!'
        );
        setMsgSentSuccess(false);
        setModalOpen(true);
        setSendingMsg(false);
      }
    },
    [emailjsConfig.publicKey, emailjsConfig.serviceId, emailjsConfig.templateId, userContactInfo]
  );

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserContactInfo({ ...userContactInfo, [name]: value });
    },
    [userContactInfo]
  );

  const onChangeTextArea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      //textarea 높이 변경
      resizeHeight();
      setUserContactInfo({ ...userContactInfo, message: e.target.value });
    },
    [resizeHeight, userContactInfo]
  );

  return (
    <ContactPresenter
      form={form}
      userContactInfo={userContactInfo}
      isMsgSentSuccess={isMsgSentSuccess}
      sendErrorMsg={sendErrorMsg}
      textareaRef={textareaRef}
      isSendingMsg={isSendingMsg}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      onChangeTextarea={onChangeTextArea}
    />
  );
};

export default ContactContainer;
