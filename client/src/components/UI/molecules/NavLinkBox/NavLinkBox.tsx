import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import Link from 'next/link';
import styled from '@_settings/styled';

interface Props {
  href: string;
  passHref?: boolean;
  children: ReactNode;
}

const StyledNavLinkBox = styled.li`
  & > a {
    //다크모드
    color: blue;
  }
`;

const NavLinkBox = ({ href, passHref, children }: Props): ReactElement => {
  return (
    <StyledNavLinkBox>
      <Link href={href} passHref={passHref ? true : false}>
        {children}
      </Link>
    </StyledNavLinkBox>
  );
};

NavLinkBox.defaultProps = {
  passHref: false,
};

export default NavLinkBox;
