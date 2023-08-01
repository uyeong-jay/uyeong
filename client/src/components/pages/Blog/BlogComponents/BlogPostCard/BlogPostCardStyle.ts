import styled from '@_settings/styled';

export const ARTICLE = {} as any;
export const DIV = {} as any;
export const P = {} as any;

interface ContentsProps {
  thumbnail: string | File;
}

ARTICLE.Frame = styled.article`
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  min-height: 200px;
  margin: 40px 0;

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    // border: 1px solid black;
    // 나중에
    width: 100px;
    height: 200px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    border: 1px solid yellow;
    width: 600px;
    height: 300px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    border: 1px solid blue;
    width: 800px;
    height: 400px;
  }
`;

DIV.Title = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;

  & > h3 {
    border: 1px solid black;
    width: 100%;
    height: 20%;
    // overflow: hidden;
  }

  & .blog-card-image-wrapper {
    border: 1px solid black;
    width: 100%;
    height: 80%;
    // display: inline-flex;
    // position: absolute;
    // top: -30px;
    // left: -30px;
  }

  & .blog-card-image {
    object-fit: cover; //원본크기로 넣기
  }
`;

DIV.Content = styled.div<ContentsProps>`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // position: relative;
  width: 100%;
  height: 100%;
  // padding-top: 20px;
  // padding-left: 20px;

  ${({ thumbnail }) => {
    if (thumbnail) {
      return 'padding-left: 270px;';
    }
  }}
`;

DIV.ContentTop = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;

  //카테고리
  & > p {
    border: 1px solid black;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;
DIV.ContentMiddle = styled.div`
  border: 1px solid black;
  display: flex;
  justify-contents: center;
  align-items: center;
  width: 100%;
  // min-height: 100%;
`;

P.CardTags = styled.p`
  border: 1px solid black;
  width: 100%;
  // margin: 10px 0;
  // overflow: hidden;
`;

DIV.MidLine = styled.div`
  border: 1px solid black;
  width: 1px;
  height: 80%;
  background-color: black;
`;

P.CardDescription = styled.p`
  border: 1px solid black;
  width: 100%;
  // max-height: 80px;
  // height: 80px;
  // overflow: hidden;
`;

DIV.ContentBottom = styled.div`
  border: 1px solid black;
  display: flex;
`;

P.CardDate = styled.p`
  border: 1px solid black;
  width: auto;
  overflow: hidden;
`;

P.CardComment = styled.p`
  border: 1px solid black;
  width: auto;
  text-align: end;
`;
