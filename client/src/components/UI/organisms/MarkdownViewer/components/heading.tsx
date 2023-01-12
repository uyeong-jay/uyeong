import styled from '@_settings/styled';
import React from 'react';

const StyledHeading = styled.div`
  padding-top: 10px;
`;

const StyledAnchor = styled.a`
  color: black;

  &:hover {
    color: red;
  }
`;

const heading = (props: { level: number; children: React.ReactChildren[] }) => {
  const heading = props.children?.reduce((acc, child) => acc + child, '');

  const slug = heading?.toLowerCase().replace(/\s+/g, '-');

  return (
    <StyledHeading>
      {React.createElement(`h${props.level}`, { id: slug }, <StyledAnchor href={`#${slug}`} {...props}></StyledAnchor>)}
    </StyledHeading>
  );
};

export default heading;
