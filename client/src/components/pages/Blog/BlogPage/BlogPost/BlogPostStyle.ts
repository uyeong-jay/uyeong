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
      padding: 50px 0;
      overflow: hidden;
      word-break: keep-all;
      font-size: 1rem;
      line-height: 1.7;
      letter-spacing: -0.004em;

      @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
        font-size: 1.1rem;
      }

      & > h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 40px 0 8px 0;
      }

      & > p {
        margin-bottom: 15px;
      }

      & > p a {
        color: ${({ theme }) => theme.FONT_C};
        padding-bottom: 2px;
        border-bottom: 1px solid ${({ theme }) => theme.FONT_C};
      }

      & p img {
        margin: 1rem auto;
        border-radius: 15px;
      }

      & > pre > code > div {
        border: 3px solid ${({ theme }) => theme.BD_C}4C; //4C: opacity 30%
        background-color: ${({ theme }) => theme.BG_C} !important;
        border-radius: 20px;

        overflow-x: scroll;
        overflow-y: hidden;

        ::-webkit-scrollbar {
          border-radius: 50%;
          height: 5px;
        }
        ::-webkit-scrollbar-track {
          margin: 0 15px;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: ${({ theme }) => theme.BD_C}4C; //4C: opacity 30%
          border-radius: 10px;
        }

        & > code > span {
          background-color: transparent !important;
        }
      }
    }
  }
`;
