import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;
export const ASIDE = {} as any;

interface BlogTagProps {
  tagUnderline: string;
  tagName: string;
  isClickedTag: boolean;
}

SECTION.Frame = styled.section`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 100px;

  //subFrame
  & > div {
    width: 100%;

    @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
      width: auto;
    }
  }
`;

DIV.BlogBlock = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: cneter;
  position: relative;
  width: 100%;
  margin-top: 70px;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    border-left: 2px solid ${({ theme }) => theme.BD_C};
    border-right: 2px solid ${({ theme }) => theme.BD_C};
    // width:
  }
`;

ASIDE.BlogTags = styled.aside`
  // border: 1px solid black;
  padding: 50px 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-width: ${({ theme }) => theme.BP.MOBILE};
  max-width: ${({ theme }) => theme.BP.TABLET};

  & > .tags-wrapper {
    // border: 1px solid black;
    display: flex;
    width: 100%;
    // height: 100%;
    padding: 20px 40px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    ::-webkit-scrollbar {
      // border: 1px solid black;
      height: 7px;
    }
    ::-webkit-scrollbar-track {
      // border: 1px solid black;
      margin: 1px 0;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      // border: 1px solid black;
      background: ${({ theme }) => theme.BD_C};
      border-radius: 10px;
    }
  }

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    min-width: 200px;
    position: static;
    left: 0;
    transform: translateX(0);

    & > .tags-wrapper {
      display: block;
      overflow: hidden;
      white-space: wrap;
    }
  }
`;

DIV.BlogTag = styled.div<BlogTagProps>`
  ${(props) => {
    if (props.tagUnderline === props.tagName) {
      return `
        border-bottom: 2px solid ${props.theme.FONT_C};
      `;
    } else {
      return `
        border-bottom: 2px solid ${props.theme.BG_C};
        &:hover {
          color: rgba(0, 0, 0, 0.5);
        }
      `;
    }
  }};

  cursor: pointer;
  margin: 0 20px 0 0;
  padding: 0 0 3px 0;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    margin: 0 0 10px 0;
    padding: 0 0 3px 0;
  }
`;

SECTION.BlogMain = styled.section`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: ${({ theme }) => theme.BP.MOBILE};
  min-height: 700px;
  padding-top: 50px;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    border-left: 2px solid ${({ theme }) => theme.BD_C};
    min-width: 800px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    min-width: 1000px;
  }
`;

DIV.SearchBar = styled.div`
  // border: 1px solid black;
  border-bottom: 2px solid ${({ theme }) => theme.BD_C};
  display: flex;
  margin-bottom: 100px;
  min-width: 300px;

  & > svg {
    fill: ${({ theme }) => theme.BD_C};
    width: 40px;
    padding: 0 10px;
  }

  & > div {
    // border: 1px solid black;
    width: 100%;

    & > input {
      // border: 1px solid black;
      width: 100%;
      padding-left: 40px; //svg width랑 맞추기
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 300px;
  }
  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    width: 400px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    width: 500px;
  }
`;
