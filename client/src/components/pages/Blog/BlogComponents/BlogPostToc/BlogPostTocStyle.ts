import styled from '@_settings/styled';

interface HeadingListProps {
  headingLevel: number;
  headingId: string;
  activeId: string;
}

export const StyledBlogPostTocNav = styled.nav`
  border: 1px solid black;
  position: fixed;
  top: 0;
  right: 0;

  & > ul {
    border: 1px solid black;
  }
`;

export const StyledList = styled.li<HeadingListProps>`
  border: 1px solid black;
  margin-left: ${(props) => props.headingLevel}em;

  & > a {
    font-size: calc(20px - (${(props) => props.headingLevel} * 2px));

    font-weight: ${(props) => {
      if (props.headingId === props.activeId) return 'bold';
      else return 'normal';
    }};
  }
`;
