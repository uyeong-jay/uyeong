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
  isLoading: boolean;
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
  isLoading,
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
      <h1>Contact</h1>
      <form ref={form} onSubmit={onSubmit}>
        <InputBox labelText="Name" type="text" name="user_name" value={user_name} onChange={onChangeInput} required />
        <InputBox
          labelText="Email"
          type="email"
          name="user_email"
          value={user_email}
          onChange={onChangeInput}
          required
        />

        <label>Message</label>
        <textarea name="message" value={message} onChange={onChangeTextarea} required ref={textareaRef}></textarea>

        {isLoading ? <span>Loading</span> : <button type="submit">Send</button>}
      </form>

      {/* {sendSuccess && <DIV.SuccessMsg>Sent! I&apos;ll reply to you as soon as possible.</DIV.SuccessMsg>} */}
      {sendSuccess && contactErrmsg.length < 1 && (
        <Modal
          type="alert"
          msg="Sent! I'll reply to you as soon as possible."
          isOpen={isModalOpen}
          setOpen={setModalOpen}
          defaultAni
        />
      )}
      {contactErrmsg.length > 0 && (
        <Modal type="alert" msg={contactErrmsg} isOpen={isModalOpen} setOpen={setModalOpen} />
      )}
    </DIV.Layout>
  );
};

export default ContactPresenter;
