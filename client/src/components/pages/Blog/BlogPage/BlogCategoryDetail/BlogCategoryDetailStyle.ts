import styled from '@_settings/styled';

export const DIV = {} as any;

DIV.Frame = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 1000px;
  padding-top: 100px;

  //sub frame
  & > div {
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    & > h1 {
      border-bottom: 2px solid ${({ theme }) => theme.BD_C};
      width: 80%;
      padding-bottom: 10px;
      padding-left: 30px;
      margin-bottom: 70px;
      color: ${({ theme }) => theme.FONT_C};
      max-width: ${({ theme }) => theme.BP.TABLET};
    }
  }
`;

DIV.PostCardBlcok = styled.div`
  // border: 1px solid blue;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  justify-content: center;
  width: ${({ theme }) => theme.BP.MOBILE}; //MOBILE also
  margin-bottom: 100px;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 200px)) {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    width: 600px;
  }
  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 200px)) {
    width: 1000px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    width: 1200px;
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
    // border: 3px solid transparent;
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

    //LOGO Wrapper
    & > div {
      border: 3px solid ${({ theme }) => theme.BD_C};
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      // border-radius: 20px;

      & .logo {
        // border: 1px solid black;
        width: 30px;
        height: 60px;
        transform: translateY(7px);
        fill: ${({ theme }) => theme.LOGO_C};
      }
    }
  }

  //title
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

  //date
  & > span {
    // border: 1px solid black;
    position: absolute;
    bottom: -20px;
    right: 0px;
    font-size: 15px;
    color: ${({ theme }) => theme.FONT_C};
  }
`;
DIV.InitialPostsCard = styled.div`
  // border: 1px solid black;
  position: relative;

  // w:h = 3:2
  width: 300px; //MOBILE also
  height: 200px;
  margin: 80px 50px; //MOBILE also

  @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 200px)) {
    margin: 100px;
    width: 400px;
    height: 265px;
  }
  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 200px)) {
    margin: 100px 70px;

    width: 360px;
    height: 240px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    margin: 100px 80px;

    width: 440px;
    height: 290px;
  }
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
  color: ${({ theme }) => theme.FONT_C};
  font-weight: bold;
  font-size: 14px;
`;
