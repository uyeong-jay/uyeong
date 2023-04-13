import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ContactPresenter from './ContactPresenter';
import validEmail from '@utils/valid/validEmail';

export interface UserContactInfo {
  user_name: string;
  user_email: string;
  message: string;
}

const ContactContainer = () => {
  const initialState = {
    user_name: '',
    user_email: '',
    message: '',
  };

  const [userContactInfo, setUserContactInfo] = useState(initialState);
  const form = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [contactErrmsg, setContactErrmsg] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //textarea 높이 수정
  const resizeHeight = useCallback(() => {
    const textareaEl = textareaRef.current;
    if (textareaEl !== null) {
      textareaEl.style.height = '150px';
      // console.log(textareaEl.scrollHeight); //2
      textareaEl.style.height = textareaEl.scrollHeight + 2 + 'px';
      console.log(textareaEl.style.height);
    }
  }, []);

  //수정 버튼 클릭시 textarea 높이 변경
  useEffect(() => {
    resizeHeight();
  }, [resizeHeight]);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { user_name, user_email, message } = userContactInfo;

      //유효성 검사
      if (user_name.length < 2) {
        setContactErrmsg('Please enter a name with at least 2 characters');
        return setModalOpen(true);
      }
      if (!validEmail(user_email)) {
        setContactErrmsg('Please input the email format correctly');
        return setModalOpen(true);
      }
      if (message.length < 10) {
        setContactErrmsg('Please enter a message with at least 10 characters');
        return setModalOpen(true);
      }

      try {
        const result = await emailjs.sendForm(
          process.env.EMAILJS_SERVICE_ID,
          process.env.EMAILJS_TEMPLATE_ID,
          form.current !== null ? form.current : '',
          process.env.EMAILJS_PUBLIC_KEY,
        );

        //값 초기화
        setUserContactInfo({
          user_name: '',
          user_email: '',
          message: '',
        });

        //성공시
        console.log(result.text);
        setSendSuccess(true);
      } catch (error: any) {
        setContactErrmsg('Sending failed! Please try again.');
        setModalOpen(true);
      }
    },
    [userContactInfo],
  );

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserContactInfo({ ...userContactInfo, [name]: value });
    },
    [userContactInfo],
  );

  const onChangeTextArea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      //textarea 높이 변경
      resizeHeight();
      setUserContactInfo({ ...userContactInfo, message: e.target.value });
    },
    [resizeHeight, userContactInfo],
  );

  return (
    <ContactPresenter
      form={form}
      userContactInfo={userContactInfo}
      sendSuccess={sendSuccess}
      contactErrmsg={contactErrmsg}
      textareaRef={textareaRef}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      onChangeTextarea={onChangeTextArea}
    />
  );
};

export default ContactContainer;
