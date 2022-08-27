import React, { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from '@_settings/styled';
import Button from '@atoms/Button';
import WideButton from '@atoms/WideButton';
import Input from '@molecules/Input';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
}

const StyledForm = styled.form`
  border: 2px dotted lightslategray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  aglin-items: cetner;
  width: 750px;
  border-radius: 20% 50% 30% / 30% 40% 40%;
  padding: 100px;
  margin: 50px 0 50px 0;

  & div {
    dispaly: flex;
    justify-content: center;
    aglin-items: cetner;


  // /* password */
  // & div:nth-child(2) {
  //   & button {
  //     color: red;
  //     margin-left: 100px;
  //   }
  // }

  // & p a {
  //   color: red;
  // }
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
          <div>
            {/* input >> molecules 에서 가져오기 */}
            <Input labelText="Email" variant="email" name="email" type="email" value={email} onChange={onChangeInput} />
          </div>

          <div>
            {/* input >> molecules 에서 가져오기 */}
            <Input
              labelText="Password"
              variant="password"
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

          {/* button >> atoms 에서 가져오기 */}
          <WideButton variant="login" text="Login" type="submit" disabled={email && password ? false : true} />

          <p>
            비밀번호를 잊어버리셨나요? ( <Link href="/fotget_password">Forget password?</Link> )
            <br />
            가입이 안 되어 있나요? ( <Link href="/join">Wanna join?</Link> )
          </p>
        </StyledForm>
      </section>
    </>
  );
};

export default LoginPresenter;
