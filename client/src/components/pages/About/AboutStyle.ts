import styled from '@_settings/styled';

export const StyledAbout = styled.section`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 750px;
`;

export const StyledAboutHeader = styled.header`
  border: 1px solid #dadada;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    margin: 10px;
  }

  & > span img {
    border-radius: 100px;
  }

  & > p {
    border: 1px solid #dadada;
    margin: 10px;

    & > .underline {
      position: relative;
    }

    & > .underline:after {
      content: '';
      position: absolute;
      left: -10px;
      bottom: -10px;
      width: 0px;
    }

    & .underline:nth-of-type(1):after {
      //animation: 이름 유지시간 효과 딜레이시간 마지막상태유지;
      animation: underline_purple 2s ease-in-out 0s forwards;
      background: url('/pencils/purple_pencil.png');
      background-size: 110px 15px;
    }
    & .underline:nth-of-type(2):after {
      animation: underline_blue 2s ease-in-out 0.6s forwards;
      background: url('/pencils/blue_pencil.png');
      background-size: 70px 15px;
    }
    & .underline:nth-of-type(3):after {
      animation: underline_green 2s ease-in-out 1.2s forwards;
      background: url('/pencils/green_pencil.png');
      background-size: 50px 15px;
    }

    @keyframes underline_purple {
      from {
        opacity: 0;
        width: 0px;
        height: 15px;
      }
      to {
        opacity: 0.7;
        width: 110px;
        height: 15px;
      }
    }
    @keyframes underline_blue {
      from {
        opacity: 0;
        width: 0px;
        height: 15px;
      }
      to {
        opacity: 0.7;
        width: 70px;
        height: 15px;
      }
    }
    @keyframes underline_green {
      from {
        opacity: 0;
        width: 0px;
        height: 15px;
      }
      to {
        opacity: 0.7;
        width: 50px;
        height: 15px;
      }
    }
  }
`;

export const StyledAboutContents = styled.section`
  border: 1px solid #dadada;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
