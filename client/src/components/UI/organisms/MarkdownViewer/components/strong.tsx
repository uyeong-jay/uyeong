import styled from '@_settings/styled';
import { useRouter } from 'next/router';
import { memo } from 'react';

interface StrongProps {
  children: [string];
  childrenContent: string;
  pathname: string;
}

const StyledStrong = styled.strong<StrongProps>`
  ${(props) => {
    if (props.pathname !== '/write' && props.childrenContent === '@') {
      return `color: red;`;
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

export default memo(Strong);
