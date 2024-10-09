import styled from '@_settings/styled';

interface BlogTagProps {
  tagUnderline: string;
  tagName: string;
  isTagClicked: boolean;
}

export const DIV = {} as any;
export const ASIDE = {} as any;

ASIDE.BlogTags = styled.aside`
  // border: 1px solid red;
  padding: 50px 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-width: ${({ theme }) => theme.BP.MOBILE};
  max-width: ${({ theme }) => theme.BP.TABLET};
  background-color: transparents;

  & > h3 {
    display: none;
  }

  & > .tags-wrapper {
    // border: 1px solid black;
    display: flex;
    // width: 100%;
    height: 70px;
    padding: 20px 20px 20px 40px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    ::-webkit-scrollbar {
      // border: 1px solid black;
      height: 3px;
    }
    ::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.INITIAL_BG_C};
      margin: 1px 0;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      // border: 1px solid black;
      background-color: ${({ theme }) => theme.BD_C};
      border-radius: 10px;
    }
  }

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    // border: 1px solid blue;
    min-width: 225px;
    position: static;
    left: 0;
    transform: translateX(0);

    & > h3 {
      // border: 2px solid black;
      display: flex;
      position: absolute;
      top: 15px;
      left: 35px;
      font-size: 20px;
      letter-spacing: 0.5px;
    }

    & > .tags-wrapper {
      // border: 1px solid black;
      height: auto;
      max-width: 225px;
      display: inline-block;
      overflow: hidden;
      white-space: wrap;
    }
  }
`;

DIV.BlogTag = styled.div<BlogTagProps>`
  // border: 1px solid red;
  margin: 0 20px 0 0;
  height: 25px;
  cursor: pointer;

  & > span:nth-of-type(1) {
    padding-right: 3px;
  }

  ${(props) => {
    if (props.tagUnderline === props.tagName) {
      return `
        border-bottom: 2px solid ${props.theme.BD_C};
      `;
    } else {
      return `
        &:hover {
          color: ${props.theme.FONT_C}7F; //7F: 50%
        }
      `;
    }
  }};

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    // border: 1px solid red;
    display: inline-block;
    margin: 0 0 15px 0;

    & > span {
      // border: 1px solid blue;
      display: inline-block;
      overflow: hidden;
    }

    & > span:nth-of-type(1) {
      max-width: 120px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;
