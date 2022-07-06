import Link from 'next/link';
import styled from '@_settings/styled';

//커지면서 아래로 내려오는 동그라미
const StyledButton = styled.button`
  width: 60px;
  height: 35px;
  padding-bottom: 3px;
  background-color: #433624;
  border-radius: 20px;
`;

const ColorLink = styled.a`
  color: #ada591;
`;

const JoinButton = () => {
  return (
    <StyledButton>
      <Link href="/signin" passHref>
        <ColorLink>Join</ColorLink>
      </Link>
    </StyledButton>
  );
};

export default JoinButton;
