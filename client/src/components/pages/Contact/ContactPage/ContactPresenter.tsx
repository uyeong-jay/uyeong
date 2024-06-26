import InputBox from '@molecules/InputBox';
import Head from 'next/head';
import { UserContactInfo } from './ContactContainer';
import { ChangeEvent, FormEvent, MutableRefObject, RefObject } from 'react';
import Modal from '@modals/Modal';
import { FORM } from './ContactStyle';
import PageTitle from '@atoms/PageTitle';
import FormButton from '@molecules/FormButton';
import PageFrame from '@templates/PageFrame';
import TextareaBox from '@molecules/TextareaBox';

interface Props {
  form: MutableRefObject<null>;
  userContactInfo: UserContactInfo;
  isMsgSentSuccess: boolean;
  sendErrorMsg: string;
  textareaRef: RefObject<HTMLTextAreaElement>;
  isSendingMsg: boolean;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTextarea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContactPresenter = ({
  form,
  userContactInfo,
  isMsgSentSuccess,
  sendErrorMsg,
  textareaRef,
  isModalOpen,
  isSendingMsg,
  setModalOpen,
  onSubmit,
  onChangeInput,
  onChangeTextarea,
}: Props) => {
  const { user_name, user_email, message } = userContactInfo;

  return (
    <>
      <Head>
        <title>UYeong | Contact</title>
      </Head>
      <PageFrame>
        <PageTitle text="Contact" />
        <FORM.ContactForm ref={form} onSubmit={onSubmit}>
          <InputBox labelText="Name" type="text" name="user_name" value={user_name} onChange={onChangeInput} required />
          <InputBox
            labelText="Email"
            type="email"
            name="user_email"
            value={user_email}
            onChange={onChangeInput}
            required
          />

          <TextareaBox
            name="message"
            labelText="message"
            value={message}
            onChange={onChangeTextarea}
            ref={textareaRef}
            spellCheck={false}
            required
          />

          <FormButton
            text="Send"
            formIsLoading={isSendingMsg}
            disabled={user_name && user_email && message ? false : true}
          />
        </FORM.ContactForm>

        {isMsgSentSuccess && !sendErrorMsg && (
          <Modal
            type="alert"
            msg="Message sent! I'll get back to you as soon as possible."
            isOpen={isModalOpen}
            setOpen={setModalOpen}
          />
        )}

        {sendErrorMsg && (
          <Modal type="alert" msg={sendErrorMsg} isOpen={isModalOpen} setOpen={setModalOpen} shakeAlert />
        )}
      </PageFrame>
    </>
  );
};

export default ContactPresenter;
