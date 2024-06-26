import styled from '@_settings/styled';

export const StyledBlogPost = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative; // for TOC
  width: 100%;
  max-width: calc(${({ theme }) => theme.BP.TABLET} + 40px); //약 양쪽 패딩 크기 만큼 더 추가
  margin: 0 auto 250px auto; // post toc top값 정도를 더 bottom에 추가 함
  padding: 50px 25px 100px 25px;
  font-size: 12px;
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 15px;
  }

  & > article {
    // border: 1px solid black;
    min-height: 300px;
    width: 100%;
    position: relative;
    margin-bottom: 100px;
    @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
      margin-bottom: 200px;
    }

    & .blog-post-image-wrapper {
      // border: 1px solid black;
      display: inline-flex;
      position: relative;
      //w:h = 3:2
      width: 100%; // max-w: 720px
      min-width: 285px;
      height: 55vw;
      min-height: 200px;
      max-height: 480px; // max-h: 480px
    }

    & #markdown-content {
      // border: 1px solid black;
      overflow: hidden;
      padding: 50px 0;

      font-size: 1rem;
      @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
        font-size: 1.1rem;
      }
    }
  }
`;
