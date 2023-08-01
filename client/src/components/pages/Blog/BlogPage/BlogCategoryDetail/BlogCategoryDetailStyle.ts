import styled from '@_settings/styled';

export const StyledBlogCategoryDetail = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  min-height: 700px;
  padding: 100px 0;
  // padding: 50px 25px 100px 25px;

  & > .category-title {
    // border: 1px solid black;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    width: 90%;
    padding-bottom: 10px;
    margin-bottom: 70px;
    //밑줄 추가 하기
  }

  & > .post-card-by-category-block {
    // border: 1px solid red;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 70px;
    justify-items: center;
    align-items: start;
    // padding: 50px 0;

    & > .post-card-by-category {
      // border: 1px solid black;
      position: relative;
      width: 400px;
      height: 270px;
      border-radius: 20px;

      & .blog-category-image-wrapper {
        // border: 1px solid black;
        display: inline-flex;
        position: absolute;
      }

      & .blog-category-image {
        border-radius: 20px;
        object-fit: cover; //원본크기로 넣기
        opacity: 0.6;
        z-index: -1;
      }

      & > .post-card-title {
        // border: 1px solid black;
        width: 80%;
        margin: 40px 0 25px 35px;

        & > a {
          color: black;
        }
      }
      & > .post-card-description {
        // border: 1px solid black;
        width: 80%;
        margin: 10px 0 10px 35px;
        max-height: 100px;
      }
      & > .post-card-date {
        // border: 1px solid black;
        position: absolute;
        bottom: 30px;
        right: 50px;
      }
    }
  }
`;
