import styled from '@_settings/styled';
import { useRouter } from 'next/router';

interface StrongProps {
  children: [string];
  childrenContent: string;
  pathname: string;
}

const StyledStrong = styled.strong<StrongProps>`
  ${(props) => {
    if (props.pathname !== '/write' && props.childrenContent === '@') {
      return `
        border-bottom: 2px solid ${props.theme.FONT_C};
        color: ${props.theme.FONT_C};
      `;
    } else {
      return `color: black;`;
    }
  }}
`;

const Strong = ({ children }: StrongProps) => {
  const router = useRouter();

  const currPathname = router.pathname;

  const childrenContent = children[0][0];

  return (
    <StyledStrong childrenContent={childrenContent} pathname={currPathname}>
      {children}
    </StyledStrong>
  );
};

export default Strong;
