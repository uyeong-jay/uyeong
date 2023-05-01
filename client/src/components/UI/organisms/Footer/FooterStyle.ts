import styled from '@_settings/styled';

export const StyledFooter = styled.footer`
  border: 1px solid #dadada;
  background-color: #fef6b5;
  width: 100%;
  height: 190px;
  margin: 10px 0;
  padding: 20px;
  //background-color: #d7d3c8;
  border-radius: 30px;
  color: black;

  & li {
    display: flex;
  }

  & li p {
    display: flex;
  }

  & li .user-icon {
    fill: maroon;
    width: 12px;
    margin: 0 8px 0 -1px;
    font-size: 20px;
  }

  & li a {
    display: flex;
    color: blue;

    & > .instagram-icon {
      fill: maroon;
      width: 14px;
      margin: 3px 8px 0 -2px;
      font-size: 20px;
    }

    & > .envelope-icon {
      fill: maroon;
      width: 14px;
      margin: 3px 8px 0 -1px;
    }

    & > .github-icon {
      fill: maroon;
      width: 14px;
      margin: 3px 8px 0 -1px;
      font-size: 18px;
    }

    & > .t-icon {
      fill: maroon;
      width: 11px;
      margin: 3px 8px 0 0px;
      font-size: 18px;
    }
  }

  & p .copyright-icon {
    fill: maroon;
    width: 14px;
    color: maroon;
    margin: 3px 8px 0 -0.5px;
    font-size: 18px;
  }
`;
