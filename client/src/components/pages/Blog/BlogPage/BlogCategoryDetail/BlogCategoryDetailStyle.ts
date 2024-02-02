import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;

interface PostCardBlcokProps {
  hasPost: boolean;
}

SECTION.Frame = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 700px;
  padding-top: 100px;
  margin-bottom: 150px;
  color: ${({ theme }) => theme.FONT_C};

  & > h1 {
    border-bottom: 3px solid ${({ theme }) => theme.BD_C};
    position: relative;
    width: 80%;
    padding-bottom: 10px;
    padding-left: 50px;
    margin-bottom: 70px;
    max-width: ${({ theme }) => theme.BP.TABLET};

    &::after {
      border-left: 3px solid ${({ theme }) => theme.BD_C};
      content: '';
      position: absolute;
      top: -10px;
      left: 30px;
      height: 90px;
    }
  }
`;

DIV.PostCardBlcok = styled.div<PostCardBlcokProps>`
  // border: 1px solid blue;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  justify-content: center;
  position: relative;
  width: ${({ theme }) => theme.BP.MOBILE}; //MOBILE also
  height: auto;
  margin-bottom: 100px;
  ${(props) => !props.hasPost && `min-height: 300px;`}

  @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 200px)) {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    width: 600px;
  }
  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 200px)) {
    width: 1000px;
    ${(props) => !props.hasPost && `min-height: 500px;`}
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    width: 1200px;
  }

  //포스트 없을때
  & > h1 {
    // border: 1px solid black;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

DIV.PostCard = styled.div`
  // border: 1px solid black;
  margin: 80px 50px; //MOBILE also
  position: relative;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 200px)) {
    margin: 100px;
  }
  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 200px)) {
    margin: 100px 70px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    margin: 100px 80px;
  }

  & .blog-post-card-image-wrapper {
    // border: 3px solid black;
    display: inline-flex;
    position: relative;
    width: 100%;

    // w:h = 3:2
    // width: 300px; //MOBILE also
    height: 200px;

    @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 200px)) {
      // width: 400px;
      height: 265px;
    }
    @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 200px)) {
      // width: 360px;
      height: 240px;
    }
    @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
      // width: 440px;
      height: 290px;
    }

    //이미지있는 곳에만 배경색 추가
    & > .blog-post-card-image {
      background-color: ${({ theme }) => theme.INITIAL_BG_C};
    }

    //LOGO Wrapper
    & > div {
      border: 3px solid ${({ theme }) => theme.BD_C};
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      & .logo {
        // border: 1px solid black;
        width: 30px;
        height: 60px;
        transform: translateY(7px);
        fill: ${({ theme }) => theme.LOGO_C};
      }
    }
  }

  //post title
  & > h3 {
    // border: 1px solid red;
    position: absolute;
    top: -40px;
    left: 0px;
    width: 100%;
    font-size: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    & > a {
      color: ${({ theme }) => theme.FONT_C};
    }
  }

  //post date
  & > span {
    // border: 1px solid black;
    position: absolute;
    bottom: -27px;
    right: 2px;
    font-size: 15px;

    @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 200px)) {
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

DIV.LoaderWrapper = styled.div`
  // border: 1px solid black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

DIV.IntersectionTarget = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  aglin-items: center;
  height: 50px;
  width: 100%;
`;

DIV.NoMorePosts = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
`;
