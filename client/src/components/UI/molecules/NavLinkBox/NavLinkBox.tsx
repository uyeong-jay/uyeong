import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import styled from '@_settings/styled';

interface Props {
  href: string;
  passHref?: boolean;
  target?: string;
  rel?: string;
  children: ReactNode;
  delay?: number;
}

const StyledNavLinkBox = styled.li`
  & > a {
    color: ${({ theme }) => theme.COLOR};
  }
  & > a:hover {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const NavLinkBox = ({ href, passHref, target, rel, children, delay }: Props): ReactElement => {
  const delayLink = (e: any) => {
    e.preventDefault(); // 기본 동작인 링크 이동을 막습니다.
    const url = e.currentTarget.getAttribute('href');
    setTimeout(() => {
      window.location.href = url; // 0.5초 후에 링크 이동을 합니다.
    }, delay);
  };

  return (
    <StyledNavLinkBox>
      <Link href={href} passHref={passHref ? true : false}>
        <a
          target={target}
          rel={rel} //rel="noopener noreferrer"??
          onClick={
            delay
              ? delayLink
              : () => {
                  return;
                }
          }
        >
          {children}
        </a>
      </Link>
    </StyledNavLinkBox>
  );
};

NavLinkBox.defaultProps = {
  passHref: false,
};

export default NavLinkBox;
