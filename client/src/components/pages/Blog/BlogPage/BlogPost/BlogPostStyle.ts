import styled from '@_settings/styled';

export const StyledBlogPost = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 800px;

  & nav {
    border: 1px solid black;
    position: absolute;
    top: 150px;
    right: -300px;
    height: 95%;
  }

  & > .blog-post-header {
    border: 1px solid black;
    width: 100%;

    & > h1 {
      border: 1px solid black;
      text-align: center;
    }
    & > .blog-post-header-middle {
      border: 1px solid black;
      display: flex;
      justify-content: space-between;
    }
    & > .blog-post-header-bottom {
      border: 1px solid black;
      display: flex;

      & > .blog-post-tag {
        border: 1px solid black;
        margin: 10px;
      }
    }
  }

  & .blog-post-image-wrapper {
    // border: 5px solid black;
    display: inline-flex;
    position: relative;
    top: 0;
    left: 0;
    width: 800px;
    height: 550px;
  }

  & > article {
    // border: 1px solid black;
    // width: 500px;
  }
`;
