import styled from '@_settings/styled';

export const StyledFooter = styled.footer`
  border: 1px solid #dadada;
  background-color: #fef6b5;
  width: 750px;
  height: 190px;
  margin: 10px 0;
  padding: 20px;
  //background-color: #d7d3c8;
  border-radius: 30px;
  color: black;

  & li i {
    color: maroon;
  }

  & li a {
    color: blue;

    & > .fa-instagram {
      margin-left: -2px;
      margin-top: 4px;
      font-size: 20px;
    }

    & > .fa-envelope {
      margin-left: -1px;
    }

    & > .fa-github {
      margin-left: -1px;
      margin-top: 4px;
      font-size: 18px;
    }

    & > .fa-t {
      margin-top: 4px;
      font-size: 18px;
    }
  }

  & p .fa-copyright {
    color: maroon;
    margin-left: -1px;
    margin-top: 4px;
    font-size: 18px;
  }
`;
