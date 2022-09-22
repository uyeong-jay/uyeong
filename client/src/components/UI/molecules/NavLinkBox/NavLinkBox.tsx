import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import Link from 'next/link';
import styled from '@_settings/styled';

interface Props {
  href: string;
  passHref?: boolean;
  target?: string;
  rel?: string;
  children: ReactNode;
}

const StyledNavLinkBox = styled.li`
  //호버 적용하기
`;

const NavLinkBox = ({ href, passHref, target, rel, children }: Props): ReactElement => {
  return (
    <StyledNavLinkBox>
      <Link href={href} passHref={passHref ? true : false}>
        <a target={target} rel={rel}>
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
