import Link from 'next/link';
import styled from '@_settings/styled';

interface Props {
  text: string;
}

//커지면서 아래로 내려오는 동그라미
const StyledButton = styled.button`
  width: 50px;
  height: 50px;
  padding-bottom: 3px;
  //background-color: #d1c7b0;
  border-radius: 50%;
`;

const StyledAnchor = styled.a`
  color: #433624;
`;

const LoginButton = ({ text }: Props) => {
  return (
    <StyledButton>
      <Link href="/login" passHref>
        <StyledAnchor>{text}</StyledAnchor>
      </Link>
    </StyledButton>
  );
};

export default LoginButton;
