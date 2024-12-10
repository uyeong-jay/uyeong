import styled from '@_settings/styled';
import { useLogoutMutation } from '@app/services/user/userApi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

interface Props {
  isUserFetchError?: boolean;
}

const MAIN = {} as any;

MAIN.frame = styled.main`
  // border: 1px solid black;
  background-color: ${({ theme }) => theme.BG_C};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  z-index: 9999;
  font-family: Consolas, 'Courier New', monospace;
  font-size: 15px;
  color: ${({ theme }) => theme.FONT_C};

  & > div {
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 250px;
    transform: translateY(-15%);

    & > h1 {
      // border: 1px solid red;
      display: flex;
      justify-content: center;
      margin: 0px;
      font-family: 'Baloo Bhaijaan 2', sans-serif;
      font-optical-sizing: auto;
      font-size: 6rem;
      letter-spacing: 5px;
    }

    & > p {
      // border: 1px solid blue;
    }

    & a,
    button {
      // border: 1px solid green;
      background-color: ${({ theme }) => theme.BD_C};
      padding: 6px 10px;
      margin-top: 25px;
      font-weight: bold;
      letter-spacing: 0.3px;
      word-spacing: -3px;
      color: ${({ theme }) => theme.BG_C};
      border-radius: 10px;
    }
  }
`;

const NotFound = ({ isUserFetchError }: Props) => {
  const [logout, { isSuccess: isLoggedOut }] = useLogoutMutation();
  const router = useRouter();

  const onClickLogout = useCallback(async () => {
    await logout(null);
  }, [logout]);

  useEffect(() => {
    if (isLoggedOut) router.replace('/');
  }, [isLoggedOut, router]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    //언마운트 시
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <MAIN.frame>
      <div>
        <h1>404</h1>
        <p>Oops... looks like you got lost</p>
        {isUserFetchError ? <button onClick={onClickLogout}>Back to home</button> : <Link href="/">Back to home</Link>}
      </div>
    </MAIN.frame>
  );
};

export default NotFound;
