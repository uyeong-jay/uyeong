import React, { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from '@_settings/styled';
import WideButton from '@atoms/WideButton';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
}

const StyledForm = styled.form`
  border: 3px dotted lightslategray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  aglin-items: cetner;
  width: 750px;
  // border-radius: 400px 600px 650px 350px / 400px 450px 550px 600px;
  border-radius: 20% 50% 30% / 30% 40% 40%;
  padding: 100px;
  margin: 50px 0 50px 0;

  & div {
    dispaly: flex;
    justify-content: center;
    aglin-items: cetner;

    & label {
      color: darkslategray;
      margin-right: 10px;
    }

    & input {
      border: 1px dotted darkslategray;
      margin: 5px 0 30px 0;
      // padding-left: 20px;
      width: 70%;
      height: 40px;
      text-align: center;
      color: lightslategray;
    }

    & > input:nth-child(2) {
      border-radius: 90px 80px 60px 50px;
    }
  }

  /* password */
  & div:nth-child(2) {
    & > input:nth-child(2) {
      margin: 5px 0 5px 0;
      border-radius: 50px 80px 50px 80px;
    }
    & button {
      margin: 10px;
    }
  }

  & p a {
    color: blue;
  }
`;

const LoginPresenter = ({ onSubmit, onChangeInput, email, password }: Props) => {
  const [passwordType, setPasswordType] = useState(true);

  return (
    <>
      <Head>
        <title>UYeong | Login</title>
      </Head>
      <section>
        <StyledForm onSubmit={onSubmit}>
          {/* input >> atoms 에서 가져오기 */}
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChangeInput}
              aria-hidden="true"
              autoComplete="off"
            ></input>
          </div>

          {/* input >> atoms 에서 가져오기 */}
          <div>
            <label>Password</label>
            <input
              type={passwordType ? 'password' : 'text'}
              name="password"
              value={password}
              onChange={onChangeInput}
            ></input>
            <button onClick={() => setPasswordType(!passwordType)} disabled={password ? false : true}>
              {passwordType ? 'Show' : 'Hide'}
            </button>
          </div>

          {/* button >> atoms 에서 가져오기 */}
          <WideButton variant="login" text="Login" type="submit" email={email} password={password} />

          <p>
            비밀번호를 잊어버리셨나요? ( <Link href="/fotget_password">Forget password?</Link> )
          </p>

          <p>
            가입하지 않으셨나요? ( Didn&apos;t you join? - <Link href="/join">Join Now</Link> )
          </p>
        </StyledForm>
      </section>
    </>
  );
};

export default LoginPresenter;
