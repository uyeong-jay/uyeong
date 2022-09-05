import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from '@_settings/styled';
import Input from '@src/components/UI/molecules/Input';
import Link from 'next/link';
import Button from '@atoms/Button';
import WideButton from '@src/components/UI/atoms/WideButton';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  nickName: string;
  email: string;
  password: string;
  cf_password: string;
}

const StyledSection = styled.section`
  border: 2px dotted lightslategray;
  width: 750px;
  border-radius: 20% 50% 30% / 30% 40% 40%;
  padding: 100px;
  margin: 50px 0 50px 0;

  & form div {
    // border: 1px solid red;
  }

  & p a {
    color: blue;
  }
`;

const JoinPresenter = ({ onSubmit, onChangeInput, nickName, email, password, cf_password }: Props) => {
  const [passwordType, setPasswordType] = useState(true);
  const [cf_passwordType, setCf_passwordType] = useState(true);

  return (
    <StyledSection>
      <form onSubmit={onSubmit}>
        <div>
          <Input labelText="Nick name" variant="nickName" name="nickName" value={nickName} onChange={onChangeInput} />
        </div>

        <div>
          <Input labelText="Email" variant="email" name="email" type="email" value={email} onChange={onChangeInput} />
        </div>

        <div>
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

        <div>
          <Input
            labelText={'Confirm \n password'}
            variant="cf_password"
            name="cf_password"
            type={cf_passwordType ? 'password' : 'text'}
            value={cf_password}
            onChange={onChangeInput}
          />
          <Button
            variant="primary"
            text={cf_passwordType ? 'Show' : 'Hide'}
            type="button"
            onClick={() => setCf_passwordType(!cf_passwordType)}
            disabled={cf_password ? false : true}
          />
        </div>

        <WideButton
          variant="join"
          text="Join"
          type="submit"
          disabled={nickName && email && password && cf_password ? false : true}
        />
      </form>

      <p>
        비밀번호를 잊어버리셨나요? ( <Link href="/fotget_password">Forget password?</Link> )
        <br />
        이미 가입이 되어 있나요? ( <Link href="/login">Login now!</Link> )
      </p>
    </StyledSection>
  );
};

export default JoinPresenter;
