import { type ReactElement, type ReactNode } from 'react';
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
  position: relative;

  & > a {
    color: ${({ theme }) => theme.FONT_C};
  }
  & > a:hover {
    color: ${({ theme }) => theme.FONT_C}7F; //7F: opacity 50%
  }
`;

const NavLinkBox = ({ href = '', passHref, target, rel, children }: Props): ReactElement => {
  return (
    <StyledNavLinkBox>
      <Link href={href} passHref={passHref ? true : false}>
        <a
          target={target}
          rel={rel} //rel="noopener noreferrer"
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
