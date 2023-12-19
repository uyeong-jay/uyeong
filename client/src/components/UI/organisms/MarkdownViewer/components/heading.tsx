import React from 'react';

const Heading = (props: { level: number; children: React.ReactChildren[] }) => {
  const headingText = props.children?.reduce((acc, child) => acc + child, '');

  const slug = headingText?.toLowerCase().replace(/\s+/g, '-');

  return React.createElement(`h${props.level}`, { id: slug }, props.children);
};

export default Heading;

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
