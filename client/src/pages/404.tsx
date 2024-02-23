import styled from '@_settings/styled';
import Link from 'next/link';
import { useEffect } from 'react';

const StyledErrorPage = styled.div`
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
  user-select: none;

  & > h1 {
    // border: 1px solid black;
    display: flex;
    justify-content: center;
    margin: 0px;
    font-family: 'Baloo Bhaijaan 2', sans-serif;
    font-optical-sizing: auto;
    font-size: 6rem;
  }

  & > p {
    // border: 1px solid black;
  }

  & a {
    // border: 1px solid black;
    background-color: ${({ theme }) => theme.BD_C};
    padding: 6px 10px;
    margin-top: 25px;
    font-weight: bold;
    letter-spacing: 0.3px;
    word-spacing: -3px;
    color: ${({ theme }) => theme.BG_C};
    border-radius: 10px;
  }
`;

const NotFound = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    //언마운트 시
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <StyledErrorPage>
      <h1>404</h1>
      <p>Oops... looks like you got lost</p>
      <Link href="/">Back to home</Link>
    </StyledErrorPage>
  );
};

export default NotFound;
