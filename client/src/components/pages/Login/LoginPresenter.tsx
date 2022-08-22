import Head from 'next/head';
import Button from '@atoms/Button';

interface Props {
  onSubmit: (e: React.FormEvent) => void;
  onChangeEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
}

const LoginPresenter = ({ onSubmit, onChangeEmail, onChangePassword, email, password }: Props) => {
  return (
    <>
      <Head>
        <title>UYeong | Join</title>
      </Head>
      <section>
        <form onSubmit={onSubmit}>
          {/* input >> molecules 에서 가져오기 */}
          <label>Email</label>
          <input type="email" value={email} onChange={onChangeEmail}></input>

          {/* input >> molecules 에서 가져오기 */}
          <label>Password</label>
          <input type="password" value={password} onChange={onChangePassword}></input>

          {/* button >> atoms 에서 가져오기 */}
          <Button type="submit" text="Join" />
        </form>
      </section>
    </>
  );
};

export default LoginPresenter;
