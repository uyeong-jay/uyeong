import styled from '@_settings/styled';

export const StyledBlogCategoryCard = styled.div`
  // border: 1px solid black;
  // width: 400px;
  height: 300px;
  margin: 20px;

  & .blog-category-card-image-wrapper {
    // border: 1px solid black;
    display: inline-flex;
  }

  & .blog-category-card-image {
    border-radius: 20px;
    object-fit: cover; //원본크기로 넣기
  }

  & .card-content {
    // border: 1px solid black;

    & .card-content-title-wrapper {
      // border: 1px solid black;
      display: flex;
      margin: 10px 10px;

      & > input {
        // border: 1px solid red;
        width: 100%;
      }

      & > p {
        // border: 1px solid red;
        width: 100%;

        & > a {
          color: black;
        }
      }
    }

    & .card-content-title-error {
      // border: 1px solid red;
      padding: 0px 10px 10px 10px;
    }

    & .card-content-footer {
      // border: 1px solid black;
      padding: 0 10px;
    }
  }
`;
