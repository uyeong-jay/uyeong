import styled from '@_settings/styled';

interface TagWrapperProps {
  tagCount: number;
}

export const SECTION = {} as any;
export const DIV = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
`;

DIV.TagsWrapper = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 65%;
  padding: 20px 20px 15px 20px;
  overflow: hidden;

  @media screen and (min-height: 500px) and (min-width: 850px) {
    padding: 0px 10px;
  }
`;

DIV.TagWrapper = styled.div<TagWrapperProps>`
  // border: 1px solid black;
  width: auto;
  padding: 8px 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
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
    opacity: 0.5;
  }
`;
