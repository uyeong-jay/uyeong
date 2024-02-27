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
  max-height: 250px;
  padding: 20px 20px 15px 20px;
  overflow: hidden;

  @media screen and (min-height: 500px) and (min-width: 850px) {
    padding: 0px 10px;
    max-height: 200px;
  }
`;

DIV.TagWrapper = styled.div<TagWrapperProps>`
  // border: 1px solid black;
  display: block;
  height: 40px;
  line-height: 40px;
  padding: 0px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  color: ${({ theme }) => theme.FONT_C};
  font-size: ${(props) => {
    switch (props.tagCount) {
      case 1:
        return `15px;`;
      case 2:
        return `16px;`;
      case 3:
        return `17px;`;
      default:
        return `18px;`;
    }
  }};

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: ${(props) => {
      switch (props.tagCount) {
        case 1:
          return `15px;`;
        case 2:
          return `17px;`;
        case 3:
          return `19px;`;
        default:
          return `21px;`;
      }
    }};
  }

  &:hover {
    opacity: 0.5;
  }
`;
