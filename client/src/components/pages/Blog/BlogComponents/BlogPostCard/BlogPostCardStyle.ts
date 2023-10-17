import styled from '@_settings/styled';

export const ARTICLE = {} as any;
export const DIV = {} as any;
export const P = {} as any;

interface ThumbnailProps {
  thumbnail: string | File;
}

type TitleProps = ThumbnailProps;
type ContentProps = ThumbnailProps;
type ContentMiddleProps = ThumbnailProps;
type CardTagsProps = ThumbnailProps;
type MidLineProps = ThumbnailProps;
type CardDescriptionProps = ThumbnailProps;

ARTICLE.Frame = styled.article`
  border: 2px solid ${({ theme }) => theme.BD_C};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-width: ${({ theme }) => theme.BP.MOBILE};
  width: ${({ theme }) => theme.BP.MOBILE};
  height: auto;
  margin-bottom: 130px;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET})) {
    width: 450px;
  }

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    flex-direction: row;
    width: 600px;
    height: 300px;
    min-height: 300px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    width: 800px;
    height: 400px;
  }
`;

DIV.Title = styled.div<TitleProps>`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  & > h3 {
    // border: 1px solid blue;
    position: relative;
    width: 100%;
    height: 25%;
    padding: 20px;
    font-size: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    & > a {
      color: ${({ theme }) => theme.FONT_C};
    }
  }

  & .blog-card-image-wrapper {
    // border: 1px solid red;
    position: relative;
    //w:h = 3:2
    width: 280px;
    height: 185px;
    margin: 25px 0;
  }

  & .blog-card-image {
    // border: 1px solid black;
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    & .blog-card-image-wrapper {
      //w:h = 3:2
      width: 350px;
      height: 230px;
    }
  }

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    & > h3 {
      font-size: 20px;

      ${(props) => {
        if (props.thumbnail) {
          return `
            position: absolute;
            // z-index: 1;
            left: 0;
            width: 200%;
          `;
        }
      }};
      ${(props) => {
        if (!props.thumbnail) {
          return `
            width: 100%;
          `;
        }
      }};
    }

    & .blog-card-image-wrapper {
      top: 28%;
      width: 90%;
      height: 60%;
      margin: 0;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    & > h3 {
      font-size: 25px;
    }
  }
`;

DIV.Content = styled.div<ContentProps>`
  border-top: 2px solid ${({ theme }) => theme.BD_C};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;

  ${(props) => {
    if (!props.thumbnail) {
      return `
        // border: 1px solid black;
        border: none;
      `;
    }
  }};

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    border-top: none;

    width: 100%;
    height: 80%;

    ${(props) => {
      if (!props.thumbnail) {
        return `
          // border: 1px solid black;
          border: none;
          position: absolute;
        `;
      }
    }}
  }
`;

DIV.ContentTop = styled.div`
  // border: 1px solid black;
  width: auto;
  position: absolute;
  top: -30px;
  right: 5px;

  //카테고리
  & > span {
    // border: 1px solid red;
    width: 100%;
    font-size: 15px;
    color: ${({ theme }) => theme.FONT_C};
    font-weight: bold;
  }

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    position: static;
    width: 100%;
    height: 25%;

    & > span {
      display: inline-block;
      float: right;
      width: auto;
      position: relative;
      top: -65px;
      right: 5px;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    & > span {
      top: -75px;
    }
  }
`;
DIV.ContentMiddle = styled.div<ContentMiddleProps>`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  width: 100%;
  height: 65%;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    border-left: 1px solid black;
    height: 70%;

    ${(props) => {
      if (!props.thumbnail) {
        return `
          border-left: none;
          flex-direction: row;
        `;
      }
    }}
  }
`;

DIV.CardTags = styled.div<CardTagsProps>`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5%;
  text-align: center;
  line-height: 2;

  & > p {
    // border: 1px solid black;
    overflow: hidden;
    word-break: break-all; // 긴 단어도 줄 바꿈하여 표시
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; // 표시될 줄 수 지정
    -webkit-box-orient: vertical;

    & > span {
      // border: 1px solid black;
      margin: 0 7px;
      color: ${({ theme }) => theme.FONT_C};

      & > span {
        // border: 1px solid black;
        font-weight: bold;
        padding-right: 1px;
      }
    }
  }

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    & > p {
      ${(props) => {
        if (!props.thumbnail) {
          return `
            font-size: 15px;
            -webkit-line-clamp: 3;
          `;
        } else {
          return `
            font-size: 12px;
            -webkit-line-clamp: 2;
          `;
        }
      }}
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    & > p {
      -webkit-line-clamp: 3;
    }
  }
`;

DIV.MidLine = styled.div<MidLineProps>`
  border-top: 1px solid ${({ theme }) => theme.BD_C};
  width: 25%;
  height: 0%;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    ${(props) => {
      if (!props.thumbnail) {
        return `
          border-left: 1px solid ${props.theme.BD_C};
          width: 0%;
          height: 80%;
        `;
      }
    }}
  }
`;

DIV.CardDescription = styled.div<CardDescriptionProps>`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5%;

  & > p {
    // border: 1px solid black;
    overflow: hidden;
    word-break: break-all; // 긴 단어도 줄 바꿈하여 표시
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; // 표시될 줄 수 지정
    -webkit-box-orient: vertical;
    color: ${({ theme }) => theme.FONT_C};
  }

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    & > p {
      ${(props) => {
        if (!props.thumbnail) {
          return `
            font-size: 15px;
            -webkit-line-clamp: 3;
          `;
        } else {
          return `
            font-size: 12px;
            -webkit-line-clamp: 2;
          `;
        }
      }}
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    & > p {
      -webkit-line-clamp: 3;
    }
  }
`;

DIV.ContentBottom = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  width: 100%;
  height: 20%;

  & > p {
    padding: 15px 0;
    width: auto;
  }

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    height: 5%;

    & > p {
      position: relative;
      padding: 15px 10px;
    }
  }
`;

P.CardDate = styled.p`
  // border: 1px solid black;
  bottom: -35px;
  left: 10px;
`;

P.CardComment = styled.p`
  // border: 1px solid black;
  bottom: -35px;
  right: 10px;
  text-align: end;
`;
