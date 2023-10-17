import styled from '@_settings/styled';
import React, { memo } from 'react';

const StyledHeading = styled.div`
  padding-top: 10px;
`;

const heading = (props: { level: number; children: React.ReactChildren[] }) => {
  const headingText = props.children?.reduce((acc, child) => acc + child, '');

  const slug = headingText?.toLowerCase().replace(/\s+/g, '-');

  return <StyledHeading>{React.createElement(`h${props.level}`, { id: slug }, props.children)}</StyledHeading>;
};

export default memo(heading);

// 제목에 링크 붙히고 싶으면 활용하기
// const StyledAnchor = styled.a`
//   color: black;

//   &:hover {
//     color: red;
//   }
// `;

{
  /* <StyledHeading>
  {React.createElement(`h${props.level}`, { id: slug }, <StyledAnchor href={`#${slug}`} {...props}></StyledAnchor>)}
</StyledHeading> */
}
