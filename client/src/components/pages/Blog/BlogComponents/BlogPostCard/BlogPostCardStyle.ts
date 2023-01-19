import styled from '@_settings/styled';

export const StyledBlogPostCard = styled.article`
  //background-color: #efe9e0;
  // border: 1px solid #dadada;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid black;
  width: 750px;
  height: 225px;
  margin: 50px 70px;
  border-radius: 30px;

  & .blog-card-image-wrapper {
    //border: 1px solid black;
    display: inline-flex;
    position: absolute;
    top: -30px;
    left: -30px;
  }

  & .blog-card-image {
    border-radius: 20px;
    object-fit: cover; //원본크기로 넣기
  }

  & > .post-card-contents {
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 20px;
    padding-left: 20px;

    & > .post-card-title {
      // border: 1px solid black;
      width: 80%;
      height: 30px;
      margin-bottom: 10px;
      overflow: hidden;
    }
    & > .post-card-description {
      // border: 1px solid black;
      width: 80%;
      max-height: 80px;
      // height: 80px;
      overflow: hidden;
    }
    & > .post-card-tags {
      // border: 1px solid black;
      width: 80%;
      margin: 10px 0;
      overflow: hidden;
    }
    & > .post-card-category {
      border: 1px solid black;
      position: absolute;
      bottom: 0;
      left: 0;
      margin: 0 0 17px 20px;
      border-radius: 10px;
      padding: 5px 10px;
    }

    & > .post-card-right-bottom-group {
      display: flex;
      // border: 1px solid black;
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 0 10px 20px 0;

      & > .post-card-date {
        // border: 1px solid black;
        width: auto;
        overflow: hidden;
      }

      & > .post-card-comment {
        // border: 1px solid black;
        width: auto;
        text-align: end;
      }

      & > .post-card-star {
        // border: 1px solid black;
        width: 90px;
        // text-align: center;
      }

      & > .post-card-middot {
        margin: 0 10px;
      }
    }
  }

  & .post-card-contents-with-thumbnail {
    padding-left: 270px;
  }
`;
