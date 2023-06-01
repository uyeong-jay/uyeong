import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;

SECTION.Layout = styled.section`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 100px;

  & > h1 {
    // border: 1px solid black;
    margin-bottom: 40px;
  }
`;

DIV.TagsWrapper = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-width: 320px;
  max-width: 700px;
  // height: 500px;
  // border-radius: 50%;

    & > div {
      // border: 1px solid black;
      width: auto;
      height: auto;
      margin: 10px;
      overflow: hidden;
      // background-color: white;
      cursor: pointer;
      padding: 8px 15px;
      color: #BABABB;
      font-size: 20px;

      &:hover {
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
`;
