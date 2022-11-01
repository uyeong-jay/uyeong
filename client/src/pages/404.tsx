import styled from '@_settings/styled';
import Link from 'next/link';

interface Props {
  loginError?: boolean;
}

const ErrorPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: white;
  user-select: none;
  font-size: 30px;

  & a {
    border: 3px solid black;
    padding: 10px;
    margin-top: 10px;
    font-size: 20px;
    font-weight: bold;
    color: black;
  }

  & a:hover {
    border-color: rgba(0, 0, 0, 0.5);
    color: rgba(0, 0, 0, 0.5);
  }
`;

const NotFound = ({ loginError }: Props) => {
  if (loginError)
    return (
      <ErrorPageWrapper>
        <h1>Please Login First</h1>
        <Link href="/">Go to home</Link>
      </ErrorPageWrapper>
    );

  return (
    <ErrorPageWrapper>
      <h1>Page Not Found</h1>
      <Link href="/">Go to home</Link>
    </ErrorPageWrapper>
  );
};

export default NotFound;
