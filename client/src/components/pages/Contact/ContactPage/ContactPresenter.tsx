import InputBox from '@molecules/InputBox';
import Head from 'next/head';
import { UserContactInfo } from './ContactContainer';
import { ChangeEvent, FormEvent, MutableRefObject, RefObject } from 'react';
import Modal from '@modals/Modal';
import { DIV } from './ContactStyle';

interface Props {
  form: MutableRefObject<null>;
  userContactInfo: UserContactInfo;
  sendSuccess: boolean;
  contactErrmsg: string;
  textareaRef: RefObject<HTMLTextAreaElement>;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTextarea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContactPresenter = ({
  form,
  userContactInfo,
  sendSuccess,
  contactErrmsg,
  textareaRef,
  isModalOpen,
  setModalOpen,
  onSubmit,
  onChangeInput,
  onChangeTextarea,
}: Props) => {
  const { user_name, user_email, message } = userContactInfo;

  return (
    <DIV.Layout>
      <Head>
        <title>UYeong | Contact</title>
      </Head>
      <form ref={form} onSubmit={onSubmit}>
        <InputBox
          labelText="Name"
          type="text"
          name="user_name"
          value={user_name}
          onChange={onChangeInput}
          placeholder="Enter your name"
          required
        />
        <InputBox
          labelText="Email"
          type="email"
          name="user_email"
          value={user_email}
          onChange={onChangeInput}
          placeholder="Enter your email address"
          required
        />

        <label>Message</label>
        <textarea
          name="message"
          value={message}
          onChange={onChangeTextarea}
          placeholder="Enter your message"
          required
          ref={textareaRef}
        ></textarea>
        <button type="submit">Send</button>
      </form>

      {sendSuccess && <div>Sent! I&apos;ll reply to you as soon as possible.</div>}
      {contactErrmsg && <Modal type="alert" msg={contactErrmsg} isOpen={isModalOpen} setOpen={setModalOpen} />}
    </DIV.Layout>
  );
};

export default ContactPresenter;
