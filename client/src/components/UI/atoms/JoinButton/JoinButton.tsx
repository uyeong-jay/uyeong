import Link from 'next/link';
import styled from '@_settings/styled';

//커지면서 아래로 내려오는 동그라미 (파란색)
const StyledButton = styled.button`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background-color: #433624;
  border-radius: 50%;
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
