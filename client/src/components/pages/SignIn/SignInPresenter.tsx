import React from 'react';

interface Props {
  onSubmit: (e: React.FormEvent) => void;
  onChangeEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
}

const SignInPresenter = ({ onSubmit, onChangeEmail, onChangePassword, email, password }: Props) => {
  return (
    <section>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={onChangeEmail}></input>

        {/* input >> molecules 에서 가져오기 */}
        <label>Password</label>
        <input type="password" value={password} onChange={onChangePassword}></input>

        {/* button >> atoms 에서 가져오기 */}
        <button type="submit">Join</button>
      </form>
    </section>
  );
};

export default SignInPresenter;
