import styled from '@_settings/styled';

interface TagWrapperProps {
  tagCount: number;
}

export const SECTION = {} as any;
export const DIV = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

DIV.TSTitleWrapper = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > h1 {
    // border: 1px solid black;
    font-size: 30px;
    font-weight: 400;
    color: ${({ theme }) => theme.FONT_C};
  }
`;

DIV.TagsWrapper = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 75%;
`;

DIV.TagWrapper = styled.div<TagWrapperProps>`
  // border: 1px solid black;
  width: auto;
  // margin: 10px;
  overflow: hidden;
  cursor: pointer;
  padding: 8px 15px;
  color: #514e2e;
  font-size: ${(props) => {
    switch (props.tagCount) {
      case 1:
        return `15px;`;
      case 2:
        return `20px;`;
      case 3:
        return `25px;`;
      default:
        return `30px;`;
    }
  }}

  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
`;
